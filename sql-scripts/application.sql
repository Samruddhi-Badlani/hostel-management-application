DROP TABLE IF EXISTS application;

CREATE TABLE application (
  application_id SERIAL PRIMARY KEY,
  student_id int NOT NULL,
  room_no int DEFAULT NULL,
  FOREIGN KEY (student_id) 
  REFERENCES student(student_id)
  ON DELETE SET NULL
  ON UPDATE CASCADE,
  FOREIGN KEY (room_no) 
  REFERENCES room(room_id)
  ON DELETE SET NULL
  ON UPDATE CASCADE
 
);


INSERT INTO application (student_id,room_no) values
(1,1),
(2,1),
(3,2),
(4,1),
(5,2);


select * from application;

