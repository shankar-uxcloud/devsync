import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaBars,
  FaHashtag,
  FaInfoCircle,
  FaSearch,
  FaUsers,
} from "react-icons/fa";

import ChannelList from "../../components/DemoChat/ChannelList";
import MessageList from "../../components/DemoChat/MessageList";
import MessageInput from "../../components/DemoChat/MessageInput";

function ProjectChat() {
  const { projectId } = useParams();

  const [activeChannel, setActiveChannel] = useState("general");
  const [newMessages, setNewMessages] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);

  const currentProject = projectId || "devsync";

  const channelNames = {
    general: "general",
    development: "development",
    frontend: "frontend",
    backend: "backend",
    design: "design",
  };

  const handleChannelSelect = (channel) => {
    setActiveChannel(channel.id);
    setNewMessages([]);
    setShowSidebar(false);
  };

  const handleSendMessage = (message) => {
    setNewMessages((current) => [...current, message]);
  };

  return (
    <div className="min-h-screen bg-black text-white">

      {/* =========================================================
          TOP HEADER
      ========================================================= */}

      <header className="sticky top-0 z-40 border-b border-slate-800 bg-black/95 backdrop-blur">

        <div className="flex h-20 items-center justify-between px-5 lg:px-8">

          {/* LEFT SIDE */}

          <div className="flex items-center gap-3">

            <Link
              to={`/demo/project/${currentProject}`}
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-700 bg-black text-slate-400 transition hover:border-blue-500 hover:bg-blue-500/10 hover:text-blue-400"
              title="Back to Project"
            >
              <FaArrowLeft />
            </Link>

            <div className="hidden text-sm text-slate-400 sm:block">
              DevSync
              <span className="mx-2 text-slate-600">/</span>
            </div>

            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-500/40 bg-blue-500/10 text-blue-400">
                <FaHashtag />
              </div>

              <div>
                <h1 className="text-xl font-black text-white">
                  Chat
                </h1>

                <p className="text-xs text-slate-500">
                  Project Communication
                </p>
              </div>

            </div>

          </div>

          {/* RIGHT SIDE */}

          <div className="flex items-center gap-3">

            <span className="hidden rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-2 text-xs font-bold text-blue-400 sm:block">
              DEMO MODE
            </span>

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 font-bold text-white">
              A
            </div>

          </div>

        </div>

      </header>


      {/* =========================================================
          CHAT APPLICATION
          NO OVERVIEW / TASKS / TEAM / FILES / ACTIVITY TABS HERE
      ========================================================= */}

      <main className="mx-auto max-w-[1800px] px-0 py-0 lg:px-8 lg:py-6">

        <div className="relative flex h-[calc(100vh-80px)] min-h-[600px] overflow-hidden bg-black lg:rounded-3xl lg:border lg:border-slate-800 lg:shadow-2xl">


          {/* =====================================================
              MOBILE SIDEBAR OVERLAY
          ===================================================== */}

          {showSidebar && (
            <button
              onClick={() => setShowSidebar(false)}
              className="absolute inset-0 z-30 bg-black/70 lg:hidden"
              aria-label="Close channel sidebar"
            />
          )}


          {/* =====================================================
              CHANNEL SIDEBAR
          ===================================================== */}

          <aside
            className={`absolute inset-y-0 left-0 z-40 w-[280px] border-r border-slate-800 bg-black transition-transform duration-300 lg:relative lg:z-0 lg:block lg:w-[280px] lg:translate-x-0 ${
              showSidebar
                ? "translate-x-0"
                : "-translate-x-full"
            }`}
          >

            <ChannelList
              activeChannel={activeChannel}
              onChannelSelect={handleChannelSelect}
            />

          </aside>


          {/* =====================================================
              MAIN CHAT
          ===================================================== */}

          <section className="flex min-w-0 flex-1 flex-col bg-black">


            {/* =================================================
                CHAT HEADER
            ================================================= */}

            <div className="flex h-[76px] items-center justify-between border-b border-slate-800 bg-black px-4 sm:px-6">

              {/* CHANNEL INFO */}

              <div className="flex min-w-0 items-center gap-3">

                {/* MOBILE MENU */}

                <button
                  onClick={() => setShowSidebar(true)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-slate-400 transition hover:bg-slate-800 hover:text-white lg:hidden"
                  title="Open channels"
                >
                  <FaBars />
                </button>


                {/* CHANNEL ICON */}

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                  <FaHashtag className="text-sm" />
                </div>


                {/* CHANNEL NAME */}

                <div className="min-w-0">

                  <div className="flex items-center gap-2">

                    <h2 className="truncate font-black text-white">
                      {channelNames[activeChannel]}
                    </h2>

                    <span className="hidden rounded-full border border-green-500/30 bg-green-500/10 px-2 py-0.5 text-[9px] font-bold text-green-400 sm:block">
                      ACTIVE
                    </span>

                  </div>

                  <p className="truncate text-[10px] text-slate-500">
                    Project team discussion
                  </p>

                </div>

              </div>


              {/* CHAT ACTIONS */}

              <div className="flex items-center gap-1">

                <button
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-900 hover:text-white"
                  title="Search messages"
                >
                  <FaSearch className="text-sm" />
                </button>

                <button
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-900 hover:text-white"
                  title="Channel information"
                >
                  <FaInfoCircle className="text-sm" />
                </button>

                <div className="ml-2 hidden items-center gap-2 rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 sm:flex">

                  <FaUsers className="text-xs text-slate-500" />

                  <span className="text-xs font-bold text-slate-400">
                    8
                  </span>

                </div>

              </div>

            </div>


            {/* =================================================
                MESSAGES
            ================================================= */}

            <div className="min-h-0 flex-1">

              <MessageList
                activeChannel={activeChannel}
                newMessages={newMessages}
              />

            </div>


            {/* =================================================
                MESSAGE INPUT
            ================================================= */}

            <MessageInput
              channelName={channelNames[activeChannel]}
              onSend={handleSendMessage}
            />

          </section>


          {/* =====================================================
              ONLINE MEMBERS
          ===================================================== */}

          <aside className="hidden w-[230px] shrink-0 border-l border-slate-800 bg-black xl:block">

            <OnlineMembers />

          </aside>

        </div>

      </main>

    </div>
  );
}


/* ===============================================================
   ONLINE MEMBERS
================================================================ */

function OnlineMembers() {

  const members = [
    {
      name: "Alex Morgan",
      initials: "A",
      status: "Online",
    },
    {
      name: "Priya Sharma",
      initials: "P",
      status: "Online",
    },
    {
      name: "Rahul Kumar",
      initials: "R",
      status: "Away",
    },
    {
      name: "Emma Wilson",
      initials: "E",
      status: "Online",
    },
    {
      name: "Daniel Lee",
      initials: "D",
      status: "Offline",
    },
    {
      name: "Sophia Patel",
      initials: "S",
      status: "Online",
    },
  ];


  return (
    <div className="h-full overflow-y-auto bg-black p-5">

      {/* MEMBERS HEADER */}

      <div className="flex items-center justify-between">

        <h3 className="text-[11px] font-black uppercase tracking-wider text-slate-500">
          Members
        </h3>

        <span className="rounded-full border border-green-500/30 bg-green-500/10 px-2 py-1 text-[9px] font-bold text-green-400">
          4 online
        </span>

      </div>


      {/* MEMBER LIST */}

      <div className="mt-5 space-y-4">

        {members.map((member) => (

          <div
            key={member.name}
            className="flex items-center gap-3"
          >

            {/* AVATAR */}

            <div className="relative">

              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-[10px] font-black text-white">
                {member.initials}
              </div>

              <span
                className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-black ${
                  member.status === "Online"
                    ? "bg-green-500"
                    : member.status === "Away"
                    ? "bg-yellow-400"
                    : "bg-slate-500"
                }`}
              />

            </div>


            {/* MEMBER INFO */}

            <div className="min-w-0">

              <p className="truncate text-xs font-bold text-slate-300">
                {member.name}
              </p>

              <p className="text-[9px] text-slate-600">
                {member.status}
              </p>

            </div>

          </div>

        ))}

      </div>


      {/* PROJECT ACTIVITY */}

      <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-950 p-4">

        <p className="text-xs font-black text-slate-300">
          Project Activity
        </p>

        <p className="mt-2 text-[10px] leading-5 text-slate-600">
          24 messages were exchanged by the team today.
        </p>

      </div>

    </div>
  );
}


export default ProjectChat;