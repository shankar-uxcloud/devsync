import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCode } from "react-icons/fa";

export default function LoadingPage({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const interval = 30;
    const totalSteps = duration / interval;
    const increment = 100 / totalSteps;

    const progressTimer = setInterval(() => {
      setProgress((current) => {
        const next = Math.min(current + increment, 100);

        if (next >= 100) {
          clearInterval(progressTimer);

          // Keep 100% visible before opening the next page
          setTimeout(() => {
            onComplete?.();
          }, 700);
        }

        return next;
      });
    }, interval);

    return () => clearInterval(progressTimer);
  }, [onComplete]);

  const percentage = Math.round(progress);
  const completed = percentage >= 100;

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6">
      {/* Main glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[120px]" />

      {/* Secondary glow */}
      <div className="pointer-events-none absolute left-[30%] top-[35%] h-[260px] w-[260px] rounded-full bg-indigo-600/10 blur-[100px]" />

      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex w-full max-w-md flex-col items-center text-center"
      >
        {/* Logo */}
        <motion.div
          animate={
            completed
              ? {
                  scale: [1, 1.08, 1],
                }
              : {
                  y: [0, -6, 0],
                  scale: [1, 1.03, 1],
                }
          }
          transition={{
            duration: completed ? 0.8 : 2,
            repeat: completed ? 0 : Infinity,
            ease: "easeInOut",
          }}
          className="relative mb-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-[0_15px_40px_rgba(37,99,235,0.3)]"
        >
          <div className="absolute inset-0 rounded-2xl bg-blue-500/20 blur-xl" />

          <FaCode
            size={26}
            className="relative z-10"
          />
        </motion.div>

        {/* Brand */}
        <h1 className="text-3xl font-black tracking-tight text-white">
          Dev<span className="text-blue-500">Sync</span>
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Preparing your developer workspace
        </p>

        {/* Progress */}
        <div className="mt-8 w-full max-w-xs">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-slate-500">
              {completed ? "Complete" : "Loading"}
            </span>

            <motion.span
              key={percentage}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              className={`text-sm font-bold tabular-nums ${
                completed
                  ? "text-emerald-400"
                  : "text-blue-400"
              }`}
            >
              {percentage}%
            </motion.span>
          </div>

          {/* Progress bar */}
          <div className="relative h-1.5 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className={`absolute inset-y-0 left-0 rounded-full ${
                completed
                  ? "bg-gradient-to-r from-emerald-400 to-green-500"
                  : "bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500"
              }`}
              animate={{
                width: `${percentage}%`,
              }}
              transition={{
                duration: 0.08,
                ease: "linear",
              }}
            />

            {!completed && (
              <motion.div
                className="absolute inset-y-0 w-16 rounded-full bg-white/30 blur-sm"
                animate={{
                  left: `${Math.max(percentage - 8, 0)}%`,
                }}
                transition={{
                  duration: 0.08,
                  ease: "linear",
                }}
              />
            )}
          </div>

          {/* Status */}
          <div className="mt-4 flex items-center justify-center gap-2">
            <motion.span
              animate={{
                opacity: completed
                  ? 1
                  : [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.2,
                repeat: completed ? 0 : Infinity,
              }}
              className={`h-1.5 w-1.5 rounded-full ${
                completed
                  ? "bg-emerald-400"
                  : "bg-blue-500"
              }`}
            />

            <motion.p
              key={completed ? "ready" : "loading"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`text-xs font-medium tracking-wide ${
                completed
                  ? "text-emerald-400"
                  : "text-slate-500"
              }`}
            >
              {completed
                ? "Workspace ready"
                : "Loading DevSync..."}
            </motion.p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-600">
          <span>Developer Workspace</span>
          <span className="text-slate-700">•</span>
          <span>DevSync</span>
        </div>
      </motion.div>
    </div>
  );
}