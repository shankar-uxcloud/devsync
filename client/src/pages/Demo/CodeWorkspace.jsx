import { useEffect, useMemo, useRef, useState } from "react";
import {
  FaArrowLeft,
  FaBug,
  FaCheckCircle,
  FaCode,
  FaCopy,
  FaFile,
  FaFolder,
  FaMagic,
  FaPlay,
  FaPlus,
  FaRobot,
  FaSave,
  FaSearch,
  FaShieldAlt,
  FaTerminal,
  FaTimes,
  FaTrash,
  FaChevronDown,
  FaLightbulb,
  FaArrowDown,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import { WebLinksAddon } from "@xterm/addon-web-links";
import "@xterm/xterm/css/xterm.css";

/*
  DevSync AI Workspace
  -------------------------------------------------------------
  Frontend-only IDE prototype:
  - VS Code-style explorer
  - Tabbed editor with line numbers
  - Demo terminal/output
  - ChatGPT-style DevSync AI panel
  - Code analysis / bugs / security / improve / explain
  - Create and delete demo files
  - No external editor dependency required
*/

const starterFiles = [
  {
    name: "App.jsx",
    language: "JavaScript",
    code: `function calculateTotal(price, quantity) {
  return price * quantity;
}

const total = calculateTotal(100, 3);
console.log(total);`,
  },
  {
    name: "api.js",
    language: "JavaScript",
    code: `async function getUsers() {
  const response = await fetch("/api/users");
  const data = await response.json();

  return data;
}`,
  },
  {
    name: "utils.js",
    language: "JavaScript",
    code: `export function formatName(firstName, lastName) {
  return firstName + " " + lastName;
}`,
  },
  {
    name: "README.md",
    language: "Markdown",
    code: `# DevSync

AI-powered developer collaboration workspace.

## Features

- Project collaboration
- AI code assistance
- Tasks and activity
- Shared project files`,
  },
  {
    name: "package.json",
    language: "JSON",
    code: `{
  "name": "devsync-demo",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite"
  }
}`,
  },
];

const aiWelcome = {
  role: "ai",
  text: "Hi! I'm DevSync AI. I can understand the code currently open in your workspace. Ask me to explain, debug, review, improve, secure, or optimize it.",
};

function CodeWorkspace() {
  const navigate = useNavigate();

  const [files, setFiles] = useState(starterFiles);
  const [activeFile, setActiveFile] = useState("App.jsx");
  const [code, setCode] = useState(starterFiles[0].code);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([aiWelcome]);
  const [analysis, setAnalysis] = useState(null);
  const terminalContainerRefs = useRef(new Map());
  const terminalInstancesRef = useRef(new Map());
  const terminalSocketsRef = useRef(new Map());
  const terminalOutputBuffersRef = useRef(new Map());
  const terminalFitsRef = useRef(new Map());
  const terminalResizeObserversRef = useRef(new Map());

  const [terminalSessions, setTerminalSessions] = useState([
    {
      id: "terminal-1",
      name: "PowerShell 1",
      status: "CONNECTING",
      connected: false,
      detectedUrl: null,
    },
  ]);
  const [activeTerminalId, setActiveTerminalId] = useState("terminal-1");
  const [terminalTab, setTerminalTab] = useState("TERMINAL");
  const [terminalHeight, setTerminalHeight] = useState(280);
  const [isResizingTerminal, setIsResizingTerminal] = useState(false);
  const [search, setSearch] = useState("");
  const [showExplorer, setShowExplorer] = useState(true);
  const [showTerminal, setShowTerminal] = useState(true);
  const [showAI, setShowAI] = useState(true);
  const [newFileName, setNewFileName] = useState("");
  const [showNewFile, setShowNewFile] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [terminalLinkPopup, setTerminalLinkPopup] = useState(null);

  const activeTerminal = terminalSessions.find(
    (session) => session.id === activeTerminalId
  );

  const setTerminalContainerRef = (id, node) => {
    if (node) {
      terminalContainerRefs.current.set(id, node);
    } else {
      terminalContainerRefs.current.delete(id);
      terminalOutputBuffersRef.current.delete(id);
    }
  };

  const createTerminalSession = () => {
    const id = `terminal-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const nextNumber = terminalSessions.length + 1;

    setTerminalSessions((current) => [
      ...current,
      {
        id,
        name: `PowerShell ${nextNumber}`,
        status: "CONNECTING",
        connected: false,
        detectedUrl: null,
      },
    ]);

    setActiveTerminalId(id);
    setTerminalTab("TERMINAL");
    setShowTerminal(true);
  };

  const closeTerminalSession = (id) => {
    const socket = terminalSocketsRef.current.get(id);
    const terminal = terminalInstancesRef.current.get(id);
    const resizeObserver = terminalResizeObserversRef.current.get(id);

    try {
      terminal?._devsyncCleanup?.();
    } catch {
      /* ignore */
    }

    try {
      resizeObserver?.disconnect();
    } catch {
      /* ignore */
    }

    try {
      socket?.disconnect();
    } catch {
      /* ignore */
    }

    try {
      terminal?.dispose();
    } catch {
      /* ignore */
    }

    terminalSocketsRef.current.delete(id);
    terminalInstancesRef.current.delete(id);
    terminalFitsRef.current.delete(id);
    terminalContainerRefs.current.delete(id);
    terminalResizeObserversRef.current.delete(id);

    setTerminalSessions((current) => {
      if (current.length === 1) return current;

      const index = current.findIndex((session) => session.id === id);
      const next = current.filter((session) => session.id !== id);

      if (id === activeTerminalId) {
        const fallback = next[Math.max(0, index - 1)] || next[0];
        setActiveTerminalId(fallback.id);
      }

      return next;
    });
  };

  const clearActiveTerminal = () => {
    const terminal = terminalInstancesRef.current.get(activeTerminalId);
    terminal?.clear();
    terminal?.focus();
  };

  const scrollToBottomActiveTerminal = () => {
    const terminal = terminalInstancesRef.current.get(activeTerminalId);
    terminal?.scrollToBottom();
    terminal?.focus();
  };

  useEffect(() => {
    terminalSessions.forEach((session) => {
      if (terminalInstancesRef.current.has(session.id)) return;

      const container = terminalContainerRefs.current.get(session.id);
      if (!container) return;

      const terminal = new Terminal({
        cursorBlink: true,
        cursorStyle: "block",
        fontSize: 13,
        lineHeight: 1.25,
        fontFamily:
          '"Cascadia Code", "Cascadia Mono", "Fira Code", Consolas, monospace',
        scrollback: 10000,
        scrollOnUserInput: true,
        smoothScrollDuration: 0,
        convertEol: true,
        rightClickSelectsWord: false,
        theme: {
          background: "#080b0f",
          foreground: "#d4d4d4",
          cursor: "#3b82f6",
          cursorAccent: "#080b0f",
          selectionBackground: "rgba(59, 130, 246, 0.35)",
          selectionForeground: "#ffffff",
          black: "#000000",
          brightBlack: "#666666",
          blue: "#569CD6",
          brightBlue: "#9CDCFE",
          cyan: "#4EC9B0",
          brightCyan: "#4EC9B0",
          green: "#6A9955",
          brightGreen: "#b5cea8",
          yellow: "#DCDCAA",
          brightYellow: "#DCDCAA",
          red: "#F44747",
          brightRed: "#f87171",
          magenta: "#C586C0",
          brightMagenta: "#C586C0",
          white: "#D4D4D4",
          brightWhite: "#FFFFFF",
        },
      });

      const fitAddon = new FitAddon();
      terminal.loadAddon(fitAddon);

      const webLinksAddon = new WebLinksAddon(
        (_event, url) => {
          setTerminalLinkPopup(null);
          window.open(url, "_blank", "noopener,noreferrer");
        },
        {
          hover: (event, text, location) => {
            if (!location) return;
            setTerminalLinkPopup({
              url: text,
              x: event.clientX,
              y: event.clientY,
            });
          },
          leave: () => {
            setTerminalLinkPopup(null);
          },
        }
      );

      terminal.loadAddon(webLinksAddon);
      terminal.open(container);

      terminalInstancesRef.current.set(session.id, terminal);
      terminalFitsRef.current.set(session.id, fitAddon);

      const socket = io("http://localhost:5000", {
        transports: ["polling", "websocket"],
        upgrade: true,
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        timeout: 10000,
        autoConnect: true,
      });

      terminalSocketsRef.current.set(session.id, socket);

      const updateSession = (patch) => {
        setTerminalSessions((current) => {
          let changed = false;
          const next = current.map((item) => {
            if (item.id !== session.id) return item;
            const updated = { ...item, ...patch };
            if (
              updated.connected !== item.connected ||
              updated.status !== item.status ||
              updated.detectedUrl !== item.detectedUrl
            ) {
              changed = true;
            }
            return updated;
          });
          return changed ? next : current;
        });
      };

      updateSession({ status: "CONNECTING", connected: false });

      const fitTerminal = () => {
        requestAnimationFrame(() => {
          try {
            if (
              !container ||
              container.clientWidth === 0 ||
              container.clientHeight === 0
            )
              return;
            fitAddon.fit();
            const cols = Math.max(1, terminal.cols);
            const rows = Math.max(1, terminal.rows);
            if (cols > 0 && rows > 0 && socket.connected) {
              socket.emit("terminal:resize", { cols, rows });
            }
          } catch {
            /* ignore */
          }
        });
      };

      // Custom key event handler for Ctrl+C, Ctrl+Shift+C, Ctrl+V, Ctrl+Shift+V, Ctrl+L
      terminal.attachCustomKeyEventHandler((arg) => {
        if (arg.type !== "keydown") return true;

        const isCtrlOrCmd = arg.ctrlKey || arg.metaKey;
        const key = arg.key.toLowerCase();

        // Ctrl+C: copy if text selected; if no selection, let xterm send ^C (\x03) to PTY
        if (isCtrlOrCmd && !arg.shiftKey && key === "c") {
          if (terminal.hasSelection()) {
            const selected = terminal.getSelection();
            navigator.clipboard.writeText(selected).catch(() => {});
            return false;
          }
          return true;
        }

        // Ctrl+Shift+C: copy selected text
        if (isCtrlOrCmd && arg.shiftKey && key === "c") {
          if (terminal.hasSelection()) {
            const selected = terminal.getSelection();
            navigator.clipboard.writeText(selected).catch(() => {});
          }
          return false;
        }

        // Ctrl+V or Ctrl+Shift+V: paste clipboard content
        if (isCtrlOrCmd && key === "v") {
          navigator.clipboard
            .readText()
            .then((text) => {
              if (text) {
                terminal.paste(text);
              }
            })
            .catch(() => {});
          return false;
        }

        // Ctrl+L: Clear terminal screen
        if (isCtrlOrCmd && !arg.shiftKey && key === "l") {
          terminal.clear();
          return false;
        }

        return true;
      });

      // Right-click contextmenu handler: Paste clipboard text into terminal without browser context menu
      const handleContextMenu = (e) => {
        e.preventDefault();
        if (terminal.hasSelection()) {
          const selected = terminal.getSelection();
          navigator.clipboard.writeText(selected).catch(() => {});
        } else {
          navigator.clipboard
            .readText()
            .then((text) => {
              if (text) {
                terminal.paste(text);
              }
            })
            .catch(() => {});
        }
      };
      container.addEventListener("contextmenu", handleContextMenu);

      const handleMouseDown = () => {
        terminal.focus();
      };
      container.addEventListener("mousedown", handleMouseDown);

      // ResizeObserver for modern terminal container responsiveness
      const resizeObserver = new ResizeObserver(() => {
        fitTerminal();
      });
      resizeObserver.observe(container);
      terminalResizeObserversRef.current.set(session.id, resizeObserver);

      socket.on("connect", () => {
        updateSession({ connected: true, status: "CONNECTED" });
        fitTerminal();
      });

      socket.on("disconnect", () => {
        updateSession({ connected: false, status: "DISCONNECTED" });
      });

      socket.on("connect_error", () => {
        updateSession({ connected: false, status: "ERROR" });
      });

      const detectLocalServerUrl = (source) => {
        const clean = String(source || "")
          // eslint-disable-next-line no-control-regex
          .replace(/\u001b(?:[@-_]|\[[0-?]*[ -/]*[@-~])/g, "")
          .replace(/\r/g, "");

        const match = clean.match(
          /https?:\/\/(?:localhost|127\.0\.0\.1):\d{2,5}(?:\/[^\s"'<>]*)?/i
        );

        if (match) {
          const detectedUrl = match[0].replace(/[.,;)\]}]+$/, "");
          updateSession({ detectedUrl });
          return detectedUrl;
        }

        const bare = clean.match(
          /(?:localhost|127\.0\.0\.1)\s*:\s*\d{2,5}(?:\/[^\s"'<>]*)?/i
        );

        if (bare) {
          const detectedUrl = `http://${bare[0]}`.replace(/\s+/g, "");
          updateSession({ detectedUrl });
          return detectedUrl;
        }

        return null;
      };

      const urlScanner = window.setInterval(() => {
        try {
          const activeBuffer = terminal.buffer.active;
          const lines = [];
          const start = Math.max(0, activeBuffer.baseY);
          const end = Math.min(activeBuffer.length, start + 200);

          for (let i = start; i < end; i += 1) {
            const line = activeBuffer.getLine(i);
            if (line) lines.push(line.translateToString(true));
          }

          detectLocalServerUrl(lines.join("\n"));
        } catch {
          /* ignore */
        }
      }, 500);

      socket.on("terminal:data", (data) => {
        const text = String(data);

        // Smart auto-scroll: scroll to bottom ONLY if user is already near bottom
        const buffer = terminal.buffer.active;
        const isAtBottom = buffer.viewportY >= buffer.baseY - 3;

        terminal.write(text, () => {
          if (isAtBottom) {
            terminal.scrollToBottom();
          }
        });

        detectLocalServerUrl(text);

        let bufferText =
          terminalOutputBuffersRef.current.get(session.id) || "";
        bufferText += text;
        if (bufferText.length > 20000) {
          bufferText = bufferText.slice(-20000);
        }
        terminalOutputBuffersRef.current.set(session.id, bufferText);
        detectLocalServerUrl(bufferText);
      });

      terminal.onData((data) => {
        socket.emit("terminal:input", data);
      });

      terminal.onResize(({ cols, rows }) => {
        if (cols > 0 && rows > 0 && socket.connected) {
          socket.emit("terminal:resize", { cols, rows });
        }
      });

      const handleWindowResize = () => fitTerminal();
      window.addEventListener("resize", handleWindowResize);

      const timer = setTimeout(fitTerminal, 100);

      terminal._devsyncCleanup = () => {
        clearTimeout(timer);
        clearInterval(urlScanner);
        window.removeEventListener("resize", handleWindowResize);
        container.removeEventListener("contextmenu", handleContextMenu);
        container.removeEventListener("mousedown", handleMouseDown);
        resizeObserver.disconnect();
      };
    });
  }, [terminalSessions]);

  useEffect(() => {
    const fitActiveTerminal = () => {
      if (terminalTab !== "TERMINAL" || !showTerminal) return;

      const terminal = terminalInstancesRef.current.get(activeTerminalId);
      const fitAddon = terminalFitsRef.current.get(activeTerminalId);
      const socket = terminalSocketsRef.current.get(activeTerminalId);

      if (!terminal || !fitAddon) return;

      requestAnimationFrame(() => {
        try {
          fitAddon.fit();
          const cols = Math.max(1, terminal.cols);
          const rows = Math.max(1, terminal.rows);
          if (cols > 0 && rows > 0 && socket?.connected) {
            socket.emit("terminal:resize", { cols, rows });
          }
          terminal.focus();
        } catch {
          /* ignore */
        }
      });
    };

    fitActiveTerminal();
  }, [activeTerminalId, terminalHeight, terminalTab, showTerminal, showAI, showExplorer]);

  useEffect(() => {
    const instancesMap = terminalInstancesRef.current;
    const observersMap = terminalResizeObserversRef.current;
    const socketsMap = terminalSocketsRef.current;

    return () => {
      instancesMap.forEach((terminal) => {
        try {
          terminal._devsyncCleanup?.();
          terminal.dispose();
        } catch {
          /* ignore */
        }
      });

      observersMap.forEach((observer) => {
        try {
          observer.disconnect();
        } catch {
          /* ignore */
        }
      });

      socketsMap.forEach((socket) => {
        try {
          socket.disconnect();
        } catch {
          /* ignore */
        }
      });
    };
  }, []);

  const currentFile = useMemo(
    () => files.find((file) => file.name === activeFile),
    [files, activeFile]
  );

  const filteredFiles = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return files;
    return files.filter((file) =>
      file.name.toLowerCase().includes(query)
    );
  }, [files, search]);

  const openFile = (file) => {
    setActiveFile(file.name);
    setCode(file.code);
    setAnalysis(null);
    setSaved(false);
  };

  const updateCode = (value) => {
    setCode(value);
    setSaved(false);
    setFiles((current) =>
      current.map((file) =>
        file.name === activeFile ? { ...file, code: value } : file
      )
    );
  };

  const sendTerminalInput = (input) => {
    const socket = terminalSocketsRef.current.get(activeTerminalId);
    if (!socket) return;
    socket.emit("terminal:input", input);
  };

  const saveCode = () => {
    setFiles((current) =>
      current.map((file) =>
        file.name === activeFile ? { ...file, code } : file
      )
    );

    setSaved(true);
    addTerminal(`✓ Saved ${activeFile}`);
    setTimeout(() => setSaved(false), 1800);
  };

  const runCode = () => {
    setShowTerminal(true);
    setTerminalTab("TERMINAL");
    sendTerminalInput(`node "${activeFile}"\r`);
  };

  const addTerminal = (line) => {
    const terminal = terminalInstancesRef.current.get(activeTerminalId);
    if (!terminal) return;
    terminal.writeln(String(line));
    terminal.scrollToBottom();
  };

  const analyzeCode = (mode = "analyze") => {
    const problems = [];

    if (!code.trim()) {
      problems.push({
        type: "error",
        title: "Empty file",
        message: "There is no code to analyze.",
      });
    }

    if (
      code.includes("fetch(") &&
      !code.includes("try") &&
      !code.includes("catch")
    ) {
      problems.push({
        type: "warning",
        title: "Missing error handling",
        message:
          "Network failures are not handled. Consider wrapping the request in try/catch.",
      });
    }

    if (code.includes("innerHTML")) {
      problems.push({
        type: "security",
        title: "Potential unsafe HTML insertion",
        message:
          "Review dynamic HTML insertion. Prefer safe DOM APIs or sanitized content.",
      });
    }

    if (
      code.includes("function calculateTotal") &&
      !code.includes("typeof price")
    ) {
      problems.push({
        type: "warning",
        title: "Input validation",
        message:
          "calculateTotal assumes valid numeric inputs. Validate price and quantity before calculating.",
      });
    }

    if (mode === "security" && problems.length === 0) {
      problems.push({
        type: "success",
        title: "No obvious security issue",
        message:
          "The demo security scan did not detect a common unsafe pattern in this file.",
      });
    }

    if (problems.length === 0) {
      problems.push({
        type: "success",
        title: "Looks good",
        message:
          "No obvious problems were detected by the DevSync demo analyzer.",
      });
    }

    setAnalysis(problems);

    const summary =
      problems.length === 1 && problems[0].type === "success"
        ? `I reviewed ${activeFile}. I didn't find an obvious issue.`
        : `I reviewed ${activeFile} and found ${problems.length} item${
            problems.length === 1 ? "" : "s"
          } worth reviewing.`;

    setMessages((current) => [
      ...current,
      { role: "ai", text: summary },
    ]);

    setTerminalTab("PROBLEMS");
  };

  const runAIAction = (action) => {
    const actionMap = {
      "Find Bugs":
        "I checked the current file for common logic and runtime problems. Review the Problems panel for the detected issues.",
      "Security Check":
        "I checked the current file for a few common unsafe patterns. Review the Problems panel for security-related findings.",
      "Improve Code":
        "I would improve this code by validating inputs, handling failures explicitly, keeping functions focused, and using clearer naming where appropriate.",
      Explain:
        "The current file is being used as the context. I can explain individual functions, variables, data flow, and why each part exists.",
      Optimize:
        "For optimization, first measure the slow path. Then reduce repeated work, avoid unnecessary allocations, and choose appropriate data structures.",
    };

    setMessages((current) => [
      ...current,
      {
        role: "user",
        text: `${action} ${activeFile}`,
      },
      {
        role: "ai",
        text:
          actionMap[action] ||
          "I reviewed the current file and prepared suggestions.",
      },
    ]);

    if (action === "Find Bugs") analyzeCode("bugs");
    if (action === "Security Check") analyzeCode("security");
  };

  const askAI = () => {
    const trimmed = question.trim();
    if (!trimmed) return;

    setQuestion("");

    const lower = trimmed.toLowerCase();
    let response =
      "I can work with the current file as context. Try asking whether the code is correct, asking me to explain it, find a bug, improve performance, or review security.";

    if (
      lower.includes("correct") ||
      lower.includes("check") ||
      lower.includes("review")
    ) {
      response =
        `I'll review ${activeFile}. Click Analyze Code for structured findings, and I can also discuss any specific function or error here.`;
      analyzeCode();
    } else if (lower.includes("bug") || lower.includes("error")) {
      response =
        `Let's debug ${activeFile}. I would start by checking the failing line, inputs, control flow, and error handling. I also ran the demo analyzer for common issues.`;
      analyzeCode("bugs");
    } else if (lower.includes("explain")) {
      response =
        `This file is ${currentFile?.language || "code"}. I can explain it function-by-function. For the current demo, the main logic can be understood from the active editor content above.`;
    } else if (
      lower.includes("improve") ||
      lower.includes("refactor") ||
      lower.includes("optimize")
    ) {
      response =
        "A cleaner implementation should keep functions focused, validate inputs, handle failure cases, and avoid repeated work. I can help refactor one function at a time.";
    } else if (
      lower.includes("security") ||
      lower.includes("secure")
    ) {
      response =
        "For security, I would check input validation, unsafe HTML/SQL construction, authentication boundaries, secrets, permissions, and error information leakage.";
      analyzeCode("security");
    }

    setMessages((current) => [
      ...current,
      { role: "user", text: trimmed },
      { role: "ai", text: response },
    ]);
  };

  const createFile = () => {
    const name = newFileName.trim();
    if (!name) return;

    if (files.some((file) => file.name === name)) {
      addTerminal(`Ã¢Å“â€” ${name} already exists.`);
      return;
    }

    const extension = name.split(".").pop().toLowerCase();

    const language =
      extension === "py"
        ? "Python"
        : extension === "java"
        ? "Java"
        : extension === "html"
        ? "HTML"
        : extension === "css"
        ? "CSS"
        : extension === "json"
        ? "JSON"
        : extension === "md"
        ? "Markdown"
        : "JavaScript";

    const newFile = {
      name,
      language,
      code:
        language === "Python"
          ? `def hello():\n    print("Hello from DevSync")\n\nhello()`
          : language === "Java"
          ? `public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello from DevSync");\n  }\n}`
          : "",
    };

    setFiles((current) => [...current, newFile]);
    setNewFileName("");
    setShowNewFile(false);
    openFile(newFile);
    addTerminal(`✓ Created ${name}`);
  };

  const deleteCurrentFile = () => {
    if (files.length <= 1) {
      addTerminal("Ã¢Å“â€” Workspace must contain at least one file.");
      return;
    }

    const index = files.findIndex((file) => file.name === activeFile);
    const remaining = files.filter((file) => file.name !== activeFile);

    setFiles(remaining);

    const next = remaining[Math.max(0, index - 1)];
    setActiveFile(next.name);
    setCode(next.code);
    setAnalysis(null);
    addTerminal(`✓ Deleted ${activeFile}`);
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      addTerminal("Ã¢Å“â€” Clipboard access was unavailable.");
    }
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#0b0f14] text-slate-200">

      {/* TOP BAR */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-slate-800 bg-[#11161d] px-3">

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/demo")}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-800 hover:text-white"
            title="Back to Demo Workspace"
          >
            <FaArrowLeft className="text-sm" />
          </button>

          <div className="mx-1 h-6 w-px bg-slate-800" />

          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
            <FaCode className="text-sm" />
          </div>

          <div className="hidden sm:block">
            <p className="text-xs font-black text-white">
              DevSync
              <span className="font-normal text-slate-500">
                {" "}
                / AI Workspace
              </span>
            </p>
            <p className="text-[9px] text-slate-600">
              developer environment
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">

          <button
            onClick={saveCode}
            className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-[10px] font-black text-slate-300 transition hover:border-blue-500 hover:text-white"
          >
            <FaSave />
            <span className="hidden sm:inline">
              {saved ? "Saved" : "Save"}
            </span>
          </button>

          <button
            onClick={runCode}
            className="flex items-center gap-2 rounded-lg bg-green-600 px-3 py-2 text-[10px] font-black text-white transition hover:bg-green-500"
          >
            <FaPlay />
            Run
          </button>

          <div className="ml-1 hidden h-8 items-center gap-2 rounded-lg border border-slate-800 px-3 text-[9px] text-slate-500 md:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            Demo Runtime
          </div>

        </div>
      </header>

      {/* MAIN IDE */}
      <div className="flex min-h-0 flex-1">

        {/* EXPLORER */}
        {showExplorer && (
          <aside className="hidden w-60 shrink-0 flex-col border-r border-slate-800 bg-[#0d1218] md:flex">

            <div className="flex h-11 items-center justify-between border-b border-slate-800 px-3">
              <span className="text-[10px] font-black tracking-widest text-slate-500">
                EXPLORER
              </span>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setShowNewFile(true)}
                  className="flex h-7 w-7 items-center justify-center rounded text-slate-500 hover:bg-slate-800 hover:text-white"
                  title="New file"
                >
                  <FaPlus className="text-[10px]" />
                </button>

                <button
                  onClick={deleteCurrentFile}
                  className="flex h-7 w-7 items-center justify-center rounded text-slate-500 hover:bg-red-500/10 hover:text-red-400"
                  title="Delete current file"
                >
                  <FaTrash className="text-[10px]" />
                </button>
              </div>
            </div>

            <div className="border-b border-slate-800 p-2">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-600" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search files..."
                  className="w-full rounded-md border border-slate-800 bg-[#080b0f] py-2 pl-8 pr-2 text-[10px] text-slate-300 outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto p-2">

              <div className="mb-2 flex items-center gap-2 px-2 py-1 text-[10px] font-black text-slate-400">
                <FaChevronDown className="text-[8px]" />
                <FaFolder className="text-yellow-500" />
                DEVSYNC
              </div>

              <div className="space-y-0.5">
                {filteredFiles.map((file) => (
                  <button
                    key={file.name}
                    onClick={() => openFile(file)}
                    className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-[11px] transition ${
                      activeFile === file.name
                        ? "bg-blue-500/10 text-blue-300"
                        : "text-slate-500 hover:bg-slate-800/60 hover:text-slate-300"
                    }`}
                  >
                    <FaFile
                      className={
                        file.name.endsWith(".jsx") ||
                        file.name.endsWith(".js")
                          ? "text-yellow-400"
                          : file.name.endsWith(".json")
                          ? "text-orange-400"
                          : "text-slate-600"
                      }
                    />
                    <span className="truncate">{file.name}</span>
                  </button>
                ))}
              </div>

            </div>

            {showNewFile && (
              <div className="border-t border-slate-800 bg-[#11161d] p-3">
                <p className="mb-2 text-[10px] font-black text-slate-400">
                  NEW FILE
                </p>

                <input
                  autoFocus
                  value={newFileName}
                  onChange={(event) => setNewFileName(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") createFile();
                    if (event.key === "Escape") setShowNewFile(false);
                  }}
                  placeholder="example.js"
                  className="w-full rounded-md border border-slate-700 bg-black px-3 py-2 text-[10px] text-white outline-none focus:border-blue-500"
                />

                <div className="mt-2 flex gap-2">
                  <button
                    onClick={createFile}
                    className="flex-1 rounded-md bg-blue-600 py-2 text-[10px] font-black text-white"
                  >
                    Create
                  </button>

                  <button
                    onClick={() => setShowNewFile(false)}
                    className="rounded-md border border-slate-700 px-3 text-slate-500"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>
            )}

          </aside>
        )}

        {/* CENTER */}
        <section className="flex min-w-0 flex-1 flex-col">

          {/* EDITOR TOOLBAR */}
          <div className="flex h-11 shrink-0 items-center justify-between border-b border-slate-800 bg-[#0d1218]">

            <div className="flex min-w-0 items-center">

              <button
                onClick={() => openFile(currentFile)}
                className="flex h-11 max-w-[220px] items-center gap-2 border-r border-slate-800 bg-[#0b0f14] px-4 text-[10px] font-bold text-slate-300"
              >
                <FaFile className="shrink-0 text-yellow-400" />
                <span className="truncate">{activeFile}</span>
                {!saved && (
                  <span className="text-slate-600">Ã¢â€”Â</span>
                )}
              </button>

              <span className="hidden px-3 text-[9px] text-slate-600 sm:inline">
                {currentFile?.language || "JavaScript"}
              </span>

            </div>

            <div className="flex items-center gap-1 px-2">

              <button
                onClick={copyCode}
                className="flex h-7 items-center gap-2 rounded-md px-2 text-[9px] text-slate-500 hover:bg-slate-800 hover:text-white"
                title="Copy code"
              >
                <FaCopy />
                <span className="hidden lg:inline">
                  {copied ? "Copied" : "Copy"}
                </span>
              </button>

              <button
                onClick={() => setShowExplorer((value) => !value)}
                className="hidden rounded-md px-2 py-1.5 text-[9px] text-slate-500 hover:bg-slate-800 hover:text-white md:block"
              >
                Explorer
              </button>

              <button
                onClick={() => setShowAI((value) => !value)}
                className={`rounded-md px-2 py-1.5 text-[9px] ${
                  showAI
                    ? "bg-purple-500/10 text-purple-300"
                    : "text-slate-500 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <FaRobot className="inline mr-1" />
                AI
              </button>

            </div>
          </div>

          {/* EDITOR */}
          <div className="relative min-h-0 flex-1 bg-[#0b0f14]">

            <div className="absolute inset-0 overflow-auto font-mono text-[12px] leading-6">

              <div className="flex min-w-max">

                {/* LINE NUMBERS */}
                <div className="sticky left-0 z-10 select-none border-r border-slate-800 bg-[#0b0f14] px-3 py-4 text-right text-slate-700">
                  {code.split("\n").map((_, index) => (
                    <div key={index} className="h-6">
                      {index + 1}
                    </div>
                  ))}
                </div>

                {/* CODE */}
                <textarea
                  value={code}
                  onChange={(event) => updateCode(event.target.value)}
                  spellCheck={false}
                  className="min-h-full w-[calc(100vw-300px)] min-w-[600px] resize-none bg-transparent px-4 py-4 font-mono text-[12px] leading-6 text-slate-300 outline-none"
                  style={{
                    tabSize: 2,
                  }}
                />

              </div>

            </div>

            {/* EDITOR STATUS */}
            <div className="absolute bottom-0 left-0 right-0 flex h-6 items-center justify-between border-t border-slate-800 bg-[#11161d] px-3 text-[9px] text-slate-600">

              <div className="flex items-center gap-4">
                <span>Ln {code.split("\n").length}</span>
                <span>Spaces: 2</span>
                <span>UTF-8</span>
              </div>

              <div className="flex items-center gap-3">
                <span>{currentFile?.language}</span>
                <span className="text-green-500">✓</span>
              </div>

            </div>

          </div>

          {/* TERMINAL */}
          {showTerminal && (
            <div
              className="relative flex shrink-0 flex-col border-t border-slate-800 bg-[#080b0f]"
              style={{ height: `${terminalHeight}px` }}
            >
              {/* RESIZE HANDLE */}
              <div
                onMouseDown={(event) => {
                  event.preventDefault();
                  setIsResizingTerminal(true);

                  const startY = event.clientY;
                  const startHeight = terminalHeight;

                  const handleMouseMove = (moveEvent) => {
                    const delta = startY - moveEvent.clientY;
                    const maxHeight = Math.max(180, window.innerHeight - 120);
                    setTerminalHeight(
                      Math.min(Math.max(startHeight + delta, 150), maxHeight)
                    );
                  };

                  const handleMouseUp = () => {
                    setIsResizingTerminal(false);
                    window.removeEventListener("mousemove", handleMouseMove);
                    window.removeEventListener("mouseup", handleMouseUp);
                  };

                  window.addEventListener("mousemove", handleMouseMove);
                  window.addEventListener("mouseup", handleMouseUp);
                }}
                className={`group absolute -top-1 left-0 right-0 z-50 h-3 cursor-row-resize ${
                  isResizingTerminal ? "bg-blue-500" : "hover:bg-blue-500/40"
                }`}
                title="Drag to resize terminal"
              >
                <div className="mx-auto mt-[3px] h-[2px] w-20 rounded-full bg-slate-500 opacity-0 transition group-hover:opacity-100" />
              </div>

              {/* TERMINAL HEADER */}
              <div className="flex h-9 shrink-0 items-center justify-between border-b border-slate-800 bg-[#0d1218] px-2">
                <div className="flex h-full min-w-0 items-center gap-1 overflow-x-auto">
                  <div className="flex h-full items-center gap-1">
                    {terminalSessions.map((session) => (
                      <button
                        key={session.id}
                        onClick={() => {
                          setActiveTerminalId(session.id);
                          setTerminalTab("TERMINAL");
                        }}
                        className={`group flex h-full shrink-0 items-center gap-2 border-r border-slate-800 px-3 text-[9px] font-bold transition ${
                          activeTerminalId === session.id
                            ? "border-b-2 border-blue-500 bg-[#111820] text-slate-200"
                            : "text-slate-600 hover:bg-[#10161d] hover:text-slate-400"
                        }`}
                      >
                        <span
                          className={`h-2 w-2 rounded-full ${
                            session.status === "CONNECTED"
                              ? "bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)]"
                              : session.status === "CONNECTING"
                              ? "bg-amber-400 animate-pulse"
                              : "bg-red-500"
                          }`}
                        />
                        <span>{session.name}</span>
                        {terminalSessions.length > 1 && (
                          <span
                            onClick={(event) => {
                              event.stopPropagation();
                              closeTerminalSession(session.id);
                            }}
                            className="ml-1 rounded px-1 text-slate-500 transition hover:bg-slate-700 hover:text-white"
                            title="Close terminal session"
                          >
                            ×
                          </span>
                        )}
                      </button>
                    ))}

                    {/* NEW TERMINAL */}
                    <button
                      onClick={createTerminalSession}
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-slate-500 transition hover:bg-slate-800 hover:text-white"
                      title="New terminal session"
                    >
                      <FaPlus className="text-[10px]" />
                    </button>
                  </div>

                  <div className="ml-3 flex h-full items-center gap-4">
                    {["TERMINAL", "PROBLEMS", "OUTPUT"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setTerminalTab(tab)}
                        className={`h-full text-[9px] font-black tracking-wider transition ${
                          terminalTab === tab
                            ? "border-b-2 border-blue-500 text-slate-200"
                            : "text-slate-600 hover:text-slate-400"
                        }`}
                      >
                        {tab}
                        {tab === "PROBLEMS" && analysis && (
                          <span className="ml-1.5 rounded-full bg-red-500/20 px-1.5 py-0.5 text-[8px] font-bold text-red-400">
                            {analysis.filter((item) => item.type !== "success").length}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="ml-2 flex shrink-0 items-center gap-2">
                  {/* CLEAR TERMINAL BUTTON */}
                  <button
                    onClick={clearActiveTerminal}
                    className="flex h-6 items-center gap-1.5 rounded px-2 text-[9px] text-slate-400 transition hover:bg-slate-800 hover:text-white"
                    title="Clear active terminal output (Ctrl+L)"
                  >
                    <FaTrash className="text-[9px]" />
                    <span className="hidden sm:inline">Clear</span>
                  </button>

                  {/* SCROLL TO BOTTOM BUTTON */}
                  <button
                    onClick={scrollToBottomActiveTerminal}
                    className="flex h-6 items-center gap-1.5 rounded px-2 text-[9px] text-slate-400 transition hover:bg-slate-800 hover:text-white"
                    title="Scroll to bottom"
                  >
                    <FaArrowDown className="text-[9px]" />
                    <span className="hidden sm:inline">Bottom</span>
                  </button>

                  {/* CONNECTION STATUS BADGE */}
                  <div className="flex items-center gap-1.5 rounded-md border border-slate-800 bg-[#090d14] px-2 py-0.5 text-[9px] font-medium text-slate-400">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        activeTerminal?.status === "CONNECTED"
                          ? "bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)]"
                          : activeTerminal?.status === "CONNECTING"
                          ? "bg-amber-400 animate-pulse"
                          : "bg-red-500"
                      }`}
                    />
                    <span className="font-semibold text-slate-300">
                      {activeTerminal?.status || (activeTerminal?.connected ? "CONNECTED" : "DISCONNECTED")}
                    </span>
                  </div>

                  {/* CLOSE TERMINAL PANEL */}
                  <button
                    onClick={() => setShowTerminal(false)}
                    className="flex h-6 w-6 items-center justify-center rounded text-slate-500 transition hover:bg-slate-800 hover:text-white"
                    title="Close terminal panel"
                  >
                    <FaTimes className="text-[10px]" />
                  </button>
                </div>
              </div>

              {/* LOCAL SERVER LINK / HOVER ACTION */}
{terminalLinkPopup &&
  terminalTab === "TERMINAL" &&
  activeTerminal?.detectedUrl && (
    <div
      className="fixed z-[9999] flex items-center gap-1 rounded-md border border-slate-700 bg-[#151a21] px-2 py-1 shadow-xl shadow-black/40"
      style={{
        left: `${terminalLinkPopup.x + 8}px`,
        top: `${terminalLinkPopup.y + 18}px`,
      }}
      onMouseEnter={() => {
        // Keep the popup open while the pointer is over it.
      }}
      onMouseLeave={() => {
        setTerminalLinkPopup(null);
      }}
    >
      <button
        type="button"
        onClick={() => {
          const url = terminalLinkPopup.url;

          setTerminalLinkPopup(null);

          window.open(
            url,
            "_blank",
            "noopener,noreferrer"
          );
        }}
        className="flex items-center gap-1 rounded px-2 py-1 text-[10px] font-semibold text-blue-300 transition hover:bg-blue-500/15 hover:text-blue-200"
      >
        <span>Follow Link</span>
        <span className="text-[10px]">↗</span>
      </button>
    </div>
  )}

              {/* TERMINAL CONTENT */}
              <div className="min-h-0 flex-1 overflow-hidden">
                {terminalSessions.map((session) => (
                  <div
                    key={session.id}
                    ref={(node) => setTerminalContainerRef(session.id, node)}
                    className={`h-full w-full ${
                      activeTerminalId === session.id && terminalTab === "TERMINAL"
                        ? "block"
                        : "hidden"
                    }`}
                  />
                ))}

                {terminalTab === "OUTPUT" && (
                  <div className="h-full overflow-y-auto p-3 font-mono text-[10px] leading-5 text-slate-400">
                    <span className="text-green-400">✓</span> Latest run completed successfully.
                    <br />
                    <span className="text-slate-600">
                      Run commands directly inside the real PowerShell terminal.
                    </span>
                  </div>
                )}

                {terminalTab === "PROBLEMS" && (
                  <div className="h-full overflow-y-auto p-3">
                    <div className="space-y-2">
                      {!analysis && (
                        <p className="text-[10px] text-slate-600">
                          No analysis yet. Use Analyze Code or an AI action.
                        </p>
                      )}

                      {analysis?.map((item, index) => (
                        <div
                          key={index}
                          className={`rounded-lg border p-2 text-[10px] ${
                            item.type === "error"
                              ? "border-red-500/20 bg-red-500/5 text-red-300"
                              : item.type === "security"
                              ? "border-orange-500/20 bg-orange-500/5 text-orange-300"
                              : item.type === "warning"
                              ? "border-yellow-500/20 bg-yellow-500/5 text-yellow-300"
                              : "border-green-500/20 bg-green-500/5 text-green-300"
                          }`}
                        >
                          <p className="font-bold">{item.title}</p>
                          <p className="mt-0.5 text-slate-400">{item.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {!showTerminal && (
            <button
              onClick={() => setShowTerminal(true)}
              className="flex h-7 shrink-0 items-center gap-2 border-t border-slate-800 bg-[#11161d] px-3 text-[9px] font-bold text-slate-600 hover:text-slate-300"
            >
              <FaTerminal />
              Show Terminal
            </button>
          )}

        </section>

        {/* AI PANEL */}
        {showAI && (
          <aside className="hidden w-[350px] shrink-0 flex-col border-l border-slate-800 bg-[#0d1218] xl:flex">

            {/* AI HEADER */}
            <div className="flex h-11 shrink-0 items-center justify-between border-b border-slate-800 px-4">

              <div className="flex items-center gap-2">

                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 text-white">
                  <FaRobot className="text-xs" />
                </div>

                <div>
                  <p className="text-[11px] font-black text-white">
                    DevSync AI
                  </p>
                  <p className="text-[8px] text-green-500">
                    Code context active
                  </p>
                </div>

              </div>

              <span className="rounded-full border border-purple-500/20 bg-purple-500/5 px-2 py-1 text-[8px] font-bold text-purple-300">
                AI ASSISTANT
              </span>

            </div>

            {/* AI QUICK ACTIONS */}
            <div className="border-b border-slate-800 p-3">

              <p className="mb-2 text-[9px] font-black uppercase tracking-wider text-slate-600">
                Quick actions
              </p>

              <div className="grid grid-cols-2 gap-2">

                <AIAction
                  icon={<FaCheckCircle />}
                  label="Analyze"
                  onClick={() => analyzeCode()}
                />

                <AIAction
                  icon={<FaBug />}
                  label="Find Bugs"
                  onClick={() => runAIAction("Find Bugs")}
                />

                <AIAction
                  icon={<FaShieldAlt />}
                  label="Security"
                  onClick={() => runAIAction("Security Check")}
                />

                <AIAction
                  icon={<FaMagic />}
                  label="Improve"
                  onClick={() => runAIAction("Improve Code")}
                />

                <AIAction
                  icon={<FaCode />}
                  label="Explain"
                  onClick={() => runAIAction("Explain")}
                />

                <AIAction
                  icon={<FaLightbulb />}
                  label="Optimize"
                  onClick={() => runAIAction("Optimize")}
                />

              </div>

            </div>

            {/* ANALYSIS SUMMARY */}
            {analysis && (
              <div className="border-b border-slate-800 p-3">

                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[9px] font-black uppercase tracking-wider text-slate-600">
                    Latest review
                  </span>

                  <span className="text-[9px] text-slate-600">
                    {analysis.length} finding
                    {analysis.length === 1 ? "" : "s"}
                  </span>
                </div>

                <div className="space-y-1.5">
                  {analysis.slice(0, 3).map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-2 rounded-lg bg-black/40 p-2"
                    >
                      <span
                        className={
                          item.type === "success"
                            ? "text-green-400"
                            : item.type === "security"
                            ? "text-orange-400"
                            : item.type === "error"
                            ? "text-red-400"
                            : "text-yellow-400"
                        }
                      >
                        {item.type === "success" ? (
                          <FaCheckCircle />
                        ) : (
                          <FaBug />
                        )}
                      </span>

                      <div className="min-w-0">
                        <p className="truncate text-[9px] font-bold text-slate-300">
                          {item.title}
                        </p>
                        <p className="mt-0.5 line-clamp-2 text-[8px] leading-4 text-slate-600">
                          {item.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* CHAT */}
            <div className="min-h-0 flex-1 overflow-y-auto p-3">

              <div className="space-y-4">

                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex gap-2 ${
                      message.role === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >

                    {message.role === "ai" && (
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-300">
                        <FaRobot className="text-[9px]" />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] rounded-xl px-3 py-2.5 text-[10px] leading-5 ${
                        message.role === "user"
                          ? "bg-blue-600 text-white"
                          : "border border-slate-800 bg-[#11161d] text-slate-400"
                      }`}
                    >
                      {message.text}
                    </div>

                  </div>
                ))}

              </div>

            </div>

            {/* CHAT INPUT */}
            <div className="border-t border-slate-800 p-3">

              <div className="rounded-xl border border-slate-700 bg-black p-2 focus-within:border-purple-500">

                <textarea
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      askAI();
                    }
                  }}
                  rows="3"
                  placeholder={`Ask DevSync AI about ${activeFile}...`}
                  className="w-full resize-none bg-transparent px-2 py-1 text-[10px] leading-5 text-slate-300 outline-none placeholder:text-slate-700"
                />

                <div className="flex items-center justify-between px-1 pt-1">

                  <span className="text-[8px] text-slate-700">
                    Enter to send Ã‚Â· Shift+Enter for new line
                  </span>

                  <button
                    onClick={askAI}
                    className="rounded-lg bg-purple-600 px-3 py-1.5 text-[9px] font-black text-white transition hover:bg-purple-500"
                  >
                    Ask AI
                  </button>

                </div>

              </div>

            </div>

          </aside>
        )}

      </div>

    </div>
  );
}

function AIAction({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 rounded-lg border border-slate-800 bg-black px-2.5 py-2.5 text-left text-[9px] font-bold text-slate-500 transition hover:border-purple-500/30 hover:bg-purple-500/5 hover:text-purple-300"
    >
      <span className="text-purple-400">{icon}</span>
      {label}
    </button>
  );
}

export default CodeWorkspace;


