import { motion } from 'framer-motion';
import { User, Code, Palette, PenTool, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import defaultMuhilPhoto from '@assets/muhil_siddhesh.jpg';
import { useAdmin } from '@/context/AdminContext';

const joinSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  role: z.string().min(1, "Please select a role"),
  portfolio: z.string().url("Please provide a valid URL").optional().or(z.literal('')),
  message: z.string().min(10, "Message is too short"),
  sendCopy: z.boolean().default(true),
});

export default function About() {
  const { toast } = useToast();
  const { founderPhoto } = useAdmin();
  const muhilSrc = founderPhoto || defaultMuhilPhoto;
  
  const form = useForm<z.infer<typeof joinSchema>>({
    resolver: zodResolver(joinSchema),
    defaultValues: {
      fullName: '',
      email: '',
      role: '',
      portfolio: '',
      message: '',
      sendCopy: true,
    },
  });

  function onSubmit(values: z.infer<typeof joinSchema>) {
    const subject = `Join the Team Request: ${values.role} - ${values.fullName}`;
    let body = `Name: ${values.fullName}\nEmail: ${values.email}\nRole: ${values.role}\nPortfolio: ${values.portfolio || 'N/A'}\n\nMessage:\n${values.message}`;
    
    // Construct mailto
    const recipients = ['muhilsiddhesh.in@gmail.com'];
    if (values.sendCopy && values.email) {
      recipients.push(values.email); // BCC or CC the user
    }
    
    const mailtoLink = `mailto:${recipients.join(',')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open mail client
    window.location.href = mailtoLink;
    
    toast({
      title: "Request Prepared",
      description: "Opening your default email client to send the request.",
    });
    
    form.reset();
  }

  return (
    <div className="min-h-screen pt-32 pb-24 noise-bg">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-serif text-5xl md:text-7xl text-primary text-glow-gold mb-6 uppercase tracking-widest">
            Warrior Developers
          </h1>
          <p className="text-xl text-muted-foreground font-serif italic max-w-3xl mx-auto">
            "We are building not just a game, but a monument to Tamil civilization."
          </p>
        </motion.div>

        {/* Founder Spotlight */}
        <motion.div 
          className="bg-card border-2 border-primary/50 p-8 md:p-12 mb-24 relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
            <div className="w-48 h-48 md:w-64 md:h-64 shrink-0 bg-background border border-primary overflow-hidden rounded-md relative shadow-[0_0_20px_rgba(212,175,55,0.3)]">
              <img src={muhilSrc} alt="Muhil Siddhesh" className="w-full h-full object-cover hover:scale-105 transition-all duration-700" />
            </div>
            <div>
              <h2 className="font-serif text-4xl text-foreground mb-2 uppercase tracking-widest">Muhil</h2>
              <h3 className="text-primary uppercase tracking-widest font-bold mb-6 text-sm">Visionary Founder & Lead Developer</h3>
              <p className="text-muted-foreground leading-relaxed">
                Muhil founded Warrior Developers with a singular vision: to showcase the rich, untold epic history of the Tamil kingdoms to a global audience. Frustrated by the lack of South Asian representation in AAA gaming, he is building Veera Yugam from the ground up.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {[
            { title: "Historical Accuracy", desc: "Consulting with historians to recreate authentic armor, architecture, and languages." },
            { title: "AAA Quality", desc: "Pushing the boundaries of modern graphics, physics, and seamless world streaming." },
            { title: "Tamil Pride", desc: "Crafting a narrative that honors the legacy of the Moovendar without compromise." }
          ].map((pillar, idx) => (
            <motion.div
              key={idx}
              className="border border-border/30 p-8 bg-card/30 text-center hover:border-primary/50 transition-colors"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <h3 className="font-serif text-2xl text-primary mb-4">{pillar.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="section-divider">
          <div className="section-divider-diamond" />
        </div>

        {/* Join the Team Form */}
        <motion.div 
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-primary uppercase tracking-widest mb-4">Join the Team</h2>
            <p className="text-muted-foreground">
              We are looking for passionate individuals who share our vision. We operate as a distributed team. Apply below to be part of the journey to 2031.
            </p>
          </div>

          <div className="bg-card border border-border/50 p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground uppercase tracking-wider text-xs">Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Raja Chozhan" className="bg-background border-border/50 focus-visible:ring-primary" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground uppercase tracking-wider text-xs">Email</FormLabel>
                        <FormControl>
                          <Input placeholder="raja@tamilakam.com" className="bg-background border-border/50 focus-visible:ring-primary" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground uppercase tracking-wider text-xs">Role Applying For</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-background border-border/50 focus-visible:ring-primary">
                              <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Game Designer">Game Designer</SelectItem>
                            <SelectItem value="3D Artist">3D Artist</SelectItem>
                            <SelectItem value="Programmer">Programmer</SelectItem>
                            <SelectItem value="Sound Designer">Sound Designer</SelectItem>
                            <SelectItem value="Writer">Writer</SelectItem>
                            <SelectItem value="Community Manager">Community Manager</SelectItem>
                            <SelectItem value="Translator">Translator</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="portfolio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground uppercase tracking-wider text-xs">Portfolio URL (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="https://..." className="bg-background border-border/50 focus-visible:ring-primary" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-muted-foreground uppercase tracking-wider text-xs">Message / Why you want to join</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about your passion for the project..." 
                          className="bg-background border-border/50 focus-visible:ring-primary min-h-[120px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sendCopy"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 bg-background/50 border border-border/30">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-medium text-foreground">
                          Send a copy to me
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                <button 
                  type="submit" 
                  className="w-full btn-primary py-4 flex items-center justify-center gap-2"
                >
                  <Send size={18} />
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