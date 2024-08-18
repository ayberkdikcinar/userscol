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
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fullname VARCHAR(255) GENERATED ALWAYS AS (name || ' ' || coalesce(surname, '')) STORED
);


--index.
CREATE EXTENSION pg_trgm;
CREATE INDEX trgm_idx_users_fname ON users USING gin (fullname gin_trgm_ops);
CREATE INDEX idx_role ON users (role);


-- Insert dummy data
COPY users(name, surname, email, password, phone, age, country, district, role)
FROM '/dummy-users.csv'
DELIMITER ','
CSV HEADER;