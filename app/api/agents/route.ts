import { NextResponse } from "next/server";
import Database from "better-sqlite3";
import path from "path";

export async function GET() {
  try {
    const dbPath = path.resolve("/home/gokul/ai-system/memory/db.sqlite");
    const db = new Database(dbPath, { readonly: true });

    // Fetch the latest task activity for each agent
    const rows = db.prepare(`
      SELECT 
        agent,
        COUNT(*) as total_tasks,
        SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed_tasks,
        MAX(lastRun) as last_active
      FROM gkos_tasks 
      GROUP BY agent
    `).all();

    // Map to a status representation
    const agentData = rows.map((row: any) => {
      // Determine pseudo-status based on recency
      // "Busy" if last_active is within the last 15 minutes, otherwise "Online", or "Idle"
      const lastActiveD = new Date(row.last_active);
      const isBusy = (Date.now() - lastActiveD.getTime()) < 15 * 60 * 1000;
      
      return {
        name: row.agent.charAt(0).toUpperCase() + row.agent.slice(1),
        status: isBusy ? "busy" : "online",
        tasks: row.total_tasks,
        completed: row.completed_tasks,
        lastActive: row.last_active
      };
    });

    return NextResponse.json(agentData);
  } catch (error: any) {
    console.error("Agents API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
