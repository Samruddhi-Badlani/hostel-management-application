CREATE DATABASE Hostel;
CREATE USER hostel_admin WITH PASSWORD 'hostel_admin';
GRANT ALL
ON ALL TABLES
IN SCHEMA "public"
TO admin ;