import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAdmin } from '@/context/AdminContext';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Lock, LogOut, Music, FileUp, FileText, Trash2, Shield, Save, Image as ImageIcon, LayoutDashboard } from 'lucide-react';
import { Link } from 'wouter';
import muhilPhoto from '@assets/muhil_siddhesh.jpg';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const songSchema = z.object({
  title: z.string().min(1),
  artist: z.string().min(1),
  src: z.string().url().min(1),
});

const articleSchema = z.object({
  title: z.string().min(1),
  category: z.string().min(1),
  date: z.string().min(1),
  author: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.string().min(1),
});

function generateId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export default function Admin() {
  const { isAdmin, login, logout, songs, addSong, removeSong, uploadedFiles, uploadFile, removeFile, adminArticles, addArticle, removeArticle, founderPhoto, setFounderPhoto } = useAdmin();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'songs' | 'files' | 'articles' | 'site'>('songs');
  const [uploading, setUploading] = useState(false);
  const [photoUploading, setPhotoUploading] = useState(false);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = () => {
        setFounderPhoto(reader.result as string);
        toast({ title: 'Photo Updated', description: 'Muhil\'s photo has been updated on the About page.' });
      };
      reader.readAsDataURL(file);
    } catch {
      toast({ title: 'Upload Failed', description: 'Could not read image.', variant: 'destructive' });
    } finally {
      setPhotoUploading(false);
    }
  };

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const songForm = useForm<z.infer<typeof songSchema>>({
    resolver: zodResolver(songSchema),
    defaultValues: { title: '', artist: '', src: '' },
  });

  const articleForm = useForm<z.infer<typeof articleSchema>>({
    resolver: zodResolver(articleSchema),
    defaultValues: { title: '', category: 'Vision', date: '', author: 'Warrior Developers', excerpt: '', content: '' },
  });

  const onLogin = (values: z.infer<typeof loginSchema>) => {
    if (login(values.email, values.password)) {
      toast({ title: 'Welcome, Muhil', description: 'Admin session started.' });
    } else {
      toast({ title: 'Access Denied', description: 'Invalid credentials.', variant: 'destructive' });
    }
  };

  const onAddSong = (values: z.infer<typeof songSchema>) => {
    addSong({ ...values, type: 'url' });
    songForm.reset();
    toast({ title: 'Song Added', description: `${values.title} is now in the library.` });
  };

  const onAddArticle = (values: z.infer<typeof articleSchema>) => {
    addArticle({ ...values, content: values.content.split('\n').filter(Boolean) });
    articleForm.reset();
    toast({ title: 'Article Saved', description: `${values.title} has been published.` });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      await uploadFile(file);
      toast({ title: 'File Uploaded', description: file.name });
    } catch (err) {
      toast({ title: 'Upload Failed', description: 'Could not read file.', variant: 'destructive' });
    } finally {
      setUploading(false);
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center noise-bg px-4">
        <motion.div
          className="bg-card border border-primary/30 p-8 md:p-12 max-w-md w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <Shield className="text-primary" size={32} />
            <h1 className="font-serif text-2xl text-foreground uppercase tracking-widest">Admin Gate</h1>
          </div>

          <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl><Input type="email" placeholder="admin@warrior.dev" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl><Input type="password" placeholder="••••••" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full btn-primary">
                <Lock size={16} className="mr-2" /> Enter Admin
              </Button>
            </form>
          </Form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-24 noise-bg">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <h1 className="font-serif text-4xl md:text-5xl text-primary text-glow-gold uppercase tracking-widest mb-2">War Room</h1>
            <p className="text-muted-foreground">Manage songs, uploads, and articles for Veera Yugam.</p>
          </div>
          <div className="flex gap-4">
            <Link href="/" className="px-4 py-2 border border-primary/50 text-primary uppercase tracking-widest text-sm hover:bg-primary/10 transition-all">View Site</Link>
            <button onClick={logout} className="px-4 py-2 border border-destructive text-destructive uppercase tracking-widest text-sm hover:bg-destructive/10 transition-all flex items-center gap-2">
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>

        <div className="flex gap-4 mb-8 border-b border-border/50 overflow-x-auto">
          {(['songs', 'files', 'articles', 'site'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 uppercase tracking-widest text-sm font-bold transition-all border-b-2 whitespace-nowrap ${activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
            >
              {tab === 'songs' && <Music size={16} className="inline mr-2" />}
              {tab === 'files' && <FileUp size={16} className="inline mr-2" />}
              {tab === 'articles' && <FileText size={16} className="inline mr-2" />}
              {tab === 'site' && <LayoutDashboard size={16} className="inline mr-2" />}
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'songs' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-card border border-border/30 p-6">
              <h2 className="font-serif text-xl text-foreground uppercase tracking-widest mb-6">Add Song</h2>
              <Form {...songForm}>
                <form onSubmit={songForm.handleSubmit(onAddSong)} className="space-y-4">
                  <FormField control={songForm.control} name="title" render={({ field }) => (
                    <FormItem><FormLabel>Title</FormLabel><FormControl><Input placeholder="Song title" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={songForm.control} name="artist" render={({ field }) => (
                    <FormItem><FormLabel>Artist</FormLabel><FormControl><Input placeholder="Artist name" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={songForm.control} name="src" render={({ field }) => (
                    <FormItem><FormLabel>Audio URL</FormLabel><FormControl><Input placeholder="https://.../song.mp3" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <Button type="submit" className="btn-primary w-full"><Save size={16} className="mr-2" /> Add Song</Button>
                </form>
              </Form>
            </div>

            <div className="bg-card border border-border/30 p-6">
              <h2 className="font-serif text-xl text-foreground uppercase tracking-widest mb-6">Library ({songs.length})</h2>
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {songs.length === 0 && <p className="text-muted-foreground text-sm">No songs yet. Add one on the left.</p>}
                {songs.map((song) => (
                  <div key={song.id} className="border border-border/30 p-4 flex justify-between items-center">
                    <div>
                      <p className="font-serif text-foreground">{song.title}</p>
                      <p className="text-xs text-muted-foreground">{song.artist}</p>
                    </div>
                    <button onClick={() => removeSong(song.id)} className="text-destructive hover:text-destructive/80 p-2"><Trash2 size={16} /></button>
                  </div>
                ))}
              </div>
              <audio controls className="w-full mt-6" src={songs[0]?.src} />
            </div>
          </div>
        )}

        {activeTab === 'files' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-card border border-border/30 p-6">
              <h2 className="font-serif text-xl text-foreground uppercase tracking-widest mb-6">Upload File</h2>
              <label className="block border-2 border-dashed border-primary/30 p-10 text-center hover:bg-primary/5 transition-all cursor-pointer">
                <input type="file" className="hidden" onChange={handleFileUpload} />
                <FileUp size={32} className="mx-auto text-primary mb-4" />
                <p className="text-foreground font-bold uppercase tracking-widest text-sm">{uploading ? 'Uploading...' : 'Click or drop file here'}</p>
                <p className="text-xs text-muted-foreground mt-2">Stored in browser localStorage.</p>
              </label>
            </div>

            <div className="bg-card border border-border/30 p-6">
              <h2 className="font-serif text-xl text-foreground uppercase tracking-widest mb-6">Uploaded Files ({uploadedFiles.length})</h2>
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {uploadedFiles.length === 0 && <p className="text-muted-foreground text-sm">No uploads yet.</p>}
                {uploadedFiles.map((file) => (
                  <div key={file.id} className="border border-border/30 p-4 flex justify-between items-center">
                    <div className="min-w-0">
                      <p className="font-serif text-foreground truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB · {file.type}</p>
                      {file.type.startsWith('audio/') && <audio controls className="w-full mt-2" src={file.src} />}
                    </div>
                    <button onClick={() => removeFile(file.id)} className="text-destructive hover:text-destructive/80 p-2"><Trash2 size={16} /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'site' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-card border border-border/30 p-6">
              <h2 className="font-serif text-xl text-foreground uppercase tracking-widest mb-6">Founder Photo</h2>
              <label className="block border-2 border-dashed border-primary/30 p-10 text-center hover:bg-primary/5 transition-all cursor-pointer">
                <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} disabled={photoUploading} />
                <ImageIcon size={32} className="mx-auto text-primary mb-4" />
                <p className="text-foreground font-bold uppercase tracking-widest text-sm">{photoUploading ? 'Uploading...' : 'Upload Muhil Photo'}</p>
                <p className="text-xs text-muted-foreground mt-2">Replaces the founder image on the About page.</p>
              </label>
            </div>

            <div className="bg-card border border-border/30 p-6">
              <h2 className="font-serif text-xl text-foreground uppercase tracking-widest mb-6">Preview</h2>
              <div className="w-48 h-48 md:w-64 md:h-64 border border-primary overflow-hidden rounded-md shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                <img src={founderPhoto || muhilPhoto} alt="Muhil Founder" className="w-full h-full object-cover" />
              </div>
              {founderPhoto && (
                <button onClick={() => setFounderPhoto('')} className="mt-4 text-destructive text-sm uppercase tracking-widest font-bold hover:underline">
                  Reset to default
                </button>
              )}
            </div>
          </div>
        )}

        {activeTab === 'articles' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-card border border-border/30 p-6">
              <h2 className="font-serif text-xl text-foreground uppercase tracking-widest mb-6">New Article</h2>
              <Form {...articleForm}>
                <form onSubmit={articleForm.handleSubmit(onAddArticle)} className="space-y-4">
                  <FormField control={articleForm.control} name="title" render={({ field }) => (
                    <FormItem><FormLabel>Title</FormLabel><FormControl><Input placeholder="Article title" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField control={articleForm.control} name="category" render={({ field }) => (
                      <FormItem><FormLabel>Category</FormLabel><FormControl><Input placeholder="Vision" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={articleForm.control} name="date" render={({ field }) => (
                      <FormItem><FormLabel>Date</FormLabel><FormControl><Input placeholder="March 2031" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                  <FormField control={articleForm.control} name="excerpt" render={({ field }) => (
                    <FormItem><FormLabel>Excerpt</FormLabel><FormControl><Textarea placeholder="Short summary..." {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={articleForm.control} name="content" render={({ field }) => (
                    <FormItem><FormLabel>Content</FormLabel><FormControl><Textarea placeholder="Write article paragraphs, one per line..." rows={8} {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <Button type="submit" className="btn-primary w-full"><Save size={16} className="mr-2" /> Publish Article</Button>
                </form>
              </Form>
            </div>

            <div className="bg-card border border-border/30 p-6">
              <h2 className="font-serif text-xl text-foreground uppercase tracking-widest mb-6">Admin Articles ({adminArticles.length})</h2>
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {adminArticles.length === 0 && <p className="text-muted-foreground text-sm">No admin articles yet.</p>}
                {adminArticles.map((article) => (
                  <div key={article.id} className="border border-border/30 p-4 flex justify-between items-start">
                    <div>
                      <p className="font-serif text-foreground">{article.title}</p>
                      <p className="text-xs text-muted-foreground">{article.category} · {article.date}</p>
                    </div>
                    <button onClick={() => removeArticle(article.id)} className="text-destructive hover:text-destructive/80 p-2"><Trash2 size={16} /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
