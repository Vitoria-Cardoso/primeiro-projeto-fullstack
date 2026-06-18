CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(160) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS countries (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  capital VARCHAR(120),
  population BIGINT,
  region VARCHAR(80),
  flag_url TEXT,
  created_by INT REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS token_blacklist (
  id SERIAL PRIMARY KEY,
  token TEXT NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);