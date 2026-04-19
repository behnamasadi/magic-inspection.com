"use client";

import { useEffect, useState } from "react";

type ThemeId = "hybrid" | "cool" | "ember";

const THEMES: {
  id: ThemeId;
  label: string;
  swatch: [string, string, string];
}[] = [
  { id: "hybrid", label: "Hybrid",  swatch: ["#dc0f14", "#3a5fe0", "#8a5ee0"] },
  { id: "cool",   label: "Cool",    swatch: ["#3a5fe0", "#6a46d0", "#a98cf0"] },
  { id: "ember",  label: "Ember",   swatch: ["#dc0f14", "#eb5023", "#fab469"] },
];

const STORAGE_KEY = "photonxy.theme";

function applyTheme(id: ThemeId) {
  const html = document.documentElement;
  html.classList.remove("theme-hybrid", "theme-cool", "theme-ember");
  html.classList.add(`theme-${id}`);
}

export default function ThemePicker() {
  const [active, setActive] = useState<ThemeId>("hybrid");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = (typeof window !== "undefined"
      ? (localStorage.getItem(STORAGE_KEY) as ThemeId | null)
      : null);
    const initial: ThemeId = stored && ["hybrid", "cool", "ember"].includes(stored) ? stored : "hybrid";
    setActive(initial);
    applyTheme(initial);
    setMounted(true);
  }, []);

  function pick(id: ThemeId) {
    setActive(id);
    applyTheme(id);
    try { localStorage.setItem(STORAGE_KEY, id); } catch {}
  }

  if (!mounted) return null;

  return (
    <div
      className="fixed right-4 bottom-4 z-40 flex gap-2 p-2 rounded-full backdrop-blur-sm bg-dark/50 border border-light/10"
      role="radiogroup"
      aria-label="Theme"
    >
      {THEMES.map((t) => {
        const isActive = active === t.id;
        return (
          <button
            key={t.id}
            role="radio"
            aria-checked={isActive}
            aria-label={t.label}
            title={t.label}
            onClick={() => pick(t.id)}
            className={`relative h-8 w-8 rounded-full overflow-hidden transition-transform ${
              isActive ? "scale-110 ring-2 ring-light/80" : "hover:scale-105 opacity-80"
            }`}
          >
            <span
              className="absolute inset-0"
              style={{
                background: `conic-gradient(${t.swatch[0]} 0 33%, ${t.swatch[1]} 33% 66%, ${t.swatch[2]} 66% 100%)`,
              }}
            />
          </button>
        );
      })}
    </div>
  );
}
