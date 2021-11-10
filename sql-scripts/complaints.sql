DROP TABLE IF EXISTS complaints;
CREATE TABLE complaints(
	query_id int,
	student_id int,
	PRIMARY KEY(query_id,student_id),
	FOREIGN KEY(student_id) 
	  REFERENCES student(student_id),
	FOREIGN KEY(query_id) 
	  REFERENCES querycounter(query_id)
	);
INSERT INTO complaints(Query_ID,student_id) VALUES
(2,1),
(1,2);
select * from complaints;