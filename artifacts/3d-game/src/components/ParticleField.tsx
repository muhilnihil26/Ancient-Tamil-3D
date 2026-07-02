import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ParticleField({ count = 2000, color = "#D4AF37", size = 0.05 }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, phases] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const ph = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;     // x
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40; // y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40; // z
      ph[i] = Math.random() * Math.PI * 2;         // phase for twinkle
    }
    return [pos, ph];
  }, [count]);

  const uniforms = useMemo(() => ({
    time: { value: 0 },
    color: { value: new THREE.Color(color) },
    size: { value: size }
  }), [color, size]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0005;
      pointsRef.current.rotation.x += 0.0002;
    }
    uniforms.time.value = state.clock.getElapsedTime();
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('phase', new THREE.BufferAttribute(phases, 1));
    return geo;
  }, [positions, phases]);

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial 
        size={size} 
        color={color} 
        transparent 
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation={true}
      />
    </points>
  );
}
