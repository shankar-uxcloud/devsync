import React, { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FiActivity,
  FiAlertCircle,
  FiArrowLeft,
  FiArrowRight,
  FiCalendar,
  FiCheck,
  FiCheckCircle,
  FiChevronDown,
  FiChevronRight,
  FiClock,
  FiCode,
  FiDownload,
  FiEdit3,
  FiFile,
  FiGitBranch,
  FiGithub,
  FiHash,
  FiLayers,
  FiMessageCircle,
  FiMoreHorizontal,
  FiPlus,
  FiRefreshCw,
  FiSearch,
  FiShield,
  FiStar,
  FiTerminal,
  FiTrash2,
  FiUpload,
  FiUserPlus,
  FiUsers,
  FiX,
  FiZap,
} from "react-icons/fi";

const INITIAL_ACTIVITIES = [
  {
    id: 1,
    type: "commit",
    actor: "Arjun Kumar",
    initials: "AK",
    role: "Project Admin",
    action: "pushed a new commit",
    target: "feat: improve project dashboard",
    detail: "Updated dashboard metrics, project cards and activity widgets.",
    time: "10 minutes ago",
    date: "Today",
    hash: "a91f2c8",
    branch: "main",
    metadata: "8 files changed",
  },
  {
    id: 2,
    type: "task",
    actor: "Priya Sharma",
    initials: "PS",
    role: "Frontend Developer",
    action: "completed task",
    target: "Responsive navigation",
    detail: "Navigation now adapts cleanly across desktop and tablet layouts.",
    time: "42 minutes ago",
    date: "Today",
    metadata: "DS-106",
  },
  {
    id: 3,
    type: "file",
    actor: "Rahul Mehta",
    initials: "RM",
    role: "Backend Developer",
    action: "updated",
    target: "server/routes.js",
    detail: "Added pagination support to the project task endpoint.",
    time: "1 hour ago",
    date: "Today",
    metadata: "+34 / -12",
  },
  {
    id: 4,
    type: "chat",
    actor: "Kiran Nair",
    initials: "KN",
    role: "DevOps Engineer",
    action: "posted in",
    target: "#development",
    detail: "CI pipeline is green and the production build completed successfully.",
    time: "2 hours ago",
    date: "Today",
    metadata: "Message",
  },
  {
    id: 5,
    type: "task",
    actor: "Arjun Kumar",
    initials: "AK",
    role: "Project Admin",
    action: "moved task",
    target: "Create project overview",
    detail: "Moved from In Progress to Review.",
    time: "3 hours ago",
    date: "Today",
    metadata: "DS-105",
  },
  {
    id: 6,
    type: "team",
    actor: "Sneha Rao",
    initials: "SR",
    role: "Product Designer",
    action: "joined the project",
    target: "DevSync",
    detail: "Added as Product Designer to the workspace.",
    time: "Yesterday",
    date: "Yesterday",
    metadata: "Team",
  },
  {
    id: 7,
    type: "commit",
    actor: "Priya Sharma",
    initials: "PS",
    role: "Frontend Developer",
    action: "merged pull request",
    target: "#142 · dashboard-refactor",
    detail: "Merged the dashboard component refactor into main.",
    time: "Yesterday",
    date: "Yesterday",
    hash: "72bc910",
    branch: "main",
    metadata: "14 files changed",
  },
  {
    id: 8,
    type: "file",
    actor: "Sneha Rao",
    initials: "SR",
    role: "Product Designer",
    action: "uploaded",
    target: "dashboard-wireframes.fig",
    detail: "Uploaded the latest dashboard design direction.",
    time: "Yesterday",
    date: "Yesterday",
    metadata: "2.8 MB",
  },
  {
    id: 9,
    type: "deploy",
    actor: "Kiran Nair",
    initials: "KN",
    role: "DevOps Engineer",
    action: "deployed",
    target: "Production",
    detail: "Deployment completed successfully from main.",
    time: "2 days ago",
    date: "This week",
    metadata: "v1.8.0",
  },
  {
    id: 10,
    type: "task",
    actor: "Vikram Singh",
    initials: "VS",
    role: "QA Engineer",
    action: "verified task",
    target: "Authentication flow",
    detail: "Completed regression checks for login and registration.",
    time: "2 days ago",
    date: "This week",
    metadata: "QA passed",
  },
  {
    id: 11,
    type: "commit",
    actor: "Rahul Mehta",
    initials: "RM",
    role: "Backend Developer",
    action: "pushed a new commit",
    target: "feat: add socket events",
    detail: "Added realtime project activity and chat event handlers.",
    time: "3 days ago",
    date: "This week",
    hash: "e83ad41",
    branch: "feature/realtime",
    metadata: "6 files changed",
  },
  {
    id: 12,
    type: "team",
    actor: "Arjun Kumar",
    initials: "AK",
    role: "Project Admin",
    action: "invited",
    target: "Vikram Singh",
    detail: "Invited Vikram to join the QA team.",
    time: "4 days ago",
    date: "This week",
    metadata: "Invitation",
  },
];

const FILTERS = [
  { id: "all", label: "All activity" },
  { id: "commit", label: "Commits" },
  { id: "task", label: "Tasks" },
  { id: "file", label: "Files" },
  { id: "team", label: "Team" },
  { id: "chat", label: "Chat" },
  { id: "deploy", label: "Deployments" },
];

const ACTIVITY_STYLES = {
  commit: {
    icon: FiGitBranch,
    iconClass: "bg-violet-50 text-violet-600",
    label: "Commit",
  },
  task: {
    icon: FiCheckCircle,
    iconClass: "bg-emerald-50 text-emerald-600",
    label: "Task",
  },
  file: {
    icon: FiFile,
    iconClass: "bg-blue-50 text-blue-600",
    label: "File",
  },
  team: {
    icon: FiUsers,
    iconClass: "bg-orange-50 text-orange-600",
    label: "Team",
  },
  chat: {
    icon: FiMessageCircle,
    iconClass: "bg-pink-50 text-pink-600",
    label: "Chat",
  },
  deploy: {
    icon: FiZap,
    iconClass: "bg-amber-50 text-amber-600",
    label: "Deploy",
  },
};

function Avatar({ initials, size = "md" }) {
  const sizes = {
    sm: "h-7 w-7 text-[9px]",
    md: "h-9 w-9 text-[10px]",
    lg: "h-11 w-11 text-xs",
  };

  return (
    <div
      className={`${sizes[size]} flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-slate-950 via-slate-800 to-slate-600 font-black text-white shadow-sm`}
    >
      {initials}
    </div>
  );
}

function StatCard({ icon: Icon, label, value, detail }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
            {label}
          </p>

          <p className="mt-2 text-2xl font-black tracking-tight text-slate-950">
            {value}
          </p>

          <p className="mt-1 text-[10px] font-semibold text-slate-400">
            {detail}
          </p>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
          <Icon size={18} />
        </div>
      </div>
    </div>
  );
}

function ActivityIcon({ type }) {
  const config = ACTIVITY_STYLES[type] || ACTIVITY_STYLES.file;
  const Icon = config.icon;

  return (
    <div
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${config.iconClass}`}
    >
      <Icon size={16} />
    </div>
  );
}

function ActivityCard({ activity, onOpen }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <article className="group relative flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md sm:p-5">
      <ActivityIcon type={activity.type} />

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <Avatar initials={activity.initials} size="sm" />

          <span className="text-xs font-black text-slate-900">
            {activity.actor}
          </span>

          <span className="text-[10px] font-semibold text-slate-400">
            {activity.action}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onOpen(activity)}
          className="mt-2 block text-left text-sm font-black leading-5 text-slate-900 transition hover:text-blue-600"
        >
          {activity.target}
        </button>

        <p className="mt-1.5 max-w-2xl text-xs leading-5 text-slate-500">
          {activity.detail}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-2.5 py-1 text-[9px] font-bold text-slate-500">
            <FiClock size={10} />
            {activity.time}
          </span>

          <span className="rounded-full bg-slate-50 px-2.5 py-1 text-[9px] font-bold text-slate-500">
            {ACTIVITY_STYLES[activity.type]?.label}
          </span>

          {activity.metadata && (
            <span className="rounded-full bg-slate-50 px-2.5 py-1 font-mono text-[9px] font-bold text-slate-400">
              {activity.metadata}
            </span>
          )}

          {activity.hash && (
            <span className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2.5 py-1 font-mono text-[9px] font-bold text-violet-600">
              <FiGitBranch size={9} />
              {activity.hash}
            </span>
          )}
        </div>
      </div>

      <div className="relative hidden shrink-0 sm:block">
        <button
          type="button"
          onClick={() => setMenuOpen((value) => !value)}
          className="rounded-xl p-2 text-slate-300 opacity-0 transition hover:bg-slate-100 hover:text-slate-700 group-hover:opacity-100"
        >
          <FiMoreHorizontal size={16} />
        </button>

        {menuOpen && (
          <div className="absolute right-0 top-10 z-30 w-40 overflow-hidden rounded-xl border border-slate-200 bg-white p-1 shadow-xl">
            <button
              type="button"
              onClick={() => {
                onOpen(activity);
                setMenuOpen(false);
              }}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[10px] font-bold text-slate-600 hover:bg-slate-50"
            >
              <FiActivity size={12} />
              View details
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[10px] font-bold text-slate-600 hover:bg-slate-50"
            >
              <FiBookmark size={12} />
              Save activity
            </button>
          </div>
        )}
      </div>
    </article>
  );
}

function ActivityDetailsModal({ activity, onClose }) {
  if (!activity) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/30 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div className="flex items-center gap-3">
            <ActivityIcon type={activity.type} />

            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">
                Activity details
              </p>

              <h2 className="mt-1 text-base font-black text-slate-950">
                {activity.target}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <FiX size={18} />
          </button>
        </div>

        <div className="space-y-5 p-6">
          <div className="flex items-center gap-3">
            <Avatar initials={activity.initials} size="lg" />

            <div>
              <p className="text-xs font-black text-slate-900">
                {activity.actor}
              </p>

              <p className="mt-1 text-[10px] font-semibold text-slate-400">
                {activity.role}
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs font-semibold leading-6 text-slate-600">
              {activity.detail}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-slate-200 p-3">
              <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                Action
              </p>

              <p className="mt-1 text-xs font-bold text-slate-800">
                {activity.action}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 p-3">
              <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                Time
              </p>

              <p className="mt-1 text-xs font-bold text-slate-800">
                {activity.time}
              </p>
            </div>

            {activity.hash && (
              <div className="rounded-xl border border-slate-200 p-3">
                <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                  Commit
                </p>

                <p className="mt-1 font-mono text-xs font-bold text-violet-600">
                  {activity.hash}
                </p>
              </div>
            )}

            {activity.branch && (
              <div className="rounded-xl border border-slate-200 p-3">
                <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                  Branch
                </p>

                <p className="mt-1 font-mono text-xs font-bold text-slate-700">
                  {activity.branch}
                </p>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl bg-slate-950 py-3 text-xs font-bold text-white transition hover:bg-slate-800"
          >
            Close details
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProjectActivity() {
  const { projectId = "devsync" } = useParams();
  const navigate = useNavigate();

  const [activities, setActivities] = useState(INITIAL_ACTIVITIES);
  const [activeFilter, setActiveFilter] = useState("all");
  const [memberFilter, setMemberFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [notice, setNotice] = useState("");

  const members = useMemo(() => {
    return ["All", ...new Set(activities.map((item) => item.actor))];
  }, [activities]);

  const filteredActivities = useMemo(() => {
    const query = search.trim().toLowerCase();

    return activities.filter((activity) => {
      const matchesType =
        activeFilter === "all" || activity.type === activeFilter;

      const matchesMember =
        memberFilter === "All" || activity.actor === memberFilter;

      const matchesSearch =
        !query ||
        activity.actor.toLowerCase().includes(query) ||
        activity.target.toLowerCase().includes(query) ||
        activity.detail.toLowerCase().includes(query) ||
        activity.action.toLowerCase().includes(query);

      return matchesType && matchesMember && matchesSearch;
    });
  }, [activities, activeFilter, memberFilter, search]);

  const commits = activities.filter((item) => item.type === "commit").length;
  const taskUpdates = activities.filter((item) => item.type === "task").length;
  const fileUpdates = activities.filter((item) => item.type === "file").length;
  const deployments = activities.filter((item) => item.type === "deploy").length;

  const todayCount = activities.filter(
    (item) => item.date === "Today"
  ).length;

  const showNotice = (text) => {
    setNotice(text);

    window.setTimeout(() => {
      setNotice("");
    }, 2800);
  };

  const clearFilters = () => {
    setActiveFilter("all");
    setMemberFilter("All");
    setSearch("");
  };

  const handleRefresh = () => {
    setActivities((current) => [...current]);
    showNotice("Activity feed refreshed");
  };

  const groupedActivities = useMemo(() => {
    return filteredActivities.reduce((groups, activity) => {
      if (!groups[activity.date]) {
        groups[activity.date] = [];
      }

      groups[activity.date].push(activity);

      return groups;
    }, {});
  }, [filteredActivities]);

  return (
    <div className="min-h-full bg-[#f7f9fc] text-slate-900">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1800px] px-5 py-5 sm:px-7 lg:px-9">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div className="min-w-0">
              <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-slate-400">
                <button
                  type="button"
                  onClick={() =>
                    navigate(`/demo/project/${projectId}`)
                  }
                  className="transition hover:text-slate-700"
                >
                  DevSync
                </button>

                <span>/</span>

                <span className="text-slate-700">Activity</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-950/10">
                  <FiActivity size={20} />
                </div>

                <div className="min-w-0">
                  <h1 className="truncate text-2xl font-black tracking-tight text-slate-950">
                    Project Activity
                  </h1>

                  <p className="mt-0.5 text-xs font-medium text-slate-500">
                    A complete timeline of what is happening in DevSync.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() =>
                  navigate(`/demo/project/${projectId}`)
                }
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-600 transition hover:bg-slate-50"
              >
                <FiArrowLeft size={14} />
                Overview
              </button>

              <button
                type="button"
                onClick={handleRefresh}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                <FiRefreshCw size={14} />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-[1800px] px-5 py-6 sm:px-7 lg:px-9">
        {/* Stats */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={FiActivity}
            label="Today's activity"
            value={todayCount}
            detail="Events recorded today"
          />

          <StatCard
            icon={FiGitBranch}
            label="Commits"
            value={commits}
            detail="Repository changes"
          />

          <StatCard
            icon={FiCheckCircle}
            label="Task updates"
            value={taskUpdates}
            detail="Workstream changes"
          />

          <StatCard
            icon={FiZap}
            label="Deployments"
            value={deployments}
            detail="Production releases"
          />
        </section>

        {/* Project health */}
        <section className="mt-6 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2 text-emerald-600">
                    <FiCheckCircle size={15} />

                    <span className="text-[10px] font-black uppercase tracking-[0.18em]">
                      Healthy project
                    </span>
                  </div>

                  <h2 className="mt-2 text-lg font-black text-slate-950">
                    Development activity is on track.
                  </h2>

                  <p className="mt-1 max-w-xl text-xs leading-5 text-slate-400">
                    The team is actively committing code, completing tasks and
                    keeping the project moving toward its next release.
                  </p>
                </div>

                <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                  <span className="text-xl font-black">94%</span>

                  <span className="text-[8px] font-black uppercase tracking-wider">
                    health
                  </span>
                </div>
              </div>

              <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-[94%] rounded-full bg-emerald-500" />
              </div>

              <div className="mt-3 flex items-center justify-between text-[9px] font-semibold text-slate-400">
                <span>Project momentum</span>
                <span>Excellent</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-slate-950 p-6 text-white shadow-xl shadow-slate-950/10">
            <div className="flex items-center gap-2 text-blue-300">
              <FiGithub size={15} />

              <span className="text-[10px] font-black uppercase tracking-[0.18em]">
                Repository
              </span>
            </div>

            <h2 className="mt-3 font-mono text-sm font-black">
              shankar-uxcloud/devsync
            </h2>

            <div className="mt-5 grid grid-cols-2 gap-2">
              <div className="rounded-2xl bg-white/5 p-3">
                <p className="text-[9px] font-bold text-slate-500">
                  Branch
                </p>

                <p className="mt-1 font-mono text-xs font-black">
                  main
                </p>
              </div>

              <div className="rounded-2xl bg-white/5 p-3">
                <p className="text-[9px] font-bold text-slate-500">
                  Files changed
                </p>

                <p className="mt-1 text-xs font-black">
                  {fileUpdates * 8 + 3}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => showNotice("Repository details opened")}
              className="mt-4 inline-flex items-center gap-2 text-[10px] font-bold text-blue-300 transition hover:text-white"
            >
              View repository
              <FiArrowRight size={12} />
            </button>
          </div>
        </section>

        {/* Toolbar */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row">
              <div className="relative min-w-0 flex-1 sm:max-w-md">
                <FiSearch
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search activity..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-xs font-semibold outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-50"
                />
              </div>

              <button
                type="button"
                onClick={() => setShowFilters((value) => !value)}
                className={`inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-bold transition ${
                  showFilters || activeFilter !== "all" || memberFilter !== "All"
                    ? "border-blue-200 bg-blue-50 text-blue-700"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                <FiLayers size={13} />
                Filters
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden text-[10px] font-bold text-slate-400 sm:inline">
                {filteredActivities.length} events
              </span>

              <button
                type="button"
                onClick={() => showNotice("Activity exported")}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-600 transition hover:bg-slate-50"
              >
                <FiDownload size={13} />
                Export
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="mt-3 space-y-4 border-t border-slate-100 pt-3">
              <div>
                <label className="mb-2 block text-[9px] font-black uppercase tracking-wider text-slate-400">
                  Activity type
                </label>

                <div className="flex flex-wrap gap-2">
                  {FILTERS.map((filter) => (
                    <button
                      type="button"
                      key={filter.id}
                      onClick={() => setActiveFilter(filter.id)}
                      className={`rounded-full px-3 py-1.5 text-[9px] font-bold transition ${
                        activeFilter === filter.id
                          ? "bg-slate-950 text-white"
                          : "border border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-[9px] font-black uppercase tracking-wider text-slate-400">
                  Team member
                </label>

                <div className="relative max-w-sm">
                  <select
                    value={memberFilter}
                    onChange={(event) =>
                      setMemberFilter(event.target.value)
                    }
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 pr-8 text-xs font-bold text-slate-700 outline-none"
                  >
                    {members.map((member) => (
                      <option key={member}>{member}</option>
                    ))}
                  </select>

                  <FiChevronDown
                    size={13}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={clearFilters}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[10px] font-bold text-slate-500 transition hover:bg-slate-50 hover:text-slate-800"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>

        {/* Active filters */}
        {(search || activeFilter !== "all" || memberFilter !== "All") && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Active
            </span>

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[9px] font-bold text-slate-600"
              >
                Search: {search}
                <FiX size={10} />
              </button>
            )}

            {activeFilter !== "all" && (
              <button
                type="button"
                onClick={() => setActiveFilter("all")}
                className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[9px] font-bold text-slate-600"
              >
                Type:{" "}
                {FILTERS.find((item) => item.id === activeFilter)?.label}
                <FiX size={10} />
              </button>
            )}

            {memberFilter !== "All" && (
              <button
                type="button"
                onClick={() => setMemberFilter("All")}
                className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[9px] font-bold text-slate-600"
              >
                Member: {memberFilter}
                <FiX size={10} />
              </button>
            )}
          </div>
        )}

        {/* Activity timeline */}
        <section className="mt-5">
          {Object.keys(groupedActivities).length > 0 ? (
            <div className="space-y-7">
              {Object.entries(groupedActivities).map(
                ([date, dateActivities]) => (
                  <div key={date}>
                    <div className="mb-3 flex items-center gap-3">
                      <span className="rounded-full bg-slate-950 px-3 py-1 text-[9px] font-black uppercase tracking-wider text-white">
                        {date}
                      </span>

                      <div className="h-px flex-1 bg-slate-200" />

                      <span className="text-[9px] font-bold text-slate-400">
                        {dateActivities.length}{" "}
                        {dateActivities.length === 1
                          ? "event"
                          : "events"}
                      </span>
                    </div>

                    <div className="relative space-y-3">
                      <div className="absolute bottom-5 left-[32px] top-5 hidden w-px bg-slate-200 sm:block" />

                      {dateActivities.map((activity) => (
                        <ActivityCard
                          key={activity.id}
                          activity={activity}
                          onOpen={setSelectedActivity}
                        />
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          ) : (
            <div className="flex min-h-72 flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white px-6 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <FiSearch size={21} />
              </div>

              <h3 className="mt-4 text-sm font-black text-slate-900">
                No activity found
              </h3>

              <p className="mt-1 max-w-sm text-xs leading-5 text-slate-400">
                Try another search term or remove one of your filters.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-4 rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-bold text-white"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>

        {/* Activity insights */}
        <section className="mt-6 grid gap-5 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-violet-600">
              <FiGitBranch size={15} />

              <span className="text-[10px] font-black uppercase tracking-[0.18em]">
                Code velocity
              </span>
            </div>

            <p className="mt-3 text-2xl font-black text-slate-950">
              +18%
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-400">
              Commit activity is higher than the previous project cycle.
            </p>

            <div className="mt-5 flex items-end gap-1">
              {[35, 48, 42, 65, 58, 78, 72, 88, 81, 94].map(
                (height, index) => (
                  <div
                    key={index}
                    className="flex-1 rounded-t-md bg-slate-200"
                    style={{ height: `${height / 2}px` }}
                  />
                )
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-emerald-600">
              <FiCheckCircle size={15} />

              <span className="text-[10px] font-black uppercase tracking-[0.18em]">
                Delivery
              </span>
            </div>

            <p className="mt-3 text-2xl font-black text-slate-950">
              82%
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-400">
              Current sprint tasks are progressing toward completion.
            </p>

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-[82%] rounded-full bg-emerald-500" />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-orange-600">
              <FiUsers size={15} />

              <span className="text-[10px] font-black uppercase tracking-[0.18em]">
                Collaboration
              </span>
            </div>

            <p className="mt-3 text-2xl font-black text-slate-950">
              6 active
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-400">
              Every project discipline has contributed this week.
            </p>

            <div className="mt-5 flex -space-x-2">
              {["AK", "PS", "RM", "KN", "SR", "VS"].map((initials) => (
                <Avatar key={initials} initials={initials} />
              ))}
            </div>
          </div>
        </section>

        {/* Bottom navigation */}
        <section className="mt-6 overflow-hidden rounded-3xl bg-slate-950 p-6 text-white shadow-xl shadow-slate-950/10 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-blue-300">
                <FiZap size={15} />

                <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                  Keep building
                </span>
              </div>

              <h2 className="text-xl font-black tracking-tight sm:text-2xl">
                Activity is only one part of the workspace.
              </h2>

              <p className="mt-2 max-w-xl text-xs leading-5 text-slate-400">
                Continue working with tasks, team members, project chat and
                repository files.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                to={`/demo/project/${projectId}/tasks`}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-slate-950 transition hover:bg-slate-100"
              >
                <FiCheckCircle size={13} />
                Tasks
              </Link>

              <Link
                to={`/demo/project/${projectId}/chat`}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-white/10"
              >
                <FiMessageCircle size={13} />
                Chat
              </Link>

              <Link
                to={`/demo/project/${projectId}/files`}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-white/10"
              >
                <FiFile size={13} />
                Files
              </Link>
            </div>
          </div>
        </section>

        <div className="flex flex-col items-center justify-between gap-3 pb-4 pt-5 text-[9px] font-semibold text-slate-400 sm:flex-row">
          <div className="flex items-center gap-2">
            <FiShield size={12} />
            Project activity is visible to workspace members
          </div>

          <div className="flex items-center gap-2">
            <FiCalendar size={12} />
            DevSync · Development workspace
          </div>
        </div>
      </main>

      {selectedActivity && (
        <ActivityDetailsModal
          activity={selectedActivity}
          onClose={() => setSelectedActivity(null)}
        />
      )}

      {notice && (
        <div className="fixed bottom-5 left-1/2 z-[120] -translate-x-1/2">
          <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-950 px-4 py-3 text-white shadow-2xl">
            <FiCheck size={14} className="text-emerald-400" />

            <span className="text-[10px] font-bold">{notice}</span>
          </div>
        </div>
      )}
    </div>
  );
}