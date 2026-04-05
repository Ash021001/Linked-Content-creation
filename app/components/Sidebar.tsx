"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Generate Post", href: "/", icon: "✦" },
  { label: "Templates", href: "/templates", icon: "▦" },
  { label: "Keywords", href: "/keywords", icon: "◈" },
  { label: "Billing", href: "/billing", icon: "◎" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 bg-white border-r border-gray-200 flex flex-col shrink-0">
      <div className="px-5 py-6 border-b border-gray-100">
        <span className="text-lg font-bold tracking-tight text-blue-600">
          LinkedAI
        </span>
        <p className="text-xs text-gray-400 mt-0.5">LinkedIn Post Writer</p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-5 py-4 border-t border-gray-100">
        <p className="text-xs text-gray-400">MVP · v0.1</p>
      </div>
    </aside>
  );
}
