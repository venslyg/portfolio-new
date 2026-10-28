'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useSyncExternalStore } from 'react';
import { HarmonicStage } from '@/components/three/harmonic-stage/harmonic-stage';
import { StageLighting } from '@/components/three/stage-lighting/stage-lighting';

interface HarmonicStageSceneProps {
  reducedMotion?: boolean;
  className?: string;
}

function checkWebGLSupport() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
  } catch {
    return false;
  }
}

function subscribeNoop() {
  return () => {};
}

export function HarmonicStageScene({ reducedMotion = false, className = '' }: HarmonicStageSceneProps) {
  const hasWebGL = useSyncExternalStore(subscribeNoop, checkWebGLSupport, () => true);

  if (!hasWebGL) {
    return (
      <div className={`relative flex h-full w-full items-center justify-center ${className}`}>
        <div className="h-64 w-64 rounded-full border border-accent/20 bg-accent/5 backdrop-blur-md" />
      </div>
    );
  }

  return (
    <div className={`relative h-full w-full ${className}`}>
      <Canvas
        camera={{ position: [0, 2.3, 6.6], fov: 38 }}
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        className="pointer-events-none"
      >
        <StageLighting />

        <Suspense fallback={null}>
          <HarmonicStage reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>
    </div>
  );
}
