"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import Container from "@/components/Container";

export default function AuthSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    
    if (token) {
      // Store the access token
      localStorage.setItem("accessToken", token);
      
      // Show success message
      toast.success("Successfully signed in!");
      
      // Redirect to dashboard
      router.push("/dashboard");
    } else {
      // No token found, redirect to login
      toast.error("Authentication failed. Please try again.");
      router.push("/login");
    }
  }, [searchParams, router]);

  return (
    <Container className="py-12">
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Completing sign in...</p>
        </div>
      </div>
    </Container>
  );
}