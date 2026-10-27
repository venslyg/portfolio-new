'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';

function BeaconMesh() {
  const beaconRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    if (beaconRef.current) {
      beaconRef.current.rotation.y += delta * 0.4;
    }
    if (ring1Ref.current) {
      const scale1 = 1 + (time % 2) * 0.6;
      ring1Ref.current.scale.set(scale1, scale1, scale1);
      (ring1Ref.current.material as THREE.MeshStandardMaterial).opacity = Math.max(0, 1 - (time % 2) / 2);
    }
    if (ring2Ref.current) {
      const scale2 = 1 + ((time + 1) % 2) * 0.6;
      ring2Ref.current.scale.set(scale2, scale2, scale2);
      (ring2Ref.current.material as THREE.MeshStandardMaterial).opacity = Math.max(0, 1 - ((time + 1) % 2) / 2);
    }
  });

  return (
    <group ref={beaconRef}>
      {/* Central Diamond Transmitter */}
      <mesh>
        <octahedronGeometry args={[0.65, 0]} />
        <meshStandardMaterial
          color="#A78BFA"
          metalness={0.9}
          roughness={0.1}
          emissive="#67E8F9"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Pulsing Acoustic Signal Wave 1 */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.8, 0.88, 32]} />
        <meshStandardMaterial
          color="#67E8F9"
          transparent
          opacity={0.8}
          emissive="#67E8F9"
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Pulsing Acoustic Signal Wave 2 */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.8, 0.88, 32]} />
        <meshStandardMaterial
          color="#A78BFA"
          transparent
          opacity={0.8}
          emissive="#A78BFA"
          emissiveIntensity={0.8}
        />
      </mesh>
    </group>
  );
}

export function SignalBeacon() {
  return (
    <div className="relative mx-auto h-24 w-24 sm:h-32 sm:w-32 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 1.2, 3], fov: 38 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[2, 4, 3]} intensity={2.2} color="#67E8F9" />
        <directionalLight position={[-2, -2, 2]} intensity={2.0} color="#A78BFA" />
        <Suspense fallback={null}>
          <BeaconMesh />
        </Suspense>
      </Canvas>
    </div>
  );
}
