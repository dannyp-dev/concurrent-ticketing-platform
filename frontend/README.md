# Queue Frontend

The customer-facing frontend for Concurrent Ticketing Platform.

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

Replace the mock functions in `src/lib/events.ts` with a typed HTTP client while
keeping PostgreSQL and the Spring Boot service authoritative. Browser selection
state must never be used as proof that a seat is held or reserved.
