// Config pour le Cron: connexion à PostgreSQL

import { Pool } from 'pg';
import type { Pool as PgPool, QueryResult } from "pg";

export const pool = new Pool({
  user: (process.env.DB_USER || "").trim(),
  password: (process.env.DB_PASSWORD || "").trim(),
  host: (process.env.DB_HOST || "").trim(),
  port: Number((process.env.DB_PORT || "").trim()) || 5432,
  database: (process.env.DB_NAME || "").trim(),
});

console.log("DB config:", {
  user: (process.env.DB_USER || "").trim(),
  host: (process.env.DB_HOST || "").trim(),
  port: Number((process.env.DB_PORT || "").trim()) || 5432,
  database: (process.env.DB_NAME || "").trim(),
});

type Pg = PgPool;
type Result = QueryResult<any>;
type Rows = any[];

export type { Pg, Result, Rows };

export default pool;