# 📰 Application **Lecteur** (work in progress)

## 🎯 Présentation générale

L’application **Lecteur** est une application de consultation d’articles.
Elle permet aux utilisateurs finaux de **consulter les articles publiés**, sans jamais intervenir sur leur création ou leur modification.

L’application Lecteur fonctionne en collaboration avec l’application **Journaliste** :

- **Journaliste** est responsable de la **création et publication** des articles
- **Lecteur** est responsable de leur **consultation**

Cette séparation respecte les principes des **microservices** et du **CQRS (Command / Query Responsibility Segregation)** :

- Journaliste → écriture
- Lecteur → lecture

---

## 🔗 Lien avec l’application Journaliste

Les deux applications partagent le même SGBD PostgreSQL, mais utilisent **des schémas distincts** :

- `journaliste` → schéma géré par l’application Journaliste
- `lecteur` → schéma géré par l’application Lecteur

L’application Lecteur **n’accède jamais directement** à la table `journaliste.article`.
Elle consomme uniquement une **vue matérialisée** (`lecteur.articles_lecture`), qui représente une projection optimisée pour la lecture.

Le rafraîchissement de cette vue matérialisée est effectué **manuellement via un script SQL**.

---

## 🧱 Architecture de l’application

L’application Lecteur est organisée selon une architecture **3 couches** :

### 1️⃣ Front

**Rôle** :

- Interface utilisateur
- Affichage des articles
- Appels HTTP vers l’API Lecteur

**Technologies** :

- Next.js
- TypeScript

---

### 2️⃣ Back

**Rôle** :

- API REST
- Exposition des endpoints de consultation
- Accès aux données via la vue matérialisée
- Aucune logique d’écriture métier

**Technologies** :

- Node.js
- Express
- TypeScript

---

### 3️⃣ Data

**Rôle** :

- Définition de la vue matérialisée
- Scripts SQL versionnés
- Rafraîchissement contrôlé des données

**Technologies** :

- PostgreSQL

Le dossier `data` contient notamment :

- les scripts de création de la vue matérialisée
- les scripts de rafraîchissement
- la documentation associée

---

## 🗂️ Organisation générale du projet (à mettre à jour)

```text
lecteur-service/
├── front/
├── back/
│   ├── src/
│   └── .env
├── data/
│   ├── migrations/
│   ├── refresh/
│   └── README.md
└── README.md
```

L’arborescence pourra évoluer au cours du projet.

---

## ⚙️ Stack technique récapitulative

| Couche | Technologies                 |
| ------ | ---------------------------- |
| Front  | Next.js, TypeScript          |
| Back   | Node.js, Express, TypeScript |
| Data   | PostgreSQL                   |

---

## 🚀 Installation et lancement du projet

### 1️⃣ Récupération du projet

```bash
git clone https://github.com/simplon-alt-dist-p7/wn-jjklrt-read.git
```

---

### 2️⃣ Installation des dépendances

#### Côté Back

```bash
cd back
npm install
```

#### Côté Front

```bash
cd ../front
npm install
```

---

### 3️⃣ Configuration des variables d’environnement

#### Configurer le fichier `.env` à la racine du projet

Ce fichier contient les variables communes (base de données, environnement, URL client).

```env
APP_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_HOST=
DB_PORT=
NODE_ENV=
CLIENT_URL=
```

⚠️ Ce fichier ne doit pas être versionné.

---

#### Configurer le fichier `.env` dans le dossier `back`

Ce fichier contient la configuration spécifique au serveur back.

```env
PORT=
```

---

### 4️⃣ Lancement des applications

#### Lancer le serveur (Back)

```bash
cd back
npm run dev
```

#### Lancer le client (Front)

```bash
cd front
npm run dev
```

👉 Le back doit être lancé **avant** le front.

---

## 👀 Endpoints ( à faire confirmer )

- GET("/", getAllArticles);
- GET("/:id", getArticleById);

---

## ⏱️ Rafraîchissement automatique avec node-cron

L’application Lecteur utilise la librairie **node-cron** côté back afin de rafraîchir automatiquement la vue matérialisée PostgreSQL.

### 🎯 Objectif

- Mettre à jour régulièrement les données consultées par les lecteurs
- Éviter l’utilisation de triggers SQL
- Garder un contrôle total sur la fréquence de rafraîchissement

### 📍 Localisation

La logique de planification est située dans la couche **back**, dans un dossier dédié :

```text
back/src/cron/
└── refreshArticlesView.cron.ts
```

### ⚙️ Fonctionnement

- Une tâche planifiée est démarrée au lancement du serveur
- À intervalle régulier, elle exécute la commande SQL suivante :

```sql
REFRESH MATERIALIZED VIEW lecteur.articles_lecture;
```

- La fréquence est définie via une expression cron (ex. toutes les 10 minutes)

### 🧠 Bonnes pratiques

- Une seule instance du serveur doit exécuter le cron
- La fréquence doit rester raisonnable
- Le cron ne contient aucune logique métier
- Les erreurs sont journalisées

---

## 🧠 Points importants à retenir

- L’application Lecteur est **en lecture seule**
- Toute modification de la structure des articles côté Journaliste doit être communiquée à l’équipe Lecteur
- La vue matérialisée constitue un **contrat de données** entre les deux applications
- Le rafraîchissement des données est **contrôlé manuellement**

---

## 📌 Remarque finale

Ce README a pour objectif de fournir une **vision claire et partagée** du rôle de l’application Lecteur, de son architecture et de son fonctionnement.
Toute évolution majeure devra être documentée afin de maintenir une bonne coordination entre les équipes **Lecteur** et **Journaliste**.
