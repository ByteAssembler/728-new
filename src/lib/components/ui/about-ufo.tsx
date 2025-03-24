"use client";

import { Float, useGLTF } from "@react-three/drei";
import { useEffect, useState } from "react";
import { Color, Mesh, NormalBlending, ShaderMaterial } from "three";

useGLTF.preload("/ufo.glb");

const toonShaderKörper = new ShaderMaterial({
  transparent: true, // Allow transparency
  depthWrite: true, // Important: Prevents z-sorting issues with transparency
  depthTest: true,
  blending: NormalBlending, // Ensures smooth transparency

  uniforms: {
    uColor: { value: new Color(0xffffff) },
    uOpacity: { value: 1.0 },
  },
  vertexShader: `
    varying vec3 vNormal;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,

  fragmentShader: `
    varying vec3 vNormal;
    uniform vec3 uColor;
    uniform float uOpacity; // Add uniform for opacity

    void main() {
        float intensity = dot(vNormal, vec3(0.0, 0.0, 1.0));
        vec3 shadedColor = mix(vec3(0.1, 0.1, 0.1), uColor, step(0.5, intensity));

        gl_FragColor = vec4(shadedColor, uOpacity); // Use smooth transparency
    }
  `,
});

export default function Ufo() {
  const [scale, setScale] = useState(0.06);
  const { nodes } = useGLTF("/scene.glb") as any;
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        // Mobile
        setScale(0.035);
      } else if (width < 1024) {
        // Tablet
        setScale(0.05);
      } else {
        // Desktop
        setScale(0.06);
      }
    };

    handleResize(); // set on mount
    window.addEventListener("resize", handleResize); // update on resize
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Float rotation={[0.2, 0, 0]} speed={3} rotationIntensity={0.2} floatIntensity={1}>
      <group dispose={null}>
        <group rotation={[0, 0, 0]}>
          <group rotation={[Math.PI / 2, 0, 0]}>
            <mesh
              geometry={(nodes.Körper as Mesh).geometry}
              material={toonShaderKörper} // Ensure the correct material name
              position={[0, 0, 0.8]}
              scale={scale}
              castShadow
              receiveShadow
            />
            <mesh
              geometry={(nodes.Kuppel as Mesh).geometry}
              material={toonShaderKörper} // Ensure the correct material name
              position={[0, 0, 0.8]}
              scale={scale}
              castShadow
              receiveShadow
            />
          </group>
        </group>
      </group>
    </Float>
  );
}
