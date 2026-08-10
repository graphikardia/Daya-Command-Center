import { NextResponse } from "next/server";

const BRANDS = [
  {
    id: "gk",
    name: "Graphikardia",
    logo: "",
    primaryColor: "#8b5cf6",
    website: "https://www.graphikardia.com",
    personal: "https://gokula.graphikardia.com",
    linkedin_personal: "https://linkedin.com/in/geethagokula",
    linkedin_company: "https://linkedin.com/company/graphikardia",
    instagram_personal: "https://instagram.com/mr.gk_gokul",
    instagram_company: "https://instagram.com/graphikardia",
  },
];

export async function GET() {
  return NextResponse.json(BRANDS, {
    headers: { "Cache-Control": "no-store" },
  });
}
