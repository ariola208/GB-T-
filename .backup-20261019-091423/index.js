require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:8080')
  .split(',').map((o) => o.trim());

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) cb(null, true);
    else { console.warn('[CORS] Bloqué :', origin); cb(new Error('CORS bloqué')); }
  },
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/api/', rateLimit({ windowMs: 15 * 60 * 1000, max: 200 }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/profile', require('./routes/avatar'));

app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));
app.use((req, res) => res.status(404).json({ error: 'Route non trouvée' }));
app.use((err, req, res, next) => { console.error(err); res.status(500).json({ error: err.message || 'Erreur serveur' }); });

app.listen(PORT, '0.0.0.0', () => {
  const os = require('os');
  const ips = Object.values(os.networkInterfaces()).flat()
    .filter((i) => i && i.family === 'IPv4' && !i.internal).map((i) => i.address);
  console.log(`\x1b[36m🚀 API LEGBAH démarrée\x1b[0m`);
  console.log(`   → Local  : http://localhost:${PORT}`);
  ips.forEach((ip) => console.log(`   → Réseau : http://${ip}:${PORT}`));
});
