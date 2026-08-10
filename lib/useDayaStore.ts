import { create } from 'zustand';

export interface SystemLog {
  id: string;
  type: string;
  message: string;
  timestamp: string;
  [key: string]: unknown;
}

export interface TaskNode {
  id: string;
  title: string;
  category: string;
  status: string;
  agent: string;
  targets: string[];
  [key: string]: unknown;
}

export interface AgentNode {
  name: string;
  colorCode: string;
  tasks: number;
  completed: number;
  status: string;
  [key: string]: unknown;
}

export interface MemoryGraph {
  content?: Record<string, unknown>[];
  analytics?: {
    totalContent: number;
    executedContent: number;
    approvedContent: number;
    issuesFixed: number;
  };
  [key: string]: unknown;
}

export interface DayaState {
  // Global Socket Status
  connectionStatus: "connected" | "disconnected" | "connecting";
  
  // Real-time Event Queue
  systemLogs: SystemLog[];
  
  // AI Active Nodes
  agents: AgentNode[];
  tasks: TaskNode[];
  memory: MemoryGraph | null;
  
  // HUD UI State
  showHUD: boolean;
  activeSection: string;

  // Actions
  setConnectionStatus: (status: "connected" | "disconnected" | "connecting") => void;
  appendSystemLog: (log: SystemLog) => void;
  setAgents: (agents: AgentNode[]) => void;
  setTasks: (tasks: TaskNode[]) => void;
  setMemory: (memory: MemoryGraph) => void;
  setShowHUD: (show: boolean) => void;
  setActiveSection: (section: string) => void;
}

export const useDayaStore = create<DayaState>((set) => ({
  connectionStatus: "disconnected",
  systemLogs: [],
  agents: [],
  tasks: [],
  memory: null,
  showHUD: true,
  activeSection: "dashboard",

  setConnectionStatus: (status) => set({ connectionStatus: status }),
  appendSystemLog: (log) => set((state) => ({ systemLogs: [...state.systemLogs.slice(-49), log] })),
  setAgents: (agents) => set({ agents }),
  setTasks: (tasks) => set({ tasks }),
  setMemory: (memory) => set({ memory }),
  setShowHUD: (show) => set({ showHUD: show }),
  setActiveSection: (section) => set({ activeSection: section }),
}));
