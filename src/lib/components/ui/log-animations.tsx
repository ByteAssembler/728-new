"use client";

import type React from "react";

import {
  ArrowDown,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Layers,
  RotateCcw,
  X,
} from "lucide-react";
import { AnimatePresence, motion, useAnimation, type Variants } from "motion/react";
import { useEffect, useRef, useState } from "react";
import cow from "~/assets/cow.png";
import triangle from "~/assets/ufoBeam.png";
import ufo from "~/assets/ufoStraight.png";

type AnimationType = "right" | "left" | "top" | "bottom" | "drop" | "pickUp" | "idle";

// Animation variants for each PN
const mainPngVariants: Variants = {
  idle: {
    x: 0,
    y: 0,
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
  right: {
    x: 150,
    y: 0,
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
  left: {
    x: -150,
    y: 0,
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
  top: {
    x: 0,
    y: -150,
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
  bottom: {
    x: 0,
    y: 150,
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
  dropStart: {
    x: 0,
    y: -40, // Moved up to make room for the triangle
    scale: 1.1,
    rotate: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  dropEnd: {
    x: 0,
    y: -40,
    scale: 1.1,
    rotate: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  pickUpStart: {
    x: 0,
    y: -40, // Moved up to make room for the triangle
    scale: 1.05,
    rotate: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  pickUpEnd: {
    x: 0,
    y: 0,
    scale: 1.1,
    rotate: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
    },
  },
};

const secondaryPngVariants: Variants = {
  hidden: {
    x: 0,
    y: 0,
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.3,
    },
  },
  dropStart: {
    x: 0,
    y: 80, // Adjusted for larger triangle
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
      delay: 0.2,
    },
  },
  dropEnd: {
    x: 0,
    y: 50, // Adjusted for larger triangle
    opacity: 0, // Triangle disappears at the end
    scale: 1,
    transition: {
      duration: 0.5,
      delay: 0.8,
    },
  },
  // For pickUp animation - beam effect
  pickUpBeamStart: {
    x: 0,
    y: 0,
    opacity: 0,
    scaleY: 0,
    scaleX: 1,
    transformOrigin: "top",
    transition: {
      duration: 0.1,
    },
  },
  pickUpBeamExtend: {
    x: 0,
    y: 125, // Position to connect UFO and cow
    opacity: 1,
    scaleY: 1.05,
    scaleX: 1,
    transformOrigin: "top",
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  pickUpBeamEnd: {
    x: 0,
    y: 80,
    opacity: 0,
    scaleY: 1,
    scaleX: 1,
    transformOrigin: "top",
    transition: {
      duration: 0.4,
      delay: 1.2,
    },
  },
};

const tertiaryPngVariants: Variants = {
  hidden: {
    x: 0,
    y: 0,
    opacity: 0,
    scale: 0.5,
    transition: {
      duration: 0.3,
    },
  },
  dropStart: {
    x: 0,
    y: 0,
    opacity: 0,
    scale: 0.5,
    transition: {
      duration: 0.3,
    },
  },
  dropMiddle: {
    x: 0,
    y: 0,
    opacity: 1,
    scale: 0.8,
    transition: {
      duration: 0.3,
      delay: 0.5,
    },
  },
  dropMoveDown1: {
    x: 0,
    y: 50,
    opacity: 1,
    scale: 0.8,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: 0.2,
    },
  },
  dropMoveDown2: {
    x: 0,
    y: 120, // Adjusted for larger triangle
    opacity: 1,
    scale: 0.8,
    transition: {
      duration: 0.6,
      ease: "easeIn",
    },
  },
  // For pickUp animation - cow appears from UFO
  pickUpSpawnFromUfo: {
    x: 0,
    y: 120, // Start inside the UFO
    opacity: 0,
    scale: 0.3,
    transition: {
      duration: 0.01,
    },
  },
  pickUpMoveDown: {
    x: 0,
    y: 120, // Move down to final position
    opacity: 1,
    scale: 0.8,
    transition: {
      type: "tween",
      duration: 0.6,
      ease: "easeOut",
      delay: 0.3,
    },
  },
  pickUpFloatUp: {
    x: 0,
    y: -20, // Float back up into the UFO
    opacity: 1,
    scale: 0.7,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
      delay: 1.2,
    },
  },
  pickUpEnd: {
    x: 0,
    y: -20,
    opacity: 0,
    scale: 0.5,
    transition: {
      duration: 0.3,
      delay: 0.2,
    },
  },
};

// Simple button component for React without shadcn
const Button = ({
  variant = "outline",
  size = "default",
  onClick,
  disabled,
  className = "",
  children,
}: {
  variant?: "default" | "outline" | "destructive" | "secondary";
  size?: "default" | "sm";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variantClasses = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 bg-transparent hover:bg-gray-100",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
  };

  const sizeClasses = {
    default: "h-10 py-2 px-4",
    sm: "h-8 px-3 text-sm",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default function FramerAnimatedPngs() {
  const [currentAnimation, setCurrentAnimation] = useState<AnimationType>("idle");
  const [isAnimating, setIsAnimating] = useState(false);
  const [showCancelButton, setShowCancelButton] = useState(false);
  // Track the current position of the main PNG
  const [mainPosition, setMainPosition] = useState({ x: 0, y: 0, scale: 1 });

  const mainControls = useAnimation();
  const secondaryControls = useAnimation();
  const tertiaryControls = useAnimation();
  const animationTimeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const animationSequenceRef = useRef<(() => void) | null>(null);

  // Cleanup function for animation timeouts
  useEffect(() => {
    return () => {
      // Clear all timeouts when component unmounts
      animationTimeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
    };
  }, []);

  // Cancel all ongoing animations
  const cancelAnimations = () => {
    // Stop all animation controls immediately
    mainControls.stop();
    secondaryControls.stop();
    tertiaryControls.stop();

    // Clear all pending timeouts
    animationTimeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
    animationTimeoutsRef.current = [];

    // Clear the animation sequence callback
    if (animationSequenceRef.current) {
      animationSequenceRef.current();
      animationSequenceRef.current = null;
    }

    setIsAnimating(false);
    setShowCancelButton(false);

    // Smoothly transition to the current position
    mainControls.start({
      x: mainPosition.x,
      y: mainPosition.y,
      scale: 1,
      transition: { type: "spring", stiffness: 200, damping: 20 },
    });

    // Hide secondary elements
    secondaryControls.start(secondaryPngVariants.hidden);
    tertiaryControls.start(tertiaryPngVariants.hidden);
  };

  // Run the drop animation sequence with proper cancellation support
  const runDropAnimation = async () => {
    setIsAnimating(true);
    setShowCancelButton(true);

    // Clear any existing animation timeouts
    animationTimeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
    animationTimeoutsRef.current = [];

    // Create a cancellation token
    let isCancelled = false;
    animationSequenceRef.current = () => {
      isCancelled = true;
    };

    // Reset positions if coming from another animation
    if (currentAnimation !== "idle") {
      await Promise.all([
        mainControls.start(mainPngVariants.idle),
        secondaryControls.start(secondaryPngVariants.hidden),
        tertiaryControls.start(tertiaryPngVariants.hidden),
      ]);

      // Update position state
      setMainPosition({ x: 0, y: 0, scale: 1 });

      // Check if cancelled during reset
      if (isCancelled) return;
    }

    // Start the drop animation sequence
    await Promise.all([
      mainControls.start(mainPngVariants.dropStart),
      secondaryControls.start(secondaryPngVariants.dropStart),
    ]);

    // Update position state
    setMainPosition({ x: 0, y: -40, scale: 1.1 });

    // Check if cancelled after first step
    if (isCancelled) return;

    await tertiaryControls.start(tertiaryPngVariants.dropMiddle);
    if (isCancelled) return;

    await tertiaryControls.start(tertiaryPngVariants.dropMoveDown1);
    if (isCancelled) return;

    await tertiaryControls.start(tertiaryPngVariants.dropMoveDown2);
    if (isCancelled) return;

    // Triangle disappears at the end
    await secondaryControls.start(secondaryPngVariants.dropEnd);
    if (isCancelled) return;

    // Animation completed successfully
    setIsAnimating(false);
    setShowCancelButton(false);
    animationSequenceRef.current = null;
  };

  // Run the pickUp animation sequence (opposite of drop)
  const runPickUpAnimation = async () => {
    setIsAnimating(true);
    setShowCancelButton(true);

    // Clear any existing animation timeouts
    animationTimeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
    animationTimeoutsRef.current = [];

    // Create a cancellation token
    let isCancelled = false;
    animationSequenceRef.current = () => {
      isCancelled = true;
    };

    // Reset positions if coming from another animation
    if (currentAnimation !== "idle") {
      await Promise.all([
        mainControls.start(mainPngVariants.idle),
        secondaryControls.start(secondaryPngVariants.hidden),
        tertiaryControls.start(tertiaryPngVariants.hidden),
      ]);

      // Update position state
      setMainPosition({ x: 0, y: 0, scale: 1 });

      // Check if cancelled during reset
      if (isCancelled) return;
    }

    // 1. Main UFO slightly scales up and moves up
    await mainControls.start(mainPngVariants.pickUpStart);
    if (isCancelled) return;

    // 2. Cow appears from inside the UFO
    await tertiaryControls.start(tertiaryPngVariants.pickUpSpawnFromUfo);
    if (isCancelled) return;

    // 3. Cow moves down
    await tertiaryControls.start(tertiaryPngVariants.pickUpMoveDown);
    if (isCancelled) return;

    // 4. Triangle beam extends from UFO to cow
    await secondaryControls.start(secondaryPngVariants.pickUpBeamStart);
    if (isCancelled) return;

    await secondaryControls.start(secondaryPngVariants.pickUpBeamExtend);
    if (isCancelled) return;

    // 5. Cow floats back up into the UFO
    await tertiaryControls.start(tertiaryPngVariants.pickUpFloatUp);
    if (isCancelled) return;

    // 6. Triangle beam disappears
    await secondaryControls.start(secondaryPngVariants.pickUpBeamEnd);
    if (isCancelled) return;

    // 7. Cow disappears into the UFO
    await tertiaryControls.start(tertiaryPngVariants.pickUpEnd);
    if (isCancelled) return;

    // 8. UFO returns to normal
    await mainControls.start(mainPngVariants.pickUpEnd);
    if (isCancelled) return;

    // Animation completed successfully
    setIsAnimating(false);
    setShowCancelButton(false);
    animationSequenceRef.current = null;
  };

  // Handle animation changes with cancellation support
  const handleAnimationChange = async (animationType: AnimationType) => {
    // If already animating, cancel current animation first
    if (isAnimating) {
      cancelAnimations();

      // Add a small delay to ensure clean transition
      const timeout = setTimeout(() => {
        startNewAnimation(animationType);
      }, 50);

      animationTimeoutsRef.current.push(timeout);
    } else {
      startNewAnimation(animationType);
    }
  };

  // Start a new animation after ensuring previous ones are canceled
  const startNewAnimation = async (animationType: AnimationType) => {
    setCurrentAnimation(animationType);
    setIsAnimating(true);
    setShowCancelButton(true);

    if (animationType === "drop") {
      await runDropAnimation();
    } else if (animationType === "pickUp") {
      await runPickUpAnimation();
    } else if (animationType === "idle") {
      // Reset all animations
      await Promise.all([
        mainControls.start(mainPngVariants.idle),
        secondaryControls.start(secondaryPngVariants.hidden),
        tertiaryControls.start(tertiaryPngVariants.hidden),
      ]);

      // Update position state
      setMainPosition({ x: 0, y: 0, scale: 1 });

      setIsAnimating(false);
      setShowCancelButton(false);
    } else {
      // Handle directional animations
      await Promise.all([
        mainControls.start(mainPngVariants[animationType]),
        secondaryControls.start(secondaryPngVariants.hidden),
        tertiaryControls.start(tertiaryPngVariants.hidden),
      ]);

      // Update position state based on the animation type
      const newPosition = { x: 0, y: 0, scale: 1 };

      switch (animationType) {
        case "right":
          newPosition.x = 150;
          break;
        case "left":
          newPosition.x = -150;
          break;
        case "top":
          newPosition.y = -150;
          break;
        case "bottom":
          newPosition.y = 150;
          break;
      }

      setMainPosition(newPosition);
      setIsAnimating(false);
      setShowCancelButton(false);
    }
  };

  return (
    <div className="relative w-full max-w-2xl h-[500px] bg-gradient-to-b  rounded-xl overflow-hidden shadow-lg">
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Main PNG (UFO) */}
        <motion.div
          className="absolute "
          variants={mainPngVariants}
          animate={mainControls}
          initial="idle"
          whileHover={{ scale: 1.03 }}
        >
          <div className="w-40 h-40 flex items-center justify-center">
            <img src={ufo} alt="UFO" className="w-full h-full object-contain" />
          </div>
        </motion.div>

        {/* Secondary PNG (Triangle) with animation - beam effect for pickUp */}
        <motion.div
          className="absolute z-0"
          variants={secondaryPngVariants}
          animate={secondaryControls}
          initial="hidden"
        >
          <div className="w-40 h-160 flex items-center justify-center">
            <img src={triangle} alt="Triangle" className="w-full h-full object-contain" />
          </div>
        </motion.div>

        {/* Tertiary PNG (Cow) with animation */}
        <motion.div
          className="absolute z-20"
          variants={tertiaryPngVariants}
          animate={tertiaryControls}
          initial="hidden"
          whileHover={{ scale: 1.03 }}
        >
          <div className="w-32 h-32 flex items-center justify-center">
            <img src={cow} alt="Cow" className="w-full h-full object-contain" />
          </div>
        </motion.div>
      </div>

      {/* Cancel Button - Only shows during animation */}
      <AnimatePresence>
        {showCancelButton && (
          <motion.div
            className="absolute top-4 right-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              variant="destructive"
              size="sm"
              onClick={cancelAnimations}
              className="flex items-center gap-1"
            >
              <X className="h-4 w-4" />
              Cancel Animation
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animation Controls */}
      <div className="absolute bottom-4 left-0 right-0 hidden xs:flex justify-center gap-2 flex-wrap px-4 ">
        <Button
          variant={currentAnimation === "right" ? "default" : "outline"}
          onClick={() => handleAnimationChange("right")}
          className="flex items-center gap-1"
        >
          <ChevronRight className="h-4 w-4" />
          Right
        </Button>
        <Button
          variant={currentAnimation === "left" ? "default" : "outline"}
          onClick={() => handleAnimationChange("left")}
          className="flex items-center gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          Left
        </Button>
        <Button
          variant={currentAnimation === "top" ? "default" : "outline"}
          onClick={() => handleAnimationChange("top")}
          className="flex items-center gap-1"
        >
          <ChevronUp className="h-4 w-4" />
          Top
        </Button>
        <Button
          variant={currentAnimation === "bottom" ? "default" : "outline"}
          onClick={() => handleAnimationChange("bottom")}
          className="flex items-center gap-1"
        >
          <ChevronDown className="h-4 w-4" />
          Bottom
        </Button>
        <Button
          variant={currentAnimation === "drop" ? "default" : "outline"}
          onClick={() => handleAnimationChange("drop")}
          className="flex items-center gap-1"
        >
          <Layers className="h-4 w-4" />
          Drop
        </Button>
        <Button
          variant={currentAnimation === "pickUp" ? "default" : "outline"}
          onClick={() => handleAnimationChange("pickUp")}
          className="flex items-center gap-1"
        >
          <ArrowDown className="h-4 w-4" />
          PickUp
        </Button>
        <Button
          variant="secondary"
          onClick={() => handleAnimationChange("idle")}
          className="flex items-center gap-1"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
      </div>
      <p>this is right now a demo for the final log that shows the logs of the car</p>
    </div>
  );
}
