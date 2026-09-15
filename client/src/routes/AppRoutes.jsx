import { BrowserRouter, Routes, Route } from "react-router-dom";

/* =========================================================
   PUBLIC PAGES
========================================================= */

import LandingPage from "../pages/Landing/LandingPage";

import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import RoleLogin from "../pages/Auth/RoleLogin";
import Startup from "../pages/Auth/Startup";

import ForgotPassword from "../pages/Auth/ForgotPassword";
import ResetPassword from "../pages/Auth/ResetPassword";

/* =========================================================
   MAIN APPLICATION
========================================================= */

import Dashboard from "../pages/Dashboard/Dashboard";
import RoleDashboard from "../pages/Dashboard/RoleDashboard";

/* =========================================================
   DEMO APPLICATION
========================================================= */

import DemoLayout from "../pages/Demo/DemoLayout";
import DemoDashboard from "../pages/Demo/DemoDashboard";
import CodeWorkspace from "../pages/Demo/CodeWorkspace";

import ProjectOverview from "../pages/DemoProject/ProjectOverview";
import TaskBoard from "../pages/DemoTasks/TaskBoard";
import TeamPage from "../pages/DemoTeam/TeamPage";
import ProjectChat from "../pages/DemoChat/ProjectChat";
import ProjectFiles from "../pages/DemoFiles/ProjectFiles";
import ProjectActivity from "../pages/DemoActivity/ProjectActivity";

import DemoProfile from "../pages/DemoProfile";
import DemoSettings from "../pages/DemoSettings";

/* =========================================================
   ERROR / PROTECTION
========================================================= */

import NotFound from "../pages/NotFound";

import ProtectedRoute from "../components/ProtectedRoute";
import RoleProtectedRoute from "../components/RoleProtectedRoute";

/* =========================================================
   ROUTES
========================================================= */

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ===================================================
            PUBLIC
        =================================================== */}

        <Route
          path="/"
          element={<LandingPage />}
        />

        <Route
          path="/startup"
          element={<Startup />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* ===================================================
            ROLE LOGIN
        =================================================== */}

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

        {/* ===================================================
            PASSWORD
        =================================================== */}

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password/:token"
          element={<ResetPassword />}
        />

        {/* ===================================================
            DEVSYNC INTERACTIVE DEMO

            IMPORTANT:
            Demo is PUBLIC.

            Anyone can explore it without creating
            an account or logging in.
        =================================================== */}

        <Route
          path="/demo"
          element={<DemoLayout />}
        >
          {/* -----------------------------------------------
              MAIN DEMO DASHBOARD
          ----------------------------------------------- */}

          <Route
            index
            element={<DemoDashboard />}
          />

          {/* -----------------------------------------------
              DEVELOPER WORKSPACE
          ----------------------------------------------- */}

          <Route
            path="workspace"
            element={<CodeWorkspace />}
          />

          {/* -----------------------------------------------
              PROJECT
          ----------------------------------------------- */}

          <Route
            path="project/:projectId"
            element={<ProjectOverview />}
          />

          {/* -----------------------------------------------
              PROJECT TASKS
          ----------------------------------------------- */}

          <Route
            path="project/:projectId/tasks"
            element={<TaskBoard />}
          />

          {/* -----------------------------------------------
              PROJECT TEAM
          ----------------------------------------------- */}

          <Route
            path="project/:projectId/team"
            element={<TeamPage />}
          />

          {/* -----------------------------------------------
              PROJECT CHAT
          ----------------------------------------------- */}

          <Route
            path="project/:projectId/chat"
            element={<ProjectChat />}
          />

          {/* -----------------------------------------------
              PROJECT FILES
          ----------------------------------------------- */}

          <Route
            path="project/:projectId/files"
            element={<ProjectFiles />}
          />

          {/* -----------------------------------------------
              PROJECT ACTIVITY
          ----------------------------------------------- */}

          <Route
            path="project/:projectId/activity"
            element={<ProjectActivity />}
          />

          {/* -----------------------------------------------
              DEMO PROFILE
          ----------------------------------------------- */}

          <Route
            path="profile"
            element={<DemoProfile />}
          />

          {/* -----------------------------------------------
              DEMO SETTINGS
          ----------------------------------------------- */}

          <Route
            path="settings"
            element={<DemoSettings />}
          />
        </Route>

        {/* ===================================================
            AUTHENTICATED APPLICATION
        =================================================== */}

        <Route element={<ProtectedRoute />}>

          {/* -----------------------------------------------
              GENERAL DASHBOARD
          ----------------------------------------------- */}

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          {/* -----------------------------------------------
              STUDENT DASHBOARD
          ----------------------------------------------- */}

          <Route
            path="/dashboard/student"
            element={
              <RoleProtectedRoute allowedRoles={["student"]}>
                <RoleDashboard />
              </RoleProtectedRoute>
            }
          />

          {/* -----------------------------------------------
              DEVELOPER DASHBOARD
          ----------------------------------------------- */}

          <Route
            path="/dashboard/developer"
            element={
              <RoleProtectedRoute allowedRoles={["developer"]}>
                <RoleDashboard />
              </RoleProtectedRoute>
            }
          />

          {/* -----------------------------------------------
              MENTOR DASHBOARD
          ----------------------------------------------- */}

          <Route
            path="/dashboard/mentor"
            element={
              <RoleProtectedRoute allowedRoles={["mentor"]}>
                <RoleDashboard />
              </RoleProtectedRoute>
            }
          />

          {/* -----------------------------------------------
              CLIENT DASHBOARD
          ----------------------------------------------- */}

          <Route
            path="/dashboard/client"
            element={
              <RoleProtectedRoute allowedRoles={["client"]}>
                <RoleDashboard />
              </RoleProtectedRoute>
            }
          />

        </Route>

        {/* ===================================================
            404
        =================================================== */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;