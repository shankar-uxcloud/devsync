import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaArrowRight,
  FaBolt,
  FaCalendarAlt,
  FaCheckCircle,
  FaChevronDown,
  FaChevronRight,
  FaCode,
  FaEllipsisH,
  FaFileAlt,
  FaGithub,
  FaGitAlt,
  FaLayerGroup,
  FaLink,
  FaPlus,
  FaRocket,
  FaTasks,
  FaUsers,
} from "react-icons/fa";
import { motion } from "framer-motion";

/* =========================================================
   PROJECT DATA
========================================================= */

const PROJECTS = {
  devsync: {
    id: "devsync",
    name: "DevSync",
    description:
      "AI-powered developer collaboration and project management platform.",
    status: "Active",
    progress: 82,
    health: "Healthy",
    healthScore: 94,
    visibility: "Public",
    repository: "shankar-uxcloud/devsync",
    branch: "main",
    technology: [
      "React",
      "Vite",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "MongoDB",
      "Socket.IO",
    ],
    members: 8,
    tasks: 31,
    completedTasks: 24,
    openIssues: 6,
    pullRequests: 4,
    commits: 42,
    dueDate: "Sep 30, 2026",
  },
};

/* =========================================================
   TEAM
========================================================= */

const MEMBERS = [
  {
    name: "Alex Morgan",
    role: "Full Stack Developer",
    initials: "AM",
    status: "Online",
  },
  {
    name: "Priya Sharma",
    role: "UI/UX Designer",
    initials: "PS",
    status: "Online",
  },
  {
    name: "Rahul Kumar",
    role: "Backend Developer",
    initials: "RK",
    status: "Away",
  },
  {
    name: "Emma Wilson",
    role: "Product Manager",
    initials: "EW",
    status: "Online",
  },
];

/* =========================================================
   ACTIVITY
========================================================= */

const ACTIVITIES = [
  {
    user: "Alex Morgan",
    initials: "AM",
    action: "completed",
    target: "JWT Authentication",
    time: "12 minutes ago",
    icon: FaCheckCircle,
  },
  {
    user: "Priya Sharma",
    initials: "PS",
    action: "updated",
    target: "Dashboard UI",
    time: "35 minutes ago",
    icon: FaCode,
  },
  {
    user: "Rahul Kumar",
    initials: "RK",
    action: "opened",
    target: "API integration",
    time: "1 hour ago",
    icon: FaGitAlt,
  },
  {
    user: "Emma Wilson",
    initials: "EW",
    action: "created",
    target: "Sprint 08",
    time: "2 hours ago",
    icon: FaRocket,
  },
];

/* =========================================================
   TASKS
========================================================= */

const TASKS = [
  {
    id: 1,
    title: "Implement JWT Authentication",
    assignee: "Alex Morgan",
    status: "In Progress",
    priority: "High",
  },
  {
    id: 2,
    title: "Build developer profile UI",
    assignee: "Priya Sharma",
    status: "Review",
    priority: "Medium",
  },
  {
    id: 3,
    title: "Connect GitHub repository",
    assignee: "Rahul Kumar",
    status: "Done",
    priority: "High",
  },
  {
    id: 4,
    title: "Create project analytics",
    assignee: "Emma Wilson",
    status: "To Do",
    priority: "Medium",
  },
];

/* =========================================================
   SMALL COMPONENTS
========================================================= */

function MetricCard({
  icon,
  label,
  value,
  helper,
  iconBackground,
  iconColor,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_18px_45px_rgba(37,99,235,0.09)]"
    >
      <div className="flex items-start justify-between">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{
            background: iconBackground,
            color: iconColor,
          }}
        >
          {icon}
        </div>

        <FaChevronRight className="text-[10px] text-slate-200 transition group-hover:translate-x-1 group-hover:text-blue-500" />
      </div>

      <p className="mt-4 text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-2xl font-black tracking-tight text-slate-900">
        {value}
      </p>

      <p className="mt-1 text-[10px] font-medium text-slate-400">
        {helper}
      </p>
    </motion.div>
  );
}

function StatusBadge({ children, type = "blue" }) {
  const styles = {
    green: "bg-emerald-50 text-emerald-600 border-emerald-100",
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    violet: "bg-violet-50 text-violet-600 border-violet-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
    red: "bg-red-50 text-red-600 border-red-100",
    slate: "bg-slate-100 text-slate-600 border-slate-200",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold ${styles[type]}`}
    >
      {children}
    </span>
  );
}

function ProgressBar({ value }) {
  return (
    <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{
          duration: 1,
          ease: "easeOut",
        }}
        className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500"
      />
    </div>
  );
}

function Avatar({ initials, size = "md" }) {
  const dimensions =
    size === "sm"
      ? "h-8 w-8 text-[9px]"
      : size === "lg"
        ? "h-12 w-12 text-xs"
        : "h-10 w-10 text-[10px]";

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 font-black text-white shadow-sm ${dimensions}`}
    >
      {initials}
    </div>
  );
}

/* =========================================================
   PROJECT OVERVIEW
========================================================= */

export default function ProjectOverview() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const project = PROJECTS[projectId] || PROJECTS.devsync;

  const [activeTab, setActiveTab] = useState("Overview");
  const [showMenu, setShowMenu] = useState(false);

  const tabs = useMemo(
    () => [
      {
        name: "Overview",
        path: `/demo/project/${project.id}`,
      },
      {
        name: "Tasks",
        path: `/demo/project/${project.id}/tasks`,
      },
      {
        name: "Team",
        path: `/demo/project/${project.id}/team`,
      },
      {
        name: "Chat",
        path: `/demo/project/${project.id}/chat`,
      },
      {
        name: "Files",
        path: `/demo/project/${project.id}/files`,
      },
      {
        name: "Activity",
        path: `/demo/project/${project.id}/activity`,
      },
    ],
    [project.id],
  );

  const handleTab = (tab) => {
    setActiveTab(tab.name);

    if (tab.name !== "Overview") {
      navigate(tab.path);
    }
  };

  return (
    <div className="min-h-full bg-slate-50">
      {/* =====================================================
          PROJECT HEADER
      ===================================================== */}

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1600px] px-5 py-6 sm:px-7 lg:px-8">
          {/* Breadcrumb */}

          <div className="mb-5 flex items-center gap-2 text-[11px] font-semibold text-slate-400">
            <Link
              to="/demo"
              className="no-underline transition hover:text-blue-600"
            >
              Workspace
            </Link>

            <FaChevronRight className="text-[8px]" />

            <span className="text-slate-600">
              Projects
            </span>

            <FaChevronRight className="text-[8px]" />

            <span className="font-bold text-slate-800">
              {project.name}
            </span>
          </div>

          {/* Project identity */}

          <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex min-w-0 items-start gap-4">
              <button
                type="button"
                onClick={() => navigate("/demo")}
                className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
              >
                <FaArrowLeft className="text-xs" />
              </button>

              <div
                className="
                  flex h-14 w-14 shrink-0
                  items-center justify-center
                  rounded-2xl
                  bg-gradient-to-br
                  from-blue-600
                  to-indigo-600
                  text-white
                  shadow-[0_12px_30px_rgba(37,99,235,0.22)]
                "
              >
                <FaCode size={21} />
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="truncate text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                    {project.name}
                  </h1>

                  <StatusBadge type="green">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    {project.status}
                  </StatusBadge>

                  <StatusBadge type="slate">
                    {project.visibility}
                  </StatusBadge>
                </div>

                <p className="mt-1.5 max-w-2xl text-sm text-slate-500">
                  {project.description}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-medium text-slate-400">
                  <span className="inline-flex items-center gap-1.5">
                    <FaGithub />
                    {project.repository}
                  </span>

                  <span className="inline-flex items-center gap-1.5">
                    <FaGitAlt />
                    {project.branch}
                  </span>

                  <span className="inline-flex items-center gap-1.5">
                    <FaCalendarAlt />
                    Due {project.dueDate}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}

            <div className="flex items-center gap-2">
              <a
                href="https://github.com/shankar-uxcloud/devsync"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-700 no-underline transition hover:border-slate-300 hover:bg-slate-50"
              >
                <FaGithub />
                <span className="hidden sm:inline">
                  Repository
                </span>
              </a>

              <button
                type="button"
                onClick={() =>
                  navigate(`/demo/project/${project.id}/tasks`)
                }
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 text-xs font-bold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                <FaPlus className="text-[10px]" />
                Add Task
              </button>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowMenu((value) => !value)}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50"
                >
                  <FaEllipsisH />
                </button>

                {showMenu && (
                  <div className="absolute right-0 top-13 z-30 w-44 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl">
                    <button
                      type="button"
                      className="w-full rounded-xl px-3 py-2.5 text-left text-xs font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-blue-600"
                    >
                      Project settings
                    </button>

                    <button
                      type="button"
                      className="w-full rounded-xl px-3 py-2.5 text-left text-xs font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-blue-600"
                    >
                      Invite member
                    </button>

                    <button
                      type="button"
                      className="w-full rounded-xl px-3 py-2.5 text-left text-xs font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-blue-600"
                    >
                      Copy project link
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tabs */}

          <div className="mt-7 flex gap-1 overflow-x-auto border-b border-slate-100">
            {tabs.map((tab) => {
              const selected = activeTab === tab.name;

              return (
                <button
                  key={tab.name}
                  type="button"
                  onClick={() => handleTab(tab)}
                  className={`relative shrink-0 px-4 pb-3 pt-1 text-xs font-bold transition ${
                    selected
                      ? "text-blue-600"
                      : "text-slate-400 hover:text-slate-700"
                  }`}
                >
                  {tab.name}

                  {selected && (
                    <motion.span
                      layoutId="project-tab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-blue-600"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <main className="mx-auto max-w-[1600px] px-5 py-7 sm:px-7 lg:px-8 lg:py-8">
        {/* ===================================================
            PROJECT HEALTH STRIP
        =================================================== */}

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            icon={<FaTasks />}
            label="Tasks"
            value={`${project.completedTasks}/${project.tasks}`}
            helper="tasks completed"
            iconBackground="#eff6ff"
            iconColor="#2563eb"
          />

          <MetricCard
            icon={<FaUsers />}
            label="Team"
            value={project.members}
            helper="active collaborators"
            iconBackground="#f5f3ff"
            iconColor="#7c3aed"
          />

          <MetricCard
            icon={<FaGithub />}
            label="GitHub"
            value={project.commits}
            helper={`${project.pullRequests} open pull requests`}
            iconBackground="#f1f5f9"
            iconColor="#334155"
          />

          <MetricCard
            icon={<FaBolt />}
            label="Health"
            value={`${project.healthScore}%`}
            helper={`${project.health} project health`}
            iconBackground="#ecfdf5"
            iconColor="#059669"
          />
        </section>

        {/* ===================================================
            MAIN GRID
        =================================================== */}

        <section className="mt-7 grid gap-6 xl:grid-cols-[1.45fr_0.55fr]">
          {/* LEFT */}

          <div className="space-y-6">
            {/* Progress */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.04)] sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-black tracking-tight text-slate-900">
                      Project Progress
                    </h2>

                    <StatusBadge type="green">
                      On track
                    </StatusBadge>
                  </div>

                  <p className="mt-1 text-xs text-slate-500">
                    Overall delivery progress for this project.
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <p className="text-3xl font-black tracking-tight text-slate-900">
                    {project.progress}%
                  </p>

                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Complete
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <ProgressBar value={project.progress} />
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Completed
                  </p>

                  <p className="mt-1 text-lg font-black text-slate-800">
                    24
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    In progress
                  </p>

                  <p className="mt-1 text-lg font-black text-slate-800">
                    4
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Remaining
                  </p>

                  <p className="mt-1 text-lg font-black text-slate-800">
                    3
                  </p>
                </div>
              </div>
            </div>

            {/* Recent Tasks */}

            <div className="rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5 sm:px-6">
                <div>
                  <h2 className="text-lg font-black tracking-tight text-slate-900">
                    Recent Tasks
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Latest work happening in this project.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      `/demo/project/${project.id}/tasks`,
                    )
                  }
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 transition hover:text-blue-700"
                >
                  View all
                  <FaArrowRight className="text-[9px]" />
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {TASKS.map((task) => (
                  <button
                    key={task.id}
                    type="button"
                    onClick={() =>
                      navigate(
                        `/demo/project/${project.id}/tasks`,
                      )
                    }
                    className="flex w-full items-center gap-4 px-5 py-4 text-left transition hover:bg-slate-50 sm:px-6"
                  >
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                        task.status === "Done"
                          ? "bg-emerald-50 text-emerald-600"
                          : task.status === "In Progress"
                            ? "bg-blue-50 text-blue-600"
                            : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {task.status === "Done" ? (
                        <FaCheckCircle />
                      ) : (
                        <FaTasks />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-slate-800">
                        {task.title}
                      </p>

                      <p className="mt-1 text-[10px] text-slate-400">
                        Assigned to {task.assignee}
                      </p>
                    </div>

                    <div className="hidden items-center gap-2 sm:flex">
                      <StatusBadge
                        type={
                          task.priority === "High"
                            ? "red"
                            : task.priority === "Medium"
                              ? "amber"
                              : "green"
                        }
                      >
                        {task.priority}
                      </StatusBadge>

                      <StatusBadge
                        type={
                          task.status === "Done"
                            ? "green"
                            : task.status === "Review"
                              ? "violet"
                              : task.status ===
                                  "In Progress"
                                ? "blue"
                                : "slate"
                        }
                      >
                        {task.status}
                      </StatusBadge>
                    </div>

                    <FaChevronRight className="text-[10px] text-slate-300" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div className="space-y-6">
            {/* Team */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.04)] sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-black tracking-tight text-slate-900">
                    Team
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    {project.members} members
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      `/demo/project/${project.id}/team`,
                    )
                  }
                  className="text-xs font-bold text-blue-600"
                >
                  View
                </button>
              </div>

              <div className="mt-5 space-y-3">
                {MEMBERS.map((member) => (
                  <div
                    key={member.name}
                    className="flex items-center gap-3"
                  >
                    <div className="relative">
                      <Avatar
                        initials={member.initials}
                        size="sm"
                      />

                      <span
                        className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white ${
                          member.status === "Online"
                            ? "bg-emerald-500"
                            : "bg-amber-400"
                        }`}
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-bold text-slate-800">
                        {member.name}
                      </p>

                      <p className="truncate text-[10px] text-slate-400">
                        {member.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    `/demo/project/${project.id}/team`,
                  )
                }
                className="mt-5 flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 text-xs font-bold text-slate-500 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
              >
                <FaPlus className="text-[9px]" />
                Add team member
              </button>
            </div>

            {/* Repository */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.04)] sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                  <FaGithub />
                </div>

                <div>
                  <h2 className="text-sm font-black text-slate-900">
                    GitHub Repository
                  </h2>

                  <p className="mt-0.5 text-[10px] text-slate-400">
                    Connected repository
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-xl bg-slate-50 p-4">
                <p className="truncate text-xs font-bold text-slate-700">
                  {project.repository}
                </p>

                <div className="mt-3 flex items-center justify-between text-[10px] text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <FaGitAlt />
                    {project.branch}
                  </span>

                  <span>
                    {project.commits} commits
                  </span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-slate-100 p-3">
                  <p className="text-[10px] font-bold text-slate-400">
                    Pull Requests
                  </p>

                  <p className="mt-1 text-lg font-black text-slate-800">
                    {project.pullRequests}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-100 p-3">
                  <p className="text-[10px] font-bold text-slate-400">
                    Issues
                  </p>

                  <p className="mt-1 text-lg font-black text-slate-800">
                    {project.openIssues}
                  </p>
                </div>
              </div>

              <a
                href="https://github.com/shankar-uxcloud/devsync"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-slate-900 text-xs font-bold text-white no-underline transition hover:bg-slate-800"
              >
                <FaGithub />
                Open repository
              </a>
            </div>
          </div>
        </section>

        {/* ===================================================
            TECHNOLOGY + ACTIVITY
        =================================================== */}

        <section className="mt-6 grid gap-6 xl:grid-cols-[0.7fr_1.3fr]">
          {/* Technology */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.04)] sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <FaLayerGroup />
              </div>

              <div>
                <h2 className="text-lg font-black tracking-tight text-slate-900">
                  Technology
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Project technology stack
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.technology.map((technology) => (
                <span
                  key={technology}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] font-bold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                >
                  {technology}
                </span>
              ))}
            </div>

            <div className="mt-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
              <div className="flex items-center gap-2 text-xs font-black text-blue-700">
                <FaRocket />
                Development velocity
              </div>

              <p className="mt-2 text-2xl font-black text-slate-900">
                Excellent
              </p>

              <p className="mt-1 text-[10px] leading-5 text-slate-500">
                Your team is maintaining a healthy delivery
                pace this sprint.
              </p>
            </div>
          </div>

          {/* Activity */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.04)] sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black tracking-tight text-slate-900">
                  Recent Activity
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Latest project events
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    `/demo/project/${project.id}/activity`,
                  )
                }
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600"
              >
                View all
                <FaArrowRight className="text-[9px]" />
              </button>
            </div>

            <div className="mt-6 divide-y divide-slate-100">
              {ACTIVITIES.map((activity) => {
                const ActivityIcon = activity.icon;

                return (
                  <div
                    key={`${activity.user}-${activity.target}`}
                    className="flex items-center gap-3 py-3.5 first:pt-0 last:pb-0"
                  >
                    <div className="relative">
                      <Avatar
                        initials={activity.initials}
                        size="sm"
                      />

                      <div className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-blue-600 text-[6px] text-white">
                        <ActivityIcon />
                      </div>
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-xs leading-5 text-slate-500">
                        <span className="font-black text-slate-800">
                          {activity.user}
                        </span>{" "}
                        {activity.action}{" "}
                        <span className="font-bold text-blue-600">
                          {activity.target}
                        </span>
                      </p>

                      <p className="mt-0.5 text-[10px] text-slate-400">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===================================================
            BOTTOM CTA
        =================================================== */}

        <section className="relative mt-6 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-[#111c3a] to-blue-950 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.15)] sm:p-8">
          <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-blue-500/20 blur-[80px]" />

          <div className="pointer-events-none absolute bottom-0 left-1/3 h-32 w-80 rounded-full bg-violet-500/10 blur-[70px]" />

          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-blue-300">
                <FaBolt />
                Demo workspace
              </div>

              <h2 className="mt-2 text-xl font-black tracking-tight text-white sm:text-2xl">
                Explore the complete DevSync workflow.
              </h2>

              <p className="mt-2 max-w-2xl text-xs leading-6 text-slate-300">
                Move from project planning to tasks, team collaboration,
                GitHub activity, files, and communication — all from one
                workspace.
              </p>
            </div>

            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={() =>
                  navigate(
                    `/demo/project/${project.id}/tasks`,
                  )
                }
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-5 text-xs font-bold text-slate-900 transition hover:bg-slate-100"
              >
                Explore tasks
                <FaArrowRight className="text-[9px]" />
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    `/demo/project/${project.id}/chat`,
                  )
                }
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 text-xs font-bold text-white transition hover:bg-white/10"
              >
                Open team chat
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}