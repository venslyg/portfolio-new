'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';

function VinylMesh() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.45;
      groupRef.current.rotation.x = Math.sin(Date.now() * 0.001) * 0.15 + 0.35;
    }
  });

  return (
    <group ref={groupRef} rotation={[0.4, 0, 0]}>
      {/* Vinyl Disc Body */}
      <mesh>
        <cylinderGeometry args={[1.5, 1.5, 0.06, 48]} />
        <meshStandardMaterial
          color="#151722"
          metalness={0.92}
          roughness={0.2}
          emissive="#2E1065"
          emissiveIntensity={0.2}
        />
      </mesh>
      {/* Sound Grooves / Concentric Rings */}
      <mesh position={[0, 0.035, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.5, 1.4, 48]} />
        <meshStandardMaterial
          color="#A78BFA"
          wireframe
          transparent
          opacity={0.35}
          emissive="#8B5CF6"
          emissiveIntensity={0.3}
        />
      </mesh>
      {/* Cyan Soundwave Track Indicator */}
      <mesh position={[0, 0.036, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.85, 0.95, 48]} />
        <meshStandardMaterial
          color="#67E8F9"
          emissive="#06B6D4"
          emissiveIntensity={0.6}
        />
      </mesh>
      {/* Center Label Spindle */}
      <mesh position={[0, 0.04, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 0.02, 32]} />
        <meshStandardMaterial
          color="#A78BFA"
          metalness={0.8}
          roughness={0.1}
          emissive="#6D28D9"
          emissiveIntensity={0.5}
        />
      </mesh>
      <mesh position={[0, 0.06, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#FFFFFF" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

export function HolographicDisc() {
  return (
    <div className="relative mx-auto h-28 w-28 sm:h-36 sm:w-36 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 1.5, 3.2], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
      >
        <ambientLight intensity={1.0} />
        <directionalLight position={[3, 4, 3]} intensity={2.2} color="#A78BFA" />
        <directionalLight position={[-3, -2, 2]} intensity={1.8} color="#67E8F9" />
        <Suspense fallback={null}>
          <VinylMesh />
        </Suspense>
      </Canvas>
    </div>
  );
}
