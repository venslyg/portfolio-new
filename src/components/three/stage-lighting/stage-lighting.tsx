'use client';

interface StageLightingProps {
  intensityMultiplier?: number;
}

export function StageLighting({ intensityMultiplier = 1.0 }: StageLightingProps) {
  return (
    <group name="stage-lighting">
      {/* Dark Ambient Base Floor */}
      <ambientLight intensity={1.0 * intensityMultiplier} color="#151726" />

      {/* Studio White Key Light */}
      <directionalLight
        position={[4, 7, 5]}
        intensity={2.4 * intensityMultiplier}
        color="#FFFFFF"
      />

      {/* Electric Lilac Fill Light */}
      <directionalLight
        position={[-4, 3, 2]}
        intensity={2.8 * intensityMultiplier}
        color="#A78BFA"
      />

      {/* Cyan Rim & Under-Glow Light */}
      <directionalLight
        position={[2, -3, 3]}
        intensity={2.5 * intensityMultiplier}
        color="#67E8F9"
      />

      {/* Specular Glint Center Point */}
      <pointLight
        position={[0, 2, 4]}
        intensity={1.8 * intensityMultiplier}
        color="#FFFFFF"
      />
    </group>
  );
}
