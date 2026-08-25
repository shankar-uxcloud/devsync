import path from "path";
import { fileURLToPath } from "url";
import * as pty from "node-pty";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const workspacePath = path.resolve(
  __dirname,
  "../workspaces/devsync-demo"
);

export const registerTerminal = (io) => {
  io.on("connection", (socket) => {
    console.log("Terminal client connected:", socket.id);

    const shell = process.env.COMSPEC || "powershell.exe";

    const terminal = pty.spawn(shell, ["-NoLogo", "-NoProfile"], {
      name: "xterm-color",
      cols: 120,
      rows: 30,
      cwd: workspacePath,
      env: {
        ...process.env,
        TERM: "xterm-256color",
      },
    });

    terminal.onData((data) => {
      socket.emit("terminal:data", data);
    });

    terminal.onExit(({ exitCode }) => {
      socket.emit(
        "terminal:data",
        `\r\n[Process exited with code ${exitCode}]\r\n`
      );
    });

    socket.on("terminal:input", (data) => {
      if (typeof data === "string") {
        terminal.write(data);
      }
    });

    socket.on("terminal:resize", ({ cols, rows }) => {
      try {
        terminal.resize(
          Math.max(20, Number(cols) || 120),
          Math.max(5, Number(rows) || 30)
        );
      } catch (error) {
        console.error("Terminal resize error:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("Terminal client disconnected:", socket.id);

      try {
        terminal.kill();
      } catch {
        // terminal already exited
      }
    });
  });
};
