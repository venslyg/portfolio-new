'use client';

interface StageLightingProps {
  intensityMultiplier?: number;
}

export function StageLighting({ intensityMultiplier = 1.0 }: StageLightingProps) {
  return (
    <group name="stage-lighting">
      {/* Dark Ambient Base Floor */}
      <ambientLight intensity={1.1 * intensityMultiplier} color="#151726" />

      {/* Main Overhead Key Spotlight */}
      <spotLight
        position={[0, 6.5, 2.5]}
        target-position={[0, 0, 0]}
        angle={Math.PI / 4.5}
        penumbra={0.7}
        intensity={4.5 * intensityMultiplier}
        color="#FFFFFF"
        distance={14}
      />

      {/* Electric Lilac Concert Side Fill Light */}
      <spotLight
        position={[-4.5, 5.0, 1.5]}
        target-position={[0.2, 0.2, 0]}
        angle={Math.PI / 5}
        penumbra={0.8}
        intensity={4.0 * intensityMultiplier}
        color="#A78BFA"
        distance={12}
      />

      {/* Cyan Rim & Under-Glow Stage Light */}
      <spotLight
        position={[4.5, 5.0, 1.5]}
        target-position={[-0.2, 0.2, 0]}
        angle={Math.PI / 5}
        penumbra={0.8}
        intensity={3.8 * intensityMultiplier}
        color="#67E8F9"
        distance={12}
      />
    </group>
  );
}
