"use client";

import { useGetAllCoursesQuery } from "@/store/services/coursesApi";
import CourseCard from "@/components/courses/CourseCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function CoursesPage() {
  const { data: courses, isLoading, error } = useGetAllCoursesQuery();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <Skeleton className="h-12 w-64 mx-auto mb-4" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Error Loading Courses
          </h1>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Professional Development Courses
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Enhance your expertise in international education with our
          comprehensive online courses designed for industry professionals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses?.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {courses?.length === 0 && (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">No Courses Available</h2>
          <p className="text-gray-600">Check back soon for new courses!</p>
        </div>
      )}
    </div>
  );
}
