"use client";

import { SystemMetric } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  metric: SystemMetric;
}

export default function MetricCard({ metric }: MetricCardProps) {
  const isUp = metric.trend === "up";
  const isDown = metric.trend === "down";
  const isStable = metric.trend === "stable";

  return (
    <div className="relative overflow-hidden rounded-2xl glass p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-900/10 hover:border-purple-500/20">
      
      {/* Background glow based on metric color */}
      <div 
        className="absolute -right-4 -top-4 w-24 h-24 rounded-full blur-[40px] opacity-10 pointer-events-none"
        style={{ backgroundColor: metric.color }}
      />

      <div className="flex items-start gap-4">
        <div 
          className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-900/80 border border-slate-700/50 shadow-inner"
        >
          <span className="text-xl">{metric.icon}</span>
        </div>

        <div className="flex-1">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
            {metric.label}
          </h4>
          
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-bold text-white tracking-tight">
              {metric.value}
            </span>
            {metric.unit && (
              <span className="text-sm font-medium text-slate-500">
                {metric.unit}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 mt-2">
            {metric.trend && (
              <span 
                className={cn(
                  "text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider",
                  isUp && "text-emerald-400 bg-emerald-400/10",
                  isDown && "text-rose-400 bg-rose-400/10",
                  isStable && "text-slate-400 bg-slate-400/10"
                )}
              >
                {isUp ? "↑" : isDown ? "↓" : "−"} {metric.trend}
              </span>
            )}
            
            {metric.trendValue && (
              <span className="text-xs text-slate-500 font-medium">
                {metric.trendValue}
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-4 h-1.5 w-full bg-slate-800/50 rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full bar-animate" 
          style={{ 
            backgroundColor: metric.color, 
            width: typeof metric.value === 'number' ? `${Math.min(100, metric.value / 20)}%` : '75%' 
          }}
        />
      </div>
    </div>
  );
}
