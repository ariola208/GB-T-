const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pool = require('../config/db');
const auth = require('../middleware/auth');

router.use(auth);
const EXT = { 'image/jpeg': '.jpg', 'image/png': '.png', 'image/webp': '.webp', 'image/gif': '.gif' };
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '..', 'uploads', 'avatars');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = EXT[file.mimetype];
    cb(null, `user-${req.user.userId}-${Date.now()}${ext}`);
  },
});
const fileFilter = (req, file, cb) => cb(null, file.mimetype in EXT);
const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

router.post('/avatar', upload.single('avatar'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'Aucun fichier' });
    const [rows] = await pool.execute('SELECT avatar_url FROM users WHERE user_id = ?', [req.user.userId]);
    if (rows.length && rows[0].avatar_url) {
      const old = path.join(__dirname, '..', rows[0].avatar_url);
      if (fs.existsSync(old)) try { fs.unlinkSync(old); } catch {}
    }
    const url = `/uploads/avatars/${req.file.filename}`;
    await pool.execute('UPDATE users SET avatar_url = ? WHERE user_id = ?', [url, req.user.userId]);
    res.json({ message: 'OK', avatar_url: url });
  } catch (e) { console.error(e); res.status(500).json({ error: 'Erreur upload' }); }
});

router.delete('/avatar', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT avatar_url FROM users WHERE user_id = ?', [req.user.userId]);
    if (rows.length && rows[0].avatar_url) {
      const old = path.join(__dirname, '..', rows[0].avatar_url);
      if (fs.existsSync(old)) try { fs.unlinkSync(old); } catch {}
    }
    await pool.execute('UPDATE users SET avatar_url = NULL WHERE user_id = ?', [req.user.userId]);
    res.json({ message: 'Supprimé' });
  } catch (e) { console.error(e); res.status(500).json({ error: 'Erreur' }); }
});

module.exports = router;
