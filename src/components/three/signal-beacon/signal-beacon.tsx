'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useMemo, useRef } from 'react';
import * as THREE from 'three';

function RadarTelemetryBeacon() {
  const masterGroupRef = useRef<THREE.Group>(null);
  const dishHeadRef = useRef<THREE.Group>(null);
  const pulseRing1Ref = useRef<THREE.Mesh>(null);
  const pulseRing2Ref = useRef<THREE.Mesh>(null);
  const pulseRing3Ref = useRef<THREE.Mesh>(null);

  const materials = useMemo(() => {
    return {
      chassis: new THREE.MeshStandardMaterial({
        color: '#131522',
        metalness: 0.94,
        roughness: 0.16,
        emissive: '#101224',
        emissiveIntensity: 0.3,
      }),
      radarDish: new THREE.MeshStandardMaterial({
        color: '#1E2338',
        metalness: 0.92,
        roughness: 0.14,
        emissive: '#1a103c',
        emissiveIntensity: 0.4,
      }),
      machinedChrome: new THREE.MeshStandardMaterial({
        color: '#F8FAFC',
        metalness: 0.98,
        roughness: 0.08,
      }),
      cyanPulse: new THREE.MeshStandardMaterial({
        color: '#67E8F9',
        emissive: '#67E8F9',
        emissiveIntensity: 3.5,
        toneMapped: false,
      }),
      waveRing: new THREE.MeshBasicMaterial({
        color: '#67E8F9',
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
      waveRingLilac: new THREE.MeshBasicMaterial({
        color: '#A78BFA',
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    };
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // 1. Sweeping 360-degree radar dish rotation
    if (dishHeadRef.current) {
      dishHeadRef.current.rotation.y += delta * 0.9;
    }

    if (masterGroupRef.current) {
      masterGroupRef.current.position.y = Math.sin(time * 1.5) * 0.03;
    }

    // 2. Upward Pulsing Telemetry Radio Waves
    if (pulseRing1Ref.current) {
      const cycle1 = (time * 0.8) % 1;
      pulseRing1Ref.current.position.y = 0.55 + cycle1 * 0.95;
      const scale1 = 0.4 + cycle1 * 1.25;
      pulseRing1Ref.current.scale.set(scale1, scale1, scale1);
      (pulseRing1Ref.current.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 1 - cycle1 * 1.15);
    }

    if (pulseRing2Ref.current) {
      const cycle2 = (time * 0.8 + 0.33) % 1;
      pulseRing2Ref.current.position.y = 0.55 + cycle2 * 0.95;
      const scale2 = 0.4 + cycle2 * 1.25;
      pulseRing2Ref.current.scale.set(scale2, scale2, scale2);
      (pulseRing2Ref.current.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 1 - cycle2 * 1.15);
    }

    if (pulseRing3Ref.current) {
      const cycle3 = (time * 0.8 + 0.66) % 1;
      pulseRing3Ref.current.position.y = 0.55 + cycle3 * 0.95;
      const scale3 = 0.4 + cycle3 * 1.25;
      pulseRing3Ref.current.scale.set(scale3, scale3, scale3);
      (pulseRing3Ref.current.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 1 - cycle3 * 1.15);
    }
  });

  return (
    <group ref={masterGroupRef} position={[0, -0.4, 0]} scale={1.15}>
      {/* 1. STEPPED CONCENTRIC RADAR BASE */}
      <mesh material={materials.chassis} position={[0, 0.04, 0]}>
        <cylinderGeometry args={[0.78, 0.88, 0.08, 36]} />
      </mesh>
      <mesh material={materials.cyanPulse} position={[0, 0.082, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.72, 0.006, 8, 36]} />
      </mesh>
      <mesh material={materials.chassis} position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.54, 0.62, 0.08, 32]} />
      </mesh>

      {/* 2. CENTRAL TELEMETRY PYLON MAST */}
      <mesh material={materials.machinedChrome} position={[0, 0.32, 0]}>
        <cylinderGeometry args={[0.045, 0.065, 0.32, 16]} />
      </mesh>

      {/* 3. 360-DEGREE SWEEPING RADAR DISH & FEED HORN */}
      <group ref={dishHeadRef} position={[0, 0.50, 0]}>
        {/* Parabolic Radar Dish */}
        <mesh material={materials.radarDish} rotation={[0.42, 0, 0]}>
          <sphereGeometry args={[0.38, 28, 20, 0, Math.PI * 2, 0, Math.PI / 2.2]} />
        </mesh>
        {/* Dish Rim Ring */}
        <mesh material={materials.cyanPulse} position={[0, 0, 0.1]} rotation={[0.42, 0, 0]}>
          <torusGeometry args={[0.36, 0.008, 8, 28]} />
        </mesh>
        {/* Feed Horn Strut */}
        <mesh material={materials.machinedChrome} position={[0, 0.14, 0.22]} rotation={[0.42, 0, 0]}>
          <cylinderGeometry args={[0.008, 0.008, 0.28, 8]} />
        </mesh>
        {/* Pulsing Beacon Emitter Head */}
        <mesh material={materials.cyanPulse} position={[0, 0.26, 0.32]}>
          <sphereGeometry args={[0.042, 16, 16]} />
        </mesh>
      </group>

      {/* 4. UPWARD TRANSMITTING HOLOGRAPHIC SIGNAL WAVES */}
      <mesh ref={pulseRing1Ref} material={materials.waveRing} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.45, 0.012, 8, 32]} />
      </mesh>
      <mesh ref={pulseRing2Ref} material={materials.waveRingLilac} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.45, 0.012, 8, 32]} />
      </mesh>
      <mesh ref={pulseRing3Ref} material={materials.waveRing} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.45, 0.012, 8, 32]} />
      </mesh>

      {/* Local Beacon Point Light */}
      <pointLight position={[0, 0.75, 0]} color="#67E8F9" intensity={2.8} distance={5} />
    </group>
  );
}

export function SignalBeacon() {
  return (
    <div className="relative mx-auto h-44 w-44 sm:h-52 sm:w-52 lg:h-60 lg:w-60 pointer-events-none" aria-hidden="true">
      {/* Ambient Radial Backlight */}
      <div className="absolute inset-0 -z-10 rounded-full bg-accent-secondary/15 blur-3xl" />

      <Canvas
        camera={{ position: [0, 1.4, 3.4], fov: 40 }}
        dpr={[1, 1.75]}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[3, 5, 3]} intensity={3.0} color="#FFFFFF" />
        <directionalLight position={[-3, 2, 2]} intensity={2.4} color="#67E8F9" />
        <directionalLight position={[0, -3, 2]} intensity={2.0} color="#A78BFA" />

        <Suspense fallback={null}>
          <RadarTelemetryBeacon />
        </Suspense>
      </Canvas>
    </div>
  );
}
