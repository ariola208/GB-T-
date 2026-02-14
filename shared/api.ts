// client/src/api/client.ts
import { 
  API_ROUTES, 
  AuthResponse, 
  LoginRequest, 
  RegisterRequest,
  createApiError,
  isValidEmail 
} from '../../shared/api';

export async function loginUser(data: LoginRequest): Promise<AuthResponse> {
  if (!isValidEmail(data.email)) {
    throw createApiError('Email invalide', 'INVALID_EMAIL');
  }

  const response = await fetch(API_ROUTES.LOGIN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw error;
  }

  return response.json();
}
