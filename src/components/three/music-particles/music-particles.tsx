'use client';

import { useFrame } from '@react-three/fiber';
import { useMemo, useRef, type RefObject } from 'react';
import * as THREE from 'three';
import type { StageScrollState } from '@/hooks/use-stage-scroll/use-stage-scroll';

interface MusicParticlesProps {
  scrollRef?: RefObject<StageScrollState>;
  reducedMotion?: boolean;
}

// Pure deterministic pseudo-random generator
function pseudoRandom(seed: number) {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

export function MusicParticles({ scrollRef, reducedMotion = false }: MusicParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);

  // 48 subtle harmonic frequency particles around the stage and core
  const { positions, colors, initialPositions } = useMemo(() => {
    const count = 48;
    const pos = new Float32Array(count * 3);
    const initialPos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);

    const colorLilac = new THREE.Color('#A78BFA');
    const colorCyan = new THREE.Color('#67E8F9');

    for (let i = 0; i < count; i++) {
      const rnd1 = pseudoRandom(i * 3 + 1);
      const rnd2 = pseudoRandom(i * 3 + 2);
      const rnd3 = pseudoRandom(i * 3 + 3);

      const angle = (i / count) * Math.PI * 2 + (rnd1 - 0.5) * 0.5;
      const radius = 0.6 + rnd2 * 1.5;
      const y = 0.2 + rnd3 * 0.9;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      initialPos[i * 3] = x;
      initialPos[i * 3 + 1] = y;
      initialPos[i * 3 + 2] = z;

      const chosenColor = i % 2 === 0 ? colorLilac : colorCyan;
      cols[i * 3] = chosenColor.r;
      cols[i * 3 + 1] = chosenColor.g;
      cols[i * 3 + 2] = chosenColor.b;
    }

    return { positions: pos, colors: cols, initialPositions: initialPos };
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;

    const progress = !reducedMotion && scrollRef?.current ? scrollRef.current.current : 0;
    const time = clock.getElapsedTime();
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const array = posAttr.array as Float32Array;

    for (let i = 0; i < 48; i++) {
      const idx = i * 3;
      const radialExpansion = 1 + progress * 1.6;

      // Vertical elevation into the atmosphere + wide radial scatter
      array[idx + 1] =
        initialPositions[idx + 1] +
        progress * 2.85 +
        (reducedMotion ? 0 : Math.sin(time * 2.2 + i * 0.7) * 0.05);

      array[idx] =
        initialPositions[idx] * radialExpansion +
        (reducedMotion ? 0 : Math.cos(time * 0.8 + i) * 0.02);

      array[idx + 2] = initialPositions[idx + 2] * radialExpansion;
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} name="music-particles">
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
