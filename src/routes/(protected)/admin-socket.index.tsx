import { useEffect, useRef, useState } from "react";

import { createFileRoute } from "@tanstack/react-router";

import { useSocketIO } from "~/lib/components/wrapper/admin/socket-provider";
import { useDebouncedCallback } from "use-debounce";

import Controller, { ControllerRef } from "~/lib/components/wrapper/admin/controller/Controller";
import { Button } from "~/lib/components/ui/button";
import { Input } from "~/lib/components/ui/input";
import { Label } from "~/lib/components/ui/label";
import { Switch } from "~/lib/components/ui/switch";

export const Route = createFileRoute("/(protected)/admin-socket/")({
  component: SocketPage,
  ssr: false,
});

function SocketPage() {
  const [socketUrl, setSocketUrl] = useState("http://192.168.119.229:5000")
  const { emitEvent, isConnected, lastError } = useSocketIO(socketUrl);
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
  const sendTogglePan = (value: boolean) => emitEvent("control__pan", { value: value ? "open" : "close" });
  const sendDrop = () => emitEvent("control__drop", {});

  const sendToggleMagnet = (value: boolean) => emitEvent("control__magnet", { value });
  const sendMagnetMoveUpUntilStop = () => emitEvent("control__magnet", { direction: "up", value: null, upUntilStop: true, stop: false });
  const sendMagnetMoveDownUntilStop = () => emitEvent("control__magnet", { direction: "down", value: null, upUntilStop: true, stop: false });
  const sendMagnetMoveStop = () => emitEvent("control__magnet", { direction: "stop", value: null, upUntilStop: false, stop: true });

  const setPointPosition = (x: number, y: number) => controllerRef.current?.setPointPosition(x, y, true, true);

  const setCustomAutomatic = (value: boolean) => {
    setAutomatic(value);
    emitEvent("control__automatic", { value });
  };

  const setSocketUrlDebounce = useDebouncedCallback((url: string) => setSocketUrl(url), 300, {
    maxWait: 1500,
  });

  return (
    <div className="container p-6">
      <div className="flex flex-col gap-3">

        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">
            Admin Panel
          </h1>
          <p className="flex gap-2">
            <span className="font-bold">Connected:</span> {String(isConnected)}
            {lastError && <>
              <span className="text-muted-foreground">
                &nbsp;|&nbsp;
              </span>
              <p className="text-red-500">{String(lastError)}</p>
            </>}
          </p>
          <Input defaultValue={socketUrl} onChange={(e) => setSocketUrlDebounce(e.target.value)} placeholder="Socket URL" />
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button onClick={sendHallo}>Hallo</Button>
          <div className="flex items-center space-x-2">
            <Switch id="ele-automation-toggle" onCheckedChange={setCustomAutomatic} checked={automatic} />
            <Label htmlFor="ele-automation-toggle">
              Toggle Automation
            </Label>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button onClick={() => sendMove(0, 0)}>Stopp 🔴</Button>
          <Button onClick={() => sendMove(0, -1)}>Vorwärts ⬆️</Button>
          <Button onClick={() => sendMove(0, 1)}>Rückwärts ⬇️</Button>
          <Button onClick={() => sendMove(1, 0)}>Rechts ⬇️</Button>
          <Button onClick={() => sendMove(-1, 0)}>Links ⬅️</Button>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button onClick={() => sendRotation(-90)}>Drehen -90° ⏮️</Button>
          <Button onClick={() => sendRotation(90)}>Drehen 90° ⏭️</Button>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button onClick={() => sendTogglePan(true)}>Pfanne öffnen</Button>
          <Button onClick={() => sendTogglePan(false)}>Pfanne schliessen</Button>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button onClick={() => sendDrop()}>Abwerfen 🔽</Button>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button onClick={() => sendToggleMagnet(true)}>Magnet an 🟢</Button>
          <Button onClick={() => sendToggleMagnet(false)}>Magnet aus 🔴</Button>

          <span className="text-muted-foreground">
            &nbsp;|&nbsp;
          </span>

          <Button onClick={() => sendMagnetMoveUpUntilStop()}>Magnet hoch ⬆️</Button>
          <Button onClick={() => sendMagnetMoveDownUntilStop()}>Magnet runter ⬇️</Button>

          <span className="text-muted-foreground">
            &nbsp;|&nbsp;
          </span>

          <Button onClick={() => sendMagnetMoveStop()}>Magnet-Bewegung stoppen 🔴</Button>

          <span className="text-muted-foreground">
            &nbsp;|&nbsp;
          </span>

          <Button variant="secondary" onMouseDown={() => sendMagnetMoveUpUntilStop()} onMouseUp={() => sendMagnetMoveStop()}>Magnet hoch (hold) ⬆️</Button>
          <Button variant="secondary" onMouseDown={() => sendMagnetMoveDownUntilStop()} onMouseUp={() => sendMagnetMoveStop()}>Magnet runter (hold) ⬇️</Button>
        </div>

        <div className="h-[50vh] w-[50vw] bg-violet-400">
          <Controller ref={controllerRef} onValueChange={sendMove} />
        </div>
      </div>
    </div>
  );
}
