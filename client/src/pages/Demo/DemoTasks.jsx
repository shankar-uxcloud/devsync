import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaCalendarAlt,
  FaCheck,
  FaCheckCircle,
  FaChevronDown,
  FaClock,
  FaCodeBranch,
  FaEllipsisH,
  FaFilter,
  FaFlag,
  FaFolderOpen,
  FaPlus,
  FaSearch,
  FaTasks,
  FaTimes,
  FaUser,
  FaUsers,
} from "react-icons/fa";

/* =========================================================
   DEMO TASK DATA
========================================================= */

const INITIAL_TASKS = [
  {
    id: "DS-142",
    title: "Implement real-time project notifications",
    description:
      "Add Socket.IO based notifications for task updates, mentions and project activity.",
    project: "DevSync",
    projectId: "devsync",
    status: "In Progress",
    priority: "High",
    assignee: "Alex Morgan",
    initials: "AM",
    due: "Sep 18, 2026",
    labels: ["Backend", "Socket.IO"],
    comments: 8,
    progress: 65,
  },
  {
    id: "DS-138",
    title: "Improve project dashboard performance",
    description:
      "Optimize dashboard rendering and reduce unnecessary API requests.",
    project: "DevSync",
    projectId: "devsync",
    status: "Review",
    priority: "High",
    assignee: "Priya Sharma",
    initials: "PS",
    due: "Sep 19, 2026",
    labels: ["Performance", "React"],
    comments: 5,
    progress: 90,
  },
  {
    id: "DS-135",
    title: "Create onboarding experience",
    description:
      "Build the first-time user onboarding flow for new workspace members.",
    project: "DevSync",
    projectId: "devsync",
    status: "Todo",
    priority: "Medium",
    assignee: "Rahul Kumar",
    initials: "RK",
    due: "Sep 22, 2026",
    labels: ["UI", "Onboarding"],
    comments: 3,
    progress: 0,
  },
  {
    id: "ST-084",
    title: "Connect Supabase authentication",
    description:
      "Connect the authentication flow with Supabase and handle session state.",
    project: "SkillTree",
    projectId: "skilltree",
    status: "In Progress",
    priority: "High",
    assignee: "Priya Sharma",
    initials: "PS",
    due: "Sep 20, 2026",
    labels: ["Auth", "Supabase"],
    comments: 11,
    progress: 55,
  },
  {
    id: "ST-079",
    title: "Design skill discovery cards",
    description:
      "Create responsive cards for technical skill categories and recommendations.",
    project: "SkillTree",
    projectId: "skilltree",
    status: "Done",
    priority: "Medium",
    assignee: "Alex Morgan",
    initials: "AM",
    due: "Sep 12, 2026",
    labels: ["Design", "Frontend"],
    comments: 6,
    progress: 100,
  },
  {
    id: "FH-041",
    title: "Build distraction-free reading mode",
    description:
      "Implement focus mode with typography controls and distraction blocking.",
    project: "FocusHub",
    projectId: "focushub",
    status: "Todo",
    priority: "Medium",
    assignee: "Rahul Kumar",
    initials: "RK",
    due: "Sep 26, 2026",
    labels: ["Frontend", "UX"],
    comments: 4,
    progress: 0,
  },
  {
    id: "EL-018",
    title: "Add waste pickup location map",
    description:
      "Integrate map-based pickup locations for the EcoLoop marketplace.",
    project: "EcoLoop",
    projectId: "ecoloop",
    status: "Blocked",
    priority: "Critical",
    assignee: "Aarav Patel",
    initials: "AP",
    due: "Sep 17, 2026",
    labels: ["Maps", "API"],
    comments: 14,
    progress: 30,
  },
  {
    id: "DS-126",
    title: "Write API documentation",
    description:
      "Document authentication, project, task and collaboration APIs.",
    project: "DevSync",
    projectId: "devsync",
    status: "Done",
    priority: "Low",
    assignee: "Alex Morgan",
    initials: "AM",
    due: "Sep 10, 2026",
    labels: ["Docs", "API"],
    comments: 2,
    progress: 100,
  },
];

/* =========================================================
   STATUS CONFIG
========================================================= */

const STATUS_CONFIG = {
  Todo: {
    color: "#64748b",
    background: "#f8fafc",
    border: "#e2e8f0",
  },

  "In Progress": {
    color: "#2563eb",
    background: "#eff6ff",
    border: "#bfdbfe",
  },

  Review: {
    color: "#7c3aed",
    background: "#f5f3ff",
    border: "#ddd6fe",
  },

  Done: {
    color: "#059669",
    background: "#ecfdf5",
    border: "#a7f3d0",
  },

  Blocked: {
    color: "#dc2626",
    background: "#fef2f2",
    border: "#fecaca",
  },
};

/* =========================================================
   PRIORITY CONFIG
========================================================= */

const PRIORITY_CONFIG = {
  Critical: {
    color: "#dc2626",
    background: "#fef2f2",
  },

  High: {
    color: "#ea580c",
    background: "#fff7ed",
  },

  Medium: {
    color: "#ca8a04",
    background: "#fefce8",
  },

  Low: {
    color: "#64748b",
    background: "#f8fafc",
  },
};

/* =========================================================
   HELPERS
========================================================= */

function Avatar({ initials, small = false }) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full font-black text-white ${
        small ? "h-8 w-8 text-[9px]" : "h-9 w-9 text-[10px]"
      }`}
      style={{
        background:
          "linear-gradient(135deg, var(--demo-primary, #2563eb), #7c3aed)",
      }}
    >
      {initials}
    </div>
  );
}

function StatusBadge({ status }) {
  const config =
    STATUS_CONFIG[status] || STATUS_CONFIG.Todo;

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-black"
      style={{
        color: config.color,
        background: config.background,
        borderColor: config.border,
      }}
    >
      {status === "Done" ? (
        <FaCheckCircle />
      ) : status === "Blocked" ? (
        <FaTimes />
      ) : (
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: config.color }}
        />
      )}

      {status}
    </span>
  );
}

function PriorityBadge({ priority }) {
  const config =
    PRIORITY_CONFIG[priority] ||
    PRIORITY_CONFIG.Low;

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[10px] font-black"
      style={{
        color: config.color,
        background: config.background,
      }}
    >
      <FaFlag className="text-[8px]" />
      {priority}
    </span>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function DemoTasks() {
  const navigate = useNavigate();

  const [tasks, setTasks] =
    useState(INITIAL_TASKS);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [priority, setPriority] = useState("All");
  const [project, setProject] = useState("All");
  const [assignee, setAssignee] = useState("All");
  const [view, setView] = useState("list");

  const [selectedTask, setSelectedTask] =
    useState(null);

  const [showFilters, setShowFilters] =
    useState(false);

  const [showCreate, setShowCreate] =
    useState(false);

  const [newTask, setNewTask] = useState({
    title: "",
    project: "DevSync",
    priority: "Medium",
  });

  /* =======================================================
     FILTER
  ======================================================= */

  const filteredTasks = useMemo(() => {
    const query = search.trim().toLowerCase();

    return tasks.filter((task) => {
      const matchesSearch =
        !query ||
        task.id.toLowerCase().includes(query) ||
        task.title.toLowerCase().includes(query) ||
        task.description
          .toLowerCase()
          .includes(query) ||
        task.project
          .toLowerCase()
          .includes(query) ||
        task.labels.some((label) =>
          label.toLowerCase().includes(query)
        );

      const matchesStatus =
        status === "All" ||
        task.status === status;

      const matchesPriority =
        priority === "All" ||
        task.priority === priority;

      const matchesProject =
        project === "All" ||
        task.project === project;

      const matchesAssignee =
        assignee === "All" ||
        task.assignee === assignee;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority &&
        matchesProject &&
        matchesAssignee
      );
    });
  }, [
    tasks,
    search,
    status,
    priority,
    project,
    assignee,
  ]);

  /* =======================================================
     STATS
  ======================================================= */

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Done"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const blockedTasks = tasks.filter(
    (task) => task.status === "Blocked"
  ).length;

  const completionRate = Math.round(
    (completedTasks / totalTasks) * 100
  );

  /* =======================================================
     CREATE TASK
  ======================================================= */

  const handleCreateTask = (event) => {
    event.preventDefault();

    if (!newTask.title.trim()) {
      return;
    }

    const projectMap = {
      DevSync: "devsync",
      SkillTree: "skilltree",
      FocusHub: "focushub",
      EcoLoop: "ecoloop",
    };

    const task = {
      id: `DEMO-${Math.floor(
        Math.random() * 900 + 100
      )}`,
      title: newTask.title.trim(),
      description:
        "Demo task created inside the public DevSync workspace.",
      project: newTask.project,
      projectId:
        projectMap[newTask.project] || "devsync",
      status: "Todo",
      priority: newTask.priority,
      assignee: "Alex Morgan",
      initials: "AM",
      due: "Oct 05, 2026",
      labels: ["Demo"],
      comments: 0,
      progress: 0,
    };

    setTasks((current) => [task, ...current]);

    setNewTask({
      title: "",
      project: "DevSync",
      priority: "Medium",
    });

    setShowCreate(false);
  };

  /* =======================================================
     CLEAR FILTERS
  ======================================================= */

  const clearFilters = () => {
    setSearch("");
    setStatus("All");
    setPriority("All");
    setProject("All");
    setAssignee("All");
  };

  return (
    <div
      className="min-h-full"
      style={{
        background:
          "var(--demo-page, #f8fafc)",
        color:
          "var(--demo-text, #0f172a)",
      }}
    >
      {/* ===================================================
          HEADER
      =================================================== */}

      <section
        className="border-b"
        style={{
          background:
            "var(--demo-surface, #ffffff)",
          borderColor:
            "var(--demo-border, #e2e8f0)",
        }}
      >
        <div className="mx-auto max-w-[1500px] px-5 py-7 sm:px-8">
          {/* Breadcrumb */}

          <div className="flex items-center gap-2 text-xs font-semibold">
            <span
              style={{
                color:
                  "var(--demo-text-soft, #94a3b8)",
              }}
            >
              Workspace
            </span>

            <span
              style={{
                color:
                  "var(--demo-text-soft, #94a3b8)",
              }}
            >
              /
            </span>

            <span
              style={{
                color:
                  "var(--demo-text, #0f172a)",
              }}
            >
              Tasks
            </span>
          </div>

          {/* Heading */}

          <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex items-center gap-3">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg"
                style={{
                  background:
                    "linear-gradient(135deg, var(--demo-primary, #2563eb), #6366f1)",
                }}
              >
                <FaTasks />
              </div>

              <div>
                <h1
                  className="text-3xl font-black tracking-tight"
                  style={{
                    color:
                      "var(--demo-text, #0f172a)",
                  }}
                >
                  Tasks
                </h1>

                <p
                  className="mt-1 text-sm"
                  style={{
                    color:
                      "var(--demo-text-muted, #64748b)",
                  }}
                >
                  Plan, prioritize and ship work
                  across your workspace.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                setShowCreate(true)
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5"
              style={{
                background:
                  "linear-gradient(135deg, var(--demo-primary, #2563eb), #6366f1)",
              }}
            >
              <FaPlus />
              Add task
            </button>
          </div>

          {/* Stats */}

          <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div
              className="rounded-2xl border p-4"
              style={{
                background:
                  "var(--demo-surface-soft, #f8fafc)",
                borderColor:
                  "var(--demo-border, #e2e8f0)",
              }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="text-[10px] font-black uppercase tracking-wider"
                  style={{
                    color:
                      "var(--demo-text-soft, #94a3b8)",
                  }}
                >
                  Total tasks
                </span>

                <FaTasks
                  className="text-sm"
                  style={{
                    color:
                      "var(--demo-primary, #2563eb)",
                  }}
                />
              </div>

              <p
                className="mt-2 text-2xl font-black"
                style={{
                  color:
                    "var(--demo-text, #0f172a)",
                }}
              >
                {totalTasks}
              </p>
            </div>

            <div
              className="rounded-2xl border p-4"
              style={{
                background:
                  "var(--demo-surface-soft, #f8fafc)",
                borderColor:
                  "var(--demo-border, #e2e8f0)",
              }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="text-[10px] font-black uppercase tracking-wider"
                  style={{
                    color:
                      "var(--demo-text-soft, #94a3b8)",
                  }}
                >
                  Completed
                </span>

                <FaCheckCircle
                  className="text-sm"
                  style={{
                    color: "#059669",
                  }}
                />
              </div>

              <p
                className="mt-2 text-2xl font-black"
                style={{
                  color:
                    "var(--demo-text, #0f172a)",
                }}
              >
                {completedTasks}
              </p>
            </div>

            <div
              className="rounded-2xl border p-4"
              style={{
                background:
                  "var(--demo-surface-soft, #f8fafc)",
                borderColor:
                  "var(--demo-border, #e2e8f0)",
              }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="text-[10px] font-black uppercase tracking-wider"
                  style={{
                    color:
                      "var(--demo-text-soft, #94a3b8)",
                  }}
                >
                  In progress
                </span>

                <FaClock
                  className="text-sm"
                  style={{
                    color: "#2563eb",
                  }}
                />
              </div>

              <p
                className="mt-2 text-2xl font-black"
                style={{
                  color:
                    "var(--demo-text, #0f172a)",
                }}
              >
                {inProgressTasks}
              </p>
            </div>

            <div
              className="rounded-2xl border p-4"
              style={{
                background:
                  "var(--demo-surface-soft, #f8fafc)",
                borderColor:
                  "var(--demo-border, #e2e8f0)",
              }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="text-[10px] font-black uppercase tracking-wider"
                  style={{
                    color:
                      "var(--demo-text-soft, #94a3b8)",
                  }}
                >
                  Completion
                </span>

                <span
                  className="text-sm font-black"
                  style={{
                    color:
                      "var(--demo-primary, #2563eb)",
                  }}
                >
                  {completionRate}%
                </span>
              </div>

              <div
                className="mt-3 h-2 overflow-hidden rounded-full"
                style={{
                  background:
                    "var(--demo-border, #e2e8f0)",
                }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${completionRate}%`,
                    background:
                      "linear-gradient(90deg, var(--demo-primary, #2563eb), #8b5cf6)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          TOOLBAR
      =================================================== */}

      <section className="mx-auto max-w-[1500px] px-5 pt-6 sm:px-8">
        <div
          className="rounded-2xl border p-3"
          style={{
            background:
              "var(--demo-surface, #ffffff)",
            borderColor:
              "var(--demo-border, #e2e8f0)",
          }}
        >
          <div className="flex flex-col gap-3 lg:flex-row">
            {/* Search */}

            <div className="relative flex-1">
              <FaSearch
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xs"
                style={{
                  color:
                    "var(--demo-text-soft, #94a3b8)",
                }}
              />

              <input
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search tasks, labels or IDs..."
                className="w-full rounded-xl border bg-transparent py-3 pl-10 pr-4 text-sm outline-none"
                style={{
                  color:
                    "var(--demo-text, #0f172a)",
                  borderColor:
                    "var(--demo-border, #e2e8f0)",
                }}
              />
            </div>

            {/* Filter button */}

            <button
              type="button"
              onClick={() =>
                setShowFilters(
                  (current) => !current
                )
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-bold"
              style={{
                color:
                  "var(--demo-text-muted, #64748b)",
                borderColor:
                  "var(--demo-border, #e2e8f0)",
                background:
                  showFilters
                    ? "var(--demo-primary-soft, #eff6ff)"
                    : "transparent",
              }}
            >
              <FaFilter />
              Filters
            </button>

            {/* View */}

            <div
              className="flex rounded-xl border p-1"
              style={{
                borderColor:
                  "var(--demo-border, #e2e8f0)",
              }}
            >
              <button
                type="button"
                onClick={() =>
                  setView("list")
                }
                className="rounded-lg px-4 py-2 text-xs font-black"
                style={{
                  background:
                    view === "list"
                      ? "var(--demo-primary-soft, #eff6ff)"
                      : "transparent",
                  color:
                    view === "list"
                      ? "var(--demo-primary, #2563eb)"
                      : "var(--demo-text-muted, #64748b)",
                }}
              >
                List
              </button>

              <button
                type="button"
                onClick={() =>
                  setView("board")
                }
                className="rounded-lg px-4 py-2 text-xs font-black"
                style={{
                  background:
                    view === "board"
                      ? "var(--demo-primary-soft, #eff6ff)"
                      : "transparent",
                  color:
                    view === "board"
                      ? "var(--demo-primary, #2563eb)"
                      : "var(--demo-text-muted, #64748b)",
                }}
              >
                Board
              </button>
            </div>
          </div>

          {/* =================================================
              FILTER PANEL
          ================================================= */}

          {showFilters && (
            <div
              className="mt-3 grid gap-3 border-t pt-3 sm:grid-cols-2 xl:grid-cols-4"
              style={{
                borderColor:
                  "var(--demo-border, #e2e8f0)",
              }}
            >
              {/* Status */}

              <FilterSelect
                label="Status"
                value={status}
                onChange={setStatus}
                options={[
                  "All",
                  "Todo",
                  "In Progress",
                  "Review",
                  "Done",
                  "Blocked",
                ]}
              />

              {/* Priority */}

              <FilterSelect
                label="Priority"
                value={priority}
                onChange={setPriority}
                options={[
                  "All",
                  "Critical",
                  "High",
                  "Medium",
                  "Low",
                ]}
              />

              {/* Project */}

              <FilterSelect
                label="Project"
                value={project}
                onChange={setProject}
                options={[
                  "All",
                  "DevSync",
                  "SkillTree",
                  "FocusHub",
                  "EcoLoop",
                ]}
              />

              {/* Assignee */}

              <FilterSelect
                label="Assignee"
                value={assignee}
                onChange={setAssignee}
                options={[
                  "All",
                  "Alex Morgan",
                  "Priya Sharma",
                  "Rahul Kumar",
                  "Aarav Patel",
                ]}
              />

              <button
                type="button"
                onClick={clearFilters}
                className="rounded-xl px-4 py-3 text-xs font-black sm:col-span-2 xl:col-span-4"
                style={{
                  color:
                    "var(--demo-primary, #2563eb)",
                  background:
                    "var(--demo-primary-soft, #eff6ff)",
                }}
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ===================================================
          RESULTS
      =================================================== */}

      <section className="mx-auto max-w-[1500px] px-5 pb-10 pt-5 sm:px-8">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p
              className="text-sm font-black"
              style={{
                color:
                  "var(--demo-text, #0f172a)",
              }}
            >
              {filteredTasks.length} tasks
            </p>

            <p
              className="mt-0.5 text-xs"
              style={{
                color:
                  "var(--demo-text-soft, #94a3b8)",
              }}
            >
              Across your demo workspace
            </p>
          </div>

          {blockedTasks > 0 && (
            <div
              className="hidden items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-black sm:flex"
              style={{
                color: "#dc2626",
                background: "#fef2f2",
              }}
            >
              <FaTimes />
              {blockedTasks} blocked
            </div>
          )}
        </div>

        {filteredTasks.length === 0 ? (
          <div
            className="rounded-2xl border px-6 py-20 text-center"
            style={{
              background:
                "var(--demo-surface, #ffffff)",
              borderColor:
                "var(--demo-border, #e2e8f0)",
            }}
          >
            <div
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl"
              style={{
                background:
                  "var(--demo-surface-soft, #f8fafc)",
                color:
                  "var(--demo-text-muted, #64748b)",
              }}
            >
              <FaSearch />
            </div>

            <h3
              className="mt-4 text-lg font-black"
              style={{
                color:
                  "var(--demo-text, #0f172a)",
              }}
            >
              No tasks found
            </h3>

            <p
              className="mt-2 text-sm"
              style={{
                color:
                  "var(--demo-text-muted, #64748b)",
              }}
            >
              Try changing your search or filters.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 rounded-xl px-4 py-2.5 text-xs font-black text-white"
              style={{
                background:
                  "var(--demo-primary, #2563eb)",
              }}
            >
              Reset filters
            </button>
          </div>
        ) : view === "list" ? (
          <TaskList
            tasks={filteredTasks}
            onSelect={setSelectedTask}
            onOpenProject={(projectId) =>
              navigate(
                `/demo/project/${projectId}/tasks`
              )
            }
          />
        ) : (
          <TaskBoardView
            tasks={filteredTasks}
            onSelect={setSelectedTask}
          />
        )}
      </section>

      {/* ===================================================
          TASK DETAILS MODAL
      =================================================== */}

      {selectedTask && (
        <TaskDetailsModal
          task={selectedTask}
          onClose={() =>
            setSelectedTask(null)
          }
          onOpenProject={() =>
            navigate(
              `/demo/project/${selectedTask.projectId}/tasks`
            )
          }
        />
      )}

      {/* ===================================================
          CREATE TASK MODAL
      =================================================== */}

      {showCreate && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              setShowCreate(false);
            }
          }}
        >
          <div
            className="w-full max-w-lg rounded-3xl border p-6 shadow-2xl"
            style={{
              background:
                "var(--demo-surface, #ffffff)",
              borderColor:
                "var(--demo-border, #e2e8f0)",
            }}
          >
            <div className="flex items-start justify-between">
              <div>
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl text-white"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--demo-primary, #2563eb), #6366f1)",
                  }}
                >
                  <FaPlus />
                </div>

                <h2
                  className="mt-4 text-xl font-black"
                  style={{
                    color:
                      "var(--demo-text, #0f172a)",
                  }}
                >
                  Create task
                </h2>

                <p
                  className="mt-1 text-sm"
                  style={{
                    color:
                      "var(--demo-text-muted, #64748b)",
                  }}
                >
                  Add a sample task to the public
                  demo workspace.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowCreate(false)
                }
                className="flex h-9 w-9 items-center justify-center rounded-lg"
                style={{
                  color:
                    "var(--demo-text-muted, #64748b)",
                  background:
                    "var(--demo-surface-soft, #f8fafc)",
                }}
              >
                <FaTimes />
              </button>
            </div>

            <form
              onSubmit={handleCreateTask}
              className="mt-6 space-y-4"
            >
              <div>
                <label
                  className="mb-2 block text-xs font-black uppercase tracking-wider"
                  style={{
                    color:
                      "var(--demo-text-soft, #94a3b8)",
                  }}
                >
                  Task title
                </label>

                <input
                  required
                  value={newTask.title}
                  onChange={(event) =>
                    setNewTask((current) => ({
                      ...current,
                      title:
                        event.target.value,
                    }))
                  }
                  placeholder="e.g. Add GitHub integration"
                  className="w-full rounded-xl border px-4 py-3 text-sm outline-none"
                  style={{
                    color:
                      "var(--demo-text, #0f172a)",
                    background:
                      "var(--demo-surface, #ffffff)",
                    borderColor:
                      "var(--demo-border, #e2e8f0)",
                  }}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    className="mb-2 block text-xs font-black uppercase tracking-wider"
                    style={{
                      color:
                        "var(--demo-text-soft, #94a3b8)",
                    }}
                  >
                    Project
                  </label>

                  <select
                    value={newTask.project}
                    onChange={(event) =>
                      setNewTask((current) => ({
                        ...current,
                        project:
                          event.target.value,
                      }))
                    }
                    className="w-full rounded-xl border px-4 py-3 text-sm outline-none"
                    style={{
                      color:
                        "var(--demo-text, #0f172a)",
                      background:
                        "var(--demo-surface, #ffffff)",
                      borderColor:
                        "var(--demo-border, #e2e8f0)",
                    }}
                  >
                    <option>DevSync</option>
                    <option>SkillTree</option>
                    <option>FocusHub</option>
                    <option>EcoLoop</option>
                  </select>
                </div>

                <div>
                  <label
                    className="mb-2 block text-xs font-black uppercase tracking-wider"
                    style={{
                      color:
                        "var(--demo-text-soft, #94a3b8)",
                    }}
                  >
                    Priority
                  </label>

                  <select
                    value={newTask.priority}
                    onChange={(event) =>
                      setNewTask((current) => ({
                        ...current,
                        priority:
                          event.target.value,
                      }))
                    }
                    className="w-full rounded-xl border px-4 py-3 text-sm outline-none"
                    style={{
                      color:
                        "var(--demo-text, #0f172a)",
                      background:
                        "var(--demo-surface, #ffffff)",
                      borderColor:
                        "var(--demo-border, #e2e8f0)",
                    }}
                  >
                    <option>Critical</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() =>
                    setShowCreate(false)
                  }
                  className="flex-1 rounded-xl border px-4 py-3 text-sm font-bold"
                  style={{
                    color:
                      "var(--demo-text, #0f172a)",
                    borderColor:
                      "var(--demo-border, #e2e8f0)",
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--demo-primary, #2563eb), #6366f1)",
                  }}
                >
                  <FaCheck />
                  Create task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   FILTER SELECT
========================================================= */

function FilterSelect({
  label,
  value,
  onChange,
  options,
}) {
  return (
    <div>
      <label
        className="mb-1.5 block text-[10px] font-black uppercase tracking-wider"
        style={{
          color:
            "var(--demo-text-soft, #94a3b8)",
        }}
      >
        {label}
      </label>

      <div className="relative">
        <select
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          className="w-full appearance-none rounded-xl border bg-transparent px-3 py-2.5 pr-9 text-xs font-semibold outline-none"
          style={{
            color:
              "var(--demo-text, #0f172a)",
            borderColor:
              "var(--demo-border, #e2e8f0)",
          }}
        >
          {options.map((option) => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          ))}
        </select>

        <FaChevronDown
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[9px]"
          style={{
            color:
              "var(--demo-text-soft, #94a3b8)",
          }}
        />
      </div>
    </div>
  );
}

/* =========================================================
   TASK LIST
========================================================= */

function TaskList({
  tasks,
  onSelect,
  onOpenProject,
}) {
  return (
    <div
      className="overflow-hidden rounded-2xl border"
      style={{
        background:
          "var(--demo-surface, #ffffff)",
        borderColor:
          "var(--demo-border, #e2e8f0)",
      }}
    >
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[1050px] border-collapse">
          <thead>
            <tr
              style={{
                background:
                  "var(--demo-surface-soft, #f8fafc)",
              }}
            >
              {[
                "Task",
                "Project",
                "Status",
                "Priority",
                "Assignee",
                "Due",
                "",
              ].map((heading) => (
                <th
                  key={heading}
                  className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-[0.14em]"
                  style={{
                    color:
                      "var(--demo-text-soft, #94a3b8)",
                  }}
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {tasks.map((task) => (
              <tr
                key={task.id}
                className="border-t transition hover:bg-slate-50/50"
                style={{
                  borderColor:
                    "var(--demo-border, #e2e8f0)",
                }}
              >
                <td className="px-5 py-4">
                  <button
                    type="button"
                    onClick={() =>
                      onSelect(task)
                    }
                    className="max-w-[360px] text-left"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                        style={{
                          background:
                            "var(--demo-primary-soft, #eff6ff)",
                          color:
                            "var(--demo-primary, #2563eb)",
                        }}
                      >
                        <FaTasks className="text-xs" />
                      </div>

                      <div>
                        <p
                          className="text-sm font-black"
                          style={{
                            color:
                              "var(--demo-text, #0f172a)",
                          }}
                        >
                          {task.title}
                        </p>

                        <p
                          className="mt-1 text-[10px] font-bold"
                          style={{
                            color:
                              "var(--demo-text-soft, #94a3b8)",
                          }}
                        >
                          {task.id}
                        </p>
                      </div>
                    </div>
                  </button>
                </td>

                <td className="px-5 py-4">
                  <button
                    type="button"
                    onClick={() =>
                      onOpenProject(
                        task.projectId
                      )
                    }
                    className="inline-flex items-center gap-2 text-xs font-bold"
                    style={{
                      color:
                        "var(--demo-primary, #2563eb)",
                    }}
                  >
                    <FaFolderOpen />
                    {task.project}
                  </button>
                </td>

                <td className="px-5 py-4">
                  <StatusBadge
                    status={task.status}
                  />
                </td>

                <td className="px-5 py-4">
                  <PriorityBadge
                    priority={task.priority}
                  />
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <Avatar
                      initials={task.initials}
                      small
                    />

                    <span
                      className="text-xs font-bold"
                      style={{
                        color:
                          "var(--demo-text-muted, #64748b)",
                      }}
                    >
                      {task.assignee}
                    </span>
                  </div>
                </td>

                <td
                  className="px-5 py-4 text-xs font-semibold"
                  style={{
                    color:
                      "var(--demo-text-muted, #64748b)",
                  }}
                >
                  <span className="inline-flex items-center gap-1.5">
                    <FaCalendarAlt className="text-[9px]" />
                    {task.due}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <button
                    type="button"
                    onClick={() =>
                      onSelect(task)
                    }
                    className="flex h-8 w-8 items-center justify-center rounded-lg"
                    style={{
                      color:
                        "var(--demo-text-muted, #64748b)",
                      background:
                        "var(--demo-surface-soft, #f8fafc)",
                    }}
                  >
                    <FaEllipsisH />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile list */}

      <div className="divide-y md:hidden">
        {tasks.map((task) => (
          <button
            type="button"
            key={task.id}
            onClick={() =>
              onSelect(task)
            }
            className="block w-full p-4 text-left"
            style={{
              borderColor:
                "var(--demo-border, #e2e8f0)",
            }}
          >
            <div className="flex gap-3">
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                style={{
                  background:
                    "var(--demo-primary-soft, #eff6ff)",
                  color:
                    "var(--demo-primary, #2563eb)",
                }}
              >
                <FaTasks />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p
                      className="text-sm font-black"
                      style={{
                        color:
                          "var(--demo-text, #0f172a)",
                      }}
                    >
                      {task.title}
                    </p>

                    <p
                      className="mt-1 text-[10px] font-bold"
                      style={{
                        color:
                          "var(--demo-text-soft, #94a3b8)",
                      }}
                    >
                      {task.id} · {task.project}
                    </p>
                  </div>

                  <StatusBadge
                    status={task.status}
                  />
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <PriorityBadge
                    priority={task.priority}
                  />

                  <span
                    className="inline-flex items-center gap-1 text-[10px]"
                    style={{
                      color:
                        "var(--demo-text-muted, #64748b)",
                    }}
                  >
                    <FaCalendarAlt />
                    {task.due}
                  </span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   BOARD VIEW
========================================================= */

function TaskBoardView({
  tasks,
  onSelect,
}) {
  const columns = [
    "Todo",
    "In Progress",
    "Review",
    "Done",
  ];

  return (
    <div className="grid gap-4 xl:grid-cols-4">
      {columns.map((column) => {
        const columnTasks = tasks.filter(
          (task) => task.status === column
        );

        const config =
          STATUS_CONFIG[column];

        return (
          <div
            key={column}
            className="min-h-[450px] rounded-2xl border p-3"
            style={{
              background:
                "var(--demo-surface-soft, #f8fafc)",
              borderColor:
                "var(--demo-border, #e2e8f0)",
            }}
          >
            <div className="mb-3 flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{
                    background:
                      config.color,
                  }}
                />

                <h3
                  className="text-xs font-black"
                  style={{
                    color:
                      "var(--demo-text, #0f172a)",
                  }}
                >
                  {column}
                </h3>
              </div>

              <span
                className="rounded-full px-2 py-1 text-[9px] font-black"
                style={{
                  color: config.color,
                  background: config.background,
                }}
              >
                {columnTasks.length}
              </span>
            </div>

            <div className="space-y-3">
              {columnTasks.map((task) => (
                <button
                  type="button"
                  key={task.id}
                  onClick={() =>
                    onSelect(task)
                  }
                  className="w-full rounded-xl border p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  style={{
                    background:
                      "var(--demo-surface, #ffffff)",
                    borderColor:
                      "var(--demo-border, #e2e8f0)",
                  }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span
                      className="text-[9px] font-black"
                      style={{
                        color:
                          "var(--demo-text-soft, #94a3b8)",
                      }}
                    >
                      {task.id}
                    </span>

                    <PriorityBadge
                      priority={task.priority}
                    />
                  </div>

                  <h4
                    className="mt-3 text-sm font-black leading-5"
                    style={{
                      color:
                        "var(--demo-text, #0f172a)",
                    }}
                  >
                    {task.title}
                  </h4>

                  <p
                    className="mt-2 line-clamp-2 text-[10px] leading-4"
                    style={{
                      color:
                        "var(--demo-text-muted, #64748b)",
                    }}
                  >
                    {task.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar
                        initials={task.initials}
                        small
                      />

                      <span
                        className="text-[9px] font-bold"
                        style={{
                          color:
                            "var(--demo-text-muted, #64748b)",
                        }}
                      >
                        {task.assignee}
                      </span>
                    </div>

                    <span
                      className="text-[9px] font-bold"
                      style={{
                        color:
                          "var(--demo-text-soft, #94a3b8)",
                      }}
                    >
                      {task.progress}%
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* =========================================================
   TASK DETAILS
========================================================= */

function TaskDetailsModal({
  task,
  onClose,
  onOpenProject,
}) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border shadow-2xl"
        style={{
          background:
            "var(--demo-surface, #ffffff)",
          borderColor:
            "var(--demo-border, #e2e8f0)",
        }}
      >
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span
                className="text-[10px] font-black tracking-wider"
                style={{
                  color:
                    "var(--demo-text-soft, #94a3b8)",
                }}
              >
                {task.id}
              </span>

              <h2
                className="mt-2 text-2xl font-black"
                style={{
                  color:
                    "var(--demo-text, #0f172a)",
                }}
              >
                {task.title}
              </h2>

              <div className="mt-3 flex flex-wrap gap-2">
                <StatusBadge
                  status={task.status}
                />

                <PriorityBadge
                  priority={task.priority}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
              style={{
                color:
                  "var(--demo-text-muted, #64748b)",
                background:
                  "var(--demo-surface-soft, #f8fafc)",
              }}
            >
              <FaTimes />
            </button>
          </div>

          <p
            className="mt-6 text-sm leading-6"
            style={{
              color:
                "var(--demo-text-muted, #64748b)",
            }}
          >
            {task.description}
          </p>

          {/* Progress */}

          <div
            className="mt-6 rounded-2xl border p-4"
            style={{
              borderColor:
                "var(--demo-border, #e2e8f0)",
              background:
                "var(--demo-surface-soft, #f8fafc)",
            }}
          >
            <div className="flex items-center justify-between">
              <span
                className="text-xs font-black"
                style={{
                  color:
                    "var(--demo-text, #0f172a)",
                }}
              >
                Progress
              </span>

              <span
                className="text-sm font-black"
                style={{
                  color:
                    "var(--demo-primary, #2563eb)",
                }}
              >
                {task.progress}%
              </span>
            </div>

            <div
              className="mt-3 h-2 overflow-hidden rounded-full"
              style={{
                background:
                  "var(--demo-border, #e2e8f0)",
              }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: `${task.progress}%`,
                  background:
                    "linear-gradient(90deg, var(--demo-primary, #2563eb), #8b5cf6)",
                }}
              />
            </div>
          </div>

          {/* Information */}

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <InfoItem
              icon={<FaFolderOpen />}
              label="Project"
              value={task.project}
            />

            <InfoItem
              icon={<FaUser />}
              label="Assignee"
              value={task.assignee}
            />

            <InfoItem
              icon={<FaCalendarAlt />}
              label="Due date"
              value={task.due}
            />

            <InfoItem
              icon={<FaUsers />}
              label="Comments"
              value={`${task.comments} comments`}
            />

            <InfoItem
              icon={<FaCodeBranch />}
              label="Workspace"
              value="DevSync Demo"
            />

            <InfoItem
              icon={<FaTasks />}
              label="Task type"
              value="Development"
            />
          </div>

          {/* Labels */}

          <div className="mt-5">
            <p
              className="text-[10px] font-black uppercase tracking-wider"
              style={{
                color:
                  "var(--demo-text-soft, #94a3b8)",
              }}
            >
              Labels
            </p>

            <div className="mt-2 flex flex-wrap gap-2">
              {task.labels.map((label) => (
                <span
                  key={label}
                  className="rounded-lg border px-3 py-1.5 text-[10px] font-bold"
                  style={{
                    color:
                      "var(--demo-text-muted, #64748b)",
                    borderColor:
                      "var(--demo-border, #e2e8f0)",
                    background:
                      "var(--demo-surface-soft, #f8fafc)",
                  }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}

          <div
            className="mt-6 flex flex-col gap-3 border-t pt-5 sm:flex-row"
            style={{
              borderColor:
                "var(--demo-border, #e2e8f0)",
            }}
          >
            <button
              type="button"
              onClick={onOpenProject}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-black text-white"
              style={{
                background:
                  "linear-gradient(135deg, var(--demo-primary, #2563eb), #6366f1)",
              }}
            >
              Open project
              <FaArrowRight />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border px-5 py-3 text-xs font-black"
              style={{
                color:
                  "var(--demo-text, #0f172a)",
                borderColor:
                  "var(--demo-border, #e2e8f0)",
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   INFO ITEM
========================================================= */

function InfoItem({
  icon,
  label,
  value,
}) {
  return (
    <div
      className="flex items-center gap-3 rounded-xl border p-3"
      style={{
        background:
          "var(--demo-surface, #ffffff)",
        borderColor:
          "var(--demo-border, #e2e8f0)",
      }}
    >
      <div
        className="flex h-9 w-9 items-center justify-center rounded-lg"
        style={{
          color:
            "var(--demo-primary, #2563eb)",
          background:
            "var(--demo-primary-soft, #eff6ff)",
        }}
      >
        {icon}
      </div>

      <div>
        <p
          className="text-[9px] font-black uppercase tracking-wider"
          style={{
            color:
              "var(--demo-text-soft, #94a3b8)",
          }}
        >
          {label}
        </p>

        <p
          className="mt-0.5 text-xs font-bold"
          style={{
            color:
              "var(--demo-text, #0f172a)",
          }}
        >
          {value}
        </p>
      </div>
    </div>
  );
}