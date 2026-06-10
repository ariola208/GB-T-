const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');

const app = express();
const PORT = 5000;

app.use(cors({ origin: ['http://localhost:8080', 'http://localhost:5173', 'http://localhost:5174'], credentials: true }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Serveur fonctionnel' });
});

app.listen(PORT, () => {
  console.log('Serveur démarré sur http://localhost:' + PORT);
});
