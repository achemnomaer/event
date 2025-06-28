import type { Metadata } from "next";
import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";
import Container from "@/components/Container";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Login | ANTGEC",
  description: "Login to your ANTGEC account",
};

export default async function LoginPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getSession();

  if (data?.session) {
    redirect("/dashboard");
  }

  return (
    <Container className="max-w-md py-10  md:py-16">
      <LoginForm />
    </Container>
  );
}
