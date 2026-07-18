import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, MeshDistortMaterial } from '@react-three/drei';
import { Suspense, useState, useEffect, useRef } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { isWebGLSupported } from '../lib/webgl';
import * as THREE from 'three';

// ── Procedural Gopuram (temple tower) silhouette ─────────────────────────────
function GopuramTower({ position }: { position: [number, number, number] }) {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.position.y = position[1] + Math.sin(clock.elapsedTime * 0.3) * 0.05;
    }
  });

  const tierData = [
    { w: 0.8, h: 0.3, y: 0 },
    { w: 0.65, h: 0.28, y: 0.3 },
    { w: 0.52, h: 0.26, y: 0.56 },
    { w: 0.4, h: 0.24, y: 0.79 },
    { w: 0.3, h: 0.22, y: 0.99 },
    { w: 0.2, h: 0.2, y: 1.17 },
    { w: 0.13, h: 0.18, y: 1.33 },
  ];

  return (
    <group ref={group} position={position}>
      {/* Base platform */}
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[1.1, 0.15, 0.5]} />
        <meshStandardMaterial color="#1a0e00" metalness={0.1} roughness={0.9} />
      </mesh>
      {/* Tiers */}
      {tierData.map((t, i) => (
        <mesh key={i} position={[0, t.y, 0]}>
          <boxGeometry args={[t.w, t.h, t.w * 0.5]} />
          <meshStandardMaterial color={i % 2 === 0 ? '#1a0a00' : '#2a1000'} metalness={0.05} roughness={0.95} />
        </mesh>
      ))}
      {/* Kalasam (top finial) */}
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.07, 8, 8]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} emissive="#D4AF37" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}

// ── Warrior silhouette with cape ─────────────────────────────────────────────
function WarriorHero() {
  const group = useRef<THREE.Group>(null);
  const weapon = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.2) * 0.15;
      group.current.position.y = Math.sin(t * 0.5) * 0.08;
    }
    if (weapon.current) {
      weapon.current.rotation.z = Math.sin(t * 0.8) * 0.08;
    }
  });

  const goldMat = { color: '#D4AF37', metalness: 0.9, roughness: 0.1, emissive: '#7a5c00' as string, emissiveIntensity: 0.2 };
  const darkMat = { color: '#0a0500', metalness: 0.2, roughness: 0.8 };

  return (
    <group ref={group} position={[0, -1, 0]}>
      {/* Body */}
      <mesh position={[0, 1.2, 0]}>
        <capsuleGeometry args={[0.25, 0.9, 8, 16]} />
        <meshStandardMaterial {...darkMat} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 2.05, 0]}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial {...darkMat} />
      </mesh>
      {/* Crown / Helmet */}
      <mesh position={[0, 2.28, 0]}>
        <cylinderGeometry args={[0.18, 0.22, 0.15, 16]} />
        <meshStandardMaterial {...goldMat} />
      </mesh>
      <mesh position={[0, 2.4, 0]}>
        <coneGeometry args={[0.07, 0.25, 8]} />
        <meshStandardMaterial {...goldMat} />
      </mesh>
      {/* Shoulder armour L */}
      <mesh position={[-0.35, 1.7, 0]} rotation={[0, 0, -0.4]}>
        <sphereGeometry args={[0.18, 8, 8]} />
        <meshStandardMaterial {...goldMat} />
      </mesh>
      {/* Shoulder armour R */}
      <mesh position={[0.35, 1.7, 0]} rotation={[0, 0, 0.4]}>
        <sphereGeometry args={[0.18, 8, 8]} />
        <meshStandardMaterial {...goldMat} />
      </mesh>
      {/* Weapon — Vel (spear) */}
      <group ref={weapon} position={[0.55, 1.3, 0]} rotation={[0, 0, -0.2]}>
        <mesh position={[0, 0.7, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 1.8, 8]} />
          <meshStandardMaterial color="#6B3D1E" roughness={0.7} />
        </mesh>
        <mesh position={[0, 1.7, 0]}>
          <coneGeometry args={[0.06, 0.6, 8]} />
          <meshStandardMaterial {...goldMat} />
        </mesh>
        {/* Spear glow */}
        <mesh position={[0, 1.7, 0]}>
          <coneGeometry args={[0.1, 0.7, 8]} />
          <meshStandardMaterial color="#ff8800" transparent opacity={0.12} emissive="#ff4400" emissiveIntensity={1} />
        </mesh>
      </group>
      {/* Shield */}
      <mesh position={[-0.5, 1.3, 0.1]}>
        <cylinderGeometry args={[0.28, 0.28, 0.05, 16]} />
        <meshStandardMaterial {...goldMat} />
      </mesh>
      <mesh position={[-0.5, 1.3, 0.13]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial {...goldMat} />
      </mesh>
    </group>
  );
}

// ── Floating gold orb ─────────────────────────────────────────────────────────
function GoldOrb({ position }: { position: [number, number, number] }) {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.position.y = position[1] + Math.sin(clock.elapsedTime * 1.2 + position[0]) * 0.2;
      mesh.current.rotation.x = clock.elapsedTime * 0.4;
      mesh.current.rotation.z = clock.elapsedTime * 0.3;
    }
  });
  return (
    <mesh ref={mesh} position={position}>
      <icosahedronGeometry args={[0.12, 1]} />
      <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0} emissive="#7a5c00" emissiveIntensity={0.5} />
    </mesh>
  );
}

// ── Ember particles ───────────────────────────────────────────────────────────
function EmberParticles({ count = 300 }) {
  const points = useRef<THREE.Points>(null);
  const positions = useRef(new Float32Array(count * 3).map(() => (Math.random() - 0.5) * 12));
  const velocities = useRef(Array.from({ length: count }, () => ({
    x: (Math.random() - 0.5) * 0.003,
    y: 0.003 + Math.random() * 0.006,
    z: (Math.random() - 0.5) * 0.003,
  })));

  useFrame(() => {
    if (!points.current) return;
    const pos = points.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      pos[i * 3] += velocities.current[i].x;
      pos[i * 3 + 1] += velocities.current[i].y;
      pos[i * 3 + 2] += velocities.current[i].z;
      if (pos[i * 3 + 1] > 6) {
        pos[i * 3 + 1] = -4;
        pos[i * 3] = (Math.random() - 0.5) * 12;
      }
    }
    points.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions.current, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#D4AF37" transparent opacity={0.8} sizeAttenuation />
    </points>
  );
}

function CSSFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(ellipse_at_50%_60%,#2a1a0a_0%,#0a0704_70%)]">
      {Array.from({ length: 40 }).map((_, i) => (
        <div key={i} className="absolute rounded-full animate-ember" style={{
          width: `${2 + (i % 5)}px`, height: `${2 + (i % 5)}px`,
          left: `${(i * 37) % 100}%`, bottom: `-${10 + (i * 13) % 40}px`,
          background: i % 3 === 0 ? '#D4AF37' : i % 3 === 1 ? '#CD7F32' : '#FF6600',
          animationDelay: `${(i * 0.4) % 6}s`, animationDuration: `${4 + (i * 0.7) % 5}s`,
        }} />
      ))}
    </div>
  );
}

export default function HeroScene() {
  const [webgl, setWebgl] = useState<boolean | null>(null);
  useEffect(() => { setWebgl(isWebGLSupported()); }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {webgl === false ? (
        <CSSFallback />
      ) : webgl === true ? (
        <ErrorBoundary FallbackComponent={CSSFallback}>
          <Canvas className="opacity-[0.5]" camera={{ position: [0, 1, 9], fov: 45 }}>
            <fog attach="fog" args={['#0a0704', 8, 22]} />
            <ambientLight intensity={0.15} />
            <directionalLight position={[5, 8, 5]} intensity={0.8} color="#D4AF37" castShadow />
            <pointLight position={[-4, 2, -2]} intensity={1.5} color="#8B0000" />
            <pointLight position={[4, 4, 2]} intensity={0.8} color="#D4AF37" />
            <spotLight position={[0, 8, 4]} angle={0.3} intensity={2} color="#ff8800" />
            <Suspense fallback={null}>
              <Stars radius={120} depth={60} count={4000} factor={4} saturation={0} fade speed={0.5} />
              <EmberParticles count={300} />
              <WarriorHero />
              <GopuramTower position={[-4.5, -0.5, -3]} />
              <GopuramTower position={[4.5, -0.5, -3]} />
              <GoldOrb position={[-2.5, 1.5, -1]} />
              <GoldOrb position={[2.5, 2, -1]} />
              <GoldOrb position={[0, 3.5, -2]} />
              {/* Ground plane */}
              <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]} receiveShadow>
                <planeGeometry args={[30, 30, 1, 1]} />
                <meshStandardMaterial color="#0a0500" roughness={1} />
              </mesh>
            </Suspense>
          </Canvas>
        </ErrorBoundary>
      ) : (
        <div className="absolute inset-0 bg-[#0a0704]" />
      )}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-background/40 to-background z-10" />
    </div>
  );
}
