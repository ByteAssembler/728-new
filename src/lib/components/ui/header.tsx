"use client";

import { Link, useLocation } from "@tanstack/react-router";
import { useMediaQuery } from "@uidotdev/usehooks";
import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import Ufo from "~/assets/ufo.png";

function HeaderNormal() {
  const [isOpen, setIsOpen] = useState(false);
  const [pageTitle, setPageTitle] = useState("");
  const [isButtonClicked, setHasClickedButton] = useState(false);
  const [blinkState, setBlinkState] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const triangleRef = useRef<SVGSVGElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 431px)");
  const isTablet = useMediaQuery("(max-width: 768px)");
  const [ufoPosition, setUfoPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation(); // Get the current route

  const headerEntries: { title: string; pathname: string; description: string }[] = [
    {
      title: "Log",
      pathname: "/log",
      description: "Log where all the activities of the car are displayed",
    },
    {
      title: "Auto",
      pathname: "/guardian-of-the-galaxy",
      description:
        "A UFO-shaped emergency ambulance that hovers in to save the day, proving that when it comes to emergencies, even aliens know speed matters!",
    },
    {
      title: "Memoire",
      pathname: "/diary",
      description: "A simple diary application to keep track of your thoughts.",
    },
    {
      title: "Über uns",
      pathname: "/about",
      description: "We are 72Aid, founded to save lives.",
    },
  ] as const;

  function disableScroll() {
    document.body.style.overflow = isOpen ? "auto" : "hidden";
    console.log(isOpen);
  }

  const toggleDropdown = () => {
    setHasClickedButton(true);
    setIsOpen(!isOpen);
    disableScroll();
  };

  function calculateX(screenWidth: number) {
    if (screenWidth < 360) {
      // Segment 1: 350px to 360px (assuming linear continuation from Segment 2)
      const m = 3.8;
      const b = -930;
      return m * screenWidth + b;
    } else if (screenWidth >= 360 && screenWidth <= 375) {
      // Segment 2: 360px to 375px
      const m = 3.8;
      const b = -1066;
      return m * screenWidth + b;
    } else if (screenWidth >= 375 && screenWidth < 390) {
      // Segment 3: 375px to 390px
      const m = -1.8;
      const b = 1067;
      return m * screenWidth + b;
    } else if (screenWidth >= 390 && screenWidth < 431) {
      // Segment 4: 390px to 431px
      const m = 0.9756;
      const b = -15.484;
      return m * screenWidth + b;
    } else if (screenWidth >= 431 && screenWidth < 487) {
      // Segment 5: 431px to 487px
      const m = 1.4643;
      const b = -250.1;
      return m * screenWidth + b;
    } else if (screenWidth >= 487 && screenWidth < 520) {
      // Segment 6: 487px to 520px
      const m = 1.9091;
      const b = -482.7;
      return m * screenWidth + b;
    } else if (screenWidth >= 520 && screenWidth < 576) {
      // Segment 7: 520px to 576px
      const m = 1.3286;
      const b = -220.9;
      return m * screenWidth + b;
    } else if (screenWidth >= 576 && screenWidth < 720) {
      // Segment 8: 576px to 720px
      const m = 1.0292;
      const b = -45.2;
      return m * screenWidth + b;
    } else if (screenWidth >= 720 && screenWidth <= 768) {
      // Segment 9: 720px to 768px
      const m = 2.3208;
      const b = -994.0;
      return m * screenWidth + b;
    } else {
      // Fallback for values outside the range
      throw new Error("Screen width must be between 350px and 768px.");
    }
  }

  useEffect(() => {
    if (isButtonClicked) return; // Stop blinking if button is clicked

    let intervalId: NodeJS.Timeout | number;
    const initialTimeout = setTimeout(() => {
      blinkTwice();
      intervalId = setInterval(blinkTwice, 10000);
    }, 20000);

    let timeout1: NodeJS.Timeout;
    let timeout2: NodeJS.Timeout;
    let timeout3: NodeJS.Timeout;

    function blinkTwice() {
      setBlinkState(true);
      timeout1 = setTimeout(() => setBlinkState(false), 500);
      timeout2 = setTimeout(() => setBlinkState(true), 1000);
      timeout3 = setTimeout(() => setBlinkState(false), 1500);
    }

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(intervalId);
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
    };
  }, [isButtonClicked]);

  useEffect(() => {
    console.log("Route changed to:", location);
    changeRouteTitle();
  }, [location]); //route change

  function changeRouteTitle() {
    const entry = headerEntries.find((item) => {
      // Exact match (for paths like /car, /about)
      if (item.pathname === location.pathname) {
        return true;
      }
      // Check if the current path starts with the entry's pathname
      // and has more segments (for paths like /diary/whatever)
      if (location.pathname.startsWith(item.pathname + "/") && item.pathname !== "/") {
        return true;
      }
      return false;
    });

    // Ensure entry is found before setting the title
    if (entry) {
      setPageTitle(entry.title);
    } else {
      setPageTitle("Not Found");
    }
  }

  const handleClick = useCallback(
    (event: MouseEvent) => {
      if (triangleRef.current) {
        const svgElement = triangleRef.current;
        const point = svgElement.createSVGPoint();
        point.x = event.clientX;
        point.y = event.clientY;
        const ctm = svgElement.getScreenCTM();
        if (ctm) {
          const transformedPoint = point.matrixTransform(ctm.inverse());
          const path = svgElement.querySelector("path");
          if (path && path instanceof SVGGeometryElement) {
            const isInPath = path.isPointInFill(transformedPoint);
            if (!isInPath) {
              setIsOpen(false);
              disableScroll();
            }
          }
        }
      }
    },
    [disableScroll],
  );

  async function setUfoPos() {
    if (buttonRef.current && triangleRef.current && isOpen) {
      const rect = buttonRef.current.getBoundingClientRect();
      const triangle = triangleRef.current.getBoundingClientRect();

      console.log("mobile: " + isMobile);
      console.log("tablet: " + isTablet);
      console.log(rect.left);
      console.log("globalthis:" + globalThis.innerWidth);
      console.log(
        "function:" +
          (globalThis.innerWidth / (25 + 0.015 * (globalThis.innerWidth - 361))) *
            (24 + 0.015 * (globalThis.innerWidth - 361)),
      );
      console.log("triangle:" + triangle.width);

      const middleX = isMobile
        ? calculateX(globalThis.innerWidth) - triangle.width
        : isTablet
          ? calculateX(globalThis.innerWidth) - triangle.width
          : rect.left + (rect.width / 2) * 1.3 - triangle.width;
      const middleY = rect.top + rect.height - 25;
      requestAnimationFrame(() => {
        setUfoPosition({ x: middleX, y: middleY });
      });
      console.log(middleX + "," + middleY);

      if (triangleRef.current) {
        triangleRef.current.style.left = `${middleX}px`;
        triangleRef.current.style.top = `${middleY}px`;
      }
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleClick);
    } else {
      document.removeEventListener("click", handleClick);
    }

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [isOpen]);

  useEffect(() => {
    window.addEventListener("resize", setUfoPos);
    setUfoPos();
    return () => {
      window.removeEventListener("resize", setUfoPos);
    };
  }, [isOpen]);

  return (
    <div className="fixed w-full">
      <div className="w-full flex justify-center relative">
        <div className="fixed top-0 left-0 w-full z-[100] flex justify-end md:justify-center items-center gap-3">
          <div
            className="flex justify-between md:justify-center md:items-center pr-[-0.5rem] xs:pr-0 md:gap-3 md:pl-4 md:pb-1 md:pr-4 md:pt-1 relative"
            style={{
              borderRadius: "12px",
            }}
          >
            {!isOpen && (
              <div
                className="fixed md:absolute inset-0 max-h-12 md:max-h-14 max-w-[220px] md:max-w-[300px] bg-black/[0.1] bg-opacity-10 backdrop-filter md:transform-none md:left-0 left-1/2 md:translate-x-0 -translate-x-1/2 backdrop-blur-sm md:pl-3 pb-1 md:pr-3 "
                style={{
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  borderRadius: "12px",
                  zIndex: 0, // Ensure it stays behind the children
                  maskImage:
                    "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 10%, rgba(0, 0, 0, 1) 90%, rgba(0, 0, 0, 0) 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 10%, rgba(0, 0, 0, 1) 90%, rgba(0, 0, 0, 0) 100%)",
                }}
              />
            )}

            <span className="font-Orbitron font-extrabold fixed left-1/2 -translate-1/2 md:translate-0 md:left-0 md:static text-3xl z-90 top-6 text-center md:top-0 md:pt-0 text-white">
              {pageTitle}
            </span>

            <motion.div
              className="relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <motion.button
                ref={buttonRef}
                className="pt-1 md:pr-0 pr-1 text-white font-bold translate-y-2 md:translate-y-0 p-1"
                onClick={toggleDropdown}
                animate={{
                  y: [0, -4, 3, -2, 2, -3, 4, -1, 1, 0],
                  x: [0, 3, -4, 2, -1, 1, -3, 4, -1, 0],
                  rotate: [0, 1, -1, 0.5, -0.5, 1, -1, 0],
                }}
                transition={{
                  duration: 11,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                }}
              >
                {(isHovered || blinkState) && (
                  <motion.div
                    className="absolute top-1/2 left-1/2 w-14  h-14 bg-green-500 rounded-full blur-xl opacity-0"
                    style={{ transform: "translate(-50%, -50%)" }}
                    animate={{ opacity: [0, 0.5, 0.8] }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                )}
                <img
                  src={Ufo}
                  alt="Ufo"
                  width={isMobile ? 63 : 75}
                  height={isMobile ? 63 : 75}
                  className="relative z-[110]"
                />
              </motion.button>
            </motion.div>
          </div>
        </div>

        {isOpen && (
          <div>
            {/* blur effect */}
            <div
              className="fixed top-0 left-0 w-screen h-screen z-[90]"
              style={{
                background: "rgba(255, 255, 255, 0.01)",
                backdropFilter: "blur(13px)",
                WebkitBackdropFilter: "blur(13px)",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              }}
            />

            <div
              ref={dropdownRef}
              className="fixed top-0 left-0 w-full h-full z-[90] overflow-hidden font-Orbitron font-black "
            >
              <svg
                ref={triangleRef}
                viewBox={`0 0 639 885`}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute md:w-auto w-[150%] "
                preserveAspectRatio="xMaxYMin"
                style={{
                  left: `${ufoPosition.x}px`,
                  top: `${ufoPosition.y}px`,
                  //translate: "translate(-50%,0)",
                  maxHeight: "100vh",
                }}
              >
                <g filter="url(#shadow)">
                  <path
                    d="M630.76 0.247004L557.002 1055.58L0.405187 885.415L630.76 0.247004Z"
                    fill="#23CF51"
                  />
                </g>

                {headerEntries.map(
                  (
                    link,
                    index, //text
                  ) => (
                    <text
                      fontSize={
                        isMobile
                          ? index !== 0
                            ? index == 1
                              ? 64
                              : index == 2
                                ? 64
                                : index == 3
                                  ? 35 + 32 * (globalThis.innerWidth / 431)
                                  : 0
                            : 55 //tablet
                          : isTablet
                            ? index !== 0
                              ? index == 1
                                ? 64
                                : index == 2
                                  ? 74
                                  : index == 3
                                    ? 92
                                    : 0
                              : 55 //tablet
                            : index !== 0
                              ? index == 1
                                ? 70
                                : index == 2
                                  ? 76
                                  : index == 3
                                    ? 94
                                    : 0
                              : 59 //desktop
                      }
                      fill="#FFFFFF"
                      key={index}
                      x={
                        isMobile
                          ? index !== 0
                            ? index == 1
                              ? 400
                              : index == 2
                                ? 290
                                : index == 3
                                  ? 325 - 85 * (globalThis.innerWidth / 431)
                                  : 0
                            : 499
                          : //mobile
                            isTablet
                            ? index !== 0
                              ? index == 1
                                ? 400
                                : index == 2
                                  ? 236
                                  : index == 3
                                    ? 110
                                    : 0
                              : 499
                            : //tablet
                              index !== 0
                              ? index == 1
                                ? 390
                                : index == 2
                                  ? 227
                                  : index == 3
                                    ? 100
                                    : 0
                              : 490 //desktop
                      }
                      y={
                        isMobile
                          ? index * 150 + 225 //mobile
                          : isTablet
                            ? index * 190 + 225 //tablet
                            : index * 190 + 240 //desktop
                      }
                      className=" text-center"
                      style={{
                        transition: "transform 0.2s ease", // Smooth transition for scaling
                        cursor: "pointer", // Change cursor to pointer on hover
                        transformOrigin: "bottom",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(0.985)"; // Scale down to 90% on hover
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)"; // Reset to original size on mouse leave
                      }}
                    >
                      <Link
                        className="fill-white"
                        to={link.pathname}
                        params={{}}
                        onClick={() => toggleDropdown()}
                      >
                        {link.title}
                      </Link>
                    </text>
                  ),
                )}
                <defs>
                  <filter
                    id="shadow"
                    x="0.405151"
                    y="0.247009"
                    width="638.355"
                    height="1063.34"
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
                      result="effect1_dropShadow_121_8"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_121_8"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function HeaderAdmin() {
  const [isOpen, setIsOpen] = useState(false);
  const [pageTitle, setPageTitle] = useState("");
  const [isButtonClicked, setHasClickedButton] = useState(false);
  const [blinkState, setBlinkState] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const triangleRef = useRef<SVGSVGElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 431px)");
  const isTablet = useMediaQuery("(max-width: 769px)");
  const [ufoPosition, setUfoPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation(); // Get the current route

  const headerEntries: { title: string; pathname: string; description: string }[] = [
    {
      title: "Log",
      pathname: "/log",
      description: "Log where all the activities of the car are displayed",
    },
    {
      title: "Auto",
      pathname: "/guardian-of-the-galaxy",
      description:
        "A UFO-shaped emergency ambulance that hovers in to save the day, proving that when it comes to emergencies, even aliens know speed matters!",
    },
    {
      title: "Admin",
      pathname: "/admin",
      description: "The Admin Page to control the car",
    },
    {
      title: "Memoire",
      pathname: "/diary",
      description: "A simple diary application to keep track of your thoughts.",
    },
    {
      title: "Über uns",
      pathname: "/about",
      description: "We are 72Aid, founded to save lives.",
    },
  ] as const;

  function disableScroll() {
    document.body.style.overflow = isOpen ? "auto" : "hidden";
    console.log(isOpen);
  }

  const toggleDropdown = () => {
    setHasClickedButton(true);
    setIsOpen(!isOpen);
    disableScroll();
    setUfoPos();
  };

  useEffect(() => {
    if (isButtonClicked) return; // Stop blinking if button is clicked

    let intervalId: NodeJS.Timeout | number;
    const initialTimeout = setTimeout(() => {
      blinkTwice();
      intervalId = setInterval(blinkTwice, 10000);
    }, 20000);

    function blinkTwice() {
      setBlinkState(true);
      setTimeout(() => setBlinkState(false), 500);
      setTimeout(() => setBlinkState(true), 1000);
      setTimeout(() => setBlinkState(false), 1500);
    }

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(intervalId);
    };
  }, [isButtonClicked]);

  useEffect(() => {
    console.log("Route changed to:", location);
    changeRouteTitle();
  }, [location]); //route change
  function calculateX(screenWidth: number) {
    if (screenWidth < 360) {
      // Segment 1: 350px to 360px (assuming linear continuation from Segment 2)
      const m = 3.8;
      const b = -930;
      return m * screenWidth + b;
    } else if (screenWidth >= 360 && screenWidth <= 375) {
      // Segment 2: 360px to 375px
      const m = 3.8;
      const b = -1066;
      return m * screenWidth + b;
    } else if (screenWidth >= 375 && screenWidth < 390) {
      // Segment 3: 375px to 390px
      const m = -1.8;
      const b = 1067;
      return m * screenWidth + b;
    } else if (screenWidth >= 390 && screenWidth < 431) {
      // Segment 4: 390px to 431px
      const m = 0.9756;
      const b = -15.484;
      return m * screenWidth + b;
    } else if (screenWidth >= 431 && screenWidth < 487) {
      // Segment 5: 431px to 487px
      const m = 1.4643;
      const b = -250.1;
      return m * screenWidth + b;
    } else if (screenWidth >= 487 && screenWidth < 520) {
      // Segment 6: 487px to 520px
      const m = 1.9091;
      const b = -482.7;
      return m * screenWidth + b;
    } else if (screenWidth >= 520 && screenWidth < 576) {
      // Segment 7: 520px to 576px
      const m = 1.3286;
      const b = -220.9;
      return m * screenWidth + b;
    } else if (screenWidth >= 576 && screenWidth < 720) {
      // Segment 8: 576px to 720px
      const m = 1.0292;
      const b = -45.2;
      return m * screenWidth + b;
    } else if (screenWidth >= 720 && screenWidth <= 768) {
      // Segment 9: 720px to 768px
      const m = 2.3208;
      const b = -994.0;
      return m * screenWidth + b;
    } else {
      // Fallback for values outside the range
      throw new Error("Screen width must be between 350px and 768px.");
    }
  }

  function changeRouteTitle() {
    const entry = headerEntries.find((item) => {
      // Exact match (for paths like /car, /about)
      if (item.pathname === location.pathname) {
        return true;
      }
      // Check if the current path starts with the entry's pathname
      // and has more segments (for paths like /diary/whatever)
      if (location.pathname.startsWith(item.pathname + "/") && item.pathname !== "/") {
        return true;
      }
      return false;
    });

    // Ensure entry is found before setting the title
    if (entry) {
      setPageTitle(entry.title);
    } else {
      setPageTitle("Not Found");
    }
  }

  const handleClick = (event: MouseEvent) => {
    if (triangleRef.current) {
      const svgElement = triangleRef.current;
      const point = svgElement.createSVGPoint();
      point.x = event.clientX;
      point.y = event.clientY;
      const ctm = svgElement.getScreenCTM();
      if (ctm) {
        const transformedPoint = point.matrixTransform(ctm.inverse());
        const path = svgElement.querySelector("path");
        if (path && path instanceof SVGGeometryElement) {
          const isInPath = path.isPointInFill(transformedPoint);
          if (!isInPath) {
            setIsOpen(false);
            disableScroll();
          }
        }
      }
    }
  };
  async function setUfoPos() {
    if (buttonRef.current && triangleRef.current && isOpen) {
      const rect = buttonRef.current.getBoundingClientRect();
      const triangle = triangleRef.current.getBoundingClientRect();

      console.log("mobile: " + isMobile);
      console.log("tablet: " + isTablet);
      console.log(rect.left);
      console.log("globalthis:" + globalThis.innerWidth);
      console.log(
        "function:" +
          (globalThis.innerWidth / (25 + 0.015 * (globalThis.innerWidth - 361))) *
            (24 + 0.015 * (globalThis.innerWidth - 361)),
      );
      console.log("triangle:" + triangle.width);

      const middleX = isMobile
        ? calculateX(globalThis.innerWidth) - triangle.width
        : isTablet
          ? calculateX(globalThis.innerWidth) - triangle.width
          : rect.left + (rect.width / 2) * 1.3 - triangle.width;
      const middleY = rect.top + rect.height - 25;
      requestAnimationFrame(() => {
        setUfoPosition({ x: middleX, y: middleY });
      });
      console.log(middleX + "," + middleY);

      if (triangleRef.current) {
        triangleRef.current.style.left = `${middleX}px`;
        triangleRef.current.style.top = `${middleY}px`;
      }
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleClick);
    } else {
      document.removeEventListener("click", handleClick);
    }

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [isOpen]);

  useEffect(() => {
    window.addEventListener("resize", setUfoPos);
    setUfoPos();
  }, [isOpen]);

  return (
    <div className="fixed w-full">
      <div className="w-full flex justify-center relative">
        <div className="fixed top-0 left-0 w-full z-[100] flex justify-end md:justify-center items-center gap-3">
          <div
            className="flex justify-between md:justify-center md:items-center pr-[-0.5rem] xs:pr-0 md:gap-3 md:pl-4 md:pb-1 md:pr-4 md:pt-1 relative"
            style={{
              borderRadius: "12px",
            }}
          >
            {!isOpen && (
              <div
                className="fixed md:absolute inset-0 max-h-12 md:max-h-14 max-w-[220px] md:max-w-[300px] bg-black/[0.1] bg-opacity-10 backdrop-filter md:transform-none md:left-0 left-1/2 md:translate-x-0 -translate-x-1/2 backdrop-blur-sm md:pl-3 pb-1 md:pr-3 "
                style={{
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  borderRadius: "12px",
                  zIndex: 0, // Ensure it stays behind the children
                  maskImage:
                    "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 10%, rgba(0, 0, 0, 1) 90%, rgba(0, 0, 0, 0) 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 10%, rgba(0, 0, 0, 1) 90%, rgba(0, 0, 0, 0) 100%)",
                }}
              />
            )}

            <span className="font-Orbitron font-extrabold fixed left-1/2 -translate-1/2 md:translate-0 md:left-0 md:static text-3xl z-90 top-6 text-center md:top-0 md:pt-0 text-white">
              {pageTitle}
            </span>

            <motion.div
              className="relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <motion.button
                ref={buttonRef}
                className="pt-1 md:pr-0 pr-1 text-white font-bold translate-y-2 md:translate-y-0 p-1"
                onClick={toggleDropdown}
                animate={{
                  y: [0, -4, 3, -2, 2, -3, 4, -1, 1, 0],
                  x: [0, 3, -4, 2, -1, 1, -3, 4, -1, 0],
                  rotate: [0, 1, -1, 0.5, -0.5, 1, -1, 0],
                }}
                transition={{
                  duration: 11,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                }}
              >
                {(isHovered || blinkState) && (
                  <motion.div
                    className="absolute top-1/2 left-1/2 w-14  h-14 bg-green-500 rounded-full blur-xl opacity-0"
                    style={{ transform: "translate(-50%, -50%)" }}
                    animate={{ opacity: [0, 0.5, 0.8] }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                )}
                <img
                  src={Ufo}
                  alt="Ufo"
                  width={isMobile ? 63 : 75}
                  height={isMobile ? 63 : 75}
                  className="relative z-[110]"
                />
              </motion.button>
            </motion.div>
          </div>
        </div>

        {isOpen && (
          <div>
            {/* blur effect */}
            <div
              className="fixed top-0 left-0 w-screen h-screen z-[90]"
              style={{
                background: "rgba(255, 255, 255, 0.01)",
                backdropFilter: "blur(13px)",
                WebkitBackdropFilter: "blur(13px)",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              }}
            />

            <div
              ref={dropdownRef}
              className="fixed top-0 left-0 w-full h-full z-[90] overflow-hidden font-Orbitron font-black "
            >
              <svg
                ref={triangleRef}
                viewBox={`0 0 639 885`}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute md:w-auto w-[150%] "
                preserveAspectRatio="xMaxYMin"
                style={{
                  left: `${ufoPosition.x}px`,
                  top: `${ufoPosition.y}px`,
                  //translate: "translate(-50%,0)",
                  maxHeight: "100vh",
                }}
              >
                <g filter="url(#shadow)">
                  <path
                    d="M630.76 0.247004L557.002 1055.58L0.405187 885.415L630.76 0.247004Z"
                    fill="#23CF51"
                  />
                </g>

                {headerEntries.map(
                  (
                    link,
                    index, //text
                  ) => (
                    <text
                      fontSize={
                        isMobile
                          ? index !== 0
                            ? index == 1
                              ? 64
                              : index == 2
                                ? 64
                                : index == 3
                                  ? 34 + 32 * (globalThis.innerWidth / 431)
                                  : index == 4
                                    ? 34 + 32 * (globalThis.innerWidth / 431)
                                    : 0
                            : 55 //tablet
                          : isTablet
                            ? index !== 0
                              ? index == 1
                                ? 64
                                : index == 2
                                  ? 74
                                  : index == 3
                                    ? 84
                                    : index == 4
                                      ? 92
                                      : 0
                              : 55 //tablet
                            : index !== 0
                              ? index == 1
                                ? 70
                                : index == 2
                                  ? 76
                                  : index == 3
                                    ? 84
                                    : index == 4
                                      ? 94
                                      : 0
                              : 59 //desktop
                      }
                      fill="#FFFFFF"
                      key={index}
                      x={
                        isMobile
                          ? index !== 0
                            ? index == 1
                              ? 400
                              : index == 2
                                ? 290
                                : index == 3
                                  ? 335 - 85 * (globalThis.innerWidth / 431)
                                  : index == 4
                                    ? 335 - 85 * (globalThis.innerWidth / 431)
                                    : 0
                            : 499
                          : //mobile
                            isTablet
                            ? index !== 0
                              ? index == 1
                                ? 400
                                : index == 2
                                  ? 300
                                  : index == 3
                                    ? 178
                                    : index == 4
                                      ? 110
                                      : 0
                              : 499
                            : //tablet
                              index !== 0
                              ? index == 1
                                ? 390
                                : index == 2
                                  ? 300
                                  : index == 3
                                    ? 178
                                    : index == 4
                                      ? 100
                                      : 0
                              : 490 //desktop
                      }
                      y={
                        isMobile
                          ? index * 150 + 225 //mobile
                          : isTablet
                            ? index * 150 + 225 //tablet
                            : index * 150 + 240 //desktop
                      }
                      className=" text-center"
                      style={{
                        transition: "transform 0.2s ease", // Smooth transition for scaling
                        cursor: "pointer", // Change cursor to pointer on hover
                        transformOrigin: "bottom",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(0.985)"; // Scale down to 90% on hover
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)"; // Reset to original size on mouse leave
                      }}
                    >
                      <Link
                        className="fill-white"
                        to={link.pathname}
                        params={{}}
                        onClick={() => toggleDropdown()}
                      >
                        {link.title}
                      </Link>
                    </text>
                  ),
                )}
                <defs>
                  <filter
                    id="shadow"
                    x="0.405151"
                    y="0.247009"
                    width="638.355"
                    height="1063.34"
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
                      result="effect1_dropShadow_121_8"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_121_8"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export { HeaderAdmin, HeaderNormal };
