'use client';

import { useMemo } from 'react';
import * as THREE from 'three';

export function StagePlatform() {
  // Memoized materials for performance
  const materials = useMemo(() => {
    return {
      darkChassis: new THREE.MeshStandardMaterial({
        color: '#0e1017',
        metalness: 0.92,
        roughness: 0.22,
        envMapIntensity: 1.2,
      }),
      gunmetalStep: new THREE.MeshStandardMaterial({
        color: '#161926',
        metalness: 0.88,
        roughness: 0.3,
      }),
      podiumSurface: new THREE.MeshStandardMaterial({
        color: '#121422',
        metalness: 0.85,
        roughness: 0.2,
        emissive: '#1a103c',
        emissiveIntensity: 0.35,
      }),
      corePlinth: new THREE.MeshStandardMaterial({
        color: '#18122B',
        metalness: 0.9,
        roughness: 0.15,
        emissive: '#2e1065',
        emissiveIntensity: 0.6,
      }),
    };
  }, []);

  return (
    <group name="stage-platform">
      {/* 1. Base Sub-Chassis Disc */}
      <mesh material={materials.darkChassis} position={[0, -0.12, 0]}>
        <cylinderGeometry args={[2.55, 2.7, 0.14, 64]} />
      </mesh>

      {/* 2. Middle Stepped Bevel with Gunmetal Finish */}
      <mesh material={materials.gunmetalStep} position={[0, -0.02, 0]}>
        <cylinderGeometry args={[2.35, 2.5, 0.1, 64]} />
      </mesh>

      {/* 3. Main Stage Surface */}
      <mesh material={materials.podiumSurface} position={[0, 0.05, 0]}>
        <cylinderGeometry args={[2.15, 2.25, 0.08, 64]} />
      </mesh>

      {/* 4. Central Elevated Performance Platform */}
      <mesh material={materials.darkChassis} position={[0, 0.14, 0]}>
        <cylinderGeometry args={[1.25, 1.32, 0.12, 48]} />
      </mesh>

      {/* 5. Center Core Plinth Disk */}
      <mesh material={materials.corePlinth} position={[0, 0.21, 0]}>
        <cylinderGeometry args={[0.75, 0.8, 0.04, 36]} />
      </mesh>
    </group>
  );
}
