import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ArchForge — Interactive Learning & Architecture Simulator",
  description:
    "Platform belajar interaktif: coding dari nol, live coding & interview, system design, dan ML/CV.",
  icons: {
    icon: "/assets/3d/logo/logo-mark-3d.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${dmSans.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-bg-0 text-ink-900 antialiased selection:bg-orange-500/25 selection:text-orange-900">
        {children}
      </body>
    </html>
  );
}

