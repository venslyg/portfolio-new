'use client';

import { useFrame } from '@react-three/fiber';
import { useMemo, useRef, type RefObject } from 'react';
import * as THREE from 'three';
import type { StageScrollState } from '@/hooks/use-stage-scroll/use-stage-scroll';

interface StageRingsProps {
  scrollRef?: RefObject<StageScrollState>;
  reducedMotion?: boolean;
}

export function StageRings({ scrollRef, reducedMotion = false }: StageRingsProps) {
  const outerRingRef = useRef<THREE.Group>(null);
  const innerRingRef = useRef<THREE.Group>(null);
  const ringARef = useRef<THREE.Mesh>(null);
  const ringBRef = useRef<THREE.Mesh>(null);
  const ringCRef = useRef<THREE.Mesh>(null);
  const consoleGroupRef = useRef<THREE.Group>(null);

  const materials = useMemo(() => {
    return {
      purpleEmissive: new THREE.MeshStandardMaterial({
        color: '#A78BFA',
        emissive: '#A78BFA',
        emissiveIntensity: 3.4,
        toneMapped: false,
      }),
      cyanEmissive: new THREE.MeshStandardMaterial({
        color: '#67E8F9',
        emissive: '#67E8F9',
        emissiveIntensity: 3.0,
        toneMapped: false,
      }),
      haloWireframe: new THREE.MeshStandardMaterial({
        color: '#A78BFA',
        wireframe: true,
        transparent: true,
        opacity: 0.4,
        emissive: '#7C3AED',
        emissiveIntensity: 0.8,
      }),
    };
  }, []);

  useFrame((_, delta) => {
    const progress = !reducedMotion && scrollRef?.current ? scrollRef.current.current : 0;

    // 1. Ring A: Inner Lilac Channel dramatic elevation & expansion
    if (ringARef.current) {
      ringARef.current.position.y = 0.12 + progress * 1.25;
      const s = 1 + progress * 0.35;
      ringARef.current.scale.set(s, s, s);
    }

    // 2. Ring B: Middle Cyan Laser Track separation
    if (ringBRef.current) {
      ringBRef.current.position.y = 0.095 + progress * 0.75;
      const s = 1 + progress * 0.22;
      ringBRef.current.scale.set(s, s, s);
    }

    // 3. Ring C: Outer Neon Rim downward drop & wide expansion
    if (ringCRef.current) {
      ringCRef.current.position.y = 0.02 - progress * 0.42;
      const s = 1 + progress * 0.45;
      ringCRef.current.scale.set(s, s, s);
    }

    // 4. Ring D: Holographic Gyro Halo dramatic ascension, tilt & accelerated rotation
    if (outerRingRef.current) {
      outerRingRef.current.position.y = 0.2 + progress * 2.35;
      outerRingRef.current.rotation.x = Math.PI / 2.2 + progress * 0.55;
      const s = 1 + progress * 0.38;
      outerRingRef.current.scale.set(s, s, s);
      if (!reducedMotion) {
        outerRingRef.current.rotation.z += delta * (0.22 + progress * 0.8);
      }
    }

    // 5. Ring E: Counter-Rotating Secondary Wave Strip separation
    if (innerRingRef.current) {
      innerRingRef.current.position.y = 0.16 + progress * 1.75;
      const s = 1 + progress * 0.4;
      innerRingRef.current.scale.set(s, s, s);
      if (!reducedMotion) {
        innerRingRef.current.rotation.z -= delta * (0.35 + progress * 0.9);
      }
    }

    // 6. Console Segments radial expansion outward
    if (consoleGroupRef.current) {
      consoleGroupRef.current.position.y = 0.095 + progress * 0.55;
      const s = 1 + progress * 0.65;
      consoleGroupRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group name="stage-rings">
      {/* Ring A: Inner Lilac Energy Channel */}
      <mesh
        ref={ringARef}
        material={materials.purpleEmissive}
        position={[0, 0.12, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <torusGeometry args={[1.34, 0.022, 16, 64]} />
      </mesh>

      {/* Ring B: Middle Cyan Laser Track */}
      <mesh
        ref={ringBRef}
        material={materials.cyanEmissive}
        position={[0, 0.095, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <torusGeometry args={[1.82, 0.018, 16, 64]} />
      </mesh>

      {/* Ring C: Outer Perimeter Neon Rim */}
      <mesh
        ref={ringCRef}
        material={materials.purpleEmissive}
        position={[0, 0.02, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <torusGeometry args={[2.42, 0.025, 16, 64]} />
      </mesh>

      {/* Ring D: Holographic Ambient Gyro Halo (Tilted) */}
      <group ref={outerRingRef} position={[0, 0.2, 0]}>
        <mesh material={materials.haloWireframe} rotation={[Math.PI / 2.2, 0, 0]}>
          <ringGeometry args={[2.65, 2.82, 64]} />
        </mesh>
        {/* Glowing cyan markers on outer halo */}
        {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, i) => (
          <mesh
            key={i}
            material={materials.cyanEmissive}
            position={[Math.cos(angle) * 2.73, Math.sin(angle) * 0.1, Math.sin(angle) * 2.73]}
          >
            <sphereGeometry args={[0.04, 16, 16]} />
          </mesh>
        ))}
      </group>

      {/* Ring E: Counter-Rotating Secondary Wave Strip */}
      <group ref={innerRingRef} position={[0, 0.16, 0]}>
        <mesh material={materials.haloWireframe} rotation={[-Math.PI / 2.5, 0, 0]}>
          <ringGeometry args={[0.95, 1.15, 48]} />
        </mesh>
      </group>

      {/* ================= RADIAL CONSOLE SEGMENTS / STROKES ================= */}
      <group ref={consoleGroupRef}>
        {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => {
          const rad = (deg * Math.PI) / 180;
          return (
            <mesh
              key={deg}
              material={deg % 90 === 0 ? materials.cyanEmissive : materials.purpleEmissive}
              position={[Math.cos(rad) * 1.58, 0.095, Math.sin(rad) * 1.58]}
              rotation={[0, -rad, 0]}
            >
              <boxGeometry args={[0.26, 0.008, 0.02]} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}
