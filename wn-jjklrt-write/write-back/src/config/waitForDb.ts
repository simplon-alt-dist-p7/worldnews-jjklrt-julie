// Permet de s'assurer que la base de données est prête avant de démarrer le serveur, sinon on risque d'avoir des erreurs de connexion au démarrage.

import { Client } from "pg";

export async function waitForDb() {
  while (true) {
    try {
      const client = new Client({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });

      await client.connect();

      // 🔥 LA DIFFERENCE IMPORTANTE
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
