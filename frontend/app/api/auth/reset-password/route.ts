import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { z } from "zod"

const resetPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
  otp: z.string().min(6, "OTP must be 6 digits").max(6, "OTP must be 6 digits"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, otp, newPassword } = resetPasswordSchema.parse(body)

    const supabase = await createClient()

    // Verify the OTP and update password
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: "recovery",
    })

    if (error) {
      console.error("OTP verification error:", error)
      return NextResponse.json({ error: "Invalid or expired reset code" }, { status: 400 })
    }

    // Update the password
    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (updateError) {
      console.error("Password update error:", updateError)
      return NextResponse.json({ error: "Failed to update password" }, { status: 400 })
    }

    return NextResponse.json({
      message: "Password reset successfully!",
    })
  } catch (error) {
    console.error("Reset password error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
