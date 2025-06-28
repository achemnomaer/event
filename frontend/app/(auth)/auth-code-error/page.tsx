import Link from "next/link";
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

export default function AuthCodeErrorPage() {
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
            Sorry, we couldn&apos;t verify your email. The link may have expired
            or been used already.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              This can happen if the verification link has expired or has
              already been used.
            </p>
            <div className="space-y-2">
              <Button asChild className="w-full">
                <Link href="/register">Create New Account</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/login">Sign In Instead</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
}
