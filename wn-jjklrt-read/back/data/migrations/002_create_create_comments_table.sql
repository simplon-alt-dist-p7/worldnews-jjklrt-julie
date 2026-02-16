CREATE TABLE reader.comments (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  article_title TEXT NOT NULL,
  article_published_at TIMESTAMP NOT NULL,
  description TEXT NOT NULL CHECK (char_length(description) <= 1000),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  FOREIGN KEY (article_title, article_published_at) REFERENCES writer.articles(title, published_at)
);

DROP TABLE comments;  

DROP MATERIALIZED VIEW IF EXISTS lecteur.commentaires_lecture;  