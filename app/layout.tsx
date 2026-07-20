import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import MotionController from "@/components/MotionController";

export const metadata: Metadata = {
  title: "Kaveesha Dilshan — Digital Designer",
  description: "Digital designer crafting memorable products and experiences.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning><Navbar /><MotionController />{children}</body>
    </html>
  );
}
