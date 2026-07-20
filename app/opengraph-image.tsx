import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} — ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "68px 76px", color: "#f5f7f2", background: "radial-gradient(circle at 80% 35%, #283a0e 0%, #080b08 32%, #050706 66%)", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 24, fontWeight: 800 }}><span style={{ width: 34, height: 34, display: "flex", border: "8px dashed #c9ff16", borderRadius: "50%" }} />{siteConfig.name.toUpperCase()}</div>
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 980 }}>
        <span style={{ color: "#c9ff16", fontSize: 22, letterSpacing: 5, fontWeight: 700 }}>PORTFOLIO / COLOMBO</span>
        <div style={{ display: "flex", flexDirection: "column", marginTop: 22, fontSize: 82, lineHeight: .96, letterSpacing: -5, fontWeight: 800 }}><span>Designing and building</span><span>digital experiences.</span></div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", color: "#9ca397", fontSize: 20 }}><span>{siteConfig.role}</span><span>UI/UX · REACT · NEXT.JS · GSAP</span></div>
    </div>,
    size,
  );
}
