'use server';

import Event from '@/database/event.model';
import connectDB from "@/lib/mongodb";
import { IEvent } from "@/database";
export const getSimilarEventsBySlug = async (slug: string) => {
    try {
        await connectDB();
        const event = await Event.findOne({ slug }).lean();

        return await Event.find({ _id: { $ne: event._id }, tags: { $in: event.tags } }).lean();
    } catch {
        return [];
    }
}


export const getEventBySlug = async (slug: string): Promise<IEvent | null> => {
    await connectDB();
  const event = await Event.findOne({ slug }).lean();
  if (!event) return null;

  return {
    ...event,
    _id: event._id.toString(), // serialize ObjectId
  };
};