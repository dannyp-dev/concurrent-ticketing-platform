import "server-only";
import { events as demoEvents, getEvent as demoEvent, getSeats as demoSeats } from "./events";
import type { Seat, TicketEvent } from "./types";

export const demoMode = process.env.TICKETING_DATA_SOURCE === "demo";
type ApiEvent = {
  id: string; title: string; artist: string; category: TicketEvent["category"];
  startsAt: string; timeZone: string; venue: string; city: string;
  description: string; priceFromCents: number | null;
};
type ApiSeat = { id: string; row: string; number: number; section: string;
  priceCents: number; status: "AVAILABLE" | "HELD" | "SOLD" };

async function request<T>(path: string): Promise<T | null> {
  const base = process.env.TICKETING_API_URL ?? "http://localhost:8080";
  const response = await fetch(base + path, { cache: "no-store", signal: AbortSignal.timeout(5000) });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error("Catalog service unavailable");
  return response.json() as Promise<T>;
}

function present(event: ApiEvent): TicketEvent {
  const artwork = demoEvent(event.id);
  const date = new Date(event.startsAt);
  return {
    ...event,
    date: date.toLocaleDateString("en-US", {timeZone:event.timeZone,weekday:"long",month:"long",day:"numeric",year:"numeric"}),
    shortDate: date.toLocaleDateString("en-US", {timeZone:event.timeZone,month:"short",day:"2-digit"}).toUpperCase(),
    time: date.toLocaleTimeString("en-US", {timeZone:event.timeZone,hour:"numeric",minute:"2-digit"}),
    priceFrom: (event.priceFromCents ?? 0) / 100,
    availability: "View seat map",
    accent: artwork?.accent ?? "#25c2a0", secondary: artwork?.secondary ?? "#b8f2e6",
    visual: artwork?.visual ?? "rings", featured: artwork?.featured ?? false,
  };
}

export async function listCatalogEvents(): Promise<TicketEvent[]> {
  if (demoMode) return demoEvents;
  const result: TicketEvent[] = [];
  for (let page = 0; ; page++) {
    const data = await request<{items: ApiEvent[]; total: number}>(`/api/events?page=${page}&size=100`);
    if (!data) throw new Error("Catalog endpoint missing");
    result.push(...data.items.map(present));
    if (result.length >= data.total || !data.items.length) return result;
  }
}
export async function catalogEvent(id: string): Promise<TicketEvent | undefined> {
  if (demoMode) return demoEvent(id);
  const event = await request<ApiEvent>("/api/events/" + encodeURIComponent(id));
  return event ? present(event) : undefined;
}
export async function catalogSeats(id: string): Promise<Seat[]> {
  if (demoMode) return demoSeats(id);
  const seats = await request<ApiSeat[]>("/api/events/" + encodeURIComponent(id) + "/seats");
  if (!seats) throw new Error("Event seat inventory missing");
  return seats.map(seat => ({...seat, price:seat.priceCents/100, status:seat.status.toLowerCase() as Seat["status"]}));
}
