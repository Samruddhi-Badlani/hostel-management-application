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