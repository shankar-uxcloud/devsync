import {
  Activity,
  ArrowRight,
  Check,
  ChevronRight,
  CircleDot,
  Code2,
  FolderGit2,
  GitBranch,
  GitCommit,
  GitPullRequest,
  MessageSquare,
  MoreHorizontal,
  Rocket,
  Sparkles,
  Terminal,
  Users,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

/* =========================================================
   DEVSYNC — DASHBOARD CONTENT ONLY
   NOTE:
   DemoLayout already provides:
   - Sidebar
   - Topbar
   - Profile
   - Notifications
   - Theme controls

   This file intentionally does NOT render another shell.
========================================================= */

const projects = [
  {
    id: "devsync",
    name: "DevSync",
    description: "Developer collaboration platform",
    progress: 82,
    status: "Active",
    branch: "main",
    commits: 48,
    prs: 7,
    tasks: 18,
    stack: ["React", "Node.js", "MongoDB"],
    icon: Code2,
    tone: "blue",
  },
  {
    id: "skilltree",
    name: "SkillTree",
    description: "Technical skill discovery platform",
    progress: 68,
    status: "Active",
    branch: "develop",
    commits: 31,
    prs: 4,
    tasks: 12,
    stack: ["React", "Supabase", "REST API"],
    icon: FolderGit2,
    tone: "violet",
  },
  {
    id: "ecoloop",
    name: "EcoLoop",
    description: "Smart waste exchange platform",
    progress: 45,
    status: "Planning",
    branch: "main",
    commits: 17,
    prs: 2,
    tasks: 9,
    stack: ["MERN", "Maps API"],
    icon: Rocket,
    tone: "emerald",
  },
];

const activities = [
  {
    icon: GitPullRequest,
    title: "Pull request merged",
    description: "Authentication flow",
    user: "Alex Morgan",
    time: "4 min ago",
    tone: "violet",
  },
  {
    icon: GitCommit,
    title: "12 commits pushed",
    description: "devsync / main",
    user: "Rahul Kumar",
    time: "31 min ago",
    tone: "blue",
  },
  {
    icon: Check,
    title: "Task completed",
    description: "Responsive dashboard",
    user: "Priya Sharma",
    time: "18 min ago",
    tone: "emerald",
  },
  {
    icon: Users,
    title: "Developer joined",
    description: "EcoLoop project",
    user: "Emma Wilson",
    time: "52 min ago",
    tone: "orange",
  },
  {
    icon: MessageSquare,
    title: "New project comment",
    description: "Sprint planning",
    user: "David Chen",
    time: "1 hr ago",
    tone: "blue",
  },
  {
    icon: Rocket,
    title: "Production deployment",
    description: "devsync / production",
    user: "CI Pipeline",
    time: "2 hrs ago",
    tone: "emerald",
  },
];

const tasks = [
  {
    title: "Implement JWT Authentication",
    project: "DevSync",
    status: "In Progress",
    priority: "High",
    progress: 72,
  },
  {
    title: "Design Developer Profile",
    project: "SkillTree",
    status: "Review",
    priority: "Medium",
    progress: 88,
  },
  {
    title: "Create Project API",
    project: "EcoLoop",
    status: "To Do",
    priority: "High",
    progress: 12,
  },
  {
    title: "Fix Responsive Navbar",
    project: "DevSync",
    status: "Done",
    priority: "Low",
    progress: 100,
  },
];

/* =========================================================
   SMALL COMPONENTS
========================================================= */

function StatCard({
  icon: Icon,
  label,
  value,
  change,
  description,
  tone = "blue",
}) {
  const tones = {
    blue: {
      icon: "bg-blue-50 text-blue-600",
      glow: "group-hover:shadow-blue-100",
    },
    violet: {
      icon: "bg-violet-50 text-violet-600",
      glow: "group-hover:shadow-violet-100",
    },
    emerald: {
      icon: "bg-emerald-50 text-emerald-600",
      glow: "group-hover:shadow-emerald-100",
    },
    orange: {
      icon: "bg-orange-50 text-orange-600",
      glow: "group-hover:shadow-orange-100",
    },
  };

  const current = tones[tone];

  return (
    <div
      className={`group relative overflow-hidden rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.035)] transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl ${current.glow}`}
    >
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-slate-50 blur-2xl" />

      <div className="relative flex items-start justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${current.icon}`}
        >
          <Icon size={18} />
        </div>

        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[8px] font-black text-emerald-600">
          {change}
        </span>
      </div>

      <div className="relative mt-5">
        <p className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">
          {label}
        </p>

        <p className="mt-1 text-3xl font-black tracking-[-0.05em] text-slate-950">
          {value}
        </p>

        <p className="mt-1 text-[9px] font-medium text-slate-400">
          {description}
        </p>
      </div>
    </div>
  );
}

function ProjectCard({ project, onOpen }) {
  const Icon = project.icon;

  const iconClass =
    project.tone === "violet"
      ? "bg-violet-50 text-violet-600"
      : project.tone === "emerald"
      ? "bg-emerald-50 text-emerald-600"
      : "bg-blue-50 text-blue-600";

  return (
    <button
      onClick={onOpen}
      className="group w-full rounded-[22px] border border-slate-200 bg-white p-5 text-left shadow-[0_8px_30px_rgba(15,23,42,0.035)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_20px_50px_rgba(37,99,235,0.09)]"
    >
      <div className="flex items-start justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}
        >
          <Icon size={18} />
        </div>

        <MoreHorizontal
          size={17}
          className="text-slate-300"
        />
      </div>

      <div className="mt-5">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-black text-slate-950">
            {project.name}
          </h3>

          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        </div>

        <p className="mt-1 text-[10px] leading-5 text-slate-500">
          {project.description}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[8px] font-bold text-slate-500"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
            Development progress
          </span>

          <span className="text-[9px] font-black text-slate-700">
            {project.progress}%
          </span>
        </div>

        <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 transition-all duration-700"
            style={{
              width: `${project.progress}%`,
            }}
          />
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 divide-x divide-slate-100 border-t border-slate-100 pt-4">
        <div>
          <p className="flex items-center gap-1 text-[8px] text-slate-400">
            <GitCommit size={10} />
            Commits
          </p>
          <p className="mt-1 text-xs font-black text-slate-800">
            {project.commits}
          </p>
        </div>

        <div className="pl-3">
          <p className="flex items-center gap-1 text-[8px] text-slate-400">
            <GitPullRequest size={10} />
            PRs
          </p>
          <p className="mt-1 text-xs font-black text-slate-800">
            {project.prs}
          </p>
        </div>

        <div className="pl-3">
          <p className="flex items-center gap-1 text-[8px] text-slate-400">
            <Check size={10} />
            Tasks
          </p>
          <p className="mt-1 text-xs font-black text-slate-800">
            {project.tasks}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-[8px] font-bold text-slate-400">
          <GitBranch size={10} />
          {project.branch}
        </span>

        <span className="flex items-center gap-1 text-[9px] font-black text-blue-600 opacity-0 transition group-hover:opacity-100">
          Open
          <ArrowRight size={11} />
        </span>
      </div>
    </button>
  );
}

function ActivityItem({ item }) {
  const Icon = item.icon;

  const tone =
    item.tone === "violet"
      ? "bg-violet-50 text-violet-600"
      : item.tone === "emerald"
      ? "bg-emerald-50 text-emerald-600"
      : item.tone === "orange"
      ? "bg-orange-50 text-orange-600"
      : "bg-blue-50 text-blue-600";

  return (
    <div className="group flex gap-3 rounded-2xl p-3 transition hover:bg-slate-50">
      <div className="relative shrink-0">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-xl ${tone}`}
        >
          <Icon size={14} />
        </div>

        <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-black text-slate-800">
          {item.title}
        </p>

        <p className="mt-0.5 truncate text-[9px] text-slate-400">
          {item.description}
        </p>

        <div className="mt-1 flex items-center gap-1.5 text-[8px] text-slate-400">
          <span>{item.user}</span>
          <span>•</span>
          <span>{item.time}</span>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN DASHBOARD
========================================================= */

export default function DemoDashboard() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const filteredProjects = useMemo(() => {
    if (!search.trim()) return projects;

    const value = search.toLowerCase();

    return projects.filter(
      (project) =>
        project.name.toLowerCase().includes(value) ||
        project.description
          .toLowerCase()
          .includes(value) ||
        project.stack.some((tech) =>
          tech.toLowerCase().includes(value)
        )
    );
  }, [search]);

  const openProject = (id) => {
    navigate(`/demo/project/${id}`);
  };

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      {/* ===================================================
          DASHBOARD CONTENT
      =================================================== */}

      <div className="mx-auto max-w-[1500px] px-5 py-7 sm:px-7 lg:px-8 lg:py-8">
        {/* =================================================
            HERO / COMMAND CENTER
        ================================================= */}

        <section className="mb-7 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.035)]">
          <div className="relative p-6 sm:p-7 lg:p-8">
            <div className="absolute right-[-100px] top-[-100px] h-72 w-72 rounded-full bg-blue-100/50 blur-3xl" />

            <div className="relative flex flex-col justify-between gap-7 xl:flex-row xl:items-end">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[8px] font-black uppercase tracking-[0.18em] text-blue-600">
                  <Sparkles size={11} />
                  Developer command center
                </div>

                <h1 className="text-3xl font-black tracking-[-0.05em] text-slate-950 sm:text-4xl lg:text-[42px]">
                  Good morning, Alex
                  <span className="ml-2">👋</span>
                </h1>

                <p className="mt-2 max-w-2xl text-xs leading-6 text-slate-500 sm:text-sm">
                  Code, projects, people and delivery — everything
                  your team needs to keep software moving.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() =>
                    navigate("/demo/workspace")
                  }
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-[10px] font-black text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                >
                  <Terminal size={14} />
                  Open workspace
                </button>

                <button
                  onClick={() =>
                    navigate("/demo/project/devsync")
                  }
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-[10px] font-black text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5"
                >
                  <Rocket size={14} />
                  Open DevSync
                  <ArrowRight size={12} />
                </button>
              </div>
            </div>
          </div>

          {/* quick search inside dashboard */}
          <div className="border-t border-slate-100 bg-slate-50/70 px-6 py-4 sm:px-7 lg:px-8">
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <SearchIcon />

                <input
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Find a project, technology or workspace..."
                  className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-[10px] font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
                />
              </div>

              <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 sm:flex">
                <CircleDot
                  size={11}
                  className="text-emerald-500"
                />

                <span className="text-[8px] font-black text-slate-500">
                  Workspace healthy
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            ENGINEERING PULSE
        ================================================= */}

        <section className="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={FolderGit2}
            label="Active projects"
            value="08"
            change="+2"
            description="Compared with last month"
            tone="blue"
          />

          <StatCard
            icon={GitPullRequest}
            label="Pull requests"
            value="19"
            change="+7"
            description="Across your workspace"
            tone="violet"
          />

          <StatCard
            icon={GitCommit}
            label="Commits this week"
            value="148"
            change="+18%"
            description="Engineering activity"
            tone="emerald"
          />

          <StatCard
            icon={Zap}
            label="Sprint health"
            value="87%"
            change="Healthy"
            description="Delivery confidence"
            tone="orange"
          />
        </section>

        {/* =================================================
            PROJECTS
        ================================================= */}

        <section className="mb-7">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black tracking-tight text-slate-950">
                  Active development
                </h2>

                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[8px] font-black text-slate-500">
                  {filteredProjects.length}
                </span>
              </div>

              <p className="mt-1 text-[10px] text-slate-400">
                See where your software is moving before opening
                each project.
              </p>
            </div>

            <button
              onClick={() =>
                navigate("/demo/project/devsync")
              }
              className="hidden items-center gap-1 text-[10px] font-black text-blue-600 sm:flex"
            >
              View workspace
              <ArrowRight size={12} />
            </button>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpen={() => openProject(project.id)}
              />
            ))}
          </div>
        </section>

        {/* =================================================
            AI + ACTIVITY
        ================================================= */}

        <section className="mb-7 grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
          {/* Activity */}
          <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.035)] sm:p-6">
            <div className="mb-5 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-black text-slate-950">
                    Development activity
                  </h2>

                  <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[7px] font-black text-emerald-600">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                    LIVE
                  </span>
                </div>

                <p className="mt-1 text-[9px] text-slate-400">
                  A single timeline for code, tasks, team and
                  deployments.
                </p>
              </div>

              <button
                onClick={() =>
                  navigate("/demo/project/devsync/activity")
                }
                className="text-[9px] font-black text-blue-600"
              >
                View all
              </button>
            </div>

            <div className="grid gap-1 md:grid-cols-2">
              {activities.map((activity) => (
                <ActivityItem
                  key={`${activity.title}-${activity.time}`}
                  item={activity}
                />
              ))}
            </div>
          </div>

          {/* AI */}
          <div className="relative overflow-hidden rounded-[24px] border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6 shadow-[0_15px_50px_rgba(37,99,235,0.07)]">
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-200/40 blur-3xl" />

            <div className="relative">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                  <Sparkles size={18} />
                </div>

                <span className="rounded-full border border-blue-100 bg-white px-2 py-1 text-[7px] font-black text-blue-600">
                  AI INSIGHT
                </span>
              </div>

              <p className="mt-5 text-[8px] font-black uppercase tracking-[0.18em] text-blue-600">
                DevSync Intelligence
              </p>

              <h3 className="mt-2 text-xl font-black tracking-tight text-slate-950">
                Your sprint has momentum.
              </h3>

              <p className="mt-3 text-[10px] leading-5 text-slate-500">
                Development velocity is healthy, but two pull
                requests are waiting for review.
              </p>

              <div className="mt-5 space-y-2">
                <div className="flex items-center justify-between rounded-xl border border-white bg-white/80 px-3 py-3">
                  <span className="text-[8px] font-bold text-slate-500">
                    Sprint completion
                  </span>

                  <span className="text-[9px] font-black text-blue-600">
                    78%
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-white bg-white/80 px-3 py-3">
                  <span className="text-[8px] font-bold text-slate-500">
                    Reviews waiting
                  </span>

                  <span className="text-[9px] font-black text-orange-500">
                    02
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-white bg-white/80 px-3 py-3">
                  <span className="text-[8px] font-bold text-slate-500">
                    Deployment status
                  </span>

                  <span className="text-[9px] font-black text-emerald-600">
                    Passing
                  </span>
                </div>
              </div>

              <button
                onClick={() =>
                  navigate("/demo/project/devsync/activity")
                }
                className="mt-5 flex items-center gap-1 text-[9px] font-black text-blue-600"
              >
                Explore intelligence
                <ArrowRight size={11} />
              </button>
            </div>
          </div>
        </section>

        {/* =================================================
            WORK + ENGINEERING PULSE
        ================================================= */}

        <section className="grid gap-5 xl:grid-cols-[1fr_0.72fr]">
          {/* Tasks */}
          <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.035)] sm:p-6">
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h2 className="text-base font-black text-slate-950">
                  Work requiring attention
                </h2>

                <p className="mt-1 text-[9px] text-slate-400">
                  Prioritized engineering work across projects.
                </p>
              </div>

              <button
                onClick={() =>
                  navigate("/demo/project/devsync/tasks")
                }
                className="text-[9px] font-black text-blue-600"
              >
                Task board
              </button>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-100">
              <div className="hidden grid-cols-[1fr_100px_70px_80px] gap-4 bg-slate-50 px-4 py-3 text-[7px] font-black uppercase tracking-wider text-slate-400 sm:grid">
                <span>Task</span>
                <span>Status</span>
                <span>Priority</span>
                <span>Progress</span>
              </div>

              {tasks.map((task) => (
                <div
                  key={task.title}
                  className="grid gap-3 border-t border-slate-100 px-4 py-4 sm:grid-cols-[1fr_100px_70px_80px] sm:items-center"
                >
                  <div className="min-w-0">
                    <p className="truncate text-[9px] font-black text-slate-800">
                      {task.title}
                    </p>

                    <p className="mt-1 text-[7px] text-slate-400">
                      {task.project}
                    </p>
                  </div>

                  <div>
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-[7px] font-black ${
                        task.status === "Done"
                          ? "bg-emerald-50 text-emerald-600"
                          : task.status === "Review"
                          ? "bg-violet-50 text-violet-600"
                          : task.status === "In Progress"
                          ? "bg-blue-50 text-blue-600"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {task.status}
                    </span>
                  </div>

                  <div>
                    <span
                      className={`text-[7px] font-black ${
                        task.priority === "High"
                          ? "text-red-500"
                          : task.priority === "Medium"
                          ? "text-orange-500"
                          : "text-slate-400"
                      }`}
                    >
                      {task.priority}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-blue-600"
                        style={{
                          width: `${task.progress}%`,
                        }}
                      />
                    </div>

                    <span className="text-[7px] font-black text-slate-500">
                      {task.progress}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Engineering pulse */}
          <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.035)] sm:p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-base font-black text-slate-950">
                  Engineering pulse
                </h2>

                <p className="mt-1 text-[9px] text-slate-400">
                  A quick view of development velocity.
                </p>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-white">
                <GitBranch size={15} />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <GitCommit
                  size={14}
                  className="text-blue-600"
                />

                <p className="mt-3 text-2xl font-black text-slate-950">
                  148
                </p>

                <p className="mt-1 text-[8px] font-semibold text-slate-400">
                  Commits this week
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <GitPullRequest
                  size={14}
                  className="text-violet-600"
                />

                <p className="mt-3 text-2xl font-black text-slate-950">
                  19
                </p>

                <p className="mt-1 text-[8px] font-semibold text-slate-400">
                  Pull requests
                </p>
              </div>
            </div>

            {/* Contribution graph */}
            <div className="mt-6">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[8px] font-black text-slate-500">
                  Development activity
                </span>

                <span className="text-[7px] text-slate-400">
                  Last 30 days
                </span>
              </div>

              <div className="grid grid-cols-10 gap-1">
                {Array.from(
                  { length: 50 },
                  (_, index) => {
                    const intensity =
                      (index * 7) % 5;

                    const classes = [
                      "bg-slate-100",
                      "bg-blue-100",
                      "bg-blue-200",
                      "bg-blue-400",
                      "bg-blue-600",
                    ];

                    return (
                      <span
                        key={index}
                        className={`aspect-square rounded-[3px] ${classes[intensity]}`}
                      />
                    );
                  }
                )}
              </div>
            </div>

            {/* Deployment */}
            <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-white">
                  <Rocket size={13} />
                </div>

                <div className="flex-1">
                  <p className="text-[9px] font-black text-emerald-700">
                    Production deployment
                  </p>

                  <p className="mt-0.5 text-[7px] text-emerald-600">
                    devsync / production
                  </p>
                </div>

                <span className="rounded-full bg-white px-2 py-1 text-[7px] font-black text-emerald-600">
                  PASSED
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            FOOTER ACTION STRIP
        ================================================= */}

        <section className="mt-7 grid gap-3 md:grid-cols-3">
          <button
            onClick={() =>
              navigate("/demo/workspace")
            }
            className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
              <Terminal size={17} />
            </div>

            <div className="flex-1">
              <p className="text-[10px] font-black text-slate-900">
                Code Workspace
              </p>

              <p className="mt-1 text-[8px] text-slate-400">
                Open your development environment
              </p>
            </div>

            <ChevronRight
              size={14}
              className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600"
            />
          </button>

          <button
            onClick={() =>
              navigate("/demo/project/devsync/team")
            }
            className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-lg"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
              <Users size={17} />
            </div>

            <div className="flex-1">
              <p className="text-[10px] font-black text-slate-900">
                Developer team
              </p>

              <p className="mt-1 text-[8px] text-slate-400">
                People, workload and collaboration
              </p>
            </div>

            <ChevronRight
              size={14}
              className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-violet-600"
            />
          </button>

          <button
            onClick={() =>
              navigate("/demo/project/devsync/activity")
            }
            className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-lg"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Activity size={17} />
            </div>

            <div className="flex-1">
              <p className="text-[10px] font-black text-slate-900">
                Project activity
              </p>

              <p className="mt-1 text-[8px] text-slate-400">
                Everything changing across the workspace
              </p>
            </div>

            <ChevronRight
              size={14}
              className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-emerald-600"
            />
          </button>
        </section>
      </div>
    </div>
  );
}

/* =========================================================
   SEARCH ICON
========================================================= */

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

