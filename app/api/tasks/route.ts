import { NextResponse } from "next/server";
import Database from "better-sqlite3";

const dbPath = "/home/gokul/ai-system/memory/db.sqlite";

function getDb(readonly = true) {
  return new Database(dbPath, { readonly });
}

export async function GET() {
  try {
    const db = getDb();
    const rows = db.prepare("SELECT * FROM gkos_tasks").all();
    
    // Convert targets back to array
    const tasks = rows.map((row: any) => ({
      ...row,
      targets: row.targets ? JSON.parse(row.targets) : []
    }));
    
    db.close();
    
    return NextResponse.json(tasks, {
      headers: {
        "Cache-Control": "no-store",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Failed to read SQLite:", error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, status } = await req.json();
    const db = getDb(false);
    const lastRun = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }) + " today";
    
    db.prepare("UPDATE gkos_tasks SET status = ?, lastRun = ? WHERE id = ?").run(status, lastRun, id);
    db.close();
    
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to update task:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
