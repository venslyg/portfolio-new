'use client';

import { useFrame } from '@react-three/fiber';
import { useMemo, useRef, type RefObject } from 'react';
import * as THREE from 'three';
import type { StageScrollState } from '@/hooks/use-stage-scroll/use-stage-scroll';

interface StageFixturesProps {
  scrollRef?: RefObject<StageScrollState>;
  reducedMotion?: boolean;
}

export function StageFixtures({ scrollRef, reducedMotion = false }: StageFixturesProps) {
  const moversGroupRef = useRef<THREE.Group>(null);
  const trussLightsGroupRef = useRef<THREE.Group>(null);
  const head1Ref = useRef<THREE.Group>(null);
  const head2Ref = useRef<THREE.Group>(null);
  const head3Ref = useRef<THREE.Group>(null);
  const head4Ref = useRef<THREE.Group>(null);

  const materials = useMemo(() => {
    return {
      casing: new THREE.MeshStandardMaterial({
        color: '#0d0f18',
        metalness: 0.92,
        roughness: 0.18,
        emissive: '#111425',
        emissiveIntensity: 0.3,
      }),
      chrome: new THREE.MeshStandardMaterial({
        color: '#F8FAFC',
        metalness: 0.98,
        roughness: 0.08,
      }),
      cyanLens: new THREE.MeshStandardMaterial({
        color: '#67E8F9',
        emissive: '#67E8F9',
        emissiveIntensity: 3.5,
        toneMapped: false,
      }),
      lilacLens: new THREE.MeshStandardMaterial({
        color: '#A78BFA',
        emissive: '#A78BFA',
        emissiveIntensity: 3.5,
        toneMapped: false,
      }),
      goldLens: new THREE.MeshStandardMaterial({
        color: '#FBBF24',
        emissive: '#FBBF24',
        emissiveIntensity: 3.0,
        toneMapped: false,
      }),
      cyanBeam: new THREE.MeshBasicMaterial({
        color: '#67E8F9',
        transparent: true,
        opacity: 0.12,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
      lilacBeam: new THREE.MeshBasicMaterial({
        color: '#A78BFA',
        transparent: true,
        opacity: 0.12,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
      goldBeam: new THREE.MeshBasicMaterial({
        color: '#FBBF24',
        transparent: true,
        opacity: 0.09,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    };
  }, []);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const progress = !reducedMotion && scrollRef?.current ? scrollRef.current.current : 0;

    // 1. Moving head concert lights oscillate their beams smoothly across the stage
    if (!reducedMotion) {
      if (head1Ref.current) {
        head1Ref.current.rotation.x = Math.sin(time * 1.4) * 0.22 - 0.3;
        head1Ref.current.rotation.z = Math.cos(time * 1.1) * 0.18;
      }
      if (head2Ref.current) {
        head2Ref.current.rotation.x = Math.sin(time * 1.3 + 1) * 0.22 - 0.3;
        head2Ref.current.rotation.z = Math.cos(time * 1.2 + 1) * 0.18;
      }
      if (head3Ref.current) {
        head3Ref.current.rotation.x = Math.sin(time * 1.5 + 2) * 0.22 - 0.3;
        head3Ref.current.rotation.z = Math.cos(time * 1.0 + 2) * 0.18;
      }
      if (head4Ref.current) {
        head4Ref.current.rotation.x = Math.sin(time * 1.2 + 3) * 0.22 - 0.3;
        head4Ref.current.rotation.z = Math.cos(time * 1.3 + 3) * 0.18;
      }
    }

    // 2. Stage floor fixtures elevate/separate slightly on scroll
    if (moversGroupRef.current) {
      moversGroupRef.current.position.y = progress * 0.45;
    }

    // 3. Overhead truss spotlights elevate with the gyro halo on scroll
    if (trussLightsGroupRef.current) {
      trussLightsGroupRef.current.position.y = progress * 2.35;
    }
  });

  return (
    <group name="stage-fixtures">
      {/* ================= 1. FOUR MOVING-HEAD STAGE LIGHTS MOUNTED ON PLATFORM RIM ================= */}
      <group ref={moversGroupRef}>
        {/* Fixture 1: Front-Left (Cyan) */}
        <group position={[-1.15, 0.08, 0.85]} rotation={[0, 0.65, 0]}>
          {/* Base Mount */}
          <mesh material={materials.casing} position={[0, 0.02, 0]}>
            <cylinderGeometry args={[0.07, 0.08, 0.04, 16]} />
          </mesh>
          {/* Yoke Bracket */}
          <mesh material={materials.chrome} position={[0, 0.07, 0]}>
            <torusGeometry args={[0.065, 0.008, 8, 16, Math.PI]} />
          </mesh>
          {/* Moving Head Casing */}
          <group ref={head1Ref} position={[0, 0.08, 0]} rotation={[-0.35, 0, 0.1]}>
            <mesh material={materials.casing}>
              <cylinderGeometry args={[0.055, 0.065, 0.1, 16]} />
            </mesh>
            <mesh material={materials.cyanLens} position={[0, 0.052, 0]}>
              <circleGeometry args={[0.048, 16]} />
            </mesh>
            {/* Volumetric Beam Projecting Inward & Upward */}
            <mesh material={materials.cyanBeam} position={[0, 1.2, 0]}>
              <cylinderGeometry args={[0.048, 0.65, 2.4, 20, 1, true]} />
            </mesh>
          </group>
        </group>

        {/* Fixture 2: Front-Right (Lilac) */}
        <group position={[1.15, 0.08, 0.85]} rotation={[0, -0.65, 0]}>
          <mesh material={materials.casing} position={[0, 0.02, 0]}>
            <cylinderGeometry args={[0.07, 0.08, 0.04, 16]} />
          </mesh>
          <mesh material={materials.chrome} position={[0, 0.07, 0]}>
            <torusGeometry args={[0.065, 0.008, 8, 16, Math.PI]} />
          </mesh>
          <group ref={head2Ref} position={[0, 0.08, 0]} rotation={[-0.35, 0, -0.1]}>
            <mesh material={materials.casing}>
              <cylinderGeometry args={[0.055, 0.065, 0.1, 16]} />
            </mesh>
            <mesh material={materials.lilacLens} position={[0, 0.052, 0]}>
              <circleGeometry args={[0.048, 16]} />
            </mesh>
            <mesh material={materials.lilacBeam} position={[0, 1.2, 0]}>
              <cylinderGeometry args={[0.048, 0.65, 2.4, 20, 1, true]} />
            </mesh>
          </group>
        </group>

        {/* Fixture 3: Back-Left (Gold/Amber) */}
        <group position={[-1.25, 0.08, -0.75]} rotation={[0, 2.2, 0]}>
          <mesh material={materials.casing} position={[0, 0.02, 0]}>
            <cylinderGeometry args={[0.07, 0.08, 0.04, 16]} />
          </mesh>
          <mesh material={materials.chrome} position={[0, 0.07, 0]}>
            <torusGeometry args={[0.065, 0.008, 8, 16, Math.PI]} />
          </mesh>
          <group ref={head3Ref} position={[0, 0.08, 0]} rotation={[-0.4, 0, 0]}>
            <mesh material={materials.casing}>
              <cylinderGeometry args={[0.055, 0.065, 0.1, 16]} />
            </mesh>
            <mesh material={materials.goldLens} position={[0, 0.052, 0]}>
              <circleGeometry args={[0.048, 16]} />
            </mesh>
            <mesh material={materials.goldBeam} position={[0, 1.2, 0]}>
              <cylinderGeometry args={[0.048, 0.65, 2.4, 20, 1, true]} />
            </mesh>
          </group>
        </group>

        {/* Fixture 4: Back-Right (Cyan) */}
        <group position={[1.25, 0.08, -0.75]} rotation={[0, -2.2, 0]}>
          <mesh material={materials.casing} position={[0, 0.02, 0]}>
            <cylinderGeometry args={[0.07, 0.08, 0.04, 16]} />
          </mesh>
          <mesh material={materials.chrome} position={[0, 0.07, 0]}>
            <torusGeometry args={[0.065, 0.008, 8, 16, Math.PI]} />
          </mesh>
          <group ref={head4Ref} position={[0, 0.08, 0]} rotation={[-0.4, 0, 0]}>
            <mesh material={materials.casing}>
              <cylinderGeometry args={[0.055, 0.065, 0.1, 16]} />
            </mesh>
            <mesh material={materials.cyanLens} position={[0, 0.052, 0]}>
              <circleGeometry args={[0.048, 16]} />
            </mesh>
            <mesh material={materials.cyanBeam} position={[0, 1.2, 0]}>
              <cylinderGeometry args={[0.048, 0.65, 2.4, 20, 1, true]} />
            </mesh>
          </group>
        </group>
      </group>

      {/* ================= 2. FOUR OVERHEAD TRUSS SPOTLIGHT CANS (ELEVATING WITH GYRO HALO) ================= */}
      <group ref={trussLightsGroupRef}>
        {[
          { pos: [-1.45, 1.15, 0.1], rot: [0.6, 0.3, -0.5], mat: materials.cyanLens, beam: materials.cyanBeam },
          { pos: [1.45, 1.15, 0.1], rot: [0.6, -0.3, 0.5], mat: materials.lilacLens, beam: materials.lilacBeam },
          { pos: [-0.85, 1.95, -0.2], rot: [0.8, 0.2, -0.3], mat: materials.goldLens, beam: materials.goldBeam },
          { pos: [0.85, 1.95, -0.2], rot: [0.8, -0.2, 0.3], mat: materials.cyanLens, beam: materials.cyanBeam },
        ].map((light, i) => (
          <group key={i} position={light.pos as [number, number, number]} rotation={light.rot as [number, number, number]}>
            {/* Clamped PAR Can Casing */}
            <mesh material={materials.casing}>
              <cylinderGeometry args={[0.052, 0.065, 0.12, 16]} />
            </mesh>
            <mesh material={light.mat} position={[0, -0.062, 0]}>
              <circleGeometry args={[0.046, 16]} />
            </mesh>
            {/* Downward Projecting Spotlight Beam */}
            <mesh material={light.beam} position={[0, -1.1, 0]}>
              <cylinderGeometry args={[0.55, 0.046, 2.2, 18, 1, true]} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}
