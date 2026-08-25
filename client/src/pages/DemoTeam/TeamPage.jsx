import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaCalendarCheck,
  FaCheckCircle,
  FaCodeBranch,
  FaFilter,
  FaList,
  FaPlus,
  FaSearch,
  FaTasks,
  FaTimes,
  FaUserFriends,
  FaUserPlus,
} from "react-icons/fa";

const initialMembers = [
  {
    id: 1,
    name: "Alex Morgan",
    role: "Full Stack Developer",
    skills: ["React", "Node.js", "MongoDB"],
    status: "Online",
    commits: 42,
    tasks: 18,
    completed: 31,
    avatar: "A",
  },
  {
    id: 2,
    name: "Rahul Kumar",
    role: "Backend Developer",
    skills: ["Node.js", "Express", "MongoDB"],
    status: "Online",
    commits: 38,
    tasks: 14,
    completed: 27,
    avatar: "R",
  },
  {
    id: 3,
    name: "Priya Sharma",
    role: "Frontend Developer",
    skills: ["React", "Tailwind", "UI/UX"],
    status: "Online",
    commits: 35,
    tasks: 16,
    completed: 24,
    avatar: "P",
  },
  {
    id: 4,
    name: "Sneha Rao",
    role: "UI/UX Designer",
    skills: ["Figma", "UI Design", "Prototyping"],
    status: "Away",
    commits: 21,
    tasks: 9,
    completed: 18,
    avatar: "S",
  },
  {
    id: 5,
    name: "Vikram Singh",
    role: "DevOps Engineer",
    skills: ["Docker", "AWS", "CI/CD"],
    status: "Online",
    commits: 29,
    tasks: 12,
    completed: 22,
    avatar: "V",
  },
  {
    id: 6,
    name: "Ananya Patel",
    role: "QA Engineer",
    skills: ["Testing", "Jest", "Cypress"],
    status: "Offline",
    commits: 17,
    tasks: 8,
    completed: 15,
    avatar: "A",
  },
  {
    id: 7,
    name: "Karthik Reddy",
    role: "Mobile Developer",
    skills: ["React Native", "Android", "Firebase"],
    status: "Online",
    commits: 26,
    tasks: 11,
    completed: 19,
    avatar: "K",
  },
  {
    id: 8,
    name: "Meera Nair",
    role: "Product Designer",
    skills: ["Product Design", "Research", "Figma"],
    status: "Online",
    commits: 14,
    tasks: 7,
    completed: 13,
    avatar: "M",
  },
];

const roles = [
  "All Roles",
  "Full Stack Developer",
  "Backend Developer",
  "Frontend Developer",
  "UI/UX Designer",
  "DevOps Engineer",
  "QA Engineer",
  "Mobile Developer",
  "Product Designer",
];

const statuses = [
  "All Status",
  "Online",
  "Away",
  "Offline",
];

function TeamPage() {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const [members, setMembers] = useState(initialMembers);
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState("All Roles");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [showInvite, setShowInvite] = useState(false);

  const [inviteForm, setInviteForm] = useState({
    name: "",
    email: "",
    role: "Frontend Developer",
  });

  const filteredMembers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return members.filter((member) => {
      const matchesSearch =
        !query ||
        member.name.toLowerCase().includes(query) ||
        member.role.toLowerCase().includes(query) ||
        member.skills.some((skill) =>
          skill.toLowerCase().includes(query)
        );

      const matchesRole =
        selectedRole === "All Roles" ||
        member.role === selectedRole;

      const matchesStatus =
        selectedStatus === "All Status" ||
        member.status === selectedStatus;

      return (
        matchesSearch &&
        matchesRole &&
        matchesStatus
      );
    });
  }, [
    members,
    search,
    selectedRole,
    selectedStatus,
  ]);

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

  const totalCommits = members.reduce(
    (sum, member) => sum + member.commits,
    0
  );

  const handleInvite = (event) => {
    event.preventDefault();

    if (
      !inviteForm.name.trim() ||
      !inviteForm.email.trim()
    ) {
      return;
    }

    const newMember = {
      id: Date.now(),
      name: inviteForm.name.trim(),
      role: inviteForm.role,
      skills: ["New Member"],
      status: "Online",
      commits: 0,
      tasks: 0,
      completed: 0,
      avatar: inviteForm.name
        .trim()
        .charAt(0)
        .toUpperCase(),
    };

    setMembers((previous) => [
      ...previous,
      newMember,
    ]);

    setInviteForm({
      name: "",
      email: "",
      role: "Frontend Developer",
    });

    setShowInvite(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">

      {/* =====================================================
          HEADER
      ====================================================== */}
      <header className="flex min-h-[86px] items-center justify-between border-b border-slate-800 bg-black px-5 md:px-10">

        <div className="flex items-center gap-4">

          <button
            onClick={() =>
              navigate(
                projectId
                  ? `/demo/project/${projectId}`
                  : "/demo"
              )
            }
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-700 text-slate-300 transition hover:border-blue-500 hover:bg-blue-500/10 hover:text-blue-400"
            title="Back to project"
          >
            <FaArrowLeft />
          </button>

          <div className="flex items-center gap-3">

            <span className="hidden text-slate-400 sm:block">
              DevSync
            </span>

            <span className="hidden text-slate-600 sm:block">
              /
            </span>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-500/40 bg-blue-500/10 text-blue-400">
              <FaUserFriends />
            </div>

            <div>
              <h1 className="text-lg font-black">
                Team
              </h1>

              <p className="text-xs text-slate-500">
                Project Members
              </p>
            </div>

          </div>
        </div>

        <div className="flex items-center gap-3">

          <span className="hidden rounded-full border border-blue-500/40 bg-blue-500/10 px-5 py-2 text-xs font-black text-blue-400 md:block">
            DEMO MODE
          </span>

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-lg font-black">
            A
          </div>

        </div>

      </header>


      {/* =====================================================
          MAIN
      ====================================================== */}
      <main className="px-5 py-10 md:px-10 lg:px-16">

        {/* TITLE */}
        <section className="mb-10">

          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-blue-400">
            <FaUserFriends />
            DevSync Team
          </div>

          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">

            <div>

              <h2 className="text-4xl font-black tracking-tight md:text-5xl">
                Meet the Team
              </h2>

              <p className="mt-3 max-w-3xl text-base text-slate-400 md:text-lg">
                Collaborate with developers, designers and engineers
                working on DevSync.
              </p>

            </div>

            <button
              onClick={() => setShowInvite(true)}
              className="flex w-fit items-center gap-3 rounded-xl bg-blue-600 px-6 py-4 text-sm font-black text-white shadow-xl shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-500"
            >
              <FaPlus />
              Invite Member
            </button>

          </div>

        </section>


        {/* =====================================================
            STATS
        ====================================================== */}
        <section className="mb-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">

          <StatCard
            icon={<FaUserFriends />}
            label="Team Members"
            value={members.length}
            description={`${onlineCount} currently online`}
            color="blue"
            change="+2"
          />

          <StatCard
            icon={<FaList />}
            label="Active Tasks"
            value={totalTasks}
            description="Across the project"
            color="green"
            change="+18%"
          />

          <StatCard
            icon={<FaCheckCircle />}
            label="Completed Tasks"
            value={completedTasks}
            description="This project"
            color="purple"
            change="+12%"
          />

          <StatCard
            icon={<FaCodeBranch />}
            label="GitHub Commits"
            value={totalCommits}
            description="This month"
            color="orange"
            change="+24%"
          />

        </section>


        {/* =====================================================
            SEARCH / FILTER
        ====================================================== */}
        <section className="mb-10 rounded-2xl border border-slate-800 bg-slate-950/60 p-5">

          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

            {/* SEARCH */}
            <div className="relative w-full xl:max-w-xl">

              <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" />

              <input
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search members, roles or skills..."
                className="w-full rounded-xl border border-slate-800 bg-black py-4 pl-12 pr-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
              />

            </div>


            {/* FILTERS */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

              <div className="flex items-center gap-2 text-sm font-bold text-slate-400">
                <FaFilter />
                Filters
              </div>

              <select
                value={selectedRole}
                onChange={(event) =>
                  setSelectedRole(event.target.value)
                }
                className="rounded-xl border border-slate-800 bg-black px-5 py-3 text-sm font-bold text-slate-300 outline-none focus:border-blue-500"
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>

              <select
                value={selectedStatus}
                onChange={(event) =>
                  setSelectedStatus(event.target.value)
                }
                className="rounded-xl border border-slate-800 bg-black px-5 py-3 text-sm font-bold text-slate-300 outline-none focus:border-blue-500"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>

            </div>

          </div>

        </section>


        {/* =====================================================
            TEAM MEMBERS
        ====================================================== */}
        <section>

          <div className="mb-6 flex items-center justify-between">

            <div>
              <h3 className="text-2xl font-black">
                Team Members
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {filteredMembers.length} members found
              </p>
            </div>

            <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-xs font-black text-blue-400">
              {members.length} Members
            </span>

          </div>


          {filteredMembers.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-800 py-20 text-center">

              <FaUserFriends className="mx-auto mb-4 text-3xl text-slate-700" />

              <h4 className="font-black text-slate-400">
                No team members found
              </h4>

              <p className="mt-2 text-sm text-slate-600">
                Try changing your search or filters.
              </p>

            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

              {filteredMembers.map((member) => (
                <MemberCard
                  key={member.id}
                  member={member}
                />
              ))}

            </div>
          )}

        </section>

      </main>


      {/* =====================================================
          INVITE MODAL
      ====================================================== */}
      {showInvite && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-5 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowInvite(false);
            }
          }}
        >

          <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-2xl">

            <div className="mb-6 flex items-start justify-between">

              <div>
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                  <FaUserPlus />
                </div>

                <h3 className="text-xl font-black">
                  Invite Team Member
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Add a new developer to this project.
                </p>
              </div>

              <button
                onClick={() => setShowInvite(false)}
                className="text-slate-500 transition hover:text-white"
              >
                <FaTimes />
              </button>

            </div>


            <form
              onSubmit={handleInvite}
              className="space-y-5"
            >

              <div>

                <label className="mb-2 block text-xs font-black uppercase tracking-wide text-slate-500">
                  Full Name
                </label>

                <input
                  value={inviteForm.name}
                  onChange={(event) =>
                    setInviteForm({
                      ...inviteForm,
                      name: event.target.value,
                    })
                  }
                  placeholder="e.g. John Smith"
                  className="w-full rounded-xl border border-slate-800 bg-black px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
                  autoFocus
                />

              </div>


              <div>

                <label className="mb-2 block text-xs font-black uppercase tracking-wide text-slate-500">
                  Email Address
                </label>

                <input
                  type="email"
                  value={inviteForm.email}
                  onChange={(event) =>
                    setInviteForm({
                      ...inviteForm,
                      email: event.target.value,
                    })
                  }
                  placeholder="john@example.com"
                  className="w-full rounded-xl border border-slate-800 bg-black px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
                />

              </div>


              <div>

                <label className="mb-2 block text-xs font-black uppercase tracking-wide text-slate-500">
                  Role
                </label>

                <select
                  value={inviteForm.role}
                  onChange={(event) =>
                    setInviteForm({
                      ...inviteForm,
                      role: event.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-800 bg-black px-4 py-3 text-sm text-slate-300 outline-none focus:border-blue-500"
                >
                  {roles
                    .filter((role) => role !== "All Roles")
                    .map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                </select>

              </div>


              <div className="flex justify-end gap-3 border-t border-slate-800 pt-5">

                <button
                  type="button"
                  onClick={() => setShowInvite(false)}
                  className="rounded-xl border border-slate-800 px-5 py-3 text-sm font-bold text-slate-400 transition hover:border-slate-600 hover:text-white"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-black text-white transition hover:bg-blue-500"
                >
                  <FaUserPlus />
                  Send Invite
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}


/* ============================================================
   STAT CARD
============================================================ */

function StatCard({
  icon,
  label,
  value,
  description,
  color,
  change,
}) {
  const iconStyles = {
    blue: "border-blue-500/30 bg-blue-500/10 text-blue-400",
    green: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
    purple: "border-purple-500/30 bg-purple-500/10 text-purple-400",
    orange: "border-orange-500/30 bg-orange-500/10 text-orange-400",
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-black p-6">

      <div className="flex items-start justify-between">

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-xl border text-lg ${iconStyles[color]}`}
        >
          {icon}
        </div>

        <span className="rounded-full border border-emerald-500/30 bg-emerald-500/5 px-3 py-1 text-xs font-black text-emerald-400">
          ↑ {change}
        </span>

      </div>

      <p className="mt-7 text-sm font-semibold text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-4xl font-black text-white">
        {value}
      </p>

      <p className="mt-2 text-sm text-slate-500">
        {description}
      </p>

    </div>
  );
}


/* ============================================================
   MEMBER CARD
============================================================ */

function MemberCard({ member }) {
  const statusStyles = {
    Online: "bg-emerald-500",
    Away: "bg-yellow-500",
    Offline: "bg-slate-600",
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-black p-6 transition hover:-translate-y-1 hover:border-slate-700 hover:shadow-xl hover:shadow-blue-500/5">

      {/* PROFILE */}
      <div className="flex items-start gap-4">

        <div className="relative">

          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-lg font-black text-white">
            {member.avatar}
          </div>

          <span
            className={`absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-black ${statusStyles[member.status]}`}
          />

        </div>


        <div className="min-w-0 flex-1">

          <h4 className="truncate font-black text-white">
            {member.name}
          </h4>

          <p className="mt-1 truncate text-sm text-slate-500">
            {member.role}
          </p>

          <span className="mt-2 inline-block text-[10px] font-bold text-slate-600">
            {member.status}
          </span>

        </div>

      </div>


      {/* SKILLS */}
      <div className="mt-6 flex flex-wrap gap-2">

        {member.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-[10px] font-bold text-slate-400"
          >
            {skill}
          </span>
        ))}

      </div>


      {/* STATS */}
      <div className="mt-6 grid grid-cols-3 border-t border-slate-800 pt-5">

        <MiniStat
          value={member.tasks}
          label="Tasks"
        />

        <MiniStat
          value={member.completed}
          label="Done"
        />

        <MiniStat
          value={member.commits}
          label="Commits"
        />

      </div>

    </div>
  );
}


/* ============================================================
   MINI STAT
============================================================ */

function MiniStat({ value, label }) {
  return (
    <div className="text-center">

      <p className="text-lg font-black text-white">
        {value}
      </p>

      <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-slate-600">
        {label}
      </p>

    </div>
  );
}

export default TeamPage;