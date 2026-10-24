import type { ReactNode } from "react";
import ArticleCode from "@/components/blog/ArticleCode";
import ArticleScreenshot, { type ArticleImage } from "@/components/blog/ArticleScreenshot";
import SentinelArchitecture from "@/components/blog/SentinelArchitecture";
import imageSizes from "@/lib/blog-image-sizes.json";

export function articleImage(src: string, alt: string): ArticleImage {
  const sizes = imageSizes as Record<string, { width: number; height: number }>;
  return { src, alt, ...(sizes[src] || { width: 1900, height: 1000 }) };
}

export function articleGallery(content: string): ArticleImage[] {
  return [...content.matchAll(/^!\[(.*?)\]\((\/blog\/[^)]+)\)$/gm)].map((match) => articleImage(match[2], match[1]));
}

function inline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*|https:\/\/[^\s]+)/g).map((part, index) => {
    if (part.startsWith("**")) return <strong key={index}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("`")) return <code key={index}>{part.slice(1, -1)}</code>;
    if (part.startsWith("*")) return <em key={index}>{part.slice(1, -1)}</em>;
    if (part.startsWith("https://")) return <a key={index} href={part} target="_blank" rel="noreferrer">{part}</a>;
    return part;
  });
}

export function blogHeadingId(text: string) {
  return `section-${text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
}

// A deliberately small renderer for our local editorial content; no raw HTML.
export default function BlogContent({ content }: { content: string }) {
  const lines = content.split("\n");
  const blocks: ReactNode[] = [];
  const gallery = articleGallery(content);
  for (let i = 0; i < lines.length;) {
    const line = lines[i].trim();
    const key = i;
    if (!line) { i++; continue; }
    if (line.startsWith("```")) {
      const language = line.slice(3).trim();
      const code: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) code.push(lines[i++]);
      i++;
      blocks.push(<ArticleCode key={key} code={code.join("\n")} language={language} />);
    } else if (line === "[[SENTINEL_ARCHITECTURE]]") {
      blocks.push(<SentinelArchitecture key={key} />);
      i++;
    } else if (/^#{2,3} /.test(line)) {
      const heading = line.replace(/^#+ /, "");
      blocks.push(line.startsWith("###") ? <h3 key={key}>{heading}</h3> : <h2 id={blogHeadingId(heading)} tabIndex={-1} key={key}>{heading}</h2>);
      i++;
    } else if (line.startsWith("![")) {
      const match = line.match(/^!\[(.*?)\]\((\/blog\/[^)]+)\)$/);
      if (match) blocks.push(<ArticleScreenshot key={key} image={articleImage(match[2], match[1])} gallery={gallery} />);
      i++;
    } else if (line.startsWith("|")) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        const cells = lines[i++].trim().split("|").slice(1, -1).map((cell) => cell.trim());
        if (!cells.every((cell) => /^:?-+:?$/.test(cell))) rows.push(cells);
      }
      blocks.push(<div className="blog-table" key={key} tabIndex={0} role="region" aria-label="Article data table"><table><thead><tr>{rows[0].map((cell, j) => <th scope="col" key={j}>{inline(cell)}</th>)}</tr></thead><tbody>{rows.slice(1).map((row, j) => <tr key={j}>{row.map((cell, k) => <td key={k}>{inline(cell)}</td>)}</tr>)}</tbody></table></div>);
    } else if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) items.push(lines[i++].slice(2));
      blocks.push(<ul key={key}>{items.map((item, j) => <li key={j}>{inline(item)}</li>)}</ul>);
    } else if (line === "---") {
      i++;
    } else {
      const paragraph: string[] = [];
      while (i < lines.length && lines[i].trim()) paragraph.push(lines[i++]);
      blocks.push(<p key={key}>{inline(paragraph.join(" "))}</p>);
    }
  }
  return <>{blocks}</>;
}
