/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext } from 'react';

interface User {
// ... Rest of your AuthContext code remains exactly the same
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // FIX: Lazy initialize state synchronously on mount to avoid hook triggers!
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('divara_token'));
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('divara_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('divara_token', newToken);
    localStorage.setItem('divara_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('divara_token');
    localStorage.removeItem('divara_user');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// FIX: To resolve the Fast Refresh warning, custom hooks should be in their own file or handled clearly
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be wrapped in an AuthProvider block.");
  }
  return context;
}