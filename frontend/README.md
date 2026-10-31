# Queue Frontend

The customer-facing frontend for Concurrent Ticketing Platform.

API mode is the default. Configure TICKETING_API_URL using .env.example.
Set TICKETING_DATA_SOURCE=demo for the standalone prototype.
The server-only src/lib/catalog.ts client maps API cents and event timezones
into display data. API failures show retry UI instead of demo fallback.
Checkout and order lookup in API mode await Part 3.

## Commands

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Source map

```text
src/
├── app/
│   ├── checkout/
│   ├── events/[id]/
│   ├── reservations/[id]/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── checkout.tsx
│   ├── event-detail.tsx
│   ├── event-explorer.tsx
│   ├── event-visual.tsx
│   ├── reservation-status.tsx
│   ├── site-footer.tsx
│   ├── site-header.tsx
│   └── ticketing-provider.tsx
└── lib/
    ├── events.ts
    └── types.ts
```

## Backend integration rule

The typed client in src/lib/catalog.ts owns browsing reads. The mock functions
in src/lib/events.ts remain for explicit demo mode and artwork metadata.
Browser selection state must never be used as proof that a seat is held.
