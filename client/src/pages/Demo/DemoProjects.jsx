import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiArrowRight,
  FiBarChart2,
  FiCalendar,
  FiCheckCircle,
  FiChevronDown,
  FiClock,
  FiCode,
  FiFolder,
  FiGithub,
  FiGrid,
  FiList,
  FiMoreHorizontal,
  FiPlus,
  FiSearch,
  FiUsers,
  FiX,
} from "react-icons/fi";

const PROJECTS = [
  {
    id: "devsync",
    name: "DevSync",
    description:
      "AI-powered developer collaboration and project management platform.",
    status: "Active",
    visibility: "Public",
    progress: 82,
    tasks: "24/31",
    members: 8,
    language: "React",
    repository: "shankar-uxcloud/devsync",
    due: "Sep 30, 2026",
    updated: "12 min ago",
    icon: "code",
    tags: ["React", "Node.js", "MongoDB"],
  },
  {
    id: "skilltree",
    name: "SkillTree",
    description:
      "Interactive platform for discovering and exploring technical skills.",
    status: "In Progress",
    visibility: "Private",
    progress: 64,
    tasks: "18/28",
    members: 5,
    language: "React",
    repository: "skilltree/platform",
    due: "Oct 14, 2026",
    updated: "1 hour ago",
    icon: "grid",
    tags: ["React", "Supabase", "REST"],
  },
  {
    id: "ecoloop",
    name: "EcoLoop",
    description:
      "Smart waste exchange platform connecting people and recycling partners.",
    status: "Planning",
    visibility: "Public",
    progress: 28,
    tasks: "9/32",
    members: 4,
    language: "MERN",
    repository: "ecoloop/platform",
    due: "Nov 20, 2026",
    updated: "3 hours ago",
    icon: "folder",
    tags: ["MongoDB", "Express", "React"],
  },
  {
    id: "focusframe",
    name: "Focus Frame",
    description:
      "Distraction-free learning workspace with AI-assisted productivity tools.",
    status: "Active",
    visibility: "Private",
    progress: 71,
    tasks: "21/29",
    members: 6,
    language: "Python",
    repository: "focusframe/learning",
    due: "Oct 05, 2026",
    updated: "Yesterday",
    icon: "bar",
    tags: ["Python", "Flask", "AI"],
  },
  {
    id: "foodrescue",
    name: "Food Rescue Network",
    description:
      "Community platform for redistributing surplus food to local organizations.",
    status: "Review",
    visibility: "Public",
    progress: 48,
    tasks: "14/30",
    members: 7,
    language: "Node.js",
    repository: "foodrescue/network",
    due: "Nov 02, 2026",
    updated: "Yesterday",
    icon: "users",
    tags: ["Node.js", "Maps", "MongoDB"],
  },
  {
    id: "whiteboard",
    name: "Collaborative Whiteboard",
    description:
      "Real-time visual workspace for teams to brainstorm and build ideas.",
    status: "Active",
    visibility: "Private",
    progress: 57,
    tasks: "17/30",
    members: 5,
    language: "TypeScript",
    repository: "team/whiteboard",
    due: "Dec 01, 2026",
    updated: "2 days ago",
    icon: "grid",
    tags: ["TypeScript", "Socket.IO", "React"],
  },
];

const FILTERS = ["All", "Active", "In Progress", "Planning", "Review"];

function ProjectIcon({ type }) {
  const icons = {
    code: <FiCode />,
    grid: <FiGrid />,
    folder: <FiFolder />,
    bar: <FiBarChart2 />,
    users: <FiUsers />,
  };

  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-xl text-white shadow-lg shadow-blue-500/20">
      {icons[type] || <FiFolder />}
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Active: "bg-emerald-50 text-emerald-700 border-emerald-200",
    "In Progress": "bg-blue-50 text-blue-700 border-blue-200",
    Planning: "bg-amber-50 text-amber-700 border-amber-200",
    Review: "bg-violet-50 text-violet-700 border-violet-200",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold ${
        styles[status] || "bg-slate-50 text-slate-700 border-slate-200"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

function ProgressBar({ value }) {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
      <div
        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-700"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

function Stat({ icon, label, value }) {
  return (
    <div className="flex items-center gap-2 text-sm text-slate-500">
      <span className="text-slate-400">{icon}</span>
      <span>{value}</span>
      <span>{label}</span>
    </div>
  );
}

function ProjectCard({ project }) {
  const navigate = useNavigate();

  return (
    <article
      onClick={() => navigate(`/demo/project/${project.id}`)}
      className="group cursor-pointer rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/10"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4">
          <ProjectIcon type={project.icon} />

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate text-lg font-black text-slate-950">
                {project.name}
              </h3>

              <StatusBadge status={project.status} />
            </div>

            <p className="mt-1 text-xs font-medium text-slate-400">
              {project.visibility} workspace
            </p>
          </div>
        </div>

        <button
          onClick={(event) => event.stopPropagation()}
          className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          aria-label={`More options for ${project.name}`}
        >
          <FiMoreHorizontal />
        </button>
      </div>

      <p className="mt-5 line-clamp-2 min-h-[42px] text-sm leading-6 text-slate-500">
        {project.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-lg bg-slate-50 px-2.5 py-1 text-[11px] font-bold text-slate-500"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Progress
          </span>

          <span className="text-sm font-black text-slate-900">
            {project.progress}%
          </span>
        </div>

        <ProgressBar value={project.progress} />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 border-t border-slate-100 pt-5">
        <Stat
          icon={<FiCheckCircle />}
          label="tasks"
          value={project.tasks}
        />

        <Stat
          icon={<FiUsers />}
          label="members"
          value={project.members}
        />

        <Stat
          icon={<FiGithub />}
          label="repo"
          value={project.language}
        />

        <Stat
          icon={<FiClock />}
          label="updated"
          value={project.updated}
        />
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <FiCalendar />
          Due {project.due}
        </div>

        <span className="flex items-center gap-1 text-sm font-bold text-blue-600 opacity-0 transition group-hover:opacity-100">
          Open
          <FiArrowRight />
        </span>
      </div>
    </article>
  );
}

export default function DemoProjects() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [view, setView] = useState("grid");
  const [showFilter, setShowFilter] = useState(false);

  const filteredProjects = useMemo(() => {
    const query = search.toLowerCase().trim();

    return PROJECTS.filter((project) => {
      const matchesSearch =
        !query ||
        project.name.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.tags.some((tag) => tag.toLowerCase().includes(query));

      const matchesFilter =
        filter === "All" || project.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  return (
    <main className="min-h-full bg-slate-50 text-slate-950">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="border-b border-slate-200 bg-white">
        <div className="px-6 py-8 lg:px-8">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <div className="mb-4 flex items-center gap-2 text-sm">
                <Link
                  to="/demo"
                  className="font-medium text-slate-400 transition hover:text-blue-600"
                >
                  Workspace
                </Link>

                <span className="text-slate-300">/</span>

                <span className="font-bold text-slate-900">
                  Projects
                </span>
              </div>

              <div className="flex items-start gap-4">
                <div className="hidden h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-2xl text-white shadow-xl sm:flex">
                  <FiFolder />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
                      Projects
                    </h1>

                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">
                      {PROJECTS.length} total
                    </span>
                  </div>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                    Manage projects, track progress, and collaborate
                    with your development team.
                  </p>
                </div>
              </div>
            </div>

            <Link
              to="/demo/projects/new"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/30"
            >
              <FiPlus size={18} />
              New Project
              <FiArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <section className="px-6 py-7 lg:px-8">
        {/* ===================================================
            TOOLBAR
        =================================================== */}

        <div className="mb-7 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            {/* Search */}

            <div className="relative w-full xl:max-w-xl">
              <FiSearch
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search projects, technologies..."
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-11 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />

              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700"
                >
                  <FiX size={16} />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Filter */}

              <div className="relative">
                <button
                  onClick={() => setShowFilter((value) => !value)}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  <FiBarChart2 />
                  {filter}
                  <FiChevronDown />
                </button>

                {showFilter && (
                  <div className="absolute right-0 top-full z-20 mt-2 w-44 overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl">
                    {FILTERS.map((item) => (
                      <button
                        key={item}
                        onClick={() => {
                          setFilter(item);
                          setShowFilter(false);
                        }}
                        className={`w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition ${
                          filter === item
                            ? "bg-blue-50 text-blue-600"
                            : "text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* View toggle */}

              <div className="flex rounded-xl border border-slate-200 bg-slate-50 p-1">
                <button
                  onClick={() => setView("grid")}
                  className={`rounded-lg p-2.5 transition ${
                    view === "grid"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-slate-400 hover:text-slate-700"
                  }`}
                  aria-label="Grid view"
                >
                  <FiGrid />
                </button>

                <button
                  onClick={() => setView("list")}
                  className={`rounded-lg p-2.5 transition ${
                    view === "list"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-slate-400 hover:text-slate-700"
                  }`}
                  aria-label="List view"
                >
                  <FiList />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================
            SUMMARY
        =================================================== */}

        <div className="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Total projects
            </p>

            <p className="mt-2 text-3xl font-black">
              {PROJECTS.length}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Across your workspace
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Active
            </p>

            <p className="mt-2 text-3xl font-black">
              {PROJECTS.filter((p) => p.status === "Active").length}
            </p>

            <p className="mt-1 text-xs text-emerald-600">
              Currently being shipped
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Collaborators
            </p>

            <p className="mt-2 text-3xl font-black">
              {PROJECTS.reduce((sum, project) => sum + project.members, 0)}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Across all projects
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Avg. progress
            </p>

            <p className="mt-2 text-3xl font-black">
              {Math.round(
                PROJECTS.reduce(
                  (sum, project) => sum + project.progress,
                  0
                ) / PROJECTS.length
              )}
              %
            </p>

            <p className="mt-1 text-xs text-blue-600">
              Workspace delivery
            </p>
          </div>
        </div>

        {/* ===================================================
            PROJECTS
        =================================================== */}

        {filteredProjects.length > 0 ? (
          <div
            className={
              view === "grid"
                ? "grid gap-5 lg:grid-cols-2"
                : "flex flex-col gap-4"
            }
          >
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-2xl text-slate-400">
              <FiSearch />
            </div>

            <h3 className="mt-5 text-xl font-black">
              No projects found
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
              Try another search term or change the project status
              filter.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setFilter("All");
              }}
              className="mt-5 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* ===================================================
            BOTTOM CTA
        =================================================== */}

        <div className="mt-8 overflow-hidden rounded-3xl bg-slate-950 p-7 text-white shadow-xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-blue-300">
                Build something great
              </p>

              <h2 className="mt-2 text-2xl font-black">
                Start a new project
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
                Create a workspace, connect your repository, and bring
                your team together.
              </p>
            </div>

            <Link
              to="/demo/projects/new"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-blue-50"
            >
              Create project
              <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}