import {
  FaFilter,
  FaSearch,
  FaSortAmountDown,
  FaThLarge,
  FaList,
} from "react-icons/fa";

function FileToolbar({
  search,
  setSearch,
  typeFilter,
  setTypeFilter,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

        {/* SEARCH */}

        <div className="relative w-full xl:max-w-md">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400" />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search files and folders..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
          />
        </div>

        {/* CONTROLS */}

        <div className="flex flex-wrap items-center gap-3">

          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
            <FaFilter />
            Filters
          </div>

          {/* TYPE */}

          <select
            value={typeFilter}
            onChange={(event) => setTypeFilter(event.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold text-slate-600 outline-none transition focus:border-blue-500 focus:bg-white"
          >
            <option value="All Types">All Types</option>
            <option value="Folder">Folders</option>
            <option value="Document">Documents</option>
            <option value="PDF">PDF</option>
            <option value="Image">Images</option>
            <option value="Code">Code</option>
          </select>

          {/* SORT */}

          <div className="flex items-center gap-2">
            <FaSortAmountDown className="text-xs text-slate-400" />

            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold text-slate-600 outline-none transition focus:border-blue-500 focus:bg-white"
            >
              <option value="name">Name</option>
              <option value="date">Modified Date</option>
              <option value="size">Size</option>
              <option value="type">File Type</option>
            </select>
          </div>

          {/* VIEW MODE */}

          <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 p-1">

            <button
              onClick={() => setViewMode("grid")}
              title="Grid view"
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition ${
                viewMode === "grid"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-slate-400 hover:text-slate-700"
              }`}
            >
              <FaThLarge className="text-xs" />
            </button>

            <button
              onClick={() => setViewMode("list")}
              title="List view"
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition ${
                viewMode === "list"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-slate-400 hover:text-slate-700"
              }`}
            >
              <FaList className="text-xs" />
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

export default FileToolbar;