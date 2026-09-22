import type { Metadata } from "next";
import { ReservationStatus } from "@/components/reservation-status";

export const metadata: Metadata = { title: "Reservation confirmed" };

export default async function ReservationPage(props: PageProps<"/reservations/[id]">) {
  const { id } = await props.params;
  return <ReservationStatus requestedId={id} />;
}
