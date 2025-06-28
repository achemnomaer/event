import { z } from "zod";

export const courseEnrollmentSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(5, "Please enter a valid phone number"),
  organization: z.string().optional(),
  jobTitle: z.string().optional(),
  courseId: z.number(),
  courseTitle: z.string(),
  additionalComments: z.string().optional(),
});

export type CourseEnrollmentValues = z.infer<typeof courseEnrollmentSchema>;
