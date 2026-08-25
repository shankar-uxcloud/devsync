import {
  FaCode,
  FaDownload,
  FaEllipsisH,
  FaFile,
  FaFileAlt,
  FaFileImage,
  FaFilePdf,
  FaFolder,
  FaTrash,
} from "react-icons/fa";

function FileCard({ file, viewMode = "grid", onOpen, onDelete }) {
  const icon = getFileIcon(file);

  const iconStyle = getIconStyle(file);

  if (viewMode === "list") {
    return (
      <div className="group flex items-center gap-4 border-b border-slate-100 px-4 py-4 transition hover:bg-slate-50">

        {/* ICON */}

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconStyle}`}
        >
          {icon}
        </div>

        {/* NAME */}

        <button
          onClick={() => onOpen?.(file)}
          className="min-w-0 flex-1 text-left"
        >
          <p className="truncate text-sm font-black text-slate-800 transition group-hover:text-blue-600">
            {file.name}
          </p>

          <p className="mt-1 text-[10px] text-slate-400">
            {file.type} · {file.size}
          </p>
        </button>

        {/* OWNER */}

        <div className="hidden w-32 items-center gap-2 md:flex">

          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-[9px] font-black text-white">
            {file.ownerInitials}
          </div>

          <span className="truncate text-xs font-semibold text-slate-500">
            {file.owner}
          </span>

        </div>

        {/* DATE */}

        <span className="hidden w-28 text-xs text-slate-400 lg:block">
          {file.modified}
        </span>

        {/* ACTIONS */}

        <div className="flex items-center gap-1">

          <button
            onClick={() => onOpen?.(file)}
            title="Download"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-blue-50 hover:text-blue-600"
          >
            <FaDownload className="text-xs" />
          </button>

          <button
            onClick={() => onDelete?.(file)}
            title="Delete"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-500"
          >
            <FaTrash className="text-xs" />
          </button>

        </div>

      </div>
    );
  }

  return (
    <div
      className="group relative cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
      onDoubleClick={() => onOpen?.(file)}
    >

      {/* TOP */}

      <div className="flex items-start justify-between">

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconStyle}`}
        >
          {icon}
        </div>

        <button
          onClick={(event) => event.stopPropagation()}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-300 transition hover:bg-slate-100 hover:text-slate-600"
        >
          <FaEllipsisH className="text-xs" />
        </button>

      </div>

      {/* NAME */}

      <button
        onClick={() => onOpen?.(file)}
        className="mt-5 block w-full text-left"
      >
        <p className="truncate text-sm font-black text-slate-800 transition group-hover:text-blue-600">
          {file.name}
        </p>

        <p className="mt-1 text-xs text-slate-400">
          {file.type}
        </p>
      </button>

      {/* DETAILS */}

      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">

        <div className="flex items-center gap-2">

          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-[9px] font-black text-white">
            {file.ownerInitials}
          </div>

          <span className="max-w-[100px] truncate text-[10px] font-semibold text-slate-500">
            {file.owner}
          </span>

        </div>

        <span className="text-[10px] text-slate-400">
          {file.modified}
        </span>

      </div>

      {/* SIZE */}

      <div className="mt-3 flex items-center justify-between">

        <span className="text-[10px] font-semibold text-slate-400">
          {file.size}
        </span>

        <div className="flex items-center gap-1 opacity-0 transition group-hover:opacity-100">

          <button
            onClick={(event) => {
              event.stopPropagation();
              onOpen?.(file);
            }}
            title="Download"
            className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-blue-50 hover:text-blue-600"
          >
            <FaDownload className="text-[10px]" />
          </button>

          <button
            onClick={(event) => {
              event.stopPropagation();
              onDelete?.(file);
            }}
            title="Delete"
            className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500"
          >
            <FaTrash className="text-[10px]" />
          </button>

        </div>

      </div>

    </div>
  );
}

/* FILE ICON */

function getFileIcon(file) {
  if (file.type === "Folder") {
    return <FaFolder />;
  }

  if (file.type === "PDF") {
    return <FaFilePdf />;
  }

  if (file.type === "Image") {
    return <FaFileImage />;
  }

  if (file.type === "Code") {
    return <FaCode />;
  }

  if (file.type === "Document") {
    return <FaFileAlt />;
  }

  return <FaFile />;
}

/* ICON STYLE */

function getIconStyle(file) {
  if (file.type === "Folder") {
    return "bg-yellow-50 text-yellow-500";
  }

  if (file.type === "PDF") {
    return "bg-red-50 text-red-500";
  }

  if (file.type === "Image") {
    return "bg-purple-50 text-purple-500";
  }

  if (file.type === "Code") {
    return "bg-blue-50 text-blue-600";
  }

  if (file.type === "Document") {
    return "bg-green-50 text-green-600";
  }

  return "bg-slate-100 text-slate-500";
}

export default FileCard;