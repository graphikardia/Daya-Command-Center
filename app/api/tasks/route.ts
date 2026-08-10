import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    { id: "sys-01", type: "system_health_check", target: "core", status: "completed", result: "Pass", created: Date.now(), agent: "orchestrator", targets: [] },
    { id: "soc-01", type: "cloud_sync_buffer", target: "github", status: "pending", created: Date.now(), agent: "cloud_bridge", targets: ["daya_queue.json"] }
  ], {
    headers: {
      "Cache-Control": "no-store",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

export async function PATCH() {
  return NextResponse.json({ ok: true });
}
