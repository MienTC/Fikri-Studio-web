import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import type { ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  login: (userData: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  const login = (userData: any) => {
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem("token", userData.token);
    navigate("/dashboard");
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};