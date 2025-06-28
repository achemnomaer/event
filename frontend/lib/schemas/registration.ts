import { z } from "zod";

export const personalInfoSchema = z.object({
  gender: z.enum(["male", "female", "non-binary", "prefer-not-to-say"], {
    required_error: "Please select a gender",
  }),
  salutation: z.enum(["Mr", "Ms", "Mx", "Dr", "Prof", "Prof. Dr"], {
    required_error: "Please select a salutation",
  }),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phoneNumber: z.string().min(5, "Please enter a valid phone number"),
});

export const participantSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phoneNumber: z
    .string()
    .min(5, "Please enter a valid phone number")
    .optional()
    .or(z.literal("")),
});

export const consultancyOrganizationSchema = z.object({
  organizationName: z.string().optional(),
  website: z.string().optional(),
  address: z.string().optional(),
});

export const eventsSelectionSchema = z.object({
  selectedEvents: z
    .array(z.string())
    .min(1, "Please select at least one event"),
});

export const groupParticipantsSchema = z.object({
  participants: z.array(participantSchema).optional(),
});

export const consultancyFormSchema = z.object({
  personalInfo: personalInfoSchema,
  organizationInfo: consultancyOrganizationSchema,
  events: eventsSelectionSchema,
  groupParticipants: groupParticipantsSchema,
});

export const studentGuestFormSchema = z.object({
  personalInfo: personalInfoSchema,
  events: eventsSelectionSchema,
  groupParticipants: groupParticipantsSchema,
});

export type PersonalInfoValues = z.infer<typeof personalInfoSchema>;
export type ParticipantValues = z.infer<typeof participantSchema>;
export type ConsultancyOrganizationValues = z.infer<
  typeof consultancyOrganizationSchema
>;
export type EventsSelectionValues = z.infer<typeof eventsSelectionSchema>;
export type GroupParticipantsValues = z.infer<typeof groupParticipantsSchema>;
export type ConsultancyFormValues = z.infer<typeof consultancyFormSchema>;
export type StudentGuestFormValues = z.infer<typeof studentGuestFormSchema>;
