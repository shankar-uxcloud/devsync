import { Link } from "react-router-dom";
import { FaArrowRight, FaRocket, FaCode } from "react-icons/fa";

function CTASection() {
  return (
    <section
      className="
        relative overflow-hidden
        py-24
        transition-all duration-500
      "
      style={{
        background: "var(--theme-background)",
        color: "var(--theme-text)",
      }}
    >
      {/* Background glow */}
      <div
        className="
          pointer-events-none
          absolute left-1/2 top-1/2
          h-[500px] w-[700px]
          -translate-x-1/2 -translate-y-1/2
          rounded-full
          opacity-10
          blur-3xl
        "
        style={{
          background: "var(--theme-primary)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">

        {/* CTA CARD */}
        <div
          className="
            relative overflow-hidden
            rounded-3xl
            border
            px-6 py-16
            text-center
            shadow-xl
            transition-all duration-500
            md:px-16
          "
          style={{
            background: "var(--theme-surface)",
            borderColor: "var(--theme-border)",
          }}
        >

          {/* Decorative circles */}
          <div
            className="
              pointer-events-none
              absolute -right-20 -top-20
              h-52 w-52
              rounded-full
              opacity-10
              blur-2xl
            "
            style={{
              background: "var(--theme-primary)",
            }}
          />

          <div
            className="
              pointer-events-none
              absolute -bottom-20 -left-20
              h-52 w-52
              rounded-full
              opacity-10
              blur-2xl
            "
            style={{
              background: "var(--theme-secondary)",
            }}
          />

          {/* Icon */}
          <div
            className="
              mx-auto mb-6
              flex h-16 w-16
              items-center justify-center
              rounded-2xl
              text-white
              shadow-lg
            "
            style={{
              background: "var(--theme-primary)",
              boxShadow:
                "0 10px 35px rgba(37, 99, 235, 0.30)",
            }}
          >
            <FaRocket className="text-2xl" />
          </div>

          {/* Heading */}
          <h2 className="mx-auto max-w-3xl text-4xl font-black tracking-tight md:text-5xl">
            Ready to build better
            <span
              className="block"
              style={{
                color: "var(--theme-primary)",
              }}
            >
              software together?
            </span>
          </h2>

          {/* Description */}
          <p
            className="
              mx-auto mt-6
              max-w-2xl
              text-base
              leading-7
              md:text-lg
            "
            style={{
              color: "var(--theme-text-secondary)",
            }}
          >
            Bring your developers, projects, tasks, and conversations
            together in one powerful workspace.
          </p>

          {/* Buttons */}
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">

            {/* Get Started */}
            <Link
              to="/register"
              className="
                group
                flex items-center gap-3
                rounded-xl
                px-7 py-3.5
                text-sm font-bold
                text-white
                shadow-lg
                transition-all duration-300
                hover:-translate-y-1
              "
              style={{
                background: "var(--theme-primary)",
                boxShadow:
                  "0 10px 25px rgba(37, 99, 235, 0.25)",
              }}
            >
              <FaCode />

              Get Started

              <FaArrowRight
                className="
                  transition-transform duration-300
                  group-hover:translate-x-1
                "
              />
            </Link>

            {/* Demo */}
            <Link
              to="/demo"
              className="
                flex items-center gap-3
                rounded-xl
                border
                px-7 py-3.5
                text-sm font-bold
                transition-all duration-300
                hover:-translate-y-1
              "
              style={{
                background: "var(--theme-surface-secondary)",
                borderColor: "var(--theme-border)",
                color: "var(--theme-text)",
              }}
            >
              Explore Live Demo
            </Link>

          </div>

          {/* Small trust text */}
          <p
            className="mt-7 text-xs"
            style={{
              color: "var(--theme-text-secondary)",
            }}
          >
            No complicated setup • Developer friendly • Built for teams
          </p>

        </div>

      </div>
    </section>
  );
}

export default CTASection;