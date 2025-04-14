"use client";
import { createFileRoute } from "@tanstack/react-router";

import { useEffect, useRef, useState } from "react";
import FramerAnimatedPngs from "~/lib/components/ui/log-animations";

export const Route = createFileRoute("/(public)/log")({
  component: Log,
});
function Log() {
  const [windowWidth, setWindowWidth] = useState(0);
  const [status, setStatus] = useState("Status..."); // Here's the declaration
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Set initial width
    setWindowWidth(window.innerWidth);

    // Update width on resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate font size based on viewport width
  const fontSize = Math.max(Math.min(windowWidth * 0.09, 90), 40);

  // Calculate SVG translation based on font size
  const svgTranslateY = fontSize * 0.75;

  // Callback function to update status
  const handleAnimationChange = (animationType: string) => {
    const statusMessages: Record<string, string> = {
      idle: "System Ready",
      right: "Moving Right",
      left: "Moving Left",
      top: "Moving Up",
      bottom: "Moving Down",
      drop: "Dropping ",
      pickUp: "Picking Up ",
    };

    setStatus(statusMessages[animationType] || "Status...");

    // Optional: Reset status after a delay
  };

  return (
    <>
      <div className="w-full">
        <div className="min-h-screen flex items-center justify-between p-6">
          <div className="font-Electrolize font-white absolute top-10 bg-[#E7000B] rounded-sm p-1">
            <p>Not Connected! Changed to Show Mode</p>
          </div>
          <div className="relative flex flex-col items-start pl-3 md:pl-10 ">
            <h3
              ref={headingRef}
              className="font-Orbitron font-bold leading-none whitespace-nowrap"
              style={{ fontSize: `${fontSize}px` }}
            >
              {status}
            </h3>
            <svg
              viewBox="0 0 347 140"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full max-w-[347px] h-auto -ml-6"
              style={{
                marginTop: `-${svgTranslateY}px`,
                transform: `translateY(-${fontSize * 0.5}px)`,
              }}
            >
              <path d="M0 0.5L31.5 112.5L347 140L12.5 131L0 0.5Z" fill="#23CF51" />
            </svg>
          </div>
          <FramerAnimatedPngs onAnimationChange={handleAnimationChange} />
        </div>
      </div>
    </>
  );
}
