-- Up

CREATE TABLE Job (
    id STRING PRIMARY KEY,
    title STRING NOT NULL,
    location STRING NOT NULL,
    salary INTEGER DEFAULT 0,
    postTime DATE NOT NULL

)


-- Down

DROP TABLE Job