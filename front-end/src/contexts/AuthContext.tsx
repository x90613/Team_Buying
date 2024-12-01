import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  token: string | null;
  username: string | null;
  userId: string | null;
  isLoggedIn: boolean;
  login: (token: string, username: string, userId: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState<string | null>(() => localStorage.getItem('username'));
  const [userId, setUserId] = useState<string | null>(() => localStorage.getItem('userId'));
  const [token, setUserToken] = useState<string | null>(() => localStorage.getItem('token'));
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => !!localStorage.getItem('token'));

  const login = (token: string, username: string, userId: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    localStorage.setItem('userId', userId);
    
    setUsername(username);
    setUserId(userId);
    setUserToken(token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    
    setUsername(null);
    setUserId(null);
    setUserToken(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{token, username, userId, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
