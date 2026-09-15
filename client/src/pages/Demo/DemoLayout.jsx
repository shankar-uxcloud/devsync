import { useEffect, useMemo, useState } from "react";
import {
  FaBell,
  FaBolt,
  FaChartLine,
  FaChevronDown,
  FaCode,
  FaCog,
  FaComments,
  FaFolderOpen,
  FaGithub,
  FaHome,
  FaMoon,
  FaSearch,
  FaTasks,
  FaTimes,
  FaUsers,
  FaBars,
  FaSun,
  FaRocket,
  FaUserCircle,
} from "react-icons/fa";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";

/* =========================================================
   THEME DEFINITIONS
========================================================= */

const THEMES = {
  light: {
    id: "light",
    name: "Light",
    icon: FaSun,

    colors: {
      page: "#f8fafc",
      surface: "#ffffff",
      surfaceSoft: "#f1f5f9",
      border: "#e2e8f0",
      text: "#0f172a",
      textMuted: "#64748b",
      textSoft: "#94a3b8",
      primary: "#2563eb",
      primaryHover: "#1d4ed8",
      primarySoft: "#eff6ff",
      sidebar: "#ffffff",
      topbar: "#ffffff",
      success: "#10b981",
      danger: "#ef4444",
      warning: "#f59e0b",
    },
  },

  dark: {
    id: "dark",
    name: "Dark",
    icon: FaMoon,

    colors: {
      page: "#0b1120",
      surface: "#111827",
      surfaceSoft: "#172033",
      border: "#243044",
      text: "#f8fafc",
      textMuted: "#94a3b8",
      textSoft: "#64748b",
      primary: "#3b82f6",
      primaryHover: "#60a5fa",
      primarySoft: "#172554",
      sidebar: "#0f172a",
      topbar: "#0f172a",
      success: "#10b981",
      danger: "#f87171",
      warning: "#fbbf24",
    },
  },

  midnight: {
    id: "midnight",
    name: "Midnight",
    icon: FaMoon,

    colors: {
      page: "#020617",
      surface: "#071329",
      surfaceSoft: "#0b1b36",
      border: "#17335c",
      text: "#f8fbff",
      textMuted: "#8da7c9",
      textSoft: "#55739d",
      primary: "#38bdf8",
      primaryHover: "#7dd3fc",
      primarySoft: "#082f49",
      sidebar: "#030b1c",
      topbar: "#030b1c",
      success: "#22c55e",
      danger: "#fb7185",
      warning: "#facc15",
    },
  },

  neon: {
    id: "neon",
    name: "Neon",
    icon: FaBolt,

    colors: {
      page: "#070511",
      surface: "#10091f",
      surfaceSoft: "#170d2b",
      border: "#30204c",
      text: "#faf5ff",
      textMuted: "#b8a9d6",
      textSoft: "#796b98",
      primary: "#8b5cf6",
      primaryHover: "#a78bfa",
      primarySoft: "#2e1065",
      sidebar: "#090515",
      topbar: "#090515",
      success: "#2dd4bf",
      danger: "#fb7185",
      warning: "#facc15",
    },
  },

  highContrast: {
    id: "highContrast",
    name: "High Contrast",
    icon: FaSun,

    colors: {
      page: "#ffffff",
      surface: "#ffffff",
      surfaceSoft: "#f3f4f6",
      border: "#111827",
      text: "#000000",
      textMuted: "#374151",
      textSoft: "#4b5563",
      primary: "#003cff",
      primaryHover: "#002bb8",
      primarySoft: "#dbeafe",
      sidebar: "#ffffff",
      topbar: "#ffffff",
      success: "#047857",
      danger: "#b91c1c",
      warning: "#92400e",
    },
  },
};

/* =========================================================
   STORAGE
========================================================= */

const STORAGE_KEY = "devsync-demo-theme";

function getInitialTheme() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored && THEMES[stored]) {
      return stored;
    }
  } catch {
    // Ignore storage errors.
  }

  return "light";
}

/* =========================================================
   NAVIGATION
========================================================= */

const NAVIGATION = [
  {
    name: "Dashboard",
    path: "/demo",
    icon: FaHome,
  },
  {
    name: "Projects",
    path: "/demo/project/devsync",
    icon: FaFolderOpen,
    badge: "12",
  },
  {
    name: "Tasks",
    path: "/demo/project/devsync/tasks",
    icon: FaTasks,
    badge: "8",
  },
  {
    name: "Developers",
    path: "/demo/project/devsync/team",
    icon: FaUsers,
    badge: "32",
  },
  {
    name: "Chat",
    path: "/demo/project/devsync/chat",
    icon: FaComments,
    badge: "3",
    badgeType: "danger",
  },
  {
    name: "Analytics",
    path: "/demo",
    icon: FaChartLine,
  },
  {
    name: "Files",
    path: "/demo/project/devsync/files",
    icon: FaFolderOpen,
  },
  {
    name: "Activity",
    path: "/demo/project/devsync/activity",
    icon: FaBolt,
  },
];

/* =========================================================
   MAIN LAYOUT
========================================================= */

function DemoLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const [theme, setTheme] = useState(getInitialTheme);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  /* =======================================================
     ACTIVE THEME
  ======================================================= */

  const activeTheme = useMemo(() => {
    return THEMES[theme] || THEMES.light;
  }, [theme]);

  /* =======================================================
     APPLY THEME
  ======================================================= */

  useEffect(() => {
    const root = document.documentElement;

    root.dataset.demoTheme = activeTheme.id;

    Object.entries(activeTheme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--demo-${key}`, value);
    });

    try {
      localStorage.setItem(STORAGE_KEY, activeTheme.id);
    } catch {
      // Ignore storage errors.
    }
  }, [activeTheme]);

  /* =======================================================
     CLOSE MOBILE SIDEBAR AFTER NAVIGATION
  ======================================================= */

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  /* =======================================================
     THEME CHANGE
  ======================================================= */

  const changeTheme = (themeId) => {
    if (!THEMES[themeId]) {
      return;
    }

    setTheme(themeId);
    setThemeOpen(false);
  };

  /* =======================================================
     ACTIVE NAVIGATION
  ======================================================= */

  const isNavigationActive = (item) => {
    if (item.name === "Dashboard") {
      return location.pathname === "/demo";
    }

    if (item.name === "Projects") {
      return location.pathname.startsWith("/demo/project/");
    }

    if (item.name === "Tasks") {
      return location.pathname.includes("/tasks");
    }

    if (item.name === "Developers") {
      return location.pathname.includes("/team");
    }

    if (item.name === "Chat") {
      return location.pathname.includes("/chat");
    }

    if (item.name === "Files") {
      return location.pathname.includes("/files");
    }

    if (item.name === "Activity") {
      return location.pathname.includes("/activity");
    }

    return false;
  };

  /* =======================================================
     SEARCH
  ======================================================= */

  const handleSearch = (value) => {
    const query = value.trim().toLowerCase();

    if (!query) {
      return;
    }

    if (query.includes("project")) {
      navigate("/demo/project/devsync");
      setSearchOpen(false);
      return;
    }

    if (query.includes("task")) {
      navigate("/demo/project/devsync/tasks");
      setSearchOpen(false);
      return;
    }

    if (
      query.includes("developer") ||
      query.includes("team")
    ) {
      navigate("/demo/project/devsync/team");
      setSearchOpen(false);
      return;
    }

    if (query.includes("chat")) {
      navigate("/demo/project/devsync/chat");
      setSearchOpen(false);
      return;
    }

    if (query.includes("file")) {
      navigate("/demo/project/devsync/files");
      setSearchOpen(false);
      return;
    }

    if (query.includes("activity")) {
      navigate("/demo/project/devsync/activity");
      setSearchOpen(false);
    }
  };

  /* =======================================================
     LOGO
  ======================================================= */

  const Logo = () => (
    <Link
      to="/demo"
      className="group flex items-center gap-3 no-underline"
    >
      <div
        className="
          flex h-11 w-11 shrink-0 items-center justify-center
          rounded-xl text-white
          shadow-lg
          transition-all duration-300
          group-hover:-translate-y-0.5
        "
        style={{
          background:
            "linear-gradient(135deg, var(--demo-primary), #6366f1)",
          boxShadow:
            "0 10px 30px color-mix(in srgb, var(--demo-primary) 25%, transparent)",
        }}
      >
        <FaCode />
      </div>

      <span
        className="text-[22px] font-black tracking-tight"
        style={{ color: "var(--demo-text)" }}
      >
        Dev
        <span style={{ color: "var(--demo-primary)" }}>
          Sync
        </span>
      </span>
    </Link>
  );

  /* =======================================================
     SIDEBAR
  ======================================================= */

  const Sidebar = ({ mobile = false }) => (
    <aside
      className={`
        ${mobile ? "flex" : "hidden lg:flex"}
        fixed left-0 top-0 z-[80]
        h-screen w-[264px]
        flex-col
        border-r
        transition-transform duration-300
      `}
      style={{
        background: "var(--demo-sidebar)",
        borderColor: "var(--demo-border)",
        transform:
          mobile && !sidebarOpen
            ? "translateX(-100%)"
            : "translateX(0)",
      }}
    >
      {/* Sidebar Header */}

      <div
        className="flex h-[88px] shrink-0 items-center border-b px-6"
        style={{
          borderColor: "var(--demo-border)",
        }}
      >
        <Logo />

        {mobile && (
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="ml-auto flex h-9 w-9 items-center justify-center rounded-lg transition"
            style={{
              color: "var(--demo-text-muted)",
              background: "var(--demo-surface-soft)",
            }}
            aria-label="Close navigation"
          >
            <FaTimes />
          </button>
        )}
      </div>

      {/* Demo Card */}

      <div className="px-4 pt-5">
        <div
          className="rounded-2xl border p-4"
          style={{
            background:
              "linear-gradient(135deg, var(--demo-primary-soft), transparent)",
            borderColor:
              "color-mix(in srgb, var(--demo-primary) 18%, var(--demo-border))",
          }}
        >
          <div
            className="flex items-center gap-2 text-sm font-bold"
            style={{ color: "var(--demo-primary)" }}
          >
            <FaRocket />

            <span>Interactive Demo</span>
          </div>

          <p
            className="mt-1 text-xs leading-5"
            style={{ color: "var(--demo-text-muted)" }}
          >
            Explore DevSync using realistic sample project data.
          </p>

          <div className="mt-3 flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: "var(--demo-success)" }}
            />

            <span
              className="text-[10px] font-bold"
              style={{ color: "var(--demo-text-soft)" }}
            >
              Safe demo environment
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}

      <nav className="mt-7 flex-1 overflow-y-auto px-4 pb-5">
        <p
          className="mb-3 px-3 text-[10px] font-black uppercase tracking-[0.2em]"
          style={{ color: "var(--demo-text-soft)" }}
        >
          Workspace
        </p>

        <div className="space-y-1">
          {NAVIGATION.map((item) => {
            const Icon = item.icon;
            const active = isNavigationActive(item);

            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.name === "Dashboard"}
                className="group flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold no-underline transition-all duration-200"
                style={{
                  color: active
                    ? "#ffffff"
                    : "var(--demo-text-muted)",
                  background: active
                    ? "linear-gradient(135deg, var(--demo-primary), color-mix(in srgb, var(--demo-primary) 75%, #6366f1))"
                    : "transparent",
                  boxShadow: active
                    ? "0 10px 24px color-mix(in srgb, var(--demo-primary) 18%, transparent)"
                    : "none",
                }}
              >
                <span
                  className="
                    flex h-8 w-8 shrink-0
                    items-center justify-center
                    rounded-lg
                    transition-transform duration-200
                    group-hover:scale-110
                  "
                  style={{
                    background: active
                      ? "rgba(255,255,255,0.14)"
                      : "var(--demo-surface-soft)",
                    color: active
                      ? "#ffffff"
                      : "var(--demo-text-muted)",
                  }}
                >
                  <Icon className="text-sm" />
                </span>

                <span className="flex-1">
                  {item.name}
                </span>

                {item.badge && (
                  <span
                    className="rounded-full px-2 py-0.5 text-[9px] font-black"
                    style={{
                      background: active
                        ? "rgba(255,255,255,0.16)"
                        : item.badgeType === "danger"
                          ? "color-mix(in srgb, var(--demo-danger) 14%, transparent)"
                          : "var(--demo-surface-soft)",
                      color: active
                        ? "#ffffff"
                        : item.badgeType === "danger"
                          ? "var(--demo-danger)"
                          : "var(--demo-text-soft)",
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* System */}

        <p
          className="mb-3 mt-8 px-3 text-[10px] font-black uppercase tracking-[0.2em]"
          style={{ color: "var(--demo-text-soft)" }}
        >
          System
        </p>

        <NavLink
          to="/demo/settings"
          className="group flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold no-underline transition-all"
          style={({ isActive }) => ({
            color: isActive
              ? "#ffffff"
              : "var(--demo-text-muted)",
            background: isActive
              ? "var(--demo-primary)"
              : "transparent",
          })}
        >
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg"
            style={{
              background: "var(--demo-surface-soft)",
            }}
          >
            <FaCog className="text-sm" />
          </span>

          <span>Settings</span>
        </NavLink>
      </nav>

      {/* Sidebar User */}

      <div
        className="shrink-0 border-t p-4"
        style={{
          borderColor: "var(--demo-border)",
        }}
      >
        <button
          type="button"
          onClick={() => {
            setProfileOpen((value) => !value);
            setThemeOpen(false);
            setNotificationsOpen(false);
          }}
          className="flex w-full items-center gap-3 rounded-xl p-2 text-left transition"
          style={{
            background: profileOpen
              ? "var(--demo-surface-soft)"
              : "transparent",
          }}
        >
          <div
            className="
              flex h-10 w-10 shrink-0
              items-center justify-center
              rounded-full
              font-black text-white
            "
            style={{
              background:
                "linear-gradient(135deg, var(--demo-primary), #6366f1)",
            }}
          >
            A
          </div>

          <div className="min-w-0 flex-1">
            <p
              className="truncate text-xs font-black"
              style={{ color: "var(--demo-text)" }}
            >
              Alex Morgan
            </p>

            <p
              className="truncate text-[10px]"
              style={{ color: "var(--demo-text-muted)" }}
            >
              Full Stack Developer
            </p>
          </div>

          <FaChevronDown
            className={`text-[10px] transition-transform ${
              profileOpen ? "rotate-180" : ""
            }`}
            style={{ color: "var(--demo-text-soft)" }}
          />
        </button>

        {profileOpen && (
          <div
            className="mt-2 overflow-hidden rounded-xl border p-1"
            style={{
              background: "var(--demo-surface)",
              borderColor: "var(--demo-border)",
              boxShadow:
                "0 20px 50px rgba(0,0,0,0.18)",
            }}
          >
            <button
              type="button"
              onClick={() => {
                setProfileOpen(false);
                navigate("/demo/profile");
              }}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs font-semibold transition"
              style={{
                color: "var(--demo-text-muted)",
              }}
            >
              <FaUserCircle />

              <span>My Profile</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setProfileOpen(false);
                navigate("/demo/settings");
              }}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs font-semibold transition"
              style={{
                color: "var(--demo-text-muted)",
              }}
            >
              <FaCog />

              <span>Settings</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );

  /* =======================================================
     TOPBAR
  ======================================================= */

  const Topbar = () => (
    <header
      className="
        fixed left-0 right-0 top-0 z-[60]
        h-[88px]
        border-b
        backdrop-blur-xl
        lg:left-[264px]
      "
      style={{
        background:
          "color-mix(in srgb, var(--demo-topbar) 92%, transparent)",
        borderColor: "var(--demo-border)",
      }}
    >
      <div className="flex h-full items-center gap-4 px-4 sm:px-6 lg:px-7">
        {/* Mobile menu */}

        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="
            flex h-10 w-10 shrink-0
            items-center justify-center
            rounded-xl
            lg:hidden
          "
          style={{
            background: "var(--demo-surface-soft)",
            color: "var(--demo-text)",
          }}
          aria-label="Open navigation"
        >
          <FaBars />
        </button>

        {/* Search */}

        <div className="relative flex-1 max-w-[420px]">
          <div
            className="
              flex h-12 items-center gap-3
              rounded-xl border px-4
            "
            style={{
              background: "var(--demo-surface-soft)",
              borderColor: "var(--demo-border)",
            }}
          >
            <FaSearch
              className="shrink-0 text-sm"
              style={{
                color: "var(--demo-text-soft)",
              }}
            />

            <input
              type="text"
              placeholder="Search projects, tasks..."
              onFocus={() => setSearchOpen(true)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSearch(event.currentTarget.value);
                }

                if (event.key === "Escape") {
                  setSearchOpen(false);
                  event.currentTarget.blur();
                }
              }}
              className="
                min-w-0 flex-1
                bg-transparent
                text-sm
                outline-none
                placeholder:opacity-70
              "
              style={{
                color: "var(--demo-text)",
              }}
            />
          </div>

          {searchOpen && (
            <div
              className="
                absolute left-0 right-0 top-[58px]
                rounded-2xl border p-2
              "
              style={{
                background: "var(--demo-surface)",
                borderColor: "var(--demo-border)",
                boxShadow:
                  "0 25px 60px rgba(0,0,0,0.16)",
              }}
            >
              <p
                className="px-3 py-2 text-[10px] font-black uppercase tracking-wider"
                style={{
                  color: "var(--demo-text-soft)",
                }}
              >
                Quick navigation
              </p>

              {[
                ["Projects", "/demo/project/devsync", FaFolderOpen],
                ["Tasks", "/demo/project/devsync/tasks", FaTasks],
                ["Team", "/demo/project/devsync/team", FaUsers],
                ["Chat", "/demo/project/devsync/chat", FaComments],
              ].map(([name, path, Icon]) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => {
                    navigate(path);
                    setSearchOpen(false);
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs font-semibold transition"
                  style={{
                    color: "var(--demo-text-muted)",
                  }}
                >
                  <Icon />

                  <span>{name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          {/* Theme */}

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setThemeOpen((value) => !value);
                setNotificationsOpen(false);
                setProfileOpen(false);
              }}
              className="
                flex h-11 items-center gap-2
                rounded-xl px-3
                text-sm font-semibold
              "
              style={{
                background: "var(--demo-surface-soft)",
                color: "var(--demo-text)",
              }}
            >
              {(() => {
                const ThemeIcon = activeTheme.icon;

                return (
                  <ThemeIcon
                    className="text-sm"
                    style={{
                      color: "var(--demo-primary)",
                    }}
                  />
                );
              })()}

              <span className="hidden sm:inline">
                {activeTheme.name}
              </span>

              <FaChevronDown
                className={`hidden text-[9px] transition-transform sm:block ${
                  themeOpen ? "rotate-180" : ""
                }`}
                style={{
                  color: "var(--demo-text-soft)",
                }}
              />
            </button>

            {themeOpen && (
              <div
                className="
                  absolute right-0 top-[54px]
                  w-56 rounded-2xl border p-2
                "
                style={{
                  background: "var(--demo-surface)",
                  borderColor: "var(--demo-border)",
                  boxShadow:
                    "0 25px 60px rgba(0,0,0,0.18)",
                }}
              >
                <p
                  className="px-3 py-2 text-[10px] font-black uppercase tracking-wider"
                  style={{
                    color: "var(--demo-text-soft)",
                  }}
                >
                  Appearance
                </p>

                {Object.values(THEMES).map((item) => {
                  const Icon = item.icon;
                  const selected = item.id === theme;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => changeTheme(item.id)}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition"
                      style={{
                        background: selected
                          ? "var(--demo-primary-soft)"
                          : "transparent",
                        color: selected
                          ? "var(--demo-primary)"
                          : "var(--demo-text-muted)",
                      }}
                    >
                      <span
                        className="flex h-8 w-8 items-center justify-center rounded-lg"
                        style={{
                          background: selected
                            ? "var(--demo-primary)"
                            : "var(--demo-surface-soft)",
                          color: selected
                            ? "#ffffff"
                            : "var(--demo-text-muted)",
                        }}
                      >
                        <Icon className="text-xs" />
                      </span>

                      <span className="flex-1 text-xs font-bold">
                        {item.name}
                      </span>

                      {selected && (
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{
                            background:
                              "var(--demo-primary)",
                          }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Demo Mode */}

          <span
            className="
              hidden rounded-full
              border px-3 py-2
              text-[9px] font-black tracking-wider
              sm:inline-flex
            "
            style={{
              color: "var(--demo-primary)",
              background: "var(--demo-primary-soft)",
              borderColor:
                "color-mix(in srgb, var(--demo-primary) 18%, var(--demo-border))",
            }}
          >
            DEMO MODE
          </span>

          {/* Notifications */}

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setNotificationsOpen(
                  (value) => !value,
                );
                setThemeOpen(false);
                setProfileOpen(false);
              }}
              className="
                relative flex h-10 w-10
                items-center justify-center
                rounded-xl
              "
              style={{
                color: "var(--demo-text-muted)",
              }}
              aria-label="Notifications"
            >
              <FaBell />

              <span
                className="
                  absolute right-2 top-2
                  h-2 w-2 rounded-full
                "
                style={{
                  background: "var(--demo-danger)",
                }}
              />
            </button>

            {notificationsOpen && (
              <div
                className="
                  absolute right-0 top-[52px]
                  w-[310px]
                  rounded-2xl border
                  p-3
                "
                style={{
                  background: "var(--demo-surface)",
                  borderColor: "var(--demo-border)",
                  boxShadow:
                    "0 25px 60px rgba(0,0,0,0.18)",
                }}
              >
                <div className="flex items-center justify-between px-2 py-2">
                  <h3
                    className="text-sm font-black"
                    style={{
                      color: "var(--demo-text)",
                    }}
                  >
                    Notifications
                  </h3>

                  <span
                    className="text-[10px] font-bold"
                    style={{
                      color: "var(--demo-primary)",
                    }}
                  >
                    3 new
                  </span>
                </div>

                {[
                  "Priya updated Dashboard UI",
                  "Rahul joined DevSync",
                  "New task assigned to you",
                ].map((notification) => (
                  <div
                    key={notification}
                    className="rounded-xl px-3 py-3"
                    style={{
                      background:
                        "var(--demo-surface-soft)",
                    }}
                  >
                    <p
                      className="text-xs font-semibold"
                      style={{
                        color: "var(--demo-text)",
                      }}
                    >
                      {notification}
                    </p>

                    <p
                      className="mt-1 text-[10px]"
                      style={{
                        color: "var(--demo-text-soft)",
                      }}
                    >
                      Demo notification
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Profile */}

          <button
            type="button"
            onClick={() => {
              setProfileOpen((value) => !value);
              setThemeOpen(false);
              setNotificationsOpen(false);
            }}
            className="
              flex items-center gap-2
              rounded-xl p-1
            "
          >
            <div
              className="
                flex h-10 w-10
                items-center justify-center
                rounded-full
                font-black text-white
              "
              style={{
                background:
                  "linear-gradient(135deg, var(--demo-primary), #6366f1)",
              }}
            >
              A
            </div>

            <div className="hidden text-left md:block">
              <p
                className="text-xs font-black"
                style={{
                  color: "var(--demo-text)",
                }}
              >
                Alex Morgan
              </p>

              <p
                className="text-[10px]"
                style={{
                  color: "var(--demo-text-muted)",
                }}
              >
                Developer
              </p>
            </div>

            <FaChevronDown
              className={`hidden text-[9px] transition-transform md:block ${
                profileOpen ? "rotate-180" : ""
              }`}
              style={{
                color: "var(--demo-text-soft)",
              }}
            />
          </button>
        </div>
      </div>
    </header>
  );

  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{
        background: "var(--demo-page)",
        color: "var(--demo-text)",
      }}
      onClick={() => {
        if (searchOpen) {
          setSearchOpen(false);
        }
      }}
    >
      {/* Desktop sidebar */}

      <Sidebar />

      {/* Mobile sidebar */}

      <Sidebar mobile />

      {/* Mobile overlay */}

      {sidebarOpen && (
        <button
          type="button"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm lg:hidden"
          aria-label="Close navigation"
        />
      )}

      {/* Topbar */}

      <Topbar />

      {/* Main */}

      <main
        className="
          min-h-screen
          pt-[88px]
          transition-colors duration-300
          lg:ml-[264px]
        "
        style={{
          background: "var(--demo-page)",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}

export default DemoLayout;