import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { ContactHeroPlayer } from './contact/ContactHeroPlayer';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';

const contactSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50),
  lastName: z.string().min(1, 'Last name is required').max(50),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
});

type ContactFormData = z.infer<typeof contactSchema>;

const inputClass = "w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-foreground placeholder:text-muted-foreground/60";

export const ContactSection = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    const formData = new FormData();
    formData.append("access_key", "9fda30d8-884b-4da0-8b34-b91a330ef478");
    formData.append("First Name", data.firstName);
    formData.append("Last Name", data.lastName);
    formData.append("Email", data.email);
    formData.append("Message", data.message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (result.success) {
        toast.success('Message sent successfully!');
        reset();
      } else {
        toast.error(result.message || 'Failed to send message.');
      }
    } catch {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-12 md:py-20 relative overflow-hidden section-divider-gradient">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Remotion Hero */}
        <div className="mb-8 md:mb-14">
          <ContactHeroPlayer />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <a href="mailto:info@shubhztechwork.com" className="flex items-start gap-4 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground mb-1">Email Us</h3>
                <p className="text-muted-foreground group-hover:text-primary transition-colors">info@shubhztechwork.com</p>
              </div>
            </a>

            <a href="tel:+917977048316" className="flex items-start gap-4 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground mb-1">Call Us</h3>
                <p className="text-muted-foreground group-hover:text-primary transition-colors">+91 7977048316</p>
              </div>
            </a>

            <a href="https://maps.google.com/?q=Mumbai,Maharashtra,India" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground mb-1">Visit Us</h3>
                <p className="text-muted-foreground group-hover:text-primary transition-colors">Mumbai, Maharashtra, India</p>
              </div>
            </a>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-xl p-5 md:p-8"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
              {/* Honeypot for bot protection */}
              <input type="text" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-muted-foreground mb-2">
                    First Name <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    {...register('firstName')}
                    aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                    aria-invalid={!!errors.firstName}
                    className={inputClass}
                    placeholder="John"
                  />
                  {errors.firstName && (
                    <p id="firstName-error" role="alert" className="text-destructive text-sm mt-1">{errors.firstName.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-muted-foreground mb-2">
                    Last Name <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    {...register('lastName')}
                    aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                    aria-invalid={!!errors.lastName}
                    className={inputClass}
                    placeholder="Doe"
                  />
                  {errors.lastName && (
                    <p id="lastName-error" role="alert" className="text-destructive text-sm mt-1">{errors.lastName.message}</p>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">
                  Email <span className="text-destructive">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  {...register('email')}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  aria-invalid={!!errors.email}
                  className={inputClass}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p id="email-error" role="alert" className="text-destructive text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2">
                  Message <span className="text-destructive">*</span>
                </label>
                <textarea
                  id="message"
                  rows={4}
                  {...register('message')}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  aria-invalid={!!errors.message}
                  className={`${inputClass} resize-none`}
                  placeholder="Tell us about your project..."
                />
                {errors.message && (
                  <p id="message-error" role="alert" className="text-destructive text-sm mt-1">{errors.message.message}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-primary text-primary-foreground font-semibold py-4 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                {!isSubmitting && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
