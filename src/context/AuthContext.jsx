// ================================
// AuthContext.jsx
// Contexte d'authentification global
// ================================

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [utilisateur, setUtilisateur] = useState(null);
  const [role, setRole] = useState(null); // "organisateur" | "membre"
  const [estConnecte, setEstConnecte] = useState(false);
  const [chargement, setChargement] = useState(true);

  // Charger l'état depuis localStorage au démarrage
  useEffect(() => {
    try {
      const userData = localStorage.getItem("tontine_user");
      const savedRole = localStorage.getItem("tontine_role");
      const savedPin = localStorage.getItem("tontine_pin");

      if (userData && savedRole && savedPin) {
        setUtilisateur(JSON.parse(userData));
        setRole(savedRole);
        setEstConnecte(true);
      }
    } catch (e) {
      console.error("Erreur lecture localStorage:", e);
    } finally {
      setChargement(false);
    }
  }, []);

  // ================================
  // INSCRIPTION
  // ================================
  const inscrire = ({ prenom, nom, telephone, ville, role: r }) => {
    const nouvelUtilisateur = {
      prenom,
      nom,
      telephone,
      ville,
      dateInscription: new Date().toISOString(),
      kycStatut: "en_attente", // "en_attente" | "approuve" | "rejete"
      estBlackliste: false,
    };
    localStorage.setItem("tontine_inscription", JSON.stringify(nouvelUtilisateur));
    localStorage.setItem("tontine_role", r);
  };

  // ================================
  // SAUVEGARDER LE PIN
  // ================================
  const sauvegarderPin = (pinCode) => {
    localStorage.setItem("tontine_pin", pinCode);
  };

  // ================================
  // CONNEXION
  // ================================
  const connecter = (telephone, pinCode) => {
    const savedPin = localStorage.getItem("tontine_pin");
    const savedRole = localStorage.getItem("tontine_role");
    const savedUser =
      localStorage.getItem("tontine_user") ||
      localStorage.getItem("tontine_inscription");

    if (pinCode !== savedPin) {
      return { succes: false, erreur: "Code PIN incorrect" };
    }

    let userData;
    try {
      userData = JSON.parse(savedUser);
    } catch {
      return { succes: false, erreur: "Utilisateur introuvable" };
    }

    // Mettre à jour le localStorage avec la clé finale
    localStorage.setItem("tontine_user", JSON.stringify(userData));

    setUtilisateur(userData);
    setRole(savedRole);
    setEstConnecte(true);

    return { succes: true };
  };

  // ================================
  // METTRE À JOUR LE PROFIL
  // ================================
  const mettreAJourProfil = (data) => {
    const mis = { ...utilisateur, ...data };
    setUtilisateur(mis);
    localStorage.setItem("tontine_user", JSON.stringify(mis));
  };

  // ================================
  // METTRE À JOUR LE STATUT KYC
  // ================================
  const mettreAJourKYC = (statut) => {
    mettreAJourProfil({ kycStatut: statut });
  };

  // ================================
  // DÉCONNEXION
  // ================================
  const deconnecter = () => {
    setUtilisateur(null);
    setRole(null);
    setEstConnecte(false);

    // On garde l'inscription et le PIN (pour reconnexion)
    // On supprime juste la session active
    localStorage.removeItem("tontine_user");
  };

  // ================================
  // NOM COMPLET
  // ================================
  const nomComplet = utilisateur
    ? `${utilisateur.prenom} ${utilisateur.nom}`
    : "";

  // ================================
  // INITIALES (pour l'avatar)
  // ================================
  const initiales = utilisateur
    ? `${utilisateur.prenom?.[0] ?? ""}${utilisateur.nom?.[0] ?? ""}`.toUpperCase()
    : "?";

  return (
    <AuthContext.Provider
      value={{
        utilisateur,
        role,
        estConnecte,
        chargement,
        nomComplet,
        initiales,
        inscrire,
        sauvegarderPin,
        connecter,
        mettreAJourProfil,
        mettreAJourKYC,
        deconnecter,
        estOrganisateur: role === "organisateur",
        estMembre: role === "membre",
      }}
    >
      {!chargement && children}
    </AuthContext.Provider>
  );
}

// Hook d'accès facile
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth doit être utilisé dans AuthProvider");
  return ctx;
}