import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import TaskDetails from "../../components/DemoTasks/TaskDetails";

import {
  FaArrowLeft,
  FaArrowRight,
  FaCalendarAlt,
  FaCheckCircle,
  FaChevronRight,
  FaClock,
  FaCode,
  FaEllipsisH,
  FaFilter,
  FaPlus,
  FaSearch,
  FaTasks,
  FaUser,
  FaUsers,
  FaExclamationTriangle,
} from "react-icons/fa";

/* =========================================================
   INITIAL TASK DATA
========================================================= */

const initialTasks = {
  todo: [
    {
      id: 1,
      title: "Build Chat Integration",
      description:
        "Create the real-time project chat interface.",
      priority: "High",
      assignee: "Rahul Kumar",
      initials: "R",
      due: "Aug 15",
      tags: ["React", "Socket.io"],
    },
    {
      id: 2,
      title: "Create File Upload",
      description:
        "Allow project members to upload and manage files.",
      priority: "Medium",
      assignee: "Emma Wilson",
      initials: "E",
      due: "Aug 17",
      tags: ["Frontend", "Storage"],
    },
    {
      id: 3,
      title: "Notification System",
      description:
        "Design notifications for project activities.",
      priority: "Low",
      assignee: "Priya Sharma",
      initials: "P",
      due: "Aug 20",
      tags: ["UI/UX"],
    },
  ],

  progress: [
    {
      id: 4,
      title: "JWT Authentication",
      description:
        "Implement secure login and authentication flow.",
      priority: "High",
      assignee: "Alex Morgan",
      initials: "A",
      due: "Aug 14",
      tags: ["Node.js", "JWT"],
    },
    {
      id: 5,
      title: "Project API",
      description:
        "Build REST APIs for project management.",
      priority: "High",
      assignee: "Rahul Kumar",
      initials: "R",
      due: "Aug 16",
      tags: ["Express", "MongoDB"],
    },
    {
      id: 6,
      title: "Responsive Navbar",
      description:
        "Make navigation responsive across devices.",
      priority: "Medium",
      assignee: "Emma Wilson",
      initials: "E",
      due: "Aug 15",
      tags: ["Tailwind"],
    },
  ],

  review: [
    {
      id: 7,
      title: "Dashboard UI",
      description:
        "Review the new DevSync dashboard interface.",
      priority: "Medium",
      assignee: "Priya Sharma",
      initials: "P",
      due: "Aug 16",
      tags: ["React", "UI"],
    },
    {
      id: 8,
      title: "Project Overview",
      description:
        "Finalize project overview and statistics.",
      priority: "Low",
      assignee: "Alex Morgan",
      initials: "A",
      due: "Aug 15",
      tags: ["Frontend"],
    },
  ],

  done: [
    {
      id: 9,
      title: "Login Page",
      description:
        "Completed the developer login interface.",
      priority: "Low",
      assignee: "Alex Morgan",
      initials: "A",
      due: "Aug 10",
      tags: ["React"],
    },
    {
      id: 10,
      title: "Registration",
      description:
        "Completed user registration flow.",
      priority: "Medium",
      assignee: "Priya Sharma",
      initials: "P",
      due: "Aug 11",
      tags: ["Auth"],
    },
    {
      id: 11,
      title: "Database Setup",
      description:
        "Configured project database structure.",
      priority: "High",
      assignee: "Rahul Kumar",
      initials: "R",
      due: "Aug 12",
      tags: ["MongoDB"],
    },
  ],
};

/* =========================================================
   COLUMNS
========================================================= */

const columns = [
  {
    id: "todo",
    title: "To Do",
    color: "slate",
  },
  {
    id: "progress",
    title: "In Progress",
    color: "blue",
  },
  {
    id: "review",
    title: "Review",
    color: "purple",
  },
  {
    id: "done",
    title: "Done",
    color: "green",
  },
];

/* =========================================================
   MAIN COMPONENT
========================================================= */

function TaskBoard() {
  const { projectId } = useParams();

  const projectName =
    projectId === "skilltree"
      ? "SkillTree"
      : projectId === "ecoloop"
      ? "EcoLoop"
      : "DevSync";

  const basePath = `/demo/project/${projectId || "devsync"}`;

  const [tasks, setTasks] = useState(initialTasks);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedTask, setSelectedTask] = useState(null);
  const [showNewTask, setShowNewTask] = useState(false);

  /* =======================================================
     FILTER
  ======================================================= */

  const getFilteredTasks = (columnTasks) => {
    return columnTasks.filter((task) => {
      const query = search.toLowerCase();

      const matchesSearch =
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query) ||
        task.assignee.toLowerCase().includes(query) ||
        task.tags.some((tag) =>
          tag.toLowerCase().includes(query)
        );

      const matchesPriority =
        activeFilter === "All" ||
        task.priority === activeFilter;

      return matchesSearch && matchesPriority;
    });
  };

  /* =======================================================
     STATISTICS
  ======================================================= */

  const statistics = useMemo(() => {
    const all = Object.values(tasks).flat();

    return {
      total: all.length,
      todo: tasks.todo.length,
      progress: tasks.progress.length,
      review: tasks.review.length,
      done: tasks.done.length,
      high: all.filter(
        (task) => task.priority === "High"
      ).length,
    };
  }, [tasks]);

  /* =======================================================
     MOVE TASK
  ======================================================= */

  const moveTask = (
    task,
    fromColumn,
    toColumn
  ) => {
    if (fromColumn === toColumn) return;

    setTasks((current) => {
      const source = current[fromColumn].filter(
        (item) => item.id !== task.id
      );

      const destination = [
        {
          ...task,
        },
        ...current[toColumn],
      ];

      return {
        ...current,
        [fromColumn]: source,
        [toColumn]: destination,
      };
    });
  };

  /* =======================================================
     CREATE TASK
  ======================================================= */

  const createTask = (newTask) => {
    setTasks((current) => ({
      ...current,
      todo: [
        {
          ...newTask,
          id: Date.now(),
        },
        ...current.todo,
      ],
    }));

    setShowNewTask(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* ===================================================
          HEADER
      ==================================================== */}

      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">

        <div className="mx-auto flex h-20 max-w-[1800px] items-center justify-between px-5 lg:px-8">

          <div className="flex items-center gap-4">

            <Link
              to={basePath}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
            >
              <FaArrowLeft />
            </Link>

            <div className="hidden text-sm text-slate-400 sm:block">
              {projectName}
              <span className="mx-2">/</span>
            </div>

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <FaTasks />
              </div>

              <div>
                <h1 className="font-black">
                  Tasks
                </h1>

                <p className="text-xs text-slate-500">
                  Development workflow
                </p>
              </div>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <span className="hidden rounded-full bg-blue-50 px-4 py-2 text-xs font-bold text-blue-600 sm:block">
              DEMO MODE
            </span>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 font-bold text-white">
              A
            </div>

          </div>

        </div>

      </header>

     

      {/* ===================================================
          MAIN
      ==================================================== */}

      <main className="mx-auto max-w-[1800px] px-5 py-8 lg:px-8">

        {/* PAGE INTRO */}

        <section className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">

          <div>

            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-blue-600">
              <FaTasks />
              {projectName} Development
            </div>

            <h2 className="text-3xl font-black tracking-tight lg:text-4xl">
              Development Tasks
            </h2>

            <p className="mt-2 max-w-2xl text-slate-500">
              Plan, assign, track and review the work required
              to move your project forward.
            </p>

          </div>

          <button
            onClick={() => setShowNewTask(true)}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-bold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-blue-700"
          >
            <FaPlus />
            New Task
          </button>

        </section>

        {/* =================================================
            STATISTICS
        ================================================== */}

        <section className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">

          <TaskStat
            title="Total Tasks"
            value={statistics.total}
            icon={<FaTasks />}
          />

          <TaskStat
            title="To Do"
            value={statistics.todo}
            icon={<FaClock />}
          />

          <TaskStat
            title="In Progress"
            value={statistics.progress}
            icon={<FaCode />}
          />

          <TaskStat
            title="In Review"
            value={statistics.review}
            icon={<FaUsers />}
          />

          <TaskStat
            title="Completed"
            value={statistics.done}
            icon={<FaCheckCircle />}
          />

        </section>

        {/* =================================================
            TOOLBAR
        ================================================== */}

        <section className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">

          <div className="relative w-full lg:max-w-md">

            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400" />

            <input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search tasks, developers or technologies..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
            />

          </div>

          <div className="flex flex-wrap items-center gap-2">

            <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
              <FaFilter />
              Filter:
            </div>

            {[
              "All",
              "High",
              "Medium",
              "Low",
            ].map((priority) => (
              <button
                key={priority}
                onClick={() =>
                  setActiveFilter(priority)
                }
                className={`rounded-xl px-4 py-2.5 text-xs font-bold transition ${
                  activeFilter === priority
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                }`}
              >
                {priority}
              </button>
            ))}

          </div>

        </section>

        {/* =================================================
            KANBAN
        ================================================== */}

        <section className="grid gap-5 xl:grid-cols-4">

          {columns.map((column) => {

            const columnTasks =
              getFilteredTasks(tasks[column.id]);

            return (
              <div
                key={column.id}
                className="min-w-0 rounded-2xl border border-slate-200 bg-slate-100/70 p-3"
              >

                {/* COLUMN HEADER */}

                <div className="mb-4 flex items-center justify-between">

                  <div className="flex items-center gap-2">

                    <ColumnDot color={column.color} />

                    <h3 className="text-sm font-black">
                      {column.title}
                    </h3>

                    <span className="rounded-full bg-white px-2 py-1 text-[10px] font-bold text-slate-500 shadow-sm">
                      {columnTasks.length}
                    </span>

                  </div>

                  <button
                    onClick={() =>
                      setShowNewTask(true)
                    }
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white hover:text-blue-600"
                  >
                    <FaPlus />
                  </button>

                </div>

                {/* TASK LIST */}

                <div className="space-y-3">

                  {columnTasks.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-slate-300 bg-white/60 p-8 text-center">

                      <FaTasks className="mx-auto text-xl text-slate-300" />

                      <p className="mt-3 text-xs font-semibold text-slate-400">
                        No tasks found
                      </p>

                    </div>
                  ) : (
                    columnTasks.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        currentColumn={column.id}
                        onSelect={() =>
                          setSelectedTask(task)
                        }
                        onMove={moveTask}
                      />
                    ))
                  )}

                </div>

                <button
                  onClick={() =>
                    setShowNewTask(true)
                  }
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 py-3 text-xs font-bold text-slate-500 transition hover:border-blue-300 hover:bg-white hover:text-blue-600"
                >
                  <FaPlus />
                  Add task
                </button>

              </div>
            );
          })}

        </section>

        {/* =================================================
            PROJECT HEALTH
        ================================================== */}

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">

            <div className="flex items-center gap-4">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <FaCheckCircle />
              </div>

              <div>

                <p className="text-sm font-black">
                  Project task health
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {statistics.done} tasks completed out of{" "}
                  {statistics.total}.
                </p>

              </div>

            </div>

            <div className="w-full max-w-md">

              <div className="mb-2 flex justify-between text-[10px] font-bold text-slate-400">

                <span>
                  Completion
                </span>

                <span>
                  {statistics.total
                    ? Math.round(
                        (statistics.done /
                          statistics.total) *
                          100
                      )
                    : 0}
                  %
                </span>

              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-100">

                <div
                  className="h-full rounded-full bg-emerald-500 transition-all"
                  style={{
                    width: `${
                      statistics.total
                        ? (statistics.done /
                            statistics.total) *
                          100
                        : 0
                    }%`,
                  }}
                />

              </div>

            </div>

          </div>

        </section>

      </main>

      {/* ===================================================
          TASK DETAILS
      ==================================================== */}

      {selectedTask && (
        <TaskDetails
          task={selectedTask}
          onClose={() =>
            setSelectedTask(null)
          }
        />
      )}

      {/* ===================================================
          NEW TASK
      ==================================================== */}

      {showNewTask && (
        <NewTaskModal
          onClose={() =>
            setShowNewTask(false)
          }
          onCreate={createTask}
        />
      )}

    </div>
  );
}

/* =========================================================
   TASK STAT
========================================================= */

function TaskStat({
  title,
  value,
  icon,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex items-center justify-between">

        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          {icon}
        </div>

        <FaChevronRight className="text-xs text-slate-300" />

      </div>

      <p className="mt-4 text-xs font-bold text-slate-400">
        {title}
      </p>

      <p className="mt-1 text-2xl font-black text-slate-900">
        {value}
      </p>

    </div>
  );
}

/* =========================================================
   TASK CARD
========================================================= */

function TaskCard({
  task,
  currentColumn,
  onSelect,
  onMove,
}) {
  return (
    <div
      onClick={onSelect}
      className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg"
    >

      <div className="flex items-start justify-between gap-3">

        <PriorityBadge
          priority={task.priority}
        />

        <button
          onClick={(event) =>
            event.stopPropagation()
          }
          className="text-slate-300 transition hover:text-slate-600"
        >
          <FaEllipsisH />
        </button>

      </div>

      <h4 className="mt-4 font-black leading-6 text-slate-800">
        {task.title}
      </h4>

      <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">
        {task.description}
      </p>

      {/* TAGS */}

      <div className="mt-4 flex flex-wrap gap-1.5">

        {task.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-500"
          >
            {tag}
          </span>
        ))}

      </div>

      {/* FOOTER */}

      <div className="mt-4 border-t border-slate-100 pt-4">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2">

            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-[10px] font-bold text-white">
              {task.initials}
            </div>

            <div>

              <p className="text-xs font-semibold text-slate-600">
                {task.assignee}
              </p>

              <div className="mt-0.5 flex items-center gap-1 text-[9px] text-slate-400">
                <FaUser />
                Developer
              </div>

            </div>

          </div>

          <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-400">
            <FaCalendarAlt />
            {task.due}
          </div>

        </div>

      </div>

      {/* MOVE BUTTONS */}

      <div
        onClick={(event) =>
          event.stopPropagation()
        }
        className="mt-3 flex gap-1 opacity-0 transition group-hover:opacity-100"
      >

        {currentColumn !== "todo" && (
          <button
            onClick={() => {

              const previous =
                currentColumn === "progress"
                  ? "todo"
                  : currentColumn === "review"
                  ? "progress"
                  : "review";

              onMove(
                task,
                currentColumn,
                previous
              );

            }}
            className="flex-1 rounded-lg bg-slate-100 py-1.5 text-[10px] font-bold text-slate-500 hover:bg-slate-200"
          >
            ← Back
          </button>
        )}

        {currentColumn !== "done" && (
          <button
            onClick={() => {

              const next =
                currentColumn === "todo"
                  ? "progress"
                  : currentColumn === "progress"
                  ? "review"
                  : "done";

              onMove(
                task,
                currentColumn,
                next
              );

            }}
            className="flex-1 rounded-lg bg-blue-50 py-1.5 text-[10px] font-bold text-blue-600 hover:bg-blue-100"
          >
            Move →
          </button>
        )}

      </div>

    </div>
  );
}

/* =========================================================
   PRIORITY BADGE
========================================================= */

function PriorityBadge({
  priority,
}) {
  const styles = {
    High: "bg-red-50 text-red-600",
    Medium: "bg-yellow-50 text-yellow-600",
    Low: "bg-green-50 text-green-600",
  };

  return (
    <span
      className={`inline-block rounded-full px-2.5 py-1 text-[10px] font-black ${
        styles[priority]
      }`}
    >
      {priority}
    </span>
  );
}

/* =========================================================
   COLUMN DOT
========================================================= */

function ColumnDot({
  color,
}) {
  const colors = {
    slate: "bg-slate-400",
    blue: "bg-blue-500",
    purple: "bg-purple-500",
    green: "bg-green-500",
  };

  return (
    <span
      className={`h-2.5 w-2.5 rounded-full ${colors[color]}`}
    />
  );
}

/* =========================================================
   NEW TASK MODAL
========================================================= */

function NewTaskModal({
  onClose,
  onCreate,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");
  const [priority, setPriority] =
    useState("Medium");
  const [assignee, setAssignee] =
    useState("Alex Morgan");
  const [due, setDue] =
    useState("Aug 25");
  const [tag, setTag] =
    useState("Development");

  const submit = () => {

    if (!title.trim()) {
      return;
    }

    const initials = assignee
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2);

    onCreate({
      title: title.trim(),
      description:
        description.trim() ||
        "New development task.",
      priority,
      assignee,
      initials,
      due,
      tags: [tag],
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-5 backdrop-blur-sm"
      onClick={onClose}
    >

      <div
        className="w-full max-w-lg rounded-3xl bg-white p-7 shadow-2xl"
        onClick={(event) =>
          event.stopPropagation()
        }
      >

        {/* HEADER */}

        <div className="flex items-start justify-between">

          <div>

            <h2 className="text-2xl font-black">
              Create New Task
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Add development work to this project.
            </p>

          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200"
          >
            ×
          </button>

        </div>

        {/* FORM */}

        <div className="mt-6 space-y-4">

          <div>

            <label className="mb-2 block text-xs font-black text-slate-500">
              Task Title
            </label>

            <input
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
              placeholder="e.g. Implement API validation"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
            />

          </div>

          <div>

            <label className="mb-2 block text-xs font-black text-slate-500">
              Description
            </label>

            <textarea
              value={description}
              onChange={(event) =>
                setDescription(
                  event.target.value
                )
              }
              placeholder="Describe what needs to be built..."
              rows="4"
              className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
            />

          </div>

          <div className="grid gap-4 sm:grid-cols-2">

            <SelectField
              label="Priority"
              value={priority}
              onChange={setPriority}
              options={[
                "High",
                "Medium",
                "Low",
              ]}
            />

            <SelectField
              label="Assign To"
              value={assignee}
              onChange={setAssignee}
              options={[
                "Alex Morgan",
                "Priya Sharma",
                "Rahul Kumar",
                "Emma Wilson",
                "Sneha Rao",
              ]}
            />

          </div>

          <div className="grid gap-4 sm:grid-cols-2">

            <div>

              <label className="mb-2 block text-xs font-black text-slate-500">
                Due Date
              </label>

              <input
                value={due}
                onChange={(event) =>
                  setDue(event.target.value)
                }
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
              />

            </div>

            <div>

              <label className="mb-2 block text-xs font-black text-slate-500">
                Technology / Tag
              </label>

              <input
                value={tag}
                onChange={(event) =>
                  setTag(event.target.value)
                }
                placeholder="React"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
              />

            </div>

          </div>

        </div>

        {/* ACTIONS */}

        <div className="mt-7 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            onClick={submit}
            disabled={!title.trim()}
            className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Create Task
          </button>

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   SELECT FIELD
========================================================= */

function SelectField({
  label,
  value,
  onChange,
  options,
}) {
  return (
    <div>

      <label className="mb-2 block text-xs font-black text-slate-500">
        {label}
      </label>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-bold text-slate-600 outline-none focus:border-blue-500"
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

    </div>
  );
}

export default TaskBoard;