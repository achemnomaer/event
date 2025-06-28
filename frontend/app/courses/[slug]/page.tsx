import { notFound } from "next/navigation";
import Link from "next/link";
import { getCourseBySlug } from "@/lib/data/courses";
import Container from "@/components/Container";
import CourseHero from "@/components/courses/CourseHero";
import CourseContent from "@/components/courses/CourseContent";
import CourseFAQ from "@/components/courses/CourseFAQ";
import { Button } from "@/components/ui/button";

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    return {
      title: "Course Not Found",
      description: "The requested course could not be found.",
    };
  }

  return {
    title: `${course.title} | EduConf Courses`,
    description: course.description,
  };
}

export default async function CoursePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  return (
    <div className="min-h-screen pb-16">
      <CourseHero course={course} />

      <Container>
        <div className="py-12">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Main Content - 2/3 width on desktop */}
            <div className="lg:col-span-2 space-y-12">
              {/* Course Overview */}
              <section>
                <h2 className="text-2xl font-bold mb-4">Course Overview</h2>
                <div className="space-y-4">
                  {course.longDescription.map((paragraph, index) => (
                    <p key={index} className="text-muted-foreground">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>

              {/* Learning Outcomes */}
              <section>
                <h2 className="text-2xl font-bold mb-4">
                  What You&apos;ll Learn
                </h2>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {course.learningOutcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-primary flex-shrink-0 mt-0.5"
                      >
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                        <path d="m9 12 2 2 4-4" />
                      </svg>
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Course Content */}
              <CourseContent modules={course.modules} />

              {/* FAQs */}
              <CourseFAQ faqs={course.faqs} />
            </div>

            {/* Sidebar - 1/3 width on desktop */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 border rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-4">Course Details</h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price:</span>
                    <span className="font-medium">
                      {course.discountPrice ? (
                        <>
                          <span className="text-muted-foreground line-through mr-2">
                            ${course.price}
                          </span>
                          <span>${course.discountPrice}</span>
                        </>
                      ) : (
                        <span>${course.price}</span>
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium">{course.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Level:</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Modules:</span>
                    <span className="font-medium">{course.modules.length}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  <h4 className="font-medium">What&apos;s included:</h4>
                  <ul className="space-y-2">
                    {course.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4 text-primary mt-0.5"
                        >
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button asChild className="w-full">
                  <Link href={`/courses/${course.slug}/enroll`}>
                    Enroll Now
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
