# Concurrent Ticketing Platform

A full-stack ticket reservation project built to explore concurrency, database
correctness, and performance through a realistic customer experience.

The repository currently contains the complete interactive frontend prototype.
The Spring Boot reservation service and PostgreSQL database will be added next,
after the domain model is discussed and agreed upon.

## Current structure

```text
concurrent-ticketing-platform/
├── docs/
│   ├── development-log.md
│   └── frontend-architecture.md
├── frontend/
│   └── Next.js application
└── README.md
```

No Redis, Kafka, Go service, Kubernetes, Terraform, or cloud infrastructure has
been introduced.

## Run the frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000`.

## Validate the frontend

```bash
cd frontend
npm run lint
npm run build
```

## Implemented user journey

1. Browse and filter upcoming events.
2. Open a detailed event page.
3. Inspect a live-style seat map.
4. Select up to six available seats.
5. See held and sold seats as unavailable.
6. Start a seven-minute checkout hold.
7. Review transparent order pricing.
8. Complete a simulated checkout.
9. View the confirmed reservation and mobile ticket.

## Important prototype boundary

The frontend currently uses deterministic in-memory event and seat data. It
does not claim to prevent double booking. The Spring Boot API and PostgreSQL
transactions will become the authority for seat state, holds, and reservation
confirmation.

The UI explicitly uses seat A17 to foreshadow the central concurrency exercise:
two users attempting to reserve the same seat at the same time.

## Documentation

- [Frontend architecture](docs/frontend-architecture.md)
- [Development log](docs/development-log.md)

The same project history is maintained in the local Obsidian vault under
`10 - Projects/Concurrent Ticketing Platform`.
