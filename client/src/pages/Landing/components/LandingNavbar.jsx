import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Code2, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Product", href: "#product" },
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "GitHub", href: "#github" },
  { label: "Pricing", href: "#pricing" },
];

export default function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <nav
      className="fixed left-0 right-0 top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(248, 250, 252, 0.85)"
          : "transparent",
        backdropFilter: scrolled ? "blur(16px) saturate(180%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px) saturate(180%)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(15, 23, 42, 0.06)"
          : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 text-[#0F172A] no-underline"
        >
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg"
            style={{ background: "var(--ds-primary)" }}
          >
            <Code2 size={16} className="text-white" strokeWidth={2.5} />
          </div>
          <span className="text-lg font-bold tracking-tight">DevSync</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-lg px-3.5 py-2 text-[13.5px] font-medium text-[#64748B] no-underline transition-colors duration-200 hover:bg-[rgba(15,23,42,0.04)] hover:text-[#0F172A]"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/login"
            className="rounded-lg px-4 py-2 text-[13.5px] font-medium text-[#64748B] no-underline transition-colors duration-200 hover:text-[#0F172A]"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="rounded-lg px-4 py-2 text-[13.5px] font-semibold text-white no-underline transition-all duration-200 hover:brightness-110"
            style={{
              background: "var(--ds-primary)",
              boxShadow: "0 1px 3px rgba(37,99,235,0.3)",
            }}
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border-none bg-transparent text-[#0F172A] md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 top-16 z-40 md:hidden"
          style={{ background: "rgba(248, 250, 252, 0.98)", backdropFilter: "blur(20px)" }}
        >
          <div className="flex flex-col gap-1 px-5 pt-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-4 py-3.5 text-[15px] font-medium text-[#0F172A] no-underline transition-colors hover:bg-[rgba(15,23,42,0.04)]"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-4 flex flex-col gap-3 border-t border-[rgba(15,23,42,0.06)] pt-5">
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-4 py-3.5 text-center text-[15px] font-medium text-[#64748B] no-underline"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-4 py-3.5 text-center text-[15px] font-semibold text-white no-underline"
                style={{
                  background: "var(--ds-primary)",
                  boxShadow: "0 2px 8px rgba(37,99,235,0.3)",
                }}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
