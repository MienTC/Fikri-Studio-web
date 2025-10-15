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
  // Lấy user và token từ localStorage khi khởi tạo
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!storedToken);
  const [user, setUser] = useState<any>(storedUser ? JSON.parse(storedUser) : null);
  const navigate = useNavigate();

  const login = (userData: any) => {
    setIsAuthenticated(true);
    const userObj = userData.user || userData;
    setUser(userObj);
    // Lưu cả user và token vào localStorage
    localStorage.setItem("token", userData.token || userData.access_token);
    localStorage.setItem("user", JSON.stringify(userObj));
    navigate("/dashboard");
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
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