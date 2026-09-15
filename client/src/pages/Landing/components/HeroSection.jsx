import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Terminal } from "lucide-react";
import HeroBackground from "./HeroBackground";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden pt-16">
      <HeroBackground />

      <div className="relative z-10 mx-auto max-w-4xl px-5 py-20 text-center lg:px-8">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border px-4 py-1.5"
          style={{
            background: "rgba(37, 99, 235, 0.05)",
            borderColor: "rgba(37, 99, 235, 0.15)",
          }}
        >
          <Terminal size={14} style={{ color: "var(--ds-primary)" }} />
          <span
            className="text-[13px] font-medium tracking-wide"
            style={{ color: "var(--ds-primary)" }}
          >
            Built for modern development teams
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[clamp(2.5rem,6vw,5.5rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-[#0F172A]"
        >
          Ship faster.
          <br />
          <span style={{ color: "var(--ds-primary)" }}>Build together.</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mx-auto mt-6 max-w-[640px] text-[clamp(1rem,1.8vw,1.175rem)] leading-[1.7] text-[#64748B]"
        >
          DevSync brings projects, tasks, GitHub activity, team communication,
          and AI-powered development workflows into one focused workspace.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 flex flex-col items-center justify-center gap-3.5 sm:flex-row"
        >
          <Link
            to="/register"
            className="group inline-flex items-center gap-2.5 rounded-xl px-7 py-3.5 text-[15px] font-semibold text-white no-underline transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: "var(--ds-primary)",
              boxShadow: "0 4px 16px rgba(37,99,235,0.3)",
            }}
          >
            Start Building
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
          <Link
            to="/demo"
            className="inline-flex items-center gap-2 rounded-xl border bg-white px-7 py-3.5 text-[15px] font-semibold text-[#0F172A] no-underline transition-all duration-300 hover:-translate-y-0.5 hover:border-[rgba(37,99,235,0.3)]"
            style={{
              borderColor: "rgba(15, 23, 42, 0.1)",
              boxShadow: "var(--ds-shadow-sm)",
            }}
          >
            Explore Dashboard
          </Link>
        </motion.div>

        {/* Trust Line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-8 text-[13px] tracking-wide text-[#94A3B8]"
        >
          No credit card required&ensp;·&ensp;Built for developers&ensp;·&ensp;Open collaboration
        </motion.p>
      </div>
    </section>
  );
}
