"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export type ArticleImage = { src: string; alt: string; width: number; height: number };

export default function ArticleScreenshot({ image, gallery, priority = false }: { image: ArticleImage; gallery: ArticleImage[]; priority?: boolean }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(() => Math.max(0, gallery.findIndex((entry) => entry.src === image.src)));
  const [zoomed, setZoomed] = useState(false);
  const current = gallery[index] || image;
  const move = (direction: number) => { setZoomed(false); setIndex((value) => (value + direction + gallery.length) % gallery.length); };

  return <figure className={priority ? "blog-cover article-figure" : "article-figure"}>
    <button className="article-image-button" type="button" onClick={() => { setZoomed(false); setIndex(Math.max(0, gallery.findIndex((entry) => entry.src === image.src))); dialog.current?.showModal(); }} aria-label={`Expand image: ${image.alt}`}>
      <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(max-width: 900px) 90vw, 1000px" priority={priority} className="blog-screenshot" />
      <span className="article-image-hint">Expand image ↗</span>
    </button>
    <figcaption>{image.alt}</figcaption>
    <dialog ref={dialog} className="article-lightbox" aria-label="Article screenshot viewer" data-lenis-prevent onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }} onKeyDown={(event) => { if (event.key === "ArrowRight") { event.preventDefault(); move(1); } if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); } }}>
      <div className="article-lightbox-panel">
        <div className="article-lightbox-toolbar"><span aria-live="polite">Image {index + 1} of {gallery.length}</span><button type="button" autoFocus onClick={() => dialog.current?.close()} aria-label="Close image viewer">Close ×</button></div>
        <button className="article-zoom" type="button" onClick={() => setZoomed((value) => !value)} aria-pressed={zoomed}>{zoomed ? "Fit image to screen" : "Zoom to original size"}</button>
        <div className={`article-lightbox-image${zoomed ? " is-zoomed" : ""}`} tabIndex={zoomed ? 0 : undefined} role={zoomed ? "region" : undefined} aria-label={zoomed ? "Full-resolution image; scroll to inspect" : undefined}><Image src={current.src} alt={current.alt} width={current.width} height={current.height} unoptimized /></div>
        <p aria-live="polite">{current.alt}</p>
        <div className="article-lightbox-toolbar"><button type="button" onClick={() => move(-1)}>← Previous</button><a href={current.src} target="_blank" rel="noreferrer">Open original ↗</a><button type="button" onClick={() => move(1)}>Next →</button></div>
      </div>
    </dialog>
  </figure>;
}
