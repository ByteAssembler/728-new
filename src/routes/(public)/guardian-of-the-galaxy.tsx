"use client";

import { createFileRoute } from "@tanstack/react-router";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import {
  CraneAnimation,
  DropperAnimation,
  RaspberryAnimation,
  SensorAnimation,
  WheelsAnimation,
} from "~/lib/components/ui/modelAnimation";

import { useMediaQuery } from "@uidotdev/usehooks";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Ufo from "~/lib/components/ui/ufo";

export const Route = createFileRoute("/(public)/guardian-of-the-galaxy")({
  component: Home,
  ssr: false,
});

const circleTextItems = [
  {
    text: "Raspberry Pi",
    size: "text-xl xs:text-2xl md:text-3xl lg:text-3xl 2xl:text-5xl",
    left: "25%",
    top: "25%",
    fontWeight: "font-light xs:font-semibold md:font-black",
  },
  {
    text: "Elektromagnet",
    size: "text-base xs:text-lg md:text-xl 2xl:text-3xl",
    left: "55%",
    top: "10%",
    fontWeight: "font-thin xs:font-medium md:font-bold",
  },
  {
    text: "Lichtsensor",
    size: "text-lg xs:text-xl md:text-2xl 2xl:text-3xl",
    left: "50%",
    top: "40%",
    fontWeight: "font-normal xs:font-semibold md:font-extrabold",
  },
  {
    text: "Gyrosensor",
    size: "text-base xs:text-xl md:text-2xl 2xl:text-4xl",
    left: "60%",
    top: "45%",
    fontWeight: "font-light xs:font-bold md:font-black",
  },
  {
    text: "Laserdistanzsensoren",
    size: "text-base xs:text-lg md:text-xl 2xl:text-3xl",
    left: "25%",
    top: "48%",
    fontWeight: "font-thin xs:font-normal md:font-semibold",
  },
  {
    text: "Farbsensor",
    size: "text-lg xs:text-xl md:text-3xl 2xl:text-5xl",
    left: "70%",
    top: "65%",
    fontWeight: "font-extralight xs:font-medium md:font-bold",
  },
  {
    text: "Stepper Motoren",
    size: "text-xl xs:text-2xl md:text-3xl 2xl:text-5xl",
    left: "25%",
    top: "64%",
    fontWeight: "font-light xs:font-semibold md:font-extrabold",
  },
  {
    text: "LED-Streifen",
    size: "text-lg xs:text-2xl md:text-3xl 2xl:text-5xl",
    left: "19%",
    top: "33%",
    fontWeight: "font-normal xs:font-bold md:font-black",
  },
  {
    text: "Amplifier",
    size: "text-base xs:text-lg md:text-xl 2xl:text-3xl",
    left: "55%",
    top: "30%",
    fontWeight: "font-thin xs:font-light md:font-medium",
  },
  {
    text: "Speaker",
    size: "text-lg xs:text-xl md:text-2xl 2xl:text-4xl",
    left: "76%",
    top: "35%",
    fontWeight: "font-light xs:font-medium md:font-bold",
  },
  {
    text: "Ballcaster",
    size: "text-base xs:text-xl md:text-2xl 2xl:text-4xl",
    left: "28%",
    top: "58%",
    fontWeight: "font-light xs:font-semibold md:font-black",
  },
  {
    text: "Reifen",
    size: "text-lg xs:text-xl md:text-3xl 2xl:text-5xl",
    left: "74%",
    top: "20%",
    fontWeight: "font-normal xs:font-semibold md:font-bold",
  },
  {
    text: "DC-Motoren",
    size: "text-base xs:text-lg md:text-xl 2xl:text-3xl",
    left: "25%",
    top: "40%",
    fontWeight: "font-extralight xs:font-light md:font-semibold",
  },
  {
    text: "DC-DC Converter",
    size: "text-base xs:text-xl md:text-2xl 2xl:text-4xl",
    left: "52%",
    top: "95%",
    fontWeight: "font-thin xs:font-medium md:font-bold",
  },
  {
    text: "Motortreiber- lm298n",
    size: "text-lg xs:text-xl md:text-3xl 2xl:text-5xl",
    left: "74%",
    top: "78%",
    fontWeight: "font-normal xs:font-bold md:font-black",
  },
  {
    text: "Batterie",
    size: "text-lg xs:text-xl md:text-2xl 2xl:text-4xl",
    left: "60%",
    top: "86%",
    fontWeight: "font-light xs:font-semibold md:font-bold",
  },
  {
    text: "Stromsensor",
    size: "text-lg xs:text-xl md:text-2xl 2xl:text-4xl",
    left: "40%",
    top: "75%",
    fontWeight: "font-extralight xs:font-medium md:font-bold",
  },
  {
    text: "Multiplexer",
    size: "text-base xs:text-lg md:text-2xl 2xl:text-4xl",
    left: "23%",
    top: "80%",
    fontWeight: "font-light xs:font-semibold md:font-black",
  },
  {
    text: "Stepper Motor Controller ",
    size: "text-lg xs:text-xl md:text-2xl  lg:text-3xl text-nowrap 2xl:text-5xl",
    left: "70%",
    top: "55%",
    fontWeight: "font-normal xs:font-bold md:font-extrabold",
  },
];

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function Home() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [height, setHeight] = useState("100%");
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const wheelsTitleRef = useRef<HTMLHeadingElement | null>(null);
  const generalFlyText = useRef<HTMLHeadingElement | null>(null);
  const generalFlyText2 = useRef<HTMLHeadingElement | null>(null);
  const wheelsFlyText1 = useRef<HTMLParagraphElement | null>(null);
  const wheelsFlyText2 = useRef<HTMLParagraphElement | null>(null);
  const wheelsFlyText3 = useRef<HTMLParagraphElement | null>(null);
  const wheelsAnimation = useRef<HTMLDivElement | null>(null);
  const dropperTitleRef = useRef<HTMLHeadingElement | null>(null);
  const dropperFlyText1 = useRef<HTMLParagraphElement | null>(null);
  const dropperFlyText2 = useRef<HTMLParagraphElement | null>(null);
  const dropperFlyText3 = useRef<HTMLParagraphElement | null>(null);
  const dropperAnimation = useRef<HTMLDivElement | null>(null);
  const craneTitleRef = useRef<HTMLHeadingElement | null>(null);
  const craneFlyText1 = useRef<HTMLParagraphElement | null>(null);
  const craneFlyText2 = useRef<HTMLParagraphElement | null>(null);
  const craneFlyText3 = useRef<HTMLParagraphElement | null>(null);
  const craneAnimation = useRef<HTMLDivElement | null>(null);
  const raspberryTitleRef = useRef<HTMLHeadingElement | null>(null);
  const raspberryFlyText1 = useRef<HTMLParagraphElement | null>(null);
  const raspberryFlyText2 = useRef<HTMLParagraphElement | null>(null);
  const raspberryFlyText3 = useRef<HTMLParagraphElement | null>(null);
  const raspberryAnimation = useRef<HTMLDivElement | null>(null);
  const sensorTitleRef = useRef<HTMLHeadingElement | null>(null);
  const sensorFlyText1 = useRef<HTMLParagraphElement | null>(null);
  const sensorFlyText2 = useRef<HTMLParagraphElement | null>(null);
  const sensorFlyText3 = useRef<HTMLParagraphElement | null>(null);
  const sensorAnimation = useRef<HTMLDivElement | null>(null);

  // References for the 2D circle and its content
  const circleRef = useRef<HTMLDivElement | null>(null);
  const circleTitle = useRef<HTMLHeadingElement | null>(null);
  const circleListRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    let scrollTimer, animationFrame;
    let userInteracted = false;
    let lastScrollY = window.pageYOffset;

    const handleUserIntent = () => {
      userInteracted = true;
      cleanupListeners();
    };

    const cleanupListeners = () => {
      window.removeEventListener("scroll", handleUserIntent);
      window.removeEventListener("wheel", handleUserIntent);
      window.removeEventListener("touchstart", handleUserIntent);
      window.removeEventListener("pointerdown", handleUserIntent);
    };

    // Listen for any user interaction
    window.addEventListener("scroll", handleUserIntent, { passive: true });
    window.addEventListener("wheel", handleUserIntent, { passive: true });
    window.addEventListener("touchstart", handleUserIntent, { passive: true });
    window.addEventListener("pointerdown", handleUserIntent, { passive: true });

    // Start auto-scroll if no interaction within 100ms
    scrollTimer = setTimeout(() => {
      if (userInteracted) return;

      const startY = window.pageYOffset;
      const endY = startY + window.innerHeight;
      const duration = 1000;
      const startTime = performance.now();

      const scrollStep = (currentTime) => {
        const currentY = window.pageYOffset;

        // Abort if user scrolls during animation
        if (Math.abs(currentY - lastScrollY) > 2) {
          userInteracted = true;
          return;
        }
        lastScrollY = currentY;

        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 0.5 * (1 - Math.cos(Math.PI * progress));

        window.scrollTo(0, startY + (endY - startY) * ease);

        if (progress < 1 && !userInteracted) {
          animationFrame = requestAnimationFrame(scrollStep);
        }
      };

      animationFrame = requestAnimationFrame(scrollStep);
    }, 100); // wait 100ms before starting auto-scroll

    // Cleanup on unmount
    return () => {
      clearTimeout(scrollTimer);
      cancelAnimationFrame(animationFrame);
      cleanupListeners();
    };
  }, []);

  useEffect(() => {
    // Ensure smooth scrolling for better animation effects
    document.documentElement.style.scrollBehavior = "smooth";

    // Function to handle window resize
    const handleResize = () => {
      // Refresh ScrollTrigger to update animations based on new window size
      ScrollTrigger.refresh();
    };

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerWidth >= 768 ? "100%" : "500px");
    };

    handleResize(); // Set initial value

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Function to dynamically position text elements with special handling for 4 items
    const positionTextElements = ({
      elements,
      startBottom = 42,
      spacing = 4,
      index,
    }: {
      elements: unknown[];
      startBottom?: number;
      spacing?: number;
      index?: number;
    }) => {
      if (!elements || !elements.every((el) => el)) return;

      // Check if we have exactly 4 items for special layout
      const hasFourItems = elements.length === 4;
      const fontSize = 0.01176 * window.innerHeight + 7.765;

      // Position first two items normally in all cases
      let currentBottom = startBottom;

      // First two items are always positioned the same way (stacked vertically)
      for (let i = 0; i < (hasFourItems ? 2 : elements.length); i++) {
        const el = elements[i];

        // Set initial position with fixed positioning
        gsap.set(el, {
          position: "fixed",
          bottom: `${currentBottom}vh`,
          left: 0,
          width: "100%",
          margin: "0 auto",
          paddingLeft: "0.5rem",
          paddingRight: "0.25rem",
          fontSize: fontSize,
        });

        // Calculate height + margin for next element
        const height = el.offsetHeight;
        const viewportHeight = window.innerHeight;
        const windowWidth = window.innerWidth;
        const heightInVh = (height / viewportHeight) * 100;
        let dynamicAdjustment = 0;
        if (hasFourItems && windowWidth < 590) {
          dynamicAdjustment = -0.0135 * windowWidth + 9.265;
        }

        // Update bottom position for next element
        currentBottom -= heightInVh + spacing - dynamicAdjustment;
      }

      // Special handling for 4 items
      if (hasFourItems) {
        const thirdItem = elements[2];
        const fourthItem = elements[3]; // The box with 3D model

        // Position the 4th item (box) at bottom right
        if (index === 2) {
          gsap.set(fourthItem, {
            position: "fixed",
            bottom: "0.5vh", // Fixed position from bottom
            paddingLeft: "1rem",
            left: "auto", // Clear any left positioning
            width: "42vw",
            height: "30vh",
            margin: 0,
            x: "0%", // Reset any GSAP transforms
            translate: "none", // Reset any CSS transforms
          });
        } else {
          gsap.set(fourthItem, {
            position: "fixed",
            bottom: "1vh", // Fixed position from bottom
            paddingLeft: "1rem",
            left: "auto", // Clear any left positioning
            width: "45vw",
            height: "38vh",
            margin: 0,
            x: "0%", // Reset any GSAP transforms
            translate: "none", // Reset any CSS transforms
          });
        }

        // Get the position and dimensions of the 4th item
        const boxRect = fourthItem.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        // const viewportHeight = window.innerHeight;

        // Calculate the position for the 3rd item
        // It should be positioned to the left of the 4th item
        gsap.set(thirdItem, {
          position: "fixed",
          bottom: `${viewportWidth >= 590 ? 10 : viewportWidth >= 432 ? 3 : 1}vh`, // Align with bottom of box
          left: `${(boxRect.width / viewportWidth) * 100 + 5}vw`, // Position to the left of the box
          right: "0", // Start from left
          width: `${((viewportWidth - boxRect.width - viewportWidth * 0.1) / viewportWidth) * 100}vw`, // Width to fit remaining space
          textAlign: "left", // Align text to right
          x: "0%", // Reset any GSAP transforms
          translate: "none", // Reset any CSS transforms
          margin: 0,
          paddingLeft: "0.35rem",
          paddingRight: "0.25rem",
          fontSize: fontSize,
        });
      }
    };

    // Ensure smooth scrolling for better animation effects
    document.documentElement.style.scrollBehavior = "smooth";
    if (isMobile) {
      // Mobile initial positions (off-screen)
      gsap.set([generalFlyText.current], { x: "-100%", opacity: 0 });
      gsap.set([wheelsFlyText1.current, wheelsFlyText2.current, wheelsFlyText3.current], {
        x: "-100%",
        opacity: 0,
      });
      gsap.set(
        [
          dropperFlyText1.current,
          dropperFlyText2.current,
          dropperFlyText3.current,
          dropperAnimation.current,
        ],
        {
          x: "-100%",
          opacity: 0,
        },
      );
      gsap.set([craneFlyText1.current, craneFlyText2.current, craneFlyText3.current], {
        x: "-100%",
        opacity: 0,
      });
      gsap.set(
        [raspberryFlyText1.current, raspberryFlyText2.current, raspberryFlyText3.current],
        {
          x: "-100%",
          opacity: 0,
        },
      );
      gsap.set([sensorFlyText1.current, sensorFlyText2.current, sensorFlyText3.current], {
        x: "-100%",
        opacity: 0,
      });

      // Set initial state for 2D circle (hidden)
      gsap.set([circleRef.current, circleTitle.current, circleListRef.current], {
        opacity: 0,
        scale: 0,
      });
    } else {
      // Desktop initial positions (center)
      gsap.set([generalFlyText.current], {
        x: "0%",
        left: "50%",
        xPercent: -50,
        opacity: 0,
      });
      gsap.set([generalFlyText2.current], {
        x: "0%",
        left: "50%",
        xPercent: -50,
        opacity: 0,
      });

      // Position the three texts at center initially
      gsap.set(wheelsFlyText1.current, {
        x: "0%",
        left: "50%",
        xPercent: -50,
        opacity: 0,
      });
      gsap.set(wheelsFlyText2.current, {
        x: "0%",
        left: "50%",
        xPercent: -50,
        opacity: 0,
      });
      gsap.set(wheelsFlyText3.current, {
        x: "0%",
        left: "50%",
        xPercent: -50,
        opacity: 0,
      });

      gsap.set(dropperFlyText1.current, {
        x: "0%",
        left: "50%",
        xPercent: -50,
        opacity: 0,
      });
      gsap.set(dropperFlyText2.current, {
        x: "0%",
        left: "50%",
        xPercent: -50,
        opacity: 0,
      });
      gsap.set(dropperFlyText3.current, {
        x: "0%",
        left: "50%",
        xPercent: -50,
        opacity: 0,
      });

      gsap.set(craneFlyText1.current, {
        x: "0%",
        left: "50%",
        xPercent: -50,
        opacity: 0,
      });
      gsap.set(craneFlyText2.current, {
        x: "0%",
        left: "50%",
        xPercent: -50,
        opacity: 0,
      });
      gsap.set(craneFlyText3.current, {
        x: "0%",
        left: "50%",
        xPercent: -50,
        opacity: 0,
      });

      gsap.set(raspberryFlyText1.current, {
        x: "0%",
        left: "50%",
        xPercent: -50,
        opacity: 0,
      });
      gsap.set(raspberryFlyText2.current, {
        x: "0%",
        left: "50%",
        xPercent: -50,
        opacity: 0,
      });
      gsap.set(raspberryFlyText3.current, {
        x: "0%",
        left: "50%",
        xPercent: -50,
        opacity: 0,
      });

      gsap.set(sensorFlyText1.current, {
        x: "0%",
        left: "50%",
        xPercent: -50,
        opacity: 0,
      });
      gsap.set(sensorFlyText2.current, {
        x: "0%",
        left: "50%",
        xPercent: -50,
        opacity: 0,
      });
      gsap.set(sensorFlyText3.current, {
        x: "0%",
        left: "50%",
        xPercent: -50,
        opacity: 0,
      });

      // Set initial state for 2D circle (hidden)
      gsap.set([circleRef.current, circleTitle.current, circleListRef.current], {
        opacity: 0,
        scale: 0,
      });
    }

    // Title animation
    gsap.fromTo(
      titleRef.current,
      { opacity: 1, y: 0 },
      {
        opacity: 0,
        y: -100,
        scrollTrigger: {
          trigger: "#start",
          start: "top top+=20", // Delay
          end: "bottom top",
          scrub: true,
        },
      },
    );

    // Update the general text animation to use relative positioning
    // general Text animation
    if (generalFlyText.current) {
      const flyIn = gsap.timeline({
        scrollTrigger: {
          trigger: "#fly-outside",
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      });

      flyIn.fromTo(
        generalFlyText.current,
        {
          x: "-100vw",
          opacity: 0,
        },
        {
          x: "50vw",
          xPercent: -50,
          opacity: 1,
          left: "0",
          right: "0",
          maxWidth: "80%",
          textAlign: "center",
        },
      );

      // Exit: from center to right
      const flyOut = gsap.timeline({
        scrollTrigger: {
          trigger: "#pause-generel-out",
          start: "top center",
          end: "bottom center",
          scrub: true,
          immediateRender: false, // Important to prevent overwrite
        },
      });

      flyOut.to(generalFlyText.current, {
        x: "100vw",
        xPercent: 0,
        opacity: 0,
      });

      const flyIn2 = gsap.timeline({
        scrollTrigger: {
          trigger: "#pause-generel-in",
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      });

      flyIn2.fromTo(
        generalFlyText2.current,
        {
          x: "-100vw",
          opacity: 0,
        },
        {
          x: "50vw",
          xPercent: -50,
          opacity: 1,
          left: "0",
          right: "0",
          maxWidth: "80%",
          textAlign: "center",
        },
      );

      // Exit: from center to right
      const flyOut2 = gsap.timeline({
        scrollTrigger: {
          trigger: "#fly-middle",
          start: "top center",
          end: "bottom center",
          scrub: true,
          immediateRender: false, // Important to prevent overwrite
        },
      });

      flyOut2.to(generalFlyText2.current, {
        x: "100vw",
        xPercent: 0,
        opacity: 0,
      });
    }

    // 2D Circle animation
    if (circleRef.current) {
      // Animation for the 2D circle to appear
      const circleAppear = gsap.timeline({
        scrollTrigger: {
          trigger: "#become-2d",
          start: "top center",
          end: "top center+=300", // Extend the animation duration
          scrub: true,
          markers: false, // Set to true for debugging
        },
      });

      // Initial state - completely hidden
      gsap.set([circleRef.current], {
        opacity: 0,
        scale: 0.5,
        y: 50,
      });

      // Animate with fromTo for more control
      circleAppear.fromTo(
        circleRef.current,
        {
          opacity: 0,
          scale: 0.5,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out",
        },
      );
    }

    // Use ScrollTrigger.matchMedia to create responsive animations
    ScrollTrigger.matchMedia({
      // Desktop animations
      "(min-width: 769px)": () => {
        //wheels animation
        if (
          wheelsTitleRef.current &&
          wheelsFlyText1.current &&
          wheelsFlyText2.current &&
          wheelsFlyText3.current &&
          wheelsAnimation.current
        ) {
          //title
          //fade in
          const fadeInTitle = gsap.timeline({
            scrollTrigger: {
              trigger: "#rotate-to-bottom",
              start: "top center",
              end: "bottom center",
              scrub: true,
            },
          });
          fadeInTitle.to(wheelsTitleRef.current, { opacity: 1 });

          //fade out
          const fadeOutTitle = gsap.timeline({
            scrollTrigger: {
              trigger: "#rotate-to-normal",
              start: "top center",
              end: "bottom center",
              scrub: true,
              immediateRender: false,
            },
          });
          fadeOutTitle.to(wheelsTitleRef.current, { opacity: 0 });

          //text
          const fadeInText = gsap.timeline({
            scrollTrigger: {
              trigger: "#rotate-to-bottom",
              start: "top center-=10%",
              end: "bottom center",
              scrub: true,
            },
          });
          fadeInText
            .fromTo(
              wheelsFlyText1.current,
              { opacity: 0, x: "-100vw" },
              { opacity: 1, x: "20vw", xPercent: -50, left: 0 }, // Position at 25% of viewport width
            )
            .fromTo(
              wheelsFlyText2.current,
              { opacity: 0, x: "100vw" },
              { opacity: 1, x: "80vw", xPercent: -50, left: 0, textAlign: "right" }, // Position at 75% of viewport width
            )
            .fromTo(
              wheelsFlyText3.current,
              { opacity: 0, x: "-100vw" },
              { opacity: 1, x: "20vw", xPercent: -50, left: 0 }, // Position at 25% of viewport width
            )
            .fromTo(
              wheelsAnimation.current,
              { opacity: 0, x: "100vw" },
              { opacity: 1, x: "85vw", xPercent: -50, left: 0 },
            );
          const fadeOutText = gsap.timeline({
            scrollTrigger: {
              trigger: "#rotate-to-normal",
              start: "top center",
              end: "bottom center",
              scrub: true,
              immediateRender: false,
            },
          });
          fadeOutText
            .to(wheelsFlyText1.current, {
              opacity: 0,
              x: "-100%", // Use percentage instead of pixel values
            })
            .to(wheelsFlyText2.current, {
              opacity: 0,
              x: "500%", // Use percentage instead of pixel values
            })
            .to(wheelsFlyText3.current, {
              opacity: 0,
              x: "-100%", // Use percentage instead of pixel values
            })
            .to(wheelsAnimation.current, {
              opacity: 0,
              x: "500%", // Move it off-screen like the text
            });
        }

        //dropper animation
        if (
          dropperTitleRef.current &&
          dropperFlyText1.current &&
          dropperFlyText2.current &&
          dropperFlyText3.current &&
          dropperAnimation.current
        ) {
          //title
          //fade in
          const fadeInTitle = gsap.timeline({
            scrollTrigger: {
              trigger: "#fade-in-dropper",
              start: "top center",
              end: "bottom center",
              scrub: true,
            },
          });
          fadeInTitle.to(dropperTitleRef.current, { opacity: 1 });

          //fade out
          const fadeOutTitle = gsap.timeline({
            scrollTrigger: {
              trigger: "#fade-out-dropper",
              start: "top center",
              end: "bottom center",
              scrub: true,
              immediateRender: false,
            },
          });
          fadeOutTitle.to(dropperTitleRef.current, { opacity: 0 });

          //text
          const fadeInText = gsap.timeline({
            scrollTrigger: {
              trigger: "#fade-in-dropper",
              start: "top center-=10%",
              end: "bottom center",
              scrub: true,
            },
          });

          fadeInText
            .fromTo(
              dropperFlyText1.current,
              { opacity: 0, x: "-100vw" },
              { opacity: 1, x: "20vw", xPercent: -50, left: 0 }, // Position at 25% of viewport width
            )
            .fromTo(
              dropperFlyText2.current,
              { opacity: 0, x: "100vw" },
              { opacity: 1, x: "80vw", xPercent: -50, left: 0, textAlign: "right" }, // Position at 75% of viewport width
            )
            .fromTo(
              dropperFlyText3.current,
              { opacity: 0, x: "-100vw" },
              { opacity: 1, x: "20vw", xPercent: -50, left: 0 }, // Position at 25% of viewport width
            )
            .fromTo(
              dropperAnimation.current,
              { opacity: 0, x: "100vw" },
              { opacity: 1, x: "85vw", xPercent: -50, left: 0 },
            );
          const fadeOutText = gsap.timeline({
            scrollTrigger: {
              trigger: "#fade-out-dropper",
              start: "top center",
              end: "bottom center",
              scrub: true,
              immediateRender: false,
            },
          });
          fadeOutText
            .to(dropperFlyText1.current, {
              opacity: 0,
              x: "-100%", // Move to the left side of the screen
            })
            .to(dropperFlyText2.current, {
              opacity: 0,
              x: "500%", // Move to the right side of the screen
            })
            .to(dropperFlyText3.current, {
              opacity: 0,
              x: "-100%", // Move to the left side of the screen
            })
            .to(dropperAnimation.current, {
              opacity: 0,
              x: "500%", // Move it off-screen like the text
            });
        }

        // Crane animation
        if (
          craneFlyText1.current &&
          craneFlyText2.current &&
          craneFlyText3.current &&
          craneTitleRef.current &&
          craneAnimation.current
        ) {
          //title
          //fade in
          const fadeInTitle = gsap.timeline({
            scrollTrigger: {
              trigger: "#fade-in-crane",
              start: "top center",
              end: "bottom center",
              scrub: true,
            },
          });
          fadeInTitle.to(craneTitleRef.current, { opacity: 1 });

          //fade out
          const fadeOutTitle = gsap.timeline({
            scrollTrigger: {
              trigger: "#fade-out-crane",
              start: "top center",
              end: "bottom center",
              scrub: true,
              immediateRender: false,
            },
          });
          fadeOutTitle.to(craneTitleRef.current, { opacity: 0 });

          //text
          const fadeInText = gsap.timeline({
            scrollTrigger: {
              trigger: "#fade-in-crane",
              start: "top center-=10%",
              end: "bottom center",
              scrub: true,
            },
          });
          fadeInText
            .fromTo(
              craneFlyText1.current,
              { opacity: 0, x: "-100vw" },
              { opacity: 1, x: "20vw", xPercent: -50, left: 0 }, // Position at 25% of viewport width
            )
            .fromTo(
              craneFlyText2.current,
              { opacity: 0, x: "100vw" },
              { opacity: 1, x: "80vw", xPercent: -50, left: 0, textAlign: "right" }, // Position at 75% of viewport width
            )
            .fromTo(
              craneFlyText3.current,
              { opacity: 0, x: "-100vw" },
              { opacity: 1, x: "20vw", xPercent: -50, left: 0 }, // Position at 25% of viewport width
            )
            .fromTo(
              craneAnimation.current,
              { opacity: 0, x: "100vw" },
              { opacity: 1, x: "85vw", xPercent: -50, left: 0 },
            );
          const fadeOutText = gsap.timeline({
            scrollTrigger: {
              trigger: "#fade-out-crane",
              start: "top center",
              end: "bottom center",
              scrub: true,
              immediateRender: false,
            },
          });
          fadeOutText
            .to(craneFlyText1.current, {
              opacity: 0,
              x: "-100%", // Move to the left side of the screen
            })
            .to(craneFlyText2.current, {
              opacity: 0,
              x: "500%", // Move to the right side of the screen
            })
            .to(craneFlyText3.current, {
              opacity: 0,
              x: "-100%", // Move to the left side of the screen
            })
            .to(craneAnimation.current, {
              opacity: 0,
              x: "500%", // Move to the left side of the screen
            });
        }

        //raspberry animation
        if (
          raspberryTitleRef.current &&
          raspberryFlyText1.current &&
          raspberryFlyText2.current &&
          raspberryFlyText3.current &&
          raspberryAnimation.current
        ) {
          //title
          //fade in
          const fadeInTitle = gsap.timeline({
            scrollTrigger: {
              trigger: "#fade-in-raspberry",
              start: "top center",
              end: "bottom center",
              scrub: true,
            },
          });
          fadeInTitle.to(raspberryTitleRef.current, { opacity: 1 });

          //fade out
          const fadeOutTitle = gsap.timeline({
            scrollTrigger: {
              trigger: "#rotate-to-top",
              start: "top center",
              end: "bottom center",
              scrub: true,
              immediateRender: false,
            },
          });
          fadeOutTitle.to(raspberryTitleRef.current, { opacity: 0 });

          //text
          const fadeInText = gsap.timeline({
            scrollTrigger: {
              trigger: "#fade-in-raspberry",
              start: "top center-=10%",
              end: "bottom center",
              scrub: true,
            },
          });
          fadeInText
            .fromTo(
              raspberryFlyText1.current,
              { opacity: 0, x: "-100vw" },
              { opacity: 1, x: "20vw", xPercent: -50, left: 0 },
            )
            .fromTo(
              raspberryFlyText2.current,
              { opacity: 0, x: "100vw" },
              { opacity: 1, x: "80vw", xPercent: -50, left: 0, textAlign: "right" },
            )
            .fromTo(
              raspberryFlyText3.current,
              { opacity: 0, x: "-100vw" },
              { opacity: 1, x: "20vw", xPercent: -50, left: 0 },
            )
            .fromTo(
              raspberryAnimation.current,
              { opacity: 0, x: "100vw" },
              { opacity: 1, x: "85vw", xPercent: -50, left: 0 },
            );
          const fadeOutText = gsap.timeline({
            scrollTrigger: {
              trigger: "#rotate-to-top",
              start: "top center",
              end: "bottom center",
              scrub: true,
              immediateRender: false,
            },
          });
          fadeOutText
            .to(raspberryFlyText1.current, {
              opacity: 0,
              x: "-100%", // Move to the left side of the screen
            })
            .to(raspberryFlyText2.current, {
              opacity: 0,
              x: "500%", // Move to the right side of the screen
            })
            .to(raspberryFlyText3.current, {
              opacity: 0,
              x: "-100%", // Move to the left side of the screen
            })
            .to(raspberryAnimation.current, {
              opacity: 0,
              x: "500%", // Move to the left side of the screen
            });
        }

        //sensor animation
        if (
          sensorFlyText1.current &&
          sensorFlyText2.current &&
          sensorFlyText3.current &&
          sensorTitleRef.current &&
          sensorAnimation.current
        ) {
          //title
          //fade in
          const fadeInTitle = gsap.timeline({
            scrollTrigger: {
              trigger: "#rotate-to-top",
              start: "top center",
              end: "bottom center",
              scrub: true,
            },
          });
          fadeInTitle.to(sensorTitleRef.current, { opacity: 1 });

          //fade out
          const fadeOutTitle = gsap.timeline({
            scrollTrigger: {
              trigger: "#fade-out-sensors",
              start: "top center",
              end: "bottom center",
              scrub: true,
              immediateRender: false,
            },
          });
          fadeOutTitle.to(sensorTitleRef.current, { opacity: 0 });

          //text
          const fadeInText = gsap.timeline({
            scrollTrigger: {
              trigger: "#rotate-to-top",
              start: "top center+=10%",
              end: "bottom center",
              scrub: true,
            },
          });
          fadeInText
            .fromTo(
              sensorFlyText1.current,
              { opacity: 0, x: "-100vw" },
              { opacity: 1, x: "20vw", xPercent: -50, left: 0 },
            )
            .fromTo(
              sensorFlyText2.current,
              { opacity: 0, x: "100vw" },
              { opacity: 1, x: "80vw", xPercent: -50, left: 0, textAlign: "right" },
            )
            .fromTo(
              sensorFlyText3.current,
              { opacity: 0, x: "-100vw" },
              { opacity: 1, x: "20vw", xPercent: -50, left: 0 },
            )
            .fromTo(
              sensorAnimation.current,
              { opacity: 0, x: "100vw" },
              { opacity: 1, x: "85vw", xPercent: -50, left: 0 },
            );
          const fadeOutText = gsap.timeline({
            scrollTrigger: {
              trigger: "#fade-out-sensors",
              start: "top center",
              end: "bottom center",
              scrub: true,
              immediateRender: false,
            },
          });
          fadeOutText
            .to(sensorFlyText1.current, {
              opacity: 0,
              x: "-100%", // Move to the left side of the screen
            })
            .to(sensorFlyText2.current, {
              opacity: 0,
              x: "500%", // Move to the right side of the screen
            })
            .to(sensorFlyText3.current, {
              opacity: 0,
              x: "-100%", // Move to the left side of the screen
            })
            .to(sensorAnimation.current, {
              opacity: 0,
              x: "500%", // Move it off-screen like the text
            });
        }
      },

      // Mobile animations
      "(max-width: 768px)": () => {
        // Create a container for mobile text elements
        gsap.set(
          [
            wheelsFlyText1.current,
            wheelsFlyText2.current,
            wheelsFlyText3.current,
            dropperFlyText1.current,
            dropperFlyText2.current,
            dropperFlyText3.current,
            craneFlyText1.current,
            craneFlyText2.current,
            craneFlyText3.current,
            raspberryFlyText1.current,
            raspberryFlyText2.current,
            raspberryFlyText3.current,
            sensorFlyText1.current,
            sensorFlyText2.current,
            sensorFlyText3.current,
          ],
          {
            maxWidth: "100vw", // Limit width to prevent overflow
            wordWrap: "break-word", // Ensure text wraps
            whiteSpace: "normal", // Allow text to wrap
          },
        );

        // Mobile wheels animation
        if (
          wheelsTitleRef.current &&
          wheelsFlyText1.current &&
          wheelsFlyText2.current &&
          wheelsFlyText3.current &&
          wheelsAnimation.current
        ) {
          // Title animation remains the same
          const fadeInTitle = gsap.timeline({
            scrollTrigger: {
              trigger: "#rotate-to-bottom",
              start: "top center",
              end: "bottom center",
              scrub: true,
            },
          });
          fadeInTitle.to(wheelsTitleRef.current, { opacity: 1 });

          const fadeOutTitle = gsap.timeline({
            scrollTrigger: {
              trigger: "#rotate-to-normal",
              start: "top center",
              end: "bottom center",
              scrub: true,
              immediateRender: false,
            },
          });
          fadeOutTitle.to(wheelsTitleRef.current, { opacity: 0 });

          // Mobile text animation - dynamically positioned
          const fadeInText = gsap.timeline({
            scrollTrigger: {
              trigger: "#rotate-to-bottom",
              start: "top center-=10%",
              end: "bottom center",
              scrub: true,
              onEnter: () => {
                // Position elements dynamically when this section enters viewport
                positionTextElements({
                  elements: [
                    wheelsFlyText1.current,
                    wheelsFlyText2.current,
                    wheelsFlyText3.current,
                    wheelsAnimation.current,
                  ],
                });
              },
              onRefresh: () => {
                // Reposition on scroll refresh (e.g., after resize)
                positionTextElements({
                  elements: [
                    wheelsFlyText1.current,
                    wheelsFlyText2.current,
                    wheelsFlyText3.current,
                    wheelsAnimation.current,
                  ],
                });
              },
            },
          });

          // Animate each text element with the dynamic positioning
          fadeInText
            .fromTo(
              wheelsFlyText1.current,
              { opacity: 0, x: "-100vw" },
              {
                opacity: 1,
                x: "0%",
              },
            )
            .fromTo(
              wheelsFlyText2.current,
              { opacity: 0, x: "-100vw" },
              {
                opacity: 1,
                x: "0%",
              },
            )
            .fromTo(
              wheelsFlyText3.current,
              { opacity: 0, x: "-100vw" },
              {
                opacity: 1,
                x: "0%",
              },
            )
            .fromTo(
              wheelsAnimation.current,
              { opacity: 0, x: "-100vw" },
              {
                opacity: 1,
                x: "0%",
              },
            );

          const fadeOutText = gsap.timeline({
            scrollTrigger: {
              trigger: "#rotate-to-normal",
              start: "top center",
              end: "bottom center",
              scrub: true,
              immediateRender: false,
              onEnter: () => {
                // Position elements dynamically when this section enters viewport
                positionTextElements({
                  elements: [
                    wheelsFlyText1.current,
                    wheelsFlyText2.current,
                    wheelsFlyText3.current,
                    wheelsAnimation.current,
                  ],
                });
              },
              onRefresh: () => {
                // Reposition on scroll refresh (e.g., after resize)
                positionTextElements({
                  elements: [
                    wheelsFlyText1.current,
                    wheelsFlyText2.current,
                    wheelsFlyText3.current,
                    wheelsAnimation.current,
                  ],
                });
              },
            },
          });

          fadeOutText
            .to(wheelsFlyText1.current, {
              opacity: 0,
              x: "100%",
            })
            .to(
              wheelsFlyText2.current,
              {
                opacity: 0,
                x: "100%",
              },
              "-=0.2", // Slight overlap
            )
            .to(
              wheelsFlyText3.current,
              {
                opacity: 0,
                x: "100%",
              },
              "-=0.2", // Slight overlap
            )
            .to(
              wheelsAnimation.current,
              {
                opacity: 0,
                x: "100%",
              },
              "-=0.2",
            );

          // Mobile dropper animation
          if (
            dropperTitleRef.current &&
            dropperFlyText1.current &&
            dropperFlyText2.current &&
            dropperFlyText3.current &&
            dropperAnimation.current
          ) {
            // Title animation
            const fadeInTitle = gsap.timeline({
              scrollTrigger: {
                trigger: "#fade-in-dropper",
                start: "top center",
                end: "bottom center",
                scrub: true,
              },
            });
            fadeInTitle.to(dropperTitleRef.current, { opacity: 1 });

            const fadeOutTitle = gsap.timeline({
              scrollTrigger: {
                trigger: "#fade-out-dropper",
                start: "top center",
                end: "bottom center",
                scrub: true,
                immediateRender: false,
              },
            });
            fadeOutTitle.to(dropperTitleRef.current, { opacity: 0 });

            // Mobile text animation - stacked at bottom with different heights
            const fadeInText = gsap.timeline({
              scrollTrigger: {
                trigger: "#fade-in-dropper",
                start: "top center-=10%",
                end: "bottom center",
                scrub: true,
                onEnter: () => {
                  // Position elements dynamically when this section enters viewport
                  positionTextElements({
                    elements: [
                      dropperFlyText1.current,
                      dropperFlyText2.current,
                      dropperFlyText3.current,
                      dropperAnimation.current,
                    ],
                  });
                },
                onRefresh: () => {
                  // Reposition on scroll refresh (e.g., after resize)
                  positionTextElements({
                    elements: [
                      dropperFlyText1.current,
                      dropperFlyText2.current,
                      dropperFlyText3.current,
                      dropperAnimation.current,
                    ],
                  });
                },
              },
            });

            fadeInText
              .fromTo(
                dropperFlyText1.current,
                { opacity: 0, x: "-100vw" },
                {
                  opacity: 1,
                  x: "0%",
                },
              )
              .fromTo(
                dropperFlyText2.current,
                { opacity: 0, x: "-100vw" },
                {
                  opacity: 1,
                  x: "0%",
                },
              )
              .fromTo(
                dropperFlyText3.current,
                { opacity: 0, x: "-100vw" },
                {
                  opacity: 1,
                  x: "0%",
                },
              )
              .fromTo(
                dropperAnimation.current,
                { opacity: 0, x: "-100vw" },
                {
                  opacity: 1,
                  x: "0%",
                },
              );

            const fadeOutText = gsap.timeline({
              scrollTrigger: {
                trigger: "#fade-out-dropper",
                start: "top center",
                end: "bottom center",
                scrub: true,
                immediateRender: false,
                onEnter: () => {
                  // Position elements dynamically when this section enters viewport
                  positionTextElements({
                    elements: [
                      dropperFlyText1.current,
                      dropperFlyText2.current,
                      dropperFlyText3.current,
                      dropperAnimation.current,
                    ],
                  });
                },
                onRefresh: () => {
                  // Reposition on scroll refresh (e.g., after resize)
                  positionTextElements({
                    elements: [
                      dropperFlyText1.current,
                      dropperFlyText2.current,
                      dropperFlyText3.current,
                      dropperAnimation.current,
                    ],
                  });
                },
              },
            });

            fadeOutText
              .to(dropperFlyText1.current, {
                opacity: 0,
                x: "100%",
              })
              .to(
                dropperFlyText2.current,
                {
                  opacity: 0,
                  x: "100%",
                },
                "-=0.2", // Slight overlap
              )
              .to(
                dropperFlyText3.current,
                {
                  opacity: 0,
                  x: "100%",
                },
                "-=0.2", // Slight overlap
              )
              .to(
                dropperAnimation.current,
                {
                  opacity: 0,
                  x: "100%",
                },
                "-=0.2",
              );
          }

          // Mobile crane animation
          if (
            craneFlyText1.current &&
            craneFlyText2.current &&
            craneFlyText3.current &&
            craneTitleRef.current
          ) {
            // Title animation
            const fadeInTitle = gsap.timeline({
              scrollTrigger: {
                trigger: "#fade-in-crane",
                start: "top center",
                end: "bottom center",
                scrub: true,
              },
            });
            fadeInTitle.to(craneTitleRef.current, { opacity: 1 });

            const fadeOutTitle = gsap.timeline({
              scrollTrigger: {
                trigger: "#fade-out-crane",
                start: "top center",
                end: "bottom center",
                scrub: true,
                immediateRender: false,
              },
            });
            fadeOutTitle.to(craneTitleRef.current, { opacity: 0 });

            // Mobile text animation - stacked at bottom
            const fadeInText = gsap.timeline({
              scrollTrigger: {
                trigger: "#fade-in-crane",
                start: "top center-=10%",
                end: "bottom center",
                scrub: true,
                onEnter: () => {
                  // Position elements dynamically when this section enters viewport
                  positionTextElements({
                    elements: [
                      craneFlyText1.current,
                      craneFlyText2.current,
                      craneFlyText3.current,
                      craneAnimation.current,
                    ],
                    spacing: 6,
                    startBottom: 42,
                    index: 2,
                  });
                },
                onRefresh: () => {
                  // Reposition on scroll refresh (e.g., after resize)
                  positionTextElements({
                    elements: [
                      craneFlyText1.current,
                      craneFlyText2.current,
                      craneFlyText3.current,
                      craneAnimation.current,
                    ],
                    spacing: 6,
                    startBottom: 42,
                    index: 2,
                  });
                },
              },
            });

            fadeInText
              .fromTo(
                craneFlyText1.current,
                { opacity: 0, x: "-100vw" },
                {
                  opacity: 1,
                  x: "0%",
                },
              )
              .fromTo(
                craneFlyText2.current,
                { opacity: 0, x: "-100vw" },
                {
                  opacity: 1,
                  x: "0%",
                },
              )
              .fromTo(
                craneFlyText3.current,
                { opacity: 0, x: "-100vw" },
                {
                  opacity: 1,
                  x: "0%",
                },
              )
              .fromTo(
                craneAnimation.current,
                { opacity: 0, x: "-100vw" },
                {
                  opacity: 1,
                  x: "0%",
                },
              );

            const fadeOutText = gsap.timeline({
              scrollTrigger: {
                trigger: "#fade-out-crane",
                start: "top center",
                end: "bottom center",
                scrub: true,
                immediateRender: false,
                onEnter: () => {
                  // Position elements dynamically when this section enters viewport
                  positionTextElements({
                    elements: [
                      craneFlyText1.current,
                      craneFlyText2.current,
                      craneFlyText3.current,
                      craneAnimation.current,
                    ],
                    spacing: 6,
                    startBottom: 42,
                    index: 2,
                  });
                },
                onRefresh: () => {
                  // Reposition on scroll refresh (e.g., after resize)
                  positionTextElements({
                    elements: [
                      craneFlyText1.current,
                      craneFlyText2.current,
                      craneFlyText3.current,
                      craneAnimation.current,
                    ],
                    spacing: 6,
                    startBottom: 42,
                    index: 2,
                  });
                },
              },
            });

            fadeOutText
              .to(craneFlyText1.current, {
                opacity: 0,
                x: "100%",
              })
              .to(
                craneFlyText2.current,
                {
                  opacity: 0,
                  x: "100%",
                },
                "-=0.2", // Slight overlap
              )
              .to(
                craneFlyText3.current,
                {
                  opacity: 0,
                  x: "100%",
                },
                "-=0.2", // Slight overlap
              )
              .to(
                craneAnimation.current,
                {
                  opacity: 0,
                  x: "100%",
                },
                "-=0.2",
              );
          }

          // Mobile raspberry animation
          if (
            raspberryTitleRef.current &&
            raspberryFlyText1.current &&
            raspberryFlyText2.current &&
            raspberryFlyText3.current &&
            raspberryAnimation.current
          ) {
            // Title animation
            const fadeInTitle = gsap.timeline({
              scrollTrigger: {
                trigger: "#fade-in-raspberry",
                start: "top center",
                end: "bottom center",
                scrub: true,
              },
            });
            fadeInTitle.to(raspberryTitleRef.current, { opacity: 1 });

            const fadeOutTitle = gsap.timeline({
              scrollTrigger: {
                trigger: "#rotate-to-top",
                start: "top center",
                end: "bottom center",
                scrub: true,
                immediateRender: false,
              },
            });
            fadeOutTitle.to(raspberryTitleRef.current, { opacity: 0 });

            // Mobile text animation - stacked at bottom
            const fadeInText = gsap.timeline({
              scrollTrigger: {
                trigger: "#fade-in-raspberry",
                start: "top center-=10%",
                end: "bottom center",
                scrub: true,
                onEnter: () => {
                  // Position elements dynamically when this section enters viewport
                  positionTextElements({
                    elements: [
                      raspberryFlyText1.current,
                      raspberryFlyText2.current,
                      raspberryFlyText3.current,
                      raspberryAnimation.current,
                    ],
                  });
                },
                onRefresh: () => {
                  // Reposition on scroll refresh (e.g., after resize)
                  positionTextElements({
                    elements: [
                      raspberryFlyText1.current,
                      raspberryFlyText2.current,
                      raspberryFlyText3.current,
                      raspberryAnimation.current,
                    ],
                  });
                },
              },
            });

            fadeInText
              .fromTo(
                raspberryFlyText1.current,
                { opacity: 0, x: "-100vw" },
                {
                  opacity: 1,
                  x: "0%",
                },
              )
              .fromTo(
                raspberryFlyText2.current,
                { opacity: 0, x: "-100vw" },
                {
                  opacity: 1,
                  x: "0%",
                },
              )
              .fromTo(
                raspberryFlyText3.current,
                { opacity: 0, x: "-100vw" },
                {
                  opacity: 1,
                  x: "0%",
                },
              )
              .fromTo(
                raspberryAnimation.current,
                { opacity: 0, x: "-100vw" },
                {
                  opacity: 1,
                  x: "0%",
                },
              );
            const fadeOutText = gsap.timeline({
              scrollTrigger: {
                trigger: "#rotate-to-top",
                start: "top center",
                end: "bottom center",
                scrub: true,
                immediateRender: false,
                onEnter: () => {
                  // Position elements dynamically when this section enters viewport
                  positionTextElements({
                    elements: [
                      raspberryFlyText1.current,
                      raspberryFlyText2.current,
                      raspberryFlyText3.current,
                      raspberryAnimation.current,
                    ],
                  });
                },
                onRefresh: () => {
                  // Reposition on scroll refresh (e.g., after resize)
                  positionTextElements({
                    elements: [
                      raspberryFlyText1.current,
                      raspberryFlyText2.current,
                      raspberryFlyText3.current,
                      raspberryAnimation.current,
                    ],
                  });
                },
              },
            });

            fadeOutText
              .to(raspberryFlyText1.current, {
                opacity: 0,
                x: "100%",
              })
              .to(
                raspberryFlyText2.current,
                {
                  opacity: 0,
                  x: "100%",
                },
                "-=0.2", // Slight overlap
              )
              .to(
                raspberryFlyText3.current,
                {
                  opacity: 0,
                  x: "100%",
                },
                "-=0.2", // Slight overlap
              )
              .to(
                raspberryAnimation.current,
                {
                  opacity: 0,
                  x: "100%",
                },
                "-=0.2",
              );
          }

          // Mobile sensor animation
          if (
            sensorFlyText1.current &&
            sensorFlyText2.current &&
            sensorFlyText3.current &&
            sensorTitleRef.current &&
            sensorAnimation.current
          ) {
            // Title animation
            const fadeInTitle = gsap.timeline({
              scrollTrigger: {
                trigger: "#rotate-to-top",
                start: "top center",
                end: "bottom center",
                scrub: true,
              },
            });
            fadeInTitle.to(sensorTitleRef.current, { opacity: 1 });

            const fadeOutTitle = gsap.timeline({
              scrollTrigger: {
                trigger: "#fade-out-sensors",
                start: "top center",
                end: "bottom center",
                scrub: true,
                immediateRender: false,
              },
            });
            fadeOutTitle.to(sensorTitleRef.current, { opacity: 0 });

            // Mobile text animation - stacked at bottom
            const fadeInText = gsap.timeline({
              scrollTrigger: {
                trigger: "#rotate-to-top",
                start: "top center-=10%",
                end: "bottom center",
                scrub: true,
                onEnter: () => {
                  // Position elements dynamically when this section enters viewport
                  positionTextElements({
                    elements: [
                      sensorFlyText1.current,
                      sensorFlyText2.current,
                      sensorFlyText3.current,
                      sensorAnimation.current,
                    ],
                  });
                },
                onRefresh: () => {
                  // Reposition on scroll refresh (e.g., after resize)
                  positionTextElements({
                    elements: [
                      sensorFlyText1.current,
                      sensorFlyText2.current,
                      sensorFlyText3.current,
                      sensorAnimation.current,
                    ],
                  });
                },
              },
            });

            fadeInText
              .fromTo(
                sensorFlyText1.current,
                { opacity: 0, x: "-100vw" },
                {
                  opacity: 1,
                  x: "0%",
                },
              )
              .fromTo(
                sensorFlyText2.current,
                { opacity: 0, x: "-100vw" },
                {
                  opacity: 1,
                  x: "0%",
                },
              )
              .fromTo(
                sensorFlyText3.current,
                { opacity: 0, x: "-100vw" },
                {
                  opacity: 1,
                  x: "0%",
                },
              )
              .fromTo(
                sensorAnimation.current,
                { opacity: 0, x: "-100vw" },
                {
                  opacity: 1,
                  x: "0%",
                },
              );

            const fadeOutText = gsap.timeline({
              scrollTrigger: {
                trigger: "#fade-out-sensors",
                start: "top center",
                end: "bottom center",
                scrub: true,
                immediateRender: false,
                onEnter: () => {
                  // Position elements dynamically when this section enters viewport
                  positionTextElements({
                    elements: [
                      sensorFlyText1.current,
                      sensorFlyText2.current,
                      sensorFlyText3.current,
                      sensorAnimation.current,
                    ],
                  });
                },
                onRefresh: () => {
                  // Reposition on scroll refresh (e.g., after resize)
                  positionTextElements({
                    elements: [
                      sensorFlyText1.current,
                      sensorFlyText2.current,
                      sensorFlyText3.current,
                      sensorAnimation.current,
                    ],
                  });
                },
              },
            });

            fadeOutText
              .to(sensorFlyText1.current, {
                opacity: 0,
                x: "100%",
              })
              .to(
                sensorFlyText2.current,
                {
                  opacity: 0,
                  x: "100%",
                },
                "-=0.2", // Slight overlap
              )
              .to(
                sensorFlyText3.current,
                {
                  opacity: 0,
                  x: "100%",
                },
                "-=0.2", // Slight overlap
              )
              .to(
                sensorAnimation.current,
                {
                  opacity: 0,
                  x: "100%",
                },
                "-=0.2",
              );
          }
        }
      },
    });
  }, []);

  return (
    <>
      <div style={{ width: "100%", height: height }}>
        <Canvas
          style={{
            position: "fixed",
            left: 0,
            width: "100%",
            height: "100%",
            top: 0,
            zIndex: -1,
          }}
          shadows
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
          }}
        >
          <ambientLight intensity={Math.PI / 2} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.2}
            penumbra={1}
            decay={0}
            intensity={Math.PI}
            castShadow
          />
          <pointLight
            position={[-10, -10, -10]}
            decay={0}
            intensity={Math.PI}
            castShadow
          />
          <Ufo />
        </Canvas>
      </div>
      <div className="z-10">
        {/* Sections to trigger scroll animations */}
        <div id="fly-outside" style={{ height: "75vh" }}></div>
        <div id="pause-generel" style={{ height: "40vh" }}>
          <h2
            ref={titleRef}
            className="opacity-0 fixed bottom-20 2xl:text-6xl font-Orbitron font-bold text-5xl text-white left-1/2 -translate-x-1/2 text-center md:text-left  md:whitespace-nowrap"
          >
            Guardian of the Galaxy
          </h2>
          <p
            ref={generalFlyText}
            className="opacity-0 fixed  top-2/7 xs:top-2/5 md:top-1/2 left-0 translate-x-1/2 font-Electrolize font-semibold text-2xl 2xl:text-4xl text-white w-3/4 "
          >
            Das Guardian of the Galaxy ist ein autonomes Rettungsfahrzeug, das in
            Katastrophengebieten Überlebende scannt, sie aus Trümmern hebt und gezielt
            Hilfspakete mit Nahrung und Medizin abwirft. Effizient, präzise und
            vollautomatisch – entwickelt für schnelle humanitäre Einsätze in zerstörten
            urbanen Zonen.
          </p>
        </div>
        <div id="pause-generel-out" style={{ height: "30vh" }}></div>
        <div id="pause-generel-in" style={{ height: "60vh" }}></div>
        <div id="pause-generel-2" style={{ height: "50vh" }}>
          <p
            ref={generalFlyText2}
            className="opacity-0 fixed  top-2/7 xs:top-2/5 md:top-1/2 left-0 translate-x-1/2 font-Electrolize font-semibold text-2xl 2xl:text-4xl text-white w-3/4"
          >
            Das UFO-Auto fährt selbstständig durch ein verwinkeltes Labyrinth. Es scannt
            kontinuierlich seine Umgebung, um Hindernissen auszuweichen. Trifft es auf ein
            blaues Kärtchen, hebt es dieses auf. Bei einem roten Kärtchen lässt es ein
            gelbes Kärtchen fallen. Präzise, intelligent und reaktionsschnell.
          </p>
        </div>
        <div id="fly-middle" style={{ height: "65vh" }}></div>

        <div id="rotate-to-bottom" style={{ height: "100vh" }}></div>
        <div id="pause-bottom" style={{ height: "50vh" }}>
          <h3
            ref={wheelsTitleRef}
            className="opacity-0 font-Orbitron fixed top-[4rem] left-1/2 -translate-x-1/2 text-white text-2xl xs:text-3xl 2xl:text-4xl font-bold whitespace-nowrap"
          >
            <svg
              width="225"
              height="61"
              viewBox="0 0 225 61"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_d_450_8)">
                <path d="M0 9L196.5 0L216.5 52.5L0 42V9Z" fill="#23CF51" />
              </g>
              <path
                d="M18.856 38V14.96H37.256C38.1093 14.96 38.8773 15.1733 39.56 15.6C40.264 16.0053 40.8293 16.56 41.256 17.264C41.6827 17.9467 41.896 18.7147 41.896 19.568V33.392C41.896 34.2453 41.6827 35.024 41.256 35.728C40.8293 36.4107 40.264 36.9653 39.56 37.392C38.8773 37.7973 38.1093 38 37.256 38H18.856ZM23.624 33.36H37.032C37.096 33.36 37.1387 33.3493 37.16 33.328C37.2027 33.2853 37.224 33.232 37.224 33.168V19.792C37.224 19.728 37.2027 19.6853 37.16 19.664C37.1387 19.6213 37.096 19.6 37.032 19.6H23.624C23.5813 19.6 23.5387 19.6213 23.496 19.664C23.4533 19.6853 23.432 19.728 23.432 19.792V33.168C23.432 33.232 23.4533 33.2853 23.496 33.328C23.5387 33.3493 23.5813 33.36 23.624 33.36ZM45.0703 38V19.44H49.6143V38H45.0703ZM45.0703 17.936V13.36H49.6143V17.936H45.0703ZM57.0503 38C56.2396 38 55.4929 37.7973 54.8103 37.392C54.1276 36.9653 53.5729 36.4107 53.1463 35.728C52.7409 35.0453 52.5383 34.2987 52.5383 33.488V23.952C52.5383 23.1413 52.7409 22.3947 53.1463 21.712C53.5729 21.0293 54.1276 20.4853 54.8103 20.08C55.4929 19.6533 56.2396 19.44 57.0503 19.44H66.8423C67.6743 19.44 68.4316 19.6533 69.1143 20.08C69.7969 20.4853 70.3409 21.0293 70.7463 21.712C71.1516 22.3947 71.3543 23.1413 71.3543 23.952V31.024H57.0823V33.264C57.0823 33.3067 57.1036 33.3493 57.1463 33.392C57.1889 33.4347 57.2316 33.456 57.2743 33.456H71.3543V38H57.0503ZM57.0823 26.96H66.8103V24.176C66.8103 24.1333 66.7889 24.0907 66.7463 24.048C66.7036 24.0053 66.6609 23.984 66.6183 23.984H57.2743C57.2316 23.984 57.1889 24.0053 57.1463 24.048C57.1036 24.0907 57.0823 24.1333 57.0823 24.176V26.96ZM103.06 38L96.2443 29.872H102.292L107.924 36.56V38H103.06ZM84.9483 38V14.992H103.348C104.202 14.992 104.97 15.2053 105.652 15.632C106.356 16.0373 106.922 16.592 107.348 17.296C107.775 18 107.988 18.768 107.988 19.6V25.68C107.988 26.512 107.775 27.28 107.348 27.984C106.922 28.6667 106.356 29.2213 105.652 29.648C104.97 30.0533 104.202 30.256 103.348 30.256L89.5563 30.288V38H84.9483ZM89.7483 25.616H103.124C103.188 25.616 103.231 25.6053 103.252 25.584C103.295 25.5413 103.316 25.4987 103.316 25.456V19.792C103.316 19.728 103.295 19.6853 103.252 19.664C103.231 19.6213 103.188 19.6 103.124 19.6H89.7483C89.6843 19.6 89.6309 19.6213 89.5883 19.664C89.5669 19.6853 89.5563 19.728 89.5563 19.792V25.456C89.5563 25.4987 89.5669 25.5413 89.5883 25.584C89.6309 25.6053 89.6843 25.616 89.7483 25.616ZM115.707 38C114.896 38 114.149 37.7973 113.467 37.392C112.784 36.9653 112.229 36.4107 111.803 35.728C111.397 35.0453 111.195 34.2987 111.195 33.488V23.952C111.195 23.1413 111.397 22.3947 111.803 21.712C112.229 21.0293 112.784 20.4853 113.467 20.08C114.149 19.6533 114.896 19.44 115.707 19.44H125.499C126.331 19.44 127.088 19.6533 127.771 20.08C128.453 20.4853 128.997 21.0293 129.403 21.712C129.808 22.3947 130.011 23.1413 130.011 23.952V31.024H115.739V33.264C115.739 33.3067 115.76 33.3493 115.803 33.392C115.845 33.4347 115.888 33.456 115.931 33.456H130.011V38H115.707ZM115.739 26.96H125.467V24.176C125.467 24.1333 125.445 24.0907 125.403 24.048C125.36 24.0053 125.317 23.984 125.275 23.984H115.931C115.888 23.984 115.845 24.0053 115.803 24.048C115.76 24.0907 115.739 24.1333 115.739 24.176V26.96ZM133.383 38V19.44H137.927V38H133.383ZM133.383 17.936V13.36H137.927V17.936H133.383ZM140.946 38V17.872C140.946 17.0613 141.149 16.3147 141.554 15.632C141.981 14.9493 142.535 14.4053 143.218 14C143.901 13.5733 144.658 13.36 145.49 13.36H152.562V17.936H145.682C145.639 17.936 145.597 17.9573 145.554 18C145.511 18.0427 145.49 18.0853 145.49 18.128V19.44H152.562V23.984H145.49V38H140.946ZM159.3 38C158.49 38 157.743 37.7973 157.06 37.392C156.378 36.9653 155.823 36.4107 155.396 35.728C154.991 35.0453 154.788 34.2987 154.788 33.488V23.952C154.788 23.1413 154.991 22.3947 155.396 21.712C155.823 21.0293 156.378 20.4853 157.06 20.08C157.743 19.6533 158.49 19.44 159.3 19.44H169.092C169.924 19.44 170.682 19.6533 171.364 20.08C172.047 20.4853 172.591 21.0293 172.996 21.712C173.402 22.3947 173.604 23.1413 173.604 23.952V31.024H159.332V33.264C159.332 33.3067 159.354 33.3493 159.396 33.392C159.439 33.4347 159.482 33.456 159.524 33.456H173.604V38H159.3ZM159.332 26.96H169.06V24.176C169.06 24.1333 169.039 24.0907 168.996 24.048C168.954 24.0053 168.911 23.984 168.868 23.984H159.524C159.482 23.984 159.439 24.0053 159.396 24.048C159.354 24.0907 159.332 24.1333 159.332 24.176V26.96ZM177.041 38V19.44H191.345C192.177 19.44 192.934 19.6533 193.617 20.08C194.299 20.4853 194.843 21.0293 195.249 21.712C195.654 22.3947 195.857 23.1413 195.857 23.952V38H191.312V24.176C191.312 24.1333 191.291 24.0907 191.249 24.048C191.227 24.0053 191.185 23.984 191.121 23.984H181.777C181.734 23.984 181.691 24.0053 181.649 24.048C181.606 24.0907 181.585 24.1333 181.585 24.176V38H177.041Z"
                fill="white"
              />
              <defs>
                <filter
                  id="filter0_d_450_8"
                  x="0"
                  y="0"
                  width="224.5"
                  height="60.5"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dx="4" dy="4" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_450_8"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_450_8"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </h3>
          <div className="w-full ">
            <p
              ref={wheelsFlyText1}
              className="opacity-0 font-Electrolize md:top-3/4 md:fixed md:left-0 md:translate-x-1/2 xs:pl-4 xs:pr-3 md:pl-0 md:pr-0 font-semibold text-lg xs:text-xl 2xl:text-4xl md:text-[1.375rem] lg:text-2xl text-white md:max-w-[33vw] mx-auto md:mx-0 whitespace-normal"
            >
              Die Reifen gewährleisten den sicheren Bodenkontakt und sorgen für optimale
              Traktion auf verschiedenen Untergründen
            </p>
            <p
              ref={wheelsFlyText2}
              className="opacity-0 font-Electrolize md:top-3/4 md:fixed  md:left-0 md:translate-x-1/2 xs:pl-4 xs:pr-3 md:pl-0 md:pr-0 font-semibold text-lg xs:text-xl 2xl:text-4xl md:text-[1.375rem] lg:text-2xl text-white md:max-w-[33vw] mx-auto md:mx-0 whitespace-normal"
            >
              Durch ihr Profil und Material ermöglichen sie eine präzise Steuerung und
              beeinflussen Stabilität sowie Geschwindigkeit des Fahrzeugs
            </p>
            <p
              ref={wheelsFlyText3}
              className="opacity-0 z-[-1] md:z-0 font-Electrolize md:top-1/4 md:fixed md:left-0 md:translate-x-1/2 xs:pl-4 xs:pr-3 md:pl-0 md:pr-0 font-semibold text-lg 2xl:text-4xl xs:text-xl md:text-[1.375rem] lg:text-2xl text-white md:max-w-[33vw] mx-auto md:mx-0 whitespace-normal"
            >
              Die Ballcaster ergänzen die Reifen, sorgen für Balance und Stabilität und
              ermöglichen gleitende Übergänge
            </p>
            <div
              ref={wheelsAnimation}
              className="opacity-0 fixed md:top-[2.5%]  md:w-[35vw] md:h-[45vh] lg:w-[40vw] lg:h-[45vh] z-[-1] md:z-0"
            >
              <Canvas
                camera={{ position: [0, 1, 2], fov: 45 }}
                className="pt-2 w-full h-[40vh] md:h-[60vh] lg:h-[60vh]"
              >
                <ambientLight intensity={0.5} />
                <directionalLight position={[2, 2, 2]} />
                <Suspense fallback={null}>
                  <WheelsAnimation />
                </Suspense>
              </Canvas>
            </div>
          </div>
        </div>
        <div id="rotate-to-normal" style={{ height: "65vh" }}></div>

        <div id="fade-in-dropper" style={{ height: "40vh" }}></div>
        <div id="pause-dropper" style={{ height: "50vh" }}>
          <h3
            ref={dropperTitleRef}
            className="opacity-0 font-Orbitron fixed top-[4rem] left-1/2 -translate-x-1/2 text-white text-3xl font-bold whitespace-nowrap"
          >
            <svg
              width="257"
              height="61"
              viewBox="0 0 257 61"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_d_450_16)">
                <path d="M0 6L237 0L248.5 43L20 53L0 6Z" fill="#23CF51" />
              </g>
              <path
                d="M18.856 37V13.96H37.256C38.1093 13.96 38.8773 14.1733 39.56 14.6C40.264 15.0053 40.8293 15.56 41.256 16.264C41.6827 16.9467 41.896 17.7147 41.896 18.568V32.392C41.896 33.2453 41.6827 34.024 41.256 34.728C40.8293 35.4107 40.264 35.9653 39.56 36.392C38.8773 36.7973 38.1093 37 37.256 37H18.856ZM23.624 32.36H37.032C37.096 32.36 37.1387 32.3493 37.16 32.328C37.2027 32.2853 37.224 32.232 37.224 32.168V18.792C37.224 18.728 37.2027 18.6853 37.16 18.664C37.1387 18.6213 37.096 18.6 37.032 18.6H23.624C23.5813 18.6 23.5387 18.6213 23.496 18.664C23.4533 18.6853 23.432 18.728 23.432 18.792V32.168C23.432 32.232 23.4533 32.2853 23.496 32.328C23.5387 32.3493 23.5813 32.36 23.624 32.36ZM49.8315 37C49.0208 37 48.2742 36.7973 47.5915 36.392C46.9088 35.9653 46.3542 35.4107 45.9275 34.728C45.5222 34.0453 45.3195 33.2987 45.3195 32.488V22.952C45.3195 22.1413 45.5222 21.3947 45.9275 20.712C46.3542 20.0293 46.9088 19.4853 47.5915 19.08C48.2742 18.6533 49.0208 18.44 49.8315 18.44H59.6235C60.4555 18.44 61.2128 18.6533 61.8955 19.08C62.5782 19.4853 63.1222 20.0293 63.5275 20.712C63.9328 21.3947 64.1355 22.1413 64.1355 22.952V30.024H49.8635V32.264C49.8635 32.3067 49.8848 32.3493 49.9275 32.392C49.9702 32.4347 50.0128 32.456 50.0555 32.456H64.1355V37H49.8315ZM49.8635 25.96H59.5915V23.176C59.5915 23.1333 59.5702 23.0907 59.5275 23.048C59.4848 23.0053 59.4422 22.984 59.3995 22.984H50.0555C50.0128 22.984 49.9702 23.0053 49.9275 23.048C49.8848 23.0907 49.8635 23.1333 49.8635 23.176V25.96ZM67.289 37V22.952C67.289 22.1413 67.4917 21.3947 67.897 20.712C68.3237 20.0293 68.8783 19.4853 69.561 19.08C70.265 18.6533 71.0223 18.44 71.833 18.44H82.105V22.984H72.025C71.9823 22.984 71.9397 23.0053 71.897 23.048C71.8543 23.0907 71.833 23.1333 71.833 23.176V37H67.289ZM94.356 37V13.96H112.756C113.609 13.96 114.377 14.1733 115.06 14.6C115.764 15.0053 116.329 15.56 116.756 16.264C117.183 16.9467 117.396 17.7147 117.396 18.568V32.392C117.396 33.2453 117.183 34.024 116.756 34.728C116.329 35.4107 115.764 35.9653 115.06 36.392C114.377 36.7973 113.609 37 112.756 37H94.356ZM99.124 32.36H112.532C112.596 32.36 112.639 32.3493 112.66 32.328C112.703 32.2853 112.724 32.232 112.724 32.168V18.792C112.724 18.728 112.703 18.6853 112.66 18.664C112.639 18.6213 112.596 18.6 112.532 18.6H99.124C99.0813 18.6 99.0387 18.6213 98.996 18.664C98.9533 18.6853 98.932 18.728 98.932 18.792V32.168C98.932 32.232 98.9533 32.2853 98.996 32.328C99.0387 32.3493 99.0813 32.36 99.124 32.36ZM120.852 37V22.952C120.852 22.1413 121.054 21.3947 121.46 20.712C121.886 20.0293 122.441 19.4853 123.124 19.08C123.828 18.6533 124.585 18.44 125.396 18.44H135.668V22.984H125.588C125.545 22.984 125.502 23.0053 125.46 23.048C125.417 23.0907 125.396 23.1333 125.396 23.176V37H120.852ZM142.238 37C141.427 37 140.68 36.7973 139.998 36.392C139.315 35.9653 138.76 35.4107 138.334 34.728C137.928 34.0453 137.726 33.2987 137.726 32.488V22.952C137.726 22.1413 137.928 21.3947 138.334 20.712C138.76 20.0293 139.315 19.4853 139.998 19.08C140.68 18.6533 141.427 18.44 142.238 18.44H152.03C152.862 18.44 153.619 18.6533 154.302 19.08C154.984 19.4853 155.528 20.0293 155.934 20.712C156.339 21.3947 156.542 22.1413 156.542 22.952V32.488C156.542 33.2987 156.339 34.0453 155.934 34.728C155.528 35.4107 154.984 35.9653 154.302 36.392C153.619 36.7973 152.862 37 152.03 37H142.238ZM142.462 32.456H151.806C151.848 32.456 151.891 32.4347 151.934 32.392C151.976 32.3493 151.998 32.3067 151.998 32.264V23.176C151.998 23.1333 151.976 23.0907 151.934 23.048C151.891 23.0053 151.848 22.984 151.806 22.984H142.462C142.419 22.984 142.376 23.0053 142.334 23.048C142.291 23.0907 142.27 23.1333 142.27 23.176V32.264C142.27 32.3067 142.291 32.3493 142.334 32.392C142.376 32.4347 142.419 32.456 142.462 32.456ZM159.978 44.36V18.44H174.282C175.114 18.44 175.871 18.6533 176.554 19.08C177.237 19.4853 177.781 20.0293 178.186 20.712C178.591 21.3947 178.794 22.1413 178.794 22.952V32.488C178.794 33.2987 178.591 34.0453 178.186 34.728C177.781 35.4107 177.237 35.9653 176.554 36.392C175.871 36.7973 175.114 37 174.282 37H164.522V44.36H159.978ZM164.714 32.456H174.058C174.122 32.456 174.165 32.4347 174.186 32.392C174.229 32.3493 174.25 32.3067 174.25 32.264V23.176C174.25 23.1333 174.229 23.0907 174.186 23.048C174.165 23.0053 174.122 22.984 174.058 22.984H164.714C164.671 22.984 164.629 23.0053 164.586 23.048C164.543 23.0907 164.522 23.1333 164.522 23.176V32.264C164.522 32.3067 164.543 32.3493 164.586 32.392C164.629 32.4347 164.671 32.456 164.714 32.456ZM181.228 44.36V18.44H195.532C196.364 18.44 197.121 18.6533 197.804 19.08C198.487 19.4853 199.031 20.0293 199.436 20.712C199.841 21.3947 200.044 22.1413 200.044 22.952V32.488C200.044 33.2987 199.841 34.0453 199.436 34.728C199.031 35.4107 198.487 35.9653 197.804 36.392C197.121 36.7973 196.364 37 195.532 37H185.772V44.36H181.228ZM185.964 32.456H195.308C195.372 32.456 195.415 32.4347 195.436 32.392C195.479 32.3493 195.5 32.3067 195.5 32.264V23.176C195.5 23.1333 195.479 23.0907 195.436 23.048C195.415 23.0053 195.372 22.984 195.308 22.984H185.964C185.921 22.984 185.879 23.0053 185.836 23.048C185.793 23.0907 185.772 23.1333 185.772 23.176V32.264C185.772 32.3067 185.793 32.3493 185.836 32.392C185.879 32.4347 185.921 32.456 185.964 32.456ZM206.894 37C206.083 37 205.337 36.7973 204.654 36.392C203.971 35.9653 203.417 35.4107 202.99 34.728C202.585 34.0453 202.382 33.2987 202.382 32.488V22.952C202.382 22.1413 202.585 21.3947 202.99 20.712C203.417 20.0293 203.971 19.4853 204.654 19.08C205.337 18.6533 206.083 18.44 206.894 18.44H216.686C217.518 18.44 218.275 18.6533 218.958 19.08C219.641 19.4853 220.185 20.0293 220.59 20.712C220.995 21.3947 221.198 22.1413 221.198 22.952V30.024H206.926V32.264C206.926 32.3067 206.947 32.3493 206.99 32.392C207.033 32.4347 207.075 32.456 207.118 32.456H221.198V37H206.894ZM206.926 25.96H216.654V23.176C216.654 23.1333 216.633 23.0907 216.59 23.048C216.547 23.0053 216.505 22.984 216.462 22.984H207.118C207.075 22.984 207.033 23.0053 206.99 23.048C206.947 23.0907 206.926 23.1333 206.926 23.176V25.96ZM224.352 37V22.952C224.352 22.1413 224.554 21.3947 224.96 20.712C225.386 20.0293 225.941 19.4853 226.624 19.08C227.328 18.6533 228.085 18.44 228.896 18.44H239.168V22.984H229.088C229.045 22.984 229.002 23.0053 228.96 23.048C228.917 23.0907 228.896 23.1333 228.896 23.176V37H224.352Z"
                fill="white"
              />
              <defs>
                <filter
                  id="filter0_d_450_16"
                  x="0"
                  y="0"
                  width="256.5"
                  height="61"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dx="4" dy="4" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_450_16"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_450_16"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </h3>
          <div className="w-full ">
            <p
              ref={dropperFlyText1}
              className="opacity-0 font-Electrolize md:top-3/4 md:fixed  md:left-0 md:translate-x-1/2 xs:pl-4 xs:pr-3 md:pl-0 md:pr-0 font-semibold text-lg 2xl:text-4xl xs:text-xl md:text-[1.375rem] lg:text-2xl text-white md:max-w-[33vw] mx-auto md:mx-0 whitespace-normal"
            >
              Der Dropper sorgt dafür, dass die magnetischen Kärtchen gezielt von der
              Plattform des Autos abgeworfen werden
            </p>
            <p
              ref={dropperFlyText2}
              className="opacity-0 font-Electrolize md:top-3/4 md:fixed  md:left-0 md:translate-x-1/2 xs:pl-4 xs:pr-3 md:pl-0 md:pr-0 font-semibold text-lg 2xl:text-4xl xs:text-xl md:text-[1.375rem] lg:text-2xl text-white md:max-w-[33vw] mx-auto md:mx-0 whitespace-normal"
            >
              Durch eine präzise gesteuerte Bewegung wird das Kärtchen aus der Halterung
              geschoben und fällt auf den Boden
            </p>
            <p
              ref={dropperFlyText3}
              className="opacity-0 z-[-1] md:z-0 font-Electrolize md:top-1/4 md:fixed md:left-0 md:translate-x-1/2 xs:pl-4 xs:pr-3 md:pl-0 md:pr-0 font-semibold 2xl:text-4xl text-lg xs:text-xl md:text-[1.375rem] lg:text-2xl text-white md:max-w-[33vw] mx-auto md:mx-0 whitespace-normal"
            >
              Die Konstruktion ermöglicht eine zuverlässige und kontrollierte Abgabe,
              sodass die Ablage exakt an der gewünschten Position erfolgt
            </p>

            <div
              ref={dropperAnimation}
              className="opacity-0 fixed md:top-[2.5%]  md:w-[35vw] md:h-[45vh] lg:w-[40vw] lg:h-[45vh] z-[-1] md:z-0"
            >
              <Canvas
                camera={{ position: [0, 1, 2], fov: 45 }}
                className="pt-2 w-full h-[40vh] md:h-[60vh] lg:h-[60vh]"
              >
                <ambientLight intensity={0.5} />
                <directionalLight position={[2, 2, 2]} />
                <Suspense fallback={null}>
                  <DropperAnimation />
                </Suspense>
              </Canvas>
            </div>
          </div>
        </div>
        <div id="fade-out-dropper" style={{ height: "40vh" }}></div>

        <div id="fade-in-crane" style={{ height: "40vh" }}></div>
        <div id="pause-crane" style={{ height: "50vh" }}>
          <h3
            ref={craneTitleRef}
            className="opacity-0 font-Orbitron fixed top-[4rem] left-1/2 -translate-x-1/2 text-white text-3xl font-bold whitespace-nowrap"
          >
            <svg
              width="225"
              height="62"
              viewBox="0 0 225 62"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_d_450_24)">
                <path d="M0 7.5L168 0L216.5 38L26.5 53.5L0 7.5Z" fill="#23CF51" />
              </g>
              <path
                d="M27.856 38V14.96H46.256C47.1093 14.96 47.8773 15.1733 48.56 15.6C49.264 16.0053 49.8293 16.56 50.256 17.264C50.6827 17.9467 50.896 18.7147 50.896 19.568V33.392C50.896 34.2453 50.6827 35.024 50.256 35.728C49.8293 36.4107 49.264 36.9653 48.56 37.392C47.8773 37.7973 47.1093 38 46.256 38H27.856ZM32.624 33.36H46.032C46.096 33.36 46.1387 33.3493 46.16 33.328C46.2027 33.2853 46.224 33.232 46.224 33.168V19.792C46.224 19.728 46.2027 19.6853 46.16 19.664C46.1387 19.6213 46.096 19.6 46.032 19.6H32.624C32.5813 19.6 32.5387 19.6213 32.496 19.664C32.4533 19.6853 32.432 19.728 32.432 19.792V33.168C32.432 33.232 32.4533 33.2853 32.496 33.328C32.5387 33.3493 32.5813 33.36 32.624 33.36ZM58.8315 38C58.0208 38 57.2742 37.7973 56.5915 37.392C55.9088 36.9653 55.3542 36.4107 54.9275 35.728C54.5222 35.0453 54.3195 34.2987 54.3195 33.488V23.952C54.3195 23.1413 54.5222 22.3947 54.9275 21.712C55.3542 21.0293 55.9088 20.4853 56.5915 20.08C57.2742 19.6533 58.0208 19.44 58.8315 19.44H68.6235C69.4555 19.44 70.2128 19.6533 70.8955 20.08C71.5782 20.4853 72.1222 21.0293 72.5275 21.712C72.9328 22.3947 73.1355 23.1413 73.1355 23.952V31.024H58.8635V33.264C58.8635 33.3067 58.8848 33.3493 58.9275 33.392C58.9702 33.4347 59.0128 33.456 59.0555 33.456H73.1355V38H58.8315ZM58.8635 26.96H68.5915V24.176C68.5915 24.1333 68.5702 24.0907 68.5275 24.048C68.4848 24.0053 68.4422 23.984 68.3995 23.984H59.0555C59.0128 23.984 58.9702 24.0053 58.9275 24.048C58.8848 24.0907 58.8635 24.1333 58.8635 24.176V26.96ZM76.289 38V23.952C76.289 23.1413 76.4917 22.3947 76.897 21.712C77.3237 21.0293 77.8783 20.4853 78.561 20.08C79.265 19.6533 80.0223 19.44 80.833 19.44H91.105V23.984H81.025C80.9823 23.984 80.9397 24.0053 80.897 24.048C80.8543 24.0907 80.833 24.1333 80.833 24.176V38H76.289ZM103.324 38V14.96H107.964V24.144H112.924L120.604 14.96H125.532V16.432L117.084 26.48L125.532 36.528V38H120.604L112.924 28.816H107.964V38H103.324ZM128.664 38V23.952C128.664 23.1413 128.867 22.3947 129.272 21.712C129.699 21.0293 130.253 20.4853 130.936 20.08C131.64 19.6533 132.397 19.44 133.208 19.44H143.48V23.984H133.4C133.357 23.984 133.315 24.0053 133.272 24.048C133.229 24.0907 133.208 24.1333 133.208 24.176V38H128.664ZM150.489 38C149.678 38 148.921 37.7973 148.217 37.392C147.534 36.9653 146.99 36.4107 146.585 35.728C146.179 35.0453 145.977 34.2987 145.977 33.488V26.416H160.249V24.176C160.249 24.1333 160.227 24.0907 160.185 24.048C160.142 24.0053 160.099 23.984 160.057 23.984H145.977V19.44H160.281C161.113 19.44 161.87 19.6533 162.553 20.08C163.235 20.4853 163.779 21.0293 164.185 21.712C164.59 22.3947 164.793 23.1413 164.793 23.952V38H150.489ZM150.713 33.456H160.249V30.48H150.521V33.264C150.521 33.3067 150.542 33.3493 150.585 33.392C150.627 33.4347 150.67 33.456 150.713 33.456ZM167.947 38V19.44H182.251C183.083 19.44 183.84 19.6533 184.523 20.08C185.205 20.4853 185.749 21.0293 186.155 21.712C186.56 22.3947 186.763 23.1413 186.763 23.952V38H182.219V24.176C182.219 24.1333 182.197 24.0907 182.155 24.048C182.133 24.0053 182.091 23.984 182.027 23.984H172.683C172.64 23.984 172.597 24.0053 172.555 24.048C172.512 24.0907 172.491 24.1333 172.491 24.176V38H167.947Z"
                fill="white"
              />
              <defs>
                <filter
                  id="filter0_d_450_24"
                  x="0"
                  y="0"
                  width="224.5"
                  height="61.5"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dx="4" dy="4" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_450_24"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_450_24"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </h3>
          <div className="w-full ">
            <p
              ref={craneFlyText1}
              className="opacity-0 font-Electrolize md:top-3/4 md:fixed md:left-0 md:translate-x-1/2 font-semibold text-xl md:text-2xl 2xl:text-4xl text-white md:max-w-[33vw] mx-auto md:mx-0 whitespace-normal"
            >
              Die präzise Steuerung sorgt dafür, dass der Hebevorgang effizient und
              fehlerfrei abläuft
            </p>
            <p
              ref={craneFlyText2}
              className="opacity-0 font-Electrolize md:top-3/4 md:fixed  md:left-0 md:translate-x-1/2 font-semibold text-xl md:text-2xl 2xl:text-4xl text-white md:max-w-[33vw] mx-auto md:mx-0 whitespace-normal"
            >
              Durch eine geschickte Bewegung wird das Kärtchen aufgenommen und an die
              gewünschte Position transportiert
            </p>
            <p
              ref={craneFlyText3}
              className="opacity-0 z-[-1] md:z-0 font-Electrolize md:top-1/5 md:fixed md:left-0 md:translate-x-1/2 font-semibold text-xl md:text-2xl 2xl:text-4xl text-white md:max-w-[33vw] mx-auto md:mx-0 whitespace-normal"
            >
              Der Kran nutzt einen Magneten, um das Kärtchen anzuheben und sicher auf die
              Plattform des Autos zu legen
            </p>
            <div
              ref={craneAnimation}
              className="opacity-0 fixed md:top-[2.5%]  md:w-[35vw] md:h-[45vh] lg:w-[40vw] lg:h-[45vh] z-[-1] md:z-0"
            >
              <Canvas
                camera={{ position: [0, 1, 2], fov: 45 }}
                className="pt-2 w-full h-[35vh] md:h-[60vh] lg:h-[60vh]"
              >
                <ambientLight intensity={1} />
                <directionalLight position={[2, 2, 2]} />
                <Suspense fallback={null}>
                  <CraneAnimation />
                </Suspense>
              </Canvas>
            </div>
          </div>
        </div>
        <div id="fade-out-crane" style={{ height: "40vh" }}></div>

        <div id="fade-in-raspberry" style={{ height: "40vh" }}></div>
        <div id="pause-raspberry" style={{ height: "50vh" }}>
          <h3
            ref={raspberryTitleRef}
            className="opacity-0 font-Orbitron fixed top-[4rem] left-1/2 -translate-x-1/2 text-white text-3xl font-bold whitespace-nowrap"
          >
            <svg
              width="295"
              height="66"
              viewBox="0 0 295 66"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_d_450_32)">
                <path d="M10 0L287 10L270.5 58L0 49L10 0Z" fill="#23CF51" />
              </g>
              <path
                d="M12.856 40V16.96H31.256C32.1093 16.96 32.8773 17.1733 33.56 17.6C34.264 18.0053 34.8293 18.56 35.256 19.264C35.6827 19.9467 35.896 20.7147 35.896 21.568V35.392C35.896 36.2453 35.6827 37.024 35.256 37.728C34.8293 38.4107 34.264 38.9653 33.56 39.392C32.8773 39.7973 32.1093 40 31.256 40H12.856ZM17.624 35.36H31.032C31.096 35.36 31.1387 35.3493 31.16 35.328C31.2027 35.2853 31.224 35.232 31.224 35.168V21.792C31.224 21.728 31.2027 21.6853 31.16 21.664C31.1387 21.6213 31.096 21.6 31.032 21.6H17.624C17.5813 21.6 17.5387 21.6213 17.496 21.664C17.4533 21.6853 17.432 21.728 17.432 21.792V35.168C17.432 35.232 17.4533 35.2853 17.496 35.328C17.5387 35.3493 17.5813 35.36 17.624 35.36ZM43.8315 40C43.0208 40 42.2742 39.7973 41.5915 39.392C40.9088 38.9653 40.3542 38.4107 39.9275 37.728C39.5222 37.0453 39.3195 36.2987 39.3195 35.488V25.952C39.3195 25.1413 39.5222 24.3947 39.9275 23.712C40.3542 23.0293 40.9088 22.4853 41.5915 22.08C42.2742 21.6533 43.0208 21.44 43.8315 21.44H53.6235C54.4555 21.44 55.2128 21.6533 55.8955 22.08C56.5782 22.4853 57.1222 23.0293 57.5275 23.712C57.9328 24.3947 58.1355 25.1413 58.1355 25.952V33.024H43.8635V35.264C43.8635 35.3067 43.8848 35.3493 43.9275 35.392C43.9702 35.4347 44.0128 35.456 44.0555 35.456H58.1355V40H43.8315ZM43.8635 28.96H53.5915V26.176C53.5915 26.1333 53.5702 26.0907 53.5275 26.048C53.4848 26.0053 53.4422 25.984 53.3995 25.984H44.0555C44.0128 25.984 43.9702 26.0053 43.9275 26.048C43.8848 26.0907 43.8635 26.1333 43.8635 26.176V28.96ZM61.289 40V25.952C61.289 25.1413 61.4917 24.3947 61.897 23.712C62.3237 23.0293 62.8783 22.4853 63.561 22.08C64.265 21.6533 65.0223 21.44 65.833 21.44H76.105V25.984H66.025C65.9823 25.984 65.9397 26.0053 65.897 26.048C65.8543 26.0907 65.833 26.1333 65.833 26.176V40H61.289ZM106.404 40L99.588 31.872H105.636L111.268 38.56V40H106.404ZM88.292 40V16.992H106.692C107.545 16.992 108.313 17.2053 108.996 17.632C109.7 18.0373 110.265 18.592 110.692 19.296C111.119 20 111.332 20.768 111.332 21.6V27.68C111.332 28.512 111.119 29.28 110.692 29.984C110.265 30.6667 109.7 31.2213 108.996 31.648C108.313 32.0533 107.545 32.256 106.692 32.256L92.9 32.288V40H88.292ZM93.092 27.616H106.468C106.532 27.616 106.575 27.6053 106.596 27.584C106.639 27.5413 106.66 27.4987 106.66 27.456V21.792C106.66 21.728 106.639 21.6853 106.596 21.664C106.575 21.6213 106.532 21.6 106.468 21.6H93.092C93.028 21.6 92.9747 21.6213 92.932 21.664C92.9107 21.6853 92.9 21.728 92.9 21.792V27.456C92.9 27.4987 92.9107 27.5413 92.932 27.584C92.9747 27.6053 93.028 27.616 93.092 27.616ZM119.082 40C118.272 40 117.514 39.7973 116.81 39.392C116.128 38.9653 115.584 38.4107 115.178 37.728C114.773 37.0453 114.57 36.2987 114.57 35.488V28.416H128.842V26.176C128.842 26.1333 128.821 26.0907 128.778 26.048C128.736 26.0053 128.693 25.984 128.65 25.984H114.57V21.44H128.874C129.706 21.44 130.464 21.6533 131.146 22.08C131.829 22.4853 132.373 23.0293 132.778 23.712C133.184 24.3947 133.386 25.1413 133.386 25.952V40H119.082ZM119.306 35.456H128.842V32.48H119.114V35.264C119.114 35.3067 119.136 35.3493 119.178 35.392C119.221 35.4347 119.264 35.456 119.306 35.456ZM140.454 40C139.644 40 138.897 39.7973 138.214 39.392C137.532 38.9653 136.977 38.4107 136.55 37.728C136.145 37.0453 135.942 36.2987 135.942 35.488V34.656H140.486V35.264C140.486 35.3067 140.508 35.3493 140.55 35.392C140.593 35.4347 140.636 35.456 140.678 35.456H150.022C150.065 35.456 150.108 35.4347 150.15 35.392C150.193 35.3493 150.214 35.3067 150.214 35.264V33.184C150.214 33.1413 150.193 33.1093 150.15 33.088C150.108 33.0453 150.065 33.024 150.022 33.024H140.454C139.644 33.024 138.897 32.8213 138.214 32.416C137.532 31.9893 136.977 31.4347 136.55 30.752C136.145 30.0693 135.942 29.312 135.942 28.48V25.952C135.942 25.1413 136.145 24.3947 136.55 23.712C136.977 23.0293 137.532 22.4853 138.214 22.08C138.897 21.6533 139.644 21.44 140.454 21.44H150.246C151.078 21.44 151.836 21.6533 152.518 22.08C153.201 22.4853 153.745 23.0293 154.15 23.712C154.577 24.3947 154.79 25.1413 154.79 25.952V26.784H150.214V26.176C150.214 26.1333 150.193 26.0907 150.15 26.048C150.108 26.0053 150.065 25.984 150.022 25.984H140.678C140.636 25.984 140.593 26.0053 140.55 26.048C140.508 26.0907 140.486 26.1333 140.486 26.176V28.256C140.486 28.2987 140.508 28.3413 140.55 28.384C140.593 28.4053 140.636 28.416 140.678 28.416H150.246C151.078 28.416 151.836 28.6293 152.518 29.056C153.201 29.4613 153.745 30.0053 154.15 30.688C154.577 31.3707 154.79 32.128 154.79 32.96V35.488C154.79 36.2987 154.577 37.0453 154.15 37.728C153.745 38.4107 153.201 38.9653 152.518 39.392C151.836 39.7973 151.078 40 150.246 40H140.454ZM158.072 47.36V21.44H172.376C173.208 21.44 173.965 21.6533 174.648 22.08C175.33 22.4853 175.874 23.0293 176.28 23.712C176.685 24.3947 176.888 25.1413 176.888 25.952V35.488C176.888 36.2987 176.685 37.0453 176.28 37.728C175.874 38.4107 175.33 38.9653 174.648 39.392C173.965 39.7973 173.208 40 172.376 40H162.616V47.36H158.072ZM162.808 35.456H172.152C172.216 35.456 172.258 35.4347 172.28 35.392C172.322 35.3493 172.344 35.3067 172.344 35.264V26.176C172.344 26.1333 172.322 26.0907 172.28 26.048C172.258 26.0053 172.216 25.984 172.152 25.984H162.808C162.765 25.984 162.722 26.0053 162.68 26.048C162.637 26.0907 162.616 26.1333 162.616 26.176V35.264C162.616 35.3067 162.637 35.3493 162.68 35.392C162.722 35.4347 162.765 35.456 162.808 35.456ZM179.322 40V15.36H183.866V21.44H193.626C194.458 21.44 195.215 21.6533 195.898 22.08C196.58 22.4853 197.124 23.0293 197.53 23.712C197.935 24.3947 198.138 25.1413 198.138 25.952V35.488C198.138 36.2987 197.935 37.0453 197.53 37.728C197.124 38.4107 196.58 38.9653 195.898 39.392C195.215 39.7973 194.458 40 193.626 40H179.322ZM184.058 35.456H193.402C193.466 35.456 193.508 35.4347 193.53 35.392C193.572 35.3493 193.594 35.3067 193.594 35.264V26.176C193.594 26.1333 193.572 26.0907 193.53 26.048C193.508 26.0053 193.466 25.984 193.402 25.984H184.058C184.015 25.984 183.972 26.0053 183.93 26.048C183.887 26.0907 183.866 26.1333 183.866 26.176V35.264C183.866 35.3067 183.887 35.3493 183.93 35.392C183.972 35.4347 184.015 35.456 184.058 35.456ZM205.082 40C204.271 40 203.524 39.7973 202.842 39.392C202.159 38.9653 201.604 38.4107 201.178 37.728C200.772 37.0453 200.57 36.2987 200.57 35.488V25.952C200.57 25.1413 200.772 24.3947 201.178 23.712C201.604 23.0293 202.159 22.4853 202.842 22.08C203.524 21.6533 204.271 21.44 205.082 21.44H214.874C215.706 21.44 216.463 21.6533 217.146 22.08C217.828 22.4853 218.372 23.0293 218.778 23.712C219.183 24.3947 219.386 25.1413 219.386 25.952V33.024H205.114V35.264C205.114 35.3067 205.135 35.3493 205.178 35.392C205.22 35.4347 205.263 35.456 205.306 35.456H219.386V40H205.082ZM205.114 28.96H214.842V26.176C214.842 26.1333 214.82 26.0907 214.778 26.048C214.735 26.0053 214.692 25.984 214.65 25.984H205.306C205.263 25.984 205.22 26.0053 205.178 26.048C205.135 26.0907 205.114 26.1333 205.114 26.176V28.96ZM222.539 40V25.952C222.539 25.1413 222.742 24.3947 223.147 23.712C223.574 23.0293 224.128 22.4853 224.811 22.08C225.515 21.6533 226.272 21.44 227.083 21.44H237.355V25.984H227.275C227.232 25.984 227.19 26.0053 227.147 26.048C227.104 26.0907 227.083 26.1333 227.083 26.176V40H222.539ZM239.32 40V25.952C239.32 25.1413 239.523 24.3947 239.928 23.712C240.355 23.0293 240.91 22.4853 241.592 22.08C242.296 21.6533 243.054 21.44 243.864 21.44H254.136V25.984H244.056C244.014 25.984 243.971 26.0053 243.928 26.048C243.886 26.0907 243.864 26.1333 243.864 26.176V40H239.32ZM258.79 46.752V42.176H269.894C269.936 42.176 269.979 42.1547 270.022 42.112C270.064 42.0693 270.086 42.0267 270.086 41.984V40H260.326C259.494 40 258.736 39.7973 258.054 39.392C257.371 38.9653 256.816 38.4107 256.39 37.728C255.984 37.0453 255.782 36.2987 255.782 35.488V21.504H260.326V35.264C260.326 35.3067 260.347 35.3493 260.39 35.392C260.432 35.4347 260.475 35.456 260.518 35.456H269.894C269.936 35.456 269.979 35.4347 270.022 35.392C270.064 35.3493 270.086 35.3067 270.086 35.264V21.504H274.63V42.24C274.63 43.072 274.427 43.8293 274.022 44.512C273.638 45.1947 273.094 45.7387 272.39 46.144C271.707 46.5493 270.95 46.752 270.118 46.752H258.79Z"
                fill="white"
              />
              <defs>
                <filter
                  id="filter0_d_450_32"
                  x="0"
                  y="0"
                  width="295"
                  height="66"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dx="4" dy="4" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_450_32"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_450_32"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </h3>
          <div className="w-full">
            <p
              ref={raspberryFlyText1}
              className="opacity-0 font-Electrolize md:top-3/4 md:fixed md:left-0 md:translate-x-1/2 font-semibold text-xl md:text-[1.375rem] 2xl:text-4xl lg:text-2xl text-white md:max-w-[33vw] mx-auto md:mx-0 whitespace-normal"
            >
              Dank seiner leistungsstarken Rechenkapazität ermöglicht er die präzise
              Steuerung der einzelnen Komponenten des Fahrzeugs
            </p>
            <p
              ref={raspberryFlyText2}
              className="opacity-0 font-Electrolize md:top-3/4 md:fixed  md:left-0 md:translate-x-1/2 font-semibold text-xl md:text-[1.375rem] 2xl:text-4xl lg:text-2xl text-white md:max-w-[33vw] mx-auto md:mx-0 whitespace-normal"
            >
              Über die Software lassen sich Fahrverhalten, Sensorik und Mechanismen
              flexibel anpassen und optimieren
            </p>
            <p
              ref={raspberryFlyText3}
              className="opacity-0 z-[-1] md:z-0 font-Electrolize md:top-1/5 md:fixed md:left-0 md:translate-x-1/2 font-semibold text-xl 2xl:text-4xl md:text-[1.375rem] lg:text-2xl text-white md:max-w-[33vw] mx-auto md:mx-0 whitespace-normal"
            >
              Der Raspberry Pi dient als zentrale Steuereinheit und verarbeitet alle
              eingehenden Sensor- und Steuerungsdaten
            </p>
            <div
              ref={raspberryAnimation}
              className="opacity-0 fixed md:top-[2.5%]  md:w-[35vw] md:h-[45vh] lg:w-[40vw] lg:h-[45vh] z-[-1] md:z-0"
            >
              <Canvas
                camera={{ position: [0, 1, 2], fov: 45 }}
                className="pt-2 w-full h-[40vh] md:h-[60vh] lg:h-[60vh]"
              >
                <ambientLight intensity={0.5} />
                <directionalLight position={[2, 2, 2]} />
                <Suspense fallback={null}>
                  <RaspberryAnimation />
                </Suspense>
              </Canvas>
            </div>
          </div>
        </div>

        <div id="rotate-to-top" style={{ height: "65vh" }}></div>
        <div id="pause-sensors" style={{ height: "50vh" }}>
          <h3
            ref={sensorTitleRef}
            className="opacity-0 font-Orbitron fixed top-[4rem] left-1/2 -translate-x-1/2 text-white text-3xl font-bold whitespace-nowrap"
          >
            <svg
              width="271"
              height="61"
              viewBox="0 0 271 61"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_d_450_38)">
                <path d="M9.5 0L262.5 14L249.5 53L0.5 45L9.5 0Z" fill="#23CF51" />
              </g>
              <path
                d="M10.856 35V11.96H29.256C30.1093 11.96 30.8773 12.1733 31.56 12.6C32.264 13.0053 32.8293 13.56 33.256 14.264C33.6827 14.9467 33.896 15.7147 33.896 16.568V30.392C33.896 31.2453 33.6827 32.024 33.256 32.728C32.8293 33.4107 32.264 33.9653 31.56 34.392C30.8773 34.7973 30.1093 35 29.256 35H10.856ZM15.624 30.36H29.032C29.096 30.36 29.1387 30.3493 29.16 30.328C29.2027 30.2853 29.224 30.232 29.224 30.168V16.792C29.224 16.728 29.2027 16.6853 29.16 16.664C29.1387 16.6213 29.096 16.6 29.032 16.6H15.624C15.5813 16.6 15.5387 16.6213 15.496 16.664C15.4533 16.6853 15.432 16.728 15.432 16.792V30.168C15.432 30.232 15.4533 30.2853 15.496 30.328C15.5387 30.3493 15.5813 30.36 15.624 30.36ZM37.0703 35V16.44H41.6143V35H37.0703ZM37.0703 14.936V10.36H41.6143V14.936H37.0703ZM49.0503 35C48.2396 35 47.4929 34.7973 46.8103 34.392C46.1276 33.9653 45.5729 33.4107 45.1463 32.728C44.7409 32.0453 44.5383 31.2987 44.5383 30.488V20.952C44.5383 20.1413 44.7409 19.3947 45.1463 18.712C45.5729 18.0293 46.1276 17.4853 46.8103 17.08C47.4929 16.6533 48.2396 16.44 49.0503 16.44H58.8423C59.6743 16.44 60.4316 16.6533 61.1143 17.08C61.7969 17.4853 62.3409 18.0293 62.7463 18.712C63.1516 19.3947 63.3543 20.1413 63.3543 20.952V28.024H49.0823V30.264C49.0823 30.3067 49.1036 30.3493 49.1463 30.392C49.1889 30.4347 49.2316 30.456 49.2743 30.456H63.3543V35H49.0503ZM49.0823 23.96H58.8103V21.176C58.8103 21.1333 58.7889 21.0907 58.7463 21.048C58.7036 21.0053 58.6609 20.984 58.6183 20.984H49.2743C49.2316 20.984 49.1889 21.0053 49.1463 21.048C49.1036 21.0907 49.0823 21.1333 49.0823 21.176V23.96ZM81.4603 35C80.6283 35 79.8603 34.7973 79.1562 34.392C78.4523 33.9653 77.8976 33.4107 77.4923 32.728C77.0869 32.024 76.8843 31.2453 76.8843 30.392V28.44H81.4923V30.168C81.4923 30.232 81.5029 30.2853 81.5243 30.328C81.5669 30.3493 81.6096 30.36 81.6523 30.36H95.0603C95.1029 30.36 95.1456 30.3493 95.1883 30.328C95.2309 30.2853 95.2523 30.232 95.2523 30.168V25.976C95.2523 25.9333 95.2309 25.9013 95.1883 25.88C95.1456 25.8373 95.1029 25.816 95.0603 25.816H81.4603C80.6283 25.816 79.8603 25.6133 79.1562 25.208C78.4523 24.7813 77.8976 24.216 77.4923 23.512C77.0869 22.808 76.8843 22.04 76.8843 21.208V16.568C76.8843 15.7147 77.0869 14.9467 77.4923 14.264C77.8976 13.56 78.4523 13.0053 79.1562 12.6C79.8603 12.1733 80.6283 11.96 81.4603 11.96H95.3163C96.1483 11.96 96.9056 12.1733 97.5883 12.6C98.2923 13.0053 98.8576 13.56 99.2843 14.264C99.7109 14.9467 99.9243 15.7147 99.9243 16.568V18.52H95.2523V16.792C95.2523 16.728 95.2309 16.6853 95.1883 16.664C95.1456 16.6213 95.1029 16.6 95.0603 16.6H81.6523C81.6096 16.6 81.5669 16.6213 81.5243 16.664C81.5029 16.6853 81.4923 16.728 81.4923 16.792V20.984C81.4923 21.0267 81.5029 21.0693 81.5243 21.112C81.5669 21.1333 81.6096 21.144 81.6523 21.144H95.3163C96.1483 21.144 96.9056 21.3573 97.5883 21.784C98.2923 22.1893 98.8576 22.744 99.2843 23.448C99.7109 24.152 99.9243 24.92 99.9243 25.752V30.392C99.9243 31.2453 99.7109 32.024 99.2843 32.728C98.8576 33.4107 98.2923 33.9653 97.5883 34.392C96.9056 34.7973 96.1483 35 95.3163 35H81.4603ZM107.769 35C106.958 35 106.212 34.7973 105.529 34.392C104.846 33.9653 104.292 33.4107 103.865 32.728C103.46 32.0453 103.257 31.2987 103.257 30.488V20.952C103.257 20.1413 103.46 19.3947 103.865 18.712C104.292 18.0293 104.846 17.4853 105.529 17.08C106.212 16.6533 106.958 16.44 107.769 16.44H117.561C118.393 16.44 119.15 16.6533 119.833 17.08C120.516 17.4853 121.06 18.0293 121.465 18.712C121.87 19.3947 122.073 20.1413 122.073 20.952V28.024H107.801V30.264C107.801 30.3067 107.822 30.3493 107.865 30.392C107.908 30.4347 107.95 30.456 107.993 30.456H122.073V35H107.769ZM107.801 23.96H117.529V21.176C117.529 21.1333 117.508 21.0907 117.465 21.048C117.422 21.0053 117.38 20.984 117.337 20.984H107.993C107.95 20.984 107.908 21.0053 107.865 21.048C107.822 21.0907 107.801 21.1333 107.801 21.176V23.96ZM125.509 35V16.44H139.813C140.645 16.44 141.403 16.6533 142.085 17.08C142.768 17.4853 143.312 18.0293 143.717 18.712C144.123 19.3947 144.325 20.1413 144.325 20.952V35H139.781V21.176C139.781 21.1333 139.76 21.0907 139.717 21.048C139.696 21.0053 139.653 20.984 139.589 20.984H130.245C130.203 20.984 130.16 21.0053 130.117 21.048C130.075 21.0907 130.053 21.1333 130.053 21.176V35H125.509ZM151.579 35C150.769 35 150.022 34.7973 149.339 34.392C148.657 33.9653 148.102 33.4107 147.675 32.728C147.27 32.0453 147.067 31.2987 147.067 30.488V29.656H151.611V30.264C151.611 30.3067 151.633 30.3493 151.675 30.392C151.718 30.4347 151.761 30.456 151.803 30.456H161.147C161.19 30.456 161.233 30.4347 161.275 30.392C161.318 30.3493 161.339 30.3067 161.339 30.264V28.184C161.339 28.1413 161.318 28.1093 161.275 28.088C161.233 28.0453 161.19 28.024 161.147 28.024H151.579C150.769 28.024 150.022 27.8213 149.339 27.416C148.657 26.9893 148.102 26.4347 147.675 25.752C147.27 25.0693 147.067 24.312 147.067 23.48V20.952C147.067 20.1413 147.27 19.3947 147.675 18.712C148.102 18.0293 148.657 17.4853 149.339 17.08C150.022 16.6533 150.769 16.44 151.579 16.44H161.371C162.203 16.44 162.961 16.6533 163.643 17.08C164.326 17.4853 164.87 18.0293 165.275 18.712C165.702 19.3947 165.915 20.1413 165.915 20.952V21.784H161.339V21.176C161.339 21.1333 161.318 21.0907 161.275 21.048C161.233 21.0053 161.19 20.984 161.147 20.984H151.803C151.761 20.984 151.718 21.0053 151.675 21.048C151.633 21.0907 151.611 21.1333 151.611 21.176V23.256C151.611 23.2987 151.633 23.3413 151.675 23.384C151.718 23.4053 151.761 23.416 151.803 23.416H161.371C162.203 23.416 162.961 23.6293 163.643 24.056C164.326 24.4613 164.87 25.0053 165.275 25.688C165.702 26.3707 165.915 27.128 165.915 27.96V30.488C165.915 31.2987 165.702 32.0453 165.275 32.728C164.87 33.4107 164.326 33.9653 163.643 34.392C162.961 34.7973 162.203 35 161.371 35H151.579ZM173.082 35C172.271 35 171.524 34.7973 170.842 34.392C170.159 33.9653 169.604 33.4107 169.178 32.728C168.772 32.0453 168.57 31.2987 168.57 30.488V20.952C168.57 20.1413 168.772 19.3947 169.178 18.712C169.604 18.0293 170.159 17.4853 170.842 17.08C171.524 16.6533 172.271 16.44 173.082 16.44H182.874C183.706 16.44 184.463 16.6533 185.146 17.08C185.828 17.4853 186.372 18.0293 186.778 18.712C187.183 19.3947 187.386 20.1413 187.386 20.952V30.488C187.386 31.2987 187.183 32.0453 186.778 32.728C186.372 33.4107 185.828 33.9653 185.146 34.392C184.463 34.7973 183.706 35 182.874 35H173.082ZM173.306 30.456H182.65C182.692 30.456 182.735 30.4347 182.778 30.392C182.82 30.3493 182.842 30.3067 182.842 30.264V21.176C182.842 21.1333 182.82 21.0907 182.778 21.048C182.735 21.0053 182.692 20.984 182.65 20.984H173.306C173.263 20.984 173.22 21.0053 173.178 21.048C173.135 21.0907 173.114 21.1333 173.114 21.176V30.264C173.114 30.3067 173.135 30.3493 173.178 30.392C173.22 30.4347 173.263 30.456 173.306 30.456ZM189.977 35V20.952C189.977 20.1413 190.179 19.3947 190.585 18.712C191.011 18.0293 191.566 17.4853 192.249 17.08C192.953 16.6533 193.71 16.44 194.521 16.44H204.793V20.984H194.713C194.67 20.984 194.627 21.0053 194.585 21.048C194.542 21.0907 194.521 21.1333 194.521 21.176V35H189.977ZM211.519 35C210.708 35 209.962 34.7973 209.279 34.392C208.596 33.9653 208.042 33.4107 207.615 32.728C207.21 32.0453 207.007 31.2987 207.007 30.488V20.952C207.007 20.1413 207.21 19.3947 207.615 18.712C208.042 18.0293 208.596 17.4853 209.279 17.08C209.962 16.6533 210.708 16.44 211.519 16.44H221.311C222.143 16.44 222.9 16.6533 223.583 17.08C224.266 17.4853 224.81 18.0293 225.215 18.712C225.62 19.3947 225.823 20.1413 225.823 20.952V28.024H211.551V30.264C211.551 30.3067 211.572 30.3493 211.615 30.392C211.658 30.4347 211.7 30.456 211.743 30.456H225.823V35H211.519ZM211.551 23.96H221.279V21.176C221.279 21.1333 221.258 21.0907 221.215 21.048C221.172 21.0053 221.13 20.984 221.087 20.984H211.743C211.7 20.984 211.658 21.0053 211.615 21.048C211.572 21.0907 211.551 21.1333 211.551 21.176V23.96ZM229.259 35V16.44H243.563C244.395 16.44 245.153 16.6533 245.835 17.08C246.518 17.4853 247.062 18.0293 247.467 18.712C247.873 19.3947 248.075 20.1413 248.075 20.952V35H243.531V21.176C243.531 21.1333 243.51 21.0907 243.467 21.048C243.446 21.0053 243.403 20.984 243.339 20.984H233.995C233.953 20.984 233.91 21.0053 233.867 21.048C233.825 21.0907 233.803 21.1333 233.803 21.176V35H229.259Z"
                fill="white"
              />
              <defs>
                <filter
                  id="filter0_d_450_38"
                  x="0.5"
                  y="0"
                  width="270"
                  height="61"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dx="4" dy="4" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_450_38"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_450_38"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </h3>
          <div className="w-full">
            <p
              ref={sensorFlyText1}
              className="opacity-0 font-Electrolize md:top-3/4 md:fixed md:left-0 md:translate-x-1/2 font-semibold text-xl 2xl:text-4xl md:text-[1.375rem] lg:text-2xl text-white md:max-w-[40vw] lg:max-w-[33vw] mx-auto md:mx-0 whitespace-normal"
            >
              Die Sensoren sind strategisch auf dem Auto verteilt und liefern wichtige
              Informationen zur Umgebung und Position
            </p>
            <p
              ref={sensorFlyText2}
              className="opacity-0 font-Electrolize md:top-3/4 md:fixed  md:left-0 md:translate-x-1/2 font-semibold text-xl 2xl:text-4xl md:text-[1.375rem] lg:text-2xl text-white  md:max-w-[40vw] lg:max-w-[33vw] mx-auto md:mx-0 whitespace-normal "
            >
              Sie ermöglichen eine präzise Erfassung von Hindernissen und der Farben der
              Kärtchen, um diese korrekt zu identifizieren
            </p>
            <p
              ref={sensorFlyText3}
              className="opacity-0 z-[-1] md:z-0 font-Electrolize md:top-1/5 md:fixed md:left-0 md:translate-x-1/2 font-semibold 2xl:text-4xl text-xl md:text-[1.375rem] lg:text-2xl text-white md:max-w-[40vw] lg:max-w-[33vw] mx-auto md:mx-0 whitespace-normal"
            >
              Durch die Kombination verschiedener Sensortypen wird eine zuverlässige und
              intelligente Navigation des Fahrzeugs sichergestellt
            </p>
            <div
              ref={sensorAnimation}
              className="opacity-0 fixed md:top-[2.5%]  md:w-[35vw] md:h-[45vh] lg:w-[40vw] lg:h-[45vh] z-[-1] md:z-0"
            >
              <Canvas
                camera={{ position: [0, 1, 2], fov: 45 }}
                className="pt-2 w-full h-[40vh] md:h-[60vh] lg:h-[60vh]"
              >
                <ambientLight intensity={0.5} />
                <directionalLight position={[2, 2, 2]} />
                <Suspense fallback={null}>
                  <SensorAnimation />
                </Suspense>
              </Canvas>
            </div>
          </div>
        </div>
        <div id="fade-out-sensors" style={{ height: "50vh" }}></div>
        <div id="become-2d" style={{ height: "100vh" }}>
          {/* 2D Circle with text that appears at this scroll point */}
          <div
            ref={circleRef}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] xs:w-[90vw] xs:h-[90vw] md:w-[70vw] md:h-[70vw] lg:w-[50vw] lg:h-[50vw] rounded-full bg-[#23cf51] opacity-0"
          >
            <h3 className=" absolute left-[35%] xs:left-[36%] md:left-[37%] lg:left-[38%] top-1/7 text- text-black text-2xl xs:text-3xl lg:text-4xl 2xl:text-6xl font-bold font-Orbitron">
              Bauteile
            </h3>

            {circleTextItems.map((item, index) => (
              <div
                key={index}
                className={`absolute ${item.size} ${item.fontWeight} text-white font-Electrolize`}
                style={{
                  left: item.left,
                  top: item.top,
                  transform: "translate(-50%, -50%)",
                  textAlign: "center",
                }}
              >
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>
      {isMobile && (
        <div className="mobile-text-container fixed bottom-0 left-0 w-full flex flex-col items-center justify-end p-5 z-30 pointer-events-none">
          {/* Text elements will be moved here via GSAP */}
        </div>
      )}
    </>
  );
}
