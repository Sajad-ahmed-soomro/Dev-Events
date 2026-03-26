// components/EventsList.tsx
import EventCard from "@/components/EventCard";
import { IEvent } from "@/database";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

export default async function EventsList() {
  let events: IEvent[] = [];

  try {
    const response = await fetch(`${BASE_URL}/api/events`, { cache: "no-store" });
    const text = await response.text();
    console.log("base url",BASE_URL)

    try {
      const data = JSON.parse(text);
      console.log('data',data)
      events = data.events || [];
    } catch (err) {
      console.error("Failed to parse JSON from /api/events:", text);
      events = [];
    }
  } catch (err) {
    console.error("Failed to fetch /api/events:", err);
    events = [];
  }

  if (!events || events.length === 0) {
    return <p>No events found.</p>;
  }

  return (
    <ul className="events">
      {events.map((event: IEvent) => (
        <li key={event._id} className="list-none">
          <EventCard {...event} />
        </li>
      ))}
    </ul>
  );
}