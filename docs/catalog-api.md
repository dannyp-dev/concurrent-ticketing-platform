# Part 2: Event catalog

## Contract

- GET /api/events?page=0&size=20 returns items, page, size, total.
- GET /api/events/{id} returns event metadata or HTTP 404.
- GET /api/events/{id}/seats returns ordered seats or HTTP 404 for a missing event.
- Invalid pagination returns HTTP 400. Maximum page size is 100.
- Prices are integer USD cents in JSON and PostgreSQL.
- Event timestamps include an offset, with a separate IANA timezone for display.
- Seat labels are unique per event. A17 is not a global identifier.

CatalogRepository uses parameterized SQL through Spring JdbcClient, returning
explicit Java record DTOs. CatalogService defines read-only transaction boundaries
and missing-resource behavior. CatalogController exposes the public REST routes.
JPA remains installed for the later reservation domain; read queries use SQL to
keep their ordering and price aggregation explicit.

## Development database

V2 creates event inventory tables and constraints. The local profile opts into
V3 development fixtures: four events in January/February 2027, 180 seats per
event, and available A17 seats. HELD/SOLD fixtures are demonstration states, not
real reservations or time-limited holds.

With a PostgreSQL instance provided independently, configure DB_URL, DB_USER,
DB_PASSWORD. Use a disposable development database. Set JAVA_HOME to the installed
Java 25 directory and run from services/reservation-service:

    ./mvnw.cmd spring-boot:run -Dspring-boot.run.profiles=local

No command in this milestone starts Docker. Production/default migration
locations exclude local fixtures. Never reuse a seeded local database as a
production database because its migration history contains local-only V3.

## Frontend

Next.js Server Components call Spring Boot via TICKETING_API_URL. Requests use
no-store and a five-second timeout. Event artwork remains frontend presentation
metadata; names, dates, prices and seats come from the API. No fallback to mock
data occurs if the API fails. A retry boundary handles failure and an empty
catalog has its own message. API mode disables prototype checkout and order
lookup until Part 3. TICKETING_DATA_SOURCE=demo explicitly restores the old demo.

## Verification

Five standalone MVC/service tests pass with a mocked repository: pagination,
invalid parameters, event detail, missing event/seat inventory, and seat JSON.
These tests do not verify PostgreSQL SQL execution, JDBC record mapping, Flyway,
or a real browser-to-database journey. Those checks await a working PostgreSQL
instance. The foundation integration test intentionally still requires one.

Frontend ESLint and the optimized production build pass. No live API preview or
successful database integration has been claimed.

## Review before Part 3

Event-specific seats and cents are the initial read model. Discuss reservation
ownership, state transitions, multi-seat atomicity, hold duration, and order
semantics before implementing writes. No concurrency guarantee is claimed yet.
