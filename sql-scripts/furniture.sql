DROP TABLE IF EXISTS  furniture;
CREATE TABLE furniture (
	furniture_id SERIAL PRIMARY KEY,
	furniture_type VARCHAR(100),
	room_id INTEGER,
	FOREIGN KEY(room_id)
	REFERENCES room(room_id)
	ON DELETE CASCADE
	
);

INSERT INTO furniture(furniture_type_id)

VALUES
('Sofa',1),
('Table',2),
('Bed',3),
('Chair',4),
('desks',5),
('matresses',6),
('dresser',7),
('ottoman',8);


SELECT * FROM furniture;