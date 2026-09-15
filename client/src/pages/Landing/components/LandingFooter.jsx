import { Link } from "react-router-dom";
import { Code2 } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Dashboard", href: "/demo" },
    { label: "AI Assistant", href: "#" },
    { label: "GitHub Integration", href: "#github" },
  ],
  Resources: [
    { label: "Documentation", href: "#" },
    { label: "GitHub", href: "https://github.com" },
    { label: "API", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Privacy", href: "#" },
  ],
};

export default function LandingFooter() {
  return (
    <footer
      style={{
        background: "#080d17",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              to="/"
              className="mb-4 inline-flex items-center gap-2.5 no-underline"
            >
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{ background: "var(--ds-primary)" }}
              >
                <Code2 size={16} className="text-white" strokeWidth={2.5} />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                DevSync
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-[14px] leading-[1.7] text-[rgba(255,255,255,0.35)]">
              AI-powered collaboration for modern development teams. Build better
              software, together.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="mb-4 text-[12px] font-bold uppercase tracking-widest text-[rgba(255,255,255,0.5)]">
                {heading}
              </h4>
              <ul className="flex flex-col gap-2.5" style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("/") ? (
                      <Link
                        to={link.href}
                        className="text-[13px] font-medium text-[rgba(255,255,255,0.3)] no-underline transition-colors duration-200 hover:text-[rgba(255,255,255,0.7)]"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-[13px] font-medium text-[rgba(255,255,255,0.3)] no-underline transition-colors duration-200 hover:text-[rgba(255,255,255,0.7)]"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="mt-14 flex flex-col items-center justify-between gap-3 border-t pt-6 sm:flex-row"
          style={{ borderColor: "rgba(255,255,255,0.05)" }}
        >
          <p className="text-[12px] text-[rgba(255,255,255,0.2)]">
            © 2026 DevSync. All rights reserved.
          </p>
          <p className="text-[12px] text-[rgba(255,255,255,0.15)]">
            Built for developers.
          </p>
        </div>
      </div>
    </footer>
  );
}
