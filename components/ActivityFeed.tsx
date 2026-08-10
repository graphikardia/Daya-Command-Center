"use client";

import { RECENT_ACTIVITY, TEAM } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function ActivityFeed() {
  return (
    <div className="flex flex-col h-full glass rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-slate-800/60 bg-slate-900/40">
        <h3 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          Live System Feed
        </h3>
        <button className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 hover:text-white transition-colors">
          View All
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2">
        <div className="space-y-1">
          {RECENT_ACTIVITY.map((log) => {
            const agent = TEAM[log.agentId];
            
            return (
              <div 
                key={log.id} 
                className="group flex gap-3 p-3 rounded-xl transition-colors hover:bg-slate-800/30 cursor-pointer"
              >
                <div className="flex-shrink-0 mt-0.5">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700/50 flex items-center justify-center text-sm shadow-inner overflow-hidden relative">
                    {agent ? agent.emoji : "🤖"}
                    {agent && (
                      <div 
                        className="absolute bottom-0 left-0 right-0 h-0.5" 
                        style={{ backgroundColor: agent.colorCode, opacity: 0.8 }} 
                      />
                    )}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline gap-2">
                    <p className="text-xs font-bold text-slate-200 capitalize truncate">
                      {agent ? agent.name : log.agentId}
                      <span className="text-slate-500 font-normal ml-2 text-[10px] px-1.5 py-0.5 rounded border border-slate-700/40">
                        {log.module}
                      </span>
                    </p>
                    <span className="text-[10px] text-slate-500 font-mono whitespace-nowrap shrink-0">
                      {log.timestamp}
                    </span>
                  </div>
                  
                  <p className={cn(
                    "text-[11px] mt-1 line-clamp-2 leading-relaxed",
                    log.type === "error" ? "text-rose-400" :
                    log.type === "warning" ? "text-amber-400" :
                    log.type === "success" ? "text-emerald-400" :
                    "text-slate-400"
                  )}>
                    {log.message}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
