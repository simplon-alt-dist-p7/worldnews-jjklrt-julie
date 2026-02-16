DROP MATERIALIZED VIEW IF EXISTS lecteur.articles_lecture;
CREATE SCHEMA IF NOT EXISTS reader;

CREATE MATERIALIZED VIEW reader.articles_lecture AS
SELECT *
FROM writer.articles
ORDER BY published_at DESC;

DROP MATERIALIZED VIEW IF EXISTS reader.articles_lecture;

CREATE MATERIALIZED VIEW reader.commentaires_lecture AS
SELECT *
FROM reader.comments
ORDER BY created_at DESC;

DROP MATERIALIZED VIEW IF EXISTS reader.commentaires_lecture;  

REFRESH MATERIALIZED VIEW reader.articles_lecture;
REFRESH MATERIALIZED VIEW reader.commentaires_lecture;