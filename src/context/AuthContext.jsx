import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Récupérer l'utilisateur depuis localStorage au chargement
    const saved = localStorage.getItem("inscription");
    return saved ? JSON.parse(saved) : null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem("pin");
  });

  // ================================
  // CONNEXION
  // ================================
  const login = (telephone, pinCode) => {
    const savedPin = localStorage.getItem("pin");
    const savedUser = JSON.parse(localStorage.getItem("inscription") || "{}");

    if (pinCode === savedPin) {
      setUser(savedUser);
      setIsAuthenticated(true);
      return { success: true, role: savedUser.role || "membre" };
    }
    return { success: false, error: "Numéro ou code PIN incorrect" };
  };

  // ================================
  // DÉCONNEXION
  // ================================
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("pin");
    localStorage.removeItem("inscription");
    localStorage.removeItem("kycStatus");
    localStorage.removeItem("walletAddress");
  };

  // ================================
  // INSCRIPTION
  // ================================
  const register = (userData) => {
    const newUser = { ...userData };
    localStorage.setItem("inscription", JSON.stringify(newUser));
    setUser(newUser);
    return { success: true };
  };

  // ================================
  // SAUVEGARDER LE PIN
  // ================================
  const savePin = (pinCode) => {
    localStorage.setItem("pin", pinCode);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        register,
        savePin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth doit être utilisé dans AuthProvider");
  return ctx;
}