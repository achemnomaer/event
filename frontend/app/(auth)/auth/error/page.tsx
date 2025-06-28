"use client";

import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Container from "@/components/Container";

export default function AuthErrorPage() {
  const router = useRouter();

  return (
    <Container className="py-12">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle className="h-6 w-6 text-destructive" />
          </div>
          <CardTitle className="text-2xl font-bold">
            Authentication Error
          </CardTitle>
          <CardDescription>
            Sorry, we couldn&apos;t complete your sign in. Please try again.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              This can happen if the authentication process was interrupted or if there was a temporary issue.
            </p>
            <div className="space-y-2">
              <Button onClick={() => router.push("/register")} className="w-full">
                Create New Account
              </Button>
              <Button onClick={() => router.push("/login")} variant="outline" className="w-full">
                Try Signing In Again
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
}