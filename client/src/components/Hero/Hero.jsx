import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaGithub,
  FaUsers,
  FaTasks,
  FaCode,
  FaCheckCircle,
  FaChartLine,
  FaComments,
  FaRobot,
  FaBell,
  FaPlus,
  FaSearch,
  FaChevronDown,
} from "react-icons/fa";

const navItems = ["Overview", "Projects", "My Tasks", "Team", "Messages", "GitHub"];

const stats = [
  { label: "Active Projects", value: "08", change: "+2 this week", icon: FaTasks },
  { label: "Tasks Completed", value: "124", change: "+18% this sprint", icon: FaCheckCircle },
  { label: "Team Members", value: "12", change: "3 active now", icon: FaUsers },
  { label: "GitHub Activity", value: "+18%", change: "vs last sprint", icon: FaChartLine },
];

const progress = [
  { name: "DevSync Platform", value: 78 },
  { name: "Mobile Workspace", value: 61 },
  { name: "AI Assistant", value: 86 },
];

const activity = [
  { initials: "AK", text: "Alex pushed changes to authentication", time: "2 min ago" },
  { initials: "PS", text: "Priya completed Dashboard UI", time: "18 min ago" },
  { initials: "RV", text: "Rahul opened pull request #42", time: "32 min ago" },
  { initials: "SK", text: "You created a new project", time: "1 hr ago" },
];

function Hero() {
  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-[#f8fafc] pt-24 text-slate-900">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-260px] h-[650px] w-[900px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute right-[-180px] top-[18%] h-[420px] w-[420px] rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.035)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent_82%)]" />
      </div>

      <div className="mx-auto flex max-w-7xl flex-col px-6 pb-20 pt-16 lg:px-10 lg:pt-20">
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-white/80 px-4 py-2 text-xs font-semibold text-blue-700 shadow-sm backdrop-blur">
            <span className="h-2 w-2 animate-pulse rounded-full bg-blue-600" />
            AI-powered collaboration for modern engineering teams
            <FaArrowRight className="text-[10px]" />
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-5xl text-center">
          <h1 className="text-5xl font-black tracking-[-0.055em] text-slate-950 sm:text-6xl lg:text-8xl">
            Build better software.
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Together.
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            DevSync brings projects, tasks, GitHub activity, team communication,
            and AI-assisted workflows into one focused workspace for developers.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/register"
              className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 text-sm font-bold text-white shadow-[0_12px_30px_rgba(37,99,235,0.24)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(37,99,235,0.32)]"
            >
              Start Building
              <FaArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            <Link
              to="/dashboard"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-6 text-sm font-bold text-slate-800 shadow-sm backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-700 hover:shadow-md"
            >
              Explore Dashboard
            </Link>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-slate-500">
            <span>No credit card required</span>
            <span className="text-slate-300">•</span>
            <span>Built for developers</span>
            <span className="text-slate-300">•</span>
            <span>Real-time collaboration</span>
          </div>
        </div>

        <div className="relative mx-auto mt-16 w-full max-w-6xl lg:mt-20">
          <div className="absolute inset-x-16 bottom-[-40px] h-36 rounded-full bg-blue-600/15 blur-3xl" />

          <div className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-slate-950 shadow-[0_30px_100px_rgba(15,23,42,0.20)] ring-1 ring-black/5">
            <div className="flex h-12 items-center justify-between border-b border-white/10 bg-slate-950 px-4 sm:px-5">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              </div>

              <div className="hidden items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-1.5 text-[10px] text-white/40 sm:flex">
                app.devsync.local
              </div>

              <div className="flex items-center gap-3 text-white/45">
                <FaBell className="text-xs" />
                <div className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-500 to-violet-500" />
              </div>
            </div>

            <div className="grid min-h-[610px] grid-cols-1 lg:grid-cols-[205px_minmax(0,1fr)]">
              <aside className="hidden border-r border-white/10 bg-slate-950/80 p-4 lg:block">
                <div className="mb-6 flex items-center gap-2 px-2 text-white">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-sm">
                    <FaCode />
                  </div>
                  <span className="font-extrabold tracking-tight">DevSync</span>
                </div>

                <div className="px-2 pb-2 text-[9px] font-bold uppercase tracking-[0.14em] text-white/25">
                  Workspace
                </div>

                <div className="space-y-1">
                  {navItems.map((item, index) => (
                    <div
                      key={item}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-[11px] font-medium transition ${
                        index === 0
                          ? "bg-blue-500/15 text-white ring-1 ring-inset ring-blue-400/20"
                          : "text-white/45 hover:bg-white/[0.04] hover:text-white/70"
                      }`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-7 px-2 pb-2 text-[9px] font-bold uppercase tracking-[0.14em] text-white/25">
                  Manage
                </div>

                <div className="space-y-1">
                  {["AI Assistant", "Settings"].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[11px] font-medium text-white/45"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
                      {item}
                    </div>
                  ))}
                </div>
              </aside>

              <div className="min-w-0 bg-[#0f172a] p-4 sm:p-6 lg:p-7">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[10px] text-white/35">
                      Workspace <FaChevronDown className="text-[7px]" />
                    </div>

                    <h2 className="mt-1 text-xl font-bold tracking-tight text-white sm:text-2xl">
                      Good morning, Developer 👋
                    </h2>

                    <p className="mt-1 text-[11px] text-white/40">
                      Here's what's happening across your workspace.
                    </p>
                  </div>

                  <button className="inline-flex w-fit items-center gap-2 rounded-lg bg-blue-600 px-3.5 py-2 text-[10px] font-bold text-white shadow-lg shadow-blue-950/30 transition hover:bg-blue-500">
                    <FaPlus className="text-[8px]" />
                    New Project
                  </button>
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-9 flex-1 items-center gap-2 rounded-lg border border-white/8 bg-white/[0.035] px-3 text-[10px] text-white/30">
                    <FaSearch className="text-[9px]" />
                    Search projects, tasks, people...
                  </div>

                  <div className="hidden h-9 items-center gap-2 rounded-lg border border-white/8 bg-white/[0.035] px-3 text-[10px] text-white/50 sm:flex">
                    <FaComments />
                    7
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2.5 xl:grid-cols-4">
                  {stats.map(({ label, value, change, icon: Icon }) => (
                    <div
                      key={label}
                      className="group rounded-xl border border-white/[0.07] bg-white/[0.035] p-3.5 transition duration-200 hover:-translate-y-0.5 hover:border-white/[0.12] hover:bg-white/[0.05]"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-medium text-white/40">
                          {label}
                        </span>
                        <Icon className="text-[10px] text-blue-400/80" />
                      </div>

                      <div className="mt-2 text-lg font-extrabold tracking-tight text-white">
                        {value}
                      </div>

                      <div className="mt-1 text-[8px] font-semibold text-blue-400/90">
                        {change}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-3 grid gap-3 xl:grid-cols-[1.25fr_0.95fr]">
                  <div className="rounded-xl border border-white/[0.07] bg-white/[0.035] p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-white">
                        Project Progress
                      </span>
                      <span className="text-[9px] text-white/30">
                        This sprint
                      </span>
                    </div>

                    {progress.map((project) => (
                      <div key={project.name} className="mb-4 last:mb-0">
                        <div className="mb-1.5 flex items-center justify-between text-[9px]">
                          <span className="text-white/65">{project.name}</span>
                          <span className="text-white/35">{project.value}%</span>
                        </div>

                        <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500"
                            style={{ width: `${project.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-xl border border-white/[0.07] bg-white/[0.035] p-4">
                    <div className="mb-2 text-[11px] font-bold text-white">
                      Recent Activity
                    </div>

                    {activity.map((item) => (
                      <div
                        key={item.text}
                        className="flex gap-2.5 border-b border-white/[0.05] py-2.5 last:border-0"
                      >
                        <div className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gradient-to-br from-blue-500 to-violet-500 text-[7px] font-bold text-white">
                          {item.initials}
                        </div>

                        <div className="min-w-0">
                          <p className="text-[9px] leading-4 text-white/60">
                            {item.text}
                          </p>
                          <p className="text-[8px] text-white/25">
                            {item.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-3 rounded-xl border border-blue-400/10 bg-gradient-to-r from-blue-500/[0.09] to-violet-500/[0.07] p-3.5">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-blue-500/15 text-blue-300">
                    <FaRobot className="text-sm" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="text-[9px] font-bold text-white">
                      DevSync AI
                    </div>

                    <div className="mt-0.5 truncate text-[9px] text-white/40">
                      Sprint 12 is 82% complete · 3 tasks need attention · GitHub activity is on track.
                    </div>
                  </div>

                  <span className="hidden rounded-md bg-white/5 px-2 py-1 text-[8px] font-semibold text-white/40 sm:block">
                    View insight
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-5 flex max-w-3xl flex-wrap items-center justify-center gap-x-5 gap-y-2 text-center text-xs text-slate-400">
            <span className="inline-flex items-center gap-2">
              <FaTasks /> Projects &amp; tasks
            </span>

            <span className="inline-flex items-center gap-2">
              <FaGithub /> GitHub activity
            </span>

            <span className="inline-flex items-center gap-2">
              <FaComments /> Real-time collaboration
            </span>

            <span className="inline-flex items-center gap-2">
              <FaRobot /> AI assistance
            </span>
          </div>
        </div>

        <div className="mx-auto mt-20 w-full max-w-5xl border-y border-slate-200/80 py-5">
          <div className="grid gap-5 text-center sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["01", "Plan", "Turn ideas into organized work."],
              ["02", "Collaborate", "Keep conversations in context."],
              ["03", "Ship", "Connect execution with GitHub."],
              ["04", "Improve", "Use AI to find what matters next."],
            ].map(([number, title, description]) => (
              <div key={number} className="px-3">
                <div className="text-[10px] font-bold tracking-[0.12em] text-blue-600">
                  {number}
                </div>

                <div className="mt-1 text-sm font-bold text-slate-900">
                  {title}
                </div>

                <div className="mt-1 text-xs leading-5 text-slate-500">
                  {description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
