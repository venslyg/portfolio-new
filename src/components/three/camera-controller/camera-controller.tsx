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
    const isDesktop = typeof window !== 'undefined' ? window.innerWidth >= 1024 : true;
    const targetX = isDesktop ? Math.min(Math.max((progress - 0.06) / 0.26, 0), 1) * 0.45 : 0;
    const targetY = (isDesktop ? 2.1 : 2.5) + progress * 1.5;
    const targetZ = (isDesktop ? 6.8 : 7.6) + progress * 1.8;

    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 5, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 5, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 5, delta);

    // Target focal lookAt point
    const lookAtX = isDesktop ? targetX * 0.8 : 0;
    const lookAtY = (isDesktop ? 0.35 : -0.1) + progress * 0.55;
    camera.lookAt(lookAtX, lookAtY, 0);
  });

  return null;
}
