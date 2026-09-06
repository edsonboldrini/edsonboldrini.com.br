import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/**
 * Monogram favicon, replacing the create-next-app default.
 *
 * Generated with ImageResponse rather than written as an SVG with a <text>
 * element: an SVG favicon renders with whatever font the platform picks, so
 * the mark would look different on every OS. Rasterising at build time makes
 * it deterministic. Colours are the site's accent tokens.
 */
export default function Icon() {
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
          fontSize: 19,
          fontWeight: 700,
          letterSpacing: "-0.06em",
          borderRadius: 7,
        }}
      >
        EB
      </div>
    ),
    { ...size },
  );
}
