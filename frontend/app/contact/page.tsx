"use client";

import { useState } from "react";
import Image from "next/image";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Container from "@/components/Container";
import ContactForm from "@/components/contact/ContactForm";
import { Mail, MapPin } from "lucide-react";

const officesData = [
  {
    id: "headquarters",
    title: "ANTGEC Main Office",
    region: "Headquarters",
    isHeadquarters: true,
    address: "Rua Antero de Quental 15, 1º Esq., 1150-041 Lisbon, Portugal",
    email: "info@antgec.com",
    image: "/offices/main-office.png",
  },
  {
    id: "canada",
    title: "ANTGEC Canada",
    region: "Canada",
    isHeadquarters: false,
    email: "canada@antgec.com",
    image: "/offices/canada.png",
  },
  {
    id: "france",
    title: "ANTGEC France",
    region: "France",
    isHeadquarters: false,
    email: "france@antgec.com",
    image: "/offices/france.png",
  },
  {
    id: "uk",
    title: "ANTGEC UK",
    region: "United Kingdom",
    isHeadquarters: false,
    email: "uk@antgec.com",
    image: "/offices/uk.png",
  },
  {
    id: "malta",
    title: "ANTGEC Malta",
    region: "Malta",
    isHeadquarters: false,
    email: "malta@antgec.com",
    image: "/offices/malta.png",
  },
  {
    id: "spain",
    title: "ANTGEC Spain",
    region: "Spain",
    isHeadquarters: false,
    email: "spain@antgec.com",
    image: "/offices/spain.png",
  },

  {
    id: "china",
    title: "ANTGEC China",
    region: "China",
    isHeadquarters: false,
    email: "china@antgec.com",
    image: "/offices/china.png",
  },
];

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState("contact-form");
  const headquarters = officesData.find((o) => o.isHeadquarters);
  const regionalOffices = officesData.filter((o) => !o.isHeadquarters);

  const getHeaderContent = () =>
    activeTab === "offices"
      ? {
          title: "Our Offices",
          description:
            "With a team of international education experts around the world, we're able to give you support specific to your region of interest. Get in touch to see how we can help.",
        }
      : {
          title: "Contact us",
          description:
            "Please complete this form and an ANTGEC team member in your region will get back to you shortly.",
        };

  const headerContent = getHeaderContent();

  return (
    <div className="min-h-screen">
      <div className="bg-background py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-60 -left-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        </div>

        <Container>
          <div className="relative z-10 max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">{headerContent.title}</h1>
            <p className="text-xl text-foreground/80 mb-8">
              {headerContent.description}
            </p>
            <Tabs
              defaultValue="contact-form"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full max-w-md grid-cols-2 bg-muted">
                <TabsTrigger value="contact-form">Get in Touch</TabsTrigger>
                <TabsTrigger value="offices">Our Offices</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-12">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsContent value="contact-form">
              <ContactForm />
            </TabsContent>

            <TabsContent value="offices">
              <div className="space-y-16">
                {headquarters && (
                  <div className="bg-card rounded-2xl shadow-md overflow-hidden max-w-4xl">
                    <div className="grid md:grid-cols-2">
                      <div className="relative h-64 md:h-full">
                        <Image
                          src={headquarters.image}
                          alt={headquarters.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-8 space-y-4">
                        <h3 className="text-2xl font-bold">
                          {headquarters.title}
                        </h3>
                        <div className="text-muted-foreground flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-primary mt-1" />
                          <div>
                            <p>{headquarters.address}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-muted-foreground">
                          <Mail className="w-5 h-5 text-primary" />
                          <a
                            href={`mailto:${headquarters.email}`}
                            className="text-primary hover:underline"
                          >
                            {headquarters.email}
                          </a>
                        </div>
                        <Button onClick={() => setActiveTab("contact-form")}>
                          Contact Headquarters
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <h2 className="text-2xl font-semibold mb-8">
                    Regional Offices
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {regionalOffices.map((office) => (
                      <div
                        key={office.id}
                        className="bg-card rounded-xl shadow"
                      >
                        <div className="relative h-48">
                          <Image
                            src={office.image}
                            alt={office.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute bottom-2 left-2 text-white font-semibold text-sm bg-black/50 px-2 py-0.5 rounded">
                            {office.region}
                          </div>
                        </div>
                        <div className="p-5 space-y-2">
                          <h4 className="text-lg font-semibold">
                            {office.title}
                          </h4>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Mail className="w-4 h-4 text-primary" />
                            <a
                              href={`mailto:${office.email}`}
                              className="text-primary hover:underline"
                            >
                              {office.email}
                            </a>
                          </div>
                          <Button
                            onClick={() => setActiveTab("contact-form")}
                            className="w-full mt-2"
                          >
                            Contact
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Container>
    </div>
  );
}
