"use client";

import { useState } from "react";

export default function ArticleCode({ code, language }: { code: string; language: string }) {
  const [status, setStatus] = useState("");
  return <div className="article-code">
    <div className="article-code-toolbar"><span>{language || "text"}</span><button type="button" onClick={async () => { try { await navigator.clipboard.writeText(code); setStatus("Copied"); } catch { setStatus("Copy unavailable — select the code below"); } }}>Copy code</button><span role="status">{status}</span></div>
    <pre tabIndex={0} aria-label={`${language || "Text"} code example`} data-lenis-prevent><code>{language === "json" ? code.split(/("(?:\\.|[^"\\])*"\s*:|"(?:\\.|[^"\\])*"|\btrue\b|\bfalse\b|\bnull\b|\b\d+(?:\.\d+)?\b)/g).map((token, index) => <span key={index} className={token.trim().endsWith(":") ? "code-key" : token.startsWith('"') ? "code-string" : /^\d|true|false|null/.test(token) ? "code-value" : undefined}>{token}</span>) : code}</code></pre>
  </div>;
}
