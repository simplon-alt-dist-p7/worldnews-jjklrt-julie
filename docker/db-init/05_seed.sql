-- Ajout de données de test pour la table writer.articles

INSERT INTO writer.articles
(title, sub_title, article_lead, body, categorie)
VALUES
(
'Elle fait du CQRS sans le savoir',
'Une développeuse découvre le CQRS grâce à Docker, et les nombreux challenges rencontrés pour faire fonctionner le projet.',
'«Je n y croyais plus» nous confie Julie, développeuse front-end, après avoir vu les données apparaître automatiquement dans le read model.',
'Il aura fallu plusieurs tentatives, de nombreux aller-retours pour ajuster le code du projet, pour enfin voir les données de sa base de données apparaître dans le front. Qui aurait pû se douter que Next.js était à l origine des blocages rencontrés ? «Je pensais que c était forcément un problème de Docker, ou de PostgreSQL, mais en fait non, c était Next.js qui faisait du caching et empêchait les données de s afficher» explique-t-elle. «C était un vrai parcours du combattant pour trouver la source du problème, mais au final ça valait le coup, c est tellement satisfaisant de voir les données apparaître automatiquement dans le front grâce à Docker et au CQRS !» conclut-elle, ravie d avoir pu découvrir le CQRS grâce à cette expérience. L astuce était de mettre place un proxy, afin de pouvoir faire des requêtes sans cache, et ainsi voir les données apparaître dans le front en temps réel. Une belle découverte pour cette développeuse, qui ne connaissait pas le CQRS avant de se lancer dans ce projet avec Docker. «C est à travers toutes ces difficultés rencontrées que j ai compris l intérêt d un outil de développement comme Docker, j espère gagner en aisance pour mes prochains projets grâce à cette expérience» conclut-elle, enthousiaste à l idée de continuer à explorer les possibilités offertes par Docker et le CQRS dans ses futurs projets.',
'Sciences et technologies'
),
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
