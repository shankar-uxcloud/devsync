import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaBolt,
  FaCheckCircle,
  FaChevronRight,
  FaCode,
  FaEllipsisH,
  FaFolderOpen,
  FaGithub,
  FaPlus,
  FaRocket,
  FaTasks,
  FaUsers,
} from "react-icons/fa";

/* =========================================================
   DEMO DATA
========================================================= */

const projects = [
  {
    id: "devsync",
    name: "DevSync",
    description: "Developer collaboration platform",
    progress: 82,
    members: 8,
    status: "Active",
    technology: "React · Node.js · MongoDB",
    accent: "blue",
  },
  {
    id: "skilltree",
    name: "SkillTree",
    description: "Technical skill discovery platform",
    progress: 68,
    members: 5,
    status: "Active",
    technology: "React · Supabase · REST API",
    accent: "violet",
  },
  {
    id: "ecoloop",
    name: "EcoLoop",
    description: "Smart waste exchange platform",
    progress: 45,
    members: 6,
    status: "Planning",
    technology: "MERN · Maps API",
    accent: "emerald",
  },
];

const activities = [
  {
    initials: "A",
    user: "Alex Morgan",
    action: "completed",
    target: "JWT Authentication",
    time: "12 min ago",
    icon: <FaCheckCircle />,
    type: "success",
  },
  {
    initials: "P",
    user: "Priya Sharma",
    action: "updated",
    target: "Dashboard UI",
    time: "35 min ago",
    icon: <FaCode />,
    type: "blue",
  },
  {
    initials: "R",
    user: "Rahul Kumar",
    action: "joined",
    target: "DevSync project",
    time: "1 hour ago",
    icon: <FaUsers />,
    type: "violet",
  },
  {
    initials: "E",
    user: "Emma Wilson",
    action: "pushed changes to",
    target: "main branch",
    time: "2 hours ago",
    icon: <FaGithub />,
    type: "amber",
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
   SMALL HELPERS
========================================================= */

function StatCard({
  icon,
  label,
  value,
  change,
  description,
  iconClass = "bg-blue-50 text-blue-600",
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_18px_45px_rgba(37,99,235,0.10)]">
      <div className="flex items-start justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}
        >
          {icon}
        </div>

        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-600">
          {change}
        </span>
      </div>

      <div className="mt-5">
        <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-400">
          {label}
        </p>

        <div className="mt-1 flex items-end gap-2">
          <span className="text-3xl font-black tracking-tight text-slate-900">
            {value}
          </span>
        </div>

        <p className="mt-1 text-xs text-slate-400">{description}</p>
      </div>

      <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-blue-500/[0.03] blur-2xl transition-all duration-300 group-hover:bg-blue-500/[0.08]" />
    </div>
  );
}

function ProgressBar({ value, accent = "blue" }) {
  const gradient =
    accent === "violet"
      ? "from-violet-500 to-purple-500"
      : accent === "emerald"
        ? "from-emerald-500 to-teal-500"
        : "from-blue-500 to-indigo-500";

  return (
    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
      <div
        className={`h-full rounded-full bg-gradient-to-r ${gradient} transition-all duration-700`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

function PriorityBadge({ priority }) {
  const styles = {
    High: "bg-red-50 text-red-600 border-red-100",
    Medium: "bg-amber-50 text-amber-600 border-amber-100",
    Low: "bg-emerald-50 text-emerald-600 border-emerald-100",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold ${
        styles[priority] || styles.Low
      }`}
    >
      {priority}
    </span>
  );
}

function StatusBadge({ status }) {
  const styles = {
    "In Progress": "bg-blue-50 text-blue-600",
    Review: "bg-violet-50 text-violet-600",
    "To Do": "bg-slate-100 text-slate-600",
    Done: "bg-emerald-50 text-emerald-600",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold ${
        styles[status] || styles["To Do"]
      }`}
    >
      {status}
    </span>
  );
}

/* =========================================================
   MAIN DEMO DASHBOARD
========================================================= */

export default function DemoDashboard() {
  const navigate = useNavigate();

  const [taskFilter, setTaskFilter] = useState("All");
  const [showProjectMenu, setShowProjectMenu] = useState(null);

  const filteredTasks = useMemo(() => {
    if (taskFilter === "All") {
      return tasks;
    }

    return tasks.filter((task) => task.status === taskFilter);
  }, [taskFilter]);

  const openProject = (projectId) => {
    navigate(`/demo/project/${projectId}`);
  };

  return (
    <div className="min-h-full bg-slate-50">
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1600px] px-5 py-7 sm:px-7 lg:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-blue-600">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                Interactive Demo
              </div>

              <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                Good morning, Developer 👋
              </h1>

              <p className="mt-1.5 text-sm text-slate-500">
                Here's what's happening across your workspace.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/demo/project/devsync")}
              className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-200"
            >
              <FaPlus className="text-xs" />
              New Project
              <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main className="mx-auto max-w-[1600px] px-5 py-7 sm:px-7 lg:px-8 lg:py-8">
        {/* ===================================================
            STATS
        =================================================== */}

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={<FaFolderOpen />}
            label="Active Projects"
            value="8"
            change="+2"
            description="Compared with last month"
            iconClass="bg-blue-50 text-blue-600"
          />

          <StatCard
            icon={<FaCheckCircle />}
            label="Tasks Completed"
            value="124"
            change="+12"
            description="Completed this month"
            iconClass="bg-emerald-50 text-emerald-600"
          />

          <StatCard
            icon={<FaUsers />}
            label="Team Members"
            value="12"
            change="+3"
            description="Across all workspaces"
            iconClass="bg-violet-50 text-violet-600"
          />

          <StatCard
            icon={<FaGithub />}
            label="GitHub Activity"
            value="+18%"
            change="↑ 18%"
            description="Activity this week"
            iconClass="bg-slate-100 text-slate-700"
          />
        </section>

        {/* ===================================================
            PROJECTS + QUICK ACTION
        =================================================== */}

        <section className="mt-8 grid gap-6 xl:grid-cols-[1.55fr_0.45fr]">
          {/* PROJECTS */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.04)] sm:p-6">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-black tracking-tight text-slate-900">
                  Active Projects
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Monitor progress across your development workspaces.
                </p>
              </div>

              <Link
                to="/demo/project/devsync"
                className="hidden items-center gap-1.5 text-xs font-bold text-blue-600 transition hover:text-blue-700 sm:inline-flex"
              >
                View all
                <FaArrowRight className="text-[10px]" />
              </Link>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/70 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-[0_16px_40px_rgba(15,23,42,0.07)]"
                >
                  {/* TOP */}

                  <div className="flex items-start justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => openProject(project.id)}
                      className="flex min-w-0 items-center gap-3 text-left"
                    >
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                          project.accent === "violet"
                            ? "bg-violet-100 text-violet-600"
                            : project.accent === "emerald"
                              ? "bg-emerald-100 text-emerald-600"
                              : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        {project.id === "devsync" ? (
                          <FaCode />
                        ) : project.id === "skilltree" ? (
                          <FaTasks />
                        ) : (
                          <FaRocket />
                        )}
                      </div>

                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-black text-slate-900">
                          {project.name}
                        </h3>

                        <p className="mt-0.5 truncate text-[11px] text-slate-500">
                          {project.description}
                        </p>
                      </div>
                    </button>

                    <div className="relative">
                      <button
                        type="button"
                        onClick={() =>
                          setShowProjectMenu(
                            showProjectMenu === project.id
                              ? null
                              : project.id,
                          )
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white hover:text-slate-700"
                      >
                        <FaEllipsisH className="text-xs" />
                      </button>

                      {showProjectMenu === project.id && (
                        <div className="absolute right-0 top-9 z-20 w-36 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
                          <button
                            type="button"
                            onClick={() => openProject(project.id)}
                            className="w-full rounded-lg px-3 py-2 text-left text-xs font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-blue-600"
                          >
                            Open project
                          </button>

                          <button
                            type="button"
                            onClick={() => setShowProjectMenu(null)}
                            className="w-full rounded-lg px-3 py-2 text-left text-xs font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-blue-600"
                          >
                            View details
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* PROGRESS */}

                  <div className="mt-5">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400">
                        Progress
                      </span>

                      <span className="text-xs font-black text-slate-700">
                        {project.progress}%
                      </span>
                    </div>

                    <ProgressBar
                      value={project.progress}
                      accent={project.accent}
                    />
                  </div>

                  {/* FOOTER */}

                  <div className="mt-5 flex items-center justify-between border-t border-slate-200/80 pt-4">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                      <FaUsers className="text-slate-400" />
                      {project.members} members
                    </div>

                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                        project.status === "Active"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-amber-50 text-amber-600"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>

                  <p className="mt-3 truncate text-[10px] font-medium text-slate-400">
                    {project.technology}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* QUICK ACTIONS */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.04)] sm:p-6">
            <div>
              <h2 className="text-lg font-black tracking-tight text-slate-900">
                Quick Actions
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Jump directly into your workflow.
              </p>
            </div>

            <div className="mt-6 space-y-3">
              <button
                type="button"
                onClick={() => navigate("/demo/workspace")}
                className="group flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-left transition-all duration-300 hover:border-blue-200 hover:bg-blue-50"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <FaCode />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold text-slate-800">
                    Open Workspace
                  </span>

                  <span className="mt-0.5 block text-[11px] text-slate-400">
                    Explore the developer environment
                  </span>
                </span>

                <FaChevronRight className="text-xs text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600" />
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate("/demo/project/devsync/tasks")
                }
                className="group flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-left transition-all duration-300 hover:border-violet-200 hover:bg-violet-50"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                  <FaTasks />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold text-slate-800">
                    Manage Tasks
                  </span>

                  <span className="mt-0.5 block text-[11px] text-slate-400">
                    Track the development workflow
                  </span>
                </span>

                <FaChevronRight className="text-xs text-slate-300 transition group-hover:translate-x-1 group-hover:text-violet-600" />
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate("/demo/project/devsync/team")
                }
                className="group flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-left transition-all duration-300 hover:border-emerald-200 hover:bg-emerald-50"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                  <FaUsers />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold text-slate-800">
                    Team Members
                  </span>

                  <span className="mt-0.5 block text-[11px] text-slate-400">
                    Explore your development team
                  </span>
                </span>

                <FaChevronRight className="text-xs text-slate-300 transition group-hover:translate-x-1 group-hover:text-emerald-600" />
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate("/demo/project/devsync/chat")
                }
                className="group flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-left transition-all duration-300 hover:border-cyan-200 hover:bg-cyan-50"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-100 text-cyan-600">
                  <FaBolt />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold text-slate-800">
                    Team Chat
                  </span>

                  <span className="mt-0.5 block text-[11px] text-slate-400">
                    Continue the conversation
                  </span>
                </span>

                <FaChevronRight className="text-xs text-slate-300 transition group-hover:translate-x-1 group-hover:text-cyan-600" />
              </button>
            </div>
          </div>
        </section>

        {/* ===================================================
            LOWER GRID
        =================================================== */}

        <section className="mt-8 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          {/* PROJECT PROGRESS */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.04)] sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black tracking-tight text-slate-900">
                  Project Progress
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Current progress across your main initiatives.
                </p>
              </div>

              <FaRocket className="text-blue-500" />
            </div>

            <div className="mt-7 space-y-6">
              <div>
                <div className="mb-2.5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      DevSync Platform
                    </p>

                    <p className="mt-0.5 text-[10px] text-slate-400">
                      Product development
                    </p>
                  </div>

                  <span className="text-xs font-black text-slate-700">
                    78%
                  </span>
                </div>

                <ProgressBar value={78} accent="blue" />
              </div>

              <div>
                <div className="mb-2.5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      Mobile App
                    </p>

                    <p className="mt-0.5 text-[10px] text-slate-400">
                      Cross-platform client
                    </p>
                  </div>

                  <span className="text-xs font-black text-slate-700">
                    61%
                  </span>
                </div>

                <ProgressBar value={61} accent="violet" />
              </div>

              <div>
                <div className="mb-2.5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      AI Assistant
                    </p>

                    <p className="mt-0.5 text-[10px] text-slate-400">
                      Intelligent workflow tools
                    </p>
                  </div>

                  <span className="text-xs font-black text-slate-700">
                    86%
                  </span>
                </div>

                <ProgressBar value={86} accent="emerald" />
              </div>
            </div>
          </div>

          {/* RECENT ACTIVITY */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.04)] sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black tracking-tight text-slate-900">
                  Recent Activity
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Latest changes across the workspace.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  navigate("/demo/project/devsync/activity")
                }
                className="text-xs font-bold text-blue-600 transition hover:text-blue-700"
              >
                View activity
              </button>
            </div>

            <div className="mt-6 divide-y divide-slate-100">
              {activities.map((activity) => (
                <div
                  key={`${activity.user}-${activity.target}`}
                  className="flex items-center gap-3 py-3.5 first:pt-0 last:pb-0"
                >
                  <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-xs font-black text-white">
                    {activity.initials}

                    <span
                      className={`absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white text-[7px] ${
                        activity.type === "success"
                          ? "bg-emerald-500"
                          : activity.type === "violet"
                            ? "bg-violet-500"
                            : activity.type === "amber"
                              ? "bg-amber-500"
                              : "bg-blue-500"
                      }`}
                    >
                      {activity.icon}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-slate-700">
                      <span className="font-black text-slate-900">
                        {activity.user}
                      </span>{" "}
                      {activity.action}{" "}
                      <span className="font-bold text-blue-600">
                        {activity.target}
                      </span>
                    </p>

                    <p className="mt-1 text-[10px] text-slate-400">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================
            TASKS
        =================================================== */}

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
          <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <h2 className="text-lg font-black tracking-tight text-slate-900">
                Recent Tasks
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Keep your development workflow moving.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex rounded-xl bg-slate-100 p-1">
                {["All", "In Progress", "Done"].map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setTaskFilter(filter)}
                    className={`rounded-lg px-3 py-1.5 text-[10px] font-bold transition-all ${
                      taskFilter === filter
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() =>
                  navigate("/demo/project/devsync/tasks")
                }
                className="hidden items-center gap-1.5 text-xs font-bold text-blue-600 sm:inline-flex"
              >
                View tasks
                <FaArrowRight className="text-[10px]" />
              </button>
            </div>
          </div>

          {/* DESKTOP TABLE */}

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70">
                  <th className="px-6 py-3 text-left text-[10px] font-black uppercase tracking-[0.12em] text-slate-400">
                    Task
                  </th>

                  <th className="px-6 py-3 text-left text-[10px] font-black uppercase tracking-[0.12em] text-slate-400">
                    Project
                  </th>

                  <th className="px-6 py-3 text-left text-[10px] font-black uppercase tracking-[0.12em] text-slate-400">
                    Priority
                  </th>

                  <th className="px-6 py-3 text-left text-[10px] font-black uppercase tracking-[0.12em] text-slate-400">
                    Status
                  </th>

                  <th className="px-6 py-3 text-right text-[10px] font-black uppercase tracking-[0.12em] text-slate-400">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredTasks.map((task) => (
                  <tr
                    key={task.title}
                    className="group border-b border-slate-100 last:border-0 transition hover:bg-slate-50/70"
                  >
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-slate-800">
                        {task.title}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-xs font-semibold text-slate-500">
                        {task.project}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <PriorityBadge priority={task.priority} />
                    </td>

                    <td className="px-6 py-4">
                      <StatusBadge status={task.status} />
                    </td>

                    <td className="px-6 py-4 text-right">
                      <button
                        type="button"
                        onClick={() =>
                          navigate("/demo/project/devsync/tasks")
                        }
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-300 transition hover:bg-blue-50 hover:text-blue-600"
                      >
                        <FaEllipsisH className="text-xs" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE TASK LIST */}

          <div className="divide-y divide-slate-100 md:hidden">
            {filteredTasks.map((task) => (
              <button
                key={task.title}
                type="button"
                onClick={() =>
                  navigate("/demo/project/devsync/tasks")
                }
                className="flex w-full items-start gap-3 p-5 text-left transition hover:bg-slate-50"
              >
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <FaTasks className="text-xs" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-slate-800">
                    {task.title}
                  </p>

                  <p className="mt-1 text-[11px] text-slate-400">
                    {task.project}
                  </p>

                  <div className="mt-3 flex items-center gap-2">
                    <PriorityBadge priority={task.priority} />
                    <StatusBadge status={task.status} />
                  </div>
                </div>

                <FaChevronRight className="mt-2 text-xs text-slate-300" />
              </button>
            ))}
          </div>
        </section>

        {/* ===================================================
            FINAL DEMO CTA
        =================================================== */}

        <section className="relative mt-8 overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f172a] via-[#111c3a] to-[#172554] p-7 shadow-[0_20px_60px_rgba(15,23,42,0.18)] sm:p-9 lg:p-10">
          {/* Decorative glow */}

          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/20 blur-[80px]" />

          <div className="pointer-events-none absolute bottom-0 left-1/3 h-40 w-80 rounded-full bg-violet-500/10 blur-[80px]" />

          <div className="relative z-10 max-w-3xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/30">
              <FaRocket />
            </div>

            <h2 className="mt-6 text-2xl font-black tracking-tight text-white sm:text-3xl">
              Ready to build with your team?
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
              This is an interactive DevSync demonstration using sample
              project data. Explore the workspace, tasks, team, chat,
              files, and activity without creating an account.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-900 transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-100"
              >
                Create your workspace
                <FaArrowRight className="text-xs" />
              </Link>

              <Link
                to="/demo/project/devsync"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
              >
                Explore DevSync
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}