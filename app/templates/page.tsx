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
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">Templates</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Pick a template to instantly pre-fill the Generate Post form. Edit anything before generating.
      </p>

      <CategoryFilter active={active} onChange={setActive} />

      {filtered.length === 0 ? (
        <p className="mt-10 text-sm text-gray-400 text-center">No templates in this category yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {filtered.map((t) => (
            <TemplateCard key={t.id} template={t} />
          ))}
        </div>
      )}
    </div>
  );
}
