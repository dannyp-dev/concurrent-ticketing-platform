import type { Metadata } from "next";
import { ReservationStatus } from "@/components/reservation-status";
import { demoMode } from "@/lib/catalog";

export const metadata: Metadata = { title: "Reservation confirmed" };

export default async function ReservationPage(props: PageProps<"/reservations/[id]">) {
  if (!demoMode) return <main className="empty-state shell"><h1>Reservation lookup is coming soon.</h1><p>Saved reservations will be available when checkout opens.</p></main>;
  const { id } = await props.params;
  return <ReservationStatus requestedId={id} />;
}
