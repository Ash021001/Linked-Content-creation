import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import ThemeProvider from "./components/ThemeProvider";

export const metadata: Metadata = {
  title: "LinkedIn AI Writer",
  description: "Generate compelling LinkedIn posts with AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 antialiased">
        <ThemeProvider>
          <Sidebar />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
