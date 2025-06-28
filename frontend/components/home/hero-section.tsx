"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useGetFeaturedEventsQuery } from "@/store/services/eventsApi";
import heroImg from "@/assets/hero.jpg";

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { data: events, isLoading } = useGetFeaturedEventsQuery(2);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative overflow-hidden bg-background py-20 md:py-28 lg:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />

      <div className="max-w-7xl relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
            >
              Join the World&apos;s Leading{" "}
              <span className="text-primary">Education</span> Conferences
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={isLoaded ? { opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-4 text-xl text-muted-foreground"
            >
              Connect with international education leaders, explore
              institutional partnerships, and gain insights into the latest
              mobility trends, policy changes, and student recruitment
              strategies.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isLoaded ? { opacity: 1 } : {}}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="mt-8 flex flex-col gap-4 sm:flex-row"
            >
              <Button asChild size="lg">
                <Link href="/register">
                  Register Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/events">Explore Events</Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative mx-auto max-w-lg lg:mx-0"
          >
            <div className="relative rounded-xl bg-white/50 p-2 shadow-lg backdrop-blur-sm dark:bg-black/20">
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src={heroImg || "/placeholder.svg"}
                  alt="Education Conference"
                  className="object-cover"
                  priority
                />
              </div>

              <div className="absolute -bottom-10 -right-6 w-full max-w-xs rounded-lg border bg-background p-4 shadow-lg">
                <h3 className="font-semibold">Upcoming Events</h3>
                <div className="mt-3 space-y-3">
                  {isLoading ? (
                    <div className="text-sm text-muted-foreground">
                      Loading events...
                    </div>
                  ) : events && events.length > 0 ? (
                    events.slice(0, 2).map((event) => (
                      <Link
                        key={event.id}
                        href={`/events/${event.slug}`}
                        className="flex items-start gap-3 rounded-md p-2 transition-colors hover:bg-muted"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <Calendar className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium line-clamp-1">
                            {event.title}
                          </h4>
                          <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" /> {event.location}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="text-sm text-muted-foreground">
                      No events available
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
