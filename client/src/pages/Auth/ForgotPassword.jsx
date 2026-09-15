import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Code2,
  Mail,
  ShieldCheck,
  X,
} from "lucide-react";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");

    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)
    ) {
      setError("Please enter a valid email address.");
      return;
    }

    /*
     * Password recovery backend is not implemented yet.
     *
     * We intentionally DO NOT show a fake
     * "reset link sent" message here.
     *
     * The real flow will be connected once the
     * backend reset-password endpoint is added.
     */
    setError(
      "Password recovery is being prepared. Please use your DevSync password to sign in for now."
    );
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f5f8ff] text-[#0f172a]">

      {/* ================= BACKGROUND ================= */}

      <AuthBackground />

      {/* ================= HEADER ================= */}

      <header className="absolute left-0 right-0 top-0 z-20">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-6 lg:px-10">

          <Link
            to="/"
            className="group flex items-center gap-3 no-underline"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 text-white shadow-[0_10px_30px_rgba(37,99,235,0.25)] transition-transform duration-300 group-hover:scale-105">
              <Code2
                size={20}
                strokeWidth={2.5}
              />
            </div>

            <span className="text-[19px] font-black tracking-[-0.04em] text-[#0f172a]">
              Dev
              <span className="text-blue-600">
                Sync
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-semibold text-slate-500 shadow-sm backdrop-blur-md sm:flex">
            <ShieldCheck
              size={14}
              className="text-emerald-500"
            />

            Secure authentication
          </div>

        </div>
      </header>

      {/* ================= MAIN ================= */}

      <main className="relative z-10 flex min-h-screen items-center justify-center px-5 pb-10 pt-28">

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
            scale: 0.98,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
          className="w-full max-w-[520px]"
        >

          {/* BACK TO LOGIN */}

          <Link
            to="/login"
            className="mb-7 inline-flex items-center gap-2 text-[13px] font-bold text-slate-600 no-underline transition hover:text-blue-600"
          >
            <ArrowLeft size={15} />

            Back to login
          </Link>

          {/* CARD */}

          <div className="relative overflow-hidden rounded-[30px] border border-white/80 bg-white/95 p-7 shadow-[0_30px_100px_rgba(15,23,42,0.14)] backdrop-blur-xl sm:p-9">

            {/* GRADIENT TOP BORDER */}

            <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />

            <AnimatePresence mode="wait">

              {!submitted ? (
                <motion.div
                  key="form"
                  initial={{
                    opacity: 0,
                    y: 8,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -8,
                  }}
                >

                  {/* ICON */}

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                    <Mail size={23} />
                  </div>

                  {/* HEADING */}

                  <div className="mt-7">

                    <p className="mb-3 flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-blue-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                      Account recovery
                    </p>

                    <h1 className="text-[32px] font-black tracking-[-0.045em] text-[#0b1220]">
                      Forgot password?
                    </h1>

                    <p className="mt-3 text-[14px] leading-6 text-slate-500">
                      Enter the email address associated with
                      your DevSync account.
                    </p>

                  </div>

                  {/* ERROR */}

                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          height: 0,
                          y: -8,
                        }}
                        animate={{
                          opacity: 1,
                          height: "auto",
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          height: 0,
                        }}
                        className="mt-6 overflow-hidden"
                      >
                        <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3.5 text-[13px] font-medium leading-5 text-amber-700">

                          <X
                            size={17}
                            className="mt-0.5 flex-shrink-0"
                          />

                          <span>{error}</span>

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* FORM */}

                  <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="mt-7"
                  >

                    <label
                      htmlFor="recovery-email"
                      className="mb-2 block text-[12px] font-bold text-slate-600"
                    >
                      Email address
                    </label>

                    <div className="group flex h-[56px] items-center rounded-2xl border border-slate-200 bg-white px-4 transition-all focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10">

                      <Mail
                        size={17}
                        className="mr-3 flex-shrink-0 text-slate-400 transition-colors group-focus-within:text-blue-500"
                      />

                      <input
                        id="recovery-email"
                        type="email"
                        value={email}
                        onChange={(event) => {
                          setEmail(event.target.value);
                          setError("");
                        }}
                        placeholder="you@example.com"
                        autoComplete="email"
                        className="min-w-0 flex-1 bg-transparent text-[14px] font-medium text-slate-800 outline-none placeholder:text-slate-400"
                      />

                    </div>

                    {/* SUBMIT */}

                    <button
                      type="submit"
                      className="group mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-[14px] font-bold text-white shadow-[0_15px_35px_rgba(79,70,229,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_45px_rgba(79,70,229,0.3)]"
                    >
                      Continue

                      <ArrowRight
                        size={16}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </button>

                  </form>

                  {/* LOGIN */}

                  <div className="mt-7 text-center">

                    <span className="text-[13px] text-slate-500">
                      Remember your password?{" "}
                    </span>

                    <Link
                      to="/login"
                      className="text-[13px] font-bold text-blue-600 no-underline transition hover:text-violet-600"
                    >
                      Sign in
                    </Link>

                  </div>

                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{
                    opacity: 0,
                    scale: 0.96,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  className="py-6 text-center"
                >

                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                    <CheckCircle2 size={30} />
                  </div>

                  <h2 className="mt-6 text-2xl font-black text-slate-900">
                    Check your inbox
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    If a DevSync account exists for{" "}
                    <span className="font-semibold text-slate-700">
                      {email}
                    </span>
                    , you'll receive password recovery
                    instructions.
                  </p>

                  <Link
                    to="/login"
                    className="mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white no-underline transition hover:bg-blue-700"
                  >
                    Back to sign in
                    <ArrowRight size={15} />
                  </Link>

                </motion.div>
              )}

            </AnimatePresence>

            {/* SECURITY */}

            <div className="mt-7 flex items-center justify-center gap-2 border-t border-slate-100 pt-6 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
              <ShieldCheck size={13} />
              Secure authentication
            </div>

          </div>

        </motion.div>

      </main>
    </div>
  );
}

/* =========================================================
   BACKGROUND
========================================================= */

function AuthBackground() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(37,99,235,0.10),transparent_30%),radial-gradient(circle_at_85%_75%,rgba(124,58,237,0.10),transparent_30%)]" />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.42]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.12) 1px, transparent 1px)",
          backgroundSize: "58px 58px",
        }}
      />

      <div className="pointer-events-none absolute -left-32 top-1/3 h-[420px] w-[420px] rounded-full bg-blue-400/10 blur-[120px]" />

      <div className="pointer-events-none absolute -right-32 bottom-10 h-[420px] w-[420px] rounded-full bg-violet-400/10 blur-[120px]" />
    </>
  );
}

export default ForgotPassword;