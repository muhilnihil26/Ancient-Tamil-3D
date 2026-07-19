import { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';

export interface Song {
  id: string;
  title: string;
  artist: string;
  src: string;
  type: 'url' | 'file';
  createdAt: string;
}

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  src: string;
  createdAt: string;
}

export interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  author: string;
  excerpt: string;
  content: string[];
  createdAt: string;
}

export interface Trailer {
  id: string;
  title: string;
  description: string;
  src: string;
  type: 'url' | 'file';
  isSessionOnly?: boolean; // file uploads are blob URLs, session only
  createdAt: string;
}

interface AdminContextType {
  isAdmin: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  // Songs
  songs: Song[];
  addSong: (song: Omit<Song, 'id' | 'createdAt'>) => void;
  removeSong: (id: string) => void;
  // Files
  uploadedFiles: UploadedFile[];
  uploadFile: (file: File) => Promise<void>;
  removeFile: (id: string) => void;
  // Articles
  adminArticles: Article[];
  addArticle: (article: Omit<Article, 'id' | 'createdAt'>) => void;
  removeArticle: (id: string) => void;
  // Trailers
  trailers: Trailer[];
  addTrailer: (trailer: Omit<Trailer, 'id' | 'createdAt'>) => void;
  uploadTrailer: (file: File, title: string, description: string) => Promise<void>;
  removeTrailer: (id: string) => void;
  // Founder photo
  founderPhoto: string | null;
  setFounderPhoto: (src: string) => void;
}

const ADMIN_EMAIL = 'muhilsiddhesh.in@gmail.com';
const ADMIN_PASSWORD = 'muhil@2011';

const AdminContext = createContext<AdminContextType | undefined>(undefined);

function uid() { return crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2); }

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [songs, setSongs] = useState<Song[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [adminArticles, setAdminArticles] = useState<Article[]>([]);
  const [trailers, setTrailers] = useState<Trailer[]>([]);
  const [founderPhoto, setFounderPhotoState] = useState<string | null>(null);
  // Keep track of blob URLs so we can revoke them on cleanup
  const blobUrls = useRef<string[]>([]);

  useEffect(() => {
    if (localStorage.getItem('vy_admin_session') === '1') setIsAdmin(true);
    const s = localStorage.getItem('vy_songs'); if (s) setSongs(JSON.parse(s));
    const f = localStorage.getItem('vy_files'); if (f) setUploadedFiles(JSON.parse(f));
    const a = localStorage.getItem('vy_admin_articles'); if (a) setAdminArticles(JSON.parse(a));
    // Only restore URL-type trailers (file/blob URLs don't survive page reload)
    const t = localStorage.getItem('vy_trailers');
    if (t) {
      const parsed: Trailer[] = JSON.parse(t);
      setTrailers(parsed.filter(tr => tr.type === 'url'));
    }
    const p = localStorage.getItem('vy_founder_photo'); if (p) setFounderPhotoState(p);

    // Cleanup blob URLs on unmount
    return () => { blobUrls.current.forEach(url => URL.revokeObjectURL(url)); };
  }, []);

  // Persist songs/files/articles
  useEffect(() => { localStorage.setItem('vy_songs', JSON.stringify(songs)); }, [songs]);
  useEffect(() => { localStorage.setItem('vy_files', JSON.stringify(uploadedFiles)); }, [uploadedFiles]);
  useEffect(() => { localStorage.setItem('vy_admin_articles', JSON.stringify(adminArticles)); }, [adminArticles]);
  // Only persist URL-type trailers (file trailers have blob URLs that die on reload)
  useEffect(() => {
    const persistable = trailers.filter(t => t.type === 'url');
    localStorage.setItem('vy_trailers', JSON.stringify(persistable));
  }, [trailers]);

  const login = (email: string, password: string) => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsAdmin(true); localStorage.setItem('vy_admin_session', '1'); return true;
    }
    return false;
  };

  const logout = () => { setIsAdmin(false); localStorage.removeItem('vy_admin_session'); };

  const addSong = (song: Omit<Song, 'id' | 'createdAt'>) =>
    setSongs(p => [...p, { ...song, id: uid(), createdAt: new Date().toISOString() }]);
  const removeSong = (id: string) => setSongs(p => p.filter(s => s.id !== id));

  const uploadFile = (file: File) => new Promise<void>((res, rej) => {
    const r = new FileReader();
    r.onload = () => { setUploadedFiles(p => [...p, { id: uid(), name: file.name, size: file.size, type: file.type, src: r.result as string, createdAt: new Date().toISOString() }]); res(); };
    r.onerror = rej; r.readAsDataURL(file);
  });
  const removeFile = (id: string) => setUploadedFiles(p => p.filter(f => f.id !== id));

  const addArticle = (article: Omit<Article, 'id' | 'createdAt'>) =>
    setAdminArticles(p => [...p, { ...article, id: uid(), createdAt: new Date().toISOString() }]);
  const removeArticle = (id: string) => setAdminArticles(p => p.filter(a => a.id !== id));

  const addTrailer = (trailer: Omit<Trailer, 'id' | 'createdAt'>) =>
    setTrailers(p => [...p, { ...trailer, id: uid(), createdAt: new Date().toISOString() }]);

  // ── FIX: Use createObjectURL instead of FileReader for video files ──────────
  // This avoids the base64 memory/localStorage explosion for large MP4 files.
  // The blob URL is valid for the current session only (cleared on page reload).
  const uploadTrailer = async (file: File, title: string, description: string) => {
    const objectUrl = URL.createObjectURL(file);
    blobUrls.current.push(objectUrl);
    setTrailers(p => [
      ...p,
      {
        id: uid(),
        title,
        description,
        src: objectUrl,
        type: 'file',
        isSessionOnly: true,
        createdAt: new Date().toISOString(),
      }
    ]);
  };

  const removeTrailer = (id: string) => {
    setTrailers(p => {
      const found = p.find(t => t.id === id);
      // Revoke blob URL to free memory
      if (found?.type === 'file' && found.src.startsWith('blob:')) {
        URL.revokeObjectURL(found.src);
        blobUrls.current = blobUrls.current.filter(u => u !== found.src);
      }
      return p.filter(t => t.id !== id);
    });
  };

  const setFounderPhoto = (src: string) => {
    setFounderPhotoState(src || null);
    if (src) localStorage.setItem('vy_founder_photo', src);
    else localStorage.removeItem('vy_founder_photo');
  };

  return (
    <AdminContext.Provider value={{
      isAdmin, login, logout,
      songs, addSong, removeSong,
      uploadedFiles, uploadFile, removeFile,
      adminArticles, addArticle, removeArticle,
      trailers, addTrailer, uploadTrailer, removeTrailer,
      founderPhoto, setFounderPhoto,
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used within an AdminProvider');
  return ctx;
}
