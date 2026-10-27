'use client';

import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { SynthesizerModel } from '@/components/visuals/synthesizer-model/synthesizer-model';

export function SynthesizerScene() {
  const [isPaused, setIsPaused] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);

  return (
    <div className="relative h-[360px] w-full max-w-full overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-surface/40 to-background/90 sm:h-[440px]">
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 2.6, 5.2], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="cursor-grab active:cursor-grabbing"
      >
        <ambientLight color="#3d3b54" intensity={0.8} />
        <directionalLight position={[4, 8, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-4, 2, 2]} intensity={2.5} color="#a78bfa" distance={10} />
        <pointLight position={[4, 1, -2]} intensity={2.0} color="#67e8f9" distance={10} />

        <SynthesizerModel isPaused={isPaused} audioEnabled={audioEnabled} />
      </Canvas>

      {/* Accessible Controls Overlay */}
      <div className="pointer-events-auto absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 rounded-xl border border-border/80 bg-background/80 px-3 py-2 text-xs backdrop-blur-md">
        <span className="font-mono text-[0.65rem] text-muted">
          Click or hover keys to play
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setAudioEnabled(prev => !prev)}
            className="rounded-control border border-border bg-surface/80 px-2.5 py-1 font-mono text-[0.65rem] text-muted transition-colors hover:border-accent hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            aria-label={audioEnabled ? 'Mute synth audio' : 'Unmute synth audio'}
          >
            Sound: {audioEnabled ? 'ON' : 'OFF'}
          </button>
          <button
            type="button"
            onClick={() => setIsPaused(prev => !prev)}
            className="rounded-control border border-border bg-surface/80 px-2.5 py-1 font-mono text-[0.65rem] text-muted transition-colors hover:border-accent hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            aria-label={isPaused ? 'Resume 3D movement' : 'Pause 3D movement'}
          >
            Motion: {isPaused ? 'PAUSED' : 'ACTIVE'}
          </button>
        </div>
      </div>
    </div>
  );
}
