-- create_users_table.sql

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  surname VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  age INTEGER,
  country VARCHAR(255),
  district VARCHAR(255),
  role VARCHAR(30),
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--index.
CREATE EXTENSION pg_trgm;
CREATE INDEX trgm_idx_users_name ON users USING gin (name gin_trgm_ops);
CREATE INDEX idx_role ON users (role);


-- Insert dummy data
INSERT INTO users (name, surname, email, password, phone, age, country, district, role) VALUES
('John', 'Doe', 'john.doe@example.com', 'password123', '123-456-7890', 30, 'USA', 'New York', 'admin'),
('Jane', 'Smith', 'jane.smith@example.com', 'password456', '987-654-3210', 25, 'Canada', 'Toronto', 'user'),
('Alice', 'Johnson', 'alice.johnson@example.com', 'password789', '555-555-5555', 28, 'UK', 'London', 'manager'),
('Bob', 'Brown', 'bob.brown@example.com', 'password012', '444-444-4444', 35, 'USA', 'Los Angeles', 'user'),
('Charlie', 'Williams', 'charlie.williams@example.com', 'password345', '333-333-3333', 22, 'Australia', 'Sydney', 'intern'),
('Diana', 'Miller', 'diana.miller@example.com', 'password678', '222-222-2222', 32, 'USA', 'San Francisco', 'engineer'),
('Eve', 'Davis', 'eve.davis@example.com', 'password901', '111-111-1111', 29, 'USA', 'Chicago', 'user'),
('Frank', 'Wilson', 'frank.wilson@example.com', 'password234', '666-666-6666', 27, 'UK', 'Manchester', 'manager'),
('Grace', 'Lee', 'grace.lee@example.com', 'password567', '777-777-7777', 40, 'Canada', 'Vancouver', 'engineer'),
('Hannah', 'Martin', 'hannah.martin@example.com', 'password890', '888-888-8888', 31, 'USA', 'Seattle', 'admin'),
('Isaac', 'Moore', 'isaac.moore@example.com', 'pass111', '999-999-9999', 45, 'USA', 'Boston', 'user'),
('Jack', 'Taylor', 'jack.taylor@example.com', 'pass222', '000-000-0000', 23, 'Germany', 'Berlin', 'intern'),
('Karen', 'Anderson', 'karen.anderson@example.com', 'pass333', '123-123-1234', 36, 'France', 'Paris', 'manager'),
('Leo', 'Thomas', 'leo.thomas@example.com', 'pass444', '234-234-2345', 50, 'USA', 'Miami', 'user'),
('Mona', 'Jackson', 'mona.jackson@example.com', 'pass555', '345-345-3456', 26, 'Japan', 'Tokyo', 'engineer'),
('Nina', 'White', 'nina.white@example.com', 'pass666', '456-456-4567', 33, 'Brazil', 'São Paulo', 'admin'),
('Oscar', 'Harris', 'oscar.harris@example.com', 'pass777', '567-567-5678', 38, 'Russia', 'Moscow', 'manager'),
('Paula', 'Clark', 'paula.clark@example.com', 'pass888', '678-678-6789', 21, 'India', 'Mumbai', 'intern'),
('Quinn', 'Lewis', 'quinn.lewis@example.com', 'pass999', '789-789-7890', 47, 'Mexico', 'Mexico City', 'user'),
('Rachel', 'Walker', 'rachel.walker@example.com', 'pass000', '890-890-8901', 34, 'Italy', 'Rome', 'engineer'),
('Steve', 'Hall', 'steve.hall@example.com', 'secret001', '901-901-9012', 39, 'South Africa', 'Cape Town', 'admin'),
('Tina', 'Allen', 'tina.allen@example.com', 'secret002', '012-012-0123', 29, 'Spain', 'Madrid', 'user'),
('Uma', 'Young', 'uma.young@example.com', 'secret003', '123-456-7891', 42, 'China', 'Beijing', 'engineer'),
('Victor', 'Hernandez', 'victor.hernandez@example.com', 'secret004', '234-567-8902', 27, 'Argentina', 'Buenos Aires', 'user'),
('Wendy', 'King', 'wendy.king@example.com', 'secret005', '345-678-9013', 24, 'South Korea', 'Seoul', 'manager'),
('Xavier', 'Wright', 'xavier.wright@example.com', 'secret006', '456-789-0124', 31, 'Singapore', 'Singapore', 'user'),
('Yara', 'Lopez', 'yara.lopez@example.com', 'secret007', '567-890-1235', 37, 'Netherlands', 'Amsterdam', 'intern'),
('Zack', 'Scott', 'zack.scott@example.com', 'secret008', '678-901-2346', 22, 'Belgium', 'Brussels', 'engineer'),
('Abby', 'Green', 'abby.green@example.com', 'secret009', '789-012-3457', 28, 'Sweden', 'Stockholm', 'admin');