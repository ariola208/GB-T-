const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const emailOk = (e) => typeof e === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) && e.length <= 255;
const sign = (payload) => jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password, phone } = req.body;
  if (!firstName || !lastName) return res.status(400).json({ error: 'Nom et prénom requis' });
  if (!emailOk(email)) return res.status(400).json({ error: 'Email invalide' });
  if (typeof password !== 'string' || password.length < 8) {
    return res.status(400).json({ error: 'Mot de passe : 8 caractères minimum' });
  }
  try {
    const [existing] = await pool.execute('SELECT user_id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ error: 'Cet email est déjà utilisé' });
    }
    const hashed = await bcrypt.hash(password, 10);
    const [result] = await pool.execute(
      'INSERT INTO users (email, password_hash, first_name, last_name, phone) VALUES (?, ?, ?, ?, ?)',
      [email, hashed, firstName, lastName, phone || null]
    );
    const token = sign({ userId: result.insertId, email, role: 'user' });
    res.status(201).json({
      message: 'Compte créé avec succès',
      token,
      user: { id: result.insertId, name: firstName + ' ' + lastName, email, role: 'user' }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la création du compte' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!emailOk(email) || typeof password !== 'string') {
    return res.status(400).json({ error: 'Email ou mot de passe invalide' });
  }
  try {
    const [rows] = await pool.execute(
      'SELECT user_id, email, password_hash, first_name, last_name, role FROM users WHERE email = ?',
      [email]
    );
    if (rows.length === 0) return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    const ok = await bcrypt.compare(password, rows[0].password_hash);
    if (!ok) return res.status(401).json({ error: 'Email ou mot de passe incorrect' });

    const token = sign({ userId: rows[0].user_id, email: rows[0].email, role: rows[0].role });
    res.json({
      message: 'Connexion réussie',
      token,
      user: {
        id: rows[0].user_id,
        name: rows[0].first_name + ' ' + rows[0].last_name,
        email: rows[0].email,
        role: rows[0].role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la connexion' });
  }
});

module.exports = router;
