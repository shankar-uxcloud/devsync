import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCalendarAlt,
  FaCheckCircle,
  FaCode,
  FaFolderOpen,
  FaTasks,
  FaUsers,
} from "react-icons/fa";

import API from "../../api/axios";

function ProjectOverview() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProject = async () => {
      try {
        setLoading(true);
        setError("");

        const { data } = await API.get(`/projects/${projectId}`);
        setProject(data.project);
      } catch (err) {
        console.error("LOAD PROJECT ERROR:", err);

        if (err.response?.status === 401) {
          navigate("/login", { replace: true });
          return;
        }

        setError(
          err.response?.data?.message ||
            "Unable to load this project."
        );
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [projectId, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030303] text-white">
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-sm font-bold text-slate-500">
            Loading project...
          </p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-[#030303] text-white">
        <div className="flex min-h-screen flex-col items-center justify-center">
          <h1 className="text-5xl font-black">Project not found</h1>

          <p className="mt-3 text-sm text-slate-500">
            {error || "This project does not exist."}
          </p>

          <Link
            to="/projects"
            className="mt-6 flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-black"
          >
            <FaArrowLeft />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const members = Array.isArray(project.members)
    ? project.members.length
    : 0;

  const progress = Number(project.progress) || 0;
  const completedTasks = Number(project.completedTasks) || 0;
  const totalTasks = Number(project.totalTasks) || 0;

  return (
    <div className="min-h-screen bg-[#030303] text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#030303]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-6 lg:px-8">
          <Link
            to="/projects"
            className="flex items-center gap-3 text-slate-400 transition hover:text-white"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10">
              <FaArrowLeft />
            </div>

            <span className="text-sm font-bold">All Projects</span>
          </Link>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/20">
              <FaCode />
            </div>

            <span className="text-xl font-black">
              Dev<span className="text-blue-500">Sync</span>
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1500px] px-6 py-10 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-blue-400">
              <FaFolderOpen />
              Project Workspace
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-4">
              <h1 className="text-4xl font-black sm:text-5xl">
                {project.name}
              </h1>

              <span className="rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-black text-emerald-400">
                {project.status || "Active"}
              </span>
            </div>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-500">
              {project.description ||
                "No project description has been added yet."}
            </p>

            <p className="mt-3 text-xs font-bold text-slate-600">
              {project.type || "Project"}
            </p>
          </div>

          <Link
            to="/projects"
            className="flex w-fit items-center gap-3 rounded-xl border border-white/10 px-5 py-3 text-sm font-black text-slate-400 transition hover:border-blue-500/30 hover:text-white"
          >
            <FaArrowLeft />
            All Projects
          </Link>
        </div>

        <section className="mt-10 rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-950/20 to-transparent p-7">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-slate-500">
                Project Progress
              </p>

              <p className="mt-2 text-5xl font-black">
                {progress}%
              </p>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600/10 text-xl text-blue-400">
              <FaCheckCircle />
            </div>
          </div>

          <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-900">
            <div
              className="h-full rounded-full bg-blue-600 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          <SummaryCard
            icon={<FaUsers />}
            title="Team Members"
            value={members}
          />

          <SummaryCard
            icon={<FaTasks />}
            title="Tasks"
            value={`${completedTasks}/${totalTasks}`}
          />

          <SummaryCard
            icon={<FaCalendarAlt />}
            title="Due Date"
            value={
              project.dueDate
                ? new Date(project.dueDate).toLocaleDateString()
                : "Not set"
            }
          />
        </section>

        <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.02] p-7">
          <h2 className="text-xl font-black">Technologies</h2>

          <div className="mt-5 flex flex-wrap gap-3">
            {project.technologies?.length > 0 ? (
              project.technologies.map((technology, index) => (
                <span
                  key={`${technology}-${index}`}
                  className="rounded-xl border border-white/10 bg-black px-4 py-2 text-xs font-bold text-slate-400"
                >
                  {technology}
                </span>
              ))
            ) : (
              <p className="text-sm text-slate-600">
                No technologies added.
              </p>
            )}
          </div>
        </section>

        {/* ACTIONS */}
        <section className="mt-6 grid gap-4 md:grid-cols-3">
          <ActionCard
            icon={<FaTasks />}
            title="Tasks"
            description="Plan and track project development."
            onClick={() =>
              navigate(`/projects/${project._id}/tasks`)
            }
          />

          <ActionCard
            icon={<FaUsers />}
            title="Team"
            description="Manage project members and roles."
            onClick={() =>
              navigate(`/projects/${project._id}/team`)
            }
          />

          <ActionCard
            icon={<FaCode />}
            title="Workspace"
            description="Work on your project's development."
            onClick={() =>
              navigate(`/projects/${project._id}/workspace`)
            }
          />
        </section>
      </main>
    </div>
  );
}

function SummaryCard({ icon, title, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600/10 text-blue-400">
        {icon}
      </div>

      <p className="mt-5 text-xs font-bold text-slate-500">
        {title}
      </p>

      <p className="mt-2 text-2xl font-black">{value}</p>
    </div>
  );
}

function ActionCard({
  icon,
  title,
  description,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-left transition hover:-translate-y-1 hover:border-blue-500/30 hover:bg-white/[0.04]"
    >
      <div className="flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600/10 text-blue-400">
          {icon}
        </div>

        <FaArrowRight className="text-slate-700 transition group-hover:translate-x-1 group-hover:text-blue-400" />
      </div>

      <h3 className="mt-5 text-lg font-black">{title}</h3>

      <p className="mt-2 text-xs leading-6 text-slate-600">
        {description}
      </p>
    </button>
  );
}

export default ProjectOverview;