# Frontend Architecture

## October 30 update

Read-only API integration is implemented in src/lib/catalog.ts. Server routes
now fetch events and seats from Spring Boot in API mode. Explicit demo mode
retains the original prototype described below. See catalog-api.md for current
configuration and verification limits. Checkout and reservation lookup remain
disabled in API mode until Part 3.

## Purpose

The frontend makes the reservation lifecycle visible before the backend is
implemented. It defines the screens and interaction contract that the future
Spring Boot API must support without pretending that browser state provides
reservation correctness.

## Technology

- Next.js 16.3.5 with the App Router
- React 19.2.8
- TypeScript
- Native CSS with responsive breakpoints
- No component library
- No global state dependency

The versions come from the current stable Next.js starter. The project uses the
starter's compatible React and TypeScript ranges instead of forcing unrelated
package upgrades.

## Route map

| Route | Responsibility |
| --- | --- |
| `/` | Event discovery, filtering, and featured event |
| `/events/[id]` | Event detail and interactive seat selection |
| `/checkout?event=[id]` | Timed hold presentation and simulated checkout |
| `/reservations/[id]` | Confirmation and reservation status |

## Component boundaries

- `EventExplorer` owns client-side category filtering.
- `EventDetail` owns seat-map interaction and selected-seat totals.
- `Checkout` owns the countdown, form, and transparent pricing summary.
- `ReservationStatus` presents the confirmed result.
- `TicketingProvider` preserves the prototype selection and reservation across
  client-side route transitions.
- `lib/events.ts` is the temporary data boundary that the API client will
  eventually replace.

Server components render the route shells and static event data. Client
components are limited to interactions that require browser state.

## State model

The prototype tracks selected seat IDs by event, the current hold expiration
timestamp, and the latest confirmed reservation.

This state intentionally resets after a full browser refresh. Persistence and
cross-user correctness must come from PostgreSQL through the Spring Boot API.

## Seat states

- `available`: selectable by the current user
- `held`: unavailable because another buyer is represented as holding it
- `sold`: permanently unavailable in the current event view
- selected: a presentation-only state layered on an available seat

The UI never treats selection as a confirmed reservation. The copy states that
the server must confirm the hold.

## Planned API boundary

The first backend integration will likely require operations shaped around
listing events, reading event and seat availability, creating a seat hold with
an idempotency key, reading a reservation, confirming a purchase, and cancelling
or expiring a hold.

Exact resources and reservation states remain open until the domain-model
discussion.

## Accessibility and responsive behavior

- Seat buttons expose section, seat ID, price, and state to assistive tools.
- Sold and held seats are disabled.
- Navigation and forms use semantic elements and visible labels.
- Motion is removed when the user requests reduced motion.
- The seat map scrolls horizontally on smaller screens.
- Checkout and confirmation layouts collapse into a single column.

## Honest limitations

- No real API calls
- No database authority
- No authentication
- No real payment processor
- No cross-tab or cross-user synchronization
- No claim that the countdown creates a real hold
- Search and add-to-calendar controls are visual placeholders
