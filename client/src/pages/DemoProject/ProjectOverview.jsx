import { Link, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCalendarAlt,
  FaCheckCircle,
  FaCode,
  FaComments,
  FaFileAlt,
  FaFolderOpen,
  FaGithub,
  FaRocket,
  FaTasks,
  FaUsers,
  FaClock,
  FaBrain,
  FaExclamationTriangle,
  FaChevronRight,
  FaCircle,
} from "react-icons/fa";

/* =========================================================
   PROJECT DATA
========================================================= */

const projectData = {
  devsync: {
    name: "DevSync",
    description: "AI-powered developer collaboration platform",
    status: "Active",
    progress: 82,
    completedTasks: 24,
    totalTasks: 31,
    members: 8,
    dueSoon: 5,
    technologies: ["React", "Node.js", "MongoDB", "Express"],
    repository: "https://github.com/",
    milestone: "Authentication & Collaboration",
    milestoneProgress: 82,
  },

  skilltree: {
    name: "SkillTree",
    description: "Technical skill discovery platform",
    status: "Active",
    progress: 68,
    completedTasks: 18,
    totalTasks: 27,
    members: 5,
    dueSoon: 3,
    technologies: ["React", "Supabase", "REST API"],
    repository: "https://github.com/",
    milestone: "Skill Recommendation Engine",
    milestoneProgress: 68,
  },

  ecoloop: {
    name: "EcoLoop",
    description: "Smart waste exchange platform",
    status: "Planning",
    progress: 45,
    completedTasks: 9,
    totalTasks: 20,
    members: 6,
    dueSoon: 4,
    technologies: ["MongoDB", "Express", "React", "Node.js"],
    repository: "https://github.com/",
    milestone: "Core Platform Development",
    milestoneProgress: 45,
  },
};

/* =========================================================
   TASKS
========================================================= */

const recentTasks = [
  {
    id: 1,
    title: "Implement JWT Authentication",
    assignee: "Alex Morgan",
    status: "Done",
    priority: "High",
  },
  {
    id: 2,
    title: "Design Dashboard UI",
    assignee: "Priya Sharma",
    status: "Review",
    priority: "Medium",
  },
  {
    id: 3,
    title: "Build Chat Integration",
    assignee: "Rahul Kumar",
    status: "In Progress",
    priority: "High",
  },
  {
    id: 4,
    title: "Create Notification System",
    assignee: "Emma Wilson",
    status: "To Do",
    priority: "Low",
  },
];

/* =========================================================
   ACTIVITIES
========================================================= */

const activities = [
  {
    id: 1,
    user: "Alex Morgan",
    action: "completed",
    target: "JWT Authentication",
    time: "12 minutes ago",
    icon: <FaCheckCircle />,
    type: "success",
  },
  {
    id: 2,
    user: "Priya Sharma",
    action: "updated",
    target: "Dashboard UI",
    time: "35 minutes ago",
    icon: <FaCode />,
    type: "code",
  },
  {
    id: 3,
    user: "Rahul Kumar",
    action: "joined",
    target: "the project",
    time: "1 hour ago",
    icon: <FaUsers />,
    type: "team",
  },
  {
    id: 4,
    user: "Emma Wilson",
    action: "uploaded",
    target: "API documentation",
    time: "2 hours ago",
    icon: <FaFileAlt />,
    type: "file",
  },
];

/* =========================================================
   TEAM
========================================================= */

const team = [
  {
    name: "Alex Morgan",
    role: "Project Owner",
    initials: "A",
    status: "Online",
  },
  {
    name: "Priya Sharma",
    role: "Frontend Developer",
    initials: "P",
    status: "Online",
  },
  {
    name: "Rahul Kumar",
    role: "Backend Developer",
    initials: "R",
    status: "Away",
  },
  {
    name: "Emma Wilson",
    role: "UI/UX Designer",
    initials: "E",
    status: "Online",
  },
];

/* =========================================================
   MAIN COMPONENT
========================================================= */

function ProjectOverview() {
  const { projectId } = useParams();

  const project =
    projectData[projectId] || projectData.devsync;

  const basePath = `/demo/project/${projectId || "devsync"}`;

  return (
    <div className="min-h-screen bg-[#030303] text-white">

      {/* =====================================================
          PROJECT HEADER
      ====================================================== */}

      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#030303]/95 backdrop-blur-xl">

        <div className="flex h-20 items-center justify-between px-5 lg:px-8">

          {/* LEFT */}

          <div className="flex min-w-0 items-center gap-4">

            <Link
              to="/demo"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] text-slate-400 transition hover:border-blue-500/40 hover:text-blue-400"
            >
              <FaArrowLeft />
            </Link>

            <div className="hidden h-8 w-px bg-white/10 sm:block" />

            <div className="flex min-w-0 items-center gap-3">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                <FaRocket />
              </div>

              <div className="min-w-0">

                <div className="flex items-center gap-2">

                  <span className="hidden text-xs text-slate-600 sm:inline">
                    DevSync /
                  </span>

                  <h1 className="truncate text-lg font-black">
                    {project.name}
                  </h1>

                </div>

                <p className="truncate text-[10px] text-slate-600">
                  {project.description}
                </p>

              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div className="flex items-center gap-3">

            <span className="hidden rounded-full border border-blue-500/30 bg-blue-500/5 px-4 py-2 text-[10px] font-black text-blue-400 sm:inline">
              DEMO MODE
            </span>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 font-black">
              A
            </div>

          </div>

        </div>

      </header>

      {/* =====================================================
          PROJECT NAVIGATION
      ====================================================== */}

      <ProjectNavigation basePath={basePath} />

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <main className="mx-auto max-w-[1500px] px-5 py-8 lg:px-8">

        {/* ===================================================
            PROJECT INTRO
        ==================================================== */}

        <section className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

          <div>

            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-blue-400">

              <FaRocket />

              Project Overview

            </div>

            <div className="mt-3 flex flex-wrap items-center gap-3">

              <h2 className="text-4xl font-black tracking-tight lg:text-5xl">
                {project.name}
              </h2>

              <span
                className={`rounded-full px-3 py-1.5 text-[10px] font-black ${
                  project.status === "Active"
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-yellow-500/10 text-yellow-400"
                }`}
              >
                {project.status}
              </span>

            </div>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500">
              {project.description}. Monitor development progress,
              coordinate your team, manage tasks and understand what
              needs attention from one connected workspace.
            </p>

          </div>

          <Link
            to={`${basePath}/tasks`}
            className="flex w-fit items-center gap-3 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-black text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-500"
          >
            <FaTasks />
            View Tasks
            <FaArrowRight className="text-xs" />
          </Link>

        </section>

        {/* ===================================================
            PROGRESS HERO
        ==================================================== */}

        <section className="mt-8 overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600/[0.12] via-indigo-600/[0.05] to-transparent">

          <div className="p-6 lg:p-8">

            <div className="grid gap-8 lg:grid-cols-[1fr_360px]">

              {/* LEFT */}

              <div>

                <div className="flex items-start justify-between gap-5">

                  <div>

                    <p className="text-xs font-black uppercase tracking-wider text-blue-400">
                      Overall Project Progress
                    </p>

                    <p className="mt-2 text-5xl font-black">
                      {project.progress}%
                    </p>

                    <p className="mt-2 text-xs text-slate-500">
                      {project.completedTasks} of{" "}
                      {project.totalTasks} tasks completed
                    </p>

                  </div>

                  <div className="hidden h-16 w-16 items-center justify-center rounded-2xl bg-blue-600/10 text-2xl text-blue-400 sm:flex">
                    <FaChartIcon />
                  </div>

                </div>

                <div className="mt-7">

                  <div className="h-4 overflow-hidden rounded-full bg-black/40">

                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 transition-all"
                      style={{
                        width: `${project.progress}%`,
                      }}
                    />

                  </div>

                  <div className="mt-2 flex justify-between text-[10px] text-slate-600">

                    <span>
                      Project started
                    </span>

                    <span>
                      {project.progress}% complete
                    </span>

                  </div>

                </div>

              </div>

              {/* RIGHT */}

              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">

                <p className="text-[10px] font-black uppercase tracking-wider text-slate-600">
                  Current Milestone
                </p>

                <h3 className="mt-3 text-lg font-black">
                  {project.milestone}
                </h3>

                <div className="mt-5 flex items-center justify-between text-[10px]">

                  <span className="text-slate-500">
                    Milestone progress
                  </span>

                  <span className="font-black text-blue-400">
                    {project.milestoneProgress}%
                  </span>

                </div>

                <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800">

                  <div
                    className="h-full rounded-full bg-blue-500"
                    style={{
                      width: `${project.milestoneProgress}%`,
                    }}
                  />

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* ===================================================
            SUMMARY CARDS
        ==================================================== */}

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <MetricCard
            icon={<FaTasks />}
            title="Tasks"
            value={`${project.completedTasks}/${project.totalTasks}`}
            subtitle="completed"
            link={`${basePath}/tasks`}
            color="blue"
          />

          <MetricCard
            icon={<FaUsers />}
            title="Team Members"
            value={project.members}
            subtitle="members working"
            link={`${basePath}/team`}
            color="purple"
          />

          <MetricCard
            icon={<FaClock />}
            title="Due Soon"
            value={project.dueSoon}
            subtitle="tasks need attention"
            link={`${basePath}/tasks`}
            color="yellow"
          />

          <MetricCard
            icon={<FaGithub />}
            title="Repository"
            value="Connected"
            subtitle="GitHub integration"
            href={project.repository}
            color="green"
          />

        </section>

        {/* ===================================================
            MAIN GRID
        ==================================================== */}

        <section className="mt-6 grid gap-6 xl:grid-cols-[1fr_390px]">

          {/* =================================================
              LEFT COLUMN
          ================================================== */}

          <div className="space-y-6">

            {/* RECENT TASKS */}

            <section className="rounded-3xl border border-white/10 bg-white/[0.015]">

              <SectionHeader
                title="Recent Tasks"
                subtitle="Latest work happening in this project"
                link={`${basePath}/tasks`}
                linkText="View all tasks"
              />

              <div className="divide-y divide-white/5">

                {recentTasks.map((task) => (
                  <TaskRow
                    key={task.id}
                    task={task}
                  />
                ))}

              </div>

            </section>

            {/* RECENT ACTIVITY */}

            <section className="rounded-3xl border border-white/10 bg-white/[0.015]">

              <SectionHeader
                title="Recent Activity"
                subtitle="Latest changes across the project"
                link={`${basePath}/activity`}
                linkText="View activity"
              />

              <div className="divide-y divide-white/5">

                {activities.map((activity) => (
                  <ActivityRow
                    key={activity.id}
                    activity={activity}
                  />
                ))}

              </div>

            </section>

          </div>

          {/* =================================================
              RIGHT COLUMN
          ================================================== */}

          <div className="space-y-6">

            {/* AI INSIGHT */}

            <section className="rounded-3xl border border-blue-500/20 bg-blue-500/[0.04] p-6">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                  <FaBrain />
                </div>

                <div>

                  <h3 className="font-black">
                    DevSync AI
                  </h3>

                  <p className="text-[10px] text-blue-400">
                    Project intelligence
                  </p>

                </div>

              </div>

              <div className="mt-5 rounded-2xl border border-blue-500/10 bg-black/20 p-4">

                <div className="flex gap-3">

                  <FaCheckCircle className="mt-0.5 shrink-0 text-emerald-400" />

                  <p className="text-xs leading-6 text-slate-400">

                    Authentication work is progressing well.
                    The next priority should be API testing and
                    error handling before the next milestone.

                  </p>

                </div>

              </div>

              <div className="mt-3 rounded-2xl border border-yellow-500/10 bg-yellow-500/[0.03] p-4">

                <div className="flex gap-3">

                  <FaExclamationTriangle className="mt-0.5 shrink-0 text-yellow-400" />

                  <p className="text-xs leading-6 text-slate-500">

                    5 tasks are approaching their deadlines.

                  </p>

                </div>

              </div>

              <Link
                to="/demo/workspace"
                className="mt-5 flex items-center justify-between rounded-xl border border-blue-500/20 bg-blue-500/5 px-4 py-3 text-xs font-black text-blue-400 transition hover:bg-blue-500/10"
              >

                Open AI Workspace

                <FaArrowRight />

              </Link>

            </section>

            {/* TEAM */}

            <section className="rounded-3xl border border-white/10 bg-white/[0.015]">

              <SectionHeader
                title="Project Team"
                subtitle={`${project.members} members`}
                link={`${basePath}/team`}
                linkText="View team"
              />

              <div className="space-y-1 p-3">

                {team.map((member) => (
                  <TeamRow
                    key={member.name}
                    member={member}
                  />
                ))}

              </div>

            </section>

            {/* TECHNOLOGIES */}

            <section className="rounded-3xl border border-white/10 bg-white/[0.015] p-6">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                  <FaCode />
                </div>

                <div>

                  <h3 className="font-black">
                    Technologies
                  </h3>

                  <p className="text-[10px] text-slate-600">
                    Project technology stack
                  </p>

                </div>

              </div>

              <div className="mt-5 flex flex-wrap gap-2">

                {project.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-[10px] font-bold text-slate-400"
                  >
                    {technology}
                  </span>
                ))}

              </div>

            </section>

          </div>

        </section>

        {/* ===================================================
            QUICK ACCESS
        ==================================================== */}

        <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.015] p-6">

          <div className="mb-5">

            <h2 className="text-xl font-black">
              Project Workspace
            </h2>

            <p className="mt-1 text-xs text-slate-600">
              Open the tools used by your development team.
            </p>

          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">

            <WorkspaceLink
              to={`${basePath}/tasks`}
              icon={<FaTasks />}
              title="Tasks"
              description="Manage workflow"
              color="blue"
            />

            <WorkspaceLink
              to={`${basePath}/team`}
              icon={<FaUsers />}
              title="Team"
              description="Project members"
              color="purple"
            />

            <WorkspaceLink
              to={`${basePath}/chat`}
              icon={<FaComments />}
              title="Chat"
              description="Team communication"
              color="cyan"
            />

            <WorkspaceLink
              to={`${basePath}/files`}
              icon={<FaFolderOpen />}
              title="Files"
              description="Project resources"
              color="yellow"
            />

            <WorkspaceLink
              to={`${basePath}/activity`}
              icon={<FaClock />}
              title="Activity"
              description="Project timeline"
              color="green"
            />

          </div>

        </section>

      </main>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="mt-12 border-t border-white/10">

        <div className="flex flex-col gap-2 px-6 py-7 text-xs text-slate-600 lg:px-8">

          <p>
            DevSync Project Workspace
          </p>

          <p>
            Build â€¢ Collaborate â€¢ Track â€¢ Improve
          </p>

        </div>

      </footer>

    </div>
  );
}

/* =========================================================
   PROJECT NAVIGATION
========================================================= */

function ProjectNavigation({ basePath }) {
  const navigation = [
    {
      label: "Overview",
      to: basePath,
      icon: <FaRocket />,
    },
    {
      label: "Tasks",
      to: `${basePath}/tasks`,
      icon: <FaTasks />,
    },
    {
      label: "Team",
      to: `${basePath}/team`,
      icon: <FaUsers />,
    },
    {
      label: "Chat",
      to: `${basePath}/chat`,
      icon: <FaComments />,
    },
    {
      label: "Files",
      to: `${basePath}/files`,
      icon: <FaFolderOpen />,
    },
    {
      label: "Activity",
      to: `${basePath}/activity`,
      icon: <FaClock />,
    },
  ];

  return (
    <nav className="border-b border-white/10 bg-black/40">

      <div className="flex overflow-x-auto px-5 lg:px-8">

        {navigation.map((item, index) => (
          <Link
            key={item.label}
            to={item.to}
            className={`flex shrink-0 items-center gap-2 border-b-2 px-5 py-4 text-xs font-bold transition ${
              index === 0
                ? "border-blue-500 text-blue-400"
                : "border-transparent text-slate-600 hover:text-slate-300"
            }`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}

      </div>

    </nav>
  );
}

/* =========================================================
   METRIC CARD
========================================================= */

function MetricCard({
  icon,
  title,
  value,
  subtitle,
  link,
  href,
  color,
}) {
  const content = (
    <>
      <div className="flex items-start justify-between">

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${
            color === "purple"
              ? "bg-purple-500/10 text-purple-400"
              : color === "yellow"
              ? "bg-yellow-500/10 text-yellow-400"
              : color === "green"
              ? "bg-emerald-500/10 text-emerald-400"
              : "bg-blue-500/10 text-blue-400"
          }`}
        >
          {icon}
        </div>

        <FaChevronRight className="text-xs text-slate-700" />

      </div>

      <p className="mt-5 text-xs font-bold text-slate-500">
        {title}
      </p>

      <p className="mt-1 text-2xl font-black">
        {value}
      </p>

      <p className="mt-1 text-[10px] text-slate-600">
        {subtitle}
      </p>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="rounded-2xl border border-white/10 bg-white/[0.015] p-5 transition hover:border-blue-500/20 hover:bg-white/[0.025]"
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      to={link}
      className="rounded-2xl border border-white/10 bg-white/[0.015] p-5 transition hover:border-blue-500/20 hover:bg-white/[0.025]"
    >
      {content}
    </Link>
  );
}

/* =========================================================
   SECTION HEADER
========================================================= */

function SectionHeader({
  title,
  subtitle,
  link,
  linkText,
}) {
  return (
    <div className="flex items-center justify-between border-b border-white/10 p-6">

      <div>

        <h2 className="text-lg font-black">
          {title}
        </h2>

        <p className="mt-1 text-[10px] text-slate-600">
          {subtitle}
        </p>

      </div>

      <Link
        to={link}
        className="flex items-center gap-2 text-[10px] font-black text-blue-400 transition hover:text-blue-300"
      >
        {linkText}
        <FaArrowRight />
      </Link>

    </div>
  );
}

/* =========================================================
   TASK ROW
========================================================= */

function TaskRow({ task }) {
  return (
    <div className="flex items-center gap-4 p-5 transition hover:bg-white/[0.02]">

      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
          task.status === "Done"
            ? "bg-emerald-500/10 text-emerald-400"
            : task.status === "Review"
            ? "bg-purple-500/10 text-purple-400"
            : task.status === "In Progress"
            ? "bg-blue-500/10 text-blue-400"
            : "bg-slate-500/10 text-slate-500"
        }`}
      >
        {task.status === "Done" ? (
          <FaCheckCircle />
        ) : (
          <FaTasks />
        )}
      </div>

      <div className="min-w-0 flex-1">

        <p className="truncate text-xs font-black">
          {task.title}
        </p>

        <p className="mt-1 text-[10px] text-slate-600">
          Assigned to {task.assignee}
        </p>

      </div>

      <span
        className={`hidden rounded-full px-2.5 py-1 text-[9px] font-black sm:inline ${
          task.priority === "High"
            ? "bg-red-500/10 text-red-400"
            : task.priority === "Medium"
            ? "bg-yellow-500/10 text-yellow-400"
            : "bg-emerald-500/10 text-emerald-400"
        }`}
      >
        {task.priority}
      </span>

      <span className="hidden text-[10px] font-bold text-slate-600 md:inline">
        {task.status}
      </span>

    </div>
  );
}

/* =========================================================
   ACTIVITY ROW
========================================================= */

function ActivityRow({ activity }) {
  return (
    <div className="flex items-center gap-4 p-5">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-[10px] font-black">
        {activity.user.charAt(0)}
      </div>

      <div className="min-w-0 flex-1">

        <p className="text-xs leading-6 text-slate-400">

          <span className="font-black text-white">
            {activity.user}
          </span>{" "}

          {activity.action}{" "}

          <span className="font-bold text-blue-400">
            {activity.target}
          </span>

        </p>

        <p className="text-[10px] text-slate-600">
          {activity.time}
        </p>

      </div>

      <div
        className={`hidden h-9 w-9 items-center justify-center rounded-xl sm:flex ${
          activity.type === "success"
            ? "bg-emerald-500/10 text-emerald-400"
            : activity.type === "team"
            ? "bg-purple-500/10 text-purple-400"
            : activity.type === "file"
            ? "bg-yellow-500/10 text-yellow-400"
            : "bg-blue-500/10 text-blue-400"
        }`}
      >
        {activity.icon}
      </div>

    </div>
  );
}

/* =========================================================
   TEAM ROW
========================================================= */

function TeamRow({ member }) {
  return (
    <div className="flex items-center gap-3 rounded-xl p-3 transition hover:bg-white/[0.03]">

      <div className="relative">

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-[10px] font-black">
          {member.initials}
        </div>

        <span
          className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#080808] ${
            member.status === "Online"
              ? "bg-emerald-400"
              : "bg-yellow-400"
          }`}
        />

      </div>

      <div className="min-w-0 flex-1">

        <p className="truncate text-xs font-black">
          {member.name}
        </p>

        <p className="truncate text-[10px] text-slate-600">
          {member.role}
        </p>

      </div>

    </div>
  );
}

/* =========================================================
   WORKSPACE LINK
========================================================= */

function WorkspaceLink({
  to,
  icon,
  title,
  description,
  color,
}) {
  const iconClass =
    color === "purple"
      ? "bg-purple-500/10 text-purple-400"
      : color === "cyan"
      ? "bg-cyan-500/10 text-cyan-400"
      : color === "yellow"
      ? "bg-yellow-500/10 text-yellow-400"
      : color === "green"
      ? "bg-emerald-500/10 text-emerald-400"
      : "bg-blue-500/10 text-blue-400";

  return (
    <Link
      to={to}
      className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition hover:-translate-y-0.5 hover:border-blue-500/30 hover:bg-white/[0.04]"
    >

      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">

        <p className="text-xs font-black">
          {title}
        </p>

        <p className="mt-1 truncate text-[9px] text-slate-600">
          {description}
        </p>

      </div>

      <FaArrowRight className="text-[10px] text-slate-700 transition group-hover:translate-x-1 group-hover:text-blue-400" />

    </Link>
  );
}

/* =========================================================
   SIMPLE CHART ICON
========================================================= */

function FaChartIcon() {
  return (
    <div className="flex items-end gap-1">

      <span className="h-3 w-1.5 rounded-sm bg-blue-400" />
      <span className="h-5 w-1.5 rounded-sm bg-blue-400" />
      <span className="h-8 w-1.5 rounded-sm bg-blue-400" />
      <span className="h-6 w-1.5 rounded-sm bg-indigo-400" />

    </div>
  );
}

export default ProjectOverview;
