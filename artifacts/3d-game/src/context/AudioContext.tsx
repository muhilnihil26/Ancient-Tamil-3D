import { createContext, useContext, useState, useEffect, useCallback, ReactNode, useRef } from 'react';

interface AudioContextType {
  isMuted: boolean;
  toggleMute: () => void;
  audioCtx: AudioContext | null;
  resumeAudio: () => Promise<AudioContext | null>;
}

const AudioContextContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [isMuted, setIsMuted] = useState(false);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('vy_audio_muted');
    if (saved === 'true') setIsMuted(true);
  }, []);

  const getOrCreateCtx = useCallback((): AudioContext | null => {
    if (audioCtxRef.current) return audioCtxRef.current;
    const Ctx = window.AudioContext || (window as any).webkitAudioContext;
    if (!Ctx) return null;
    const ctx = new Ctx();
    audioCtxRef.current = ctx;
    setAudioCtx(ctx);
    return ctx;
  }, []);

  const resumeAudio = useCallback(async (): Promise<AudioContext | null> => {
    const ctx = getOrCreateCtx();
    if (ctx && ctx.state === 'suspended') await ctx.resume();
    return ctx;
  }, [getOrCreateCtx]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const next = !prev;
      localStorage.setItem('vy_audio_muted', String(next));
      if (!next) { resumeAudio(); }
      return next;
    });
  }, [resumeAudio]);

  return (
    <AudioContextContext.Provider value={{ isMuted, toggleMute, audioCtx, resumeAudio }}>
      {children}
    </AudioContextContext.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioContextContext);
  if (!ctx) throw new Error('useAudio must be used within AudioProvider');
  return ctx;
}
