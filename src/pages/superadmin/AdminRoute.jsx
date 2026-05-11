import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const isLogged = localStorage.getItem("admin_logged") === "true";

  if (!isLogged) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}