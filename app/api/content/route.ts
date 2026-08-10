import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    content: [],
    analytics: {
      totalContent: 1042,
      approvedContent: 1040,
      executedContent: 1039,
      issuesFixed: 42,
      openIssues: 0,
    }
  }, {
    headers: {
      "Cache-Control": "no-store",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
