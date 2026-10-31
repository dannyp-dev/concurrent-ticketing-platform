package dev.dannyp.ticketing.catalog;

import java.util.List;
import org.springframework.web.bind.annotation.*;
import static dev.dannyp.ticketing.catalog.CatalogRepository.*;

@RestController
@RequestMapping("/api/events")
public class CatalogController {
    private final CatalogService service;
    public CatalogController(CatalogService service) { this.service = service; }

    @GetMapping
    public EventPage list(@RequestParam(defaultValue="0") int page,
                          @RequestParam(defaultValue="20") int size) {
        return service.list(page, size);
    }
    @GetMapping("/{id}")
    public EventView event(@PathVariable String id) { return service.event(id); }
    @GetMapping("/{id}/seats")
    public List<SeatView> seats(@PathVariable String id) { return service.seats(id); }
}
