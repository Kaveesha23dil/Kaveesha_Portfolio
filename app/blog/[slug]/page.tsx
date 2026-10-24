import Link from "next/link";
import Image from "next/image";
import BlogContent, { blogHeadingId } from "@/components/BlogContent";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import { formatPostDate, getBlogPosts } from "@/lib/blog";
import { createMetadata } from "@/lib/site";

export function generateStaticParams() {
  return getBlogPosts().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPosts().find((entry) => entry.slug === slug);
  if (!post) notFound();
  return createMetadata({ title: post.title, description: post.excerpt, path: `/blog/${post.slug}`, type: "article" });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPosts().find((entry) => entry.slug === slug);
  if (!post) notFound();

  return <main className="inner-page"><article className="blog-section blog-article">
    <Link className="blog-link" href="/blog">← Back to the blog</Link>
    <header className="blog-intro"><div><div className="blog-meta"><span>{post.category}</span><time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time></div><h1>{post.title}</h1><p>{post.excerpt}</p></div></header>
    <p className="blog-byline">Written by Kaveesha Dilshan · {Math.ceil((post.content || post.sections.map((section) => section.paragraphs.join(" ")).join(" ")).split(/\s+/).length / 220)} min read</p>
    {post.cover && <figure className="blog-cover"><Image src={post.cover} alt={post.coverAlt || post.title} width={1900} height={865} sizes="(max-width: 900px) 90vw, 1100px" priority /><figcaption>{post.coverCaption}</figcaption></figure>}
    {post.content && <nav className="blog-toc" aria-label="Article contents"><h2>In this article</h2><ol>{[...post.content.matchAll(/^## (.+)$/gm)].map((match) => <li key={match[1]}><a href={`#${blogHeadingId(match[1])}`}>{match[1].replace(/^\d+\. /, "")}</a></li>)}</ol></nav>}
    <div className="blog-body">{post.content ? <BlogContent content={post.content} /> : post.sections.map((section, index) => <section key={index}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph}</p>)}</section>)}</div>
  </article><Footer /></main>;
}
