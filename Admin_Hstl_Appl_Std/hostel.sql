CREATE TABLE Hostel (
  hostel_id int PRIMARY KEY,
  hostel_name varchar(255),
  phone_no int, 	
  no_of_rooms int,
  no_of_students int,
  admin_id int 
  references administrator(admin_id)
  on update cascade
  on delete set null
);

INSERT INTO Hostel(hostel_id, hostel_name, phone_no, no_of_rooms, no_of_students,admin_id) VALUES 
( '1','B',0731224455,200,NULL,1),
( '2','G',0731225544,200,NULL,2);

select * from Hostel;