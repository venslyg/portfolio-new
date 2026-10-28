'use client';

import { useFrame } from '@react-three/fiber';
import { useMemo, useRef, type RefObject } from 'react';
import * as THREE from 'three';
import type { StageScrollState } from '@/hooks/use-stage-scroll/use-stage-scroll';

interface StageInstrumentsProps {
  scrollRef?: RefObject<StageScrollState>;
  reducedMotion?: boolean;
}

// ================= 1. SYNTHESIZER / PIANO KEYBOARD =================
function SynthesizerKeyboard({
  groupRef,
  materials,
}: {
  groupRef: RefObject<THREE.Group | null>;
  materials: Record<string, THREE.Material>;
}) {
  const whiteKeyCount = 14;
  const keyWidth = 0.038;
  const keyLength = 0.16;
  const keyHeight = 0.02;

  // Pattern of black keys: 1 = black key exists above gap, 0 = no black key
  // Matches piano pattern: W-B-W-B-W-W-B-W-B-W-B-W-W-B
  const blackKeyPattern = [1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1];

  return (
    <group ref={groupRef} position={[-0.85, 0.26, 0.55]} rotation={[0.1, 0.75, -0.05]} scale={0.95}>
      {/* Chassis Body */}
      <mesh material={materials.synthChassis} position={[0, -0.02, 0]}>
        <boxGeometry args={[whiteKeyCount * keyWidth + 0.08, 0.05, keyLength + 0.08]} />
      </mesh>

      {/* Cyber Neon Accent Strip */}
      <mesh material={materials.cyanNeon} position={[0, 0.015, -keyLength / 2 - 0.015]}>
        <boxGeometry args={[whiteKeyCount * keyWidth + 0.06, 0.008, 0.012]} />
      </mesh>

      {/* OLED / Screen Display */}
      <mesh material={materials.lilacScreen} position={[0, 0.012, -0.045]}>
        <boxGeometry args={[0.22, 0.004, 0.04]} />
      </mesh>

      {/* White Keys */}
      {Array.from({ length: whiteKeyCount }).map((_, i) => {
        const x = (i - (whiteKeyCount - 1) / 2) * keyWidth;
        return (
          <mesh key={i} material={materials.whiteKey} position={[x, 0.01, 0.02]}>
            <boxGeometry args={[keyWidth - 0.004, keyHeight, keyLength]} />
          </mesh>
        );
      })}

      {/* Black Keys */}
      {blackKeyPattern.map((hasBlack, i) => {
        if (!hasBlack) return null;
        const x = (i - (whiteKeyCount - 1) / 2 + 0.5) * keyWidth;
        return (
          <mesh key={`b-${i}`} material={materials.blackKey} position={[x, 0.025, -0.015]}>
            <boxGeometry args={[keyWidth * 0.62, keyHeight * 1.1, keyLength * 0.62]} />
          </mesh>
        );
      })}

      {/* Pitch Bend / Mod Wheels */}
      <mesh material={materials.cyanNeon} position={[-whiteKeyCount * keyWidth * 0.5 - 0.02, 0.015, 0.02]}>
        <cylinderGeometry args={[0.018, 0.018, 0.012, 16]} />
      </mesh>
    </group>
  );
}

// ================= 2. FUTURISTIC DRUM SET =================
function DrumSet({
  groupRef,
  cymbalRef,
  materials,
}: {
  groupRef: RefObject<THREE.Group | null>;
  cymbalRef: RefObject<THREE.Group | null>;
  materials: Record<string, THREE.Material>;
}) {
  return (
    <group ref={groupRef} position={[0.88, 0.28, -0.45]} rotation={[0.05, -0.85, 0.02]} scale={0.9}>
      {/* Bass Drum (Kick) */}
      <group position={[0, 0.16, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh material={materials.drumShell}>
          <cylinderGeometry args={[0.28, 0.28, 0.26, 32]} />
        </mesh>
        {/* Front Resonant Head with illuminated ring */}
        <mesh material={materials.drumHead} position={[0, 0.132, 0]}>
          <cylinderGeometry args={[0.27, 0.27, 0.005, 32]} />
        </mesh>
        <mesh material={materials.cyanNeon} position={[0, 0.134, 0]}>
          <torusGeometry args={[0.22, 0.008, 12, 32]} />
        </mesh>
        {/* Chrome Hoops */}
        <mesh material={materials.chrome} position={[0, 0.13, 0]}>
          <torusGeometry args={[0.282, 0.01, 12, 32]} />
        </mesh>
        <mesh material={materials.chrome} position={[0, -0.13, 0]}>
          <torusGeometry args={[0.282, 0.01, 12, 32]} />
        </mesh>
      </group>

      {/* Snare Drum on Tripod */}
      <group position={[-0.28, 0.22, 0.22]} rotation={[0.1, 0, 0.05]}>
        <mesh material={materials.drumShell}>
          <cylinderGeometry args={[0.15, 0.15, 0.1, 24]} />
        </mesh>
        <mesh material={materials.drumHead} position={[0, 0.051, 0]}>
          <cylinderGeometry args={[0.145, 0.145, 0.004, 24]} />
        </mesh>
        <mesh material={materials.chrome} position={[0, 0.05, 0]}>
          <torusGeometry args={[0.152, 0.007, 12, 24]} />
        </mesh>
        {/* Stand Leg */}
        <mesh material={materials.chrome} position={[0, -0.12, 0]}>
          <cylinderGeometry args={[0.008, 0.008, 0.22, 8]} />
        </mesh>
      </group>

      {/* Mounted High Tom */}
      <group position={[-0.1, 0.42, -0.05]} rotation={[-0.25, 0.1, 0]}>
        <mesh material={materials.drumShell}>
          <cylinderGeometry args={[0.12, 0.12, 0.11, 24]} />
        </mesh>
        <mesh material={materials.drumHead} position={[0, 0.056, 0]}>
          <cylinderGeometry args={[0.115, 0.115, 0.004, 24]} />
        </mesh>
        <mesh material={materials.lilacNeon} position={[0, 0.055, 0]}>
          <torusGeometry args={[0.122, 0.006, 12, 24]} />
        </mesh>
      </group>

      {/* Floor Tom */}
      <group position={[0.32, 0.18, 0.14]}>
        <mesh material={materials.drumShell}>
          <cylinderGeometry args={[0.17, 0.17, 0.18, 24]} />
        </mesh>
        <mesh material={materials.drumHead} position={[0, 0.091, 0]}>
          <cylinderGeometry args={[0.165, 0.165, 0.004, 24]} />
        </mesh>
        <mesh material={materials.chrome} position={[0, 0.09, 0]}>
          <torusGeometry args={[0.172, 0.008, 12, 24]} />
        </mesh>
      </group>

      {/* Cymbals (Hi-Hat & Crash) */}
      <group ref={cymbalRef}>
        {/* Hi-Hat Cymbals */}
        <group position={[-0.45, 0.38, 0.12]}>
          <mesh material={materials.goldCymbal} rotation={[0, 0, 0.05]}>
            <cylinderGeometry args={[0.16, 0.002, 0.008, 24]} />
          </mesh>
          <mesh material={materials.chrome} position={[0, -0.2, 0]}>
            <cylinderGeometry args={[0.006, 0.006, 0.45, 8]} />
          </mesh>
        </group>

        {/* Crash / Ride Cymbal with glowing rim */}
        <group position={[0.25, 0.52, -0.25]} rotation={[0.2, 0, 0.15]}>
          <mesh material={materials.goldCymbal}>
            <cylinderGeometry args={[0.22, 0.002, 0.008, 24]} />
          </mesh>
          <mesh material={materials.cyanNeon} position={[0, -0.002, 0]}>
            <torusGeometry args={[0.22, 0.005, 8, 24]} />
          </mesh>
          <mesh material={materials.chrome} position={[0, -0.26, 0]}>
            <cylinderGeometry args={[0.007, 0.007, 0.55, 8]} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

// ================= 3. ELECTRIC / ACOUSTIC GUITAR =================
function ElectricGuitar({
  groupRef,
  materials,
}: {
  groupRef: RefObject<THREE.Group | null>;
  materials: Record<string, THREE.Material>;
}) {
  return (
    <group ref={groupRef} position={[0.42, 0.32, 0.95]} rotation={[-0.32, 0.45, 0.38]} scale={0.92}>
      {/* Guitar Body: Sleek sculpted contours */}
      <group position={[0, 0, 0]}>
        {/* Lower Bout */}
        <mesh material={materials.guitarBody} position={[0, 0, 0]} scale={[1.2, 0.15, 1.3]}>
          <cylinderGeometry args={[0.22, 0.24, 0.22, 32]} />
        </mesh>
        {/* Waist & Upper Bout */}
        <mesh material={materials.guitarBody} position={[0, 0, -0.24]} scale={[0.9, 0.14, 1.1]}>
          <cylinderGeometry args={[0.16, 0.18, 0.22, 32]} />
        </mesh>
        {/* Cutaway Horns */}
        <mesh material={materials.guitarBody} position={[-0.14, 0, -0.32]} rotation={[0, 0, -0.3]}>
          <boxGeometry args={[0.08, 0.03, 0.16]} />
        </mesh>
        <mesh material={materials.guitarBody} position={[0.14, 0, -0.32]} rotation={[0, 0, 0.3]}>
          <boxGeometry args={[0.08, 0.03, 0.16]} />
        </mesh>
        {/* Neon Bevel Edge Rim */}
        <mesh material={materials.lilacNeon} position={[0, 0.016, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.24, 0.007, 12, 32]} />
        </mesh>
        {/* Soundhole / Glowing Resonance Core */}
        <mesh material={materials.cyanNeon} position={[0, 0.018, -0.1]}>
          <cylinderGeometry args={[0.065, 0.065, 0.005, 24]} />
        </mesh>
      </group>

      {/* Guitar Neck & Fretboard */}
      <group position={[0, 0.02, -0.58]}>
        <mesh material={materials.fretboard}>
          <boxGeometry args={[0.062, 0.022, 0.52]} />
        </mesh>
        {/* Frets (Metallic lines) */}
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh key={i} material={materials.chrome} position={[0, 0.012, -0.22 + i * 0.06]}>
            <boxGeometry args={[0.06, 0.003, 0.003]} />
          </mesh>
        ))}
      </group>

      {/* Headstock with Tuning Pegs */}
      <group position={[0, 0.035, -0.89]} rotation={[-0.15, 0, 0]}>
        <mesh material={materials.guitarBody}>
          <boxGeometry args={[0.075, 0.02, 0.14]} />
        </mesh>
        {/* 6 Tuning Pegs */}
        {[-0.045, -0.015, 0.015, 0.045].map((z, idx) => (
          <group key={idx}>
            <mesh material={materials.chrome} position={[-0.045, 0, z]}>
              <sphereGeometry args={[0.01, 8, 8]} />
            </mesh>
            <mesh material={materials.chrome} position={[0.045, 0, z]}>
              <sphereGeometry args={[0.01, 8, 8]} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Glowing Laser Strings */}
      {[-0.02, -0.008, 0.004, 0.016].map((x, i) => (
        <mesh key={i} material={materials.cyanStrings} position={[x, 0.035, -0.42]}>
          <cylinderGeometry args={[0.0015, 0.0015, 0.88, 6]} />
        </mesh>
      ))}

      {/* Pickups */}
      <mesh material={materials.chrome} position={[0, 0.022, -0.02]}>
        <boxGeometry args={[0.07, 0.01, 0.025]} />
      </mesh>
      <mesh material={materials.chrome} position={[0, 0.022, -0.2]}>
        <boxGeometry args={[0.07, 0.01, 0.025]} />
      </mesh>
    </group>
  );
}

// ================= MAIN STAGE INSTRUMENTS EXPORT =================
export function StageInstruments({ scrollRef, reducedMotion = false }: StageInstrumentsProps) {
  const keyboardGroupRef = useRef<THREE.Group>(null);
  const drumsGroupRef = useRef<THREE.Group>(null);
  const cymbalGroupRef = useRef<THREE.Group>(null);
  const guitarGroupRef = useRef<THREE.Group>(null);

  const materials = useMemo(() => {
    return {
      synthChassis: new THREE.MeshStandardMaterial({
        color: '#10121d',
        metalness: 0.9,
        roughness: 0.22,
        emissive: '#1a103c',
        emissiveIntensity: 0.3,
      }),
      whiteKey: new THREE.MeshStandardMaterial({
        color: '#EDEDF2',
        metalness: 0.4,
        roughness: 0.15,
        emissive: '#F4F4F7',
        emissiveIntensity: 0.15,
      }),
      blackKey: new THREE.MeshStandardMaterial({
        color: '#08080C',
        metalness: 0.85,
        roughness: 0.2,
      }),
      drumShell: new THREE.MeshStandardMaterial({
        color: '#121422',
        metalness: 0.92,
        roughness: 0.18,
        emissive: '#2e1065',
        emissiveIntensity: 0.4,
      }),
      drumHead: new THREE.MeshStandardMaterial({
        color: '#E2E8F0',
        metalness: 0.2,
        roughness: 0.35,
        emissive: '#67E8F9',
        emissiveIntensity: 0.2,
      }),
      goldCymbal: new THREE.MeshStandardMaterial({
        color: '#F59E0B',
        metalness: 0.96,
        roughness: 0.1,
        emissive: '#D97706',
        emissiveIntensity: 0.35,
      }),
      guitarBody: new THREE.MeshStandardMaterial({
        color: '#151726',
        metalness: 0.94,
        roughness: 0.14,
        emissive: '#2e1065',
        emissiveIntensity: 0.5,
      }),
      fretboard: new THREE.MeshStandardMaterial({
        color: '#0D0E15',
        metalness: 0.8,
        roughness: 0.3,
      }),
      chrome: new THREE.MeshStandardMaterial({
        color: '#F8FAFC',
        metalness: 0.98,
        roughness: 0.08,
      }),
      cyanNeon: new THREE.MeshStandardMaterial({
        color: '#67E8F9',
        emissive: '#67E8F9',
        emissiveIntensity: 3.2,
        toneMapped: false,
      }),
      lilacNeon: new THREE.MeshStandardMaterial({
        color: '#A78BFA',
        emissive: '#A78BFA',
        emissiveIntensity: 3.0,
        toneMapped: false,
      }),
      lilacScreen: new THREE.MeshStandardMaterial({
        color: '#C084FC',
        emissive: '#9333EA',
        emissiveIntensity: 2.8,
      }),
      cyanStrings: new THREE.MeshStandardMaterial({
        color: '#67E8F9',
        emissive: '#67E8F9',
        emissiveIntensity: 3.5,
        toneMapped: false,
      }),
    };
  }, []);

  useFrame(({ clock }, delta) => {
    const progress = !reducedMotion && scrollRef?.current ? scrollRef.current.current : 0;
    const time = clock.getElapsedTime();

    // 1. Synthesizer Keyboard: lifts upward and tilts into separate orbital tier on scroll
    if (keyboardGroupRef.current) {
      keyboardGroupRef.current.position.y = 0.26 + progress * 0.95 + (reducedMotion ? 0 : Math.sin(time * 1.4) * 0.02);
      keyboardGroupRef.current.position.x = -0.85 - progress * 0.45;
      keyboardGroupRef.current.position.z = 0.55 + progress * 0.35;
      keyboardGroupRef.current.rotation.y = 0.75 + progress * 0.35;
      keyboardGroupRef.current.rotation.x = 0.1 + progress * 0.15;
    }

    // 2. Drum Set: separates into exploded schematic tiers
    if (drumsGroupRef.current) {
      drumsGroupRef.current.position.y = 0.28 + progress * 1.15 + (reducedMotion ? 0 : Math.sin(time * 1.6 + 1) * 0.02);
      drumsGroupRef.current.position.x = 0.88 + progress * 0.55;
      drumsGroupRef.current.position.z = -0.45 - progress * 0.3;
      drumsGroupRef.current.rotation.y = -0.85 - progress * 0.3;
    }
    if (cymbalGroupRef.current) {
      cymbalGroupRef.current.position.y = progress * 0.45;
      if (!reducedMotion) {
        cymbalGroupRef.current.rotation.y += delta * 0.3;
      }
    }

    // 3. Electric Guitar: levitates dynamically into upper tier
    if (guitarGroupRef.current) {
      guitarGroupRef.current.position.y = 0.32 + progress * 1.45 + (reducedMotion ? 0 : Math.sin(time * 1.8 + 2) * 0.03);
      guitarGroupRef.current.position.x = 0.42 + progress * 0.35;
      guitarGroupRef.current.position.z = 0.95 + progress * 0.5;
      guitarGroupRef.current.rotation.z = 0.38 + progress * 0.45 + (reducedMotion ? 0 : Math.sin(time * 1.2) * 0.04);
      guitarGroupRef.current.rotation.y = 0.45 + progress * 0.25;
    }
  });

  return (
    <group name="stage-instruments">
      <SynthesizerKeyboard groupRef={keyboardGroupRef} materials={materials} />
      <DrumSet groupRef={drumsGroupRef} cymbalRef={cymbalGroupRef} materials={materials} />
      <ElectricGuitar groupRef={guitarGroupRef} materials={materials} />
    </group>
  );
}
