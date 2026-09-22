export type EventCategory = "Music" | "Sports" | "Arts";

export type TicketEvent = {
  id: string;
  title: string;
  artist: string;
  category: EventCategory;
  date: string;
  shortDate: string;
  time: string;
  venue: string;
  city: string;
  description: string;
  priceFrom: number;
  availability: "Selling fast" | "Good availability" | "Limited seats";
  accent: string;
  secondary: string;
  visual: "rings" | "wave" | "court" | "prism";
  featured?: boolean;
};

export type SeatStatus = "available" | "held" | "sold";

export type Seat = {
  id: string;
  row: string;
  number: number;
  section: string;
  price: number;
  status: SeatStatus;
};

export type ReservationRecord = {
  id: string;
  orderNumber: string;
  eventId: string;
  seatIds: string[];
  total: number;
  status: "CONFIRMED";
  purchaserName: string;
  purchaserEmail: string;
  confirmedAt: string;
};
