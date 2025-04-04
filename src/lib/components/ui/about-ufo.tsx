"use client";

import { Float, useGLTF } from "@react-three/drei";
import { useEffect, useState } from "react";
import { Color, NormalBlending, ShaderMaterial } from "three";

useGLTF.preload("/auto.glb");

const shader = new ShaderMaterial({
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

const upperDomeShader = new ShaderMaterial({
  transparent: true, // Allow transparency
  depthWrite: true, // Important: Prevents z-sorting issues with transparency
  depthTest: true,
  blending: NormalBlending, // Ensures smooth transparency

  uniforms: {
    uColor: { value: new Color(0x23cf51) },
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
  const { nodes } = useGLTF("/auto.glb") as any;
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 432) {
        // Mobile
        setScale(0.047);
      } else if (width < 640) {
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
      <group dispose={null} rotation={[-Math.PI / 2, 0, 0]} scale={scale * 200}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.bottomDome.geometry}
          material={shader}
        />
        <group position={[0.002, 0.021, -0.05]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh632_mesh.geometry}
            material={shader}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh632_mesh_1.geometry}
            material={shader}
          />
        </group>

        <mesh
          castShadow
          receiveShadow
          geometry={nodes.upperDome.geometry}
          material={upperDomeShader}
          scale={[1.056, 1.056, 1]}
        />
        <group
          position={[-0.137, -0.024, -0.017]}
          rotation={[-Math.PI, 0, -Math.PI]}
          scale={[1, 0.926, 0.926]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh490_mesh.geometry}
            material={upperDomeShader}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh490_mesh_1.geometry}
            material={upperDomeShader}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh490_mesh_2.geometry}
            material={upperDomeShader}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh490_mesh_3.geometry}
            material={upperDomeShader}
          />
        </group>
      </group>
    </Float>
  );
}
