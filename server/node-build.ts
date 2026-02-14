import path from "path";
import { createServer } from "./index.js";
import express from "express";

async function startServer() {
  const app = await createServer();
  const port = process.env.PORT || 3000;

  // Service des fichiers statiques en production
  const __dirname = path.dirname(new URL(import.meta.url).pathname);
  const distPath = path.join(__dirname, "../spa");

  app.use(express.static(distPath));

  // Gestion SPA pour les routes non-API
  app.get("*", (req, res) => {
    if (req.path.startsWith("/api/") || req.path.startsWith("/health")) {
      return res.status(404).json({ error: "API endpoint not found" });
    }
    res.sendFile(path.join(distPath, "index.html"));
  });

  const server = app.listen(port, () => {
    console.log(`🚀 Fusion Starter server running on port ${port}`);
    console.log(`📱 Frontend: http://localhost:${port}`);
    console.log(`🔧 API: http://localhost:${port}/api`);
  });

  // Gestion arrêt gracieux
  const gracefulShutdown = () => {
    console.log("\n🛑 Arrêt gracieux...");
    server.close(() => {
      console.log("✅ Serveur arrêté");
      process.exit(0);
    });
  };

  process.on("SIGTERM", gracefulShutdown);
  process.on("SIGINT", gracefulShutdown);
}

startServer().catch(console.error);
