/* eslint-disable @typescript-eslint/no-explicit-any */
import { AccordionContent } from "@/components/ui/accordion"
import { User, Building, Users, Calendar, MapPin, Mail, Phone } from "lucide-react"
import { formatEventDateRange, formatCurrency } from "@/lib/utils"

interface RegistrationDetailsProps {
  registration: any
  registeredEvents: any[]
}

export function RegistrationDetails({ registration, registeredEvents }: RegistrationDetailsProps) {
  return (
    <AccordionContent className="space-y-4">
      {/* Personal Information */}
      {registration.personal_info && (
        <div>
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <User className="w-4 h-4" />
            Personal Information
          </h4>
          <div className="grid sm:grid-cols-2 gap-3 text-sm bg-muted/30 p-3 rounded-lg">
            <div>
              <span className="text-muted-foreground">Name:</span>
              <span className="ml-2 font-medium">
                {registration.personal_info.salutation} {registration.personal_info.firstName}{" "}
                {registration.personal_info.lastName}
              </span>
            </div>
            {registration.personal_info.email && (
              <div className="flex items-center gap-1">
                <Mail className="w-3 h-3 text-muted-foreground" />
                <span className="text-muted-foreground">Email:</span>
                <span className="ml-1">{registration.personal_info.email}</span>
              </div>
            )}
            {registration.personal_info.phoneNumber && (
              <div className="flex items-center gap-1">
                <Phone className="w-3 h-3 text-muted-foreground" />
                <span className="text-muted-foreground">Phone:</span>
                <span className="ml-1">{registration.personal_info.phoneNumber}</span>
              </div>
            )}
            {registration.personal_info.gender && (
              <div>
                <span className="text-muted-foreground">Gender:</span>
                <span className="ml-2">{registration.personal_info.gender}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Organization Information */}
      {registration.organization_info && (
        <div>
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <Building className="w-4 h-4" />
            Organization Information
          </h4>
          <div className="grid sm:grid-cols-2 gap-3 text-sm bg-muted/30 p-3 rounded-lg">
            {registration.organization_info.organizationName && (
              <div>
                <span className="text-muted-foreground">Organization:</span>
                <span className="ml-2 font-medium">{registration.organization_info.organizationName}</span>
              </div>
            )}
            {registration.organization_info.address && (
              <div>
                <span className="text-muted-foreground">Address:</span>
                <span className="ml-2">{registration.organization_info.address}</span>
              </div>
            )}
            {registration.organization_info.website && (
              <div className="sm:col-span-2">
                <span className="text-muted-foreground">Website:</span>
                <a
                  href={registration.organization_info.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-primary hover:underline"
                >
                  {registration.organization_info.website}
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Group Participants */}
      {registration.group_participants && registration.group_participants.length > 0 && (
        <div>
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <Users className="w-4 h-4" />
            Group Participants ({registration.group_participants.length})
          </h4>
          <div className="space-y-2">
            {registration.group_participants.map((participant: any, index: number) => (
              <div key={index} className="text-sm bg-muted/30 p-3 rounded-lg">
                <div className="grid sm:grid-cols-2 gap-2">
                  <div>
                    <span className="text-muted-foreground">Name:</span>
                    <span className="ml-2 font-medium">
                      {participant.firstName} {participant.lastName}
                    </span>
                  </div>
                  {participant.email && (
                    <div>
                      <span className="text-muted-foreground">Email:</span>
                      <span className="ml-2">{participant.email}</span>
                    </div>
                  )}
                  {participant.phoneNumber && (
                    <div className="sm:col-span-2">
                      <span className="text-muted-foreground">Phone:</span>
                      <span className="ml-2">{participant.phoneNumber}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Registered Events */}
      {registeredEvents.length > 0 && (
        <div>
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Registered Events ({registeredEvents.length})
          </h4>
          <div className="space-y-2">
            {registeredEvents.map((event: any) => (
              <div
                key={event.id}
                className="flex flex-col lg:flex-row lg:items-center justify-between p-3 border rounded-lg bg-muted/30 gap-2"
              >
                <div className="space-y-1">
                  <h5 className="font-medium text-sm lg:text-base">{event.title}</h5>
                  <div className="flex flex-wrap items-center gap-4 text-xs lg:text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatEventDateRange(event.start_date, event.end_date)}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {event.location}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-sm lg:text-base">{formatCurrency(event.price)}</div>
                  <div className="text-xs text-muted-foreground">per person</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </AccordionContent>
  )
}
