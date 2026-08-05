import {
  Bell,
  Search,
  Moon,
  Sun,
  ChevronDown,
} from "lucide-react";

import { useState } from "react";

export default function TopNavbar() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm">

      {/* Left Side */}
      <div className="flex items-center gap-4">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search projects, tasks..."
            className="w-96 rounded-xl border border-slate-300 bg-slate-100 py-3 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:bg-white"
          />

        </div>

      </div>

      {/* Right Side */}

      <div className="flex items-center gap-5">

        {/* Theme Button */}

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="rounded-xl bg-slate-100 p-3 transition hover:bg-slate-200"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Notifications */}

        <button className="relative rounded-xl bg-slate-100 p-3 transition hover:bg-slate-200">

          <Bell size={20} />

          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500"></span>

        </button>

        {/* User */}

        <button className="flex items-center gap-3 rounded-xl bg-slate-100 px-3 py-2 transition hover:bg-slate-200">

          <img
            src="https://ui-avatars.com/api/?name=P+Shankar&background=2563eb&color=fff"
            alt="avatar"
            className="h-10 w-10 rounded-full"
          />

          <div className="text-left">

            <h4 className="font-semibold text-slate-800">
              P Shankar
            </h4>

            <p className="text-sm text-slate-500">
              Developer
            </p>

          </div>

          <ChevronDown size={18} />

        </button>

      </div>

    </header>
  );
}