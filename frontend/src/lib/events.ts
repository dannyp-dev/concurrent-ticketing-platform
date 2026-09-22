import type { Seat, TicketEvent } from "./types";

export const events: TicketEvent[] = [
  {
    id: "neon-echoes",
    title: "Neon Echoes Tour",
    artist: "Mira Vale",
    category: "Music",
    date: "Saturday, October 17, 2026",
    shortDate: "OCT 17",
    time: "8:00 PM",
    venue: "Meridian Arena",
    city: "Gainesville, FL",
    description:
      "An immersive night of luminous synth-pop, live strings, and a stage built to move with the music.",
    priceFrom: 75,
    availability: "Selling fast",
    accent: "#ff6b35",
    secondary: "#ffd166",
    visual: "rings",
    featured: true,
  },
  {
    id: "gators-v-volts",
    title: "Gators vs. Volts",
    artist: "College Basketball",
    category: "Sports",
    date: "Friday, October 23, 2026",
    shortDate: "OCT 23",
    time: "7:30 PM",
    venue: "O'Connell Center",
    city: "Gainesville, FL",
    description:
      "Friday night rivalry basketball with postseason energy and a packed student section.",
    priceFrom: 42,
    availability: "Good availability",
    accent: "#2f80ed",
    secondary: "#66e3c4",
    visual: "court",
  },
  {
    id: "afterlight",
    title: "Afterlight",
    artist: "North American Dance Company",
    category: "Arts",
    date: "Thursday, November 5, 2026",
    shortDate: "NOV 05",
    time: "7:00 PM",
    venue: "Phillips Center",
    city: "Gainesville, FL",
    description:
      "A kinetic contemporary dance program exploring memory, distance, and the shapes we leave behind.",
    priceFrom: 58,
    availability: "Limited seats",
    accent: "#b77cff",
    secondary: "#ff8fab",
    visual: "wave",
  },
  {
    id: "atlas-live",
    title: "Atlas, Live",
    artist: "The Cartographers",
    category: "Music",
    date: "Saturday, November 14, 2026",
    shortDate: "NOV 14",
    time: "8:30 PM",
    venue: "Depot Park Pavilion",
    city: "Gainesville, FL",
    description:
      "A wide-screen indie rock set under the stars, featuring music from the new record Atlas.",
    priceFrom: 49,
    availability: "Good availability",
    accent: "#25c2a0",
    secondary: "#b8f2e6",
    visual: "prism",
  },
];

export function getEvent(id: string) {
  return events.find((event) => event.id === id);
}

const rows = "ABCDEFGHIJ".split("");

export function getSeats(eventId: string): Seat[] {
  const eventOffset = events.findIndex((event) => event.id === eventId) + 1;

  return rows.flatMap((row, rowIndex) =>
    Array.from({ length: 18 }, (_, index) => {
      const number = index + 1;
      const score =
        (rowIndex + 1) * 53 + number * 29 + rowIndex * number * 7 + eventOffset * 11;
      const status =
        score % 17 === 0 || score % 19 === 0
          ? "held"
          : score % 7 === 0 || score % 11 === 0
            ? "sold"
            : "available";

      return {
        id: `${row}${number}`,
        row,
        number,
        section: rowIndex < 3 ? "Floor" : rowIndex < 7 ? "Lower bowl" : "Upper bowl",
        price: rowIndex < 3 ? 145 : rowIndex < 7 ? 110 : 75,
        status,
      } satisfies Seat;
    }),
  );
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}
