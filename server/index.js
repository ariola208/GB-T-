require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');

if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET manquant dans .env');
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 5000;
const origins = (process.env.CORS_ORIGINS || 'http://localhost:8080,http://localhost:5173').split(',').filter(Boolean);

app.use(cors({ origin: origins, credentials: true }));
app.use(express.json());

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  max: 30,
  message: { error: 'Trop de tentatives, réessayez plus tard' }
});

app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/profile', profileRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Serveur fonctionnel' });
});

app.listen(PORT, () => {
  console.log('Serveur démarré sur http://localhost:' + PORT);
});
