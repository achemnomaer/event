/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createClient } from "@/lib/supabase/client";
import type { CourseEnrollmentValues } from "@/lib/schemas/course-enrollment";

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  topics: string[];
  order_index: number;
}

export interface CourseFAQ {
  id: string;
  question: string;
  answer: string;
  order_index: number;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  long_description: string[];
  image_url: string | null;
  duration: string;
  price: number;
  discount_price?: number | null;
  features: string[];
  learning_outcomes: string[];
  course_modules: CourseModule[];
  course_faqs: CourseFAQ[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface MessageResponse {
  message: string;
}

export const coursesApi = createApi({
  reducerPath: "coursesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/courses",
  }),
  tagTypes: ["Courses", "Course", "Enrollment"],
  endpoints: (builder) => ({
    getAllCourses: builder.query<Course[], void>({
      queryFn: async () => {
        try {
          const supabase = createClient();

          const { data: courses, error } = await supabase
            .from("courses")
            .select(
              `
              *,
              course_modules (*),
              course_faqs (*)
            `
            )
            .eq("is_active", true)
            .order("created_at", { ascending: false });

          if (error) throw error;

          return { data: courses || [] };
        } catch (error: any) {
          return {
            error: {
              status: "CUSTOM_ERROR",
              error: error.message || "An unknown error occurred",
              data: null,
            },
          };
        }
      },
      providesTags: [{ type: "Courses", id: "LIST" }],
    }),

    getCourseBySlug: builder.query<Course, string>({
      queryFn: async (slug) => {
        try {
          const supabase = createClient();

          const { data: course, error } = await supabase
            .from("courses")
            .select(
              `
              *,
              course_modules (*),
              course_faqs (*)
            `
            )
            .eq("slug", slug)
            .eq("is_active", true)
            .single();

          if (error) throw error;

          return { data: course };
        } catch (error: any) {
          return {
            error: {
              status: "CUSTOM_ERROR",
              error: error.message || "An unknown error occurred",
              data: null,
            },
          };
        }
      },
      providesTags: (result, error, slug) => [{ type: "Course", id: slug }],
    }),

    submitCourseEnrollment: builder.mutation<
      MessageResponse,
      CourseEnrollmentValues
    >({
      queryFn: async (data) => {
        try {
          const supabase = createClient();

          const { error } = await supabase.from("course_enrollments").insert({
            course_id: data.courseId,
            full_name: data.fullName,
            email: data.email,
            phone: data.phone,
            organization: data.organization || null,
            job_title: data.jobTitle || null,
            course_title: data.courseTitle,
            additional_comments: data.additionalComments || null,
          });

          if (error) throw error;

          return {
            data: {
              message: "Enrollment submitted successfully",
            },
          };
        } catch (error: any) {
          return {
            error: {
              status: "CUSTOM_ERROR",
              error: error.message || "An unknown error occurred",
              data: null,
            },
          };
        }
      },
      invalidatesTags: [{ type: "Enrollment", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllCoursesQuery,
  useGetCourseBySlugQuery,
  useSubmitCourseEnrollmentMutation,
} = coursesApi;
