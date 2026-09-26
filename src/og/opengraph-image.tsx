import { ImageResponse } from "next/og";
import { site } from "@/config/site";


export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Design source for src/app/opengraph-image.png (the default social card).
 * Kept out of src/app because a generated image exports without a file extension,
 * which GitHub Pages serves as application/octet-stream. To change the card: move this
 * file back into src/app, build, copy out/opengraph-image to src/app/opengraph-image.png,
 * then move it back here.
 */
export default function OpengraphImage() {
  const cells = Array.from({ length: 9 }, (_, i) => [2, 3, 4, 4, 5, 6, 7, 8, 9][i]);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#ffffff", padding: 72, fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <svg width="56" height="56" viewBox="0 0 32 32">
              <rect x="3" y="4" width="12" height="24" rx="1" fill="#0b1220" />
              <path d="M17.5 4.2 29 9v14l-11.5 4.8a.4.4 0 0 1-.5-.4V4.6a.4.4 0 0 1 .5-.4Z" fill="#0f766e" />
            </svg>
            <span style={{ fontSize: 30, letterSpacing: 5, color: "#0b1220", fontWeight: 700 }}>DATA FOLD</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 68, lineHeight: 1.05, letterSpacing: -2, color: "#0b1220", maxWidth: 700 }}>
              {site.tagline}
            </span>
            <span style={{ marginTop: 24, fontSize: 24, color: "#475467" }}>
              Technology · Data · Risk · Finance
            </span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 10, paddingBottom: 8 }}>
          {cells.map((h, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {Array.from({ length: h }, (_, k) => (
                <div
                  key={k}
                  style={{ width: 30, height: 30, borderRadius: 3, background: i === 8 ? "#2563eb" : "#0f766e", opacity: i === 8 ? 1 : 0.3 + i * 0.07 }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
