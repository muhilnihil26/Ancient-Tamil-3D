import { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';

interface AudioContextType {
  isMuted: boolean;
  toggleMute: () => void;
  audioCtx: AudioContext | null;
  resumeAudio: () => Promise<void>;
}

const AudioContextContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [isMuted, setIsMuted] = useState(true); // Default true until user opts in
  const audioCtxRef = useRef<AudioContext | null>(null);
  
  useEffect(() => {
    const saved = localStorage.getItem('vy_audio_muted');
    if (saved === 'false') {
      setIsMuted(false);
    }
  }, []);

  const getAudioCtx = () => {
    if (!audioCtxRef.current) {
      const Ctx = window.AudioContext || (window as any).webkitAudioContext;
      if (!Ctx) return null;
      audioCtxRef.current = new Ctx();
    }
    return audioCtxRef.current;
  };

  const resumeAudio = async () => {
    const ctx = getAudioCtx();
    if (ctx && ctx.state === 'suspended') {
      await ctx.resume();
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => {
      const newVal = !prev;
      localStorage.setItem('vy_audio_muted', newVal.toString());
      if (!newVal) {
        const ctx = getAudioCtx();
        if (ctx && ctx.state === 'suspended') {
          ctx.resume();
        }
      }
      return newVal;
    });
  };

  return (
    <AudioContextContext.Provider value={{ isMuted, toggleMute, audioCtx: audioCtxRef.current, resumeAudio }}>
      {children}
    </AudioContextContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContextContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}