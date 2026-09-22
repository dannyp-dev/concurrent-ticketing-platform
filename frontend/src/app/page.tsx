import Link from "next/link";
import { ArrowRightIcon, CalendarIcon, MapPinIcon, ShieldIcon } from "@/components/icons";
import { EventExplorer } from "@/components/event-explorer";
import { EventVisual } from "@/components/event-visual";
import { events, formatCurrency } from "@/lib/events";

export default function Home() {
  const featured = events.find((event) => event.featured) ?? events[0];

  return (
    <main>
      <section className="hero shell">
        <div className="hero-copy">
          <span className="eyebrow">Featured this week</span>
          <p className="hero-kicker">{featured.artist}</p>
          <h1>{featured.title}</h1>
          <p className="hero-description">{featured.description}</p>
          <div className="hero-facts">
            <span><CalendarIcon />{featured.date} · {featured.time}</span>
            <span><MapPinIcon />{featured.venue} · {featured.city}</span>
          </div>
          <div className="hero-actions">
            <Link className="button button-primary" href={`/events/${featured.id}`}>
              Choose your seats <ArrowRightIcon />
            </Link>
            <span className="price-note">From {formatCurrency(featured.priceFrom)}</span>
          </div>
        </div>
        <div className="hero-art">
          <EventVisual event={featured} />
          <div className="hero-ticket">
            <span>{featured.shortDate}</span>
            <strong>{featured.venue}</strong>
            <small>Doors 7:00 PM</small>
          </div>
        </div>
      </section>

      <div className="trust-strip">
        <div className="shell trust-grid">
          <span><ShieldIcon />Secure checkout</span>
          <span><span className="pulse-dot" />Live seat availability</span>
          <span>Upfront pricing</span>
          <span>Mobile tickets</span>
        </div>
      </div>

      <EventExplorer events={events} />

      <section className="promise-section shell">
        <div>
          <span className="eyebrow">The Queue promise</span>
          <h2>Ticket buying that feels human.</h2>
        </div>
        <div className="promise-grid">
          <article><span>01</span><h3>See the real picture</h3><p>Availability and pricing are visible before you commit to a seat.</p></article>
          <article><span>02</span><h3>Your hold is yours</h3><p>A clear countdown shows exactly how long your selected seats are protected.</p></article>
          <article><span>03</span><h3>No checkout surprises</h3><p>Every fee is explained in the order summary before confirmation.</p></article>
        </div>
      </section>
    </main>
  );
}
