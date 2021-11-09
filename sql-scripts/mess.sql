DROP TABLE IF EXISTS mess;
CREATE TABLE mess (
	mess_id SERIAL PRIMARY KEY,
	mess_name VARCHAR(1000),
	hostel_id INTEGER ,
	FOREIGN KEY(hostel_id)
	REFERENCES hostel(hostel_id)
	ON DELETE SET NULL
	ON UPDATE CASCADE
);
INSERT INTO mess(mess_name,hostel_id)
VALUES
('Clock Inn Mess',1),
('Freehand Mess ',1),
('Amity Mess',2),
('Hom Cooking Mess',2),
('Dulce Dream',3),
('Art Gallery Mess',3),
('The Farm Mess',4),
('BlaBla Mess',4);
SELECT * FROM mess;