'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useSyncExternalStore } from 'react';
import { HarmonicStage } from '@/components/three/harmonic-stage/harmonic-stage';

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
        camera={{ position: [0.8, 1.8, 5.6], fov: 42 }}
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        className="pointer-events-none"
      >
        <ambientLight intensity={1.0} color="#151726" />

        {/* Studio White Key Light */}
        <directionalLight position={[4, 7, 5]} intensity={2.4} color="#FFFFFF" />

        {/* Electric Lilac Fill Light */}
        <directionalLight position={[-4, 3, 2]} intensity={2.8} color="#A78BFA" />

        {/* Cyan Rim & Under-Glow Light */}
        <directionalLight position={[2, -3, 3]} intensity={2.5} color="#67E8F9" />

        {/* Specular Glint Center Point */}
        <pointLight position={[0, 2, 4]} intensity={1.8} color="#FFFFFF" />

        <Suspense fallback={null}>
          <HarmonicStage reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>
    </div>
  );
}
