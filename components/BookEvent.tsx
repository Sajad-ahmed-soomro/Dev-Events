"use client";

import { createBooking } from "@/lib/actions/booking.actions";
import posthog from "posthog-js";
import { useState } from "react";

const BookEvent = ({ eventId, slug }: { eventId: string; slug: string }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  setError(null);

  const result = await createBooking({
    eventId,
    slug,
    email,
  });

  if (result.success) {
    setSubmitted(true);

    posthog.capture("event_booked", {
      eventId,
      slug,
      email,
    });
  } else {
    setError(result.message);


    posthog.captureException(
      new Error(result.message)
    );
  }
};
  return (
    <div id="book-event">
      {submitted ? (
        <p>Thank you for signing up! 🎉</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email Address</label>

            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
            />

            {error && (
              <p style={{ color: "red", marginTop: "6px" }}>{error}</p>
            )}
          </div>

          <button type="submit" className="button-submit">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default BookEvent;