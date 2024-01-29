CREATE TABLE IF NOT EXISTS region (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS state (
  id CHAR(2) PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  region_id INTEGER NOT NULL REFERENCES region(id)
);

CREATE TABLE IF NOT EXISTS index_data (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS state_index_data (
  index_data_id INTEGER NOT NULL REFERENCES index_data(id),
  state_id CHAR(2) NOT NULL REFERENCES state(id),
  value NUMERIC NOT NULL CHECK (value >= 0 AND value <= 1),
  PRIMARY KEY(index_data_id, state_id)
);

CREATE TABLE IF NOT EXISTS region_index_data (
  index_data_id INTEGER NOT NULL REFERENCES index_data(id),
  region_id INTEGER NOT NULL REFERENCES region(id),
  value NUMERIC NOT NULL CHECK (value >= 0 AND value <= 1),
  PRIMARY KEY(index_data_id, region_id)
);
