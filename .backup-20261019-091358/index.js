require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 5000;

// === Middleware ===
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Trop de requêtes, réessayez plus tard.' },
});
app.use('/api/', limiter);

// === Fichiers statiques (uploads) ===
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// === Routes ===
app.use('/api/auth', require('./routes/auth'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/profile', require('./routes/avatar'));

// === Health check ===
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// === Démarrage ===
app.listen(PORT, () => {
  console.log(`\x1b[36m🚀 Serveur démarré sur http://localhost:${PORT}\x1b[0m`);
});
