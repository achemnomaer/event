"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  CheckCircle,
  Star,
} from "lucide-react";
import { formatCurrency, formatEventDateRange } from "@/lib/utils";
import type { Event } from "@/lib/types/events";

interface DetailProps {
  event: Event;
}

export default function Detail({ event }: DetailProps) {
  const isEarlyBird =
    event.early_bird_date && new Date(event.early_bird_date) >= new Date();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative min-h-[400px] h-[70vh] md:h-[60vh] w-full">
        <Image
          src={event.image || "/placeholder.svg?height=600&width=1200"}
          alt={event.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl text-white">
              {isEarlyBird && (
                <Badge className="mb-4 bg-green-600 hover:bg-green-700 text-white">
                  <Star className="w-4 h-4 mr-1" />
                  Early Bird Special - {event.early_bird_discount_percent}% Off
                </Badge>
              )}
              <h1 className="text-2xl md:text-4xl font-bold mb-4">
                {event.title}
              </h1>
              {event.short_description && (
                <p className="text-lg md:text-xl text-gray-200 mb-6">
                  {event.short_description}
                </p>
              )}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>
                    {formatEventDateRange(event.start_date, event.end_date)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span>{event.location}</span>
                </div>
              </div>

              <Button asChild size="lg" className="mt-6">
                <Link href={`/event-registration?event=${event.id}`}>
                  Register Now
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event Description */}
            {event.long_description && (
              <Card>
                <CardHeader>
                  <CardTitle>About This Event</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-gray max-w-none dark:prose-invert">
                    <p className="whitespace-pre-wrap">
                      {event.long_description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Event Highlights */}
            {event.highlights && event.highlights.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Event Highlights</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {event.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Who Should Attend */}
            {event.who_attends && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Who Should Attend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-wrap">{event.who_attends}</p>
                </CardContent>
              </Card>
            )}

            {/* Event Programme */}
            {event.event_programme && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Event Programme
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-gray max-w-none dark:prose-invert">
                    <p className="whitespace-pre-wrap">
                      {event.event_programme}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Immigration Invitation Note */}
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200 shadow-sm">
              <div className="flex items-start gap-3">
                <span>
                  <CheckCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                </span>
                <div>
                  <div className="font-medium text-yellow-900">
                    Immigration Invitation Letter
                  </div>
                  <p className="text-sm text-yellow-800 mt-1">
                    International participants will receive an official{" "}
                    <span className="font-semibold">
                      Immigration Invitation Letter
                    </span>{" "}
                    to support visa applications.
                  </p>
                </div>
              </div>
            </div>
            {/* Registration Card */}
            <Card className="">
              <CardHeader>
                <CardTitle>Registration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {formatCurrency(event.price, event.currency)}
                  </div>
                  <p className="text-muted-foreground">per person</p>
                </div>

                {isEarlyBird && (
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 text-green-800 font-medium mb-1">
                      <Star className="h-4 w-4" />
                      Early Bird Discount
                    </div>
                    <p className="text-sm text-green-700">
                      Save {event.early_bird_discount_percent}% when you
                      register before{" "}
                      {new Date(event.early_bird_date!).toLocaleDateString()}
                    </p>
                  </div>
                )}

                <div className="space-y-3">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-blue-800 font-medium mb-1">
                      Student Discount Available
                    </div>
                    <p className="text-sm text-blue-700">
                      Students get {event.student_discount_percent}% off
                      registration
                    </p>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="text-purple-800 font-medium mb-1">
                      Multi-Event Discount
                    </div>
                    <p className="text-sm text-purple-700">
                      Register for multiple events and save{" "}
                      {event.multi_event_discount_percent}%
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Button asChild size="lg" className="w-full">
                    <Link href={`/event-registration?event=${event.id}`}>
                      Register Now
                    </Link>
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    Secure registration with flexible payment options
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Event Details */}
            <Card>
              <CardHeader>
                <CardTitle>Event Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="font-medium">Date</div>
                    <div className="text-sm text-muted-foreground">
                      {formatEventDateRange(event.start_date, event.end_date)}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="font-medium">Location</div>
                    <div className="text-sm text-muted-foreground">
                      {event.location}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
