"use client";

import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect } from "react";

export function DropperAnimation() {
  const { scene, animations } = useGLTF("/dropperAnimation.glb"); // Load the GLB
  const { actions } = useAnimations(animations, scene);

  // Play all animations
  useEffect(() => {
    if (actions) {
      const actionKeys = Object.keys(actions);
      actionKeys.forEach((key) => {
        if (actions[key]) {
          actions[key].reset().play(); // Ensure all animations are played
        }
      });
    }
  }, [actions]);

  if (!scene) return null;

  return (
    <primitive
      object={scene}
      scale={10}
      position={[0, 0, 2]}
      rotation={[-Math.PI / 4, 0, 0]}
    />
  );
}
