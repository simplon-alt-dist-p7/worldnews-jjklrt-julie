// Permet de s'assurer que la base de données est prête avant de démarrer le serveur, sinon on risque d'avoir des erreurs de connexion au démarrage.

// import { Client } from "pg";

// export async function waitForDb() {
//   while (true) {
//     try {
//       const client = new Client({
//         host: process.env.DB_HOST,
//         port: Number(process.env.DB_PORT),
//         user: process.env.DB_USER,
//         password: process.env.DB_PASSWORD,
//         database: process.env.DB_NAME,
//       });

//       await client.connect();

//       // 🔥 LA DIFFERENCE IMPORTANTE
//       await client.query("SELECT 1");

//       await client.end();

//       console.log("Database ready!");
//       return;
//     } catch (err: any) {
//       console.log("Waiting for database...");
//       await new Promise((res) => setTimeout(res, 2000));
//     }
//   }
// }

// Pour compatibilié avec le déploiement sur Render, on utilise une version plus simple qui se contente de tenter une connexion à la base de données sans faire de requête SQL.
// Cela permet d'éviter les problèmes liés à l'exécution de requêtes avant que la base de données ne soit complètement prête :

import { Client } from "pg";

export async function waitForDb() {
  while (true) {
    try {
      const client = process.env.DATABASE_URL // variable d'environnement utilisée par Render pour la connexion à la base de données
        ? new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: false, // true + rejectUnauthorized:false si External URL
          })
        : new Client({
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
          });

      await client.connect();
      await client.query("SELECT 1");
      await client.end();

      console.log("Database ready!");
      return;
    } catch (err: any) {
      console.log("Waiting for database...");
      await new Promise((res) => setTimeout(res, 2000));
    }
  }
}
