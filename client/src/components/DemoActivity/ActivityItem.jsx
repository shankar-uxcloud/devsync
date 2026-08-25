import {
  FaCheckCircle,
  FaCode,
  FaComment,
  FaFileAlt,
  FaGitAlt,
  FaPlus,
  FaTasks,
  FaUserPlus,
} from "react-icons/fa";

const activityIcons = {
  task_completed: <FaCheckCircle />,
  task_created: <FaPlus />,
  task_updated: <FaTasks />,
  comment: <FaComment />,
  file_uploaded: <FaFileAlt />,
  commit: <FaGitAlt />,
  member_joined: <FaUserPlus />,
  code: <FaCode />,
};

function ActivityItem({ activity }) {
  const icon =
    activityIcons[activity.type] || <FaCode />;

  return (
    <div className="group flex gap-4">

      {/* ICON */}

      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${getIconStyle(
          activity.type
        )}`}
      >
        {icon}
      </div>

      {/* CONTENT */}

      <div className="min-w-0 flex-1 pb-7">

        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">

          <p className="text-sm leading-6 text-slate-700">

            <span className="font-black text-slate-900">
              {activity.user}
            </span>{" "}

            <span>
              {activity.action}
            </span>{" "}

            {activity.target && (
              <span className="font-bold text-slate-900">
                {activity.target}
              </span>
            )}

          </p>

          <span className="shrink-0 text-xs text-slate-400">
            {activity.time}
          </span>

        </div>

        {activity.description && (
          <p className="mt-2 max-w-2xl text-xs leading-5 text-slate-500">
            {activity.description}
          </p>
        )}

        {activity.meta && (
          <div className="mt-3 inline-flex rounded-lg bg-slate-50 px-3 py-2 text-[10px] font-semibold text-slate-500">
            {activity.meta}
          </div>
        )}

      </div>

    </div>
  );
}

function getIconStyle(type) {
  const styles = {
    task_completed:
      "bg-green-50 text-green-600",

    task_created:
      "bg-blue-50 text-blue-600",

    task_updated:
      "bg-purple-50 text-purple-600",

    comment:
      "bg-orange-50 text-orange-600",

    file_uploaded:
      "bg-indigo-50 text-indigo-600",

    commit:
      "bg-slate-100 text-slate-700",

    member_joined:
      "bg-cyan-50 text-cyan-600",

    code:
      "bg-blue-50 text-blue-600",
  };

  return styles[type] || "bg-slate-100 text-slate-500";
}

export default ActivityItem;