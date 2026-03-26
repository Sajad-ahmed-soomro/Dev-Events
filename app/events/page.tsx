// app/events/page.tsx
import { Suspense } from "react";
import EventsList from "@/components/EventsList";
import EventsLoading from "@/components/EventsLoading";

export const metadata = {
  title: "All Events | DevEvent",
  description: "Browse and discover upcoming tech events",
};

export default function EventsPage() {
  return (
    <main className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-gradient text-4xl sm:text-5xl font-semibold">
            All Events
          </h1>
          <p className="text-light-100 text-lg mt-3">
            Discover and join the best tech events
          </p>
        </div>
        
        {/* Add Suspense boundary */}
        <Suspense fallback={<EventsLoading />}>
          <EventsList />
        </Suspense>
      </div>
    </main>
  );
}