import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiActivity,
  FiAlertTriangle,
  FiArrowLeft,
  FiBell,
  FiCheck,
  FiChevronDown,
  FiChevronRight,
  FiCode,
  FiEye,
  FiGlobe,
  FiInfo,
  FiKey,
  FiLayout,
  FiLock,
  FiMail,
  FiMonitor,
  FiMoon,
  FiSun,
  FiRefreshCw,
  FiSave,
  FiSettings,
  FiShield,
  FiSliders,
  FiTerminal,
  FiTrash2,
  FiUser,
  FiUsers,
  FiX,
  FiZap,
} from "react-icons/fi";

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

const NAV_ITEMS = [
  {
    id: "appearance",
    label: "Appearance",
    description: "Customize your workspace experience",
    icon: FiSun,
  },
  {
    id: "notifications",
    label: "Notifications",
    description: "Control how DevSync keeps you updated",
    icon: FiBell,
  },
  {
    id: "privacy",
    label: "Privacy",
    description: "Manage visibility and presence",
    icon: FiShield,
  },
  {
    id: "workspace",
    label: "Workspace",
    description: "Language, timezone and interface",
    icon: FiLayout,
  },
  {
    id: "security",
    label: "Security",
    description: "Account protection and sessions",
    icon: FiLock,
  },
];

const THEMES = [
  {
    id: "light",
    name: "Light",
    description: "Clean, bright and professional",
    icon: FiSun,
    preview: "bg-white",
  },
  {
    id: "dark",
    name: "Dark",
    description: "Focused experience for developers",
    icon: FiMoon,
    preview: "bg-slate-950",
  },
  {
    id: "neon",
    name: "Neon",
    description: "High-energy developer workspace",
    icon: FiZap,
    preview: "bg-gradient-to-br from-slate-950 via-violet-950 to-cyan-950",
  },
];

function Toggle({ enabled, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      aria-pressed={enabled}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-all duration-200 ${
        enabled ? "bg-slate-950" : "bg-slate-200"
      }`}
    >
      <span
        className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

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
              danger ? "text-red-700" : "text-slate-800"
            }`}
          >
            {title}
          </p>

          <p className="mt-1 max-w-xl text-[10px] leading-5 text-slate-400">
            {description}
          </p>
        </div>
      </div>

      <div className="shrink-0">{children}</div>
    </div>
  );
}

function SectionHeader({ eyebrow, title, description }) {
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

function SelectField({ value, onChange, options }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="appearance-none rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 pr-9 text-xs font-bold text-slate-700 outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
      >
        {options.map((option) => (
          <option key={option} value={option}>
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

function ThemeCard({ theme, active, onSelect }) {
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
      <div className={`h-24 ${theme.preview} relative overflow-hidden`}>
        {theme.id === "light" && (
          <>
            <div className="absolute left-4 top-4 h-3 w-20 rounded-full bg-slate-200" />
            <div className="absolute left-4 top-11 h-8 w-16 rounded-lg bg-slate-100" />
            <div className="absolute right-4 top-4 h-16 w-20 rounded-xl border border-slate-200 bg-white" />
          </>
        )}

        {theme.id === "dark" && (
          <>
            <div className="absolute left-4 top-4 h-3 w-20 rounded-full bg-slate-700" />
            <div className="absolute left-4 top-11 h-8 w-16 rounded-lg bg-slate-800" />
            <div className="absolute right-4 top-4 h-16 w-20 rounded-xl border border-slate-700 bg-slate-900" />
          </>
        )}

        {theme.id === "neon" && (
          <>
            <div className="absolute left-4 top-4 h-3 w-20 rounded-full bg-cyan-400/70" />
            <div className="absolute left-4 top-11 h-8 w-16 rounded-lg border border-violet-400/40 bg-violet-500/20" />
            <div className="absolute right-4 top-4 h-16 w-20 rounded-xl border border-cyan-400/30 bg-cyan-400/10" />
          </>
        )}
      </div>

      <div className="flex items-center justify-between gap-3 p-4">
        <div>
          <div
            className={`flex items-center gap-2 text-xs font-black ${
              active ? "text-white" : "text-slate-900"
            }`}
          >
            <Icon size={14} />
            {theme.name}
          </div>

          <p
            className={`mt-1 text-[9px] font-semibold ${
              active ? "text-slate-400" : "text-slate-400"
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
          {active && <FiCheck size={11} />}
        </div>
      </div>
    </button>
  );
}

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

          <h3 className="mt-3 text-2xl font-black">94 / 100</h3>

          <p className="mt-1 text-[10px] font-semibold text-slate-400">
            Your account is strongly protected.
          </p>
        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-400/10">
          <FiLock size={22} className="text-emerald-300" />
        </div>
      </div>

      <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
        <div className="h-full w-[94%] rounded-full bg-emerald-400" />
      </div>

      <div className="mt-3 flex items-center justify-between text-[9px] font-bold text-slate-500">
        <span>Protection level</span>
        <span className="text-emerald-300">Excellent</span>
      </div>
    </div>
  );
}

export default function DemoSettings() {
  const navigate = useNavigate();

  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [activeSection, setActiveSection] = useState("appearance");
  const [saved, setSaved] = useState(false);
  const [notice, setNotice] = useState("");
  const [confirmReset, setConfirmReset] = useState(false);

  const updateSetting = (key, value) => {
    setSettings((current) => ({
      ...current,
      [key]: value,
    }));

    setSaved(false);
  };

  const showNotice = (message) => {
    setNotice(message);

    window.setTimeout(() => {
      setNotice("");
    }, 2800);
  };

  const handleSave = () => {
    setSaved(true);
    showNotice("Settings saved successfully");
  };

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
    setConfirmReset(false);
    setSaved(false);
    showNotice("Demo settings restored");
  };

  const handleThemeSelect = (theme) => {
    updateSetting("appearance", theme);

    if (theme === "dark") {
      showNotice("Dark mode selected — theme engine ready");
    } else if (theme === "neon") {
      showNotice("Neon mode selected — theme engine ready");
    } else {
      showNotice("Light mode selected");
    }
  };

  return (
    <div className="min-h-full bg-[#f7f9fc] text-slate-900">
      {/* Page header */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1800px] px-5 py-5 sm:px-7 lg:px-9">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-slate-400">
                <button
                  type="button"
                  onClick={() => navigate("/demo")}
                  className="transition hover:text-slate-700"
                >
                  Dashboard
                </button>

                <FiChevronRight size={12} />

                <span className="text-slate-700">Settings</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-950/10">
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
                onClick={() => navigate("/demo")}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-600 transition hover:bg-slate-50"
              >
                <FiArrowLeft size={14} />
                Dashboard
              </button>

              <button
                type="button"
                onClick={handleSave}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                {saved ? <FiCheck size={14} /> : <FiSave size={14} />}
                {saved ? "Saved" : "Save changes"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-[1800px] px-5 py-6 sm:px-7 lg:px-9">
        <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          {/* Settings navigation */}
          <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-3 shadow-sm lg:sticky lg:top-6">
            <div className="mb-3 px-3 py-2">
              <p className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">
                Preferences
              </p>
            </div>

            <nav className="space-y-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const active = activeSection === item.id;

                return (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`flex w-full items-center gap-3 rounded-2xl p-3 text-left transition ${
                      active
                        ? "bg-slate-950 text-white shadow-md shadow-slate-950/10"
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
                    Demo mode
                  </span>
                </div>

                <p className="mt-2 text-[9px] font-semibold leading-5 text-slate-400">
                  Changes here are local demo preferences. They do not affect
                  a real account.
                </p>
              </div>
            </div>
          </aside>

          {/* Main settings content */}
          <div className="min-w-0">
            {/* Appearance */}
            {activeSection === "appearance" && (
              <div className="space-y-6">
                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <SectionHeader
                    eyebrow="Interface"
                    title="Appearance"
                    description="Choose how your DevSync workspace looks and feels."
                  />

                  <div className="grid gap-4 md:grid-cols-3">
                    {THEMES.map((theme) => (
                      <ThemeCard
                        key={theme.id}
                        theme={theme}
                        active={settings.appearance === theme.id}
                        onSelect={handleThemeSelect}
                      />
                    ))}
                  </div>

                  <div className="mt-5 flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-4">
                    <FiInfo
                      size={15}
                      className="mt-0.5 shrink-0 text-blue-600"
                    />

                    <p className="text-[10px] font-semibold leading-5 text-blue-700">
                      Light mode is the default experience. Dark and Neon are
                      already prepared in the UI so the global theme engine can
                      be connected next.
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
                        enabled={settings.compactMode}
                        onChange={(value) =>
                          updateSetting("compactMode", value)
                        }
                      />
                    </SettingRow>

                    <SettingRow
                      icon={FiZap}
                      title="Animations"
                      description="Enable subtle transitions and motion throughout the interface."
                    >
                      <Toggle
                        enabled={settings.animations}
                        onChange={(value) =>
                          updateSetting("animations", value)
                        }
                      />
                    </SettingRow>
                  </div>
                </section>

                <section className="rounded-3xl bg-slate-950 p-6 text-white shadow-xl shadow-slate-950/10">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-blue-300">
                        <FiMonitor size={15} />

                        <span className="text-[9px] font-black uppercase tracking-[0.18em]">
                          Theme architecture
                        </span>
                      </div>

                      <h3 className="mt-3 text-lg font-black">
                        One theme system. Entire workspace.
                      </h3>

                      <p className="mt-2 max-w-xl text-[10px] leading-5 text-slate-400">
                        The next DevSync upgrade will connect this preference
                        to the global DemoLayout so every page responds to the
                        same theme.
                      </p>
                    </div>

                    <div className="rounded-2xl bg-white/5 p-4">
                      <FiSun size={22} className="text-blue-300" />
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* Notifications */}
            {activeSection === "notifications" && (
              <div className="space-y-6">
                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <SectionHeader
                    eyebrow="Communication"
                    title="Notifications"
                    description="Choose which DevSync events deserve your attention."
                  />

                  <div className="space-y-3">
                    <SettingRow
                      icon={FiMail}
                      title="Email notifications"
                      description="Receive important workspace updates by email."
                    >
                      <Toggle
                        enabled={settings.emailNotifications}
                        onChange={(value) =>
                          updateSetting("emailNotifications", value)
                        }
                      />
                    </SettingRow>

                    <SettingRow
                      icon={FiCheck}
                      title="Task updates"
                      description="Notify me when assigned tasks change status."
                    >
                      <Toggle
                        enabled={settings.taskNotifications}
                        onChange={(value) =>
                          updateSetting("taskNotifications", value)
                        }
                      />
                    </SettingRow>

                    <SettingRow
                      icon={FiMessageCircle}
                      title="Chat messages"
                      description="Notify me about direct messages and mentions."
                    >
                      <Toggle
                        enabled={settings.chatNotifications}
                        onChange={(value) =>
                          updateSetting("chatNotifications", value)
                        }
                      />
                    </SettingRow>

                    <SettingRow
                      icon={FiActivity}
                      title="Project activity"
                      description="Receive updates about repository and workspace activity."
                    >
                      <Toggle
                        enabled={settings.activityNotifications}
                        onChange={(value) =>
                          updateSetting("activityNotifications", value)
                        }
                      />
                    </SettingRow>

                    <SettingRow
                      icon={FiCalendar}
                      title="Weekly digest"
                      description="Receive a weekly summary of project progress and activity."
                    >
                      <Toggle
                        enabled={settings.weeklyDigest}
                        onChange={(value) =>
                          updateSetting("weeklyDigest", value)
                        }
                      />
                    </SettingRow>
                  </div>
                </section>

                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <SectionHeader
                    eyebrow="Notification preview"
                    title="What you'll receive"
                    description="A quick preview of the DevSync notification experience."
                  />

                  <div className="space-y-3">
                    <div className="flex items-start gap-3 rounded-2xl border border-slate-100 p-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                        <FiCheckCircle size={15} />
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs font-black text-slate-800">
                          Task completed
                        </p>

                        <p className="mt-1 text-[10px] leading-5 text-slate-400">
                          Priya completed “Responsive navigation”.
                        </p>
                      </div>

                      <span className="ml-auto text-[9px] font-bold text-slate-400">
                        Now
                      </span>
                    </div>

                    <div className="flex items-start gap-3 rounded-2xl border border-slate-100 p-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                        <FiGitBranch size={15} />
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs font-black text-slate-800">
                          New commit
                        </p>

                        <p className="mt-1 text-[10px] leading-5 text-slate-400">
                          Arjun pushed a commit to main.
                        </p>
                      </div>

                      <span className="ml-auto text-[9px] font-bold text-slate-400">
                        12m
                      </span>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* Privacy */}
            {activeSection === "privacy" && (
              <div className="space-y-6">
                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <SectionHeader
                    eyebrow="Visibility"
                    title="Privacy & presence"
                    description="Control what other people can see about your DevSync identity."
                  />

                  <div className="space-y-3">
                    <SettingRow
                      icon={FiGlobe}
                      title="Profile visibility"
                      description="Choose who can view your public developer profile."
                    >
                      <SelectField
                        value={settings.profileVisibility}
                        onChange={(value) =>
                          updateSetting("profileVisibility", value)
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
                        value={settings.activityVisibility}
                        onChange={(value) =>
                          updateSetting("activityVisibility", value)
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
                        enabled={settings.showOnlineStatus}
                        onChange={(value) =>
                          updateSetting("showOnlineStatus", value)
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

            {/* Workspace */}
            {activeSection === "workspace" && (
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
                        value={settings.language}
                        onChange={(value) =>
                          updateSetting("language", value)
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
                        value={settings.timezone}
                        onChange={(value) =>
                          updateSetting("timezone", value)
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
                      <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-[9px] font-black text-emerald-600">
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

            {/* Security */}
            {activeSection === "security" && (
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
                          enabled={settings.twoFactor}
                          onChange={(value) =>
                            updateSetting("twoFactor", value)
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
                        onClick={() => showNotice("Password flow opened")}
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
                        onClick={() => showNotice("Session manager opened")}
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
                        This is a public demo, so destructive account actions
                        are intentionally simulated and will not delete real
                        data.
                      </p>

                      <button
                        type="button"
                        onClick={() => showNotice("Account deletion is disabled in demo mode")}
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

            {/* Bottom controls */}
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
                    onClick={() => setConfirmReset(true)}
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
              <span>DevSync public demo · Settings</span>

              <span className="inline-flex items-center gap-1.5">
                <FiShield size={11} />
                Demo data only
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Reset confirmation */}
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
              This will restore all appearance, notification, privacy,
              workspace and security preferences to their original demo
              values.
            </p>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setConfirmReset(false)}
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

      {/* Toast */}
      {notice && (
        <div className="fixed bottom-5 left-1/2 z-[120] -translate-x-1/2">
          <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-950 px-4 py-3 text-white shadow-2xl">
            <FiCheck size={14} className="text-emerald-400" />

            <span className="text-[10px] font-bold">{notice}</span>
          </div>
        </div>
      )}
    </div>
  );
}