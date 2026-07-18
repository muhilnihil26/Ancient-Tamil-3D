import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { isWebGLSupported } from '../lib/webgl';
import { Float } from '@react-three/drei';

const weapons = [
  { name: 'Vel (Divine Spear)', tier: 'Legendary', stars: 5, color: '#D4AF37', borderClass: 'border-yellow-500', bgClass: 'from-yellow-500/20', dmg: 950, speed: 85, range: 90, unlock: 'Complete "Sage\'s Trial"', desc: 'The divine weapon of Murugan, forged in celestial fire.' },
  { name: 'Agni Vel (Fire Spear)', tier: 'Legendary', stars: 5, color: '#ff6600', borderClass: 'border-orange-500', bgClass: 'from-orange-500/20', dmg: 1200, speed: 70, range: 85, unlock: 'Defeat final boss', desc: 'Blazing with eternal flame that cannot be extinguished.' },
  { name: 'Kalai Kathi (Art Blade)', tier: 'Legendary', stars: 5, color: '#a78bfa', borderClass: 'border-purple-400', bgClass: 'from-purple-400/20', dmg: 1100, speed: 95, range: 60, unlock: '100% completion', desc: 'A blade so perfect it is considered a work of art.' },
  { name: 'Aruval (War Sword)', tier: 'Epic', stars: 4, color: '#a855f7', borderClass: 'border-purple-500', bgClass: 'from-purple-500/20', dmg: 720, speed: 80, range: 70, unlock: 'Default weapon', desc: 'The traditional curved blade of Tamil warriors.' },
  { name: 'Villu (War Bow)', tier: 'Epic', stars: 4, color: '#3b82f6', borderClass: 'border-blue-500', bgClass: 'from-blue-500/20', dmg: 520, speed: 90, range: 100, unlock: '"Archer\'s Path" quest', desc: 'Launches arrows with devastating precision.' },
  { name: 'Kodi Mazhu (Battle Axe)', tier: 'Rare', stars: 3, color: '#22d3ee', borderClass: 'border-cyan-500', bgClass: 'from-cyan-500/20', dmg: 680, speed: 55, range: 50, unlock: '"Kingdom War" achievement', desc: 'A heavy axe that cleaves armour like parchment.' },
  { name: 'Thandayam (War Shield)', tier: 'Rare', stars: 3, color: '#10b981', borderClass: 'border-emerald-500', bgClass: 'from-emerald-500/20', dmg: 0, speed: 40, range: 0, unlock: '"Defender" rank', desc: 'An indestructible shield of ancient iron.' },
  { name: 'Vaal (Longsword)', tier: 'Uncommon', stars: 2, color: '#6b7280', borderClass: 'border-gray-500', bgClass: 'from-gray-500/20', dmg: 480, speed: 75, range: 65, unlock: 'Default', desc: 'A reliable longsword carried by all Tamil soldiers.' },
];

// ── Animated weapon 3D model ────────────────────────────────────────────────
function VelModel() {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.rotation.y = clock.elapsedTime * 0.6;
    group.current.rotation.x = Math.sin(clock.elapsedTime * 0.4) * 0.15;
  });
  const gold = { color: '#D4AF37', metalness: 0.95, roughness: 0.05, emissive: '#7a5c00' as string, emissiveIntensity: 0.3 };
  const wood = { color: '#5C3A1E', roughness: 0.8, metalness: 0.1 };
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <group ref={group}>
        {/* Shaft */}
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.04, 0.05, 2.2, 12]} />
          <meshStandardMaterial {...wood} />
        </mesh>
        {/* Grip wrapping */}
        {[-0.2, -0.4, -0.6, -0.8].map((y, i) => (
          <mesh key={i} position={[0, y, 0]}>
            <cylinderGeometry args={[0.055, 0.055, 0.04, 12]} />
            <meshStandardMaterial color="#1a0a00" metalness={0.3} roughness={0.7} />
          </mesh>
        ))}
        {/* Guard / cross */}
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[0.55, 0.06, 0.1]} />
          <meshStandardMaterial {...gold} />
        </mesh>
        {/* Blade */}
        <mesh position={[0, 1.2, 0]}>
          <cylinderGeometry args={[0.001, 0.07, 1.4, 4]} />
          <meshStandardMaterial color="#e0e8f0" metalness={0.98} roughness={0.02} />
        </mesh>
        {/* Spearhead */}
        <mesh position={[0, 2.0, 0]}>
          <coneGeometry args={[0.1, 0.5, 4]} />
          <meshStandardMaterial {...gold} />
        </mesh>
        {/* Pommel */}
        <mesh position={[0, -1.65, 0]}>
          <sphereGeometry args={[0.1, 12, 12]} />
          <meshStandardMaterial {...gold} />
        </mesh>
        {/* Glow orb at tip */}
        <pointLight position={[0, 2.3, 0]} intensity={3} color="#D4AF37" distance={4} />
        <mesh position={[0, 2.25, 0]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial color="#ffdd55" emissive="#ffaa00" emissiveIntensity={3} transparent opacity={0.8} />
        </mesh>
      </group>
    </Float>
  );
}

function WeaponFallback() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="relative w-20 h-64">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-3 h-52 bg-gradient-to-b from-[#D4AF37] to-[#6B3D1E] rounded-sm" />
        <div className="absolute left-1/2 -translate-x-1/2 top-[38%] w-14 h-2 bg-[#D4AF37]" />
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-5 h-5 bg-[#D4AF37] rounded-full" />
      </div>
    </div>
  );
}

function StarRating({ count, total = 5 }: { count: number; total?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className={`w-2.5 h-2.5 rounded-full border ${i < count ? 'bg-primary border-primary' : 'bg-transparent border-border/50'}`} />
      ))}
    </div>
  );
}

export default function Weapons() {
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const [selected, setSelected] = useState(0);
  useEffect(() => { setWebgl(isWebGLSupported()); }, []);

  const sel = weapons[selected];

  return (
    <div className="min-h-screen pt-32 pb-24 noise-bg">
      <div className="container mx-auto px-4 md:px-8">

        {/* Header */}
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-primary uppercase tracking-[0.4em] text-xs font-bold mb-3">Ancient Arsenal</p>
          <h1 className="font-serif text-4xl md:text-6xl text-foreground uppercase tracking-widest mb-4">
            Armory of <span className="text-primary text-glow-gold">Tamilakam</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">Forge your legend. Each weapon carries the soul of a warrior dynasty.</p>
        </motion.div>

        {/* 3D showcase + details */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {/* 3D Viewer */}
          <motion.div
            className="relative h-[420px] bg-card border border-primary/30 overflow-hidden box-glow-gold"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#1a0d00_0%,#080502_70%)]" />
            {webgl ? (
              <Canvas camera={{ position: [0, 0, 5], fov: 40 }}>
                <ambientLight intensity={0.2} />
                <directionalLight position={[5, 8, 5]} intensity={0.8} color="#fff5cc" />
                <pointLight position={[-3, 2, -2]} intensity={1.5} color="#8B0000" />
                <pointLight position={[3, 0, 3]} intensity={2} color="#D4AF37" />
                <VelModel />
              </Canvas>
            ) : <WeaponFallback />}
            {/* Corner marks */}
            {['top-0 left-0 border-t border-l', 'top-0 right-0 border-t border-r', 'bottom-0 left-0 border-b border-l', 'bottom-0 right-0 border-b border-r'].map((c, i) => (
              <div key={i} className={`absolute w-5 h-5 border-primary/60 ${c}`} />
            ))}
            <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Vel — Divine Spear · Rotating Preview</p>
            </div>
          </motion.div>

          {/* Selected weapon details */}
          <motion.div
            key={selected}
            className="bg-card border border-border/30 p-8 flex flex-col justify-between"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-widest font-bold px-3 py-1 border" style={{ color: sel.color, borderColor: `${sel.color}50` }}>{sel.tier}</span>
                <StarRating count={sel.stars} />
              </div>
              <h2 className="font-serif text-3xl text-foreground mb-3">{sel.name}</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">{sel.desc}</p>

              {[
                { label: 'Damage', value: sel.dmg, max: 1200 },
                { label: 'Speed', value: sel.speed, max: 100 },
                { label: 'Range', value: sel.range, max: 100 },
              ].map(stat => (
                <div key={stat.label} className="mb-4">
                  <div className="flex justify-between text-xs uppercase tracking-widest text-muted-foreground mb-1.5">
                    <span>{stat.label}</span><span style={{ color: sel.color }}>{stat.value}</span>
                  </div>
                  <div className="h-1.5 w-full bg-background/80 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: sel.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${(stat.value / stat.max) * 100}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-border/30 pt-5 mt-2">
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Unlock</p>
              <p className="text-foreground font-medium">{sel.unlock}</p>
            </div>
          </motion.div>
        </div>

        {/* Weapon grid */}
        <div className="max-w-6xl mx-auto">
          <h3 className="font-serif text-2xl text-foreground uppercase tracking-widest mb-8 border-b border-border/30 pb-4">
            Full Arsenal
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {weapons.map((w, idx) => (
              <motion.button
                key={w.name}
                onClick={() => setSelected(idx)}
                className={`text-left border p-5 transition-all duration-300 group relative overflow-hidden ${
                  selected === idx ? `${w.borderClass} bg-card` : 'border-border/30 bg-card/50 hover:border-border/60'
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06 }}
                whileHover={{ y: -3 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${w.bgClass} to-transparent opacity-0 ${selected === idx ? 'opacity-100' : 'group-hover:opacity-50'} transition-opacity duration-500`} />
                <div className="relative z-10">
                  <StarRating count={w.stars} />
                  <h4 className={`font-serif text-sm mt-2 mb-1 transition-colors ${selected === idx ? 'text-primary' : 'text-foreground group-hover:text-primary'}`}>{w.name}</h4>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{w.tier}</p>
                </div>
                {selected === idx && <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary" />}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
