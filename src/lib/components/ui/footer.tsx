import { Link, useLocation } from "@tanstack/react-router";
import clsx from "clsx";
import type React from "react";

const Footer: React.FC = () => {
  const location = useLocation();
  const progressMode = location.pathname === "/sponsor";

  const hoverClass = progressMode ? "hover:text-[#008bcc]" : "hover:text-[#23CF51]";
  const activeClass = progressMode ? "active:text-[#006290]" : "active:text-[#178634]";

  return (
    <footer className="w-full py-4 mt-auto z-1">
      <div className="container mx-auto px-4 flex justify-center gap-4 md:gap-0 md:justify-between">
        <Link
          to="/imprint"
          className={clsx(
            "text-white text-base font-Electrolize 2xl:text-2xl transition-colors duration-200",
            hoverClass,
            activeClass,
          )}
        >
          Impressum
        </Link>
        <Link
          to="/sponsor"
          className="text-white text-base font-Electrolize 2xl:text-2xl active:text-[#006290] transition-colors duration-200 hover:text-[#008bcc]"
        >
          Sponsor
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
