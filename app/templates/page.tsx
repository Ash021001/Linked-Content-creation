"use client";

import { useState } from "react";
import { templates, CATEGORIES, TemplateCategory } from "@/app/lib/templates";
import CategoryFilter from "@/app/components/CategoryFilter";
import TemplateCard from "@/app/components/TemplateCard";

export default function TemplatesPage() {
  const [active, setActive] = useState<TemplateCategory | "All">("All");

  const filtered =
    active === "All" ? templates : templates.filter((t) => t.category === active);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-xl font-semibold mb-1" style={{ color: "var(--text)" }}>
          Templates
        </h1>
        <p className="text-sm" style={{ color: "var(--text-3)" }}>
          Click any template to instantly pre-fill the generator.
        </p>
      </div>

      {/* Filter */}
      <CategoryFilter active={active} onChange={setActive} />

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="mt-16 text-center">
          <p className="text-sm" style={{ color: "var(--text-3)" }}>No templates in this category yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 mt-6">
          {filtered.map((t) => (
            <TemplateCard key={t.id} template={t} />
          ))}
        </div>
      )}
    </div>
  );
}
