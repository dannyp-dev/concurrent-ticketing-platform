# Development Log

## October 30, 2026: Part 2

- Added PostgreSQL event/seat schema and opt-in local fixtures.
- Added parameterized read queries, DTOs, service boundaries and three REST routes.
- Five catalog API tests passed without starting Docker.
- Connected frontend browsing and seat maps to the REST API through server fetches.
- Added explicit demo mode, empty catalog handling, and retry UI.
- Disabled prototype checkout in API mode until Part 3.
- PostgreSQL migration/JDBC/runtime checks remain pending; no successful database
  integration is claimed. Docker launch attempts remain prohibited.

## October 30, 2026: Part 1

- Installed Temurin Java 25.0.5 and generated Spring Boot 4.1.2 with Maven Wrapper.
- Added local PostgreSQL Compose configuration and a Flyway bootstrap migration.
- Added an integration test verifying migrated database content.
- Java compilation succeeded; integration tests failed on database connection.
- Docker Desktop crashed during startup. Stopped all launch attempts at Danny's
  request. Database startup and runtime health remain unverified.
- See backend-foundation.md for run instructions and the three-part scope.

## September 21, 2026

### Repository and environment

- Created the private GitHub repository.
- Cloned it into the local Codex workspace.
- Opened the repository in a new VS Code window.
- Inspected Git, GitHub CLI, Java, Node.js, package managers, Docker, PostgreSQL
  tools, and installed VS Code extensions before installing project packages.
- Confirmed that Java 25 is not yet installed and Docker Engine is not running.

### Frontend foundation

- Generated the frontend with Next.js 16.3.5 and the App Router.
- Kept the dependency set intentionally small.
- Used native CSS instead of adding Tailwind or a UI component library.
- Consulted the installed Next.js 16 documentation before implementing routes.

### Product experience

- Created the Queue visual identity.
- Added a featured-event landing experience.
- Added category filters and four event cards.
- Added event detail pages with generated static parameters.
- Added an accessible 180-seat map for every event.
- Added available, held, sold, and selected seat states.
- Preserved seat A17 as the visible concurrency example.
- Added a six-seat selection limit and transparent subtotal.
- Added a seven-minute checkout countdown.
- Added simulated contact and payment forms.
- Added service-fee and delivery-fee disclosure.
- Added reservation confirmation with a mobile ticket treatment.
- Added loading and not-found states.

### Corrections during visual QA

- Reworked the seat-row layout to make aisle spacing deterministic.
- Improved the mock seat hash so an entire row could not accidentally share one
  unavailable state.
- Verified the complete A17 flow from selection through confirmation.

### Validation

- ESLint passed.
- The optimized production build passed.
- All four event routes were statically generated.
- The home, seat-map, checkout, and confirmation layouts were inspected in the
  browser.
- The frontend was tested by selecting A17 and completing the simulated order.

### Next milestone

Discuss and finalize the initial domain model before generating the Spring Boot
service. The first backend slice should expose event browsing and read-only seat
availability before implementing unsafe reservation logic and its race test.
