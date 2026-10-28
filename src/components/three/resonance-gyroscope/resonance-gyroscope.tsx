'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useMemo, useRef } from 'react';
import * as THREE from 'three';

function PrecisionMechanicalChronometer() {
  const masterGroupRef = useRef<THREE.Group>(null);
  const outerGimbalRef = useRef<THREE.Group>(null);
  const midGimbalRef = useRef<THREE.Group>(null);
  const innerRotorRef = useRef<THREE.Group>(null);
  const crystalCoreRef = useRef<THREE.Mesh>(null);

  const materials = useMemo(() => {
    return {
      titanium: new THREE.MeshStandardMaterial({
        color: '#1a1d2e',
        metalness: 0.95,
        roughness: 0.18,
        emissive: '#111425',
        emissiveIntensity: 0.3,
      }),
      turnedBrass: new THREE.MeshStandardMaterial({
        color: '#F59E0B',
        metalness: 0.94,
        roughness: 0.15,
        emissive: '#B45309',
        emissiveIntensity: 0.25,
      }),
      machinedChrome: new THREE.MeshStandardMaterial({
        color: '#F1F5F9',
        metalness: 0.98,
        roughness: 0.08,
      }),
      cyanLaser: new THREE.MeshStandardMaterial({
        color: '#67E8F9',
        emissive: '#67E8F9',
        emissiveIntensity: 3.2,
        toneMapped: false,
      }),
      lilacLaser: new THREE.MeshStandardMaterial({
        color: '#A78BFA',
        emissive: '#A78BFA',
        emissiveIntensity: 3.0,
        toneMapped: false,
      }),
      quartzCrystal: new THREE.MeshPhysicalMaterial({
        color: '#F3E8FF',
        metalness: 0.1,
        roughness: 0.05,
        transmission: 0.85,
        thickness: 0.6,
        emissive: '#8B5CF6',
        emissiveIntensity: 0.8,
        clearcoat: 1.0,
      }),
    };
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (masterGroupRef.current) {
      masterGroupRef.current.rotation.y = Math.sin(time * 0.4) * 0.15;
      masterGroupRef.current.position.y = Math.sin(time * 1.2) * 0.04;
    }

    if (outerGimbalRef.current) {
      outerGimbalRef.current.rotation.x += delta * 0.42;
      outerGimbalRef.current.rotation.y += delta * 0.25;
    }

    if (midGimbalRef.current) {
      midGimbalRef.current.rotation.y -= delta * 0.65;
      midGimbalRef.current.rotation.z += delta * 0.35;
    }

    if (innerRotorRef.current) {
      innerRotorRef.current.rotation.z += delta * 1.8;
      innerRotorRef.current.rotation.x -= delta * 0.5;
    }

    if (crystalCoreRef.current) {
      const scale = 1 + Math.sin(time * 2.8) * 0.06;
      crystalCoreRef.current.scale.set(scale, scale, scale);
      crystalCoreRef.current.rotation.y += delta * 0.8;
    }
  });

  return (
    <group ref={masterGroupRef} scale={1.05}>
      {/* 1. OUTER TITANIUM GIMBAL RING WITH DEGREE CALIBRATIONS */}
      <group ref={outerGimbalRef}>
        <mesh material={materials.titanium}>
          <torusGeometry args={[1.35, 0.048, 16, 64]} />
        </mesh>
        <mesh material={materials.lilacLaser}>
          <torusGeometry args={[1.35, 0.008, 8, 64]} />
        </mesh>

        {/* 4 Mechanical Mounting Brackets & Pivot Pins */}
        {[0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2].map((angle, i) => (
          <group key={i} rotation={[0, 0, angle]}>
            <mesh material={materials.machinedChrome} position={[1.35, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.032, 0.032, 0.06, 16]} />
            </mesh>
            <mesh material={materials.turnedBrass} position={[1.35, 0, 0]}>
              <sphereGeometry args={[0.022, 12, 12]} />
            </mesh>
          </group>
        ))}

        {/* Radial Azimuth Degree Tick Marks */}
        {Array.from({ length: 12 }).map((_, i) => (
          <group key={i} rotation={[0, 0, (i / 12) * Math.PI * 2]}>
            <mesh material={materials.machinedChrome} position={[1.35, 0.035, 0]}>
              <boxGeometry args={[0.025, 0.006, 0.012]} />
            </mesh>
          </group>
        ))}

        {/* 2. MIDDLE TURNED BRASS GIMBAL RING (Orthogonal Axis) */}
        <group ref={midGimbalRef}>
          <mesh material={materials.turnedBrass}>
            <torusGeometry args={[1.05, 0.042, 16, 64]} />
          </mesh>
          <mesh material={materials.cyanLaser}>
            <torusGeometry args={[1.05, 0.006, 8, 64]} />
          </mesh>

          {/* Pivot Axles with Chrome Bearings */}
          {[Math.PI / 4, (Math.PI * 5) / 4].map((angle, i) => (
            <mesh key={i} material={materials.machinedChrome} position={[Math.cos(angle) * 1.05, Math.sin(angle) * 1.05, 0]}>
              <cylinderGeometry args={[0.025, 0.025, 0.05, 12]} />
            </mesh>
          ))}

          {/* 3. INNER HIGH-SPEED ROTOR & FLYWHEEL */}
          <group ref={innerRotorRef}>
            <mesh material={materials.machinedChrome}>
              <torusGeometry args={[0.74, 0.035, 16, 48]} />
            </mesh>

            {/* 6 Peripheral Counterweight Pods */}
            {Array.from({ length: 6 }).map((_, i) => {
              const ang = (i / 6) * Math.PI * 2;
              return (
                <mesh key={i} material={materials.turnedBrass} position={[Math.cos(ang) * 0.74, Math.sin(ang) * 0.74, 0]} rotation={[Math.PI / 2, 0, 0]}>
                  <cylinderGeometry args={[0.028, 0.028, 0.035, 12]} />
                </mesh>
              );
            })}

            {/* Connecting Acoustic Struts */}
            {[0, Math.PI / 3, (Math.PI * 2) / 3].map((angle, i) => (
              <mesh key={i} material={materials.machinedChrome} rotation={[0, 0, angle]}>
                <cylinderGeometry args={[0.008, 0.008, 1.48, 8]} />
              </mesh>
            ))}
          </group>
        </group>
      </group>

      {/* 4. CENTRAL FLOATING HARMONIC QUARTZ CRYSTAL CORE */}
      <mesh ref={crystalCoreRef} material={materials.quartzCrystal}>
        <icosahedronGeometry args={[0.34, 0]} />
      </mesh>

      {/* Internal Faceted Light Source */}
      <pointLight position={[0, 0, 0]} color="#A78BFA" intensity={2.4} distance={4} />
    </group>
  );
}

export function ResonanceGyroscope() {
  return (
    <div className="relative mx-auto h-52 w-52 sm:h-64 sm:w-64 lg:h-72 lg:w-72 pointer-events-none" aria-hidden="true">
      {/* Ambient Backdrop Glow */}
      <div className="absolute inset-0 -z-10 rounded-full bg-accent/15 blur-3xl" />

      <Canvas
        camera={{ position: [0, 0, 4.0], fov: 42 }}
        dpr={[1, 1.75]}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[4, 5, 4]} intensity={3.0} color="#FFFFFF" />
        <directionalLight position={[-4, 3, 2]} intensity={2.5} color="#A78BFA" />
        <directionalLight position={[2, -4, 3]} intensity={2.2} color="#67E8F9" />

        <Suspense fallback={null}>
          <PrecisionMechanicalChronometer />
        </Suspense>
      </Canvas>
    </div>
  );
}
