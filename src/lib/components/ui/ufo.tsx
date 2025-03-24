"use client";

import { Float, useGLTF } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import {
  AdditiveBlending,
  Color,
  Group,
  Mesh,
  NormalBlending,
  ShaderMaterial,
} from "three";

useGLTF.preload("/scene.glb");

gsap.registerPlugin(ScrollTrigger);

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

const shaderHidden = new ShaderMaterial({
  transparent: false, // Allow transparency
  depthWrite: true, // Prevents weird rendering issues
  depthTest: true,
  blending: AdditiveBlending, // Ensures smooth transparency

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
  const { nodes } = useGLTF("/scene.glb");
  const ref = useRef<Group>(null);

  useEffect(() => {
    if (!ref.current) return;
    const triggerElements = [
      "#fly-outside",
      "#pause-generel",
      "#fly-middle",
      "#rotate-to-bottom",
      "#pause-bottom",
    ];
    triggerElements.forEach((id) => {
      if (!document.querySelector(id)) {
        console.error(`Element with id ${id} not found!`);
      }
    });

    const ufoRotation = ref.current.rotation;
    const ufoPosition = ref.current.position;

    // Set material properties
    // materials.kuppel.color.set(0x00ff00); // Green color

    console.log(shaderHidden);

    // fly-outside
    gsap.to(ufoPosition, {
      x: 30,
      z: -15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#fly-outside",
        start: "top center",
        end: "bottom center",
        scrub: true,
        //markers: true,
        /*onLeave: () => {
          // Teleport the object to the left side of the screen after it leaves the first section
          gsap.set(ufoPosition, { x: -globalThis.innerWidth / 2 });
        },*/
      },
    });

    //fly-middle
    gsap.fromTo(
      ufoPosition,
      { x: -30 }, // Start from the teleported position
      {
        x: 0,
        z: -1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#fly-middle",
          start: "top center",
          end: "bottom center",
          scrub: true,
          //markers: true,
        },
      },
    );

    // Create a timeline for the first set of animations
    const ufoTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#rotate-to-bottom",
        start: "top center-=35",
        end: "bottom center",
        scrub: true,
        //markers: true,
      },
    });

    // Rotate UFO, move down, and change transparency at the same time
    ufoTl
      .to(ufoRotation, { x: -Math.PI * 0.65, ease: "power2.out" }, 0) // Start at time 0
      .to(ufoPosition, { y: -1, ease: "power2.out" }, 0)
      .to(shader.uniforms.uOpacity, { value: 0.1, ease: "power2.out" }, 0);

    // Second animation: Restore UFO rotation on a different ScrollTrigger
    const rotateToNormal = gsap.timeline({
      scrollTrigger: {
        trigger: "#rotate-to-normal",
        start: "top center",
        end: "bottom center",
        scrub: true,
        //markers: true,
      },
    });

    // rotate to normal
    rotateToNormal.to(ufoRotation, { x: 0, ease: "power2.out" });

    //change material properties
    const changeToDropper = gsap.timeline({
      scrollTrigger: {
        trigger: "#fade-in-dropper",
        start: "top center",
        end: "bottom center",
        scrub: true,
        //markers: true,
      },
    });
    changeToDropper.to(
      shaderHidden.uniforms.uOpacity,
      { value: 0, ease: "power2.out" },
      0,
    );
    //change material properties
    const changeToCrane = gsap.timeline({
      scrollTrigger: {
        trigger: "#fade-in-crane",
        start: "top center",
        end: "bottom center",
        scrub: true,
        //markers: true,
      },
    });
    changeToCrane.to(shaderHidden.uniforms.uOpacity, { value: 1, ease: "power2.out" });

    const rotateToTop = gsap.timeline({
      scrollTrigger: {
        trigger: "#rotate-to-top",
        start: "top center",
        end: "bottom center",
        scrub: true,
        //markers: true,
      },
    });
    rotateToTop.to(ufoRotation, { x: -Math.PI * 1.6, ease: "power2.out" }, 0).to(
      shader.uniforms.uOpacity,
      {
        value: 0.2,
        ease: "power2.out",
      },
      0,
    );

    const changeSize = gsap.timeline({
      scrollTrigger: {
        trigger: "#fade-out-sensors",
        start: "top center",
        end: "bottom center",
        scrub: true,
        //markers: true,
      },
    });
    changeSize
      .to(ufoPosition, { z: 0.2, ease: "power2.out" }, 0)
      .to(ufoPosition, { y: 0, ease: "power2.out" }, 0);
  });

  return (
    <Float rotation={[0.4, 0, 0]} speed={3} rotationIntensity={0.2} floatIntensity={1}>
      <group dispose={null} ref={ref}>
        <group rotation={[0, 0, 0]}>
          <group rotation={[Math.PI / 2, 0, 0]}>
            <mesh
              geometry={(nodes.Körper as Mesh).geometry}
              material={shader} // Ensure the correct material name
              position={[0, 0, -0.2]}
              scale={0.06}
              castShadow
              receiveShadow
            />
            <mesh
              geometry={(nodes.Kuppel as Mesh).geometry}
              material={shader} // Ensure the correct material name
              position={[0, 0, -0.2]}
              scale={0.06}
              castShadow
              receiveShadow
            />
            <mesh
              geometry={(nodes.hiddenobject as Mesh).geometry}
              material={shaderHidden} // Ensure the correct material name
              position={[0, 0, -0.2]}
              scale={0.04}
              castShadow
              receiveShadow
              renderOrder={1}
            />
          </group>
        </group>
      </group>
    </Float>
  );
}
