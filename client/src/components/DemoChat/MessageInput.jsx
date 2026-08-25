import { useRef, useState } from "react";
import {
  FaPaperclip,
  FaPaperPlane,
  FaRegSmile,
  FaTimes,
} from "react-icons/fa";

function MessageInput({ channelName, onSend }) {
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState(null);
  const fileInputRef = useRef(null);

  const handleSend = () => {
    const text = message.trim();

    if (!text && !attachment) return;

    onSend?.({
      id: Date.now(),
      name: "Alex Morgan",
      initials: "A",
      message: text || `📎 ${attachment.name}`,
      time: "Just now",
      own: true,
    });

    setMessage("");
    setAttachment(null);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (file) {
      setAttachment(file);
    }

    event.target.value = "";
  };

  return (
    <div className="border-t border-slate-200 bg-white p-4 sm:p-5">

      {/* ATTACHMENT PREVIEW */}

      {attachment && (
        <div className="mb-3 flex items-center justify-between rounded-xl bg-blue-50 px-4 py-2.5">

          <div className="min-w-0">
            <p className="truncate text-xs font-bold text-blue-700">
              📎 {attachment.name}
            </p>

            <p className="text-[10px] text-blue-500">
              Ready to send
            </p>
          </div>

          <button
            onClick={() => setAttachment(null)}
            className="ml-3 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-blue-400 hover:bg-blue-100 hover:text-blue-700"
          >
            <FaTimes className="text-xs" />
          </button>

        </div>
      )}

      {/* INPUT */}

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-2 transition focus-within:border-blue-400 focus-within:bg-white focus-within:shadow-sm">

        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={handleKeyDown}
          rows="2"
          placeholder={`Message #${channelName}`}
          className="w-full resize-none bg-transparent px-3 py-2 text-sm leading-6 text-slate-700 outline-none placeholder:text-slate-400"
        />

        {/* TOOLBAR */}

        <div className="flex items-center justify-between px-2 pb-1">

          <div className="flex items-center gap-1">

            {/* FILE */}

            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              title="Attach file"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white hover:text-blue-600"
            >
              <FaPaperclip className="text-sm" />
            </button>

            {/* EMOJI */}

            <button
              title="Add emoji"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white hover:text-yellow-500"
            >
              <FaRegSmile className="text-sm" />
            </button>

          </div>

          <div className="flex items-center gap-3">

            <span className="hidden text-[10px] text-slate-400 sm:block">
              Enter to send · Shift + Enter for new line
            </span>

            <button
              onClick={handleSend}
              disabled={!message.trim() && !attachment}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-100 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FaPaperPlane className="text-xs" />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default MessageInput;