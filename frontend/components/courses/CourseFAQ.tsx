"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { Course } from "@/lib/data/courses";

interface CourseFAQProps {
  faqs: Course["faqs"];
}

export default function CourseFAQ({ faqs }: CourseFAQProps) {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleFaq(index)}
              className="w-full px-6 py-4 flex justify-between items-center hover:bg-accent/50 transition-colors text-left"
            >
              <h3 className="font-medium">{faq.question}</h3>
              {expandedFaq === index ? (
                <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              ) : (
                <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              )}
            </button>
            {expandedFaq === index && (
              <div className="px-6 pb-4 pt-0">
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
