DROP TABLE IF EXISTS hostel_mess_info; 
CREATE TABLE hostel_mess_info (
	
	hostel_id INTEGER PRIMARY KEY ,
	mess_timing VARCHAR(300),
	cost_per_day NUMERIC,
	FOREIGN KEY(hostel_id)
	REFERENCES hostel(hostel_id)
	ON DELETE CASCADE
	ON UPDATE CASCADE
);

INSERT INTO hostel_mess_info(hostel_id,mess_timing,cost_per_day)
VALUES 
(1,'7.30 am to 9.30 am AND 12.30 pm to 2.30 pm AND 6.30 pm to 9.30 pm ',250),
(2,'7.00 am to 9.30 am AND 1.30 pm to 3.30 pm AND 7.45 pm to 10.45 pm ',290);


SELECT * FROM hostel_mess_info;