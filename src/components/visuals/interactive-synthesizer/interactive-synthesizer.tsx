'use client';

import { useSyncExternalStore } from 'react';
import dynamic from 'next/dynamic';
import { SynthesizerPreview } from '@/components/visuals/synthesizer-preview/synthesizer-preview';

type InteractiveSynthesizerProps = {
  className?: string;
  isFullWidth?: boolean;
};

// Dynamically import the 3D WebGL scene with SSR disabled.
// Uses the static SynthesizerPreview as the loading fallback.
const SynthesizerScene = dynamic(
  () =>
    import('@/components/visuals/synthesizer-scene/synthesizer-scene').then(
      mod => mod.SynthesizerScene
    ),
  {
    ssr: false,
    loading: () => <SynthesizerPreview />,
  }
);

function checkWebGLSupport(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

function subscribe(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
}

function getClientSnapshot(): boolean {
  if (typeof window === 'undefined') return false;
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;
  return checkWebGLSupport() && !prefersReducedMotion;
}

function getServerSnapshot(): boolean {
  return false;
}

export function InteractiveSynthesizer({
  className = '',
  isFullWidth = false,
}: InteractiveSynthesizerProps) {
  const canRender3D = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot
  );

  if (!canRender3D) {
    return <SynthesizerPreview />;
  }

  return <SynthesizerScene className={className} isFullWidth={isFullWidth} />;
}
