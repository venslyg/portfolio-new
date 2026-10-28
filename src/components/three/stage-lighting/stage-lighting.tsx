'use client';

import { useMemo } from 'react';
import * as THREE from 'three';

interface StageLightingProps {
  intensityMultiplier?: number;
}

export function StageLighting({ intensityMultiplier = 1.0 }: StageLightingProps) {
  // Volumetric spotlight cone materials for realistic concert stage atmosphere
  const beamMaterials = useMemo(() => {
    return {
      cyanBeam: new THREE.MeshBasicMaterial({
        color: '#67E8F9',
        transparent: true,
        opacity: 0.08,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
      lilacBeam: new THREE.MeshBasicMaterial({
        color: '#A78BFA',
        transparent: true,
        opacity: 0.08,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
      warmBeam: new THREE.MeshBasicMaterial({
        color: '#FBBF24',
        transparent: true,
        opacity: 0.06,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    };
  }, []);

  return (
    <group name="stage-lighting">
      {/* Dark Ambient Base Floor */}
      <ambientLight intensity={1.1 * intensityMultiplier} color="#151726" />

      {/* Main Overhead Key Spotlight */}
      <spotLight
        position={[0, 6.5, 2.5]}
        target-position={[0, 0, 0]}
        angle={Math.PI / 4.5}
        penumbra={0.7}
        intensity={4.2 * intensityMultiplier}
        color="#FFFFFF"
        distance={14}
      />

      {/* Electric Lilac Concert Side Fill Light */}
      <spotLight
        position={[-4.5, 5.0, 1.5]}
        target-position={[0.2, 0.2, 0]}
        angle={Math.PI / 5}
        penumbra={0.8}
        intensity={4.0 * intensityMultiplier}
        color="#A78BFA"
        distance={12}
      />

      {/* Cyan Rim & Under-Glow Stage Light */}
      <spotLight
        position={[4.5, 5.0, 1.5]}
        target-position={[-0.2, 0.2, 0]}
        angle={Math.PI / 5}
        penumbra={0.8}
        intensity={3.8 * intensityMultiplier}
        color="#67E8F9"
        distance={12}
      />

      {/* Volumetric Stage Spotlight Cone Beams (Nuralis-style atmospheric light rays) */}
      <group position={[0, 3.8, 1.2]} rotation={[0.3, 0, 0]} scale={[1, 1, 1]}>
        {/* Center Spotlight Cone */}
        <mesh material={beamMaterials.warmBeam} position={[0, 0, 0]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.08, 1.6, 5.2, 24, 1, true]} />
        </mesh>

        {/* Left Lilac Angled Spotlight Cone */}
        <mesh material={beamMaterials.lilacBeam} position={[-1.8, 0.2, -0.4]} rotation={[0, 0, -0.25]}>
          <cylinderGeometry args={[0.06, 1.4, 5.0, 24, 1, true]} />
        </mesh>

        {/* Right Cyan Angled Spotlight Cone */}
        <mesh material={beamMaterials.cyanBeam} position={[1.8, 0.2, -0.4]} rotation={[0, 0, 0.25]}>
          <cylinderGeometry args={[0.06, 1.4, 5.0, 24, 1, true]} />
        </mesh>
      </group>

      {/* Stage Perimeter Floor Footlights */}
      <pointLight position={[-1.2, 0.15, 1.4]} color="#67E8F9" intensity={1.8 * intensityMultiplier} distance={4} />
      <pointLight position={[1.2, 0.15, 1.4]} color="#A78BFA" intensity={1.8 * intensityMultiplier} distance={4} />
      <pointLight position={[0, 0.15, 1.7]} color="#FBBF24" intensity={1.5 * intensityMultiplier} distance={4} />
    </group>
  );
}
