import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let db;

export function initDatabase() {
  return new Promise((resolve, reject) => {
    db = new sqlite3.Database(join(__dirname, '../database.sqlite'), (err) => {
      if (err) {
        console.error('Erreur DB:', err);
        reject(err);
      } else {
        console.log('✅ Connexion DB réussie');
        
        db.run(`
          CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            name TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
          )
        `, (err) => {
          if (err) reject(err);
          else {
            console.log('✅ Table users initialisée');
            resolve();
          }
        });
      }
    });
  });
}

export function getDb() {
  return db;
}
