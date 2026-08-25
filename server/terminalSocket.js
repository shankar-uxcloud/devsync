import path from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pty = require("node-pty");

export function setupTerminalSocket(io) {
  io.on("connection", (socket) => {
    console.log("Terminal client connected:", socket.id);

    const shell = "powershell.exe";

    const terminal = pty.spawn(shell, [
      "-NoLogo",
      "-NoProfile",
    ], {
      name: "xterm-color",
      cols: 120,
      rows: 30,
      cwd: path.resolve(process.cwd(), ".."),
      env: {
        ...process.env,
        TERM: "xterm-256color",
      },
      useConpty: true,
    });

    terminal.onData((data) => {
      socket.emit("terminal:data", data);
    });

    socket.on("terminal:input", (data) => {
      if (typeof data === "string") {
        terminal.write(data);
      }
    });

    socket.on("terminal:resize", ({ cols, rows }) => {
      const safeCols = Number(cols);
      const safeRows = Number(rows);

      if (
        Number.isInteger(safeCols) &&
        Number.isInteger(safeRows) &&
        safeCols >= 20 &&
        safeRows >= 5
      ) {
        try {
          terminal.resize(safeCols, safeRows);
        } catch (error) {
          console.error("Terminal resize error:", error.message);
        }
      }
    });

    socket.on("disconnect", () => {
      console.log("Terminal client disconnected:", socket.id);

      try {
        terminal.kill();
      } catch {
        // Terminal already exited.
      }
    });
  });
}

