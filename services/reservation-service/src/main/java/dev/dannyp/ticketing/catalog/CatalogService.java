package dev.dannyp.ticketing.catalog;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import static dev.dannyp.ticketing.catalog.CatalogRepository.*;

@Service
@Transactional(readOnly = true)
public class CatalogService {
    private final CatalogRepository repository;
    public CatalogService(CatalogRepository repository) { this.repository = repository; }

    public EventPage list(int page, int size) {
        if (page < 0 || size < 1 || size > 100)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "page must be nonnegative; size must be 1 to 100");
        return repository.list(page, size);
    }

    public EventView event(String id) {
        return repository.find(id).orElseThrow(() ->
            new ResponseStatusException(HttpStatus.NOT_FOUND, "Event not found"));
    }

    public List<SeatView> seats(String id) {
        event(id);
        return repository.seats(id);
    }
}
