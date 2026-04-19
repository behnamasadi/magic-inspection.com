import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Photonxy AI",
  description: "Placeholder description.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark-mode">
      <body>{children}</body>
    </html>
  );
}
