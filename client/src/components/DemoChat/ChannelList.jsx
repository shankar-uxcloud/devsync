import { useState } from "react";
import {
  FaChevronDown,
  FaHashtag,
  FaPlus,
  FaSearch,
  FaUsers,
} from "react-icons/fa";

const channels = [
  {
    id: "general",
    name: "general",
    description: "General project discussion",
    unread: 0,
  },
  {
    id: "development",
    name: "development",
    description: "Development discussions",
    unread: 4,
  },
  {
    id: "frontend",
    name: "frontend",
    description: "Frontend development",
    unread: 2,
  },
  {
    id: "backend",
    name: "backend",
    description: "Backend and API discussions",
    unread: 0,
  },
  {
    id: "design",
    name: "design",
    description: "UI/UX and design",
    unread: 1,
  },
];

function ChannelList({ activeChannel, onChannelSelect }) {
  const [search, setSearch] = useState("");
  const [showChannels, setShowChannels] = useState(true);

  const filteredChannels = channels.filter((channel) =>
    channel.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <aside className="flex h-full w-full flex-col bg-slate-50">

      {/* PROJECT HEADER */}

      <div className="border-b border-slate-200 bg-white p-5">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
              <FaUsers />
            </div>

            <div>
              <h2 className="text-sm font-black text-slate-900">
                DevSync
              </h2>

              <p className="text-[10px] font-semibold text-slate-400">
                Development Workspace
              </p>
            </div>

          </div>

          <button
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            title="Workspace options"
          >
            <FaChevronDown className="text-xs" />
          </button>

        </div>

      </div>

      {/* SEARCH */}

      <div className="border-b border-slate-200 bg-white p-4">

        <div className="relative">

          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400" />

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search channels..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-xs outline-none transition focus:border-blue-500 focus:bg-white"
          />

        </div>

      </div>

      {/* CHANNELS */}

      <div className="flex-1 overflow-y-auto p-4">

        <div className="flex items-center justify-between">

          <button
            onClick={() => setShowChannels((current) => !current)}
            className="flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-slate-400"
          >
            <FaChevronDown
              className={`text-[9px] transition-transform ${
                !showChannels ? "-rotate-90" : ""
              }`}
            />

            Channels
          </button>

          <button
            className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white hover:text-blue-600"
            title="Create channel"
          >
            <FaPlus className="text-[10px]" />
          </button>

        </div>

        {showChannels && (
          <div className="mt-3 space-y-1">

            {filteredChannels.length > 0 ? (
              filteredChannels.map((channel) => {
                const isActive = activeChannel === channel.id;

                return (
                  <button
                    key={channel.id}
                    onClick={() => onChannelSelect(channel)}
                    className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md shadow-blue-100"
                        : "text-slate-600 hover:bg-white hover:text-slate-900"
                    }`}
                  >

                    <FaHashtag
                      className={`shrink-0 text-xs ${
                        isActive
                          ? "text-blue-100"
                          : "text-slate-400 group-hover:text-blue-500"
                      }`}
                    />

                    <span className="min-w-0 flex-1">

                      <span className="block truncate text-xs font-bold">
                        {channel.name}
                      </span>

                      <span
                        className={`mt-0.5 block truncate text-[9px] ${
                          isActive
                            ? "text-blue-100"
                            : "text-slate-400"
                        }`}
                      >
                        {channel.description}
                      </span>

                    </span>

                    {channel.unread > 0 && (
                      <span
                        className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[9px] font-black ${
                          isActive
                            ? "bg-white text-blue-600"
                            : "bg-blue-600 text-white"
                        }`}
                      >
                        {channel.unread}
                      </span>
                    )}

                  </button>
                );
              })
            ) : (
              <div className="rounded-xl border border-dashed border-slate-200 p-5 text-center">

                <p className="text-xs font-semibold text-slate-400">
                  No channels found
                </p>

              </div>
            )}

          </div>
        )}

        {/* DIRECT MESSAGES */}

        <div className="mt-8">

          <div className="flex items-center justify-between">

            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
              Direct Messages
            </span>

            <button
              className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-white hover:text-blue-600"
              title="New message"
            >
              <FaPlus className="text-[10px]" />
            </button>

          </div>

          <div className="mt-3 space-y-1">

            <DirectMessage
              initials="P"
              name="Priya Sharma"
              status="online"
              unread={2}
            />

            <DirectMessage
              initials="R"
              name="Rahul Kumar"
              status="away"
              unread={0}
            />

            <DirectMessage
              initials="E"
              name="Emma Wilson"
              status="online"
              unread={0}
            />

          </div>

        </div>

      </div>

      {/* USER */}

      <div className="border-t border-slate-200 bg-white p-4">

        <div className="flex items-center gap-3">

          <div className="relative">

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-xs font-black text-white">
              A
            </div>

            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500" />

          </div>

          <div className="min-w-0 flex-1">

            <p className="truncate text-xs font-black text-slate-800">
              Alex Morgan
            </p>

            <p className="text-[10px] text-green-500">
              Online
            </p>

          </div>

        </div>

      </div>

    </aside>
  );
}

/* DIRECT MESSAGE */

function DirectMessage({
  initials,
  name,
  status,
  unread,
}) {
  return (
    <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-white">

      <div className="relative">

        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-blue-500 text-[10px] font-black text-white">
          {initials}
        </div>

        <span
          className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-slate-50 ${
            status === "online"
              ? "bg-green-500"
              : "bg-yellow-400"
          }`}
        />

      </div>

      <span className="min-w-0 flex-1 truncate text-xs font-semibold text-slate-600">
        {name}
      </span>

      {unread > 0 && (
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1.5 text-[9px] font-black text-white">
          {unread}
        </span>
      )}

    </button>
  );
}

export default ChannelList;