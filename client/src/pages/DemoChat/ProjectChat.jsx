import React, { useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FiActivity,
  FiArrowLeft,
  FiArrowRight,
  FiAtSign,
  FiBell,
  FiBookmark,
  FiCalendar,
  FiCheck,
  FiCheckCircle,
  FiChevronDown,
  FiCode,
  FiCopy,
  FiEdit3,
  FiFile,
  FiFlag,
  FiGithub,
  FiHash,
  FiImage,
  FiLink,
  FiMenu,
  FiMessageCircle,
  FiMoreHorizontal,
  FiPaperclip,
  FiPlus,
  FiSearch,
  FiSend,
  FiSmile,
  FiStar,
  FiUsers,
  FiX,
  FiZap,
} from "react-icons/fi";

const CHANNELS = [
  {
    id: "general",
    name: "general",
    description: "Project-wide conversations",
    unread: 0,
  },
  {
    id: "development",
    name: "development",
    description: "Engineering discussions",
    unread: 3,
  },
  {
    id: "design",
    name: "design",
    description: "UI and product design",
    unread: 1,
  },
  {
    id: "random",
    name: "random",
    description: "Anything goes",
    unread: 0,
  },
];

const MEMBERS = [
  {
    id: 1,
    name: "Arjun Kumar",
    initials: "AK",
    role: "Project Admin",
    status: "Online",
  },
  {
    id: 2,
    name: "Priya Sharma",
    initials: "PS",
    role: "Frontend Developer",
    status: "Online",
  },
  {
    id: 3,
    name: "Rahul Mehta",
    initials: "RM",
    role: "Backend Developer",
    status: "Away",
  },
  {
    id: 4,
    name: "Kiran Nair",
    initials: "KN",
    role: "DevOps Engineer",
    status: "Offline",
  },
  {
    id: 5,
    name: "Sneha Rao",
    initials: "SR",
    role: "Product Designer",
    status: "Online",
  },
  {
    id: 6,
    name: "Vikram Singh",
    initials: "VS",
    role: "QA Engineer",
    status: "Online",
  },
];

const INITIAL_MESSAGES = [
  {
    id: 1,
    author: "Arjun Kumar",
    initials: "AK",
    role: "Project Admin",
    time: "10:12 AM",
    channel: "general",
    text: "Good morning team 👋 The latest DevSync milestone is looking solid. Let's close the remaining review items today.",
    reactions: [
      { emoji: "👍", count: 4 },
      { emoji: "🚀", count: 2 },
    ],
  },
  {
    id: 2,
    author: "Priya Sharma",
    initials: "PS",
    role: "Frontend Developer",
    time: "10:18 AM",
    channel: "general",
    text: "Dashboard and project overview are both updated. I also cleaned up the responsive states.",
    reactions: [
      { emoji: "🔥", count: 3 },
      { emoji: "❤️", count: 2 },
    ],
  },
  {
    id: 3,
    author: "Rahul Mehta",
    initials: "RM",
    role: "Backend Developer",
    time: "10:24 AM",
    channel: "general",
    text: "API side is ready. I'm finishing the task aggregation endpoint and then I'll push the changes.",
    reactions: [{ emoji: "👍", count: 3 }],
  },
  {
    id: 4,
    author: "Kiran Nair",
    initials: "KN",
    role: "DevOps Engineer",
    time: "10:31 AM",
    channel: "general",
    text: "CI pipeline is green. Production build is completing without errors.",
    reactions: [
      { emoji: "✅", count: 5 },
      { emoji: "🚀", count: 1 },
    ],
  },
  {
    id: 5,
    author: "Arjun Kumar",
    initials: "AK",
    role: "Project Admin",
    time: "10:42 AM",
    channel: "general",
    text: "Perfect. Once Rahul pushes the endpoint, let's review everything together.",
    reactions: [],
  },

  {
    id: 6,
    author: "Rahul Mehta",
    initials: "RM",
    role: "Backend Developer",
    time: "11:05 AM",
    channel: "development",
    text: "The project task endpoint is ready. Here's the response structure we're using:",
    code: `{
  "success": true,
  "tasks": [],
  "total": 24,
  "completed": 18
}`,
    reactions: [
      { emoji: "👀", count: 2 },
      { emoji: "👍", count: 4 },
    ],
  },
  {
    id: 7,
    author: "Priya Sharma",
    initials: "PS",
    role: "Frontend Developer",
    time: "11:13 AM",
    channel: "development",
    text: "Looks good. That structure will map nicely to the dashboard cards.",
    reactions: [{ emoji: "✨", count: 2 }],
  },
  {
    id: 8,
    author: "Arjun Kumar",
    initials: "AK",
    role: "Project Admin",
    time: "11:20 AM",
    channel: "development",
    text: "Nice. Please add pagination before merging so the endpoint scales with larger projects.",
    reactions: [{ emoji: "👍", count: 2 }],
  },

  {
    id: 9,
    author: "Sneha Rao",
    initials: "SR",
    role: "Product Designer",
    time: "09:42 AM",
    channel: "design",
    text: "I uploaded the latest dashboard component direction. The main goal is cleaner hierarchy with less visual noise.",
    reactions: [
      { emoji: "🎨", count: 3 },
      { emoji: "❤️", count: 2 },
    ],
  },
  {
    id: 10,
    author: "Priya Sharma",
    initials: "PS",
    role: "Frontend Developer",
    time: "09:49 AM",
    channel: "design",
    text: "I like the new spacing system. I'll align the cards with the updated design tokens.",
    reactions: [{ emoji: "🔥", count: 3 }],
  },

  {
    id: 11,
    author: "Vikram Singh",
    initials: "VS",
    role: "QA Engineer",
    time: "08:35 AM",
    channel: "random",
    text: "Coffee count for today's release: dangerously high ☕😂",
    reactions: [
      { emoji: "😂", count: 5 },
      { emoji: "☕", count: 4 },
    ],
  },
];

const EMOJIS = ["👍", "❤️", "🚀", "🔥", "😂", "🎉", "👀", "✅"];

const STATUS_DOT = {
  Online: "bg-emerald-500",
  Away: "bg-amber-500",
  Offline: "bg-slate-400",
};

function Avatar({ initials, online, size = "md" }) {
  const sizes = {
    sm: "h-7 w-7 text-[9px]",
    md: "h-9 w-9 text-[10px]",
    lg: "h-11 w-11 text-xs",
  };

  return (
    <div
      className={`${sizes[size]} relative flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-slate-950 via-slate-800 to-slate-600 font-black text-white shadow-sm`}
    >
      {initials}

      {online !== undefined && (
        <span
          className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white ${STATUS_DOT[online]}`}
        />
      )}
    </div>
  );
}

function ChannelIcon({ name }) {
  if (name === "development") {
    return <FiCode size={14} />;
  }

  if (name === "design") {
    return <FiEdit3 size={14} />;
  }

  if (name === "random") {
    return <FiStar size={14} />;
  }

  return <FiHash size={14} />;
}

function Message({
  message,
  isOwn,
  onReact,
  onCopy,
  onReply,
}) {
  const [showMenu, setShowMenu] = useState(false);
  const [showReactions, setShowReactions] = useState(false);

  return (
    <div className="group relative flex gap-3 px-4 py-3 transition hover:bg-slate-50/70 sm:px-6">
      <Avatar
        initials={message.initials}
        size="md"
        online={
          MEMBERS.find((member) => member.name === message.author)?.status
        }
      />

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="text-xs font-black text-slate-950">
            {message.author}
          </span>

          <span className="hidden text-[9px] font-semibold text-slate-400 sm:inline">
            {message.role}
          </span>

          <span className="text-[9px] font-medium text-slate-400">
            {message.time}
          </span>
        </div>

        <p className="mt-1.5 whitespace-pre-wrap text-xs leading-5 text-slate-600">
          {message.text}
        </p>

        {message.code && (
          <div className="relative mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-[#0f172a]">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
              <div className="flex items-center gap-2">
                <FiCode size={13} className="text-blue-300" />

                <span className="font-mono text-[9px] font-bold text-slate-400">
                  response.json
                </span>
              </div>

              <button
                type="button"
                onClick={() => onCopy(message.code)}
                className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[9px] font-bold text-slate-400 transition hover:bg-white/10 hover:text-white"
              >
                <FiCopy size={11} />
                Copy
              </button>
            </div>

            <pre className="overflow-x-auto p-4 font-mono text-[10px] leading-5 text-slate-300">
              {message.code}
            </pre>
          </div>
        )}

        <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
          {message.reactions?.map((reaction, index) => (
            <button
              type="button"
              key={`${reaction.emoji}-${index}`}
              onClick={() => onReact(message.id, reaction.emoji)}
              className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-1 text-[10px] font-bold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50"
            >
              <span>{reaction.emoji}</span>
              <span>{reaction.count}</span>
            </button>
          ))}

          <div className="relative">
            <button
              type="button"
              onClick={() => setShowReactions((value) => !value)}
              className="rounded-full border border-transparent p-1.5 text-slate-300 opacity-0 transition hover:border-slate-200 hover:bg-white hover:text-slate-600 group-hover:opacity-100"
              title="Add reaction"
            >
              <FiSmile size={13} />
            </button>

            {showReactions && (
              <div className="absolute bottom-8 left-0 z-20 flex gap-1 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                {EMOJIS.map((emoji) => (
                  <button
                    type="button"
                    key={emoji}
                    onClick={() => {
                      onReact(message.id, emoji);
                      setShowReactions(false);
                    }}
                    className="rounded-lg p-1.5 text-sm transition hover:bg-slate-100"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="absolute right-4 top-2 hidden items-center gap-1 rounded-xl border border-slate-200 bg-white p-1 shadow-sm group-hover:flex sm:right-6">
        <button
          type="button"
          onClick={() => onReply(message)}
          className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          title="Reply"
        >
          <FiMessageCircle size={12} />
        </button>

        <button
          type="button"
          onClick={() => onCopy(message.text)}
          className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          title="Copy"
        >
          <FiCopy size={12} />
        </button>

        <div className="relative">
          <button
            type="button"
            onClick={() => setShowMenu((value) => !value)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <FiMoreHorizontal size={12} />
          </button>

          {showMenu && (
            <div className="absolute right-0 top-8 z-30 w-36 overflow-hidden rounded-xl border border-slate-200 bg-white p-1 shadow-xl">
              <button
                type="button"
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[10px] font-bold text-slate-600 hover:bg-slate-50"
              >
                <FiBookmark size={11} />
                Save message
              </button>

              <button
                type="button"
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[10px] font-bold text-slate-600 hover:bg-slate-50"
              >
                <FiFlag size={11} />
                Report
              </button>
            </div>
          )}
        </div>
      </div>

      {isOwn && (
        <span className="sr-only">Your message</span>
      )}
    </div>
  );
}

function PinnedMessage() {
  return (
    <div className="border-b border-amber-100 bg-amber-50/60 px-4 py-3 sm:px-6">
      <div className="flex gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
          <FiBookmark size={14} />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-black uppercase tracking-[0.16em] text-amber-700">
              Pinned
            </span>

            <span className="text-[9px] font-medium text-slate-400">
              Arjun · 9:30 AM
            </span>
          </div>

          <p className="mt-1 text-xs font-semibold leading-5 text-slate-700">
            Release review is scheduled for Friday at 4:00 PM. Please have your
            open PRs ready before then.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ProjectChat() {
  const { projectId = "devsync" } = useParams();
  const navigate = useNavigate();
  const composerRef = useRef(null);

  const [activeChannel, setActiveChannel] = useState("general");
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [messageText, setMessageText] = useState("");
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showMembers, setShowMembers] = useState(true);
  const [showChannels, setShowChannels] = useState(true);
  const [replyingTo, setReplyingTo] = useState(null);
  const [notice, setNotice] = useState("");
  const [typing, setTyping] = useState(false);

  const currentChannel = CHANNELS.find(
    (channel) => channel.id === activeChannel
  );

  const channelMessages = useMemo(() => {
    const query = search.trim().toLowerCase();

    return messages.filter((message) => {
      if (message.channel !== activeChannel) return false;

      if (!query) return true;

      return (
        message.text.toLowerCase().includes(query) ||
        message.author.toLowerCase().includes(query) ||
        message.role.toLowerCase().includes(query)
      );
    });
  }, [messages, activeChannel, search]);

  const onlineMembers = MEMBERS.filter(
    (member) => member.status === "Online"
  );

  const showNotice = (text) => {
    setNotice(text);

    window.setTimeout(() => {
      setNotice("");
    }, 2800);
  };

  const handleSend = () => {
    const text = messageText.trim();

    if (!text) return;

    const newMessage = {
      id: Date.now(),
      author: "You",
      initials: "YS",
      role: "Developer",
      time: new Date().toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      }),
      channel: activeChannel,
      text,
      reactions: [],
    };

    setMessages((current) => [...current, newMessage]);
    setMessageText("");
    setReplyingTo(null);
    setTyping(false);

    window.setTimeout(() => {
      composerRef.current?.focus();
    }, 50);
  };

  const handleReact = (messageId, emoji) => {
    setMessages((current) =>
      current.map((message) => {
        if (message.id !== messageId) return message;

        const existing = message.reactions?.find(
          (reaction) => reaction.emoji === emoji
        );

        if (existing) {
          return {
            ...message,
            reactions: message.reactions.map((reaction) =>
              reaction.emoji === emoji
                ? { ...reaction, count: reaction.count + 1 }
                : reaction
            ),
          };
        }

        return {
          ...message,
          reactions: [
            ...(message.reactions || []),
            { emoji, count: 1 },
          ],
        };
      })
    );
  };

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      showNotice("Copied to clipboard");
    } catch {
      showNotice("Copy is unavailable in this browser");
    }
  };

  const handleAttachment = () => {
    showNotice("Attachment picker opened in the full app");
  };

  const handleReply = (message) => {
    setReplyingTo(message);
    composerRef.current?.focus();
  };

  const handleTyping = (event) => {
    setMessageText(event.target.value);
    setTyping(event.target.value.length > 0);
  };

  return (
    <div className="flex min-h-full min-w-0 flex-col bg-[#f7f9fc] text-slate-900">
      {/* Page header */}
      <div className="shrink-0 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1800px] items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() =>
                navigate(`/demo/project/${projectId}`)
              }
              className="hidden rounded-xl border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-50 hover:text-slate-800 sm:flex"
              title="Back to project"
            >
              <FiArrowLeft size={15} />
            </button>

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-white">
              <FiMessageCircle size={16} />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="truncate text-sm font-black text-slate-950">
                  DevSync Team Chat
                </span>

                <span className="hidden rounded-full bg-emerald-50 px-2 py-0.5 text-[8px] font-black text-emerald-700 sm:inline">
                  DEMO
                </span>
              </div>

              <p className="hidden text-[9px] font-semibold text-slate-400 sm:block">
                Real-time project collaboration
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setShowSearch((value) => !value)}
              className={`rounded-xl p-2.5 transition ${
                showSearch
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              }`}
              title="Search messages"
            >
              <FiSearch size={15} />
            </button>

            <button
              type="button"
              className="hidden rounded-xl p-2.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 sm:block"
              title="Notifications"
            >
              <FiBell size={15} />
            </button>

            <button
              type="button"
              onClick={() => setShowMembers((value) => !value)}
              className={`rounded-xl p-2.5 transition ${
                showMembers
                  ? "bg-slate-100 text-slate-700"
                  : "text-slate-400 hover:bg-slate-100"
              }`}
              title="Toggle members"
            >
              <FiUsers size={15} />
            </button>
          </div>
        </div>

        {showSearch && (
          <div className="border-t border-slate-100 px-4 py-3 sm:px-6">
            <div className="relative mx-auto max-w-[1800px]">
              <FiSearch
                size={14}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                autoFocus
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={`Search in #${currentChannel.name}...`}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-10 text-xs font-semibold outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-50"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  <FiX size={14} />
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Chat application shell */}
      <div className="mx-auto flex w-full max-w-[1800px] min-w-0 flex-1 overflow-hidden px-0 sm:px-4 sm:py-4 lg:px-6">
        <div className="flex min-h-[calc(100vh-130px)] w-full min-w-0 overflow-hidden border border-slate-200 bg-white shadow-sm sm:rounded-3xl">
          {/* Channels sidebar */}
          <aside
            className={`${
              showChannels ? "flex" : "hidden"
            } w-[230px] shrink-0 flex-col border-r border-slate-200 bg-[#fbfcfe]`}
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">
                  Workspace
                </p>

                <h2 className="mt-1 text-sm font-black text-slate-950">
                  DevSync
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setShowChannels(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <FiMenu size={14} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3">
              <div className="mb-2 flex items-center justify-between px-2">
                <span className="text-[9px] font-black uppercase tracking-[0.16em] text-slate-400">
                  Channels
                </span>

                <button
                  type="button"
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                >
                  <FiPlus size={13} />
                </button>
              </div>

              <div className="space-y-1">
                {CHANNELS.map((channel) => {
                  const active = activeChannel === channel.id;

                  return (
                    <button
                      type="button"
                      key={channel.id}
                      onClick={() => {
                        setActiveChannel(channel.id);
                        setSearch("");
                      }}
                      className={`group flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left transition ${
                        active
                          ? "bg-slate-950 text-white shadow-sm"
                          : "text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                      }`}
                    >
                      <ChannelIcon name={channel.id} />

                      <span className="min-w-0 flex-1 truncate text-xs font-bold">
                        {channel.name}
                      </span>

                      {channel.unread > 0 && !active && (
                        <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-600 px-1 text-[8px] font-black text-white">
                          {channel.unread}
                        </span>
                      )}

                      {active && (
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="my-5 h-px bg-slate-200" />

              <div className="mb-2 px-2">
                <span className="text-[9px] font-black uppercase tracking-[0.16em] text-slate-400">
                  Project
                </span>
              </div>

              <div className="space-y-1">
                <Link
                  to={`/demo/project/${projectId}/tasks`}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                >
                  <FiCheckCircle size={14} />
                  Tasks
                </Link>

                <Link
                  to={`/demo/project/${projectId}/team`}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                >
                  <FiUsers size={14} />
                  Team
                </Link>

                <Link
                  to={`/demo/project/${projectId}/activity`}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                >
                  <FiActivity size={14} />
                  Activity
                </Link>

                <Link
                  to={`/demo/project/${projectId}/files`}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                >
                  <FiFile size={14} />
                  Files
                </Link>
              </div>
            </div>

            <div className="border-t border-slate-100 p-3">
              <div className="rounded-2xl bg-slate-950 p-3 text-white">
                <div className="flex items-center gap-2">
                  <FiZap size={13} className="text-blue-300" />

                  <span className="text-[9px] font-black uppercase tracking-wider">
                    Demo workspace
                  </span>
                </div>

                <p className="mt-2 text-[9px] leading-4 text-slate-400">
                  Explore DevSync collaboration without signing in.
                </p>
              </div>
            </div>
          </aside>

          {/* Main chat */}
          <section className="flex min-w-0 flex-1 flex-col">
            {/* Channel header */}
            <header className="flex shrink-0 items-center justify-between border-b border-slate-200 px-4 py-3 sm:px-6">
              <div className="flex min-w-0 items-center gap-3">
                {!showChannels && (
                  <button
                    type="button"
                    onClick={() => setShowChannels(true)}
                    className="rounded-xl border border-slate-200 p-2 text-slate-500 hover:bg-slate-50"
                  >
                    <FiMenu size={14} />
                  </button>
                )}

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                  <FiHash size={16} />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="truncate text-sm font-black text-slate-950">
                      {currentChannel.name}
                    </h2>

                    <span className="hidden rounded-full bg-emerald-50 px-2 py-0.5 text-[8px] font-black text-emerald-700 sm:inline">
                      {onlineMembers.length} online
                    </span>
                  </div>

                  <p className="truncate text-[9px] font-semibold text-slate-400">
                    {currentChannel.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className="hidden rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 md:block"
                  title="Pinned messages"
                >
                  <FiBookmark size={15} />
                </button>

                <button
                  type="button"
                  className="hidden rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 md:block"
                  title="Channel settings"
                >
                  <FiMoreHorizontal size={15} />
                </button>
              </div>
            </header>

            <PinnedMessage />

            {/* Messages */}
            <div className="min-h-0 flex-1 overflow-y-auto">
              <div className="py-3">
                <div className="mb-3 flex items-center gap-3 px-4 sm:px-6">
                  <div className="h-px flex-1 bg-slate-100" />

                  <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[9px] font-black text-slate-400">
                    TODAY
                  </span>

                  <div className="h-px flex-1 bg-slate-100" />
                </div>

                {channelMessages.length > 0 ? (
                  channelMessages.map((message) => (
                    <Message
                      key={message.id}
                      message={message}
                      isOwn={message.author === "You"}
                      onReact={handleReact}
                      onCopy={handleCopy}
                      onReply={handleReply}
                    />
                  ))
                ) : (
                  <div className="flex min-h-64 flex-col items-center justify-center px-6 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                      <FiMessageCircle size={20} />
                    </div>

                    <h3 className="mt-4 text-sm font-black text-slate-800">
                      No messages found
                    </h3>

                    <p className="mt-1 max-w-xs text-xs leading-5 text-slate-400">
                      Start the conversation in #{currentChannel.name}.
                    </p>
                  </div>
                )}

                {typing && (
                  <div className="flex items-center gap-2 px-6 py-3 text-[9px] font-semibold text-slate-400">
                    <div className="flex gap-0.5">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.2s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.1s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" />
                    </div>
                    You are typing...
                  </div>
                )}
              </div>
            </div>

            {/* Composer */}
            <div className="shrink-0 border-t border-slate-200 bg-white p-3 sm:p-4">
              {replyingTo && (
                <div className="mb-2 flex items-center justify-between rounded-xl border border-blue-100 bg-blue-50 px-3 py-2">
                  <div className="flex min-w-0 items-center gap-2">
                    <FiMessageCircle
                      size={13}
                      className="shrink-0 text-blue-600"
                    />

                    <div className="min-w-0">
                      <p className="text-[9px] font-black text-blue-700">
                        Replying to {replyingTo.author}
                      </p>

                      <p className="truncate text-[9px] text-blue-600/70">
                        {replyingTo.text}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setReplyingTo(null)}
                    className="rounded-lg p-1 text-blue-500 hover:bg-blue-100"
                  >
                    <FiX size={13} />
                  </button>
                </div>
              )}

              <div className="rounded-2xl border border-slate-200 bg-slate-50 transition focus-within:border-blue-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-50">
                <textarea
                  ref={composerRef}
                  value={messageText}
                  onChange={handleTyping}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      handleSend();
                    }
                  }}
                  rows={2}
                  placeholder={`Message #${currentChannel.name}...`}
                  className="w-full resize-none bg-transparent px-4 py-3 text-xs font-medium text-slate-800 outline-none placeholder:text-slate-400"
                />

                <div className="flex items-center justify-between border-t border-slate-200/70 px-3 py-2">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={handleAttachment}
                      className="rounded-lg p-1.5 text-slate-400 transition hover:bg-white hover:text-slate-700"
                      title="Attach file"
                    >
                      <FiPaperclip size={14} />
                    </button>

                    <button
                      type="button"
                      className="rounded-lg p-1.5 text-slate-400 transition hover:bg-white hover:text-slate-700"
                      title="Add emoji"
                    >
                      <FiSmile size={14} />
                    </button>

                    <button
                      type="button"
                      className="hidden rounded-lg p-1.5 text-slate-400 transition hover:bg-white hover:text-slate-700 sm:block"
                      title="Mention someone"
                    >
                      <FiAtSign size={14} />
                    </button>

                    <button
                      type="button"
                      className="hidden rounded-lg p-1.5 text-slate-400 transition hover:bg-white hover:text-slate-700 sm:block"
                      title="Add link"
                    >
                      <FiLink size={14} />
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="hidden text-[9px] font-semibold text-slate-400 sm:inline">
                      Enter to send · Shift + Enter for newline
                    </span>

                    <button
                      type="button"
                      onClick={handleSend}
                      disabled={!messageText.trim()}
                      className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-950 text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-30"
                      title="Send message"
                    >
                      <FiSend size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Members sidebar */}
          {showMembers && (
            <aside className="hidden w-[250px] shrink-0 flex-col border-l border-slate-200 bg-[#fbfcfe] lg:flex">
              <div className="border-b border-slate-100 px-4 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">
                      People
                    </p>

                    <h2 className="mt-1 text-sm font-black text-slate-950">
                      Team members
                    </h2>
                  </div>

                  <span className="rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-black text-emerald-700">
                    {onlineMembers.length} online
                  </span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-3">
                <div className="mb-2 px-2">
                  <span className="text-[9px] font-black uppercase tracking-[0.16em] text-slate-400">
                    Members
                  </span>
                </div>

                <div className="space-y-1">
                  {MEMBERS.map((member) => (
                    <button
                      type="button"
                      key={member.id}
                      onClick={() => {
                        setMessageText(`@${member.name.split(" ")[0]} `);
                        composerRef.current?.focus();
                      }}
                      className="flex w-full items-center gap-3 rounded-xl px-2.5 py-2.5 text-left transition hover:bg-white hover:shadow-sm"
                    >
                      <Avatar
                        initials={member.initials}
                        online={member.status}
                        size="sm"
                      />

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[10px] font-black text-slate-800">
                          {member.name}
                        </p>

                        <p className="truncate text-[9px] font-medium text-slate-400">
                          {member.role}
                        </p>
                      </div>

                      <span
                        className={`h-1.5 w-1.5 shrink-0 rounded-full ${STATUS_DOT[member.status]}`}
                      />
                    </button>
                  ))}
                </div>

                <div className="my-5 h-px bg-slate-200" />

                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="flex items-center gap-2">
                    <FiGithub size={14} className="text-slate-700" />

                    <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                      Repository
                    </span>
                  </div>

                  <p className="mt-2 text-xs font-black text-slate-900">
                    shankar-uxcloud/devsync
                  </p>

                  <div className="mt-3 flex items-center gap-2">
                    <span className="rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-bold text-emerald-700">
                      main
                    </span>

                    <span className="text-[9px] font-semibold text-slate-400">
                      Active
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => showNotice("Repository preview opened")}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-[9px] font-bold text-slate-600 transition hover:bg-slate-50"
                  >
                    View repository
                    <FiArrowRight size={11} />
                  </button>
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>

      {/* Toast */}
      {notice && (
        <div className="fixed bottom-5 left-1/2 z-[120] -translate-x-1/2">
          <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-950 px-4 py-3 text-white shadow-2xl">
            <FiCheck size={14} className="text-emerald-400" />

            <span className="text-[10px] font-bold">{notice}</span>
          </div>
        </div>
      )}
    </div>
  );
}