import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { Suspense, useState, useEffect } from 'react';
import ParticleField from './ParticleField';
import { WarriorSilhoutte } from './ThreeScene';
import { ErrorBoundary } from 'react-error-boundary';
import { isWebGLSupported } from '../lib/webgl';

function CSSFallbackBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated ember particles via CSS */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,#2a1a0a_0%,#0a0704_70%)]" />
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-70 animate-ember"
          style={{
            width: `${2 + (i % 4)}px`,
            height: `${2 + (i % 4)}px`,
            left: `${(i * 37) % 100}%`,
            bottom: `-${10 + (i * 13) % 40}px`,
            background: i % 3 === 0 ? '#D4AF37' : i % 3 === 1 ? '#CD7F32' : '#8B0000',
            animationDelay: `${(i * 0.4) % 6}s`,
            animationDuration: `${4 + (i * 0.7) % 5}s`,
          }}
        />
      ))}
    </div>
  );
}

function WebGLFallback() {
  return <CSSFallbackBackground />;
}

export default function HeroScene() {
  const [webgl, setWebgl] = useState<boolean | null>(null);

  useEffect(() => {
    setWebgl(isWebGLSupported());
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {webgl === false ? (
        <CSSFallbackBackground />
      ) : webgl === true ? (
        <ErrorBoundary FallbackComponent={WebGLFallback}>
          <Canvas className="opacity-[0.5]" camera={{ position: [0, 0, 8], fov: 45 }}>
            <fog attach="fog" args={['#0a0704', 5, 20]} />
            <ambientLight intensity={0.2} />
            <directionalLight position={[5, 5, 5]} intensity={1} color="#D4AF37" />
            <pointLight position={[-5, 0, -5]} intensity={0.5} color="#8B0000" />
            <Suspense fallback={null}>
              <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
              <ParticleField count={1000} color="#D4AF37" size={0.03} />
              <ParticleField count={500} color="#CD7F32" size={0.04} />
              <WarriorSilhoutte />
            </Suspense>
          </Canvas>
        </ErrorBoundary>
      ) : (
        /* null while detecting */
        <div className="absolute inset-0 bg-[#0a0704]" />
      )}

      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-background/50 to-background z-10" />
    </div>
  );
}
