# 📦 Documentation – Conteneurisation du projet WorldNews

## 🎯 Objectif du document

Ce document récapitule les notions abordées lors de la mise en place de la conteneurisation Docker du projet **WorldNews**, organisé en microservices.

---

# 🐳 1. Rôle de Docker dans le projet

Docker permet de :

- Isoler chaque service dans un environnement indépendant
- Standardiser l’environnement d’exécution (Node, PostgreSQL, etc.)
- Éviter les problèmes "ça marche sur ma machine"
- Faciliter le déploiement
- Structurer une architecture microservices propre

Chaque service possède :

- Son propre container
- Son propre environnement
- Ses propres dépendances

---

# 🏗️ 2. Architecture du projet

## 🔹 Les 4 microservices

### 1️⃣ read-front

- Frontend Next.js
- Permet de consulter les articles
- Utilise un proxy Next (rewrites) vers read-back

### 2️⃣ read-back

- API Express
- Gère la lecture des articles
- Connecté à PostgreSQL

### 3️⃣ write-front

- Frontend Next.js
- Permet de créer, modifier et archiver des articles
- Utilise un proxy Next (rewrites) vers write-back

### 4️⃣ write-back

- API Express
- Gère création, modification et suppression logique
- Connecté à PostgreSQL

### 🗄️ Base de données

- PostgreSQL 15
- Container dédié
- Volume persistant

---

# 🔄 3. Flux des requêtes (avec proxy Next)

Navigateur → Next.js (frontend) → Proxy rewrite → Backend Express → PostgreSQL

Grâce aux rewrites :

```ts
async rewrites() {
  return {
    beforeFiles: [
      {
        source: "/api/:path*",
        destination: "http://write-back:3002/api/:path*",
      },
    ],
  };
}
```

Avantages :

- Pas de CORS
- Backend non exposé publiquement
- Architecture propre et sécurisée

---

# 🧱 4. Étapes de la conteneurisation

## 1️⃣ Création des Dockerfile

Chaque service possède son Dockerfile :

- Image Node
- Copie des fichiers
- Installation des dépendances
- Build (pour Next)
- Commande de démarrage

## 2️⃣ Création du docker-compose.yml

Permet de :

- Définir tous les services
- Configurer les ports
- Définir les variables d’environnement
- Gérer les dépendances
- Déclarer les volumes

## 3️⃣ Gestion du réseau Docker

Les services communiquent via leur **nom de service** :

```
http://write-back:3002
```

⚠️ "localhost" ne fonctionne PAS entre containers.

---

# 🧰 5. Commandes Docker importantes

## Lancer les services

```
docker compose up
```

## Rebuild après modification

```
docker compose up --build
```

## Arrêter les containers

```
docker compose down
```

## Voir les logs

```
docker compose logs
```

## Voir les logs d’un service spécifique

```
docker compose logs write-back
```

## Logs en temps réel

```
docker compose logs -f write-back
```

---

# ⚠️ 6. Problèmes rencontrés et solutions

## ❌ Problème CORS

Cause : appel direct au backend depuis le navigateur.

Solution :

- Utiliser `/api/...`
- Mettre en place un rewrite Next

---

## ❌ 405 Method Not Allowed

Cause : Next interceptait la route avant le rewrite.

Solution :
Utiliser `beforeFiles` dans rewrites.

---

## ❌ Failed to fetch vers write-back

Cause : utilisation de `NEXT_PUBLIC_API_URL`.

Solution :
Ne jamais exposer l’URL backend au frontend.
Toujours utiliser `/api/...`.

---

# 🧠 7. Bonnes pratiques retenues

✅ Ne jamais utiliser localhost entre containers

✅ Ne jamais exposer l’URL backend au navigateur

✅ Utiliser les rewrites Next pour éviter CORS

✅ Séparer affichage et valeur stockée

✅ Lire les logs Docker pour diagnostiquer

✅ Rebuild après modification du next.config

---

# 🧩 8. Stack technique

- Node.js
- Express
- PostgreSQL 15
- Next.js (App Router)
- Docker
- Docker Compose
- TypeScript

---

# 🚀 9. Compétences acquises

- Compréhension des microservices
- Communication inter-containers
- Gestion des ports internes / externes
- Proxy côté frontend
- Gestion CORS
- Debug avec logs Docker
- Gestion contraintes PostgreSQL
- Architecture prête pour production

---

# 🏁 Conclusion

Le projet WorldNews est désormais :

- Conteneurisé
- Structuré en microservices
- Sécurisé côté réseau
- Sans CORS
- Production-ready en environnement Docker

---
