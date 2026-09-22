import type { TicketEvent } from "@/lib/types";

export function EventVisual({ event, compact = false }: { event: TicketEvent; compact?: boolean }) {
  return (
    <div
      className={`event-visual visual-${event.visual} ${compact ? "is-compact" : ""}`}
      style={
        {
          "--event-accent": event.accent,
          "--event-secondary": event.secondary,
        } as React.CSSProperties
      }
      aria-hidden="true"
    >
      <span className="visual-noise" />
      <span className="visual-shape visual-shape-one" />
      <span className="visual-shape visual-shape-two" />
      <span className="visual-shape visual-shape-three" />
      <span className="visual-label">LIVE / {event.shortDate}</span>
    </div>
  );
}
