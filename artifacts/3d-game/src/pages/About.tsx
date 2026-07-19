import { motion, AnimatePresence } from 'framer-motion';
import { User, Code, Palette, PenTool, Send, ChevronLeft, ChevronRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import defaultMuhilPhoto from '@assets/muhil_siddhesh.jpg';
import muhilAlt1 from '@assets/developer_muhil.jpg';
import muhilAlt2 from '@assets/developer_muhil1.jpg';
import { useAdmin } from '@/context/AdminContext';

const joinSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  role: z.string().min(1, 'Please select a role'),
  portfolio: z.string().url('Please provide a valid URL').optional().or(z.literal('')),
  message: z.string().min(10, 'Message is too short'),
  sendCopy: z.boolean().default(true),
});

const founderPhotos = [defaultMuhilPhoto, muhilAlt1, muhilAlt2];

const pillars = [
  { icon: <PenTool size={24} />, title: 'Historical Accuracy', desc: 'Consulting with historians, archaeologists, and Sangam scholars to recreate authentic armour, architecture, and language.' },
  { icon: <Code size={24} />, title: 'AAA Quality', desc: 'Pushing the limits of modern graphics, physics simulation, and seamless open-world streaming technology.' },
  { icon: <Palette size={24} />, title: 'Tamil Pride', desc: 'Crafting a narrative that honours the Moovendar legacy, told in the voices and culture of ancient Tamilakam.' },
];

const openRoles = [
  { role: '3D Environment Artist', desc: 'Build vast open-world environments — forests, coasts, temples, and cities of 900 CE Tamilakam.' },
  { role: 'Gameplay Programmer', desc: 'Implement combat systems, AI, and physics in our custom engine fork.' },
  { role: 'Sound Designer', desc: 'Create immersive soundscapes blending Carnatic instruments with cinematic film scoring.' },
  { role: 'Historical Consultant', desc: 'Advise on authenticity of clothing, weapons, customs, and Tamil literature.' },
  { role: 'Community Manager', desc: 'Grow and nurture our community across social media, Discord, and Reddit.' },
];

export default function About() {
  const { toast } = useToast();
  const { founderPhoto } = useAdmin();
  const [photoIdx, setPhotoIdx] = useState(0);

  // If admin has uploaded a custom photo, use that; otherwise cycle through the built-in photos
  const displayPhoto = founderPhoto || founderPhotos[photoIdx];

  const form = useForm<z.infer<typeof joinSchema>>({
    resolver: zodResolver(joinSchema),
    defaultValues: { fullName: '', email: '', role: '', portfolio: '', message: '', sendCopy: true },
  });

  function onSubmit(values: z.infer<typeof joinSchema>) {
    const subject = `Join the Team Request: ${values.role} - ${values.fullName}`;
    const body = `Name: ${values.fullName}\nEmail: ${values.email}\nRole: ${values.role}\nPortfolio: ${values.portfolio || 'N/A'}\n\nMessage:\n${values.message}`;
    const recipients = ['muhilsiddhesh.in@gmail.com'];
    if (values.sendCopy && values.email) recipients.push(values.email);
    window.location.href = `mailto:${recipients.join(',')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    toast({ title: 'Request Prepared', description: 'Opening your default email client.' });
    form.reset();
  }

  return (
    <div className="min-h-screen pt-32 pb-24 noise-bg">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">

        {/* Header */}
        <motion.div className="text-center mb-24" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-primary uppercase tracking-[0.4em] text-xs font-bold mb-4">Est. 2024 · Tamil Nadu, India</p>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-primary text-glow-gold mb-6 uppercase tracking-widest">
            Warrior Developers
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-serif italic max-w-3xl mx-auto">
            "We are building not just a game, but a monument to Tamil civilisation."
          </p>
        </motion.div>

        {/* Founder Spotlight */}
        <motion.div className="bg-card border-2 border-primary/50 p-8 md:p-12 mb-24 relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-12 items-center">
            {/* Photo with cycle arrows */}
            <div className="shrink-0 relative group">
              <div className="w-48 h-48 md:w-64 md:h-64 bg-background border-2 border-primary overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                <AnimatePresence mode="wait">
                  <motion.img key={displayPhoto} src={displayPhoto} alt="Muhil Siddhesh — Founder"
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} />
                </AnimatePresence>
              </div>
              {/* Photo nav (only when using built-in photos) */}
              {!founderPhoto && founderPhotos.length > 1 && (
                <div className="flex justify-center gap-2 mt-3">
                  {founderPhotos.map((_, i) => (
                    <button key={i} onClick={() => setPhotoIdx(i)}
                      className={`w-2 h-2 rounded-full transition-all min-h-[12px] min-w-[12px] ${i === photoIdx ? 'bg-primary' : 'bg-primary/30'}`} />
                  ))}
                </div>
              )}
            </div>

            <div className="flex-1">
              <p className="text-primary uppercase tracking-[0.4em] text-xs font-bold mb-2">Founder & Lead Developer</p>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-2 uppercase tracking-widest">Muhil Siddhesh S</h2>
              <p className="text-primary/70 uppercase tracking-widest text-sm mb-6 font-medium">Visionary · Developer · Tamil Storyteller</p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Muhil founded Warrior Developers with a singular vision: to showcase the rich, untold epic history of the Tamil kingdoms to a global audience. Frustrated by the complete lack of South Asian representation in AAA gaming, he began building Veera Yugam from scratch — learning 3D modelling, engine programming, and game design simultaneously.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Born and raised in Tamil Nadu, Muhil draws his inspiration from Sangam literature, temple architecture, and the martial traditions of his ancestors. He believes interactive media is the most powerful vehicle for cultural preservation in the modern age.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {['Game Dev', '3D Artist', 'Tamil Nadu', '19 Years Old', 'Self-Taught'].map(tag => (
                  <span key={tag} className="text-xs uppercase tracking-widest border border-primary/30 px-3 py-1 text-primary/80">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {pillars.map((p, idx) => (
            <motion.div key={idx}
              className="border border-border/30 p-8 bg-card/30 text-center hover:border-primary/50 transition-all group"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -4 }}>
              <div className="text-primary mb-4 flex justify-center group-hover:scale-110 transition-transform">{p.icon}</div>
              <h3 className="font-serif text-xl text-primary mb-4">{p.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="section-divider mb-16"><div className="section-divider-diamond" /></div>

        {/* Open Roles */}
        <motion.div className="mb-24" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-center mb-12">
            <p className="text-primary uppercase tracking-[0.4em] text-xs font-bold mb-3">We're Hiring</p>
            <h2 className="font-serif text-3xl md:text-4xl text-primary uppercase tracking-widest mb-4">Open Roles</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Remote · Volunteer / Revenue-Share · Apply via the form below.</p>
          </div>
          <div className="space-y-3">
            {openRoles.map((r, idx) => (
              <motion.div key={idx}
                className="border border-border/30 bg-card/30 p-5 md:p-6 flex flex-col sm:flex-row sm:items-center gap-3 hover:border-primary/40 hover:bg-card/50 transition-all group"
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.07 }}>
                <div className="flex-1">
                  <h4 className="font-serif text-lg text-foreground group-hover:text-primary transition-colors">{r.role}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{r.desc}</p>
                </div>
                <span className="text-xs uppercase tracking-widest text-primary border border-primary/40 px-3 py-1 shrink-0 self-start sm:self-center">Open</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="section-divider mb-16"><div className="section-divider-diamond" /></div>

        {/* Join Form */}
        <motion.div className="max-w-2xl mx-auto" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-primary uppercase tracking-widest mb-4">Apply to Join</h2>
            <p className="text-muted-foreground">We are a distributed, passion-driven team. Fill in the form and we'll get back to you.</p>
          </div>
          <div className="bg-card border border-border/50 p-6 md:p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField control={form.control} name="fullName" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-muted-foreground uppercase tracking-wider text-xs">Full Name</FormLabel>
                      <FormControl><Input placeholder="Raja Chozhan" className="bg-background border-border/50 focus-visible:ring-primary min-h-[44px]" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-muted-foreground uppercase tracking-wider text-xs">Email</FormLabel>
                      <FormControl><Input placeholder="raja@tamilakam.com" type="email" className="bg-background border-border/50 focus-visible:ring-primary min-h-[44px]" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField control={form.control} name="role" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-muted-foreground uppercase tracking-wider text-xs">Role Applying For</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-background border-border/50 focus-visible:ring-primary min-h-[44px]">
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {['3D Environment Artist', 'Gameplay Programmer', 'Sound Designer', 'Historical Consultant', 'Community Manager', 'Game Designer', 'UI/UX Designer', 'Writer / Narrative Designer', 'Translator'].map(r => (
                            <SelectItem key={r} value={r}>{r}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="portfolio" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-muted-foreground uppercase tracking-wider text-xs">Portfolio URL (Optional)</FormLabel>
                      <FormControl><Input placeholder="https://..." className="bg-background border-border/50 focus-visible:ring-primary min-h-[44px]" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="message" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground uppercase tracking-wider text-xs">Why do you want to join?</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Tell us about your passion for the project and what you'd bring to the team..." className="bg-background border-border/50 focus-visible:ring-primary min-h-[120px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="sendCopy" render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 bg-background/50 border border-border/30">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} className="border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground mt-0.5" />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-medium text-foreground">Send a copy to my email</FormLabel>
                    </div>
                  </FormItem>
                )} />
                <button type="submit" className="w-full btn-primary py-4 min-h-[52px] flex items-center justify-center gap-2 text-sm font-serif uppercase tracking-widest">
                  <Send size={16} />
                  <span>Submit Application</span>
                </button>
              </form>
            </Form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
