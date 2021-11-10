DROP TABLE IF EXISTS visitor;

CREATE TABLE visitor(
  Vname varchar(255) NOT NULL PRIMARY KEY,
  OUT_date timestamp,
  IN_date timestamp

  );

INSERT INTO visitor( Vname, OUT_date , IN_date ) VALUES 
('Prakash','2021-10-10  12:00:00 ','2021-10-10  10:00:00'),

('Shivam','2021-09-08  17:05:00 ','2021-09-08  21:00:00');

select * from visitor;