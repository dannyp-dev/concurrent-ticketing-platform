"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRightIcon, CalendarIcon, MapPinIcon } from "./icons";
import { EventVisual } from "./event-visual";
import { formatCurrency } from "@/lib/events";
import type { EventCategory, TicketEvent } from "@/lib/types";

const filters: Array<"All" | EventCategory> = ["All", "Music", "Sports", "Arts"];

export function EventExplorer({ events }: { events: TicketEvent[] }) {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const visibleEvents =
    filter === "All" ? events : events.filter((event) => event.category === filter);

  return (
    <section className="events-section shell" id="events">
      <div className="section-heading">
        <div>
          <span className="eyebrow">On your radar</span>
          <h2>What&apos;s happening next</h2>
        </div>
        <div className="filter-tabs" role="group" aria-label="Filter events by category">
          {filters.map((item) => (
            <button
              className={filter === item ? "is-active" : ""}
              key={item}
              onClick={() => setFilter(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="event-grid">
        {visibleEvents.map((event) => (
          <article className="event-card" key={event.id}>
            <Link href={`/events/${event.id}`} aria-label={`View ${event.title}`}>
              <EventVisual event={event} compact />
            </Link>
            <div className="event-card-body">
              <div className="event-card-topline">
                <span className={`availability availability-${event.availability.toLowerCase().replaceAll(" ", "-")}`}>
                  {event.availability}
                </span>
                <span>From {formatCurrency(event.priceFrom)}</span>
              </div>
              <div>
                <p className="event-artist">{event.artist}</p>
                <h3>
                  <Link href={`/events/${event.id}`}>{event.title}</Link>
                </h3>
              </div>
              <div className="event-facts">
                <span>
                  <CalendarIcon />
                  {event.date.replace(", 2026", "")} · {event.time}
                </span>
                <span>
                  <MapPinIcon />
                  {event.venue}
                </span>
              </div>
              <Link className="text-link" href={`/events/${event.id}`}>
                Find seats <ArrowRightIcon />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
