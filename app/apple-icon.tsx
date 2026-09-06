import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon on iOS. Same mark, no rounding — iOS masks it itself. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b6e4f",
          color: "#ffffff",
          fontSize: 104,
          fontWeight: 700,
          letterSpacing: "-0.06em",
        }}
      >
        EB
      </div>
    ),
    { ...size },
  );
}
