import bcrypt from 'bcryptjs';
import { dbGet, dbRun } from '../utils/db.js';

export const UserModel = {
  async findByEmail(email) {
    return await dbGet('SELECT * FROM users WHERE email = ?', [email]);
  },

  async findById(id) {
    return await dbGet('SELECT id, email, name, created_at FROM users WHERE id = ?', [id]);
  },

  async create(userData) {
    const { email, password, name } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const result = await dbRun(
      'INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
      [email, hashedPassword, name]
    );
    
    return { id: result.lastID, email, name };
  },

  async validatePassword(user, password) {
    return await bcrypt.compare(password, user.password);
  }
};
