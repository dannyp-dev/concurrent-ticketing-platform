"use client";

import Link from "next/link";
import { CalendarIcon, CheckIcon, MapPinIcon, TicketIcon } from "./icons";
import { useTicketing } from "./ticketing-provider";
import { events, formatCurrency, getEvent } from "@/lib/events";
import type { ReservationRecord } from "@/lib/types";

export function ReservationStatus({ requestedId }: { requestedId: string }) {
  const { reservation } = useTicketing();
  const demo: ReservationRecord = {
    id: requestedId === "demo" ? "RSV-2026-104817" : requestedId,
    orderNumber: "QL-93041827",
    eventId: events[0].id,
    seatIds: ["A17", "A18"],
    total: 325,
    status: "CONFIRMED",
    purchaserName: "Ticket holder",
    purchaserEmail: "alex@example.com",
    confirmedAt: new Date().toISOString(),
  };
  const record = reservation?.id === requestedId ? reservation : demo;
  const event = getEvent(record.eventId) ?? events[0];

  return (
    <main className="confirmation-page shell">
      <section className="confirmation-hero">
        <div className="confirmation-check"><CheckIcon /></div>
        <span className="eyebrow">Reservation confirmed</span>
        <h1>You&apos;re going to {event.title}.</h1>
        <p>A confirmation has been prepared for <strong>{record.purchaserEmail}</strong>.</p>
      </section>

      <section className="ticket-card">
        <div className="ticket-main">
          <div className="ticket-date"><span>{event.shortDate.split(" ")[0]}</span><strong>{event.shortDate.split(" ")[1]}</strong><small>2026</small></div>
          <div className="ticket-details">
            <span>{event.artist}</span><h2>{event.title}</h2>
            <p><CalendarIcon />{event.date} · {event.time}</p>
            <p><MapPinIcon />{event.venue} · {event.city}</p>
          </div>
          <div className="ticket-seats"><small>SEATS</small><strong>{record.seatIds.join(" · ")}</strong><span>{record.seatIds.length} mobile tickets</span></div>
        </div>
        <div className="ticket-stub"><span className="barcode" /><small>{record.orderNumber}</small></div>
      </section>

      <section className="confirmation-grid">
        <article><span className="confirmation-icon"><TicketIcon /></span><div><small>Status</small><h3>{record.status}</h3><p>Your seats are secured and the order is complete.</p></div></article>
        <article><div><small>Reservation ID</small><h3>{record.id}</h3><p>Keep this number for support or order lookup.</p></div></article>
        <article><div><small>Order total</small><h3>{formatCurrency(record.total)}</h3><p>Includes tickets, service fee, and mobile delivery.</p></div></article>
      </section>

      <div className="confirmation-actions"><button className="button button-secondary" type="button">Add to calendar</button><Link className="button button-primary" href="/">Browse more events</Link></div>
    </main>
  );
}
