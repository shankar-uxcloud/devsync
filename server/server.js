import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import os from "os";
import pty from "node-pty";
import fs from "fs";
import path from "path";

import connectDB from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();

connectDB();

const app = express();

const clientUrl =
  process.env.CLIENT_URL || "http://localhost:5173";

/* =========================================================
   REAL DEVSYNC WORKSPACE
========================================================= */

const workspaceRoot = path.resolve(
  process.env.WORKSPACE_ROOT ||
    path.resolve(process.cwd(), "..")
);

const workspaceRootReal =
  fs.realpathSync.native(workspaceRoot);

console.log(`📂 Workspace root: ${workspaceRootReal}`);

/* =========================================================
   CORS
========================================================= */

app.use(
  cors({
    origin: clientUrl,
    credentials: true,
    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],
  })
);

/* =========================================================
   BODY PARSING
========================================================= */

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

/* =========================================================
   WORKSPACE HELPERS
========================================================= */

const ignoredWorkspaceNames = new Set([
  ".git",
  "node_modules",
  ".next",
  "dist",
  "build",
  ".cache",
  "coverage",
]);

function isPathInsideWorkspace(candidate) {
  const relative = path.relative(
    workspaceRootReal,
    candidate
  );

  return (
    relative === "" ||
    (!relative.startsWith("..") &&
      !path.isAbsolute(relative))
  );
}

function resolveWorkspacePath(requestedPath = "") {
  const clean = String(requestedPath)
    .replace(/\\/g, "/")
    .replace(/^\/+/, "");

  if (!clean || clean === ".") {
    return workspaceRootReal;
  }

  const resolved = path.resolve(
    workspaceRootReal,
    clean
  );

  if (!isPathInsideWorkspace(resolved)) {
    const error = new Error(
      "Path is outside the DevSync workspace."
    );

    error.statusCode = 403;

    throw error;
  }

  return resolved;
}

/* =========================================================
   LANGUAGE DETECTION
========================================================= */

function languageFromPath(filePath) {
  const ext = path.extname(filePath).toLowerCase();

  const languages = {
    ".js": "JavaScript",
    ".jsx": "JavaScript React",
    ".mjs": "JavaScript",
    ".cjs": "JavaScript",

    ".ts": "TypeScript",
    ".tsx": "TypeScript React",

    ".py": "Python",
    ".java": "Java",

    ".c": "C",
    ".cpp": "C++",
    ".h": "C/C++ Header",

    ".html": "HTML",
    ".css": "CSS",
    ".scss": "SCSS",

    ".json": "JSON",
    ".md": "Markdown",
    ".txt": "Plain Text",

    ".yml": "YAML",
    ".yaml": "YAML",
    ".xml": "XML",

    ".sql": "SQL",

    ".sh": "Shell",
    ".bat": "Batch",
    ".ps1": "PowerShell",

    ".env": "Environment",
  };

  return languages[ext] || "Plain Text";
}

/* =========================================================
   SORT FILES/FOLDERS
========================================================= */

function sortWorkspaceEntries(entries) {
  return entries.sort((a, b) => {
    if (a.type !== b.type) {
      return a.type === "folder" ? -1 : 1;
    }

    return a.name.localeCompare(b.name);
  });
}

/* =========================================================
   READ REAL WORKSPACE TREE
========================================================= */

function readWorkspaceTree(
  absolutePath,
  relativePath = ""
) {
  const stat = fs.statSync(absolutePath);

  /* FILE */

  if (stat.isFile()) {
    return {
      type: "file",
      name: path.basename(absolutePath),
      path: relativePath.replace(/\\/g, "/"),
      language: languageFromPath(absolutePath),
    };
  }

  /* FOLDER */

  const children = [];

  const entries = fs.readdirSync(
    absolutePath,
    {
      withFileTypes: true,
    }
  );

  for (const entry of entries) {
    if (
      ignoredWorkspaceNames.has(
        entry.name
      )
    ) {
      continue;
    }

    const childAbsolute =
      path.join(
        absolutePath,
        entry.name
      );

    const childRelative =
      relativePath
        ? path.join(
            relativePath,
            entry.name
          )
        : entry.name;

    try {
      children.push(
        readWorkspaceTree(
          childAbsolute,
          childRelative
        )
      );
    } catch (error) {
      console.warn(
        `⚠️ Could not read ${childRelative}:`,
        error.message
      );
    }
  }

  return {
    type: "folder",
    name: path.basename(
      absolutePath
    ),
    path: relativePath.replace(
      /\\/g,
      "/"
    ),
    children:
      sortWorkspaceEntries(
        children
      ),
  };
}

/* =========================================================
   REAL WORKSPACE TREE API
========================================================= */

app.get(
  "/api/workspace/tree",
  (req, res) => {
    try {
      const tree =
        readWorkspaceTree(
          workspaceRootReal
        );

      res.json({
        success: true,
        root: tree,
      });
    } catch (error) {
      console.error(
        "WORKSPACE TREE ERROR:",
        error
      );

      res.status(
        error.statusCode || 500
      ).json({
        success: false,
        message:
          error.message ||
          "Unable to read workspace.",
      });
    }
  }
);

/* =========================================================
   READ REAL FILE
========================================================= */

app.get(
  "/api/workspace/file",
  (req, res) => {
    try {
      const absolutePath =
        resolveWorkspacePath(
          req.query.path
        );

      if (
        !fs.existsSync(
          absolutePath
        )
      ) {
        return res.status(404).json({
          success: false,
          message:
            "File not found.",
        });
      }

      const stat =
        fs.statSync(
          absolutePath
        );

      if (!stat.isFile()) {
        return res.status(400).json({
          success: false,
          message:
            "The requested path is a directory.",
        });
      }

      const code =
        fs.readFileSync(
          absolutePath,
          "utf8"
        );

      res.json({
        success: true,

        path: path
          .relative(
            workspaceRootReal,
            absolutePath
          )
          .replace(/\\/g, "/"),

        name:
          path.basename(
            absolutePath
          ),

        language:
          languageFromPath(
            absolutePath
          ),

        code,
      });
    } catch (error) {
      console.error(
        "WORKSPACE FILE READ ERROR:",
        error
      );

      res.status(
        error.statusCode || 500
      ).json({
        success: false,
        message:
          error.message ||
          "Unable to read file.",
      });
    }
  }
);

/* =========================================================
   SAVE REAL FILE
========================================================= */

app.put(
  "/api/workspace/file",
  (req, res) => {
    try {
      const requestedPath =
        req.body?.path;

      const code =
        req.body?.code;

      if (
        !requestedPath ||
        typeof code !== "string"
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Both path and code are required.",
        });
      }

      const absolutePath =
        resolveWorkspacePath(
          requestedPath
        );

      if (
        !fs.existsSync(
          absolutePath
        )
      ) {
        return res.status(404).json({
          success: false,
          message:
            "File not found.",
        });
      }

      if (
        !fs.statSync(
          absolutePath
        ).isFile()
      ) {
        return res.status(400).json({
          success: false,
          message:
            "The requested path is not a file.",
        });
      }

      fs.writeFileSync(
        absolutePath,
        code,
        "utf8"
      );

      res.json({
        success: true,
        message: "File saved.",

        path: path
          .relative(
            workspaceRootReal,
            absolutePath
          )
          .replace(/\\/g, "/"),
      });
    } catch (error) {
      console.error(
        "WORKSPACE FILE SAVE ERROR:",
        error
      );

      res.status(
        error.statusCode || 500
      ).json({
        success: false,
        message:
          error.message ||
          "Unable to save file.",
      });
    }
  }
);

/* =========================================================
   CREATE REAL FILE
========================================================= */

app.post(
  "/api/workspace/file",
  (req, res) => {
    try {
      const requestedPath =
        req.body?.path;

      const code =
        typeof req.body?.code ===
        "string"
          ? req.body.code
          : "";

      if (!requestedPath) {
        return res.status(400).json({
          success: false,
          message:
            "A file path is required.",
        });
      }

      const absolutePath =
        resolveWorkspacePath(
          requestedPath
        );

      if (
        absolutePath ===
        workspaceRootReal
      ) {
        return res.status(400).json({
          success: false,
          message:
            "A file path is required.",
        });
      }

      if (
        fs.existsSync(
          absolutePath
        )
      ) {
        return res.status(409).json({
          success: false,
          message:
            "A file or folder with that name already exists.",
        });
      }

      fs.mkdirSync(
        path.dirname(
          absolutePath
        ),
        {
          recursive: true,
        }
      );

      fs.writeFileSync(
        absolutePath,
        code,
        "utf8"
      );

      res.status(201).json({
        success: true,
        message:
          "File created.",

        path: path
          .relative(
            workspaceRootReal,
            absolutePath
          )
          .replace(/\\/g, "/"),
      });
    } catch (error) {
      console.error(
        "WORKSPACE FILE CREATE ERROR:",
        error
      );

      res.status(
        error.statusCode || 500
      ).json({
        success: false,
        message:
          error.message ||
          "Unable to create file.",
      });
    }
  }
);

/* =========================================================
   DELETE REAL FILE
========================================================= */

app.delete(
  "/api/workspace/file",
  (req, res) => {
    try {
      const absolutePath =
        resolveWorkspacePath(
          req.query.path
        );

      if (
        absolutePath ===
        workspaceRootReal
      ) {
        return res.status(400).json({
          success: false,
          message:
            "The workspace root cannot be deleted.",
        });
      }

      if (
        !fs.existsSync(
          absolutePath
        )
      ) {
        return res.status(404).json({
          success: false,
          message:
            "File not found.",
        });
      }

      const stat =
        fs.statSync(
          absolutePath
        );

      if (!stat.isFile()) {
        return res.status(400).json({
          success: false,
          message:
            "Only files can be deleted from the workspace explorer.",
        });
      }

      fs.unlinkSync(
        absolutePath
      );

      res.json({
        success: true,
        message:
          "File deleted.",

        path: path
          .relative(
            workspaceRootReal,
            absolutePath
          )
          .replace(/\\/g, "/"),
      });
    } catch (error) {
      console.error(
        "WORKSPACE FILE DELETE ERROR:",
        error
      );

      res.status(
        error.statusCode || 500
      ).json({
        success: false,
        message:
          error.message ||
          "Unable to delete file.",
      });
    }
  }
);

/* =========================================================
   HEALTH CHECK
========================================================= */

app.get(
  "/",
  (req, res) => {
    res.json({
      success: true,
      message:
        "🚀 DevSync Backend Running",

      socketIO: true,
      terminal: true,
      workspace: true,

      workspaceRoot:
        workspaceRootReal,
    });
  }
);

/* =========================================================
   EXISTING API ROUTES
========================================================= */

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/projects",
  projectRoutes
);

app.use(
  "/api/tasks",
  taskRoutes
);

/* =========================================================
   404 API HANDLER
========================================================= */

app.use(
  (req, res, next) => {
    if (
      req.originalUrl.startsWith(
        "/api/"
      )
    ) {
      return res.status(404).json({
        success: false,
        message:
          `API route not found: ${req.method} ${req.originalUrl}`,
      });
    }

    next();
  }
);

/* =========================================================
   GLOBAL ERROR HANDLER
========================================================= */

app.use(
  (
    error,
    req,
    res,
    next
  ) => {
    console.error(
      "GLOBAL SERVER ERROR:",
      error
    );

    const statusCode =
      error.statusCode || 500;

    res.status(
      statusCode
    ).json({
      success: false,
      message:
        error.message ||
        "Internal server error",
    });
  }
);

/* =========================================================
   HTTP SERVER
========================================================= */

const PORT =
  Number(process.env.PORT) ||
  5000;

const server =
  http.createServer(app);

/* =========================================================
   SOCKET.IO
========================================================= */

const io =
  new Server(server, {
    cors: {
      origin: clientUrl,
      credentials: true,

      methods: [
        "GET",
        "POST",
      ],
    },

    transports: [
      "polling",
      "websocket",
    ],

    pingTimeout: 60000,
    pingInterval: 25000,

    maxHttpBufferSize:
      1e6,
  });

/* =========================================================
   TERMINAL SOCKET
========================================================= */

io.on(
  "connection",
  (socket) => {
    console.log(
      `🔌 Socket connected: ${socket.id}`
    );

    let shell = null;

    try {
      const isWindows =
        os.platform() ===
        "win32";

     const shellPath = isWindows
  ? "powershell.exe"
  : process.env.SHELL || "/bin/bash";

const shellArgs = isWindows
  ? ["-NoLogo"]
  : [];

      shell =
        pty.spawn(
          shellPath,
          shellArgs,
          {
            name:
              "xterm-color",

            cols: 120,
            rows: 30,

            /*
             * IMPORTANT:
             * Terminal starts in the SAME
             * real project root used by
             * the Explorer.
             */

            cwd:
              workspaceRootReal,

            env: {
              ...process.env,

              TERM:
                "xterm-256color",
            },

            useConpty:
              isWindows,
          }
        );

      console.log(
        `💻 PTY started for ${socket.id} using ${shellPath}`
      );

      /* PTY → CLIENT */

      shell.onData(
        (data) => {
          socket.emit(
            "terminal:data",
            data
          );
        }
      );

      /* CLIENT → PTY */

      socket.on(
        "terminal:input",
        (data) => {
          if (!shell)
            return;

          try {
            shell.write(
              String(data)
            );
          } catch (error) {
            console.error(
              "Terminal input error:",
              error.message
            );
          }
        }
      );

      /* RESIZE */

      socket.on(
        "terminal:resize",
        ({
          cols,
          rows,
        } = {}) => {
          if (!shell)
            return;

          const safeCols =
            Math.max(
              20,
              Math.min(
                Number(cols) ||
                  120,
                500
              )
            );

          const safeRows =
            Math.max(
              5,
              Math.min(
                Number(rows) ||
                  30,
                200
              )
            );

          try {
            shell.resize(
              safeCols,
              safeRows
            );
          } catch (error) {
            console.error(
              "Terminal resize error:",
              error.message
            );
          }
        }
      );

      /* DISCONNECT */

      socket.on(
        "disconnect",
        (reason) => {
          console.log(
            `🔌 Socket disconnected: ${socket.id} — ${reason}`
          );

          if (shell) {
            try {
              shell.kill();
            } catch {}
          }

          shell = null;
        }
      );

      /* PTY EXIT */

      shell.onExit(
        ({
          exitCode,
          signal,
        }) => {
          socket.emit(
            "terminal:data",
            `\r\n\x1b[90m[Process exited with code ${exitCode}]\x1b[0m\r\n`
          );

          console.log(
            `💻 PTY exited for ${socket.id}`,
            {
              exitCode,
              signal,
            }
          );

          shell = null;
        }
      );

      /* INITIAL TERMINAL MESSAGE */

      socket.emit(
        "terminal:data",
        `\x1b[90mDevSync PowerShell workspace ready.\x1b[0m\r\n\x1b[90mWorkspace: ${workspaceRootReal}\x1b[0m\r\n`
      );
    } catch (error) {
      console.error(
        `❌ Failed to start PTY for ${socket.id}:`,
        error
      );

      socket.emit(
        "terminal:data",
        `\r\n\x1b[31m[Terminal startup failed]\x1b[0m\r\n${error.message}\r\n`
      );
    }
  }
);

/* =========================================================
   START SERVER
========================================================= */

server.listen(
  PORT,
  () => {
    console.log("");
    console.log(
      "=============================================="
    );
    console.log(
      "          DEVSYNC BACKEND SERVER"
    );
    console.log(
      "=============================================="
    );

    console.log(
      `🚀 HTTP      : http://localhost:${PORT}`
    );

    console.log(
      `🔌 Socket.IO : enabled`
    );

    console.log(
      `💻 PTY       : enabled`
    );

    console.log(
      `📂 Workspace : ${workspaceRootReal}`
    );

    console.log(
      `🌐 Client    : ${clientUrl}`
    );

    console.log(
      "=============================================="
    );

    console.log("");
  }
);

/* =========================================================
   PROCESS HANDLING
========================================================= */

process.on(
  "unhandledRejection",
  (error) => {
    console.error(
      "UNHANDLED REJECTION:",
      error
    );
  }
);

process.on(
  "uncaughtException",
  (error) => {
    console.error(
      "UNCAUGHT EXCEPTION:",
      error
    );
  }
);
