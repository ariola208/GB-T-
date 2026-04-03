import { UserModel } from '../models/userModel.js';
import { generateToken } from '../middleware/auth.js';

export const AuthController = {
  async register(req, res) {
    try {
      const { email, password, name } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email et mot de passe requis' });
      }

      const existingUser = await UserModel.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: 'Email déjà utilisé' });
      }

      const user = await UserModel.create({ email, password, name });
      const token = generateToken(user.id);

      res.status(201).json({
        message: 'Utilisateur créé',
        token,
        user
      });
    } catch (error) {
      console.error('Erreur register:', error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email et mot de passe requis' });
      }

      const user = await UserModel.findByEmail(email);
      if (!user) {
        return res.status(401).json({ error: 'Email ou mot de passe éronné' });
      }

      const isValid = await UserModel.validatePassword(user, password);
      if (!isValid) {
        return res.status(401).json({ error: 'Email ou mot de passe éronné' });
      }

      const token = generateToken(user.id);

      res.json({
        message: 'Connexion réussie',
        token,
        user: { id: user.id, email: user.email, name: user.name }
      });
    } catch (error) {
      console.error('Erreur login:', error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  },

  async getProfile(req, res) {
    try {
      const user = await UserModel.findById(req.user.userId);
      res.json(user);
    } catch (error) {
      console.error('Erreur profile:', error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  }
};
