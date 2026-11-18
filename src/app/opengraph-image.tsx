import { ImageResponse } from "next/og";

export const alt = "Flow AI Music — turn the song in your head into a real one";
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
          padding: "70px 80px",
          background: "linear-gradient(120deg, #fffcf7 0%, #f3e9ff 55%, #ffe9c9 100%)",
          color: "#191430",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 62,
              height: 62,
              borderRadius: 18,
              background: "linear-gradient(135deg, #6c3ce9, #a45cff)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 36,
              fontWeight: 800,
            }}
          >
            ≈
          </div>
          <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: -1 }}>
            Flow AI Music
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.06, letterSpacing: -3, maxWidth: 980 }}>
            Turn the song in your head into a real one.
          </div>
          <div style={{ fontSize: 28, color: "#595270" }}>
            Describe it · Shape it · See it · Share it
          </div>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {["#6c3ce9", "#ff6a45", "#ffbe2e", "#00a9c4", "#79c92f"].map(
            (color, index) => (
              <div
                key={color}
                style={{
                  width: 92,
                  height: 16 + index * 8,
                  borderRadius: 12,
                  background: color,
                }}
              />
            ),
          )}
        </div>
      </div>
    ),
    size,
  );
}
