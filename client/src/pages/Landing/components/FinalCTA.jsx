import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";

export default function FinalCTA() {
  const ref = useRef(null);

  const isInView = useInView(ref, {
    once: true,
    margin: "-60px",
  });

  return (
    <section
      className="relative overflow-hidden py-24 lg:py-32"
      id="pricing"
      ref={ref}
      style={{
        background:
          "linear-gradient(180deg, #0B1220 0%, #0d1526 100%)",
      }}
    >
      {/* Background glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]"
        style={{
          background: "rgba(37, 99, 235, 0.08)",
        }}
      />

      <div
        className="pointer-events-none absolute left-[30%] top-[60%] h-[300px] w-[400px] -translate-x-1/2 rounded-full blur-[120px]"
        style={{
          background: "rgba(124, 58, 237, 0.06)",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-5 text-center lg:px-8">
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
          }}
        >
          <h2 className="text-[clamp(1.75rem,4.5vw,3.25rem)] font-extrabold leading-tight tracking-[-0.02em] text-white">
            Ready to build
            <br />
            <span className="text-[#60A5FA]">
              better software?
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-lg text-[16px] leading-[1.7] text-[rgba(255,255,255,0.4)]">
            Bring your projects, code, tasks, and team into
            one workspace. Start shipping faster today.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
            {/* Get Started */}
            <Link
              to="/register"
              className="group inline-flex items-center gap-2.5 rounded-xl px-7 py-3.5 text-[15px] font-semibold text-white no-underline transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: "var(--ds-primary)",
                boxShadow:
                  "0 4px 20px rgba(37,99,235,0.35)",
              }}
            >
              Get Started Free

              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            {/* GitHub */}
            <a
              href="https://github.com/shankar-uxcloud/devsync"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-xl border px-7 py-3.5 text-[15px] font-semibold text-[rgba(255,255,255,0.7)] no-underline transition-all duration-300 hover:-translate-y-0.5 hover:text-white"
              style={{
                borderColor: "rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.03)",
              }}
            >
              <FaGithub size={16} />
              View GitHub
            </a>
          </div>

          <p className="mt-8 text-[13px] text-[rgba(255,255,255,0.25)]">
            No credit card required · Free for small teams ·
            Open source
          </p>
        </motion.div>
      </div>
    </section>
  );
}