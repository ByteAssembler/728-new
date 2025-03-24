import { createFileRoute } from "@tanstack/react-router";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import { DropperAnimation } from "~/lib/components/ui/modelAnimation";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Ufo from "~/lib/components/ui/ufo";

export const Route = createFileRoute("/(public)/guardian-of-the-galaxy")({
  component: Home,
});

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function Home() {
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

    // general Text animation
    if (generalFlyText.current) {
      const flyTextWidth = generalFlyText.current.offsetWidth;
      //start from outside to middle of screen
      gsap.fromTo(
        generalFlyText.current,
        { x: -flyTextWidth, opacity: 0 },
        {
          x: globalThis.innerWidth / 2 - flyTextWidth / 2, //center
          opacity: 1,
          scrollTrigger: {
            trigger: "#fly-outside",
            start: "top center",
            end: "bottom center",
            scrub: true,
            //markers: true,
          },
        },
      );

      //from middle of screen to outside
      gsap.fromTo(
        generalFlyText.current,
        { x: globalThis.innerWidth / 2 - flyTextWidth / 2 },
        {
          x: globalThis.innerWidth, //outside
          opacity: 0,
          scrollTrigger: {
            trigger: "#fly-middle",
            start: "top center",
            end: "bottom center",
            scrub: true,
          },
        },
      );
    }

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
          //markers: true,
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
          //markers: true,
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
          //markers: true,
        },
      });
      fadeInText
        .fromTo(
          wheelsFlyText1.current,
          { opacity: 0, x: globalThis.innerWidth / 2 - -text1 / 2 },
          { opacity: 1, x: globalThis.innerWidth / 4 - text1 / 2 },
        )
        .fromTo(
          wheelsFlyText2.current,
          { opacity: 0, x: globalThis.innerWidth / 2 - text2 / 2 },
          { opacity: 1, x: (globalThis.innerWidth / 4) * 3 - text2 / 2 },
        )
        .fromTo(
          wheelsFlyText3.current,
          { opacity: 0, x: globalThis.innerWidth / 2 - text3 / 2 },
          { opacity: 1, x: globalThis.innerWidth / 4 - text3 / 2 },
          //"<" for playing with last animation
        );
      const fadeOutText = gsap.timeline({
        scrollTrigger: {
          trigger: "#rotate-to-normal",
          start: "top center",
          end: "bottom center",

          scrub: true,
          //markers: true,
          immediateRender: false,
        },
      });
      fadeOutText
        .to(wheelsFlyText1.current, {
          opacity: 0,
          x: -globalThis.innerWidth, // Move to the left side of the screen
        })
        .to(
          wheelsFlyText2.current,
          {
            opacity: 0,
            x: globalThis.innerWidth, // Move to the right side of the screen
          },
          //"<" // Start at the same time as the previous animation
        )
        .to(
          wheelsFlyText3.current,
          {
            opacity: 0,
            x: -globalThis.innerWidth, // Move to the left side of the screen
          },
          //"<" // Start at the same time as the previous animation
        );
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
      // const animation = dropperAnimation.current.offsetWidth;

      //title
      //fade in
      const fadeInTitle = gsap.timeline({
        scrollTrigger: {
          trigger: "#fade-in-dropper",
          start: "top center",
          end: "bottom center",
          scrub: true,
          //markers: true,
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
          //markers: true,
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
          //markers: true,
        },
      });
      fadeInText
        .fromTo(
          dropperFlyText1.current,
          { opacity: 0, x: globalThis.innerWidth / 2 - -text1 / 2 },
          { opacity: 1, x: globalThis.innerWidth / 4 - text1 / 2 },
        )
        .fromTo(
          dropperFlyText2.current,
          { opacity: 0, x: globalThis.innerWidth / 2 - text2 / 2 },
          { opacity: 1, x: (globalThis.innerWidth / 4) * 3 - text2 / 2 },
        )
        .fromTo(
          dropperFlyText3.current,
          { opacity: 0, x: globalThis.innerWidth / 2 - text3 / 2 },
          { opacity: 1, x: globalThis.innerWidth / 4 - text3 / 2 },
          //"<" for playing with last animation
        )
        .fromTo(
          dropperAnimation.current,
          { opacity: 0, x: globalThis.innerWidth / 2 },
          { opacity: 1, x: (globalThis.innerWidth / 4) * 3 },
        );
      const fadeOutText = gsap.timeline({
        scrollTrigger: {
          trigger: "#fade-out-dropper",
          start: "top center",
          end: "bottom center",

          scrub: true,
          //markers: true,
          immediateRender: false,
        },
      });
      fadeOutText
        .to(dropperFlyText1.current, {
          opacity: 0,
          x: -globalThis.innerWidth, // Move to the left side of the screen
        })
        .to(
          dropperFlyText2.current,
          {
            opacity: 0,
            x: globalThis.innerWidth, // Move to the right side of the screen
          },
          //"<" // Start at the same time as the previous animation
        )
        .to(
          dropperFlyText3.current,
          {
            opacity: 0,
            x: -globalThis.innerWidth, // Move to the left side of the screen
          },
          //"<" // Start at
        )
        .to(dropperAnimation.current, {
          opacity: 0,
          x: globalThis.innerWidth, // Move it off-screen like the text
        });
      //3d model
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
          //markers: true,
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
          //markers: true,
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
          //markers: true,
        },
      });
      fadeInText
        .fromTo(
          craneFlyText1.current,
          { opacity: 0, x: globalThis.innerWidth / 2 - -text1 / 2 },
          { opacity: 1, x: globalThis.innerWidth / 4 - text1 / 2 },
        )
        .fromTo(
          craneFlyText2.current,
          { opacity: 0, x: globalThis.innerWidth / 2 - text2 / 2 },
          { opacity: 1, x: (globalThis.innerWidth / 4) * 3 - text2 / 2 },
        )
        .fromTo(
          craneFlyText3.current,
          { opacity: 0, x: globalThis.innerWidth / 2 - text3 / 2 },
          { opacity: 1, x: globalThis.innerWidth / 4 - text3 / 2 },
          //"<" for playing with last animation
        );
      const fadeOutText = gsap.timeline({
        scrollTrigger: {
          trigger: "#fade-out-crane",
          start: "top center",
          end: "bottom center",

          scrub: true,
          //markers: true,
          immediateRender: false,
        },
      });
      fadeOutText
        .to(craneFlyText1.current, {
          opacity: 0,
          x: -globalThis.innerWidth, // Move to the left side of the screen
        })
        .to(
          craneFlyText2.current,
          {
            opacity: 0,
            x: globalThis.innerWidth, // Move to the right side of the screen
          },
          //"<" // Start at the same time as the previous animation
        )
        .to(
          craneFlyText3.current,
          {
            opacity: 0,
            x: -globalThis.innerWidth, // Move to the left side of the screen
          },
          //"<" // Start at
        );
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
          //markers: true,
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
          //markers: true,
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
          //markers: true,
        },
      });
      fadeInText
        .fromTo(
          raspberryFlyText1.current,
          { opacity: 0, x: globalThis.innerWidth / 2 - -text1 / 2 },
          { opacity: 1, x: globalThis.innerWidth / 4 - text1 / 2 },
        )
        .fromTo(
          raspberryFlyText2.current,
          { opacity: 0, x: globalThis.innerWidth / 2 - text2 / 2 },
          { opacity: 1, x: (globalThis.innerWidth / 4) * 3 - text2 / 2 },
        )
        .fromTo(
          raspberryFlyText3.current,
          { opacity: 0, x: globalThis.innerWidth / 2 - text3 / 2 },
          { opacity: 1, x: globalThis.innerWidth / 4 - text3 / 2 },
          //"<" for playing with last animation
        );
      const fadeOutText = gsap.timeline({
        scrollTrigger: {
          trigger: "#rotate-to-top",
          start: "top center",
          end: "bottom center",

          scrub: true,
          //markers: true,
          immediateRender: false,
        },
      });
      fadeOutText
        .to(raspberryFlyText1.current, {
          opacity: 0,
          x: -globalThis.innerWidth, // Move to the left side of the screen
        })
        .to(
          raspberryFlyText2.current,
          {
            opacity: 0,
            x: globalThis.innerWidth, // Move to the right side of the screen
          },
          //"<" // Start at the same time as the previous animation
        )
        .to(
          raspberryFlyText3.current,
          {
            opacity: 0,
            x: -globalThis.innerWidth, // Move to the left side of the screen
          },
          //"<" // Start at the same time as the previous animation
        );
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
          //markers: true,
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
          //markers: true,
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
          //markers: true,
        },
      });
      fadeInText
        .fromTo(
          sensorFlyText1.current,
          { opacity: 0, x: globalThis.innerWidth / 2 - -text1 / 2 },
          { opacity: 1, x: globalThis.innerWidth / 4 - text1 / 2 },
        )
        .fromTo(
          sensorFlyText2.current,
          { opacity: 0, x: globalThis.innerWidth / 2 - text2 / 2 },
          { opacity: 1, x: (globalThis.innerWidth / 4) * 3 - text2 / 2 },
        )
        .fromTo(
          sensorFlyText3.current,
          { opacity: 0, x: globalThis.innerWidth / 2 - text3 / 2 },
          { opacity: 1, x: globalThis.innerWidth / 4 - text3 / 2 },
          //"<" for playing with last animation
        );
      const fadeOutText = gsap.timeline({
        scrollTrigger: {
          trigger: "#fade-out-sensors",
          start: "top center",
          end: "bottom center",

          scrub: true,
          //markers: true,
          immediateRender: false,
        },
      });
      fadeOutText
        .to(sensorFlyText1.current, {
          opacity: 0,
          x: -globalThis.innerWidth, // Move to the left side of the screen
        })
        .to(
          sensorFlyText2.current,
          {
            opacity: 0,
            x: globalThis.innerWidth, // Move to the right side of the screen
          },
          //"<" // Start at the same time as the previous animation
        )
        .to(
          sensorFlyText3.current,
          {
            opacity: 0,
            x: -globalThis.innerWidth, // Move to the left side of the screen
          },
          //"<" // Start at
        );
    }

    return () => ScrollTrigger.refresh();
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
            className="opacity-0 fixed bottom-20 font-Orbitron font-bold text-5xl text-white left-1/2 -translate-x-1/2"
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
            className="opacity-0 font-Orbitron fixed top-[4rem] left-1/2 -translate-x-1/2 text-white text-3xl font-bold"
          >
            Die Reifen
          </h3>
          <p
            ref={wheelsFlyText1}
            className="opacity-0 fixed top-3/4 left-0 translate-y-1/2 font-Electrolize font-semibold text-2xl text-white"
          >
            A mysterious force pulls us deeper...
          </p>
          <p
            ref={wheelsFlyText2}
            className="opacity-0 fixed top-3/4 left-0 translate-y-1/2 font-Electrolize font-semibold text-2xl text-white"
          >
            The unknown awaits below...
          </p>
          <p
            ref={wheelsFlyText3}
            className="opacity-0 fixed top-1/4 left-0 translate-y-1/2 font-Electrolize font-semibold text-2xl text-white"
          >
            The unknown awaits below...
          </p>
        </div>
        <div id="rotate-to-normal" style={{ height: "65vh" }}></div>

        <div id="fade-in-dropper" style={{ height: "40vh" }}></div>
        <div id="pause-dropper" style={{ height: "50vh" }}>
          <h3
            ref={dropperTitleRef}
            className="opacity-0 font-Orbitron fixed top-[4rem] left-1/2 -translate-x-1/2 text-white text-3xl font-bold"
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
            className="opacity-0 font-Orbitron fixed top-[4rem] left-1/2 -translate-x-1/2 text-white text-3xl font-bold"
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
            className="opacity-0 font-Orbitron fixed top-[4rem] left-1/2 -translate-x-1/2 text-white text-3xl font-bold"
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
            className="opacity-0 font-Orbitron fixed top-[4rem] left-1/2 -translate-x-1/2 text-white text-3xl font-bold"
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
    </>
  );
}
