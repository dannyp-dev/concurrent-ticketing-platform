package dev.dannyp.ticketing;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.boot.test.context.SpringBootTest;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class ReservationServiceApplicationTests {
    @Autowired
    JdbcTemplate jdbc;

	@Test
	void contextLoads() {
		assertThat(jdbc.queryForObject(
            "SELECT value FROM application_metadata WHERE key = 'project'", String.class))
            .isEqualTo("concurrent-ticketing-platform");
		assertThat(jdbc.queryForObject(
            "SELECT count(*) FROM flyway_schema_history WHERE success = true", Integer.class))
            .isPositive();
	}

}
