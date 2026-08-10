"use client";

import { useState, useRef, useEffect } from "react";
import { Agent } from "@/lib/constants";
import { PERSONAS } from "@/lib/personas";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Loader2, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AgentChatProps {
  agent: Agent;
  onClose: () => void;
}

export default function AgentChat({ agent, onClose }: AgentChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const persona = PERSONAS[agent.id];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    // Greet on open
    setMessages([{
      role: "assistant",
      content: `${agent.emoji} I'm **${agent.name}**, ${persona?.role ?? agent.role}.\n\nI'm at my desk. What do you need from me?`
    }]);
    setTimeout(() => inputRef.current?.focus(), 300);
  }, [agent.id]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const userMsg: Message = { role: "user", content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentId: agent.id,
          messages: [...messages, userMsg].slice(-12), // Keep last 12 for context
        }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.reply ?? data.error ?? "No response." }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "⚠️ Connection error. Check your network." }]);
    }
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 20 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="flex flex-col w-full max-w-md h-[600px] rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.6)] border border-white/10"
      style={{ background: "rgba(8,8,24,0.97)" }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-5 py-4 border-b border-white/8"
        style={{ borderBottom: `1px solid ${agent.colorCode}30` }}
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 shadow-lg"
          style={{ background: `${agent.colorCode}25`, border: `1px solid ${agent.colorCode}50` }}
        >
          {agent.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-black text-white text-sm uppercase tracking-wider">{agent.name}</p>
          <p className="text-[10px] font-semibold tracking-widest uppercase truncate" style={{ color: agent.colorCode }}>
            {persona?.role ?? agent.role}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 status-online" />
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className={cn("flex gap-2", msg.role === "user" ? "justify-end" : "justify-start")}
          >
            {msg.role === "assistant" && (
              <div
                className="w-7 h-7 shrink-0 rounded-lg flex items-center justify-center text-sm mt-0.5"
                style={{ background: `${agent.colorCode}20`, border: `1px solid ${agent.colorCode}40` }}
              >
                {agent.emoji}
              </div>
            )}
            <div
              className={cn(
                "max-w-[82%] px-4 py-2.5 rounded-2xl text-[13px] leading-relaxed whitespace-pre-wrap",
                msg.role === "user"
                  ? "text-white rounded-br-sm"
                  : "text-slate-200 rounded-bl-sm"
              )}
              style={msg.role === "user"
                ? { background: `${agent.colorCode}cc`, boxShadow: `0 4px 20px ${agent.colorCode}40` }
                : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }
              }
            >
              {msg.content}
            </div>
          </motion.div>
        ))}

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 pl-9"
          >
            <div
              className="flex gap-1 px-4 py-3 rounded-2xl rounded-bl-sm"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {[0, 1, 2].map(d => (
                <span
                  key={d}
                  className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"
                  style={{ animationDelay: `${d * 0.15}s` }}
                />
              ))}
            </div>
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-4 border-t border-white/8">
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-xl"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()}
            placeholder={`Ask ${agent.name} anything...`}
            disabled={loading}
            className="flex-1 bg-transparent text-[13px] text-white placeholder-slate-500 outline-none"
          />
          <button
            onClick={send}
            disabled={!input.trim() || loading}
            className="w-8 h-8 flex items-center justify-center rounded-lg transition-all disabled:opacity-30"
            style={{ background: input.trim() && !loading ? agent.colorCode : "transparent" }}
          >
            {loading
              ? <Loader2 className="w-4 h-4 text-slate-400 animate-spin" />
              : <Send className="w-4 h-4 text-white" />
            }
          </button>
        </div>
        <p className="text-[10px] text-slate-600 mt-2 text-center font-mono">
          Powered by OpenRouter · {agent.name} AI is active
        </p>
      </div>
    </motion.div>
  );
}
