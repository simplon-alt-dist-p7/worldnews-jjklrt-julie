import fs from "fs";
import path from "path";
import { Pool } from "pg";

const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: false,
    })
  : new Pool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

async function runMigrations() {
  try {
    console.log("🚀 Running migrations...");

    // 📁 chemins vers tes fichiers
    const schemaPath = path.join(__dirname, "../../../database/schema.sql");

    const seedPath = path.join(
      __dirname,
      "../../../../docker/db-init/05_seed.sql",
    );

    // 📖 lire les fichiers
    const schemaSql = fs.readFileSync(schemaPath, "utf-8");
    const seedSql = fs.readFileSync(seedPath, "utf-8");

    console.log("📦 Creating schema...");
    await pool.query(schemaSql);

    console.log("🌱 Seeding data...");
    await pool.query(seedSql);

    console.log("✅ Migrations completed !");
    process.exit(0);
  } catch (err) {
    console.error("❌ Migration error:", err);
    process.exit(1);
  }
}

runMigrations();
