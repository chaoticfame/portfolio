import { ImageResponse } from "next/og";
import { profile } from "@/lib/data";

export const runtime = "edge";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#050505",
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          padding: "72px",
          color: "#ededed",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            fontFamily: "monospace",
            color: "#8a8a8a",
          }}
        >
          ~/{profile.handle}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 84,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              maxWidth: 980,
            }}
          >
            {profile.headline}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 30,
              color: "#9a9a9a",
            }}
          >
            {profile.role}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            fontFamily: "monospace",
            color: "#8a8a8a",
          }}
        >
          <div style={{ display: "flex" }}>{profile.name}</div>
          <div style={{ display: "flex", gap: "24px" }}>
            <span>backend</span>
            <span>·</span>
            <span>databases</span>
            <span>·</span>
            <span>security</span>
            <span>·</span>
            <span>ai/ml</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
