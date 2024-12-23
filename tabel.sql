

-- Create To-Do Table
CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  users INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  priority INTEGER,
  projects INTEGER REFERENCES projects(id) ON DELETE CASCADE,
  projectName TEXT,
  category TEXT,
  dueDate TIMESTAMPTZ,
  createdAT TIMESTAMPTZ,
  status VARCHAR(255) NOT NULL DEFAULT 'ACTIVE',
  completed BOOLEAN DEFAULT FALSE
);

-- Create Reminder Table
CREATE TABLE reminders (
  id SERIAL PRIMARY KEY, 
  description TEXT,
  users INTEGER REFERENCES users(id) ON DELETE CASCADE,
  priority INTEGER,
  dueDate TIMESTAMPTZ,
  createdAT TIMESTAMPTZ,
  status VARCHAR(255) NOT NULL DEFAULT 'ACTIVE',
  reminder_time TIMESTAMPTZ NOT NULL,
  notified BOOLEAN DEFAULT FALSE,
  repeat INTEGER,
  category TEXT,
  completed BOOLEAN DEFAULT FALSE

);

-- Create users

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(255),
  status BOOLEAN DEFAULT TRUE,
  createdAT TIMESTAMPTZ,
  role VARCHAR(255) DEFAULT 'ADMIN'
  
);
-- Create Reminder projects

CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) ,
  region VARCHAR(255) ,
  PID TEXT DEFAULT 'PID'
);
