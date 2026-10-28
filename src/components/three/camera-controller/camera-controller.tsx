'use client';

import { useFrame } from '@react-three/fiber';
import type { RefObject } from 'react';
import * as THREE from 'three';
import type { StageScrollState } from '@/hooks/use-stage-scroll/use-stage-scroll';

interface CameraControllerProps {
  scrollRef: RefObject<StageScrollState>;
  reducedMotion?: boolean;
}

export function CameraController({ scrollRef, reducedMotion = false }: CameraControllerProps) {
  useFrame(({ camera }, delta) => {
    // 1. Smoothly interpolate current scroll progress toward target
    const scrollState = scrollRef.current;
    if (scrollState) {
      scrollState.current = THREE.MathUtils.damp(
        scrollState.current,
        scrollState.target,
        7.5,
        delta
      );
    }

    if (reducedMotion) return;

    const progress = scrollState ? scrollState.current : 0;

    // 2. Camera Choreography (Hero assembled -> Stage activation & dispersion)
    // Baseline: [0, 2.3, 6.6]
    const targetX = 0 + progress * 0.42;
    const targetY = 2.3 + progress * 0.72;
    const targetZ = 6.6 - progress * 0.38;

    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 7, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 7, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 7, delta);

    // Target focal lookAt point (elevates slightly as stage rings separate)
    const lookAtY = 0.38 + progress * 0.25;
    camera.lookAt(0, lookAtY, 0);
  });

  return null;
}
