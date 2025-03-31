import { useWindowSize } from "@uidotdev/usehooks";
import { motion, useAnimation } from "motion/react";
import { useEffect, useImperativeHandle, useRef, useState } from "react";

const styles: {
  [key: string]: React.CSSProperties;
} = {
  controllerBackground: {
    // // backgroundColor: "black",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  controllerPoint: {
    backgroundColor: "white",
    borderRadius: "50%",
    position: "absolute",
    top: "50%",
    left: "50%",
    translate: "-50% -50%",
    cursor: "grab",
  },
};

export type ControllerRef = {
  setPointPosition: (x: number, y: number, instant?: boolean, autoSet?: boolean) => void;
};

export type ControllerProps = {
  onValueChange?: (x: number, y: number, executeOnCustomChanges: boolean) => void;
};

const Controller = function Controller(
  { ref, onValueChange }: ControllerProps & { ref?: React.RefObject<ControllerRef | null> },
) {
  useImperativeHandle(ref, () => ({
    setPointPosition,
  }));

  const [circler, setCircler] = useState(false);

  const controllerRef = useRef<HTMLDivElement>(null);
  const pointRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  const transformStyle = { type: "spring", stiffness: 300, damping: 20 };

  const [parentSize, setParentSize] = useState(0);
  const parentRef = useRef<HTMLDivElement>(null);
  const windowSize = useWindowSize();

  function setParentSizeHandler() {
    if (!parentRef.current) return;
    const parentRect = parentRef.current.getBoundingClientRect();
    if (!parentRect) return;

    const parentSize = Math.min(parentRect.width, parentRect.height);
    console.log("parentSize", parentSize);

    setParentSize(parentSize * 0.935);
    setPointPosition(0, 0, true, false);
  }

  useEffect(setParentSizeHandler, [windowSize]);

  function getControllPointSize(size: number) {
    return size / 7.5;
  }

  function onDragHandler() {
    if (!controllerRef.current || !pointRef.current) return;

    const pointTransform = pointRef.current.style.transform;
    if (!pointTransform) return;

    const pointRect = pointRef.current.getBoundingClientRect();
    if (!pointRect) return;

    const controllerRect = controllerRef.current.getBoundingClientRect();
    if (!controllerRect) return;

    let transformX = 0,
      transformY = 0;

    const transformPieces = pointTransform.split(" ");
    const splitBeforeLength = 11; //"translateX(".length;
    for (const piece of transformPieces) {
      if (piece.startsWith("translateX")) {
        transformX = parseFloat(piece.substring(splitBeforeLength, piece.length - 3));
      } else if (piece.startsWith("translateY")) {
        transformY = parseFloat(piece.substring(splitBeforeLength, piece.length - 3));
      }
    }

    const pointSize = Math.min(pointRect.width, pointRect.height);
    const effectiveSize = parentSize / 2 - pointSize / 2;

    const [normalizedX, normalizedY] = calculateAxisValues(
      effectiveSize,
      transformX,
      transformY,
    );

    if (circler) setCircler(false);
    if (onValueChange) onValueChange(normalizedX, normalizedY, false);
  }

  function calculateAxisValues(
    effectiveSize: number,
    transformXValue: number,
    transformYValue: number,
  ): [number, number] {
    const normalizedX = transformXValue / effectiveSize;
    const normalizedY = transformYValue / effectiveSize;
    return [normalizedX, normalizedY];
  }

  const handleDragEnd = () => {
    controls.start({
      x: 0,
      y: 0,
      transition: transformStyle,
    });

    if (circler) setCircler(false);
    if (onValueChange) onValueChange(0, 0, false);
  };

  function setPointPosition(
    normalizedX: number,
    normalizedY: number,
    instant: boolean = true,
    autoSet: boolean = false,
  ) {
    if (!controllerRef.current || !pointRef.current) return;
    if (isNaN(normalizedX) || isNaN(normalizedY)) return;

    const pointRect = pointRef.current.getBoundingClientRect();

    const pointSize = Math.min(pointRect.width, pointRect.height);
    const effectiveSize = parentSize / 2 - pointSize / 2;

    const clampedX = Math.max(-1, Math.min(1, normalizedX));
    const clampedY = Math.max(-1, Math.min(1, normalizedY));

    const posX = clampedX * effectiveSize;
    const posY = clampedY * effectiveSize;

    if (autoSet && !circler) setCircler(true);

    if (instant) {
      /*
        controls.set({
          x: posX,
          y: posY,
        });
        */
      pointRef.current.style.transform = `translate(${posX}px, ${posY}px)`;
    } else {
      controls.start({
        x: posX,
        y: posY,
        transition: transformStyle,
      });
    }

    if (onValueChange) onValueChange(clampedX, clampedY, true);
  }

  return (
    <div ref={parentRef} style={styles.controllerBackground}>
      <style>
        {`
      html, body, #root, main {
      touch-action: none;
      }
      `}
      </style>
      <div
        ref={controllerRef}
        style={{
          position: "relative",
          overflow: "hidden",
          transition: "border-radius 0.35s",
          borderRadius: circler ? parentSize * 0.28 : parentSize * 0.06,
          // backgroundColor: "rgba(0,0,0,.065)",
          backgroundColor: "rgba(0,0,0,.35)",
          width: parentSize,
          height: parentSize,
        }}
      >
        <motion.div
          ref={pointRef}
          drag
          dragConstraints={controllerRef}
          dragElastic={0}
          onDrag={onDragHandler}
          onDragEnd={handleDragEnd}
          animate={controls}
          style={{
            ...styles.controllerPoint,
            width: getControllPointSize(parentSize),
            height: getControllPointSize(parentSize),
          }}
        />
      </div>
    </div>
  );
};

export default Controller;
