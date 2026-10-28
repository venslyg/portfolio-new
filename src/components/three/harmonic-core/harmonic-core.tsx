'use client';

import { useFrame } from '@react-three/fiber';
import { useMemo, useRef, type RefObject } from 'react';
import * as THREE from 'three';
import type { StageScrollState } from '@/hooks/use-stage-scroll/use-stage-scroll';

interface HarmonicCoreProps {
  scrollRef?: RefObject<StageScrollState>;
  reducedMotion?: boolean;
}

export function HarmonicCore({ scrollRef, reducedMotion = false }: HarmonicCoreProps) {
  const coreGroupRef = useRef<THREE.Group>(null);
  const orbRef = useRef<THREE.Mesh>(null);
  const cageRef = useRef<THREE.Mesh>(null);
  const waveformGroupRef = useRef<THREE.Group>(null);
  const staffRibbonRef = useRef<THREE.Group>(null);
  const notesGroupRef = useRef<THREE.Group>(null);
  const coreLightRef = useRef<THREE.PointLight>(null);

  // Materials
  const materials = useMemo(() => {
    return {
      coreGlow: new THREE.MeshStandardMaterial({
        color: '#A78BFA',
        emissive: '#8B5CF6',
        emissiveIntensity: 3.2,
        roughness: 0.15,
        metalness: 0.85,
        toneMapped: false,
      }),
      cyanWireframe: new THREE.MeshStandardMaterial({
        color: '#67E8F9',
        wireframe: true,
        transparent: true,
        opacity: 0.75,
        emissive: '#22D3EE',
        emissiveIntensity: 1.8,
      }),
      waveformBarCyan: new THREE.MeshStandardMaterial({
        color: '#67E8F9',
        emissive: '#06B6D4',
        emissiveIntensity: 2.8,
        roughness: 0.25,
        metalness: 0.75,
      }),
      waveformBarLilac: new THREE.MeshStandardMaterial({
        color: '#C084FC',
        emissive: '#9333EA',
        emissiveIntensity: 2.8,
        roughness: 0.25,
        metalness: 0.75,
      }),
      staffLine: new THREE.MeshStandardMaterial({
        color: '#A78BFA',
        emissive: '#7C3AED',
        emissiveIntensity: 2.4,
        transparent: true,
        opacity: 0.65,
      }),
      musicalNote: new THREE.MeshStandardMaterial({
        color: '#F4F4F7',
        emissive: '#67E8F9',
        emissiveIntensity: 1.6,
        metalness: 0.95,
        roughness: 0.1,
      }),
    };
  }, []);

  // 24 Radial Audio Waveform Pillars around the core
  const waveformBars = useMemo(() => {
    const bars = [];
    const count = 24;
    const radius = 0.52;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      bars.push({
        angle,
        x: Math.cos(angle) * radius,
        z: Math.sin(angle) * radius,
        baseHeight: 0.08 + Math.abs(Math.sin(i * 0.8)) * 0.16,
        freqOffset: i * 0.5,
        isCyan: i % 2 === 0,
      });
    }
    return bars;
  }, []);

  // 3 Floating Musical Notes at orbital positions
  const musicalNotes = useMemo(() => {
    return [
      { angle: 0.4, radius: 0.76, y: 0.72, hasDoubleFlag: false },
      { angle: 2.5, radius: 0.82, y: 0.86, hasDoubleFlag: true },
      { angle: 4.6, radius: 0.78, y: 0.64, hasDoubleFlag: false },
    ];
  }, []);

  useFrame(({ clock }, delta) => {
    const progress = !reducedMotion && scrollRef?.current ? scrollRef.current.current : 0;
    const time = clock.getElapsedTime();

    // 1. Core group dramatic vertical elevation into upper atmosphere
    if (coreGroupRef.current) {
      const ambientBob = reducedMotion ? 0 : Math.sin(time * 1.6) * 0.04;
      coreGroupRef.current.position.y = 0.68 + progress * 1.85 + ambientBob;
    }

    // 2. Inner orb pulsing, expansion & counter-rotation
    if (orbRef.current) {
      if (!reducedMotion) {
        orbRef.current.rotation.y += delta * 0.5;
      }
      const pulse = 1 + (reducedMotion ? 0 : Math.sin(time * 3.2) * 0.08);
      const orbScale = pulse * (1 + progress * 0.75);
      orbRef.current.scale.set(orbScale, orbScale, orbScale);
    }

    // 3. Cage gyroscopic rotation & expansion
    if (cageRef.current) {
      if (!reducedMotion) {
        cageRef.current.rotation.x += delta * 0.6;
        cageRef.current.rotation.y -= delta * 0.4;
        cageRef.current.rotation.z += delta * 0.3;
      }
      const cageScale = 1 + progress * 0.95;
      cageRef.current.scale.set(cageScale, cageScale, cageScale);
    }

    // 4. Waveform EQ bars: explosive outward radial dispersal
    if (waveformGroupRef.current) {
      if (!reducedMotion) {
        waveformGroupRef.current.rotation.y -= delta * 0.2;
      }
      const radialScale = 1 + progress * 1.65;
      waveformGroupRef.current.scale.set(radialScale, 1 + progress * 0.5, radialScale);
      waveformGroupRef.current.position.y = -0.32 - progress * 0.45;

      waveformGroupRef.current.children.forEach((child, idx) => {
        const bar = waveformBars[idx];
        if (bar) {
          const bounce = reducedMotion ? bar.baseHeight : 0.06 + Math.abs(Math.sin(time * 3.4 + bar.freqOffset)) * 0.28;
          const dynamicHeight = bounce * (1 + progress * 1.5);
          child.scale.y = dynamicHeight / 0.1;
          child.position.y = dynamicHeight / 2;
        }
      });
    }

    // 5. Staff ribbons: vertical acoustic iris expansion
    if (staffRibbonRef.current) {
      if (!reducedMotion) {
        staffRibbonRef.current.rotation.y += delta * 0.25;
        staffRibbonRef.current.rotation.z = Math.sin(time * 0.8) * 0.15;
      }
      const ribbonScale = 1 + progress * 1.4;
      staffRibbonRef.current.scale.set(ribbonScale, 1 + progress * 1.8, ribbonScale);
      staffRibbonRef.current.position.y = progress * 0.65;
    }

    // 6. Musical notes: wide orbital expansion and elevation
    if (notesGroupRef.current) {
      notesGroupRef.current.children.forEach((child, idx) => {
        const note = musicalNotes[idx];
        if (note) {
          const currentAngle = note.angle + (reducedMotion ? 0 : time * 0.35);
          const currentRadius = note.radius * (1 + progress * 1.85);
          child.position.x = Math.cos(currentAngle) * currentRadius;
          child.position.z = Math.sin(currentAngle) * currentRadius;
          child.position.y = note.y + progress * 1.55 + (reducedMotion ? 0 : Math.sin(time * 2.2 + idx * 1.5) * 0.08);
          child.rotation.y = -currentAngle + Math.PI / 2;
        }
      });
    }

    // 7. Core light intensity pulse & amplification on scroll
    if (coreLightRef.current) {
      const pulse = reducedMotion ? 2.8 : 2.4 + Math.sin(time * 2.8) * 0.8;
      coreLightRef.current.intensity = pulse + progress * 5.0;
    }
  });

  return (
    <group ref={coreGroupRef} position={[0, 0.68, 0]} name="harmonic-core">
      {/* Central Pulsing Energy Core */}
      <mesh ref={orbRef} material={materials.coreGlow}>
        <sphereGeometry args={[0.2, 32, 32]} />
      </mesh>

      {/* Futuristic Geodesic Wireframe Cage */}
      <mesh ref={cageRef} material={materials.cyanWireframe}>
        <icosahedronGeometry args={[0.32, 1]} />
      </mesh>

      {/* ================= 3D AUDIO SPECTRUM WAVEFORM ================= */}
      <group ref={waveformGroupRef} position={[0, -0.32, 0]}>
        {waveformBars.map((bar, idx) => (
          <mesh
            key={idx}
            position={[bar.x, bar.baseHeight / 2, bar.z]}
            material={bar.isCyan ? materials.waveformBarCyan : materials.waveformBarLilac}
          >
            <cylinderGeometry args={[0.016, 0.016, 0.1, 12]} />
          </mesh>
        ))}
      </group>

      {/* ================= CURVED MUSICAL STAFF RIBBONS ================= */}
      <group ref={staffRibbonRef} rotation={[0.3, 0.2, -0.15]}>
        {[-0.08, -0.04, 0, 0.04, 0.08].map((yOffset, i) => (
          <mesh
            key={i}
            material={materials.staffLine}
            position={[0, yOffset, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <torusGeometry args={[0.66 + i * 0.02, 0.005, 8, 48]} />
          </mesh>
        ))}
      </group>

      {/* ================= FLOATING 3D MUSICAL NOTES ================= */}
      <group ref={notesGroupRef}>
        {musicalNotes.map((note, idx) => (
          <group
            key={idx}
            position={[Math.cos(note.angle) * note.radius, note.y, Math.sin(note.angle) * note.radius]}
            scale={0.85}
          >
            {/* Note Head: Tilted Flattened Sphere */}
            <mesh
              material={materials.musicalNote}
              position={[0, 0, 0]}
              rotation={[0, 0, -Math.PI / 6]}
              scale={[1.3, 0.85, 0.7]}
            >
              <sphereGeometry args={[0.042, 16, 12]} />
            </mesh>
            {/* Note Stem */}
            <mesh material={materials.musicalNote} position={[0.04, 0.085, 0]}>
              <cylinderGeometry args={[0.006, 0.006, 0.17, 8]} />
            </mesh>
            {/* Note Flag */}
            <mesh
              material={materials.musicalNote}
              position={[0.065, 0.15, 0]}
              rotation={[0, 0, Math.PI / 4]}
            >
              <boxGeometry args={[0.045, 0.01, 0.01]} />
            </mesh>
            {note.hasDoubleFlag && (
              <mesh
                material={materials.musicalNote}
                position={[0.065, 0.115, 0]}
                rotation={[0, 0, Math.PI / 4]}
              >
                <boxGeometry args={[0.04, 0.01, 0.01]} />
              </mesh>
            )}
          </group>
        ))}
      </group>

      {/* Core Dynamic Point Light */}
      <pointLight ref={coreLightRef} position={[0, 0, 0]} color="#A78BFA" intensity={2.8} distance={4} />
      <pointLight position={[0, -0.2, 0]} color="#67E8F9" intensity={1.8} distance={3} />
    </group>
  );
}
