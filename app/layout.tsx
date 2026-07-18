import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kaveesha Dilshan — Digital Designer",
  description: "Digital designer crafting memorable products and experiences.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
