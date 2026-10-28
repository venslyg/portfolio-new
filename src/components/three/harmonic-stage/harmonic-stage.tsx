'use client';

import { useFrame } from '@react-three/fiber';
import { useRef, type RefObject } from 'react';
import * as THREE from 'three';
import { StagePlatform } from '@/components/three/stage-platform/stage-platform';
import { StageRings } from '@/components/three/stage-rings/stage-rings';
import { HarmonicCore } from '@/components/three/harmonic-core/harmonic-core';
import { CodeElements } from '@/components/three/code-elements/code-elements';
import { MusicParticles } from '@/components/three/music-particles/music-particles';
import type { StageScrollState } from '@/hooks/use-stage-scroll/use-stage-scroll';

interface HarmonicStageProps {
  scrollRef?: RefObject<StageScrollState>;
  reducedMotion?: boolean;
}

export function HarmonicStage({ scrollRef, reducedMotion = false }: HarmonicStageProps) {
  const stageGroupRef = useRef<THREE.Group>(null);

  // Slow, cinematic ambient rotation with dynamic scroll-driven tilt
  useFrame(({ clock }, delta) => {
    if (!stageGroupRef.current) return;

    const progress = !reducedMotion && scrollRef?.current ? scrollRef.current.current : 0;
    const time = clock.getElapsedTime();

    if (!reducedMotion) {
      // Rotates with gentle speed increase during scroll dispersion
      stageGroupRef.current.rotation.y += delta * (0.12 + progress * 0.16);
      stageGroupRef.current.position.y = Math.sin(time * 0.9) * 0.04 - progress * 0.08;
      stageGroupRef.current.rotation.x = 0.42 + progress * 0.06;
    }
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

      {/* 2. Concentric Neon Channels, Gyro Halo & Console Segments (separating vertically on scroll) */}
      <StageRings scrollRef={scrollRef} reducedMotion={reducedMotion} />

      {/* 3. Central Harmonic Core: Audio Spectrum Waveform, Staff Ribbons & Notes (dispersing on scroll) */}
      <HarmonicCore scrollRef={scrollRef} reducedMotion={reducedMotion} />

      {/* 4. Software Engineering Glyphs ({ }, =>, </>), HUD Panels & Satellites (expanding on scroll) */}
      <CodeElements scrollRef={scrollRef} reducedMotion={reducedMotion} />

      {/* 5. Harmonic Frequency Acoustic Dust Particle System (dispersing into atmosphere) */}
      <MusicParticles scrollRef={scrollRef} reducedMotion={reducedMotion} />

      {/* Under-Stage Levitation Glow Source */}
      <pointLight position={[0, -0.4, 0]} color="#67E8F9" intensity={3.5} distance={6} />
    </group>
  );
}
