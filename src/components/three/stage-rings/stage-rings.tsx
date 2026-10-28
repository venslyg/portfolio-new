'use client';

import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

interface StageRingsProps {
  reducedMotion?: boolean;
}

export function StageRings({ reducedMotion = false }: StageRingsProps) {
  const outerRingRef = useRef<THREE.Group>(null);
  const innerRingRef = useRef<THREE.Group>(null);

  const materials = useMemo(() => {
    return {
      purpleEmissive: new THREE.MeshStandardMaterial({
        color: '#A78BFA',
        emissive: '#A78BFA',
        emissiveIntensity: 3.2,
        toneMapped: false,
      }),
      cyanEmissive: new THREE.MeshStandardMaterial({
        color: '#67E8F9',
        emissive: '#67E8F9',
        emissiveIntensity: 2.8,
        toneMapped: false,
      }),
      haloWireframe: new THREE.MeshStandardMaterial({
        color: '#A78BFA',
        wireframe: true,
        transparent: true,
        opacity: 0.35,
        emissive: '#7C3AED',
        emissiveIntensity: 0.6,
      }),
    };
  }, []);

  useFrame((_, delta) => {
    if (reducedMotion) return;

    if (outerRingRef.current) {
      outerRingRef.current.rotation.z += delta * 0.22;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z -= delta * 0.35;
    }
  });

  return (
    <group name="stage-rings">
      {/* Ring A: Inner Lilac Energy Channel */}
      <mesh
        material={materials.purpleEmissive}
        position={[0, 0.12, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <torusGeometry args={[1.34, 0.022, 16, 64]} />
      </mesh>

      {/* Ring B: Middle Cyan Laser Track */}
      <mesh
        material={materials.cyanEmissive}
        position={[0, 0.095, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <torusGeometry args={[1.82, 0.018, 16, 64]} />
      </mesh>

      {/* Ring C: Outer Perimeter Neon Rim */}
      <mesh
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
  );
}
