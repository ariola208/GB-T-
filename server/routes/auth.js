const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password, phone } = req.body;
  try {
    const [existing] = await pool.execute('SELECT user_id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ error: 'Cet email est déjà utilisé' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.execute(
      'INSERT INTO users (email, password_hash, first_name, last_name, phone) VALUES (?, ?, ?, ?, ?)',
      [email, hashedPassword, firstName, lastName, phone || null]
    );
    const token = jwt.sign(
      { userId: result.insertId, email, role: 'user' },
      'benin_tourisme_secret_key_2024',
      { expiresIn: '7d' }
    );
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
  try {
    const [rows] = await pool.execute(
      'SELECT user_id, email, password_hash, first_name, last_name, role FROM users WHERE email = ?',
      [email]
    );
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }
    const validPassword = await bcrypt.compare(password, rows[0].password_hash);
    if (!validPassword) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }
    const token = jwt.sign(
      { userId: rows[0].user_id, email: rows[0].email, role: rows[0].role },
      'benin_tourisme_secret_key_2024',
      { expiresIn: '7d' }
    );
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
