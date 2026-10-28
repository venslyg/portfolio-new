'use client';

import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

interface HarmonicStageProps {
  reducedMotion?: boolean;
}

export function HarmonicStage({ reducedMotion = false }: HarmonicStageProps) {
  const stageGroupRef = useRef<THREE.Group>(null);
  const outerRingRef = useRef<THREE.Group>(null);
  const innerRingRef = useRef<THREE.Group>(null);
  const satellitesRef = useRef<THREE.Group>(null);

  // Reusable materials
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
        emissiveIntensity: 0.4,
      }),
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
      satelliteChrome: new THREE.MeshStandardMaterial({
        color: '#F4F4F7',
        metalness: 0.95,
        roughness: 0.1,
        emissive: '#67E8F9',
        emissiveIntensity: 0.8,
      }),
    };
  }, []);

  // Geometric satellite nodes orbiting the stage perimeter
  const satellitePositions = useMemo(() => {
    const items = [];
    const count = 6;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 2.4 + (i % 2) * 0.35;
      const y = (i % 3 - 1) * 0.22;
      items.push({ angle, radius, y, speed: 0.3 + (i % 3) * 0.1 });
    }
    return items;
  }, []);

  useFrame((state, delta) => {
    if (reducedMotion) return;

    const time = state.clock.getElapsedTime();

    // Subtle levitation bobbing of entire stage
    if (stageGroupRef.current) {
      stageGroupRef.current.position.y = Math.sin(time * 0.9) * 0.06;
      stageGroupRef.current.rotation.y += delta * 0.08;
    }

    // Outer kinetic ring rotates in opposite direction
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z -= delta * 0.14;
      outerRingRef.current.rotation.x = Math.sin(time * 0.6) * 0.05 + 0.1;
    }

    // Inner glowing ring pulses gently
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z += delta * 0.18;
    }

    // Orbiting satellites update
    if (satellitesRef.current) {
      satellitesRef.current.children.forEach((child, idx) => {
        const item = satellitePositions[idx];
        if (item) {
          const currentAngle = item.angle + time * item.speed;
          child.position.x = Math.cos(currentAngle) * item.radius;
          child.position.z = Math.sin(currentAngle) * item.radius;
          child.position.y = item.y + Math.sin(time * 2 + idx) * 0.08;
          child.rotation.x += delta * 1.2;
          child.rotation.y += delta * 1.5;
        }
      });
    }
  });

  return (
    <group ref={stageGroupRef} position={[0, -0.2, 0]} rotation={[0.42, 0.25, -0.08]}>
      {/* ================= PRIMARY CIRCULAR STAGE BASE ================= */}
      {/* 1. Lower chassis disc */}
      <mesh material={materials.darkChassis} position={[0, -0.12, 0]}>
        <cylinderGeometry args={[2.55, 2.7, 0.14, 64]} />
      </mesh>

      {/* 2. Middle stepped bevel with dark metallic finish */}
      <mesh material={materials.gunmetalStep} position={[0, -0.02, 0]}>
        <cylinderGeometry args={[2.35, 2.5, 0.1, 64]} />
      </mesh>

      {/* 3. Main Stage Surface with radial groove texture */}
      <mesh material={materials.podiumSurface} position={[0, 0.05, 0]}>
        <cylinderGeometry args={[2.15, 2.25, 0.08, 64]} />
      </mesh>

      {/* 4. Central Elevated Performance Platform */}
      <mesh material={materials.darkChassis} position={[0, 0.14, 0]}>
        <cylinderGeometry args={[1.25, 1.32, 0.12, 48]} />
      </mesh>

      {/* 5. Center Core Plinth Disk */}
      <mesh material={materials.podiumSurface} position={[0, 0.21, 0]}>
        <cylinderGeometry args={[0.75, 0.8, 0.04, 36]} />
      </mesh>

      {/* ================= CONCENTRIC GLOWING LIGHT RINGS ================= */}
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

      {/* ================= HOVERING GEOMETRIC SATELLITES ================= */}
      <group ref={satellitesRef}>
        {satellitePositions.map((item, idx) => (
          <mesh
            key={idx}
            material={idx % 2 === 0 ? materials.satelliteChrome : materials.cyanEmissive}
            position={[Math.cos(item.angle) * item.radius, item.y, Math.sin(item.angle) * item.radius]}
          >
            <octahedronGeometry args={[0.075, 0]} />
          </mesh>
        ))}
      </group>

      {/* Under-Stage Levitation Light Source */}
      <pointLight position={[0, -0.4, 0]} color="#67E8F9" intensity={3.5} distance={6} />
      {/* Top Core Accent Light */}
      <pointLight position={[0, 0.6, 0]} color="#A78BFA" intensity={2.8} distance={5} />
    </group>
  );
}
