import { NextResponse } from 'next/server';

const GIST_ID = "2e378c9c83ec1c9616f11adbd7b8b07e";

export async function POST(request: Request) {
  const { command, args } = await request.json();
  const token = process.env.GITHUB_GIST_TOKEN;

  if (!token) return NextResponse.json({ error: "Missing GitHub Token" }, { status: 500 });

  try {
    // 1. Fetch current Queue
    const res = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    const gist = await res.json();
    const currentState = JSON.parse(gist.files["daya_queue.json"].content);

    // 2. Append new Command
    currentState.queue.push({ command, args, timestamp: Date.now() });

    // 3. Save back to GitHub
    await fetch(`https://api.github.com/gists/${GIST_ID}`, {
      method: 'PATCH',
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        files: {
          "daya_queue.json": { content: JSON.stringify(currentState, null, 2) }
        }
      })
    });

    return NextResponse.json({ status: "QUEUED_OFFLINE", message: "Command buffered securely in Cloud Bridge." });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Cloud Bridge Error" }, { status: 500 });
  }
}

export async function GET() {
  const token = process.env.GITHUB_GIST_TOKEN;
  if (!token) return NextResponse.json({ status: "OFFLINE", error: "Missing Credentials" });

  try {
    const res = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
      headers: { "Authorization": `Bearer ${token}` },
      // Bypass cache to get real-time state
      cache: 'no-store'
    });
    const gist = await res.json();
    const currentState = JSON.parse(gist.files["daya_queue.json"].content);
    return NextResponse.json({ laptop_state: currentState.status || "OFFLINE" });
  } catch {
    return NextResponse.json({ laptop_state: "UNKNOWN" });
  }
}
