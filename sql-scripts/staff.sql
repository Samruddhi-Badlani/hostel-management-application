DROP TABLE IF EXISTS solves;
DROP TABLE IF EXISTS staff;
create table staff(staff_id serial primary key,
	           staff_name varchar(30) not null,
                   contact_number varchar(20),
                   gender varchar(10),
                   salary int,
                  
				   job_role VARCHAR(100),
		  
		   hostel_id int 
		   references hostel(hostel_id)
		   on update cascade on delete set null
                  );

insert into 
staff(staff_name,contact_number,gender,salary,hostel_id,job_role) 
values 
('Rishabh Dubey','93409xxxxx','Male',500000,1,'warden'),
('Reena Mehta','93403xxxxx','Female',500000,2,'mess'),
('Samyak Patil','93401xxxxx','Male',400000,1,'mess'),
('Abhishek Tomar','93404xxxxx','Male',500000,2,'general'),
('Manish Tripathi','93400xxxxx','Male',100000,1,'warden'),
('Shweta Jain','93408xxxxx','Female',200000,2,'general'),
('Anukriti Saxena','93490xxxxx','Feale',500000,1,'mess'),
('Veena Choudhary','93411xxxxx','Female',500000,2,'mess'),
('Ajay Gupta','93499xxxxx','Male',100000,1,'mess'),
('Sanjay Joshi','93414xxxx','Male',500000,2,'general'),
('Satish Sharma','93433xxxxx','Male',400000,1,'general'),
('Ruchi Pandey','93000xxxxx','Female',500000,2,'general'),
('Aparna Pandit','93111xxxxx','Female',100000,1,'warden'),
('Rishabh Tripathi','90000xxxxx','Male',400000,2,'warden');
select * from staff ;