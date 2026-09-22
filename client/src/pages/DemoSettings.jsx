import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiActivity,
  FiAlertTriangle,
  FiArrowLeft,
  FiArrowRight,
  FiBell,
  FiCheck,
  FiChevronDown,
  FiChevronRight,
  FiClock,
  FiEye,
  FiGlobe,
  FiGrid,
  FiInfo,
  FiKey,
  FiLayout,
  FiLock,
  FiMonitor,
  FiMoon,
  FiRefreshCw,
  FiSave,
  FiSettings,
  FiShield,
  FiSun,
  FiTerminal,
  FiTrash2,
  FiUsers,
  FiZap,
} from "react-icons/fi";

/* =========================================================
   DEVSYNC THEME SYSTEM
   Must stay synchronized with DemoLayout.jsx
========================================================= */

const THEMES = [
  {
    id: "light",
    name: "Light",
    description: "Clean, bright and professional",
    icon: FiSun,
    preview:
      "bg-white",
    accent: "bg-blue-600",
  },
  {
    id: "dark",
    name: "Dark",
    description: "Focused developer workspace",
    icon: FiMoon,
    preview:
      "bg-gradient-to-br from-zinc-950 via-zinc-900 to-indigo-950",
    accent: "bg-indigo-500",
  },
  {
    id: "midnight",
    name: "Midnight",
    description: "Deep blue with cool contrast",
    icon: FiMoon,
    preview:
      "bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900",
    accent: "bg-sky-400",
  },
  {
    id: "neon",
    name: "Neon",
    description: "Cyan, violet and electric glow",
    icon: FiZap,
    preview:
      "bg-gradient-to-br from-black via-violet-950 to-cyan-950",
    accent: "bg-cyan-400",
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk",
    description: "Magenta, yellow and sci-fi energy",
    icon: FiTerminal,
    preview:
      "bg-gradient-to-br from-black via-fuchsia-950 to-yellow-950",
    accent: "bg-fuchsia-500",
  },
  {
    id: "highContrast",
    name: "High Contrast",
    description: "Maximum clarity and accessibility",
    icon: FiEye,
    preview:
      "bg-black",
    accent: "bg-yellow-300",
  },
];

const STORAGE_KEY = "devsync-demo-theme";

const DEFAULT_SETTINGS = {
  appearance: "light",
  compactMode: false,
  animations: true,

  emailNotifications: true,
  taskNotifications: true,
  chatNotifications: true,
  activityNotifications: false,
  weeklyDigest: true,

  profileVisibility: "Everyone",
  activityVisibility: "Team members",
  showOnlineStatus: true,

  language: "English",
  timezone: "Asia/Kolkata",

  twoFactor: true,
};

/* =========================================================
   THEME HELPERS
========================================================= */

function getSavedTheme() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (
      stored &&
      THEMES.some((theme) => theme.id === stored)
    ) {
      return stored;
    }
  } catch {
    // Ignore storage errors.
  }

  return "light";
}

function applyTheme(themeId) {
  const validTheme = THEMES.some(
    (theme) => theme.id === themeId
  )
    ? themeId
    : "light";

  const root = document.documentElement;
  const body = document.body;

  root.dataset.theme = validTheme;
  root.dataset.demoTheme = validTheme;

  body.dataset.theme = validTheme;

  try {
    localStorage.setItem(
      STORAGE_KEY,
      validTheme
    );
  } catch {
    // Ignore storage errors.
  }

  return validTheme;
}

/* =========================================================
   TOGGLE
========================================================= */

function Toggle({ enabled, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      aria-pressed={enabled}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-all duration-200 ${
        enabled
          ? "bg-slate-950"
          : "bg-slate-200"
      }`}
    >
      <span
        className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
          enabled
            ? "translate-x-6"
            : "translate-x-1"
        }`}
      />
    </button>
  );
}

/* =========================================================
   SETTING ROW
========================================================= */

function SettingRow({
  icon: Icon,
  title,
  description,
  children,
  danger = false,
}) {
  return (
    <div
      className={`flex flex-col gap-4 rounded-2xl border p-4 sm:flex-row sm:items-center sm:justify-between ${
        danger
          ? "border-red-100 bg-red-50/40"
          : "border-slate-100 bg-slate-50/50"
      }`}
    >
      <div className="flex min-w-0 items-start gap-3">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
            danger
              ? "bg-red-100 text-red-600"
              : "bg-white text-slate-600 shadow-sm"
          }`}
        >
          <Icon size={15} />
        </div>

        <div className="min-w-0">
          <p
            className={`text-xs font-black ${
              danger
                ? "text-red-700"
                : "text-slate-800"
            }`}
          >
            {title}
          </p>

          <p className="mt-1 max-w-xl text-[10px] leading-5 text-slate-400">
            {description}
          </p>
        </div>
      </div>

      <div className="shrink-0">
        {children}
      </div>
    </div>
  );
}

/* =========================================================
   SECTION HEADER
========================================================= */

function SectionHeader({
  eyebrow,
  title,
  description,
}) {
  return (
    <div className="mb-6">
      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-600">
        {eyebrow}
      </p>

      <h2 className="mt-1 text-xl font-black tracking-tight text-slate-950">
        {title}
      </h2>

      <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-400">
        {description}
      </p>
    </div>
  );
}

/* =========================================================
   SELECT FIELD
========================================================= */

function SelectField({
  value,
  onChange,
  options,
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="appearance-none rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 pr-9 text-xs font-bold text-slate-700 outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>

      <FiChevronDown
        size={13}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
      />
    </div>
  );
}

/* =========================================================
   THEME CARD
========================================================= */

function ThemeCard({
  theme,
  active,
  onSelect,
}) {
  const Icon = theme.icon;

  return (
    <button
      type="button"
      onClick={() => onSelect(theme.id)}
      className={`group overflow-hidden rounded-2xl border text-left transition-all duration-200 ${
        active
          ? "border-slate-950 bg-slate-950 shadow-lg shadow-slate-950/10"
          : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
      }`}
    >
      {/* Preview */}

      <div
        className={`relative h-28 overflow-hidden ${theme.preview}`}
      >
        {theme.id === "light" && (
          <>
            <div className="absolute left-4 top-4 h-3 w-20 rounded-full bg-slate-200" />
            <div className="absolute left-4 top-11 h-8 w-16 rounded-lg bg-slate-100" />
            <div className="absolute right-4 top-4 h-16 w-20 rounded-xl border border-slate-200 bg-white" />
          </>
        )}

        {theme.id === "dark" && (
          <>
            <div className="absolute left-4 top-4 h-3 w-20 rounded-full bg-zinc-700" />
            <div className="absolute left-4 top-11 h-8 w-16 rounded-lg bg-zinc-800" />
            <div className="absolute right-4 top-4 h-16 w-20 rounded-xl border border-indigo-500/20 bg-zinc-900" />
          </>
        )}

        {theme.id === "midnight" && (
          <>
            <div className="absolute left-4 top-4 h-3 w-20 rounded-full bg-sky-400/70" />
            <div className="absolute left-4 top-11 h-8 w-16 rounded-lg bg-blue-900/60" />
            <div className="absolute right-4 top-4 h-16 w-20 rounded-xl border border-sky-400/30 bg-blue-950/60" />
          </>
        )}

        {theme.id === "neon" && (
          <>
            <div className="absolute left-4 top-4 h-3 w-20 rounded-full bg-cyan-400/80 shadow-[0_0_12px_rgba(34,211,238,0.7)]" />
            <div className="absolute left-4 top-11 h-8 w-16 rounded-lg border border-violet-400/40 bg-violet-500/20" />
            <div className="absolute right-4 top-4 h-16 w-20 rounded-xl border border-cyan-400/30 bg-cyan-400/10" />
          </>
        )}

        {theme.id === "cyberpunk" && (
          <>
            <div className="absolute left-4 top-4 h-3 w-20 rounded-full bg-fuchsia-500 shadow-[0_0_14px_rgba(217,70,239,0.75)]" />
            <div className="absolute left-4 top-11 h-8 w-16 rounded-lg border border-yellow-300/50 bg-fuchsia-500/10" />
            <div className="absolute right-4 top-4 h-16 w-20 rounded-xl border border-yellow-300/30 bg-yellow-300/10" />
          </>
        )}

        {theme.id === "highContrast" && (
          <>
            <div className="absolute left-4 top-4 h-3 w-20 rounded bg-white" />
            <div className="absolute left-4 top-11 h-8 w-16 rounded border-2 border-white bg-black" />
            <div className="absolute right-4 top-4 h-16 w-20 rounded border-2 border-yellow-300 bg-black" />
          </>
        )}
      </div>

      {/* Details */}

      <div className="flex items-center justify-between gap-3 p-4">
        <div>
          <div
            className={`flex items-center gap-2 text-xs font-black ${
              active
                ? "text-white"
                : "text-slate-900"
            }`}
          >
            <Icon size={14} />
            {theme.name}
          </div>

          <p
            className={`mt-1 text-[9px] font-semibold ${
              active
                ? "text-slate-400"
                : "text-slate-400"
            }`}
          >
            {theme.description}
          </p>
        </div>

        <div
          className={`flex h-5 w-5 items-center justify-center rounded-full border ${
            active
              ? "border-white bg-white text-slate-950"
              : "border-slate-200"
          }`}
        >
          {active && (
            <FiCheck size={11} />
          )}
        </div>
      </div>
    </button>
  );
}

/* =========================================================
   SECURITY SCORE
========================================================= */

function SecurityScore() {
  return (
    <div className="rounded-3xl bg-slate-950 p-6 text-white shadow-xl shadow-slate-950/10">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-emerald-300">
            <FiShield size={15} />

            <span className="text-[9px] font-black uppercase tracking-[0.18em]">
              Security score
            </span>
          </div>

          <h3 className="mt-3 text-2xl font-black">
            94 / 100
          </h3>

          <p className="mt-1 text-[10px] font-semibold text-slate-400">
            Your account is strongly protected.
          </p>
        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-400/10">
          <FiLock
            size={22}
            className="text-emerald-300"
          />
        </div>
      </div>

      <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
        <div className="h-full w-[94%] rounded-full bg-emerald-400" />
      </div>

      <div className="mt-3 flex items-center justify-between text-[9px] font-bold text-slate-500">
        <span>Protection level</span>
        <span className="text-emerald-300">
          Excellent
        </span>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN SETTINGS
========================================================= */

export default function DemoSettings() {
  const navigate = useNavigate();

  const [settings, setSettings] =
    useState(DEFAULT_SETTINGS);

  const [activeSection, setActiveSection] =
    useState("appearance");

  const [saved, setSaved] = useState(false);
  const [notice, setNotice] = useState("");
  const [confirmReset, setConfirmReset] =
    useState(false);

  const [activeTheme, setActiveTheme] =
    useState(getSavedTheme);

  /* =======================================================
     APPLY THEME WHEN SETTINGS PAGE OPENS
  ======================================================= */

  useEffect(() => {
    const currentTheme = applyTheme(
      activeTheme
    );

    setSettings((current) => ({
      ...current,
      appearance: currentTheme,
    }));
  }, [activeTheme]);

  /* =======================================================
     SETTINGS UPDATE
  ======================================================= */

  const updateSetting = (key, value) => {
    setSettings((current) => ({
      ...current,
      [key]: value,
    }));

    setSaved(false);
  };

  /* =======================================================
     TOAST
  ======================================================= */

  const showNotice = (message) => {
    setNotice(message);

    window.setTimeout(() => {
      setNotice("");
    }, 2800);
  };

  /* =======================================================
     SAVE
  ======================================================= */

  const handleSave = () => {
    try {
      localStorage.setItem(
        "devsync-demo-settings",
        JSON.stringify(settings)
      );
    } catch {
      // Ignore storage errors.
    }

    setSaved(true);
    showNotice(
      "Settings saved successfully"
    );
  };

  /* =======================================================
     RESET
  ======================================================= */

  const handleReset = () => {
    const defaultTheme =
      DEFAULT_SETTINGS.appearance;

    setSettings(DEFAULT_SETTINGS);
    setActiveTheme(defaultTheme);
    applyTheme(defaultTheme);

    try {
      localStorage.setItem(
        "devsync-demo-settings",
        JSON.stringify(DEFAULT_SETTINGS)
      );
    } catch {
      // Ignore storage errors.
    }

    setConfirmReset(false);
    setSaved(false);

    showNotice(
      "Demo settings restored"
    );
  };

  /* =======================================================
     THEME SELECTION
  ======================================================= */

  const handleThemeSelect = (themeId) => {
    const appliedTheme =
      applyTheme(themeId);

    setActiveTheme(appliedTheme);

    updateSetting(
      "appearance",
      appliedTheme
    );

    const selectedTheme =
      THEMES.find(
        (theme) =>
          theme.id === appliedTheme
      );

    showNotice(
      `${selectedTheme?.name || "Theme"} mode activated`
    );
  };

  return (
    <div
      className="min-h-full bg-[#f7f9fc] text-slate-900"
      style={{
        background:
          "var(--ds-bg)",
        color:
          "var(--ds-text)",
      }}
    >
      {/* ===================================================
          PAGE HEADER
      =================================================== */}

      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1800px] px-5 py-5 sm:px-7 lg:px-9">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-slate-400">
                <button
                  type="button"
                  onClick={() =>
                    navigate("/demo")
                  }
                  className="transition hover:text-slate-700"
                >
                  Dashboard
                </button>

                <FiChevronRight size={12} />

                <span className="text-slate-700">
                  Settings
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-2xl text-white shadow-lg"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--ds-brand), var(--ds-accent))",
                    boxShadow:
                      "0 12px 30px color-mix(in srgb, var(--ds-brand) 20%, transparent)",
                  }}
                >
                  <FiSettings size={20} />
                </div>

                <div>
                  <h1 className="text-2xl font-black tracking-tight text-slate-950">
                    Settings
                  </h1>

                  <p className="mt-0.5 text-xs font-medium text-slate-500">
                    Configure your DevSync workspace experience.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() =>
                  navigate("/demo")
                }
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-600 transition hover:bg-slate-50"
              >
                <FiArrowLeft size={14} />
                Dashboard
              </button>

              <button
                type="button"
                onClick={handleSave}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                {saved ? (
                  <FiCheck size={14} />
                ) : (
                  <FiSave size={14} />
                )}

                {saved
                  ? "Saved"
                  : "Save changes"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================
          PAGE BODY
      =================================================== */}

      <main className="mx-auto max-w-[1800px] px-5 py-6 sm:px-7 lg:px-9">
        <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">

          {/* =================================================
              SETTINGS NAV
          ================================================= */}

          <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-3 shadow-sm lg:sticky lg:top-6">
            <div className="mb-3 px-3 py-2">
              <p className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">
                Preferences
              </p>
            </div>

            <nav className="space-y-1">
              {[
                {
                  id: "appearance",
                  label: "Appearance",
                  description:
                    "Customize your workspace experience",
                  icon: FiSun,
                },
                {
                  id: "notifications",
                  label: "Notifications",
                  description:
                    "Control how DevSync keeps you updated",
                  icon: FiBell,
                },
                {
                  id: "privacy",
                  label: "Privacy",
                  description:
                    "Manage visibility and presence",
                  icon: FiShield,
                },
                {
                  id: "workspace",
                  label: "Workspace",
                  description:
                    "Language, timezone and interface",
                  icon: FiLayout,
                },
                {
                  id: "security",
                  label: "Security",
                  description:
                    "Account protection and sessions",
                  icon: FiLock,
                },
              ].map((item) => {
                const Icon = item.icon;
                const active =
                  activeSection ===
                  item.id;

                return (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() =>
                      setActiveSection(
                        item.id
                      )
                    }
                    className={`flex w-full items-center gap-3 rounded-2xl p-3 text-left transition ${
                      active
                        ? "bg-slate-950 text-white shadow-md"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                        active
                          ? "bg-white/10 text-white"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      <Icon size={15} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-black">
                        {item.label}
                      </p>

                      <p
                        className={`mt-0.5 truncate text-[8px] font-semibold ${
                          active
                            ? "text-slate-400"
                            : "text-slate-400"
                        }`}
                      >
                        {item.description}
                      </p>
                    </div>

                    <FiChevronRight
                      size={12}
                      className="ml-auto shrink-0 opacity-50"
                    />
                  </button>
                );
              })}
            </nav>

            <div className="mt-4 border-t border-slate-100 pt-4">
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-blue-600">
                  <FiInfo size={13} />

                  <span className="text-[9px] font-black uppercase tracking-wider">
                    Theme engine
                  </span>
                </div>

                <p className="mt-2 text-[9px] font-semibold leading-5 text-slate-400">
                  Theme changes are applied globally across the DevSync demo and are stored locally.
                </p>
              </div>
            </div>
          </aside>

          {/* =================================================
              MAIN SETTINGS
          ================================================= */}

          <div className="min-w-0">

            {/* =================================================
                APPEARANCE
            ================================================= */}

            {activeSection ===
              "appearance" && (
              <div className="space-y-6">

                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <SectionHeader
                    eyebrow="Interface"
                    title="Appearance"
                    description="Choose a visual mode for the entire DevSync workspace."
                  />

                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {THEMES.map(
                      (theme) => (
                        <ThemeCard
                          key={theme.id}
                          theme={theme}
                          active={
                            activeTheme ===
                            theme.id
                          }
                          onSelect={
                            handleThemeSelect
                          }
                        />
                      )
                    )}
                  </div>

                  <div
                    className="mt-5 flex items-start gap-3 rounded-2xl border p-4"
                    style={{
                      borderColor:
                        "color-mix(in srgb, var(--ds-brand) 18%, var(--ds-border))",
                      background:
                        "color-mix(in srgb, var(--ds-brand) 7%, var(--ds-surface))",
                    }}
                  >
                    <FiInfo
                      size={15}
                      className="mt-0.5 shrink-0"
                      style={{
                        color:
                          "var(--ds-brand)",
                      }}
                    />

                    <p
                      className="text-[10px] font-semibold leading-5"
                      style={{
                        color:
                          "var(--ds-text-secondary)",
                      }}
                    >
                      The selected theme is applied immediately to the global DevSync theme engine. It remains active after navigation and browser refresh.
                    </p>
                  </div>
                </section>

                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <SectionHeader
                    eyebrow="Experience"
                    title="Interface behavior"
                    description="Fine-tune how the demo workspace behaves."
                  />

                  <div className="space-y-3">
                    <SettingRow
                      icon={FiLayout}
                      title="Compact mode"
                      description="Reduce spacing and make more information visible at once."
                    >
                      <Toggle
                        enabled={
                          settings.compactMode
                        }
                        onChange={(value) =>
                          updateSetting(
                            "compactMode",
                            value
                          )
                        }
                      />
                    </SettingRow>

                    <SettingRow
                      icon={FiZap}
                      title="Animations"
                      description="Enable subtle transitions and motion throughout the interface."
                    >
                      <Toggle
                        enabled={
                          settings.animations
                        }
                        onChange={(value) =>
                          updateSetting(
                            "animations",
                            value
                          )
                        }
                      />
                    </SettingRow>
                  </div>
                </section>

                <section
                  className="rounded-3xl p-6 text-white shadow-xl"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--ds-surface-3), var(--ds-surface))",
                    border:
                      "1px solid var(--ds-border)",
                  }}
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div
                        className="flex items-center gap-2"
                        style={{
                          color:
                            "var(--ds-brand)",
                        }}
                      >
                        <FiMonitor size={15} />

                        <span className="text-[9px] font-black uppercase tracking-[0.18em]">
                          Active theme
                        </span>
                      </div>

                      <h3
                        className="mt-3 text-lg font-black"
                        style={{
                          color:
                            "var(--ds-text)",
                        }}
                      >
                        {
                          THEMES.find(
                            (theme) =>
                              theme.id ===
                              activeTheme
                          )?.name
                        }{" "}
                        mode
                      </h3>

                      <p
                        className="mt-1 max-w-xl text-[10px] leading-5"
                        style={{
                          color:
                            "var(--ds-text-muted)",
                        }}
                      >
                        DevSync is using the selected visual system across the current demo workspace.
                      </p>
                    </div>

                    <div
                      className="flex h-14 w-14 items-center justify-center rounded-2xl"
                      style={{
                        background:
                          "color-mix(in srgb, var(--ds-brand) 14%, transparent)",
                        color:
                          "var(--ds-brand)",
                      }}
                    >
                      <FiTerminal size={22} />
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* =================================================
                NOTIFICATIONS
            ================================================= */}

            {activeSection ===
              "notifications" && (
              <div className="space-y-6">
                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <SectionHeader
                    eyebrow="Communication"
                    title="Notifications"
                    description="Control how DevSync keeps you updated."
                  />

                  <div className="space-y-3">
                    <SettingRow
                      icon={FiBell}
                      title="Email notifications"
                      description="Receive important DevSync updates by email."
                    >
                      <Toggle
                        enabled={
                          settings.emailNotifications
                        }
                        onChange={(value) =>
                          updateSetting(
                            "emailNotifications",
                            value
                          )
                        }
                      />
                    </SettingRow>

                    <SettingRow
                      icon={FiActivity}
                      title="Task notifications"
                      description="Get notified when tasks are assigned or changed."
                    >
                      <Toggle
                        enabled={
                          settings.taskNotifications
                        }
                        onChange={(value) =>
                          updateSetting(
                            "taskNotifications",
                            value
                          )
                        }
                      />
                    </SettingRow>

                    <SettingRow
                      icon={FiUsers}
                      title="Chat notifications"
                      description="Show notifications for important project conversations."
                    >
                      <Toggle
                        enabled={
                          settings.chatNotifications
                        }
                        onChange={(value) =>
                          updateSetting(
                            "chatNotifications",
                            value
                          )
                        }
                      />
                    </SettingRow>

                    <SettingRow
                      icon={FiActivity}
                      title="Activity notifications"
                      description="Receive updates when important project activity happens."
                    >
                      <Toggle
                        enabled={
                          settings.activityNotifications
                        }
                        onChange={(value) =>
                          updateSetting(
                            "activityNotifications",
                            value
                          )
                        }
                      />
                    </SettingRow>

                    <SettingRow
                      icon={FiClock}
                      title="Weekly digest"
                      description="Receive a weekly summary of workspace activity."
                    >
                      <Toggle
                        enabled={
                          settings.weeklyDigest
                        }
                        onChange={(value) =>
                          updateSetting(
                            "weeklyDigest",
                            value
                          )
                        }
                      />
                    </SettingRow>
                  </div>
                </section>
              </div>
            )}

            {/* =================================================
                PRIVACY
            ================================================= */}

            {activeSection ===
              "privacy" && (
              <div className="space-y-6">
                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <SectionHeader
                    eyebrow="Privacy"
                    title="Privacy controls"
                    description="Manage visibility and presence within your DevSync workspace."
                  />

                  <div className="space-y-3">
                    <SettingRow
                      icon={FiEye}
                      title="Profile visibility"
                      description="Choose who can view your developer profile."
                    >
                      <SelectField
                        value={
                          settings.profileVisibility
                        }
                        onChange={(value) =>
                          updateSetting(
                            "profileVisibility",
                            value
                          )
                        }
                        options={[
                          "Everyone",
                          "Team members",
                          "Only me",
                        ]}
                      />
                    </SettingRow>

                    <SettingRow
                      icon={FiActivity}
                      title="Activity visibility"
                      description="Control who can see your project activity."
                    >
                      <SelectField
                        value={
                          settings.activityVisibility
                        }
                        onChange={(value) =>
                          updateSetting(
                            "activityVisibility",
                            value
                          )
                        }
                        options={[
                          "Everyone",
                          "Team members",
                          "Only me",
                        ]}
                      />
                    </SettingRow>

                    <SettingRow
                      icon={FiEye}
                      title="Show online status"
                      description="Allow teammates to see when you're active."
                    >
                      <Toggle
                        enabled={
                          settings.showOnlineStatus
                        }
                        onChange={(value) =>
                          updateSetting(
                            "showOnlineStatus",
                            value
                          )
                        }
                      />
                    </SettingRow>
                  </div>
                </section>

                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <SectionHeader
                    eyebrow="Public profile"
                    title="Visibility preview"
                    description="This is approximately how your profile appears to other users."
                  />

                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-950 text-lg font-black text-white">
                        AK
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-black text-slate-900">
                            Arjun Kumar
                          </h3>

                          <span className="rounded-full bg-blue-50 px-2 py-1 text-[8px] font-black text-blue-600">
                            PRO
                          </span>
                        </div>

                        <p className="mt-1 text-xs font-semibold text-slate-500">
                          @arjun-dev · Full Stack Developer
                        </p>

                        <div className="mt-2 flex items-center gap-2 text-[9px] font-bold text-emerald-600">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                          {settings.showOnlineStatus
                            ? "Online"
                            : "Status hidden"}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* =================================================
                WORKSPACE
            ================================================= */}

            {activeSection ===
              "workspace" && (
              <div className="space-y-6">
                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <SectionHeader
                    eyebrow="Workspace"
                    title="Workspace preferences"
                    description="Configure regional and interface preferences for your DevSync workspace."
                  />

                  <div className="space-y-3">
                    <SettingRow
                      icon={FiGlobe}
                      title="Language"
                      description="Choose the language used throughout the interface."
                    >
                      <SelectField
                        value={
                          settings.language
                        }
                        onChange={(value) =>
                          updateSetting(
                            "language",
                            value
                          )
                        }
                        options={[
                          "English",
                          "Kannada",
                          "Hindi",
                          "Tamil",
                        ]}
                      />
                    </SettingRow>

                    <SettingRow
                      icon={FiClock}
                      title="Timezone"
                      description="Used for activity timestamps, schedules and reminders."
                    >
                      <SelectField
                        value={
                          settings.timezone
                        }
                        onChange={(value) =>
                          updateSetting(
                            "timezone",
                            value
                          )
                        }
                        options={[
                          "Asia/Kolkata",
                          "UTC",
                          "America/New_York",
                          "Europe/London",
                          "Asia/Singapore",
                        ]}
                      />
                    </SettingRow>

                    <SettingRow
                      icon={FiTerminal}
                      title="Developer-friendly interface"
                      description="Keep code, repository and technical actions visually prominent."
                    >
                      <span
                        className="rounded-full px-3 py-1.5 text-[9px] font-black"
                        style={{
                          background:
                            "color-mix(in srgb, var(--ds-success) 12%, transparent)",
                          color:
                            "var(--ds-success)",
                        }}
                      >
                        ENABLED
                      </span>
                    </SettingRow>
                  </div>
                </section>

                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <SectionHeader
                    eyebrow="Workspace shortcuts"
                    title="Quick access"
                    description="Jump directly into common areas of the demo workspace."
                  />

                  <div className="grid gap-3 sm:grid-cols-2">
                    <Link
                      to="/demo/project/devsync"
                      className="group flex items-center justify-between rounded-2xl border border-slate-200 p-4 transition hover:-translate-y-0.5 hover:bg-slate-50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                          <FiGrid size={16} />
                        </div>

                        <div>
                          <p className="text-xs font-black text-slate-800">
                            Project overview
                          </p>

                          <p className="mt-1 text-[9px] text-slate-400">
                            DevSync project
                          </p>
                        </div>
                      </div>

                      <FiArrowRight
                        size={14}
                        className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-slate-700"
                      />
                    </Link>

                    <Link
                      to="/demo/project/devsync/tasks"
                      className="group flex items-center justify-between rounded-2xl border border-slate-200 p-4 transition hover:-translate-y-0.5 hover:bg-slate-50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                          <FiCheck size={16} />
                        </div>

                        <div>
                          <p className="text-xs font-black text-slate-800">
                            Task board
                          </p>

                          <p className="mt-1 text-[9px] text-slate-400">
                            Manage project work
                          </p>
                        </div>
                      </div>

                      <FiArrowRight
                        size={14}
                        className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-slate-700"
                      />
                    </Link>

                    <Link
                      to="/demo/project/devsync/team"
                      className="group flex items-center justify-between rounded-2xl border border-slate-200 p-4 transition hover:-translate-y-0.5 hover:bg-slate-50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                          <FiUsers size={16} />
                        </div>

                        <div>
                          <p className="text-xs font-black text-slate-800">
                            Team
                          </p>

                          <p className="mt-1 text-[9px] text-slate-400">
                            Collaborators
                          </p>
                        </div>
                      </div>

                      <FiArrowRight
                        size={14}
                        className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-slate-700"
                      />
                    </Link>

                    <Link
                      to="/demo/project/devsync/activity"
                      className="group flex items-center justify-between rounded-2xl border border-slate-200 p-4 transition hover:-translate-y-0.5 hover:bg-slate-50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                          <FiActivity size={16} />
                        </div>

                        <div>
                          <p className="text-xs font-black text-slate-800">
                            Activity
                          </p>

                          <p className="mt-1 text-[9px] text-slate-400">
                            Workspace timeline
                          </p>
                        </div>
                      </div>

                      <FiArrowRight
                        size={14}
                        className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-slate-700"
                      />
                    </Link>
                  </div>
                </section>
              </div>
            )}

            {/* =================================================
                SECURITY
            ================================================= */}

            {activeSection ===
              "security" && (
              <div className="space-y-6">
                <SecurityScore />

                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <SectionHeader
                    eyebrow="Protection"
                    title="Account security"
                    description="Review the security controls protecting your DevSync account."
                  />

                  <div className="space-y-3">
                    <SettingRow
                      icon={FiShield}
                      title="Two-factor authentication"
                      description="Require an additional verification step when signing in."
                    >
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[8px] font-black text-emerald-600">
                          ENABLED
                        </span>

                        <Toggle
                          enabled={
                            settings.twoFactor
                          }
                          onChange={(value) =>
                            updateSetting(
                              "twoFactor",
                              value
                            )
                          }
                        />
                      </div>
                    </SettingRow>

                    <SettingRow
                      icon={FiKey}
                      title="Password"
                      description="Last changed 24 days ago. A strong password is recommended."
                    >
                      <button
                        type="button"
                        onClick={() =>
                          showNotice(
                            "Password flow opened"
                          )
                        }
                        className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-[9px] font-black text-slate-600 transition hover:bg-slate-50"
                      >
                        Change
                      </button>
                    </SettingRow>

                    <SettingRow
                      icon={FiMonitor}
                      title="Active sessions"
                      description="Manage devices currently connected to your account."
                    >
                      <button
                        type="button"
                        onClick={() =>
                          showNotice(
                            "Session manager opened"
                          )
                        }
                        className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-[9px] font-black text-slate-600 transition hover:bg-slate-50"
                      >
                        Manage
                      </button>
                    </SettingRow>
                  </div>
                </section>

                <section className="rounded-3xl border border-red-100 bg-red-50/50 p-6">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
                      <FiAlertTriangle size={17} />
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-sm font-black text-red-700">
                        Danger zone
                      </h3>

                      <p className="mt-1 max-w-2xl text-[10px] leading-5 text-red-500/80">
                        This is a public demo, so destructive account actions are simulated and do not delete real data.
                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          showNotice(
                            "Account deletion is disabled in demo mode"
                          )
                        }
                        className="mt-4 inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-[10px] font-black text-red-600 transition hover:bg-red-50"
                      >
                        <FiTrash2 size={13} />
                        Delete account
                      </button>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* =================================================
                BOTTOM CONTROLS
            ================================================= */}

            <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-black text-slate-800">
                    Demo configuration
                  </p>

                  <p className="mt-1 text-[9px] font-semibold text-slate-400">
                    Restore the original DevSync demo preferences at any time.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setConfirmReset(true)
                    }
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2.5 text-[10px] font-bold text-slate-500 transition hover:bg-slate-50"
                  >
                    <FiRefreshCw size={13} />
                    Reset
                  </button>

                  <button
                    type="button"
                    onClick={handleSave}
                    className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-[10px] font-black text-white transition hover:bg-slate-800"
                  >
                    <FiSave size={13} />
                    Save preferences
                  </button>
                </div>
              </div>
            </section>

            <div className="flex flex-col items-center justify-between gap-3 pb-4 pt-5 text-[9px] font-semibold text-slate-400 sm:flex-row">
              <span>
                DevSync public demo · Settings
              </span>

              <span className="inline-flex items-center gap-1.5">
                <FiShield size={11} />
                Demo data only
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* =====================================================
          RESET CONFIRMATION
      ===================================================== */}

      {confirmReset && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/30 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
              <FiAlertTriangle size={20} />
            </div>

            <h2 className="mt-5 text-lg font-black text-slate-950">
              Reset demo settings?
            </h2>

            <p className="mt-2 text-xs leading-6 text-slate-400">
              This will restore appearance, notification, privacy, workspace and security preferences to their original demo values.
            </p>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() =>
                  setConfirmReset(false)
                }
                className="rounded-xl px-4 py-2.5 text-xs font-bold text-slate-500 transition hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800"
              >
                <FiRefreshCw size={13} />
                Reset settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          TOAST
      ===================================================== */}

      {notice && (
        <div className="fixed bottom-5 left-1/2 z-[120] -translate-x-1/2">
          <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-950 px-4 py-3 text-white shadow-2xl">
            <FiCheck
              size={14}
              className="text-emerald-400"
            />

            <span className="text-[10px] font-bold">
              {notice}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
