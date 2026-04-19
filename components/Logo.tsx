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

  const src = iconOnly ? "/logo-icon.png" : "/logo.png";

  return (
    <img
      src={src}
      alt="Photonxy AI"
      style={style}
      className="block select-none"
      draggable={false}
    />
  );
}
