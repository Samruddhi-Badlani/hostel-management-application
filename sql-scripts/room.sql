create table room (room_id serial primary key , rent_amount int , room_type varchar(50) , capacity int ,
				  hostel_id int 
				  references hostel(hostel_id)
				  on update cascade on delete set null);
insert into 
room(rent_amount,room_type,capacity,hostel_id) 
values
(5000,'Isolated',1,1),
(13000,'Non-Isolated',4,2),
(13000,'Non-Isolated',4,1),
(13000,'Non-Isolated',4,2),
(13000,'Non-Isolated',4,1),
(13000,'Non-Isolated',4,2),
(13000,'Non-Isolated',4,1),
(15000,'Isolated',1,2),
(15000,'Isolated',1,1),
(15000,'Isolated',1,2),
(15000,'Isolated',1,1);
select * from room;