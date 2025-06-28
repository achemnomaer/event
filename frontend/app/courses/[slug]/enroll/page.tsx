import { getCourseBySlug } from "@/lib/data/courses";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import CourseEnrollmentForm from "@/components/courses/CourseEnrollmentForm";

type Params = { slug: string };

export default async function CourseEnrollmentPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    notFound(); // Renders the 404 page
  }

  return (
    <div className="min-h-screen py-12">
      <Container>
        <CourseEnrollmentForm course={course} />
      </Container>
    </div>
  );
}
