"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function ArticleToc({ headings }: { headings: { id: string; title: string }[] }) {
  const [active, setActive] = useState(headings[0]?.id);
  const pathname = usePathname();
  useEffect(() => {
    const update = () => {
      let current = headings[0]?.id;
      for (const heading of headings) {
        const target = document.getElementById(heading.id);
        if (target && target.getBoundingClientRect().top <= 160) current = heading.id;
      }
      setActive(current);
    };
    const observer = new IntersectionObserver(update, { rootMargin: "-100px 0px -60% 0px", threshold: 0 });
    headings.forEach(({ id }) => { const target = document.getElementById(id); if (target) observer.observe(target); });
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => { observer.disconnect(); window.removeEventListener("scroll", update); };
  }, [headings]);

  return <nav className="blog-toc article-toc" aria-label="Article contents" data-lenis-prevent><details open><summary>In this article</summary><ol>{headings.map((heading) => <li key={heading.id}><a href={`${pathname}#${heading.id}`} aria-current={active === heading.id ? "location" : undefined} onClick={(event) => {
    event.preventDefault();
    event.stopPropagation();
    const target = document.getElementById(heading.id);
    if (!target) return;
    history.replaceState(null, "", `#${heading.id}`);
    target.focus({ preventScroll: true });
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 110, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    setActive(heading.id);
  }}>{heading.title.replace(/^\d+\. /, "")}</a></li>)}</ol></details></nav>;
}
