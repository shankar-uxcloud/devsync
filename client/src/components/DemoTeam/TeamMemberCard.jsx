import {
  FaCode,
  FaEllipsisH,
  FaGithub,
  FaTasks,
} from "react-icons/fa";

function TeamMemberCard({ member, onSelect }) {
  return (
    <div
      onClick={() => onSelect?.(member)}
      className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
    >
      {/* TOP */}

      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 font-black text-white">
              {member.initials}
            </div>

            <span
              className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white ${
                member.status === "Online"
                  ? "bg-green-500"
                  : member.status === "Away"
                  ? "bg-yellow-400"
                  : "bg-slate-300"
              }`}
            />
          </div>

          <div>
            <h3 className="font-black text-slate-900">
              {member.name}
            </h3>

            <p className="text-xs text-slate-500">
              {member.role}
            </p>
          </div>
        </div>

        <button
          onClick={(event) => event.stopPropagation()}
          className="text-slate-300 transition hover:text-slate-600"
        >
          <FaEllipsisH />
        </button>
      </div>

      {/* STATUS */}

      <div className="mt-4">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${
            member.status === "Online"
              ? "bg-green-50 text-green-600"
              : member.status === "Away"
              ? "bg-yellow-50 text-yellow-600"
              : "bg-slate-100 text-slate-500"
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {member.status}
        </span>
      </div>

      {/* BIO */}

      <p className="mt-4 line-clamp-2 min-h-[40px] text-xs leading-5 text-slate-500">
        {member.bio}
      </p>

      {/* SKILLS */}

      <div className="mt-4 flex flex-wrap gap-1.5">
        {member.skills.slice(0, 3).map((skill) => (
          <span
            key={skill}
            className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-600"
          >
            {skill}
          </span>
        ))}

        {member.skills.length > 3 && (
          <span className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-400">
            +{member.skills.length - 3}
          </span>
        )}
      </div>

      {/* DIVIDER */}

      <div className="my-5 border-t border-slate-100" />

      {/* STATS */}

      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <FaTasks className="text-xs" />
          </div>

          <div>
            <p className="text-sm font-black text-slate-800">
              {member.tasks}
            </p>

            <p className="text-[10px] text-slate-400">
              Tasks
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
            <FaGithub className="text-xs" />
          </div>

          <div>
            <p className="text-sm font-black text-slate-800">
              {member.commits}
            </p>

            <p className="text-[10px] text-slate-400">
              Commits
            </p>
          </div>
        </div>
      </div>

      {/* FOOTER */}

      <div className="mt-5 flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-400">
          <FaCode />
          {member.contributions} contributions
        </span>

        <span className="text-xs font-bold text-blue-600 opacity-0 transition group-hover:opacity-100">
          View profile →
        </span>
      </div>
    </div>
  );
}

export default TeamMemberCard;