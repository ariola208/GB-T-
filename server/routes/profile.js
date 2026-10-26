const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const pool = require('../config/db');
const auth = require('../middleware/auth');

router.use(auth);

const getProfile = async (req, res) => {
  try {
    const uid = req.user.userId;
    const [rows] = await pool.execute(
      'SELECT user_id, email, first_name, last_name, phone, bio, location, role, created_at, avatar_url FROM users WHERE user_id = ?',
      [uid]
    );
    if (!rows.length) return res.status(404).json({ error: 'Utilisateur non trouvé' });
    const u = rows[0];
    const [stats] = await pool.execute(
      `SELECT
        (SELECT COUNT(*) FROM bookings WHERE user_id = ? AND status != 'cancelled') AS trips,
        (SELECT COUNT(*) FROM reviews WHERE user_id = ?) AS reviews,
        (SELECT COUNT(*) FROM favorites WHERE user_id = ?) AS favorites,
        (SELECT COALESCE(SUM(points), 0) FROM user_points WHERE user_id = ?) AS points`,
      [uid, uid, uid, uid]
    );
    res.json({
      id: u.user_id, name: `${u.first_name} ${u.last_name}`.trim(), email: u.email,
      phone: u.phone || '', bio: u.bio || '', location: u.location || '',
      role: u.role, joinedDate: u.created_at, avatar_url: u.avatar_url || null,
      stats: { trips: Number(stats[0].trips), reviews: Number(stats[0].reviews), favorites: Number(stats[0].favorites), points: Number(stats[0].points) },
    });
  } catch (e) { console.error(e); res.status(500).json({ error: 'Erreur' }); }
};

router.get('/me', getProfile);
router.get('/profile', getProfile);

router.put('/profile', async (req, res) => {
  const { name, email, phone, location, bio } = req.body;
  if (!name || !name.trim()) return res.status(400).json({ error: 'Nom requis' });
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: 'Email invalide' });
  const parts = name.trim().split(/\s+/);
  const first = parts.shift();
  const last = parts.join(' ');
  try {
    await pool.execute(
      'UPDATE users SET first_name = ?, last_name = ?, email = ?, phone = ?, location = ?, bio = ? WHERE user_id = ?',
      [first, last, email, phone || null, location || null, bio || null, req.user.userId]
    );
    res.json({ message: 'Profil mis à jour' });
  } catch (e) {
    if (e.code === 'ER_DUP_ENTRY') return res.status(400).json({ error: 'Email déjà utilisé' });
    console.error(e); res.status(500).json({ error: 'Erreur' });
  }
});

router.put('/change-password', async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (typeof newPassword !== 'string' || newPassword.length < 8) return res.status(400).json({ error: '8 caractères minimum' });
  try {
    const [rows] = await pool.execute('SELECT password_hash FROM users WHERE user_id = ?', [req.user.userId]);
    if (!rows.length) return res.status(404).json({ error: 'Utilisateur non trouvé' });
    const ok = await bcrypt.compare(currentPassword || '', rows[0].password_hash);
    if (!ok) return res.status(400).json({ error: 'Mot de passe incorrect' });
    const hashed = await bcrypt.hash(newPassword, 10);
    await pool.execute('UPDATE users SET password_hash = ? WHERE user_id = ?', [hashed, req.user.userId]);
    res.json({ message: 'Mot de passe modifié' });
  } catch (e) { console.error(e); res.status(500).json({ error: 'Erreur' }); }
});

router.get('/trips', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      `SELECT b.booking_id AS id, COALESCE(d.name, 'Voyage') AS destination, d.image_url AS image,
              b.start_date, b.end_date, COALESCE(b.number_of_travelers, 1) AS travelers,
              b.total_price AS price, b.status
       FROM bookings b LEFT JOIN destinations d ON b.destination_id = d.destination_id
       WHERE b.user_id = ? ORDER BY b.start_date DESC`,
      [req.user.userId]
    );
    const fmt = (d) => new Date(d).toLocaleDateString('fr-FR');
    res.json(rows.map((r) => ({ ...r, status: r.status === 'pending' ? 'upcoming' : r.status, startDate: fmt(r.start_date), endDate: fmt(r.end_date), price: Number(r.price) })));
  } catch (e) { console.error(e); res.status(500).json({ error: 'Erreur' }); }
});

router.get('/favorites', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      `SELECT d.destination_id AS id, d.name, d.slug, d.region AS location, d.image_url AS image, d.rating
       FROM favorites f JOIN destinations d ON f.destination_id = d.destination_id WHERE f.user_id = ?`,
      [req.user.userId]
    );
    res.json(rows.map((r) => ({ ...r, rating: Number(r.rating) })));
  } catch (e) { console.error(e); res.status(500).json({ error: 'Erreur' }); }
});

router.delete('/favorites/:destinationId', async (req, res) => {
  try {
    await pool.execute('DELETE FROM favorites WHERE user_id = ? AND destination_id = ?', [req.user.userId, req.params.destinationId]);
    res.json({ message: 'Retiré' });
  } catch (e) { console.error(e); res.status(500).json({ error: 'Erreur' }); }
});

router.get('/reviews', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      `SELECT r.review_id AS id, d.name AS destination, r.rating, r.comment, r.created_at AS date
       FROM reviews r JOIN destinations d ON r.destination_id = d.destination_id WHERE r.user_id = ? ORDER BY r.created_at DESC`,
      [req.user.userId]
    );
    res.json(rows);
  } catch (e) { console.error(e); res.status(500).json({ error: 'Erreur' }); }
});

module.exports = router;
