// app/privacy-policy/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | ANTGEC",
  description: "How Antgec collects, uses and protects your personal data.",
};

const privacyPolicy = {
  lastUpdated: "2025-06-12",
  sections: [
    {
      id: "introduction",
      title: "1. Introduction",
      paragraphs: [
        "This Privacy Policy (“Policy”) explains how Antgec (“we”, “our”, “us”) collects, uses, shares, and protects personal data when you visit our websites, register for an event, or interact with our services.",
        "By using any Antgec service, you acknowledge that you have read and understood this Policy.",
      ],
    },
    {
      id: "data-we-collect",
      title: "2. Personal Data We Collect",
      paragraphs: [
        "Contact details — name, organisation, job title, postal address, telephone number, and e-mail address.",
        "Registration data — event preferences, dietary or accessibility requirements, payment status.",
        "Technical data — IP address, browser type, device identifiers, log files, and cookies (see §4).",
        "Marketing data — your consent preferences and interaction with our e-mails or ads.",
      ],
    },
    {
      id: "how-we-use-data",
      title: "3. How We Use Your Data",
      paragraphs: [
        "To process event bookings and deliver contractual services.",
        "To send service messages (confirmations, schedule updates, invoices).",
        "With your consent, to send newsletters or targeted offers you can opt out of at any time.",
        "To analyse, secure, and improve our websites and events.",
      ],
    },
    {
      id: "cookies",
      title: "4. Cookies & Similar Technologies",
      paragraphs: [
        "We use first-party and third-party cookies to remember preferences, measure traffic, and personalise content. Non-essential cookies load only after you grant consent via the banner that appears on your first visit (or after 12 months when we ask again).",
        "You can disable cookies in your browser settings; core site functions will still work but some preferences may be lost.",
      ],
    },
    {
      id: "legal-basis",
      title: "5. Legal Basis for Processing",
      paragraphs: [
        "Contract performance (§3 first bullet).",
        "Legitimate interests in running safe, efficient events (balanced against your rights).",
        "Consent for marketing and analytics cookies (withdrawable at any time).",
        "Compliance with legal obligations, including invoicing and tax rules.",
      ],
    },
    {
      id: "sharing",
      title: "6. How We Share Data",
      paragraphs: [
        "Service providers (e.g. payment processors, email platforms) under written data-processing agreements.",
        "Stripe is used as our secure payment processor. Stripe may collect and process your data in accordance with their privacy policy.",
        "Venue partners to manage on-site services (badge printing, catering).",
        "Sponsors or exhibitors only when you actively scan your badge or give consent.",
        "Legal authorities if required to comply with law or to protect our rights.",
      ],
    },
    {
      id: "international",
      title: "7. International Transfers",
      paragraphs: [
        "We host our website on Hostinger and our backend services (including database) on Supabase, which uses AWS infrastructure located in Singapore.",
        "When personal data is transferred outside the European Economic Area (EEA), such as to Singapore, we ensure appropriate safeguards are in place, including Standard Contractual Clauses approved by the European Commission.",
        "Antgec complies with the EU General Data Protection Regulation (GDPR) and other applicable European data protection laws.",
      ],
    },
    {
      id: "security",
      title: "8. Data Security",
      paragraphs: [
        "We apply ISO-aligned controls, including encryption in transit (TLS 1.3), role-based access, and annual penetration testing.",
        "If we detect a breach that risks your rights or freedoms, we will notify you and the relevant authority without undue delay.",
      ],
    },
    {
      id: "retention",
      title: "9. Data Retention",
      paragraphs: [
        "Contact and transaction records are kept for seven years to meet accounting rules.",
        "Marketing consents are refreshed or deleted after two years of inactivity.",
        "Event footage is kept up to three years for promotional use, unless you withdraw consent earlier.",
      ],
    },
    {
      id: "rights",
      title: "10. Your Rights",
      paragraphs: [
        "Access – obtain a copy of your personal data.",
        "Rectification – correct inaccurate or incomplete data.",
        "Erasure – ask us to delete data when no longer necessary (“right to be forgotten”).",
        "Restriction and objection – limit or object to certain processing.",
        "Portability – receive data in a structured, machine-readable format.",
        "Withdraw consent – when processing is based on consent.",
      ],
    },
    {
      id: "children",
      title: "11. Children’s Privacy",
      paragraphs: [
        "Our events and websites are not directed to children under 16. We do not knowingly collect personal data from anyone under this age.",
      ],
    },
    {
      id: "changes",
      title: "12. Changes to This Policy",
      paragraphs: [
        "We may update this Policy to reflect legal or operational changes. Material changes will be announced via e-mail or a prominent website banner at least 14 days in advance.",
      ],
    },
  ],
} as const;

export default function PrivacyPolicyPage() {
  const { sections } = privacyPolicy;

  return (
    <main className="min-h-screen bg-background pb-16">
      {/* Header */}
      <header className="bg-primary-foreground py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Privacy&nbsp;Policy
          </h1>
        </div>
      </header>

      {/* Body */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 prose prose-gray dark:prose-invert">
        {sections.map(({ id, title, paragraphs }) => (
          <section key={id} id={id} className="mb-8 scroll-mt-24">
            <h2>{title}</h2>
            {paragraphs.map((text, idx) => (
              <p key={idx}>{text}</p>
            ))}
          </section>
        ))}

        <p className="text-sm text-muted-foreground">
          Questions? Reach out at{" "}
          <Link href="mailto:info@antgec.com">info@antgec.com</Link>.
        </p>
      </div>
    </main>
  );
}
