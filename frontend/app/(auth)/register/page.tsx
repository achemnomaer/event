import type { Metadata } from "next";
import { redirect } from "next/navigation";
import RegisterForm from "./RegisterForm";
import Container from "@/components/Container";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Register | ANTGEC",
  description: "Create a new ANTGEC account",
};

export default async function RegisterPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getSession();

  if (data?.session) {
    redirect("/dashboard");
  }

  return (
    <Container className="max-w-md py-10 md:py-16">
      <RegisterForm />
    </Container>
  );
}
