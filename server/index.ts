import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleInquiry } from "./routes/inquiry";
import { handlePlaceholder } from "./routes/placeholder";
import {
  handleGetCategories,
  handleGetProducts,
  handleGetProductsByCategory,
  handleGetProduct
} from "./routes/products";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);
  app.post("/api/inquiry", handleInquiry);
  app.get("/api/placeholder/:width/:height", handlePlaceholder);

  return app;
}
