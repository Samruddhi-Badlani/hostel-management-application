create table room (room_id serial primary key , rent_amount int , room_type varchar(50) , capacity int );
insert into 
room(rent_amount,room_type,capacity) 
values
(5000,'Isolated',1),
(13000,'Non-Isolated',4),
(13000,'Non-Isolated',4),
(13000,'Non-Isolated',4),
(13000,'Non-Isolated',4),
(13000,'Non-Isolated',4),
(13000,'Non-Isolated',4),
(15000,'Isolated',1),
(15000,'Isolated',1),
(15000,'Isolated',1),
(15000,'Isolated',1);
select * from room;