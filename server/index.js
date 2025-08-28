import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sqlite3 from 'sqlite3';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'votre_secret_jwt_tres_securise';

// Middleware
app.use(cors());
app.use(express.json());

// Initialisation de la base de données
let db;
function initDatabase() {
  return new Promise((resolve, reject) => {
    db = new sqlite3.Database('./database.sqlite', (err) => {
      if (err) {
        console.error('Erreur lors de la connexion à la base de données:', err);
        reject(err);
      } else {
        console.log('Connexion à la base de données SQLite réussie');
        
        // Création de la table
        db.run(`
          CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            name TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
          )
        `, (err) => {
          if (err) {
            console.error('Erreur lors de la création de la table:', err);
            reject(err);
          } else {
            console.log('Base de données initialisée');
            resolve();
          }
        });
      }
    });
  });
}

// Fonction utilitaire pour exécuter des requêtes
function dbRun(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
}

function dbGet(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

// Routes d'authentification
app.post('/api/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Validation simple
    if (!email || !password) {
      return res.status(400).json({ error: 'Email et mot de passe requis' });
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await dbGet('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser) {
      return res.status(400).json({ error: 'Un utilisateur avec cet email existe déjà' });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insérer le nouvel utilisateur
    const result = await dbRun(
      'INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
      [email, hashedPassword, name]
    );

    // Générer un token JWT
    const token = jwt.sign({ userId: result.lastID }, JWT_SECRET, { expiresIn: '24h' });

    res.status(201).json({
      message: 'Utilisateur créé avec succès',
      token,
      user: { id: result.lastID, email, name }
    });
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email et mot de passe requis' });
    }

    // Trouver l'utilisateur
    const user = await dbGet('SELECT * FROM users WHERE email = ?', [email]);
    if (!user) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }

    // Vérifier le mot de passe
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }

    // Générer un token JWT
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });

    res.json({
      message: 'Connexion réussie',
      token,
      user: { id: user.id, email: user.email, name: user.name }
    });
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

// Middleware pour vérifier le token JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token d\'accès requis' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token invalide' });
    }
    req.user = user;
    next();
  });
}

// Route protégée exemple
app.get('/api/profile', authenticateToken, async (req, res) => {
  try {
    const user = await dbGet('SELECT id, email, name, created_at FROM users WHERE id = ?', [req.user.userId]);
    res.json(user);
  } catch (error) {
    console.error('Erreur lors de la récupération du profil:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

// Démarrer le serveur
initDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Serveur backend démarré sur le port ${PORT}`);
  });
}).catch(err => {
  console.error('Erreur lors de l\'initialisation de la base de données:', err);
});
