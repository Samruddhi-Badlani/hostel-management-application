CREATE TABLE student (
  student_id serial PRIMARY KEY,
  Fname varchar(255),
  Lname varchar(255),
  phone_no varchar(255),
  gender varchar(255),
  year_of_study varchar(255),
  date_of_birth date,
  aadhaar_no varchar(255),
  home_address varchar(255),
  room_id int
  references room(room_id)
  on update cascade
  on delete set null,
  hostel_id int 
  references hostel(hostel_id)
  on update cascade
  on delete set null,
  dept_id int
  references department(dept_id)
  on update cascade
  on delete set null,
  certificate_id int 
  references vaccination_certificate(certificate_id)
  on update cascade
  on delete set null
);	

INSERT INTO student (Fname, Lname, phone_no, gender, year_of_study, date_of_birth, aadhaar_no,home_address,room_id,hostel_id,dept_id,certificate_id )VALUES
('Prajwal','Ghoradkar','9898989898','M','2019-2023','2000-02-01','1231 2121 2000',NULL,1,1,1,860753),
('Shivansh','Tiwari','9444989898','M','2019-2023','2001-01-01','1111 2001 5200',NULL,2,2,2,127381),
('Alia','Lambore','9856489652','F','2020-2024','2002-11-09','5231 6875 2000',NULL,3,1,3,218982),
('Bharat','Paliwal','6826589654','M','2020-2024','2001-10-10','8465 2432 2097',NULL,4,2,4,373748),
('Chetali','Vishwas','8596456321','F','2019-2023','2001-05-04','3256 2121 6598',NULL,5,1,5,574839),
('Gurpreet','Kaur','9545625463','F','2019-2023','2000-02-06','2000 5642 4651',NULL,6,2,6,639575);

select * from student;
