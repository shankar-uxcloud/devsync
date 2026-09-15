import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "../pages/Landing/LandingPage";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import RoleLogin from "../pages/Auth/RoleLogin";
import Startup from "../pages/Auth/Startup";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import ResetPassword from "../pages/Auth/ResetPassword";

import Dashboard from "../pages/Dashboard/Dashboard";
import RoleDashboard from "../pages/Dashboard/RoleDashboard";

import NotFound from "../pages/NotFound";

import ProtectedRoute from "../components/ProtectedRoute";
import RoleProtectedRoute from "../components/RoleProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =====================================================
            PUBLIC
        ===================================================== */}

        <Route path="/" element={<LandingPage />} />

        <Route path="/startup" element={<Startup />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* =====================================================
            ROLE LOGIN
        ===================================================== */}

        <Route
          path="/login/student"
          element={<RoleLogin />}
        />

        <Route
          path="/login/developer"
          element={<RoleLogin />}
        />

        <Route
          path="/login/mentor"
          element={<RoleLogin />}
        />

        <Route
          path="/login/client"
          element={<RoleLogin />}
        />

        {/* =====================================================
            PASSWORD
        ===================================================== */}

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password/:token"
          element={<ResetPassword />}
        />

        {/* =====================================================
            PROTECTED APPLICATION
        ===================================================== */}

        <Route element={<ProtectedRoute />}>

          {/* General dashboard */}
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          {/* Student */}
          <Route
            element={
              <RoleProtectedRoute allowedRole="student" />
            }
          >
            <Route
              path="/dashboard/student"
              element={<RoleDashboard />}
            />
          </Route>

          {/* Developer */}
          <Route
            element={
              <RoleProtectedRoute allowedRole="developer" />
            }
          >
            <Route
              path="/dashboard/developer"
              element={<RoleDashboard />}
            />
          </Route>

          {/* Mentor */}
          <Route
            element={
              <RoleProtectedRoute allowedRole="mentor" />
            }
          >
            <Route
              path="/dashboard/mentor"
              element={<RoleDashboard />}
            />
          </Route>

          {/* Client */}
          <Route
            element={
              <RoleProtectedRoute allowedRole="client" />
            }
          >
            <Route
              path="/dashboard/client"
              element={<RoleDashboard />}
            />
          </Route>

        </Route>

        {/* =====================================================
            404
        ===================================================== */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;