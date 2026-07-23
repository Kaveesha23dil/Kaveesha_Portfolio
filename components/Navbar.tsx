"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

const links = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About Me", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [openForPath, setOpenForPath] = useState<string | null>(null);
  const open = openForPath === pathname;
  const header = useRef<HTMLElement>(null);
  const mobileNav = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const element = header.current;
    if (!element) return;
    const onScroll = () => {
      const currentY = window.scrollY;
      element.classList.toggle("is-scrolled", currentY > 30);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  useLayoutEffect(() => {
    const menu = mobileNav.current;
    if (!menu) return;
    document.body.classList.toggle("menu-open", open);
    const timeline = gsap.timeline();
    if (open) {
      timeline.set(menu, { display: "grid" }).fromTo(menu, { clipPath: "inset(0 0 100% 0)", opacity: 0 }, { clipPath: "inset(0)", opacity: 1, duration: .45, ease: "power3.out" })
        .fromTo(menu.querySelectorAll("a"), { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: .35, stagger: .06, ease: "power2.out" }, "-=.2");
    } else {
      timeline.to(menu, { clipPath: "inset(0 0 100% 0)", opacity: 0, duration: .3, ease: "power2.in" }).set(menu, { display: "none" });
    }
    return () => {
      timeline.kill();
      document.body.classList.remove("menu-open");
    };
  }, [open]);

  return (
    <header ref={header} className="site-navbar topbar">
      <Link href="/" className="brand" aria-label="Kaveesha Dilshan home">
        <span className="sun-mark" aria-hidden="true"><span /></span><span>KAVEESHA DILSHAN</span>
      </Link>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {links.map((link) => <Link key={link.href} href={link.href} className={pathname === link.href || (link.href !== "/" && pathname.startsWith(`${link.href}/`)) ? "active" : ""}>{link.label}</Link>)}
      </nav>
      <a className="talk-btn" href="mailto:kaveeshadilshankd23@gmail.com"><span>Let&apos;s Talk</span><i><ArrowRight size={17} /></i></a>
      <button className="menu-btn" onClick={() => setOpenForPath(open ? null : pathname)} aria-expanded={open} aria-controls="mobile-navigation" aria-label="Toggle menu">{open ? <X /> : <Menu />}</button>
      <nav ref={mobileNav} id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" aria-hidden={!open}>{links.map((link) => <Link tabIndex={open ? 0 : -1} onClick={() => setOpenForPath(null)} key={link.href} href={link.href} className={pathname === link.href || (link.href !== "/" && pathname.startsWith(`${link.href}/`)) ? "active" : ""}>{link.label}</Link>)}</nav>
    </header>
  );
}
