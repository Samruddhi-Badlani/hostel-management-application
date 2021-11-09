DROP TABLE IF EXISTS mess_staff; 
CREATE TABLE  mess_staff (
	staff_id INTEGER PRIMARY KEY,
	mess_id INTEGER,
	FOREIGN KEY(staff_id)
	REFERENCES staff(staff_id)
	ON DELETE CASCADE
	ON UPDATE CASCADE,
	FOREIGN KEY(mess_id)
	REFERENCES mess(mess_id)
	ON DELETE SET NULL
	ON UPDATE CASCADE
);
INSERT INTO mess_staff(staff_id,mess_id)
VALUES 
(11,1),
(13,2),
(9,3),
(3,4),
(2,5),
(10,6),
(12,7),
(5,8);
SELECT * FROM mess_staff