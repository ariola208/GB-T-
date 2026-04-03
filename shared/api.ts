// client/src/api/client.ts
import { 
  API_ROUTES, 
  AuthResponse, 
  LoginRequest, 
  RegisterRequest,
  createApiError,
  isValidEmail 
} from '../../shared/api';

// Configuration commune pour les requêtes fetch
const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
} as const;

// Types d'erreurs prédéfinis
const ERROR_TYPES = {
  INVALID_EMAIL: { code: 'INVALID_EMAIL', message: 'Email invalide' },
  NETWORK: { code: 'NETWORK_ERROR', message: 'Erreur réseau ou serveur indisponible' },
  LOGIN: { code: 'LOGIN_FAILED', message: 'Erreur lors de la connexion' },
  REGISTER: { code: 'REGISTER_FAILED', message: "Erreur lors de l'inscription" },
  REFRESH: { code: 'REFRESH_FAILED', message: 'Erreur lors du rafraîchissement du token' },
  LOGOUT: { code: 'LOGOUT_FAILED', message: 'Erreur lors de la déconnexion' }
} as const;

/**
 * Fonction utilitaire pour effectuer des requêtes authentifiées
 */
async function authenticatedRequest<T>(
  url: string, 
  options: RequestInit = {},
  token?: string
): Promise<T> {
  const headers = {
    ...DEFAULT_HEADERS,
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers
  };

  const response = await fetch(url, {
    ...options,
    headers
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw createApiError(
      errorData.message || 'Erreur lors de la requête',
      errorData.code || 'REQUEST_FAILED',
      response.status
    );
  }

  // Si le statut est 204 (No Content), retourner undefined
  if (response.status === 204) {
    return undefined as T;
  }

  return await response.json();
}

/**
 * Fonction utilitaire pour les requêtes POST
 */
async function postRequest<T>(
  url: string, 
  body: unknown, 
  token?: string
): Promise<T> {
  return authenticatedRequest<T>(url, {
    method: 'POST',
    body: JSON.stringify(body)
  }, token);
}

/**
 * Valide l'email et lance une erreur si invalide
 */
function validateEmail(email: string): void {
  if (!isValidEmail(email)) {
    throw createApiError(ERROR_TYPES.INVALID_EMAIL.message, ERROR_TYPES.INVALID_EMAIL.code);
  }
}

/**
 * Gère les erreurs génériques
 */
function handleGenericError(error: unknown): never {
  if (error && typeof error === 'object' && 'code' in error) {
    throw error;
  }
  throw createApiError(ERROR_TYPES.NETWORK.message, ERROR_TYPES.NETWORK.code);
}

/**
 * Authentifie un utilisateur avec ses identifiants
 * @param data - Les informations de connexion (email, mot de passe)
 * @returns Promise contenant la réponse d'authentification
 * @throws {Error} Si l'email est invalide ou si la requête échoue
 */
export async function loginUser(data: LoginRequest): Promise<AuthResponse> {
  validateEmail(data.email);
  
  try {
    return await postRequest<AuthResponse>(API_ROUTES.LOGIN, data);
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error) {
      throw error;
    }
    throw createApiError(ERROR_TYPES.LOGIN.message, ERROR_TYPES.LOGIN.code);
  }
}

/**
 * Enregistre un nouvel utilisateur
 * @param data - Les informations d'inscription
 * @returns Promise contenant la réponse d'authentification
 */
export async function registerUser(data: RegisterRequest): Promise<AuthResponse> {
  validateEmail(data.email);
  
  try {
    return await postRequest<AuthResponse>(API_ROUTES.REGISTER, data);
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error) {
      throw error;
    }
    throw createApiError(ERROR_TYPES.REGISTER.message, ERROR_TYPES.REGISTER.code);
  }
}

/**
 * Rafraîchit le token d'authentification
 * @param refreshToken - Le token de rafraîchissement
 * @returns Promise contenant le nouveau token
 */
export async function refreshToken(refreshToken: string): Promise<{ token: string }> {
  try {
    return await postRequest<{ token: string }>(API_ROUTES.REFRESH_TOKEN, { refreshToken });
  } catch (error) {
    throw createApiError(ERROR_TYPES.REFRESH.message, ERROR_TYPES.REFRESH.code);
  }
}

/**
 * Déconnecte l'utilisateur
 * @param token - Le token d'authentification
 */
export async function logoutUser(token: string): Promise<void> {
  try {
    await authenticatedRequest(API_ROUTES.LOGOUT, { method: 'POST' }, token);
  } catch (error) {
    throw createApiError(ERROR_TYPES.LOGOUT.message, ERROR_TYPES.LOGOUT.code);
  }
}

// Types exportés pour une utilisation externe
export type { AuthResponse, LoginRequest, RegisterRequest };
