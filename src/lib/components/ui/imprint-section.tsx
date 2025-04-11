import type React from "react";

interface ImprintSectionProps {
  header: React.ReactNode; // renamed from 'title' to 'header'
  content: React.ReactNode;
}

export const ImprintSection: React.FC<ImprintSectionProps> = ({ header, content }) => {
  return (
    <div className="mb-10">
      <div className="mb-0 ">{header}</div>
      <div className="text-white text-lg md:text-xl pl-4">{content}</div>
    </div>
  );
};
