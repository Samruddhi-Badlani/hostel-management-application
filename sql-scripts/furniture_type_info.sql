DROP TABLE IF EXISTS furniture_type_info;
CREATE TABLE furniture_type_info(
	furniture_type_id SERIAL PRIMARY KEY,
	furniture_type VARCHAR(100),
	quantity INTEGER
);

INSERT INTO furniture_type_info(furniture_type,quantity)
VALUES
('Sofa',70),
('Table',120),
('Bed',200),
('Chair',300),
('desks',90),
('matresses',50),
('dresser',60),
('ottoman',40);

SELECT * FROM furniture_type_info;
