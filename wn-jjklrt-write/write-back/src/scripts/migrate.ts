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

export async function runMigrations() {
  try {
    console.log("🚀 Running migrations...");

    const schemaPath = path.join(process.cwd(), "database/schema.sql");
    const seedPath = path.join(process.cwd(), "docker/db-init/05_seed.sql");

    const schemaSql = fs.readFileSync(schemaPath, "utf-8");
    const seedSql = fs.readFileSync(seedPath, "utf-8");
    console.log("Schema path:", schemaPath);
    console.log("Seed path:", seedPath);

    console.log("📦 Creating schema...");
    await pool.query(schemaSql);

    console.log("🌱 Seeding data...");
    await pool.query(seedSql);

    console.log("✅ Migrations completed !");
  } catch (err) {
    console.error("❌ Migration error:", err);
    throw err;
  }
}

runMigrations();
