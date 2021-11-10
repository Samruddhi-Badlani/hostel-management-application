DROP TABLE IF EXISTS warden;
CREATE TABLE warden(
	staff_id int PRIMARY KEY,
	FOREIGN KEY(staff_id) 
	REFERENCES staff(staff_id)
	ON DELETE CASCADE
	ON UPDATE CASCADE
	);
INSERT INTO warden(staff_id) VALUES
(2),
(3);
select * from warden;