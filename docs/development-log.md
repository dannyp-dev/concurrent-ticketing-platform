# Development Log

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
