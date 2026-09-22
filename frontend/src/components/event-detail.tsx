"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon, ArrowRightIcon, CalendarIcon, ClockIcon, MapPinIcon, ShieldIcon } from "./icons";
import { useTicketing } from "./ticketing-provider";
import { formatCurrency, getSeats } from "@/lib/events";
import type { TicketEvent } from "@/lib/types";

export function EventDetail({ event }: { event: TicketEvent }) {
  const router = useRouter();
  const { selectedSeats, toggleSeat, clearSeats, beginHold } = useTicketing();
  const seats = getSeats(event.id);
  const selectedIds = selectedSeats[event.id] ?? [];
  const selected = selectedIds
    .map((id) => seats.find((seat) => seat.id === id))
    .filter((seat) => seat !== undefined);
  const subtotal = selected.reduce((sum, seat) => sum + seat.price, 0);

  function continueToCheckout() {
    if (!selected.length) return;
    beginHold();
    router.push(`/checkout?event=${event.id}`);
  }

  return (
    <main className="event-page">
      <section
        className="event-banner"
        style={{ "--event-accent": event.accent, "--event-secondary": event.secondary } as React.CSSProperties}
      >
        <div className="shell">
          <Link className="back-link" href="/"><ArrowLeftIcon /> All events</Link>
          <div className="event-banner-grid">
            <div>
              <span className="eyebrow">{event.category} · {event.availability}</span>
              <p className="event-artist">{event.artist}</p>
              <h1>{event.title}</h1>
              <p>{event.description}</p>
            </div>
            <div className="event-banner-facts">
              <span><CalendarIcon /><span><small>Date</small>{event.date}</span></span>
              <span><ClockIcon /><span><small>Time</small>{event.time}</span></span>
              <span><MapPinIcon /><span><small>Venue</small>{event.venue}<br />{event.city}</span></span>
            </div>
          </div>
        </div>
      </section>

      <section className="seat-selection shell">
        <div className="seat-selection-heading">
          <div><span className="eyebrow">Interactive seat map</span><h2>Choose up to 6 seats</h2></div>
          <div className="seat-legend" aria-label="Seat availability legend">
            <span><i className="legend-available" />Available</span>
            <span><i className="legend-selected" />Selected</span>
            <span><i className="legend-held" />Held</span>
            <span><i className="legend-sold" />Sold</span>
          </div>
        </div>

        <div className="seat-layout">
          <div className="seat-map-card">
            <div className="stage"><span>STAGE</span></div>
            <div className="seat-map-scroll" tabIndex={0} aria-label="Scrollable seat map">
              <div className="seat-map">
                {Array.from({ length: 10 }, (_, rowIndex) => {
                  const row = String.fromCharCode(65 + rowIndex);
                  const rowSeats = seats.filter((seat) => seat.row === row);
                  return (
                    <div className="seat-row" key={row}>
                      <span className="row-label">{row}</span>
                      {rowSeats.map((seat) => {
                        const isSelected = selectedIds.includes(seat.id);
                        return (
                          <button
                            className={`seat seat-${isSelected ? "selected" : seat.status} ${seat.number === 7 || seat.number === 13 ? "has-aisle" : ""}`}
                            disabled={seat.status !== "available"}
                            key={seat.id}
                            onClick={() => toggleSeat(event.id, seat.id)}
                            title={`${seat.section}, seat ${seat.id}, ${formatCurrency(seat.price)}, ${seat.status}`}
                            type="button"
                            aria-label={`${seat.section} seat ${seat.id}, ${formatCurrency(seat.price)}, ${isSelected ? "selected" : seat.status}`}
                            aria-pressed={isSelected}
                          >
                            {seat.number}
                          </button>
                        );
                      })}
                      <span className="row-label">{row}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="map-zones">
              <span><i className="zone-floor" />Floor · $145</span>
              <span><i className="zone-lower" />Lower bowl · $110</span>
              <span><i className="zone-upper" />Upper bowl · $75</span>
            </div>
          </div>

          <aside className="selection-card">
            <div className="selection-card-heading">
              <div><span className="eyebrow">Your selection</span><h2>{selected.length ? `${selected.length} ${selected.length === 1 ? "seat" : "seats"}` : "No seats yet"}</h2></div>
              {selected.length > 0 && <button type="button" onClick={() => clearSeats(event.id)}>Clear</button>}
            </div>
            {selected.length ? (
              <div className="selected-seat-list">
                {selected.map((seat) => (
                  <button key={seat.id} type="button" onClick={() => toggleSeat(event.id, seat.id)} aria-label={`Remove seat ${seat.id}`}>
                    <span><strong>{seat.id}</strong><small>{seat.section}</small></span>
                    <span>{formatCurrency(seat.price)} <b>×</b></span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="selection-empty"><span>Tap an available seat on the map</span><small>Selected seats will appear here.</small></div>
            )}
            <div className="selection-total"><span>Ticket subtotal</span><strong>{formatCurrency(subtotal)}</strong></div>
            <button className="button button-primary button-full" disabled={!selected.length} onClick={continueToCheckout} type="button">
              Continue to checkout <ArrowRightIcon />
            </button>
            <p className="secure-note"><ShieldIcon /> Seats are held for 7 minutes during checkout.</p>
          </aside>
        </div>

        <div className="concurrency-note">
          <span className="live-pill"><span className="pulse-dot" /> LIVE</span>
          <div><strong>Availability changes in real time</strong><p>Another buyer may be viewing seat A17 right now. The final reservation is only secured when the server confirms your hold.</p></div>
          <span className="demo-seat">A17</span>
        </div>
      </section>
    </main>
  );
}
