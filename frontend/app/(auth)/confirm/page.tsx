"use client";

import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import Container from "@/components/Container";
import ConfirmContent from "./ConfirmContent";

function ConfirmLoading() {
  return (
    <Container className="py-12">
      <div className="w-full max-w-md mx-auto text-center">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin mr-2" />
          <span>Loading...</span>
        </div>
      </div>
    </Container>
  );
}

export default function ConfirmPage() {
  return (
    <Suspense fallback={<ConfirmLoading />}>
      <ConfirmContent />
    </Suspense>
  );
}
