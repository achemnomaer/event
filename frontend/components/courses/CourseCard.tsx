import Image from "next/image";
import Link from "next/link";
import { Clock, BookOpen, Award } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Course } from "@/store/services/coursesApi";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col h-full transition-all duration-200 hover:shadow-md">
      <div className="relative h-[200px] w-full overflow-hidden">
        <Image
          src={course.image_url || "/placeholder.svg?height=200&width=400"}
          alt={course.title}
          fill
          className="object-cover transition-transform hover:scale-105 duration-500"
        />
      </div>
      <CardContent className="flex-grow pt-6">
        <h3 className="text-xl font-bold mb-2 line-clamp-2">{course.title}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {course.description}
        </p>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-primary" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <BookOpen className="h-4 w-4 text-primary" />
            <span>{course.course_modules.length} Modules</span>
          </div>
          <div className="flex items-center gap-2 text-sm col-span-2">
            <Award className="h-4 w-4 text-primary" />
            <span>Certificate of Completion</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4">
          {course.discount_price ? (
            <>
              <span className="text-xl font-bold">
                ${course.discount_price}
              </span>
              <span className="text-muted-foreground line-through">
                ${course.price}
              </span>
            </>
          ) : (
            <span className="text-xl font-bold">${course.price}</span>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="w-full grid grid-cols-2 gap-3">
          <Button asChild variant="outline">
            <Link href={`/courses/${course.slug}`}>View Details</Link>
          </Button>
          <Button asChild>
            <Link href={`/courses/${course.slug}/enroll`}>Enroll Now</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
