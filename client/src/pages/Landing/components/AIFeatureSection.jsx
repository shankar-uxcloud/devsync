import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles, User, Bot } from "lucide-react";

export default function AIFeatureSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      className="relative overflow-hidden py-24 lg:py-32"
      ref={ref}
      style={{
        background: "linear-gradient(180deg, #0B1220 0%, #0f1729 100%)",
      }}
    >
      {/* Background glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]"
        style={{ background: "rgba(124, 58, 237, 0.1)" }}
      />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5"
              style={{
                background: "rgba(124, 58, 237, 0.1)",
                borderColor: "rgba(124, 58, 237, 0.2)",
              }}
            >
              <Sparkles size={13} className="text-[#A78BFA]" />
              <span className="text-[12px] font-medium text-[#A78BFA]">
                AI-Powered
              </span>
            </div>

            <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-extrabold leading-tight tracking-[-0.02em] text-white">
              Your AI-powered
              <br />
              <span className="text-[#A78BFA]">development companion.</span>
            </h2>

            <p className="mt-5 max-w-md text-[15px] leading-[1.8] text-[rgba(255,255,255,0.45)]">
              Get instant sprint summaries, task suggestions, and intelligent
              insights — all within your workspace. DevSync AI understands your
              project context and helps you move faster.
            </p>

            <div className="mt-8 flex flex-col gap-3">
              {[
                "Summarize sprints and project status",
                "Generate and prioritize task suggestions",
                "Intelligent code review insights",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[rgba(124,58,237,0.15)]">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#A78BFA]" />
                  </div>
                  <span className="text-[13px] font-medium text-[rgba(255,255,255,0.55)]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — AI Chat Preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="rounded-2xl lg:rounded-3xl"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "0 24px 64px rgba(0,0,0,0.3)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-2.5 px-5 py-3.5"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#2563EB]">
                <Sparkles size={13} className="text-white" />
              </div>
              <span className="text-[13px] font-semibold text-white">
                DevSync AI
              </span>
              <div className="ml-auto flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-[#22C55E] landing-animate-pulse-glow" />
                <span className="text-[10px] text-[rgba(255,255,255,0.3)]">Online</span>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex flex-col gap-4 p-5">
              {/* User message */}
              <div className="flex items-start gap-2.5">
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#2563EB]">
                  <User size={13} className="text-white" />
                </div>
                <div
                  className="rounded-xl rounded-tl-sm px-4 py-2.5"
                  style={{
                    background: "rgba(37, 99, 235, 0.12)",
                    border: "1px solid rgba(37, 99, 235, 0.15)",
                  }}
                >
                  <p className="text-[13px] leading-[1.6] text-[rgba(255,255,255,0.8)]">
                    Summarize the current sprint.
                  </p>
                </div>
              </div>

              {/* AI response */}
              <div className="flex items-start gap-2.5">
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#7C3AED] to-[#2563EB]">
                  <Bot size={13} className="text-white" />
                </div>
                <div
                  className="rounded-xl rounded-tl-sm px-4 py-3"
                  style={{
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <p className="text-[13px] leading-[1.75] text-[rgba(255,255,255,0.65)]">
                    <span className="font-semibold text-[rgba(255,255,255,0.9)]">
                      Sprint 12
                    </span>{" "}
                    is{" "}
                    <span className="font-semibold text-[#34D399]">
                      82% complete
                    </span>
                    . 3 tasks remain in progress.
                    <br />
                    <br />
                    Authentication and GitHub integration are{" "}
                    <span className="text-[#60A5FA]">on track</span>.
                    The notification service may need additional attention —
                    it&apos;s{" "}
                    <span className="text-[#FBBF24]">2 days behind estimate</span>.
                  </p>
                </div>
              </div>
            </div>

            {/* Input bar */}
            <div
              className="mx-5 mb-5 flex items-center gap-2 rounded-xl px-4 py-2.5"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <span className="text-[12px] text-[rgba(255,255,255,0.2)]">
                Ask DevSync AI anything...
              </span>
              <span className="landing-animate-typing-cursor ml-0 text-[rgba(255,255,255,0.3)]">|</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
