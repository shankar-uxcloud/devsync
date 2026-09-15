import React, { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FiActivity,
  FiArrowLeft,
  FiArrowRight,
  FiBox,
  FiCalendar,
  FiCheck,
  FiChevronDown,
  FiChevronRight,
  FiCode,
  FiCopy,
  FiDownload,
  FiEdit3,
  FiExternalLink,
  FiFile,
  FiFileText,
  FiFolder,
  FiFolderPlus,
  FiGitBranch,
  FiGithub,
  FiImage,
  FiInfo,
  FiLock,
  FiMenu,
  FiMoreHorizontal,
  FiPackage,
  FiPlus,
  FiRefreshCw,
  FiSearch,
  FiSettings,
  FiShare2,
  FiShield,
  FiStar,
  FiTerminal,
  FiTrash2,
  FiUpload,
  FiUsers,
  FiX,
  FiZap,
} from "react-icons/fi";

const INITIAL_ITEMS = [
  {
    id: "src",
    name: "src",
    type: "folder",
    parent: "root",
    modified: "2 hours ago",
    author: "Arjun",
  },
  {
    id: "components",
    name: "components",
    type: "folder",
    parent: "src",
    modified: "3 hours ago",
    author: "Priya",
  },
  {
    id: "pages",
    name: "pages",
    type: "folder",
    parent: "src",
    modified: "4 hours ago",
    author: "Arjun",
  },
  {
    id: "services",
    name: "services",
    type: "folder",
    parent: "src",
    modified: "Yesterday",
    author: "Rahul",
  },
  {
    id: "assets",
    name: "assets",
    type: "folder",
    parent: "src",
    modified: "Yesterday",
    author: "Sneha",
  },
  {
    id: "public",
    name: "public",
    type: "folder",
    parent: "root",
    modified: "Yesterday",
    author: "Kiran",
  },
  {
    id: "server",
    name: "server",
    type: "folder",
    parent: "root",
    modified: "5 hours ago",
    author: "Rahul",
  },
  {
    id: "components-ui",
    name: "ui",
    type: "folder",
    parent: "components",
    modified: "2 hours ago",
    author: "Priya",
  },
  {
    id: "button-jsx",
    name: "Button.jsx",
    type: "jsx",
    parent: "components",
    modified: "2 hours ago",
    author: "Priya",
    size: "4.2 KB",
  },
  {
    id: "modal-jsx",
    name: "Modal.jsx",
    type: "jsx",
    parent: "components",
    modified: "3 hours ago",
    author: "Priya",
    size: "6.8 KB",
  },
  {
    id: "navbar-jsx",
    name: "Navbar.jsx",
    type: "jsx",
    parent: "components",
    modified: "Yesterday",
    author: "Arjun",
    size: "8.1 KB",
  },
  {
    id: "dashboard-jsx",
    name: "Dashboard.jsx",
    type: "jsx",
    parent: "pages",
    modified: "1 hour ago",
    author: "Arjun",
    size: "14.7 KB",
  },
  {
    id: "project-jsx",
    name: "ProjectOverview.jsx",
    type: "jsx",
    parent: "pages",
    modified: "2 hours ago",
    author: "Arjun",
    size: "18.2 KB",
  },
  {
    id: "tasks-jsx",
    name: "TaskBoard.jsx",
    type: "jsx",
    parent: "pages",
    modified: "3 hours ago",
    author: "Priya",
    size: "21.4 KB",
  },
  {
    id: "chat-jsx",
    name: "ProjectChat.jsx",
    type: "jsx",
    parent: "pages",
    modified: "4 hours ago",
    author: "Arjun",
    size: "26.8 KB",
  },
  {
    id: "api-js",
    name: "api.js",
    type: "js",
    parent: "services",
    modified: "Yesterday",
    author: "Rahul",
    size: "7.4 KB",
  },
  {
    id: "auth-js",
    name: "auth.js",
    type: "js",
    parent: "services",
    modified: "Yesterday",
    author: "Rahul",
    size: "5.8 KB",
  },
  {
    id: "logo-svg",
    name: "logo.svg",
    type: "svg",
    parent: "assets",
    modified: "2 days ago",
    author: "Sneha",
    size: "2.1 KB",
  },
  {
    id: "favicon",
    name: "favicon.svg",
    type: "svg",
    parent: "public",
    modified: "2 days ago",
    author: "Sneha",
    size: "1.2 KB",
  },
  {
    id: "server-index",
    name: "index.js",
    type: "js",
    parent: "server",
    modified: "5 hours ago",
    author: "Rahul",
    size: "9.6 KB",
  },
  {
    id: "server-routes",
    name: "routes.js",
    type: "js",
    parent: "server",
    modified: "Yesterday",
    author: "Rahul",
    size: "11.3 KB",
  },
  {
    id: "package",
    name: "package.json",
    type: "json",
    parent: "root",
    modified: "6 hours ago",
    author: "Kiran",
    size: "2.7 KB",
  },
  {
    id: "readme",
    name: "README.md",
    type: "md",
    parent: "root",
    modified: "Yesterday",
    author: "Arjun",
    size: "8.4 KB",
  },
  {
    id: "env-example",
    name: ".env.example",
    type: "env",
    parent: "root",
    modified: "2 days ago",
    author: "Rahul",
    size: "0.8 KB",
  },
  {
    id: "vite",
    name: "vite.config.js",
    type: "js",
    parent: "root",
    modified: "3 days ago",
    author: "Kiran",
    size: "1.6 KB",
  },
];

const INITIAL_FOLDERS = [
  {
    id: "src",
    name: "src",
    parent: "root",
  },
  {
    id: "components",
    name: "components",
    parent: "src",
  },
  {
    id: "pages",
    name: "pages",
    parent: "src",
  },
  {
    id: "services",
    name: "services",
    parent: "src",
  },
  {
    id: "assets",
    name: "assets",
    parent: "src",
  },
  {
    id: "public",
    name: "public",
    parent: "root",
  },
  {
    id: "server",
    name: "server",
    parent: "root",
  },
];

const FILE_TYPES = [
  "All",
  "React",
  "JavaScript",
  "JSON",
  "Markdown",
  "SVG",
  "Config",
];

const FILE_TYPE_MAP = {
  jsx: "React",
  js: "JavaScript",
  json: "JSON",
  md: "Markdown",
  svg: "SVG",
  env: "Config",
};

const CODE_PREVIEWS = {
  "Dashboard.jsx": `import React from "react";

export default function Dashboard() {
  return (
    <main className="dashboard">
      <section className="stats">
        <ProjectStats />
        <ActivityFeed />
      </section>

      <ProjectGrid />
    </main>
  );
}`,
  "ProjectOverview.jsx": `const project = {
  name: "DevSync",
  status: "Active",
  progress: 78,
  team: 6,
};

export default project;`,
  "TaskBoard.jsx": `const columns = [
  "Todo",
  "In Progress",
  "Review",
  "Done",
];

export function moveTask(task, status) {
  return {
    ...task,
    status,
  };
}`,
  "ProjectChat.jsx": `const sendMessage = (text) => {
  if (!text.trim()) return;

  socket.emit("message:send", {
    projectId,
    text,
  });
};`,
  "api.js": `export const api = {
  async getProjects() {
    return request("/projects");
  },

  async getTasks(projectId) {
    return request(\`/projects/\${projectId}/tasks\`);
  },
};`,
  "auth.js": `export async function login(email, password) {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  return response.data;
}`,
  "package.json": `{
  "name": "devsync",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}`,
  "README.md": `# DevSync

A modern developer collaboration
platform for projects, tasks,
team communication and GitHub
workflows.`,
};

const COMMIT_ACTIVITY = [
  {
    hash: "a91f2c8",
    message: "feat: improve project dashboard",
    author: "Arjun",
    time: "1 hour ago",
  },
  {
    hash: "72bc910",
    message: "fix: responsive task board",
    author: "Priya",
    time: "3 hours ago",
  },
  {
    hash: "e83ad41",
    message: "feat: add project chat",
    author: "Rahul",
    time: "4 hours ago",
  },
];

function FileIcon({ type, size = 17 }) {
  if (type === "folder") {
    return <FiFolder size={size} />;
  }

  if (type === "jsx") {
    return <FiCode size={size} />;
  }

  if (type === "js") {
    return <FiTerminal size={size} />;
  }

  if (type === "json") {
    return <FiBox size={size} />;
  }

  if (type === "md") {
    return <FiFileText size={size} />;
  }

  if (type === "svg") {
    return <FiImage size={size} />;
  }

  if (type === "env") {
    return <FiSettings size={size} />;
  }

  return <FiFile size={size} />;
}

function Avatar({ initials, size = "sm" }) {
  const sizes = {
    sm: "h-7 w-7 text-[9px]",
    md: "h-8 w-8 text-[10px]",
    lg: "h-10 w-10 text-xs",
  };

  return (
    <div
      className={`${sizes[size]} flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-slate-950 via-slate-800 to-slate-600 font-black text-white shadow-sm`}
    >
      {initials}
    </div>
  );
}

function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function FileTypeBadge({ type }) {
  const labels = {
    jsx: "JSX",
    js: "JS",
    json: "JSON",
    md: "MD",
    svg: "SVG",
    env: "ENV",
  };

  return (
    <span className="rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-mono text-[8px] font-black text-slate-500">
      {labels[type] || "FILE"}
    </span>
  );
}

function CreateFolderModal({ onClose, onCreate }) {
  const [name, setName] = useState("");

  const submit = (event) => {
    event.preventDefault();

    if (!name.trim()) return;

    onCreate(name.trim());
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/30 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">
              Repository
            </p>

            <h2 className="mt-1 text-xl font-black text-slate-950">
              Create folder
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <FiX size={18} />
          </button>
        </div>

        <form onSubmit={submit} className="p-6">
          <label className="mb-2 block text-xs font-bold text-slate-700">
            Folder name
          </label>

          <div className="relative">
            <FiFolder
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              autoFocus
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. hooks"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm font-semibold outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
            />
          </div>

          <div className="mt-5 flex justify-end gap-2 border-t border-slate-100 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-4 py-2.5 text-xs font-bold text-slate-500 hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800"
            >
              <FiFolderPlus size={14} />
              Create folder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FilePreview({ item, onClose, onCopy }) {
  if (!item) return null;

  const preview =
    CODE_PREVIEWS[item.name] ||
    `// ${item.name}

export default function Example() {
  return null;
}`;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/30 p-4 backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
              <FileIcon type={item.type} size={17} />
            </div>

            <div className="min-w-0">
              <h3 className="truncate text-sm font-black text-slate-950">
                {item.name}
              </h3>

              <p className="text-[9px] font-semibold text-slate-400">
                Preview · {item.size || "Folder"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => onCopy(preview)}
              className="rounded-xl p-2.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              title="Copy"
            >
              <FiCopy size={15} />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl p-2.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            >
              <FiX size={17} />
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-auto bg-[#0f172a]">
          <div className="border-b border-white/10 bg-[#111c31] px-5 py-3">
            <div className="flex items-center gap-2">
              <FiCode size={13} className="text-blue-300" />

              <span className="font-mono text-[9px] font-bold text-slate-400">
                {item.name}
              </span>
            </div>
          </div>

          <pre className="overflow-auto p-5 font-mono text-[10px] leading-6 text-slate-300 sm:p-7">
            {preview}
          </pre>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 bg-white px-5 py-3">
          <div className="flex items-center gap-2 text-[9px] font-semibold text-slate-400">
            <FiInfo size={12} />
            Read-only demo preview
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-slate-950 px-4 py-2 text-[10px] font-bold text-white hover:bg-slate-800"
          >
            Close preview
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProjectFiles() {
  const { projectId = "devsync" } = useParams();
  const navigate = useNavigate();

  const [items, setItems] = useState(INITIAL_ITEMS);
  const [folders, setFolders] = useState(INITIAL_FOLDERS);
  const [currentFolder, setCurrentFolder] = useState("root");
  const [search, setSearch] = useState("");
  const [fileType, setFileType] = useState("All");
  const [view, setView] = useState("grid");
  const [selectedItem, setSelectedItem] = useState(null);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [notice, setNotice] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  const currentFolderName =
    currentFolder === "root"
      ? "devsync"
      : folders.find((folder) => folder.id === currentFolder)?.name ||
        "devsync";

  const breadcrumbs = useMemo(() => {
    if (currentFolder === "root") {
      return [{ id: "root", name: "devsync" }];
    }

    const chain = [];
    let cursor = currentFolder;

    while (cursor && cursor !== "root") {
      const folder = folders.find((item) => item.id === cursor);

      if (!folder) break;

      chain.unshift({
        id: folder.id,
        name: folder.name,
      });

      cursor = folder.parent;
    }

    return [{ id: "root", name: "devsync" }, ...chain];
  }, [currentFolder, folders]);

  const visibleItems = useMemo(() => {
    const query = search.trim().toLowerCase();

    return items
      .filter((item) => item.parent === currentFolder)
      .filter((item) => {
        if (!query) return true;

        return (
          item.name.toLowerCase().includes(query) ||
          item.author.toLowerCase().includes(query)
        );
      })
      .filter((item) => {
        if (fileType === "All") return true;

        if (item.type === "folder") {
          return fileType === "All";
        }

        return FILE_TYPE_MAP[item.type] === fileType;
      })
      .sort((a, b) => {
        if (a.type === "folder" && b.type !== "folder") return -1;
        if (a.type !== "folder" && b.type === "folder") return 1;

        return a.name.localeCompare(b.name);
      });
  }, [items, currentFolder, search, fileType]);

  const totalFiles = items.filter((item) => item.type !== "folder").length;
  const totalFolders = items.filter((item) => item.type === "folder").length;

  const recentFiles = items
    .filter((item) => item.type !== "folder")
    .slice(0, 5);

  const showNotice = (text) => {
    setNotice(text);

    window.setTimeout(() => {
      setNotice("");
    }, 2800);
  };

  const openFolder = (folderId) => {
    setCurrentFolder(folderId);
    setSearch("");
    setFileType("All");
    setSelectedRows([]);
  };

  const openItem = (item) => {
    if (item.type === "folder") {
      openFolder(item.id);
      return;
    }

    setSelectedItem(item);
  };

  const toggleRow = (id) => {
    setSelectedRows((current) =>
      current.includes(id)
        ? current.filter((itemId) => itemId !== id)
        : [...current, id]
    );
  };

  const toggleAll = () => {
    const ids = visibleItems.map((item) => item.id);

    if (ids.every((id) => selectedRows.includes(id))) {
      setSelectedRows((current) =>
        current.filter((id) => !ids.includes(id))
      );
    } else {
      setSelectedRows((current) => [
        ...new Set([...current, ...ids]),
      ]);
    }
  };

  const createFolder = (name) => {
    const baseId = `${name.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`;

    const newFolder = {
      id: baseId,
      name,
      type: "folder",
      parent: currentFolder,
      modified: "Just now",
      author: "You",
    };

    setItems((current) => [...current, newFolder]);

    setFolders((current) => [
      ...current,
      {
        id: baseId,
        name,
        parent: currentFolder,
      },
    ]);

    setShowFolderModal(false);
    showNotice(`Folder "${name}" created`);
  };

  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      showNotice("Copied to clipboard");
    } catch {
      showNotice("Copy is unavailable in this browser");
    }
  };

  const handleUpload = () => {
    showNotice("Upload area opened in the full application");
  };

  const handleDownload = () => {
    if (selectedRows.length === 0) {
      showNotice("Select a file first");
      return;
    }

    showNotice(
      `${selectedRows.length} ${
        selectedRows.length === 1 ? "item" : "items"
      } queued for download`
    );
  };

  const handleDelete = () => {
    if (selectedRows.length === 0) {
      showNotice("Select an item first");
      return;
    }

    setItems((current) =>
      current.filter((item) => !selectedRows.includes(item.id))
    );

    setSelectedRows([]);
    showNotice("Selected items removed from the demo");
  };

  return (
    <div className="min-h-full bg-[#f7f9fc] text-slate-900">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1800px] px-5 py-5 sm:px-7 lg:px-9">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div className="min-w-0">
              <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-slate-400">
                <button
                  type="button"
                  onClick={() =>
                    navigate(`/demo/project/${projectId}`)
                  }
                  className="transition hover:text-slate-700"
                >
                  DevSync
                </button>

                <span>/</span>

                <span className="text-slate-700">Files</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-950/10">
                  <FiFolder size={20} />
                </div>

                <div className="min-w-0">
                  <h1 className="truncate text-2xl font-black tracking-tight text-slate-950">
                    Project Files
                  </h1>

                  <p className="mt-0.5 text-xs font-medium text-slate-500">
                    Browse the repository and project workspace.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() =>
                  navigate(`/demo/project/${projectId}`)
                }
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-600 transition hover:bg-slate-50"
              >
                <FiArrowLeft size={14} />
                Overview
              </button>

              <button
                type="button"
                onClick={handleUpload}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                <FiUpload size={14} />
                Upload files
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-[1800px] px-5 py-6 sm:px-7 lg:px-9">
        {/* Stats */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                  Repository
                </p>

                <p className="mt-2 text-lg font-black text-slate-950">
                  shankar-uxcloud
                </p>

                <p className="mt-1 text-[10px] font-semibold text-slate-400">
                  / devsync
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                <FiGithub size={18} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                  Files
                </p>

                <p className="mt-2 text-2xl font-black text-slate-950">
                  {totalFiles}
                </p>

                <p className="mt-1 text-[10px] font-semibold text-slate-400">
                  Source and configuration files
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <FiFile size={18} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                  Folders
                </p>

                <p className="mt-2 text-2xl font-black text-slate-950">
                  {totalFolders}
                </p>

                <p className="mt-1 text-[10px] font-semibold text-slate-400">
                  Organized project directories
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <FiFolder size={18} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                  Branch
                </p>

                <p className="mt-2 text-lg font-black text-slate-950">
                  main
                </p>

                <p className="mt-1 text-[10px] font-semibold text-emerald-600">
                  ● Up to date
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <FiGitBranch size={18} />
              </div>
            </div>
          </div>
        </section>

        {/* Repository banner */}
        <section className="mt-6 overflow-hidden rounded-3xl bg-slate-950 p-6 text-white shadow-xl shadow-slate-950/10 sm:p-7">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <FiGithub size={17} className="text-slate-300" />

                <span className="font-mono text-xs font-bold">
                  shankar-uxcloud/devsync
                </span>

                <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[8px] font-black text-slate-300">
                  PUBLIC
                </span>
              </div>

              <p className="mt-3 max-w-2xl text-xs leading-5 text-slate-400">
                A modern developer collaboration platform for projects, tasks,
                teams, chat and GitHub workflows.
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-1 text-[9px] font-bold text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Active
                </span>

                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-[9px] font-bold text-slate-300">
                  <FiGitBranch size={10} />
                  main
                </span>

                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-[9px] font-bold text-slate-300">
                  <FiShield size={10} />
                  Protected
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => showNotice("Repository link opened")}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-[10px] font-bold text-white transition hover:bg-white/10"
              >
                <FiExternalLink size={13} />
                Open GitHub
              </button>

              <button
                type="button"
                onClick={() => showNotice("Repository refreshed")}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-[10px] font-bold text-slate-950 transition hover:bg-slate-100"
              >
                <FiRefreshCw size={13} />
                Sync
              </button>
            </div>
          </div>
        </section>

        {/* Workspace */}
        <section className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          {/* Toolbar */}
          <div className="border-b border-slate-200 p-3 sm:p-4">
            <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row">
                <div className="relative min-w-0 flex-1 sm:max-w-md">
                  <FiSearch
                    size={15}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search files and folders..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-xs font-semibold outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-50"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setShowFilters((value) => !value)}
                  className={`inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-bold transition ${
                    showFilters || fileType !== "All"
                      ? "border-blue-200 bg-blue-50 text-blue-700"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <FiSearch size={13} />
                  Filters
                </button>
              </div>

              <div className="flex items-center justify-between gap-2">
                {selectedRows.length > 0 && (
                  <div className="flex items-center gap-1">
                    <span className="mr-1 text-[9px] font-bold text-slate-400">
                      {selectedRows.length} selected
                    </span>

                    <button
                      type="button"
                      onClick={handleDownload}
                      className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                      title="Download"
                    >
                      <FiDownload size={14} />
                    </button>

                    <button
                      type="button"
                      onClick={handleDelete}
                      className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
                      title="Delete"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                )}

                <div className="flex items-center rounded-xl bg-slate-100 p-1">
                  <button
                    type="button"
                    onClick={() => setView("grid")}
                    className={`rounded-lg px-3 py-2 text-[10px] font-bold transition ${
                      view === "grid"
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-400"
                    }`}
                  >
                    Grid
                  </button>

                  <button
                    type="button"
                    onClick={() => setView("list")}
                    className={`rounded-lg px-3 py-2 text-[10px] font-bold transition ${
                      view === "list"
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-400"
                    }`}
                  >
                    List
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setShowFolderModal(true)}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
                >
                  <FiFolderPlus size={14} />
                  New folder
                </button>
              </div>
            </div>

            {showFilters && (
              <div className="mt-3 border-t border-slate-100 pt-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="mr-1 text-[9px] font-black uppercase tracking-wider text-slate-400">
                    File type
                  </span>

                  {FILE_TYPES.map((type) => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => setFileType(type)}
                      className={`rounded-full px-3 py-1.5 text-[9px] font-bold transition ${
                        fileType === type
                          ? "bg-slate-950 text-white"
                          : "border border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Breadcrumb */}
          <div className="flex flex-wrap items-center gap-1.5 border-b border-slate-100 bg-slate-50/70 px-4 py-3 sm:px-5">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={crumb.id}>
                {index > 0 && (
                  <FiChevronRight size={12} className="text-slate-300" />
                )}

                <button
                  type="button"
                  onClick={() => openFolder(crumb.id)}
                  className={`rounded-lg px-2 py-1 text-[10px] font-bold transition ${
                    index === breadcrumbs.length - 1
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-400 hover:bg-white hover:text-slate-700"
                  }`}
                >
                  {crumb.name}
                </button>
              </React.Fragment>
            ))}

            <span className="ml-auto hidden text-[9px] font-semibold text-slate-400 sm:block">
              {currentFolderName}
            </span>
          </div>

          {/* Content */}
          {visibleItems.length > 0 ? (
            view === "grid" ? (
              <div className="p-4 sm:p-5">
                <div className="mb-3 flex items-center justify-between">
                  <label className="flex items-center gap-2 text-[9px] font-bold text-slate-400">
                    <input
                      type="checkbox"
                      checked={
                        visibleItems.length > 0 &&
                        visibleItems.every((item) =>
                          selectedRows.includes(item.id)
                        )
                      }
                      onChange={toggleAll}
                      className="h-3.5 w-3.5 rounded border-slate-300"
                    />
                    Select all
                  </label>

                  <span className="text-[9px] font-semibold text-slate-400">
                    {visibleItems.length} items
                  </span>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {visibleItems.map((item) => {
                    const selected = selectedRows.includes(item.id);

                    return (
                      <div
                        key={item.id}
                        className={`group relative rounded-2xl border bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                          selected
                            ? "border-blue-300 bg-blue-50/30"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <button
                            type="button"
                            onClick={() => toggleRow(item.id)}
                            className="mt-0.5"
                          >
                            <input
                              type="checkbox"
                              checked={selected}
                              onChange={() => toggleRow(item.id)}
                              onClick={(event) => event.stopPropagation()}
                              className="h-3.5 w-3.5 rounded border-slate-300"
                            />
                          </button>

                          <button
                            type="button"
                            onClick={() => openItem(item)}
                            className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                              item.type === "folder"
                                ? "bg-amber-50 text-amber-600"
                                : "bg-slate-100 text-slate-700"
                            } transition group-hover:scale-105`}
                          >
                            <FileIcon type={item.type} size={20} />
                          </button>

                          <button
                            type="button"
                            className="ml-auto rounded-lg p-1.5 text-slate-300 opacity-0 transition hover:bg-slate-100 hover:text-slate-700 group-hover:opacity-100"
                          >
                            <FiMoreHorizontal size={15} />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => openItem(item)}
                          className="mt-4 block w-full text-left"
                        >
                          <div className="flex items-center gap-2">
                            <h3 className="truncate text-xs font-black text-slate-900">
                              {item.name}
                            </h3>

                            {item.type !== "folder" && (
                              <FileTypeBadge type={item.type} />
                            )}
                          </div>

                          <p className="mt-1 text-[9px] font-medium text-slate-400">
                            {item.modified}
                          </p>
                        </button>

                        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                          <div className="flex items-center gap-2">
                            <Avatar initials={getInitials(item.author)} />

                            <span className="text-[9px] font-bold text-slate-500">
                              {item.author}
                            </span>
                          </div>

                          <span className="text-[9px] font-semibold text-slate-400">
                            {item.size || "Folder"}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <div className="min-w-[760px]">
                  <div className="grid grid-cols-[40px_minmax(250px,1fr)_110px_130px_110px_70px] gap-4 border-b border-slate-100 bg-slate-50 px-5 py-3 text-[9px] font-black uppercase tracking-wider text-slate-400">
                    <div>
                      <input
                        type="checkbox"
                        checked={
                          visibleItems.length > 0 &&
                          visibleItems.every((item) =>
                            selectedRows.includes(item.id)
                          )
                        }
                        onChange={toggleAll}
                        className="h-3.5 w-3.5 rounded border-slate-300"
                      />
                    </div>
                    <span>Name</span>
                    <span>Type</span>
                    <span>Modified</span>
                    <span>Author</span>
                    <span>Size</span>
                  </div>

                  {visibleItems.map((item) => {
                    const selected = selectedRows.includes(item.id);

                    return (
                      <div
                        key={item.id}
                        className={`grid grid-cols-[40px_minmax(250px,1fr)_110px_130px_110px_70px] gap-4 border-b border-slate-100 px-5 py-3.5 transition last:border-b-0 hover:bg-slate-50 ${
                          selected ? "bg-blue-50/50" : ""
                        }`}
                      >
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selected}
                            onChange={() => toggleRow(item.id)}
                            className="h-3.5 w-3.5 rounded border-slate-300"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() => openItem(item)}
                          className="flex min-w-0 items-center gap-3 text-left"
                        >
                          <div
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                              item.type === "folder"
                                ? "bg-amber-50 text-amber-600"
                                : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            <FileIcon type={item.type} size={16} />
                          </div>

                          <span className="truncate text-xs font-bold text-slate-800">
                            {item.name}
                          </span>
                        </button>

                        <div className="flex items-center">
                          {item.type === "folder" ? (
                            <span className="text-[9px] font-bold text-amber-600">
                              Folder
                            </span>
                          ) : (
                            <FileTypeBadge type={item.type} />
                          )}
                        </div>

                        <div className="flex items-center text-[9px] font-semibold text-slate-400">
                          {item.modified}
                        </div>

                        <div className="flex items-center gap-2">
                          <Avatar initials={getInitials(item.author)} />

                          <span className="truncate text-[9px] font-bold text-slate-500">
                            {item.author}
                          </span>
                        </div>

                        <div className="flex items-center text-[9px] font-semibold text-slate-400">
                          {item.size || "—"}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )
          ) : (
            <div className="flex min-h-72 flex-col items-center justify-center px-6 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <FiSearch size={21} />
              </div>

              <h3 className="mt-4 text-sm font-black text-slate-900">
                No files found
              </h3>

              <p className="mt-1 max-w-sm text-xs leading-5 text-slate-400">
                Try another search term, change the file type or navigate to
                another folder.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setFileType("All");
                }}
                className="mt-4 rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-bold text-white"
              >
                Clear search
              </button>
            </div>
          )}
        </section>

        {/* Recent activity + recent files */}
        <section className="mt-6 grid gap-5 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-600">
                  Repository activity
                </p>

                <h2 className="mt-1 text-lg font-black text-slate-950">
                  Latest commits
                </h2>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                <FiGitBranch size={16} />
              </div>
            </div>

            <div className="mt-5 space-y-4">
              {COMMIT_ACTIVITY.map((commit) => (
                <div
                  key={commit.hash}
                  className="flex items-start gap-3"
                >
                  <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                    <FiGitBranch size={12} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-bold text-slate-800">
                      {commit.message}
                    </p>

                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[9px] font-bold text-blue-600">
                        {commit.hash}
                      </span>

                      <span className="text-[9px] font-semibold text-slate-400">
                        {commit.author}
                      </span>

                      <span className="text-[9px] text-slate-300">
                        ·
                      </span>

                      <span className="text-[9px] font-semibold text-slate-400">
                        {commit.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() =>
                navigate(`/demo/project/${projectId}/activity`)
              }
              className="mt-5 inline-flex items-center gap-2 text-[10px] font-black text-blue-600 hover:text-blue-700"
            >
              View full activity
              <FiArrowRight size={12} />
            </button>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-violet-600">
                  Recently changed
                </p>

                <h2 className="mt-1 text-lg font-black text-slate-950">
                  Recent files
                </h2>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <FiActivity size={16} />
              </div>
            </div>

            <div className="mt-5 space-y-2">
              {recentFiles.map((file) => (
                <button
                  type="button"
                  key={file.id}
                  onClick={() => setSelectedItem(file)}
                  className="flex w-full items-center gap-3 rounded-xl px-2 py-2.5 text-left transition hover:bg-slate-50"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                    <FileIcon type={file.type} size={14} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[10px] font-bold text-slate-800">
                      {file.name}
                    </p>

                    <p className="mt-0.5 text-[9px] font-medium text-slate-400">
                      {file.modified}
                    </p>
                  </div>

                  <FiChevronRight
                    size={13}
                    className="shrink-0 text-slate-300"
                  />
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="mt-6 overflow-hidden rounded-3xl bg-slate-950 p-6 text-white shadow-xl shadow-slate-950/10 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-blue-300">
                <FiZap size={15} />

                <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                  Developer workspace
                </span>
              </div>

              <h2 className="text-xl font-black tracking-tight sm:text-2xl">
                Everything your team needs, in one place.
              </h2>

              <p className="mt-2 max-w-xl text-xs leading-5 text-slate-400">
                Move from repository files to tasks, team collaboration and
                project activity without leaving DevSync.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                to={`/demo/project/${projectId}/tasks`}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-slate-950 transition hover:bg-slate-100"
              >
                View tasks
                <FiArrowRight size={13} />
              </Link>

              <Link
                to={`/demo/project/${projectId}/team`}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-white/10"
              >
                <FiUsers size={13} />
                Team
              </Link>
            </div>
          </div>
        </section>
      </main>

      {showFolderModal && (
        <CreateFolderModal
          onClose={() => setShowFolderModal(false)}
          onCreate={createFolder}
        />
      )}

      {selectedItem && (
        <FilePreview
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onCopy={copyText}
        />
      )}

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