'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useSyncExternalStore } from 'react';
import { MusicalFragments } from '@/components/three/musical-fragments/musical-fragments';

interface MusicDispersionSceneProps {
  scrollProgressRef: React.RefObject<number>;
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

export function MusicDispersionScene({ scrollProgressRef }: MusicDispersionSceneProps) {
  const hasWebGL = useSyncExternalStore(subscribeNoop, checkWebGLSupport, () => true);

  if (!hasWebGL) {
    return null;
  }

  return (
    <div className="relative h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 42 }}
        dpr={[1, 1.75]} // Cap DPI to 1.75 for high performance on 4k/retina screens
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        className="pointer-events-none"
      >
        <ambientLight intensity={1.2} color="#1E1B4B" />
        
        {/* Lilac Key Light */}
        <directionalLight
          position={[4, 6, 5]}
          intensity={2.8}
          color="#A78BFA"
        />

        {/* Cyan Rim Light */}
        <directionalLight
          position={[-5, -3, 3]}
          intensity={2.4}
          color="#67E8F9"
        />

        {/* Prismatic Specular Accent */}
        <pointLight position={[0, 1, 4]} intensity={2.0} color="#FFFFFF" />

        <Suspense fallback={null}>
          <MusicalFragments scrollProgressRef={scrollProgressRef} />
        </Suspense>
      </Canvas>
    </div>
  );
}
