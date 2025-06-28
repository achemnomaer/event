/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { jsPDF } from "jspdf";
import type { RegistrationRecord } from "@/lib/types/registration";

export interface InvoiceData {
  registration: RegistrationRecord;
  events: Array<{
    id: string;
    title: string;
    price: number;
    currency: string;
    start_date: string;
    end_date: string;
    location: string;
  }>;
  companyInfo: {
    name: string;
    address: string;
    email: string;
    phone: string;
    website: string;
  };
}

export function generateInvoicePDF(data: InvoiceData): Buffer {
  const doc = new jsPDF();
  const { registration, events, companyInfo } = data;

  // Set font
  doc.setFont("helvetica");

  // Header
  doc.setFontSize(24);
  doc.setTextColor(102, 126, 234); // Primary color
  doc.text("INVOICE", 20, 30);

  // Company Info
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(companyInfo.name, 20, 50);
  doc.text(companyInfo.address, 20, 60);
  doc.text(companyInfo.email, 20, 70);
  doc.text(companyInfo.phone, 20, 80);

  // Invoice Details (Right side)
  doc.text(`Invoice #: ${registration.registration_number}`, 120, 50);
  doc.text(
    `Date: ${new Date(registration.created_at).toLocaleDateString()}`,
    120,
    60
  );
  doc.text(
    `Due Date: ${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}`,
    120,
    70
  );

  // Customer Info
  doc.setFontSize(14);
  doc.setTextColor(102, 126, 234);
  doc.text("Bill To:", 20, 100);

  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  const personalInfo = registration.personal_info as any;
  doc.text(
    `${personalInfo.salutation} ${personalInfo.firstName} ${personalInfo.lastName}`,
    20,
    115
  );
  doc.text(personalInfo.email, 20, 125);
  doc.text(personalInfo.phoneNumber, 20, 135);

  if (registration.organization_info) {
    const orgInfo = registration.organization_info as any;
    if (orgInfo.organizationName) {
      doc.text(orgInfo.organizationName, 20, 145);
    }
  }

  // Table Header
  const tableStartY = 160;
  doc.setFillColor(102, 126, 234);
  doc.rect(20, tableStartY, 170, 10, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.text("Description", 25, tableStartY + 7);
  doc.text("Qty", 120, tableStartY + 7);
  doc.text("Price", 140, tableStartY + 7);
  doc.text("Total", 165, tableStartY + 7);

  // Table Content
  doc.setTextColor(0, 0, 0);
  let currentY = tableStartY + 20;
  let subtotal = 0;

  events.forEach((event, index) => {
    const price = event.price || 0;
    const total = price * registration.group_size;
    subtotal += total;

    doc.text(event.title, 25, currentY);
    doc.text(event.location, 25, currentY + 8);
    doc.text(
      `${new Date(event.start_date).toLocaleDateString()} - ${new Date(event.end_date).toLocaleDateString()}`,
      25,
      currentY + 16
    );

    doc.text(registration.group_size.toString(), 125, currentY);
    doc.text(`$${price.toFixed(2)}`, 140, currentY);
    doc.text(`$${total.toFixed(2)}`, 165, currentY);

    currentY += 30;
  });

  // Totals
  const totalsY = currentY + 10;
  doc.line(120, totalsY, 190, totalsY);

  doc.text("Subtotal:", 120, totalsY + 15);
  doc.text(`$${subtotal.toFixed(2)}`, 165, totalsY + 15);

  if (registration.discount_amount > 0) {
    doc.text(`Discount (${registration.discount_applied}):`, 120, totalsY + 25);
    doc.text(`-$${registration.discount_amount.toFixed(2)}`, 165, totalsY + 25);
  }

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Total:", 120, totalsY + 35);
  doc.text(`$${registration.total_amount.toFixed(2)}`, 165, totalsY + 35);

  if (registration.paid_amount > 0) {
    doc.text("Paid:", 120, totalsY + 45);
    doc.text(`$${registration.paid_amount.toFixed(2)}`, 165, totalsY + 45);

    if (registration.remaining_amount > 0) {
      doc.setTextColor(220, 53, 69); // Red color for remaining amount
      doc.text("Balance Due:", 120, totalsY + 55);
      doc.text(
        `$${registration.remaining_amount.toFixed(2)}`,
        165,
        totalsY + 55
      );
    }
  }

  // Footer
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text("Thank you for your business!", 20, 270);
  doc.text("Please retain this invoice for your records.", 20, 280);

  // Return as buffer
  return Buffer.from(doc.output("arraybuffer"));
}
