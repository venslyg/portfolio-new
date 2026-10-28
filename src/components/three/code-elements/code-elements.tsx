'use client';

import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

interface CodeElementsProps {
  reducedMotion?: boolean;
}

// Helper: 3D Curly Bracket Glyph "{" or "}"
function CurlyBracket({ isRight = false, color = '#67E8F9' }: { isRight?: boolean; color?: string }) {
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 2.2,
        roughness: 0.2,
      }),
    [color]
  );

  const dir = isRight ? -1 : 1;
  const w = 0.018;

  return (
    <group scale={0.7}>
      {/* Top Hook */}
      <mesh material={material} position={[-0.04 * dir, 0.12, 0]}>
        <boxGeometry args={[0.07, w, w]} />
      </mesh>
      {/* Upper Vertical Bar */}
      <mesh material={material} position={[-0.07 * dir, 0.065, 0]}>
        <boxGeometry args={[w, 0.11, w]} />
      </mesh>
      {/* Center Point Cusp */}
      <mesh material={material} position={[-0.095 * dir, 0, 0]}>
        <boxGeometry args={[0.05, w, w]} />
      </mesh>
      {/* Lower Vertical Bar */}
      <mesh material={material} position={[-0.07 * dir, -0.065, 0]}>
        <boxGeometry args={[w, 0.11, w]} />
      </mesh>
      {/* Bottom Hook */}
      <mesh material={material} position={[-0.04 * dir, -0.12, 0]}>
        <boxGeometry args={[0.07, w, w]} />
      </mesh>
    </group>
  );
}

// Helper: 3D Arrow Operator "=>"
function ArrowOperator({ color = '#A78BFA' }: { color?: string }) {
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 2.4,
        roughness: 0.2,
      }),
    [color]
  );
  const w = 0.016;

  return (
    <group scale={0.75}>
      {/* Top Equals Line */}
      <mesh material={material} position={[-0.05, 0.025, 0]}>
        <boxGeometry args={[0.1, w, w]} />
      </mesh>
      {/* Bottom Equals Line */}
      <mesh material={material} position={[-0.05, -0.025, 0]}>
        <boxGeometry args={[0.1, w, w]} />
      </mesh>
      {/* Arrow Chevron Upper Arm */}
      <mesh material={material} position={[0.04, 0.035, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <boxGeometry args={[0.09, w, w]} />
      </mesh>
      {/* Arrow Chevron Lower Arm */}
      <mesh material={material} position={[0.04, -0.035, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.09, w, w]} />
      </mesh>
    </group>
  );
}

// Helper: 3D Code Tag Chevron "</>"
function TagChevron({ color = '#67E8F9' }: { color?: string }) {
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 2.2,
        roughness: 0.2,
      }),
    [color]
  );
  const w = 0.015;

  return (
    <group scale={0.7}>
      {/* Left Chevron < */}
      <group position={[-0.1, 0, 0]}>
        <mesh material={material} position={[0.02, 0.035, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <boxGeometry args={[0.08, w, w]} />
        </mesh>
        <mesh material={material} position={[0.02, -0.035, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.08, w, w]} />
        </mesh>
      </group>
      {/* Slash / */}
      <mesh material={material} position={[0, 0, 0]} rotation={[0, 0, Math.PI / 6]}>
        <boxGeometry args={[w, 0.14, w]} />
      </mesh>
      {/* Right Chevron > */}
      <group position={[0.1, 0, 0]}>
        <mesh material={material} position={[-0.02, 0.035, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.08, w, w]} />
        </mesh>
        <mesh material={material} position={[-0.02, -0.035, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <boxGeometry args={[0.08, w, w]} />
        </mesh>
      </group>
    </group>
  );
}

export function CodeElements({ reducedMotion = false }: CodeElementsProps) {
  const glyphsGroupRef = useRef<THREE.Group>(null);
  const hudPanelsGroupRef = useRef<THREE.Group>(null);
  const satellitesRef = useRef<THREE.Group>(null);

  const materials = useMemo(() => {
    return {
      hudPanel: new THREE.MeshStandardMaterial({
        color: '#0e1424',
        metalness: 0.9,
        roughness: 0.3,
        transparent: true,
        opacity: 0.45,
        wireframe: false,
      }),
      hudWireframe: new THREE.MeshStandardMaterial({
        color: '#67E8F9',
        wireframe: true,
        transparent: true,
        opacity: 0.5,
        emissive: '#06B6D4',
        emissiveIntensity: 0.8,
      }),
      codeLineCyan: new THREE.MeshStandardMaterial({
        color: '#67E8F9',
        emissive: '#67E8F9',
        emissiveIntensity: 2.2,
      }),
      codeLineLilac: new THREE.MeshStandardMaterial({
        color: '#A78BFA',
        emissive: '#A78BFA',
        emissiveIntensity: 2.0,
      }),
      satelliteChrome: new THREE.MeshStandardMaterial({
        color: '#F4F4F7',
        metalness: 0.95,
        roughness: 0.1,
        emissive: '#67E8F9',
        emissiveIntensity: 0.8,
      }),
      satelliteCyan: new THREE.MeshStandardMaterial({
        color: '#67E8F9',
        emissive: '#67E8F9',
        emissiveIntensity: 2.5,
      }),
    };
  }, []);

  // Floating Code Glyphs configurations
  const glyphConfigs = useMemo(
    () => [
      { id: 'left-curly', type: 'curly-left', angle: 0.8, radius: 1.45, y: 0.42, speed: 0.15 },
      { id: 'right-curly', type: 'curly-right', angle: 3.9, radius: 1.55, y: 0.55, speed: 0.14 },
      { id: 'arrow-op', type: 'arrow', angle: 2.1, radius: 1.62, y: 0.38, speed: 0.16 },
      { id: 'tag-chevron', type: 'tag', angle: 5.2, radius: 1.48, y: 0.62, speed: 0.13 },
    ],
    []
  );

  // Modular Geometric Satellites Orbiting Stage
  const satelliteConfigs = useMemo(
    () => [
      { angle: 0.2, radius: 2.15, y: 0.32, speed: 0.28 },
      { angle: 1.4, radius: 2.25, y: 0.45, speed: 0.22 },
      { angle: 2.6, radius: 2.1, y: 0.28, speed: 0.3 },
      { angle: 3.8, radius: 2.3, y: 0.5, speed: 0.24 },
      { angle: 5.0, radius: 2.18, y: 0.36, speed: 0.26 },
    ],
    []
  );

  useFrame(({ clock }, delta) => {
    if (reducedMotion) return;

    const time = clock.getElapsedTime();

    // 1. Glyphs orbital drift and vertical floating
    if (glyphsGroupRef.current) {
      glyphsGroupRef.current.children.forEach((child, idx) => {
        const cfg = glyphConfigs[idx];
        if (cfg) {
          const currentAngle = cfg.angle + time * cfg.speed;
          child.position.x = Math.cos(currentAngle) * cfg.radius;
          child.position.z = Math.sin(currentAngle) * cfg.radius;
          child.position.y = cfg.y + Math.sin(time * 1.8 + idx * 1.2) * 0.05;
          child.rotation.y = -currentAngle + Math.PI / 2;
        }
      });
    }

    // 2. HUD panels subtle sway
    if (hudPanelsGroupRef.current) {
      hudPanelsGroupRef.current.rotation.y = Math.sin(time * 0.4) * 0.08;
    }

    // 3. Geometric Satellites orbital motion
    if (satellitesRef.current) {
      satellitesRef.current.children.forEach((child, idx) => {
        const item = satelliteConfigs[idx];
        if (item) {
          const currentAngle = item.angle + time * item.speed;
          child.position.x = Math.cos(currentAngle) * item.radius;
          child.position.z = Math.sin(currentAngle) * item.radius;
          child.position.y = item.y + Math.sin(time * 2 + idx) * 0.06;
          child.rotation.x += delta * 1.2;
          child.rotation.y += delta * 1.5;
        }
      });
    }
  });

  return (
    <group name="code-elements">
      {/* ================= FLOATING CODE GLYPHS ================= */}
      <group ref={glyphsGroupRef}>
        {glyphConfigs.map(cfg => (
          <group
            key={cfg.id}
            position={[Math.cos(cfg.angle) * cfg.radius, cfg.y, Math.sin(cfg.angle) * cfg.radius]}
          >
            {cfg.type === 'curly-left' && <CurlyBracket color="#67E8F9" />}
            {cfg.type === 'curly-right' && <CurlyBracket isRight color="#67E8F9" />}
            {cfg.type === 'arrow' && <ArrowOperator color="#A78BFA" />}
            {cfg.type === 'tag' && <TagChevron color="#67E8F9" />}
          </group>
        ))}
      </group>

      {/* ================= HOLOGRAPHIC HUD CODE PANELS ================= */}
      <group ref={hudPanelsGroupRef}>
        {/* Panel 1: Code Syntax Snippet HUD */}
        <group position={[1.35, 0.45, -0.6]} rotation={[-0.1, -0.6, 0.05]}>
          <mesh material={materials.hudPanel}>
            <planeGeometry args={[0.55, 0.32]} />
          </mesh>
          <mesh material={materials.hudWireframe} position={[0, 0, 0.002]}>
            <planeGeometry args={[0.55, 0.32]} />
          </mesh>
          {/* Simulated Code Lines */}
          {[-0.08, -0.02, 0.04, 0.1].map((y, i) => (
            <mesh
              key={i}
              material={i % 2 === 0 ? materials.codeLineCyan : materials.codeLineLilac}
              position={[-0.08 + (i % 3) * 0.04, y, 0.005]}
            >
              <boxGeometry args={[0.26 - (i % 2) * 0.08, 0.008, 0.002]} />
            </mesh>
          ))}
        </group>

        {/* Panel 2: Audio/Frequency Telemetry HUD */}
        <group position={[-1.38, 0.52, -0.45]} rotation={[-0.08, 0.55, -0.04]}>
          <mesh material={materials.hudPanel}>
            <planeGeometry args={[0.5, 0.28]} />
          </mesh>
          <mesh material={materials.hudWireframe} position={[0, 0, 0.002]}>
            <planeGeometry args={[0.5, 0.28]} />
          </mesh>
          {/* Waveform Telemetry Stroke */}
          {[-0.14, -0.07, 0, 0.07, 0.14].map((x, i) => (
            <mesh
              key={i}
              material={materials.codeLineCyan}
              position={[x, -0.02 + Math.abs(Math.sin(i * 1.2)) * 0.05, 0.005]}
            >
              <boxGeometry args={[0.04, 0.006, 0.002]} />
            </mesh>
          ))}
        </group>
      </group>

      {/* ================= HOVERING GEOMETRIC SATELLITES ================= */}
      <group ref={satellitesRef}>
        {satelliteConfigs.map((item, idx) => (
          <mesh
            key={idx}
            material={idx % 2 === 0 ? materials.satelliteChrome : materials.satelliteCyan}
            position={[Math.cos(item.angle) * item.radius, item.y, Math.sin(item.angle) * item.radius]}
          >
            <octahedronGeometry args={[0.07, 0]} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
