import React, { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCalendar,
  FiCheck,
  FiChevronDown,
  FiClock,
  FiCode,
  FiFilter,
  FiFlag,
  FiGitBranch,
  FiGrid,
  FiLayers,
  FiList,
  FiMessageCircle,
  FiMoreHorizontal,
  FiPlus,
  FiSearch,
  FiSliders,
  FiTag,
  FiUsers,
  FiX,
  FiZap,
} from "react-icons/fi";

const INITIAL_TASKS = [
  {
    id: "DS-101",
    title: "Design authentication flow",
    description:
      "Finalize login, registration and session management experience.",
    status: "Todo",
    priority: "High",
    assignee: "Arjun",
    initials: "AK",
    due: "Sep 18",
    labels: ["Design", "Auth"],
    points: 5,
  },
  {
    id: "DS-102",
    title: "Build dashboard analytics",
    description:
      "Create reusable analytics cards and project activity visualizations.",
    status: "Todo",
    priority: "Medium",
    assignee: "Priya",
    initials: "PS",
    due: "Sep 20",
    labels: ["Frontend", "Analytics"],
    points: 8,
  },
  {
    id: "DS-103",
    title: "Configure MongoDB models",
    description:
      "Create project, task, team and activity schemas for the backend.",
    status: "In Progress",
    priority: "High",
    assignee: "Rahul",
    initials: "RM",
    due: "Sep 17",
    labels: ["Backend", "Database"],
    points: 5,
  },
  {
    id: "DS-104",
    title: "Implement Socket.IO events",
    description:
      "Connect real-time project updates, notifications and chat events.",
    status: "In Progress",
    priority: "Critical",
    assignee: "Kiran",
    initials: "KN",
    due: "Sep 19",
    labels: ["Backend", "Realtime"],
    points: 8,
  },
  {
    id: "DS-105",
    title: "Create project overview",
    description:
      "Build the project overview page with metrics, activity and team data.",
    status: "Review",
    priority: "High",
    assignee: "Arjun",
    initials: "AK",
    due: "Sep 16",
    labels: ["Frontend", "UI"],
    points: 5,
  },
  {
    id: "DS-106",
    title: "Add responsive navigation",
    description:
      "Make dashboard navigation work smoothly across desktop and tablet.",
    status: "Review",
    priority: "Medium",
    assignee: "Priya",
    initials: "PS",
    due: "Sep 17",
    labels: ["Frontend"],
    points: 3,
  },
  {
    id: "DS-107",
    title: "Write API documentation",
    description:
      "Document authentication, project and task endpoints.",
    status: "Done",
    priority: "Low",
    assignee: "Rahul",
    initials: "RM",
    due: "Sep 14",
    labels: ["Docs", "Backend"],
    points: 3,
  },
  {
    id: "DS-108",
    title: "Setup CI pipeline",
    description:
      "Add automated checks for linting, tests and production builds.",
    status: "Done",
    priority: "Medium",
    assignee: "Kiran",
    initials: "KN",
    due: "Sep 13",
    labels: ["DevOps", "GitHub"],
    points: 5,
  },
];

const COLUMNS = [
  {
    key: "Todo",
    title: "To Do",
    subtitle: "Planned work",
  },
  {
    key: "In Progress",
    title: "In Progress",
    subtitle: "Currently building",
  },
  {
    key: "Review",
    title: "Review",
    subtitle: "Needs attention",
  },
  {
    key: "Done",
    title: "Done",
    subtitle: "Completed work",
  },
];

const PRIORITIES = ["All", "Critical", "High", "Medium", "Low"];

const TEAM = {
  Arjun: "AK",
  Priya: "PS",
  Rahul: "RM",
  Kiran: "KN",
};

const statusStyles = {
  Todo: {
    dot: "bg-slate-400",
    badge: "bg-slate-100 text-slate-600",
  },
  "In Progress": {
    dot: "bg-blue-500",
    badge: "bg-blue-50 text-blue-700",
  },
  Review: {
    dot: "bg-amber-500",
    badge: "bg-amber-50 text-amber-700",
  },
  Done: {
    dot: "bg-emerald-500",
    badge: "bg-emerald-50 text-emerald-700",
  },
};

const priorityStyles = {
  Critical: "bg-red-50 text-red-700 border-red-100",
  High: "bg-orange-50 text-orange-700 border-orange-100",
  Medium: "bg-blue-50 text-blue-700 border-blue-100",
  Low: "bg-slate-100 text-slate-600 border-slate-200",
};

function Avatar({ initials, size = "md" }) {
  const sizes = {
    sm: "h-7 w-7 text-[10px]",
    md: "h-8 w-8 text-[11px]",
    lg: "h-10 w-10 text-xs",
  };

  return (
    <div
      className={`${sizes[size]} flex shrink-0 items-center justify-center rounded-full border border-white bg-gradient-to-br from-slate-900 to-slate-600 font-bold text-white shadow-sm`}
    >
      {initials}
    </div>
  );
}

function PriorityBadge({ priority }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[10px] font-bold ${priorityStyles[priority]}`}
    >
      <FiFlag size={10} />
      {priority}
    </span>
  );
}

function TaskCard({ task, onMove }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const currentIndex = COLUMNS.findIndex(
    (column) => column.key === task.status
  );

  const previousColumn =
    currentIndex > 0 ? COLUMNS[currentIndex - 1] : null;

  const nextColumn =
    currentIndex < COLUMNS.length - 1 ? COLUMNS[currentIndex + 1] : null;

  return (
    <article className="group relative rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_5px_18px_rgba(15,23,42,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_12px_28px_rgba(15,23,42,0.08)]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="mb-2 flex items-center gap-2">
            <span className="font-mono text-[10px] font-bold text-slate-400">
              {task.id}
            </span>

            <span
              className={`h-1.5 w-1.5 rounded-full ${statusStyles[task.status].dot}`}
            />
          </div>

          <h3 className="text-sm font-bold leading-5 text-slate-900">
            {task.title}
          </h3>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <FiMoreHorizontal size={16} />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-8 z-30 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white p-1 shadow-xl">
              {previousColumn && (
                <button
                  type="button"
                  onClick={() => {
                    onMove(task.id, previousColumn.key);
                    setMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  <FiArrowLeft size={13} />
                  Move to {previousColumn.title}
                </button>
              )}

              {nextColumn && (
                <button
                  type="button"
                  onClick={() => {
                    onMove(task.id, nextColumn.key);
                    setMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  <FiArrowRight size={13} />
                  Move to {nextColumn.title}
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">
        {task.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {task.labels.map((label) => (
          <span
            key={label}
            className="rounded-md bg-slate-50 px-2 py-1 text-[10px] font-semibold text-slate-500"
          >
            #{label}
          </span>
        ))}
      </div>

      <div className="my-4 h-px bg-slate-100" />

      <div className="flex items-center justify-between gap-3">
        <PriorityBadge priority={task.priority} />

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-400">
            <FiCalendar size={11} />
            {task.due}
          </div>

          <Avatar initials={task.initials} size="sm" />
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-[10px] font-medium text-slate-400">
          {task.assignee}
        </span>

        <span className="rounded-md bg-slate-100 px-1.5 py-1 font-mono text-[10px] font-bold text-slate-500">
          {task.points} pts
        </span>
      </div>
    </article>
  );
}

function AddTaskModal({ onClose, onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [assignee, setAssignee] = useState("Arjun");
  const [status, setStatus] = useState("Todo");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim()) return;

    onAdd({
      title: title.trim(),
      description:
        description.trim() || "New task added to the DevSync project.",
      priority,
      assignee,
      status,
      initials: TEAM[assignee],
      due: "Sep 22",
      labels: ["New"],
      points: 3,
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/30 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
              New task
            </p>
            <h2 className="mt-1 text-xl font-black text-slate-900">
              Create a task
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <FiX size={19} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <div>
            <label className="mb-2 block text-xs font-bold text-slate-700">
              Task title
            </label>

            <input
              autoFocus
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="e.g. Implement project notifications"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold text-slate-700">
              Description
            </label>

            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="What needs to be completed?"
              rows={3}
              className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-2 block text-xs font-bold text-slate-700">
                Status
              </label>

              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs font-semibold text-slate-700 outline-none"
              >
                {COLUMNS.map((column) => (
                  <option key={column.key} value={column.key}>
                    {column.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold text-slate-700">
                Priority
              </label>

              <select
                value={priority}
                onChange={(event) => setPriority(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs font-semibold text-slate-700 outline-none"
              >
                {PRIORITIES.filter((item) => item !== "All").map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold text-slate-700">
                Assignee
              </label>

              <select
                value={assignee}
                onChange={(event) => setAssignee(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs font-semibold text-slate-700 outline-none"
              >
                {Object.keys(TEAM).map((person) => (
                  <option key={person}>{person}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-4 py-2.5 text-sm font-bold text-slate-500 transition hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-slate-800"
            >
              <FiPlus size={16} />
              Create task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function TaskBoard() {
  const { projectId = "devsync" } = useParams();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("All");
  const [assignee, setAssignee] = useState("All");
  const [view, setView] = useState("board");
  const [showFilters, setShowFilters] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const filteredTasks = useMemo(() => {
    const query = search.trim().toLowerCase();

    return tasks.filter((task) => {
      const matchesSearch =
        !query ||
        task.title.toLowerCase().includes(query) ||
        task.id.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query) ||
        task.labels.some((label) => label.toLowerCase().includes(query));

      const matchesPriority =
        priority === "All" || task.priority === priority;

      const matchesAssignee =
        assignee === "All" || task.assignee === assignee;

      return matchesSearch && matchesPriority && matchesAssignee;
    });
  }, [tasks, search, priority, assignee]);

  const completedCount = tasks.filter(
    (task) => task.status === "Done"
  ).length;

  const progress = Math.round((completedCount / tasks.length) * 100);

  const totalPoints = tasks.reduce((sum, task) => sum + task.points, 0);

  const completedPoints = tasks
    .filter((task) => task.status === "Done")
    .reduce((sum, task) => sum + task.points, 0);

  const handleMove = (taskId, nextStatus) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === taskId ? { ...task, status: nextStatus } : task
      )
    );
  };

  const handleAddTask = (newTask) => {
    setTasks((current) => [
      ...current,
      {
        ...newTask,
        id: `DS-${109 + current.length - INITIAL_TASKS.length}`,
      },
    ]);

    setShowModal(false);
  };

  const clearFilters = () => {
    setSearch("");
    setPriority("All");
    setAssignee("All");
  };

  return (
    <div className="min-h-full bg-[#f7f9fc] text-slate-900">
      {/* Top project context */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1700px] px-5 py-5 sm:px-7 lg:px-9">
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

                <span className="text-slate-700">Tasks</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-950/10">
                  <FiLayers size={20} />
                </div>

                <div className="min-w-0">
                  <h1 className="truncate text-2xl font-black tracking-tight text-slate-950">
                    Task Board
                  </h1>

                  <p className="mt-0.5 text-xs font-medium text-slate-500">
                    Plan, prioritize and ship work together.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  navigate(`/demo/project/${projectId}`)
                }
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
              >
                <FiArrowLeft size={14} />
                Overview
              </button>

              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                <FiPlus size={15} />
                Add task
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-[1700px] px-5 py-6 sm:px-7 lg:px-9">
        {/* Stats */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                  Total tasks
                </p>

                <p className="mt-2 text-2xl font-black text-slate-950">
                  {tasks.length}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <FiCheck size={18} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                  Completed
                </p>

                <p className="mt-2 text-2xl font-black text-slate-950">
                  {completedCount}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <FiCheck size={18} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                  Progress
                </p>

                <p className="mt-2 text-2xl font-black text-slate-950">
                  {progress}%
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <FiZap size={18} />
              </div>
            </div>

            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-slate-950 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                  Story points
                </p>

                <p className="mt-2 text-2xl font-black text-slate-950">
                  {completedPoints}
                  <span className="ml-1 text-sm font-bold text-slate-400">
                    / {totalPoints}
                  </span>
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                <FiGitBranch size={18} />
              </div>
            </div>
          </div>
        </section>

        {/* Toolbar */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-1 flex-col gap-3 sm:flex-row">
              <div className="relative min-w-0 flex-1 sm:max-w-md">
                <FiSearch
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  size={16}
                />

                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search tasks, labels or IDs..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-xs font-semibold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-50"
                />
              </div>

              <button
                type="button"
                onClick={() => setShowFilters((value) => !value)}
                className={`inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-bold transition ${
                  showFilters || priority !== "All" || assignee !== "All"
                    ? "border-blue-200 bg-blue-50 text-blue-700"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                <FiFilter size={14} />
                Filters

                {(priority !== "All" || assignee !== "All") && (
                  <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-600 px-1 text-[9px] text-white">
                    {Number(priority !== "All") +
                      Number(assignee !== "All")}
                  </span>
                )}
              </button>
            </div>

            <div className="flex items-center justify-between gap-2">
              <div className="hidden items-center gap-1 rounded-xl bg-slate-100 p-1 sm:flex">
                <button
                  type="button"
                  onClick={() => setView("board")}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-[11px] font-bold transition ${
                    view === "board"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-400 hover:text-slate-700"
                  }`}
                >
                  <FiGrid size={13} />
                  Board
                </button>

                <button
                  type="button"
                  onClick={() => setView("list")}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-[11px] font-bold transition ${
                    view === "list"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-400 hover:text-slate-700"
                  }`}
                >
                  <FiList size={13} />
                  List
                </button>
              </div>

              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
              >
                <FiPlus size={15} />
                New task
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="mt-3 grid gap-3 border-t border-slate-100 pt-3 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Priority
                </label>

                <div className="relative">
                  <FiFlag
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={13}
                  />

                  <select
                    value={priority}
                    onChange={(event) => setPriority(event.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-8 text-xs font-bold text-slate-700 outline-none"
                  >
                    {PRIORITIES.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>

                  <FiChevronDown
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={13}
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Assignee
                </label>

                <div className="relative">
                  <FiUsers
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={13}
                  />

                  <select
                    value={assignee}
                    onChange={(event) => setAssignee(event.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-8 text-xs font-bold text-slate-700 outline-none"
                  >
                    <option>All</option>
                    {Object.keys(TEAM).map((person) => (
                      <option key={person}>{person}</option>
                    ))}
                  </select>

                  <FiChevronDown
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={13}
                  />
                </div>
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2.5 text-xs font-bold text-slate-500 transition hover:bg-slate-50 hover:text-slate-800"
                >
                  <FiSliders size={13} />
                  Clear filters
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Active filter summary */}
        {(search || priority !== "All" || assignee !== "All") && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Showing
            </span>

            <span className="rounded-full bg-slate-900 px-2.5 py-1 text-[10px] font-bold text-white">
              {filteredTasks.length} tasks
            </span>

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-bold text-slate-600"
              >
                Search: {search}
                <FiX size={11} />
              </button>
            )}

            {priority !== "All" && (
              <button
                type="button"
                onClick={() => setPriority("All")}
                className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-bold text-slate-600"
              >
                Priority: {priority}
                <FiX size={11} />
              </button>
            )}

            {assignee !== "All" && (
              <button
                type="button"
                onClick={() => setAssignee("All")}
                className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-bold text-slate-600"
              >
                Assignee: {assignee}
                <FiX size={11} />
              </button>
            )}
          </div>
        )}

        {/* Board */}
        {view === "board" ? (
          <section className="mt-5 grid gap-4 xl:grid-cols-4">
            {COLUMNS.map((column) => {
              const columnTasks = filteredTasks.filter(
                (task) => task.status === column.key
              );

              return (
                <div
                  key={column.key}
                  className="min-w-0 rounded-2xl border border-slate-200 bg-slate-100/70 p-3"
                >
                  <div className="mb-3 flex items-center justify-between px-1">
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`h-2 w-2 rounded-full ${statusStyles[column.key].dot}`}
                        />

                        <h2 className="text-xs font-black text-slate-800">
                          {column.title}
                        </h2>

                        <span className="rounded-md bg-white px-1.5 py-0.5 text-[10px] font-black text-slate-400">
                          {columnTasks.length}
                        </span>
                      </div>

                      <p className="mt-1 pl-4 text-[9px] font-medium text-slate-400">
                        {column.subtitle}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setShowModal(true);
                      }}
                      className="rounded-lg p-1.5 text-slate-400 transition hover:bg-white hover:text-slate-700"
                    >
                      <FiPlus size={15} />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {columnTasks.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onMove={handleMove}
                      />
                    ))}

                    {columnTasks.length === 0 && (
                      <div className="flex min-h-32 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/50 px-4 text-center">
                        <FiLayers
                          size={18}
                          className="mb-2 text-slate-300"
                        />

                        <p className="text-[10px] font-bold text-slate-400">
                          No tasks here
                        </p>

                        <button
                          type="button"
                          onClick={() => setShowModal(true)}
                          className="mt-2 text-[10px] font-bold text-blue-600 hover:text-blue-700"
                        >
                          Add task
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </section>
        ) : (
          /* List view */
          <section className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="hidden grid-cols-[90px_minmax(260px,1fr)_140px_120px_120px_100px] gap-4 border-b border-slate-100 bg-slate-50 px-5 py-3 text-[10px] font-black uppercase tracking-wider text-slate-400 lg:grid">
              <span>ID</span>
              <span>Task</span>
              <span>Status</span>
              <span>Priority</span>
              <span>Assignee</span>
              <span>Due</span>
            </div>

            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className="grid gap-3 border-b border-slate-100 px-5 py-4 transition last:border-b-0 hover:bg-slate-50 lg:grid-cols-[90px_minmax(260px,1fr)_140px_120px_120px_100px] lg:items-center"
              >
                <span className="font-mono text-[10px] font-bold text-slate-400">
                  {task.id}
                </span>

                <div>
                  <p className="text-xs font-bold text-slate-900">
                    {task.title}
                  </p>

                  <p className="mt-1 line-clamp-1 text-[10px] text-slate-400">
                    {task.description}
                  </p>
                </div>

                <span
                  className={`w-fit rounded-full px-2.5 py-1 text-[10px] font-bold ${statusStyles[task.status].badge}`}
                >
                  {task.status}
                </span>

                <PriorityBadge priority={task.priority} />

                <div className="flex items-center gap-2">
                  <Avatar initials={task.initials} size="sm" />

                  <span className="text-[10px] font-semibold text-slate-600">
                    {task.assignee}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-400">
                  <FiCalendar size={11} />
                  {task.due}
                </div>
              </div>
            ))}

            {filteredTasks.length === 0 && (
              <div className="flex min-h-60 flex-col items-center justify-center px-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                  <FiSearch size={20} />
                </div>

                <h3 className="mt-4 text-sm font-black text-slate-800">
                  No matching tasks
                </h3>

                <p className="mt-1 max-w-sm text-xs leading-5 text-slate-400">
                  Try changing your search or filters to find what you are
                  looking for.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-4 rounded-xl bg-slate-950 px-4 py-2 text-xs font-bold text-white"
                >
                  Clear filters
                </button>
              </div>
            )}
          </section>
        )}

        {/* Bottom project navigation */}
        <section className="mt-6 overflow-hidden rounded-3xl bg-slate-950 p-6 text-white shadow-xl shadow-slate-950/10 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-blue-300">
                <FiCode size={15} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                  DevSync workspace
                </span>
              </div>

              <h2 className="text-xl font-black tracking-tight sm:text-2xl">
                Keep the team moving.
              </h2>

              <p className="mt-2 max-w-xl text-xs leading-5 text-slate-400">
                Switch between tasks, team collaboration, project chat and
                activity without leaving the workspace.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                to={`/demo/project/${projectId}/team`}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-white/10"
              >
                <FiUsers size={14} />
                Team
              </Link>

              <Link
                to={`/demo/project/${projectId}/chat`}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-white/10"
              >
                <FiMessageCircle size={14} />
                Chat
              </Link>

              <Link
                to={`/demo/project/${projectId}/activity`}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-slate-950 transition hover:bg-slate-100"
              >
                <FiClock size={14} />
                Activity
              </Link>
            </div>
          </div>
        </section>
      </main>

      {showModal && (
        <AddTaskModal
          onClose={() => setShowModal(false)}
          onAdd={handleAddTask}
        />
      )}
    </div>
  );
}