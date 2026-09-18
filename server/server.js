import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import os from "os";
import pty from "node-pty";

import connectDB from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();

connectDB();

const app = express();

/* =========================================================
   CORS
========================================================= */

const clientUrl =
  process.env.CLIENT_URL || "http://localhost:5173";

app.use(
  cors({
    origin: clientUrl,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);

/* =========================================================
   BODY PARSING
========================================================= */

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

/* =========================================================
   HEALTH CHECK
========================================================= */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 DevSync Backend Running",
    socketIO: true,
    terminal: true,
  });
});

/* =========================================================
   API ROUTES
========================================================= */

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

/* =========================================================
   404 API HANDLER
========================================================= */

app.use((req, res, next) => {
  if (req.originalUrl.startsWith("/api/")) {
    return res.status(404).json({
      success: false,
      message: `API route not found: ${req.method} ${req.originalUrl}`,
    });
  }

  next();
});

/* =========================================================
   GLOBAL ERROR HANDLER
========================================================= */

app.use((error, req, res, next) => {
  console.error("GLOBAL SERVER ERROR:", error);

  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message:
      error.message || "Internal server error",
  });
});

/* =========================================================
   HTTP SERVER
========================================================= */

const PORT = Number(process.env.PORT) || 5000;

const server = http.createServer(app);

/* =========================================================
   SOCKET.IO
========================================================= */

const io = new Server(server, {
  cors: {
    origin: clientUrl,
    credentials: true,
    methods: ["GET", "POST"],
  },

  transports: ["polling", "websocket"],

  pingTimeout: 60000,
  pingInterval: 25000,
  maxHttpBufferSize: 1e6,
});

/* =========================================================
   TERMINAL SOCKET
========================================================= */

io.on("connection", (socket) => {
  console.log(`🔌 Socket connected: ${socket.id}`);

  let shell = null;

  try {
    const isWindows = os.platform() === "win32";

    const shellPath = isWindows
      ? process.env.ComSpec || "powershell.exe"
      : process.env.SHELL || "/bin/bash";

    const shellArgs = isWindows
      ? ["-NoLogo"]
      : [];

    shell = pty.spawn(
      shellPath,
      shellArgs,
      {
        name: "xterm-color",
        cols: 120,
        rows: 30,
        cwd: process.cwd(),
        env: {
          ...process.env,
          TERM: "xterm-256color",
        },
        useConpty: isWindows,
      }
    );

    console.log(
      `💻 PTY started for ${socket.id} using ${shellPath}`
    );

    /* -----------------------------------------------------
       PTY → CLIENT
    ----------------------------------------------------- */

    shell.onData((data) => {
      socket.emit("terminal:data", data);
    });

    /* -----------------------------------------------------
       CLIENT → PTY
    ----------------------------------------------------- */

    socket.on("terminal:input", (data) => {
      if (!shell) return;

      try {
        shell.write(String(data));
      } catch (error) {
        console.error(
          "Terminal input error:",
          error.message
        );
      }
    });

    /* -----------------------------------------------------
       RESIZE
    ----------------------------------------------------- */

    socket.on(
      "terminal:resize",
      ({ cols, rows } = {}) => {
        if (!shell) return;

        const safeCols = Math.max(
          20,
          Math.min(Number(cols) || 120, 500)
        );

        const safeRows = Math.max(
          5,
          Math.min(Number(rows) || 30, 200)
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

    /* -----------------------------------------------------
       DISCONNECT
    ----------------------------------------------------- */

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

    /* -----------------------------------------------------
       PTY EXIT
    ----------------------------------------------------- */

    shell.onExit(
      ({ exitCode, signal }) => {
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

    socket.emit(
      "terminal:data",
      "\x1b[90mDevSync PowerShell workspace ready.\x1b[0m\r\n"
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
});

/* =========================================================
   START SERVER
========================================================= */

server.listen(PORT, () => {
  console.log("");
  console.log("==============================================");
  console.log("          DEVSYNC BACKEND SERVER");
  console.log("==============================================");
  console.log(`🚀 HTTP      : http://localhost:${PORT}`);
  console.log(`🔌 Socket.IO : enabled`);
  console.log(`💻 PTY       : enabled`);
  console.log(`🌐 Client    : ${clientUrl}`);
  console.log("==============================================");
  console.log("");
});

/* =========================================================
   PROCESS HANDLING
========================================================= */

process.on("unhandledRejection", (error) => {
  console.error(
    "UNHANDLED REJECTION:",
    error
  );
});

process.on("uncaughtException", (error) => {
  console.error(
    "UNCAUGHT EXCEPTION:",
    error
  );
});
