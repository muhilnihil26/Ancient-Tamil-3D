import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { isWebGLSupported } from '../lib/webgl';

const weapons = [
  { name: 'Vel (Divine Spear)', tier: 'Legendary', stars: '⭐⭐⭐⭐⭐', color: 'border-yellow-500', bg: 'from-yellow-500/20', dmg: 950, unlock: 'Complete "Sage\'s Trial"' },
  { name: 'Agni Vel (Fire Spear)', tier: 'Legendary', stars: '⭐⭐⭐⭐⭐', color: 'border-yellow-500', bg: 'from-yellow-500/20', dmg: 1200, unlock: 'Final boss' },
  { name: 'Kalai Kathi (Art Blade)', tier: 'Legendary', stars: '⭐⭐⭐⭐⭐', color: 'border-yellow-500', bg: 'from-yellow-500/20', dmg: 1100, unlock: '100% completion' },
  { name: 'Aruval (War Sword)', tier: 'Epic', stars: '⭐⭐⭐⭐', color: 'border-purple-500', bg: 'from-purple-500/20', dmg: 720, unlock: 'Default weapon' },
  { name: 'Villu (War Bow)', tier: 'Epic', stars: '⭐⭐⭐⭐', color: 'border-purple-500', bg: 'from-purple-500/20', dmg: 520, unlock: '"Archer\'s Path"' },
  { name: 'Kodi Mazhu (Battle Axe)', tier: 'Rare', stars: '⭐⭐⭐', color: 'border-blue-500', bg: 'from-blue-500/20', dmg: 680, unlock: '"Kingdom War" achievement' },
  { name: 'Thandayam (War Shield)', tier: 'Rare', stars: '⭐⭐⭐', color: 'border-blue-500', bg: 'from-blue-500/20', dmg: 0, unlock: '"Defender" rank' },
  { name: 'Vaal (Longsword)', tier: 'Uncommon', stars: '⭐⭐', color: 'border-green-500', bg: 'from-green-500/20', dmg: 480, unlock: 'Default' },
];

function Weapon3DModel() {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={meshRef} rotation={[0, 0, Math.PI / 4]}>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 4, 16]} />
        <meshStandardMaterial color="#A0522D" roughness={0.8} />
      </mesh>
      <mesh position={[0, 2.5, 0]}>
        <coneGeometry args={[0.3, 1.5, 16]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, -2, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

function WeaponShowcaseFallback() {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center">
      <div className="relative w-32 h-64">
        {/* CSS sword shape */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-4 h-48 bg-gradient-to-b from-[#D4AF37] to-[#A0522D] rounded-sm animate-pulse" />
        <div className="absolute left-1/2 -translate-x-1/2 top-1/3 w-16 h-2 bg-[#D4AF37] -translate-y-1/2" />
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-6 h-6 bg-[#D4AF37] rounded-full" />
      </div>
    </div>
  );
}

export default function Weapons() {
  const [webgl, setWebgl] = useState<boolean | null>(null);
  useEffect(() => { setWebgl(isWebGLSupported()); }, []);

  return (
    <div className="min-h-screen pt-32 pb-24 noise-bg">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* 3D Showcase Hero */}
        <div className="relative h-[400px] w-full bg-card border border-primary/20 mb-16 overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent z-0" />
          {webgl ? (
            <div className="absolute inset-0 z-10 cursor-move">
              <Canvas camera={{ position: [0, 0, 8], fov: 40 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
                <pointLight position={[-5, 0, 0]} intensity={2} color="#D4AF37" />
                <Weapon3DModel />
              </Canvas>
            </div>
          ) : (
            <WeaponShowcaseFallback />
          )}
          <div className="absolute bottom-6 left-6 z-20 pointer-events-none">
            <h2 className="font-serif text-3xl text-primary text-glow-gold">The Legendary Vel</h2>
            <p className="text-muted-foreground">Drag to rotate the artifact</p>
          </div>
        </div>

        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h1 className="font-serif text-4xl md:text-5xl text-foreground uppercase tracking-widest mb-4">
            Armory of Tamilakam
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">Forge your legend with weapons crafted by the ancient masters.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {weapons.map((w, idx) => (
            <motion.div
              key={w.name}
              className={`bg-card border ${w.color} overflow-hidden group relative`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${w.bg} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="p-6 relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs uppercase tracking-widest border border-current px-2 py-1 opacity-80" style={{ color: `var(--color-${w.color.split('-')[1]}-500)` }}>
                    {w.tier}
                  </span>
                  <span className="text-sm">{w.stars}</span>
                </div>
                
                <h3 className="font-serif text-xl font-bold text-foreground mb-4 h-14">{w.name}</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs text-muted-foreground mb-1 uppercase">
                      <span>Power</span>
                      <span>{w.dmg}</span>
                    </div>
                    <div className="h-1.5 w-full bg-background rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-primary"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(w.dmg / 1200) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-border/50">
                    <div className="text-xs text-muted-foreground uppercase mb-1">Unlock Condition</div>
                    <div className="text-sm text-foreground">{w.unlock}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
