import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FolderKanban,
  Columns3,
  Sparkles,
  MessageSquare,
  BarChart3,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

const features = [
  {
    num: "01",
    icon: FolderKanban,
    title: "Project Management",
    desc: "Plan projects, organize milestones, and keep your entire team aligned from ideation to deployment.",
  },
  {
    num: "02",
    icon: Columns3,
    title: "Kanban Workflows",
    desc: "Turn ideas into actionable tasks and track progress across sprints in real time.",
  },
  {
    num: "03",
    icon: FaGithub,
    title: "GitHub Integration",
    desc: "Connect repositories and keep engineering activity synchronized with project milestones.",
  },
  {
    num: "04",
    icon: Sparkles,
    title: "AI Development Assistant",
    desc: "Use AI to summarize work, generate task suggestions, and accelerate development velocity.",
  },
  {
    num: "05",
    icon: MessageSquare,
    title: "Real-time Collaboration",
    desc: "Communicate with your team without ever leaving the workspace.",
  },
  {
    num: "06",
    icon: BarChart3,
    title: "Analytics",
    desc: "Understand project health, velocity, and team progress at a glance.",
  },
];

export default function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      className="relative py-24 lg:py-32"
      id="features"
      ref={ref}
      style={{ background: "var(--ds-bg)" }}
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-extrabold leading-tight tracking-[-0.02em] text-[#0F172A]">
            One workspace.
            <br />
            <span style={{ color: "var(--ds-primary)" }}>
              Every part of development.
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[16px] leading-relaxed text-[#64748B]">
            Everything you need to plan, build, and ship — without switching between tools.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {features.map((feature, i) => (
            <motion.div
              key={feature.num}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className="landing-card-glow group relative overflow-hidden rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 lg:p-8"
              style={{
                background: "var(--ds-surface)",
                border: "1px solid rgba(15, 23, 42, 0.06)",
                boxShadow: "var(--ds-shadow-sm)",
              }}
            >
              {/* Hover glow */}
              <div
                className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "rgba(37, 99, 235, 0.08)" }}
              />

              {/* Number */}
              <span className="text-[12px] font-bold tracking-widest text-[#CBD5E1]">
                {feature.num}
              </span>

              {/* Icon */}
              <div
                className="mt-4 flex h-10 w-10 items-center justify-center rounded-xl"
                style={{
                  background: "rgba(37, 99, 235, 0.06)",
                  color: "var(--ds-primary)",
                }}
              >
                <feature.icon size={20} />
              </div>

              {/* Title */}
              <h3 className="mt-5 text-[17px] font-bold text-[#0F172A]">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="mt-2.5 text-[14px] leading-[1.7] text-[#64748B]">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
