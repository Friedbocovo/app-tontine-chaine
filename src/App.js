import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { BlockchainProvider } from "./context/BlockchainContext";

import SplashScreen from "./pages/SplashScreen";
import Onboarding from "./pages/Onboarding";
import ChoixRole from "./pages/auth/ChoixRole";
import Inscription from "./pages/auth/Inscription";
import Verification from "./pages/auth/Verification";
import CodePin from "./pages/auth/CodePin";
import KYC from "./pages/auth/KYC";
import Connexion from "./pages/auth/Connexion";
import DashboardOrga from "./pages/organisateur/Dashboard";
import Etape1Regles from "./pages/organisateur/creation/Etape1Regles";
import Etape2Membres from "./pages/organisateur/creation/Etape2Membres";
import Etape3Ordre from "./pages/organisateur/creation/Etape3Ordre";
import Confirmation from "./pages/organisateur/creation/Confirmation";
import GestionTontine from "./pages/organisateur/GestionTontine";
import Incidents from "./pages/organisateur/Incidents";
import Historique from "./pages/organisateur/Historique";
import Historique2 from "./pages/membre/Historique";
import DashboardMembre from "./pages/membre/Dashboard";
import Rejoindre from "./pages/membre/Rejoindre";
import Paiement from "./pages/membre/Paiement";
import ConfirmationPaiement from "./pages/membre/ConfirmationPaiement";
import SuiviTour from "./pages/membre/SuiviTour";
import Profil from "./pages/shared/Profil";
import Profil2 from "./pages/membre/Profil2";
import Notifications from "./pages/shared/Notifications";


// Import des pages superadmin    
import AppLayoutAdmin from "./pages/superadmin/AppLayoutAdmin";
import DashboardAdmin from "./pages/superadmin/Dashboard";
import ValidationKYC from "./pages/superadmin/ValidationKYC";
import GestionUtilisateurs from "./pages/superadmin/GestionUtilisateurs";
import GestionBlacklist from "./pages/superadmin/GestionBlacklist";
import GestionIncidents from "./pages/superadmin/GestionIncidents";
import LoginAdmin  from "./pages/superadmin/LoginAdmin";
import AdminRoute  from "./pages/superadmin/AdminRoute";
import ProfilAdmin from "./pages/superadmin/ProfilAdmin";

export default function App() {
  return (
    <BrowserRouter>
      <BlockchainProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<SplashScreen />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/choix-role" element={<ChoixRole />} />
            <Route path="/inscription" element={<Inscription />} />
            <Route path="/verification" element={<Verification />} />
            <Route path="/code-pin" element={<CodePin />} />
            <Route path="/kyc" element={<KYC />} />
            <Route path="/connexion" element={<Connexion />} />
            <Route path="/organisateur" element={<DashboardOrga />} />
            <Route path="/organisateur/creer/regles" element={<Etape1Regles />} />
            <Route path="/organisateur/creer/membres" element={<Etape2Membres />} />
            <Route path="/organisateur/creer/ordre" element={<Etape3Ordre />} />
            <Route path="/organisateur/creer/confirmation" element={<Confirmation />} />
            <Route path="/organisateur/tontine/:id" element={<GestionTontine />} />
            <Route path="/organisateur/incidents/:id" element={<Incidents />} />
            <Route path="/organisateur/historique/:id" element={<Historique />} />
            <Route path="/membre" element={<DashboardMembre />} />
            <Route path="/membre/rejoindre" element={<Rejoindre />} />
            <Route path="/membre/payer/:id" element={<Paiement />} />
            <Route path="/membre/paiement-confirme" element={<ConfirmationPaiement />} />
            <Route path="/membre/suivi/:id" element={<SuiviTour />} />
            <Route path="/membre/historique2/:id" element={<Historique2 />} />
            <Route path="/membre/profil2" element={<Profil2 />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="/notifications" element={<Notifications />} />


          {/* Login Super Admin — accessible sans être connecté */}
<Route path="/admin/login" element={<LoginAdmin />} />

{/* Routes protégées — redirige vers /admin/login si non connecté */}
<Route
  path="/admin"
  element={
    <AdminRoute>
      <AppLayoutAdmin />
    </AdminRoute>
  }
>
  <Route index element={<DashboardAdmin />} />
  <Route path="kyc" element={<ValidationKYC />} />
  <Route path="utilisateurs" element={<GestionUtilisateurs />} />
  <Route path="blacklist" element={<GestionBlacklist />} />
  <Route path="incidents" element={<GestionIncidents />} />
  <Route path="profil" element={<ProfilAdmin />} />
</Route>  


          </Routes>
        </AuthProvider>
      </BlockchainProvider>
    </BrowserRouter>
  );
}