import { useEffect, useRef, useState } from "react";

import { createFileRoute } from "@tanstack/react-router";

import { Button } from "~/lib/components/ui/button";

import Controller, { ControllerRef } from "~/lib/components/wrapper/admin/controller/Controller";
import { useSocketIO } from "~/lib/components/wrapper/admin/socket-provider";

export const Route = createFileRoute("/(protected)/admin-socket/")({
  component: SocketPage,
  ssr: false,
});

function SocketPage() {
  const { emitEvent } = useSocketIO("http://192.168.119.229:5000");
  const controllerRef = useRef<ControllerRef>(null);
  const [automatic, setAutomatic] = useState(false);

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

        // console.log(x, y);

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

  const sendMove = (x: number, y: number) => emitEvent("control__move", { x, y });
  const sendRotation = (deg: number) => emitEvent("control__rotate", { deg });
  const sendHallo = () => emitEvent("hallo", { message: "Hallo Server!" });

  const setPointPosition = (x: number, y: number) => controllerRef.current?.setPointPosition(x, y, true, true);

  const setCustomAutomatic = (value: boolean) => {
    setAutomatic(value);
    emitEvent("control__automatic", { value });
  };

  return (
    <div className="container p-6">
      <div className="flex flex-col gap-3">
        <div className="flex gap-2 flex-wrap">
          <Button onClick={() => sendMove(0, 0)}>Stopp</Button>
          <Button onClick={() => sendMove(0, -1)}>Vorwärts</Button>
          <Button onClick={() => sendMove(0, 1)}>Rückwärts</Button>
          <Button onClick={() => sendMove(1, 0)}>Rechts</Button>
          <Button onClick={() => sendMove(-1, 0)}>Links</Button>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button onClick={() => sendRotation(90)}>Drehen 90°</Button>
          <Button onClick={() => sendRotation(-90)}>Drehen -90°</Button>
        </div>

        <div>
          <Button onClick={sendHallo}>Hallo</Button>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/*
          <Label>Automation</Label>
          <Switch
            checked={automatic}
            onCheckedChange={setCustomAutomatic}
          >
          </Switch>
          */}
          <label>
            Automation
            <input
              type="checkbox"
              checked={automatic}
              onChange={(e) => setCustomAutomatic(e.target.checked)}
            />
          </label>
        </div>

        <div className="h-[60vh] w-[60vw] bg-violet-400">
          <Controller ref={controllerRef} onValueChange={sendMove} />
        </div>
      </div>
    </div>
  );
}
