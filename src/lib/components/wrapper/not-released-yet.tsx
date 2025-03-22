"use client";

import "../wrapper/not-released-yet.css";

import { useEffect, useRef } from "react";

export default function Home() {
  const interBubbleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interBubble = interBubbleRef.current;
    if (!interBubble) return;

    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    function move() {
      if (!interBubble) return;
      curX += (tgX - curX) / 20;
      curY += (tgY - curY) / 20;
      interBubble.style.transform = `translate(${Math.round(
        curX,
      )
        }px, ${Math.round(curY)}px)`;
      requestAnimationFrame(move);
    }

    function handleMouseMove(event: MouseEvent) {
      tgX = event.clientX;
      tgY = event.clientY;
    }

    window.addEventListener("mousemove", handleMouseMove);
    move();
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;600&display=swap"
        rel="stylesheet"
      />
      <main>
        <div className="top-0 left-0 z-50 absolute flex flex-col justify-center items-center opacity-80 w-full h-full">
          <h1
            className="font-semibold [font-family:Poppins] select-none stroke-2"
            style={{ textShadow: "1px 1px rgba(0, 0, 0, 0.1)" }}
          >
            <span
              className={[
                "block text-center text-white",
                // "text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl",
                "text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl",
              ].join(" ")}
            >
              Mission
            </span>
            <span
              className={[
                "block text-center text-transparent leading-none",
                "text-[10rem] sm:text-[15rem] md:text-[20rem] lg:text-[25rem] xl:text-[30rem]",
                "[-webkit-text-stroke:3px_white] sm:[-webkit-text-stroke:5px_white] md:[-webkit-text-stroke:7px_white] lg:[-webkit-text-stroke:10px_white]",
              ].join(" ")}
              style={{
                textShadow: "0 0 0px rgba(15, 23, 42, .15)",
              }}
            >
              728
            </span>
          </h1>
          <p
            className={[
              "mx-7 font-light text-center text-gray-200 italic select-none text-balance",
              "text-sm sm:text-base",
              "mt-2 sm:mt-0",
            ].join(" ")}
          >
            Website is in development. Please check back later.
          </p>
        </div>
        <div className="gradient-bg">
          <svg xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="goo">
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="10"
                  result="blur"
                />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                  result="goo"
                />
                <feBlend in="SourceGraphic" in2="goo" />
              </filter>
            </defs>
          </svg>
          <div className="gradients-container">
            <div className="g1"></div>
            <div className="g2"></div>
            <div className="g3"></div>
            <div className="g4"></div>
            <div className="g5"></div>
            <div className="interactive" ref={interBubbleRef}></div>
          </div>
        </div>
      </main>
    </>
  );
}
