'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';

function GyroscopeMesh() {
  const outerRingRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    if (outerRingRef.current) {
      outerRingRef.current.rotation.x += delta * 0.5;
      outerRingRef.current.rotation.y += delta * 0.3;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.y -= delta * 0.7;
      innerRingRef.current.rotation.z += delta * 0.4;
    }
    if (coreRef.current) {
      const scale = 1 + Math.sin(time * 2.5) * 0.08;
      coreRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group>
      {/* Outer Lilac Ring (Engineering Logic) */}
      <mesh ref={outerRingRef}>
        <torusGeometry args={[1.3, 0.05, 16, 64]} />
        <meshStandardMaterial
          color="#A78BFA"
          metalness={0.92}
          roughness={0.15}
          emissive="#7C3AED"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Inner Cyan Ring (Acoustic Harmony) */}
      <mesh ref={innerRingRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[0.95, 0.045, 16, 64]} />
        <meshStandardMaterial
          color="#67E8F9"
          metalness={0.9}
          roughness={0.12}
          emissive="#0891B2"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Central Illuminated Resonance Sphere */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.32, 32, 32]} />
        <meshStandardMaterial
          color="#FFFFFF"
          metalness={0.95}
          roughness={0.08}
          emissive="#A78BFA"
          emissiveIntensity={0.7}
        />
      </mesh>
    </group>
  );
}

export function ResonanceGyroscope() {
  return (
    <div className="relative mx-auto h-32 w-32 sm:h-44 sm:w-44 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 3.8], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
      >
        <ambientLight intensity={1.1} />
        <directionalLight position={[4, 5, 4]} intensity={2.5} color="#A78BFA" />
        <directionalLight position={[-4, -3, 3]} intensity={2.0} color="#67E8F9" />
        <Suspense fallback={null}>
          <GyroscopeMesh />
        </Suspense>
      </Canvas>
    </div>
  );
}
