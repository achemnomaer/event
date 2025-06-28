"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { offices } from "@/lib/data/offices";

export default function OfficesList() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {offices.map((office) => (
          <div
            key={office.id}
            className="border rounded-lg overflow-hidden bg-card shadow-sm"
          >
            {/* Map Image */}
            <div className="relative h-[200px]">
              <Image
                src={office.mapImage || "/placeholder.svg"}
                alt={`Map location for ${office.title}`}
                fill
                className="object-cover"
              />
            </div>

            {/* Office Details */}
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">{office.title}</h3>

              <div className="space-y-3 mb-6">
                <div>
                  <div className="text-muted-foreground text-sm mb-1">
                    Telephone:
                  </div>
                  <p className="font-medium">
                    <Link
                      href={`tel:${office.phone.replace(/\s/g, "")}`}
                      className="text-primary hover:underline"
                    >
                      {office.phone}
                    </Link>
                  </p>
                </div>

                <div>
                  <div className="text-muted-foreground text-sm mb-1">
                    Email:
                  </div>
                  <p className="font-medium">
                    <Link
                      href={`mailto:${office.email}`}
                      className="text-primary hover:underline"
                    >
                      {office.email}
                    </Link>
                  </p>
                </div>
              </div>

              <div className="flex gap-4 flex-col">
                <Button variant="outline" asChild className="w-full">
                  <Link
                    href={office.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on Map
                  </Link>
                </Button>
                <Button asChild className="w-full">
                  <Link href="/contact?tab=contact-form">Contact</Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
