'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';

function OrbitingKnot() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.4;
      meshRef.current.rotation.y += delta * 0.6;
    }
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1, 0.28, 64, 16]} />
      <meshStandardMaterial
        color="#A78BFA"
        metalness={0.9}
        roughness={0.15}
        emissive="#4C1D95"
        emissiveIntensity={0.4}
        wireframe={false}
      />
    </mesh>
  );
}

export function InterstitialKnot() {
  return (
    <div className="relative mx-auto my-6 flex h-28 w-28 items-center justify-center sm:h-36 sm:w-36 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 38 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
      >
        <ambientLight intensity={1.0} />
        <directionalLight position={[3, 4, 3]} intensity={2.2} color="#67E8F9" />
        <directionalLight position={[-3, -2, 2]} intensity={1.8} color="#A78BFA" />
        <Suspense fallback={null}>
          <OrbitingKnot />
        </Suspense>
      </Canvas>
    </div>
  );
}
