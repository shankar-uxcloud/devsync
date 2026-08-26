import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaCheckCircle,
  FaCode,
  FaGraduationCap,
  FaLock,
  FaProjectDiagram,
  FaUser,
  FaUserTie,
  FaUsers,
} from "react-icons/fa";

const API_URL = "http://localhost:5000";

const ROLE_CONFIG = {
  student: {
    title: "Student Teams",
    subtitle: "Build, collaborate and grow together.",
    description:
      "Work on academic projects with structured teamwork, task tracking and progress visibility.",
    icon: FaGraduationCap,
    accent: "blue",
    features: [
      "Create and manage project teams",
      "Track tasks and project progress",
      "Collaborate with teammates",
      "Keep your academic work organized",
    ],
  },

  developer: {
    title: "Developers",
    subtitle: "Build software. Review code. Ship together.",
    description:
      "Manage software projects, collaborate with your team and work directly inside your development workspace.",
    icon: FaCode,
    accent: "cyan",
    features: [
      "Code workspace and terminal",
      "Project and repository management",
      "Code review and collaboration",
      "Issues, tasks and development progress",
    ],
  },

  mentor: {
    title: "Guides & Mentors",
    subtitle: "Guide teams. Review progress. Make an impact.",
    description:
      "Monitor project teams, review their progress and identify areas where guidance is needed.",
    icon: FaUserTie,
    accent: "purple",
    features: [
      "Monitor assigned teams",
      "Review project progress",
      "Provide feedback and guidance",
      "Identify delayed or blocked work",
    ],
  },

  client: {
    title: "Clients & Stakeholders",
    subtitle: "Stay informed at every milestone.",
    description:
      "Track project progress, milestones and deliverables without getting lost in the development details.",
    icon: FaUsers,
    accent: "emerald",
    features: [
      "Track project milestones",
      "Monitor deliverables",
      "View project progress",
      "Stay informed about important updates",
    ],
  },
};

const accentStyles = {
  blue: {
    border: "border-blue-500/30",
    glow: "shadow-blue-500/10",
    text: "text-blue-400",
    bg: "bg-blue-500/10",
    button: "bg-blue-600 hover:bg-blue-500",
  },

  cyan: {
    border: "border-cyan-500/30",
    glow: "shadow-cyan-500/10",
    text: "text-cyan-400",
    bg: "bg-cyan-500/10",
    button: "bg-cyan-600 hover:bg-cyan-500",
  },

  purple: {
    border: "border-purple-500/30",
    glow: "shadow-purple-500/10",
    text: "text-purple-400",
    bg: "bg-purple-500/10",
    button: "bg-purple-600 hover:bg-purple-500",
  },

  emerald: {
    border: "border-emerald-500/30",
    glow: "shadow-emerald-500/10",
    text: "text-emerald-400",
    bg: "bg-emerald-500/10",
    button: "bg-emerald-600 hover:bg-emerald-500",
  },
};

export default function RoleLogin() {
  const navigate = useNavigate();
  const location = useLocation();

  const roleFromPath = location.pathname.split("/").pop();

  const role = ROLE_CONFIG[roleFromPath]
    ? roleFromPath
    : "student";

  const config = ROLE_CONFIG[role];
  const Icon = config.icon;
  const styles = accentStyles[config.accent];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =====================================================
  // REAL BACKEND LOGIN
  // =====================================================

  const handleLogin = async (event) => {
    event.preventDefault();

    setError("");

    const cleanEmail = email.trim();

    if (!cleanEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/api/auth/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: cleanEmail,
            password,
            role,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to sign in."
        );
      }

      if (!data.token || !data.user) {
        throw new Error(
          "Invalid response received from the server."
        );
      }

      // =================================================
      // SAVE REAL AUTHENTICATION DATA
      // =================================================

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      localStorage.setItem(
        "devsync_user",
        JSON.stringify({
          ...data.user,
          rememberMe,
        })
      );

      // =================================================
      // ROLE SAFETY CHECK
      // =================================================

      if (data.user.role !== role) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("devsync_user");

        throw new Error(
          `This account belongs to the ${data.user.role} workspace.`
        );
      }

      // =================================================
      // GO TO CORRECT ROLE DASHBOARD
      // =================================================

      navigate(`/dashboard/${data.user.role}`, {
        replace: true,
      });
    } catch (loginError) {
      console.error("LOGIN ERROR:", loginError);

      setError(
        loginError.message ||
          "Unable to connect to the DevSync server."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // SWITCH ROLE
  // =====================================================

  const switchRole = (nextRole) => {
    setEmail("");
    setPassword("");
    setError("");

    navigate(`/login/${nextRole}`);
  };

  return (
    <div className="min-h-screen bg-[#05070a] text-white">
      {/* =================================================
          TOP BAR
      ================================================= */}

      <header className="flex h-16 items-center justify-between border-b border-slate-800/80 px-6 md:px-10">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sm font-bold text-slate-300 transition hover:text-white"
        >
          <span className="text-lg">←</span>
          DevSync
        </button>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="text-xs font-semibold text-slate-500 transition hover:text-white"
        >
          Back to home
        </button>
      </header>

      {/* =================================================
          MAIN
      ================================================= */}

      <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center px-6 py-12 md:px-10">
        <div className="grid w-full gap-10 lg:grid-cols-[1fr_460px] lg:items-center">
          {/* =================================================
              LEFT INFORMATION
          ================================================= */}

          <section className="hidden lg:block">
            <div
              className={`mb-7 flex h-14 w-14 items-center justify-center rounded-2xl border ${styles.border} ${styles.bg}`}
            >
              <Icon
                className={`text-2xl ${styles.text}`}
              />
            </div>

            <p
              className={`mb-3 text-xs font-bold uppercase tracking-[0.25em] ${styles.text}`}
            >
              DevSync workspace
            </p>

            <h1 className="max-w-2xl text-5xl font-black leading-[1.05] tracking-tight">
              {config.title}
            </h1>

            <p className="mt-5 max-w-xl text-xl font-semibold text-slate-300">
              {config.subtitle}
            </p>

            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500">
              {config.description}
            </p>

            <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-2">
              {config.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-start gap-3 rounded-xl border border-slate-800/80 bg-slate-900/20 p-4"
                >
                  <FaCheckCircle
                    className={`mt-0.5 shrink-0 text-xs ${styles.text}`}
                  />

                  <span className="text-xs leading-5 text-slate-400">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* =================================================
              LOGIN CARD
          ================================================= */}

          <section
            className={`rounded-2xl border ${styles.border} bg-[#0a0e13] p-7 shadow-2xl ${styles.glow} md:p-8`}
          >
            {/* MOBILE ROLE HEADER */}

            <div className="mb-7 flex items-center gap-3 lg:hidden">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${styles.bg}`}
              >
                <Icon
                  className={`text-lg ${styles.text}`}
                />
              </div>

              <div>
                <p className="text-sm font-bold text-white">
                  {config.title}
                </p>

                <p className="text-[11px] text-slate-500">
                  DevSync workspace
                </p>
              </div>
            </div>

            {/* TITLE */}

            <div className="mb-7">
              <h2 className="text-2xl font-black tracking-tight">
                Welcome back
              </h2>

              <p className="mt-2 text-xs leading-5 text-slate-500">
                Sign in to continue to your{" "}
                {config.title.toLowerCase()} workspace.
              </p>
            </div>

            {/* ERROR */}

            {error && (
              <div className="mb-5 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2.5 text-xs leading-5 text-red-300">
                {error}
              </div>
            )}

            {/* FORM */}

            <form
              onSubmit={handleLogin}
              className="space-y-5"
            >
              {/* EMAIL */}

              <div>
                <label className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Email
                </label>

                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-600" />

                  <input
                    type="email"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    placeholder="you@example.com"
                    autoComplete="email"
                    disabled={loading}
                    className="w-full rounded-lg border border-slate-800 bg-[#080b0f] py-3 pl-9 pr-3 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-slate-600 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </div>
              </div>

              {/* PASSWORD */}

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Password
                  </label>

                  <button
                    type="button"
                    onClick={() =>
                      navigate("/forgot-password")
                    }
                    disabled={loading}
                    className={`text-[10px] font-semibold ${styles.text} hover:underline disabled:opacity-50`}
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-600" />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    disabled={loading}
                    className="w-full rounded-lg border border-slate-800 bg-[#080b0f] py-3 pl-9 pr-20 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-slate-600 disabled:cursor-not-allowed disabled:opacity-60"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (value) => !value
                      )
                    }
                    disabled={loading}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-600 transition hover:text-white disabled:opacity-50"
                  >
                    {showPassword
                      ? "HIDE"
                      : "SHOW"}
                  </button>
                </div>
              </div>

              {/* REMEMBER */}

              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) =>
                    setRememberMe(
                      event.target.checked
                    )
                  }
                  disabled={loading}
                  className="h-3.5 w-3.5 accent-blue-500"
                />

                <span className="text-[11px] text-slate-500">
                  Remember me
                </span>
              </label>

              {/* LOGIN BUTTON */}

              <button
                type="submit"
                disabled={loading}
                className={`flex w-full items-center justify-center gap-2 rounded-lg py-3 text-sm font-black transition disabled:cursor-not-allowed disabled:opacity-50 ${styles.button}`}
              >
                {loading
                  ? "Signing in..."
                  : "Sign in"}

                {!loading && (
                  <FaArrowRight className="text-xs" />
                )}
              </button>
            </form>

            {/* =================================================
                SWITCH WORKSPACE
            ================================================= */}

            <div className="my-7 flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-800" />

              <span className="text-[9px] font-bold uppercase tracking-widest text-slate-700">
                Switch workspace
              </span>

              <div className="h-px flex-1 bg-slate-800" />
            </div>

            <div className="grid grid-cols-2 gap-2">
              {Object.entries(
                ROLE_CONFIG
              ).map(([key, value]) => {
                const RoleIcon = value.icon;
                const active = key === role;

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() =>
                      switchRole(key)
                    }
                    disabled={loading}
                    className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 text-left transition disabled:cursor-not-allowed disabled:opacity-50 ${
                      active
                        ? `${accentStyles[value.accent].border} ${accentStyles[value.accent].bg}`
                        : "border-slate-800 bg-slate-900/20 hover:border-slate-700"
                    }`}
                  >
                    <RoleIcon
                      className={`shrink-0 text-xs ${
                        active
                          ? accentStyles[
                              value.accent
                            ].text
                          : "text-slate-600"
                      }`}
                    />

                    <span
                      className={`truncate text-[10px] font-bold ${
                        active
                          ? "text-slate-200"
                          : "text-slate-500"
                      }`}
                    >
                      {value.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* =================================================
                REAL AUTH NOTICE
            ================================================= */}

            <div className="mt-6 flex items-start gap-2 rounded-lg border border-slate-800 bg-slate-900/20 p-3">
              <FaProjectDiagram className="mt-0.5 text-[10px] text-slate-600" />

              <p className="text-[9px] leading-4 text-slate-600">
                Sign-in is connected to the DevSync
                backend. Your password is verified
                securely and your workspace role is
                checked before access is granted.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}