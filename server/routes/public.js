const express = require('express');
const rateLimit = require('express-rate-limit');
const pool = require('../config/db');

const router = express.Router();
const emailOk = (e) => typeof e === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) && e.length <= 255;
const limiter = rateLimit({ windowMs: 60 * 60 * 1000, max: 10 });

router.post('/contact', limiter, async (req, res) => {
  const { name, email, phone, subject, message, travelDate, travelers, budget } = req.body;
  if (!name || name.trim().length < 2) return res.status(400).json({ error: 'Nom requis' });
  if (!emailOk(email)) return res.status(400).json({ error: 'Email invalide' });
  if (!message || message.trim().length < 10) return res.status(400).json({ error: 'Message trop court' });
  try {
    await pool.execute(
      'INSERT INTO contact_requests (name, email, phone, subject, message, travel_date, travelers, budget) VALUES (?,?,?,?,?,?,?,?)',
      [name.trim(), email, phone || null, subject || null, message.trim(), travelDate || null, Number(travelers) || null, budget || null]
    );
    res.status(201).json({ message: 'Reçu' });
  } catch (e) { console.error(e); res.status(500).json({ error: 'Erreur serveur' }); }
});

router.post('/newsletter', limiter, async (req, res) => {
  const { email, name } = req.body;
  if (!emailOk(email)) return res.status(400).json({ error: 'Email invalide' });
  try {
    await pool.execute(
      'INSERT INTO newsletter_subscribers (email, name) VALUES (?, ?) ON DUPLICATE KEY UPDATE is_active = TRUE, unsubscribed_at = NULL',
      [email, name || null]
    );
    res.status(201).json({ message: 'Inscrit' });
  } catch (e) { console.error(e); res.status(500).json({ error: 'Erreur serveur' }); }
});

module.exports = router;
