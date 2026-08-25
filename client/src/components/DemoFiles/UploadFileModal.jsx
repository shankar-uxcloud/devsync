import { useRef, useState } from "react";
import {
  FaCloudUploadAlt,
  FaFile,
  FaTimes,
  FaUpload,
} from "react-icons/fa";

function UploadFileModal({ onClose, onUpload }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;
    setSelectedFile(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);

    const file = event.dataTransfer.files?.[0];

    if (file) {
      handleFile(file);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;

    onUpload?.(selectedFile);
    onClose?.();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-5 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-3xl bg-white p-7 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >

        {/* HEADER */}

        <div className="flex items-start justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <FaCloudUploadAlt />
            </div>

            <div>
              <h2 className="text-xl font-black text-slate-900">
                Upload File
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Add a file to the DevSync project.
              </p>
            </div>

          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-lg text-slate-500 transition hover:bg-slate-200"
          >
            <FaTimes className="text-xs" />
          </button>

        </div>

        {/* DROP AREA */}

        <div
          onDragOver={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`mt-7 cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition ${
            dragging
              ? "border-blue-500 bg-blue-50"
              : "border-slate-200 bg-slate-50 hover:border-blue-300 hover:bg-blue-50/40"
          }`}
        >

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-2xl text-blue-500 shadow-sm">
            <FaCloudUploadAlt />
          </div>

          <h3 className="mt-5 text-sm font-black text-slate-800">
            {dragging
              ? "Drop your file here"
              : "Drag & drop your file here"}
          </h3>

          <p className="mt-2 text-xs text-slate-400">
            or click to browse from your computer
          </p>

          <p className="mt-4 text-[10px] font-semibold text-slate-400">
            Maximum file size: 50 MB
          </p>

          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={(event) =>
              handleFile(event.target.files?.[0])
            }
          />

        </div>

        {/* SELECTED FILE */}

        {selectedFile && (
          <div className="mt-5 flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600">
              <FaFile />
            </div>

            <div className="min-w-0 flex-1">

              <p className="truncate text-xs font-black text-slate-800">
                {selectedFile.name}
              </p>

              <p className="mt-1 text-[10px] text-slate-400">
                {formatFileSize(selectedFile.size)}
              </p>

            </div>

            <button
              onClick={() => setSelectedFile(null)}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:bg-white hover:text-red-500"
            >
              <FaTimes className="text-xs" />
            </button>

          </div>
        )}

        {/* ACTIONS */}

        <div className="mt-7 flex gap-3">

          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            onClick={handleUpload}
            disabled={!selectedFile}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FaUpload />
            Upload
          </button>

        </div>

      </div>
    </div>
  );
}

function formatFileSize(bytes) {
  if (!bytes) return "0 KB";

  if (bytes < 1024 * 1024) {
    return `${Math.ceil(bytes / 1024)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default UploadFileModal;