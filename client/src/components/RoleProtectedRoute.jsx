import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RoleProtectedRoute({ allowedRole }) {
  const location = useLocation();

  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    user = null;
  }

  const token = localStorage.getItem("token");

  // Not authenticated
  if (!token || !user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  // Authenticated but wrong role
  if (user.role !== allowedRole) {
    return (
      <Navigate
        to={`/dashboard/${user.role}`}
        replace
      />
    );
  }

  return <Outlet />;
}