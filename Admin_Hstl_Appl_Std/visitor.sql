DROP TABLE IF EXISTS visitor;

CREATE TABLE visitor(
  visitor_id serial primary key,
  Vname varchar(255) NOT NULL,
  OUT_date timestamp,
  IN_date timestamp,
  student_id int 
  references student(student_id)
  on update cascade
  on delete set null
  );

INSERT INTO visitor( Vname, OUT_date , IN_date ,student_id) VALUES 
('Prakash','2021-10-10  12:00:00 ','2021-10-10  10:00:00',1),

('Shivam','2021-09-08  17:05:00 ','2021-09-08  21:00:00',2);

select * from visitor;
