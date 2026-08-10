"use client";

import { Agent, STATUS_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface AgentCardProps {
  agent: Agent;
}

export default function AgentCard({ agent }: AgentCardProps) {
  const statusInfo = STATUS_CONFIG[agent.status || "idle"];

  return (
    <div className="group relative rounded-2xl glass p-4 transition-all duration-300 hover:border-purple-500/30 hover:bg-white/[0.02]">
      {/* Glow effect on hover */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 mix-blend-screen pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${agent.colorCode}25 0%, transparent 70%)`
        }}
      />
      
      <div className="relative flex items-start justify-between gap-4">
        {/* Avatar */}
        <div className="relative shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-slate-900 border border-slate-700/50 shadow-inner overflow-hidden">
          <span className="text-2xl">{agent.emoji}</span>
          
          {/* Dept color accent line */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-1"
            style={{ backgroundColor: agent.colorCode, opacity: 0.8 }}
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white truncate">{agent.name}</h3>
            {/* Status dot */}
            <div className="flex items-center gap-1.5 shrink-0 px-2 py-0.5 rounded-full bg-slate-800/80 border border-slate-700/50">
              <span 
                className={cn("w-1.5 h-1.5 rounded-full", statusInfo.cssClass)} 
                style={{ backgroundColor: statusInfo.color }}
              />
              <span className="text-[10px] font-medium tracking-wider uppercase text-slate-400">
                {statusInfo.label}
              </span>
            </div>
          </div>
          
          <p className="text-xs text-purple-300/80 font-medium tracking-wide mt-0.5 truncate">
            {agent.role}
          </p>
        </div>
      </div>

      <div className="relative mt-4 space-y-2">
        <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">
          {agent.expertise}
        </p>
        
        {/* Current task indicator */}
        {agent.currentTask && (
          <div className="flex items-center gap-2 p-2 rounded-lg bg-black/40 border border-white/5">
            <span className="text-purple-400 text-xs animate-pulse">⟳</span>
            <p className="text-[10px] text-slate-300 truncate">
              {agent.currentTask}
            </p>
          </div>
        )}
      </div>

      {/* Footer stats */}
      <div className="relative mt-4 pt-3 border-t border-slate-700/30 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="text-xs text-slate-500">Tasks:</span>
          <span className="text-xs font-bold text-slate-300">{agent.tasksCompleted || 0}</span>
        </div>
        
        <button className="text-[10px] font-semibold text-purple-400 hover:text-purple-300 tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity">
          Open Console →
        </button>
      </div>
    </div>
  );
}
