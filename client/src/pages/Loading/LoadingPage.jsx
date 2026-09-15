import { motion } from "framer-motion";
import { FaCode } from "react-icons/fa";

export default function LoadingPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[120px]" />

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
        className="relative z-10 flex flex-col items-center text-center"
      >
        {/* Logo */}
        <motion.div
          animate={{
            y: [0, -6, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-[0_15px_40px_rgba(37,99,235,0.3)]"
        >
          <FaCode size={26} />
        </motion.div>

        {/* Brand */}
        <h1 className="text-3xl font-black tracking-tight text-white">
          Dev<span className="text-blue-500">Sync</span>
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Preparing your developer workspace
        </p>

        {/* Loader */}
        <div className="mt-8 w-64">
          <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="h-full w-1/2 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500"
            />
          </div>
        </div>

        {/* Status */}
        <motion.p
          animate={{ opacity: [0.45, 1, 0.45] }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
          }}
          className="mt-4 text-xs font-medium tracking-wide text-slate-500"
        >
          Loading DevSync...
        </motion.p>
      </motion.div>
    </div>
  );
}
