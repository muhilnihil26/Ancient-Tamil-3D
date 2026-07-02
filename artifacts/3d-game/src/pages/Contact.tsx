import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Mail, MapPin } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    
    toast({
      title: "Message Sent Successfully",
      description: "Your message has been sent to the Warrior Developers!",
      className: "border-primary bg-card text-primary font-serif text-lg box-glow-gold",
    });
    
    form.reset();
  };

  return (
    <div className="min-h-screen pt-32 pb-24 noise-bg">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-serif text-4xl md:text-6xl text-primary text-glow-gold mb-4 uppercase tracking-widest">
            Send a Raven
          </h1>
          <p className="text-muted-foreground">Reach out to the Warrior Developers for inquiries, support, or alliances.</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Form */}
          <motion.div 
            className="flex-1 bg-card border border-primary/30 p-8 shadow-2xl"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground uppercase tracking-widest text-xs">Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="E.g. Raja Raja Cholan" {...field} className="bg-background border-border/50 focus-visible:ring-primary focus-visible:border-primary rounded-none" />
                      </FormControl>
                      <FormMessage className="text-destructive" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground uppercase tracking-widest text-xs">Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="your@email.com" {...field} className="bg-background border-border/50 focus-visible:ring-primary focus-visible:border-primary rounded-none" />
                      </FormControl>
                      <FormMessage className="text-destructive" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground uppercase tracking-widest text-xs">Subject</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-background border-border/50 focus:ring-primary rounded-none">
                            <SelectValue placeholder="Select a reason..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-card border-primary/50">
                          <SelectItem value="bug">Bug Report / Support</SelectItem>
                          <SelectItem value="partnership">Partnership / Investment</SelectItem>
                          <SelectItem value="press">Press / Media</SelectItem>
                          <SelectItem value="general">General Inquiry</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-destructive" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground uppercase tracking-widest text-xs">Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Speak your mind..." className="min-h-[150px] bg-background border-border/50 focus-visible:ring-primary rounded-none" {...field} />
                      </FormControl>
                      <FormMessage className="text-destructive" />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-serif text-lg tracking-widest uppercase rounded-none h-14"
                >
                  {isSubmitting ? "Sending..." : "Dispatch Message"}
                </Button>
              </form>
            </Form>
          </motion.div>

          {/* Info Side */}
          <motion.div 
            className="w-full lg:w-1/3 flex flex-col gap-8"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-card border border-border/20 p-8 flex flex-col gap-6">
              <div className="flex items-start gap-4 text-muted-foreground">
                <Mail className="text-primary shrink-0" size={24} />
                <div>
                  <h4 className="font-serif text-foreground uppercase tracking-widest mb-1">Direct Line</h4>
                  <a href="mailto:muhilsiddhesh.in@gmail.com" className="hover:text-primary transition-colors">muhilsiddhesh.in@gmail.com</a>
                </div>
              </div>

              <div className="flex items-start gap-4 text-muted-foreground">
                <MapPin className="text-primary shrink-0" size={24} />
                <div>
                  <h4 className="font-serif text-foreground uppercase tracking-widest mb-1">Headquarters</h4>
                  <p>Chennai, Tamil Nadu, India 🏛️</p>
                </div>
              </div>
            </div>

            {/* Stylized Map Card Placeholder */}
            <div className="flex-1 bg-background border border-primary/20 relative overflow-hidden min-h-[200px] flex items-center justify-center p-6 text-center group cursor-default">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMSIgZmlsbD0icmdiYSgyMTIsMTc1LDU1LDAuMykiLz48L3N2Zz4=')] opacity-20" />
              <div className="relative z-10 text-primary border border-primary/50 bg-background/80 p-4 font-serif uppercase tracking-widest group-hover:scale-105 transition-transform duration-500 box-glow-gold">
                View Studio Map
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
