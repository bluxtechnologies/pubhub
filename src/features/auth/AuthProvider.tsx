import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../../types';
import { CURRENT_USER } from '../../lib/mock/data';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (emailOrUsername: string, password: string) => Promise<boolean>;
  register: (name: string, username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedToken = localStorage.getItem('auth_token');
    const savedUser = localStorage.getItem('auth_user');
    if (savedToken && savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch {
        return CURRENT_USER;
      }
    }
    // Default to logged-in CURRENT_USER for seamless demo testing
    return CURRENT_USER;
  });

  const login = async (emailOrUsername: string): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 400));
    const mockLoggedInUser: User = {
      ...CURRENT_USER,
      username: emailOrUsername.includes('@') ? emailOrUsername.split('@')[0] : emailOrUsername,
    };
    setUser(mockLoggedInUser);
    localStorage.setItem('auth_token', 'mock_bearer_token_12345');
    localStorage.setItem('auth_user', JSON.stringify(mockLoggedInUser));
    return true;
  };

  const register = async (name: string, username: string): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 500));
    const newUser: User = {
      ...CURRENT_USER,
      id: `usr_${Date.now()}`,
      name,
      username,
    };
    setUser(newUser);
    localStorage.setItem('auth_token', 'mock_bearer_token_12345');
    localStorage.setItem('auth_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
