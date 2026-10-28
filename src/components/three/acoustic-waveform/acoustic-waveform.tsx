'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useMemo, useRef } from 'react';
import * as THREE from 'three';

function WaveformVisual() {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const notesRef = useRef<THREE.Group>(null);

  const materials = useMemo(() => {
    return {
      cyanEmissive: new THREE.MeshStandardMaterial({
        color: '#67E8F9',
        emissive: '#06B6D4',
        emissiveIntensity: 2.2,
        roughness: 0.2,
      }),
      lilacEmissive: new THREE.MeshStandardMaterial({
        color: '#A78BFA',
        emissive: '#7C3AED',
        emissiveIntensity: 2.0,
        wireframe: true,
        transparent: true,
        opacity: 0.5,
      }),
      coreGlow: new THREE.MeshStandardMaterial({
        color: '#C084FC',
        emissive: '#9333EA',
        emissiveIntensity: 2.5,
        roughness: 0.15,
        metalness: 0.8,
      }),
      noteMat: new THREE.MeshStandardMaterial({
        color: '#F4F4F7',
        emissive: '#67E8F9',
        emissiveIntensity: 1.2,
        metalness: 0.9,
      }),
    };
  }, []);

  // 16 Frequency equalizer bars in a compact circle
  const bars = useMemo(() => {
    const list = [];
    const count = 16;
    const r = 0.65;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      list.push({
        x: Math.cos(angle) * r,
        z: Math.sin(angle) * r,
        freq: i * 0.7,
      });
    }
    return list;
  }, []);

  useFrame(({ clock }, delta) => {
    const time = clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.35;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.4;
      ring1Ref.current.rotation.x = Math.sin(time * 0.8) * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.5;
    }
    if (coreRef.current) {
      const pulse = 1 + Math.sin(time * 2.8) * 0.08;
      coreRef.current.scale.set(pulse, pulse, pulse);
    }
    if (notesRef.current) {
      notesRef.current.children.forEach((note, idx) => {
        note.position.y = Math.sin(time * 2 + idx * 2) * 0.08;
      });
    }
  });

  return (
    <group ref={groupRef} rotation={[0.35, 0, 0]}>
      {/* 1. Central Regrouped Harmonic Core Sphere */}
      <mesh ref={coreRef} material={materials.coreGlow}>
        <sphereGeometry args={[0.24, 24, 24]} />
      </mesh>

      {/* 2. Concentric Waveform Ribbons */}
      <mesh ref={ring1Ref} material={materials.lilacEmissive} rotation={[-Math.PI / 2.3, 0, 0]}>
        <ringGeometry args={[0.82, 0.98, 48]} />
      </mesh>
      <mesh ref={ring2Ref} material={materials.cyanEmissive} rotation={[Math.PI / 2.5, 0, 0]}>
        <torusGeometry args={[1.12, 0.015, 12, 48]} />
      </mesh>

      {/* 3. Circular Audio EQ Bar Ring */}
      {bars.map((bar, idx) => (
        <mesh
          key={idx}
          position={[bar.x, 0, bar.z]}
          material={idx % 2 === 0 ? materials.cyanEmissive : materials.coreGlow}
        >
          <cylinderGeometry args={[0.015, 0.015, 0.14, 8]} />
        </mesh>
      ))}

      {/* 4. Floating Mini Musical Notes */}
      <group ref={notesRef}>
        <group position={[0.78, 0, 0.2]} scale={0.7}>
          <mesh material={materials.noteMat} scale={[1.2, 0.8, 0.7]}>
            <sphereGeometry args={[0.045, 12, 12]} />
          </mesh>
          <mesh material={materials.noteMat} position={[0.035, 0.08, 0]}>
            <cylinderGeometry args={[0.007, 0.007, 0.15, 8]} />
          </mesh>
          <mesh material={materials.noteMat} position={[0.06, 0.13, 0]} rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[0.04, 0.01, 0.01]} />
          </mesh>
        </group>
        <group position={[-0.72, 0, -0.3]} scale={0.65}>
          <mesh material={materials.noteMat} scale={[1.2, 0.8, 0.7]}>
            <sphereGeometry args={[0.045, 12, 12]} />
          </mesh>
          <mesh material={materials.noteMat} position={[0.035, 0.08, 0]}>
            <cylinderGeometry args={[0.007, 0.007, 0.15, 8]} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

export function AcousticWaveform() {
  return (
    <div
      className="relative mx-auto my-4 flex h-32 w-32 items-center justify-center sm:h-40 sm:w-40 pointer-events-none"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 1.2, 3.4], fov: 38 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[3, 4, 3]} intensity={2.4} color="#67E8F9" />
        <directionalLight position={[-3, -2, 2]} intensity={2.0} color="#A78BFA" />
        <Suspense fallback={null}>
          <WaveformVisual />
        </Suspense>
      </Canvas>
    </div>
  );
}
