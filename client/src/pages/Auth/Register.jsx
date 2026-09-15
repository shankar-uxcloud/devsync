import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  User,
  X,
  Zap,
} from "lucide-react";
import {
  FaGithub,
  FaGoogle,
  FaLinkedinIn,
} from "react-icons/fa";
import API from "../../api/axios";

const passwordRules = [
  {
    id: "length",
    label: "At least 8 characters",
    test: (value) => value.length >= 8,
  },
  {
    id: "uppercase",
    label: "One uppercase letter",
    test: (value) => /[A-Z]/.test(value),
  },
  {
    id: "lowercase",
    label: "One lowercase letter",
    test: (value) => /[a-z]/.test(value),
  },
  {
    id: "number",
    label: "One number",
    test: (value) => /\d/.test(value),
  },
];

const socialProviders = [
  {
    name: "Google",
    icon: FaGoogle,
  },
  {
    name: "GitHub",
    icon: FaGithub,
  },
  {
    name: "LinkedIn",
    icon: FaLinkedinIn,
  },
];

function getPasswordStrength(password) {
  if (!password) {
    return {
      score: 0,
      label: "Enter a password",
    };
  }

  let score = 0;

  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) {
    return {
      score,
      label: "Weak password",
    };
  }

  if (score <= 3) {
    return {
      score,
      label: "Good password",
    };
  }

  return {
    score,
    label: "Strong password",
  };
}

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const passwordStrength = useMemo(
    () => getPasswordStrength(formData.password),
    [formData.password]
  );

  const allPasswordRulesPassed = passwordRules.every((rule) =>
    rule.test(formData.password)
  );

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setServerError("");

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.name.trim()) {
      nextErrors.name = "Please enter your full name.";
    } else if (formData.name.trim().length < 2) {
      nextErrors.name =
        "Name must contain at least 2 characters.";
    }

    if (!formData.email.trim()) {
      nextErrors.email =
        "Please enter your email address.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email.trim()
      )
    ) {
      nextErrors.email =
        "Enter a valid email address.";
    }

    if (!formData.password) {
      nextErrors.password =
        "Please create a password.";
    } else if (!allPasswordRulesPassed) {
      nextErrors.password =
        "Your password does not meet all requirements.";
    }

    if (!acceptedTerms) {
      nextErrors.terms =
        "Please accept the DevSync terms to continue.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setServerError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      };

      console.log("DEVSync REGISTER REQUEST:", payload);

      const response = await API.post(
        "/auth/register",
        payload
      );

      console.log(
        "DEVSync REGISTER RESPONSE:",
        response.data
      );

      const data = response.data;

      if (!data?.token || !data?.user) {
        throw new Error(
          "Server returned an incomplete registration response."
        );
      }

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      setSuccess(true);

      setTimeout(() => {
        navigate("/dashboard", {
          replace: true,
        });
      }, 1500);
    } catch (error) {
      console.error(
        "DEVSync REGISTER ERROR:",
        error
      );

      /*
       * Axios response error
       */
      if (error.response) {
        const status = error.response.status;

        const backendMessage =
          error.response.data?.message;

        if (status === 400) {
          setServerError(
            backendMessage ||
              "Please check the information you entered."
          );
        } else if (status === 409) {
          setServerError(
            "An account with this email already exists. Please sign in instead."
          );
        } else if (status >= 500) {
          setServerError(
            "DevSync server error. Please make sure the backend is running."
          );
        } else {
          setServerError(
            backendMessage ||
              "Registration could not be completed."
          );
        }

        return;
      }

      /*
       * Backend not reachable
       */
      if (error.request) {
        setServerError(
          "Cannot connect to the DevSync server. Start the backend on port 5000 and try again."
        );

        return;
      }

      /*
       * Any other error
       */
      setServerError(
        error.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSocialClick = (provider) => {
    setServerError(
      `${provider} authentication is not connected yet. Email registration is currently active.`
    );
  };

  if (success) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-[#f5f8ff]">
        <AuthBackground />

        <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.92,
              y: 25,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            transition={{
              duration: 0.55,
            }}
            className="w-full max-w-md rounded-[32px] border border-white/80 bg-white/95 p-10 text-center shadow-[0_30px_100px_rgba(15,23,42,0.14)]"
          >
            <motion.div
              initial={{
                scale: 0,
                rotate: -15,
              }}
              animate={{
                scale: 1,
                rotate: 0,
              }}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 12,
              }}
              className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-violet-600 text-white shadow-[0_18px_45px_rgba(79,70,229,0.3)]"
            >
              <CheckCircle2 size={38} />
            </motion.div>

            <h2 className="mt-7 text-3xl font-black tracking-[-0.04em] text-[#0f172a]">
              Account created
            </h2>

            <p className="mt-3 text-[15px] leading-7 text-slate-500">
              Welcome to DevSync. Your developer workspace
              is ready.
            </p>

            <div className="mt-7 flex items-center justify-center gap-2 text-sm font-semibold text-blue-600">
              <span>
                Opening your workspace
              </span>

              <motion.span
                animate={{
                  x: [0, 5, 0],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
              >
                <ArrowRight size={16} />
              </motion.span>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f5f8ff] text-[#0f172a]">
      <AuthBackground />

      {/* ================= BRAND ================= */}

      <header className="absolute left-0 right-0 top-0 z-20">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-6 lg:px-10">
          <Link
            to="/"
            className="group flex items-center gap-3 no-underline"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 text-white shadow-[0_10px_30px_rgba(37,99,235,0.25)] transition-transform duration-300 group-hover:scale-105">
              <span className="font-black text-[14px]">
                {"</>"}
              </span>
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

      <main className="relative z-10 mx-auto grid min-h-screen max-w-[1440px] items-center gap-12 px-6 pb-12 pt-28 lg:grid-cols-[1fr_560px] lg:gap-20 lg:px-16 lg:pb-16 lg:pt-20">

        {/* LEFT */}

        <motion.section
          initial={{
            opacity: 0,
            x: -35,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.65,
          }}
          className="hidden lg:block"
        >
          <div className="max-w-[650px]">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-[12px] font-bold tracking-wide text-blue-600">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              DEVELOPER-FIRST COLLABORATION
            </div>

            <h1 className="text-[clamp(4rem,6vw,6.7rem)] font-black leading-[0.92] tracking-[-0.065em] text-[#0b1220]">
              Build together.
              <br />

              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Ship smarter.
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-[17px] leading-8 text-slate-500">
              DevSync brings projects, tasks, GitHub activity,
              team communication, and AI-powered development
              workflows into one focused workspace.
            </p>

            <div className="mt-9 grid max-w-[620px] grid-cols-2 gap-3">
              <Feature
                icon={<Zap size={16} />}
                title="Centralized projects"
              />

              <Feature
                icon={<Check size={16} />}
                title="GitHub workflows"
              />

              <Feature
                icon={<Check size={16} />}
                title="Team collaboration"
              />

              <Feature
                icon={<Zap size={16} />}
                title="AI-assisted development"
              />
            </div>

            <div className="mt-10 flex items-center gap-2 text-xs font-medium text-slate-400">
              <ShieldCheck size={15} />
              Your workspace is protected by secure authentication.
            </div>
          </div>
        </motion.section>

        {/* ================= REGISTER CARD ================= */}

        <motion.section
          initial={{
            opacity: 0,
            y: 35,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.65,
            delay: 0.08,
          }}
          className="w-full"
        >
          <div className="relative overflow-hidden rounded-[32px] border border-white/80 bg-white/95 p-7 shadow-[0_30px_100px_rgba(15,23,42,0.14)] backdrop-blur-xl sm:p-9">

            {/* Gradient line */}

            <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />

            <div className="mb-7">
              <p className="mb-3 flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-blue-600">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                Get started
              </p>

              <h2 className="text-[32px] font-black tracking-[-0.045em] text-[#0b1220]">
                Create your account
              </h2>

              <p className="mt-2 text-[14px] text-slate-500">
                Start building with your team on DevSync.
              </p>
            </div>

            {/* ================= SERVER ERROR ================= */}

            <AnimatePresence>
              {serverError && (
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
                  className="mb-5 overflow-hidden"
                >
                  <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] font-medium leading-5 text-red-600">
                    <X
                      size={17}
                      className="mt-0.5 flex-shrink-0"
                    />

                    <span>{serverError}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ================= SOCIAL ================= */}

            <div className="grid grid-cols-3 gap-2.5">
              {socialProviders.map((provider) => {
                const Icon = provider.icon;

                return (
                  <button
                    key={provider.name}
                    type="button"
                    onClick={() =>
                      handleSocialClick(
                        provider.name
                      )
                    }
                    className="flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-[13px] font-semibold text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                  >
                    <Icon size={16} />

                    <span className="hidden sm:inline">
                      {provider.name}
                    </span>
                  </button>
                );
              })}
            </div>

            <Divider label="OR CONTINUE WITH EMAIL" />

            {/* ================= FORM ================= */}

            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-4"
            >
              <Field
                label="Full name"
                name="name"
                type="text"
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                icon={<User size={17} />}
                autoComplete="name"
              />

              <Field
                label="Email address"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                icon={<Mail size={17} />}
                autoComplete="email"
              />

              {/* PASSWORD */}

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-[12px] font-bold text-slate-600"
                >
                  Password
                </label>

                <div
                  className={`group flex h-[54px] items-center rounded-2xl border bg-white px-4 transition-all ${
                    errors.password
                      ? "border-red-300 ring-4 ring-red-500/5"
                      : "border-slate-200 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10"
                  }`}
                >
                  <Lock
                    size={17}
                    className="mr-3 flex-shrink-0 text-slate-400 transition-colors group-focus-within:text-blue-500"
                  />

                  <input
                    id="password"
                    name="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    className="min-w-0 flex-1 bg-transparent text-[14px] font-medium text-slate-800 outline-none placeholder:text-slate-400"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (value) => !value
                      )
                    }
                    className="ml-2 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                  >
                    {showPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>
                </div>

                {/* PASSWORD STRENGTH */}

                {formData.password && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-[11px] font-semibold">
                      <span className="text-slate-400">
                        Password strength
                      </span>

                      <span
                        className={
                          passwordStrength.score >= 4
                            ? "text-emerald-600"
                            : passwordStrength.score >= 3
                              ? "text-blue-600"
                              : "text-red-500"
                        }
                      >
                        {passwordStrength.label}
                      </span>
                    </div>

                    <div className="mt-2 flex gap-1.5">
                      {[1, 2, 3, 4, 5].map(
                        (bar) => (
                          <div
                            key={bar}
                            className={`h-1 flex-1 rounded-full transition-all ${
                              bar <=
                              passwordStrength.score
                                ? passwordStrength.score >=
                                  4
                                  ? "bg-emerald-500"
                                  : passwordStrength.score >=
                                    3
                                    ? "bg-blue-500"
                                    : "bg-red-400"
                                : "bg-slate-100"
                            }`}
                          />
                        )
                      )}
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2">
                      {passwordRules.map(
                        (rule) => {
                          const passed =
                            rule.test(
                              formData.password
                            );

                          return (
                            <div
                              key={rule.id}
                              className={`flex items-center gap-2 text-[11px] ${
                                passed
                                  ? "text-emerald-600"
                                  : "text-slate-400"
                              }`}
                            >
                              {passed ? (
                                <CheckCircle2
                                  size={13}
                                />
                              ) : (
                                <X size={13} />
                              )}

                              {rule.label}
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                )}

                {errors.password && (
                  <p className="mt-2 text-[11px] font-medium text-red-500">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* TERMS */}

              <div className="pt-1">
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(event) => {
                      setAcceptedTerms(
                        event.target.checked
                      );

                      setErrors(
                        (previous) => ({
                          ...previous,
                          terms: "",
                        })
                      );
                    }}
                    className="mt-0.5 h-4 w-4 cursor-pointer accent-blue-600"
                  />

                  <span className="text-[11px] leading-5 text-slate-500">
                    I agree to the DevSync terms and
                    understand that my account is protected
                    by secure authentication.
                  </span>
                </label>

                {errors.terms && (
                  <p className="mt-2 text-[11px] font-medium text-red-500">
                    {errors.terms}
                  </p>
                )}
              </div>

              {/* SUBMIT */}

              <button
                type="submit"
                disabled={loading}
                className="group mt-2 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-[14px] font-bold text-white shadow-[0_15px_35px_rgba(79,70,229,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_45px_rgba(79,70,229,0.3)] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {loading ? (
                  <>
                    <Spinner />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account

                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </form>

            {/* LOGIN */}

            <p className="mt-7 text-center text-[13px] text-slate-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-blue-600 transition hover:text-violet-600"
              >
                Sign in
              </Link>
            </p>

            <div className="mt-6 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
              <ShieldCheck size={13} />
              Secure authentication
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}

function Field({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  error,
  icon,
  autoComplete,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-[12px] font-bold text-slate-600"
      >
        {label}
      </label>

      <div
        className={`group flex h-[54px] items-center rounded-2xl border bg-white px-4 transition-all ${
          error
            ? "border-red-300 ring-4 ring-red-500/5"
            : "border-slate-200 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10"
        }`}
      >
        <span className="mr-3 flex-shrink-0 text-slate-400 transition-colors group-focus-within:text-blue-500">
          {icon}
        </span>

        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          className="min-w-0 flex-1 bg-transparent text-[14px] font-medium text-slate-800 outline-none placeholder:text-slate-400"
        />
      </div>

      {error && (
        <p className="mt-2 text-[11px] font-medium text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

function Feature({ icon, title }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white/60 px-4 py-3 shadow-sm backdrop-blur">
      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        {icon}
      </div>

      <span className="text-[12px] font-semibold text-slate-600">
        {title}
      </span>
    </div>
  );
}

function Divider({ label }) {
  return (
    <div className="my-6 flex items-center gap-4">
      <div className="h-px flex-1 bg-slate-200" />

      <span className="text-[9px] font-black tracking-[0.16em] text-slate-400">
        {label}
      </span>

      <div className="h-px flex-1 bg-slate-200" />
    </div>
  );
}

function Spinner() {
  return (
    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
  );
}

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

export default Register;