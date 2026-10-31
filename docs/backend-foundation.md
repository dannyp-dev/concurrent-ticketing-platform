# Backend foundation and three-part plan

Part 1 establishes Spring Boot 4.1.2, Java 25, Maven Wrapper, PostgreSQL 18
Compose configuration, Flyway migrations, Actuator health, and an integration
test that checks migration history and a database query.

Java 25.0.5 is installed. Compilation and test compilation succeeded. The
database integration test failed because PostgreSQL was unavailable. Docker
Desktop crashed during startup. At Danny's request, do not start Docker again
unless he explicitly requests it. Startup and database health are unverified.

## Run when PostgreSQL is independently available

Set JAVA_HOME to the installed Java 25 JDK in your terminal. The user-level
JAVA_HOME still points to Java 17, so existing terminals need an explicit
override. No global Java 17 installation was removed.

The service accepts DB_URL, DB_USER, DB_PASSWORD, and PORT environment variables.
Defaults target localhost:5433/ticketing with local-only Compose credentials.
From services/reservation-service run `./mvnw.cmd test` and
`./mvnw.cmd spring-boot:run`. Check `/actuator/health` on port 8080.
The integration test requires a disposable development PostgreSQL database.

## Milestones

1. Foundation, recorded with database verification pending.
2. Read-only event and seat API, seed data, frontend browsing integration.
3. Basic reservation create/read/cancel/confirm flow and checkout integration.

Stop after each part. Part 3 requires a new instruction from Danny.

## Domain proposal for review

Start with an Event and seats owned by that specific event. A seat label such as
A17 is unique within an event, not globally. Prices use integer USD cents in the
database and API. Event start times use timezone-aware timestamps. A future
reservation groups one or more event seats; an order records confirmation.
Reservation states and payment semantics remain subject to discussion in Part 3.
Reusable venue maps can be introduced later if multiple events need them.
