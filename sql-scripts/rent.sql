DROP TABLE IF EXISTS rent;
CREATE TABLE rent (
	transaction_id SERIAL PRIMARY KEY,
	paid_date timestamp,
	amount numeric,
	student_id INTEGER,
	FOREIGN KEY(student_id)
	REFERENCES student(student_id)
	ON DELETE CASCADE
	ON UPDATE CASCADE
);

INSERT INTO rent(paid_date,amount,student_id) VALUES
('2021-11-09 12:05:06',5000,1),
('2021-10-19 14:45:06',4000,2),
('2021-09-13 15:25:06',2000,3),
('2021-09-13 16:35:06',5000,1),
('2020-07-13 13:15:06',3000,4),
('2020-08-13 10:25:06',6000,5),
('2020-08-13 14:15:06',6000,5),
('2020-01-19 09:15:06',2000,6),
('2020-03-11 19:15:06',3000,7),
('2020-04-15 08:25:06',1000,8),
('2021-03-14 18:15:06',9000,9),
('2021-03-13 10:15:06',3000,10),
('2021-08-22 11:35:06',2000,11);
select * from rent;