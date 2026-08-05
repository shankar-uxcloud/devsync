import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  CheckSquare,
  MessageSquare,
  CalendarDays,
  FolderOpen,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Projects",
    path: "/projects",
    icon: FolderKanban,
  },
  {
    name: "Teams",
    path: "/teams",
    icon: Users,
  },
  {
    name: "Tasks",
    path: "/tasks",
    icon: CheckSquare,
  },
  {
    name: "Chat",
    path: "/chat",
    icon: MessageSquare,
  },
  {
    name: "Calendar",
    path: "/calendar",
    icon: CalendarDays,
  },
  {
    name: "Files",
    path: "/files",
    icon: FolderOpen,
  },
  {
    name: "Analytics",
    path: "/analytics",
    icon: BarChart3,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  return (
    <aside className="w-72 min-h-screen bg-slate-900 text-white flex flex-col shadow-2xl">

      {/* Logo */}
      <div className="h-20 flex items-center justify-center border-b border-slate-800">

        <h1 className="text-3xl font-extrabold tracking-wide">
          DevSync
        </h1>

      </div>

      {/* Navigation */}
      <nav className="flex-1 py-8">

        <ul className="space-y-2 px-4">

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-4 rounded-xl px-5 py-4 transition-all duration-300 ${
                      isActive
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }`
                  }
                >
                  <Icon size={22} />
                  <span className="font-medium">
                    {item.name}
                  </span>
                </NavLink>
              </li>
            );
          })}

        </ul>

      </nav>

      {/* Footer */}
      <div className="border-t border-slate-800 p-5">

        <button className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-red-400 transition hover:bg-red-500 hover:text-white">
          <LogOut size={22} />
          Logout
        </button>

      </div>

    </aside>
  );
}