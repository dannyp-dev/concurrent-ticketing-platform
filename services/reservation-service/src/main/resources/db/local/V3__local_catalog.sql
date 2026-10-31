INSERT INTO ticket_event VALUES
('neon-echoes','Neon Echoes Tour','Mira Vale','Music','2027-01-17 20:00:00-05','America/New_York','Meridian Arena','Gainesville, FL','An immersive night of luminous synth-pop, live strings, and a stage built to move with the music.'),
('gators-v-volts','Gators vs. Volts','College Basketball','Sports','2027-01-23 19:30:00-05','America/New_York','O''Connell Center','Gainesville, FL','Friday night rivalry basketball with postseason energy and a packed student section.'),
('afterlight','Afterlight','North American Dance Company','Arts','2027-02-05 19:00:00-05','America/New_York','Phillips Center','Gainesville, FL','A contemporary dance program exploring memory and distance.'),
('atlas-live','Atlas, Live','The Cartographers','Music','2027-02-14 20:30:00-05','America/New_York','Depot Park Pavilion','Gainesville, FL','A wide-screen indie rock set under the stars.');

INSERT INTO event_seat (event_id,label,row_label,seat_number,section,price_cents,status)
SELECT e.id, chr(65+r)||n, chr(65+r), n,
 CASE WHEN r<3 THEN 'Floor' WHEN r<7 THEN 'Lower bowl' ELSE 'Upper bowl' END,
 CASE WHEN r<3 THEN 14500 WHEN r<7 THEN 11000 ELSE 7500 END,
 CASE WHEN r=0 AND n=17 THEN 'AVAILABLE'
      WHEN (r*19+n*13)%17=0 THEN 'HELD'
      WHEN (r*19+n*13)%7=0 THEN 'SOLD'
      ELSE 'AVAILABLE' END
FROM ticket_event e CROSS JOIN generate_series(0,9) r CROSS JOIN generate_series(1,18) n;
