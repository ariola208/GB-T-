const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Non authentifié' });
  jwt.verify(token, 'benin_tourisme_secret_key_2024', (err, user) => {
    if (err) return res.status(403).json({ error: 'Token invalide' });
    req.user = user;
    next();
  });
};

router.get('/me', authenticateToken, async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT user_id, email, first_name, last_name, phone, bio, location, role, created_at FROM users WHERE user_id = ?',
      [req.user.userId]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Utilisateur non trouvé' });
    const user = rows[0];
    const [stats] = await pool.execute(
      'SELECT (SELECT COUNT(*) FROM bookings WHERE user_id = ?) as trips, (SELECT COUNT(*) FROM reviews WHERE user_id = ?) as reviews, (SELECT COUNT(*) FROM favorites WHERE user_id = ?) as favorites, 0 as points',
      [req.user.userId, req.user.userId, req.user.userId]
    );
    res.json({
      id: user.user_id,
      name: user.first_name + ' ' + user.last_name,
      email: user.email,
      phone: user.phone || '',
      bio: user.bio || '',
      location: user.location || '',
      role: user.role,
      joinedDate: user.created_at,
      stats: { trips: stats[0]?.trips || 0, reviews: stats[0]?.reviews || 0, favorites: stats[0]?.favorites || 0, points: 0 }
    });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.get('/favorites', authenticateToken, async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT d.destination_id, d.name, d.slug, d.region, d.image_url, d.rating FROM favorites f JOIN destinations d ON f.destination_id = d.destination_id WHERE f.user_id = ?',
      [req.user.userId]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.delete('/favorites/:destinationId', authenticateToken, async (req, res) => {
  try {
    await pool.execute('DELETE FROM favorites WHERE user_id = ? AND destination_id = ?', [req.user.userId, req.params.destinationId]);
    res.json({ message: 'Retiré des favoris' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
