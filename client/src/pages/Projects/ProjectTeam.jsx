import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  FaArrowLeft,
  FaCheckCircle,
  FaCodeBranch,
  FaFilter,
  FaList,
  FaPlus,
  FaSearch,
  FaTimes,
  FaUserFriends,
  FaUserPlus,
  FaTrash,
} from "react-icons/fa";

import API from "../../api/axios";

function ProjectTeam() {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const [project, setProject] = useState(null);
  const [members, setMembers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState("All Roles");

  const [showInvite, setShowInvite] = useState(false);

  const [inviteEmail, setInviteEmail] = useState("");

  // =====================================================
  // LOAD PROJECT
  // =====================================================

  const loadProject = async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await API.get(
        `/projects/${projectId}`
      );

      if (!data.success) {
        throw new Error(
          data.message || "Failed to load project"
        );
      }

      setProject(data.project);
      setMembers(data.project.members || []);
    } catch (err) {
      console.error("LOAD TEAM ERROR:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to load team members."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (projectId) {
      loadProject();
    }
  }, [projectId]);

  // =====================================================
  // CURRENT USER
  // =====================================================

  const currentUser = useMemo(() => {
    try {
      const savedUser =
        localStorage.getItem("user");

      return savedUser
        ? JSON.parse(savedUser)
        : null;
    } catch {
      return null;
    }
  }, []);

  const isOwner =
    project &&
    currentUser &&
    String(project.owner?._id || project.owner?.id) ===
      String(currentUser.id || currentUser._id);

  // =====================================================
  // FILTER MEMBERS
  // =====================================================

  const roles = useMemo(() => {
    const uniqueRoles = new Set();

    members.forEach((member) => {
      if (member.role) {
        uniqueRoles.add(member.role);
      }
    });

    return [
      "All Roles",
      ...Array.from(uniqueRoles),
    ];
  }, [members]);

  const filteredMembers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return members.filter((member) => {
      const name =
        member.name?.toLowerCase() || "";

      const email =
        member.email?.toLowerCase() || "";

      const role =
        member.role?.toLowerCase() || "";

      const matchesSearch =
        !query ||
        name.includes(query) ||
        email.includes(query) ||
        role.includes(query);

      const matchesRole =
        selectedRole === "All Roles" ||
        member.role === selectedRole;

      return matchesSearch && matchesRole;
    });
  }, [members, search, selectedRole]);

  // =====================================================
  // ADD MEMBER
  // =====================================================

  const handleAddMember = async (event) => {
    event.preventDefault();

    if (!inviteEmail.trim()) {
      setError("Please enter the member's email.");
      return;
    }

    try {
      setActionLoading(true);
      setError("");
      setSuccess("");

      const { data } = await API.post(
        `/projects/${projectId}/members`,
        {
          email: inviteEmail.trim(),
        }
      );

      setProject(data.project);
      setMembers(data.project.members || []);

      setInviteEmail("");
      setShowInvite(false);

      setSuccess(
        data.message ||
          "Team member added successfully."
      );

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (err) {
      console.error("ADD MEMBER ERROR:", err);

      setError(
        err.response?.data?.message ||
          "Unable to add team member."
      );
    } finally {
      setActionLoading(false);
    }
  };

  // =====================================================
  // REMOVE MEMBER
  // =====================================================

  const handleRemoveMember = async (memberId) => {
    const member = members.find(
      (item) =>
        String(item._id) === String(memberId)
    );

    const confirmed = window.confirm(
      `Remove ${
        member?.name || "this member"
      } from the project?`
    );

    if (!confirmed) return;

    try {
      setActionLoading(true);
      setError("");
      setSuccess("");

      const { data } = await API.delete(
        `/projects/${projectId}/members/${memberId}`
      );

      setProject(data.project);
      setMembers(data.project.members || []);

      setSuccess(
        data.message ||
          "Team member removed successfully."
      );

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (err) {
      console.error(
        "REMOVE MEMBER ERROR:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Unable to remove team member."
      );
    } finally {
      setActionLoading(false);
    }
  };

  // =====================================================
  // STATS
  // =====================================================

  const totalTasks = project?.totalTasks || 0;

  const completedTasks =
    project?.completedTasks || 0;

  const onlineCount = members.length;

  // GitHub commits aren't stored yet.
  const totalCommits = 0;

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-slate-700 border-t-blue-500" />

          <p className="text-sm font-bold text-slate-400">
            Loading project team...
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black px-5 text-white">
        <div className="max-w-md text-center">
          <FaUserFriends className="mx-auto mb-5 text-4xl text-slate-700" />

          <h2 className="text-2xl font-black">
            Project not found
          </h2>

          <p className="mt-3 text-sm text-slate-500">
            {error ||
              "This project does not exist or you do not have access to it."}
          </p>

          <button
            onClick={() =>
              navigate("/projects")
            }
            className="mt-6 rounded-xl bg-blue-600 px-6 py-3 text-sm font-black text-white transition hover:bg-blue-500"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  // =====================================================
  // MAIN UI
  // =====================================================

  return (
    <div className="min-h-screen bg-black text-white">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="flex min-h-[86px] items-center justify-between border-b border-slate-800 bg-black px-5 md:px-10">

        <div className="flex items-center gap-4">

          <button
            onClick={() =>
              navigate(
                `/projects/${projectId}`
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

              <p className="max-w-[220px] truncate text-xs text-slate-500">
                {project.name}
              </p>
            </div>

          </div>

        </div>

        <div className="flex items-center gap-3">

          {isOwner && (
            <button
              onClick={() =>
                setShowInvite(true)
              }
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-xs font-black text-white transition hover:bg-blue-500"
            >
              <FaUserPlus />
              <span className="hidden sm:block">
                Add Member
              </span>
            </button>
          )}

        </div>

      </header>


      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="px-5 py-10 md:px-10 lg:px-16">

        {/* TITLE */}

        <section className="mb-10">

          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-blue-400">
            <FaUserFriends />
            Project Team
          </div>

          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">

            <div>

              <h2 className="text-4xl font-black tracking-tight md:text-5xl">
                Meet the Team
              </h2>

              <p className="mt-3 max-w-3xl text-base text-slate-400 md:text-lg">
                Collaborate with the people working on{" "}
                <span className="font-bold text-white">
                  {project.name}
                </span>
                .
              </p>

            </div>

            {isOwner && (
              <button
                onClick={() =>
                  setShowInvite(true)
                }
                className="flex w-fit items-center gap-3 rounded-xl bg-blue-600 px-6 py-4 text-sm font-black text-white shadow-xl shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-500"
              >
                <FaPlus />
                Add Team Member
              </button>
            )}

          </div>

        </section>


        {/* =====================================================
            ALERTS
        ===================================================== */}

        {error && (
          <div className="mb-6 flex items-center justify-between rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-300">

            <span>
              {error}
            </span>

            <button
              onClick={() => setError("")}
              className="text-red-400 hover:text-white"
            >
              <FaTimes />
            </button>

          </div>
        )}

        {success && (
          <div className="mb-6 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-4 text-sm font-bold text-emerald-300">
            {success}
          </div>
        )}


        {/* =====================================================
            STATS
        ===================================================== */}

        <section className="mb-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">

          <StatCard
            icon={<FaUserFriends />}
            label="Team Members"
            value={members.length}
            description="People in this project"
            color="blue"
          />

          <StatCard
            icon={<FaList />}
            label="Total Tasks"
            value={totalTasks}
            description="Across the project"
            color="green"
          />

          <StatCard
            icon={<FaCheckCircle />}
            label="Completed Tasks"
            value={completedTasks}
            description="Completed so far"
            color="purple"
          />

          <StatCard
            icon={<FaCodeBranch />}
            label="GitHub Commits"
            value={totalCommits}
            description="GitHub integration coming next"
            color="orange"
          />

        </section>


        {/* =====================================================
            SEARCH / FILTER
        ===================================================== */}

        <section className="mb-10 rounded-2xl border border-slate-800 bg-slate-950/60 p-5">

          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

            <div className="relative w-full xl:max-w-xl">

              <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" />

              <input
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search members..."
                className="w-full rounded-xl border border-slate-800 bg-black py-4 pl-12 pr-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
              />

            </div>

            <div className="flex items-center gap-3">

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
                  <option
                    key={role}
                    value={role}
                  >
                    {role}
                  </option>
                ))}
              </select>

            </div>

          </div>

        </section>


        {/* =====================================================
            TEAM MEMBERS
        ===================================================== */}

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
                {members.length === 0
                  ? "Add your first team member."
                  : "Try changing your search or filter."}
              </p>

            </div>

          ) : (

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

              {filteredMembers.map(
                (member) => (
                  <MemberCard
                    key={member._id}
                    member={member}
                    isOwner={isOwner}
                    projectOwnerId={
                      project.owner?._id
                    }
                    onRemove={
                      handleRemoveMember
                    }
                    actionLoading={
                      actionLoading
                    }
                  />
                )
              )}

            </div>

          )}

        </section>

      </main>


      {/* =====================================================
          ADD MEMBER MODAL
      ===================================================== */}

      {showInvite && isOwner && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-5 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
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
                  Add Team Member
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Enter the email of an existing DevSync user.
                </p>

              </div>

              <button
                onClick={() =>
                  setShowInvite(false)
                }
                className="text-slate-500 transition hover:text-white"
              >
                <FaTimes />
              </button>

            </div>


            <form
              onSubmit={handleAddMember}
              className="space-y-5"
            >

              <div>

                <label className="mb-2 block text-xs font-black uppercase tracking-wide text-slate-500">
                  DevSync Account Email
                </label>

                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(event) =>
                    setInviteEmail(
                      event.target.value
                    )
                  }
                  placeholder="friend@gmail.com"
                  className="w-full rounded-xl border border-slate-800 bg-black px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
                  autoFocus
                  required
                />

                <p className="mt-2 text-xs text-slate-600">
                  The user must already have a DevSync account.
                </p>

              </div>


              <div className="flex justify-end gap-3 border-t border-slate-800 pt-5">

                <button
                  type="button"
                  onClick={() =>
                    setShowInvite(false)
                  }
                  className="rounded-xl border border-slate-800 px-5 py-3 text-sm font-bold text-slate-400 transition hover:border-slate-600 hover:text-white"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={actionLoading}
                  className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-black text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <FaUserPlus />

                  {actionLoading
                    ? "Adding..."
                    : "Add Member"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}


// =====================================================
// STAT CARD
// =====================================================

function StatCard({
  icon,
  label,
  value,
  description,
  color,
}) {
  const iconStyles = {
    blue:
      "border-blue-500/30 bg-blue-500/10 text-blue-400",

    green:
      "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",

    purple:
      "border-purple-500/30 bg-purple-500/10 text-purple-400",

    orange:
      "border-orange-500/30 bg-orange-500/10 text-orange-400",
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-black p-6">

      <div className="flex items-start justify-between">

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-xl border text-lg ${iconStyles[color]}`}
        >
          {icon}
        </div>

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


// =====================================================
// MEMBER CARD
// =====================================================

function MemberCard({
  member,
  isOwner,
  projectOwnerId,
  onRemove,
  actionLoading,
}) {
  const isProjectOwner =
    String(member._id) ===
    String(projectOwnerId);

  const initials =
    member.name
      ?.trim()
      ?.split(/\s+/)
      ?.map((part) => part[0])
      ?.join("")
      ?.slice(0, 2)
      ?.toUpperCase() || "U";

  return (
    <div className="rounded-2xl border border-slate-800 bg-black p-6 transition hover:-translate-y-1 hover:border-slate-700 hover:shadow-xl hover:shadow-blue-500/5">

      {/* PROFILE */}

      <div className="flex items-start gap-4">

        <div className="relative">

          {member.avatar ? (

            <img
              src={member.avatar}
              alt={member.name}
              className="h-14 w-14 rounded-full object-cover"
            />

          ) : (

            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-lg font-black text-white">
              {initials}
            </div>

          )}

        </div>


        <div className="min-w-0 flex-1">

          <div className="flex items-start justify-between gap-2">

            <div className="min-w-0">

              <h4 className="truncate font-black text-white">
                {member.name}
              </h4>

              <p className="mt-1 truncate text-sm text-slate-500">
                {member.email}
              </p>

            </div>

            {isProjectOwner && (
              <span className="shrink-0 rounded-full border border-blue-500/30 bg-blue-500/10 px-2 py-1 text-[9px] font-black uppercase text-blue-400">
                Owner
              </span>
            )}

          </div>

        </div>

      </div>


      {/* DETAILS */}

      <div className="mt-6 border-t border-slate-800 pt-5">

        <div className="flex items-center justify-between">

          <span className="text-xs font-bold text-slate-500">
            Account Role
          </span>

          <span className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs font-bold text-slate-400">
            {member.role || "User"}
          </span>

        </div>

      </div>


      {/* ACTION */}

      {isOwner && !isProjectOwner && (

        <button
          onClick={() =>
            onRemove(member._id)
          }
          disabled={actionLoading}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-xs font-black text-red-400 transition hover:bg-red-500/10 hover:text-red-300 disabled:opacity-50"
        >
          <FaTrash />
          Remove Member
        </button>

      )}

    </div>
  );
}

export default ProjectTeam;