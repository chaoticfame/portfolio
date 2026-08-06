import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import { profile } from "@/lib/data";
import { CommandPalette } from "@/components/CommandPalette";
import { Terminal } from "@/components/Terminal";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://chaoticfame.dev"),
  title: `${profile.name} — ${profile.role}`,
  description: profile.headline,
  keywords: [
    "Full-Stack Developer",
    "Software Engineer",
    "Backend",
    "Database Architecture",
    "Cybersecurity",
    "AI/ML",
    "chaoticfame",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description: profile.headline,
    type: "website",
    siteName: `${profile.name} · @${profile.handle}`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description: profile.headline,
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

// Applied before paint to avoid a flash of the wrong theme (FOUC).
const themeScript = `(function(){try{var t=localStorage.getItem('theme')||'dark';var r=document.documentElement;r.classList.add(t);}catch(e){document.documentElement.classList.add('dark');}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        {children}
        <CommandPalette />
        <Terminal />
      </body>
    </html>
  );
}
