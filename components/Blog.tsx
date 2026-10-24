import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { formatPostDate, getBlogPosts } from "@/lib/blog";

export default function Blog({ asPage = false }: { asPage?: boolean }) {
  const posts = getBlogPosts();
  const visiblePosts = asPage ? posts : posts.slice(0, 3);
  const Heading = asPage ? "h1" : "h2";

  return (
    <section id="blog" className="blog-section" aria-labelledby="blog-heading">
      <div className="blog-topline"><span>THE JOURNAL / BLOG</span><span>{String(posts.length).padStart(2, "0")} ARTICLES</span></div>
      <div className="blog-intro">
        <div><Heading id="blog-heading">Ideas, experiments<br />&amp; <em>perspectives.</em></Heading><p>Notes on design, development, and the details that make digital experiences feel considered.</p></div>
        {!asPage && <Link className="blog-link" href="/blog">Explore the blog <ArrowUpRight size={18} aria-hidden="true" /></Link>}
      </div>
      {visiblePosts.length > 0 ? <div className="blog-grid">{visiblePosts.map((post) => (
        <article className="blog-card" key={post.slug}>
          {post.cover && <Link href={`/blog/${post.slug}`} className="blog-card-cover" tabIndex={-1} aria-hidden="true"><Image src={post.cover} alt="" width={900} height={450} sizes="(max-width: 600px) 90vw, 30vw" /></Link>}
          <div className="blog-meta"><span>{post.category}</span><time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time></div>
          <h3><Link href={`/blog/${post.slug}`}>{post.title}<ArrowUpRight size={22} aria-hidden="true" /></Link></h3>
          <p>{post.excerpt}</p>
          <Link className="blog-link" href={`/blog/${post.slug}`} aria-label={`Read ${post.title}`}>Read article <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </article>
      ))}</div> : <div className="blog-empty">
        <span className="blog-empty-icon"><BookOpen size={30} aria-hidden="true" /></span>
        <div><span className="blog-eyebrow">A NEW CHAPTER</span><h3>Good things take a little thought.</h3><p>The first articles are on their way. In the meantime, explore the projects behind the ideas.</p></div>
        <Link className="blog-link" href="/projects">Explore my work <ArrowUpRight size={18} aria-hidden="true" /></Link>
      </div>}
    </section>
  );
}
