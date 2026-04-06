"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";

const navItems = [
  {
    label: "Generate",
    href: "/",
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 1 7.107 9.79 7 7 0 1 1-9.787-9.79A7.6 7.6 0 0 1 12 3z" />
        <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
        <path d="M12 8v1m0 6v1m-4-4h1m6 0h1" />
      </svg>
    ),
  },
  {
    label: "Templates",
    href: "/templates",
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    label: "Hooks",
    href: "/hooks",
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    label: "History",
    href: "/history",
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </svg>
    ),
  },
];

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div
        className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-black shrink-0"
        style={{ background: "var(--text)", color: "var(--bg)" }}
      >
        V
      </div>
      <span className="text-sm font-semibold tracking-tight" style={{ color: "var(--text)" }}>
        Viraly
      </span>
    </div>
  );
}

function NavLinks({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <nav className="flex-1 px-2 py-3 space-y-0.5">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-150"
            style={{
              background: isActive ? "var(--surface-2)" : "transparent",
              color: "var(--text)",
              opacity: isActive ? 1 : 0.55,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = "1";
              if (!isActive) (e.currentTarget as HTMLElement).style.background = "var(--surface-2)";
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                (e.currentTarget as HTMLElement).style.opacity = "0.55";
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }
            }}
          >
            <span>{item.icon}</span>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* ── Desktop sidebar ─────────────────────────────── */}
      <aside
        className="hidden md:flex w-56 flex-col shrink-0 h-screen"
        style={{
          background: "var(--surface)",
          borderRight: "1px solid var(--border)",
        }}
      >
        <div className="px-5 pt-6 pb-5" style={{ borderBottom: "1px solid var(--border)" }}>
          <Logo />
          <p className="text-[11px] mt-1.5 leading-tight" style={{ color: "var(--text-3)" }}>
            Ideas in. Viral posts out.
          </p>
        </div>

        <NavLinks pathname={pathname} />

        <div
          className="px-4 py-4 flex items-center justify-between"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <span className="text-[11px]" style={{ color: "var(--text-3)" }}>v0.1 · MVP</span>
          <button
            onClick={toggle}
            title="Toggle theme"
            className="w-7 h-7 rounded-md flex items-center justify-center transition-all duration-150 text-sm"
            style={{ color: "var(--text-3)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--surface-2)";
              (e.currentTarget as HTMLElement).style.color = "var(--text)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color = "var(--text-3)";
            }}
          >
            {theme === "dark" ? "☀" : "◑"}
          </button>
        </div>
      </aside>

      {/* ── Mobile top bar ──────────────────────────────── */}
      <div
        className="md:hidden fixed top-0 left-0 right-0 h-14 z-40 flex items-center justify-between px-4"
        style={{
          background: "var(--surface)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <Logo />

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-sm transition-all duration-150"
            style={{ color: "var(--text-2)" }}
          >
            {theme === "dark" ? "☀" : "◑"}
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-150"
            style={{ color: "var(--text)" }}
            aria-label="Open menu"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" viewBox="0 0 24 24">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Mobile drawer overlay ────────────────────────── */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="md:hidden fixed inset-0 z-40 transition-opacity duration-200"
            style={{ background: "rgba(0,0,0,0.6)" }}
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer */}
          <div
            className="md:hidden fixed top-0 left-0 h-full w-64 z-50 flex flex-col"
            style={{
              background: "var(--surface)",
              borderRight: "1px solid var(--border)",
            }}
          >
            {/* Drawer header */}
            <div
              className="flex items-center justify-between px-5 h-14 shrink-0"
              style={{ borderBottom: "1px solid var(--border)" }}
            >
              <Logo />
              <button
                onClick={() => setMobileOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-150"
                style={{ color: "var(--text-2)" }}
                aria-label="Close menu"
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" viewBox="0 0 24 24">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <NavLinks pathname={pathname} onNavigate={() => setMobileOpen(false)} />

            <div
              className="px-4 py-4"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              <p className="text-[11px]" style={{ color: "var(--text-3)" }}>v0.1 · MVP</p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
