import Link from "next/link";

export const metadata = {
  title: "Event Terms & Conditions | Antgec",
  description:
    "Please read these terms carefully before registering or attending any Antgec event.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background pb-16">
      {/* Header */}
      <header className="bg-primary-foreground py-12">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Terms&nbsp;&amp;&nbsp;Conditions
          </h1>
        </div>
      </header>

      {/* Body */}
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 py-10 prose prose-gray dark:prose-invert">
        <h2>1. Introduction</h2>
        <p>
          These Terms &amp; Conditions (<strong>“Terms”</strong>) govern your
          registration for and participation in any in-person or virtual event
          organised by Antgec. By submitting a registration request, you agree
          to be bound by these Terms.
        </p>

        <h2>2. Eligibility &amp; Participation</h2>
        <p>
          Events are open solely to individuals or organisations whose products,
          services or academic interests align with the Event’s subject matter.
          Antgec reserves the right, at its sole discretion, to accept, decline
          or revoke a registration without obligation to state a reason.
        </p>

        <h2>3. Booking, Payment &amp; Group Registration</h2>
        <p>
          <strong>3.1 Booking Process.</strong> A booking becomes binding once
          we send you written confirmation (email or signed quote). Each
          participant must be registered individually, either directly or
          through a group registration.
        </p>
        <p>
          <strong>3.2 Fees &amp; Currency.</strong> All prices are quoted in
          Euro (EUR) unless stated otherwise. Invoices are payable by the due
          date; unpaid fees may result in denied access to the Event.
        </p>
        <p>
          <strong>3.3 Payment Processing.</strong> All online payments are
          securely processed using Stripe. Your payment details are encrypted
          and are not stored on our servers.
        </p>
        <p>
          <strong>3.4 Group Registrations.</strong> We support group
          registrations where multiple participants can be registered under a
          single user account. Each participant must be listed with accurate
          information at the time of registration.
        </p>

        <h2>4. Cancellations &amp; Transfers</h2>
        <p>
          <strong>4.1 Cancellations.</strong> All payments are non-refundable.
        </p>
        <p>
          <strong>4.2 Transfers.</strong> If you are unable to attend an event
          you&apos;ve registered for, you may transfer your payment to a
          different upcoming Antgec Event once, provided it occurs within 12
          months of the original event date and has availability.
        </p>

        <h2>5. Refunds</h2>
        <p>
          Antgec maintains a strict no-refund policy. Under no circumstances
          will payments be returned. However, we allow transferring your payment
          to another Antgec Event as outlined in section 4.2.
        </p>

        <h2>6. Force Majeure</h2>
        <p>
          Antgec may cancel, postpone, or alter the Event due to circumstances
          beyond reasonable control (e.g. natural disasters, war, pandemics,
          government restrictions). In such cases, paid fees will be fully
          refunded, or at the attendee’s request, credited toward a future
          Antgec Event within 12 months.
        </p>

        <h2>7. Code of Conduct</h2>
        <p>
          We enforce a zero-tolerance policy for harassment, discrimination, or
          disruptive behaviour. Violations may lead to immediate expulsion
          without refund.
        </p>

        <h2>8. Media Consent</h2>
        <p>
          By attending, you allow Antgec to photograph, film and livestream you
          for legitimate promotional use.
        </p>

        <h2>9. Data Protection</h2>
        <p>
          Personal data collected during registration will be processed under
          the applicable European Union data protection laws including the
          General Data Protection Regulation (GDPR).
        </p>

        <h2>10. Liability</h2>
        <p>
          Attendees are responsible for arranging their own travel, medical, and
          property insurance. Antgec is not liable for loss, theft, injury or
          damage except where caused by its gross negligence.
        </p>

        <h2>11. Intellectual Property</h2>
        <p>
          All Event materials remain the intellectual property of their authors.
          Reproduction or distribution without written consent is prohibited.
        </p>

        <h2>12. Amendments</h2>
        <p>
          We may revise these Terms periodically. Continued participation after
          changes have been published constitutes acceptance of the updated
          Terms.
        </p>

        <h2>13. Governing Law</h2>
        <p>
          This contract is governed by the laws of Portugal. Disputes fall under
          the exclusive jurisdiction of the courts of Lisbon.
        </p>

        <p className="text-sm text-muted-foreground">
          Questions? Reach out at{" "}
          <Link href="mailto:info@antgec.com">info@antgec.com</Link>.
        </p>
      </div>
    </main>
  );
}
