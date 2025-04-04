"use client";

import { Float, useGLTF } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { AdditiveBlending, Color, Group, NormalBlending, ShaderMaterial } from "three";

useGLTF.preload("/auto.glb");

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
const raspberryShader = new ShaderMaterial({
  transparent: false, // Allow transparency
  depthWrite: true, // Prevents weird rendering issues
  depthTest: true,
  blending: AdditiveBlending, // Ensures smooth transparency

  uniforms: {
    uColor: { value: new Color(0x23cf51) },
    uOpacity: { value: 0.0 },
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
const craneShader = new ShaderMaterial({
  transparent: false, // Allow transparency
  depthWrite: true, // Prevents weird rendering issues
  depthTest: true,
  blending: AdditiveBlending, // Ensures smooth transparency

  uniforms: {
    uColor: { value: new Color(0x23cf51) },
    uOpacity: { value: 0.0 },
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

const wheelsShader = new ShaderMaterial({
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
const dropperShader = new ShaderMaterial({
  transparent: false, // Allow transparency
  depthWrite: true, // Prevents weird rendering issues
  depthTest: true,
  blending: AdditiveBlending, // Ensures smooth transparency

  uniforms: {
    uColor: { value: new Color(0x23cf51) },
    uOpacity: { value: 0.0 },
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
const sensorShader = new ShaderMaterial({
  transparent: false, // Allow transparency
  depthWrite: true, // Prevents weird rendering issues
  depthTest: true,
  blending: AdditiveBlending, // Ensures smooth transparency

  uniforms: {
    uColor: { value: new Color(0x23cf51) },
    uOpacity: { value: 0.0 },
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
  const { nodes } = useGLTF("/auto.glb");

  const [pastSecondAnimation, setPastSecondAnimation] = useState(false);
  console.log(nodes);
  const ref = useRef<Group>(null);
  const [scale, setScale] = useState(0.06);
  const [yOffset, setYOffset] = useState(-1);

  const handleResize = () => {
    const width = window.innerWidth;

    if (width < 460) {
      // Special case for small mobile during first two animations
      if (!pastSecondAnimation) {
        setScale(0.032);
      } else {
        // After second animation, use regular mobile scale
        if (width < 432) {
          setScale(0.047);
        } else {
          setScale(0.047);
        }
      }
      setYOffset(1);
    } else if (width < 769) {
      // Mobile
      setScale(0.035);
      setYOffset(1);
    } else if (width < 1024) {
      // Tablet
      setScale(0.055);
      setYOffset(0.4);
    } else {
      // Desktop
      setScale(0.06);
      setYOffset(0.4);
    }
  };

  useEffect(() => {
    handleResize(); // set on mount
    window.addEventListener("resize", handleResize); // update on resize
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(handleResize, [pastSecondAnimation]);

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
          onComplete: () => {
            setPastSecondAnimation(true);
          },
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
      .to(
        ufoRotation,
        {
          x: Math.PI * 0.9,
          ease: "power2.out",
          y: 0,
        },
        0,
      ) // Start at time 0
      .to(
        ufoPosition,
        { y: yOffset + window.innerWidth < 769 ? 1.5 : 0, ease: "power2.out" },
        0,
      )
      .to(shader.uniforms.uOpacity, { value: 0.1, ease: "power2.out" }, 0)
      .to(upperDomeShader.uniforms.uOpacity, { value: 0.2, ease: "power2.out" }, 0);

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
    rotateToNormal
      .to(ufoRotation, { x: 4.8, ease: "power2.out" })
      .to(ufoPosition, { y: yOffset, ease: "power2.out" }, 0)
      .to(wheelsShader.uniforms.uOpacity, { value: 0.2, ease: "power2.out" }, 0);

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
      dropperShader.uniforms.uOpacity,
      { value: 1, ease: "power2.out" },
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
    changeToCrane
      .to(dropperShader.uniforms.uOpacity, { value: 0, ease: "power2.out" })
      .to(craneShader.uniforms.uOpacity, { value: 1, ease: "power2.out" }, 0);

    const changeToRasperry = gsap.timeline({
      scrollTrigger: {
        trigger: "#fade-out-crane",
        start: "top center",
        end: "bottom center",
        scrub: true,

        //markers: true,
      },
    });
    changeToRasperry
      .to(craneShader.uniforms.uOpacity, { value: 0, ease: "power2.out" }, 0)
      .to(raspberryShader.uniforms.uOpacity, { value: 1, ease: "power2.out" }, 0);

    const rotateToTop = gsap.timeline({
      scrollTrigger: {
        trigger: "#rotate-to-top",
        start: "top center",
        end: "bottom center",
        scrub: true,

        //markers: true,
      },
    });
    rotateToTop
      .to(ufoRotation, { x: -Math.PI * 1.1, ease: "power2.out" }, 0)
      .to(ufoPosition, { y: -yOffset * 0.4, ease: "power2.out" }, 0)
      .to(sensorShader.uniforms.uOpacity, { value: 1, ease: "power2.out" }, 0)
      .to(shader.uniforms.uOpacity, { value: 1, ease: "power2.out" }, 0)
      .to(raspberryShader.uniforms.uOpacity, { value: 0, ease: "power2.out" }, 0);

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
      .to(ufoPosition, { z: 2, ease: "power2.out" }, 0)
      .to(ufoPosition, { y: 0, ease: "power2.out" }, 0)
      .to(shader.uniforms.uOpacity, { value: 0, ease: "power2.out" }, 0)
      .to(upperDomeShader.uniforms.uOpacity, { value: 0, ease: "power2.out" }, 0)
      .to(dropperShader.uniforms.uOpacity, { value: 0, ease: "power2.out" }, 0)
      .to(craneShader.uniforms.uOpacity, { value: 0, ease: "power2.out" }, 0)
      .to(sensorShader.uniforms.uOpacity, { value: 0, ease: "power2.out" }, 0)
      .to(wheelsShader.uniforms.uOpacity, { value: 0, ease: "power2.out" }, 0);
  });

  return (
    <Float rotation={[0.2, 0, 0]} speed={3} rotationIntensity={0.2} floatIntensity={1}>
      <group ref={ref} dispose={null} rotation={[-Math.PI / 2, 0, 0]} scale={scale * 200}>
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
        <group position={[0, 0.009, -0.026]} rotation={[Math.PI / 2, 0, Math.PI / 2]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh157_mesh.geometry}
            material={craneShader}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh157_mesh_1.geometry}
            material={craneShader}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.dropper.geometry}
          material={dropperShader}
          position={[-0.022, -0.031, -0.043]}
          rotation={[0, 0, -Math.PI / 2]}
        />
        <group position={[0.002, -0.04, 0.042]} rotation={[-0.009, 0, 0]} scale={0.001}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.meshes10.geometry}
            material={raspberryShader}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.meshes10_1.geometry}
            material={raspberryShader}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.meshes10_2.geometry}
            material={raspberryShader}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.meshes10_3.geometry}
            material={raspberryShader}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.sensor.geometry}
          material={sensorShader}
          position={[0.001, 0.02, -0.05]}
        />
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
            material={wheelsShader}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh490_mesh_1.geometry}
            material={wheelsShader}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh490_mesh_2.geometry}
            material={wheelsShader}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh490_mesh_3.geometry}
            material={wheelsShader}
          />
        </group>
      </group>
    </Float>
  );
}
