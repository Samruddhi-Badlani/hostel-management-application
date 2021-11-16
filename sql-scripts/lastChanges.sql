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
DROP TABLE IF EXISTS warden;
DROP TABLE IF EXISTS mess_staff;
DROP TABLE IF EXISTS mess ;
CREATE TABLE mess (
	mess_id SERIAL PRIMARY KEY,
	mess_name VARCHAR(1000),
	hostel_id INTEGER ,
	mess_timing VARCHAR(300),
	cost_per_day NUMERIC,
	FOREIGN KEY(hostel_id)
	REFERENCES hostel(hostel_id)
	ON DELETE SET NULL
	ON UPDATE CASCADE
);
INSERT INTO mess(mess_name,hostel_id,mess_timing,cost_per_day)
VALUES
('Clock Inn Mess',1,'7.30 am to 9.30 am AND 12.30 pm to 2.30 pm AND 6.30 pm to 9.30 pm ',250),
('Freehand Mess ',1,'7.00 am to 9.30 am AND 1.30 pm to 3.30 pm AND 7.45 pm to 10.45 pm ',290),
('Amity Mess',2,'7.00 am to 9.30 am AND 1.30 pm to 3.30 pm AND 7.45 pm to 10.45 pm ',290),
('Hom Cooking Mess',2,'7.30 am to 9.30 am AND 12.30 pm to 2.30 pm AND 6.30 pm to 9.30 pm ',250),
('Dulce Dream',1,'7.30 am to 9.30 am AND 12.30 pm to 2.30 pm AND 6.30 pm to 9.30 pm ',250),
('Art Gallery Mess',1,'7.00 am to 9.30 am AND 1.30 pm to 3.30 pm AND 7.45 pm to 10.45 pm ',290),
('The Farm Mess',2,'7.00 am to 9.30 am AND 1.30 pm to 3.30 pm AND 7.45 pm to 10.45 pm ',290),
('BlaBla Mess',2,'7.30 am to 9.30 am AND 12.30 pm to 2.30 pm AND 6.30 pm to 9.30 pm ',250);
SELECT * FROM mess;
DROP TABLE IF EXISTS room_furniture;
DROP TABLE IF EXISTS hostel_mess_info;
DROP TABLE IF EXISTS  furniture;
CREATE TABLE furniture (
	furniture_id SERIAL PRIMARY KEY,
	furniture_type VARCHAR(100),
	room_id INTEGER,
	FOREIGN KEY(room_id)
	REFERENCES room(room_id)
	ON DELETE CASCADE
	
);

INSERT INTO furniture(furniture_type,room_id)

VALUES
('Sofa',1),
('Table',2),
('Bed',3),
('Chair',4),
('desks',5),
('matresses',6),
('dresser',7),
('ottoman',8);


SELECT * FROM furniture;

drop table if exists  furniture_type_info;

DROP TABLE IF EXISTS visitor;

DROP TABLE IF EXISTS rent;
CREATE TABLE rent (
	transaction_id SERIAL PRIMARY KEY,
	paid_date timestamp,
	amount numeric,
	student_id INTEGER,
	admin_id INTEGER,
	FOREIGN KEY(student_id)
	REFERENCES student(student_id)
	ON DELETE CASCADE
	ON UPDATE CASCADE,
	FOREIGN KEY(admin_id)
	REFERENCES administrator(admin_id)
	ON DELETE SET NULL
	ON UPDATE CASCADE
);

INSERT INTO rent(paid_date,amount,student_id,admin_id) VALUES
('2021-11-09 12:05:06',5000,1,1),
('2021-10-19 14:45:06',4000,2,1),
('2021-09-13 15:25:06',2000,3,2),
('2021-09-13 16:35:06',5000,1,1),
('2020-07-13 13:15:06',3000,4,1),
('2020-08-13 10:25:06',6000,5,2),
('2020-08-13 14:15:06',6000,5,1),
('2020-01-19 09:15:06',2000,6,2);
select * from rent;