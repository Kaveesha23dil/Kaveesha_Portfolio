import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 38, color: "#050706", background: "#c9ff16", fontFamily: "Arial", fontSize: 74, fontWeight: 900 }}>KD</div>, size);
}
