"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { sections, type SectionId } from "./sections";
import Poster from "./Poster";
import Logo from "./Logo";
import Wedge from "./Wedge";

const TRANSITION_MS = 900;
const WHEEL_THRESHOLD = 40;

const stageVariants: Variants = {
  enter: (d: number) => ({
    opacity: 0,
    x: d > 0 ? "6vw" : "-6vw",
    y: "2vh",
  }),
  center: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: TRANSITION_MS / 1000,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  leave: (d: number) => ({
    opacity: 0,
    x: d > 0 ? "-6vw" : "6vw",
    y: "-2vh",
    transition: {
      duration: (TRANSITION_MS - 100) / 1000,
      ease: [0.65, 0, 0.35, 1],
    },
  }),
};

export default function TravelBoard() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [posterFor, setPosterFor] = useState<SectionId | null>(null);
  const lockedRef = useRef(false);
  const wheelAccumRef = useRef(0);
  const wheelResetRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  const active = sections[activeIndex];
  const activeId = active.id;

  const go = useCallback(
    (dir: 1 | -1) => {
      if (lockedRef.current) return;
      const next = Math.max(0, Math.min(sections.length - 1, activeIndex + dir));
      if (next === activeIndex) return;
      lockedRef.current = true;
      setDirection(dir);
      setActiveIndex(next);
      window.setTimeout(() => {
        lockedRef.current = false;
      }, TRANSITION_MS);
    },
    [activeIndex]
  );

  const pickIndex = useCallback(
    (i: number) => {
      if (lockedRef.current || i === activeIndex) return;
      lockedRef.current = true;
      setDirection(i > activeIndex ? 1 : -1);
      setActiveIndex(i);
      window.setTimeout(() => {
        lockedRef.current = false;
      }, TRANSITION_MS);
    },
    [activeIndex]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (posterFor) {
        if (e.key === "Escape") setPosterFor(null);
        return;
      }
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        go(1);
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        go(-1);
      }
    };

    const onWheel = (e: WheelEvent) => {
      if (posterFor) return;
      e.preventDefault();
      if (lockedRef.current) return;
      wheelAccumRef.current += e.deltaY;
      if (wheelResetRef.current) window.clearTimeout(wheelResetRef.current);
      wheelResetRef.current = window.setTimeout(() => {
        wheelAccumRef.current = 0;
      }, 200);
      if (wheelAccumRef.current > WHEEL_THRESHOLD) {
        wheelAccumRef.current = 0;
        go(1);
      } else if (wheelAccumRef.current < -WHEEL_THRESHOLD) {
        wheelAccumRef.current = 0;
        go(-1);
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0]?.clientY ?? null;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (posterFor || touchStartYRef.current == null) return;
      const endY = e.changedTouches[0]?.clientY ?? touchStartYRef.current;
      const dy = touchStartYRef.current - endY;
      touchStartYRef.current = null;
      if (Math.abs(dy) < 40) return;
      go(dy > 0 ? 1 : -1);
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      if (wheelResetRef.current) window.clearTimeout(wheelResetRef.current);
    };
  }, [go, posterFor]);

  // preferred side for text relative to media — alternates left/right
  const textOnLeft = useMemo(() => activeIndex % 2 === 1, [activeIndex]);

  return (
    <>
      {/* Stage */}
      <div className="fixed inset-0 z-10 overflow-hidden">
        <AnimatePresence initial={false} mode="sync" custom={direction}>
          <motion.div
            key={activeId}
            custom={direction}
            variants={stageVariants}
            initial="enter"
            animate="center"
            exit="leave"
            className="absolute inset-0 flex items-center justify-center px-8"
            style={{ willChange: "transform, opacity" }}
          >
            <SectionBody
              section={active}
              textOnLeft={textOnLeft}
              onOpenPoster={(id) => setPosterFor(id)}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Persistent wedge, crossfades with active section */}
      <AnimatePresence initial={false}>
        <motion.div
          key={`wedge-${activeId}`}
          className="fixed inset-0 z-20 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
          }}
          exit={{ opacity: 0, transition: { duration: 0.35 } }}
        >
          <div className="pointer-events-auto w-full h-full">
            <Wedge
              corner={active.wedgeCorner}
              color={active.wedgeColor}
              onPrev={() => go(-1)}
              onNext={() => go(1)}
              canPrev={activeIndex > 0}
              canNext={activeIndex < sections.length - 1}
            />
          </div>
        </motion.div>
      </AnimatePresence>

      <Dots activeIndex={activeIndex} onPick={pickIndex} />

      {posterFor && (
        <Poster
          section={sections.find((s) => s.id === posterFor)!}
          onClose={() => setPosterFor(null)}
        />
      )}
    </>
  );
}

function SectionBody({
  section,
  textOnLeft,
  onOpenPoster,
}: {
  section: (typeof sections)[number];
  textOnLeft: boolean;
  onOpenPoster: (id: SectionId) => void;
}) {
  if (section.id === "intro") {
    return (
      <div className="text-center select-none">
        <h1 className="font-bold tracking-tight leading-none text-[clamp(4rem,14vw,12rem)]">
          MAGIC
        </h1>
        <h1 className="font-bold tracking-tight leading-none text-[clamp(4rem,14vw,12rem)] mt-[2%]">
          INSPECTION
        </h1>
        <p className="text-[clamp(0.95rem,1.8vw,1.4rem)] text-muted mt-6">
          {section.tagline}
        </p>
      </div>
    );
  }
  if (section.id === "outro") {
    return (
      <div className="w-[48vw] max-w-[560px]">
        <Logo fill />
      </div>
    );
  }

  return (
    <div
      className={`w-full max-w-[1200px] grid gap-6 md:gap-10 lg:gap-14 items-center ${
        textOnLeft
          ? "grid-cols-1 md:grid-cols-[5fr_7fr]"
          : "grid-cols-1 md:grid-cols-[7fr_5fr]"
      }`}
    >
      {textOnLeft ? (
        <>
          <div className="order-2 md:order-1 md:pl-12 lg:pl-24">
            <TextBlock section={section} onOpenPoster={onOpenPoster} align="left" />
          </div>
          <div className="order-1 md:order-2">
            <MediaBlock src={section.image} />
          </div>
        </>
      ) : (
        <>
          <div className="order-1">
            <MediaBlock src={section.image} />
          </div>
          <div className="order-2 md:pr-12 lg:pr-24 md:text-right">
            <TextBlock section={section} onOpenPoster={onOpenPoster} align="right" />
          </div>
        </>
      )}
    </div>
  );
}

function TextBlock({
  section,
  onOpenPoster,
  align,
}: {
  section: (typeof sections)[number];
  onOpenPoster: (id: SectionId) => void;
  align: "left" | "right";
}) {
  return (
    <div className={align === "right" ? "md:ml-auto md:max-w-[36ch]" : "md:mr-auto md:max-w-[36ch]"}>
      <h2 className="font-bold text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] mb-6">
        {section.title}
      </h2>
      <p
        className="text-[clamp(0.95rem,1.4vw,1.15rem)] leading-relaxed opacity-80 mb-6"
        dangerouslySetInnerHTML={{ __html: section.tagline }}
      />
      <button
        onClick={() => onOpenPoster(section.id)}
        className="font-semibold text-[clamp(0.95rem,1.3vw,1.1rem)] hover:underline underline-offset-8"
      >
        › Learn more
      </button>
    </div>
  );
}

function MediaBlock({ src }: { src: string }) {
  return (
    <div className="relative w-full aspect-video bg-dark/50 overflow-hidden border border-light/10">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" className="w-full h-full object-cover kenburns" />
    </div>
  );
}

function Dots({
  activeIndex,
  onPick,
}: {
  activeIndex: number;
  onPick: (i: number) => void;
}) {
  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3">
      {sections
        .filter((s) => s.id !== "outro")
        .map((s, i) => (
          <button
            key={s.id}
            onClick={() => onPick(i)}
            aria-label={`Go to ${s.id}`}
            className={`block rounded-full transition-all ${
              i === activeIndex
                ? "bg-accent h-6 w-2"
                : "bg-light/40 hover:bg-light/80 h-2 w-2"
            }`}
          />
        ))}
    </div>
  );
}
