import {
  FaCheck,
  FaCheckDouble,
  FaEllipsisH,
  FaReply,
} from "react-icons/fa";

const messages = {
  general: [
    {
      id: 1,
      name: "Alex Morgan",
      initials: "A",
      message: "Good morning team! 👋 Let's get started with today's sprint.",
      time: "9:12 AM",
      own: false,
    },
    {
      id: 2,
      name: "Priya Sharma",
      initials: "P",
      message: "Morning! I've finished the dashboard UI changes.",
      time: "9:14 AM",
      own: false,
    },
    {
      id: 3,
      name: "Alex Morgan",
      initials: "A",
      message: "Nice! I'll review them after the standup.",
      time: "9:16 AM",
      own: true,
    },
    {
      id: 4,
      name: "Rahul Kumar",
      initials: "R",
      message: "The authentication API is also ready for testing.",
      time: "9:18 AM",
      own: false,
    },
    {
      id: 5,
      name: "Alex Morgan",
      initials: "A",
      message: "Perfect. Let's get the frontend and backend connected today.",
      time: "9:20 AM",
      own: true,
    },
  ],

  development: [
    {
      id: 6,
      name: "Rahul Kumar",
      initials: "R",
      message: "I've pushed the latest API changes to the development branch.",
      time: "10:02 AM",
      own: false,
    },
    {
      id: 7,
      name: "Alex Morgan",
      initials: "A",
      message: "Great. I'll pull the branch and test the endpoints.",
      time: "10:05 AM",
      own: true,
    },
    {
      id: 8,
      name: "Rahul Kumar",
      initials: "R",
      message: "The JWT middleware is working correctly now.",
      time: "10:08 AM",
      own: false,
    },
  ],

  frontend: [
    {
      id: 9,
      name: "Priya Sharma",
      initials: "P",
      message: "The new responsive navigation is ready.",
      time: "11:21 AM",
      own: false,
    },
    {
      id: 10,
      name: "Emma Wilson",
      initials: "E",
      message: "Looks good! I adjusted the spacing on mobile.",
      time: "11:25 AM",
      own: false,
    },
    {
      id: 11,
      name: "Alex Morgan",
      initials: "A",
      message: "Awesome. Let's merge it after one final review.",
      time: "11:28 AM",
      own: true,
    },
  ],

  backend: [
    {
      id: 12,
      name: "Rahul Kumar",
      initials: "R",
      message: "MongoDB connection and project APIs are ready.",
      time: "12:10 PM",
      own: false,
    },
    {
      id: 13,
      name: "Alex Morgan",
      initials: "A",
      message: "Great. Please document the API endpoints as well.",
      time: "12:14 PM",
      own: true,
    },
  ],

  design: [
    {
      id: 14,
      name: "Emma Wilson",
      initials: "E",
      message: "I've uploaded the latest Figma designs.",
      time: "1:05 PM",
      own: false,
    },
    {
      id: 15,
      name: "Priya Sharma",
      initials: "P",
      message: "The new card design looks much cleaner.",
      time: "1:09 PM",
      own: false,
    },
  ],
};

function MessageList({ activeChannel, newMessages = [] }) {
  const channelMessages = [
    ...(messages[activeChannel] || messages.general),
    ...newMessages,
  ];

  return (
    <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-8">

      {/* DATE */}

      <div className="mb-8 flex items-center gap-4">

        <div className="h-px flex-1 bg-slate-200" />

        <span className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-[10px] font-bold text-slate-400">
          Today
        </span>

        <div className="h-px flex-1 bg-slate-200" />

      </div>

      {/* MESSAGES */}

      <div className="space-y-6">

        {channelMessages.map((message) => (
          <Message
            key={message.id}
            message={message}
          />
        ))}

      </div>

    </div>
  );
}

/* MESSAGE */

function Message({ message }) {
  return (
    <div
      className={`group flex gap-3 ${
        message.own ? "flex-row-reverse" : ""
      }`}
    >

      {/* AVATAR */}

      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-black text-white ${
          message.own
            ? "bg-gradient-to-br from-blue-500 to-indigo-600"
            : "bg-gradient-to-br from-slate-500 to-slate-700"
        }`}
      >
        {message.initials}
      </div>

      {/* CONTENT */}

      <div
        className={`flex max-w-[80%] flex-col ${
          message.own ? "items-end" : "items-start"
        }`}
      >

        {/* NAME + TIME */}

        <div
          className={`mb-1 flex items-center gap-2 ${
            message.own ? "flex-row-reverse" : ""
          }`}
        >

          <span className="text-xs font-black text-slate-800">
            {message.own ? "You" : message.name}
          </span>

          <span className="text-[10px] text-slate-400">
            {message.time}
          </span>

        </div>

        {/* BUBBLE */}

        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${
            message.own
              ? "rounded-tr-md bg-blue-600 text-white"
              : "rounded-tl-md border border-slate-200 bg-white text-slate-600"
          }`}
        >
          {message.message}
        </div>

        {/* ACTIONS */}

        <div
          className={`mt-1 flex items-center gap-3 opacity-0 transition group-hover:opacity-100 ${
            message.own ? "flex-row-reverse" : ""
          }`}
        >

          <button
            className="flex items-center gap-1 text-[10px] font-bold text-slate-400 hover:text-blue-600"
            title="Reply"
          >
            <FaReply />
            Reply
          </button>

          <button
            className="text-slate-400 hover:text-slate-700"
            title="More"
          >
            <FaEllipsisH className="text-[10px]" />
          </button>

        </div>

        {/* READ STATUS */}

        {message.own && (
          <div className="mt-1 flex items-center gap-1 text-[9px] font-semibold text-slate-400">
            <FaCheckDouble className="text-blue-500" />
            Read
          </div>
        )}

      </div>

    </div>
  );
}

export default MessageList;