/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";

import {
  courseEnrollmentSchema,
  type CourseEnrollmentValues,
} from "@/lib/schemas/course-enrollment";
import { useSubmitCourseEnrollmentMutation } from "@/store/services/coursesApi";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Course {
  id: number;
  title: string;
  duration: string;
  price: number;
  discountPrice?: number;
}

export default function CourseEnrollmentForm({ course }: { course: Course }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitCourseEnrollment] = useSubmitCourseEnrollmentMutation();

  const defaultValues: CourseEnrollmentValues = {
    fullName: "",
    email: "",
    phone: "",
    organization: "",
    jobTitle: "",
    courseId: course.id,
    courseTitle: course.title,
    additionalComments: "",
  };

  const form = useForm<CourseEnrollmentValues>({
    resolver: zodResolver(courseEnrollmentSchema),
    defaultValues,
  });

  async function onSubmit(data: CourseEnrollmentValues) {
    setIsSubmitting(true);
    try {
      const result = await submitCourseEnrollment(data).unwrap();
      toast.success(result.message || "Enrollment successful!");
      router.push("/courses/enrollment-success");
    } catch (error: any) {
      console.error("Submission error:", error);
      toast.error(error.message || "Enrollment failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <div className="mb-8">
        <Link
          href={`/courses/${course.title.toLowerCase().replace(/\s+/g, "-")}`}
          className="flex items-center text-primary hover:underline"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to course details
        </Link>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Left: Course Summary */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-4">
            Enroll in Course
          </h1>
          <p className="text-muted-foreground mb-6">
            Complete the form below to enroll in{" "}
            <span className="font-medium">{course.title}</span>.
          </p>

          <Card className="bg-primary/5 border-primary/20 mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Course Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Course:</span>
                  <span className="font-medium">{course.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration:</span>
                  <span>{course.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Level:</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price:</span>
                  <span>
                    {course.discountPrice ? (
                      <>
                        <span className="text-muted-foreground line-through mr-2">
                          ${course.price}
                        </span>
                        <span className="font-medium">
                          ${course.discountPrice}
                        </span>
                      </>
                    ) : (
                      <span className="font-medium">${course.price}</span>
                    )}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Form */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Enrollment Form</CardTitle>
              <CardDescription>
                Please provide your information to enroll
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your full name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter your email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your phone number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="organization"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Organization (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Your organization" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="jobTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job Title (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Your job title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="additionalComments"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Comments (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any specific questions or requirements"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Submit Enrollment"
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-6 text-center text-sm text-muted-foreground">
              <p>
                By enrolling, you agree to our{" "}
                <Link
                  href="/terms-conditions"
                  className="text-primary hover:underline"
                >
                  Terms & Conditions
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
