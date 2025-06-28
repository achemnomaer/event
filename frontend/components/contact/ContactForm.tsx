/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
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
import { useSubmitContactFormMutation } from "@/store/services/contactApi";
import {
  contactFormSchema,
  type ContactFormValues,
} from "@/lib/schemas/contact";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [submitContactForm] = useSubmitContactFormMutation();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      organization: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);

    try {
      const result = await submitContactForm(data).unwrap();
      toast.success(
        result.message ||
          "Your message has been sent! We'll get back to you soon."
      );
      form.reset();
      setCurrentStep(1);
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast.error(
        error.data?.error ||
          "There was a problem sending your message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleNextStep = async () => {
    const isValid = await form.trigger(["name", "email", "subject"]);
    if (isValid) setCurrentStep(2);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Step indicator */}
      <div className="flex items-center justify-center mb-10">
        <div className="relative flex items-center">
          <div
            className={`h-10 w-10 rounded-full flex items-center justify-center ${
              currentStep >= 1
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            1
          </div>
          <div className="w-20 h-0.5 mx-2 bg-primary"></div>
          <div
            className={`h-10 w-10 rounded-full flex items-center justify-center ${
              currentStep >= 2
                ? "bg-primary text-primary-foreground"
                : "border border-muted-foreground/30 text-muted-foreground"
            }`}
          >
            2
          </div>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {currentStep === 1 ? (
            <>
              <div>
                <h2 className="text-2xl font-bold mb-6">Your Details</h2>
                <p className="text-muted-foreground mb-6">
                  All fields marked with * must be filled in.
                </p>
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your full name"
                        autoComplete="name"
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
                    <FormLabel>Email*</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        autoComplete="email"
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
                    <FormLabel>Telephone Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your phone number"
                        autoComplete="tel"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="organization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organization</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your organization"
                        autoComplete="organization"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter message subject"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button type="button" onClick={handleNextStep}>
                  Next
                </Button>
              </div>
            </>
          ) : (
            <>
              <div>
                <h2 className="text-2xl font-bold mb-6">Your Message</h2>
                <p className="text-muted-foreground mb-6">
                  Please tell us how we can help you.
                </p>
              </div>

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message*</FormLabel>
                    <FormControl>
                      <Textarea
                        key="message-textarea"
                        placeholder="Enter your message"
                        className="min-h-[200px]"
                        autoComplete="off"
                        value={form.watch("message") || ""}
                        onChange={(e) =>
                          form.setValue("message", e.target.value)
                        }
                        onBlur={field.onBlur}
                        name="contact-message"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(1)}
                >
                  Back
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            </>
          )}
        </form>
      </Form>
    </div>
  );
}
