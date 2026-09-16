import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowRight,
  Code2,
  Menu,
  X,
  Sparkles,
} from "lucide-react";

const navLinks = [
  {
    label: "Product",
    href: "#product",
  },
  {
    label: "Features",
    href: "#features",
  },
  {
    label: "How it works",
    href: "#how-it-works",
  },
  {
    label: "GitHub",
    href: "#github",
  },
  {
    label: "Pricing",
    href: "#pricing",
  },
];

export default function LandingNavbar() {
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  /* =========================================================
     SCROLL STATE
  ========================================================= */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* =========================================================
     ACTIVE SECTION DETECTION
  ========================================================= */

  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection("");
      return;
    }

    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          );

        if (visibleSections.length) {
          setActiveSection(`#${visibleSections[0].target.id}`);
        }
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: [0.05, 0.15, 0.3],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, [location.pathname]);

  /* =========================================================
     MOBILE MENU
  ========================================================= */

  useEffect(() => {
    if (!mobileOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen]);

  /* =========================================================
     NAVIGATION
  ========================================================= */

  const handleSectionClick = (href) => {
    setMobileOpen(false);

    if (!href.startsWith("#")) return;

    const element = document.querySelector(href);

    if (!element) return;

    const navbarOffset = 84;

    const top =
      element.getBoundingClientRect().top +
      window.scrollY -
      navbarOffset;

    window.scrollTo({
      top,
      behavior: "smooth",
    });
  };

  const handleLogoClick = () => {
    setMobileOpen(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <header
        className={`fixed left-0 right-0 top-0 z-[100] transition-all duration-300 ${
          scrolled
            ? "border-b border-slate-200/70 bg-white/80 shadow-sm backdrop-blur-2xl"
            : "border-b border-transparent bg-white/10 backdrop-blur-md"
        }`}
      >
        <nav
          className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          {/* =================================================
              LOGO
          ================================================= */}

          <Link
            to="/"
            onClick={handleLogoClick}
            className="group flex items-center gap-3 no-underline"
            aria-label="DevSync home"
          >
            <div
              className="relative flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl"
              style={{
                background:
                  "linear-gradient(135deg, var(--ds-primary, #2563eb), #4f46e5)",
              }}
            >
              <Code2
                size={20}
                strokeWidth={2.6}
              />

              <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
            </div>

            <div className="flex items-center gap-1">
              <span className="text-xl font-black tracking-tight text-slate-950">
                Dev
              </span>

              <span
                className="text-xl font-black tracking-tight"
                style={{
                  color: "var(--ds-primary, #2563eb)",
                }}
              >
                Sync
              </span>
            </div>
          </Link>

          {/* =================================================
              DESKTOP NAVIGATION
          ================================================= */}

          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const isActive =
                activeSection === link.href;

              return (
                <button
                  key={link.label}
                  type="button"
                  onClick={() =>
                    handleSectionClick(link.href)
                  }
                  className={`group relative rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "text-blue-600"
                      : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-950"
                  }`}
                >
                  {link.label}

                  <span
                    className={`absolute bottom-1 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-blue-600 transition-all duration-300 ${
                      isActive
                        ? "w-4"
                        : "w-0 group-hover:w-3"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* =================================================
              DESKTOP ACTIONS
          ================================================= */}

          <div className="hidden items-center gap-2.5 md:flex">
            <Link
              to="/login"
              className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 no-underline transition-all duration-200 hover:bg-slate-100 hover:text-slate-950"
            >
              Sign In
            </Link>

            <Link
              to="/register"
              className="group inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white no-underline shadow-lg shadow-blue-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/30"
              style={{
                background:
                  "linear-gradient(135deg, var(--ds-primary, #2563eb), #4f46e5)",
              }}
            >
              Get Started

              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          {/* =================================================
              MOBILE MENU BUTTON
          ================================================= */}

          <button
            type="button"
            onClick={() =>
              setMobileOpen((value) => !value)
            }
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white/80 text-slate-800 shadow-sm transition-all hover:bg-slate-100 md:hidden"
            aria-label={
              mobileOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X size={21} />
            ) : (
              <Menu size={21} />
            )}
          </button>
        </nav>
      </header>

      {/* =====================================================
          MOBILE OVERLAY + DRAWER
      ===================================================== */}

      {mobileOpen && (
        <div className="fixed inset-0 z-[90] md:hidden">
          {/* Overlay */}

          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-slate-950/20 backdrop-blur-sm"
          />

          {/* Drawer */}

          <div className="absolute left-3 right-3 top-[80px] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/20">
            {/* Drawer header */}

            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div className="flex items-center gap-2.5">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-white"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--ds-primary, #2563eb), #4f46e5)",
                  }}
                >
                  <Code2 size={18} />
                </div>

                <span className="font-black text-slate-950">
                  DevSync
                </span>
              </div>

              <div className="flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-600">
                <Sparkles size={12} />
                Developer-first
              </div>
            </div>

            {/* Mobile links */}

            <div className="p-3">
              {navLinks.map((link) => {
                const isActive =
                  activeSection === link.href;

                return (
                  <button
                    key={link.label}
                    type="button"
                    onClick={() =>
                      handleSectionClick(link.href)
                    }
                    className={`flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-left text-[15px] font-semibold transition-all ${
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-slate-700 hover:bg-slate-50 hover:text-slate-950"
                    }`}
                  >
                    <span>{link.label}</span>

                    <ArrowRight
                      size={16}
                      className={
                        isActive
                          ? "text-blue-600"
                          : "text-slate-300"
                      }
                    />
                  </button>
                );
              })}
            </div>

            {/* Mobile auth */}

            <div className="border-t border-slate-100 p-4">
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 no-underline transition hover:bg-slate-50"
                >
                  Sign In
                </Link>

                <Link
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white no-underline shadow-lg shadow-blue-500/20"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--ds-primary, #2563eb), #4f46e5)",
                  }}
                >
                  Get Started
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          NAVBAR SPACER / ACCESSIBILITY OFFSET
      ===================================================== */}

      <div
        className="h-[72px]"
        aria-hidden="true"
      />
    </>
  );
}
