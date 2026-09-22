import type { Metadata } from "next";
import { Checkout } from "@/components/checkout";
import { events, getEvent } from "@/lib/events";

export const metadata: Metadata = { title: "Checkout" };

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ event?: string }>;
}) {
  const { event: eventId } = await searchParams;
  const event = getEvent(eventId ?? "") ?? events[0];
  return <Checkout event={event} />;
}
