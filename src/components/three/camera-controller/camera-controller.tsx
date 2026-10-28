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
        7.0,
        delta
      );
    }

    if (reducedMotion) return;

    const progress = scrollState ? scrollState.current : 0;

    // 2. Camera Choreography for Large Stage & Dramatic Scroll Dispersion
    // Baseline: [0, 2.2, 6.4] looking at (0, 0.45, 0)
    const targetX = 0;
    const targetY = 2.2 + progress * 1.4;
    const targetZ = 6.4 + progress * 1.5;

    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 7, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 7, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 7, delta);

    // Target focal lookAt point
    const lookAtY = 0.45 + progress * 0.55;
    camera.lookAt(0, lookAtY, 0);
  });

  return null;
}
