/* eslint-disable @next/next/no-img-element */
export default function Logo({
  size,
  fill = false,
  iconOnly = false,
}: {
  size?: number;
  fill?: boolean;
  iconOnly?: boolean;
}) {
  const style: React.CSSProperties = fill
    ? { width: "100%", height: "auto" }
    : { width: size ?? 28, height: size ?? 28 };

  // Bump LOGO_VER whenever the logo asset changes so CDN/browser caches miss.
  const LOGO_VER = "2";
  const src = `${iconOnly ? "/logo-icon.png" : "/logo.png"}?v=${LOGO_VER}`;

  return (
    <img
      src={src}
      alt="Magic Inspection"
      style={style}
      className="block select-none logo-img"
      draggable={false}
    />
  );
}
