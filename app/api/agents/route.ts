import { NextResponse } from "next/server";

export async function GET() {
  const agents = [
    { name: "Orchestrator", status: "online", tasks: 142, completed: 140, lastActive: Date.now() },
    { name: "Social Automation", status: "busy", tasks: 45, completed: 33, lastActive: Date.now() },
    { name: "Design Studio", status: "online", tasks: 18, completed: 18, lastActive: Date.now() },
    { name: "SEO Matrix", status: "online", tasks: 124, completed: 110, lastActive: Date.now() },
    { name: "Cloud Bridge", status: "online", tasks: 999, completed: 999, lastActive: Date.now() }
  ];
  return NextResponse.json(agents);
}
