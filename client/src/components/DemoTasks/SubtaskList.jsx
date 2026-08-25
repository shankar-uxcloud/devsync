import { useState } from "react";
import { FaCheck, FaPlus, FaTrash } from "react-icons/fa";

function SubtaskList() {
  const [subtasks, setSubtasks] = useState([
    {
      id: 1,
      title: "Create login API",
      completed: true,
    },
    {
      id: 2,
      title: "Generate JWT token",
      completed: true,
    },
    {
      id: 3,
      title: "Add refresh token",
      completed: false,
    },
    {
      id: 4,
      title: "Test authentication flow",
      completed: false,
    },
  ]);

  const [newSubtask, setNewSubtask] = useState("");

  const toggleSubtask = (id) => {
    setSubtasks((current) =>
      current.map((subtask) =>
        subtask.id === id
          ? {
              ...subtask,
              completed: !subtask.completed,
            }
          : subtask
      )
    );
  };

  const addSubtask = () => {
    const title = newSubtask.trim();

    if (!title) return;

    setSubtasks((current) => [
      ...current,
      {
        id: Date.now(),
        title,
        completed: false,
      },
    ]);

    setNewSubtask("");
  };

  const deleteSubtask = (id) => {
    setSubtasks((current) =>
      current.filter((subtask) => subtask.id !== id)
    );
  };

  const completedCount = subtasks.filter(
    (subtask) => subtask.completed
  ).length;

  const progress =
    subtasks.length === 0
      ? 0
      : Math.round((completedCount / subtasks.length) * 100);

  return (
    <div className="mt-8">

      {/* HEADER */}

      <div className="flex items-center justify-between">

        <div>
          <h3 className="font-black text-slate-900">
            Subtasks
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            {completedCount} of {subtasks.length} completed
          </p>
        </div>

        <span className="text-sm font-black text-blue-600">
          {progress}%
        </span>

      </div>

      {/* PROGRESS */}

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">

        <div
          className="h-full rounded-full bg-blue-600 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />

      </div>

      {/* SUBTASKS */}

      <div className="mt-5 space-y-2">

        {subtasks.map((subtask) => (
          <div
            key={subtask.id}
            className="group flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3 transition hover:bg-white hover:shadow-sm"
          >

            {/* CHECKBOX */}

            <button
              onClick={() => toggleSubtask(subtask.id)}
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition ${
                subtask.completed
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-slate-300 bg-white text-transparent hover:border-blue-400"
              }`}
            >
              <FaCheck className="text-[10px]" />
            </button>

            {/* TITLE */}

            <span
              className={`flex-1 text-sm font-semibold ${
                subtask.completed
                  ? "text-slate-400 line-through"
                  : "text-slate-700"
              }`}
            >
              {subtask.title}
            </span>

            {/* DELETE */}

            <button
              onClick={() => deleteSubtask(subtask.id)}
              className="text-slate-300 opacity-0 transition hover:text-red-500 group-hover:opacity-100"
            >
              <FaTrash className="text-xs" />
            </button>

          </div>
        ))}

      </div>

      {/* ADD SUBTASK */}

      <div className="mt-4 flex gap-2">

        <input
          value={newSubtask}
          onChange={(event) => setNewSubtask(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              addSubtask();
            }
          }}
          placeholder="Add a subtask..."
          className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        <button
          onClick={addSubtask}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-100 transition hover:bg-blue-700"
        >
          <FaPlus />
        </button>

      </div>

    </div>
  );
}

export default SubtaskList;