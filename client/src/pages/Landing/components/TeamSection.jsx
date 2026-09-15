import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Bot } from "lucide-react";

const chatMessages = [
  {
    user: "Alex",
    avatar: "A",
    avatarBg: "#2563EB",
    role: "Developer",
    message: "Authentication module is ready. Pushed to main.",
    time: "10:32 AM",
  },
  {
    user: "Priya",
    avatar: "P",
    avatarBg: "#7C3AED",
    role: "Designer",
    message: "I'll review the PR and check the UI flow.",
    time: "10:34 AM",
  },
  {
    user: "DevSync AI",
    avatar: null,
    avatarBg: null,
    role: "Assistant",
    message: "PR #42 has been opened for review. 3 files changed, 128 additions.",
    time: "10:34 AM",
    isBot: true,
  },
];

const teamMembers = [
  { letter: "A", bg: "#2563EB", role: "Developer" },
  { letter: "P", bg: "#7C3AED", role: "Designer" },
  { letter: "R", bg: "#059669", role: "Developer" },
  { letter: "S", bg: "#EA580C", role: "PM" },
  { letter: "M", bg: "#0891B2", role: "Developer" },
];

export default function TeamSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="relative overflow-hidden py-24 lg:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left — Text + Avatars */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5"
              style={{
                background: "rgba(5, 150, 105, 0.06)",
                borderColor: "rgba(5, 150, 105, 0.15)",
              }}
            >
              <Users size={13} className="text-[#059669]" />
              <span className="text-[12px] font-medium text-[#059669]">
                Team Collaboration
              </span>
            </div>

            <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-extrabold leading-tight tracking-[-0.02em] text-[#0F172A]">
              Your entire team.
              <br />
              <span style={{ color: "var(--ds-primary)" }}>One conversation.</span>
            </h2>

            <p className="mt-5 max-w-md text-[15px] leading-[1.8] text-[#64748B]">
              Developers, designers, and project managers communicate in real-time
              without leaving the workspace. DevSync AI joins the conversation
              with automated updates.
            </p>

            {/* Team avatars */}
            <div className="mt-8">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-[#CBD5E1]">
                Team Members
              </p>
              <div className="flex items-center gap-1">
                {teamMembers.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.3 + i * 0.08 }}
                    className="flex h-10 w-10 items-center justify-center rounded-full text-[13px] font-bold text-white"
                    style={{
                      background: m.bg,
                      border: "2px solid var(--ds-bg)",
                      marginLeft: i > 0 ? "-6px" : 0,
                      zIndex: teamMembers.length - i,
                    }}
                    title={m.role}
                  >
                    {m.letter}
                  </motion.div>
                ))}
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full text-[11px] font-semibold text-[#64748B]"
                  style={{
                    background: "#F1F5F9",
                    border: "2px solid var(--ds-bg)",
                    marginLeft: "-6px",
                  }}
                >
                  +7
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — Chat preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div
              className="overflow-hidden rounded-2xl"
              style={{
                background: "#0f1419",
                border: "1px solid rgba(255,255,255,0.06)",
                boxShadow: "0 24px 64px rgba(0,0,0,0.18)",
              }}
            >
              {/* Chat header */}
              <div
                className="flex items-center gap-2.5 px-5 py-3.5"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-lg"
                  style={{ background: "rgba(5, 150, 105, 0.15)" }}
                >
                  <Users size={13} className="text-[#34D399]" />
                </div>
                <div>
                  <span className="text-[13px] font-semibold text-white">
                    # general
                  </span>
                  <p className="text-[10px] text-[rgba(255,255,255,0.25)]">
                    5 members online
                  </p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex flex-col gap-4 p-5">
                {chatMessages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.15 }}
                    className="flex items-start gap-2.5"
                  >
                    {msg.isBot ? (
                      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#7C3AED] to-[#2563EB]">
                        <Bot size={13} className="text-white" />
                      </div>
                    ) : (
                      <div
                        className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
                        style={{ background: msg.avatarBg }}
                      >
                        {msg.avatar}
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-[12px] font-semibold ${msg.isBot ? 'text-[#A78BFA]' : 'text-[rgba(255,255,255,0.85)]'}`}>
                          {msg.user}
                        </span>
                        {msg.isBot && (
                          <span className="rounded px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-[#A78BFA]"
                            style={{ background: "rgba(124, 58, 237, 0.15)" }}
                          >
                            Bot
                          </span>
                        )}
                        <span className="text-[10px] text-[rgba(255,255,255,0.2)]">
                          {msg.time}
                        </span>
                      </div>
                      <p className="mt-1 text-[12px] leading-[1.6] text-[rgba(255,255,255,0.5)]">
                        {msg.message}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Input */}
              <div
                className="mx-5 mb-5 rounded-xl px-4 py-2.5"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <span className="text-[12px] text-[rgba(255,255,255,0.2)]">
                  Message #general...
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
