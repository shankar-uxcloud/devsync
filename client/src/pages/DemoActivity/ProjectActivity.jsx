import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaBell,
  FaCheckCircle,
  FaCode,
  FaComment,
  FaFile,
  FaFilter,
  FaGitAlt,
  FaPlus,
  FaSearch,
  FaTasks,
  FaUsers,
  FaUser,
  FaClock,
  FaTimes,
} from "react-icons/fa";

const initialActivities = [
  {
    id: 1,
    user: "Alex Morgan",
    initial: "A",
    type: "task",
    title: "completed JWT Authentication",
    description:
      "Authentication and token validation have been completed and moved to Done.",
    time: "12 minutes ago",
    category: "Tasks",
    icon: <FaCheckCircle />,
    iconClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  },
  {
    id: 2,
    user: "Priya Sharma",
    initial: "P",
    type: "code",
    title: "updated Dashboard UI",
    description:
      "Updated the dashboard layout and improved responsive components.",
    time: "35 minutes ago",
    category: "Code",
    icon: <FaCode />,
    iconClass: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  },
  {
    id: 3,
    user: "Rahul Kumar",
    initial: "R",
    type: "team",
    title: "joined the DevSync team",
    description:
      "Rahul Kumar joined the development workspace as a Full Stack Developer.",
    time: "1 hour ago",
    category: "Team",
    icon: <FaUsers />,
    iconClass: "bg-purple-500/10 text-purple-400 border-purple-500/30",
  },
  {
    id: 4,
    user: "Alex Morgan",
    initial: "A",
    type: "file",
    title: "uploaded CodeWorkspace.jsx",
    description:
      "A new source file was added to the project file manager.",
    time: "2 hours ago",
    category: "Files",
    icon: <FaFile />,
    iconClass: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
  },
  {
    id: 5,
    user: "Emma Wilson",
    initial: "E",
    type: "chat",
    title: "sent a message in #general",
    description:
      "Emma Wilson posted an update about the current sprint.",
    time: "3 hours ago",
    category: "Chat",
    icon: <FaComment />,
    iconClass: "bg-pink-500/10 text-pink-400 border-pink-500/30",
  },
  {
    id: 6,
    user: "Daniel Lee",
    initial: "D",
    type: "git",
    title: "pushed new commits",
    description:
      "Three commits were pushed to the main development branch.",
    time: "5 hours ago",
    category: "Code",
    icon: <FaGitAlt />,
    iconClass: "bg-orange-500/10 text-orange-400 border-orange-500/30",
  },
  {
    id: 7,
    user: "Priya Sharma",
    initial: "P",
    type: "task",
    title: "created Dashboard UI task",
    description:
      "A new task was added to the project Kanban board.",
    time: "Yesterday",
    category: "Tasks",
    icon: <FaPlus />,
    iconClass: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  },
  {
    id: 8,
    user: "Alex Morgan",
    initial: "A",
    type: "comment",
    title: "commented on Authentication Module",
    description:
      "Alex added a review comment to the authentication implementation.",
    time: "Yesterday",
    category: "Chat",
    icon: <FaComment />,
    iconClass: "bg-violet-500/10 text-violet-400 border-violet-500/30",
  },
];

const categories = [
  "All Activity",
  "Tasks",
  "Code",
  "Files",
  "Team",
  "Chat",
];

export default function ProjectActivity() {
  const { projectId } = useParams();
  const projectPath = `/demo/project/${projectId || "devsync"}`;

  const [activities, setActivities] = useState(initialActivities);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Activity");
  const [showAlerts, setShowAlerts] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const filteredActivities = useMemo(() => {
    const query = search.trim().toLowerCase();

    return activities.filter((activity) => {
      const matchesSearch =
        !query ||
        activity.user.toLowerCase().includes(query) ||
        activity.title.toLowerCase().includes(query) ||
        activity.description.toLowerCase().includes(query) ||
        activity.category.toLowerCase().includes(query);

      const matchesCategory =
        category === "All Activity" ||
        activity.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [activities, search, category]);

  const clearActivities = () => {
    setActivities([]);
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">

      {/* HEADER */}
      <header className="sticky top-0 z-30 flex min-h-[78px] items-center justify-between border-b border-slate-800 bg-black/95 px-5 backdrop-blur lg:px-8">

        <div className="flex items-center gap-4">

          <Link
            to={projectPath}
            title="Back to Project"
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-700 bg-slate-950 text-lg text-slate-400 transition hover:border-blue-500 hover:bg-blue-500/10 hover:text-blue-400"
          >
            <FaArrowLeft />
          </Link>

          <div className="h-8 w-px bg-slate-800" />

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600/10 text-lg text-blue-400 ring-1 ring-blue-500/30">
              <FaClock />
            </div>

            <div>
              <div className="flex items-center gap-2">

                <span className="text-sm text-slate-400">
                  DevSync
                </span>

                <span className="text-slate-600">
                  /
                </span>

                <span className="text-lg font-black">
                  Activity
                </span>

              </div>

              <p className="text-xs text-slate-500">
                Project timeline
              </p>
            </div>

          </div>

        </div>

        <div className="flex items-center gap-3">

          <div className="hidden rounded-full border border-blue-500/40 bg-blue-500/5 px-4 py-2 text-xs font-black text-blue-400 sm:block">
            DEMO MODE
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-lg font-black">
            A
          </div>

        </div>

      </header>

      {/* MAIN */}
      <main className="mx-auto max-w-[1450px] px-5 py-9 lg:px-8 lg:py-11">

        {/* TITLE */}
        <section className="mb-9">

          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">

            <div>

              <div className="mb-3 flex items-center gap-2 text-sm font-bold text-blue-400">
                <FaClock />
                DevSync Timeline
              </div>

              <h1 className="text-4xl font-black tracking-tight lg:text-5xl">
                Project Activity
              </h1>

              <p className="mt-2 max-w-3xl text-base leading-7 text-slate-400 lg:text-lg">
                Follow everything happening across your project, from tasks
                and code changes to team activity.
              </p>

            </div>

            <button
              onClick={() => setShowAlerts(!showAlerts)}
              className={`flex items-center justify-center gap-3 rounded-xl border px-5 py-3 text-sm font-black transition ${
                showAlerts
                  ? "border-blue-500 bg-blue-500/10 text-blue-400"
                  : "border-slate-800 bg-slate-950 text-slate-300 hover:border-blue-500/50 hover:text-blue-400"
              }`}
            >
              <FaBell />
              Activity Alerts
            </button>

          </div>

          {/* ALERT PANEL */}
          {showAlerts && (
            <div className="mt-5 rounded-2xl border border-blue-500/30 bg-blue-500/5 p-5">

              <div className="flex items-start gap-4">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                  <FaBell />
                </div>

                <div>
                  <h3 className="font-black">
                    Activity alerts enabled
                  </h3>

                  <p className="mt-1 text-sm text-slate-400">
                    You'll see project events such as task updates, code
                    changes, file uploads and team activity here.
                  </p>
                </div>

                <button
                  onClick={() => setShowAlerts(false)}
                  className="ml-auto text-slate-500 hover:text-white"
                >
                  <FaTimes />
                </button>

              </div>

            </div>
          )}

        </section>

        {/* FILTER BAR */}
        <section className="mb-8 rounded-2xl border border-slate-800 bg-slate-950 p-4">

          <div className="flex flex-col gap-4 xl:flex-row xl:items-center">

            {/* SEARCH */}
            <div className="relative flex-1">

              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search activity..."
                className="w-full rounded-xl border border-slate-800 bg-black py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
              />

            </div>

            {/* FILTER */}
            <div className="flex items-center gap-3">

              <FaFilter className="hidden text-slate-500 sm:block" />

              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="rounded-xl border border-slate-800 bg-black px-4 py-3.5 text-sm font-bold text-slate-300 outline-none focus:border-blue-500"
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={`flex items-center gap-2 rounded-xl border px-4 py-3.5 text-sm font-bold transition ${
                  menuOpen
                    ? "border-blue-500 bg-blue-500/10 text-blue-400"
                    : "border-slate-800 bg-black text-slate-300 hover:border-blue-500/50"
                }`}
              >
                <FaUser />
                All Users
              </button>

            </div>

          </div>

          {menuOpen && (
            <div className="mt-3 flex flex-wrap gap-2 border-t border-slate-800 pt-3">

              {["All Users", "Alex Morgan", "Priya Sharma", "Rahul Kumar", "Emma Wilson", "Daniel Lee"].map(
                (user) => (
                  <button
                    key={user}
                    onClick={() => {
                      if (user === "All Users") {
                        setSearch("");
                      } else {
                        setSearch(user);
                      }

                      setMenuOpen(false);
                    }}
                    className="rounded-lg border border-slate-800 bg-black px-3 py-2 text-xs font-bold text-slate-400 transition hover:border-blue-500 hover:text-blue-400"
                  >
                    {user}
                  </button>
                )
              )}

            </div>
          )}

        </section>

        {/* TIMELINE */}
        <section className="rounded-2xl border border-slate-800 bg-slate-950 p-6 lg:p-8">

          <div className="mb-8 flex items-center justify-between">

            <div>
              <h2 className="text-2xl font-black">
                Timeline
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Latest project events
              </p>
            </div>

            <div className="rounded-full border border-blue-500/30 bg-blue-500/5 px-4 py-2 text-xs font-black text-blue-400">
              {filteredActivities.length} Events
            </div>

          </div>

          {filteredActivities.length === 0 ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center text-center">

              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-2xl text-slate-600">
                <FaSearch />
              </div>

              <h3 className="text-lg font-black">
                No activity found
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Try changing your search or activity filter.
              </p>

            </div>
          ) : (
            <div className="relative">

              {/* VERTICAL LINE */}
              <div className="absolute bottom-5 left-[23px] top-5 w-px bg-slate-800" />

              <div className="space-y-7">

                {filteredActivities.map((activity, index) => (

                  <div
                    key={activity.id}
                    className="group relative flex gap-5"
                  >

                    {/* ICON */}
                    <div
                      className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border ${activity.iconClass}`}
                    >
                      {activity.icon}
                    </div>

                    {/* CONTENT */}
                    <div className="min-w-0 flex-1 pb-5">

                      <div className="flex flex-col justify-between gap-2 lg:flex-row">

                        <div>

                          <p className="text-sm leading-6 text-slate-300">

                            <span className="font-black text-white">
                              {activity.user}
                            </span>{" "}

                            <span>
                              {activity.title}
                            </span>

                          </p>

                          <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-500">
                            {activity.description}
                          </p>

                        </div>

                        <span className="shrink-0 text-xs font-semibold text-slate-600">
                          {activity.time}
                        </span>

                      </div>

                      <div className="mt-3 flex items-center gap-2">

                        <span className="rounded-full border border-slate-800 bg-black px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-slate-500">
                          {activity.category}
                        </span>

                        <span className="text-[10px] text-slate-700">
                          #{String(index + 1).padStart(2, "0")}
                        </span>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            </div>
          )}

        </section>

        {/* BOTTOM ACTION */}
        {activities.length > 0 && (
          <div className="mt-5 flex justify-end">

            <button
              onClick={clearActivities}
              className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-2.5 text-xs font-bold text-red-400 transition hover:border-red-500/40 hover:bg-red-500/10"
            >
              Clear Demo Activity
            </button>

          </div>
        )}

      </main>

    </div>
  );
}