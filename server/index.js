import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDatabase } from './config/database.js';
import authRoutes from './routes/auth.js';
import { handleDemo } from './routes/demo.js';

dotenv.config();

export async function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Routes API
  app.get('/api/ping', (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? 'ping';
    res.json({ message: ping });
  });

  app.get('/api/demo', handleDemo);
  
  // Routes d'authentification
  app.use('/api', authRoutes);

  return app;
}

// Démarrage serveur uniquement si fichier exécuté directement
if (import.meta.url === `file://${process.argv[1]}`) {
  const PORT = process.env.PORT || 3001;
  
  initDatabase().then(async () => {
    const app = await createServer();
    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
    });
  }).catch(err => {
    console.error('❌ Erreur initialisation:', err);
    process.exit(1);
  });
}
