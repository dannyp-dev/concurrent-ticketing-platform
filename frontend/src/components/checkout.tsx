"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon, CheckIcon, ClockIcon, LockIcon, ShieldIcon } from "./icons";
import { useTicketing } from "./ticketing-provider";
import { formatCurrency, getSeats } from "@/lib/events";
import type { TicketEvent } from "@/lib/types";

export function Checkout({ event }: { event: TicketEvent }) {
  const router = useRouter();
  const { selectedSeats, holdExpiresAt, confirmReservation } = useTicketing();
  const [remaining, setRemaining] = useState(7 * 60);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const selectedIds = selectedSeats[event.id] ?? [];
  const allSeats = useMemo(() => getSeats(event.id), [event.id]);
  const seats = selectedIds
    .map((id) => allSeats.find((seat) => seat.id === id))
    .filter((seat) => seat !== undefined);
  const subtotal = seats.reduce((sum, seat) => sum + seat.price, 0);
  const serviceFee = Math.round(subtotal * 0.08);
  const delivery = seats.length ? 12 : 0;
  const total = subtotal + serviceFee + delivery;

  useEffect(() => {
    const tick = () => {
      const seconds = holdExpiresAt
        ? Math.max(0, Math.floor((holdExpiresAt - Date.now()) / 1000))
        : 7 * 60;
      setRemaining(seconds);
    };
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, [holdExpiresAt]);

  function submitOrder(eventSubmit: FormEvent<HTMLFormElement>) {
    eventSubmit.preventDefault();
    if (!seats.length || remaining === 0) return;
    const form = new FormData(eventSubmit.currentTarget);
    setIsSubmitting(true);
    const reservation = confirmReservation({
      eventId: event.id,
      name: String(form.get("name")),
      email: String(form.get("email")),
    });
    router.push(`/reservations/${reservation.id}`);
  }

  const minutes = String(Math.floor(remaining / 60)).padStart(2, "0");
  const seconds = String(remaining % 60).padStart(2, "0");

  if (!seats.length) {
    return (
      <main className="empty-state shell">
        <span className="empty-code">0</span>
        <h1>Your seat selection is empty.</h1>
        <p>Choose at least one available seat before starting checkout.</p>
        <Link className="button button-primary" href={`/events/${event.id}`}><ArrowLeftIcon /> Choose seats</Link>
      </main>
    );
  }

  return (
    <main className="checkout-page shell">
      <div className="checkout-topbar">
        <Link className="back-link" href={`/events/${event.id}`}><ArrowLeftIcon /> Back to seat map</Link>
        <div className={`hold-timer ${remaining < 60 ? "is-urgent" : ""}`}>
          <ClockIcon /><span>Your seats are held for</span><strong>{minutes}:{seconds}</strong>
        </div>
      </div>
      <div className="checkout-heading"><span className="eyebrow">Almost there</span><h1>Complete your order</h1><p>Your payment is simulated in this frontend prototype. No card data is stored or transmitted.</p></div>

      <form className="checkout-grid" onSubmit={submitOrder}>
        <div className="checkout-forms">
          <section className="form-card">
            <div className="form-card-heading"><span>1</span><div><h2>Contact details</h2><p>We will send your ticket confirmation here.</p></div></div>
            <div className="field-grid">
              <label className="field field-wide"><span>Full name</span><input autoComplete="name" name="name" placeholder="Alex Morgan" required /></label>
              <label className="field"><span>Email address</span><input autoComplete="email" name="email" placeholder="alex@example.com" required type="email" /></label>
              <label className="field"><span>Phone number</span><input autoComplete="tel" name="phone" placeholder="(352) 555-0142" type="tel" /></label>
            </div>
          </section>

          <section className="form-card">
            <div className="form-card-heading"><span>2</span><div><h2>Payment</h2><p>Use any clearly fictional values for this demo.</p></div><LockIcon className="form-lock" /></div>
            <div className="field-grid">
              <label className="field field-wide"><span>Card number</span><input inputMode="numeric" name="card" placeholder="4242 4242 4242 4242" required /></label>
              <label className="field"><span>Expiration</span><input inputMode="numeric" name="expiration" placeholder="12 / 30" required /></label>
              <label className="field"><span>Security code</span><input inputMode="numeric" name="cvv" placeholder="123" required /></label>
              <label className="field field-wide"><span>Billing ZIP code</span><input autoComplete="postal-code" inputMode="numeric" name="zip" placeholder="32601" required /></label>
            </div>
            <div className="demo-payment-note"><ShieldIcon /><span><strong>Prototype checkout</strong>No payment processor is connected and these values never leave your browser.</span></div>
          </section>
        </div>

        <aside className="order-card">
          <span className="eyebrow">Order summary</span>
          <h2>{event.title}</h2>
          <p>{event.date} · {event.time}<br />{event.venue}</p>
          <div className="order-seats">{seats.map((seat) => <span key={seat.id}><b>{seat.id}</b><small>{seat.section}</small><strong>{formatCurrency(seat.price)}</strong></span>)}</div>
          <div className="order-totals">
            <span><span>Tickets</span><strong>{formatCurrency(subtotal)}</strong></span>
            <span><span>Service fee</span><strong>{formatCurrency(serviceFee)}</strong></span>
            <span><span>Mobile delivery</span><strong>{formatCurrency(delivery)}</strong></span>
            <span className="order-grand-total"><span>Total</span><strong>{formatCurrency(total)}</strong></span>
          </div>
          <button className="button button-primary button-full" disabled={isSubmitting || remaining === 0} type="submit">
            {isSubmitting ? "Confirming…" : <><CheckIcon /> Confirm order</>}
          </button>
          <p className="secure-note"><LockIcon /> Secure, simulated checkout</p>
        </aside>
      </form>
    </main>
  );
}
