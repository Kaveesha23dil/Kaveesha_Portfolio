import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = { title: "Page Not Found", robots: { index: false, follow: false } };

export default function NotFound() {
  return <main className="not-found-page">
    <span>404 / PAGE NOT FOUND</span>
    <h1>This page has left<br /><em>the experience.</em></h1>
    <p>The address may have changed, or the page may no longer exist. Continue exploring the portfolio or start a conversation.</p>
    <nav aria-label="404 navigation"><Link href="/">Return home <ArrowUpRight size={17} /></Link><Link href="/projects">View projects <ArrowUpRight size={17} /></Link><Link href="/contact">Contact me <ArrowUpRight size={17} /></Link></nav>
  </main>;
}
