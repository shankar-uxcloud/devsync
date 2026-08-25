import { useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaCode,
  FaEllipsisH,
  FaFile,
  FaFileAlt,
  FaFileCode,
  FaFolder,
  FaFolderOpen,
  FaGithub,
  FaPlus,
  FaSearch,
  FaUpload,
  FaDownload,
  FaTrash,
  FaTimes,
  FaCheckCircle,
} from "react-icons/fa";

const initialFiles = [
  {
    id: 1,
    name: "src",
    type: "folder",
    modified: "Today",
    size: "—",
  },
  {
    id: 2,
    name: "components",
    type: "folder",
    modified: "Today",
    size: "—",
  },
  {
    id: 3,
    name: "App.jsx",
    type: "code",
    modified: "Today",
    size: "4.2 KB",
  },
  {
    id: 4,
    name: "CodeWorkspace.jsx",
    type: "code",
    modified: "Today",
    size: "12.8 KB",
  },
  {
    id: 5,
    name: "package.json",
    type: "code",
    modified: "Yesterday",
    size: "2.1 KB",
  },
  {
    id: 6,
    name: "README.md",
    type: "document",
    modified: "Yesterday",
    size: "5.6 KB",
  },
  {
    id: 7,
    name: "vite.config.js",
    type: "code",
    modified: "Aug 13",
    size: "1.4 KB",
  },
  {
    id: 8,
    name: ".gitignore",
    type: "document",
    modified: "Aug 12",
    size: "0.8 KB",
  },
];

function getFileIcon(item) {
  if (item.type === "folder") {
    return <FaFolder className="text-yellow-400" />;
  }

  if (item.type === "code") {
    return <FaFileCode className="text-blue-400" />;
  }

  return <FaFileAlt className="text-slate-400" />;
}

export default function ProjectFiles() {
  const { projectId } = useParams();
  const projectPath = `/demo/project/${projectId || "devsync"}`;

  const [files, setFiles] = useState(initialFiles);
  const [search, setSearch] = useState("");
  const [menuId, setMenuId] = useState(null);
  const [showUpload, setShowUpload] = useState(false);
  const [uploadName, setUploadName] = useState("");
  const [message, setMessage] = useState("");

  const fileInputRef = useRef(null);

  const filteredFiles = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return files;
    }

    return files.filter((file) =>
      file.name.toLowerCase().includes(value)
    );
  }, [files, search]);

  const showMessage = (text) => {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  const handleUpload = () => {
    if (!uploadName.trim()) {
      showMessage("Enter a file name first.");
      return;
    }

    const newFile = {
      id: Date.now(),
      name: uploadName.trim(),
      type: uploadName.includes(".")
        ? uploadName.endsWith(".js") ||
          uploadName.endsWith(".jsx") ||
          uploadName.endsWith(".ts") ||
          uploadName.endsWith(".tsx") ||
          uploadName.endsWith(".json")
          ? "code"
          : "document"
        : "document",
      modified: "Just now",
      size: "1.2 KB",
    };

    setFiles((previous) => [newFile, ...previous]);
    setUploadName("");
    setShowUpload(false);

    showMessage(`${newFile.name} added to the project.`);
  };

  const handleDelete = (id) => {
    const item = files.find((file) => file.id === id);

    if (!item) return;

    setFiles((previous) =>
      previous.filter((file) => file.id !== id)
    );

    setMenuId(null);
    showMessage(`${item.name} removed.`);
  };

  const handleOpen = (item) => {
    if (item.type === "folder") {
      showMessage(`Opening ${item.name}/`);
      return;
    }

    showMessage(`Opening ${item.name}`);
  };

  const handleDownload = (item) => {
    setMenuId(null);
    showMessage(`Preparing ${item.name} for download...`);
  };

  const handleChooseFile = (event) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    setUploadName(selectedFile.name);
    setShowUpload(true);
  };

  return (
    <div className="min-h-screen bg-black text-white">

      {/* HEADER */}
      <header className="sticky top-0 z-30 flex min-h-[74px] items-center justify-between border-b border-slate-800 bg-black/95 px-5 backdrop-blur lg:px-8">

        <div className="flex items-center gap-4">

          <Link
            to={projectPath}
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-700 bg-slate-950 text-xl text-slate-300 transition hover:border-blue-500 hover:bg-blue-500/10 hover:text-blue-400"
            title="Back to Workspace"
          >
            <FaArrowLeft />
          </Link>

          <div className="h-8 w-px bg-slate-800" />

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/30">
              <FaCode />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-400">
                  DevSync
                </span>

                <span className="text-slate-600">
                  /
                </span>

                <span className="text-lg font-black">
                  Files
                </span>
              </div>

              <p className="text-xs text-slate-500">
                Project file manager
              </p>
            </div>

          </div>
        </div>

        <div className="flex items-center gap-3">

          <div className="hidden rounded-full border border-blue-500/40 bg-blue-500/5 px-4 py-2 text-xs font-black text-blue-400 sm:block">
            DEMO MODE
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-lg font-black text-white shadow-lg shadow-blue-500/20">
            A
          </div>

        </div>
      </header>

      {/* MAIN */}
      <main className="mx-auto max-w-[1800px] px-5 py-8 lg:px-8 lg:py-10">

        {/* TITLE */}
        <section className="mb-8">

          <div className="mb-3 flex items-center gap-2 text-sm font-bold text-blue-400">
            <FaFolder />
            DevSync Files
          </div>

          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">

            <div>
              <h1 className="text-4xl font-black tracking-tight lg:text-5xl">
                Project Files
              </h1>

              <p className="mt-2 max-w-2xl text-base text-slate-400 lg:text-lg">
                Manage source code, documentation and project resources.
              </p>
            </div>

            <button
              onClick={() => setShowUpload(true)}
              className="flex items-center justify-center gap-3 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-black text-white shadow-xl shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-500"
            >
              <FaPlus />
              Upload File
            </button>

          </div>
        </section>

        {/* SEARCH BAR */}
        <section className="mb-7 rounded-2xl border border-slate-800 bg-slate-950 p-4">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <div className="relative w-full max-w-2xl">

              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search files..."
                className="w-full rounded-xl border border-slate-700 bg-black py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
              />

            </div>

            <div className="flex items-center gap-2 text-sm text-slate-400">
              <FaFolder />
              <span className="font-bold text-slate-300">
                {filteredFiles.length}
              </span>
              items
            </div>

          </div>
        </section>

        {/* FILE TABLE */}
        <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">

          {/* TABLE HEADER */}
          <div className="grid grid-cols-[minmax(280px,1fr)_180px_140px_60px] border-b border-slate-800 bg-slate-950 px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-500">

            <span>Name</span>
            <span>Last Modified</span>
            <span>Size</span>
            <span />

          </div>

          {/* FILES */}
          <div>

            {filteredFiles.length === 0 ? (
              <div className="flex min-h-[300px] flex-col items-center justify-center px-5 text-center">

                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-2xl text-slate-600">
                  <FaSearch />
                </div>

                <h3 className="text-lg font-black">
                  No files found
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Try another search term.
                </p>

              </div>
            ) : (
              filteredFiles.map((item) => (
                <div
                  key={item.id}
                  className="group grid grid-cols-[minmax(280px,1fr)_180px_140px_60px] items-center border-b border-slate-800/80 px-6 py-5 transition last:border-b-0 hover:bg-blue-500/[0.03]"
                >

                  {/* NAME */}
                  <button
                    onClick={() => handleOpen(item)}
                    className="flex min-w-0 items-center gap-4 text-left"
                  >

                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                        item.type === "folder"
                          ? "bg-yellow-400/10"
                          : "bg-slate-900"
                      }`}
                    >
                      {getFileIcon(item)}
                    </span>

                    <span className="min-w-0">

                      <span className="block truncate text-sm font-black text-slate-200 transition group-hover:text-blue-400">
                        {item.name}
                      </span>

                      <span className="mt-1 block text-xs text-slate-600">
                        {item.type === "folder"
                          ? "Folder"
                          : "Project resource"}
                      </span>

                    </span>

                  </button>

                  {/* MODIFIED */}
                  <span className="text-sm text-slate-400">
                    {item.modified}
                  </span>

                  {/* SIZE */}
                  <span className="text-sm text-slate-400">
                    {item.size}
                  </span>

                  {/* ACTIONS */}
                  <div className="relative flex justify-end">

                    <button
                      onClick={() =>
                        setMenuId(
                          menuId === item.id ? null : item.id
                        )
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-800 hover:text-white"
                    >
                      <FaEllipsisH />
                    </button>

                    {menuId === item.id && (
                      <div className="absolute right-0 top-11 z-20 w-44 overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-1 shadow-2xl">

                        <button
                          onClick={() => handleOpen(item)}
                          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs font-bold text-slate-300 hover:bg-blue-500/10 hover:text-blue-400"
                        >
                          <FaFolderOpen />
                          Open
                        </button>

                        {item.type !== "folder" && (
                          <button
                            onClick={() => handleDownload(item)}
                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs font-bold text-slate-300 hover:bg-blue-500/10 hover:text-blue-400"
                          >
                            <FaDownload />
                            Download
                          </button>
                        )}

                        <button
                          onClick={() => handleDelete(item.id)}
                          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs font-bold text-red-400 hover:bg-red-500/10"
                        >
                          <FaTrash />
                          Delete
                        </button>

                      </div>
                    )}

                  </div>

                </div>
              ))
            )}

          </div>

        </section>

        {/* FOOTER INFO */}
        <div className="mt-5 flex flex-col justify-between gap-3 text-xs text-slate-600 sm:flex-row">

          <span>
            Demo project file manager
          </span>

          <span>
            {files.length} total items
          </span>

        </div>

      </main>

      {/* UPLOAD MODAL */}
      {showUpload && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-5 backdrop-blur-sm"
          onClick={() => setShowUpload(false)}
        >

          <div
            className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-950 p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >

            <div className="mb-6 flex items-center justify-between">

              <div>
                <h2 className="text-xl font-black">
                  Upload File
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Add a file to your demo project.
                </p>
              </div>

              <button
                onClick={() => setShowUpload(false)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-800 hover:text-white"
              >
                <FaTimes />
              </button>

            </div>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="mb-4 flex w-full flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 bg-black p-8 transition hover:border-blue-500 hover:bg-blue-500/5"
            >

              <FaUpload className="mb-3 text-2xl text-blue-400" />

              <span className="text-sm font-bold">
                Choose a file
              </span>

              <span className="mt-1 text-xs text-slate-600">
                or enter a demo filename below
              </span>

            </button>

            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleChooseFile}
            />

            <input
              value={uploadName}
              onChange={(event) => setUploadName(event.target.value)}
              placeholder="example.jsx"
              className="mb-4 w-full rounded-xl border border-slate-700 bg-black px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
            />

            <div className="flex gap-3">

              <button
                onClick={() => setShowUpload(false)}
                className="flex-1 rounded-xl border border-slate-700 px-4 py-3 text-sm font-bold text-slate-400 transition hover:bg-slate-900 hover:text-white"
              >
                Cancel
              </button>

              <button
                onClick={handleUpload}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-black text-white transition hover:bg-blue-500"
              >
                <FaUpload />
                Upload
              </button>

            </div>

          </div>

        </div>
      )}

      {/* SUCCESS / INFO MESSAGE */}
      {message && (
        <div className="fixed bottom-6 right-6 z-[60] flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-slate-950 px-5 py-3 text-sm font-bold text-emerald-400 shadow-2xl">

          <FaCheckCircle />

          {message}

        </div>
      )}

    </div>
  );
}