import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EventDetail } from "@/components/event-detail";
import { catalogEvent, catalogSeats, demoMode } from "@/lib/catalog";

export async function generateMetadata(props: PageProps<"/events/[id]">): Promise<Metadata> {
  const { id } = await props.params;
  const event = await catalogEvent(id);
  return event ? { title: event.title, description: event.description } : { title: "Event not found" };
}

export default async function EventPage(props: PageProps<"/events/[id]">) {
  const { id } = await props.params;
  const event = await catalogEvent(id);
  if (!event) notFound();
  const seats = await catalogSeats(id);
  return <EventDetail event={event} seats={seats} demoMode={demoMode} />;
}
