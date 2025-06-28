import Image from "next/image";
import { Clock, BookOpen } from "lucide-react";
import Container from "@/components/Container";
import type { Course } from "@/lib/data/courses";

interface CourseHeroProps {
  course: Course;
}

export default function CourseHero({ course }: CourseHeroProps) {
  return (
    <div className="bg-green-600 text-white py-12 md:py-16 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
      </div>

      <Container>
        <div className="grid gap-8 md:grid-cols-2 relative z-10">
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
              {course.title}
            </h1>
            <p className="text-xl text-gray-200 mb-6">{course.subtitle}</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-gray-300" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-gray-300" />
                <span>{course.modules.length} Modules</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {course.discountPrice ? (
                <>
                  <span className="text-3xl font-bold">
                    ${course.discountPrice}
                  </span>
                  <span className="text-xl text-gray-300 line-through">
                    ${course.price}
                  </span>
                </>
              ) : (
                <span className="text-3xl font-bold">${course.price}</span>
              )}
            </div>
          </div>

          <div className="relative h-[300px] overflow-hidden rounded-xl md:h-[400px]">
            <Image
              src={course.image || "/placeholder.svg"}
              alt={course.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
