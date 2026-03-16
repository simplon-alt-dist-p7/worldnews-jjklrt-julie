import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
dotenv.config({ path: "./.env" });
import express, { NextFunction, Request, Response } from "express";
//import "./database/checkConnection"; --> moved to waitForDb
import articlesRouter from "./router/articleRouter";
import { waitForDb } from "./database/waitForDb";

const app = express();

app.use((req, res, next) => {
  const origin = req.headers.origin as string | undefined;
  const allowed = (process.env.ALLOWED_ORIGINS || "http://localhost:3001")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (origin && allowed.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    res.sendStatus(204);
    return;
  }
  next();
});

app.use(express.json());

// route articles
app.use(articlesRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Get the port from the environment variables
// const port = process.env.PORT;

// // Start the server and listen on the specified port
// app
//   .listen(port, () => {
//     console.info(`Server is listening on port ${port}`);
//   })
//   .on("error", (err: Error) => {
//     console.error("Error:", err.message);
//   });

// Get the port from the environment variables
const port = Number(process.env.PORT) || 3001;

// Wait for the database to be ready before starting the server
async function startServer() {
  //debug
  console.log("DB CONFIG =>", {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
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
