'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { playNote } from '@/components/visuals/audio-synth/audio-synth';

// Piano white key layout (14 keys ~ 2 octaves)
const WHITE_KEY_COUNT = 14;
const WHITE_KEY_WIDTH = 0.30;
const WHITE_KEY_SPACING = 0.32;
const WHITE_KEY_OFFSET = -((WHITE_KEY_COUNT - 1) * WHITE_KEY_SPACING) / 2;

// Black key positions relative to white key indices:
// Pattern: C#, D# (skip), F#, G#, A# (skip), C#, D#, etc.
const BLACK_KEY_OFFSETS = [0.5, 1.5, 3.5, 4.5, 5.5, 7.5, 8.5, 10.5, 11.5, 12.5];

type SynthesizerModelProps = {
  isPaused?: boolean;
  audioEnabled?: boolean;
};

export function SynthesizerModel({ isPaused = false, audioEnabled = true }: SynthesizerModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [activeKey, setActiveKey] = useState<string | null>(null);

  // Smooth floating and mouse parallax damping
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (!isPaused) {
      const time = state.clock.getElapsedTime();
      // Gentle harmonic floating bob
      groupRef.current.position.y = Math.sin(time * 1.4) * 0.08;

      // Pointer parallax tracking with damping
      const targetRotX = 0.45 + state.pointer.y * 0.18;
      const targetRotY = -0.35 + state.pointer.x * 0.25;

      groupRef.current.rotation.x = THREE.MathUtils.damp(
        groupRef.current.rotation.x,
        targetRotX,
        4,
        delta
      );
      groupRef.current.rotation.y = THREE.MathUtils.damp(
        groupRef.current.rotation.y,
        targetRotY,
        4,
        delta
      );
      groupRef.current.rotation.z = THREE.MathUtils.damp(
        groupRef.current.rotation.z,
        -0.08,
        4,
        delta
      );
    }
  });

  function handleKeyPress(id: string, noteIndex: number) {
    setActiveKey(id);
    if (audioEnabled) {
      playNote(noteIndex);
    }
    setTimeout(() => {
      setActiveKey(curr => (curr === id ? null : curr));
    }, 220);
  }

  return (
    <group ref={groupRef} position={[0, 0, 0]} rotation={[0.45, -0.35, -0.08]}>
      {/* Main Synthesizer Chassis */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[4.8, 0.4, 2.2]} />
        <meshStandardMaterial color="#161822" roughness={0.4} metalness={0.25} />
      </mesh>

      {/* Recessed Control Panel */}
      <mesh position={[0, 0.21, -0.45]}>
        <boxGeometry args={[4.6, 0.03, 1.0]} />
        <meshStandardMaterial color="#0e1017" roughness={0.8} />
      </mesh>

      {/* Glowing OLED Display */}
      <mesh position={[0.4, 0.23, -0.45]}>
        <boxGeometry args={[1.8, 0.03, 0.6]} />
        <meshStandardMaterial
          color="#090d14"
          emissive="#67e8f9"
          emissiveIntensity={0.25}
          roughness={0.2}
        />
      </mesh>

      {/* Rotary Knobs */}
      {[-1.6, -1.2, -0.8].map((xPos, idx) => (
        <group key={idx} position={[xPos, 0.28, -0.45]}>
          <mesh rotation={[0, 0, 0]}>
            <cylinderGeometry args={[0.12, 0.14, 0.14, 24]} />
            <meshStandardMaterial color="#262a38" metalness={0.7} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.08, 0.08]}>
            <sphereGeometry args={[0.02, 12, 12]} />
            <meshStandardMaterial color="#a78bfa" emissive="#a78bfa" emissiveIntensity={1} />
          </mesh>
        </group>
      ))}

      {/* Accent Bezel LED Strip */}
      <mesh position={[0, 0.22, -0.92]}>
        <boxGeometry args={[4.5, 0.02, 0.04]} />
        <meshStandardMaterial color="#a78bfa" emissive="#a78bfa" emissiveIntensity={0.8} />
      </mesh>

      {/* White Keys */}
      <group position={[0, 0.12, 0.35]}>
        {Array.from({ length: WHITE_KEY_COUNT }, (_, index) => {
          const id = `w-${index}`;
          const isPressed = activeKey === id;
          const x = WHITE_KEY_OFFSET + index * WHITE_KEY_SPACING;

          return (
            <mesh
              key={id}
              position={[x, isPressed ? -0.035 : 0, 0]}
              onPointerDown={() => handleKeyPress(id, index)}
              onPointerOver={() => activeKey === null && handleKeyPress(id, index)}
              castShadow
            >
              <boxGeometry args={[WHITE_KEY_WIDTH, 0.14, 1.15]} />
              <meshStandardMaterial
                color={isPressed ? '#dcd6ff' : '#f4f4f7'}
                emissive={isPressed ? '#a78bfa' : '#000000'}
                emissiveIntensity={isPressed ? 0.6 : 0}
                roughness={0.3}
              />
            </mesh>
          );
        })}
      </group>

      {/* Black Keys */}
      <group position={[0, 0.22, 0.12]}>
        {BLACK_KEY_OFFSETS.map((offsetIndex, idx) => {
          const id = `b-${idx}`;
          const isPressed = activeKey === id;
          const x = WHITE_KEY_OFFSET + offsetIndex * WHITE_KEY_SPACING;

          return (
            <mesh
              key={id}
              position={[x, isPressed ? -0.04 : 0, 0]}
              onPointerDown={() => handleKeyPress(id, idx + 2)}
              onPointerOver={() => activeKey === null && handleKeyPress(id, idx + 2)}
              castShadow
            >
              <boxGeometry args={[0.18, 0.18, 0.7]} />
              <meshStandardMaterial
                color={isPressed ? '#1e2837' : '#0a0c10'}
                emissive={isPressed ? '#67e8f9' : '#000000'}
                emissiveIntensity={isPressed ? 0.7 : 0}
                roughness={0.4}
              />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}
