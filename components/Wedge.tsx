"use client";

import type { WedgeColor, WedgeCorner } from "./sections";

const COLOR: Record<Exclude<WedgeColor, "none">, string> = {
  ember: "#dc0f14",
  flame: "#3a5fe0",
  peach: "#8a5ee0",
};

type Props = {
  corner: WedgeCorner;
  color: WedgeColor;
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
};

export default function Wedge({
  corner,
  color,
  onPrev,
  onNext,
  canPrev,
  canNext,
}: Props) {
  if (corner === "none" || color === "none") return null;

  if (corner === "bottom-center") {
    return (
      <button
        onClick={onNext}
        aria-label="Next section"
        className="absolute left-1/2 -translate-x-1/2 z-20 transition-opacity hover:opacity-80"
        style={{
          bottom: 0,
          width: "min(22vw, 260px)",
          height: "min(28dvh, 320px)",
        }}
      >
        <svg
          viewBox="0 0 100 160"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
        >
          <polygon
            points="0,40 50,0 100,40 100,160 0,160"
            fill={COLOR[color as Exclude<WedgeColor, "none">]}
          />
        </svg>
        <svg
          viewBox="0 0 24 12"
          className="absolute left-1/2 top-[38%] -translate-x-1/2 w-[28%] opacity-80"
        >
          <polyline
            points="2,2 12,10 22,2"
            fill="none"
            stroke="#ffffff"
            strokeWidth={2.5}
          />
        </svg>
      </button>
    );
  }

  const isRight = corner === "top-right";
  const fill = COLOR[color as Exclude<WedgeColor, "none">];

  return (
    <div
      className={`fixed z-20 pointer-events-none ${
        isRight ? "right-0 top-0" : "left-0 top-0"
      }`}
      style={{ width: "28vw", height: "100dvh" }}
    >
      <svg
        viewBox="0 0 100 300"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        {isRight ? (
          <>
            {/* angular kite anchored top-right */}
            <polygon points="35,0 100,0 100,300 70,300 100,210 100,90 40,30" fill={fill} />
            <polygon points="40,90 70,60 70,150 60,130" fill="rgba(0,0,0,0.18)" />
          </>
        ) : (
          <>
            <polygon points="0,0 65,0 60,30 0,90 0,210 30,300 0,300" fill={fill} />
            <polygon points="30,60 60,90 40,130 30,150" fill="rgba(0,0,0,0.18)" />
          </>
        )}
      </svg>

      {/* Prev arrow (up) — in the upper portion of the wedge */}
      <button
        onClick={onPrev}
        aria-label="Previous section"
        disabled={!canPrev}
        className={`absolute ${
          isRight ? "right-[10%]" : "left-[10%]"
        } top-[8%] w-12 h-12 flex items-center justify-center rounded-full pointer-events-auto transition-opacity disabled:opacity-30 hover:opacity-70`}
      >
        <svg viewBox="0 0 24 12" className="w-7">
          <polyline
            points="2,10 12,2 22,10"
            fill="none"
            stroke="#ffffff"
            strokeWidth={2.5}
          />
        </svg>
      </button>

      {/* Next arrow (down) — in the lower portion of the wedge */}
      <button
        onClick={onNext}
        aria-label="Next section"
        disabled={!canNext}
        className={`absolute ${
          isRight ? "right-[10%]" : "left-[10%]"
        } bottom-[8%] w-12 h-12 flex items-center justify-center rounded-full pointer-events-auto transition-opacity disabled:opacity-30 hover:opacity-70`}
      >
        <svg viewBox="0 0 24 12" className="w-7">
          <polyline
            points="2,2 12,10 22,2"
            fill="none"
            stroke="#ffffff"
            strokeWidth={2.5}
          />
        </svg>
      </button>
    </div>
  );
}
