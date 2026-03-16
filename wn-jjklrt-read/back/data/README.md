# 📦 Dossier `data` – Microservice **Lecteur**

Ce dossier contient **tous les éléments liés à la couche données** du microservice **Lecteur**.
Il a pour objectif de documenter clairement **le fonctionnement de la vue matérialisée** utilisée pour consulter les articles rédigés par l’application **Journaliste**.

Ce README est destiné :

- à l’équipe **Lecteur**
- à l’équipe **Journaliste**
- à toute personne intervenant sur la base de données

---

## 🎯 Objectif du dossier `data`

Le dossier `data` permet de :

- définir le **contrat de données** entre Journaliste et Lecteur
- stocker les **scripts SQL versionnés**
- isoler la logique SQL du code applicatif (Node.js / Express)
- garantir une **séparation claire des responsabilités**

👉 Le microservice Lecteur est un **service de lecture uniquement**.
Il ne crée, ne modifie et ne supprime **aucune donnée métier**.

---

## 🧠 Rappel d’architecture

- **SGBD** : PostgreSQL
- **Schémas** :
  - `journaliste` → géré par l’équipe Journaliste
  - `lecteur` → géré par l’équipe Lecteur

### Principe clé

> Journaliste **écrit** les données
>
> Lecteur **lit** les données via une **vue matérialisée**

La table `journaliste.article` est considérée comme un **détail d’implémentation interne** au microservice Journaliste.
Le microservice Lecteur ne dépend que de la vue matérialisée définie dans son propre schéma.

---

## 🗂️ Structure du dossier

```text
data/
├── migrations/
│   └── 001_create_articles_lecture_view.sql
├── refresh/
│   └── refresh_articles_lecture.sql
└── README.md
```

---

## 📄 1. Script de création de la vue matérialisée

**Fichier** :

```text
data/migrations/001_create_articles_lecture_view.sql
```

### Rôle

Ce script :

- crée le schéma `lecteur` (s’il n’existe pas)
- crée la vue matérialisée `lecteur.articles_lecture`
- définit le **modèle de lecture** utilisé par le microservice Lecteur

### Principe

La vue matérialisée est une **projection simplifiée et optimisée** de la table `journaliste.article`.
Elle ne contient que les champs nécessaires à la consultation des articles.

### Colonnes exposées

| Colonne            | Description                 |
| ------------------ | --------------------------- |
| `id`               | Identifiant de l’article    |
| `date_publication` | Date de publication         |
| `titre`            | Titre de l’article          |
| `sous-titre`       | Sous-titre de l’article     |
| `chapeau`          | Chapeau de l’article        |
| `resume`           | Résumé (extrait du contenu) |

⚠️ **La structure de cette vue constitue un contrat** entre les deux équipes.
Toute modification doit être discutée entre Journaliste et Lecteur.

---

## 🔄 2. Rafraîchissement de la vue matérialisée

**Fichier** :

```text
data/refresh/refresh_articles_lecture.sql
```

### Pourquoi un rafraîchissement ?

Une vue matérialisée PostgreSQL :

- **ne se met pas à jour automatiquement**
- représente un **instantané** des données

Le rafraîchissement permet de :

- rendre visibles les nouveaux articles publiés
- mettre à jour les modifications existantes

### Commande SQL

```sql
REFRESH MATERIALIZED VIEW lecteur.articles_lecture;
```

### Quand rafraîchir ?

Le rafraîchissement peut être déclenché :

- après la création ou la publication d’un article
- manuellement par un membre de l’équipe
- via un script ou un job planifié

👉 **Le microservice Lecteur ne déclenche jamais le rafraîchissement lui-même.**

---

## 🔐 Droits et accès (recommandations)

- Le microservice Lecteur utilise un **utilisateur PostgreSQL en lecture seule**
- Il a accès uniquement au schéma `lecteur`
- Il ne doit pas accéder directement à `journaliste.article`

Cela garantit :

- un découplage fort entre les microservices
- une meilleure sécurité
- une architecture plus réaliste

---

## ❌ Ce que le dossier `data` ne fait PAS

- ❌ créer des tables métier
- ❌ modifier des données
- ❌ contenir de logique applicative
- ❌ être exécuté automatiquement par Express

La couche `data` **définit** la structure,
la couche `back` **consomme** la structure.

---

## 🧠 Résumé rapide

- Le dossier `data` contient les **scripts SQL** du microservice Lecteur
- La vue matérialisée est le **point de contact** entre Journaliste et Lecteur
- Le SQL est **versionné, documenté et isolé**
- Le back Node.js effectue uniquement des `SELECT`

---

📌 Toute question ou modification concernant ce dossier doit être discutée entre les équipes **Journaliste** et **Lecteur** afin de préserver le contrat de données.
