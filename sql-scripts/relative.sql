DROP TABLE IF EXISTS relative;

CREATE TABLE relative(
  Rname varchar(255) NOT NULL PRIMARY KEY,
  relative_type varchar(255),
  phone_no varchar(255),
  address varchar(255)
  );

INSERT INTO relative(Rname , relative_type , phone_no, address) VALUES 
( 'Shikha','Mother',9856224455,NULL),
( 'Muskan','sister',9865414444,NULL);

select * from relative;