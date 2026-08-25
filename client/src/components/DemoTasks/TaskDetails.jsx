import {
  FaCalendarAlt,
  FaCode,
  FaClock,
  FaUser,
  FaUsers,
} from "react-icons/fa";

import SubtaskList from "./SubtaskList";
import CommentsSection from "./CommentsSection";

function TaskDetails({ task, onClose }) {
  if (!task) return null;

  const status =
    task.status ||
    (task.priority === "High" ? "In Progress" : "To Do");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >

        {/* HEADER */}

        <div className="sticky top-0 z-10 border-b border-slate-200 bg-white px-6 py-5 sm:px-8">

          <div className="flex items-start justify-between gap-5">

            <div className="min-w-0">

              <div className="flex flex-wrap items-center gap-2">

                <PriorityBadge priority={task.priority} />

                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">
                  {status}
                </span>

              </div>

              <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                {task.title}
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                {task.description}
              </p>

            </div>

            <button
              onClick={onClose}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xl text-slate-500 transition hover:bg-slate-200 hover:text-slate-800"
            >
              ×
            </button>

          </div>

        </div>

        {/* CONTENT */}

        <div className="px-6 py-6 sm:px-8">

          {/* TASK INFORMATION */}

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

            <InfoCard
              icon={<FaUser />}
              label="Assigned To"
              value={task.assignee}
            />

            <InfoCard
              icon={<FaCalendarAlt />}
              label="Due Date"
              value={task.due}
            />

            <InfoCard
              icon={<FaClock />}
              label="Status"
              value={status}
            />

            <InfoCard
              icon={<FaCode />}
              label="Project"
              value="DevSync"
            />

          </div>

          {/* DESCRIPTION */}

          <section className="mt-8">

            <h3 className="text-lg font-black text-slate-900">
              Description
            </h3>

            <div className="mt-3 rounded-2xl border border-slate-100 bg-slate-50 p-5">

              <p className="text-sm leading-7 text-slate-600">
                {task.description}
              </p>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                This task is part of the DevSync development workflow.
                Team members can update the status, collaborate,
                complete subtasks and track progress from the project
                workspace.
              </p>

            </div>

          </section>

          {/* TAGS */}

          {task.tags?.length > 0 && (
            <section className="mt-7">

              <h3 className="text-lg font-black text-slate-900">
                Technologies & Tags
              </h3>

              <div className="mt-3 flex flex-wrap gap-2">

                {task.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-bold text-slate-600"
                  >
                    {tag}
                  </span>
                ))}

              </div>

            </section>
          )}

          {/* SUBTASKS */}

          <SubtaskList />

          {/* TEAM */}

          <section className="mt-8">

            <div className="flex items-center gap-2">
              <FaUsers className="text-blue-600" />

              <h3 className="text-lg font-black text-slate-900">
                Task Participants
              </h3>
            </div>

            <div className="mt-3 flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 font-bold text-white">
                {task.initials}
              </div>

              <div>
                <p className="text-sm font-black text-slate-800">
                  {task.assignee}
                </p>

                <p className="text-xs text-slate-500">
                  Assigned developer
                </p>
              </div>

            </div>

          </section>

          {/* COMMENTS */}

          <CommentsSection />

        </div>

        {/* FOOTER */}

        <div className="sticky bottom-0 flex flex-col-reverse gap-3 border-t border-slate-200 bg-white px-6 py-5 sm:flex-row sm:justify-end sm:px-8">

          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
          >
            Close
          </button>

          <button
            className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
          >
            Edit Task
          </button>

        </div>

      </div>
    </div>
  );
}

/* PRIORITY */

function PriorityBadge({ priority }) {
  const styles = {
    High: "bg-red-50 text-red-600",
    Medium: "bg-yellow-50 text-yellow-600",
    Low: "bg-green-50 text-green-600",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-black ${
        styles[priority] || "bg-slate-100 text-slate-600"
      }`}
    >
      {priority}
    </span>
  );
}

/* INFO CARD */

function InfoCard({ icon, label, value }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">

      <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
        {icon}
        {label}
      </div>

      <p className="mt-2 truncate text-sm font-black text-slate-800">
        {value}
      </p>

    </div>
  );
}

export default TaskDetails;