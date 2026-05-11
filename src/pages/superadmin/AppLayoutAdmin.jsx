import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Users, ShieldCheck,
  Ban, AlertTriangle, LogOut, User 
} from "lucide-react";

const navItems = [
  { to: "/admin",              icon: <LayoutDashboard size={20} />, label: "Dashboard"      },
  { to: "/admin/kyc",          icon: <ShieldCheck size={20} />,     label: "Validation KYC" },
  { to: "/admin/utilisateurs", icon: <Users size={20} />,           label: "Utilisateurs"   },
  { to: "/admin/blacklist",    icon: <Ban size={20} />,             label: "Blacklist"       },
  { to: "/admin/incidents",    icon: <AlertTriangle size={20} />,   label: "Incidents"       },
  { to: "/admin/profil", icon: <User size={20} />, label: "Mon profil" },
];

export default function AppLayoutAdmin() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1B5E4B] text-white flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <h1 className="text-xl font-bold">TontineChain</h1>
          <p className="text-xs text-white/60 mt-1">Super Administrateur DTC</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/admin"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-white text-[#1B5E4B]"
                    : "text-white/80 hover:bg-white/10"
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Déconnexion */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => {localStorage.removeItem("admin_logged"); navigate("/admin/login");}}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm text-white/80 hover:bg-white/10 transition"
          >
            <LogOut size={20} />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Contenu principal */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}