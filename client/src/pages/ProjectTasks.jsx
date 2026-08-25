import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaClock,
  FaCode,
  FaEllipsisH,
  FaFilter,
  FaPlus,
  FaSearch,
  FaTasks,
  FaUsers,
} from "react-icons/fa";

const API_BASE = "http://localhost:5000/api";

function ProjectTasks() {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const loadTasks = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_BASE}/tasks/project/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load tasks");
      }

      setTasks(data.tasks || []);
    } catch (error) {
      console.error("LOAD TASKS ERROR:", error);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (projectId) {
      loadTasks();
    }
  }, [projectId]);

  const filteredTasks = useMemo(() => {
    const query = search.toLowerCase().trim();

    return tasks.filter((task) => {
      const matchesSearch =
        !query ||
        task.title?.toLowerCase().includes(query) ||
        task.description?.toLowerCase().includes(query) ||
        task.assignee?.name?.toLowerCase().includes(query) ||
        task.tags?.some((tag) =>
          tag.toLowerCase().includes(query)
        );

      const matchesPriority =
        filter === "All" || task.priority === filter;

      return matchesSearch && matchesPriority;
    });
  }, [tasks, search, filter]);

  const groupedTasks = {
    todo: filteredTasks.filter((task) => task.status === "todo"),
    progress: filteredTasks.filter(
      (task) => task.status === "progress"
    ),
    review: filteredTasks.filter(
      (task) => task.status === "review"
    ),
    done: filteredTasks.filter((task) => task.status === "done"),
  };

  const statistics = {
    total: tasks.length,
    todo: tasks.filter((task) => task.status === "todo").length,
    progress: tasks.filter(
      (task) => task.status === "progress"
    ).length,
    review: tasks.filter(
      (task) => task.status === "review"
    ).length,
    done: tasks.filter((task) => task.status === "done").length,
  };

  return (
    <div className="min-h-screen bg-black text-white">

      {/* HEADER */}
      <header className="flex min-h-[86px] items-center justify-between border-b border-slate-800 bg-black px-5 md:px-10">

        <div className="flex items-center gap-4">

          <button
            type="button"
            onClick={() =>
              navigate(`/projects/${projectId}`)
            }
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-700 text-slate-300 transition hover:border-blue-500 hover:bg-blue-500/10 hover:text-blue-400"
          >
            <FaArrowLeft />
          </button>

          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-500/40 bg-blue-500/10 text-blue-400">
              <FaTasks />
            </div>

            <div>
              <h1 className="text-lg font-black">
                Tasks
              </h1>

              <p className="text-xs text-slate-500">
                Development workflow
              </p>
            </div>
          </div>

        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 font-black">
          ✓
        </div>

      </header>

      {/* MAIN */}
      <main className="px-5 py-10 md:px-10 lg:px-16">

        <div className="mb-8">

          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-blue-400">
            <FaTasks />
            Project Development
          </div>

          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">

            <div>
              <h2 className="text-4xl font-black tracking-tight md:text-5xl">
                Development Tasks
              </h2>

              <p className="mt-3 text-slate-400">
                Plan, assign, track and review the work required
                to move your project forward.
              </p>
            </div>

            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 font-black transition hover:bg-blue-500"
            >
              <FaPlus />
              New Task
            </button>

          </div>
        </div>

        {/* STATISTICS */}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">

          <StatCard
            icon={<FaTasks />}
            title="Total Tasks"
            value={statistics.total}
          />

          <StatCard
            icon={<FaClock />}
            title="To Do"
            value={statistics.todo}
          />

          <StatCard
            icon={<FaCode />}
            title="In Progress"
            value={statistics.progress}
          />

          <StatCard
            icon={<FaUsers />}
            title="In Review"
            value={statistics.review}
          />

          <StatCard
            icon={<FaCheckCircle />}
            title="Completed"
            value={statistics.done}
          />

        </div>

        {/* SEARCH */}
        <div className="mt-7 rounded-2xl border border-white/10 bg-white/[0.02] p-4">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex w-full max-w-xl items-center gap-3 rounded-xl border border-white/10 bg-black px-4 py-3">

              <FaSearch className="text-slate-500" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tasks, developers or technologies..."
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-600"
              />

            </div>

            <div className="flex items-center gap-2">

              <FaFilter className="text-slate-500" />

              {["All", "High", "Medium", "Low"].map(
                (item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setFilter(item)}
                    className={`rounded-xl border px-4 py-2 text-xs font-black transition ${
                      filter === item
                        ? "border-blue-500 bg-blue-600 text-white"
                        : "border-white/10 bg-white/[0.03] text-slate-400 hover:text-white"
                    }`}
                  >
                    {item}
                  </button>
                )
              )}

            </div>

          </div>

        </div>

        {/* TASK COLUMNS */}
        {loading ? (
          <div className="py-20 text-center text-slate-500">
            Loading project tasks...
          </div>
        ) : (
          <div className="mt-7 grid gap-5 xl:grid-cols-4">

            <TaskColumn
              title="To Do"
              tasks={groupedTasks.todo}
            />

            <TaskColumn
              title="In Progress"
              tasks={groupedTasks.progress}
            />

            <TaskColumn
              title="Review"
              tasks={groupedTasks.review}
            />

            <TaskColumn
              title="Done"
              tasks={groupedTasks.done}
            />

          </div>
        )}

      </main>
    </div>
  );
}

function StatCard({ icon, title, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
        {icon}
      </div>

      <p className="mt-5 text-sm font-bold text-slate-400">
        {title}
      </p>

      <p className="mt-2 text-3xl font-black">
        {value}
      </p>
    </div>
  );
}

function TaskColumn({ title, tasks }) {
  return (
    <div className="min-h-[300px] rounded-2xl border border-white/10 bg-white/[0.02] p-4">

      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-black">
          {title}
        </h3>

        <span className="rounded-full bg-black px-3 py-1 text-xs font-black">
          {tasks.length}
        </span>
      </div>

      <div className="space-y-3">

        {tasks.length === 0 ? (
          <p className="py-10 text-center text-xs text-slate-600">
            No tasks
          </p>
        ) : (
          tasks.map((task) => (
            <div
              key={task._id}
              className="rounded-xl border border-white/10 bg-black p-4 transition hover:border-blue-500/30"
            >

              <div className="flex items-start justify-between gap-3">

                <div>
                  <span
                    className={`rounded-full px-2 py-1 text-[9px] font-black ${
                      task.priority === "High"
                        ? "bg-red-500/10 text-red-400"
                        : task.priority === "Low"
                        ? "bg-green-500/10 text-green-400"
                        : "bg-yellow-500/10 text-yellow-400"
                    }`}
                  >
                    {task.priority}
                  </span>

                  <h4 className="mt-3 font-black">
                    {task.title}
                  </h4>
                </div>

                <FaEllipsisH className="text-slate-600" />

              </div>

              <p className="mt-2 text-xs leading-5 text-slate-500">
                {task.description || "No description"}
              </p>

              {task.assignee && (
                <p className="mt-4 text-xs text-slate-400">
                  Assigned to{" "}
                  <span className="font-bold text-blue-400">
                    {task.assignee.name}
                  </span>
                </p>
              )}

              {task.tags?.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {task.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-white/10 px-2 py-1 text-[9px] text-slate-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

            </div>
          ))
        )}

      </div>
    </div>
  );
}

export default ProjectTasks;