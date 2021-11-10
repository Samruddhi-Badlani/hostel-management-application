CREATE TABLE Hostel (
  hostel_id int PRIMARY KEY,
  hostel_name varchar(255),
  phone_no int, 	
  no_of_rooms varchar(255),
  no_of_students varchar(255)
);

INSERT INTO Hostel(hostel_id, hostel_name, phone_no, no_of_rooms, no_of_students) VALUES 
( '1','B',0731224455,'200',NULL),
( '2','G',0731225544,'200',NULL);

select * from Hostel;
