import { ImageResponse } from "next/og";

export const contentType = "image/png";
export const runtime = "edge";
export const alt = "Infoperformance";
export const size = {
  width: 1200,
  height: 630,
};

export default async function OGImage() {
  const background = await fetch(
    new URL("../public/images/og-background.jpg", import.meta.url)
  ).then((res) => res.arrayBuffer());

  const imageMarkDown = (
    <div
      style={{
        width: "100%",
        height: "100%",
        color: "white",
        display: "flex",
        padding: "2rem",
        position: "relative",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        backgroundImage: "linear-gradient(to bottom, #dbf4ff, #fff1f1)",
      }}
    >
      <img
        src={background}
        alt={alt}
        style={{
          objectFit: "cover",
          width: "100%",
          height: "100%",
        }}
      />
      <h3
        style={{
          top: "25px",
          left: "45px",
          color: "white",
          paddingTop: "2",
          fontSize: "2rem",
          paddingBottom: "2",
          paddingLeft: "8px",
          paddingRight: "8px",
          position: "absolute",
          backgroundColor: "#dc2626",
        }}
      >
        INFORPERFORMANCE
      </h3>
      <div
        style={{
          left: "0",
          right: "0",
          bottom: "30px",
          display: "flex",
          position: "absolute",
          flexDirection: "column",
          backgroundColor: "rgba(0,0,0,0.3)",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            textAlign: "center",
          }}
        >
          {`Accelerate Your Company's CX And Digital Transformation`}
        </h1>
        <div
          style={{
            width: "100%",
            display: "flex",
            bottom: "5rem",
            justifyContent: "space-around",
          }}
        >
          <p>www.linkedin.com/info</p>
          <p>www.info.com</p>
        </div>
      </div>
    </div>
  );

  return new ImageResponse(imageMarkDown, {
    ...size,
  });
}
