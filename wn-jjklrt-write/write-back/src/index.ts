import express from "express";
// import "./config/checkConnection"; -> moved to waitForDb
import { waitForDb } from "./config/waitForDb";

const app = express();

app.use(express.json());

// CORS for local
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
//   res.header("Access-Control-Allow-Headers", "Content-Type");
//   if (req.method === "OPTIONS") {
//     res.sendStatus(204);
//     return;
//   }
//   next();
// });

app.use((req, res, next) => {
  const origin = req.headers.origin as string | undefined;
  const allowed = (process.env.ALLOWED_ORIGINS || "http://localhost:3000,http://localhost:3002").split(",").map(s => s.trim()).filter(Boolean);
  if (origin && allowed.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  if (req.method === "OPTIONS") {
    res.sendStatus(204);
    return;
  }
  next();
});


/* ************************************************************************* */
import type { ErrorRequestHandler } from "express";
const logErrors: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);
  console.error("on req:", req.method, req.path);
  next(err);
};

app.use(logErrors);

/* ************************************************************************* */

import type { Request, Response, NextFunction } from "express";
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({ error: err.message || "Erreur lors de la création de l'utilisateur." });
});

/* ************************************************************************* */

import router from "./routes/router";
app.use(router);

/* ************************************************************************* */

// Get the port from the environment variables
const port = Number(process.env.PORT) || 3002;

// Wait for the database to be ready before starting the server
async function startServer() {

  //debug
  console.log("DB CONFIG =>", {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME
  });

  await waitForDb();

  // Start the server and listen on the specified port
  app
    .listen(port, "0.0.0.0", () => {
      console.info(`Server is listening on port ${port}`);
    })
    .on("error", (err: Error) => {
      console.error("Error:", err.message);
    });
    }

startServer();
