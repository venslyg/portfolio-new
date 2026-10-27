'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { playNote } from '@/components/visuals/audio-synth/audio-synth';

// 18-key layout (11 white keys, 7 black keys across ~1.5 octaves)
const WHITE_KEY_COUNT = 11;
const WHITE_KEY_WIDTH = 0.32;
const WHITE_KEY_SPACING = 0.34;
const WHITE_KEY_OFFSET = -((WHITE_KEY_COUNT - 1) * WHITE_KEY_SPACING) / 2;

// Black key positions relative to white keys:
// Pattern: C#, D# (skip), F#, G#, A# (skip), C#, D#
const BLACK_KEY_INDICES = [0.5, 1.5, 3.5, 4.5, 5.5, 7.5, 8.5];

// Map keyboard keys for audio note playback
const WHITE_NOTES = [0, 2, 4, 5, 7, 9, 11, 12, 14, 16, 17]; // C4 to F5
const BLACK_NOTES = [1, 3, 6, 8, 10, 13, 15]; // C#4 to D#5

// Deterministic pseudo-random number generator for consistent particle distribution
function pseudoRandom(seed: number) {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

// Pre-computed static particle buffers
const PARTICLE_COUNT = 80;
const INITIAL_POSITIONS = new Float32Array(PARTICLE_COUNT * 3);
const PARTICLE_VELOCITIES = new Float32Array(PARTICLE_COUNT * 3);
const PARTICLE_COLORS = new Float32Array(PARTICLE_COUNT * 3);

const COLOR_LILAC = new THREE.Color('#a78bfa');
const COLOR_CYAN = new THREE.Color('#67e8f9');
const COLOR_WHITE = new THREE.Color('#f4f4f7');

for (let i = 0; i < PARTICLE_COUNT; i++) {
  const i3 = i * 3;
  const p1 = pseudoRandom(i * 3 + 1);
  const p2 = pseudoRandom(i * 3 + 2);
  const p3 = pseudoRandom(i * 3 + 3);

  INITIAL_POSITIONS[i3] = (p1 - 0.5) * 4.2;
  INITIAL_POSITIONS[i3 + 1] = (p2 - 0.5) * 1.5;
  INITIAL_POSITIONS[i3 + 2] = (p3 - 0.5) * 2.2;

  PARTICLE_VELOCITIES[i3] = (pseudoRandom(i * 7 + 1) - 0.5) * 4.5;
  PARTICLE_VELOCITIES[i3 + 1] = 0.8 + pseudoRandom(i * 7 + 2) * 3.5;
  PARTICLE_VELOCITIES[i3 + 2] = (pseudoRandom(i * 7 + 3) - 0.5) * 3.8;

  const pick = pseudoRandom(i * 11);
  const chosenColor = pick < 0.45 ? COLOR_LILAC : pick < 0.85 ? COLOR_CYAN : COLOR_WHITE;
  PARTICLE_COLORS[i3] = chosenColor.r;
  PARTICLE_COLORS[i3 + 1] = chosenColor.g;
  PARTICLE_COLORS[i3 + 2] = chosenColor.b;
}

type SynthesizerModelProps = {
  isPaused?: boolean;
  audioEnabled?: boolean;
};

export function SynthesizerModel({ isPaused = false, audioEnabled = true }: SynthesizerModelProps) {
  const rootGroupRef = useRef<THREE.Group>(null);
  const chassisRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Key mesh arrays
  const whiteKeyRefs = useRef<(THREE.Mesh | null)[]>([]);
  const blackKeyRefs = useRef<(THREE.Mesh | null)[]>([]);

  // OLED 3D frequency bars
  const eqBarRefs = useRef<(THREE.Mesh | null)[]>([]);

  const [activeKey, setActiveKey] = useState<string | null>(null);

  // Frame animation loop
  useFrame((state, delta) => {
    if (!rootGroupRef.current) return;

    const time = state.clock.getElapsedTime();

    if (!isPaused) {
      // Gentle harmonic idle floating
      rootGroupRef.current.position.y = Math.sin(time * 1.2) * 0.04;

      // Pointer parallax tracking
      const targetRotX = 0.42 + state.pointer.y * 0.12;
      const targetRotY = -0.32 + state.pointer.x * 0.18;
      const targetRotZ = -0.04;

      rootGroupRef.current.rotation.x = THREE.MathUtils.damp(
        rootGroupRef.current.rotation.x,
        targetRotX,
        4,
        delta
      );
      rootGroupRef.current.rotation.y = THREE.MathUtils.damp(
        rootGroupRef.current.rotation.y,
        targetRotY,
        4,
        delta
      );
      rootGroupRef.current.rotation.z = THREE.MathUtils.damp(
        rootGroupRef.current.rotation.z,
        targetRotZ,
        4,
        delta
      );
    }

    // 1. Chassis stays firmly positioned
    if (chassisRef.current) {
      chassisRef.current.position.set(0, 0, 0);
    }

    // 2. Animate White Keys accurately (accurate key press motion, no dispersion)
    whiteKeyRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const xBase = WHITE_KEY_OFFSET + i * WHITE_KEY_SPACING;
      const isPressed = activeKey === `w-${i}`;

      mesh.position.x = xBase;
      mesh.position.y = isPressed ? -0.045 : 0;
      mesh.position.z = 0;
      mesh.rotation.x = isPressed ? 0.035 : 0;
      mesh.rotation.y = 0;
    });

    // 3. Animate Black Keys accurately (accurate key press motion, no dispersion)
    blackKeyRefs.current.forEach((mesh, idx) => {
      if (!mesh) return;
      const offsetIndex = BLACK_KEY_INDICES[idx];
      const xBase = WHITE_KEY_OFFSET + offsetIndex * WHITE_KEY_SPACING;
      const isPressed = activeKey === `b-${idx}`;

      mesh.position.x = xBase;
      mesh.position.y = isPressed ? -0.04 : 0;
      mesh.position.z = 0;
      mesh.rotation.x = isPressed ? 0.035 : 0;
      mesh.rotation.y = 0;
    });

    // 4. Animate 3D Equalizer Spectrum Bars on the OLED screen
    eqBarRefs.current.forEach((bar, idx) => {
      if (!bar) return;
      const wave = Math.sin(time * 6 + idx * 0.6) * 0.5 + 0.5;
      const activePulse = activeKey ? 1.6 : 1.0;
      const targetScaleY = THREE.MathUtils.clamp((0.15 + wave * 0.7) * activePulse, 0.1, 1.8);
      bar.scale.y = THREE.MathUtils.damp(bar.scale.y, targetScaleY, 12, delta);
      bar.position.y = (bar.scale.y * 0.18) / 2;
    });

    // 5. Ambient particles float gently around the chassis without explosion
    if (particlesRef.current) {
      const posAttr = particlesRef.current.geometry.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;
        posArray[i3] = INITIAL_POSITIONS[i3] + Math.sin(time * 0.6 + i) * 0.08;
        posArray[i3 + 1] = INITIAL_POSITIONS[i3 + 1] + Math.cos(time * 0.5 + i) * 0.08;
        posArray[i3 + 2] = INITIAL_POSITIONS[i3 + 2] + Math.sin(time * 0.4 + i) * 0.05;
      }
      posAttr.needsUpdate = true;
    }
  });

  function handleKeyPress(id: string, noteIndex: number) {
    setActiveKey(id);
    if (audioEnabled) {
      playNote(noteIndex);
    }
    setTimeout(() => {
      setActiveKey(curr => (curr === id ? null : curr));
    }, 240);
  }

  return (
    <group ref={rootGroupRef} position={[0, 0, 0]} rotation={[0.42, -0.32, -0.06]}>
      {/* ================= MAIN CHASSIS ================= */}
      <group ref={chassisRef}>
        {/* Sculpted Obsidian / Titanium Body */}
        <mesh castShadow receiveShadow position={[0, 0, 0]}>
          <boxGeometry args={[4.6, 0.42, 2.3]} />
          <meshStandardMaterial
            color="#141724"
            roughness={0.28}
            metalness={0.65}
          />
        </mesh>

        {/* Sculpted Walnut End-Cheeks (Left & Right) */}
        {[-2.35, 2.35].map((x, idx) => (
          <mesh key={idx} position={[x, 0.04, 0]}>
            <boxGeometry args={[0.16, 0.48, 2.34]} />
            <meshStandardMaterial
              color="#2a1e22"
              roughness={0.4}
              metalness={0.2}
            />
          </mesh>
        ))}

        {/* Recessed Control Surface Tray */}
        <mesh position={[0, 0.22, -0.48]}>
          <boxGeometry args={[4.4, 0.04, 1.15]} />
          <meshStandardMaterial color="#0c0e14" roughness={0.7} metalness={0.4} />
        </mesh>

        {/* Red Felt Dust-Damper Strip behind keys */}
        <mesh position={[0, 0.225, 0.12]}>
          <boxGeometry args={[4.38, 0.03, 0.06]} />
          <meshStandardMaterial color="#b91c1c" roughness={0.9} />
        </mesh>

        {/* Laser LED Strip */}
        <mesh position={[0, 0.23, -1.02]}>
          <boxGeometry args={[4.35, 0.02, 0.05]} />
          <meshStandardMaterial color="#a78bfa" emissive="#a78bfa" emissiveIntensity={0.8} />
        </mesh>

        {/* Pitch-Bend & Modulation Wheels */}
        <group position={[-1.85, 0.25, -0.3]}>
          {[-0.14, 0.14].map((offset, idx) => (
            <group key={idx} position={[offset, 0, 0]}>
              <mesh rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.18, 0.18, 0.12, 24]} />
                <meshStandardMaterial color="#212534" roughness={0.3} metalness={0.8} />
              </mesh>
              <mesh rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.182, 0.182, 0.02, 24]} />
                <meshStandardMaterial color="#67e8f9" emissive="#67e8f9" emissiveIntensity={1} />
              </mesh>
            </group>
          ))}
        </group>

        {/* OLED Screen Bezel */}
        <mesh position={[0.5, 0.24, -0.5]}>
          <boxGeometry args={[1.9, 0.02, 0.7]} />
          <meshStandardMaterial color="#080a12" roughness={0.2} metalness={0.5} />
        </mesh>

        {/* 3D Equalizer Spectrum Bars on OLED Screen */}
        <group position={[-0.2, 0.26, -0.5]}>
          {Array.from({ length: 14 }, (_, idx) => {
            const x = -0.65 + idx * 0.1;
            return (
              <mesh
                key={idx}
                ref={el => {
                  eqBarRefs.current[idx] = el;
                }}
                position={[x, 0.08, 0]}
              >
                <boxGeometry args={[0.06, 0.18, 0.35]} />
                <meshStandardMaterial
                  color="#67e8f9"
                  emissive="#67e8f9"
                  emissiveIntensity={1.2}
                />
              </mesh>
            );
          })}
        </group>

        {/* Rotary Knobs */}
        {[-0.9, -0.5, -0.1].map((x, idx) => (
          <group key={idx} position={[x, 0.28, -0.45]}>
            <mesh>
              <cylinderGeometry args={[0.11, 0.13, 0.16, 24]} />
              <meshStandardMaterial color="#222636" metalness={0.85} roughness={0.25} />
            </mesh>
            <mesh position={[0, 0.09, 0.07]}>
              <sphereGeometry args={[0.022, 12, 12]} />
              <meshStandardMaterial
                color={idx === 1 ? '#67e8f9' : '#a78bfa'}
                emissive={idx === 1 ? '#67e8f9' : '#a78bfa'}
                emissiveIntensity={1.2}
              />
            </mesh>
          </group>
        ))}

        {/* Under-Glow Atmosphere Strip */}
        <mesh position={[0, -0.18, 1.05]}>
          <boxGeometry args={[4.2, 0.03, 0.04]} />
          <meshStandardMaterial color="#67e8f9" emissive="#67e8f9" emissiveIntensity={1.2} />
        </mesh>
      </group>

      {/* ================= DISPERSING PIANO KEYS ================= */}
      {/* White Keys */}
      <group position={[0, 0.14, 0.4]}>
        {Array.from({ length: WHITE_KEY_COUNT }, (_, i) => {
          const id = `w-${i}`;
          const isPressed = activeKey === id;
          const xBase = WHITE_KEY_OFFSET + i * WHITE_KEY_SPACING;
          const note = WHITE_NOTES[i];

          return (
            <mesh
              key={id}
              ref={el => {
                whiteKeyRefs.current[i] = el;
              }}
              position={[xBase, 0, 0]}
              onPointerDown={e => {
                e.stopPropagation();
                handleKeyPress(id, note);
              }}
              onPointerOver={() => {
                if (activeKey === null) handleKeyPress(id, note);
              }}
              castShadow
            >
              <boxGeometry args={[WHITE_KEY_WIDTH, 0.15, 1.18]} />
              <meshStandardMaterial
                color={isPressed ? '#dcd6ff' : '#f8f8fb'}
                emissive={isPressed ? '#a78bfa' : '#000000'}
                emissiveIntensity={isPressed ? 0.7 : 0}
                roughness={0.25}
                metalness={0.15}
              />
            </mesh>
          );
        })}
      </group>

      {/* Black Keys */}
      <group position={[0, 0.24, 0.18]}>
        {BLACK_KEY_INDICES.map((offsetIndex, idx) => {
          const id = `b-${idx}`;
          const isPressed = activeKey === id;
          const xBase = WHITE_KEY_OFFSET + offsetIndex * WHITE_KEY_SPACING;
          const note = BLACK_NOTES[idx];

          return (
            <mesh
              key={id}
              ref={el => {
                blackKeyRefs.current[idx] = el;
              }}
              position={[xBase, 0, 0]}
              onPointerDown={e => {
                e.stopPropagation();
                handleKeyPress(id, note);
              }}
              onPointerOver={() => {
                if (activeKey === null) handleKeyPress(id, note);
              }}
              castShadow
            >
              <boxGeometry args={[0.2, 0.18, 0.72]} />
              <meshStandardMaterial
                color={isPressed ? '#172233' : '#080a0f'}
                emissive={isPressed ? '#67e8f9' : '#000000'}
                emissiveIntensity={isPressed ? 0.8 : 0}
                roughness={0.35}
                metalness={0.4}
              />
            </mesh>
          );
        })}
      </group>

      {/* ================= FLOATING SONIC PARTICLE SHARDS ================= */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[INITIAL_POSITIONS, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[PARTICLE_COLORS, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.065}
          vertexColors
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
