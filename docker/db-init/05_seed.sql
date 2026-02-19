-- Ajout de données de test pour la table writer.articles

INSERT INTO writer.articles
(title, sub_title, article_lead, body, categorie)
VALUES
(
'Docker arrive dans le projet',
'Initialisation automatique',
'On connecte enfin le front au read model',
'Ceci est un article de démonstration pour tester le CQRS avec Docker.',
'Sciences et technologies'
),
(
'PostgreSQL et Materialized Views',
'Architecture CQRS',
'Les vues matérialisées permettent des lectures rapides',
'Deuxième article pour tester la synchronisation automatique.',
'Économie'
);

REFRESH MATERIALIZED VIEW reader.articles_lecture;
