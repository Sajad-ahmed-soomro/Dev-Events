// components/EventsList.tsx
import EventCard from "@/components/EventCard";
import { IEvent } from "@/database";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

export default async function EventsList() {
  const response = await fetch(`${BASE_URL}/api/events`);
  const { events } = await response.json();

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