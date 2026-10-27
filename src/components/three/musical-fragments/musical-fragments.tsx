'use client';

import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

interface MusicalFragmentsProps {
  scrollProgressRef: React.RefObject<number>;
}

interface FragmentData {
  initialPos: [number, number, number];
  driftDir: [number, number, number];
  initialRot: [number, number, number];
  rotSpeed: [number, number, number];
  scale: number;
}

export function MusicalFragments({ scrollProgressRef }: MusicalFragmentsProps) {
  // References for groups to manipulate matrices directly without React re-renders
  const clefCoreRef = useRef<THREE.Group>(null);
  const notesGroupRef = useRef<THREE.Group>(null);
  const shardsGroupRef = useRef<THREE.Group>(null);
  const ribbonsGroupRef = useRef<THREE.Group>(null);
  const particlesGroupRef = useRef<THREE.Points>(null);

  // Smooth lerped progress state inside render loop
  const currentProgress = useRef(0);

  // 1. Shards configuration: 10 independent crystal/glass shards
  const shardsData = useMemo<FragmentData[]>(() => {
    return [
      { initialPos: [0.3, 0.4, 0.2], driftDir: [2.5, 1.8, 1.2], initialRot: [0.2, 0.4, 0.1], rotSpeed: [1.2, 0.8, 1.5], scale: 0.18 },
      { initialPos: [-0.2, -0.3, 0.1], driftDir: [-2.2, -1.5, 1.6], initialRot: [0.1, 0.8, 0.3], rotSpeed: [-1.0, 1.2, -0.6], scale: 0.22 },
      { initialPos: [0.4, -0.6, -0.1], driftDir: [2.8, -1.8, 2.0], initialRot: [0.5, 0.2, 0.7], rotSpeed: [0.9, -1.4, 1.1], scale: 0.16 },
      { initialPos: [-0.4, 0.7, 0.3], driftDir: [-2.6, 2.4, 1.8], initialRot: [0.3, 0.6, 0.2], rotSpeed: [-1.3, 0.9, 1.2], scale: 0.25 },
      { initialPos: [0.1, -0.8, 0.2], driftDir: [1.2, -2.6, 2.2], initialRot: [0.7, 0.1, 0.4], rotSpeed: [1.5, -0.8, -1.0], scale: 0.2 },
      { initialPos: [-0.5, 0.1, -0.2], driftDir: [-3.0, 0.6, 1.4], initialRot: [0.4, 0.5, 0.9], rotSpeed: [0.8, 1.1, -1.2], scale: 0.15 },
      { initialPos: [0.6, 0.1, 0.1], driftDir: [3.2, 0.4, 1.9], initialRot: [0.6, 0.3, 0.5], rotSpeed: [-1.1, -1.0, 0.7], scale: 0.21 },
      { initialPos: [0.2, 1.0, -0.1], driftDir: [1.8, 3.1, 2.3], initialRot: [0.2, 0.9, 0.1], rotSpeed: [1.4, 0.6, -0.8], scale: 0.17 },
      { initialPos: [-0.3, -0.9, 0.2], driftDir: [-1.9, -2.9, 1.7], initialRot: [0.8, 0.2, 0.3], rotSpeed: [-0.7, 1.3, 1.4], scale: 0.23 },
      { initialPos: [0.5, -0.2, 0.3], driftDir: [2.9, -0.9, 2.5], initialRot: [0.1, 0.7, 0.6], rotSpeed: [1.2, -1.1, 0.9], scale: 0.19 },
    ];
  }, []);

  // 2. Notes configuration: 5 chrome musical notes
  const notesData = useMemo<FragmentData[]>(() => {
    return [
      { initialPos: [0.6, 0.8, 0.2], driftDir: [3.4, 2.2, 2.5], initialRot: [0.1, 0.3, -0.2], rotSpeed: [0.8, 1.5, 0.5], scale: 0.35 },
      { initialPos: [-0.6, 0.4, 0.1], driftDir: [-3.2, 1.9, 1.8], initialRot: [0.2, -0.4, 0.3], rotSpeed: [-1.2, 0.9, -0.7], scale: 0.3 },
      { initialPos: [0.7, -0.7, 0.2], driftDir: [3.6, -2.1, 2.8], initialRot: [-0.2, 0.5, 0.1], rotSpeed: [1.0, -1.3, 0.9], scale: 0.32 },
      { initialPos: [-0.5, -0.8, -0.1], driftDir: [-2.8, -2.5, 1.5], initialRot: [0.3, 0.2, -0.4], rotSpeed: [-0.9, 1.1, 1.2], scale: 0.28 },
      { initialPos: [0.1, 1.3, 0.3], driftDir: [1.5, 3.8, 3.0], initialRot: [0.0, 0.6, 0.2], rotSpeed: [0.6, 1.4, -1.0], scale: 0.33 },
    ];
  }, []);

  // 3. Soundwave ribbons: 3 curved spline tubes
  const ribbons = useMemo(() => {
    // Ribbon 1: Lilac spiral sweep
    const curve1 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.8, -1.6, -0.2),
      new THREE.Vector3(-0.6, -0.8, 0.4),
      new THREE.Vector3(0.4, 0.2, 0.5),
      new THREE.Vector3(1.2, 1.2, 0.2),
      new THREE.Vector3(2.0, 2.2, -0.4),
    ]);
    // Ribbon 2: Cyan resonant wave
    const curve2 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(1.6, -1.8, 0.3),
      new THREE.Vector3(0.8, -0.6, -0.2),
      new THREE.Vector3(-0.4, 0.4, 0.3),
      new THREE.Vector3(-1.0, 1.4, -0.1),
      new THREE.Vector3(-1.6, 2.0, 0.5),
    ]);
    // Ribbon 3: Prismatic center loop
    const curve3 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.8, -0.2, 0.6),
      new THREE.Vector3(0.0, 0.5, 0.8),
      new THREE.Vector3(0.9, -0.1, 0.4),
      new THREE.Vector3(0.1, -0.9, 0.2),
      new THREE.Vector3(-0.7, -0.3, 0.5),
    ]);

    return {
      geo1: new THREE.TubeGeometry(curve1, 64, 0.045, 12, false),
      geo2: new THREE.TubeGeometry(curve2, 64, 0.04, 12, false),
      geo3: new THREE.TubeGeometry(curve3, 64, 0.035, 12, true),
    };
  }, []);

  // 4. Acoustic micro-particles
  const particlePositions = useMemo(() => {
    const pos = new Float32Array(90); // 30 particles * 3
    for (let i = 0; i < 30; i++) {
      pos[i * 3] = (Math.sin(i * 1.7) * 1.8);
      pos[i * 3 + 1] = (Math.cos(i * 2.3) * 2.2);
      pos[i * 3 + 2] = (Math.sin(i * 3.1) * 0.9);
    }
    return pos;
  }, []);

  // 60fps direct matrix manipulation on normalized scroll
  useFrame((state, delta) => {
    const targetP = scrollProgressRef.current ?? 0;
    // Smooth lerp (interpolation) factor
    currentProgress.current += (targetP - currentProgress.current) * Math.min(1, delta * 7.5);
    const p = currentProgress.current;
    const time = state.clock.getElapsedTime();

    // 1. Core Clef & Spine: rotates gently and slowly drifts back in z and fades
    if (clefCoreRef.current) {
      clefCoreRef.current.rotation.y = time * 0.25 + p * 1.8;
      clefCoreRef.current.rotation.x = Math.sin(time * 0.4) * 0.08 - p * 0.6;
      clefCoreRef.current.rotation.z = Math.cos(time * 0.3) * 0.05 + p * 0.4;
      clefCoreRef.current.position.z = -p * 3.5;
      clefCoreRef.current.position.x = Math.sin(p * Math.PI) * 0.5;
      const coreScale = Math.max(0.01, 1 - p * 0.85);
      clefCoreRef.current.scale.set(coreScale, coreScale, coreScale);
    }

    // 2. Shards: disperse outward along their trajectory vectors
    if (shardsGroupRef.current) {
      shardsGroupRef.current.children.forEach((child, idx) => {
        const data = shardsData[idx];
        if (!data) return;
        const dispPower = Math.pow(p, 1.15) * 1.6;
        child.position.x = data.initialPos[0] + data.driftDir[0] * dispPower + Math.sin(time * 1.5 + idx) * 0.04;
        child.position.y = data.initialPos[1] + data.driftDir[1] * dispPower + Math.cos(time * 1.2 + idx) * 0.04;
        child.position.z = data.initialPos[2] + data.driftDir[2] * dispPower;
        child.rotation.x = data.initialRot[0] + data.rotSpeed[0] * (time * 0.5 + p * 4);
        child.rotation.y = data.initialRot[1] + data.rotSpeed[1] * (time * 0.5 + p * 4);
        child.rotation.z = data.initialRot[2] + data.rotSpeed[2] * (time * 0.5 + p * 4);
      });
    }

    // 3. Notes: spin outward with acoustic energy
    if (notesGroupRef.current) {
      notesGroupRef.current.children.forEach((child, idx) => {
        const data = notesData[idx];
        if (!data) return;
        const dispPower = Math.pow(p, 1.2) * 1.8;
        child.position.x = data.initialPos[0] + data.driftDir[0] * dispPower;
        child.position.y = data.initialPos[1] + data.driftDir[1] * dispPower;
        child.position.z = data.initialPos[2] + data.driftDir[2] * dispPower;
        child.rotation.y = data.initialRot[1] + data.rotSpeed[1] * (time * 0.8 + p * 5);
        child.rotation.z = data.initialRot[2] + Math.sin(time + idx) * 0.1 + p * 2;
      });
    }

    // 4. Ribbons: expand outward like sound propagation waves
    if (ribbonsGroupRef.current) {
      const ribbonScale = 1 + p * 1.4;
      ribbonsGroupRef.current.scale.set(ribbonScale, ribbonScale, 1 + p * 0.8);
      ribbonsGroupRef.current.rotation.z = time * 0.15 + p * 1.2;
      ribbonsGroupRef.current.rotation.y = Math.sin(time * 0.2) * 0.2 + p * 0.8;
    }

    // 5. Particles: expand into space
    if (particlesGroupRef.current) {
      particlesGroupRef.current.rotation.y = time * 0.1 + p * 0.6;
      const partScale = 1 + p * 2.2;
      particlesGroupRef.current.scale.set(partScale, partScale, partScale);
    }
  });

  return (
    <group>
      {/* ================= 1. CORE TREBLE CLEF SCULPTURE ================= */}
      <group ref={clefCoreRef}>
        {/* Main curved spine of the clef */}
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.08, 0.06, 3.2, 32]} />
          <meshStandardMaterial
            color="#D8B4FE"
            metalness={0.92}
            roughness={0.12}
            emissive="#6B21A8"
            emissiveIntensity={0.25}
          />
        </mesh>

        {/* Upper treble clef loop */}
        <mesh position={[0.25, 0.8, 0.05]} rotation={[0, 0, 0.2]}>
          <torusGeometry args={[0.48, 0.07, 16, 48, Math.PI * 1.7]} />
          <meshStandardMaterial
            color="#E9D5FF"
            metalness={0.95}
            roughness={0.1}
            emissive="#A78BFA"
            emissiveIntensity={0.3}
          />
        </mesh>

        {/* Lower central belly loop */}
        <mesh position={[-0.2, -0.2, 0.08]} rotation={[0, 0, -0.4]}>
          <torusGeometry args={[0.62, 0.08, 16, 48, Math.PI * 1.85]} />
          <meshStandardMaterial
            color="#67E8F9"
            metalness={0.9}
            roughness={0.15}
            emissive="#0891B2"
            emissiveIntensity={0.3}
          />
        </mesh>

        {/* Bottom anchor terminal node */}
        <mesh position={[0, -1.65, 0]}>
          <sphereGeometry args={[0.18, 32, 32]} />
          <meshStandardMaterial
            color="#A78BFA"
            metalness={0.95}
            roughness={0.08}
            emissive="#8B5CF6"
            emissiveIntensity={0.4}
          />
        </mesh>

        {/* Resonant center orb */}
        <mesh position={[0.05, -0.2, 0.12]}>
          <sphereGeometry args={[0.22, 32, 32]} />
          <meshStandardMaterial
            color="#FFFFFF"
            metalness={0.98}
            roughness={0.05}
            emissive="#67E8F9"
            emissiveIntensity={0.5}
          />
        </mesh>
      </group>

      {/* ================= 2. SOUNDWAVE LIGHT RIBBONS ================= */}
      <group ref={ribbonsGroupRef}>
        {/* Ribbon 1: Lilac Sweep */}
        <mesh geometry={ribbons.geo1}>
          <meshStandardMaterial
            color="#A78BFA"
            emissive="#8B5CF6"
            emissiveIntensity={0.8}
            metalness={0.8}
            roughness={0.2}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Ribbon 2: Cyan Resonant Curve */}
        <mesh geometry={ribbons.geo2}>
          <meshStandardMaterial
            color="#67E8F9"
            emissive="#06B6D4"
            emissiveIntensity={0.9}
            metalness={0.85}
            roughness={0.15}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Ribbon 3: Center Loop */}
        <mesh geometry={ribbons.geo3}>
          <meshStandardMaterial
            color="#E0E7FF"
            emissive="#818CF8"
            emissiveIntensity={0.5}
            metalness={0.9}
            roughness={0.1}
            transparent
            opacity={0.7}
          />
        </mesh>
      </group>

      {/* ================= 3. INDEPENDENT MUSICAL NOTES ================= */}
      <group ref={notesGroupRef}>
        {notesData.map((data, i) => (
          <group key={`note-${i}`} position={data.initialPos} scale={data.scale}>
            {/* Note Head */}
            <mesh rotation={[-0.3, 0.2, 0.4]}>
              <sphereGeometry args={[0.42, 24, 18]} />
              <meshStandardMaterial
                color="#F3E8FF"
                metalness={0.95}
                roughness={0.1}
                emissive="#A78BFA"
                emissiveIntensity={0.35}
              />
            </mesh>
            {/* Note Stem */}
            <mesh position={[0.35, 0.7, 0]}>
              <cylinderGeometry args={[0.04, 0.04, 1.4, 16]} />
              <meshStandardMaterial
                color="#67E8F9"
                metalness={0.92}
                roughness={0.12}
                emissive="#0891B2"
                emissiveIntensity={0.3}
              />
            </mesh>
            {/* Note Flag */}
            <mesh position={[0.55, 1.25, 0.05]} rotation={[0, 0, -0.6]}>
              <boxGeometry args={[0.38, 0.12, 0.04]} />
              <meshStandardMaterial
                color="#A78BFA"
                metalness={0.88}
                roughness={0.15}
                emissive="#7C3AED"
                emissiveIntensity={0.4}
              />
            </mesh>
          </group>
        ))}
      </group>

      {/* ================= 4. PRISMATIC CRYSTAL SHARDS ================= */}
      <group ref={shardsGroupRef}>
        {shardsData.map((data, i) => (
          <mesh
            key={`shard-${i}`}
            position={data.initialPos}
            rotation={data.initialRot}
            scale={data.scale}
          >
            {i % 2 === 0 ? (
              <octahedronGeometry args={[1, 0]} />
            ) : (
              <tetrahedronGeometry args={[1, 0]} />
            )}
            <meshStandardMaterial
              color={i % 3 === 0 ? '#67E8F9' : i % 3 === 1 ? '#A78BFA' : '#FFFFFF'}
              metalness={0.96}
              roughness={0.08}
              emissive={i % 2 === 0 ? '#4C1D95' : '#0E7490'}
              emissiveIntensity={0.3}
            />
          </mesh>
        ))}
      </group>

      {/* ================= 5. ACOUSTIC PARTICLES FIELD ================= */}
      <points ref={particlesGroupRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color="#67E8F9"
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
