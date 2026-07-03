import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Song {
  id: string;
  title: string;
  artist: string;
  src: string; // data URL or external URL
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

interface AdminContextType {
  founderPhoto: string | null;
  setFounderPhoto: (src: string) => void;

  isAdmin: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  songs: Song[];
  addSong: (song: Omit<Song, 'id' | 'createdAt'>) => void;
  removeSong: (id: string) => void;
  uploadedFiles: UploadedFile[];
  uploadFile: (file: File) => Promise<void>;
  removeFile: (id: string) => void;
  adminArticles: Article[];
  addArticle: (article: Omit<Article, 'id' | 'createdAt'>) => void;
  removeArticle: (id: string) => void;
}

const ADMIN_EMAIL = 'muhilsiddhesh.in@gmail.com';
const ADMIN_PASSWORD = 'muhil@2011';

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [songs, setSongs] = useState<Song[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [adminArticles, setAdminArticles] = useState<Article[]>([]);
  const [founderPhoto, setFounderPhotoState] = useState<string | null>(null);

  useEffect(() => {
    const adminSession = localStorage.getItem('vy_admin_session');
    if (adminSession === '1') setIsAdmin(true);

    const savedSongs = localStorage.getItem('vy_songs');
    if (savedSongs) setSongs(JSON.parse(savedSongs));

    const savedFiles = localStorage.getItem('vy_files');
    if (savedFiles) setUploadedFiles(JSON.parse(savedFiles));

    const savedArticles = localStorage.getItem('vy_admin_articles');
    if (savedArticles) setAdminArticles(JSON.parse(savedArticles));

    const savedPhoto = localStorage.getItem('vy_founder_photo');
    if (savedPhoto) setFounderPhotoState(savedPhoto);
  }, []);

  useEffect(() => {
    localStorage.setItem('vy_songs', JSON.stringify(songs));
  }, [songs]);

  useEffect(() => {
    localStorage.setItem('vy_files', JSON.stringify(uploadedFiles));
  }, [uploadedFiles]);

  useEffect(() => {
    localStorage.setItem('vy_admin_articles', JSON.stringify(adminArticles));
  }, [adminArticles]);

  const setFounderPhoto = (src: string) => {
    localStorage.setItem('vy_founder_photo', src);
    setFounderPhotoState(src);
  };

  const login = (email: string, password: string) => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      localStorage.setItem('vy_admin_session', '1');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('vy_admin_session');
  };

  const addSong = (song: Omit<Song, 'id' | 'createdAt'>) => {
    const newSong: Song = {
      ...song,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setSongs((prev) => [...prev, newSong]);
  };

  const removeSong = (id: string) => {
    setSongs((prev) => prev.filter((s) => s.id !== id));
  };

  const uploadFile = async (file: File) => {
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const uploaded: UploadedFile = {
          id: crypto.randomUUID(),
          name: file.name,
          size: file.size,
          type: file.type,
          src: reader.result as string,
          createdAt: new Date().toISOString(),
        };
        setUploadedFiles((prev) => [...prev, uploaded]);
        resolve();
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const addArticle = (article: Omit<Article, 'id' | 'createdAt'>) => {
    const newArticle: Article = {
      ...article,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setAdminArticles((prev) => [...prev, newArticle]);
  };

  const removeArticle = (id: string) => {
    setAdminArticles((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        login,
        logout,
        songs,
        addSong,
        removeSong,
        uploadedFiles,
        uploadFile,
        removeFile,
        adminArticles,
        addArticle,
        removeArticle,
        founderPhoto,
        setFounderPhoto,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
