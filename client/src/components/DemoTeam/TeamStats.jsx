import {
  FaCheckCircle,
  FaCodeBranch,
  FaTasks,
  FaUsers,
} from "react-icons/fa";

const stats = [
  {
    label: "Team Members",
    value: "8",
    subtitle: "6 currently online",
    icon: <FaUsers />,
    iconStyle: "bg-blue-50 text-blue-600",
    change: "+2",
  },
  {
    label: "Active Tasks",
    value: "24",
    subtitle: "7 in progress",
    icon: <FaTasks />,
    iconStyle: "bg-green-50 text-green-600",
    change: "+18%",
  },
  {
    label: "Completed Tasks",
    value: "124",
    subtitle: "This project",
    icon: <FaCheckCircle />,
    iconStyle: "bg-purple-50 text-purple-600",
    change: "+12%",
  },
  {
    label: "GitHub Commits",
    value: "142",
    subtitle: "This month",
    icon: <FaCodeBranch />,
    iconStyle: "bg-orange-50 text-orange-600",
    change: "+24%",
  },
];

function TeamStats() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex items-start justify-between">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.iconStyle}`}
            >
              {stat.icon}
            </div>

            <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-bold text-green-600">
              ↑ {stat.change}
            </span>
          </div>

          <p className="mt-5 text-sm font-semibold text-slate-500">
            {stat.label}
          </p>

          <div className="mt-1 flex items-end justify-between gap-3">
            <h3 className="text-3xl font-black tracking-tight text-slate-900">
              {stat.value}
            </h3>
          </div>

          <p className="mt-1 text-xs text-slate-400">
            {stat.subtitle}
          </p>
        </div>
      ))}
    </div>
  );
}

export default TeamStats;