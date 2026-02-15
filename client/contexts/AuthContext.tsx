import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simuler une base de données utilisateurs
const USERS_STORAGE_KEY = 'users';
const CURRENT_USER_KEY = 'currentUser';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Charger l'utilisateur connecté au démarrage
    const savedUser = localStorage.getItem(CURRENT_USER_KEY);
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simuler une API de connexion
    const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
    const foundUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simuler une API d'inscription
    const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
    
    // Vérifier si l'utilisateur existe déjà
    if (users.some((u: any) => u.email === email)) {
      return false;
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
    
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  const updateProfile = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));

      // Mettre à jour dans la liste des utilisateurs
      const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
      const updatedUsers = users.map((u: any) => 
        u.id === user.id ? { ...u, ...userData, password: u.password } : u
      );
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      updateProfile,
      isAuthenticated: !!user,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
