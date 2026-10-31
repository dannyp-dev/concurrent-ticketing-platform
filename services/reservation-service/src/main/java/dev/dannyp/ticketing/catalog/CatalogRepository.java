package dev.dannyp.ticketing.catalog;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

@Repository
public class CatalogRepository {
    private final JdbcClient jdbc;
    public CatalogRepository(JdbcClient jdbc) { this.jdbc = jdbc; }

    public record EventView(String id, String title, String artist, String category,
        OffsetDateTime startsAt, String timeZone, String venue, String city,
        String description, Integer priceFromCents) {}
    public record SeatView(String id, String row, int number, String section,
        int priceCents, String status) {}
    public record EventPage(List<EventView> items, int page, int size, long total) {}

    private static final String EVENTS = """
        SELECT e.id, e.title, e.artist, e.category, e.starts_at, e.time_zone,
               e.venue, e.city, e.description,
               (SELECT min(s.price_cents) FROM event_seat s WHERE s.event_id=e.id) AS price_from_cents
        FROM ticket_event e
        """;

    public EventPage list(int page, int size) {
        var items = jdbc.sql(EVENTS + " ORDER BY e.starts_at, e.id LIMIT :size OFFSET :offset")
            .param("size", size).param("offset", (long) page * size)
            .query(EventView.class).list();
        long total = jdbc.sql("SELECT count(*) FROM ticket_event").query(Long.class).single();
        return new EventPage(items, page, size, total);
    }

    public Optional<EventView> find(String id) {
        return jdbc.sql(EVENTS + " WHERE e.id=:id").param("id", id).query(EventView.class).optional();
    }

    public List<SeatView> seats(String id) {
        return jdbc.sql("""
            SELECT label AS id, row_label AS "row", seat_number AS number,
                   section, price_cents, status
            FROM event_seat WHERE event_id=:id ORDER BY row_label, seat_number
            """).param("id", id).query(SeatView.class).list();
    }
}
