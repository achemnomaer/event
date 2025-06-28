import React from "react";
import {
  ShieldCheck,
  Users,
  Award,
  MessageSquareQuote,
  Briefcase,
} from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Agent Quality Assurance - ANTGEC",
  description:
    "Learn about the rigorous vetting process and quality standards for all agents in the ANTGEC network, ensuring trust and professionalism.",
};

// Shared props type for card components
type CardProps = {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
};

// Helper component for the Vetting Process steps
const VettingStepCard = ({
  title,
  children,
  stepNumber,
}: {
  title: string;
  children: React.ReactNode;
  stepNumber: number;
}) => (
  <div className="flex">
    <div className="flex flex-col items-center mr-6">
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold">
        {stepNumber}
      </div>
      <div className="w-px h-full bg-border"></div>
    </div>
    <div>
      <div className="flex items-center gap-3 mb-2">
        <h3 className="text-xl font-semibold text-card-foreground">{title}</h3>
      </div>
      <p className="text-muted-foreground">{children}</p>
    </div>
  </div>
);

// Helper component for the "ANT GEC Standard"
const StandardPillarCard: React.FC<CardProps> = ({ icon, title, children }) => (
  <div className="bg-card rounded-2xl p-6 text-center flex flex-col items-center transform hover:-translate-y-2 transition-transform duration-300">
    <div className="bg-primary/10 p-4 rounded-full mb-5 ring-4 ring-primary/5">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-card-foreground mb-2">{title}</h3>
    <p className="text-muted-foreground">{children}</p>
  </div>
);

const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="container mx-auto px-4">{children}</div>
);

// Main Agent Quality Assurance Page Component
export default function AgentQualityAssurancePage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <div className="bg-background py-16 md:py-24 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-60 -left-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        </div>
        <Container>
          <div className="relative z-10">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-primary">
              A Commitment to Quality & Trust
            </h1>
            <p className="mt-6 text-muted-foreground max-w-3xl md:text-lg">
              At ANTGEC, the integrity of our network is paramount. We ensure
              our partner institutions connect only with the most professional,
              ethical, and effective student recruitment agents in the world.
            </p>
            <div className="mt-8 flex  gap-4">
              <div className="h-1 w-20 bg-gradient-to-r from-primary/80 to-transparent rounded-full" />
              <div className="h-2 w-2 rounded-full bg-primary" />
              <div className="h-1 w-20 bg-gradient-to-l from-primary/80 to-transparent rounded-full" />
            </div>
          </div>
        </Container>
      </div>

      {/* Introduction Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2 className="text-3xl font-bold tracking-tight">
                The Foundation of Successful Partnerships
              </h2>
              <p className="text-muted-foreground">
                In the complex landscape of international student recruitment,
                trust is the most valuable currency. A successful placement
                begins long before a student enrolls; it starts with a trusted
                agent who provides ethical guidance and professional support.
              </p>
              <p className="text-muted-foreground">
                Our rigorous quality assurance framework is designed to protect
                the interests of students, institutions, and agents alike. By
                upholding the highest standards, we build a sustainable and
                reliable ecosystem for global education.
              </p>
            </div>
            <div className="bg-card p-8 rounded-2xl border border-border">
              <MessageSquareQuote className="w-8 h-8 text-primary mb-4" />
              <blockquote className="text-xl italic text-foreground">
                &quot;Quality is not an act, it is a habit. For us, it&apos;s a
                promise. A promise to our partners that every connection made
                through ANTGEC is one they can trust implicitly.&quot;
              </blockquote>
              <p className="text-right mt-4 font-semibold text-muted-foreground">
                - The ANTGEC Commitment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vetting Process Section */}
      <section className="py-16 md:py-24 bg-primary/10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Our Rigorous Vetting Process
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Every agent in the ANTGEC network undergoes a multi-stage
              screening process to verify their professionalism, ethics, and
              performance.
            </p>
          </div>
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="space-y-12 relative ">
              <VettingStepCard
                stepNumber={1}
                title="Comprehensive Application & Screening"
              >
                Agents begin with a detailed application covering their business
                history, operational model, and recruitment practices. Our team
                conducts an initial screening to ensure alignment with our core
                criteria.
              </VettingStepCard>
              <VettingStepCard
                stepNumber={2}
                title="Business Verification & Reference Checks"
              >
                We conduct thorough due diligence, including verifying business
                registration and checking multiple references from educational
                institutions they have previously worked with.
              </VettingStepCard>
              <VettingStepCard
                stepNumber={3}
                title="Ethical Standards & Code of Conduct"
              >
                Approved agents must formally agree to the ANTGEC Code of
                Conduct, which outlines our strict ethical guidelines on
                transparency, student welfare, and professional integrity.
              </VettingStepCard>
              <VettingStepCard
                stepNumber={4}
                title="Ongoing Performance Monitoring"
              >
                Our commitment to quality is continuous. We monitor agent
                performance, gather feedback from institutions, and provide
                ongoing training to ensure standards are consistently met.
              </VettingStepCard>
            </div>
          </div>
        </div>
      </section>

      {/* The ANTGEC Standard Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              The ANTGEC Certified Agent Standard
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              An agent who meets our standard is a trusted professional defined
              by three core pillars.
            </p>
          </div>
          <div className="mt-16 grid sm:grid-cols-1 lg:grid-cols-3 gap-8">
            <StandardPillarCard
              icon={<ShieldCheck className="w-10 h-10" />}
              title="Proven Integrity"
            >
              Demonstrates a track record of ethical recruitment and transparent
              communication with both students and institutions.
            </StandardPillarCard>
            <StandardPillarCard
              icon={<Award className="w-10 h-10" />}
              title="Professional Excellence"
            >
              Maintains a high level of industry knowledge, provides outstanding
              support, and achieves consistent, positive results.
            </StandardPillarCard>
            <StandardPillarCard
              icon={<Users className="w-10 h-10" />}
              title="Student-Centric Focus"
            >
              Prioritizes the best interests and welfare of students, providing
              accurate guidance and support throughout their journey.
            </StandardPillarCard>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 md:py-28 text-center bg-gradient-to-t from-primary/10 to-transparent">
        <div className="container mx-auto px-4">
          <Briefcase className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Partner with Confidence
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Whether you&apos;re an institution seeking reliable growth or a
            top-tier agent looking for new opportunities, our commitment to
            quality is your assurance of success.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/contact" className="hover:cursor-pointer">
              <Button className="hover:cursor-pointer">Become a Partner</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
