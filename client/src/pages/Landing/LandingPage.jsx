import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Activity,
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
import { motion } from "framer-motion";

/* =========================================================
   DEVSYNC LANDING PAGE
   LIGHT / PREMIUM / PRODUCT-FIRST
========================================================= */

/* =========================================================
   NAVIGATION
========================================================= */

const NAV_ITEMS = [
  { label: "Product", id: "product" },
  { label: "Why DevSync", id: "why-devsync" },
  { label: "How it works", id: "how-it-works" },
  { label: "GitHub + DevSync", id: "github" },
  { label: "Features", id: "features" },
  { label: "Pricing", id: "pricing" },
];

/* =========================================================
   DATA
========================================================= */

const AUDIENCE = [
  {
    icon: Code2,
    title: "Developers",
    text: "Keep implementation work connected to project goals, tasks and team context.",
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
  {
    icon: Rocket,
    title: "Startups",
    text: "Keep product execution, team collaboration and project progress connected.",
  },
  {
    icon: ShieldCheck,
    title: "Mentors & Clients",
    text: "Follow project progress without needing to inspect every development detail.",
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
    title: "Task management",
    text: "Turn project goals into actionable work with ownership, status, priority and progress.",
  },
  {
    number: "04",
    icon: Users,
    title: "Team collaboration",
    text: "Keep developers, mentors, clients and collaborators aligned around the same project.",
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
    number: "01",
    icon: GitBranch,
    title: "Connect",
    text: "Connect the repositories and development activity that power your project.",
  },
  {
    number: "02",
    icon: Layers3,
    title: "Organize",
    text: "Turn project goals into milestones, tasks, ownership and measurable progress.",
  },
  {
    number: "03",
    icon: Users,
    title: "Collaborate",
    text: "Keep your team aligned through updates, communication and shared activity.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Ship",
    text: "See what is complete, what is blocked and what needs attention next.",
  },
];

const BENEFITS = [
  {
    title: "Less context switching",
    text: "Spend less time searching across disconnected project tools.",
  },
  {
    title: "Clearer ownership",
    text: "Know who is responsible for the work and what is happening next.",
  },
  {
    title: "One project context",
    text: "Bring tasks, people, activity and development information closer together.",
  },
  {
    title: "Better visibility",
    text: "Understand project progress without manually piecing together updates.",
  },
  {
    title: "Faster collaboration",
    text: "Keep communication connected to the work your team is actually doing.",
  },
  {
    title: "AI-assisted understanding",
    text: "Use project context to make AI assistance more useful and relevant.",
  },
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

const FAQS = [
  {
    question: "What exactly is DevSync?",
    answer:
      "DevSync is a project workspace designed around software development. It connects projects, tasks, people, communication, development activity, analytics and AI-assisted project context.",
  },
  {
    question: "Is DevSync another GitHub?",
    answer:
      "No. DevSync should be positioned as complementary to GitHub. GitHub is centered around repositories, commits, branches, pull requests, issues and code collaboration. DevSync focuses on the broader project workspace around that development activity.",
  },
  {
    question: "Why would a team need DevSync if they already use GitHub?",
    answer:
      "A software project contains more than source code. Teams also deal with responsibilities, project goals, tasks, communication, files, progress and decisions. DevSync is designed to connect that surrounding context.",
  },
  {
    question: "Who can use DevSync?",
    answer:
      "Developers, student teams, startups, project leads, mentors, clients and teams building software together can use the DevSync workflow.",
  },
  {
    question: "Does DevSync replace other project-management tools?",
    answer:
      "The goal is not to claim that every existing tool is unnecessary. DevSync's product concept is to provide a software-development-focused workspace where project context and development activity are closely connected.",
  },
];

/* =========================================================
   MOTION
========================================================= */

const ease = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
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
   SCROLL HELPER
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
   BACKGROUND
========================================================= */

function AmbientBackground() {
  const particles = useMemo(
    () =>
      Array.from({ length: 24 }, (_, index) => ({
        id: index,
        left: `${(index * 37) % 100}%`,
        top: `${(index * 43) % 80}%`,
        delay: (index % 7) * 0.4,
        duration: 4 + (index % 4),
      })),
    []
  );

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Soft grid */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,23,42,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.035) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
          maskImage:
            "linear-gradient(to bottom, black 0%, black 45%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 45%, transparent 100%)",
        }}
      />

      {/* Main blue glow */}
      <div
        className="absolute left-1/2 top-[-300px] h-[700px] w-[900px] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.13) 0%, rgba(99,102,241,0.06) 42%, transparent 72%)",
        }}
      />

      <div
        className="absolute left-[-280px] top-[300px] h-[500px] w-[500px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(96,165,250,0.08) 0%, transparent 68%)",
        }}
      />

      <div
        className="absolute right-[-250px] top-[250px] h-[500px] w-[500px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(129,140,248,0.08) 0%, transparent 70%)",
        }}
      />

      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute h-1 w-1 rounded-full bg-slate-400/20"
          style={{
            left: particle.left,
            top: particle.top,
          }}
          animate={{
            y: [0, -10, 0],
            opacity: [0.1, 0.35, 0.1],
          }}
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

function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      let current = "";

      NAV_ITEMS.forEach((item) => {
        const element = document.getElementById(item.id);

        if (!element) return;

        const rect = element.getBoundingClientRect();

        if (rect.top <= 140) {
          current = item.id;
        }
      });

      setActiveSection(current);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

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

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
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
            ? "border-b border-slate-200/80 bg-white/90 shadow-[0_10px_35px_rgba(15,23,42,0.06)] backdrop-blur-2xl"
            : "bg-white/75 backdrop-blur-xl"
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
            <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl shadow-lg shadow-blue-600/15">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600" />

              <Code2
                size={19}
                strokeWidth={2.5}
                className="relative text-white"
              />
            </div>

            <div className="text-left">
              <span className="text-[19px] font-extrabold tracking-[-0.04em] text-slate-950">
                Dev<span className="text-blue-600">Sync</span>
              </span>

              <div className="hidden text-[8px] font-semibold uppercase tracking-[0.18em] text-slate-400 sm:block">
                Developer workspace
              </div>
            </div>
          </button>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-1 xl:flex">
            {NAV_ITEMS.map((item) => {
              const active = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id)}
                  className={`group relative rounded-xl border-0 bg-transparent px-3 py-2.5 text-[12px] font-semibold transition-colors ${
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
                        : "w-0 opacity-0 group-hover:w-3 group-hover:opacity-60"
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="hidden items-center gap-2 md:flex">
            <Link
              to="/login"
              className="rounded-xl px-4 py-2.5 text-[13px] font-semibold text-slate-600 no-underline transition hover:bg-slate-50 hover:text-slate-950"
            >
              Sign In
            </Link>

            <Link
              to="/register"
              className="group inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-[13px] font-bold text-white no-underline shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl"
            >
              Get Started
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          {/* Mobile button */}
          <button
            onClick={() => setMobileOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-900 shadow-sm md:hidden"
            aria-label={
              mobileOpen ? "Close navigation" : "Open navigation"
            }
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </header>

      {/* Mobile navigation */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[90] bg-white/95 backdrop-blur-2xl md:hidden"
        >
          <div className="mx-auto flex h-full max-w-md flex-col px-6 pb-8 pt-24">
            <div className="space-y-1">
              {NAV_ITEMS.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: index * 0.04,
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
                className="flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-4 text-sm font-bold text-white no-underline"
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
   HERO DASHBOARD
========================================================= */

function HeroWorkspace() {
  const activity = [
    ["GitHub sync completed", "2m"],
    ["Sprint task completed", "8m"],
    ["New project update", "14m"],
    ["AI summary generated", "21m"],
  ];

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
        scale: 0.98,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.85,
        delay: 0.25,
        ease,
      }}
      className="relative mx-auto mt-20 max-w-[1200px]"
    >
      <div className="absolute -inset-12 rounded-[60px] bg-blue-500/[0.06] blur-3xl" />

      <motion.div
        animate={{
          y: [0, -4, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_45px_110px_rgba(15,23,42,0.12),0_10px_35px_rgba(37,99,235,0.05)]"
      >
        {/* Browser bar */}
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

            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white">
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
                All systems normal
              </div>
            </div>
          </aside>

          {/* Main workspace */}
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
                        animate={{ width: "76%" }}
                        transition={{
                          duration: 1.2,
                          delay: 0.4,
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

                  <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-3">
                    <div className="flex items-center gap-2 text-[8px] font-bold text-blue-700">
                      <Sparkles size={10} />
                      AI insight
                    </div>

                    <p className="mt-2 text-[8px] leading-4 text-blue-600/80">
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

      <h2 className="text-4xl font-black leading-[1.05] tracking-[-0.055em] text-slate-950 sm:text-5xl lg:text-[54px]">
        {title}
      </h2>

      <p className="mt-5 text-[15px] leading-7 text-slate-500 sm:text-base">
        {description}
      </p>
    </div>
  );
}

/* =========================================================
   HERO
========================================================= */

function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pb-24 pt-16 sm:pb-32 sm:pt-24">
      <AmbientBackground />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-blue-600"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />

            Developer project workspace

            <ChevronRight size={12} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.08,
              ease,
            }}
            className="text-5xl font-black tracking-[-0.06em] text-slate-950 sm:text-6xl lg:text-7xl"
          >
            Build software.
            <br />

            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Not context switches.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.18,
            }}
            className="mx-auto mt-7 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg"
          >
            DevSync brings project planning, tasks, people, communication,
            development activity, analytics and AI-assisted context into one
            focused workspace.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.26,
            }}
            className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"
          >
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white no-underline shadow-xl shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
            >
              Start building
              <ArrowRight size={16} />
            </Link>

            <Link
              to="/demo"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 no-underline shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50"
            >
              <Play size={15} />
              View live demo
            </Link>
          </motion.div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[10px] font-semibold text-slate-400">
            {[
              "Developer-first",
              "Team-ready",
              "AI-assisted",
              "GitHub-friendly",
            ].map((item) => (
              <span
                key={item}
                className="flex items-center gap-1.5"
              >
                <Check
                  size={12}
                  className="text-emerald-500"
                />
                {item}
              </span>
            ))}
          </div>
        </div>

        <HeroWorkspace />
      </div>
    </section>
  );
}

/* =========================================================
   WHAT IS DEVSYNC
========================================================= */

function WhatIsDevSync() {
  return (
    <section
      id="product"
      className="scroll-mt-20 border-t border-slate-200/70 bg-white py-28 lg:py-36"
    >
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
              eyebrow="What is DevSync?"
              title="The workspace around your code."
              description="A software project is more than its repository. DevSync connects the work around development — projects, tasks, people, communication, activity and intelligence."
            />

            <div className="mt-9 flex flex-wrap gap-2">
              {[
                "Build",
                "Collaborate",
                "Track",
                "Understand",
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

          {/* Light project-context visual */}
          <motion.div
            initial={{
              opacity: 0,
              x: 30,
            }}
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
            <div className="absolute -inset-5 rounded-[34px] bg-blue-500/[0.05] blur-2xl" />

            <div className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_30px_80px_rgba(15,23,42,0.08)] sm:p-8">
              <div className="mb-7 flex items-center justify-between">
                <div>
                  <div className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
                    Project context
                  </div>

                  <div className="mt-1 text-lg font-extrabold text-slate-950">
                    Everything connected.
                  </div>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Layers3 size={16} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  [GitBranch, "Code", "Development"],
                  [Check, "Tasks", "Execution"],
                  [Users, "Team", "Collaboration"],
                  [Bot, "AI", "Intelligence"],
                  [BarChart3, "Analytics", "Progress"],
                  [MessageSquare, "Chat", "Communication"],
                ].map(([Icon, title, subtitle]) => (
                  <div
                    key={title}
                    className="rounded-2xl border border-slate-100 bg-slate-50 p-4 transition hover:border-blue-100 hover:bg-blue-50/40"
                  >
                    <Icon
                      size={15}
                      className="text-blue-600"
                    />

                    <div className="mt-4 text-xs font-bold text-slate-900">
                      {title}
                    </div>

                    <div className="mt-1 text-[8px] text-slate-400">
                      {subtitle}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50/60 p-4">
                <div className="flex items-center gap-2 text-[9px] font-bold text-blue-700">
                  <Sparkles size={11} />
                  One connected project context
                </div>

                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-blue-100">
                  <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-blue-600 to-indigo-500" />
                </div>

                <div className="mt-2 flex justify-between text-[7px] text-slate-400">
                  <span>Project progress</span>
                  <span>78%</span>
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

function WhyDevSync() {
  return (
    <section
      id="why-devsync"
      className="scroll-mt-20 border-t border-slate-200/70 bg-slate-50/70 py-28 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
        <SectionHeading
          center
          eyebrow="Why DevSync?"
          title="The problem isn't a lack of tools."
          description="Modern software development already produces a huge amount of information. The challenge is keeping the important context connected."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.12,
          }}
          className="mt-20 grid gap-5 lg:grid-cols-3"
        >
          {/* Problem */}
          <motion.div
            variants={fadeUp}
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
            variants={fadeUp}
            className="relative overflow-hidden rounded-[26px] border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-7 shadow-[0_20px_60px_rgba(37,99,235,0.08)]"
          >
            <div className="absolute right-[-80px] top-[-80px] h-[220px] w-[220px] rounded-full bg-blue-200/40 blur-3xl" />

            <div className="relative">
              <div className="mb-8 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                <Code2 size={18} />
              </div>

              <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-blue-600">
                With DevSync
              </div>

              <h3 className="mt-3 text-xl font-bold tracking-tight text-slate-950">
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
                    className="flex items-center gap-2.5 text-sm font-medium text-slate-600"
                  >
                    <Check
                      size={14}
                      className="text-blue-600"
                    />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Result */}
          <motion.div
            variants={fadeUp}
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
        </motion.div>
      </div>
    </section>
  );
}

/* =========================================================
   HOW IT WORKS
========================================================= */

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-20 border-t border-slate-200/70 bg-white py-28 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
        <SectionHeading
          center
          eyebrow="How it works"
          title="A simpler path from idea to production."
          description="DevSync turns the development lifecycle into one connected project flow."
        />

        <div className="relative mt-20">
          <div className="absolute left-[12%] right-[12%] top-8 hidden h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent lg:block" />

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
                  <div className="relative z-10 mb-7 flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition group-hover:-translate-y-1 group-hover:border-blue-200 group-hover:shadow-[0_16px_40px_rgba(37,99,235,0.12)]">
                    <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-[9px] font-bold text-white">
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

        {/* Flow */}
        <div className="mt-20 rounded-[26px] border border-slate-200 bg-slate-50 p-5 sm:p-7">
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
                    className="hidden text-blue-300 md:block"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   GITHUB DIFFERENCE
========================================================= */

function GitHubDifference() {
  const comparison = [
    {
      title: "GitHub",
      subtitle: "Development platform",
      icon: GitBranch,
      items: [
        "Repositories",
        "Commits & branches",
        "Pull requests",
        "Code collaboration",
        "Issues & development workflows",
      ],
    },
    {
      title: "DevSync",
      subtitle: "Project workspace",
      icon: Code2,
      items: [
        "Project context",
        "Tasks & milestones",
        "Team collaboration",
        "Project activity",
        "AI-assisted project intelligence",
      ],
    },
    {
      title: "Together",
      subtitle: "Connected workflow",
      icon: Zap,
      items: [
        "Code stays connected",
        "Work stays organized",
        "People stay aligned",
        "Progress becomes visible",
        "Context stays accessible",
      ],
    },
  ];

  return (
    <section
      id="github"
      className="scroll-mt-20 border-t border-slate-200/70 bg-slate-50/70 py-28 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
        <SectionHeading
          center
          eyebrow="GitHub + DevSync"
          title="Different purpose. Connected workflow."
          description="DevSync is not positioned as a replacement for GitHub. It adds a project-centric workspace around the development activity your team already creates."
        />

        {/* Main statement */}
        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          className="mx-auto mt-14 max-w-4xl rounded-[28px] border border-blue-100 bg-white p-7 text-center shadow-[0_20px_60px_rgba(15,23,42,0.06)] sm:p-10"
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <GitBranch size={24} />
          </div>

          <h3 className="mt-6 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
            GitHub manages the development source.
          </h3>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            DevSync focuses on the project context surrounding that
            development — the people, tasks, communication, activity,
            progress and intelligence that help teams understand the work.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-bold text-slate-600">
              GitHub
            </span>

            <ArrowRight
              size={14}
              className="text-blue-500"
            />

            <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[10px] font-bold text-blue-600">
              DevSync
            </span>

            <ArrowRight
              size={14}
              className="text-blue-500"
            />

            <span className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-[10px] font-bold text-emerald-600">
              Project clarity
            </span>
          </div>
        </motion.div>

        {/* Comparison cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.12,
          }}
          className="mt-6 grid gap-5 lg:grid-cols-3"
        >
          {comparison.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.div
                variants={fadeUp}
                key={card.title}
                className={`rounded-[26px] border bg-white p-7 shadow-sm ${
                  index === 1
                    ? "border-blue-200 shadow-[0_20px_55px_rgba(37,99,235,0.08)]"
                    : "border-slate-200"
                }`}
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                    index === 1
                      ? "bg-blue-600 text-white"
                      : "bg-slate-50 text-slate-600"
                  }`}
                >
                  <Icon size={18} />
                </div>

                <div className="mt-6 text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">
                  {card.subtitle}
                </div>

                <h3 className="mt-2 text-xl font-black tracking-tight text-slate-950">
                  {card.title}
                </h3>

                <div className="mt-7 space-y-3">
                  {card.items.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-slate-500"
                    >
                      <Check
                        size={14}
                        className={
                          index === 1
                            ? "mt-0.5 shrink-0 text-blue-600"
                            : "mt-0.5 shrink-0 text-emerald-500"
                        }
                      />

                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Important differentiation */}
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <ShieldCheck
                size={16}
                className="text-blue-600"
              />
              What DevSync is NOT
            </div>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              It should not be marketed as "GitHub but better" or as a claim
              that existing development platforms are unnecessary.
            </p>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-6">
            <div className="flex items-center gap-2 text-sm font-bold text-blue-700">
              <Sparkles size={16} />
              What makes the concept different
            </div>

            <p className="mt-3 text-sm leading-6 text-blue-700/70">
              DevSync centers the broader software-project workspace around
              the development activity — connecting execution, people,
              communication, progress and AI-assisted context.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   FEATURES
========================================================= */

function Features() {
  return (
    <section
      id="features"
      className="scroll-mt-20 border-t border-slate-200/70 bg-white py-28 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
        <SectionHeading
          center
          eyebrow="Everything around the code"
          title="One workspace. Multiple layers of context."
          description="DevSync brings the operational side of software development closer to the people actually building it."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.1,
          }}
          className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {FEATURES.map((feature) => {
            const Icon = feature.icon;

            return (
              <motion.div
                variants={fadeUp}
                key={feature.number}
                className="group rounded-[26px] border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_20px_55px_rgba(37,99,235,0.08)]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                    <Icon size={21} />
                  </div>

                  <span className="text-[10px] font-black text-slate-200">
                    {feature.number}
                  </span>
                </div>

                <h3 className="mt-6 text-lg font-extrabold text-slate-950">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {feature.text}
                </p>

                <div className="mt-6 flex items-center gap-1 text-[11px] font-bold text-blue-600 opacity-0 transition group-hover:opacity-100">
                  Explore capability
                  <ArrowRight size={13} />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* =========================================================
   BENEFITS
========================================================= */

function Benefits() {
  return (
    <section className="border-t border-slate-200/70 bg-white py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
        <div className="grid items-center gap-16 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHeading
              eyebrow="Why it matters"
              title="More context. Less friction."
              description="The goal is simple: reduce the invisible cost of switching between tools and give teams a clearer picture of their work."
            />

            <Link
              to="/demo"
              className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-xs font-bold text-white no-underline shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
            >
              See the workspace

              <ArrowRight
                size={13}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

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
                variants={fadeUp}
                key={benefit.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <Check size={15} />
                  </div>

                  <span className="text-xs font-black text-slate-300">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="mt-4 text-sm font-extrabold text-slate-900">
                  {benefit.title}
                </h3>

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  {benefit.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   AI SECTION
========================================================= */

function AISection() {
  return (
    <section className="border-t border-blue-100 bg-blue-50/50 py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeading
            eyebrow="AI project intelligence"
            title="AI that understands the project context."
            description="Instead of treating AI as a disconnected chatbot, DevSync can use the project's existing context to make summaries, insights and assistance more useful."
          />

          <motion.div
            initial={{
              opacity: 0,
              x: 30,
            }}
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
            className="rounded-[28px] border border-blue-100 bg-white p-5 shadow-[0_30px_80px_rgba(37,99,235,0.09)] sm:p-7"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                  <Bot size={19} />
                </div>

                <div>
                  <div className="text-sm font-extrabold text-slate-900">
                    DevSync AI
                  </div>

                  <div className="text-[10px] text-emerald-500">
                    Project context available
                  </div>
                </div>
              </div>

              <Sparkles
                size={17}
                className="text-blue-500"
              />
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  You asked
                </div>

                <div className="text-sm font-semibold leading-6 text-slate-700">
                  "What should our team focus on today?"
                </div>
              </div>

              <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-700">
                  <Sparkles size={13} />
                  Project summary
                </div>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Three high-priority tasks are open. Two developers have
                  active work waiting for review, while recent activity shows
                  progress on the authentication module.
                </p>

                <div className="mt-5 grid grid-cols-3 gap-2">
                  {[
                    ["Open tasks", "03"],
                    ["Reviews", "02"],
                    ["Progress", "78%"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-xl border border-white bg-white p-3"
                    >
                      <div className="text-lg font-black text-slate-900">
                        {value}
                      </div>

                      <div className="mt-1 text-[9px] font-semibold text-slate-400">
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5">
              <Search
                size={14}
                className="text-slate-400"
              />

              <span className="text-[11px] text-slate-400">
                Ask about this project...
              </span>

              <div className="ml-auto flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white">
                <Send size={12} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   AUDIENCE
========================================================= */

function Audience() {
  return (
    <section className="border-t border-slate-200/70 bg-white py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
        <SectionHeading
          center
          eyebrow="Who can use DevSync?"
          title="Built for people who build software together."
          description="Whether you're learning, shipping, mentoring or leading, DevSync is designed around the shared project."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.1,
          }}
          className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {AUDIENCE.map((item) => {
            const Icon = item.icon;

            return (
              <motion.div
                variants={fadeUp}
                key={item.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-100 hover:shadow-lg"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Icon size={20} />
                </div>

                <h3 className="mt-5 text-base font-extrabold text-slate-950">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {item.text}
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
   LIVE ACTIVITY
========================================================= */

function LiveWorkspace() {
  return (
    <section className="border-t border-slate-200/70 bg-slate-50/70 py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{
              opacity: 0,
              x: -25,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_25px_70px_rgba(15,23,42,0.07)]"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <Activity
                  size={15}
                  className="text-blue-600"
                />

                <span className="text-xs font-bold text-slate-800">
                  Live project activity
                </span>
              </div>

              <span className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Live
              </span>
            </div>

            <div className="mt-4 space-y-2">
              {[
                [GitPullRequest, "Pull request connected", "Aarav", "2m"],
                [Check, "Authentication task completed", "Priya", "8m"],
                [MessageSquare, "New project comment", "Rahul", "14m"],
                [GitCommit, "12 commits pushed", "Development team", "21m"],
                [Terminal, "Project resource updated", "You", "32m"],
              ].map(([Icon, title, user, time]) => (
                <div
                  key={title}
                  className="flex items-center gap-3 rounded-2xl p-3 transition hover:bg-slate-50"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon size={15} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="truncate text-xs font-bold text-slate-800">
                      {title}
                    </div>

                    <div className="mt-0.5 text-[10px] text-slate-400">
                      {user}
                    </div>
                  </div>

                  <div className="text-[9px] font-semibold text-slate-400">
                    {time}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <SectionHeading
            eyebrow="Always know what changed"
            title="Project activity without hunting for context."
            description="A project should tell you what happened, who did it, what changed and what needs attention."
          />
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   PRICING
========================================================= */

function Pricing() {
  return (
    <section
      id="pricing"
      className="scroll-mt-20 border-t border-slate-200/70 bg-white py-28 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
        <SectionHeading
          center
          eyebrow="Simple plans"
          title="Start small. Grow with your team."
          description="A clean pricing structure for developers, teams and growing organizations."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.1,
          }}
          className="mt-16 grid gap-5 lg:grid-cols-3"
        >
          {PRICING.map((plan) => (
            <motion.div
              variants={fadeUp}
              key={plan.name}
              className={`relative rounded-[28px] border p-7 ${
                plan.featured
                  ? "border-blue-200 bg-blue-50/40 shadow-[0_20px_60px_rgba(37,99,235,0.10)]"
                  : "border-slate-200 bg-white"
              }`}
            >
              {plan.featured && (
                <div className="absolute right-6 top-6 rounded-full bg-blue-600 px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-white">
                  Popular
                </div>
              )}

              <div className="text-lg font-extrabold text-slate-950">
                {plan.name}
              </div>

              <div className="mt-1 text-[10px] font-semibold text-blue-600">
                {plan.label}
              </div>

              <p className="mt-4 max-w-[260px] text-xs leading-5 text-slate-500">
                {plan.description}
              </p>

              <div className="mt-7 text-3xl font-black tracking-tight text-slate-950">
                {plan.price}

                {plan.price !== "Custom" && (
                  <span className="ml-1 text-xs font-semibold text-slate-400">
                    / month
                  </span>
                )}
              </div>

              <div className="mt-7 space-y-3">
                {plan.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-2 text-xs font-semibold text-slate-600"
                  >
                    <Check
                      size={14}
                      className="text-emerald-500"
                    />

                    {feature}
                  </div>
                ))}
              </div>

              <Link
                to="/register"
                className={`mt-8 block rounded-xl px-4 py-3 text-center text-xs font-bold no-underline transition ${
                  plan.featured
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                Get started
              </Link>
            </motion.div>
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

  return (
    <section className="border-t border-slate-200/70 bg-slate-50/70 py-28 lg:py-36">
      <div className="mx-auto max-w-4xl px-5 sm:px-7 lg:px-10">
        <SectionHeading
          center
          eyebrow="Questions"
          title="Everything you need to know."
          description="A few answers before you enter the workspace."
        />

        <div className="mt-14 space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = open === index;

            return (
              <div
                key={faq.question}
                className={`overflow-hidden rounded-2xl border bg-white transition ${
                  isOpen
                    ? "border-blue-200 shadow-sm"
                    : "border-slate-200"
                }`}
              >
                <button
                  onClick={() =>
                    setOpen(isOpen ? -1 : index)
                  }
                  className="flex w-full items-center justify-between gap-4 border-0 bg-transparent px-5 py-5 text-left"
                >
                  <span className="text-sm font-bold text-slate-900">
                    {faq.question}
                  </span>

                  <ChevronDown
                    size={17}
                    className={`shrink-0 text-slate-400 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-slate-100 px-5 pb-5 pt-4 text-sm leading-6 text-slate-500">
                    {faq.answer}
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

function FinalCTA() {
  return (
    <section className="border-t border-slate-200/70 bg-white py-28 lg:py-36">
      <div className="mx-auto max-w-6xl px-5 sm:px-7 lg:px-10">
        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          className="relative overflow-hidden rounded-[34px] border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-7 py-16 text-center shadow-[0_30px_90px_rgba(37,99,235,0.10)] sm:px-12"
        >
          <div className="absolute left-1/2 top-[-180px] h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-blue-200/30 blur-3xl" />

          <div className="relative">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-600/20">
              <Rocket size={24} />
            </div>

            <h2 className="mx-auto mt-7 max-w-3xl text-3xl font-black tracking-[-0.045em] text-slate-950 sm:text-5xl">
              Build better software with better project context.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              Create your workspace, connect your team and experience the
              DevSync workflow.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white no-underline shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
              >
                Get Started Free
                <ArrowRight size={16} />
              </Link>

              <Link
                to="/demo"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 no-underline shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50"
              >
                <Play size={15} />
                Explore Live Demo
              </Link>
            </div>
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
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-7 lg:px-10">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/15">
                <Code2 size={18} />
              </div>

              <span className="text-lg font-black tracking-tight text-slate-950">
                DevSync
              </span>
            </div>

            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-500">
              A connected workspace for people building software together.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-[10px] font-bold text-emerald-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Workspace online
            </div>
          </div>

          <div>
            <div className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
              Product
            </div>

            <div className="mt-4 space-y-3">
              {[
                ["Features", "features"],
                ["How it works", "how-it-works"],
                ["Why DevSync", "why-devsync"],
                ["Pricing", "pricing"],
              ].map(([label, id]) => (
                <button
                  key={label}
                  onClick={() => scrollToSection(id)}
                  className="block border-0 bg-transparent p-0 text-sm text-slate-500 transition hover:text-blue-600"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
              Workspace
            </div>

            <div className="mt-4 space-y-3">
              <Link
                to="/demo"
                className="block text-sm text-slate-500 no-underline hover:text-blue-600"
              >
                Live Demo
              </Link>

              <Link
                to="/login"
                className="block text-sm text-slate-500 no-underline hover:text-blue-600"
              >
                Sign In
              </Link>

              <Link
                to="/register"
                className="block text-sm text-slate-500 no-underline hover:text-blue-600"
              >
                Create Account
              </Link>
            </div>
          </div>

          <div>
            <div className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
              Connect
            </div>

            <div className="mt-4 space-y-3">
              <a
                href="https://github.com/shankar-uxcloud/devsync"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-slate-500 no-underline hover:text-blue-600"
              >
                <GitBranch size={15} />
                GitHub
              </a>

              <a
                href="https://github.com/shankar-uxcloud/devsync"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-slate-500 no-underline hover:text-blue-600"
              >
                <Code2 size={15} />
                Source code
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-3 border-t border-slate-100 pt-6 text-[11px] text-slate-400 sm:flex-row">
          <span>
            © {year} DevSync. Built for modern software teams.
          </span>

          <span className="flex items-center gap-1.5">
            Built with
            <span className="font-bold text-blue-600">
              React
            </span>
            +
            <span className="font-bold text-indigo-600">
              AI
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-slate-950">
      <LandingNavbar />

      <main>
        <Hero />

        <WhatIsDevSync />

        <WhyDevSync />

        <HowItWorks />

        <GitHubDifference />

        <Features />

        <Benefits />

        <AISection />

        <Audience />

        <LiveWorkspace />

        <Pricing />

        <FAQ />

        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}
