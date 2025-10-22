// server/server.js

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const cors = require('cors'); 

const app = express();
const port = 3001;

app.use(cors()); 
app.use(express.json()); 

// Le chemin './database.sqlite' fonctionne car le fichier est dans le même dossier 'server'
const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connecté à la base de données SQLite.');
  }
});

// Point de terminaison (Endpoint) d'enregistrement
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "L'email et le mot de passe sont requis." });
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const sql = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
    
    db.run(sql, [name, email, hashedPassword], function(err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(409).json({ error: "Cet email est déjà enregistré." });
        }
        console.error("Erreur d'insertion dans la DB:", err.message);
        return res.status(500).json({ error: "Erreur lors de l'enregistrement de l'utilisateur." });
      }
      
      res.status(201).json({ 
          message: "Utilisateur enregistré avec succès!", 
          userId: this.lastID 
      });
    });

  } catch (error) {
    console.error("Erreur serveur :", error);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
});

app.listen(port, () => {
  console.log(`Serveur API démarré sur http://localhost:${port}`);
});
