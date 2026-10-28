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
  const blackKeyPattern = [1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1];

  return (
    <group ref={groupRef} position={[-0.85, 0.24, 0.55]} rotation={[0.1, 0.75, -0.05]} scale={0.92}>
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
    <group ref={groupRef} position={[0.88, 0.26, -0.45]} rotation={[0.05, -0.85, 0.02]} scale={0.88}>
      {/* Bass Drum (Kick) */}
      <group position={[0, 0.16, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh material={materials.drumShell}>
          <cylinderGeometry args={[0.28, 0.28, 0.26, 32]} />
        </mesh>
        <mesh material={materials.drumHead} position={[0, 0.132, 0]}>
          <cylinderGeometry args={[0.27, 0.27, 0.005, 32]} />
        </mesh>
        <mesh material={materials.cyanNeon} position={[0, 0.134, 0]}>
          <torusGeometry args={[0.22, 0.008, 12, 32]} />
        </mesh>
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
        <group position={[-0.45, 0.38, 0.12]}>
          <mesh material={materials.goldCymbal} rotation={[0, 0, 0.05]}>
            <cylinderGeometry args={[0.16, 0.002, 0.008, 24]} />
          </mesh>
          <mesh material={materials.chrome} position={[0, -0.2, 0]}>
            <cylinderGeometry args={[0.006, 0.006, 0.45, 8]} />
          </mesh>
        </group>
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

// ================= 3. ELECTRIC GUITAR =================
function ElectricGuitar({
  groupRef,
  materials,
}: {
  groupRef: RefObject<THREE.Group | null>;
  materials: Record<string, THREE.Material>;
}) {
  return (
    <group ref={groupRef} position={[0.55, 0.30, 0.85]} rotation={[-0.32, 0.45, 0.38]} scale={0.88}>
      {/* Guitar Body */}
      <group position={[0, 0, 0]}>
        <mesh material={materials.guitarBody} position={[0, 0, 0]} scale={[1.2, 0.15, 1.3]}>
          <cylinderGeometry args={[0.22, 0.24, 0.22, 32]} />
        </mesh>
        <mesh material={materials.guitarBody} position={[0, 0, -0.24]} scale={[0.9, 0.14, 1.1]}>
          <cylinderGeometry args={[0.16, 0.18, 0.22, 32]} />
        </mesh>
        <mesh material={materials.guitarBody} position={[-0.14, 0, -0.32]} rotation={[0, 0, -0.3]}>
          <boxGeometry args={[0.08, 0.03, 0.16]} />
        </mesh>
        <mesh material={materials.guitarBody} position={[0.14, 0, -0.32]} rotation={[0, 0, 0.3]}>
          <boxGeometry args={[0.08, 0.03, 0.16]} />
        </mesh>
        <mesh material={materials.lilacNeon} position={[0, 0.016, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.24, 0.007, 12, 32]} />
        </mesh>
        <mesh material={materials.cyanNeon} position={[0, 0.018, -0.1]}>
          <cylinderGeometry args={[0.065, 0.065, 0.005, 24]} />
        </mesh>
      </group>

      {/* Neck & Fretboard */}
      <group position={[0, 0.02, -0.58]}>
        <mesh material={materials.fretboard}>
          <boxGeometry args={[0.062, 0.022, 0.52]} />
        </mesh>
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh key={i} material={materials.chrome} position={[0, 0.012, -0.22 + i * 0.06]}>
            <boxGeometry args={[0.06, 0.003, 0.003]} />
          </mesh>
        ))}
      </group>

      {/* Headstock & Tuning Pegs */}
      <group position={[0, 0.035, -0.89]} rotation={[-0.15, 0, 0]}>
        <mesh material={materials.guitarBody}>
          <boxGeometry args={[0.075, 0.02, 0.14]} />
        </mesh>
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

      {/* Laser Strings */}
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

// ================= 4. STUDIO BOOM CONDENSER MICROPHONE =================
function StudioMicrophone({
  groupRef,
  materials,
}: {
  groupRef: RefObject<THREE.Group | null>;
  materials: Record<string, THREE.Material>;
}) {
  return (
    <group ref={groupRef} position={[-0.42, 0.22, 0.95]} rotation={[0.08, 0.65, -0.05]} scale={0.9}>
      {/* Heavy Tripod Base */}
      <mesh material={materials.synthChassis} position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.12, 0.14, 0.03, 16]} />
      </mesh>
      {/* Chrome Vertical Shaft */}
      <mesh material={materials.chrome} position={[0, 0.38, 0]}>
        <cylinderGeometry args={[0.009, 0.011, 0.72, 12]} />
      </mesh>

      {/* Boom Swivel Joint */}
      <mesh material={materials.blackKey} position={[0, 0.74, 0]}>
        <sphereGeometry args={[0.022, 12, 12]} />
      </mesh>
      {/* Angled Boom Arm */}
      <group position={[0, 0.74, 0]} rotation={[0, 0, -0.55]}>
        <mesh material={materials.chrome} position={[0.18, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.007, 0.007, 0.42, 12]} />
        </mesh>
        {/* Boom Counterweight */}
        <mesh material={materials.synthChassis} position={[-0.06, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.018, 0.018, 0.05, 12]} />
        </mesh>

        {/* Elastic Shock Mount Ring */}
        <group position={[0.38, 0, 0]}>
          <mesh material={materials.cyanNeon} rotation={[0, Math.PI / 2, 0]}>
            <torusGeometry args={[0.045, 0.005, 8, 24]} />
          </mesh>
          {/* Condenser Mic Capsule */}
          <mesh material={materials.chrome} position={[0, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
            <cylinderGeometry args={[0.022, 0.022, 0.085, 16]} />
          </mesh>
          <mesh material={materials.goldCymbal} position={[0, 0.045, 0]} rotation={[0, 0, -Math.PI / 2]}>
            <sphereGeometry args={[0.022, 16, 16]} />
          </mesh>
          {/* Circular Pop Filter */}
          <mesh material={materials.fretboard} position={[0.06, 0.02, 0]} rotation={[0, Math.PI / 2, 0]}>
            <ringGeometry args={[0.028, 0.04, 24]} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

// ================= 5. GUITAR AMPLIFIER & SPEAKER CABINET STACK =================
function AmplifierStack({
  groupRef,
  materials,
}: {
  groupRef: RefObject<THREE.Group | null>;
  materials: Record<string, THREE.Material>;
}) {
  return (
    <group ref={groupRef} position={[-0.98, 0.22, -0.42]} rotation={[0.05, 0.85, 0]} scale={0.88}>
      {/* Lower Speaker Cabinet (4x12) */}
      <group position={[0, 0.18, 0]}>
        <mesh material={materials.synthChassis}>
          <boxGeometry args={[0.36, 0.36, 0.28]} />
        </mesh>
        {/* Woven Speaker Grille Cloth with illuminated badge */}
        <mesh material={materials.fretboard} position={[0, 0, 0.142]}>
          <planeGeometry args={[0.32, 0.32]} />
        </mesh>
        {/* Glowing Cyber Center Amp Emblem */}
        <mesh material={materials.cyanNeon} position={[0, 0.04, 0.144]}>
          <circleGeometry args={[0.035, 16]} />
        </mesh>
        {/* Corner Protectors */}
        {[-0.17, 0.17].map((x, i) =>
          [-0.17, 0.17].map((y, j) => (
            <mesh key={`${i}-${j}`} material={materials.chrome} position={[x, y, 0.14]}>
              <sphereGeometry args={[0.015, 8, 8]} />
            </mesh>
          ))
        )}
      </group>

      {/* Top Amplifier Head */}
      <group position={[0, 0.44, 0]}>
        <mesh material={materials.synthChassis}>
          <boxGeometry args={[0.34, 0.14, 0.26]} />
        </mesh>
        {/* Control Faceplate with Knobs */}
        <mesh material={materials.fretboard} position={[0, 0, 0.132]}>
          <planeGeometry args={[0.30, 0.10]} />
        </mesh>
        {/* Control Knobs */}
        {[-0.10, -0.05, 0, 0.05, 0.10].map((x, idx) => (
          <mesh key={idx} material={materials.goldCymbal} position={[x, 0, 0.136]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.008, 0.008, 0.008, 12]} />
          </mesh>
        ))}
        {/* Amber Vacuum Tube Heat Glow Indicator */}
        <mesh material={materials.lilacScreen} position={[0.12, 0.02, 0.136]}>
          <circleGeometry args={[0.008, 12]} />
        </mesh>
      </group>
    </group>
  );
}

// ================= 6. DJ & STUDIO AUDIO MIXER CONSOLE =================
function DJMixerConsole({
  groupRef,
  materials,
}: {
  groupRef: RefObject<THREE.Group | null>;
  materials: Record<string, THREE.Material>;
}) {
  return (
    <group ref={groupRef} position={[0.22, 0.24, 0.92]} rotation={[0.15, -0.45, 0.08]} scale={0.88}>
      {/* Matte Black Console Chassis */}
      <mesh material={materials.synthChassis} position={[0, 0.02, 0]}>
        <boxGeometry args={[0.38, 0.04, 0.26]} />
      </mesh>

      {/* Rotating Turntable Jog Platter */}
      <group position={[-0.09, 0.045, 0]}>
        <mesh material={materials.chrome}>
          <cylinderGeometry args={[0.085, 0.085, 0.012, 28]} />
        </mesh>
        <mesh material={materials.cyanNeon} position={[0, 0.007, 0]}>
          <torusGeometry args={[0.065, 0.004, 8, 28]} />
        </mesh>
      </group>

      {/* 4 Channel Fader Slots & Sliders */}
      {[-0.01, 0.03, 0.07, 0.11].map((x, i) => (
        <group key={i} position={[x, 0.042, 0.02]}>
          <mesh material={materials.blackKey}>
            <boxGeometry args={[0.008, 0.002, 0.08]} />
          </mesh>
          <mesh material={materials.whiteKey} position={[0, 0.008, (i % 2 === 0 ? 0.02 : -0.01)]}>
            <boxGeometry args={[0.016, 0.012, 0.018]} />
          </mesh>
        </group>
      ))}

      {/* Dual Segmented LED VU Meter Strips */}
      <mesh material={materials.cyanNeon} position={[0.15, 0.042, 0.02]}>
        <boxGeometry args={[0.006, 0.004, 0.07]} />
      </mesh>
      <mesh material={materials.lilacNeon} position={[0.165, 0.042, 0.02]}>
        <boxGeometry args={[0.006, 0.004, 0.07]} />
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
  const micGroupRef = useRef<THREE.Group>(null);
  const ampGroupRef = useRef<THREE.Group>(null);
  const djGroupRef = useRef<THREE.Group>(null);

  const materials = useMemo(() => {
    return {
      synthChassis: new THREE.MeshStandardMaterial({
        color: '#10121d',
        metalness: 0.92,
        roughness: 0.20,
        emissive: '#1a103c',
        emissiveIntensity: 0.35,
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
        metalness: 0.94,
        roughness: 0.16,
        emissive: '#2e1065',
        emissiveIntensity: 0.45,
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
      keyboardGroupRef.current.position.y = 0.24 + progress * 1.35 + (reducedMotion ? 0 : Math.sin(time * 1.4) * 0.02);
      keyboardGroupRef.current.position.x = -0.85 - progress * 0.65;
      keyboardGroupRef.current.position.z = 0.55 + progress * 0.45;
      keyboardGroupRef.current.rotation.y = 0.75 + progress * 0.45;
      keyboardGroupRef.current.rotation.x = 0.1 + progress * 0.25;
    }

    // 2. Drum Set: separates into exploded schematic tiers
    if (drumsGroupRef.current) {
      drumsGroupRef.current.position.y = 0.26 + progress * 1.65 + (reducedMotion ? 0 : Math.sin(time * 1.6 + 1) * 0.02);
      drumsGroupRef.current.position.x = 0.88 + progress * 0.75;
      drumsGroupRef.current.position.z = -0.45 - progress * 0.45;
      drumsGroupRef.current.rotation.y = -0.85 - progress * 0.35;
    }
    if (cymbalGroupRef.current) {
      cymbalGroupRef.current.position.y = progress * 0.65;
      if (!reducedMotion) {
        cymbalGroupRef.current.rotation.y += delta * 0.3;
      }
    }

    // 3. Electric Guitar: levitates dynamically into upper tier
    if (guitarGroupRef.current) {
      guitarGroupRef.current.position.y = 0.30 + progress * 1.95 + (reducedMotion ? 0 : Math.sin(time * 1.8 + 2) * 0.03);
      guitarGroupRef.current.position.x = 0.55 + progress * 0.65;
      guitarGroupRef.current.position.z = 0.85 + progress * 0.65;
      guitarGroupRef.current.rotation.z = 0.38 + progress * 0.55 + (reducedMotion ? 0 : Math.sin(time * 1.2) * 0.04);
      guitarGroupRef.current.rotation.y = 0.45 + progress * 0.35;
    }

    // 4. Studio Boom Microphone: lifts into upper forward quadrant
    if (micGroupRef.current) {
      micGroupRef.current.position.y = 0.22 + progress * 1.85 + (reducedMotion ? 0 : Math.sin(time * 1.5 + 3) * 0.02);
      micGroupRef.current.position.x = -0.42 - progress * 0.55;
      micGroupRef.current.position.z = 0.95 + progress * 0.55;
      micGroupRef.current.rotation.y = 0.65 + progress * 0.45;
    }

    // 5. Amplifier Stack: splits and drops slightly back into foundation tier
    if (ampGroupRef.current) {
      ampGroupRef.current.position.y = 0.22 + progress * 1.15 + (reducedMotion ? 0 : Math.sin(time * 1.1) * 0.02);
      ampGroupRef.current.position.x = -0.98 - progress * 0.75;
      ampGroupRef.current.position.z = -0.42 - progress * 0.55;
      ampGroupRef.current.rotation.y = 0.85 + progress * 0.3;
    }

    // 6. DJ Mixer Console: floats forward with dynamic tilt
    if (djGroupRef.current) {
      djGroupRef.current.position.y = 0.24 + progress * 1.55 + (reducedMotion ? 0 : Math.sin(time * 1.7 + 4) * 0.02);
      djGroupRef.current.position.x = 0.22 + progress * 0.45;
      djGroupRef.current.position.z = 0.92 + progress * 0.65;
      djGroupRef.current.rotation.y = -0.45 - progress * 0.35;
    }
  });

  return (
    <group name="stage-instruments">
      <SynthesizerKeyboard groupRef={keyboardGroupRef} materials={materials} />
      <DrumSet groupRef={drumsGroupRef} cymbalRef={cymbalGroupRef} materials={materials} />
      <ElectricGuitar groupRef={guitarGroupRef} materials={materials} />
      <StudioMicrophone groupRef={micGroupRef} materials={materials} />
      <AmplifierStack groupRef={ampGroupRef} materials={materials} />
      <DJMixerConsole groupRef={djGroupRef} materials={materials} />
    </group>
  );
}
