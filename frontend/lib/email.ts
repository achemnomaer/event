import nodemailer from "nodemailer"

// Configure email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER || "smtp.example.com",
  port: Number.parseInt(process.env.EMAIL_PORT || "587"),
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

// Function to send confirmation email to the user
export async function sendConfirmationEmail(
  email: string,
  firstName: string,
  lastName: string,
  registrationType: "educator" | "agent",
  selectedEvents: string[],
) {
  try {
    // Get event names from IDs (in a real app, you'd fetch these from a database)
    const eventNames = getEventNames(selectedEvents)

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_FROM || "noreply@educonf.com",
      to: email,
      subject: "Registration Confirmation - EduConf",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0070f3;">Registration Confirmation</h2>
          <p>Dear ${firstName} ${lastName},</p>
          <p>Thank you for registering as a ${
            registrationType === "educator" ? "education provider" : "student recruitment agent"
          } for our upcoming events.</p>
          
          <h3>Events you've registered for:</h3>
          <ul>
            ${eventNames.map((name) => `<li>${name}</li>`).join("")}
          </ul>
          
          <p>Our team will review your application and get in touch with you soon with more details.</p>
          
          <p>If you have any questions, please don't hesitate to contact us.</p>
          
          <p>Best regards,<br>The EduConf Team</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eaeaea; font-size: 12px; color: #666;">
            <p>This is an automated message, please do not reply to this email.</p>
          </div>
        </div>
      `,
    }

    // Send the email
    const info = await transporter.sendMail(mailOptions)
    console.log("Email sent successfully:", info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    // Log the error but don't throw it - we don't want to affect the main flow
    console.error("Error sending confirmation email:", error)
    return { success: false, error }
  }
}

// Helper function to get event names from IDs
function getEventNames(eventIds: string[]) {
  // In a real app, you would fetch these from a database
  const eventMap: Record<string, string> = {
    event1: "International Conference on Educational Innovation (Paris, June 15-18, 2025)",
    event2: "Global Summit on Higher Education (Tokyo, August 22-25, 2025)",
    event3: "EdTech and Future Learning Conference (Singapore, September 10-12, 2025)",
    event4: "International Symposium on STEM Education (Berlin, July 5-8, 2025)",
    event5: "Conference on Inclusive Education Practices (Cape Town, July 18-20, 2025)",
    event6: "World Education Forum (New York, October 3-7, 2025)",
  }

  return eventIds.map((id) => eventMap[id] || `Event ID: ${id}`)
}
