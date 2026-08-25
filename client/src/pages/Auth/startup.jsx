import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCode, FaBolt, FaCheckCircle } from "react-icons/fa";

export default function Startup() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login", { replace: true });
    }, 2200);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#030303] text-white">

      {/* BACKGROUND GLOW */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/20 blur-[140px]" />

      {/* GRID */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">

        {/* LOGO */}
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-600 text-3xl shadow-2xl shadow-blue-600/40">
          <FaCode />
        </div>

        {/* BRAND */}
        <h1 className="mt-7 text-4xl font-black tracking-tight sm:text-5xl">
          Dev<span className="text-blue-500">Sync</span>
        </h1>

        <p className="mt-3 text-sm font-semibold text-slate-500">
          AI-powered project development & collaboration
        </p>

        {/* STATUS */}
        <div className="mt-10 flex items-center gap-3 rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2.5">
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400" />

          <span className="text-xs font-bold text-blue-400">
            Preparing your workspace
          </span>

          <FaBolt className="text-xs text-blue-400" />
        </div>

        {/* LOADING */}
        <div className="mt-8 w-64">
          <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
            <div className="h-full w-1/2 animate-[loading_2s_ease-in-out_infinite] rounded-full bg-blue-600" />
          </div>
        </div>

        {/* FEATURES */}
        <div className="mt-8 flex flex-wrap justify-center gap-5 text-[10px] font-semibold text-slate-600">

          <span className="flex items-center gap-1.5">
            <FaCheckCircle className="text-emerald-500" />
            Projects
          </span>

          <span className="flex items-center gap-1.5">
            <FaCheckCircle className="text-emerald-500" />
            Collaboration
          </span>

          <span className="flex items-center gap-1.5">
            <FaCheckCircle className="text-emerald-500" />
            AI Assistance
          </span>

        </div>

        <p className="mt-12 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-700">
          Build • Collaborate • Ship Better
        </p>

      </div>

      <style>
        {`
          @keyframes loading {
            0% {
              transform: translateX(-100%);
            }

            50% {
              transform: translateX(100%);
            }

            100% {
              transform: translateX(250%);
            }
          }
        `}
      </style>

    </div>
  );
}