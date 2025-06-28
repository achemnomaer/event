import React from "react";
import {
  Building,
  Globe,
  Handshake,
  Lightbulb,
  Users,
  Target,
  ShieldCheck,
  Star,
  Briefcase,
  Cpu,
  Layers,
  CheckCircle2,
} from "lucide-react";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - International Education Conference Management",
  description:
    "Professional international education conference management services. Connecting institutions, consultants, and students through expertly organized events.",
};

// Shared props type for card components
type CardProps = {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
};

// Helper component for "Our Approach" cards
const ApproachCard: React.FC<CardProps> = ({ icon, title, children }) => (
  <div className="bg-card border border-transparent hover:border-primary/50 p-8 rounded-2xl shadow-sm hover:shadow-primary/10 transition-all duration-300">
    <div className="bg-primary/10 text-primary p-3 rounded-xl w-max mb-5">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-card-foreground mb-3">{title}</h3>
    <p className="text-muted-foreground leading-relaxed">{children}</p>
  </div>
);

// Helper component for "Our Values" cards
const ValueCard: React.FC<CardProps> = ({ icon, title, children }) => (
  <div className="bg-card rounded-2xl p-6 text-center flex flex-col items-center transform hover:-translate-y-2 transition-transform duration-300">
    <div className="bg-primary/10 p-4 rounded-full mb-5 ring-4 ring-primary/5">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-card-foreground mb-2">{title}</h3>
    <p className="text-muted-foreground">{children}</p>
  </div>
);

// Main About Page Component
export default function AboutPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero section */}
      <div className="bg-background py-16 md:py-24 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-60 -left-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        </div>

        <Container>
          <div className="relative z-10">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-primary">
              Connecting Futures, Globally.
            </h1>
            <p className="mt-6 text-muted-foreground max-w-2xl md:text-lg">
              ANTGEC is the premier nexus for international student recruitment,
              forging powerful connections between vetted student recruitment
              agents and leading educational institutions worldwide.
            </p>

            <div className="mt-8 flex  gap-4">
              <div className="h-1 w-20 bg-gradient-to-r from-primary/80 to-transparent rounded-full" />
              <div className="h-2 w-2 rounded-full bg-primary" />
              <div className="h-1 w-20 bg-gradient-to-l from-primary/80 to-transparent rounded-full" />
            </div>
          </div>
        </Container>
      </div>

      {/* Our Mission & Vision Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-5 gap-8 md:gap-16 items-center">
            <div className="md:col-span-2 prose prose-lg dark:prose-invert max-w-none">
              <h2 className="text-3xl font-bold tracking-tight">
                Our Foundation: Mission & Vision
              </h2>
              <p className="text-muted-foreground">
                Launched with a vision to redefine international education,
                ANTGEC is founded on creating a transparent, efficient, and
                trusted ecosystem for students, agents, and institutions.
              </p>
            </div>
            <div className="md:col-span-3 space-y-8">
              <div className="bg-card p-8 rounded-xl border border-border flex items-start gap-6">
                <div className="bg-primary/10 p-3 rounded-full mt-1">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-card-foreground">
                    Our Mission
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    To build the world’s most reliable network of educational
                    agents and institutions, fostering ethical practices and
                    creating life-changing opportunities for students through
                    unparalleled support and innovative solutions.
                  </p>
                </div>
              </div>
              <div className="bg-card p-8 rounded-xl border border-border flex items-start gap-6">
                <div className="bg-primary/10 p-3 rounded-full mt-1">
                  <Lightbulb className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-card-foreground">
                    Our Vision
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    To be the undisputed global leader in education networking,
                    recognized for our commitment to quality, integrity, and the
                    transformative power of connecting cultures through
                    learning.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              A Modern Approach
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We&apos;re building the future of education recruitment by
              focusing on what truly matters.
            </p>
          </div>
          <div className="mt-16 grid sm:grid-cols-1 lg:grid-cols-3 gap-8">
            <ApproachCard
              icon={<Cpu className="w-8 h-8" />}
              title="Technology-Driven"
            >
              We harness the power of a modern, intuitive platform to streamline
              connections, applications, and communication, making the entire
              process seamless.
            </ApproachCard>
            <ApproachCard
              icon={<Layers className="w-8 h-8" />}
              title="Absolute Transparency"
            >
              Clarity is key. We provide clear insights, fair agreements, and
              open channels of communication for both institutions and agents.
            </ApproachCard>
            <ApproachCard
              icon={<Handshake className="w-8 h-8" />}
              title="Tailored Partnerships"
            >
              One size doesn&apos;t fit all. We focus on creating bespoke
              strategies and fostering relationships that align with the unique
              goals of each partner.
            </ApproachCard>
          </div>
        </div>
      </section>

      {/* Why Partner With Us Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Why Partner With Us?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Joining ANTGEC means becoming part of a forward-thinking network
              dedicated to mutual growth and success.
            </p>
          </div>
          <div className="mt-16 grid md:grid-cols-2 gap-8">
            <div className="bg-card p-8 rounded-2xl border border-border">
              <h3 className="text-2xl font-semibold mb-6 text-primary flex items-center gap-3">
                <Building className="w-7 h-7" /> For Institutions
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  Access a curated, growing network of pre-vetted, high-quality
                  recruitment agents.
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  Enhance your global reach and diversify your student body with
                  targeted strategies.
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  Benefit from a streamlined, transparent process that saves
                  time and resources.
                </li>
              </ul>
            </div>
            <div className="bg-card p-8 rounded-2xl border border-border">
              <h3 className="text-2xl font-semibold mb-6 text-primary flex items-center gap-3">
                <Users className="w-7 h-7" /> For Agents
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  Gain access to a portfolio of reputable international
                  educational institutions.
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  Utilize our modern platform for easy application tracking and
                  management.
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  Receive dedicated support and resources to grow your business
                  with confidence.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Our Unshakable Core
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              The principles that anchor our decisions and define our character.
            </p>
          </div>
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <ValueCard
              icon={<ShieldCheck className="w-9 h-9 text-primary" />}
              title="Integrity"
            >
              We operate with unwavering honesty, ensuring every partnership is
              built on a foundation of trust.
            </ValueCard>
            <ValueCard
              icon={<Star className="w-9 h-9 text-primary" />}
              title="Excellence"
            >
              We are relentless in our pursuit of quality, from the agents we
              vet to the support we provide.
            </ValueCard>
            <ValueCard
              icon={<Globe className="w-9 h-9 text-primary" />}
              title="Global Mindset"
            >
              We believe in the power of partnership, working together to
              achieve shared goals across borders.
            </ValueCard>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 md:py-28 text-center bg-gradient-to-t from-primary/10 to-transparent">
        <div className="container mx-auto px-4">
          <Briefcase className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Join Our Global Network
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Become a part of the new standard in international education.
            Let&apos;s connect and shape the future, together.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/contact">
              <Button>Contact Us Today</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
