import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin } from "lucide-react";
import { formatCurrency, formatEventDateRange } from "@/lib/utils";
import type { Event } from "@/lib/types/events";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const isEarlyBird =
    event.early_bird_date && new Date(event.early_bird_date) >= new Date();

  // Calculate discounted price
  const discountedPrice = isEarlyBird
    ? event.price * (1 - (event.early_bird_discount_percent || 0) / 100)
    : event.price;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow pt-0">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={event.image || "/placeholder.svg?height=200&width=400"}
            alt={event.title}
            fill
            className="object-cover"
          />
          {isEarlyBird && (
            <Badge className="absolute top-3 left-3 bg-green-600 hover:bg-green-700">
              Early Bird {event.early_bird_discount_percent}% Off
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold line-clamp-2">
              {event.title}
            </h3>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>
                {formatEventDateRange(event.start_date, event.end_date)}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{event.location}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              {isEarlyBird ? (
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-semibold text-primary">
                      {formatCurrency(discountedPrice, event.currency)}
                    </span>
                    <span className="text-sm text-muted-foreground line-through">
                      {formatCurrency(event.price, event.currency)}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    per person
                  </span>
                </div>
              ) : (
                <div>
                  <span className="text-xl font-semibold text-primary">
                    {formatCurrency(event.price, event.currency)}
                  </span>
                  <span className="text-sm text-muted-foreground ml-1">
                    per person
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="">
        <Button asChild className="w-full">
          <Link href={`/events/${event.slug}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
