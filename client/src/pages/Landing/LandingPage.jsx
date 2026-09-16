import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  ArrowDown,
  ArrowRight,
  BarChart3,
  Bell,
  Bot,
  Check,
  ChevronDown,
  ChevronRight,
  CircleDot,
  Code2,
  Command,
  GitBranch,
  GitCommit,
  GitPullRequest,
  Layers3,
  Menu,
  MessageSquare,
  Play,
  Rocket,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Terminal,
  Users,
  X,
  Zap,
} from "lucide-react";
import {
  motion,
  useReducedMotion,
} from "framer-motion";

/* =========================================================
   DATA
========================================================= */

const NAV_ITEMS = [
  { label: "Product", id: "product" },
  { label: "Why DevSync", id: "why-devsync" },
  { label: "How it works", id: "how-it-works" },
  { label: "Features", id: "features" },
  { label: "GitHub", id: "github" },
  { label: "Pricing", id: "pricing" },
];

const AUDIENCE = [
  {
    icon: Code2,
    title: "Developers",
    text: "Keep your implementation work connected to the project goals, tasks and team context around it.",
  },
  {
    icon: Users,
    title: "Development Teams",
    text: "Give everyone one shared view of progress, ownership, activity and communication.",
  },
  {
    icon: Layers3,
    title: "Project Leads",
    text: "See what is moving, what is blocked and where the project needs attention.",
  },
  {
    icon: Sparkles,
    title: "AI-powered Builders",
    text: "Use project context to turn activity into summaries, insights and useful answers.",
  },
];

const FEATURES = [
  {
    number: "01",
    icon: GitBranch,
    title: "GitHub-connected development",
    text: "Connect development activity with project context instead of keeping code and planning in separate worlds.",
  },
  {
    number: "02",
    icon: Layers3,
    title: "Project command center",
    text: "Projects, milestones, progress and important decisions stay visible in one focused workspace.",
  },
  {
    number: "03",
    icon: Check,
    title: "Task intelligence",
    text: "Turn project goals into actionable work with ownership, status, priority and progress.",
  },
  {
    number: "04",
    icon: Users,
    title: "Team collaboration",
    text: "Keep developers, mentors, clients and collaborators aligned around the same project context.",
  },
  {
    number: "05",
    icon: Bot,
    title: "AI project assistant",
    text: "Ask about blockers, unresolved work, recent activity and project progress.",
  },
  {
    number: "06",
    icon: BarChart3,
    title: "Project analytics",
    text: "Turn development activity into useful signals about progress, workload and project health.",
  },
];

const STEPS = [
  {
    number: "1",
    icon: GitBranch,
    title: "Connect",
    text: "Connect the repositories and development activity that power your project.",
  },
  {
    number: "2",
    icon: Layers3,
    title: "Organize",
    text: "Turn project goals into milestones, tasks, ownership and measurable progress.",
  },
  {
    number: "3",
    icon: Users,
    title: "Collaborate",
    text: "Keep your team aligned through updates, communication and shared activity.",
  },
  {
    number: "4",
    icon: Rocket,
    title: "Ship",
    text: "See what is complete, what is blocked and what needs attention next.",
  },
];

const BENEFITS = [
  "Less context switching",
  "Clearer project ownership",
  "One source of project context",
  "Better development visibility",
  "Faster team communication",
  "AI-assisted project understanding",
];

const PRICING = [
  {
    name: "Free",
    label: "For individuals",
    price: "$0",
    period: "forever",
    description:
      "A focused starting point for developers exploring DevSync.",
    features: [
      "Personal workspace",
      "Project management",
      "Task tracking",
      "Basic development activity",
    ],
  },
  {
    name: "Pro",
    label: "For serious builders",
    price: "$12",
    period: "per month",
    description:
      "More visibility and intelligence for developers building continuously.",
    featured: true,
    features: [
      "Everything in Free",
      "Advanced analytics",
      "AI project assistant",
      "Enhanced GitHub workflows",
    ],
  },
  {
    name: "Team",
    label: "For development teams",
    price: "Custom",
    period: "for your team",
    description:
      "A collaborative workspace designed around the way your team ships.",
    features: [
      "Everything in Pro",
      "Team collaboration",
      "Workspace controls",
      "Priority support",
    ],
  },
];

/* =========================================================
   MOTION
========================================================= */

const ease = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease,
    },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

/* =========================================================
   HELPERS
========================================================= */

function scrollToSection(id) {
  const element = document.getElementById(id);

  if (!element) return;

  const headerOffset = 82;

  const position =
    element.getBoundingClientRect().top +
    window.scrollY -
    headerOffset;

  window.scrollTo({
    top: position,
    behavior: "smooth",
  });
}

/* =========================================================
   AMBIENT BACKGROUND
========================================================= */

function AmbientBackground({ reducedMotion }) {
  const particles = useMemo(
    () =>
      Array.from({ length: 30 }, (_, index) => ({
        id: index,
        left: `${(index * 31) % 100}%`,
        top: `${(index * 47) % 90}%`,
        delay: (index % 8) * 0.55,
        duration: 4 + (index % 5),
      })),
    []
  );

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Engineering grid */}
      <div
        className="absolute inset-0 opacity-[0.38]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,23,42,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.045) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
          maskImage:
            "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
        }}
      />

      {/* Main atmosphere */}
      <div
        className="absolute left-1/2 top-[-320px] h-[760px] w-[1000px] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.17) 0%, rgba(99,102,241,0.08) 38%, transparent 72%)",
        }}
      />

      <div
        className="absolute left-[-300px] top-[280px] h-[600px] w-[600px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(96,165,250,0.09) 0%, transparent 68%)",
        }}
      />

      <div
        className="absolute right-[-260px] top-[220px] h-[550px] w-[550px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(129,140,248,0.1) 0%, transparent 70%)",
        }}
      />

      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute h-1 w-1 rounded-full bg-slate-400/25"
          style={{
            left: particle.left,
            top: particle.top,
          }}
          animate={
            reducedMotion
              ? undefined
              : {
                  y: [0, -12, 0],
                  opacity: [0.1, 0.45, 0.1],
                }
          }
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* =========================================================
   NAVBAR
========================================================= */

function LandingNavbar({ reducedMotion }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 25);

      let current = "";

      NAV_ITEMS.forEach((item) => {
        const element = document.getElementById(item.id);

        if (!element) return;

        const rect = element.getBoundingClientRect();

        if (rect.top <= 130) {
          current = item.id;
        }
      });

      setActiveSection(current);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () =>
      window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen
      ? "hidden"
      : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () =>
      window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  const navigate = (id) => {
    setMobileOpen(false);
    scrollToSection(id);
  };

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-[100] transition-all duration-300 ${
          scrolled
            ? "border-b border-slate-200/70 bg-white/80 shadow-[0_10px_35px_rgba(15,23,42,0.06)] backdrop-blur-2xl"
            : "bg-white/70 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 sm:px-7 lg:px-10">
          {/* Logo */}
          <button
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="group flex items-center gap-3 border-0 bg-transparent p-0"
            aria-label="DevSync home"
          >
            <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-slate-950 shadow-[0_8px_25px_rgba(15,23,42,0.18)]">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-500" />

              <Code2
                size={19}
                strokeWidth={2.5}
                className="relative text-white"
              />
            </div>

            <span className="text-[19px] font-bold tracking-[-0.04em] text-slate-950">
              Dev<span className="text-blue-600">Sync</span>
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => {
              const active =
                activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id)}
                  className={`group relative rounded-xl border-0 bg-transparent px-3.5 py-2.5 text-[13px] font-medium transition-colors ${
                    active
                      ? "text-slate-950"
                      : "text-slate-500 hover:text-slate-950"
                  }`}
                >
                  {item.label}

                  <span
                    className={`absolute bottom-1 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-blue-600 transition-all duration-300 ${
                      active
                        ? "w-5 opacity-100"
                        : "w-0 opacity-0 group-hover:w-3 group-hover:opacity-70"
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="hidden items-center gap-2 lg:flex">
            <Link
              to="/login"
              className="rounded-xl px-4 py-2.5 text-[13px] font-semibold text-slate-600 no-underline transition-colors hover:text-slate-950"
            >
              Sign In
            </Link>

            <Link
              to="/register"
              className="group inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-[13px] font-bold text-white no-underline shadow-[0_7px_22px_rgba(15,23,42,0.15)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-[0_12px_30px_rgba(37,99,235,0.25)]"
            >
              Get Started
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          {/* Mobile */}
          <button
            onClick={() =>
              setMobileOpen((value) => !value)
            }
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-900 shadow-sm lg:hidden"
            aria-label={
              mobileOpen
                ? "Close navigation"
                : "Open navigation"
            }
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X size={19} />
            ) : (
              <Menu size={19} />
            )}
          </button>
        </div>
      </header>

      {mobileOpen && (
        <motion.div
          initial={
            reducedMotion
              ? false
              : { opacity: 0 }
          }
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[90] bg-white/95 backdrop-blur-2xl lg:hidden"
        >
          <div className="mx-auto flex h-full max-w-md flex-col px-6 pb-8 pt-24">
            <div className="space-y-1">
              {NAV_ITEMS.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={
                    reducedMotion
                      ? false
                      : {
                          opacity: 0,
                          x: -12,
                        }
                  }
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: reducedMotion
                      ? 0
                      : index * 0.04,
                  }}
                  onClick={() => navigate(item.id)}
                  className="flex w-full items-center justify-between rounded-2xl border-0 bg-transparent px-4 py-4 text-left text-lg font-semibold text-slate-900 hover:bg-slate-50"
                >
                  {item.label}
                  <ChevronRight
                    size={18}
                    className="text-slate-400"
                  />
                </motion.button>
              ))}
            </div>

            <div className="mt-auto border-t border-slate-200 pt-6">
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="mb-3 flex items-center justify-center rounded-2xl border border-slate-200 px-5 py-4 text-sm font-bold text-slate-700 no-underline"
              >
                Sign In
              </Link>

              <Link
                to="/register"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center rounded-2xl bg-slate-950 px-5 py-4 text-sm font-bold text-white no-underline"
              >
                Get Started
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}

/* =========================================================
   HERO WORKSPACE VISUAL
========================================================= */

function HeroWorkspace({ reducedMotion }) {
  const activity = [
    ["GitHub sync completed", "2m"],
    ["Sprint task completed", "8m"],
    ["New project update", "14m"],
    ["AI summary generated", "21m"],
  ];

  return (
    <motion.div
      initial={
        reducedMotion
          ? false
          : {
              opacity: 0,
              y: 45,
              scale: 0.97,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.12,
      }}
      transition={{
        duration: 0.9,
        ease,
      }}
      className="relative mx-auto mt-20 max-w-[1200px]"
    >
      <div className="absolute -inset-12 rounded-[60px] bg-blue-500/[0.055] blur-3xl" />

      <motion.div
        animate={
          reducedMotion
            ? undefined
            : {
                y: [0, -5, 0],
              }
        }
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_45px_110px_rgba(15,23,42,0.13),0_10px_35px_rgba(37,99,235,0.05)]"
      >
        {/* Browser */}
        <div className="flex h-12 items-center justify-between border-b border-slate-200 bg-slate-50/90 px-4 sm:px-5">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
            </div>

            <div className="hidden h-7 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 sm:flex">
              <Command
                size={11}
                className="text-slate-400"
              />
              <span className="text-[9px] text-slate-400">
                devsync.app / workspace
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden rounded-full bg-emerald-50 px-2.5 py-1 text-[8px] font-bold text-emerald-600 sm:inline-flex">
              SYSTEM HEALTHY
            </span>

            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-950 text-white">
              <Code2 size={13} />
            </div>
          </div>
        </div>

        <div className="grid min-h-[510px] md:grid-cols-[205px_1fr]">
          {/* Sidebar */}
          <aside className="hidden border-r border-slate-200 bg-slate-50/60 p-4 md:block">
            <div className="mb-7 flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
                <Code2 size={14} />
              </div>

              <div>
                <div className="text-[10px] font-bold text-slate-900">
                  DevSync
                </div>
                <div className="text-[7px] text-slate-400">
                  Developer workspace
                </div>
              </div>
            </div>

            <div className="space-y-1">
              {[
                ["Overview", BarChart3],
                ["Projects", Layers3],
                ["Tasks", Check],
                ["Team", Users],
                ["Activity", Activity],
                ["GitHub", GitBranch],
              ].map(([label, Icon], index) => (
                <div
                  key={label}
                  className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[9px] font-semibold ${
                    index === 0
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-500"
                  }`}
                >
                  <Icon size={13} />
                  {label}
                </div>
              ))}
            </div>

            <div className="mt-8 border-t border-slate-200 pt-5">
              <div className="mb-2 px-3 text-[7px] font-bold uppercase tracking-[0.15em] text-slate-400">
                Workspace
              </div>

              <div className="flex items-center gap-2.5 px-3 py-2 text-[9px] text-slate-500">
                <CircleDot size={12} />
                Settings
              </div>
            </div>
          </aside>

          {/* Main */}
          <div className="min-w-0 bg-white">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-7">
              <div>
                <div className="text-[8px] font-bold uppercase tracking-[0.15em] text-slate-400">
                  Workspace overview
                </div>

                <div className="mt-1 text-sm font-bold text-slate-950">
                  Development command center
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400">
                  <Search size={13} />
                </button>

                <button className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400">
                  <Bell size={13} />
                  <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-blue-500" />
                </button>
              </div>
            </div>

            <div className="space-y-5 p-5 sm:p-7">
              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                {[
                  ["Projects", "08", "+12%"],
                  ["Open tasks", "24", "-8%"],
                  ["Team activity", "92%", "Healthy"],
                  ["GitHub events", "148", "This week"],
                ].map(([label, value, change]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <div className="text-[8px] font-medium text-slate-400">
                      {label}
                    </div>

                    <div className="mt-2 flex items-end justify-between">
                      <span className="text-xl font-bold tracking-tight text-slate-950">
                        {value}
                      </span>

                      <span className="text-[8px] font-bold text-emerald-600">
                        {change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid gap-5 lg:grid-cols-[1.4fr_0.9fr]">
                {/* Project */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="mb-5 flex items-start justify-between">
                    <div>
                      <div className="text-[8px] font-bold uppercase tracking-[0.14em] text-slate-400">
                        Active project
                      </div>

                      <div className="mt-1 text-sm font-bold text-slate-950">
                        DevSync Platform
                      </div>
                    </div>

                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[7px] font-bold text-emerald-600">
                      ON TRACK
                    </span>
                  </div>

                  <div className="mb-5">
                    <div className="mb-2 flex justify-between">
                      <span className="text-[8px] text-slate-400">
                        Sprint progress
                      </span>

                      <span className="text-[8px] font-bold text-slate-700">
                        76%
                      </span>
                    </div>

                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "76%" }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1.1,
                          delay: 0.2,
                        }}
                        className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    {[
                      ["GitHub integration", "Complete", "green"],
                      ["Team workspace", "In progress", "blue"],
                      ["AI project summary", "Review", "amber"],
                      ["Analytics", "Planned", "gray"],
                    ].map(([task, status, color]) => (
                      <div
                        key={task}
                        className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/60 px-3 py-2.5"
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`h-2 w-2 rounded-full ${
                              color === "green"
                                ? "bg-emerald-500"
                                : color === "blue"
                                ? "bg-blue-500"
                                : color === "amber"
                                ? "bg-amber-500"
                                : "bg-slate-300"
                            }`}
                          />

                          <span className="text-[8px] font-medium text-slate-700">
                            {task}
                          </span>
                        </div>

                        <span className="text-[7px] font-semibold text-slate-400">
                          {status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Activity */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <div className="text-[8px] font-bold uppercase tracking-[0.14em] text-slate-400">
                        Live activity
                      </div>

                      <div className="mt-1 text-sm font-bold text-slate-950">
                        What's happening
                      </div>
                    </div>

                    <Activity
                      size={14}
                      className="text-blue-600"
                    />
                  </div>

                  <div className="space-y-4">
                    {activity.map(([label, time]) => (
                      <div
                        key={label}
                        className="flex gap-3"
                      >
                        <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500 ring-4 ring-blue-50" />

                        <div className="min-w-0">
                          <div className="text-[8px] font-semibold text-slate-700">
                            {label}
                          </div>

                          <div className="mt-1 text-[7px] text-slate-400">
                            {time} ago
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-xl border border-indigo-100 bg-indigo-50 p-3">
                    <div className="flex items-center gap-2 text-[8px] font-bold text-indigo-700">
                      <Sparkles size={10} />
                      AI insight
                    </div>

                    <p className="mt-2 text-[8px] leading-4 text-indigo-600/80">
                      Your current sprint is on track. Two tasks may need
                      attention before the next milestone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* =========================================================
   SECTION HEADING
========================================================= */

function SectionHeading({
  eyebrow,
  title,
  description,
  center = false,
}) {
  return (
    <div
      className={`max-w-3xl ${
        center ? "mx-auto text-center" : ""
      }`}
    >
      <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />

        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">
          {eyebrow}
        </span>
      </div>

      <h2 className="text-4xl font-bold leading-[1.05] tracking-[-0.055em] text-slate-950 sm:text-5xl lg:text-[56px]">
        {title}
      </h2>

      <p className="mt-5 text-[15px] leading-7 text-slate-500 sm:text-base">
        {description}
      </p>
    </div>
  );
}

/* =========================================================
   WHAT IS DEVSYNC
========================================================= */

function WhatIsDevSync({ reducedMotion }) {
  return (
    <section
      id="product"
      className="relative overflow-hidden border-t border-slate-200/70 bg-white py-28 lg:py-36"
    >
      <div className="absolute right-[-180px] top-20 h-[500px] w-[500px] rounded-full bg-blue-100/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
        <div className="grid items-center gap-16 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
          >
            <SectionHeading
              eyebrow="What is DevSync?"
              title="The workspace around your code."
              description="DevSync is designed to connect the work around software development: projects, tasks, people, communication, GitHub activity and project intelligence."
            />

            <div className="mt-9 flex flex-wrap gap-2">
              {[
                "Build",
                "Collaborate",
                "Track",
                "Connect",
                "Ship",
              ].map((word) => (
                <span
                  key={word}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-bold text-slate-600"
                >
                  {word}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={
              reducedMotion
                ? false
                : {
                    opacity: 0,
                    x: 35,
                  }
            }
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.75,
              ease,
            }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-slate-950 p-6 shadow-[0_35px_90px_rgba(15,23,42,0.14)] sm:p-8">
              <div className="absolute right-[-100px] top-[-100px] h-[300px] w-[300px] rounded-full bg-blue-600/10 blur-3xl" />

              <div className="relative">
                <div className="mb-7 flex items-center justify-between">
                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-600">
                      Project context
                    </div>

                    <div className="mt-1 text-lg font-bold text-white">
                      Everything connected.
                    </div>
                  </div>

                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5">
                    <Layers3
                      size={16}
                      className="text-blue-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    [GitBranch, "Code", "GitHub activity"],
                    [Check, "Tasks", "Execution"],
                    [Users, "Team", "Collaboration"],
                    [Bot, "AI", "Intelligence"],
                    [BarChart3, "Analytics", "Progress"],
                    [MessageSquare, "Chat", "Communication"],
                  ].map(
                    ([Icon, title, subtitle]) => (
                      <div
                        key={title}
                        className="rounded-2xl border border-white/[0.07] bg-white/[0.035] p-4 transition-colors hover:bg-white/[0.06]"
                      >
                        <Icon
                          size={15}
                          className="text-slate-400"
                        />

                        <div className="mt-4 text-xs font-bold text-white">
                          {title}
                        </div>

                        <div className="mt-1 text-[8px] text-slate-600">
                          {subtitle}
                        </div>
                      </div>
                    )
                  )}
                </div>

                <div className="mt-4 rounded-2xl border border-blue-500/10 bg-blue-500/[0.05] p-4">
                  <div className="flex items-center gap-2 text-[9px] font-bold text-blue-400">
                    <Sparkles size={11} />
                    One project context
                  </div>

                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/5">
                    <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-blue-500 to-indigo-500" />
                  </div>

                  <div className="mt-2 flex justify-between text-[7px] text-slate-600">
                    <span>Development progress</span>
                    <span>78%</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   WHY DEVSYNC
========================================================= */

function WhyDevSync({ reducedMotion }) {
  return (
    <section
      id="why-devsync"
      className="relative overflow-hidden border-t border-slate-200/70 bg-slate-50/60 py-28 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
        >
          <SectionHeading
            center
            eyebrow="Why DevSync?"
            title="The problem isn't a lack of tools."
            description="Modern development already produces a huge amount of information. The challenge is keeping the important context connected."
          />
        </motion.div>

        <div className="mt-20 grid gap-4 lg:grid-cols-3">
          {/* Problem */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.15,
            }}
            className="rounded-[26px] border border-slate-200 bg-white p-7 shadow-sm"
          >
            <div className="mb-8 flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-rose-500">
              <Zap size={18} />
            </div>

            <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">
              Without connected context
            </div>

            <h3 className="mt-3 text-xl font-bold tracking-tight text-slate-950">
              Work gets fragmented.
            </h3>

            <div className="mt-6 space-y-3">
              {[
                "Code lives in one place.",
                "Tasks live somewhere else.",
                "Updates get lost in messages.",
                "Progress becomes difficult to understand.",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-slate-500"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          {/* DevSync */}
          <motion.div
            initial={
              reducedMotion
                ? false
                : {
                    opacity: 0,
                    y: 30,
                  }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            transition={{
              duration: 0.7,
            }}
            className="relative overflow-hidden rounded-[26px] border border-blue-200 bg-slate-950 p-7 text-white shadow-[0_25px_70px_rgba(37,99,235,0.12)]"
          >
            <div className="absolute right-[-100px] top-[-100px] h-[300px] w-[300px] rounded-full bg-blue-600/15 blur-3xl" />

            <div className="relative">
              <div className="mb-8 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                <Code2 size={18} />
              </div>

              <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-blue-400">
                With DevSync
              </div>

              <h3 className="mt-3 text-xl font-bold tracking-tight">
                Context becomes connected.
              </h3>

              <div className="mt-6 space-y-3">
                {[
                  "Development activity",
                  "Project execution",
                  "Team collaboration",
                  "AI-powered understanding",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2.5 text-sm text-slate-300"
                  >
                    <Check
                      size={14}
                      className="text-blue-400"
                    />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Benefit */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.15,
            }}
            className="rounded-[26px] border border-slate-200 bg-white p-7 shadow-sm"
          >
            <div className="mb-8 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Rocket size={18} />
            </div>

            <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">
              The result
            </div>

            <h3 className="mt-3 text-xl font-bold tracking-tight text-slate-950">
              Teams move with clarity.
            </h3>

            <div className="mt-6 space-y-3">
              {[
                "Know what is happening.",
                "Know who owns it.",
                "Know what is blocked.",
                "Know what to do next.",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-slate-500"
                >
                  <Check
                    size={14}
                    className="mt-0.5 shrink-0 text-emerald-500"
                  />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   HOW IT WORKS
========================================================= */

function HowItWorks({ reducedMotion }) {
  return (
    <section
      id="how-it-works"
      className="relative border-t border-slate-200/70 bg-white py-28 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
        >
          <SectionHeading
            eyebrow="How it works"
            title="A simpler path from idea to production."
            description="DevSync turns the development lifecycle into one connected flow."
          />
        </motion.div>

        <div className="relative mt-20">
          <div className="absolute left-[12%] right-[12%] top-8 hidden h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent lg:block" />

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.15,
            }}
            className="grid gap-10 md:grid-cols-2 lg:grid-cols-4"
          >
            {STEPS.map((step) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.number}
                  variants={fadeUp}
                  className="group relative"
                >
                  <div className="relative z-10 mb-7 flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-blue-200 group-hover:shadow-[0_16px_40px_rgba(37,99,235,0.12)]">
                    <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-slate-950 text-[9px] font-bold text-white">
                      {step.number}
                    </span>

                    <Icon
                      size={20}
                      strokeWidth={1.8}
                      className="text-slate-600 transition-colors group-hover:text-blue-600"
                    />
                  </div>

                  <h3 className="text-lg font-bold tracking-tight text-slate-950">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {step.text}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Flow visual */}
        <motion.div
          initial={
            reducedMotion
              ? false
              : {
                  opacity: 0,
                  y: 20,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.7,
          }}
          className="mt-20 rounded-[26px] border border-slate-200 bg-slate-50 p-5 sm:p-7"
        >
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            {[
              ["GitHub", GitBranch],
              ["DevSync", Code2],
              ["Project", Layers3],
              ["Team", Users],
              ["Ship", Rocket],
            ].map(([label, Icon], index) => (
              <div
                key={label}
                className="flex w-full items-center justify-center gap-3 md:w-auto"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm">
                  <Icon size={17} />
                </div>

                <span className="text-xs font-bold text-slate-700">
                  {label}
                </span>

                {index < 4 && (
                  <ArrowRight
                    size={15}
                    className="hidden text-slate-300 md:block"
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* =========================================================
   DIFFERENCE FROM GITHUB
========================================================= */

function GitHubDifference({ reducedMotion }) {
  return (
    <section
      id="github"
      className="relative overflow-hidden bg-slate-950 py-28 text-white lg:py-36"
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
        }}
      />

      <div className="absolute left-[-200px] top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-blue-600/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
          className="max-w-3xl"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">
            <GitBranch
              size={12}
              className="text-blue-400"
            />

            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">
              GitHub + DevSync
            </span>
          </div>

          <h2 className="text-4xl font-bold leading-[1.03] tracking-[-0.055em] sm:text-5xl lg:text-[58px]">
            Not a replacement for GitHub.
            <span className="block text-blue-400">
              A workspace around it.
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-[15px] leading-7 text-slate-400">
            GitHub is fundamental to modern software development. DevSync is
            designed to add a project-centric layer around that development
            activity — connecting code, execution, people and project context.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.12,
          }}
          className="mt-16 grid gap-4 lg:grid-cols-3"
        >
          {/* GitHub */}
          <motion.div
            variants={fadeUp}
            className="rounded-[26px] border border-white/10 bg-white/[0.035] p-7"
          >
            <div className="mb-8 flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.06]">
              <GitBranch size={18} className="text-slate-300" />
            </div>

            <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-600">
              Development layer
            </div>

            <h3 className="mt-3 text-xl font-bold">
              GitHub
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Your repositories, commits, branches, pull requests, code
              collaboration and development history.
            </p>

            <div className="mt-7 space-y-3">
              {[
                "Repositories",
                "Commits",
                "Branches",
                "Pull requests",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-xs text-slate-500"
                >
                  <Check
                    size={12}
                    className="text-slate-600"
                  />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          {/* DevSync */}
          <motion.div
            initial={
              reducedMotion
                ? false
                : {
                    opacity: 0,
                    y: 25,
                  }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.12,
            }}
            transition={{
              duration: 0.7,
            }}
            className="relative overflow-hidden rounded-[26px] border border-blue-500/20 bg-blue-500/[0.07] p-7 shadow-[0_25px_80px_rgba(37,99,235,0.1)]"
          >
            <div className="absolute right-[-80px] top-[-80px] h-[220px] w-[220px] rounded-full bg-blue-600/15 blur-3xl" />

            <div className="relative">
              <div className="mb-8 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                <Code2 size={18} />
              </div>

              <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-blue-400">
                Project intelligence layer
              </div>

              <h3 className="mt-3 text-xl font-bold">
                DevSync
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-300">
                The project workspace connecting development activity with
                execution, collaboration and context.
              </p>

              <div className="mt-7 space-y-3">
                {[
                  "Project context",
                  "Tasks & milestones",
                  "Team activity",
                  "AI insights",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-xs text-slate-300"
                  >
                    <Check
                      size={12}
                      className="text-blue-400"
                    />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Together */}
          <motion.div
            variants={fadeUp}
            className="rounded-[26px] border border-white/10 bg-white/[0.035] p-7"
          >
            <div className="mb-8 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10">
              <Rocket
                size={18}
                className="text-emerald-400"
              />
            </div>

            <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-600">
              Connected result
            </div>

            <h3 className="mt-3 text-xl font-bold">
              Build with context
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Connect the code activity with the project work that gives it
              meaning.
            </p>

            <div className="mt-7 space-y-3">
              {[
                "Understand progress",
                "Find blockers",
                "Align the team",
                "Ship with visibility",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-xs text-slate-400"
                >
                  <Check
                    size={12}
                    className="text-emerald-400"
                  />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <div className="mt-10 flex items-center justify-center gap-3 text-[10px] font-semibold text-slate-600">
          <GitBranch size={12} />
          GitHub
          <ArrowRight size={12} />
          DevSync
          <ArrowRight size={12} />
          Project progress
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   BENEFITS
========================================================= */

function Benefits({ reducedMotion }) {
  return (
    <section className="border-t border-slate-200/70 bg-white py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
        <div className="grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
          >
            <SectionHeading
              eyebrow="Why it matters"
              title="More context. Less friction."
              description="The goal is simple: reduce the invisible cost of switching between tools and give your team a clearer picture of the work."
            />

            <Link
              to="/demo"
              className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-xs font-bold text-white no-underline transition-all hover:bg-blue-600"
            >
              See the workspace
              <ArrowRight
                size={13}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.15,
            }}
            className="grid gap-3 sm:grid-cols-2"
          >
            {BENEFITS.map((benefit, index) => (
              <motion.div
                key={benefit}
                variants={fadeUp}
                className="group rounded-2xl border border-slate-200 bg-slate-50/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-[0_15px_35px_rgba(15,23,42,0.06)]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
                    <Check size={15} />
                  </div>

                  <span className="text-[8px] font-bold text-slate-300">
                    0{index + 1}
                  </span>
                </div>

                <div className="mt-6 text-sm font-bold text-slate-800">
                  {benefit}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   FEATURES
========================================================= */

function Features({ reducedMotion }) {
  return (
    <section
      id="features"
      className="relative overflow-hidden border-t border-slate-200/70 bg-slate-50/60 py-28 lg:py-36"
    >
      <div className="absolute right-[-180px] top-[-100px] h-[500px] w-[500px] rounded-full bg-indigo-100/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
        >
          <SectionHeading
            eyebrow="Capabilities"
            title="Everything around the code."
            description="A focused set of tools for turning development activity into coordinated project progress."
          />
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.1,
          }}
          className="mt-20 grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.article
                key={feature.title}
                variants={fadeUp}
                whileHover={
                  reducedMotion
                    ? undefined
                    : {
                        y: -5,
                      }
                }
                className="group relative overflow-hidden rounded-[24px] border border-slate-200 bg-white p-7 shadow-[0_8px_30px_rgba(15,23,42,0.035)] transition-shadow duration-300 hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 transition-all group-hover:border-blue-200 group-hover:bg-blue-50 group-hover:text-blue-600">
                    <Icon size={19} strokeWidth={1.8} />
                  </div>

                  <span className="text-[9px] font-bold text-slate-300">
                    {feature.number}
                  </span>
                </div>

                <h3 className="mt-12 text-lg font-bold tracking-tight text-slate-950">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {feature.text}
                </p>

                <div className="mt-7 flex items-center gap-1 text-[10px] font-bold text-slate-400 transition-colors group-hover:text-blue-600">
                  Explore capability
                  <ArrowRight
                    size={12}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </div>

                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-blue-600 to-indigo-500 transition-all duration-500 group-hover:w-full" />
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* =========================================================
   AI SECTION
========================================================= */

function AISection({ reducedMotion }) {
  return (
    <section className="relative overflow-hidden border-t border-slate-200/70 bg-white py-28 lg:py-36">
      <div className="absolute left-1/2 top-0 h-[450px] w-[700px] -translate-x-1/2 rounded-full bg-indigo-100/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_1fr]">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5">
              <Sparkles
                size={12}
                className="text-indigo-600"
              />

              <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-indigo-600">
                AI project intelligence
              </span>
            </div>

            <h2 className="max-w-xl text-4xl font-bold leading-[1.04] tracking-[-0.055em] text-slate-950 sm:text-5xl lg:text-[56px]">
              Ask your project
              <span className="block text-indigo-600">
                instead of searching it.
              </span>
            </h2>

            <p className="mt-6 max-w-lg text-[15px] leading-7 text-slate-500">
              DevSync can turn project activity into a more understandable
              view of what is happening, what needs attention and what comes
              next.
            </p>

            <div className="mt-8 space-y-3">
              {[
                "Summarize this project",
                "What's blocking this sprint?",
                "Show unresolved tasks",
                "Summarize recent activity",
              ].map((query) => (
                <div
                  key={query}
                  className="flex items-center gap-3 text-sm font-medium text-slate-600"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                    <Check size={12} />
                  </div>

                  {query}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={
              reducedMotion
                ? false
                : {
                    opacity: 0,
                    scale: 0.96,
                    y: 25,
                  }
            }
            whileInView={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.8,
              ease,
            }}
            className="relative"
          >
            <div className="absolute -inset-8 rounded-[45px] bg-indigo-500/[0.055] blur-3xl" />

            <div className="relative overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_30px_85px_rgba(15,23,42,0.1)]">
              <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/80 px-5 py-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                    <Bot size={15} />
                  </div>

                  <div>
                    <div className="text-[10px] font-bold text-slate-900">
                      DevSync AI
                    </div>

                    <div className="text-[8px] text-slate-400">
                      Project intelligence
                    </div>
                  </div>
                </div>

                <span className="flex items-center gap-1.5 text-[8px] font-semibold text-emerald-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Ready
                </span>
              </div>

              <div className="space-y-5 p-5 sm:p-7">
                <div className="ml-auto max-w-[82%] rounded-2xl rounded-tr-md bg-slate-950 px-4 py-3 text-[10px] leading-5 text-slate-200">
                  What's blocking this sprint?
                </div>

                <div className="max-w-[92%] rounded-2xl rounded-tl-md border border-slate-200 bg-slate-50 px-4 py-4">
                  <div className="mb-3 flex items-center gap-2 text-[9px] font-bold text-indigo-600">
                    <Sparkles size={11} />
                    Sprint analysis
                  </div>

                  <p className="text-[10px] leading-5 text-slate-600">
                    Three items currently need attention. Two tasks are
                    waiting on development work while the analytics milestone
                    is approaching its target date.
                  </p>

                  <div className="mt-4 space-y-2">
                    {[
                      ["GitHub sync", "Waiting"],
                      ["Analytics milestone", "Due soon"],
                      ["AI summary", "In review"],
                    ].map(([label, status]) => (
                      <div
                        key={label}
                        className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2"
                      >
                        <span className="text-[9px] font-medium text-slate-700">
                          {label}
                        </span>

                        <span className="text-[8px] font-semibold text-slate-400">
                          {status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5">
                  <span className="flex-1 text-[9px] text-slate-400">
                    Ask about your project...
                  </span>

                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-950 text-white">
                    <Send size={11} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   WHO CAN USE IT
========================================================= */

function Audience({ reducedMotion }) {
  return (
    <section className="border-t border-slate-200/70 bg-slate-50/50 py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
        >
          <SectionHeading
            center
            eyebrow="Who is it for?"
            title="Built for people who build software."
            description="DevSync is designed around the different people who contribute to a development project."
          />
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.1,
          }}
          className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        >
          {AUDIENCE.map((person) => {
            const Icon = person.icon;

            return (
              <motion.div
                key={person.title}
                variants={fadeUp}
                className="group rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,0.07)]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 text-slate-600 transition-colors group-hover:bg-blue-50 group-hover:text-blue-600">
                  <Icon size={19} />
                </div>

                <h3 className="mt-8 text-base font-bold text-slate-950">
                  {person.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {person.text}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* =========================================================
   LIVE ACTIVITY SECTION
========================================================= */

function LiveWorkspace({ reducedMotion }) {
  return (
    <section className="border-t border-slate-200/70 bg-white py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_1.05fr]">
          <motion.div
            initial={
              reducedMotion
                ? false
                : {
                    opacity: 0,
                    x: -25,
                  }
            }
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.7,
            }}
          >
            <SectionHeading
              eyebrow="Live project visibility"
              title="Know what changed without chasing it."
              description="Activity becomes useful when it is connected to the project. See development events, task movement and team updates in one stream."
            />

            <div className="mt-8 flex flex-wrap gap-2">
              {[
                "Commits",
                "Tasks",
                "Pull requests",
                "Team updates",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[9px] font-bold text-slate-600"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={
              reducedMotion
                ? false
                : {
                    opacity: 0,
                    x: 30,
                  }
            }
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.75,
            }}
            className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.08)]"
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div>
                <div className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
                  Project activity
                </div>

                <div className="mt-1 text-sm font-bold text-slate-950">
                  DevSync Platform
                </div>
              </div>

              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-500">
                <Activity size={14} />
              </div>
            </div>

            <div className="p-5">
              {[
                {
                  icon: GitCommit,
                  title: "feat: project analytics",
                  text: "Shankar pushed 4 commits to main",
                  time: "2m ago",
                },
                {
                  icon: Check,
                  title: "Task completed",
                  text: "GitHub integration marked complete",
                  time: "8m ago",
                },
                {
                  icon: MessageSquare,
                  title: "Project comment",
                  text: "Aarav commented on Analytics milestone",
                  time: "14m ago",
                },
                {
                  icon: GitPullRequest,
                  title: "Pull request updated",
                  text: "PR #42 is ready for review",
                  time: "21m ago",
                },
              ].map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="relative flex gap-4 pb-6 last:pb-0"
                  >
                    {index !== 3 && (
                      <span className="absolute left-[15px] top-9 h-[calc(100%-20px)] w-px bg-slate-200" />
                    )}

                    <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500">
                      <Icon size={13} />
                    </div>

                    <div className="min-w-0 pt-0.5">
                      <div className="text-[10px] font-bold text-slate-800">
                        {item.title}
                      </div>

                      <div className="mt-1 text-[9px] leading-5 text-slate-500">
                        {item.text}
                      </div>

                      <div className="mt-1 text-[8px] text-slate-400">
                        {item.time}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   PRICING
========================================================= */

function Pricing({ reducedMotion }) {
  return (
    <section
      id="pricing"
      className="border-t border-slate-200/70 bg-white py-28 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
        >
          <SectionHeading
            center
            eyebrow="Pricing"
            title="Start simple. Grow with your workflow."
            description="Choose the workspace that matches the way you build today."
          />
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.1,
          }}
          className="mx-auto mt-16 grid max-w-5xl gap-4 lg:grid-cols-3"
        >
          {PRICING.map((plan) => (
            <motion.article
              key={plan.name}
              variants={fadeUp}
              className={`relative rounded-[26px] border p-7 ${
                plan.featured
                  ? "border-blue-200 bg-slate-950 text-white shadow-[0_30px_80px_rgba(15,23,42,0.16)]"
                  : "border-slate-200 bg-white text-slate-950 shadow-[0_10px_30px_rgba(15,23,42,0.04)]"
              }`}
            >
              {plan.featured && (
                <div className="absolute right-5 top-5 rounded-full bg-blue-600 px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.12em] text-white">
                  Recommended
                </div>
              )}

              <div className="text-xs font-bold">
                {plan.name}
              </div>

              <div
                className={`mt-1 text-[9px] ${
                  plan.featured
                    ? "text-slate-500"
                    : "text-slate-400"
                }`}
              >
                {plan.label}
              </div>

              <p
                className={`mt-5 min-h-[45px] text-xs leading-5 ${
                  plan.featured
                    ? "text-slate-400"
                    : "text-slate-500"
                }`}
              >
                {plan.description}
              </p>

              <div className="mt-7">
                <span className="text-3xl font-bold tracking-tight">
                  {plan.price}
                </span>

                <span
                  className={`ml-2 text-[9px] ${
                    plan.featured
                      ? "text-slate-500"
                      : "text-slate-400"
                  }`}
                >
                  {plan.period}
                </span>
              </div>

              <div
                className={`my-7 h-px ${
                  plan.featured
                    ? "bg-white/10"
                    : "bg-slate-200"
                }`}
              />

              <div className="space-y-3.5">
                {plan.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-2.5"
                  >
                    <Check
                      size={13}
                      className={
                        plan.featured
                          ? "text-blue-400"
                          : "text-blue-600"
                      }
                    />

                    <span
                      className={`text-xs ${
                        plan.featured
                          ? "text-slate-300"
                          : "text-slate-600"
                      }`}
                    >
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                to="/register"
                className={`mt-8 flex items-center justify-center rounded-xl px-4 py-3 text-xs font-bold no-underline transition-all ${
                  plan.featured
                    ? "bg-white text-slate-950 hover:bg-blue-50"
                    : "border border-slate-200 bg-white text-slate-800 hover:border-blue-200 hover:text-blue-600"
                }`}
              >
                {plan.name === "Team"
                  ? "Talk to us"
                  : "Get started"}
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* =========================================================
   FAQ
========================================================= */

function FAQ() {
  const [open, setOpen] = useState(0);

  const items = [
    {
      question: "What exactly is DevSync?",
      answer:
        "DevSync is a developer-focused project workspace designed to connect project planning, tasks, development activity, team collaboration, analytics and AI-assisted project understanding.",
    },
    {
      question: "Is DevSync trying to replace GitHub?",
      answer:
        "No. The intended experience is complementary. GitHub remains the development and repository layer, while DevSync provides a project-centric workspace around the work happening there.",
    },
    {
      question: "Why do I need another workspace?",
      answer:
        "The purpose is to reduce fragmented project context. Instead of repeatedly switching between development activity, project planning, team updates and progress information, DevSync brings those signals together.",
    },
    {
      question: "Who can use DevSync?",
      answer:
        "Individual developers, student developers, development teams, project leads, mentors and collaborators can use the workspace according to the project workflow they need.",
    },
    {
      question: "Can I explore DevSync without creating an account?",
      answer:
        "Yes. The public interactive demo can be accessed through the Explore Dashboard actions on this landing page.",
    },
  ];

  return (
    <section className="border-t border-slate-200/70 bg-slate-50/50 py-28 lg:py-36">
      <div className="mx-auto max-w-4xl px-5 sm:px-7">
        <SectionHeading
          center
          eyebrow="FAQ"
          title="Questions, answered."
          description="A quick overview of what DevSync is designed to solve."
        />

        <div className="mt-14 overflow-hidden rounded-[26px] border border-slate-200 bg-white">
          {items.map((item, index) => {
            const isOpen = open === index;

            return (
              <div
                key={item.question}
                className="border-b border-slate-200 last:border-b-0"
              >
                <button
                  onClick={() =>
                    setOpen(
                      isOpen ? -1 : index
                    )
                  }
                  className="flex w-full items-center justify-between gap-5 border-0 bg-transparent px-5 py-5 text-left sm:px-7"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-bold text-slate-900 sm:text-base">
                    {item.question}
                  </span>

                  <ChevronDown
                    size={17}
                    className={`shrink-0 text-slate-400 transition-transform ${
                      isOpen
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-7">
                    <p className="max-w-3xl text-sm leading-7 text-slate-500">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   FINAL CTA
========================================================= */

function FinalCTA({ reducedMotion }) {
  return (
    <section className="relative overflow-hidden border-t border-slate-200 bg-white py-28 lg:py-36">
      <div className="absolute inset-0">
        <div
          className="absolute left-1/2 top-[-200px] h-[600px] w-[900px] -translate-x-1/2 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(59,130,246,0.12), transparent 68%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-7">
        <motion.div
          initial={
            reducedMotion
              ? false
              : {
                  opacity: 0,
                  y: 25,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.7,
            ease,
          }}
        >
          <div className="mx-auto mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-[0_15px_40px_rgba(15,23,42,0.18)]">
            <Rocket size={22} />
          </div>

          <div className="mb-5 text-[9px] font-bold uppercase tracking-[0.2em] text-blue-600">
            Ready when you are
          </div>

          <h2 className="text-4xl font-bold leading-[0.98] tracking-[-0.06em] text-slate-950 sm:text-5xl lg:text-[68px]">
            Stop chasing project context.
            <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Start building with it.
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-[15px] leading-7 text-slate-500 sm:text-base">
            Bring your development work, project execution and team context
            into one focused DevSync workspace.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/register"
              className="group inline-flex min-w-[175px] items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-bold text-white no-underline shadow-[0_12px_30px_rgba(15,23,42,0.16)] transition-all hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-[0_18px_40px_rgba(37,99,235,0.2)]"
            >
              Get Started
              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/demo"
              className="inline-flex min-w-[175px] items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 no-underline shadow-sm transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:text-slate-950"
            >
              <Play size={14} />
              Explore Live Demo
            </Link>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[10px] font-medium text-slate-400">
            <span className="flex items-center gap-1.5">
              <Check
                size={11}
                className="text-emerald-500"
              />
              No credit card required
            </span>

            <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />

            <span className="flex items-center gap-1.5">
              <ShieldCheck
                size={11}
                className="text-blue-500"
              />
              Developer focused
            </span>

            <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />

            <span className="flex items-center gap-1.5">
              <Zap
                size={11}
                className="text-amber-500"
              />
              Built to ship
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* =========================================================
   FOOTER
========================================================= */

function Footer() {
  const go = (id) => scrollToSection(id);

  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-7 lg:px-10">
        <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <button
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
              className="flex items-center gap-3 border-0 bg-transparent p-0"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600">
                <Code2 size={17} />
              </div>

              <span className="text-xl font-bold tracking-tight">
                Dev<span className="text-blue-400">Sync</span>
              </span>
            </button>

            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-500">
              A focused developer workspace connecting projects, development
              activity, collaboration and intelligence.
            </p>

            <div className="mt-7 flex items-center gap-2">
              <a
                href="https://github.com/shankar-uxcloud/devsync"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition-colors hover:border-white/20 hover:text-white"
                aria-label="DevSync GitHub repository"
              >
                <GitBranch size={15} />
              </a>

              <Link
                to="/demo"
                className="flex h-9 items-center gap-2 rounded-lg border border-white/10 px-3 text-[10px] font-bold text-slate-400 no-underline transition-colors hover:border-white/20 hover:text-white"
              >
                <Play size={11} />
                Live Demo
              </Link>
            </div>
          </div>

          <div>
            <div className="mb-5 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-600">
              Product
            </div>

            <div className="space-y-3">
              {[
                ["Product", "product"],
                ["Why DevSync", "why-devsync"],
                ["How it works", "how-it-works"],
                ["Features", "features"],
                ["GitHub", "github"],
                ["Pricing", "pricing"],
              ].map(([label, id]) => (
                <button
                  key={id}
                  onClick={() => go(id)}
                  className="block border-0 bg-transparent p-0 text-left text-xs font-medium text-slate-500 transition-colors hover:text-white"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-5 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-600">
              Workspace
            </div>

            <div className="space-y-3">
              <Link
                to="/demo"
                className="block text-xs font-medium text-slate-500 no-underline transition-colors hover:text-white"
              >
                Explore Demo
              </Link>

              <Link
                to="/login"
                className="block text-xs font-medium text-slate-500 no-underline transition-colors hover:text-white"
              >
                Sign In
              </Link>

              <Link
                to="/register"
                className="block text-xs font-medium text-slate-500 no-underline transition-colors hover:text-white"
              >
                Create Account
              </Link>
            </div>
          </div>

          <div>
            <div className="mb-5 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-600">
              Built for
            </div>

            <div className="space-y-3 text-xs font-medium text-slate-500">
              <div>Developers</div>
              <div>Development teams</div>
              <div>Project leads</div>
              <div>Mentors</div>
              <div>Collaborators</div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-7 text-[10px] text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} DevSync. All rights reserved.
          </span>

          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Developer workspace online
          </span>
        </div>
      </div>
    </footer>
  );
}

/* =========================================================
   LANDING PAGE
========================================================= */

export default function LandingPage() {
  const reducedMotion = useReducedMotion();

  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-slate-950">
      <LandingNavbar reducedMotion={reducedMotion} />

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative isolate overflow-hidden pt-[72px]">
        <AmbientBackground
          reducedMotion={reducedMotion}
        />

        <div className="relative mx-auto max-w-7xl px-5 pb-24 pt-20 sm:px-7 sm:pt-28 lg:px-10 lg:pb-32 lg:pt-32">
          <motion.div
            initial={
              reducedMotion
                ? false
                : { opacity: 0 }
            }
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-5xl text-center"
          >
            {/* Announcement */}
            <motion.div
              initial={
                reducedMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 15,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.65,
                delay: 0.05,
                ease,
              }}
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-3.5 py-2 shadow-[0_6px_22px_rgba(15,23,42,0.05)] backdrop-blur"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-slate-950 text-white">
                <Terminal size={10} />
              </span>

              <span className="text-[10px] font-bold text-slate-600 sm:text-[11px]">
                The workspace around your code
              </span>

              <ChevronRight
                size={12}
                className="text-slate-400"
              />
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={
                reducedMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 25,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.12,
                ease,
              }}
              className="mx-auto max-w-5xl text-[54px] font-bold leading-[0.93] tracking-[-0.068em] text-slate-950 sm:text-[72px] md:text-[88px] lg:text-[105px]"
            >
              Build software.
              <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Not context switches.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={
                reducedMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 20,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.27,
                ease,
              }}
              className="mx-auto mt-7 max-w-2xl text-[15px] leading-7 text-slate-500 sm:text-[17px] sm:leading-8"
            >
              DevSync connects projects, tasks, GitHub activity, teams,
              communication and AI-powered insights into one focused
              development workspace.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={
                reducedMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 18,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.65,
                delay: 0.4,
                ease,
              }}
              className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              <Link
                to="/register"
                className="group inline-flex min-w-[180px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3.5 text-sm font-bold text-white no-underline shadow-[0_14px_35px_rgba(37,99,235,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_45px_rgba(37,99,235,0.28)]"
              >
                Start Building
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/demo"
                className="group inline-flex min-w-[180px] items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 no-underline shadow-[0_8px_25px_rgba(15,23,42,0.05)] transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:text-slate-950"
              >
                <Play size={14} />
                Explore Live Demo
              </Link>
            </motion.div>

            {/* Trust line */}
            <motion.div
              initial={
                reducedMotion
                  ? false
                  : { opacity: 0 }
              }
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.7,
                delay: 0.55,
              }}
              className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[10px] font-medium text-slate-400"
            >
              <span>No credit card required</span>
              <span className="h-1 w-1 rounded-full bg-slate-300" />
              <span>Built for developers</span>
              <span className="h-1 w-1 rounded-full bg-slate-300" />
              <span>Open collaboration</span>
            </motion.div>
          </motion.div>

          <HeroWorkspace
            reducedMotion={reducedMotion}
          />
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* =====================================================
          TRUST STRIP
      ===================================================== */}
      <section className="border-y border-slate-200/70 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-5 py-7 sm:px-7 md:flex-row lg:px-10">
          <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">
            One connected development workspace
          </span>

          <div className="flex flex-wrap items-center justify-center gap-5 text-slate-400 sm:gap-8">
            <span className="flex items-center gap-2 text-[10px] font-semibold">
              <GitBranch size={13} />
              Development
            </span>

            <span className="flex items-center gap-2 text-[10px] font-semibold">
              <Check size={13} />
              Execution
            </span>

            <span className="flex items-center gap-2 text-[10px] font-semibold">
              <Users size={13} />
              Collaboration
            </span>

            <span className="flex items-center gap-2 text-[10px] font-semibold">
              <Bot size={13} />
              Intelligence
            </span>

            <span className="flex items-center gap-2 text-[10px] font-semibold">
              <BarChart3 size={13} />
              Visibility
            </span>
          </div>
        </div>
      </section>

      <WhatIsDevSync
        reducedMotion={reducedMotion}
      />

      <WhyDevSync
        reducedMotion={reducedMotion}
      />

      <HowItWorks
        reducedMotion={reducedMotion}
      />

      <GitHubDifference
        reducedMotion={reducedMotion}
      />

      <Benefits
        reducedMotion={reducedMotion}
      />

      <Features
        reducedMotion={reducedMotion}
      />

      <AISection
        reducedMotion={reducedMotion}
      />

      <Audience
        reducedMotion={reducedMotion}
      />

      <LiveWorkspace
        reducedMotion={reducedMotion}
      />

      <Pricing
        reducedMotion={reducedMotion}
      />

      <FAQ />

      <FinalCTA
        reducedMotion={reducedMotion}
      />

      <Footer />
    </main>
  );
}
