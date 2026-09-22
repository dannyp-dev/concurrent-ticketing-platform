import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EventDetail } from "@/components/event-detail";
import { events, getEvent } from "@/lib/events";

export function generateStaticParams() {
  return events.map((event) => ({ id: event.id }));
}

export async function generateMetadata(props: PageProps<"/events/[id]">): Promise<Metadata> {
  const { id } = await props.params;
  const event = getEvent(id);
  return event ? { title: event.title, description: event.description } : { title: "Event not found" };
}

export default async function EventPage(props: PageProps<"/events/[id]">) {
  const { id } = await props.params;
  const event = getEvent(id);
  if (!event) notFound();
  return <EventDetail event={event} />;
}
