DROP TABLE IF EXISTS solves;
CREATE TABLE solves(
	query_id SERIAL,
	staff_id int,
	no_hours int,
	PRIMARY KEY(query_id,staff_id),
	FOREIGN  KEY(staff_id) 
	  REFERENCES staff(staff_id)
	ON DELETE CASCADE
	ON UPDATE CASCADE
	);
INSERT INTO solves(staff_id,no_hours) VALUES
(2,5),
(3,4);
select * from solves;