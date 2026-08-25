import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { FaArrowLeft, FaTasks, FaPlus, FaTimes, FaUser, FaCalendarAlt, FaFlag, FaCheckCircle, FaEdit, FaTrash } from "react-icons/fa";

import API from "../../api/axios";

function ProjectTasks() {
  const navigate = useNavigate();

  const { projectId } =
    useParams();

  // =====================================================
  // STATE
  // =====================================================

  const [project, setProject] =
    useState(null);

  const [tasks, setTasks] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [creating, setCreating] =
    useState(false);

const [editingTask, setEditingTask] = useState(null);

const [deletingTaskId, setDeletingTaskId] =
  useState("");



const [updatingTaskId, setUpdatingTaskId] =
  useState("");

  const [showModal, setShowModal] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      priority: "Medium",
      status: "todo",
      assignee: "",
      dueDate: "",
    });


  // =====================================================
  // LOAD PROJECT + TASKS
  // =====================================================

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const [
        projectResponse,
        taskResponse,
      ] = await Promise.all([
        API.get(
          `/projects/${projectId}`
        ),

        API.get(
          `/tasks/project/${projectId}`
        ),
      ]);

      if (
        !projectResponse.data.success
      ) {
        throw new Error(
          projectResponse.data.message ||
            "Failed to load project"
        );
      }

      if (
        !taskResponse.data.success
      ) {
        throw new Error(
          taskResponse.data.message ||
            "Failed to load tasks"
        );
      }

      setProject(
        projectResponse.data.project
      );

      setTasks(
        taskResponse.data.tasks || []
      );

    } catch (err) {
      console.error(
        "LOAD TASK PAGE ERROR:",
        err
      );

      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to load tasks."
      );
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (projectId) {
      loadData();
    }
  }, [projectId]);


  // =====================================================
  // STATS
  // =====================================================

  const stats = useMemo(() => {
    const total = tasks.length;

    const todo =
      tasks.filter(
        (task) =>
          task.status === "todo"
      ).length;

    const progress =
      tasks.filter(
        (task) =>
          task.status === "progress"
      ).length;

    const review =
      tasks.filter(
        (task) =>
          task.status === "review"
      ).length;

    const done =
      tasks.filter(
        (task) =>
          task.status === "done"
      ).length;

    return {
      total,
      todo,
      progress,
      review,
      done,
    };
  }, [tasks]);


  // =====================================================
  // FORM HANDLER
  // =====================================================

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };


  // =====================================================
  // CREATE TASK
  // =====================================================

  const handleCreateTask = async (
    event
  ) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      setError(
        "Task title is required."
      );

      return;
    }

    try {
      setCreating(true);
      setError("");
      setSuccess("");

      const { data } =
        await API.post(
          "/tasks",
          {
            title:
              formData.title.trim(),

            description:
              formData.description.trim(),

            project:
              projectId,

            priority:
              formData.priority,

            status:
              formData.status,

            assignee:
              formData.assignee ||
              null,

            dueDate:
              formData.dueDate ||
              null,
          }
        );

      setTasks((previous) => [
        data.task,
        ...previous,
      ]);

      setShowModal(false);

      setFormData({
        title: "",
        description: "",
        priority: "Medium",
        status: "todo",
        assignee: "",
        dueDate: "",
      });

      setSuccess(
        "Task created successfully."
      );

      setTimeout(() => {
        setSuccess("");
      }, 3000);

    } catch (err) {
      console.error(
        "CREATE TASK ERROR:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Unable to create task."
      );
    } finally {
      setCreating(false);
    }
  };

// =====================================================
// UPDATE TASK STATUS
// =====================================================

const handleStatusChange = async (
  taskId,
  newStatus
) => {
  try {
    setUpdatingTaskId(taskId);
    setError("");
    setSuccess("");

    const { data } = await API.put(
      `/tasks/${taskId}/status`,
      {
        status: newStatus,
      }
    );

    if (!data.success) {
      throw new Error(
        data.message ||
          "Failed to update task status"
      );
    }

    // Update task immediately in UI
    setTasks((previous) =>
      previous.map((task) =>
        task._id === taskId
          ? data.task
          : task
      )
    );

    setSuccess(
      "Task status updated successfully."
    );

    setTimeout(() => {
      setSuccess("");
    }, 3000);

  } catch (err) {
    console.error(
      "UPDATE TASK STATUS ERROR:",
      err
    );

    setError(
      err.response?.data?.message ||
        err.message ||
        "Unable to update task status."
    );
  } finally {
    setUpdatingTaskId("");
  }
};

// =====================================================
// UPDATE TASK
// =====================================================

const handleUpdateTask = async (
  taskId,
  updatedData
) => {
  try {
    setError("");
    setSuccess("");

    const { data } = await API.put(
      `/tasks/${taskId}`,
      updatedData
    );

    if (!data.success) {
      throw new Error(
        data.message ||
          "Failed to update task"
      );
    }

    setTasks((previous) =>
      previous.map((task) =>
        task._id === taskId
          ? data.task
          : task
      )
    );

    setEditingTask(null);

    setSuccess(
      "Task updated successfully."
    );

    setTimeout(() => {
      setSuccess("");
    }, 3000);

  } catch (err) {
    console.error(
      "UPDATE TASK ERROR:",
      err
    );

    setError(
      err.response?.data?.message ||
        err.message ||
        "Unable to update task."
    );
  }
};

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">

        <div className="text-center">

          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-slate-700 border-t-blue-500" />

          <p className="text-sm font-bold text-slate-400">
            Loading project tasks...
          </p>

        </div>

      </div>
    );
  }


  // =====================================================
  // MAIN
  // =====================================================

  return (
    <div className="min-h-screen bg-black text-white">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="border-b border-white/10 bg-black">

        <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-6">

          <div className="flex items-center gap-4">

            <button
              type="button"
              onClick={() =>
                navigate(
                  `/projects/${projectId}`
                )
              }
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 text-slate-400 transition hover:border-blue-500/40 hover:text-white"
            >
              <FaArrowLeft />
            </button>

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600/10 text-blue-400">
                <FaTasks />
              </div>

              <div>

                <h1 className="font-black text-white">
                  Tasks
                </h1>

                <p className="max-w-[300px] truncate text-xs text-slate-500">
                  {project?.name ||
                    "Project development workflow"}
                </p>

              </div>

            </div>

          </div>


          <button
            type="button"
            onClick={() =>
              setShowModal(true)
            }
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-500"
          >
            <FaPlus />
            New Task
          </button>

        </div>

      </header>


      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="mx-auto max-w-[1500px] px-6 py-10">

        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">

          <div>

            <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-blue-400">
              <FaTasks />
              Project Workspace
            </p>

            <h2 className="mt-3 text-4xl font-black">
              Development Tasks
            </h2>

            <p className="mt-3 max-w-2xl text-sm text-slate-500">
              Plan, assign, track and review
              the work required to move your
              project forward.
            </p>

          </div>

        </div>


        {/* =====================================================
            ALERTS
        ===================================================== */}

        {error && (
          <div className="mt-6 flex items-center justify-between rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-300">

            <span>
              {error}
            </span>

            <button
              onClick={() =>
                setError("")
              }
              className="text-red-400 hover:text-white"
            >
              <FaTimes />
            </button>

          </div>
        )}

        {success && (
          <div className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-4 text-sm font-bold text-emerald-300">
            {success}
          </div>
        )}


        {/* =====================================================
            SUMMARY
        ===================================================== */}

        <section className="mt-8 grid gap-4 md:grid-cols-4">

          <SummaryCard
            title="Total Tasks"
            value={stats.total}
          />

          <SummaryCard
            title="To Do"
            value={stats.todo}
          />

          <SummaryCard
            title="In Progress"
            value={stats.progress}
          />

          <SummaryCard
            title="Completed"
            value={stats.done}
          />

        </section>


        {/* =====================================================
            TASK LIST
        ===================================================== */}

        <section className="mt-8">

          {tasks.length === 0 ? (

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">

              <div className="flex min-h-[300px] flex-col items-center justify-center text-center">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600/10 text-2xl text-blue-400">
                  <FaTasks />
                </div>

                <h3 className="mt-5 text-xl font-black">
                  No tasks yet
                </h3>

                <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                  Create your first task
                  to start planning and
                  tracking this project's
                  development.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    setShowModal(true)
                  }
                  className="mt-6 flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-500"
                >
                  <FaPlus />
                  Create First Task
                </button>

              </div>

            </div>

          ) : (

            <div className="space-y-4">

            {tasks.map((task) => (
  <TaskCard
    key={task._id}
    task={task}
    onStatusChange={handleStatusChange}
    updatingTaskId={updatingTaskId}
  />
))}

            </div>

          )}

        </section>

      </main>


      {/* =====================================================
          CREATE TASK MODAL
      ===================================================== */}

      {showModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-5 backdrop-blur-sm">

          <div className="w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-2xl">

            <div className="mb-6 flex items-start justify-between">

              <div>

                <h3 className="text-xl font-black">
                  Create New Task
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Add work to your project
                  and optionally assign it
                  to a team member.
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setShowModal(false)
                }
                className="text-slate-500 hover:text-white"
              >
                <FaTimes />
              </button>

            </div>


            <form
              onSubmit={
                handleCreateTask
              }
              className="space-y-5"
            >

              {/* TITLE */}

              <div>

                <label className="mb-2 block text-xs font-black uppercase tracking-wide text-slate-500">
                  Task Title
                </label>

                <input
                  name="title"
                  value={
                    formData.title
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Build authentication system"
                  className="w-full rounded-xl border border-slate-800 bg-black px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
                  required
                />

              </div>


              {/* DESCRIPTION */}

              <div>

                <label className="mb-2 block text-xs font-black uppercase tracking-wide text-slate-500">
                  Description
                </label>

                <textarea
                  name="description"
                  value={
                    formData.description
                  }
                  onChange={
                    handleChange
                  }
                  rows={4}
                  placeholder="Describe what needs to be completed..."
                  className="w-full resize-none rounded-xl border border-slate-800 bg-black px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
                />

              </div>


              {/* PRIORITY + STATUS */}

              <div className="grid gap-5 md:grid-cols-2">

                <div>

                  <label className="mb-2 block text-xs font-black uppercase tracking-wide text-slate-500">
                    Priority
                  </label>

                  <select
                    name="priority"
                    value={
                      formData.priority
                    }
                    onChange={
                      handleChange
                    }
                    className="w-full rounded-xl border border-slate-800 bg-black px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
                  >
                    <option value="Low">
                      Low
                    </option>

                    <option value="Medium">
                      Medium
                    </option>

                    <option value="High">
                      High
                    </option>
                  </select>

                </div>


                <div>

                  <label className="mb-2 block text-xs font-black uppercase tracking-wide text-slate-500">
                    Status
                  </label>

                  <select
                    name="status"
                    value={
                      formData.status
                    }
                    onChange={
                      handleChange
                    }
                    className="w-full rounded-xl border border-slate-800 bg-black px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
                  >
                    <option value="todo">
                      To Do
                    </option>

                    <option value="progress">
                      In Progress
                    </option>

                    <option value="review">
                      Review
                    </option>

                    <option value="done">
                      Done
                    </option>
                  </select>

                </div>

              </div>


              {/* ASSIGNEE + DATE */}

              <div className="grid gap-5 md:grid-cols-2">

                <div>

                  <label className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-wide text-slate-500">
                    <FaUser />
                    Assign To
                  </label>

                  <select
                    name="assignee"
                    value={
                      formData.assignee
                    }
                    onChange={
                      handleChange
                    }
                    className="w-full rounded-xl border border-slate-800 bg-black px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
                  >

                    <option value="">
                      Unassigned
                    </option>

                    {project?.members?.map(
                      (member) => (
                        <option
                          key={
                            member._id
                          }
                          value={
                            member._id
                          }
                        >
                          {member.name} â€”{" "}
                          {member.email}
                        </option>
                      )
                    )}

                  </select>

                </div>


                <div>

                  <label className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-wide text-slate-500">
                    <FaCalendarAlt />
                    Due Date
                  </label>

                  <input
                    type="date"
                    name="dueDate"
                    value={
                      formData.dueDate
                    }
                    onChange={
                      handleChange
                    }
                    className="w-full rounded-xl border border-slate-800 bg-black px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
                  />

                </div>

              </div>


              {/* ACTIONS */}

              <div className="flex justify-end gap-3 border-t border-slate-800 pt-5">

                <button
                  type="button"
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="rounded-xl border border-slate-800 px-5 py-3 text-sm font-bold text-slate-400 transition hover:text-white"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={creating}
                  className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-black text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <FaPlus />

                  {creating
                    ? "Creating..."
                    : "Create Task"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}


// =====================================================
// SUMMARY CARD
// =====================================================

function SummaryCard({
  title,
  value,
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">

      <p className="text-xs font-bold text-slate-500">
        {title}
      </p>

      <p className="mt-3 text-3xl font-black">
        {value}
      </p>

    </div>
  );
}


// =====================================================
// TASK CARD
// =====================================================

function TaskCard({
  task,
  onStatusChange,
  updatingTaskId,
}) {
  const statusStyles = {
    todo:
      "bg-slate-500/10 text-slate-400 border-slate-500/20",

    progress:
      "bg-blue-500/10 text-blue-400 border-blue-500/20",

    review:
      "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",

    done:
      "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  };

  const priorityStyles = {
    Low: "text-slate-400",
    Medium: "text-yellow-400",
    High: "text-red-400",
  };

  const statusLabels = {
    todo: "To Do",
    progress: "In Progress",
    review: "Review",
    done: "Completed",
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-white/20">

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div className="min-w-0 flex-1">

          <div className="flex flex-wrap items-center gap-3">

            <h3 className="text-lg font-black">
              {task.title}
            </h3>

            <span
              className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase ${statusStyles[task.status] || statusStyles.todo}`}
            >
              {statusLabels[
                task.status
              ] || task.status}
            </span>

<select
  value={task.status}
  disabled={updatingTaskId === task._id}
  onChange={(event) =>
    onStatusChange(
      task._id,
      event.target.value
    )
  }
  className="rounded-lg border border-white/10 bg-black px-3 py-2 text-xs font-bold text-white outline-none transition hover:border-blue-500/50 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
>
  <option value="todo">
    To Do
  </option>

  <option value="progress">
    In Progress
  </option>

  <option value="review">
    Review
  </option>

  <option value="done">
    Completed
  </option>
</select>


          </div>

          {task.description && (
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
              {task.description}
            </p>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-5 text-xs text-slate-500">

            <span className="flex items-center gap-2">
              <FaFlag
                className={
                  priorityStyles[
                    task.priority
                  ]
                }
              />

              {task.priority ||
                "Medium"}
            </span>

            {task.assignee && (
              <span className="flex items-center gap-2">
                <FaUser />

                {task.assignee.name}
              </span>
            )}

            {task.dueDate && (
              <span className="flex items-center gap-2">
                <FaCalendarAlt />

                {new Date(
                  task.dueDate
                ).toLocaleDateString()}
              </span>
            )}

          </div>

        </div>


        {task.status === "done" && (
          <FaCheckCircle className="text-2xl text-emerald-400" />
        )}

      </div>

    </div>
  );
}

export default ProjectTasks;











