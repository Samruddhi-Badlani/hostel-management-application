DROP TABLE IF EXISTS administrator;

CREATE TABLE administrator (
  admin_id SERIAL PRIMARY KEY,
  Fname varchar(255),
  Lname varchar(255),
  phone_no varchar(255),
  address varchar(255),
  salary varchar(255)
);	

INSERT INTO administrator (Fname, Lname, phone_no, address, salary)VALUES
('Surekar','Sharma','9685296741',NULL,30000),
('Anandita','Bose','8569478562',NULL,50000);
 
select * from administrator;
