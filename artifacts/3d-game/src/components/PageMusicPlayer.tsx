import { useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { useAudio } from '@/context/AudioContext';
import { createPageAmbient, AmbientHandle } from '@/lib/audio';

/**
 * Invisible component mounted once in App.
 * Listens to route changes and crossfades synthesized ambient music per page.
 * Respects the global mute toggle.
 */
export default function PageMusicPlayer() {
  const [location] = useLocation();
  const { isMuted, resumeAudio, audioCtx } = useAudio();
  const currentHandle = useRef<AmbientHandle | null>(null);
  const hasInteracted = useRef(false);

  // Start playing after first user interaction (browser autoplay policy)
  useEffect(() => {
    const unlock = async () => {
      if (hasInteracted.current) return;
      hasInteracted.current = true;
      await resumeAudio();
    };
    window.addEventListener('click', unlock, { once: true });
    window.addEventListener('touchstart', unlock, { once: true });
    window.addEventListener('keydown', unlock, { once: true });
    return () => {
      window.removeEventListener('click', unlock);
      window.removeEventListener('touchstart', unlock);
      window.removeEventListener('keydown', unlock);
    };
  }, [resumeAudio]);

  // Crossfade when route or mute changes
  useEffect(() => {
    if (isMuted || !audioCtx || audioCtx.state === 'suspended') {
      currentHandle.current?.stop(1);
      currentHandle.current = null;
      return;
    }
    // Fade out previous
    currentHandle.current?.stop(1.5);

    // Fade in new theme after short gap
    const timer = setTimeout(() => {
      if (isMuted) return;
      try {
        currentHandle.current = createPageAmbient(audioCtx, location);
      } catch {
        // AudioContext might not be ready yet
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [location, isMuted, audioCtx]);

  // Stop all on unmount
  useEffect(() => {
    return () => { currentHandle.current?.stop(0.5); };
  }, []);

  return null;
}
