import { useState } from "react";
import {
  FaEnvelope,
  FaLink,
  FaPaperPlane,
  FaUserPlus,
  FaUsers,
} from "react-icons/fa";

function InviteMemberModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Developer");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const inviteLink = "https://devsync-demo.app/invite/devsync";

  const handleInvite = () => {
    if (!email.trim()) return;

    setMessage(`Invitation sent to ${email}`);
  };

  const copyInviteLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-5 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-3xl bg-white p-7 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        {/* HEADER */}

        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <FaUserPlus />
            </div>

            <div>
              <h2 className="text-xl font-black text-slate-900">
                Invite Team Member
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Add a developer to the DevSync project.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-lg text-slate-500 transition hover:bg-slate-200"
          >
            ×
          </button>
        </div>

        {/* FORM */}

        <div className="mt-7 space-y-5">
          <div>
            <label className="mb-2 block text-xs font-bold text-slate-600">
              Email Address
            </label>

            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-slate-400" />

              <input
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setMessage("");
                }}
                placeholder="developer@example.com"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold text-slate-600">
              Project Role
            </label>

            <select
              value={role}
              onChange={(event) => setRole(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
            >
              <option>Developer</option>
              <option>Frontend Developer</option>
              <option>Backend Developer</option>
              <option>UI/UX Designer</option>
              <option>Project Manager</option>
              <option>Viewer</option>
            </select>
          </div>
        </div>

        {/* INVITE BUTTON */}

        <button
          onClick={handleInvite}
          disabled={!email.trim()}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <FaPaperPlane />
          Send Invitation
        </button>

        {/* SUCCESS MESSAGE */}

        {message && (
          <div className="mt-4 rounded-xl bg-green-50 p-3 text-center text-xs font-bold text-green-600">
            {message}
          </div>
        )}

        {/* DIVIDER */}

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-200" />

          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            or
          </span>

          <div className="h-px flex-1 bg-slate-200" />
        </div>

        {/* INVITE LINK */}

        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-bold text-slate-600">
            <FaLink className="text-blue-600" />
            Share Invite Link
          </div>

          <div className="flex gap-2">
            <div className="flex min-w-0 flex-1 items-center rounded-xl border border-slate-200 bg-slate-50 px-4">
              <span className="truncate text-xs text-slate-500">
                {inviteLink}
              </span>
            </div>

            <button
              onClick={copyInviteLink}
              className="shrink-0 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-bold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>

        {/* FOOTER INFO */}

        <div className="mt-6 flex items-center gap-3 rounded-xl bg-slate-50 p-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-slate-400">
            <FaUsers />
          </div>

          <p className="text-xs leading-5 text-slate-500">
            Invited developers will receive access to the project based on
            the selected role.
          </p>
        </div>
      </div>
    </div>
  );
}

export default InviteMemberModal;