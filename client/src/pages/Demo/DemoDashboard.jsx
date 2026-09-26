import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bell,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  Code2,
  Command,
  Cpu,
  ExternalLink,
  FolderGit2,
  GitBranch,
  GitCommit,
  GitMerge,
  GitPullRequest,
  Layers3,
  MessageSquare,
  MoreHorizontal,
  Package,
  Play,
  Rocket,
  Search,
  Server,
  Sparkles,
  Terminal,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

/* =========================================================
   DEVSYNC DASHBOARD
   Full standalone dashboard content.
   DemoLayout provides:
   - sidebar
   - topbar
   - theme switcher
   - notifications
   - profile
========================================================= */

const PROJECTS = [
  {
    id: "devsync",
    name: "DevSync",
    subtitle: "Developer collaboration platform",
    description:
      "Projects, tasks, team communication, activity and developer workflow in one workspace.",
    status: "Active",
    progress: 82,
    branch: "main",
    commits: 148,
    prs: 19,
    tasks: 18,
    team: 6,
    deploys: 12,
    stack: ["React", "Node.js", "MongoDB"],
    icon: Code2,
    accent: "blue",
  },
  {
    id: "skilltree",
    name: "SkillTree",
    subtitle: "Technical skill discovery platform",
    description:
      "A guided technical learning and skill exploration product for developers.",
    status: "Active",
    progress: 68,
    branch: "develop",
    commits: 92,
    prs: 11,
    tasks: 12,
    team: 4,
    deploys: 7,
    stack: ["React", "Supabase", "REST"],
    icon: Layers3,
    accent: "violet",
  },
  {
    id: "ecoloop",
    name: "EcoLoop",
    subtitle: "Smart waste exchange platform",
    description:
      "A marketplace-style platform connecting waste supply and demand.",
    status: "Planning",
    progress: 45,
    branch: "main",
    commits: 51,
    prs: 5,
    tasks: 9,
    team: 5,
    deploys: 3,
    stack: ["MERN", "Maps API"],
    icon: Rocket,
    accent: "emerald",
  },
];

const ACTIVITY = [
  {
    icon: GitMerge,
    type: "merge",
    title: "Pull request merged",
    target: "feat/auth-session",
    meta: "DevSync · #142",
    person: "Alex Morgan",
    time: "4 min ago",
    tone: "violet",
  },
  {
    icon: GitCommit,
    type: "commit",
    title: "12 commits pushed",
    target: "dashboard-refactor",
    meta: "DevSync · main",
    person: "Rahul Kumar",
    time: "17 min ago",
    tone: "blue",
  },
  {
    icon: CheckCircle2,
    type: "task",
    title: "Task completed",
    target: "Responsive dashboard",
    meta: "SkillTree · UI",
    person: "Priya Sharma",
    time: "31 min ago",
    tone: "emerald",
  },
  {
    icon: Users,
    type: "team",
    title: "Developer joined",
    target: "Emma Wilson",
    meta: "EcoLoop · Team",
    person: "System",
    time: "52 min ago",
    tone: "orange",
  },
  {
    icon: MessageSquare,
    type: "chat",
    title: "New project comment",
    target: "Sprint planning",
    meta: "DevSync · Chat",
    person: "David Chen",
    time: "1 hr ago",
    tone: "blue",
  },
  {
    icon: Rocket,
    type: "deploy",
    title: "Production deployment",
    target: "devsync-web",
    meta: "Production · v1.8.0",
    person: "CI Pipeline",
    time: "2 hrs ago",
    tone: "emerald",
  },
];

const TASKS = [
  {
    id: "DS-128",
    title: "Implement JWT Authentication",
    project: "DevSync",
    status: "In Progress",
    priority: "High",
    progress: 72,
    due: "Today",
    assignee: "AK",
  },
  {
    id: "ST-084",
    title: "Design Developer Profile",
    project: "SkillTree",
    status: "Review",
    priority: "Medium",
    progress: 88,
    due: "Tomorrow",
    assignee: "PS",
  },
  {
    id: "EL-041",
    title: "Create Project API",
    project: "EcoLoop",
    status: "To Do",
    priority: "High",
    progress: 12,
    due: "Sep 29",
    assignee: "RM",
  },
  {
    id: "DS-121",
    title: "Fix Responsive Navbar",
    project: "DevSync",
    status: "Done",
    priority: "Low",
    progress: 100,
    due: "Completed",
    assignee: "KN",
  },
  {
    id: "DS-133",
    title: "Add activity filters",
    project: "DevSync",
    status: "In Progress",
    priority: "Medium",
    progress: 56,
    due: "Sep 28",
    assignee: "SR",
  },
];

const CONTRIBUTORS = [
  {
    name: "Alex Morgan",
    initials: "AM",
    role: "Project Lead",
    commits: 42,
    prs: 8,
    tasks: 17,
    status: "Online",
  },
  {
    name: "Rahul Kumar",
    initials: "RK",
    role: "Backend",
    commits: 31,
    prs: 6,
    tasks: 14,
    status: "Online",
  },
  {
    name: "Priya Sharma",
    initials: "PS",
    role: "Frontend",
    commits: 27,
    prs: 5,
    tasks: 12,
    status: "Online",
  },
  {
    name: "Kiran Nair",
    initials: "KN",
    role: "DevOps",
    commits: 22,
    prs: 4,
    tasks: 9,
    status: "Away",
  },
];

const HEALTH = [
  {
    label: "Build",
    value: "98.7%",
    detail: "Successful builds",
    icon: Cpu,
  },
  {
    label: "Deploy",
    value: "99.2%",
    detail: "Production success",
    icon: Rocket,
  },
  {
    label: "Review",
    value: "2.4h",
    detail: "Median PR review",
    icon: GitPullRequest,
  },
  {
    label: "Velocity",
    value: "+18%",
    detail: "Vs previous sprint",
    icon: TrendingUp,
  },
];

const TONE_STYLES = {
  blue: {
    icon: "bg-blue-50 text-blue-600",
    line: "bg-blue-500",
  },
  violet: {
    icon: "bg-violet-50 text-violet-600",
    line: "bg-violet-500",
  },
  emerald: {
    icon: "bg-emerald-50 text-emerald-600",
    line: "bg-emerald-500",
  },
  orange: {
    icon: "bg-orange-50 text-orange-600",
    line: "bg-orange-500",
  },
};

const STATUS_STYLES = {
  Active: "bg-emerald-50 text-emerald-700",
  Planning: "bg-amber-50 text-amber-700",
};

const PRIORITY_STYLES = {
  High: "text-red-500",
  Medium: "text-orange-500",
  Low: "text-slate-400",
};

/* =========================================================
   SMALL COMPONENTS
========================================================= */

function Avatar({ initials, large = false }) {
  return (
    <div
      className={[
        "flex shrink-0 items-center justify-center font-black text-white",
        large
          ? "h-11 w-11 rounded-2xl text-xs"
          : "h-8 w-8 rounded-xl text-[9px]",
      ].join(" ")}
      style={{
        background:
          "linear-gradient(135deg, var(--demo-primary), #6366f1)",
        boxShadow:
          "0 8px 20px color-mix(in srgb, var(--demo-primary) 16%, transparent)",
      }}
    >
      {initials}
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
  action,
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        {eyebrow && (
          <p
            className="text-[8px] font-black uppercase tracking-[0.2em]"
            style={{ color: "var(--demo-primary)" }}
          >
            {eyebrow}
          </p>
        )}

        <h2
          className="mt-1 text-lg font-black tracking-tight"
          style={{ color: "var(--demo-text)" }}
        >
          {title}
        </h2>

        {subtitle && (
          <p
            className="mt-1 text-[10px] leading-5"
            style={{ color: "var(--demo-text-muted)" }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {action}
    </div>
  );
}

function GlassPanel({ children, className = "", style = {} }) {
  return (
    <section
      className={`border shadow-sm ${className}`}
      style={{
        background: "var(--demo-surface)",
        borderColor: "var(--demo-border)",
        ...style,
      }}
    >
      {children}
    </section>
  );
}

function MiniMetric({ label, value, detail, icon: Icon, tone = "blue" }) {
  const style = TONE_STYLES[tone] || TONE_STYLES.blue;

  return (
    <div
      className="
        group relative overflow-hidden rounded-2xl border p-4
        transition-all duration-300 hover:-translate-y-0.5
      "
      style={{
        background: "var(--demo-surface)",
        borderColor: "var(--demo-border)",
        boxShadow: "var(--demo-shadow)",
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-xl ${style.icon}`}
        >
          <Icon size={15} />
        </div>

        <span
          className="rounded-full px-2 py-1 text-[7px] font-black"
          style={{
            background: "var(--demo-surface-soft)",
            color: "var(--demo-text-soft)",
          }}
        >
          LIVE
        </span>
      </div>

      <p
        className="mt-4 text-[8px] font-black uppercase tracking-[0.16em]"
        style={{ color: "var(--demo-text-soft)" }}
      >
        {label}
      </p>

      <div className="mt-1 flex items-end gap-2">
        <p
          className="text-2xl font-black tracking-[-0.04em]"
          style={{ color: "var(--demo-text)" }}
        >
          {value}
        </p>

        <ArrowUpRight
          size={13}
          className="mb-1"
          style={{ color: "var(--demo-success)" }}
        />
      </div>

      <p
        className="mt-1 text-[8px]"
        style={{ color: "var(--demo-text-muted)" }}
      >
        {detail}
      </p>
    </div>
  );
}

function ProjectCard({ project, onOpen }) {
  const Icon = project.icon;

  const iconTone =
    project.accent === "violet"
      ? "bg-violet-50 text-violet-600"
      : project.accent === "emerald"
        ? "bg-emerald-50 text-emerald-600"
        : "bg-blue-50 text-blue-600";

  return (
    <button
      type="button"
      onClick={onOpen}
      className="
        group relative w-full overflow-hidden rounded-3xl border
        p-5 text-left transition-all duration-300
        hover:-translate-y-1
      "
      style={{
        background: "var(--demo-surface)",
        borderColor: "var(--demo-border)",
        boxShadow: "var(--demo-shadow)",
      }}
    >
      <div
        className="absolute inset-x-0 top-0 h-px opacity-0 transition-opacity group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--demo-primary), transparent)",
        }}
      />

      <div className="flex items-start justify-between gap-3">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-2xl ${iconTone}`}
        >
          <Icon size={19} />
        </div>

        <MoreHorizontal
          size={17}
          style={{ color: "var(--demo-text-soft)" }}
        />
      </div>

      <div className="mt-5">
        <div className="flex flex-wrap items-center gap-2">
          <h3
            className="text-sm font-black"
            style={{ color: "var(--demo-text)" }}
          >
            {project.name}
          </h3>

          <span
            className={`rounded-full px-2 py-1 text-[7px] font-black ${STATUS_STYLES[project.status]}`}
          >
            {project.status}
          </span>
        </div>

        <p
          className="mt-1 text-[9px] font-semibold"
          style={{ color: "var(--demo-text-muted)" }}
        >
          {project.subtitle}
        </p>
      </div>

      <p
        className="mt-3 line-clamp-2 text-[10px] leading-5"
        style={{ color: "var(--demo-text-muted)" }}
      >
        {project.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.stack.map((item) => (
          <span
            key={item}
            className="rounded-md border px-2 py-1 text-[7px] font-bold"
            style={{
              background: "var(--demo-surface-soft)",
              color: "var(--demo-text-muted)",
              borderColor: "var(--demo-border)",
            }}
          >
            {item}
          </span>
        ))}
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between">
          <span
            className="text-[7px] font-black uppercase tracking-wider"
            style={{ color: "var(--demo-text-soft)" }}
          >
            Delivery progress
          </span>

          <span
            className="text-[9px] font-black"
            style={{ color: "var(--demo-text)" }}
          >
            {project.progress}%
          </span>
        </div>

        <div
          className="h-1.5 overflow-hidden rounded-full"
          style={{ background: "var(--demo-surface-2)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${project.progress}%`,
              background:
                "linear-gradient(90deg, var(--demo-primary), #6366f1)",
            }}
          />
        </div>
      </div>

      <div
        className="mt-5 grid grid-cols-4 border-t pt-4"
        style={{ borderColor: "var(--demo-border-light, var(--demo-border))" }}
      >
        <Metric value={project.commits} label="Commits" icon={GitCommit} />
        <Metric value={project.prs} label="PRs" icon={GitPullRequest} />
        <Metric value={project.tasks} label="Tasks" icon={Check} />
        <Metric value={project.team} label="Team" icon={Users} />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span
          className="inline-flex items-center gap-1.5 text-[8px] font-bold"
          style={{ color: "var(--demo-text-muted)" }}
        >
          <GitBranch size={10} />
          {project.branch}
        </span>

        <span
          className="inline-flex items-center gap-1 text-[8px] font-black opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
          style={{ color: "var(--demo-primary)" }}
        >
          Open
          <ArrowRight size={11} />
        </span>
      </div>
    </button>
  );
}

function Metric({ value, label, icon: Icon }) {
  return (
    <div className="min-w-0">
      <div
        className="flex items-center gap-1 text-[7px]"
        style={{ color: "var(--demo-text-soft)" }}
      >
        <Icon size={9} />
        {label}
      </div>

      <p
        className="mt-1 text-xs font-black"
        style={{ color: "var(--demo-text)" }}
      >
        {value}
      </p>
    </div>
  );
}

function ActivityRow({ item }) {
  const Icon = item.icon;
  const tone = TONE_STYLES[item.tone] || TONE_STYLES.blue;

  return (
    <div
      className="
        group flex gap-3 rounded-2xl border p-3
        transition-all duration-200 hover:-translate-y-0.5
      "
      style={{
        background: "var(--demo-surface)",
        borderColor: "var(--demo-border-light, var(--demo-border))",
      }}
    >
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${tone.icon}`}
      >
        <Icon size={14} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="text-[10px] font-black"
            style={{ color: "var(--demo-text)" }}
          >
            {item.title}
          </span>

          <span
            className="text-[8px]"
            style={{ color: "var(--demo-text-soft)" }}
          >
            {item.time}
          </span>
        </div>

        <p
          className="mt-1 truncate text-[9px] font-semibold"
          style={{ color: "var(--demo-text-muted)" }}
        >
          {item.target}
        </p>

        <div
          className="mt-1 flex flex-wrap items-center gap-1.5 text-[7px]"
          style={{ color: "var(--demo-text-soft)" }}
        >
          <span>{item.meta}</span>
          <span>•</span>
          <span>{item.person}</span>
        </div>
      </div>

      <ChevronRight
        size={13}
        className="mt-2 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100"
        style={{ color: "var(--demo-text-soft)" }}
      />
    </div>
  );
}

function TaskRow({ task }) {
  return (
    <div
      className="grid gap-3 border-t px-4 py-3.5 first:border-t-0 sm:grid-cols-[1fr_110px_70px_90px]"
      style={{ borderColor: "var(--demo-border-light, var(--demo-border))" }}
    >
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span
            className="font-mono text-[7px] font-black"
            style={{ color: "var(--demo-text-soft)" }}
          >
            {task.id}
          </span>

          <span
            className="truncate text-[10px] font-black"
            style={{ color: "var(--demo-text)" }}
          >
            {task.title}
          </span>
        </div>

        <div className="mt-1 flex items-center gap-2">
          <span
            className="text-[7px] font-semibold"
            style={{ color: "var(--demo-text-soft)" }}
          >
            {task.project}
          </span>

          <span style={{ color: "var(--demo-border)" }}>•</span>

          <span
            className="text-[7px]"
            style={{ color: "var(--demo-text-soft)" }}
          >
            {task.due}
          </span>
        </div>
      </div>

      <div className="flex items-center">
        <span
          className="rounded-full px-2 py-1 text-[7px] font-black"
          style={{
            background:
              task.status === "Done"
                ? "color-mix(in srgb, var(--demo-success) 12%, transparent)"
                : task.status === "Review"
                  ? "color-mix(in srgb, var(--demo-accent) 12%, transparent)"
                  : "var(--demo-surface-soft)",
            color:
              task.status === "Done"
                ? "var(--demo-success)"
                : task.status === "Review"
                  ? "var(--demo-accent)"
                  : "var(--demo-text-muted)",
          }}
        >
          {task.status}
        </span>
      </div>

      <div className="flex items-center">
        <span
          className={`text-[7px] font-black ${PRIORITY_STYLES[task.priority]}`}
        >
          {task.priority}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <div
          className="h-1.5 flex-1 overflow-hidden rounded-full"
          style={{ background: "var(--demo-surface-2)" }}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: `${task.progress}%`,
              background: "var(--demo-primary)",
            }}
          />
        </div>

        <span
          className="text-[7px] font-black"
          style={{ color: "var(--demo-text-muted)" }}
        >
          {task.progress}%
        </span>
      </div>
    </div>
  );
}

function ContributorRow({ member, index }) {
  return (
    <div
      className="grid grid-cols-[auto_1fr_repeat(3,48px)] items-center gap-3 border-t px-2 py-3 first:border-t-0"
      style={{ borderColor: "var(--demo-border-light, var(--demo-border))" }}
    >
      <div
        className="flex h-6 w-6 items-center justify-center rounded-lg text-[7px] font-black"
        style={{
          background:
            index === 0
              ? "var(--demo-primary)"
              : "var(--demo-surface-soft)",
          color:
            index === 0 ? "#fff" : "var(--demo-text-muted)",
        }}
      >
        {index + 1}
      </div>

      <div className="flex min-w-0 items-center gap-2">
        <Avatar initials={member.initials} />

        <div className="min-w-0">
          <p
            className="truncate text-[9px] font-black"
            style={{ color: "var(--demo-text)" }}
          >
            {member.name}
          </p>

          <p
            className="truncate text-[7px]"
            style={{ color: "var(--demo-text-soft)" }}
          >
            {member.role}
          </p>
        </div>
      </div>

      <MiniNumber label="C" value={member.commits} />
      <MiniNumber label="PR" value={member.prs} />
      <MiniNumber label="TK" value={member.tasks} />
    </div>
  );
}

function MiniNumber({ label, value }) {
  return (
    <div className="text-center">
      <p
        className="text-[6px] font-black uppercase"
        style={{ color: "var(--demo-text-soft)" }}
      >
        {label}
      </p>

      <p
        className="mt-0.5 text-[9px] font-black"
        style={{ color: "var(--demo-text)" }}
      >
        {value}
      </p>
    </div>
  );
}

function ContributionMatrix() {
  const cells = Array.from({ length: 70 }, (_, index) => {
    const value = (index * 13 + index * index) % 5;
    return value;
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <span
          className="text-[8px] font-black uppercase tracking-wider"
          style={{ color: "var(--demo-text-soft)" }}
        >
          Commit activity
        </span>

        <span
          className="text-[7px]"
          style={{ color: "var(--demo-text-soft)" }}
        >
          Last 10 weeks
        </span>
      </div>

      <div className="mt-4 grid grid-cols-14 gap-1">
        {cells.map((value, index) => {
          const level =
            value === 0
              ? "opacity-15"
              : value === 1
                ? "opacity-35"
                : value === 2
                  ? "opacity-55"
                  : value === 3
                    ? "opacity-75"
                    : "opacity-100";

          return (
            <span
              key={index}
              className={`aspect-square rounded-[3px] transition-transform hover:scale-125 ${level}`}
              style={{
                background: "var(--demo-primary)",
              }}
              title={`${value + 1} commits`}
            />
          );
        })}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span
          className="text-[7px]"
          style={{ color: "var(--demo-text-soft)" }}
        >
          Mon
        </span>

        <div className="flex items-center gap-1">
          {[0.15, 0.35, 0.55, 0.75, 1].map((opacity) => (
            <span
              key={opacity}
              className="h-2 w-2 rounded-[2px]"
              style={{
                background: "var(--demo-primary)",
                opacity,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   DASHBOARD
========================================================= */

export default function DemoDashboard() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [showAllActivity, setShowAllActivity] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);

  const filteredProjects = useMemo(() => {
    const value = query.trim().toLowerCase();

    if (!value) {
      return PROJECTS;
    }

    return PROJECTS.filter((project) => {
      return (
        project.name.toLowerCase().includes(value) ||
        project.subtitle.toLowerCase().includes(value) ||
        project.stack.some((tech) =>
          tech.toLowerCase().includes(value)
        )
      );
    });
  }, [query]);

  const visibleProjects = showAllProjects
    ? filteredProjects
    : filteredProjects.slice(0, 3);

  const visibleActivity = showAllActivity
    ? ACTIVITY
    : ACTIVITY.slice(0, 4);

  return (
    <div
      className="min-h-screen"
      style={{
        background: "transparent",
        color: "var(--demo-text)",
      }}
    >
      {/* ===================================================
          AMBIENT TOP SPACE
      =================================================== */}

      <div className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute left-[8%] top-0 h-72 w-72 rounded-full blur-3xl"
          style={{
            background:
              "color-mix(in srgb, var(--demo-primary) 8%, transparent)",
          }}
        />

        <div
          className="pointer-events-none absolute right-[8%] top-12 h-80 w-80 rounded-full blur-3xl"
          style={{
            background:
              "color-mix(in srgb, var(--demo-accent) 6%, transparent)",
          }}
        />

        <main className="relative mx-auto max-w-[1650px] px-5 py-7 sm:px-7 lg:px-9 lg:py-9">
          {/* =================================================
              COMMAND HEADER
          ================================================= */}

          <section
            className="
              relative overflow-hidden rounded-[30px] border p-6
              sm:p-7 lg:p-8
            "
            style={{
              background: "var(--demo-surface)",
              borderColor: "var(--demo-border)",
              boxShadow: "var(--demo-shadow)",
            }}
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(120deg,color-mix(in srgb,var(--demo-primary) 7%,transparent),transparent 45%,color-mix(in srgb,var(--demo-accent) 4%,transparent))",
              }}
            />

            <div className="relative">
              <div className="flex flex-col gap-7 xl:flex-row xl:items-end xl:justify-between">
                <div className="max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[8px] font-black uppercase tracking-[0.18em]"
                      style={{
                        background: "var(--demo-primary-soft)",
                        color: "var(--demo-primary)",
                        borderColor: "var(--demo-border)",
                      }}
                    >
                      <Sparkles size={11} />
                      Developer command center
                    </span>

                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[7px] font-black"
                      style={{
                        background:
                          "color-mix(in srgb,var(--demo-success) 12%,transparent)",
                        color: "var(--demo-success)",
                      }}
                    >
                      <CircleDot size={9} />
                      All systems operational
                    </span>
                  </div>

                  <h1
                    className="mt-5 text-3xl font-black tracking-[-0.06em] sm:text-4xl lg:text-[46px]"
                    style={{ color: "var(--demo-text)" }}
                  >
                    Build software.
                    <br />
                    <span style={{ color: "var(--demo-primary)" }}>
                      Not context switches.
                    </span>
                  </h1>

                  <p
                    className="mt-4 max-w-2xl text-xs leading-6 sm:text-sm"
                    style={{ color: "var(--demo-text-muted)" }}
                  >
                    Your team, projects, delivery signals and
                    developer workflow — connected in one place.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => navigate("/demo/project/devsync")}
                      className="inline-flex items-center gap-2 rounded-xl px-4 py-3 text-[9px] font-black text-white transition hover:-translate-y-0.5"
                      style={{
                        background:
                          "linear-gradient(135deg,var(--demo-primary),#6366f1)",
                        boxShadow:
                          "0 12px 28px color-mix(in srgb,var(--demo-primary) 22%,transparent)",
                      }}
                    >
                      Open DevSync
                      <ArrowRight size={12} />
                    </button>

                    <button
                      type="button"
                      onClick={() => navigate("/demo/workspace")}
                      className="inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-[9px] font-black transition hover:-translate-y-0.5"
                      style={{
                        background: "var(--demo-surface-soft)",
                        color: "var(--demo-text)",
                        borderColor: "var(--demo-border)",
                      }}
                    >
                      <Terminal size={13} />
                      Open workspace
                    </button>
                  </div>
                </div>

                {/* command block */}
                <div
                  className="w-full max-w-md rounded-2xl border p-4"
                  style={{
                    background: "var(--demo-surface-soft)",
                    borderColor: "var(--demo-border)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Command
                        size={13}
                        style={{ color: "var(--demo-primary)" }}
                      />

                      <span
                        className="text-[8px] font-black uppercase tracking-[0.16em]"
                        style={{ color: "var(--demo-text-soft)" }}
                      >
                        Workspace status
                      </span>
                    </div>

                    <span
                      className="font-mono text-[7px]"
                      style={{ color: "var(--demo-text-soft)" }}
                    >
                      ENV.PROD
                    </span>
                  </div>

                  <div className="mt-4 space-y-2">
                    {[
                      ["API", "Operational", "99.98%"],
                      ["Database", "Healthy", "12ms"],
                      ["CI/CD", "Passing", "8m ago"],
                      ["Realtime", "Connected", "6 online"],
                    ].map(([label, status, meta]) => (
                      <div
                        key={label}
                        className="flex items-center justify-between rounded-xl border px-3 py-2.5"
                        style={{
                          background: "var(--demo-surface)",
                          borderColor:
                            "var(--demo-border-light, var(--demo-border))",
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="h-1.5 w-1.5 rounded-full"
                            style={{
                              background: "var(--demo-success)",
                              boxShadow:
                                "0 0 8px color-mix(in srgb,var(--demo-success) 50%,transparent)",
                            }}
                          />

                          <span
                            className="text-[8px] font-bold"
                            style={{ color: "var(--demo-text)" }}
                          >
                            {label}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <span
                            className="text-[7px]"
                            style={{
                              color: "var(--demo-text-muted)",
                            }}
                          >
                            {status}
                          </span>

                          <span
                            className="font-mono text-[7px] font-bold"
                            style={{ color: "var(--demo-primary)" }}
                          >
                            {meta}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* search row */}
              <div
                className="mt-7 flex flex-col gap-2 border-t pt-5 sm:flex-row"
                style={{ borderColor: "var(--demo-border)" }}
              >
                <div className="relative flex-1">
                  <Search
                    size={14}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2"
                    style={{ color: "var(--demo-text-soft)" }}
                  />

                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search projects, stacks, workspaces..."
                    className="h-11 w-full rounded-xl border pl-10 pr-4 text-[9px] font-semibold outline-none"
                    style={{
                      background: "var(--demo-surface-soft)",
                      color: "var(--demo-text)",
                      borderColor: "var(--demo-border)",
                    }}
                  />
                </div>

                <div
                  className="hidden items-center gap-2 rounded-xl border px-4 sm:flex"
                  style={{
                    background: "var(--demo-surface-soft)",
                    borderColor: "var(--demo-border)",
                  }}
                >
                  <CircleDot
                    size={11}
                    style={{ color: "var(--demo-success)" }}
                  />

                  <span
                    className="text-[8px] font-black"
                    style={{ color: "var(--demo-text-muted)" }}
                  >
                    24 services healthy
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              KPI STRIP
          ================================================= */}

          <section className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MiniMetric
              icon={FolderGit2}
              label="Active projects"
              value="08"
              detail="+2 this month"
              tone="blue"
            />

            <MiniMetric
              icon={GitPullRequest}
              label="Open pull requests"
              value="19"
              detail="4 awaiting review"
              tone="violet"
            />

            <MiniMetric
              icon={GitCommit}
              label="Commits this week"
              value="148"
              detail="+18% velocity"
              tone="emerald"
            />

            <MiniMetric
              icon={Zap}
              label="Sprint health"
              value="87%"
              detail="Delivery on track"
              tone="orange"
            />
          </section>

          {/* =================================================
              PROJECT GRID
          ================================================= */}

          <section className="mt-8">
            <SectionHeading
              eyebrow="Workspace"
              title="Active development"
              subtitle="Your most important software work, surfaced before the details."
              action={
                <button
                  type="button"
                  onClick={() => setShowAllProjects((value) => !value)}
                  className="inline-flex items-center gap-1 text-[9px] font-black"
                  style={{ color: "var(--demo-primary)" }}
                >
                  {showAllProjects ? "Collapse" : "View workspace"}
                  <ArrowRight size={11} />
                </button>
              }
            />

            <div className="mt-4 grid gap-4 lg:grid-cols-3">
              {visibleProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onOpen={() =>
                    navigate(`/demo/project/${project.id}`)
                  }
                />
              ))}
            </div>

            {visibleProjects.length === 0 && (
              <GlassPanel className="mt-4 rounded-3xl p-10 text-center">
                <Search
                  size={24}
                  className="mx-auto"
                  style={{ color: "var(--demo-text-soft)" }}
                />

                <h3
                  className="mt-3 text-sm font-black"
                  style={{ color: "var(--demo-text)" }}
                >
                  No projects found
                </h3>

                <p
                  className="mt-1 text-[9px]"
                  style={{ color: "var(--demo-text-muted)" }}
                >
                  Try another project, technology or stack.
                </p>
              </GlassPanel>
            )}
          </section>

          {/* =================================================
              ACTIVITY + AI
          ================================================= */}

          <section className="mt-8 grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
            <GlassPanel className="rounded-3xl p-5 sm:p-6">
              <SectionHeading
                eyebrow="Realtime"
                title="Development activity"
                subtitle="One stream across commits, reviews, tasks, people and deployments."
                action={
                  <button
                    type="button"
                    onClick={() => setShowAllActivity((value) => !value)}
                    className="inline-flex items-center gap-1 text-[8px] font-black"
                    style={{ color: "var(--demo-primary)" }}
                  >
                    {showAllActivity ? "Show less" : "View all"}
                    <ArrowRight size={10} />
                  </button>
                }
              />

              <div className="mt-5 grid gap-2">
                {visibleActivity.map((item) => (
                  <ActivityRow
                    key={`${item.title}-${item.time}`}
                    item={item}
                  />
                ))}
              </div>
            </GlassPanel>

            {/* AI intelligence */}
            <section
              className="relative overflow-hidden rounded-3xl border p-6"
              style={{
                background:
                  "linear-gradient(145deg,var(--demo-primary-soft),var(--demo-surface))",
                borderColor: "var(--demo-border)",
                boxShadow: "var(--demo-shadow)",
              }}
            >
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full blur-3xl"
                style={{
                  background:
                    "color-mix(in srgb,var(--demo-primary) 18%,transparent)",
                }}
              />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-2xl text-white"
                    style={{
                      background:
                        "linear-gradient(135deg,var(--demo-primary),#6366f1)",
                      boxShadow:
                        "0 12px 28px color-mix(in srgb,var(--demo-primary) 20%,transparent)",
                    }}
                  >
                    <Sparkles size={19} />
                  </div>

                  <span
                    className="rounded-full border px-2.5 py-1 text-[7px] font-black"
                    style={{
                      background: "var(--demo-surface)",
                      color: "var(--demo-primary)",
                      borderColor: "var(--demo-border)",
                    }}
                  >
                    AI INSIGHT
                  </span>
                </div>

                <p
                  className="mt-6 text-[8px] font-black uppercase tracking-[0.18em]"
                  style={{ color: "var(--demo-primary)" }}
                >
                  DevSync Intelligence
                </p>

                <h3
                  className="mt-2 text-xl font-black tracking-tight"
                  style={{ color: "var(--demo-text)" }}
                >
                  Your team has momentum.
                </h3>

                <p
                  className="mt-3 text-[9px] leading-5"
                  style={{ color: "var(--demo-text-muted)" }}
                >
                  Commit velocity is up, production is healthy and
                  the remaining risk is concentrated in code review.
                </p>

                <div className="mt-5 space-y-2">
                  {[
                    ["Sprint completion", "78%", "var(--demo-primary)"],
                    ["Reviews waiting", "04", "var(--demo-warning)"],
                    ["Failed builds", "00", "var(--demo-success)"],
                    ["Deploy confidence", "96%", "var(--demo-success)"],
                  ].map(([label, value, tone]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between rounded-xl border px-3 py-3"
                      style={{
                        background: "var(--demo-surface)",
                        borderColor: "var(--demo-border)",
                      }}
                    >
                      <span
                        className="text-[8px] font-bold"
                        style={{ color: "var(--demo-text-muted)" }}
                      >
                        {label}
                      </span>

                      <span
                        className="text-[9px] font-black"
                        style={{ color: tone }}
                      >
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    navigate("/demo/project/devsync/activity")
                  }
                  className="mt-5 inline-flex items-center gap-2 text-[9px] font-black"
                  style={{ color: "var(--demo-primary)" }}
                >
                  Explore activity
                  <ArrowRight size={11} />
                </button>
              </div>
            </section>
          </section>

          {/* =================================================
              WORK + HEALTH
          ================================================= */}

          <section className="mt-8 grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
            {/* Work requiring attention */}
            <GlassPanel className="overflow-hidden rounded-3xl">
              <div className="p-5 sm:p-6">
                <SectionHeading
                  eyebrow="Execution"
                  title="Work requiring attention"
                  subtitle="Priority work across the current development cycle."
                  action={
                    <button
                      type="button"
                      onClick={() =>
                        navigate("/demo/project/devsync/tasks")
                      }
                      className="inline-flex items-center gap-1 text-[8px] font-black"
                      style={{ color: "var(--demo-primary)" }}
                    >
                      Task board
                      <ArrowRight size={10} />
                    </button>
                  }
                />
              </div>

              <div className="border-t" style={{ borderColor: "var(--demo-border)" }}>
                <div
                  className="hidden grid-cols-[1fr_110px_70px_90px] gap-3 px-4 py-3 sm:grid"
                  style={{
                    background: "var(--demo-surface-soft)",
                  }}
                >
                  <span
                    className="text-[7px] font-black uppercase tracking-wider"
                    style={{ color: "var(--demo-text-soft)" }}
                  >
                    Task
                  </span>

                  <span
                    className="text-[7px] font-black uppercase tracking-wider"
                    style={{ color: "var(--demo-text-soft)" }}
                  >
                    Status
                  </span>

                  <span
                    className="text-[7px] font-black uppercase tracking-wider"
                    style={{ color: "var(--demo-text-soft)" }}
                  >
                    Priority
                  </span>

                  <span
                    className="text-[7px] font-black uppercase tracking-wider"
                    style={{ color: "var(--demo-text-soft)" }}
                  >
                    Progress
                  </span>
                </div>

                {TASKS.map((task) => (
                  <TaskRow key={task.id} task={task} />
                ))}
              </div>
            </GlassPanel>

            {/* Engineering pulse */}
            <GlassPanel className="rounded-3xl p-5 sm:p-6">
              <SectionHeading
                eyebrow="Engineering"
                title="Delivery pulse"
                subtitle="Repository and team health from the current workspace."
              />

              <div className="mt-5 grid grid-cols-2 gap-3">
                {HEALTH.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="rounded-2xl border p-4"
                      style={{
                        background: "var(--demo-surface-soft)",
                        borderColor: "var(--demo-border)",
                      }}
                    >
                      <Icon
                        size={15}
                        style={{ color: "var(--demo-primary)" }}
                      />

                      <p
                        className="mt-3 text-xl font-black tracking-tight"
                        style={{ color: "var(--demo-text)" }}
                      >
                        {item.value}
                      </p>

                      <p
                        className="mt-1 text-[8px] font-black"
                        style={{ color: "var(--demo-text)" }}
                      >
                        {item.label}
                      </p>

                      <p
                        className="mt-1 text-[7px]"
                        style={{ color: "var(--demo-text-soft)" }}
                      >
                        {item.detail}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div
                className="mt-5 rounded-2xl border p-4"
                style={{
                  background: "var(--demo-surface-soft)",
                  borderColor: "var(--demo-border)",
                }}
              >
                <ContributionMatrix />
              </div>

              <div
                className="mt-4 flex items-center gap-3 rounded-2xl border p-4"
                style={{
                  background:
                    "color-mix(in srgb,var(--demo-success) 8%,transparent)",
                  borderColor:
                    "color-mix(in srgb,var(--demo-success) 22%,var(--demo-border))",
                }}
              >
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-white"
                  style={{ background: "var(--demo-success)" }}
                >
                  <Rocket size={15} />
                </div>

                <div className="min-w-0 flex-1">
                  <p
                    className="text-[9px] font-black"
                    style={{ color: "var(--demo-text)" }}
                  >
                    Production is healthy
                  </p>

                  <p
                    className="mt-0.5 text-[7px]"
                    style={{ color: "var(--demo-text-muted)" }}
                  >
                    Latest deploy passed all checks.
                  </p>
                </div>

                <span
                  className="rounded-full px-2 py-1 text-[7px] font-black"
                  style={{
                    background:
                      "color-mix(in srgb,var(--demo-success) 12%,transparent)",
                    color: "var(--demo-success)",
                  }}
                >
                  PASSING
                </span>
              </div>
            </GlassPanel>
          </section>

          {/* =================================================
              CONTRIBUTORS + QUICK ACTIONS
          ================================================= */}

          <section className="mt-8 grid gap-5 lg:grid-cols-[1fr_0.75fr]">
            <GlassPanel className="rounded-3xl p-5 sm:p-6">
              <SectionHeading
                eyebrow="People"
                title="Top contributors"
                subtitle="Who's moving the workspace forward."
                action={
                  <button
                    type="button"
                    onClick={() =>
                      navigate("/demo/project/devsync/team")
                    }
                    className="inline-flex items-center gap-1 text-[8px] font-black"
                    style={{ color: "var(--demo-primary)" }}
                  >
                    Open team
                    <ArrowRight size={10} />
                  </button>
                }
              />

              <div className="mt-5">
                {CONTRIBUTORS.map((member, index) => (
                  <ContributorRow
                    key={member.name}
                    member={member}
                    index={index}
                  />
                ))}
              </div>
            </GlassPanel>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <QuickAction
                icon={Terminal}
                title="Code Workspace"
                text="Open the integrated developer environment."
                onClick={() => navigate("/demo/workspace")}
                tone="cyan"
              />

              <QuickAction
                icon={MessageSquare}
                title="Project Chat"
                text="Continue the conversation with your team."
                onClick={() =>
                  navigate("/demo/project/devsync/chat")
                }
                tone="violet"
              />

              <QuickAction
                icon={FolderGit2}
                title="Repository Files"
                text="Browse files and recent repository changes."
                onClick={() =>
                  navigate("/demo/project/devsync/files")
                }
                tone="emerald"
              />
            </div>
          </section>

          {/* =================================================
              FINAL CTA
          ================================================= */}

          <section
            className="mt-8 overflow-hidden rounded-3xl border p-6 sm:p-8"
            style={{
              background:
                "linear-gradient(135deg,var(--demo-surface-soft),var(--demo-surface))",
              borderColor: "var(--demo-border)",
              boxShadow: "var(--demo-shadow)",
            }}
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2">
                  <Zap
                    size={14}
                    style={{ color: "var(--demo-primary)" }}
                  />

                  <span
                    className="text-[8px] font-black uppercase tracking-[0.2em]"
                    style={{ color: "var(--demo-primary)" }}
                  >
                    Keep shipping
                  </span>
                </div>

                <h2
                  className="mt-2 text-xl font-black tracking-tight sm:text-2xl"
                  style={{ color: "var(--demo-text)" }}
                >
                  Move from signal to action.
                </h2>

                <p
                  className="mt-2 text-[9px] leading-5"
                  style={{ color: "var(--demo-text-muted)" }}
                >
                  Open your workspace, review the task board, inspect
                  activity or jump into team chat without leaving DevSync.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => navigate("/demo/workspace")}
                  className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-[8px] font-black text-white"
                  style={{
                    background:
                      "linear-gradient(135deg,var(--demo-primary),#6366f1)",
                  }}
                >
                  <Play size={11} />
                  Launch workspace
                </button>

                <button
                  type="button"
                  onClick={() =>
                    navigate("/demo/project/devsync/tasks")
                  }
                  className="inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-[8px] font-black"
                  style={{
                    background: "var(--demo-surface)",
                    color: "var(--demo-text)",
                    borderColor: "var(--demo-border)",
                  }}
                >
                  <Check size={11} />
                  Review tasks
                </button>
              </div>
            </div>
          </section>

          <footer
            className="flex flex-col gap-2 pb-3 pt-6 text-[7px] sm:flex-row sm:items-center sm:justify-between"
            style={{ color: "var(--demo-text-soft)" }}
          >
            <span>DevSync · Developer Collaboration Platform</span>

            <span className="inline-flex items-center gap-1.5">
              <Server size={10} />
              Demo workspace · All systems operational
            </span>
          </footer>
        </main>
      </div>
    </div>
  );
}
