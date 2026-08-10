import { NextRequest, NextResponse } from "next/server";
import { PERSONAS } from "@/lib/personas";

export async function POST(req: NextRequest) {
  const { agentId, messages } = await req.json();
  const persona = PERSONAS[agentId];
  if (!persona) return NextResponse.json({ error: "Unknown agent" }, { status: 400 });

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "API key missing" }, { status: 500 });

  const systemPrompt = `${persona.systemPrompt}

IMPORTANT RULES:
- You are a REAL expert, not an AI assistant. Never break character.
- Always respond in your expert persona's voice and style.
- Structure longer responses with clear headers and bullet points.
- Keep responses concise but expert-grade (max 300 words unless asked for more).
- Sign off with your name and title if it's a detailed analysis.`;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://gkos.graphikardia.com",
      "X-Title": "Graphikardia OS",
    },
    body: JSON.stringify({
      model: "anthropic/claude-3.5-sonnet",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages,
      ],
      max_tokens: 800,
      temperature: 0.75,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    return NextResponse.json({ error: err }, { status: response.status });
  }
  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content ?? "No response.";
  return NextResponse.json({ reply });
}
