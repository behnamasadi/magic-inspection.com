import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Magic Inspection — Tailoring robotics for your business",
  description:
    "Autonomous robotic platforms for industrial inspection. Engineering, intelligence, automation, and engagement — built for the real world.",
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
