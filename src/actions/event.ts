"use server";

import { z } from "zod";

import prisma from "@/lib/db";
import { newEventSchema } from "@/lib/zod";
import { Event } from "@/types/event";

export const getUserEvents = async (userId: string) => {
  const client = prisma;
  const events = await client.event.findMany({
    where: {
      userId,
    },
  });
  return events satisfies Event[];
};

export const createEvent = async (formData: z.infer<typeof newEventSchema>) => {
  const client = prisma;
  const { title, startDate, endDate, userId } = formData;
  const event = await client.event.create({
    data: {
      title,
      startDate,
      endDate,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
  return event satisfies Event;
};

export const deleteEvent = async (eventId: string) => {
  const client = prisma;
  const event = await client.event.delete({
    where: {
      id: eventId,
    },
  });
  return event satisfies Event;
};

export const updateEvent = async (
  eventId: string,
  formData: z.infer<typeof newEventSchema>,
) => {
  const client = prisma;
  const event = await client.event.update({
    where: {
      id: eventId,
    },
    data: {
      ...formData,
    },
  });
  return event satisfies Event;
};
