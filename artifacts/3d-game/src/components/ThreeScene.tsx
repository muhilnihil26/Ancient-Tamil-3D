import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function WarriorSilhoutte() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1 - 2;
    }
  });

  return (
    <group ref={groupRef} position={[0, -2, -5]}>
      {/* Body */}
      <mesh position={[0, 2, 0]} castShadow>
        <cylinderGeometry args={[0.5, 0.6, 2, 8]} />
        <meshStandardMaterial color="#000000" roughness={0.9} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 3.2, 0]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial color="#000000" roughness={0.9} />
      </mesh>
      {/* Spear/Weapon */}
      <mesh position={[0.8, 2.5, 0]} rotation={[0, 0, -0.2]}>
        <cylinderGeometry args={[0.05, 0.05, 4, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.9, 4.5, 0]} rotation={[0, 0, -0.2]}>
        <coneGeometry args={[0.15, 0.5, 8]} />
        <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}
