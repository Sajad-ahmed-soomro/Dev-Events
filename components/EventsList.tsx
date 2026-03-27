// components/EventsList.tsx
"use client";

import { useEffect, useState } from "react";
import EventCard from "@/components/EventCard";
import { IEvent } from "@/database";

// Remove or fix this line
// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

export default function EventsList() {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        
        // Use relative URL - this will work on any domain
        const response = await fetch('/api/events', { 
          cache: "no-store" 
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Fetched events:", data);
        setEvents(data.events || []);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch events:", err);
        setError(err instanceof Error ? err.message : "Failed to load events");
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <p>Loading events...</p>;
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  if (!events || events.length === 0) {
    return <p>No events found.</p>;
  }

  return (
    <ul className="events">
      {events.map((event: IEvent) => (
        <li key={event.title} className="list-none">
          <EventCard {...event} />
        </li>
      ))}
    </ul>
  );
}