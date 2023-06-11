CREATE TYPE role AS ENUM (
    'admin',
    'recruiter',
    'candidate',
    'consultant',
    'none'
);


CREATE TABLE IF NOT EXISTS users (
    id integer NOT NULL PRIMARY KEY,
    firstname VARCHAR(30),
    lastname VARCHAR(30),
    email VARCHAR(50) NOT NULL UNIQUE,
    role role,
    enterprise VARCHAR(50),
    address text,
    cv VARCHAR(255),
    password VARCHAR(255),
    active boolean DEFAULT false
);
CREATE TABLE IF NOT EXISTS post (
    title VARCHAR(255),
    city VARCHAR(255),
    description text,
    approved boolean DEFAULT false,
    author_id integer, 
    id integer NOT NULL PRIMARY KEY UNIQUE,
    active boolean DEFAULT false,
    FOREIGN KEY (author_id) REFERENCES users(id)
  
);

CREATE TABLE IF NOT EXISTS candidatepostrelation (
    candidate_id integer NOT NULL,
    post_id integer NOT NULL,
    active boolean DEFAULT false,
    FOREIGN KEY (candidate_id) REFERENCES users(id),
    FOREIGN KEY (post_id) REFERENCES post(id),
    UNIQUE (candidate_id, post_id)
);