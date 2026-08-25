import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import {
  FaArrowLeft,
  FaBell,
  FaCheck,
  FaCode,
  FaEye,
  FaGlobe,
  FaLock,
  FaPalette,
  FaSave,
  FaUserFriends,
  FaUsers,
} from "react-icons/fa";

import { ThemeContext } from "../context/ThemeContext";

function DemoSettings() {
  const {
    theme,
    themes,
    changeTheme,
  } = useContext(ThemeContext);

  const [notifications, setNotifications] = useState(
    localStorage.getItem("devsyncNotifications") !== "disabled"
  );

  const [privacy, setPrivacy] = useState(
    localStorage.getItem("devsyncPrivacy") || "public"
  );

  const [saved, setSaved] = useState(false);


  useEffect(() => {
    localStorage.setItem(
      "devsyncNotifications",
      notifications ? "enabled" : "disabled"
    );
  }, [notifications]);


  const saveSettings = () => {
    localStorage.setItem(
      "devsyncNotifications",
      notifications ? "enabled" : "disabled"
    );

    localStorage.setItem(
      "devsyncPrivacy",
      privacy
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };


  const privacyOptions = [
    {
      id: "public",
      title: "Public",
      description: "Anyone can view your developer profile.",
      icon: <FaGlobe />,
    },

    {
      id: "private",
      title: "Private",
      description: "Only you can view your complete profile.",
      icon: <FaLock />,
    },

    {
      id: "closeFriends",
      title: "Close Friends",
      description: "Only your selected close friends can view it.",
      icon: <FaUserFriends />,
    },

    {
      id: "followers",
      title: "Only Followers",
      description: "Only people following you can view your profile.",
      icon: <FaUsers />,
    },
  ];


  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* =====================================================
          TOP NAVBAR
      ====================================================== */}

      <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-5 shadow-sm backdrop-blur-xl lg:px-8">

        <Link
          to="/demo"
          className="flex items-center gap-3"
        >

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-200">
            <FaCode />
          </div>

          <span className="text-2xl font-black tracking-tight">
            Dev<span className="text-blue-600">Sync</span>
          </span>

        </Link>


        <Link
          to="/demo"
          className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-bold text-slate-700 transition-all hover:bg-blue-50 hover:text-blue-600"
        >
          <FaArrowLeft />

          Back to Workspace
        </Link>

      </header>



      {/* =====================================================
          MAIN
      ====================================================== */}

      <main className="mx-auto max-w-6xl px-5 py-10 lg:px-8">

        {/* PAGE HEADER */}

        <div className="mb-10">

          <span className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-xs font-black uppercase tracking-widest text-blue-600">
            SYSTEM SETTINGS
          </span>

          <h1 className="mt-4 text-4xl font-black tracking-tight lg:text-5xl">
            Account Settings
          </h1>

          <p className="mt-3 max-w-2xl text-base text-slate-500">
            Personalize your DevSync workspace, control your
            privacy, and configure how other developers interact
            with your profile.
          </p>

        </div>



        {/* =====================================================
            APPEARANCE
        ====================================================== */}

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/40">

          {/* SECTION HEADER */}

          <div className="border-b border-slate-100 bg-gradient-to-r from-blue-50 via-white to-purple-50 px-6 py-6 lg:px-8">

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-2xl text-white shadow-lg">
                <FaPalette />
              </div>

              <div>

                <h2 className="text-2xl font-black">
                  Appearance
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Choose your DevSync theme
                </p>

              </div>

            </div>

          </div>



          {/* THEME GRID */}

          <div className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-4 lg:p-8">

            {Object.entries(themes).map(
              ([themeKey, themeData]) => {

                const selected = theme === themeKey;

                return (
                  <button
                    key={themeKey}
                    onClick={() => changeTheme(themeKey)}
                    className={`group relative overflow-hidden rounded-2xl border-2 p-5 text-left transition-all duration-300 ${
                      selected
                        ? "border-blue-500 bg-blue-50 shadow-xl shadow-blue-100"
                        : "border-slate-200 bg-white hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
                    }`}
                  >

                    {/* SELECTED BADGE */}

                    {selected && (
                      <div className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-xs text-white shadow-md">
                        <FaCheck />
                      </div>
                    )}


                    {/* ICON */}

                    <div
                      className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl text-3xl transition-transform duration-300 group-hover:scale-110 ${
                        selected
                          ? "bg-blue-600 shadow-lg"
                          : "bg-slate-100"
                      }`}
                    >
                      {themeData.icon}
                    </div>


                    {/* NAME */}

                    <h3 className="text-base font-black">
                      {themeData.name}
                    </h3>


                    {/* DESCRIPTION */}

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {themeData.description}
                    </p>

                  </button>
                );
              }
            )}

          </div>


          {/* THEME INFORMATION */}

          <div className="mx-6 mb-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 lg:mx-8">

            <div className="flex items-start gap-4">

              <FaEye className="mt-1 shrink-0 text-blue-600" />

              <div>

                <p className="font-bold">
                  Current theme:{" "}
                  <span className="text-blue-600">
                    {themes[theme]?.name}
                  </span>
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Your selected theme is automatically saved
                  and will remain active when you return.
                </p>

              </div>

            </div>

          </div>

        </section>



        {/* =====================================================
            ACCOUNT PRIVACY
        ====================================================== */}

        <section className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/40">

          {/* HEADER */}

          <div className="border-b border-slate-100 px-6 py-6 lg:px-8">

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-50 text-2xl text-cyan-600">
                <FaLock />
              </div>

              <div>

                <h2 className="text-2xl font-black">
                  Account Privacy
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Control who can view your developer profile
                  and workspace information.
                </p>

              </div>

            </div>

          </div>


          {/* PRIVACY OPTIONS */}

          <div className="grid gap-4 p-6 lg:grid-cols-2 lg:p-8">

            {privacyOptions.map((option) => {

              const selected =
                privacy === option.id;

              return (
                <button
                  key={option.id}
                  onClick={() => setPrivacy(option.id)}
                  className={`flex items-center gap-5 rounded-2xl border-2 p-5 text-left transition-all duration-300 ${
                    selected
                      ? "border-blue-500 bg-blue-50 shadow-lg shadow-blue-100"
                      : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
                  }`}
                >

                  {/* ICON */}

                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-xl ${
                      selected
                        ? "bg-blue-600 text-white shadow-lg"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {option.icon}
                  </div>


                  {/* TEXT */}

                  <div className="min-w-0 flex-1">

                    <div className="flex items-center justify-between gap-3">

                      <h3 className="font-black">
                        {option.title}
                      </h3>

                      {selected && (
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[10px] text-white">
                          <FaCheck />
                        </span>
                      )}

                    </div>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {option.description}
                    </p>

                  </div>

                </button>
              );
            })}

          </div>


          {/* PRIVACY NOTE */}

          <div className="mx-6 mb-6 rounded-2xl bg-slate-50 p-5 lg:mx-8">

            <p className="text-sm font-bold text-slate-700">
              🔐 Your privacy matters
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              You can change this setting at any time.
              Your privacy preference controls how your
              developer profile is presented to other users.
            </p>

          </div>

        </section>



        {/* =====================================================
            NOTIFICATIONS
        ====================================================== */}

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/40 lg:p-8">

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-xl text-blue-600">
              <FaBell />
            </div>

            <div>

              <h2 className="text-2xl font-black">
                Notifications
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Manage your DevSync workspace alerts.
              </p>

            </div>

          </div>


          <button
            onClick={() =>
              setNotifications(!notifications)
            }
            className="mt-6 flex w-full items-center justify-between rounded-2xl border border-slate-200 p-5 text-left transition-all hover:border-blue-300 hover:bg-slate-50"
          >

            <div>

              <p className="font-black">
                Project notifications
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Receive updates about tasks, chat,
                projects and team activity.
              </p>

            </div>


            {/* TOGGLE */}

            <span
              className={`relative h-7 w-12 shrink-0 rounded-full transition ${
                notifications
                  ? "bg-blue-600"
                  : "bg-slate-300"
              }`}
            >

              <span
                className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${
                  notifications
                    ? "left-6"
                    : "left-1"
                }`}
              />

            </span>

          </button>

        </section>



        {/* =====================================================
            SAVE BAR
        ====================================================== */}

        <div className="sticky bottom-5 z-10 mt-8 flex flex-col items-center justify-between gap-4 rounded-3xl border border-blue-200 bg-white/95 p-5 shadow-2xl shadow-blue-100 backdrop-blur-xl sm:flex-row">

          <div>

            <p className="font-black">

              {saved
                ? "✓ Settings saved successfully!"
                : "Ready to save your preferences?"}

            </p>

            <p className="mt-1 text-xs text-slate-500">
              Your theme and privacy settings are stored locally
              in this demo.
            </p>

          </div>


          <button
            onClick={saveSettings}
            className="flex items-center gap-3 rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-black text-white shadow-lg shadow-blue-200 transition-all hover:-translate-y-0.5 hover:bg-blue-700"
          >

            <FaSave />

            {saved
              ? "Saved"
              : "Save Settings"}

          </button>

        </div>

      </main>

    </div>
  );
}

export default DemoSettings;