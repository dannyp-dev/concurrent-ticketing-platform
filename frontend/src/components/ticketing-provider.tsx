"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getSeats } from "@/lib/events";
import type { ReservationRecord } from "@/lib/types";

type TicketingContextValue = {
  selectedSeats: Record<string, string[]>;
  reservation: ReservationRecord | null;
  holdExpiresAt: number | null;
  toggleSeat: (eventId: string, seatId: string) => void;
  clearSeats: (eventId: string) => void;
  beginHold: () => void;
  confirmReservation: (input: {
    eventId: string;
    name: string;
    email: string;
  }) => ReservationRecord;
};

const TicketingContext = createContext<TicketingContextValue | null>(null);

export function TicketingProvider({ children }: { children: ReactNode }) {
  const [selectedSeats, setSelectedSeats] = useState<Record<string, string[]>>({});
  const [reservation, setReservation] = useState<ReservationRecord | null>(null);
  const [holdExpiresAt, setHoldExpiresAt] = useState<number | null>(null);

  const toggleSeat = useCallback((eventId: string, seatId: string) => {
    setSelectedSeats((current) => {
      const eventSeats = current[eventId] ?? [];
      const nextSeats = eventSeats.includes(seatId)
        ? eventSeats.filter((id) => id !== seatId)
        : eventSeats.length < 6
          ? [...eventSeats, seatId]
          : eventSeats;

      return { ...current, [eventId]: nextSeats };
    });
  }, []);

  const clearSeats = useCallback((eventId: string) => {
    setSelectedSeats((current) => ({ ...current, [eventId]: [] }));
    setHoldExpiresAt(null);
  }, []);

  const beginHold = useCallback(() => {
    setHoldExpiresAt(Date.now() + 7 * 60 * 1000);
  }, []);

  const confirmReservation = useCallback(
    ({ eventId, name, email }: { eventId: string; name: string; email: string }) => {
      const seatIds = selectedSeats[eventId] ?? [];
      const seatById = new Map(getSeats(eventId).map((seat) => [seat.id, seat]));
      const subtotal = seatIds.reduce(
        (total, seatId) => total + (seatById.get(seatId)?.price ?? 0),
        0,
      );
      const now = new Date();
      const record: ReservationRecord = {
        id: `RSV-${now.getFullYear()}-${String(now.getTime()).slice(-6)}`,
        orderNumber: `QL-${String(now.getTime()).slice(-8)}`,
        eventId,
        seatIds,
        total: subtotal + Math.round(subtotal * 0.08) + 12,
        status: "CONFIRMED",
        purchaserName: name,
        purchaserEmail: email,
        confirmedAt: now.toISOString(),
      };

      setReservation(record);
      setHoldExpiresAt(null);
      return record;
    },
    [selectedSeats],
  );

  const value = useMemo(
    () => ({
      selectedSeats,
      reservation,
      holdExpiresAt,
      toggleSeat,
      clearSeats,
      beginHold,
      confirmReservation,
    }),
    [
      selectedSeats,
      reservation,
      holdExpiresAt,
      toggleSeat,
      clearSeats,
      beginHold,
      confirmReservation,
    ],
  );

  return <TicketingContext.Provider value={value}>{children}</TicketingContext.Provider>;
}

export function useTicketing() {
  const context = useContext(TicketingContext);
  if (!context) {
    throw new Error("useTicketing must be used inside TicketingProvider");
  }
  return context;
}
