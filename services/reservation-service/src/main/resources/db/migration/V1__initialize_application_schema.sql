-- Establish migration ownership without finalizing the ticketing domain yet.
CREATE TABLE application_metadata (
    key varchar(100) PRIMARY KEY,
    value varchar(255) NOT NULL
);

INSERT INTO application_metadata (key, value)
VALUES ('project', 'concurrent-ticketing-platform');
