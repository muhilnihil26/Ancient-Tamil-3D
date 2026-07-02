import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { isWebGLSupported } from '../lib/webgl';

const features = [
  { icon: '🌍', title: 'Open World Exploration', desc: 'Vast landscapes from Kaveri delta to Kerala mountains.' },
  { icon: '🐎', title: 'Horse Riding', desc: 'Command your war horse through ancient battlefields.' },
  { icon: '⚔️', title: 'Sword Combat', desc: 'Master 50+ ancient Tamil martial arts moves.' },
  { icon: '🏰', title: 'Kingdom Wars', desc: 'Lead 10,000-warrior sieges against enemy forts.' },
  { icon: '👹', title: 'Boss Battles', desc: 'Face legendary demons and enemy generals.' },
  { icon: '🛕', title: 'Temple Exploration', desc: 'Uncover ancient secrets in Dravidian temples.' },
  { icon: '💎', title: 'Treasure Hunting', desc: 'Find lost artifacts of the ancient Tamil world.' },
  { icon: '🎯', title: 'Archery System', desc: 'Precision bow combat with elemental arrows.' },
];

function WalkingWarriorScene() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      // Simulate walking animation bob
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 5) * 0.1;
      // Constant forward motion effect by moving texture/plane later, but here we just rotate slowly
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <group>
      {/* Endless ground grid plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[50, 50, 20, 20]} />
        <meshStandardMaterial color="#D4AF37" wireframe transparent opacity={0.2} />
      </mesh>
      
      <group ref={groupRef}>
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[0.8, 2, 0.4]} />
          <meshStandardMaterial color="#A0522D" roughness={0.7} />
        </mesh>
        <mesh position={[0, 1.4, 0]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color="#D4AF37" />
        </mesh>
        {/* Sword */}
        <mesh position={[0.6, 0, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <boxGeometry args={[0.1, 1.5, 0.1]} />
          <meshStandardMaterial color="#ffffff" metalness={0.8} />
        </mesh>
      </group>
    </group>
  );
}

function GameplaySceneFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0704] via-[#1a0f06] to-[#0a0704]" />
      {/* Animated grid */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #D4AF37 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        animation: 'gridMove 4s linear infinite',
      }} />
      {/* Warrior silhouette */}
      <div className="relative z-10 flex flex-col items-center gap-2 animate-float">
        <div className="w-8 h-8 rounded-full bg-[#D4AF37] opacity-90" />
        <div className="w-12 h-20 bg-[#A0522D] rounded-sm" />
      </div>
    </div>
  );
}

export default function Gameplay() {
  const [webgl, setWebgl] = useState<boolean | null>(null);
  useEffect(() => { setWebgl(isWebGLSupported()); }, []);

  return (
    <div className="min-h-screen pt-32 pb-24 noise-bg">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* 3D Scene Header */}
        <div className="relative h-[50vh] rounded-xl overflow-hidden mb-16 border border-primary/20 bg-background/50">
          {webgl ? (
            <Canvas camera={{ position: [0, 2, 6], fov: 50 }}>
              <fog attach="fog" args={['#0a0704', 5, 15]} />
              <ambientLight intensity={0.5} />
              <directionalLight position={[5, 10, 5]} intensity={1.5} color="#D4AF37" castShadow />
              <WalkingWarriorScene />
            </Canvas>
          ) : (
            <GameplaySceneFallback />
          )}
          <div className="absolute bottom-8 left-8 right-8 text-center pointer-events-none">
            <h2 className="font-serif text-3xl md:text-5xl text-primary text-glow-gold tracking-widest uppercase shadow-black drop-shadow-lg">
              Forge Your Path
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, idx) => (
            <motion.div
              key={idx}
              className="bg-card p-6 border border-border/30 hover:border-primary/50 transition-colors group cursor-default"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform origin-left">{f.icon}</div>
              <h3 className="font-serif text-xl text-foreground font-bold mb-2 group-hover:text-primary transition-colors">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
