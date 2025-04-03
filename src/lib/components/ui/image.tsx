import React from "react";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  containerStyle?: React.CSSProperties;
}

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  fit = "cover",
  containerStyle,
  style,
  ...imgProps
}) => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        ...(containerStyle || {}),
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: fit,
          ...(style || {}),
        }}
        {...imgProps}
      />
    </div>
  );
};

export default Image;
