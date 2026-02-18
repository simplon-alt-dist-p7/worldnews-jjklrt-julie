CREATE SCHEMA IF NOT EXISTS reader;

DROP MATERIALIZED VIEW IF EXISTS reader.articles_lecture;

CREATE MATERIALIZED VIEW reader.articles_lecture AS
SELECT *
FROM writer.articles
ORDER BY published_at DESC;
-- Ensure a unique index exists on the materialized view so
-- that REFRESH MATERIALIZED VIEW CONCURRENTLY can be used safely
-- (the trigger on writer.articles uses CONCURRENTLY).
CREATE UNIQUE INDEX IF NOT EXISTS reader_articles_lecture_uidx
	ON reader.articles_lecture (title, published_at);

REFRESH MATERIALIZED VIEW reader.articles_lecture;