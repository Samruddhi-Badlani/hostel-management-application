DROP TABLE IF EXISTS relative;

CREATE TABLE relative(
  rel_id serial primary key,	
  Rname varchar(255) NOT NULL,
  relative_type varchar(255),
  phone_no varchar(255),
  address varchar(255),
  student_id int
  references Student(student_id)
  on update cascade
  on delete cascade
  );

INSERT INTO relative(Rname , relative_type , phone_no, address,student_id) VALUES 
( 'Shikha','Mother',9856224455,NULL,1),
( 'Muskan','sister',9865414444,NULL,2);

select * from relative;