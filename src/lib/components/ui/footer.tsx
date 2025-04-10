import { Link } from "@tanstack/react-router";
import type React from "react";
const Footer: React.FC = () => {
  return (
    <footer className="w-full py-4 mt-auto">
      <div className="container mx-auto px-4 flex justify-center md:justify-between">
        <Link
          to="/imprint"
          className="text[#23CF51]- hover:text-[#23CF51] text-base font-Electrolize transition-colors duration-200"
        >
          Impressum
        </Link>
        <Link
          to="/sponsor"
          className="text[#23CF51]- hover:text-[#23CF51] text-base font-Electrolize transition-colors duration-200"
        >
          Sponsor
        </Link>
      </div>
    </footer>
  );
};
export default Footer;
