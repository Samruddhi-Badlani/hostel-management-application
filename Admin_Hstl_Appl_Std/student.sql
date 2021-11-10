
CREATE TABLE Student (
  Student_id varchar(255)NOT NULL PRIMARY KEY,
  Fname varchar(255),
  Lname varchar(255),
  phone_no varchar(255),
  gender varchar(255),
  year_of_study varchar(255),
  date_of_birth date,
  aadhaar_no varchar(255),
  home_address varchar(255)
);	

INSERT INTO Student (Student_id,Fname, Lname, phone_no, gender, year_of_study, date_of_birth, aadhaar_no,home_address )VALUES
('0801CS11','Prajwal','Ghoradkar','9898989898','M','2019-2023','2000-02-01','1231 2121 2000',NULL),
('0801CS12','Shivansh','Tiwari','9444989898','M','2019-2023','2001-01-01','1111 2001 5200',NULL),
('0801CS13','Alia','Lambore','9856489652','F','2020-2024','2002-11-09','5231 6875 2000',NULL),
('0801CS14','Bharat','Paliwal','6826589654','M','2020-2024','2001-10-10','8465 2432 2097',NULL),
('0801CS15','Chetali','Vishwas','8596456321','F','2019-2023','2001-05-04','3256 2121 6598',NULL),
('0801CS16','Gurpreet','Kaur','9545625463','F','2019-2023','2000-02-06','2000 5642 4651',NULL);

select * from Student;
