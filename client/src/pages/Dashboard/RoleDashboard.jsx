import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaBell,
  FaCode,
  FaCog,
  FaFileAlt,
  FaFolderOpen,
  FaGraduationCap,
  FaHome,
  FaProjectDiagram,
  FaSignOutAlt,
  FaTasks,
  FaUserTie,
  FaUsers,
  FaComments,
  FaChartLine,
  FaCheckCircle,
} from "react-icons/fa";

const ROLE_CONFIG = {
  student: {
    title: "Student Workspace",
    subtitle: "Build projects. Work together. Track your progress.",
    icon: FaGraduationCap,
    accent: "blue",

    nav: [
      { label: "Overview", icon: FaHome, path: null },
      { label: "My Teams", icon: FaUsers, path: "/teams" },
      { label: "Projects", icon: FaProjectDiagram, path: "/projects" },
      { label: "Tasks", icon: FaTasks, path: "/tasks" },
      { label: "Files", icon: FaFolderOpen, path: "/files" },
      { label: "Chat", icon: FaComments, path: "/chat" },
    ],

    stats: [
      { label: "Projects", value: "0", icon: FaProjectDiagram },
      { label: "Teams", value: "0", icon: FaUsers },
      { label: "Tasks", value: "0", icon: FaTasks },
      { label: "Progress", value: "0%", icon: FaChartLine },
    ],

    actions: [
      {
        title: "Create project",
        text: "Start a new academic project workspace.",
        icon: FaProjectDiagram,
        path: "/projects",
      },
      {
        title: "Join a team",
        text: "Find and collaborate with your project team.",
        icon: FaUsers,
        path: "/teams",
      },
      {
        title: "View tasks",
        text: "Check your pending and completed work.",
        icon: FaTasks,
        path: "/tasks",
      },
    ],
  },

  developer: {
    title: "Developer Workspace",
    subtitle: "Build, collaborate and ship software.",
    icon: FaCode,
    accent: "cyan",

    nav: [
      { label: "Overview", icon: FaHome, path: null },
      { label: "Projects", icon: FaProjectDiagram, path: "/projects" },
      {
        label: "Code Workspace",
        icon: FaCode,
        path: "/demo/workspace",
      },
      { label: "Tasks", icon: FaTasks, path: "/tasks" },
      { label: "Files", icon: FaFolderOpen, path: "/files" },
      { label: "Chat", icon: FaComments, path: "/chat" },
    ],

    stats: [
      { label: "Projects", value: "0", icon: FaProjectDiagram },
      { label: "Repositories", value: "0", icon: FaCode },
      { label: "Tasks", value: "0", icon: FaTasks },
      { label: "Files", value: "0", icon: FaFolderOpen },
    ],

    actions: [
      {
        title: "Open Code Workspace",
        text: "Start coding in the DevSync development environment.",
        icon: FaCode,
        path: "/demo/workspace",
      },
      {
        title: "View projects",
        text: "Open your software projects and repositories.",
        icon: FaProjectDiagram,
        path: "/projects",
      },
      {
        title: "View tasks",
        text: "Manage development tasks and issues.",
        icon: FaTasks,
        path: "/tasks",
      },
    ],
  },

  mentor: {
    title: "Mentor Workspace",
    subtitle: "Guide teams. Review progress. Make an impact.",
    icon: FaUserTie,
    accent: "purple",

    nav: [
      { label: "Overview", icon: FaHome, path: null },
      { label: "Teams", icon: FaUsers, path: "/teams" },
      { label: "Projects", icon: FaProjectDiagram, path: "/projects" },
      { label: "Tasks", icon: FaTasks, path: "/tasks" },
      { label: "Progress", icon: FaChartLine, path: "/analytics" },
      { label: "Reports", icon: FaFileAlt, path: "/analytics" },
    ],

    stats: [
      { label: "Teams", value: "0", icon: FaUsers },
      { label: "Projects", value: "0", icon: FaProjectDiagram },
      { label: "Reviews", value: "0", icon: FaCheckCircle },
      { label: "Progress", value: "0%", icon: FaChartLine },
    ],

    actions: [
      {
        title: "Review projects",
        text: "Monitor projects assigned to your teams.",
        icon: FaProjectDiagram,
        path: "/projects",
      },
      {
        title: "View teams",
        text: "Check team members and collaboration.",
        icon: FaUsers,
        path: "/teams",
      },
      {
        title: "View progress",
        text: "Analyze project and team progress.",
        icon: FaChartLine,
        path: "/analytics",
      },
    ],
  },

  client: {
    title: "Client Workspace",
    subtitle: "Stay informed at every milestone.",
    icon: FaUsers,
    accent: "emerald",

    nav: [
      { label: "Overview", icon: FaHome, path: null },
      { label: "Projects", icon: FaProjectDiagram, path: "/projects" },
      { label: "Milestones", icon: FaCheckCircle, path: "/projects" },
      { label: "Deliverables", icon: FaFolderOpen, path: "/files" },
      { label: "Reports", icon: FaChartLine, path: "/analytics" },
      { label: "Updates", icon: FaComments, path: "/chat" },
    ],

    stats: [
      { label: "Projects", value: "0", icon: FaProjectDiagram },
      { label: "Milestones", value: "0", icon: FaCheckCircle },
      { label: "Deliverables", value: "0", icon: FaFolderOpen },
      { label: "Progress", value: "0%", icon: FaChartLine },
    ],

    actions: [
      {
        title: "View projects",
        text: "Track your active projects and progress.",
        icon: FaProjectDiagram,
        path: "/projects",
      },
      {
        title: "View deliverables",
        text: "Review project files and deliverables.",
        icon: FaFolderOpen,
        path: "/files",
      },
      {
        title: "View reports",
        text: "See project progress and analytics.",
        icon: FaChartLine,
        path: "/analytics",
      },
    ],
  },
};

const accentStyles = {
  blue: {
    text: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    hover: "hover:border-blue-500/40",
  },
  cyan: {
    text: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    hover: "hover:border-cyan-500/40",
  },
  purple: {
    text: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    hover: "hover:border-purple-500/40",
  },
  emerald: {
    text: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    hover: "hover:border-emerald-500/40",
  },
};

export default function RoleDashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  const roleFromPath = location.pathname.split("/").pop();

  const role = ROLE_CONFIG[roleFromPath]
    ? roleFromPath
    : "student";

  const config = ROLE_CONFIG[role];
  const styles = accentStyles[config.accent];
  const RoleIcon = config.icon;

  const storedUser = useMemo(() => {
    try {
      return JSON.parse(
        localStorage.getItem("user") ||
          localStorage.getItem("devsync_user") ||
          "null"
      );
    } catch {
      return null;
    }
  }, []);

  const email =
    storedUser?.email ||
    "demo@devsync.local";

  const displayName =
    email.split("@")[0] || "Developer";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("devsync_user");

    navigate("/login", { replace: true });
  };

  const handleNavigation = (path) => {
    if (!path) return;

    navigate(path);
  };

  return (
    <div className="flex min-h-screen bg-[#05070a] text-white">

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside className="hidden w-64 shrink-0 border-r border-slate-800/80 bg-[#080b0f] md:flex md:flex-col">

        {/* LOGO */}

        <div className="flex h-16 items-center gap-3 border-b border-slate-800/80 px-5">

          <div
            className={`flex h-9 w-9 items-center justify-center rounded-lg ${styles.bg}`}
          >
            <RoleIcon
              className={`text-sm ${styles.text}`}
            />
          </div>

          <div>
            <p className="text-sm font-black">
              DevSync
            </p>

            <p className="text-[9px] uppercase tracking-widest text-slate-600">
              Workspace
            </p>
          </div>
        </div>

        {/* USER */}

        <div className="border-b border-slate-800/80 p-4">

          <p
            className={`text-[9px] font-bold uppercase tracking-widest ${styles.text}`}
          >
            {role}
          </p>

          <p className="mt-1 truncate text-xs text-slate-500">
            {email}
          </p>
        </div>

        {/* NAVIGATION */}

        <nav className="flex-1 space-y-1 overflow-y-auto p-3">

          {config.nav.map((item) => {

            const ItemIcon = item.icon;

            const active =
              item.path === null &&
              location.pathname ===
                `/dashboard/${role}`;

            return (
              <button
                key={item.label}
                type="button"
                onClick={() =>
                  handleNavigation(item.path)
                }
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs font-semibold transition ${
                  active
                    ? `${styles.bg} ${styles.text}`
                    : "text-slate-500 hover:bg-slate-900 hover:text-slate-200"
                }`}
              >
                <ItemIcon className="shrink-0 text-xs" />

                <span>
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* BOTTOM */}

        <div className="border-t border-slate-800/80 p-3">

          <button
            type="button"
            onClick={() => navigate("/settings")}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-xs text-slate-500 transition hover:bg-slate-900 hover:text-white"
          >
            <FaCog />
            Settings
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-xs text-red-400 transition hover:bg-red-500/10"
          >
            <FaSignOutAlt />
            Sign out
          </button>

        </div>
      </aside>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="min-w-0 flex-1">

        {/* TOPBAR */}

        <header className="flex h-16 items-center justify-between border-b border-slate-800/80 bg-[#080b0f] px-5 md:px-8">

          <div>

            <p className="text-[9px] font-bold uppercase tracking-widest text-slate-600">
              DevSync
            </p>

            <h1 className="text-sm font-black">
              {config.title}
            </h1>

          </div>

          <div className="flex items-center gap-3">

            <span className="hidden text-xs text-slate-500 sm:block">
              {displayName}
            </span>

            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-900 hover:text-white"
              title="Notifications"
            >
              <FaBell className="text-xs" />
            </button>

          </div>
        </header>

        {/* CONTENT */}

        <div className="p-5 md:p-8">

          {/* WELCOME */}

          <div className="mb-8">

            <p
              className={`text-xs font-bold uppercase tracking-widest ${styles.text}`}
            >
              {role} workspace
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-tight">
              Welcome back, {displayName}
            </h2>

            <p className="mt-2 max-w-2xl text-sm text-slate-500">
              {config.subtitle}
            </p>

          </div>

          {/* =================================================
              STATS
          ================================================= */}

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

            {config.stats.map((stat) => {

              const StatIcon = stat.icon;

              return (
                <StatCard
                  key={stat.label}
                  icon={<StatIcon />}
                  label={stat.label}
                  value={stat.value}
                  styles={styles}
                />
              );
            })}

          </div>

          {/* =================================================
              ROLE PANEL
          ================================================= */}

          <div
            className={`mt-6 rounded-2xl border ${styles.border} ${styles.bg} p-6`}
          >

            <div className="flex items-start gap-4">

              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${styles.bg}`}
              >
                <RoleIcon
                  className={styles.text}
                />
              </div>

              <div>

                <p
                  className={`text-[9px] font-bold uppercase tracking-widest ${styles.text}`}
                >
                  {config.title}
                </p>

                <h3 className="mt-1 text-sm font-black">
                  Your workspace is ready
                </h3>

                <p className="mt-2 max-w-2xl text-xs leading-6 text-slate-500">
                  Use the navigation to access your
                  projects, teams, tasks and other
                  DevSync features. Role-specific
                  functionality will be connected to
                  the backend as we build the platform.
                </p>

              </div>
            </div>
          </div>

          {/* =================================================
              QUICK ACTIONS
          ================================================= */}

          <div className="mt-8">

            <div className="mb-3 flex items-center justify-between">

              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Quick actions
              </h3>

              <span className="text-[9px] text-slate-700">
                {config.title}
              </span>

            </div>

            <div className="grid gap-3 md:grid-cols-3">

              {config.actions.map((action) => {

                const ActionIcon = action.icon;

                return (
                  <QuickAction
                    key={action.title}
                    icon={<ActionIcon />}
                    title={action.title}
                    text={action.text}
                    styles={styles}
                    onClick={() =>
                      handleNavigation(action.path)
                    }
                  />
                );
              })}

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  styles,
}) {
  return (
    <div
      className={`rounded-xl border border-slate-800/80 bg-[#080b0f] p-5 transition ${styles.hover}`}
    >

      <div
        className={`mb-4 flex h-9 w-9 items-center justify-center rounded-lg ${styles.bg} ${styles.text}`}
      >
        {icon}
      </div>

      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600">
        {label}
      </p>

      <p className="mt-1 text-2xl font-black">
        {value}
      </p>

    </div>
  );
}

function QuickAction({
  icon,
  title,
  text,
  styles,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group rounded-xl border border-slate-800/80 bg-[#080b0f] p-4 text-left transition hover:-translate-y-0.5 ${styles.hover}`}
    >

      <div
        className={`mb-3 ${styles.text} transition group-hover:scale-105`}
      >
        {icon}
      </div>

      <p className="text-xs font-bold text-slate-200">
        {title}
      </p>

      <p className="mt-1 text-[10px] leading-5 text-slate-600">
        {text}
      </p>

    </button>
  );
}