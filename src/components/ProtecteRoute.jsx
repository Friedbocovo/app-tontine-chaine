// ================================
// ProtectedRoute.jsx
// Protège les routes — redirige si pas connecté
// ================================

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, roleRequis }) {
  const { estConnecte, chargement, role } = useAuth();

  if (chargement) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F2ED]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#1B5E4B] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-500">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!estConnecte) {
    return <Navigate to="/connexion" replace />;
  }

  // Si un rôle est requis et ne correspond pas
  if (roleRequis && role !== roleRequis) {
    return <Navigate to={role === "organisateur" ? "/organisateur" : "/membre"} replace />;
  }

  return children;
}