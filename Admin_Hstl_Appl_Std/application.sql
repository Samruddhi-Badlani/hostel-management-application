DROP TABLE IF EXISTS application;

CREATE TABLE application (
  application_id SERIAL PRIMARY KEY,
  student_id varchar(255) NOT NULL,
  room_no int DEFAULT NULL,
  FOREIGN KEY (student_id) 
  REFERENCES student(student_id)
  ON DELETE SET NULL
  ON UPDATE CASCADE
 
);


INSERT INTO application (student_id,room_no) values
('0801CS11',1),
('0801CS12',1),
('0801CS13',2),
('0801CS14',1),
('0801CS15',2);


select * from application

