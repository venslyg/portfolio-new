'use client';

import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { StagePlatform } from '@/components/three/stage-platform/stage-platform';
import { StageRings } from '@/components/three/stage-rings/stage-rings';
import { HarmonicCore } from '@/components/three/harmonic-core/harmonic-core';
import { CodeElements } from '@/components/three/code-elements/code-elements';
import { MusicParticles } from '@/components/three/music-particles/music-particles';

interface HarmonicStageProps {
  reducedMotion?: boolean;
}

export function HarmonicStage({ reducedMotion = false }: HarmonicStageProps) {
  const stageGroupRef = useRef<THREE.Group>(null);

  // Slow, cinematic ambient rotation
  useFrame(({ clock }, delta) => {
    if (reducedMotion || !stageGroupRef.current) return;

    // Slow turntable rotation with slight rhythmic breathing tilt
    stageGroupRef.current.rotation.y += delta * 0.12;
    const time = clock.getElapsedTime();
    stageGroupRef.current.position.y = Math.sin(time * 0.9) * 0.04;
  });

  return (
    <group
      ref={stageGroupRef}
      position={[0, 0, 0]}
      rotation={[0.42, 0.25, -0.08]}
      scale={0.72}
      name="harmonic-stage"
    >
      {/* 1. Heavy Stepped Dark Chassis & Podium Plinth */}
      <StagePlatform />

      {/* 2. Concentric Neon Channels, Gyro Halo & Console Segments */}
      <StageRings reducedMotion={reducedMotion} />

      {/* 3. Central Harmonic Core: Audio Spectrum Waveform, Staff Ribbons & Notes */}
      <HarmonicCore reducedMotion={reducedMotion} />

      {/* 4. Software Engineering Glyphs ({ }, =>, </>), HUD Panels & Satellites */}
      <CodeElements reducedMotion={reducedMotion} />

      {/* 5. Harmonic Frequency Acoustic Dust Particle System */}
      <MusicParticles reducedMotion={reducedMotion} />

      {/* Under-Stage Levitation Glow Source */}
      <pointLight position={[0, -0.4, 0]} color="#67E8F9" intensity={3.5} distance={6} />
    </group>
  );
}
