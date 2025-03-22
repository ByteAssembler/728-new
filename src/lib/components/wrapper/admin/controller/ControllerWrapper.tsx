import { useEffect, useRef } from "react";
import Controller, { ControllerRef } from "./Controller";

export default function ControllerWrapper() {
  const controllerRef = useRef<ControllerRef>(null);

  useEffect(() => {
    let previousX = 0,
      previousY = 0;
    let animationFrameId: number;

    const updateController = () => {
      const controller = navigator.getGamepads()[0];
      if (controller) {
        let x = Math.floor(controller.axes[0] * 10000) / 10000;
        let y = Math.floor(controller.axes[1] * 10000) / 10000;

        if (x < 0.1 && x > -0.1) x = 0;
        if (y < 0.1 && y > -0.1) y = 0;

        if (previousX !== x || previousY !== y) {
          // console.log("RAW UPPPPPPPDDDDDDDDDAAAAAAAAAAATTTTTTEEEEEEEEEE", x, y);
          setPointPosition(x, y);
          previousX = x;
          previousY = y;
        }
      }
      animationFrameId = requestAnimationFrame(updateController);
    };

    animationFrameId = requestAnimationFrame(updateController);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const setPointPosition = (x: number, y: number) => {
    controllerRef.current?.setPointPosition(x, y, true, true);
  };

  const onValueChange = (x: number, y: number, execute: boolean) => {
    console.log(x, y, execute);
  };

  return <Controller ref={controllerRef} onValueChange={onValueChange} />;
}
