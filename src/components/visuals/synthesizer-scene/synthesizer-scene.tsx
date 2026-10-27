'use client';

import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { SynthesizerModel } from '@/components/visuals/synthesizer-model/synthesizer-model';

type SynthesizerSceneProps = {
  className?: string;
  isFullWidth?: boolean;
};

export function SynthesizerScene({
  className = '',
  isFullWidth = false,
}: SynthesizerSceneProps) {
  const [isPaused, setIsPaused] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);

  return (
    <div
      className={`relative w-full overflow-hidden transition-all duration-300 ${
        isFullWidth
          ? 'h-[280px] sm:h-[440px] lg:h-[600px] xl:h-[640px]'
          : 'h-[280px] sm:h-[440px] rounded-2xl border border-border/80 bg-gradient-to-b from-surface/30 to-background/90'
      } ${className}`}
      style={{ touchAction: 'pan-y' }}
    >
      {/* Ambient background glow & radial depth */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent opacity-70"
        aria-hidden="true"
      />

      {/* 3D WebGL Canvas */}
      <Canvas
        camera={{ position: [0, 2.4, 5.5], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        className="z-10 cursor-grab active:cursor-grabbing"
      >
        <ambientLight color="#25273b" intensity={0.9} />
        {/* Studio Key Light */}
        <directionalLight position={[4, 9, 6]} intensity={1.8} color="#ffffff" castShadow />
        {/* Rim Light 1: Cyan */}
        <pointLight position={[-5, 2.5, 3]} intensity={3.5} color="#67e8f9" distance={12} />
        {/* Rim Light 2: Lilac */}
        <pointLight position={[5, 1.5, -2]} intensity={2.8} color="#a78bfa" distance={12} />
        {/* Floor Uplight: Warm Gold / Amber */}
        <pointLight position={[0, -2, 2]} intensity={1.2} color="#f59e0b" distance={8} />

        <SynthesizerModel isPaused={isPaused} audioEnabled={audioEnabled} />
      </Canvas>

      {/* Accessible Glassmorphic Controls Overlay */}
      <div className="pointer-events-auto absolute bottom-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/70 bg-background/85 px-3.5 py-2 text-xs shadow-2xl backdrop-blur-md sm:left-auto sm:right-6">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="font-mono text-[0.68rem] text-muted">
            Click / touch keys • Solid 3D Instrument
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setAudioEnabled(prev => !prev)}
            className={`flex items-center gap-1.5 rounded-control border px-2.5 py-1 font-mono text-[0.68rem] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent ${
              audioEnabled
                ? 'border-accent/60 bg-accent/15 text-foreground'
                : 'border-border bg-surface/80 text-muted hover:border-border/80 hover:text-foreground'
            }`}
            aria-label={audioEnabled ? 'Mute synth audio' : 'Unmute synth audio'}
          >
            <span aria-hidden="true">{audioEnabled ? '🔊' : '🔇'}</span>
            <span>Sound: {audioEnabled ? 'ON' : 'OFF'}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsPaused(prev => !prev)}
            className={`rounded-control border px-2.5 py-1 font-mono text-[0.68rem] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent ${
              isPaused
                ? 'border-accent-secondary/60 bg-accent-secondary/15 text-foreground'
                : 'border-border bg-surface/80 text-muted hover:border-border/80 hover:text-foreground'
            }`}
            aria-label={isPaused ? 'Resume 3D movement' : 'Pause 3D movement'}
          >
            Motion: {isPaused ? 'PAUSED' : 'ACTIVE'}
          </button>
        </div>
      </div>
    </div>
  );
}
