create table staff(staff_id serial primary key,
	               staff_name varchar(30) not null,
                   contact_number varchar(20),
                   gender varchar(10),
                   salary int,
                   dept_id int 
				   references department(dept_id)
                   on update cascade on delete set null
                  );

insert into 
staff(staff_name,contact_number,gender,salary,dept_id) 
values 
('Rishabh Dubey','93409xxxxx','Male',500000,2),
('Reena Mehta','93403xxxxx','Female',500000,3),
('Samyak Patil','93401xxxxx','Male',400000,2),
('Abhishek Tomar','93404xxxxx','Male',500000,2),
('Manish Tripathi','93400xxxxx','Male',100000,3),
('Shweta Jain','93408xxxxx','Female',200000,5),
('Anukriti Saxena','93490xxxxx','Feale',500000,4),
('Veena Choudhary','93411xxxxx','Female',500000,6),
('Ajay Gupta','93499xxxxx','Male',100000,7),
('Sanjay Joshi','93414xxxx','Male',500000,8),
('Satish Sharma','93433xxxxx','Male',400000,9),
('Ruchi Pandey','93000xxxxx','Female',500000,10),
('Aparna Pandit','93111xxxxx','Female',100000,11),
('Rishabh Tripathi','90000xxxxx','Male',400000,12);
select * from staff ;