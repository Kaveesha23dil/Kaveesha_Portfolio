import Link from "next/link";
import BlogContent, { articleGallery, articleImage, blogHeadingId } from "@/components/BlogContent";
import ArticleScreenshot from "@/components/blog/ArticleScreenshot";
import ArticleToc from "@/components/blog/ArticleToc";
import VerifiedResults from "@/components/blog/VerifiedResults";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import { formatPostDate, getBlogPosts } from "@/lib/blog";
import { createMetadata } from "@/lib/site";
import "./article.css";

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

  const isSentinel = post.slug === "engineering-sentinelapi-api-security-monitoring";
  const headings = [...(post.content || "").matchAll(/^## (.+)$/gm)].map((match) => ({ id: blogHeadingId(match[1]), title: match[1] }));
  return <main className="inner-page"><article className="blog-section blog-article">
    <Link className="blog-link" href="/blog">← Back to the blog</Link>
    <header className="blog-intro"><div><div className="blog-meta"><span>{post.category}</span><time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time></div><h1>{post.title}</h1><p>{post.subtitle || post.excerpt}</p>{post.tags && <ul className="article-tags" aria-label="Technologies">{post.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>}{post.repository && <a className="article-cta" href={post.repository} target="_blank" rel="noreferrer">View Source on GitHub ↗</a>}</div></header>
    <p className="blog-byline">Written by Kaveesha Dilshan · {Math.ceil((post.content || post.sections.map((section) => section.paragraphs.join(" ")).join(" ")).split(/\s+/).length / 220)} min read</p>
    {post.cover && <ArticleScreenshot image={articleImage(post.cover, post.coverCaption || post.coverAlt || post.title)} gallery={[articleImage(post.cover, post.coverCaption || post.coverAlt || post.title), ...articleGallery(post.content || "").filter((image) => image.src !== post.cover)]} priority />}
    {isSentinel && <VerifiedResults />}
    <div className="article-layout">
    {post.content && <ArticleToc headings={headings} />}
    <div className="blog-body">{post.content ? <BlogContent content={post.content} /> : post.sections.map((section, index) => <section key={index}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph}</p>)}</section>)}</div>
    </div>
    {isSentinel && <section className="article-closing" aria-labelledby="article-closing-title"><span className="blog-eyebrow">PROJECT SUMMARY</span><h2 id="article-closing-title">From gateway enforcement to explainable evidence.</h2><p>SentinelAPI brings together WSO2 API management and OAuth, verified throttling, telemetry processing and PostgreSQL persistence, sliding-window error-rate detection, evidence-backed alerts, Isolation Forest experimentation, and a full-stack monitoring interface.</p><p>A local engineering prototype: its controlled results show a working pipeline, not production-validated attack detection.</p><div><a className="article-cta" href="https://github.com/Kaveesha23dil/sentinelapi" target="_blank" rel="noreferrer">View Source on GitHub ↗</a><Link className="blog-link" href="/projects/sentinelapi">Explore Project Case Study ↗</Link></div></section>}
  </article><Footer /></main>;
}
