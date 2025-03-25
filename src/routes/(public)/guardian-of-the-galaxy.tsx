"use client";

import { createFileRoute } from "@tanstack/react-router";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import { DropperAnimation } from "~/lib/components/ui/modelAnimation";

import { useMediaQuery } from "@uidotdev/usehooks";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Ufo from "~/lib/components/ui/ufo";

export const Route = createFileRoute("/(public)/guardian-of-the-galaxy")({
  component: Home,
});

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function Home() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const wheelsTitleRef = useRef<HTMLHeadingElement | null>(null);
  const generalFlyText = useRef<HTMLHeadingElement | null>(null);
  const wheelsFlyText1 = useRef<HTMLParagraphElement | null>(null);
  const wheelsFlyText2 = useRef<HTMLParagraphElement | null>(null);
  const wheelsFlyText3 = useRef<HTMLParagraphElement | null>(null);
  const dropperTitleRef = useRef<HTMLHeadingElement | null>(null);
  const dropperFlyText1 = useRef<HTMLParagraphElement | null>(null);
  const dropperFlyText2 = useRef<HTMLParagraphElement | null>(null);
  const dropperFlyText3 = useRef<HTMLParagraphElement | null>(null);
  const dropperAnimation = useRef<HTMLDivElement | null>(null);
  const craneTitleRef = useRef<HTMLHeadingElement | null>(null);
  const craneFlyText1 = useRef<HTMLParagraphElement | null>(null);
  const craneFlyText2 = useRef<HTMLParagraphElement | null>(null);
  const craneFlyText3 = useRef<HTMLParagraphElement | null>(null);
  const raspberryTitleRef = useRef<HTMLHeadingElement | null>(null);
  const raspberryFlyText1 = useRef<HTMLParagraphElement | null>(null);
  const raspberryFlyText2 = useRef<HTMLParagraphElement | null>(null);
  const raspberryFlyText3 = useRef<HTMLParagraphElement | null>(null);
  const sensorTitleRef = useRef<HTMLHeadingElement | null>(null);
  const sensorFlyText1 = useRef<HTMLParagraphElement | null>(null);
  const sensorFlyText2 = useRef<HTMLParagraphElement | null>(null);
  const sensorFlyText3 = useRef<HTMLParagraphElement | null>(null);

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
        [dropperFlyText1.current, dropperFlyText2.current, dropperFlyText3.current],
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
    } else {
      // Desktop initial positions (center)
      gsap.set([generalFlyText.current], {
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
          trigger: "#fly-middle",
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
          wheelsFlyText3.current
        ) {
          const text1 = wheelsFlyText1.current.offsetWidth;
          const text2 = wheelsFlyText2.current.offsetWidth;
          const text3 = wheelsFlyText3.current.offsetWidth;

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
              { opacity: 1, x: "25vw", xPercent: -50, left: 0 }, // Position at 25% of viewport width
            )
            .fromTo(
              wheelsFlyText2.current,
              { opacity: 0, x: "100vw" },
              { opacity: 1, x: "75vw", xPercent: -50, left: 0 }, // Position at 75% of viewport width
            )
            .fromTo(
              wheelsFlyText3.current,
              { opacity: 0, x: "-100vw" },
              { opacity: 1, x: "25vw", xPercent: -50, left: 0 }, // Position at 25% of viewport width
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
          const text1 = dropperFlyText1.current.offsetWidth;
          const text2 = dropperFlyText2.current.offsetWidth;
          const text3 = dropperFlyText3.current.offsetWidth;

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
              { opacity: 1, x: "25vw", xPercent: -50, left: 0 },
            )
            .fromTo(
              dropperFlyText2.current,
              { opacity: 0, x: "100vw" },
              { opacity: 1, x: "75vw", xPercent: -50, left: 0 },
            )
            .fromTo(
              dropperFlyText3.current,
              { opacity: 0, x: "-100vw" },
              { opacity: 1, x: "25vw", xPercent: -50, left: 0 },
            )
            .fromTo(
              dropperAnimation.current,
              { opacity: 0, x: "100vw" },
              { opacity: 1, x: "75vw", xPercent: -50, left: 0 },
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
          craneTitleRef.current
        ) {
          const text1 = craneFlyText1.current.offsetWidth;
          const text2 = craneFlyText2.current.offsetWidth;
          const text3 = craneFlyText3.current.offsetWidth;

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
              { opacity: 1, x: "25vw", xPercent: -50, left: 0 },
            )
            .fromTo(
              craneFlyText2.current,
              { opacity: 0, x: "100vw" },
              { opacity: 1, x: "75vw", xPercent: -50, left: 0 },
            )
            .fromTo(
              craneFlyText3.current,
              { opacity: 0, x: "-100vw" },
              { opacity: 1, x: "25vw", xPercent: -50, left: 0 },
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
            });
        }

        //raspberry animation
        if (
          raspberryTitleRef.current &&
          raspberryFlyText1.current &&
          raspberryFlyText2.current &&
          raspberryFlyText3.current
        ) {
          const text1 = raspberryFlyText1.current.offsetWidth;
          const text2 = raspberryFlyText2.current.offsetWidth;
          const text3 = raspberryFlyText3.current.offsetWidth;

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
              { opacity: 1, x: "25vw", xPercent: -50, left: 0 },
            )
            .fromTo(
              raspberryFlyText2.current,
              { opacity: 0, x: "100vw" },
              { opacity: 1, x: "75vw", xPercent: -50, left: 0 },
            )
            .fromTo(
              raspberryFlyText3.current,
              { opacity: 0, x: "-100vw" },
              { opacity: 1, x: "25vw", xPercent: -50, left: 0 },
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
            });
        }

        //sensor animation
        if (
          sensorFlyText1.current &&
          sensorFlyText2.current &&
          sensorFlyText3.current &&
          sensorTitleRef.current
        ) {
          const text1 = sensorFlyText1.current.offsetWidth;
          const text2 = sensorFlyText2.current.offsetWidth;
          const text3 = sensorFlyText3.current.offsetWidth;

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
              start: "top center-=10%",
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
              { opacity: 1, x: "80vw", xPercent: -50, left: 0 },
            )
            .fromTo(
              sensorFlyText3.current,
              { opacity: 0, x: "-100vw" },
              { opacity: 1, x: "20vw", xPercent: -50, left: 0 },
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
          wheelsFlyText3.current
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

          // Mobile text animation - stacked at bottom with different heights
          const fadeInText = gsap.timeline({
            scrollTrigger: {
              trigger: "#rotate-to-bottom",
              start: "top center-=10%",
              end: "bottom center",
              scrub: true,
            },
          });

          // Position text elements in the container with different heights
          fadeInText
            .fromTo(
              wheelsFlyText1.current,
              { opacity: 0, x: "-100vw" },
              {
                opacity: 1,
                x: "0%",
                y: 0,

                bottom: "50vh", // Different height
                width: "100%",
                textAlign: "center",
                margin: "0 auto 10px auto",
                zIndex: 20,
              },
            )
            .fromTo(
              wheelsFlyText2.current,
              { opacity: 0, x: "100vw" },
              {
                opacity: 1,
                x: "0%",


                bottom: "35vh", // Different height
                width: "100%",
                textAlign: "center",
                margin: "0 auto 10px auto",
                zIndex: 20,
              },
            )
            .fromTo(
              wheelsFlyText3.current,
              { opacity: 0, x: "-100vw" },
              {
                opacity: 1,
                x: "0%",

                bottom: "10vh", // Different height
                width: "100%",
                textAlign: "center",
                margin: "0 auto 10px auto",
                zIndex: 20,
              },
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
              x: "-100vw", // Use viewport width
            })
            .to(
              wheelsFlyText2.current,
              {
                opacity: 0,
                x: "100vw", // Use viewport width
              },
              "-=0.2", // Slight overlap
            )
            .to(
              wheelsFlyText3.current,
              {
                opacity: 0,
                x: "-100vw", // Use viewport width
              },
              "-=0.2", // Slight overlap
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

            // Position 3D canvas at bottom left with fixed size
            gsap.set(dropperAnimation.current, {
              position: "fixed",
              top: "auto",
              bottom: "10px",
              left: "10px",
              width: "120px",
              height: "120px",
              zIndex: 10,
            });

            // Mobile text animation - stacked at bottom with different heights
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
                dropperAnimation.current,
                { opacity: 0, x: -150 },
                {
                  opacity: 1,
                  x: 0,
                },
              )
              .fromTo(
                dropperFlyText1.current,
                { opacity: 0, x: "-100vw", y: 0 },
                {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  position: "relative",
                  bottom: "120px", // Different height
                  width: "80%",
                  textAlign: "center",
                  margin: "0 auto 10px auto",
                  zIndex: 20,
                },
              )
              .fromTo(
                dropperFlyText2.current,
                { opacity: 0, x: "100vw", y: 0 },
                {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  position: "relative",
                  bottom: "80px", // Different height
                  width: "80%",
                  textAlign: "center",
                  margin: "0 auto 10px auto",
                  zIndex: 20,
                },
              )
              .fromTo(
                dropperFlyText3.current,
                { opacity: 0, x: "-100vw", y: 0 },
                {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  position: "relative",
                  bottom: "40px", // Different height
                  width: "80%",
                  textAlign: "center",
                  margin: "0 auto 10px auto",
                  zIndex: 20,
                },
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
                x: "-100%",
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
                  x: "-100%",
                },
                "-=0.2", // Slight overlap
              )
              .to(dropperAnimation.current, {
                opacity: 0,
                x: -150,
              });
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
              },
            });

            fadeInText
              .fromTo(
                craneFlyText1.current,
                { opacity: 0, x: "-100%", y: 0 },
                {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  position: "relative",
                  bottom: "120px", // Different height
                  width: "80%",
                  textAlign: "center",
                  margin: "0 auto 10px auto",
                  zIndex: 20, // Ensure visibility
                },
              )
              .fromTo(
                craneFlyText2.current,
                { opacity: 0, x: "100%", y: 0 },
                {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  position: "relative",
                  bottom: "80px", // Different height
                  width: "80%",
                  textAlign: "center",
                  margin: "0 auto 10px auto",
                  zIndex: 20, // Ensure visibility
                },
              )
              .fromTo(
                craneFlyText3.current,
                { opacity: 0, x: "-100%", y: 0 },
                {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  position: "relative",
                  bottom: "40px", // Different height
                  width: "80%",
                  textAlign: "center",
                  margin: "0 auto 10px auto",
                  zIndex: 20, // Ensure visibility
                },
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
                x: "-100%",
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
                  x: "-100%",
                },
                "-=0.2", // Slight overlap
              );
          }

          // Mobile raspberry animation
          if (
            raspberryTitleRef.current &&
            raspberryFlyText1.current &&
            raspberryFlyText2.current &&
            raspberryFlyText3.current
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
              },
            });

            fadeInText
              .fromTo(
                raspberryFlyText1.current,
                { opacity: 0, x: "-100%", y: 0 },
                {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  position: "relative",
                  bottom: "120px", // Different height
                  width: "80%",
                  textAlign: "center",
                  margin: "0 auto 10px auto",
                  zIndex: 20, // Ensure visibility
                },
              )
              .fromTo(
                raspberryFlyText2.current,
                { opacity: 0, x: "100%", y: 0 },
                {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  position: "relative",
                  bottom: "80px", // Different height
                  width: "80%",
                  textAlign: "center",
                  margin: "0 auto 10px auto",
                  zIndex: 20, // Ensure visibility
                },
              )
              .fromTo(
                raspberryFlyText3.current,
                { opacity: 0, x: "-100%", y: 0 },
                {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  position: "relative",
                  bottom: "40px", // Different height
                  width: "80%",
                  textAlign: "center",
                  margin: "0 auto 10px auto",
                  zIndex: 20, // Ensure visibility
                },
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
                x: "-100%",
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
                  x: "-100%",
                },
                "-=0.2", // Slight overlap
              );
          }

          // Mobile sensor animation
          if (
            sensorFlyText1.current &&
            sensorFlyText2.current &&
            sensorFlyText3.current &&
            sensorTitleRef.current
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
              },
            });

            fadeInText
              .fromTo(
                sensorFlyText1.current,
                { opacity: 0, x: "-100%", y: 0 },
                {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  position: "relative",
                  bottom: "120px", // Different height
                  width: "80%",
                  textAlign: "center",
                  margin: "0 auto 10px auto",
                  zIndex: 20, // Ensure visibility
                },
              )
              .fromTo(
                sensorFlyText2.current,
                { opacity: 0, x: "100%", y: 0 },
                {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  position: "relative",
                  bottom: "80px", // Different height
                  width: "80%",
                  textAlign: "center",
                  margin: "0 auto 10px auto",
                  zIndex: 20, // Ensure visibility
                },
              )
              .fromTo(
                sensorFlyText3.current,
                { opacity: 0, x: "-100%", y: 0 },
                {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  position: "relative",
                  bottom: "40px", // Different height
                  width: "80%",
                  textAlign: "center",
                  margin: "0 auto 10px auto",
                  zIndex: 20, // Ensure visibility
                },
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
                x: "-100%",
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
                  x: "-100%",
                },
                "-=0.2", // Slight overlap
              );
          }
        }
      },
    });
  }, []);

  return (
    <>
      <Canvas
        style={{
          position: "fixed",
          left: 0,
          width: "100%",
          height: "100%",
          top: 0,
          zIndex: 0,
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
          angle={0.3}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
          castShadow
        />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} castShadow />
        <Ufo />
      </Canvas>

      <div className="z-10">
        {/* Sections to trigger scroll animations */}
        <div id="start" style={{ height: "50vh" }}></div>

        <div id="fly-outside" style={{ height: "75vh" }}></div>
        <div id="pause-generel" style={{ height: "30vh" }}>
          <h2
            ref={titleRef}
            className="opacity-0 fixed bottom-20 font-Orbitron font-bold text-5xl text-white left-1/2 -translate-x-1/2  whitespace-nowrap"
          >
            Guardian of the Galaxy
          </h2>
          <p
            ref={generalFlyText}
            className="opacity-0 fixed top-1/2 left-0 translate-y-1/2 font-Electrolize font-semibold text-2xl text-white"
          >
            Lorem ipsum dolor sit amet,
          </p>
        </div>
        <div id="fly-middle" style={{ height: "65vh" }}></div>

        <div id="rotate-to-bottom" style={{ height: "100vh" }}></div>
        <div id="pause-bottom" style={{ height: "50vh" }}>
          <h3
            ref={wheelsTitleRef}
            className="opacity-0 font-Orbitron fixed top-[4rem] left-1/2 -translate-x-1/2 text-white text-3xl font-bold whitespace-nowrap"
          >
            Die Reifen
          </h3>
          <p
            ref={wheelsFlyText1}
            className="opacity-0 fixed md:top-3/4 left-0 translate-y-1/2 font-Electrolize font-semibold text-2xl text-white"
          >
            A mysterious force pulls us deeper...
          </p>
          <p
            ref={wheelsFlyText2}
            className="opacity-0 fixed md:top-3/4 left-0 translate-y-1/2 font-Electrolize font-semibold text-2xl text-white"
          >
            The unknown awaits below...
          </p>
          <p
            ref={wheelsFlyText3}
            className="opacity-0 fixed md:top-1/4 left-0 translate-y-1/2 font-Electrolize font-semibold text-2xl text-white"
          >
            The unknown awaits below...
          </p>
        </div>
        <div id="rotate-to-normal" style={{ height: "65vh" }}></div>

        <div id="fade-in-dropper" style={{ height: "40vh" }}></div>
        <div id="pause-dropper" style={{ height: "50vh" }}>
          <h3
            ref={dropperTitleRef}
            className="opacity-0 font-Orbitron fixed top-[4rem] left-1/2 -translate-x-1/2 text-white text-3xl font-bold whitespace-nowrap"
          >
            Der Dropper
          </h3>
          <p
            ref={dropperFlyText1}
            className="opacity-0 fixed top-3/4 left-0 translate-y-1/2 font-Electrolize font-semibold text-2xl text-white"
          >
            A mysterious force pulls us deeper...
          </p>
          <p
            ref={dropperFlyText2}
            className="opacity-0 fixed top-3/4 left-0 translate-y-1/2 font-Electrolize font-semibold text-2xl text-white"
          >
            The unknown awaits below...
          </p>
          <p
            ref={dropperFlyText3}
            className="opacity-0 fixed top-1/4 left-0 translate-y-1/2 font-Electrolize font-semibold text-2xl text-white"
          >
            The unknown awaits below...
          </p>
          <div
            ref={dropperAnimation}
            className="opacity-0 fixed top-[7.5%] left-[-5%] w-[75vh] h-[50vh]"
          >
            <Canvas camera={{ position: [0, 1, 4], fov: 45 }} style={{}}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[2, 2, 2]} />
              <Suspense fallback={null}>
                <DropperAnimation />
              </Suspense>
              <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
          </div>
        </div>
        <div id="fade-out-dropper" style={{ height: "40vh" }}></div>

        <div id="fade-in-crane" style={{ height: "40vh" }}></div>
        <div id="pause-crane" style={{ height: "50vh" }}>
          <h3
            ref={craneTitleRef}
            className="opacity-0 font-Orbitron fixed top-[4rem] left-1/2 -translate-x-1/2 text-white text-3xl font-bold whitespace-nowrap"
          >
            Der Kran
          </h3>
          <p
            ref={craneFlyText1}
            className="opacity-0 fixed top-3/4 left-0 translate-y-1/2 font-Electrolize font-semibold text-2xl text-white"
          >
            A mysterious force pulls us deeper...
          </p>
          <p
            ref={craneFlyText2}
            className="opacity-0 fixed top-3/4 left-0 translate-y-1/2 font-Electrolize font-semibold text-2xl text-white"
          >
            The unknown awaits below...
          </p>
          <p
            ref={craneFlyText3}
            className="opacity-0 fixed top-1/4 left-0 translate-y-1/2 font-Electrolize font-semibold text-2xl text-white"
          >
            The unknown awaits below...
          </p>
        </div>
        <div id="fade-out-crane" style={{ height: "40vh" }}></div>

        <div id="fade-in-raspberry" style={{ height: "40vh" }}></div>
        <div id="pause-raspberry" style={{ height: "50vh" }}>
          <h3
            ref={raspberryTitleRef}
            className="opacity-0 font-Orbitron fixed top-[4rem] left-1/2 -translate-x-1/2 text-white text-3xl font-bold whitespace-nowrap"
          >
            Der raspberry
          </h3>
          <p
            ref={raspberryFlyText1}
            className="opacity-0 fixed top-3/4 left-0 translate-y-1/2 font-Electrolize font-semibold text-2xl text-white"
          >
            A mysterious force pulls us deeper...
          </p>
          <p
            ref={raspberryFlyText2}
            className="opacity-0 fixed top-3/4 left-0 translate-y-1/2 font-Electrolize font-semibold text-2xl text-white"
          >
            The unknown awaits below...
          </p>
          <p
            ref={raspberryFlyText3}
            className="opacity-0 fixed top-1/4 left-0 translate-y-1/2 font-Electrolize font-semibold text-2xl text-white"
          >
            The unknown awaits below...
          </p>
        </div>

        <div id="rotate-to-top" style={{ height: "65vh" }}></div>
        <div id="pause-sensors" style={{ height: "50vh" }}>
          <h3
            ref={sensorTitleRef}
            className="opacity-0 font-Orbitron fixed top-[4rem] left-1/2 -translate-x-1/2 text-white text-3xl font-bold whitespace-nowrap"
          >
            Die Sensoren
          </h3>
          <p
            ref={sensorFlyText1}
            className="opacity-0 fixed top-3/4 left-0 translate-y-1/2 font-Electrolize font-semibold text-2xl text-white"
          >
            A mysterious force pulls us deeper...
          </p>
          <p
            ref={sensorFlyText2}
            className="opacity-0 fixed top-3/4 left-0 translate-y-1/2 font-Electrolize font-semibold text-2xl text-white"
          >
            The unknown awaits below...
          </p>
          <p
            ref={sensorFlyText3}
            className="opacity-0 fixed top-1/4 left-0 translate-y-1/2 font-Electrolize font-semibold text-2xl text-white"
          >
            The unknown awaits below...
          </p>
        </div>
        <div id="fade-out-sensors" style={{ height: "50vh" }}></div>
        <div id="become-2d" style={{ height: "200vh" }}></div>
      </div>
      {isMobile && (
        <div className="mobile-text-container fixed bottom-0 left-0 w-full flex flex-col items-center justify-end p-5 z-30 pointer-events-none">
          {/* Text elements will be moved here via GSAP */}
        </div>
      )}
    </>
  );
}
