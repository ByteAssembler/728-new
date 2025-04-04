"use client";

import type React from "react";

import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export function DropperAnimation() {
  const { scene, animations } = useGLTF("/dropperAnimation.glb");
  const { actions } = useAnimations(animations, scene);
  const groupRef = useRef<THREE.Group>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previousMousePosition, setPreviousMousePosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: -Math.PI / 4, y: 0, z: 0 });
  const [modelOffset, setModelOffset] = useState({ x: 0, y: 0, z: 0 });
  const { size, viewport, gl } = useThree();
  const aspect = size.width / viewport.width;
  const isMobile = useMediaQuery("(max-width: 767px)");
  // Update cursor style based on dragging state (only on desktop)
  useEffect(() => {
    if (!isMobile) {
      if (isDragging) {
        gl.domElement.style.cursor = "grabbing";
      } else {
        gl.domElement.style.cursor = "grab";
      }
    }

    return () => {
      gl.domElement.style.cursor = "auto";
    };
  }, [isDragging, gl.domElement, isMobile]);

  // Play all animations
  useEffect(() => {
    if (actions) {
      const actionKeys = Object.keys(actions);
      actionKeys.forEach((key) => {
        if (actions[key]) {
          actions[key].reset().play();
        }
      });
    }
  }, [actions]);

  // Calculate the center offset of the model
  useEffect(() => {
    if (scene) {
      // Create a bounding box to calculate the model's dimensions
      const box = new THREE.Box3().setFromObject(scene);
      const center = new THREE.Vector3();
      box.getCenter(center);

      // Store the offset in state instead of directly mutating the scene
      setModelOffset({
        x: -center.x,
        y: -center.y,
        z: -center.z,
      });

      console.log("Model centered with offset:", -center.x, -center.y, -center.z);
    }
  }, [scene]);

  // Handle pointer down event (only on desktop)
  const handlePointerDown = (e: React.PointerEvent) => {
    if (isMobile) return;

    e.stopPropagation();
    setIsDragging(true);
    setPreviousMousePosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  // Handle pointer up event (only on desktop)
  const handlePointerUp = () => {
    if (isMobile) return;

    setIsDragging(false);
  };

  // Handle pointer move event (only on desktop)
  const handlePointerMove = (e: PointerEvent) => {
    if (isMobile) return;

    if (isDragging) {
      const deltaMove = {
        x: e.clientX - previousMousePosition.x,
        y: e.clientY - previousMousePosition.y,
      };

      // Calculate rotation based on mouse movement
      const deltaRotationY = deltaMove.x / 100;
      const deltaRotationX = deltaMove.y / 100;

      setRotation({
        x: rotation.x - deltaRotationX,
        y: rotation.y - deltaRotationY, // Changed from + to - to reverse the direction
        z: rotation.z,
      });

      setPreviousMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    }
  };

  // Add and remove event listeners (only on desktop)
  useEffect(() => {
    if (!isMobile) {
      document.addEventListener("pointerup", handlePointerUp);
      document.addEventListener("pointermove", handlePointerMove);

      return () => {
        document.removeEventListener("pointerup", handlePointerUp);
        document.removeEventListener("pointermove", handlePointerMove);
      };
    }
  }, [isDragging, previousMousePosition, rotation, isMobile]);

  // Continuous rotation for mobile devices
  useFrame((_, delta) => {
    if (isMobile && groupRef.current) {
      // Rotate continuously on mobile
      setRotation((prev) => ({
        x: prev.x,
        y: prev.y + delta * 0.5, // Adjust the rotation speed as needed
        z: prev.z,
      }));

      // Apply the rotation directly to the group
      groupRef.current.rotation.x = rotation.x;
      groupRef.current.rotation.y = rotation.y;
      groupRef.current.rotation.z = rotation.z;
    }
  });

  if (!scene) return null;

  return (
    <group
      ref={groupRef}
      rotation={[rotation.x, rotation.y, rotation.z]}
      onPointerDown={handlePointerDown}
    >
      <primitive
        object={scene}
        scale={10}
        position={[modelOffset.x, modelOffset.y, modelOffset.z]}
      />
    </group>
  );
}

export function CraneAnimation() {
  const { scene, animations } = useGLTF("/crane.glb");
  const { actions } = useAnimations(animations, scene);
  const groupRef = useRef<THREE.Group>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previousMousePosition, setPreviousMousePosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: -Math.PI / 4, y: 0, z: 0 });
  const [modelOffset, setModelOffset] = useState({ x: 0, y: 0, z: 0 });
  const { size, viewport, gl } = useThree();
  const aspect = size.width / viewport.width;
  const isMobile = useMediaQuery("(max-width: 767px)");
  // Update cursor style based on dragging state (only on desktop)
  useEffect(() => {
    if (!isMobile) {
      if (isDragging) {
        gl.domElement.style.cursor = "grabbing";
      } else {
        gl.domElement.style.cursor = "grab";
      }
    }

    return () => {
      gl.domElement.style.cursor = "auto";
    };
  }, [isDragging, gl.domElement, isMobile]);

  // Play all animations
  useEffect(() => {
    if (actions) {
      const actionKeys = Object.keys(actions);
      actionKeys.forEach((key) => {
        if (actions[key]) {
          actions[key].reset().play();
        }
      });
    }
  }, [actions]);

  // Calculate the center offset of the model
  useEffect(() => {
    if (scene) {
      // Create a bounding box to calculate the model's dimensions
      const box = new THREE.Box3().setFromObject(scene);
      const center = new THREE.Vector3();
      box.getCenter(center);

      // Store the offset in state instead of directly mutating the scene
      setModelOffset({
        x: -center.x,
        y: -center.y,
        z: -center.z,
      });

      console.log("Model centered with offset:", -center.x, -center.y, -center.z);
    }
  }, [scene]);

  // Handle pointer down event (only on desktop)
  const handlePointerDown = (e: React.PointerEvent) => {
    if (isMobile) return;

    e.stopPropagation();
    setIsDragging(true);
    setPreviousMousePosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  // Handle pointer up event (only on desktop)
  const handlePointerUp = () => {
    if (isMobile) return;

    setIsDragging(false);
  };

  // Handle pointer move event (only on desktop)
  const handlePointerMove = (e: PointerEvent) => {
    if (isMobile) return;

    if (isDragging) {
      const deltaMove = {
        x: e.clientX - previousMousePosition.x,
        y: e.clientY - previousMousePosition.y,
      };

      // Calculate rotation based on mouse movement
      const deltaRotationY = deltaMove.x / 100;
      const deltaRotationX = deltaMove.y / 100;

      setRotation({
        x: rotation.x - deltaRotationX,
        y: rotation.y - deltaRotationY, // Changed from + to - to reverse the direction
        z: rotation.z,
      });

      setPreviousMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    }
  };

  // Add and remove event listeners (only on desktop)
  useEffect(() => {
    if (!isMobile) {
      document.addEventListener("pointerup", handlePointerUp);
      document.addEventListener("pointermove", handlePointerMove);

      return () => {
        document.removeEventListener("pointerup", handlePointerUp);
        document.removeEventListener("pointermove", handlePointerMove);
      };
    }
  }, [isDragging, previousMousePosition, rotation, isMobile]);

  // Continuous rotation for mobile devices
  useFrame((_, delta) => {
    if (isMobile && groupRef.current) {
      // Rotate continuously on mobile
      setRotation((prev) => ({
        x: prev.x,
        y: prev.y + delta * 0.5, // Adjust the rotation speed as needed
        z: prev.z,
      }));

      // Apply the rotation directly to the group
      groupRef.current.rotation.x = rotation.x;
      groupRef.current.rotation.y = rotation.y;
      groupRef.current.rotation.z = rotation.z;
    }
  });

  if (!scene) return null;

  return (
    <group
      ref={groupRef}
      rotation={[rotation.x, rotation.y, rotation.z]}
      onPointerDown={handlePointerDown}
    >
      <primitive
        object={scene}
        scale={10}
        position={[modelOffset.x, modelOffset.y, modelOffset.z]}
      />
    </group>
  );
}

export function SensorAnimation() {
  const { scene, animations } = useGLTF("/sensor.glb");
  const { actions } = useAnimations(animations, scene);
  const groupRef = useRef<THREE.Group>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previousMousePosition, setPreviousMousePosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: -Math.PI / 4, y: 0, z: 0 });
  const [modelOffset, setModelOffset] = useState({ x: 0, y: 0, z: 0 });
  const { size, viewport, gl } = useThree();
  const aspect = size.width / viewport.width;
  const isMobile = useMediaQuery("(max-width: 767px)");
  // Update cursor style based on dragging state (only on desktop)
  useEffect(() => {
    if (!isMobile) {
      if (isDragging) {
        gl.domElement.style.cursor = "grabbing";
      } else {
        gl.domElement.style.cursor = "grab";
      }
    }

    return () => {
      gl.domElement.style.cursor = "auto";
    };
  }, [isDragging, gl.domElement, isMobile]);

  // Play all animations
  useEffect(() => {
    if (actions) {
      const actionKeys = Object.keys(actions);
      actionKeys.forEach((key) => {
        if (actions[key]) {
          actions[key].reset().play();
        }
      });
    }
  }, [actions]);

  // Calculate the center offset of the model
  useEffect(() => {
    if (scene) {
      // Create a bounding box to calculate the model's dimensions
      const box = new THREE.Box3().setFromObject(scene);
      const center = new THREE.Vector3();
      box.getCenter(center);

      // Store the offset in state instead of directly mutating the scene
      setModelOffset({
        x: -center.x,
        y: -center.y,
        z: -center.z,
      });

      console.log("Model centered with offset:", -center.x, -center.y, -center.z);
    }
  }, [scene]);

  // Handle pointer down event (only on desktop)
  const handlePointerDown = (e: React.PointerEvent) => {
    if (isMobile) return;

    e.stopPropagation();
    setIsDragging(true);
    setPreviousMousePosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  // Handle pointer up event (only on desktop)
  const handlePointerUp = () => {
    if (isMobile) return;

    setIsDragging(false);
  };

  // Handle pointer move event (only on desktop)
  const handlePointerMove = (e: PointerEvent) => {
    if (isMobile) return;

    if (isDragging) {
      const deltaMove = {
        x: e.clientX - previousMousePosition.x,
        y: e.clientY - previousMousePosition.y,
      };

      // Calculate rotation based on mouse movement
      const deltaRotationY = deltaMove.x / 100;
      const deltaRotationX = deltaMove.y / 100;

      setRotation({
        x: rotation.x - deltaRotationX,
        y: rotation.y - deltaRotationY, // Changed from + to - to reverse the direction
        z: rotation.z,
      });

      setPreviousMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    }
  };

  // Add and remove event listeners (only on desktop)
  useEffect(() => {
    if (!isMobile) {
      document.addEventListener("pointerup", handlePointerUp);
      document.addEventListener("pointermove", handlePointerMove);

      return () => {
        document.removeEventListener("pointerup", handlePointerUp);
        document.removeEventListener("pointermove", handlePointerMove);
      };
    }
  }, [isDragging, previousMousePosition, rotation, isMobile]);

  // Continuous rotation for mobile devices
  useFrame((_, delta) => {
    if (isMobile && groupRef.current) {
      // Rotate continuously on mobile
      setRotation((prev) => ({
        x: prev.x,
        y: prev.y + delta * 0.5, // Adjust the rotation speed as needed
        z: prev.z,
      }));

      // Apply the rotation directly to the group
      groupRef.current.rotation.x = rotation.x;
      groupRef.current.rotation.y = rotation.y;
      groupRef.current.rotation.z = rotation.z;
    }
  });

  if (!scene) return null;

  return (
    <group
      ref={groupRef}
      rotation={[rotation.x, rotation.y, rotation.z]}
      onPointerDown={handlePointerDown}
    >
      <primitive
        object={scene}
        scale={window.innerWidth < 769 ? 0.04 : 0.07}
        position={[modelOffset.x, modelOffset.y, modelOffset.z]}
      />
    </group>
  );
}

export function RaspberryAnimation() {
  const { scene, animations } = useGLTF("/raspberry.glb");
  const { actions } = useAnimations(animations, scene);
  const groupRef = useRef<THREE.Group>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previousMousePosition, setPreviousMousePosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: -Math.PI / 4, y: 0, z: 0 });
  const [modelOffset, setModelOffset] = useState({ x: 0, y: 0, z: 0 });
  const { size, viewport, gl } = useThree();
  const aspect = size.width / viewport.width;
  const isMobile = useMediaQuery("(max-width: 767px)");
  // Update cursor style based on dragging state (only on desktop)
  useEffect(() => {
    if (!isMobile) {
      if (isDragging) {
        gl.domElement.style.cursor = "grabbing";
      } else {
        gl.domElement.style.cursor = "grab";
      }
    }

    return () => {
      gl.domElement.style.cursor = "auto";
    };
  }, [isDragging, gl.domElement, isMobile]);

  // Play all animations
  useEffect(() => {
    if (actions) {
      const actionKeys = Object.keys(actions);
      actionKeys.forEach((key) => {
        if (actions[key]) {
          actions[key].reset().play();
        }
      });
    }
  }, [actions]);

  // Calculate the center offset of the model
  useEffect(() => {
    if (scene) {
      // Create a bounding box to calculate the model's dimensions
      const box = new THREE.Box3().setFromObject(scene);
      const center = new THREE.Vector3();
      box.getCenter(center);

      // Store the offset in state instead of directly mutating the scene
      setModelOffset({
        x: -center.x,
        y: -center.y,
        z: -center.z,
      });

      console.log("Model centered with offset:", -center.x, -center.y, -center.z);
    }
  }, [scene]);

  // Handle pointer down event (only on desktop)
  const handlePointerDown = (e: React.PointerEvent) => {
    if (isMobile) return;

    e.stopPropagation();
    setIsDragging(true);
    setPreviousMousePosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  // Handle pointer up event (only on desktop)
  const handlePointerUp = () => {
    if (isMobile) return;

    setIsDragging(false);
  };

  // Handle pointer move event (only on desktop)
  const handlePointerMove = (e: PointerEvent) => {
    if (isMobile) return;

    if (isDragging) {
      const deltaMove = {
        x: e.clientX - previousMousePosition.x,
        y: e.clientY - previousMousePosition.y,
      };

      // Calculate rotation based on mouse movement
      const deltaRotationY = deltaMove.x / 100;
      const deltaRotationX = deltaMove.y / 100;

      setRotation({
        x: rotation.x - deltaRotationX,
        y: rotation.y - deltaRotationY, // Changed from + to - to reverse the direction
        z: rotation.z,
      });

      setPreviousMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    }
  };

  // Add and remove event listeners (only on desktop)
  useEffect(() => {
    if (!isMobile) {
      document.addEventListener("pointerup", handlePointerUp);
      document.addEventListener("pointermove", handlePointerMove);

      return () => {
        document.removeEventListener("pointerup", handlePointerUp);
        document.removeEventListener("pointermove", handlePointerMove);
      };
    }
  }, [isDragging, previousMousePosition, rotation, isMobile]);

  // Continuous rotation for mobile devices
  useFrame((_, delta) => {
    if (isMobile && groupRef.current) {
      // Rotate continuously on mobile
      setRotation((prev) => ({
        x: prev.x,
        y: prev.y + delta * 0.5, // Adjust the rotation speed as needed
        z: prev.z,
      }));

      // Apply the rotation directly to the group
      groupRef.current.rotation.x = rotation.x;
      groupRef.current.rotation.y = rotation.y;
      groupRef.current.rotation.z = rotation.z;
    }
  });

  if (!scene) return null;

  return (
    <group
      ref={groupRef}
      rotation={[rotation.x, rotation.y, rotation.z]}
      onPointerDown={handlePointerDown}
    >
      <primitive
        object={scene}
        scale={window.innerWidth < 769 ? 0.015 : 0.02}
        position={[modelOffset.x, modelOffset.y, modelOffset.z]}
      />
    </group>
  );
}

export function WheelsAnimation() {
  const { scene, animations } = useGLTF("/wheels.glb");
  const { actions } = useAnimations(animations, scene);
  const groupRef = useRef<THREE.Group>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previousMousePosition, setPreviousMousePosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: -Math.PI / 4, y: 0, z: 0 });
  const [modelOffset, setModelOffset] = useState({ x: 0, y: 0, z: 0 });
  const { size, viewport, gl } = useThree();
  const aspect = size.width / viewport.width;
  const isMobile = useMediaQuery("(max-width: 767px)");
  // Update cursor style based on dragging state (only on desktop)
  useEffect(() => {
    if (!isMobile) {
      if (isDragging) {
        gl.domElement.style.cursor = "grabbing";
      } else {
        gl.domElement.style.cursor = "grab";
      }
    }

    return () => {
      gl.domElement.style.cursor = "auto";
    };
  }, [isDragging, gl.domElement, isMobile]);

  // Play all animations
  useEffect(() => {
    if (actions) {
      const actionKeys = Object.keys(actions);
      actionKeys.forEach((key) => {
        if (actions[key]) {
          actions[key].reset().play();
        }
      });
    }
  }, [actions]);

  // Calculate the center offset of the model
  useEffect(() => {
    if (scene) {
      // Create a bounding box to calculate the model's dimensions
      const box = new THREE.Box3().setFromObject(scene);
      const center = new THREE.Vector3();
      box.getCenter(center);

      // Store the offset in state instead of directly mutating the scene
      setModelOffset({
        x: -center.x,
        y: -center.y,
        z: -center.z,
      });

      console.log("Model centered with offset:", -center.x, -center.y, -center.z);
    }
  }, [scene]);

  // Handle pointer down event (only on desktop)
  const handlePointerDown = (e: React.PointerEvent) => {
    if (isMobile) return;

    e.stopPropagation();
    setIsDragging(true);
    setPreviousMousePosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  // Handle pointer up event (only on desktop)
  const handlePointerUp = () => {
    if (isMobile) return;

    setIsDragging(false);
  };

  // Handle pointer move event (only on desktop)
  const handlePointerMove = (e: PointerEvent) => {
    if (isMobile) return;

    if (isDragging) {
      const deltaMove = {
        x: e.clientX - previousMousePosition.x,
        y: e.clientY - previousMousePosition.y,
      };

      // Calculate rotation based on mouse movement
      const deltaRotationY = deltaMove.x / 100;
      const deltaRotationX = deltaMove.y / 100;

      setRotation({
        x: rotation.x - deltaRotationX,
        y: rotation.y - deltaRotationY, // Changed from + to - to reverse the direction
        z: rotation.z,
      });

      setPreviousMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    }
  };

  // Add and remove event listeners (only on desktop)
  useEffect(() => {
    if (!isMobile) {
      document.addEventListener("pointerup", handlePointerUp);
      document.addEventListener("pointermove", handlePointerMove);

      return () => {
        document.removeEventListener("pointerup", handlePointerUp);
        document.removeEventListener("pointermove", handlePointerMove);
      };
    }
  }, [isDragging, previousMousePosition, rotation, isMobile]);

  // Continuous rotation for mobile devices
  useFrame((_, delta) => {
    if (isMobile && groupRef.current) {
      // Rotate continuously on mobile
      setRotation((prev) => ({
        x: prev.x,
        y: prev.y + delta * 0.5, // Adjust the rotation speed as needed
        z: prev.z,
      }));

      // Apply the rotation directly to the group
      groupRef.current.rotation.x = rotation.x;
      groupRef.current.rotation.y = rotation.y;
      groupRef.current.rotation.z = rotation.z;
    }
  });

  if (!scene) return null;

  return (
    <group
      ref={groupRef}
      rotation={[rotation.x, rotation.y, rotation.z]}
      onPointerDown={handlePointerDown}
    >
      <primitive
        object={scene}
        scale={13}
        position={[modelOffset.x, modelOffset.y, modelOffset.z]}
      />
    </group>
  );
}
