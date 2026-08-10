import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Graphikardia OS — AI Agency Command Center",
  description:
    "GKOS is the unified AI agency operating system powering Graphikardia's 12 specialized agents across design, social automation, ads, video, dev, and more.",
  keywords: ["AI Agency", "Graphikardia", "LinkedIn Automation", "AI Dashboard", "GKOS"],
  authors: [{ name: "Graphikardia" }],
};

export const viewport = {
  themeColor: "#8b5cf6",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="h-full antialiased overflow-hidden">{children}</body>
    </html>
  );
}
