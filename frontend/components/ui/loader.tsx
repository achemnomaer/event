"use client";

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils"; // Utility for class merging (if using ShadCN or custom)

type LoaderProps = {
  variant?: "fullscreen" | "inline" | "overlay";
  message?: string;
  className?: string;
};

export function Loader({
  variant = "inline",
  message = "Loading...",
  className,
}: LoaderProps) {
  if (variant === "fullscreen") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-muted-foreground text-sm">{message}</p>
        </div>
      </div>
    );
  }

  if (variant === "overlay") {
    return (
      <div className="absolute inset-0 z-30 flex items-center justify-center bg-background/60 backdrop-blur-sm">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-sm text-muted-foreground">{message}</span>
      </div>
    );
  }

  // Default to inline
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Loader2 className="h-4 w-4 animate-spin text-primary" />
      <span className="text-sm text-muted-foreground">{message}</span>
    </div>
  );
}
