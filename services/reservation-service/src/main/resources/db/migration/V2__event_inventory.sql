CREATE TABLE ticket_event (
 id varchar(80) PRIMARY KEY,
 title varchar(200) NOT NULL,
 artist varchar(200) NOT NULL,
 category varchar(20) NOT NULL CHECK (category IN ('Music','Sports','Arts')),
 starts_at timestamptz NOT NULL,
 time_zone varchar(80) NOT NULL,
 venue varchar(200) NOT NULL,
 city varchar(200) NOT NULL,
 description text NOT NULL
);
CREATE TABLE event_seat (
 event_id varchar(80) NOT NULL REFERENCES ticket_event(id),
 label varchar(10) NOT NULL,
 row_label varchar(4) NOT NULL,
 seat_number integer NOT NULL CHECK (seat_number > 0),
 section varchar(80) NOT NULL,
 price_cents integer NOT NULL CHECK (price_cents >= 0),
 status varchar(20) NOT NULL CHECK (status IN ('AVAILABLE','HELD','SOLD')),
 PRIMARY KEY (event_id, label),
 UNIQUE (event_id, row_label, seat_number)
);
