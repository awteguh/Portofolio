import { ImageResponse } from "next/og"
import { personal } from "@/data/personal"

export const alt = `${personal.name} — ${personal.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

// On-brand social share card: midnight-navy operations-deck field with the
// ice signal accent. Generated at build/request time via satori.
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
          background: "linear-gradient(135deg, #0a0a2e 0%, #1a2247 100%)",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top: monogram + ice rule */}
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "84px",
              height: "84px",
              borderRadius: "12px",
              background: "rgba(173, 216, 230, 0.12)",
              border: "2px solid rgba(173, 216, 230, 0.4)",
              color: "#ADD8E6",
              fontSize: "40px",
              fontWeight: 700,
            }}
          >
            {personal.initials}
          </div>
          <div style={{ width: "64px", height: "6px", borderRadius: "999px", background: "#ADD8E6" }} />
        </div>

        {/* Middle: name + nickname */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: "76px",
              fontWeight: 700,
              color: "#FFFAFA",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            {personal.name}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "16px",
              fontSize: "34px",
              color: "rgba(173, 216, 230, 0.85)",
            }}
          >
            ({personal.nickname})
          </div>
        </div>

        {/* Bottom: role pills */}
        <div style={{ display: "flex", gap: "16px" }}>
          {personal.tagline.split("·").map((role) => (
            <div
              key={role}
              style={{
                display: "flex",
                fontSize: "26px",
                color: "#ADD8E6",
                padding: "12px 28px",
                borderRadius: "999px",
                background: "rgba(173, 216, 230, 0.1)",
                border: "1px solid rgba(173, 216, 230, 0.3)",
              }}
            >
              {role.trim()}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
