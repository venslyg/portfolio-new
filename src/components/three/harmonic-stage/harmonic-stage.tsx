'use client';

import { useFrame } from '@react-three/fiber';
import { useRef, type RefObject } from 'react';
import * as THREE from 'three';
import { StagePlatform } from '@/components/three/stage-platform/stage-platform';
import { StageRings } from '@/components/three/stage-rings/stage-rings';
import { HarmonicCore } from '@/components/three/harmonic-core/harmonic-core';
import { StageInstruments } from '@/components/three/stage-instruments/stage-instruments';
import { CodeElements } from '@/components/three/code-elements/code-elements';
import { MusicParticles } from '@/components/three/music-particles/music-particles';
import type { StageScrollState } from '@/hooks/use-stage-scroll/use-stage-scroll';

interface HarmonicStageProps {
  scrollRef?: RefObject<StageScrollState>;
  reducedMotion?: boolean;
}

export function HarmonicStage({ scrollRef, reducedMotion = false }: HarmonicStageProps) {
  const stageGroupRef = useRef<THREE.Group>(null);

  // Slow, cinematic ambient rotation with dynamic scroll-driven tilt and glide
  useFrame(({ clock }, delta) => {
    if (!stageGroupRef.current) return;

    const progress = !reducedMotion && scrollRef?.current ? scrollRef.current.current : 0;
    const time = clock.getElapsedTime();

    if (!reducedMotion) {
      // Rotates with gentle speed increase during scroll dispersion
      stageGroupRef.current.rotation.y += delta * (0.12 + progress * 0.22);

      const isDesktop = typeof window !== 'undefined' ? window.innerWidth >= 1024 : true;

      // 1. Horizontal Position: Centered (x = 0) at scroll 0; glides to center-right (x = 1.35) as user scrolls
      const targetX = isDesktop ? Math.min(Math.max((progress - 0.06) / 0.26, 0), 1) * 1.35 : 0;
      stageGroupRef.current.position.x = THREE.MathUtils.damp(
        stageGroupRef.current.position.x,
        targetX,
        5.0,
        delta
      );

      // 2. Vertical Position & Hover Bobbing
      const baseY = isDesktop ? -0.05 : -0.45;
      stageGroupRef.current.position.y =
        baseY + Math.sin(time * 0.9) * 0.04 - progress * 0.12;
      stageGroupRef.current.rotation.x = 0.42 + progress * 0.12;

      // 3. Responsive Scale (0.96 on desktop, 0.72 on mobile)
      const targetScale = isDesktop ? 0.96 : 0.72;
      const currentScale = stageGroupRef.current.scale.x;
      const nextScale = THREE.MathUtils.damp(currentScale, targetScale, 4.0, delta);
      stageGroupRef.current.scale.setScalar(nextScale);
    }
  });

  return (
    <group
      ref={stageGroupRef}
      position={[0, -0.05, 0]}
      rotation={[0.42, 0, 0]}
      scale={0.96}
      name="harmonic-stage"
    >
      {/* 1. Heavy Stepped Dark Chassis & Podium Plinth */}
      <StagePlatform />

      {/* 2. Concentric Neon Channels, Gyro Halo & Console Segments (separating vertically on scroll) */}
      <StageRings scrollRef={scrollRef} reducedMotion={reducedMotion} />

      {/* 3. Central Harmonic Core: Audio Spectrum Waveform, Staff Ribbons & Notes (dispersing on scroll) */}
      <HarmonicCore scrollRef={scrollRef} reducedMotion={reducedMotion} />

      {/* 4. 3D Stylized Instruments: Piano Synth, Drum Set & Electric Guitar (levitating on scroll) */}
      <StageInstruments scrollRef={scrollRef} reducedMotion={reducedMotion} />

      {/* 5. Software Engineering Glyphs ({ }, =>, </>), HUD Panels & Satellites (expanding on scroll) */}
      <CodeElements scrollRef={scrollRef} reducedMotion={reducedMotion} />

      {/* 6. Harmonic Frequency Acoustic Dust Particle System (dispersing into atmosphere) */}
      <MusicParticles scrollRef={scrollRef} reducedMotion={reducedMotion} />

      {/* Under-Stage Levitation Glow Source */}
      <pointLight position={[0, -0.4, 0]} color="#67E8F9" intensity={3.8} distance={7} />
      {/* Stage Center Specular Warm Light */}
      <pointLight position={[0, 1.2, 0.4]} color="#A78BFA" intensity={2.5} distance={6} />
    </group>
  );
}
