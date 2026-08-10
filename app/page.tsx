"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDayaStore, AgentNode, TaskNode } from "@/lib/useDayaStore";
import Sidebar from "@/components/Sidebar";
import Office3D from "@/components/3d/Office3D";
import { NavSection } from "@/lib/constants";
import { 
  Zap,
  RadioTower, 
  TerminalSquare, 
  Search,
  Settings,
  Users,
  Activity,
  BarChart,
  Megaphone,
  MonitorCheck,
  Globe,
  Camera,
  Briefcase,
  ShieldCheck
} from "lucide-react";

export default function CommandCenter() {
  const [isMounted, setIsMounted] = useState(false);
  const { 
    tasks, memory, agents, showHUD, activeSection, 
    setTasks, setMemory, setAgents, setShowHUD, setActiveSection 
  } = useDayaStore();

  useEffect(() => {
    setIsMounted(true);
    const fetchData = async () => {
      try {
        const [tasksRes, contentRes, agentsRes] = await Promise.all([
          fetch('/api/tasks').then(res => res.json()),
          fetch('/api/content').then(res => res.json()),
          fetch('/api/agents').then(res => res.json())
        ]);
        if(Array.isArray(tasksRes)) setTasks(tasksRes);
        setMemory(contentRes);
        if(Array.isArray(agentsRes)) setAgents(agentsRes);
      } catch(err) {
        console.error("Data fetch error:", err);
      }
    };
    
    fetchData();
    // Replaced 8s polling interval with setup for Future WebSockets via Daya Core!
  }, [setTasks, setMemory, setAgents]);

  if (!isMounted) return <div className="h-screen w-full bg-[#020205]" />;

  return (
    <div className="flex relative h-screen w-full bg-[#020205] overflow-hidden text-slate-200 font-sans">
      
      {/* ── Background: 3D Command Environment ── */}
      <div className="absolute inset-0 z-0 bg-[#020205]">
        <Office3D />
      </div>

      {/* ── UI Layer: Enterprise HUD ── */}
      <div className={`absolute inset-0 z-10 flex pointer-events-none transition-all duration-700 ${showHUD ? 'opacity-100 backdrop-blur-none' : 'opacity-0 backdrop-blur-sm'}`}>
        
        {/* Sidebar: Glassmorphism Blur (Hidden on Mobile) */}
        <div className="pointer-events-auto hidden md:block h-full w-[240px] shrink-0 border-r border-white/5 bg-[#050510D0] backdrop-blur-2xl">
          <Sidebar activeSection={activeSection as NavSection} onNavigate={setActiveSection} />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col relative h-full">
          
          {/* Topbar: Minimalist & Clean */}
          <header className="pointer-events-auto h-14 shrink-0 flex items-center justify-between px-8 border-b border-white/5 bg-[#050510A0] backdrop-blur-xl">
            <div className="flex items-center gap-5">
              <h1 className="text-xs font-black text-white uppercase tracking-[0.25em]">
                {activeSection.replace('-', ' ')}
              </h1>
              <div className="h-3 w-[1px] bg-white/10" />
              <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-bold tracking-widest text-emerald-400">
                <ShieldCheck className="w-3 h-3" />
                SECURE
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="relative hidden xl:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="COMMAND_X_INDEX..." 
                  className="w-56 h-8 pl-9 pr-3 rounded bg-white/5 border border-white/5 text-[10px] text-white font-mono focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-slate-600"
                />
              </div>
              
              <button 
                className="p-1 text-slate-500 hover:text-white transition-colors"
                onClick={() => setShowHUD(false)}
              >
                <Zap className="w-4 h-4" />
              </button>
              
              <div className="flex items-center gap-3">
                 <div className="text-right">
                    <p className="text-[10px] font-bold text-white tracking-tight leading-none">Gokul</p>
                    <p className="text-[9px] text-purple-400/80 font-medium">Commander</p>
                 </div>
                 <div className="w-7 h-7 rounded bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-[10px] font-black text-purple-400">
                   GK
                 </div>
              </div>
            </div>
          </header>

          {/* Viewport: Dynamic Section Rendering */}
          <div className="flex-1 overflow-y-auto relative p-10 pointer-events-auto">
             <AnimatePresence mode="wait">
               <motion.div 
                 key={activeSection}
                 initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
                 animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                 exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
                 transition={{ duration: 0.3 }}
                 className="max-w-6xl mx-auto w-full flex flex-col gap-10 pb-32"
               >
               
                {activeSection === "agents" && (
                  <>
                    <div className="flex justify-between items-end">
                       <div>
                          <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
                            <Users className="w-6 h-6 text-purple-500" /> Team Roster
                          </h2>
                          <p className="text-sm text-slate-400 mt-2 font-medium tracking-wide">Autonomous AI Agents across 12 creative and technical departments.</p>
                       </div>
                       <div className="flex gap-2">
                         <span className="badge badge-success px-3 py-1 text-[10px]">12 ACTIVE</span>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {agents.length > 0 ? agents.map((agent: AgentNode) => (
                        <div key={agent.name} className="group card p-5 flex flex-col transition-all hover:bg-white/[0.03] border-white/5">
                           <div className="flex items-center justify-between mb-5">
                             <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded border border-white/10 bg-black flex items-center justify-center text-sm font-bold shadow-inner" style={{ color: agent.colorCode }}>{agent.name[0]}</div>
                                <div className="min-w-0">
                                   <p className="font-bold text-white text-sm truncate">{agent.name}</p>
                                   <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter truncate opacity-60">ID://{agent.name.toLowerCase()}</p>
                                </div>
                             </div>
                             <div className={`w-2 h-2 rounded-full ${agent.status === 'busy' ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]'}`} />
                           </div>
                           <div className="flex-1 flex flex-col gap-3">
                              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-purple-500/50" style={{ width: `${(agent.completed / agent.tasks) * 100}%` }} />
                              </div>
                              <div className="flex justify-between text-[10px] font-mono text-slate-500 uppercase">
                                 <span>Tasks: {agent.tasks}</span>
                                 <span>Eff: {Math.round((agent.completed / (agent.tasks || 1)) * 100)}%</span>
                              </div>
                           </div>
                           <button className="mt-5 w-full py-2 rounded bg-white/5 border border-white/5 text-[10px] font-bold text-slate-400 uppercase tracking-widest transition-all group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600">
                             Open Console
                           </button>
                        </div>
                      )) : (
                        <p className="text-sm text-slate-500 font-mono italic">Synchronizing agent matrix...</p>
                      )}
                    </div>
                  </>
                )}

                {activeSection === "social" && (
                  <>
                    <div>
                      <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
                        <Megaphone className="w-6 h-6 text-purple-500" /> Content Engine
                      </h2>
                      <p className="text-sm text-slate-400 mt-2">Automated social broadcast pipeline for Graphikardia & Founder POV.</p>
                    </div>
                    
                    <div className="card bg-black/40 backdrop-blur border-white/5">
                       <div className="card-header border-b border-white/5 px-6 py-4 flex justify-between items-center">
                          <h3 className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase">Pipeline Status</h3>
                          <div className="flex gap-4 text-[10px] font-mono">
                             <span className="text-emerald-500">POLLING: ACTIVE</span>
                             <span className="text-blue-500">TARGET: LINKEDIN/IG</span>
                          </div>
                       </div>
                       <div className="flex flex-col">
                         {tasks.filter(t => t.category === "social" || t.category === "video").length > 0 ? (
                           tasks.filter(t => t.category === "social" || t.category === "video").map((task: TaskNode) => (
                             <div key={task.id} className="p-6 flex items-center justify-between border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                               <div className="flex items-center gap-5">
                                 <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/5 text-purple-400">
                                   {task.targets[0]?.includes('linkedin') ? <Briefcase className="w-5 h-5" /> : <Camera className="w-5 h-5" />}
                                 </div>
                                 <div>
                                   <div className="flex items-center gap-3">
                                      <span className="text-xs font-black text-white">{task.targets[0]}</span>
                                      <span className="px-1.5 py-0.5 rounded-sm bg-white/5 text-[8px] font-mono text-slate-500">ID: {task.id.slice(0,8)}</span>
                                   </div>
                                   <p className="text-xs text-slate-400 mt-1 font-medium italic">{task.title}</p>
                                 </div>
                               </div>
                               <div className="flex items-center gap-8">
                                 <div className="text-right">
                                   <p className="text-[9px] font-black text-purple-500 uppercase tracking-widest">{task.agent}</p>
                                   <p className="text-[10px] text-slate-500">T: 0.4s</p>
                                 </div>
                                 <div className="flex flex-col items-center">
                                    <span className="badge badge-warning text-[9px] px-2">{task.status}</span>
                                 </div>
                               </div>
                             </div>
                           ))
                         ) : (
                           <div className="p-20 text-center flex flex-col items-center gap-3">
                              <MonitorCheck className="w-8 h-8 text-slate-800" />
                              <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Queue Clear. No pending content.</p>
                           </div>
                         )}
                       </div>
                    </div>
                  </>
                )}

                {activeSection === "studio" && (
                   <>
                    <div>
                      <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
                        <Activity className="w-6 h-6 text-purple-500" /> Approval Studio
                      </h2>
                      <p className="text-sm text-slate-400 mt-2 font-medium">Real-time content drafting. All items are sent to Telegram for Gokul's approval.</p>
                    </div>
                    
                    {memory?.content ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {memory.content.map((post: Record<string, unknown>) => (
                           <div key={post.id as string} className="card group flex flex-col border-white/5 bg-black/40 hover:border-purple-500/30 transition-all">
                             <div className="card-header flex justify-between items-center py-3 px-5 bg-white/[0.02] border-b border-white/5">
                               <div className="flex items-center gap-2">
                                  <span className="text-[9px] font-black text-white uppercase tracking-widest">{(post.platform as string) || "GENERAL"}</span>
                                  <div className="h-3 w-[1px] bg-white/10 mx-1" />
                                  <span className="text-[9px] font-bold text-slate-500 uppercase">{post.content_type as string}</span>
                               </div>
                               <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${post.status === 'executed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                                 {post.status}
                               </span>
                             </div>
                             <div className="p-6 flex-1 flex flex-col gap-5">
                               <p className="text-[13px] text-slate-300 leading-relaxed font-medium line-clamp-6">{String(post.content_preview || post.content)}</p>
                               
                               {post.image_prompt && (
                                  <div className="mt-auto p-3 rounded bg-white/[0.03] border border-white/5">
                                    <p className="text-[9px] text-purple-400 font-bold uppercase tracking-widest mb-2 font-mono">Image Generator Prompt</p>
                                    <p className="text-[11px] text-slate-400 italic line-clamp-2 leading-relaxed">&ldquo;{String(post.image_prompt)}&rdquo;</p>
                                  </div>
                               )}
                             </div>
                             <div className="px-6 py-4 flex justify-between items-center bg-white/[0.02] border-t border-white/5">
                                <div className="flex items-center gap-2">
                                  <div className="w-5 h-5 rounded-full bg-purple-600/20 flex items-center justify-center text-[8px] font-bold text-purple-400">
                                    {(post.agent_type as string)?.[0]?.toUpperCase() || "A"}
                                  </div>
                                  <span className="text-[10px] font-bold text-slate-500 uppercase">{post.agent_type as string}</span>
                               </div>
                               <span className="text-[9px] font-mono text-slate-600">{new Date(post.created_at as string).toLocaleDateString()}</span>
                             </div>
                             {post.status === 'executed' && (
                                <button className="w-full py-3 text-[10px] font-bold uppercase tracking-[0.2em] bg-emerald-600 text-white hover:bg-emerald-500 transition-colors">
                                  View Live Assets ↗
                                </button>
                             )}
                           </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-32 text-center text-slate-700 animate-pulse font-mono text-[10px] uppercase tracking-widest">Accessing AI Memory Banks...</div>
                    )}
                   </>
                )}

                {activeSection === "analytics" && (
                  <>
                    <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
                      <BarChart className="w-6 h-6 text-purple-500" /> Fleet Intelligence
                    </h2>
                    {memory?.analytics ? (
                       <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                          <div className="card p-8 flex flex-col gap-2 items-center text-center border-white/5 bg-black/40">
                             <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Generation Matrix</span>
                             <span className="text-4xl font-black text-white">{memory.analytics.totalContent}</span>
                             <span className="text-[9px] text-slate-600 font-bold">DRAFTED NODES</span>
                          </div>
                          <div className="card p-8 flex flex-col gap-2 items-center text-center border-emerald-500/20 bg-emerald-500/5">
                             <span className="text-[10px] font-black text-emerald-500/60 uppercase tracking-widest">Propagation</span>
                             <span className="text-4xl font-black text-emerald-400">{memory.analytics.executedContent}</span>
                             <span className="text-[9px] text-emerald-500/40 font-bold">EXECUTED DEPLOYMENTS</span>
                          </div>
                          <div className="card p-8 flex flex-col gap-2 items-center text-center border-amber-500/20 bg-amber-500/5">
                             <span className="text-[10px] font-black text-amber-500/60 uppercase tracking-widest">Approval Hub</span>
                             <span className="text-4xl font-black text-amber-400">{memory.analytics.approvedContent - memory.analytics.executedContent}</span>
                             <span className="text-[9px] text-amber-500/40 font-bold">STAGED FOR REVIEW</span>
                          </div>
                          <div className="card p-8 flex flex-col gap-2 items-center text-center border-cyan-500/20 bg-cyan-500/5">
                             <span className="text-[10px] font-black text-cyan-500/60 uppercase tracking-widest">Neural Cleanup</span>
                             <span className="text-4xl font-black text-cyan-400">{memory.analytics.issuesFixed}</span>
                             <span className="text-[9px] text-cyan-500/40 font-bold">SEO ANOMALIES RESOLVED</span>
                          </div>
                       </div>
                    ) : (
                      <p className="text-sm text-slate-500 mt-4 font-mono">Fetching neural metrics...</p>
                    )}
                  </>
                )}

                {activeSection === "dashboard" && (
                   <>
                      <div className="flex justify-between items-end">
                         <div>
                            <h2 className="text-2xl font-black text-white tracking-tight">Ecosystem Health</h2>
                            <p className="text-sm text-slate-400 mt-1">Real-time status of the Graphikardia Autonomous OS.</p>
                         </div>
                         <div className="text-[10px] font-mono text-slate-500">S: 1.2s | L: NOMINAL</div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                         
                         {/* Agents Overview */}
                         <div className="card p-6 lg:col-span-2 border-white/5 bg-black/20">
                           <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6 inline-block">Active Neural Pipeline</h3>
                           <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                             {agents.slice(0,6).map(agent => (
                               <div key={agent.name} className="flex justify-between items-center group cursor-pointer">
                                 <div className="flex gap-3 items-center">
                                   <div className={`w-1.5 h-1.5 rounded-full transition-all ${agent.status === 'busy' ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]'}`} />
                                   <span className="text-xs font-black text-slate-300 uppercase tracking-widest group-hover:text-white transition-colors">{agent.name}</span>
                                 </div>
                                 <div className="text-right">
                                    <span className="text-[10px] font-bold text-slate-600 font-mono">{agent.tasks} OPS</span>
                                 </div>
                               </div>
                             ))}
                             {agents.length === 0 && <span className="text-[10px] text-slate-700 font-mono italic">Awaiting handshake...</span>}
                           </div>
                         </div>

                         {/* Status Overview */}
                         <div className="card p-6 border-white/5 bg-black/40">
                            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6 inline-block">Core Shield</h3>
                            <div className="flex flex-col gap-6">
                               <div className="flex justify-between items-center">
                                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">AI Context DB</span>
                                 <span className="text-[10px] font-black text-emerald-500 uppercase">SYNCHRONIZED</span>
                               </div>
                               <div className="flex justify-between items-center">
                                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Telegram Bot</span>
                                 <span className="text-[10px] font-black text-emerald-500 uppercase">LISTENING</span>
                               </div>
                               <div className="flex justify-between items-center">
                                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Job Scheduler</span>
                                 <span className="text-[10px] font-black text-emerald-500 uppercase">OPERATIONAL</span>
                               </div>
                               <div className="mt-4 p-4 rounded bg-white/[0.03] border border-white/5">
                                  <p className="text-[9px] font-black text-purple-400 uppercase tracking-[0.2em] mb-2">Network Latency</p>
                                  <div className="flex items-end gap-1 h-8">
                                     {[4,7,3,9,5,8,4,6,10,3].map((v, i) => (
                                       <div key={i} className="flex-1 bg-purple-500/20 hover:bg-purple-500/50 transition-colors" style={{ height: `${v*10}%` }} />
                                     ))}
                                  </div>
                               </div>
                            </div>
                         </div>
                      </div>
                   </>
                 )}
               </motion.div>
             </AnimatePresence>
          </div>

          {/* Quick HUD Context (Fixed floating controls) */}
          <div className="absolute bottom-8 right-8 pointer-events-auto flex gap-4">
             <button 
                onClick={() => setShowHUD(false)}
                className="group flex items-center gap-3 px-5 py-2.5 rounded-full bg-black/80 backdrop-blur-3xl border border-white/10 hover:border-white/20 transition-all shadow-2xl"
             >
               <Zap className="w-3.5 h-3.5 text-amber-400" />
               <span className="text-[10px] font-black text-white uppercase tracking-[0.25em]">Zen Mode</span>
             </button>
             <button className="group flex items-center gap-3 px-6 py-2.5 rounded-full bg-purple-600 hover:bg-purple-500 border border-purple-500 shadow-[0_0_30px_rgba(124,58,237,0.3)] transition-all">
               <TerminalSquare className="w-3.5 h-3.5 text-white" />
               <span className="text-[10px] font-black text-white uppercase tracking-[0.25em]">Manual Override</span>
             </button>
          </div>

        </main>
      </div>

      {/* When HUD is hidden */}
      {!showHUD && (
        <button 
           onClick={() => setShowHUD(true)}
           className="pointer-events-auto absolute top-8 right-8 z-20 px-6 py-3 rounded-md bg-black/80 border border-white/5 text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white/5 transition-all shadow-2xl backdrop-blur-xl"
        >
          RESTORE_UI
        </button>
      )}

    </div>
  );
}
