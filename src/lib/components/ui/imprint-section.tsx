import type React from "react";

interface ImprintSectionProps {
  title: string;
  content: React.ReactNode;
}

export const ImprintSection: React.FC<ImprintSectionProps> = ({ title, content }) => {
  const svgString = encodeURIComponent(
    '<svg width="334" height="117" viewBox="0 0 334 117" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
      '<path d="M26.3152 10.9933L334 0L317.806 98.1544L0 117L26.3152 10.9933Z" fill="#23CF51"/>\n' +
      "</svg>\n",
  );

  const dataUrl = `url("data:image/svg+xml,${svgString}")`;

  return (
    <div className="mb-10">
      <div
        className="inline-block p-3 pl-6 pr-10 mb-4 font-Orbitron font-bold text-white"
        style={{
          backgroundImage: dataUrl,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          fontSize: 24,
        }}
      >
        {title}
      </div>
      <div className="text-white text-lg md:text-xl pl-4">{content}</div>
    </div>
  );
};
