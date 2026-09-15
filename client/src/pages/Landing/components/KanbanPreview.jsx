import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GitBranch, Sparkles, Bell, Calendar, AlertCircle } from "lucide-react";

/* ——— Board Data ——— */
const columns = [
  {
    title: "Backlog",
    color: "#94A3B8",
    cards: [
      {
        title: "Implement JWT authentication",
        priority: "high",
        icon: AlertCircle,
        due: "Sep 18",
        assignee: { letter: "A", bg: "#2563EB" },
      },
      {
        title: "Design dashboard analytics",
        priority: "medium",
        icon: null,
        due: "Sep 22",
        assignee: { letter: "P", bg: "#7C3AED" },
      },
    ],
  },
  {
    title: "Todo",
    color: "#F59E0B",
    cards: [
      {
        title: "GitBranch webhook integration",
        priority: "high",
        icon: GitBranch,
        due: "Sep 16",
        assignee: { letter: "R", bg: "#059669" },
      },
    ],
  },
  {
    title: "In Progress",
    color: "#2563EB",
    cards: [
      {
        title: "AI task suggestions",
        priority: "medium",
        icon: Sparkles,
        due: "Sep 15",
        assignee: { letter: "A", bg: "#2563EB" },
      },
      {
        title: "Real-time notifications",
        priority: "low",
        icon: Bell,
        due: "Sep 20",
        assignee: { letter: "P", bg: "#7C3AED" },
      },
    ],
  },
  {
    title: "Done",
    color: "#22C55E",
    cards: [
      {
        title: "User auth & onboarding",
        priority: "done",
        icon: null,
        due: "Sep 10",
        assignee: { letter: "R", bg: "#059669" },
      },
    ],
  },
];

const priorityColors = {
  high: "#EF4444",
  medium: "#F59E0B",
  low: "#3B82F6",
  done: "#22C55E",
};

export default function KanbanPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="relative overflow-hidden py-24 lg:py-32" id="how-it-works" ref={ref}>
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-extrabold leading-tight tracking-[-0.02em] text-[#0F172A]">
            Everything your team needs to ship.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-[#64748B]">
            Organize work across sprints with a beautiful Kanban board that keeps everyone aligned.
          </p>
        </motion.div>

        {/* Board */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="overflow-x-auto rounded-2xl landing-scrollbar-hide lg:rounded-3xl"
          style={{
            background: "#0f1419",
            border: "1px solid rgba(255,255,255,0.06)",
            boxShadow: "0 24px 64px rgba(0,0,0,0.18)",
          }}
        >
          {/* Board top bar */}
          <div
            className="flex items-center gap-2 px-5 py-3"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="h-2.5 w-2.5 rounded-full" style={{ background: "#FF5F56" }} />
            <div className="h-2.5 w-2.5 rounded-full" style={{ background: "#FFBD2E" }} />
            <div className="h-2.5 w-2.5 rounded-full" style={{ background: "#27C93F" }} />
            <span className="ml-2 text-[11px] font-medium text-[rgba(255,255,255,0.3)]">
              Task Board — Sprint 12
            </span>
          </div>

          <div className="flex gap-4 p-5 lg:p-6" style={{ minWidth: 820 }}>
            {columns.map((col, ci) => (
              <div key={col.title} className="flex-1 min-w-[190px]">
                {/* Column header */}
                <div className="mb-3 flex items-center gap-2">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ background: col.color }}
                  />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[rgba(255,255,255,0.4)]">
                    {col.title}
                  </span>
                  <span className="ml-auto text-[10px] font-medium text-[rgba(255,255,255,0.2)]">
                    {col.cards.length}
                  </span>
                </div>

                {/* Cards */}
                <div className="flex flex-col gap-2.5">
                  {col.cards.map((card, i) => (
                    <motion.div
                      key={card.title}
                      initial={{ opacity: 0, y: 12 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{
                        duration: 0.4,
                        delay: 0.3 + ci * 0.1 + i * 0.08,
                      }}
                      className="rounded-xl p-3 transition-all duration-200"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      {/* Priority dot + icon */}
                      <div className="mb-2 flex items-center gap-2">
                        <div
                          className="h-1.5 w-1.5 rounded-full"
                          style={{
                            background: priorityColors[card.priority],
                          }}
                        />
                        {card.icon && (
                          <card.icon
                            size={12}
                            className="text-[rgba(255,255,255,0.3)]"
                          />
                        )}
                      </div>

                      {/* Title */}
                      <p className="text-[12px] font-medium leading-[1.5] text-[rgba(255,255,255,0.75)]">
                        {card.title}
                      </p>

                      {/* Footer */}
                      <div className="mt-2.5 flex items-center justify-between">
                        <div className="flex items-center gap-1 text-[rgba(255,255,255,0.2)]">
                          <Calendar size={10} />
                          <span className="text-[10px]">{card.due}</span>
                        </div>
                        <div
                          className="flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-bold text-white"
                          style={{ background: card.assignee.bg }}
                        >
                          {card.assignee.letter}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
