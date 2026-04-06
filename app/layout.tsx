import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import ThemeProvider from "./components/ThemeProvider";

export const metadata: Metadata = {
  title: "Viraly — Write scroll-stopping LinkedIn posts in seconds",
  description: "AI-powered LinkedIn post generator for founders, creators, and professionals.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex h-screen overflow-hidden" style={{ background: "var(--bg)", color: "var(--text)" }}>
        <ThemeProvider>
          <Sidebar />
          <main className="flex-1 overflow-y-auto pt-14 md:pt-0">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
