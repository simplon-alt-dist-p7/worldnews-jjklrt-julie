CREATE TABLE reader.readers (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE reader.favorites (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  reader_id INTEGER NOT NULL REFERENCES reader.readers(id) ON DELETE CASCADE,
  article_title TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE (reader_id, article_title)
);

CREATE TABLE reader.comments (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  article_title TEXT NOT NULL,
  article_published_at TIMESTAMP NOT NULL,
  description TEXT NOT NULL CHECK (char_length(description) <= 1000),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  FOREIGN KEY (article_title, article_published_at)
  REFERENCES writer.articles(title, published_at)
);
