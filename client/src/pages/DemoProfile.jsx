import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiActivity,
  FiArrowLeft,
  FiArrowRight,
  FiAward,
  FiBell,
  FiBriefcase,
  FiCalendar,
  FiCamera,
  FiCheck,
  FiCheckCircle,
  FiChevronDown,
  FiCode,
  FiEdit3,
  FiExternalLink,
  FiFileText,
  FiGitBranch,
  FiGithub,
  FiGlobe,
  FiGrid,
  FiHeart,
  FiInfo,
  FiLink,
  FiLock,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiMoreHorizontal,
  FiPlus,
  FiSave,
  FiSettings,
  FiShield,
  FiStar,
  FiTerminal,
  FiTwitter,
  FiUpload,
  FiUser,
  FiUsers,
  FiX,
  FiZap,
} from "react-icons/fi";

const INITIAL_PROFILE = {
  name: "Arjun Kumar",
  username: "arjun-dev",
  role: "Full Stack Developer",
  email: "arjun@devsync.dev",
  location: "Bengaluru, India",
  website: "arjunk.dev",
  company: "DevSync Labs",
  bio: "Full-stack developer building scalable products, developer tools and collaborative experiences. Passionate about clean architecture, great UX and shipping useful software.",
  availability: "Available for collaboration",
  joined: "January 2025",
  initials: "AK",
};

const SKILLS = [
  { name: "React", level: 92 },
  { name: "Node.js", level: 88 },
  { name: "TypeScript", level: 84 },
  { name: "MongoDB", level: 79 },
  { name: "Tailwind CSS", level: 94 },
  { name: "Git & GitHub", level: 91 },
];

const PROJECTS = [
  {
    name: "DevSync",
    description:
      "Developer collaboration platform for teams, tasks, chat and GitHub workflows.",
    status: "Active",
    progress: 78,
    tech: ["React", "Node.js", "MongoDB"],
    stars: 128,
  },
  {
    name: "LaunchBoard",
    description:
      "A lightweight product launch workspace for planning releases and tracking growth.",
    status: "Active",
    progress: 64,
    tech: ["Next.js", "Postgres", "Tailwind"],
    stars: 84,
  },
  {
    name: "CodePulse",
    description:
      "Developer analytics dashboard focused on engineering activity and delivery insights.",
    status: "Completed",
    progress: 100,
    tech: ["React", "Express", "Charts"],
    stars: 61,
  },
];

const CONTRIBUTIONS = [
  1, 2, 0, 3, 4, 2, 1, 5, 3, 2, 4, 1,
  0, 2, 3, 5, 4, 2, 1, 3, 4, 5, 2, 1,
  3, 4, 5, 2, 4, 3, 1, 0, 2, 4, 5, 3,
  2, 1, 4, 5, 3, 2, 4, 1, 2, 5, 4, 3,
  1, 2, 4, 5, 3, 4, 2, 1, 3, 5, 4, 2,
  3, 1, 0, 2, 4, 3, 5, 4, 2, 3, 5, 4,
  2, 1, 4, 3, 5, 2, 4, 1, 3, 5, 2, 4,
];

const ACHIEVEMENTS = [
  {
    icon: FiGitBranch,
    title: "Code Contributor",
    description: "500+ repository contributions",
  },
  {
    icon: FiUsers,
    title: "Team Player",
    description: "Collaborated across 12 projects",
  },
  {
    icon: FiAward,
    title: "Top Performer",
    description: "Consistent delivery record",
  },
  {
    icon: FiZap,
    title: "Fast Shipper",
    description: "Released 24 features this year",
  },
];

const ACTIVITY = [
  {
    icon: FiGitBranch,
    title: "Merged pull request",
    target: "#142 · dashboard-refactor",
    time: "2 hours ago",
  },
  {
    icon: FiCheckCircle,
    title: "Completed task",
    target: "Responsive navigation",
    time: "5 hours ago",
  },
  {
    icon: FiMessageCircle,
    title: "Posted in",
    target: "#development",
    time: "Yesterday",
  },
  {
    icon: FiFileText,
    title: "Updated project",
    target: "DevSync",
    time: "Yesterday",
  },
];

function Avatar({ initials = "AK", size = "xl" }) {
  const sizes = {
    sm: "h-8 w-8 text-[9px]",
    md: "h-10 w-10 text-[10px]",
    lg: "h-16 w-16 text-base",
    xl: "h-24 w-24 text-2xl",
  };

  return (
    <div
      className={`${sizes[size]} flex shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-slate-950 via-slate-800 to-slate-500 font-black text-white shadow-xl shadow-slate-950/15`}
    >
      {initials}
    </div>
  );
}

function StatCard({ icon: Icon, value, label }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-2xl font-black tracking-tight text-slate-950">
            {value}
          </p>

          <p className="mt-1 text-[10px] font-bold text-slate-400">
            {label}
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
          <Icon size={17} />
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ eyebrow, title, action }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-600">
          {eyebrow}
        </p>

        <h2 className="mt-1 text-lg font-black tracking-tight text-slate-950">
          {title}
        </h2>
      </div>

      {action}
    </div>
  );
}

function ContributionGrid() {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[10px] font-bold text-slate-500">
          142 contributions in the last year
        </p>

        <p className="text-[9px] font-semibold text-slate-400">
          Less
          <span className="mx-2 inline-flex gap-1">
            <span className="h-2.5 w-2.5 rounded-sm bg-slate-100" />
            <span className="h-2.5 w-2.5 rounded-sm bg-slate-200" />
            <span className="h-2.5 w-2.5 rounded-sm bg-slate-300" />
            <span className="h-2.5 w-2.5 rounded-sm bg-slate-500" />
            <span className="h-2.5 w-2.5 rounded-sm bg-slate-900" />
          </span>
          More
        </p>
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="grid min-w-[680px] grid-cols-12 gap-1.5">
          {CONTRIBUTIONS.map((value, index) => {
            const opacityClass =
              value === 0
                ? "bg-slate-100"
                : value === 1
                ? "bg-slate-200"
                : value === 2
                ? "bg-slate-300"
                : value === 3
                ? "bg-slate-400"
                : value === 4
                ? "bg-slate-600"
                : "bg-slate-900";

            return (
              <div
                key={index}
                title={`${value} contributions`}
                className={`aspect-square rounded-[3px] ${opacityClass} transition hover:scale-125`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function EditProfileModal({ profile, onClose, onSave }) {
  const [form, setForm] = useState(profile);

  const update = (key, value) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const submit = (event) => {
    event.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/30 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-slate-200 bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/95 px-6 py-5 backdrop-blur">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-600">
              Profile
            </p>

            <h2 className="mt-1 text-xl font-black text-slate-950">
              Edit your profile
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <FiX size={18} />
          </button>
        </div>

        <form onSubmit={submit} className="space-y-5 p-6">
          <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4">
            <div className="relative">
              <Avatar initials={form.initials} size="lg" />

              <button
                type="button"
                className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-xl border-2 border-white bg-slate-950 text-white"
              >
                <FiCamera size={13} />
              </button>
            </div>

            <div>
              <p className="text-xs font-black text-slate-900">
                Profile photo
              </p>

              <p className="mt-1 text-[10px] leading-5 text-slate-400">
                Upload a professional image or use your initials.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label>
              <span className="mb-2 block text-[10px] font-black text-slate-600">
                Full name
              </span>

              <input
                value={form.name}
                onChange={(event) => update("name", event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-xs font-semibold outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-50"
              />
            </label>

            <label>
              <span className="mb-2 block text-[10px] font-black text-slate-600">
                Username
              </span>

              <input
                value={form.username}
                onChange={(event) =>
                  update("username", event.target.value)
                }
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-xs font-semibold outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-50"
              />
            </label>

            <label>
              <span className="mb-2 block text-[10px] font-black text-slate-600">
                Role
              </span>

              <input
                value={form.role}
                onChange={(event) => update("role", event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-xs font-semibold outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-50"
              />
            </label>

            <label>
              <span className="mb-2 block text-[10px] font-black text-slate-600">
                Company
              </span>

              <input
                value={form.company}
                onChange={(event) =>
                  update("company", event.target.value)
                }
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-xs font-semibold outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-50"
              />
            </label>

            <label>
              <span className="mb-2 block text-[10px] font-black text-slate-600">
                Location
              </span>

              <input
                value={form.location}
                onChange={(event) =>
                  update("location", event.target.value)
                }
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-xs font-semibold outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-50"
              />
            </label>

            <label>
              <span className="mb-2 block text-[10px] font-black text-slate-600">
                Website
              </span>

              <input
                value={form.website}
                onChange={(event) =>
                  update("website", event.target.value)
                }
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-xs font-semibold outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-50"
              />
            </label>
          </div>

          <label className="block">
            <span className="mb-2 block text-[10px] font-black text-slate-600">
              Bio
            </span>

            <textarea
              rows={4}
              value={form.bio}
              onChange={(event) => update("bio", event.target.value)}
              className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-xs font-semibold leading-5 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-50"
            />
          </label>

          <div className="flex justify-end gap-2 border-t border-slate-100 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-4 py-2.5 text-xs font-bold text-slate-500 transition hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800"
            >
              <FiSave size={14} />
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white">
          <FiGrid size={16} />
        </div>

        <button
          type="button"
          className="rounded-lg p-1.5 text-slate-300 opacity-0 transition hover:bg-slate-100 hover:text-slate-700 group-hover:opacity-100"
        >
          <FiMoreHorizontal size={15} />
        </button>
      </div>

      <h3 className="mt-4 text-sm font-black text-slate-900">
        {project.name}
      </h3>

      <p className="mt-1.5 min-h-[40px] text-[10px] font-medium leading-5 text-slate-400">
        {project.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-slate-50 px-2 py-1 text-[8px] font-bold text-slate-500"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-5">
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-[9px] font-bold text-slate-400">
            Progress
          </span>

          <span className="text-[9px] font-black text-slate-700">
            {project.progress}%
          </span>
        </div>

        <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-slate-900 transition-all"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
        <span
          className={`inline-flex items-center gap-1.5 text-[9px] font-bold ${
            project.status === "Completed"
              ? "text-slate-500"
              : "text-emerald-600"
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {project.status}
        </span>

        <span className="inline-flex items-center gap-1 text-[9px] font-bold text-slate-400">
          <FiStar size={10} />
          {project.stars}
        </span>
      </div>
    </div>
  );
}

export default function DemoProfile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [activeTab, setActiveTab] = useState("Overview");
  const [showEdit, setShowEdit] = useState(false);
  const [notice, setNotice] = useState("");
  const [following, setFollowing] = useState(false);

  const profileStats = useMemo(
    () => [
      {
        icon: FiGitBranch,
        value: "524",
        label: "Contributions",
      },
      {
        icon: FiGrid,
        value: "12",
        label: "Projects",
      },
      {
        icon: FiUsers,
        value: "48",
        label: "Connections",
      },
      {
        icon: FiStar,
        value: "273",
        label: "Stars received",
      },
    ],
    []
  );

  const showNotice = (text) => {
    setNotice(text);

    window.setTimeout(() => {
      setNotice("");
    }, 2800);
  };

  const saveProfile = (updatedProfile) => {
    setProfile(updatedProfile);
    setShowEdit(false);
    showNotice("Profile updated successfully");
  };

  const handleFollow = () => {
    setFollowing((value) => !value);
    showNotice(following ? "Unfollowed Arjun" : "Following Arjun");
  };

  const tabs = ["Overview", "Projects", "Activity"];

  return (
    <div className="min-h-full bg-[#f7f9fc] text-slate-900">
      {/* Profile Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.10),transparent_30%),radial-gradient(circle_at_20%_0%,rgba(15,23,42,0.05),transparent_25%)]" />

        <div className="relative mx-auto max-w-[1800px] px-5 pb-7 pt-6 sm:px-7 lg:px-9">
          <div className="mb-6 flex items-center gap-2 text-xs font-semibold text-slate-400">
            <button
              type="button"
              onClick={() => navigate("/demo")}
              className="transition hover:text-slate-700"
            >
              Dashboard
            </button>

            <FiChevronDown
              size={12}
              className="-rotate-90 text-slate-300"
            />

            <span className="text-slate-700">Profile</span>
          </div>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="relative w-fit">
                <Avatar initials={profile.initials} size="xl" />

                <span className="absolute bottom-1 right-1 h-5 w-5 rounded-full border-4 border-white bg-emerald-500" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-3xl font-black tracking-tight text-slate-950">
                    {profile.name}
                  </h1>

                  <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[9px] font-black text-blue-600">
                    PRO
                  </span>
                </div>

                <p className="mt-1 text-sm font-semibold text-slate-500">
                  @{profile.username}
                </p>

                <p className="mt-3 text-sm font-black text-slate-800">
                  {profile.role}
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-semibold text-slate-400">
                  <span className="inline-flex items-center gap-1.5">
                    <FiBriefcase size={11} />
                    {profile.company}
                  </span>

                  <span className="inline-flex items-center gap-1.5">
                    <FiMapPin size={11} />
                    {profile.location}
                  </span>

                  <span className="inline-flex items-center gap-1.5">
                    <FiCalendar size={11} />
                    Joined {profile.joined}
                  </span>
                </div>

                <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-[9px] font-bold text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {profile.availability}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleFollow}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
                  following
                    ? "border border-slate-200 bg-white text-slate-700"
                    : "bg-slate-950 text-white shadow-lg shadow-slate-950/10 hover:-translate-y-0.5 hover:bg-slate-800"
                }`}
              >
                <FiUsers size={14} />
                {following ? "Following" : "Follow"}
              </button>

              <button
                type="button"
                onClick={() => showNotice("Message composer opened")}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-600 transition hover:bg-slate-50"
              >
                <FiMessageCircle size={14} />
                Message
              </button>

              <button
                type="button"
                onClick={() => setShowEdit(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-600 transition hover:bg-slate-50"
              >
                <FiEdit3 size={14} />
                Edit profile
              </button>
            </div>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {profileStats.map((stat) => (
              <StatCard
                key={stat.label}
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
              />
            ))}
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1800px] px-5 py-6 sm:px-7 lg:px-9">
        {/* Tabs */}
        <div className="mb-6 flex overflow-x-auto rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm">
          {tabs.map((tab) => (
            <button
              type="button"
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`min-w-[110px] flex-1 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
                activeTab === tab
                  ? "bg-slate-950 text-white shadow-sm"
                  : "text-slate-400 hover:bg-slate-50 hover:text-slate-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "Overview" && (
          <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
            <div className="space-y-6">
              {/* About */}
              <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <SectionTitle
                  eyebrow="About"
                  title="Developer profile"
                  action={
                    <FiInfo
                      size={16}
                      className="text-slate-300"
                    />
                  }
                />

                <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-500">
                  {profile.bio}
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="flex items-center gap-2 text-slate-400">
                      <FiMail size={13} />
                      <span className="text-[9px] font-black uppercase tracking-wider">
                        Email
                      </span>
                    </div>

                    <p className="mt-2 text-xs font-bold text-slate-700">
                      {profile.email}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="flex items-center gap-2 text-slate-400">
                      <FiGlobe size={13} />
                      <span className="text-[9px] font-black uppercase tracking-wider">
                        Website
                      </span>
                    </div>

                    <p className="mt-2 text-xs font-bold text-blue-600">
                      {profile.website}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => showNotice("GitHub profile opened")}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-[10px] font-bold text-slate-600 transition hover:bg-slate-50"
                  >
                    <FiGithub size={13} />
                    GitHub
                    <FiExternalLink size={10} />
                  </button>

                  <button
                    type="button"
                    onClick={() => showNotice("Portfolio opened")}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-[10px] font-bold text-slate-600 transition hover:bg-slate-50"
                  >
                    <FiGlobe size={13} />
                    Portfolio
                    <FiExternalLink size={10} />
                  </button>

                  <button
                    type="button"
                    onClick={() => showNotice("Profile link copied")}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-[10px] font-bold text-slate-600 transition hover:bg-slate-50"
                  >
                    <FiLink size={13} />
                    Share profile
                  </button>
                </div>
              </section>

              {/* Contributions */}
              <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <SectionTitle
                  eyebrow="Activity"
                  title="Contribution history"
                  action={
                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-black text-emerald-600">
                      Active developer
                    </span>
                  }
                />

                <div className="mt-6">
                  <ContributionGrid />
                </div>
              </section>

              {/* Skills */}
              <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <SectionTitle
                  eyebrow="Expertise"
                  title="Technical skills"
                  action={
                    <FiCode size={16} className="text-slate-300" />
                  }
                />

                <div className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                  {SKILLS.map((skill) => (
                    <div key={skill.name}>
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs font-black text-slate-700">
                          {skill.name}
                        </span>

                        <span className="text-[9px] font-bold text-slate-400">
                          {skill.level}%
                        </span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-slate-900"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="space-y-6">
              {/* Achievements */}
              <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <SectionTitle
                  eyebrow="Recognition"
                  title="Achievements"
                  action={
                    <FiAward
                      size={16}
                      className="text-slate-300"
                    />
                  }
                />

                <div className="mt-5 space-y-3">
                  {ACHIEVEMENTS.map((achievement) => {
                    const Icon = achievement.icon;

                    return (
                      <div
                        key={achievement.title}
                        className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-3.5"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-slate-700 shadow-sm">
                          <Icon size={16} />
                        </div>

                        <div className="min-w-0">
                          <p className="text-xs font-black text-slate-800">
                            {achievement.title}
                          </p>

                          <p className="mt-1 text-[9px] font-semibold leading-4 text-slate-400">
                            {achievement.description}
                          </p>
                        </div>

                        <FiCheckCircle
                          size={15}
                          className="ml-auto shrink-0 text-emerald-500"
                        />
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Recent activity */}
              <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <SectionTitle
                  eyebrow="Recent"
                  title="Latest activity"
                  action={
                    <button
                      type="button"
                      onClick={() => setActiveTab("Activity")}
                      className="text-[9px] font-black text-blue-600"
                    >
                      View all
                    </button>
                  }
                />

                <div className="mt-5 space-y-4">
                  {ACTIVITY.map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={`${item.title}-${item.target}`}
                        className="flex items-start gap-3"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                          <Icon size={13} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-[10px] font-bold text-slate-700">
                            {item.title}
                          </p>

                          <p className="mt-0.5 truncate text-[10px] font-black text-slate-900">
                            {item.target}
                          </p>

                          <p className="mt-1 text-[9px] font-semibold text-slate-400">
                            {item.time}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Security card */}
              <section className="rounded-3xl bg-slate-950 p-6 text-white shadow-xl shadow-slate-950/10">
                <div className="flex items-center gap-2 text-blue-300">
                  <FiShield size={15} />

                  <span className="text-[9px] font-black uppercase tracking-[0.18em]">
                    Account security
                  </span>
                </div>

                <h3 className="mt-3 text-lg font-black">
                  Your workspace is protected.
                </h3>

                <p className="mt-2 text-[10px] leading-5 text-slate-400">
                  Two-factor authentication and session protection are enabled
                  for this demo profile.
                </p>

                <div className="mt-5 flex items-center justify-between rounded-2xl bg-white/5 p-3">
                  <div className="flex items-center gap-2">
                    <FiLock size={13} className="text-emerald-300" />

                    <span className="text-[10px] font-bold">
                      2FA enabled
                    </span>
                  </div>

                  <span className="rounded-full bg-emerald-400/10 px-2 py-1 text-[8px] font-black text-emerald-300">
                    SECURE
                  </span>
                </div>
              </section>
            </div>
          </div>
        )}

        {activeTab === "Projects" && (
          <section>
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-600">
                  Portfolio
                </p>

                <h2 className="mt-1 text-xl font-black text-slate-950">
                  Projects by {profile.name}
                </h2>

                <p className="mt-1 text-xs font-medium text-slate-400">
                  A snapshot of projects this developer is contributing to.
                </p>
              </div>

              <button
                type="button"
                onClick={() => showNotice("New project flow opened")}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-bold text-white"
              >
                <FiPlus size={14} />
                New project
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {PROJECTS.map((project) => (
                <ProjectCard key={project.name} project={project} />
              ))}
            </div>
          </section>
        )}

        {activeTab === "Activity" && (
          <section className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <SectionTitle
                eyebrow="Timeline"
                title="Developer activity"
                action={
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-black text-slate-500">
                    This month
                  </span>
                }
              />

              <div className="relative mt-6 space-y-4">
                <div className="absolute bottom-7 left-[19px] top-7 w-px bg-slate-200" />

                {[...ACTIVITY, ...ACTIVITY].map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={`${item.target}-${index}`}
                      className="relative flex gap-4 rounded-2xl border border-slate-100 bg-slate-50/60 p-4"
                    >
                      <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-4 border-white bg-slate-950 text-white shadow-sm">
                        <Icon size={13} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-black text-slate-800">
                            {item.title}
                          </span>

                          <span className="text-[9px] font-semibold text-slate-400">
                            {item.time}
                          </span>
                        </div>

                        <p className="mt-1 text-xs font-black text-slate-900">
                          {item.target}
                        </p>

                        <p className="mt-1 text-[9px] font-semibold leading-5 text-slate-400">
                          Activity recorded in the DevSync workspace.
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-5">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <SectionTitle
                  eyebrow="Performance"
                  title="Developer score"
                />

                <div className="mt-6 flex items-center justify-center">
                  <div className="relative flex h-36 w-36 items-center justify-center rounded-full border-[12px] border-slate-100">
                    <div className="absolute inset-[-12px] rounded-full border-[12px] border-transparent border-r-slate-900 border-t-slate-900 rotate-[-35deg]" />

                    <div className="text-center">
                      <p className="text-3xl font-black text-slate-950">
                        94
                      </p>

                      <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                        / 100
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 text-center">
                  <p className="text-xs font-black text-slate-800">
                    Excellent performance
                  </p>

                  <p className="mt-1 text-[9px] leading-5 text-slate-400">
                    Strong delivery, collaboration and repository activity.
                  </p>
                </div>
              </div>

              <div className="rounded-3xl bg-slate-950 p-6 text-white">
                <FiZap size={17} className="text-blue-300" />

                <h3 className="mt-3 text-lg font-black">
                  Keep the momentum.
                </h3>

                <p className="mt-2 text-[10px] leading-5 text-slate-400">
                  Continue contributing to projects and collaborating with
                  your team.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    navigate("/demo/project/devsync/tasks")
                  }
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-[10px] font-black text-slate-950"
                >
                  Open task board
                  <FiArrowRight size={12} />
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Bottom CTA */}
        <section className="mt-7 overflow-hidden rounded-3xl bg-slate-950 p-6 text-white shadow-xl shadow-slate-950/10 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-blue-300">
                <FiZap size={15} />

                <span className="text-[9px] font-black uppercase tracking-[0.2em]">
                  DevSync profile
                </span>
              </div>

              <h2 className="text-xl font-black tracking-tight sm:text-2xl">
                Build. Collaborate. Ship.
              </h2>

              <p className="mt-2 max-w-xl text-xs leading-5 text-slate-400">
                Your developer identity, projects, activity and collaboration
                history — all in one workspace.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                to="/demo/project/devsync"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-slate-950 transition hover:bg-slate-100"
              >
                Open project
                <FiArrowRight size={13} />
              </Link>

              <Link
                to="/demo/settings"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-white/10"
              >
                <FiSettings size={13} />
                Settings
              </Link>
            </div>
          </div>
        </section>

        <div className="flex flex-col items-center justify-between gap-3 pb-4 pt-5 text-[9px] font-semibold text-slate-400 sm:flex-row">
          <span>
            DevSync public demo · Profile workspace
          </span>

          <span className="inline-flex items-center gap-1.5">
            <FiShield size={11} />
            Demo data only
          </span>
        </div>
      </main>

      {showEdit && (
        <EditProfileModal
          profile={profile}
          onClose={() => setShowEdit(false)}
          onSave={saveProfile}
        />
      )}

      {notice && (
        <div className="fixed bottom-5 left-1/2 z-[120] -translate-x-1/2">
          <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-950 px-4 py-3 text-white shadow-2xl">
            <FiCheck size={14} className="text-emerald-400" />

            <span className="text-[10px] font-bold">
              {notice}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}