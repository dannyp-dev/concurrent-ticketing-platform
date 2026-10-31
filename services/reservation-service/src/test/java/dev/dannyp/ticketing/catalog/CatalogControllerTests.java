package dev.dannyp.ticketing.catalog;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import static dev.dannyp.ticketing.catalog.CatalogRepository.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class CatalogControllerTests {
    CatalogRepository repository;
    MockMvc mvc;
    EventView event = new EventView("neon-echoes", "Neon Echoes Tour", "Mira Vale",
        "Music", OffsetDateTime.parse("2027-01-18T01:00:00Z"), "America/New_York",
        "Meridian Arena", "Gainesville, FL", "Live music", 7500);

    @BeforeEach void setup() {
        repository = mock(CatalogRepository.class);
        mvc = MockMvcBuilders.standaloneSetup(
            new CatalogController(new CatalogService(repository))).build();
    }
    @Test void listsWithPagination() throws Exception {
        when(repository.list(0,20)).thenReturn(new EventPage(List.of(event),0,20,1));
        mvc.perform(get("/api/events")).andExpect(status().isOk())
            .andExpect(jsonPath("$.items[0].priceFromCents").value(7500))
            .andExpect(jsonPath("$.total").value(1));
    }
    @Test void rejectsInvalidPagination() throws Exception {
        for (String query : List.of("?page=-1", "?size=0", "?size=101", "?page=no")) {
            mvc.perform(get("/api/events"+query)).andExpect(status().isBadRequest());
        }
        verifyNoInteractions(repository);
    }
    @Test void returns404ForMissingEventAndItsSeats() throws Exception {
        when(repository.find("missing")).thenReturn(Optional.empty());
        mvc.perform(get("/api/events/missing")).andExpect(status().isNotFound());
        mvc.perform(get("/api/events/missing/seats")).andExpect(status().isNotFound());
        verify(repository, never()).seats(anyString());
    }
    @Test void returnsSeatContract() throws Exception {
        when(repository.find("neon-echoes")).thenReturn(Optional.of(event));
        when(repository.seats("neon-echoes")).thenReturn(
            List.of(new SeatView("A17","A",17,"Floor",14500,"AVAILABLE")));
        mvc.perform(get("/api/events/neon-echoes/seats")).andExpect(status().isOk())
            .andExpect(jsonPath("$[0].id").value("A17"))
            .andExpect(jsonPath("$[0].priceCents").value(14500))
            .andExpect(jsonPath("$[0].status").value("AVAILABLE"));
    }
    @Test void returnsDetail() throws Exception {
        when(repository.find("neon-echoes")).thenReturn(Optional.of(event));
        mvc.perform(get("/api/events/neon-echoes")).andExpect(status().isOk())
            .andExpect(jsonPath("$.id").value("neon-echoes"));
    }
}
