-- Note : correspond au contenu de 001_create_article_lecture_view.sql

CREATE SCHEMA IF NOT EXISTS reader;

CREATE MATERIALIZED VIEW reader.articles_lecture AS
SELECT *
FROM writer.articles
ORDER BY published_at DESC;

CREATE UNIQUE INDEX reader_articles_lecture_uidx
ON reader.articles_lecture (title, published_at);