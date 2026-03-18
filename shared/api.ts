// client/src/api/client.ts
import { 
  API_ROUTES, 
  AuthResponse, 
  LoginRequest, 
  RegisterRequest,
  createApiError,
  isValidEmail 
} from '../../shared/api';

/**
 * Authentifie un utilisateur avec ses identifiants
 * @param data - Les informations de connexion (email, mot de passe)
 * @returns Promise contenant la réponse d'authentification
 * @throws {Error} Si l'email est invalide ou si la requête échoue
 */
export async function loginUser(data: LoginRequest): Promise<AuthResponse> {
  // Validation de l'email
  if (!isValidEmail(data.email)) {
    throw createApiError('Email invalide', 'INVALID_EMAIL');
  }

  try {
    const response = await fetch(API_ROUTES.LOGIN, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data),
    });

    // Gestion des erreurs HTTP
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw createApiError(
        errorData.message || 'Erreur lors de la connexion',
        errorData.code || 'LOGIN_FAILED',
        response.status
      );
    }

    // Retourne les données de la réponse
    return await response.json();
    
  } catch (error) {
    // Si l'erreur est déjà une ApiError, on la propage
    if (error && typeof error === 'object' && 'code' in error) {
      throw error;
    }
    
    // Sinon, on crée une erreur générique
    throw createApiError(
      'Erreur réseau ou serveur indisponible',
      'NETWORK_ERROR'
    );
  }
}

/**
 * Enregistre un nouvel utilisateur
 * @param data - Les informations d'inscription
 * @returns Promise contenant la réponse d'authentification
 */
export async function registerUser(data: RegisterRequest): Promise<AuthResponse> {
  // Validation de l'email
  if (!isValidEmail(data.email)) {
    throw createApiError('Email invalide', 'INVALID_EMAIL');
  }

  try {
    const response = await fetch(API_ROUTES.REGISTER, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw createApiError(
        errorData.message || 'Erreur lors de l\'inscription',
        errorData.code || 'REGISTER_FAILED',
        response.status
      );
    }

    return await response.json();
    
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error) {
      throw error;
    }
    
    throw createApiError(
      'Erreur réseau ou serveur indisponible',
      'NETWORK_ERROR'
    );
  }
}

/**
 * Rafraîchit le token d'authentification
 * @param refreshToken - Le token de rafraîchissement
 * @returns Promise contenant le nouveau token
 */
export async function refreshToken(refreshToken: string): Promise<{ token: string }> {
  try {
    const response = await fetch(API_ROUTES.REFRESH_TOKEN, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      throw createApiError(
        'Erreur lors du rafraîchissement du token',
        'REFRESH_FAILED',
        response.status
      );
    }

    return await response.json();
    
  } catch (error) {
    throw createApiError(
      'Erreur réseau ou serveur indisponible',
      'NETWORK_ERROR'
    );
  }
}

/**
 * Déconnecte l'utilisateur
 * @param token - Le token d'authentification
 */
export async function logoutUser(token: string): Promise<void> {
  try {
    const response = await fetch(API_ROUTES.LOGOUT, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw createApiError(
        errorData.message || 'Erreur lors de la déconnexion',
        errorData.code || 'LOGOUT_FAILED',
        response.status
      );
    }
    
  } catch (error) {
    throw createApiError(
      'Erreur réseau ou serveur indisponible',
      'NETWORK_ERROR'
    );
  }
}

// Types exportés pour une utilisation externe
export type { AuthResponse, LoginRequest, RegisterRequest };
