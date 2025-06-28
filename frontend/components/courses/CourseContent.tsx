"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Clock, ListChecks } from "lucide-react";
import type { CourseModule } from "@/lib/data/courses";

interface CourseContentProps {
  modules: CourseModule[];
}

export default function CourseContent({ modules }: CourseContentProps) {
  const [expandedModule, setExpandedModule] = useState<number | null>(0);

  const toggleModule = (index: number) => {
    setExpandedModule(expandedModule === index ? null : index);
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Course Content</h2>
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-muted p-4 flex justify-between items-center">
          <div className="font-medium">
            {modules.length} modules •{" "}
            {modules.reduce((total, module) => total + module.topics.length, 0)}{" "}
            lessons
          </div>
          <button
            onClick={() =>
              setExpandedModule(expandedModule === null ? 0 : null)
            }
            className="text-sm text-primary hover:underline focus:outline-none"
          >
            {expandedModule === null ? "Expand All" : "Collapse All"}
          </button>
        </div>

        <div className="divide-y">
          {modules.map((module, index) => (
            <div key={index} className="bg-card">
              <button
                onClick={() => toggleModule(index)}
                className="w-full px-4 py-4 flex justify-between items-center hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-start gap-3 text-left">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-medium text-primary">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium">{module.title}</h3>
                    <div className="text-sm text-muted-foreground mt-1 flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {module.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <ListChecks className="h-3.5 w-3.5" />
                        {module.topics.length} lessons
                      </span>
                    </div>
                  </div>
                </div>
                {expandedModule === index ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
              </button>

              {expandedModule === index && (
                <div className="px-4 pb-4 pt-1">
                  <p className="text-sm text-muted-foreground mb-3">
                    {module.description}
                  </p>
                  <ul className="space-y-2">
                    {module.topics.map((topic, topicIndex) => (
                      <li
                        key={topicIndex}
                        className="flex items-start gap-2 text-sm"
                      >
                        <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-medium text-primary">
                            {topicIndex + 1}
                          </span>
                        </div>
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
