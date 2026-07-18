"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About Me", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="site-navbar topbar">
      <Link href="/" className="brand" aria-label="Kaveesha Dilshan home">
        <span className="sun-mark" aria-hidden="true"><span /></span><span>KAVEESHA DILSHAN</span>
      </Link>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {links.map((link) => <Link key={link.href} href={link.href} className={pathname === link.href ? "active" : ""}>{link.label}</Link>)}
      </nav>
      <a className="talk-btn" href="mailto:hello@windsun.dev"><span>Let&apos;s Talk</span><i><ArrowRight size={17} /></i></a>
      <button className="menu-btn" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-navigation" aria-label="Toggle menu">{open ? <X /> : <Menu />}</button>
      {open && <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">{links.map((link) => <Link key={link.href} href={link.href} className={pathname === link.href ? "active" : ""}>{link.label}</Link>)}</nav>}
    </header>
  );
}
