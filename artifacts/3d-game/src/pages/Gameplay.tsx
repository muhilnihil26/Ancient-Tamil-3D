import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { isWebGLSupported } from '../lib/webgl';

const features = [
  { icon: '🌍', title: 'Open World', desc: 'Seamless 100 km² world from Kaveri delta to Kerala mountains — zero loading screens.' },
  { icon: '🐎', title: 'War Horse', desc: 'Command your war horse through ancient battlefields with realistic physics and stamina.' },
  { icon: '⚔️', title: 'Sword Combat', desc: 'Master 50+ Tamil martial arts moves — Silambam, Varma Kalai, Adimurai.' },
  { icon: '🏰', title: 'Kingdom Wars', desc: 'Lead 10,000-warrior sieges against enemy forts with real-time command.' },
  { icon: '👹', title: 'Boss Battles', desc: 'Face legendary generals and mythic demons drawn from Sangam literature.' },
  { icon: '🛕', title: 'Temple Exploration', desc: 'Uncover ancient secrets within fully detailed Dravidian temples.' },
  { icon: '💎', title: 'Treasure Hunting', desc: 'Find lost artefacts of the Tamil world buried across the open world.' },
  { icon: '🎯', title: 'Archery', desc: 'Precision bow combat with wind physics and a range of specialised arrows.' },
  { icon: '🌊', title: 'Naval Battles', desc: 'Command Chola warships across the Bay of Bengal in real-time naval warfare.' },
  { icon: '🧠', title: 'Diplomacy', desc: 'Forge alliances, bribe generals, or incite rebellion — war isn\'t only on the battlefield.' },
  { icon: '🌙', title: 'Day/Night Cycle', desc: 'Dynamic 24-hour cycle with realistic moon phases, starfields, and monsoon seasons.' },
  { icon: '🏹', title: 'Stealth System', desc: 'Infiltrate enemy camps under the cover of darkness, using shadows and sound.' },
];

// ── Animated 3D warrior scene ────────────────────────────────────────────────
function WarriorScene() {
  const groupRef = useRef<THREE.Group>(null);
  const swordRef = useRef<THREE.Mesh>(null);
  const shieldRef = useRef<THREE.Mesh>(null);
  const t = useRef(0);

  useFrame((_, delta) => {
    t.current += delta;
    if (!groupRef.current) return;
    // Walking bob
    groupRef.current.position.y = Math.sin(t.current * 5) * 0.07;
    groupRef.current.rotation.y = Math.sin(t.current * 0.4) * 0.18;
    // Sword swing
    if (swordRef.current) {
      swordRef.current.rotation.z = -Math.PI / 4 + Math.sin(t.current * 2.5) * 0.4;
    }
    // Shield oscillate
    if (shieldRef.current) {
      shieldRef.current.rotation.y = Math.sin(t.current * 1.5) * 0.2;
    }
  });

  const gold = { color: '#D4AF37' as string, metalness: 0.9, roughness: 0.1 };
  const iron = { color: '#a8b0c0' as string, metalness: 0.95, roughness: 0.05 };
  const leather = { color: '#8B4513' as string, roughness: 0.8, metalness: 0.1 };

  return (
    <group ref={groupRef}>
      {/* Ground grid */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.6, 0]}>
        <planeGeometry args={[60, 60, 24, 24]} />
        <meshStandardMaterial color="#D4AF37" wireframe transparent opacity={0.15} />
      </mesh>
      {/* Body */}
      <mesh position={[0, 0, 0]} castShadow>
        <capsuleGeometry args={[0.35, 1.1, 8, 16]} />
        <meshStandardMaterial {...leather} />
      </mesh>
      {/* Chest armour */}
      <mesh position={[0, 0.1, 0.15]}>
        <boxGeometry args={[0.65, 0.9, 0.12]} />
        <meshStandardMaterial {...gold} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 1.1, 0]}>
        <sphereGeometry args={[0.28, 16, 16]} />
        <meshStandardMaterial color="#d4b99a" roughness={0.6} />
      </mesh>
      {/* Helmet */}
      <mesh position={[0, 1.28, 0]}>
        <cylinderGeometry args={[0.3, 0.28, 0.22, 16]} />
        <meshStandardMaterial {...gold} />
      </mesh>
      {/* Helmet crest */}
      <mesh position={[0, 1.48, 0]}>
        <boxGeometry args={[0.06, 0.22, 0.34]} />
        <meshStandardMaterial color="#cc2200" roughness={0.7} />
      </mesh>
      {/* Shoulder pads */}
      {[-0.55, 0.55].map((x, i) => (
        <mesh key={i} position={[x, 0.6, 0]}>
          <sphereGeometry args={[0.2, 12, 12]} />
          <meshStandardMaterial {...gold} />
        </mesh>
      ))}
      {/* Sword arm */}
      <mesh ref={swordRef} position={[0.65, 0.1, 0]} rotation={[0, 0, -Math.PI / 4]}>
        {/* Blade */}
        <mesh position={[0, 0.7, 0]}>
          <boxGeometry args={[0.06, 1.2, 0.04]} />
          <meshStandardMaterial {...iron} />
        </mesh>
        {/* Guard */}
        <mesh position={[0, 0.08, 0]}>
          <boxGeometry args={[0.35, 0.05, 0.08]} />
          <meshStandardMaterial {...gold} />
        </mesh>
        {/* Handle */}
        <mesh position={[0, -0.15, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.35, 8]} />
          <meshStandardMaterial {...leather} />
        </mesh>
      </mesh>
      {/* Shield */}
      <mesh ref={shieldRef} position={[-0.7, 0.1, 0.1]} rotation={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.42, 0.42, 0.07, 20]} />
        <meshStandardMaterial {...gold} />
        {/* Shield emblem */}
        <mesh position={[0, 0.05, 0]}>
          <torusGeometry args={[0.2, 0.03, 8, 20]} />
          <meshStandardMaterial color="#8B0000" metalness={0.7} roughness={0.3} />
        </mesh>
      </mesh>
      {/* Glow point */}
      <pointLight position={[0, 1.1, 1]} intensity={2} color="#D4AF37" distance={5} />
    </group>
  );
}

function GameplayFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0704] via-[#1a0f06] to-[#0a0704]" />
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #D4AF37 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        animation: 'gridMove 4s linear infinite',
      }} />
      <div className="relative z-10 flex flex-col items-center gap-2 animate-float">
        <div className="w-8 h-8 rounded-full bg-[#D4AF37] opacity-90" />
        <div className="w-14 h-24 bg-[#8B4513] rounded-sm" />
        <div className="w-10 h-1 bg-[#D4AF37]" />
      </div>
    </div>
  );
}

const PHASES = ['Explore', 'Combat', 'Command'];
const PHASE_DESCS = [
  'Traverse dense jungles, hidden valleys, and ancient ruins across a 100km² open world.',
  'Master 50+ martial arts moves with skill trees that evolve as you progress.',
  'Lead armies, build alliances, and make decisions that reshape the political map of Tamilakam.',
];

export default function Gameplay() {
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const [activePhase, setActivePhase] = useState(0);

  useEffect(() => { setWebgl(isWebGLSupported()); }, []);

  useEffect(() => {
    const i = setInterval(() => setActivePhase(p => (p + 1) % PHASES.length), 4000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-24 noise-bg">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-primary uppercase tracking-[0.4em] text-xs font-bold mb-3">Game Systems</p>
          <h1 className="font-serif text-4xl md:text-6xl text-primary text-glow-gold mb-4 uppercase tracking-widest">Forge Your Path</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">Every decision, every battle, every alliance shapes the fate of Tamilakam.</p>
        </motion.div>

        {/* Phase selector */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="flex border border-primary/30 overflow-hidden mb-6">
            {PHASES.map((ph, i) => (
              <button key={ph} onClick={() => setActivePhase(i)}
                className={`flex-1 min-h-[48px] text-xs md:text-sm uppercase tracking-widest font-bold font-serif transition-all ${activePhase === i ? 'bg-primary text-primary-foreground' : 'bg-transparent text-muted-foreground hover:text-foreground hover:bg-primary/10'}`}>
                {ph}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.p key={activePhase} className="text-center text-muted-foreground"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
              {PHASE_DESCS[activePhase]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* 3D Scene */}
        <div className="relative h-[45vh] md:h-[55vh] border border-primary/30 overflow-hidden mb-20 bg-[#0a0704]">
          {webgl ? (
            <Canvas camera={{ position: [0, 1.5, 5.5], fov: 45 }}>
              <fog attach="fog" args={['#0a0704', 6, 16]} />
              <ambientLight intensity={0.15} />
              <directionalLight position={[4, 8, 4]} intensity={1.2} color="#fff5cc" castShadow />
              <pointLight position={[-4, 2, -2]} intensity={1.5} color="#8B0000" />
              <pointLight position={[3, 0, 3]} intensity={2.5} color="#D4AF37" />
              <WarriorScene />
            </Canvas>
          ) : <GameplayFallback />}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-[#0a0704]/80 to-transparent" />
            <div className="absolute bottom-6 left-0 right-0 text-center">
              <p className="text-primary uppercase tracking-[0.3em] text-xs font-bold animate-pulse-gold">Live 3D Preview · Warrior Character Rig</p>
            </div>
          </div>
          {/* Corner deco */}
          {['top-0 left-0 border-t border-l', 'top-0 right-0 border-t border-r', 'bottom-0 left-0 border-b border-l', 'bottom-0 right-0 border-b border-r'].map((c, i) => (
            <div key={i} className={`absolute w-6 h-6 border-primary/60 ${c} pointer-events-none`} />
          ))}
        </div>

        {/* Features grid */}
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground uppercase tracking-widest">
            12 Core <span className="text-primary">Systems</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
          {features.map((f, idx) => (
            <motion.div key={idx}
              className="bg-card p-5 border border-border/30 hover:border-primary/50 transition-all group relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: (idx % 4) * 0.07 }} whileHover={{ y: -4 }}>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 transition-all duration-500 pointer-events-none" />
              <div className="absolute left-0 top-0 bottom-0 w-0 bg-primary group-hover:w-0.5 transition-all duration-300" />
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform origin-left duration-300">{f.icon}</div>
              <h3 className="font-serif text-base md:text-lg text-foreground font-bold mb-2 group-hover:text-primary transition-colors">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
