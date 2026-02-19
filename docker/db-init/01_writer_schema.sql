-- Note : correspond au contenu de schema.sql

CREATE SCHEMA IF NOT EXISTS writer;

CREATE TABLE IF NOT EXISTS writer.articles (
    title VARCHAR(300) NOT NULL,
    sub_title VARCHAR(300) NOT NULL,
    article_lead VARCHAR(1000) NOT NULL,
    body VARCHAR(10000) NOT NULL,
    categorie VARCHAR(100) NOT NULL,
    published_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    CONSTRAINT articles_categorie_check CHECK (
        categorie IN (
            'International',
            'Actualités locales',
            'Économie',
            'Sciences et technologies',
            'Divertissement',
            'Sports',
            'Santé'
        )
    ),
    PRIMARY KEY (title, published_at)
);
