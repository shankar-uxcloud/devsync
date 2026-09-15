import React, { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FiActivity,
  FiArrowLeft,
  FiArrowRight,
  FiBriefcase,
  FiCalendar,
  FiCheckCircle,
  FiChevronDown,
  FiCode,
  FiEdit3,
  FiGithub,
  FiMail,
  FiMessageCircle,
  FiMoreHorizontal,
  FiPlus,
  FiSearch,
  FiShield,
  FiStar,
  FiUserPlus,
  FiUsers,
  FiX,
  FiZap,
} from "react-icons/fi";

const INITIAL_MEMBERS = [
  {
    id: 1,
    name: "Arjun Kumar",
    username: "@arjunk",
    initials: "AK",
    role: "Project Admin",
    department: "Engineering",
    status: "Online",
    location: "Bengaluru, India",
    email: "arjun@devsync.dev",
    tasks: 24,
    completed: 20,
    activity: 92,
    contribution: 34,
    joined: "Jan 2026",
    skills: ["React", "Node.js", "MongoDB"],
    bio: "Full-stack engineer leading the DevSync platform architecture.",
    featured: true,
  },
  {
    id: 2,
    name: "Priya Sharma",
    username: "@priyash",
    initials: "PS",
    role: "Frontend Developer",
    department: "Engineering",
    status: "Online",
    location: "Mumbai, India",
    email: "priya@devsync.dev",
    tasks: 19,
    completed: 16,
    activity: 88,
    contribution: 27,
    joined: "Feb 2026",
    skills: ["React", "Tailwind", "Framer Motion"],
    bio: "Frontend developer focused on polished product experiences.",
    featured: false,
  },
  {
    id: 3,
    name: "Rahul Mehta",
    username: "@rahulm",
    initials: "RM",
    role: "Backend Developer",
    department: "Engineering",
    status: "Away",
    location: "Pune, India",
    email: "rahul@devsync.dev",
    tasks: 21,
    completed: 17,
    activity: 81,
    contribution: 23,
    joined: "Feb 2026",
    skills: ["Node.js", "Express", "MongoDB"],
    bio: "Backend engineer working on APIs, data and authentication.",
    featured: false,
  },
  {
    id: 4,
    name: "Kiran Nair",
    username: "@kirann",
    initials: "KN",
    role: "DevOps Engineer",
    department: "Infrastructure",
    status: "Offline",
    location: "Kochi, India",
    email: "kiran@devsync.dev",
    tasks: 14,
    completed: 13,
    activity: 74,
    contribution: 16,
    joined: "Mar 2026",
    skills: ["GitHub Actions", "Docker", "CI/CD"],
    bio: "Infrastructure engineer keeping deployments fast and reliable.",
    featured: false,
  },
  {
    id: 5,
    name: "Sneha Rao",
    username: "@snehar",
    initials: "SR",
    role: "Product Designer",
    department: "Design",
    status: "Online",
    location: "Hyderabad, India",
    email: "sneha@devsync.dev",
    tasks: 12,
    completed: 10,
    activity: 79,
    contribution: 12,
    joined: "Mar 2026",
    skills: ["Figma", "UX", "Design Systems"],
    bio: "Product designer shaping the DevSync design language.",
    featured: false,
  },
  {
    id: 6,
    name: "Vikram Singh",
    username: "@vikrams",
    initials: "VS",
    role: "QA Engineer",
    department: "Quality",
    status: "Online",
    location: "Delhi, India",
    email: "vikram@devsync.dev",
    tasks: 16,
    completed: 15,
    activity: 84,
    contribution: 11,
    joined: "Apr 2026",
    skills: ["Testing", "Postman", "Automation"],
    bio: "QA engineer making sure every release is stable and production-ready.",
    featured: false,
  },
];

const ROLE_FILTERS = [
  "All",
  "Project Admin",
  "Frontend Developer",
  "Backend Developer",
  "DevOps Engineer",
  "Product Designer",
  "QA Engineer",
];

const STATUS_STYLES = {
  Online: {
    dot: "bg-emerald-500",
    badge: "bg-emerald-50 text-emerald-700",
  },
  Away: {
    dot: "bg-amber-500",
    badge: "bg-amber-50 text-amber-700",
  },
  Offline: {
    dot: "bg-slate-400",
    badge: "bg-slate-100 text-slate-500",
  },
};

function Avatar({ member, size = "md" }) {
  const sizeClasses = {
    sm: "h-8 w-8 text-[10px]",
    md: "h-10 w-10 text-xs",
    lg: "h-12 w-12 text-sm",
    xl: "h-14 w-14 text-base",
  };

  return (
    <div
      className={`${sizeClasses[size]} relative flex shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-950 via-slate-800 to-slate-600 font-black text-white shadow-sm`}
    >
      {member.initials}

      <span
        className={`absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white ${STATUS_STYLES[member.status].dot}`}
      />
    </div>
  );
}

function StatCard({ icon: Icon, label, value, detail }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
            {label}
          </p>

          <p className="mt-2 text-2xl font-black tracking-tight text-slate-950">
            {value}
          </p>

          {detail && (
            <p className="mt-1 text-[10px] font-semibold text-slate-400">
              {detail}
            </p>
          )}
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
          <Icon size={18} />
        </div>
      </div>
    </div>
  );
}

function InviteModal({ onClose, onInvite }) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Frontend Developer");
  const [message, setMessage] = useState("");

  const submit = (event) => {
    event.preventDefault();

    if (!email.trim()) return;

    onInvite({
      email: email.trim(),
      role,
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/30 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">
              Team management
            </p>

            <h2 className="mt-1 text-xl font-black text-slate-950">
              Invite a teammate
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Add another collaborator to the DevSync workspace.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <FiX size={19} />
          </button>
        </div>

        <form onSubmit={submit} className="space-y-5 p-6">
          <div>
            <label className="mb-2 block text-xs font-bold text-slate-700">
              Email address
            </label>

            <div className="relative">
              <FiMail
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                autoFocus
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="teammate@example.com"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm font-medium outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold text-slate-700">
              Role
            </label>

            <div className="relative">
              <FiBriefcase
                size={14}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <select
                value={role}
                onChange={(event) => setRole(event.target.value)}
                className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-9 text-xs font-bold text-slate-700 outline-none"
              >
                {ROLE_FILTERS.filter((item) => item !== "All").map(
                  (item) => (
                    <option key={item}>{item}</option>
                  )
                )}
              </select>

              <FiChevronDown
                size={14}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold text-slate-700">
              Personal message
              <span className="ml-1 font-normal text-slate-400">
                (optional)
              </span>
            </label>

            <textarea
              rows={3}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Hey! We'd love to have you on the team..."
              className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-medium outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
            />
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-4 py-2.5 text-xs font-bold text-slate-500 transition hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-slate-800"
            >
              <FiUserPlus size={14} />
              Send invitation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function MemberCard({ member, onChat }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const completion =
    member.tasks > 0
      ? Math.round((member.completed / member.tasks) * 100)
      : 0;

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_18px_45px_rgba(15,23,42,0.09)]">
      <div className="absolute inset-x-0 top-0 h-1 bg-slate-950 opacity-0 transition group-hover:opacity-100" />

      <div className="p-5">
        <div className="flex items-start justify-between">
          <Avatar member={member} size="lg" />

          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            >
              <FiMoreHorizontal size={17} />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-10 z-30 w-40 overflow-hidden rounded-xl border border-slate-200 bg-white p-1 shadow-xl">
                <button
                  type="button"
                  onClick={() => {
                    onChat(member);
                    setMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  <FiMessageCircle size={13} />
                  Open chat
                </button>

                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  <FiEdit3 size={13} />
                  Edit member
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-black text-slate-950">
              {member.name}
            </h3>

            {member.featured && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-[9px] font-black text-amber-700">
                <FiStar size={9} />
                Lead
              </span>
            )}
          </div>

          <p className="mt-1 text-[11px] font-semibold text-slate-400">
            {member.username}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-bold text-slate-600">
              {member.role}
            </span>

            <span
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[9px] font-bold ${STATUS_STYLES[member.status].badge}`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${STATUS_STYLES[member.status].dot}`}
              />
              {member.status}
            </span>
          </div>
        </div>

        <p className="mt-4 min-h-10 text-xs leading-5 text-slate-500">
          {member.bio}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {member.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-md border border-slate-100 bg-slate-50 px-2 py-1 text-[9px] font-bold text-slate-500"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="my-5 h-px bg-slate-100" />

        <div className="grid grid-cols-3 gap-3">
          <div>
            <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
              Tasks
            </p>

            <p className="mt-1 text-sm font-black text-slate-900">
              {member.tasks}
            </p>
          </div>

          <div>
            <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
              Done
            </p>

            <p className="mt-1 text-sm font-black text-slate-900">
              {member.completed}
            </p>
          </div>

          <div>
            <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
              Activity
            </p>

            <p className="mt-1 text-sm font-black text-slate-900">
              {member.activity}%
            </p>
          </div>
        </div>

        <div className="mt-4">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-[9px] font-bold text-slate-400">
              Completion
            </span>

            <span className="text-[9px] font-black text-slate-700">
              {completion}%
            </span>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-slate-950 transition-all duration-500"
              style={{ width: `${completion}%` }}
            />
          </div>
        </div>

        <div className="mt-5 flex gap-2">
          <button
            type="button"
            onClick={() => onChat(member)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-950 px-3 py-2.5 text-[10px] font-bold text-white transition hover:bg-slate-800"
          >
            <FiMessageCircle size={13} />
            Message
          </button>

          <a
            href={`mailto:${member.email}`}
            className="flex items-center justify-center rounded-xl border border-slate-200 px-3 py-2.5 text-slate-500 transition hover:bg-slate-50 hover:text-slate-800"
            title={`Email ${member.name}`}
          >
            <FiMail size={14} />
          </a>

          <button
            type="button"
            className="flex items-center justify-center rounded-xl border border-slate-200 px-3 py-2.5 text-slate-500 transition hover:bg-slate-50 hover:text-slate-800"
            title="View activity"
          >
            <FiActivity size={14} />
          </button>
        </div>
      </div>
    </article>
  );
}

export default function TeamPage() {
  const { projectId = "devsync" } = useParams();
  const navigate = useNavigate();

  const [members, setMembers] = useState(INITIAL_MEMBERS);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [notice, setNotice] = useState("");

  const onlineCount = members.filter(
    (member) => member.status === "Online"
  ).length;

  const totalTasks = members.reduce(
    (sum, member) => sum + member.tasks,
    0
  );

  const completedTasks = members.reduce(
    (sum, member) => sum + member.completed,
    0
  );

  const averageActivity = Math.round(
    members.reduce((sum, member) => sum + member.activity, 0) /
      members.length
  );

  const filteredMembers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return members.filter((member) => {
      const matchesSearch =
        !query ||
        member.name.toLowerCase().includes(query) ||
        member.username.toLowerCase().includes(query) ||
        member.role.toLowerCase().includes(query) ||
        member.skills.some((skill) =>
          skill.toLowerCase().includes(query)
        );

      const matchesRole =
        roleFilter === "All" || member.role === roleFilter;

      const matchesStatus =
        statusFilter === "All" || member.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [members, search, roleFilter, statusFilter]);

  const clearFilters = () => {
    setSearch("");
    setRoleFilter("All");
    setStatusFilter("All");
  };

  const handleChat = (member) => {
    navigate(`/demo/project/${projectId}/chat`);
  };

  const handleInvite = ({ email, role }) => {
    const newMember = {
      id: Date.now(),
      name: email.split("@")[0],
      username: `@${email.split("@")[0]}`,
      initials: email.slice(0, 2).toUpperCase(),
      role,
      department: "Engineering",
      status: "Offline",
      location: "Remote",
      email,
      tasks: 0,
      completed: 0,
      activity: 0,
      contribution: 0,
      joined: "Invited",
      skills: ["New member"],
      bio: "Newly invited collaborator awaiting workspace access.",
      featured: false,
    };

    setMembers((current) => [...current, newMember]);
    setShowInvite(false);
    setNotice(`Invitation sent to ${email}`);

    window.setTimeout(() => {
      setNotice("");
    }, 3500);
  };

  return (
    <div className="min-h-full bg-[#f7f9fc] text-slate-900">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1700px] px-5 py-5 sm:px-7 lg:px-9">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-slate-400">
                <button
                  type="button"
                  onClick={() =>
                    navigate(`/demo/project/${projectId}`)
                  }
                  className="transition hover:text-slate-700"
                >
                  DevSync
                </button>

                <span>/</span>

                <span className="text-slate-700">Team</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-950/10">
                  <FiUsers size={20} />
                </div>

                <div>
                  <h1 className="text-2xl font-black tracking-tight text-slate-950">
                    Team
                  </h1>

                  <p className="mt-0.5 text-xs font-medium text-slate-500">
                    Collaborate with the people building DevSync.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() =>
                  navigate(`/demo/project/${projectId}`)
                }
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-600 transition hover:bg-slate-50"
              >
                <FiArrowLeft size={14} />
                Overview
              </button>

              <button
                type="button"
                onClick={() => setShowInvite(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                <FiUserPlus size={15} />
                Invite member
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-[1700px] px-5 py-6 sm:px-7 lg:px-9">
        {/* Success notification */}
        {notice && (
          <div className="mb-5 flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-800 shadow-sm">
            <div className="flex items-center gap-2">
              <FiCheckCircle size={16} />
              <span className="text-xs font-bold">{notice}</span>
            </div>

            <button
              type="button"
              onClick={() => setNotice("")}
              className="rounded-lg p-1 hover:bg-emerald-100"
            >
              <FiX size={14} />
            </button>
          </div>
        )}

        {/* Team stats */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={FiUsers}
            label="Team members"
            value={members.length}
            detail={`${onlineCount} members online`}
          />

          <StatCard
            icon={FiCheckCircle}
            label="Tasks completed"
            value={completedTasks}
            detail={`${totalTasks} total assigned`}
          />

          <StatCard
            icon={FiActivity}
            label="Team activity"
            value={`${averageActivity}%`}
            detail="Average activity score"
          />

          <StatCard
            icon={FiZap}
            label="Collaboration"
            value="94%"
            detail="Workspace health score"
          />
        </section>

        {/* Team health */}
        <section className="mt-6 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-600">
                    Collaboration pulse
                  </p>

                  <h2 className="mt-1 text-lg font-black text-slate-950">
                    Your team is shipping smoothly.
                  </h2>

                  <p className="mt-1 max-w-lg text-xs leading-5 text-slate-400">
                    Strong activity across engineering, design and quality
                    indicates a healthy development cycle.
                  </p>
                </div>

                <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-950/10">
                  <span className="text-xl font-black">94</span>
                  <span className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
                    score
                  </span>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-slate-400">
                    <FiCode size={14} />
                    <span className="text-[9px] font-black uppercase tracking-wider">
                      Engineering
                    </span>
                  </div>

                  <p className="mt-2 text-xl font-black text-slate-900">
                    91%
                  </p>

                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200">
                    <div className="h-full w-[91%] rounded-full bg-slate-900" />
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-slate-400">
                    <FiEdit3 size={14} />
                    <span className="text-[9px] font-black uppercase tracking-wider">
                      Design
                    </span>
                  </div>

                  <p className="mt-2 text-xl font-black text-slate-900">
                    87%
                  </p>

                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200">
                    <div className="h-full w-[87%] rounded-full bg-slate-900" />
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-slate-400">
                    <FiShield size={14} />
                    <span className="text-[9px] font-black uppercase tracking-wider">
                      Quality
                    </span>
                  </div>

                  <p className="mt-2 text-xl font-black text-slate-900">
                    96%
                  </p>

                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200">
                    <div className="h-full w-[96%] rounded-full bg-slate-900" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Top contributor */}
          <div className="relative overflow-hidden rounded-3xl bg-slate-950 p-6 text-white shadow-xl shadow-slate-950/10">
            <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full border border-white/10" />
            <div className="absolute -right-4 top-0 h-20 w-20 rounded-full border border-white/5" />

            <div className="relative">
              <div className="flex items-center gap-2 text-amber-300">
                <FiStar size={14} />
                <span className="text-[10px] font-black uppercase tracking-[0.18em]">
                  Top contributor
                </span>
              </div>

              <div className="mt-6 flex items-center gap-4">
                <Avatar member={members[0]} size="xl" />

                <div>
                  <h3 className="text-lg font-black">
                    {members[0].name}
                  </h3>

                  <p className="mt-1 text-[10px] font-semibold text-slate-400">
                    {members[0].role}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-2">
                <div className="rounded-2xl bg-white/5 p-3">
                  <p className="text-[9px] font-bold text-slate-500">
                    Tasks
                  </p>
                  <p className="mt-1 text-sm font-black">
                    {members[0].completed}
                  </p>
                </div>

                <div className="rounded-2xl bg-white/5 p-3">
                  <p className="text-[9px] font-bold text-slate-500">
                    Activity
                  </p>
                  <p className="mt-1 text-sm font-black">
                    {members[0].activity}%
                  </p>
                </div>

                <div className="rounded-2xl bg-white/5 p-3">
                  <p className="text-[9px] font-bold text-slate-500">
                    Share
                  </p>
                  <p className="mt-1 text-sm font-black">
                    {members[0].contribution}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Toolbar */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-1 flex-col gap-3 sm:flex-row">
              <div className="relative min-w-0 flex-1 sm:max-w-md">
                <FiSearch
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search people, roles or skills..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-xs font-semibold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-50"
                />
              </div>

              <button
                type="button"
                onClick={() => setShowFilters((value) => !value)}
                className={`inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-bold transition ${
                  showFilters ||
                  roleFilter !== "All" ||
                  statusFilter !== "All"
                    ? "border-blue-200 bg-blue-50 text-blue-700"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                <FiSearch size={13} />
                Filters
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden text-[10px] font-bold text-slate-400 sm:inline">
                {filteredMembers.length} of {members.length} members
              </span>

              <button
                type="button"
                onClick={() => setShowInvite(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
              >
                <FiPlus size={14} />
                Add member
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="mt-3 grid gap-3 border-t border-slate-100 pt-3 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Role
                </label>

                <div className="relative">
                  <select
                    value={roleFilter}
                    onChange={(event) =>
                      setRoleFilter(event.target.value)
                    }
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 pr-8 text-xs font-bold text-slate-700 outline-none"
                  >
                    {ROLE_FILTERS.map((role) => (
                      <option key={role}>{role}</option>
                    ))}
                  </select>

                  <FiChevronDown
                    size={13}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Availability
                </label>

                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(event) =>
                      setStatusFilter(event.target.value)
                    }
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 pr-8 text-xs font-bold text-slate-700 outline-none"
                  >
                    <option>All</option>
                    <option>Online</option>
                    <option>Away</option>
                    <option>Offline</option>
                  </select>

                  <FiChevronDown
                    size={13}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                </div>
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={clearFilters}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-500 transition hover:bg-slate-50 hover:text-slate-800"
                >
                  Clear filters
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Active filters */}
        {(search || roleFilter !== "All" || statusFilter !== "All") && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Showing
            </span>

            <span className="rounded-full bg-slate-950 px-2.5 py-1 text-[10px] font-bold text-white">
              {filteredMembers.length} members
            </span>

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-bold text-slate-600"
              >
                {search}
                <FiX size={11} />
              </button>
            )}

            {roleFilter !== "All" && (
              <button
                type="button"
                onClick={() => setRoleFilter("All")}
                className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-bold text-slate-600"
              >
                {roleFilter}
                <FiX size={11} />
              </button>
            )}

            {statusFilter !== "All" && (
              <button
                type="button"
                onClick={() => setStatusFilter("All")}
                className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-bold text-slate-600"
              >
                {statusFilter}
                <FiX size={11} />
              </button>
            )}
          </div>
        )}

        {/* Members */}
        <section className="mt-5">
          {filteredMembers.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredMembers.map((member) => (
                <MemberCard
                  key={member.id}
                  member={member}
                  onChat={handleChat}
                />
              ))}
            </div>
          ) : (
            <div className="flex min-h-72 flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white px-6 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <FiUsers size={22} />
              </div>

              <h3 className="mt-4 text-sm font-black text-slate-900">
                No teammates found
              </h3>

              <p className="mt-1 max-w-sm text-xs leading-5 text-slate-400">
                Try another search term or remove some filters.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-4 rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-bold text-white"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>

        {/* Collaboration CTA */}
        <section className="mt-6 overflow-hidden rounded-3xl bg-slate-950 p-6 text-white shadow-xl shadow-slate-950/10 sm:p-8">
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-2 flex items-center gap-2 text-blue-300">
                <FiMessageCircle size={15} />

                <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                  Team collaboration
                </span>
              </div>

              <h2 className="text-xl font-black tracking-tight sm:text-2xl">
                Great products are built together.
              </h2>

              <p className="mt-2 text-xs leading-5 text-slate-400">
                Jump into project chat, review the latest activity or continue
                planning tasks with your team.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                to={`/demo/project/${projectId}/chat`}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-slate-950 transition hover:bg-slate-100"
              >
                <FiMessageCircle size={14} />
                Open team chat
              </Link>

              <Link
                to={`/demo/project/${projectId}/activity`}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-white/10"
              >
                View activity
                <FiArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* Footer context */}
        <div className="mt-6 flex flex-col items-center justify-between gap-3 pb-3 text-[10px] font-semibold text-slate-400 sm:flex-row">
          <div className="flex items-center gap-2">
            <FiCalendar size={12} />
            Team workspace active since January 2026
          </div>

          <div className="flex items-center gap-2">
            <FiGithub size={12} />
            DevSync Engineering
          </div>
        </div>
      </main>

      {showInvite && (
        <InviteModal
          onClose={() => setShowInvite(false)}
          onInvite={handleInvite}
        />
      )}
    </div>
  );
}