import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  token: string | null;
  username: string | null;
  userId: string | null;
  isLoggedIn: boolean;
  login: (tokem: string, username: string, userId: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setUserToken] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const login = (token:string, username: string, userId: string) => {
    setUsername(username);
    setUserId(userId);
    setUserToken(token);
    setIsLoggedIn(true);

  };

  const logout = () => {
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
