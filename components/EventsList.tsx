// components/EventsList.tsx
"use client";

import { useEffect, useState } from "react";
import EventCard from "@/components/EventCard";
import { IEvent } from "@/database";

export default function EventsList() {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        
        const response = await fetch('/api/events', { 
          cache: "no-store" 
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Fetched events:", data);
        console.log("First event structure:", data.events?.[0]);
        
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
    return (
      <div>
        <p>No events found.</p>
        <p>Debug: Events array length = {events?.length}</p>
      </div>
    );
  }

  return (
    <ul className="events">
      
{events.map((event: IEvent) => {
  // Create a slug from title if not available
  const slug = event.slug || event.title.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <li key={event.title} className="list-none">
      <EventCard 
        image={event.image}
        title={event.title}
        slug={slug}
        location={event.location}
        date={event.date}
        time={event.time}
      />
    </li>
  );
})}
    </ul>
  );
}