import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  GitCommit,
  GitPullRequest,
  CircleDot,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

const commits = [
  {
    msg: "feat: add real-time notifications",
    time: "2h ago",
  },
  {
    msg: "fix: improve task filtering logic",
    time: "5h ago",
  },
  {
    msg: "feat: GitHub repository sync",
    time: "1d ago",
  },
  {
    msg: "refactor: dashboard components",
    time: "2d ago",
  },
];

export default function GithubSection() {
  const ref = useRef(null);

  const isInView = useInView(ref, {
    once: true,
    margin: "-60px",
  });

  return (
    <section
      className="relative overflow-hidden py-24 lg:py-32"
      id="github"
      ref={ref}
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* ───────────── Left — GitHub repo preview ───────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={
              isInView
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {}
            }
            transition={{
              duration: 0.7,
            }}
            className="order-2 lg:order-1"
          >
            <div
              className="overflow-hidden rounded-2xl"
              style={{
                background: "#0f1419",
                border: "1px solid rgba(255,255,255,0.06)",
                boxShadow: "0 24px 64px rgba(0,0,0,0.18)",
              }}
            >
              {/* Repo header */}
              <div
                className="flex items-center gap-3 px-5 py-4"
                style={{
                  borderBottom:
                    "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <FaGithub
                  size={19}
                  className="text-[rgba(255,255,255,0.65)]"
                />

                <div>
                  <span className="text-[14px] font-bold text-white">
                    devsync
                  </span>

                  <div className="mt-0.5 flex items-center gap-2">
                    <span className="text-[11px] text-[rgba(255,255,255,0.35)]">
                      main
                    </span>
                  </div>
                </div>

                <div
                  className="ml-auto rounded-md px-2.5 py-1 text-[10px] font-semibold text-[#22C55E]"
                  style={{
                    background:
                      "rgba(34, 197, 94, 0.1)",
                    border:
                      "1px solid rgba(34, 197, 94, 0.15)",
                  }}
                >
                  Public
                </div>
              </div>

              {/* Stats */}
              <div
                className="flex flex-wrap gap-6 px-5 py-3.5"
                style={{
                  borderBottom:
                    "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {[
                  {
                    icon: GitCommit,
                    label: "42 commits",
                    color: "#60A5FA",
                  },
                  {
                    icon: GitPullRequest,
                    label: "8 pull requests",
                    color: "#A78BFA",
                  },
                  {
                    icon: CircleDot,
                    label: "12 issues",
                    color: "#34D399",
                  },
                ].map((stat) => {
                  const Icon = stat.icon;

                  return (
                    <div
                      key={stat.label}
                      className="flex items-center gap-1.5"
                    >
                      <Icon
                        size={12}
                        style={{
                          color: stat.color,
                        }}
                      />

                      <span className="text-[11px] font-medium text-[rgba(255,255,255,0.45)]">
                        {stat.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Recent commits */}
              <div className="px-5 py-4">
                <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-[rgba(255,255,255,0.3)]">
                  Recent Commits
                </p>

                <div className="flex flex-col gap-2.5">
                  {commits.map((commit, index) => (
                    <motion.div
                      key={`${commit.msg}-${commit.time}`}
                      initial={{
                        opacity: 0,
                        x: -10,
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
                        delay: 0.3 + index * 0.1,
                      }}
                      className="flex items-center gap-2.5"
                    >
                      <GitCommit
                        size={12}
                        className="flex-shrink-0 text-[rgba(255,255,255,0.2)]"
                      />

                      <span className="flex-1 truncate text-[12px] font-medium text-[rgba(255,255,255,0.6)]">
                        {commit.msg}
                      </span>

                      <span className="flex-shrink-0 text-[10px] text-[rgba(255,255,255,0.2)]">
                        {commit.time}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* ───────────── Right — Text ───────────── */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={
              isInView
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {}
            }
            transition={{
              duration: 0.6,
              delay: 0.1,
            }}
            className="order-1 lg:order-2"
          >
            <div
              className="mb-5 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5"
              style={{
                background:
                  "rgba(37, 99, 235, 0.05)",
                borderColor:
                  "rgba(37, 99, 235, 0.12)",
              }}
            >
              <FaGithub
                size={13}
                style={{
                  color: "var(--ds-primary)",
                }}
              />

              <span
                className="text-[12px] font-medium"
                style={{
                  color: "var(--ds-primary)",
                }}
              >
                GitHub Integration
              </span>
            </div>

            <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-extrabold leading-tight tracking-[-0.02em] text-[#0F172A]">
              Your code.
              <br />
              Your workflow.
              <br />
              <span
                style={{
                  color: "var(--ds-primary)",
                }}
              >
                One place.
              </span>
            </h2>

            <p className="mt-5 max-w-md text-[15px] leading-[1.8] text-[#64748B]">
              Connect your GitHub repositories directly to
              DevSync. Track commits, pull requests, and
              issues alongside your project tasks — so your
              engineering activity and project management
              stay perfectly synchronized.
            </p>

            <div className="mt-8 flex flex-col gap-3">
              {[
                "Automatic commit tracking",
                "Pull request status syncing",
                "Issue linking to project tasks",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2.5"
                >
                  <div
                    className="flex h-5 w-5 items-center justify-center rounded-full"
                    style={{
                      background:
                        "rgba(37, 99, 235, 0.08)",
                    }}
                  >
                    <div
                      className="h-1.5 w-1.5 rounded-full"
                      style={{
                        background:
                          "var(--ds-primary)",
                      }}
                    />
                  </div>

                  <span className="text-[13px] font-medium text-[#64748B]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}