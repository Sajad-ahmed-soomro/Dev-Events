'use server';

import Booking from '@/database/booking.model';
import connectDB from "@/lib/mongodb";

export const createBooking = async ({
  eventId,
  slug,
  email,
}: {
  eventId: string;
  slug: string;
  email: string;
}) => {
  try {
    await connectDB();

    // Check if already booked
    const existingBooking = await Booking.findOne({
      eventId,
      email,
    });

    if (existingBooking) {
      return {
        success: false,
        message: "You have already registered for this event with this email.",
      };
    }

    await Booking.create({
      eventId,
      slug,
      email,
    });

    return {
      success: true,
      message: "Booking successful 🎉",
    };
  } catch (e) {
    console.error("create booking failed", e);

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
};