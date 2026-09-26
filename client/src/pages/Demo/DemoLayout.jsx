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
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

/* =========================================================
   DEVSYNC THEME SYSTEM
   6 DISTINCT MODES
========================================================= */

const THEMES = {
  light: {
    id: "light",
    name: "Light",
    icon: FaSun,

    colors: {
      page: "#f7f9fc",
      surface: "#ffffff",
      surfaceSoft: "#f2f5f9",
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
      page: "#09090b",
      surface: "#111113",
      surfaceSoft: "#18181b",
      border: "rgba(255,255,255,0.10)",
      text: "#f8fafc",
      textMuted: "#cbd5e1",
      textSoft: "#94a3b8",

      primary: "#6366f1",
      primaryHover: "#818cf8",
      primarySoft: "#1e1b4b",

      sidebar: "#0b0b10",
      topbar: "#0b0b10",

      success: "#22c55e",
      danger: "#f87171",
      warning: "#f59e0b",
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
      border: "rgba(56,189,248,0.16)",
      text: "#f8fbff",
      textMuted: "#c7d8ee",
      textSoft: "#8da7c9",

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
      page: "#03030a",
      surface: "#080816",
      surfaceSoft: "#10102a",
      border: "rgba(0,245,255,0.18)",
      text: "#f5ffff",
      textMuted: "#c9faff",
      textSoft: "#82b9c2",

      primary: "#00f5ff",
      primaryHover: "#67f9ff",
      primarySoft: "#082f35",

      sidebar: "#04040d",
      topbar: "#04040d",

      success: "#2dd4bf",
      danger: "#fb7185",
      warning: "#facc15",
    },
  },

  cyberpunk: {
    id: "cyberpunk",
    name: "Cyberpunk",
    icon: FaBolt,

    colors: {
      page: "#07070b",
      surface: "#101016",
      surfaceSoft: "#171720",
      border: "rgba(255,43,214,0.25)",
      text: "#fff7ff",
      textMuted: "#f4dff1",
      textSoft: "#bca9bb",

      primary: "#ff2bd6",
      primaryHover: "#ff63e6",
      primarySoft: "#3a0d31",

      sidebar: "#09090e",
      topbar: "#09090e",

      success: "#00f5a0",
      danger: "#ff4d6d",
      warning: "#ffe600",
    },
  },

  highContrast: {
    id: "highContrast",
    name: "High Contrast",
    icon: FaSun,

    colors: {
      page: "#000000",
      surface: "#000000",
      surfaceSoft: "#111111",
      border: "#ffffff",
      text: "#ffffff",
      textMuted: "#ffffff",
      textSoft: "#eeeeee",

      primary: "#ffff00",
      primaryHover: "#ffffff",
      primarySoft: "#111111",

      sidebar: "#000000",
      topbar: "#000000",

      success: "#00ff66",
      danger: "#ff4d4d",
      warning: "#ffff00",
    },
  },
};

/* =========================================================
   STORAGE
========================================================= */

const STORAGE_KEY = "devsync-demo-theme";

function getInitialTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved && THEMES[saved]) {
      return saved;
    }
  } catch {
    // Ignore localStorage errors.
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
     APPLY GLOBAL THEME
  ======================================================= */

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    /*
      IMPORTANT:
      index.css uses html[data-theme="..."]
      so BOTH attributes are updated.
    */

    root.dataset.theme = activeTheme.id;
    root.dataset.demoTheme = activeTheme.id;

    Object.entries(activeTheme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--demo-${key}`, value);
    });

    body.style.background = "var(--ds-bg)";
    body.style.color = "var(--ds-text)";

    try {
      localStorage.setItem(STORAGE_KEY, activeTheme.id);
    } catch {
      // Ignore storage errors.
    }
  }, [activeTheme]);

  /* =======================================================
     CLOSE MOBILE SIDEBAR ON NAVIGATION
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
    const path = location.pathname;

    if (item.name === "Dashboard") {
      return path === "/demo";
    }

    if (item.name === "Projects") {
      return path.startsWith("/demo/project/");
    }

    if (item.name === "Tasks") {
      return path.includes("/tasks");
    }

    if (item.name === "Developers") {
      return path.includes("/team");
    }

    if (item.name === "Chat") {
      return path.includes("/chat");
    }

    if (item.name === "Files") {
      return path.includes("/files");
    }

    if (item.name === "Activity") {
      return path.includes("/activity");
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

    const routes = [
      ["project", "/demo/project/devsync"],
      ["task", "/demo/project/devsync/tasks"],
      ["developer", "/demo/project/devsync/team"],
      ["team", "/demo/project/devsync/team"],
      ["chat", "/demo/project/devsync/chat"],
      ["file", "/demo/project/devsync/files"],
      ["activity", "/demo/project/devsync/activity"],
    ];

    const match = routes.find(([key]) => query.includes(key));

    if (match) {
      navigate(match[1]);
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
          flex h-11 w-11 shrink-0
          items-center justify-center
          rounded-xl
          text-white
          shadow-lg
          transition-all duration-300
          group-hover:-translate-y-0.5
        "
        style={{
          background:
            "linear-gradient(135deg,var(--demo-primary),#6366f1)",
          boxShadow:
            "0 10px 30px color-mix(in srgb,var(--demo-primary) 28%,transparent)",
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
        transition-all duration-300
      `}
      style={{
        background: "var(--demo-sidebar)",
        borderColor: "var(--demo-border)",
        transform:
          mobile && !sidebarOpen
            ? "translateX(-100%)"
            : "translateX(0)",
        boxShadow:
          theme === "neon"
            ? "10px 0 50px rgba(0,245,255,.05)"
            : theme === "cyberpunk"
              ? "10px 0 50px rgba(255,43,214,.06)"
              : "none",
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
            className="ml-auto flex h-9 w-9 items-center justify-center rounded-lg"
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
              "linear-gradient(135deg,var(--demo-primary-soft),transparent)",
            borderColor:
              "color-mix(in srgb,var(--demo-primary) 22%,var(--demo-border))",
            boxShadow:
              theme === "neon"
                ? "0 0 25px rgba(0,245,255,.05)"
                : theme === "cyberpunk"
                  ? "0 0 25px rgba(255,43,214,.05)"
                  : "none",
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
              style={{
                background: "var(--demo-success)",
                boxShadow:
                  theme === "neon" || theme === "cyberpunk"
                    ? "0 0 10px var(--demo-success)"
                    : "none",
              }}
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
                className="
                  group flex w-full items-center gap-3
                  rounded-xl px-3.5 py-3
                  text-sm font-semibold
                  no-underline
                  transition-all duration-200
                "
                style={{
                  color: active
                    ? "#ffffff"
                    : "var(--demo-text-muted)",

                  background: active
                    ? "linear-gradient(135deg,var(--demo-primary),color-mix(in srgb,var(--demo-primary) 70%,#6366f1))"
                    : "transparent",

                  boxShadow: active
                    ? "0 10px 28px color-mix(in srgb,var(--demo-primary) 22%,transparent)"
                    : "none",

                  borderRadius:
                    theme === "cyberpunk"
                      ? "8px"
                      : theme === "highContrast"
                        ? "6px"
                        : undefined,
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
                      ? "rgba(255,255,255,.14)"
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
                        ? "rgba(255,255,255,.16)"
                        : item.badgeType === "danger"
                          ? "color-mix(in srgb,var(--demo-danger) 14%,transparent)"
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
          className="
            group flex items-center gap-3
            rounded-xl px-3.5 py-3
            text-sm font-semibold
            no-underline
          "
          style={({ isActive }) => ({
            color: isActive
              ? "#ffffff"
              : "var(--demo-text-muted)",

            background: isActive
              ? "var(--demo-primary)"
              : "transparent",

            boxShadow: isActive
              ? "0 10px 25px color-mix(in srgb,var(--demo-primary) 20%,transparent)"
              : "none",
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
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-black text-white"
            style={{
              background:
                "linear-gradient(135deg,var(--demo-primary),#6366f1)",
              boxShadow:
                theme === "neon" || theme === "cyberpunk"
                  ? "0 0 20px color-mix(in srgb,var(--demo-primary) 30%,transparent)"
                  : "none",
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
              boxShadow: "0 20px 50px rgba(0,0,0,.20)",
            }}
          >
            <button
              type="button"
              onClick={() => {
                setProfileOpen(false);
                navigate("/demo/profile");
              }}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs font-semibold transition hover:opacity-80"
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
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs font-semibold transition hover:opacity-80"
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
          "color-mix(in srgb,var(--demo-topbar) 92%,transparent)",
        borderColor: "var(--demo-border)",
        boxShadow:
          theme === "neon"
            ? "0 4px 30px rgba(0,245,255,.04)"
            : theme === "cyberpunk"
              ? "0 4px 30px rgba(255,43,214,.04)"
              : "none",
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
              className="min-w-0 flex-1 bg-transparent text-sm outline-none"
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
                boxShadow: "0 25px 60px rgba(0,0,0,.20)",
              }}
              onClick={(event) => event.stopPropagation()}
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
                  className="
                    flex w-full items-center gap-3
                    rounded-xl px-3 py-2.5
                    text-left text-xs font-semibold
                    transition
                  "
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
          {/* Theme selector */}

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
                border:
                  theme === "highContrast"
                    ? "2px solid var(--demo-border)"
                    : undefined,
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
                  w-60 rounded-2xl border p-2
                "
                style={{
                  background: "var(--demo-surface)",
                  borderColor: "var(--demo-border)",
                  boxShadow: "0 25px 60px rgba(0,0,0,.22)",
                }}
                onClick={(event) => event.stopPropagation()}
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
                      className="
                        flex w-full items-center gap-3
                        rounded-xl px-3 py-2.5
                        text-left transition
                      "
                      style={{
                        background: selected
                          ? "var(--demo-primary-soft)"
                          : "transparent",

                        color: selected
                          ? "var(--demo-primary)"
                          : "var(--demo-text-muted)",

                        border:
                          theme === "highContrast" && selected
                            ? "2px solid var(--demo-primary)"
                            : "1px solid transparent",
                      }}
                    >
                      <span
                        className="flex h-8 w-8 items-center justify-center rounded-lg"
                        style={{
                          background: selected
                            ? "var(--demo-primary)"
                            : "var(--demo-surface-soft)",

                          color: selected
                            ? theme === "highContrast"
                              ? "#000"
                              : "#fff"
                            : "var(--demo-text-muted)",

                          boxShadow:
                            selected &&
                            (theme === "neon" ||
                              theme === "cyberpunk")
                              ? "0 0 15px color-mix(in srgb,var(--demo-primary) 35%,transparent)"
                              : "none",
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
                            boxShadow:
                              theme === "neon" ||
                              theme === "cyberpunk"
                                ? "0 0 8px var(--demo-primary)"
                                : "none",
                          }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Demo badge */}

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
                "color-mix(in srgb,var(--demo-primary) 18%,var(--demo-border))",

              boxShadow:
                theme === "neon"
                  ? "0 0 15px rgba(0,245,255,.10)"
                  : theme === "cyberpunk"
                    ? "0 0 15px rgba(255,43,214,.10)"
                    : "none",
            }}
          >
            DEMO MODE
          </span>

          {/* Notifications */}

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setNotificationsOpen((value) => !value);
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
                  boxShadow:
                    theme === "neon" ||
                    theme === "cyberpunk"
                      ? "0 0 8px var(--demo-danger)"
                      : "none",
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
                  boxShadow: "0 25px 60px rgba(0,0,0,.22)",
                }}
                onClick={(event) => event.stopPropagation()}
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

                <div className="space-y-2">
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
            className="flex items-center gap-2 rounded-xl p-1"
          >
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full font-black text-white"
              style={{
                background:
                  "linear-gradient(135deg,var(--demo-primary),#6366f1)",

                boxShadow:
                  theme === "neon" ||
                  theme === "cyberpunk"
                    ? "0 0 20px color-mix(in srgb,var(--demo-primary) 30%,transparent)"
                    : "none",
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

        /*
          Theme-specific atmosphere.
        */
        backgroundImage:
          theme === "neon"
            ? `
              radial-gradient(
                circle at 5% 5%,
                rgba(0,245,255,.08),
                transparent 22%
              ),
              radial-gradient(
                circle at 95% 20%,
                rgba(255,0,229,.08),
                transparent 24%
              )
            `
            : theme === "cyberpunk"
              ? `
                linear-gradient(
                  180deg,
                  rgba(255,43,214,.04),
                  transparent 20%
                ),
                radial-gradient(
                  circle at 85% 10%,
                  rgba(255,230,0,.05),
                  transparent 20%
                )
              `
              : theme === "midnight"
                ? `
                  radial-gradient(
                    circle at 0% 0%,
                    rgba(56,189,248,.08),
                    transparent 25%
                  ),
                  radial-gradient(
                    circle at 100% 20%,
                    rgba(129,140,248,.06),
                    transparent 28%
                  )
                `
                : undefined,
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
          className="
            fixed inset-0 z-[70]
            bg-black/40
            backdrop-blur-sm
            lg:hidden
          "
          aria-label="Close navigation"
        />
      )}

      {/* Topbar */}

      <Topbar />

      {/* Main content */}

      <main
        className="
          min-h-screen
          pt-[88px]
          transition-colors duration-300
          lg:ml-[264px]
        "
        style={{
          background: "transparent",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}

export default DemoLayout;
