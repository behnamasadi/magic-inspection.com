"use client";

import { useEffect } from "react";
import type { Section } from "./sections";

export default function Poster({
  section,
  onClose,
}: {
  section: Section;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-40 poster opacity-100"
      style={{
        backgroundImage: `linear-gradient(rgba(12, 20, 32, 0.78), rgba(12, 20, 32, 0.78)), url(${section.posterImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-6 right-6 md:top-10 md:right-10 w-14 h-14 flex items-center justify-center hover:opacity-70 transition"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.46,12L19,17.54V19H17.54L12,13.46L6.46,19H5V17.54L10.54,12L5,6.46V5H6.46L12,10.54L17.54,5H19V6.46L13.46,12Z" />
        </svg>
      </button>

      <div className="flex h-full items-center px-8 md:px-24 py-16 overflow-auto">
        <div className="max-w-[1100px] w-full">
          <p className="text-sm md:text-base tracking-[0.2em] opacity-70 mb-4 md:mb-6">
            {section.title.toUpperCase()}
          </p>
          <h2 className="font-bold text-3xl md:text-5xl leading-tight mb-10 md:mb-14 max-w-4xl">
            {section.posterHeadline}
          </h2>
          <ul className="grid gap-8 md:gap-10 md:grid-cols-2">
            {section.bullets.map((b, i) => (
              <li
                key={i}
                className="bullet text-base md:text-xl leading-relaxed"
                dangerouslySetInnerHTML={{ __html: b }}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
