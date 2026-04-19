export default function Logo({
  size,
  fill = false,
}: {
  size?: number;
  fill?: boolean;
}) {
  const props = fill
    ? { style: { width: "100%", height: "auto" } }
    : { width: size ?? 28, height: size ?? 28 };

  return (
    <svg
      viewBox="0 0 120 100"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Magic Inspection"
      {...props}
    >
      <defs>
        <linearGradient id="mi-warm" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fab469" />
          <stop offset="45%" stopColor="#eb5023" />
          <stop offset="100%" stopColor="#dc0f14" />
        </linearGradient>
        <linearGradient id="mi-deep" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#aa192d" />
          <stop offset="100%" stopColor="#eb5023" />
        </linearGradient>
      </defs>
      <polygon points="0,100 0,86 60,16 120,86 120,100 60,30" fill="url(#mi-warm)" />
      <polygon points="0,74 0,60 30,26 44,42" fill="url(#mi-deep)" />
      <polygon points="120,74 120,60 90,26 76,42" fill="url(#mi-deep)" />
    </svg>
  );
}
