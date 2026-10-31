import type { Metadata } from "next";
import { Checkout } from "@/components/checkout";
import { events, getEvent } from "@/lib/events";
import { demoMode } from "@/lib/catalog";

export const metadata: Metadata = { title: "Checkout" };

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ event?: string }>;
}) {
  if (!demoMode) return <main className="empty-state shell"><h1>Reservations will open soon.</h1><p>Browse events and seats while we prepare checkout.</p></main>;
  const { event: eventId } = await searchParams;
  const event = getEvent(eventId ?? "") ?? events[0];
  return <Checkout event={event} />;
}
