import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import {
  FaBell,
  FaBolt,
  FaCheckCircle,
  FaChevronDown,
  FaCode,
  FaCog,
  FaComments,
  FaFolderOpen,
  FaGithub,
  FaHome,
  FaPlus,
  FaSearch,
  FaTasks,
  FaUsers,
  FaChartLine,
  FaRocket,
  FaArrowUp,
  FaArrowRight,
  FaArrowLeft,
  FaEllipsisH,
} from "react-icons/fa";

/* =========================================================
   SAMPLE DATA
========================================================= */

const projects = [
  {
    name: "DevSync",
    description: "Developer collaboration platform",
    technologies: ["React", "Node.js", "MongoDB"],
    progress: 82,
    members: 8,
    status: "Active",
  },
  {
    name: "SkillTree",
    description: "Technical skill discovery platform",
    technologies: ["React", "Supabase", "REST API"],
    progress: 68,
    members: 5,
    status: "Active",
  },
  {
    name: "EcoLoop",
    description: "Smart waste exchange platform",
    technologies: ["MERN", "Maps API"],
    progress: 45,
    members: 6,
    status: "Planning",
  },
];

const activities = [
  {
    user: "Alex Morgan",
    action: "completed",
    target: "Authentication Module",
    time: "12 min ago",
    icon: <FaCheckCircle />,
  },
  {
    user: "Priya Sharma",
    action: "created",
    target: "Dashboard UI task",
    time: "35 min ago",
    icon: <FaPlus />,
  },
  {
    user: "Rahul Kumar",
    action: "joined",
    target: "DevSync project",
    time: "1 hour ago",
    icon: <FaUsers />,
  },
  {
    user: "Emma Wilson",
    action: "pushed changes to",
    target: "main branch",
    time: "2 hours ago",
    icon: <FaGithub />,
  },
];

const tasks = [
  {
    title: "Implement JWT Authentication",
    project: "DevSync",
    priority: "High",
    status: "In Progress",
  },
  {
    title: "Design Developer Profile",
    project: "SkillTree",
    priority: "Medium",
    status: "Review",
  },
  {
    title: "Create project API",
    project: "EcoLoop",
    priority: "High",
    status: "To Do",
  },
  {
    title: "Fix responsive navbar",
    project: "DevSync",
    priority: "Low",
    status: "Done",
  },
];

/* =========================================================
   MAIN DASHBOARD
========================================================= */

function DemoDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const [showSidebarProfile, setShowSidebarProfile] = useState(false);
  const [showTopProfile, setShowTopProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showThemes, setShowThemes] = useState(false);

  const { theme, changeTheme, themes } = useContext(ThemeContext);

  /* =======================================================
     ACTIVE SIDEBAR PAGE
  ======================================================= */

  const getActivePage = () => {
    const path = location.pathname;

    if (path.includes("/tasks")) return "Tasks";
    if (path.includes("/team")) return "Developers";
    if (path.includes("/chat")) return "Chat";
    if (path.includes("/files")) return "Files";
    if (path.includes("/activity")) return "Activity";
    if (path.includes("/analytics")) return "Analytics";
    if (path.includes("/settings")) return "Settings";
    if (path.includes("/demo/project")) return "Projects";

    return "Dashboard";
  };

  const activePage = getActivePage();

  /* =======================================================
     DEMO NAVIGATION
  ======================================================= */

  const goToDemoPage = (page) => {
    const routes = {
      Dashboard: "/demo",
      Projects: "/demo/project/devsync",
      Tasks: "/demo/project/devsync/tasks",
      Developers: "/demo/project/devsync/team",
      Chat: "/demo/project/devsync/chat",
      Files: "/demo/project/devsync/files",
      Activity: "/demo/project/devsync/activity",
      Profile: "/demo/profile",
      Settings: "/demo/settings",
    };

    if (routes[page]) {
      navigate(routes[page]);
      return;
    }

    /*
      These pages don't have dedicated routes yet.
      Keep the button functional without causing errors.
    */
    if (page === "Analytics") {
      navigate("/demo");
    }
  };

  /* =======================================================
     SIDEBAR NAVIGATION
  ======================================================= */

  const navigation = [
    {
      name: "Dashboard",
      icon: <FaHome />,
    },
    {
      name: "Projects",
      icon: <FaFolderOpen />,
    },
    {
      name: "Tasks",
      icon: <FaTasks />,
    },
    {
      name: "Developers",
      icon: <FaUsers />,
    },
    {
      name: "Chat",
      icon: <FaComments />,
    },
    {
      name: "Analytics",
      icon: <FaChartLine />,
    },
    {
      name: "Files",
      icon: <FaFolderOpen />,
    },
    {
      name: "Activity",
      icon: <FaBolt />,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col border-r border-slate-200 bg-white lg:flex">

        {/* LOGO */}

        <div className="flex h-20 shrink-0 items-center border-b border-slate-100 px-6">

          <Link
            to="/demo"
            className="group flex items-center gap-3"
          >

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-200 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-blue-300">
              <FaCode />
            </div>

            <span className="text-2xl font-black tracking-tight">
              Dev<span className="text-blue-600">Sync</span>
            </span>

          </Link>

        </div>

        {/* DEMO CARD */}

        <div className="mx-4 mt-5 shrink-0 rounded-2xl border border-blue-100 bg-blue-50 p-4">

          <div className="flex items-center gap-2 text-sm font-bold text-blue-700">
            <FaRocket />
            Interactive Demo
          </div>

          <p className="mt-1 text-xs leading-5 text-blue-600">
            Explore DevSync using sample project data.
          </p>

        </div>

        {/* NAVIGATION */}

        <nav className="mt-7 flex-1 overflow-y-auto px-4">

          <p className="mb-3 px-3 text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">
            Workspace
          </p>

          <div className="space-y-1">

            {navigation.map((item) => (

              <button
                key={item.name}
                onClick={() => goToDemoPage(item.name)}
                className={`group flex w-full items-center gap-4 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 ${
                  activePage === item.name
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >

                <span className="text-lg transition-transform duration-300 group-hover:scale-110">
                  {item.icon}
                </span>

                <span className="flex-1 text-left">
                  {item.name}
                </span>

                {item.name === "Projects" && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      activePage === "Projects"
                        ? "bg-white/20 text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    12
                  </span>
                )}

                {item.name === "Tasks" && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      activePage === "Tasks"
                        ? "bg-white/20 text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    8
                  </span>
                )}

                {item.name === "Developers" && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      activePage === "Developers"
                        ? "bg-white/20 text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    32
                  </span>
                )}

                {item.name === "Chat" && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      activePage === "Chat"
                        ? "bg-white/20 text-white"
                        : "bg-red-100 text-red-500"
                    }`}
                  >
                    3
                  </span>
                )}

              </button>

            ))}

          </div>

          {/* SYSTEM */}

          <p className="mb-3 mt-8 px-3 text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">
            System
          </p>

          <button
            onClick={() => goToDemoPage("Settings")}
            className={`group flex w-full items-center gap-4 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 ${
              activePage === "Settings"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >

            <span className="text-lg transition-transform duration-300 group-hover:scale-110">
              <FaCog />
            </span>

            <span className="flex-1 text-left">
              Settings
            </span>

          </button>

        </nav>

        {/* USER SECTION */}

        <div className="shrink-0 border-t border-slate-100 p-4">

          <button
            onClick={() => {
              setShowSidebarProfile(!showSidebarProfile);
              setShowTopProfile(false);
              setShowThemes(false);
              setShowNotifications(false);
            }}
            className="group flex w-full items-center gap-3 rounded-xl p-2 transition-all duration-300 hover:bg-slate-50"
          >

            {/* Avatar */}

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 font-bold text-white shadow-md">
              A
            </div>

            {/* User */}

            <div className="min-w-0 flex-1 text-left">

              <p className="truncate text-sm font-bold text-slate-800">
                Alex Morgan
              </p>

              <p className="truncate text-xs text-slate-500">
                Full Stack Developer
              </p>

            </div>

            <FaChevronDown
              className={`shrink-0 text-xs text-slate-400 transition-transform duration-300 ${
                showSidebarProfile ? "rotate-180" : ""
              }`}
            />

          </button>

          {/* PROFILE MENU */}

          {showSidebarProfile && (
            <div className="absolute bottom-20 left-4 z-50 w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-300/40">

              {/* PROFILE HEADER */}
              <div className="border-b border-slate-100 bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4">
                <div className="flex items-center gap-3">

                  <div className="relative">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-lg font-black text-white shadow-lg shadow-blue-200">
                      A
                    </div>

                    <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-black text-slate-900">
                      Alex Morgan
                    </p>

                    <p className="truncate text-xs text-slate-500">
                      Full Stack Developer
                    </p>

                    <div className="mt-1 flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <span className="text-[10px] font-bold text-emerald-600">
                        Online
                      </span>
                    </div>
                  </div>

                </div>
              </div>

              {/* MENU ITEMS */}
              <div className="p-2">

                <button
                  onClick={() => {
                    setShowSidebarProfile(false);
                    goToDemoPage("Profile");
                  }}
                  className="group flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-left transition-all duration-200 hover:bg-blue-50"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                    <FaUsers />
                  </span>

                  <span className="flex-1">
                    <span className="block text-sm font-bold text-slate-800">
                      My Profile
                    </span>
                    <span className="mt-0.5 block text-[11px] text-slate-400">
                      View your developer profile
                    </span>
                  </span>

                  <FaArrowRight className="text-xs text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600" />
                </button>

                <button
                  onClick={() => {
                    setShowSidebarProfile(false);
                    goToDemoPage("Settings");
                  }}
                  className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all duration-200 hover:bg-purple-50"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600 transition group-hover:bg-purple-600 group-hover:text-white">
                    <FaCog />
                  </span>

                  <span className="flex-1">
                    <span className="block text-sm font-bold text-slate-800">
                      Account Settings
                    </span>
                    <span className="mt-0.5 block text-[11px] text-slate-400">
                      Preferences & account controls
                    </span>
                  </span>

                  <FaArrowRight className="text-xs text-slate-300 transition group-hover:translate-x-1 group-hover:text-purple-600" />
                </button>

                <button
                  onClick={() => {
                    setShowSidebarProfile(false);
                    setShowTopProfile(false);
                    setShowThemes(false);
                    setShowNotifications(false);
                    navigate("/demo/workspace");
                  }}
                  className="group flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-left transition-all duration-200 hover:bg-cyan-50"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 transition group-hover:bg-cyan-600 group-hover:text-white">
                    <FaRocket />
                  </span>

                  <span className="flex-1">
                    <span className="block text-sm font-bold text-slate-800">
                      My Workspace
                    </span>
                    <span className="mt-0.5 block text-[11px] text-slate-400">
                      Return to your dashboard
                    </span>
                  </span>

                  <FaArrowRight className="text-xs text-slate-300 transition group-hover:translate-x-1 group-hover:text-cyan-600" />
                </button>

              </div>

              {/* EXIT */}
              <div className="border-t border-slate-100 p-2">
                <button
                  onClick={() => {
                    setShowSidebarProfile(false);
                    navigate("/");
                  }}
                  className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all duration-200 hover:bg-red-50"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500 transition group-hover:bg-red-500 group-hover:text-white">
                    <FaArrowLeft />
                  </span>

                  <span className="flex-1">
                    <span className="block text-sm font-bold text-red-500">
                      Exit Demo
                    </span>
                    <span className="mt-0.5 block text-[11px] text-slate-400">
                      Return to DevSync landing page
                    </span>
                  </span>
                </button>
              </div>

            </div>
          )}

        </div>

      </aside>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="lg:ml-64">

        {/* ===================================================
            TOPBAR
        =================================================== */}

        <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-5 backdrop-blur lg:px-8">

          {/* Mobile logo */}

          <div className="flex items-center gap-3 lg:hidden">

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
              <FaCode />
            </div>

            <span className="text-xl font-black">
              Dev<span className="text-blue-600">Sync</span>
            </span>

          </div>

          {/* Search */}

          <div className="relative hidden w-80 md:block">

            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400" />

            <input
              type="text"
              placeholder="Search projects, tasks..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
            />

          </div>

          <div className="flex items-center gap-3">

            {/* =================================================
                THEME SELECTOR
            ================================================= */}

            <div className="relative">

              <button
                onClick={() => {
                  setShowThemes(!showThemes);
                  setShowSidebarProfile(false);
                  setShowNotifications(false);
                }}
                className="flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
              >

                <span className="text-base">
                  {themes?.[theme]?.icon || "ðŸŽ¨"}
                </span>

                <span className="hidden lg:block">
                  Theme
                </span>

                <FaChevronDown
                  className={`text-xs transition-transform ${
                    showThemes ? "rotate-180" : ""
                  }`}
                />

              </button>

              {showThemes && (

                <div className="absolute right-0 top-14 z-50 w-80 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">

                  {/* HEADER */}

                  <div className="border-b border-slate-100 px-4 py-4">

                    <p className="text-sm font-black text-slate-900">
                      Appearance
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Choose your DevSync theme
                    </p>

                  </div>

                  {/* THEMES */}

                  <div className="max-h-[420px] overflow-y-auto p-2">

                    {Object.entries(themes || {}).map(
                      ([themeId, item]) => (

                        <button
                          key={themeId}
                          onClick={() => {
                            changeTheme(themeId);
                            setShowThemes(false);
                          }}
                          className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all ${
                            theme === themeId
                              ? "bg-blue-50 ring-1 ring-blue-200"
                              : "hover:bg-slate-50"
                          }`}
                        >

                          <span
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg ${
                              theme === themeId
                                ? "bg-blue-600 text-white shadow-md"
                                : "bg-slate-100"
                            }`}
                          >
                            {item.icon}
                          </span>

                          <span className="flex-1">

                            <span
                              className={`block text-sm font-bold ${
                                theme === themeId
                                  ? "text-blue-600"
                                  : "text-slate-800"
                              }`}
                            >
                              {item.name}
                            </span>

                            <span className="mt-0.5 block text-xs text-slate-400">
                              {item.description}
                            </span>

                          </span>

                          {theme === themeId && (
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                              âœ“
                            </span>
                          )}

                        </button>

                      )
                    )}

                  </div>

                  <div className="border-t border-slate-100 bg-slate-50 px-4 py-3">

                    <p className="text-[11px] text-slate-400">
                      Theme preference is saved automatically.
                    </p>

                  </div>

                </div>

              )}

            </div>

            {/* DEMO LABEL */}

            <span className="hidden rounded-full bg-blue-50 px-4 py-2 text-xs font-bold text-blue-600 sm:block">
              DEMO MODE
            </span>

            {/* =================================================
                NOTIFICATIONS
            ================================================= */}

            <div className="relative">

              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowThemes(false);
                  setShowSidebarProfile(false);
                }}
                className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              >

                <FaBell />

                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />

              </button>

              {showNotifications && (

                <div className="absolute right-0 top-14 w-80 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl">

                  <h3 className="font-bold">
                    Notifications
                  </h3>

                  <div className="mt-4 rounded-xl bg-slate-50 p-3 text-sm">

                    <p className="font-semibold">
                      Rahul joined DevSync
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      1 hour ago
                    </p>

                  </div>

                </div>

              )}

            </div>

            {/* =================================================
                PROFILE
            ================================================= */}

            <div className="relative">

              <button
                onClick={() => {
                  setShowTopProfile(!showTopProfile);
                  setShowSidebarProfile(false);
                  setShowThemes(false);
                  setShowNotifications(false);
                }}
                className="flex items-center gap-3 rounded-xl p-1.5 transition hover:bg-slate-100"
              >

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 font-bold text-white">
                  A
                </div>

                <div className="hidden text-left sm:block">

                  <p className="text-sm font-bold">
                    Alex Morgan
                  </p>

                  <p className="text-xs text-slate-500">
                    Developer
                  </p>

                </div>

                <FaChevronDown className="hidden text-xs text-slate-400 sm:block" />

              </button>

              {showTopProfile && (
                <div className="absolute right-0 top-14 z-50 w-80 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-300/50">

                  {/* PROFILE HEADER */}
                  <div className="border-b border-slate-100 bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4">
                    <div className="flex items-center gap-3">

                      <div className="relative">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-xl font-black text-white shadow-lg shadow-blue-200">
                          A
                        </div>

                        <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white bg-emerald-500" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="truncate text-base font-black text-slate-900">
                            Alex Morgan
                          </p>

                          <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-black text-emerald-600">
                            ONLINE
                          </span>
                        </div>

                        <p className="mt-1 text-xs font-medium text-slate-500">
                          Full Stack Developer
                        </p>

                        <p className="mt-1 text-[11px] text-slate-400">
                          Developer workspace
                        </p>
                      </div>

                    </div>
                  </div>

                  {/* MENU */}
                  <div className="p-2">

                    <button
                      onClick={() => {
                        setShowTopProfile(false);
                        setShowSidebarProfile(false);
                        setShowThemes(false);
                        setShowNotifications(false);
                        navigate("/demo/workspace");
                      }}
                      className="group flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-left transition-all duration-200 hover:bg-blue-50"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                        <FaHome />
                      </span>

                      <span className="flex-1">
                        <span className="block text-sm font-bold text-slate-800">
                          My Workspace
                        </span>

                        <span className="mt-0.5 block text-[11px] text-slate-400">
                          Return to your dashboard
                        </span>
                      </span>

                      <FaArrowRight className="text-xs text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600" />
                    </button>

                    <button
                      onClick={() => {
                        setShowTopProfile(false);
                        goToDemoPage("Settings");
                      }}
                      className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all duration-200 hover:bg-purple-50"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600 transition group-hover:bg-purple-600 group-hover:text-white">
                        <FaCog />
                      </span>

                      <span className="flex-1">
                        <span className="block text-sm font-bold text-slate-800">
                          Account Settings
                        </span>

                        <span className="mt-0.5 block text-[11px] text-slate-400">
                          Preferences & account controls
                        </span>
                      </span>

                      <FaArrowRight className="text-xs text-slate-300 transition group-hover:translate-x-1 group-hover:text-purple-600" />
                    </button>

                    <button
                      onClick={() => {
                        setShowTopProfile(false);
                        goToDemoPage("Profile");
                      }}
                      className="group flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-left transition-all duration-200 hover:bg-cyan-50"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 transition group-hover:bg-cyan-600 group-hover:text-white">
                        <FaUsers />
                      </span>

                      <span className="flex-1">
                        <span className="block text-sm font-bold text-slate-800">
                          My Profile
                        </span>

                        <span className="mt-0.5 block text-[11px] text-slate-400">
                          View your developer profile
                        </span>
                      </span>

                      <FaArrowRight className="text-xs text-slate-300 transition group-hover:translate-x-1 group-hover:text-cyan-600" />
                    </button>

                  </div>
                    {/* DEMO WORKSPACE */}
                    <button
                      onClick={() => {
                        setShowTopProfile(false);
                        setShowSidebarProfile(false);
                        setShowThemes(false);
                        setShowNotifications(false);
                        navigate("/demo/workspace");
                      }}
                      className="group mt-2 w-full rounded-xl border border-blue-200 bg-blue-50 p-3 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400 hover:bg-blue-100 hover:shadow-md"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-xs text-white shadow-md transition-transform duration-300 group-hover:scale-110">
                          <FaRocket />
                        </span>

                        <div className="min-w-0 flex-1">
                          <p className="text-[11px] font-black uppercase tracking-wide text-blue-700">
                            Demo Workspace
                          </p>

                          <p className="mt-1 text-[10px] text-blue-500">
                            Open a sample coding workspace
                          </p>
                        </div>

                        <FaArrowRight className="text-xs text-blue-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-blue-600" />
                      </div>
                    </button>

                  {/* EXIT DEMO */}
                  <div className="mt-2 border-t border-slate-100 p-2">
                    <button
                      onClick={() => {
                        setShowTopProfile(false);
                        navigate("/");
                      }}
                      className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all duration-200 hover:bg-red-50"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500 transition group-hover:bg-red-500 group-hover:text-white">
                        <FaArrowLeft />
                      </span>

                      <span className="flex-1">
                        <span className="block text-sm font-bold text-red-500">
                          Exit Demo
                        </span>

                        <span className="mt-0.5 block text-[11px] text-slate-400">
                          Return to DevSync landing page
                        </span>
                      </span>
                    </button>
                  </div>

                </div>
              )}

            </div>

          </div>

        </header>

        {/* =====================================================
            CONTENT
        ===================================================== */}

        <div className="p-5 lg:p-8">

          {/* WELCOME */}

          <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-center">

            <div>

              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-blue-600">
                <FaBolt />
                Demo Workspace
              </div>

              <h1 className="text-3xl font-black tracking-tight text-slate-900 lg:text-4xl">
                Good morning, Alex ðŸ‘‹
              </h1>

              <p className="mt-2 text-slate-500">
                Here's what's happening with your development workspace.
              </p>

            </div>

            <button onClick={() => navigate("/register")} className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-bold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-blue-700"><FaPlus />New Project</button>

          </div>

          {/* =================================================
              STATS
          ================================================= */}

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

            <StatCard
              icon={<FaFolderOpen />}
              title="Active Projects"
              value="12"
              change="+3"
              color="blue"
            />

            <StatCard
              icon={<FaTasks />}
              title="Tasks Completed"
              value="124"
              change="+18%"
              color="green"
            />

            <StatCard
              icon={<FaUsers />}
              title="Team Members"
              value="32"
              change="+6"
              color="purple"
            />

            <StatCard
              icon={<FaChartLine />}
              title="Productivity"
              value="87%"
              change="+12%"
              color="orange"
            />

          </div>

          {/* =================================================
              PROJECTS + ACTIVITY
          ================================================= */}

          <div className="mt-8 grid gap-8 xl:grid-cols-3">

            {/* PROJECTS */}

            <section className="xl:col-span-2">

              <div className="mb-5 flex items-center justify-between">

                <div>

                  <h2 className="text-xl font-black">
                    Your Projects
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Track your active development work.
                  </p>

                </div>

                <button
                  onClick={() => goToDemoPage("Projects")}
                  className="text-sm font-bold text-blue-600 hover:text-blue-700"
                >
                  View all
                </button>

              </div>

              <div className="grid gap-5 md:grid-cols-2">

                {projects.map((project) => (
                  <ProjectCard
                    key={project.name}
                    project={project}
                  />
                ))}

              </div>

            </section>

            {/* ACTIVITY */}

            <section>

              <div className="mb-5">

                <h2 className="text-xl font-black">
                  Recent Activity
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Latest team updates.
                </p>

              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                <div className="space-y-6">

                  {activities.map((activity, index) => (

                    <div
                      key={index}
                      className="flex gap-3"
                    >

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm text-blue-600">
                        {activity.icon}
                      </div>

                      <div className="min-w-0">

                        <p className="text-sm leading-6 text-slate-700">

                          <span className="font-bold">
                            {activity.user}
                          </span>{" "}

                          {activity.action}{" "}

                          <span className="font-semibold text-slate-900">
                            {activity.target}
                          </span>

                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {activity.time}
                        </p>

                      </div>

                    </div>

                  ))}

                </div>

              </div>

            </section>

          </div>

          {/* =================================================
              TASKS
          ================================================= */}

          <section className="mt-8">

            <div className="mb-5 flex items-center justify-between">

              <div>

                <h2 className="text-xl font-black">
                  Recent Tasks
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Keep your development workflow moving.
                </p>

              </div>

              <button
                onClick={() => goToDemoPage("Tasks")}
                className="text-sm font-bold text-blue-600"
              >
                View tasks
              </button>

            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

              <div className="hidden grid-cols-12 gap-4 border-b border-slate-100 bg-slate-50 px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-400 md:grid">

                <div className="col-span-5">
                  Task
                </div>

                <div className="col-span-2">
                  Project
                </div>

                <div className="col-span-2">
                  Priority
                </div>

                <div className="col-span-2">
                  Status
                </div>

                <div className="col-span-1" />

              </div>

              {tasks.map((task, index) => (

                <div
                  key={index}
                  className="grid gap-3 border-b border-slate-100 px-6 py-5 last:border-0 md:grid-cols-12 md:items-center md:gap-4"
                >

                  <div className="md:col-span-5">

                    <p className="font-bold text-slate-800">
                      {task.title}
                    </p>

                  </div>

                  <div className="text-sm text-slate-500 md:col-span-2">
                    {task.project}
                  </div>

                  <div className="md:col-span-2">
                    <PriorityBadge priority={task.priority} />
                  </div>

                  <div className="md:col-span-2">
                    <StatusBadge status={task.status} />
                  </div>

                  <div className="hidden justify-end md:col-span-1 md:flex">

                    <button className="text-slate-400 hover:text-slate-700">
                      <FaEllipsisH />
                    </button>

                  </div>

                </div>

              ))}

            </div>

          </section>

          {/* =================================================
              CTA
          ================================================= */}

          <section className="relative mt-10 overflow-hidden rounded-3xl bg-slate-900 p-8 text-white shadow-xl lg:p-10">

            <div className="relative z-10 max-w-2xl">

              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
                <FaRocket />
              </div>

              <h2 className="text-2xl font-black lg:text-3xl">
                Ready to build with your team?
              </h2>

              <p className="mt-3 leading-7 text-slate-300">
                This is just a demo. Create your own DevSync workspace
                and start managing real projects with your team.
              </p>

              <button
                onClick={() => navigate("/register")}
                className="mt-6 rounded-xl bg-white px-6 py-3 font-bold text-slate-900 transition hover:bg-blue-50"
              >
                Get Started
              </button>

            </div>

            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-600/20 blur-3xl" />

            <div className="absolute -bottom-20 right-20 h-48 w-48 rounded-full bg-indigo-500/20 blur-3xl" />

          </section>

        </div>

      </main>

    </div>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({ icon, title, value, change, color }) {

  const colors = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-purple-600",
    orange: "bg-orange-50 text-orange-600",
  };

  return (

    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

      <div className="flex items-start justify-between">

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${colors[color]}`}
        >
          {icon}
        </div>

        <span className="flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-bold text-green-600">

          <FaArrowUp />

          {change}

        </span>

      </div>

      <p className="mt-5 text-sm font-medium text-slate-500">
        {title}
      </p>

      <h3 className="mt-1 text-3xl font-black">
        {value}
      </h3>

    </div>

  );
}

/* =========================================================
   PROJECT CARD
========================================================= */

function ProjectCard({ project }) {

  const projectId = project.name
    .toLowerCase()
    .replace(/\s+/g, "");

  return (

    <Link
      to={`/demo/project/${projectId}`}
      className="group block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
    >

      <div className="flex items-start justify-between">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <FaCode />
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${
            project.status === "Active"
              ? "bg-green-50 text-green-600"
              : "bg-orange-50 text-orange-600"
          }`}
        >
          {project.status}
        </span>

      </div>

      <h3 className="mt-5 text-lg font-black">
        {project.name}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {project.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">

        {project.technologies.map((tech) => (

          <span
            key={tech}
            className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600"
          >
            {tech}
          </span>

        ))}

      </div>

      <div className="mt-6">

        <div className="mb-2 flex items-center justify-between text-xs">

          <span className="font-semibold text-slate-500">
            Progress
          </span>

          <span className="font-bold text-slate-900">
            {project.progress}%
          </span>

        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-100">

          <div
            className="h-full rounded-full bg-blue-600 transition-all duration-700"
            style={{ width: `${project.progress}%` }}
          />

        </div>

      </div>

      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-5">

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">

          <FaUsers />

          {project.members} members

        </div>

        <span className="text-sm font-bold text-blue-600 opacity-0 transition group-hover:opacity-100">
          Open â†’
        </span>

      </div>

    </Link>

  );
}

/* =========================================================
   PRIORITY BADGE
========================================================= */

function PriorityBadge({ priority }) {

  const styles = {
    High: "bg-red-50 text-red-600",
    Medium: "bg-yellow-50 text-yellow-600",
    Low: "bg-green-50 text-green-600",
  };

  return (

    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${styles[priority]}`}
    >
      {priority}
    </span>

  );
}

/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({ status }) {

  const styles = {
    "In Progress": "bg-blue-50 text-blue-600",
    Review: "bg-purple-50 text-purple-600",
    "To Do": "bg-slate-100 text-slate-600",
    Done: "bg-green-50 text-green-600",
  };

  return (

    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${styles[status]}`}
    >
      {status}
    </span>

  );
}

export default DemoDashboard;
