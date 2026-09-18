import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import os from "os";
import pty from "node-pty";

import connectDB from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

connectDB();

const app = express();

/* =========================================================
   CORS
========================================================= */

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());

/* =========================================================
   BASIC HEALTH CHECK
========================================================= */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 DevSync Backend Running",
    socketIO: true,
  });
});

/* =========================================================
   AUTH ROUTES
========================================================= */

app.use("/api/auth", authRoutes);

/* =========================================================
   HTTP SERVER
========================================================= */

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

/* =========================================================
   SOCKET.IO
========================================================= */

const io = new Server(server, {
  cors: {
    origin: true,
    credentials: true,
    methods: ["GET", "POST"],
  },

  transports: ["polling", "websocket"],

  pingTimeout: 60000,
  pingInterval: 25000,
});

/* =========================================================
   TERMINAL SESSIONS
========================================================= */

io.on("connection", (socket) => {
  console.log(`🔌 Socket connected: ${socket.id}`);

  let shell;
  let terminalStarted = false;

  try {
    const isWindows = os.platform() === "win32";

    const shellPath = isWindows
      ? process.env.ComSpec || "powershell.exe"
      : process.env.SHELL || "/bin/bash";

    const shellArgs = isWindows
      ? ["-NoLogo"]
      : [];

    shell = pty.spawn(shellPath, shellArgs, {
      name: "xterm-color",

      cols: 120,
      rows: 30,

      cwd: process.cwd(),

      env: {
        ...process.env,
        TERM: "xterm-256color",
      },

      useConpty: isWindows,
    });

    terminalStarted = true;

    console.log(
      `💻 PTY started for ${socket.id} using ${shellPath}`
    );

    /* =====================================================
       PTY → BROWSER
    ===================================================== */

    shell.onData((data) => {
      socket.emit("terminal:data", data);
    });

    /* =====================================================
       BROWSER → PTY
    ===================================================== */

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

    /* =====================================================
       RESIZE
    ===================================================== */

    socket.on("terminal:resize", ({ cols, rows }) => {
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
        shell.resize(safeCols, safeRows);
      } catch (error) {
        console.error(
          "Terminal resize error:",
          error.message
        );
      }
    });

    /* =====================================================
       DISCONNECT
    ===================================================== */

    socket.on("disconnect", (reason) => {
      console.log(
        `🔌 Socket disconnected: ${socket.id} — ${reason}`
      );

      if (shell) {
        try {
          shell.kill();
        } catch {}
      }

      shell = null;
    });

    /* =====================================================
       PTY EXIT
    ===================================================== */

    shell.onExit(({ exitCode, signal }) => {
      console.log(
        `💻 PTY exited for ${socket.id}`,
        {
          exitCode,
          signal,
        }
      );

      socket.emit(
        "terminal:data",
        `\r\n\x1b[90m[Process exited with code ${exitCode}]\x1b[0m\r\n`
      );

      if (shell) {
        try {
          shell.kill();
        } catch {}
      }

      shell = null;
    });

  } catch (error) {
    console.error(
      `❌ Failed to start terminal for ${socket.id}:`,
      error
    );

    socket.emit(
      "terminal:data",
      `\r\n\x1b[31m[Terminal startup failed]\x1b[0m\r\n${error.message}\r\n`
    );
  }

  /* =======================================================
     INITIAL SERVER MESSAGE
  ======================================================= */

  if (terminalStarted) {
    socket.emit(
      "terminal:data",
      "\x1b[90mDevSync PowerShell workspace ready.\x1b[0m\r\n"
    );
  }
});

/* =========================================================
   START SERVER
========================================================= */

server.listen(PORT, () => {
  console.log("");
  console.log("==============================================");
  console.log("        DEVSYNC BACKEND SERVER");
  console.log("==============================================");
  console.log(`🚀 HTTP Server : http://localhost:${PORT}`);
  console.log(`🔌 Socket.IO   : enabled`);
  console.log(`💻 PTY Terminal: enabled`);
  console.log("==============================================");
  console.log("");
});