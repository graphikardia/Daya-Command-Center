"use client";

import { APP_META, NAV_ITEMS, NavSection } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface SidebarProps {
  activeSection: NavSection;
  onNavigate: (section: NavSection) => void;
}

export default function Sidebar({ activeSection, onNavigate }: SidebarProps) {
  const [agents, setAgents] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/agents')
      .then(res => res.json())
      .then(data => {
        if(Array.isArray(data)) setAgents(data);
      })
      .catch(() => {});
  }, []);

  const onlineCount = agents.filter(a => a.status === 'online').length;
  const busyCount = agents.filter(a => a.status === 'busy').length;
  const idleCount = Math.max(0, 12 - onlineCount - busyCount); // Presuming 12 agents total

  return (
    <aside className="relative flex flex-col w-full h-full text-slate-300">
      
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-800">
        <div className="w-8 h-8 rounded-md bg-purple-600 flex items-center justify-center shrink-0">
          <span className="text-white font-bold text-sm">⚡</span>
        </div>
        <div className="min-w-0">
          <h2 className="text-xs font-bold text-white uppercase tracking-wider truncate">
            {APP_META.shortName}
          </h2>
          <p className="text-[10px] text-slate-500 truncate">{APP_META.tagline}</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        <p className="px-2 mb-3 text-[10px] font-bold tracking-widest uppercase text-slate-500">
          Platform
        </p>
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors text-sm",
                isActive
                  ? "bg-purple-500/10 text-purple-400"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              )}
            >
              <span className={cn("shrink-0", isActive ? "text-purple-400" : "text-slate-500")}>
                {item.icon}
              </span>
              <span className="flex-1 font-medium truncate">{item.label}</span>
              {item.badge !== undefined && (
                <span className={cn(
                  "shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded tabular-nums",
                  isActive
                    ? "bg-purple-500/20 text-purple-400"
                    : "bg-slate-800 text-slate-500"
                )}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Agent Status Summary */}
      <div className="px-5 py-5 border-t border-slate-800 bg-[#00000022]">
        <p className="text-[10px] font-bold tracking-widest uppercase text-slate-500 mb-3">
          Agent Status (12)
        </p>
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col items-center gap-1 p-2 rounded bg-slate-900 border border-slate-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-xs font-semibold text-emerald-500">{onlineCount}</span>
          </div>
          <div className="flex flex-col items-center gap-1 p-2 rounded bg-slate-900 border border-slate-800">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span className="text-xs font-semibold text-amber-500">{busyCount}</span>
          </div>
          <div className="flex flex-col items-center gap-1 p-2 rounded bg-slate-900 border border-slate-800">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
            <span className="text-xs font-semibold text-slate-500">{idleCount}</span>
          </div>
        </div>
        <div className="flex justify-between mt-2 px-1">
          <span className="text-[9px] text-slate-500 uppercase tracking-wider">Online</span>
          <span className="text-[9px] text-slate-500 uppercase tracking-wider">Busy</span>
          <span className="text-[9px] text-slate-500 uppercase tracking-wider">Idle</span>
        </div>
      </div>
    </aside>
  );
}
