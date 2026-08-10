import { NextResponse } from "next/server";
import Database from "better-sqlite3";
import path from "path";

// Path to the Python ai-system database
const dbPath = "/home/gokul/ai-system/memory/db.sqlite";

export async function GET() {
  try {
    const db = new Database(dbPath, { readonly: true });
    
    // Fetch last 50 generated content posts for Creator Studio
    const rawContent = db.prepare(`
      SELECT 
        id, agent_type, platform, content_type, content_preview, content, 
        status, approved, created_at, executed_at, published_url 
      FROM content_history 
      ORDER BY created_at DESC 
      LIMIT 50
    `).all();
    
    // Calculate simple Analytics data
    const analytics = {
      totalContentRow: db.prepare("SELECT COUNT(*) as count FROM content_history").get(),
      approvedRow: db.prepare("SELECT COUNT(*) as count FROM content_history WHERE approved = 1").get(),
      executedRow: db.prepare("SELECT COUNT(*) as count FROM content_history WHERE status = 'executed'").get(),
      issuesFixed: db.prepare("SELECT COUNT(*) as count FROM website_issues WHERE status = 'fixed'").get(),
      openIssues: db.prepare("SELECT COUNT(*) as count FROM website_issues WHERE status = 'open'").get()
    };
    
    db.close();
    
    return NextResponse.json({
      content: rawContent,
      analytics: {
        totalContent: (analytics.totalContentRow as any).count,
        approvedContent:  (analytics.approvedRow as any).count,
        executedContent:  (analytics.executedRow as any).count,
        issuesFixed: (analytics.issuesFixed as any).count,
        openIssues: (analytics.openIssues as any).count,
      }
    }, {
      headers: {
        "Cache-Control": "no-store",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error: any) {
    console.error("Failed to read SQLite DB:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
