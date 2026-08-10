// ── Agent Types ───────────────────────────────────────────────────────────────
export type AgentRole =
  | "Lead" | "Design" | "Ads" | "Content" | "React"
  | "WordPress" | "QA" | "Accounts" | "DevOps" | "Figma" | "Video" | "Ideation";

export type AgentStatus = "online" | "busy" | "idle" | "offline";

export interface Agent {
  id: string;
  name: string;
  emoji: string;
  role: string;
  department: AgentRole;
  color: string;          // Tailwind class name
  colorCode: string;      // Hex value
  expertise: string;
  tone: string;
  status?: AgentStatus;
  tasksCompleted?: number;
  currentTask?: string;
}

// ── Team Registry ─────────────────────────────────────────────────────────────
export const TEAM: Record<string, Agent> = {
  shiva: {
    id: "shiva", name: "Shiva", emoji: "🔱",
    role: "Chief Operations Officer (COO) — 15 Yrs Exp",
    department: "Lead", color: "purple-500", colorCode: "#8b5cf6",
    expertise: "Enterprise-grade load balancing, strategic AI orchestration, and global scaling.",
    tone: "Commanding, precise, and visionary.",
    status: "online", tasksCompleted: 142, currentTask: "Routing batch #47 campaign tasks"
  },
  chitra: {
    id: "chitra", name: "Chitra", emoji: "🖌️",
    role: "Lead Product Designer — 12 Yrs Exp",
    department: "Figma", color: "fuchsia-500", colorCode: "#d946ef",
    expertise: "Corporate UI/UX system architecture, Figma automation, and premium brand aesthetics.",
    tone: "Detail-oriented, aesthetic-first, and systematic.",
    status: "busy", tasksCompleted: 87, currentTask: "Generating brand style guide v3"
  },
  krishna: {
    id: "krishna", name: "Krishna", emoji: "🎬",
    role: "Director of Cinematography — 10 Yrs Exp",
    department: "Video", color: "purple-400", colorCode: "#c084fc",
    expertise: "High-retention motion graphics, commercial storyboarding, and programmatic video pipelines.",
    tone: "Creative, rhythmic, and high-energy.",
    status: "idle", tasksCompleted: 63, currentTask: undefined
  },
  vyasa: {
    id: "vyasa", name: "Vyasa", emoji: "📜",
    role: "Chief Content Strategist — 14 Yrs Exp",
    department: "Ideation", color: "teal-500", colorCode: "#14b8a6",
    expertise: "Viral psychology, corporate storytelling, and omni-channel 90-day content architectures.",
    tone: "Wise, philosophical, and prolific.",
    status: "online", tasksCompleted: 231, currentTask: "Drafting Q3 content calendar"
  },
  saraswati: {
    id: "saraswati", name: "Saraswati", emoji: "🎨",
    role: "Executive Art Director — 12 Yrs Exp",
    department: "Design", color: "pink-500", colorCode: "#ec4899",
    expertise: "Award-winning brand identity, typography systems, and color theory mastery.",
    tone: "Elegant, expressive, and thoughtful.",
    status: "busy", tasksCompleted: 109, currentTask: "Rendering 5 social post creatives"
  },
  agni: {
    id: "agni", name: "Agni", emoji: "🔥",
    role: "Head of Growth & Performance Marketing — 11 Yrs Exp",
    department: "Ads", color: "red-600", colorCode: "#dc2626",
    expertise: "Multi-million dollar ad spend optimization, advanced ROAS engineering, and A/B tracking.",
    tone: "Direct, data-driven, and urgent.",
    status: "online", tasksCompleted: 178, currentTask: "Optimizing 3 Meta ad sets"
  },
  narada: {
    id: "narada", name: "Narada", emoji: "📢",
    role: "Director of Public Relations (PR) — 13 Yrs Exp",
    department: "Content", color: "emerald-500", colorCode: "#10b981",
    expertise: "Corporate reputation management, LinkedIn thought leadership, and organic virality.",
    tone: "Persuasive, charismatic, and strategic.",
    status: "busy", tasksCompleted: 312, currentTask: "Queuing 8 LinkedIn posts"
  },
  vishvakarma: {
    id: "vishvakarma", name: "Vishvakarma", emoji: "🌐",
    role: "Principal Software Architect — 16 Yrs Exp",
    department: "React", color: "cyan-500", colorCode: "#06b6d4",
    expertise: "Enterprise Next.js architectures, complex WebGL/Three.js integrations, and state management.",
    tone: "Efficient, technical, and future-ready.",
    status: "online", tasksCompleted: 94, currentTask: "Scaffolding GKOS components"
  },
  maya: {
    id: "maya", name: "Maya", emoji: "🏗️",
    role: "WordPress Engineer & Integration Architect",
    department: "WordPress", color: "amber-500", colorCode: "#f59e0b",
    expertise: "Full-stack WP optimization, SEO hardening, and custom plugins.",
    tone: "Pragmatic, resilient, and resourceful.",
    status: "idle", tasksCompleted: 76, currentTask: undefined
  },
  arjun: {
    id: "arjun", name: "Arjun", emoji: "🏹",
    role: "Strategic Outreach Lead & Growth Specialist",
    department: "Content", color: "blue-500", colorCode: "#3b82f6",
    expertise: "LinkedIn network expansion, high-conversion cold outreach.",
    tone: "Professional, persuasive, and persistent.",
    status: "busy", tasksCompleted: 204, currentTask: "Sending 50 connection requests"
  },
  lakshmi: {
    id: "lakshmi", name: "Lakshmi", emoji: "💼",
    role: "Accounts Manager & Growth Strategist",
    department: "Accounts", color: "yellow-500", colorCode: "#eab308",
    expertise: "Revenue forecasting, brand deals, and client retention.",
    tone: "Supportive, professional, and opportunistic.",
    status: "online", tasksCompleted: 51, currentTask: "Compiling monthly revenue report"
  },
  hanuman: {
    id: "hanuman", name: "Hanuman", emoji: "🛡️",
    role: "DevOps & Firewall Guardian",
    department: "DevOps", color: "amber-600", colorCode: "#f97316",
    expertise: "Server hardening, SSL management, and cloud stability.",
    tone: "Protective, relentless, and technically elite.",
    status: "online", tasksCompleted: 88, currentTask: "Monitoring 4 live deployments"
  },
};

export const TEAM_ARRAY = Object.values(TEAM);

// ── Navigation ────────────────────────────────────────────────────────────────
export type NavSection = "dashboard" | "agents" | "social" | "studio" | "seo" | "analytics" | "settings";

export interface NavItem {
  id: NavSection;
  label: string;
  icon: string;
  badge?: number;
  description: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: "dashboard",  label: "Command Center", icon: "⌘",  description: "System overview & live metrics" },
  { id: "agents",     label: "Agent Council",  icon: "🤖", badge: 12, description: "Manage & communicate with agents" },
  { id: "social",     label: "Social Engine",  icon: "📡", badge: 3,  description: "LinkedIn automation pipeline" },
  { id: "studio",     label: "Creator Studio", icon: "🎨", description: "Design, video & content production" },
  { id: "seo",        label: "SEO / AEO",      icon: "🔍", description: "WebScan Pro & optimization tools" },
  { id: "analytics",  label: "Analytics",      icon: "📊", description: "Performance, ROAS & growth metrics" },
  { id: "settings",   label: "Settings",       icon: "⚙️", description: "Integrations, keys & preferences" },
];

// ── System Metrics ────────────────────────────────────────────────────────────
export interface SystemMetric {
  id: string;
  label: string;
  value: string | number;
  unit?: string;
  trend?: "up" | "down" | "stable";
  trendValue?: string;
  color: string;
  icon: string;
}

export const SYSTEM_METRICS: SystemMetric[] = [
  { id: "tasks",     label: "Tasks Completed", value: 1635, trend: "up",   trendValue: "+18% week", color: "#8b5cf6", icon: "✅" },
  { id: "posts",     label: "Posts Published",  value: 287,  trend: "up",   trendValue: "+42 today", color: "#10b981", icon: "📤" },
  { id: "roas",      label: "Avg. ROAS",        value: "4.7x", trend: "up", trendValue: "+0.3x",    color: "#f59e0b", icon: "🔥" },
  { id: "uptime",    label: "System Uptime",    value: "99.8", unit: "%",   trend: "stable",         color: "#06b6d4", icon: "🛡️" },
  { id: "reach",     label: "LinkedIn Reach",   value: "24.1k", trend: "up", trendValue: "+2.4k",   color: "#ec4899", icon: "📡" },
  { id: "active",    label: "Active Agents",    value: 9,    trend: "stable", trendValue: "3 busy", color: "#c084fc", icon: "🟢" },
];

// ── Activity Log ──────────────────────────────────────────────────────────────
export type ActivityType = "success" | "warning" | "info" | "error";

export interface ActivityLog {
  id: string;
  agentId: string;
  message: string;
  type: ActivityType;
  timestamp: string;
  module: string;
}

export const RECENT_ACTIVITY: ActivityLog[] = [
  { id: "a1", agentId: "narada",     message: "Published LinkedIn post: 'AI in Creative Agencies'", type: "success", timestamp: "2m ago",  module: "Social Engine" },
  { id: "a2", agentId: "agni",       message: "Meta Ads CTR improved by 12% after bid adjustment",  type: "success", timestamp: "5m ago",  module: "Ads Engine" },
  { id: "a3", agentId: "shiva",      message: "Delegated 8 new tasks from client brief #GK-091",    type: "info",    timestamp: "11m ago", module: "Orchestrator" },
  { id: "a4", agentId: "arjun",      message: "50 connection requests queued for outreach batch",   type: "info",    timestamp: "18m ago", module: "Social Engine" },
  { id: "a5", agentId: "hanuman",    message: "SSL cert renewed for gkos.graphikardia.com",         type: "success", timestamp: "32m ago", module: "DevOps" },
  { id: "a6", agentId: "chitra",     message: "Brand guide v3 export failed — retrying",            type: "warning", timestamp: "47m ago", module: "Figma Engine" },
  { id: "a7", agentId: "vishvakarma", message: "GKOS frontend scaffolded — 14 components created", type: "success", timestamp: "1h ago",  module: "Dev" },
  { id: "a8", agentId: "vyasa",      message: "90-day content funnel strategy ready for review",    type: "info",    timestamp: "1h ago",  module: "Ideation" },
];

// ── Department Color Map ──────────────────────────────────────────────────────
export const DEPT_COLORS: Record<AgentRole, string> = {
  Lead:      "#8b5cf6",
  Design:    "#ec4899",
  Ads:       "#ef4444",
  Content:   "#10b981",
  React:     "#06b6d4",
  WordPress: "#f59e0b",
  QA:        "#84cc16",
  Accounts:  "#eab308",
  DevOps:    "#f97316",
  Figma:     "#d946ef",
  Video:     "#c084fc",
  Ideation:  "#14b8a6",
};

// ── Status Config ─────────────────────────────────────────────────────────────
export const STATUS_CONFIG: Record<AgentStatus, { color: string; label: string; cssClass: string }> = {
  online:  { color: "#10b981", label: "Online",  cssClass: "status-online" },
  busy:    { color: "#f59e0b", label: "Busy",    cssClass: "status-busy" },
  idle:    { color: "#6366f1", label: "Idle",    cssClass: "" },
  offline: { color: "#6b7280", label: "Offline", cssClass: "status-offline" },
};

// ── GKOS App Meta ─────────────────────────────────────────────────────────────
export const APP_META = {
  name:        "Graphikardia OS",
  shortName:   "GKOS",
  version:     "v1.0.0",
  tagline:     "The Unified AI Agency Command Center",
  totalAgents: Object.keys(TEAM).length,
} as const;
