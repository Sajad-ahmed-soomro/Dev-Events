import React from "react";
import { notFound } from "next/navigation";
import { IEvent } from "@/database";
import { Suspense } from "react";
import {
  getEventBySlug,
  getSimilarEventsBySlug,
} from "@/lib/actions/event.actions";
import Image from "next/image";
import BookEvent from "@/components/BookEvent";
import EventCard from "@/components/EventCard";
import { cacheLife } from "next/cache";

const EventDetailItem = ({
  icon,
  alt,
  label,
}: {
  icon: string;
  alt: string;
  label: string;
}) => (
  <div className="flex-row-gap-2 items-center">
    <Image src={icon} alt={alt} width={17} height={17} />
    <p>{label}</p>
  </div>
);

const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => (
  <div className="agenda">
    <h2>Agenda</h2>
    <ul>
      {agendaItems.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </div>
);

const EventTags = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-row gap-1.5 flex-wrap">
    {tags?.map((tag) => (
      <div className="pill" key={tag}>
        {tag}
      </div>
    ))}
  </div>
);

const EventDetail = async ({ slug }: { slug: string }) => {
  "use cache";
  cacheLife("hours");

  // Fetch event directly from DB (correct Server Component pattern)
  const event = await getEventBySlug(slug);

  if (!event){
    console.error("Event not found for slug:", slug);
    return notFound();
  } 

  // Ensure ObjectId is string-safe for Client Components
  const serializedEvent = {
    ...event,
    _id: event._id.toString(),
  };

  const {
    description,
    image,
    overview,
    date,
    time,
    location,
    mode,
    agenda,
    audience,
    tags,
    organizer,
  } = serializedEvent;

  if (!description) return notFound();

  const bookings = 10;

  // Fetch similar events safely
  const similarEventsRaw: IEvent[] = await getSimilarEventsBySlug(slug);

  const similarEvents = similarEventsRaw.map((event) => ({
    ...event,
    _id: event._id.toString(),
  }));

  return (
    <section id="event">
      {/* Header */}
      <div className="header">
        <h1>Event Description</h1>
        <p>{description}</p>
      </div>

      {/* Main layout */}
      <div className="details">
        {/* Left Side */}
        <div className="content">
          <Image
            src={image}
            alt="Event Banner"
            width={800}
            height={800}
            className="banner"
          />

          <section className="flex-col-gap-2">
            <h2>Overview</h2>
            <p>{overview}</p>
          </section>

          <section className="flex-col-gap-2">
            <h2>Event Details</h2>

            <EventDetailItem
              icon="/icons/calendar.svg"
              alt="calendar"
              label={date}
            />

            <EventDetailItem
              icon="/icons/clock.svg"
              alt="clock"
              label={time}
            />

            <EventDetailItem
              icon="/icons/pin.svg"
              alt="pin"
              label={location}
            />

            <EventDetailItem
              icon="/icons/mode.svg"
              alt="mode"
              label={mode}
            />

            <EventDetailItem
              icon="/icons/audience.svg"
              alt="audience"
              label={audience}
            />
          </section>

          <EventAgenda agendaItems={agenda} />

          <section className="flex-col-gap-2">
            <h2>About the Organizer</h2>
            <p>{organizer}</p>
          </section>

          <EventTags tags={tags} />
        </div>

        {/* Right Side */}
        <aside className="booking">
          <div className="signup-card">
            <h2>Book Your Spot</h2>

            {bookings > 0 ? (
              <p className="text-sm">
                Join {bookings} people who have already booked their spot!
              </p>
            ) : (
              <p className="text-sm">Be the first to book your spot!</p>
            )}

            <BookEvent
              eventId={serializedEvent._id}
              slug={serializedEvent.slug}
            />
          </div>
        </aside>
      </div>

      {/* Similar Events */}
      <div className="flex w-full flex-col gap-4 pt-20">
        <h2>Similar Events</h2>

        <div className="events">
          {similarEvents.length > 0 &&
            similarEvents.map((similarEvent) => (
              <EventCard key={similarEvent._id} {...similarEvent} />
            ))}
        </div>
      </div>
    </section>
  );
};




export default EventDetail;