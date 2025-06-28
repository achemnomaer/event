import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateInvoicePDF } from "@/lib/pdf-generator";

export async function POST(request: NextRequest) {
  try {
    const { registrationId } = await request.json();

    if (!registrationId) {
      return NextResponse.json(
        { error: "Registration ID is required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Get registration details
    const { data: registration, error: regError } = await supabase
      .from("event_registrations")
      .select("*")
      .eq("id", registrationId)
      .single();

    if (regError || !registration) {
      return NextResponse.json(
        { error: "Registration not found" },
        { status: 404 }
      );
    }

    // Get event details
    const { data: events, error: eventsError } = await supabase
      .from("events")
      .select("id, title, price, currency, start_date, end_date, location")
      .in("id", registration.selected_events);

    if (eventsError) {
      return NextResponse.json(
        { error: "Failed to fetch events" },
        { status: 500 }
      );
    }

    // Company info (you can move this to environment variables)
    const companyInfo = {
      name: "Educational Conferences Ltd",
      address: "123 Conference Street, Education City, EC 12345",
      email: "info@educonferences.com",
      phone: "+1 (555) 123-4567",
      website: "www.educonferences.com",
    };

    // Generate PDF
    const pdfBuffer = generateInvoicePDF({
      registration,
      events: events || [],
      companyInfo,
    });

    // Return PDF
    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="invoice-${registration.registration_number}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Invoice generation error:", error);
    return NextResponse.json(
      {
        error: "Failed to generate invoice",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
