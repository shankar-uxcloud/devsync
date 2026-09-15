import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Search,
  Bell,
  Plus,
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Users,
  MessageSquare,
  GitBranch,
  Sparkles,
  Settings,
  ChevronUp,
  GitCommit,
  GitPullRequest,
  FolderPlus,
} from "lucide-react";

/* ─────────────── Data ─────────────── */

const sidebarItems = [
  { icon: LayoutDashboard, label: "Overview", active: true },
  { icon: FolderKanban, label: "Projects" },
  { icon: CheckSquare, label: "My Tasks" },
  { icon: Users, label: "Team" },
  { icon: MessageSquare, label: "Messages" },
  { icon: GitBranch, label: "GitHub" },
  { icon: Sparkles, label: "AI Assistant" },
  { icon: Settings, label: "Settings" },
];

const stats = [
  {
    label: "Active Projects",
    value: "8",
    change: "+2",
  },
  {
    label: "Tasks Completed",
    value: "124",
    change: "+12",
  },
  {
    label: "Team Members",
    value: "12",
    change: "+3",
  },
  {
    label: "GitHub Activity",
    value: "+18%",
    change: "",
  },
];

const projects = [
  {
    name: "DevSync Platform",
    progress: 78,
    color: "#2563EB",
  },
  {
    name: "Mobile App",
    progress: 61,
    color: "#7C3AED",
  },
  {
    name: "AI Assistant",
    progress: 86,
    color: "#059669",
  },
];

const activities = [
  {
    user: "Alex",
    avatar: "A",
    avatarBg: "#2563EB",
    action: "pushed changes to",
    target: "authentication",
    time: "2 min ago",
    icon: GitCommit,
  },
  {
    user: "Priya",
    avatar: "P",
    avatarBg: "#7C3AED",
    action: "completed",
    target: "Dashboard UI",
    time: "18 min ago",
    icon: CheckSquare,
  },
  {
    user: "Rahul",
    avatar: "R",
    avatarBg: "#059669",
    action: "opened a pull request",
    target: "",
    time: "32 min ago",
    icon: GitPullRequest,
  },
  {
    user: "You",
    avatar: "Y",
    avatarBg: "#EA580C",
    action: "created a new project",
    target: "",
    time: "1 hr ago",
    icon: FolderPlus,
  },
];

/* ─────────────── Component ─────────────── */

export default function DashboardPreview() {
  const ref = useRef(null);

  const isInView = useInView(ref, {
    once: true,
    margin: "-80px",
  });

  return (
    <section
      id="product"
      ref={ref}
      className="relative -mt-10 pb-24 lg:-mt-4"
    >
      {/* Glow behind dashboard */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]"
        style={{
          background: "rgba(37, 99, 235, 0.07)",
        }}
      />

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
          scale: 0.97,
        }}
        animate={
          isInView
            ? {
                opacity: 1,
                y: 0,
                scale: 1,
              }
            : {}
        }
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative mx-auto max-w-[1200px] px-5 lg:px-8"
      >
        <div
          className="overflow-hidden rounded-2xl lg:rounded-3xl"
          style={{
            background: "#0f1419",
            border: "1px solid rgba(255,255,255,0.06)",
            boxShadow:
              "0 32px 80px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.05) inset",
          }}
        >
          {/* ───────────── macOS Window Chrome ───────────── */}

          <div
            className="flex items-center gap-2 px-4 py-3"
            style={{
              background: "rgba(255,255,255,0.03)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div
              className="h-3 w-3 rounded-full"
              style={{ background: "#FF5F56" }}
            />

            <div
              className="h-3 w-3 rounded-full"
              style={{ background: "#FFBD2E" }}
            />

            <div
              className="h-3 w-3 rounded-full"
              style={{ background: "#27C93F" }}
            />

            <span className="ml-3 text-[12px] font-medium text-[rgba(255,255,255,0.35)]">
              DevSync — Workspace
            </span>
          </div>

          {/* ───────────── Dashboard ───────────── */}

          <div className="flex min-h-[520px] lg:min-h-[560px]">
            {/* Sidebar */}
            <div
              className="hidden w-52 flex-shrink-0 flex-col py-4 lg:flex"
              style={{
                borderRight: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {/* Workspace selector */}
              <div className="mb-4 flex items-center gap-2.5 px-4">
                <div
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-[11px] font-bold text-white"
                  style={{
                    background: "var(--ds-primary)",
                  }}
                >
                  D
                </div>

                <span className="text-[13px] font-semibold text-white">
                  DevSync
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-0.5 px-2">
                {sidebarItems.map((item) => (
                  <div
                    key={item.label}
                    className="flex cursor-default items-center gap-2.5 rounded-lg px-3 py-2 transition-colors"
                    style={{
                      background: item.active
                        ? "rgba(37, 99, 235, 0.15)"
                        : "transparent",
                      color: item.active
                        ? "#60A5FA"
                        : "rgba(255,255,255,0.4)",
                    }}
                  >
                    <item.icon size={15} />

                    <span className="text-[13px] font-medium">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-1 flex-col overflow-hidden">
              {/* Top bar */}
              <div
                className="flex items-center justify-between px-5 py-3 lg:px-6"
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div
                  className="flex items-center gap-2 rounded-lg px-3 py-1.5"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <Search
                    size={13}
                    className="text-[rgba(255,255,255,0.3)]"
                  />

                  <span className="text-[12px] text-[rgba(255,255,255,0.25)]">
                    Search...
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Bell
                      size={16}
                      className="text-[rgba(255,255,255,0.35)]"
                    />

                    <div className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-[#EF4444]" />
                  </div>

                  <div
                    className="flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold text-white"
                    style={{
                      background:
                        "linear-gradient(135deg, #2563EB, #7C3AED)",
                    }}
                  >
                    PS
                  </div>
                </div>
              </div>

              {/* Content area */}
              <div className="flex-1 overflow-auto p-5 lg:p-6">
                {/* Greeting */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-white lg:text-xl">
                      Good morning, Developer 👋
                    </h2>

                    <p className="mt-1 text-[13px] text-[rgba(255,255,255,0.4)]">
                      Here&apos;s what&apos;s happening across your workspace.
                    </p>
                  </div>

                  <button
                    type="button"
                    className="flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[12px] font-semibold text-white"
                    style={{
                      background: "var(--ds-primary)",
                      border: "none",
                      cursor: "default",
                    }}
                  >
                    <Plus size={14} />
                    New Project
                  </button>
                </div>

                {/* Stats Grid */}
                <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-xl p-3.5 lg:p-4"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <p className="text-[11px] font-medium text-[rgba(255,255,255,0.35)]">
                        {stat.label}
                      </p>

                      <div className="mt-1.5 flex items-end gap-2">
                        <span className="text-xl font-bold text-white lg:text-2xl">
                          {stat.value}
                        </span>

                        {stat.change && (
                          <span
                            className="mb-0.5 text-[11px] font-semibold"
                            style={{
                              color: "#34D399",
                            }}
                          >
                            {stat.change}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Two-column layout */}
                <div className="grid gap-4 lg:grid-cols-2">
                  {/* Project Progress */}
                  <div
                    className="rounded-xl p-4"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-[13px] font-semibold text-white">
                        Project Progress
                      </h3>

                      <ChevronUp
                        size={14}
                        className="text-[rgba(255,255,255,0.25)]"
                      />
                    </div>

                    <div className="flex flex-col gap-4">
                      {projects.map((project) => (
                        <div key={project.name}>
                          <div className="mb-1.5 flex items-center justify-between">
                            <span className="text-[12px] font-medium text-[rgba(255,255,255,0.6)]">
                              {project.name}
                            </span>

                            <span className="text-[11px] font-semibold text-[rgba(255,255,255,0.4)]">
                              {project.progress}%
                            </span>
                          </div>

                          <div
                            className="h-1.5 overflow-hidden rounded-full"
                            style={{
                              background: "rgba(255,255,255,0.06)",
                            }}
                          >
                            <motion.div
                              className="h-full rounded-full"
                              style={{
                                background: project.color,
                              }}
                              initial={{
                                width: 0,
                              }}
                              animate={
                                isInView
                                  ? {
                                      width: `${project.progress}%`,
                                    }
                                  : {
                                      width: 0,
                                    }
                              }
                              transition={{
                                duration: 1.2,
                                ease: [0.22, 1, 0.36, 1],
                                delay: 0.6,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div
                    className="rounded-xl p-4"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-[13px] font-semibold text-white">
                        Recent Activity
                      </h3>

                      <ChevronUp
                        size={14}
                        className="text-[rgba(255,255,255,0.25)]"
                      />
                    </div>

                    <div className="flex flex-col gap-3.5">
                      {activities.map((act, i) => (
                        <motion.div
                          key={`${act.user}-${act.time}`}
                          initial={{
                            opacity: 0,
                            x: 12,
                          }}
                          animate={
                            isInView
                              ? {
                                  opacity: 1,
                                  x: 0,
                                }
                              : {}
                          }
                          transition={{
                            duration: 0.4,
                            delay: 0.8 + i * 0.12,
                          }}
                          className="flex items-start gap-2.5"
                        >
                          <div
                            className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                            style={{
                              background: act.avatarBg,
                            }}
                          >
                            {act.avatar}
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="text-[12px] leading-[1.5] text-[rgba(255,255,255,0.55)]">
                              <span className="font-semibold text-[rgba(255,255,255,0.85)]">
                                {act.user}
                              </span>{" "}
                              {act.action}{" "}
                              {act.target && (
                                <span className="font-medium text-[#60A5FA]">
                                  {act.target}
                                </span>
                              )}
                            </p>

                            <p className="mt-0.5 text-[10px] text-[rgba(255,255,255,0.25)]">
                              {act.time}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}