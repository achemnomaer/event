import { Search, CalendarDays, Users } from "lucide-react";

export default function HowItWorks() {
  return (
    <section className="w-full py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            How It Works
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl">
            Discover, register, and attend international education conferences
            with ease.
          </p>
        </div>
      </div>
      <div className="mt-12 grid gap-8 md:grid-cols-3">
        <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Search className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-bold">Discover Events</h3>
          <p className="text-center text-muted-foreground">
            Browse through our comprehensive database of international education
            conferences and events.
          </p>
        </div>
        <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <CalendarDays className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-bold">Register & Plan</h3>
          <p className="text-center text-muted-foreground">
            Easily register for events, access detailed information, and plan
            your attendance.
          </p>
        </div>
        <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Users className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-bold">Connect & Learn</h3>
          <p className="text-center text-muted-foreground">
            Attend events, network with peers, and gain valuable insights from
            education experts worldwide.
          </p>
        </div>
      </div>
    </section>
  );
}
