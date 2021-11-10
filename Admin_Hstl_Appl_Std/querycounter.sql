DROP TABLE IF EXISTS querycounter;

CREATE TABLE querycounter(
  query_id SERIAL PRIMARY KEY,
  date timestamp,
  description varchar(255),
  status varchar(255)
  );

INSERT INTO querycounter( date , description , status ) VALUES 
('2021-10-10','tap not working','awaited'),
( '2021-08-10','need to change bed','resolved');

select * from querycounter;
