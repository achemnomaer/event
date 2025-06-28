import { createClient } from "@/lib/supabase/server";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createClient();

    try {
      // Handle the code exchange in the server-side callback
      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (!error) {
        // Simple redirect without complex URL logic
        const redirectUrl = `${origin}${next}`;
        return NextResponse.redirect(redirectUrl);
      } else {
        console.error("Auth callback error:", error);
      }
    } catch (error) {
      console.error("Auth callback exception:", error);
    }
  }

  // Return to error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
