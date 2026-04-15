import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { MaskRevealText } from "../MaskRevealText";
import { AwakeButton } from "../AwakeButton";

const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50),
  lastName: z.string().min(1, "Last name is required").max(50),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
});

type ContactFormData = z.infer<typeof contactSchema>;

const inputClass =
  "w-full rounded-2xl border border-foreground/15 bg-card px-5 py-4 text-foreground placeholder:text-foreground/40 transition-all focus:border-foreground focus:outline-none focus:ring-2 focus:ring-foreground/10";

export const ContactSection = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactFormData) => {
    const formData = new FormData();
    formData.append("access_key", import.meta.env.VITE_WEB3FORMS_KEY || "9fda30d8-884b-4da0-8b34-b91a330ef478");
    formData.append("First Name", data.firstName);
    formData.append("Last Name", data.lastName);
    formData.append("Email", data.email);
    formData.append("Message", data.message);
    try {
      const r = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
      const result = await r.json();
      if (result.success) {
        toast.success("Message sent, we'll be in touch within one business day.");
        reset();
      } else {
        toast.error("Failed to send. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <section id="contact" className="scroll-mt-24 py-24 md:py-32 bg-background">
      <div className="container-lg">
        <div className="grid gap-14 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <span className="eyebrow">Contact</span>
            <h2 className="mt-4 text-display-2 font-display leading-[1.02]">
              <MaskRevealText serifAccents={["hear", "you"]}>
                {"Love to hear from you. Get in touch."}
              </MaskRevealText>
            </h2>
            <p className="mt-6 text-foreground/70 max-w-md leading-relaxed">
              Drop a short note about what you're building, we respond within one business day with
              next steps.
            </p>

            <div className="mt-10 space-y-5">
              {[
                { Icon: Mail,   label: "info@shubhztechwork.com", href: "mailto:info@shubhztechwork.com" },
                { Icon: Phone,  label: "+91 7977048316",          href: "tel:+917977048316" },
                { Icon: MapPin, label: "Mumbai, Maharashtra, India", href: "https://maps.google.com/?q=Mumbai,Maharashtra,India" },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 transition-colors"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-foreground/15 text-foreground transition-all group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-foreground/80 group-hover:text-foreground">{label}</span>
                </a>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-7"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="rounded-[32px] border border-foreground/10 bg-card p-6 md:p-10 space-y-5" noValidate>
              <input type="text" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-xs uppercase tracking-[0.18em] text-foreground/60 mb-2">
                    First name
                  </label>
                  <input id="firstName" type="text" {...register("firstName")} className={inputClass} placeholder="John" />
                  {errors.firstName && <p role="alert" className="text-destructive text-sm mt-1">{errors.firstName.message}</p>}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-xs uppercase tracking-[0.18em] text-foreground/60 mb-2">
                    Last name
                  </label>
                  <input id="lastName" type="text" {...register("lastName")} className={inputClass} placeholder="Doe" />
                  {errors.lastName && <p role="alert" className="text-destructive text-sm mt-1">{errors.lastName.message}</p>}
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-xs uppercase tracking-[0.18em] text-foreground/60 mb-2">
                  Email
                </label>
                <input id="email" type="email" {...register("email")} className={inputClass} placeholder="john@example.com" />
                {errors.email && <p role="alert" className="text-destructive text-sm mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label htmlFor="message" className="block text-xs uppercase tracking-[0.18em] text-foreground/60 mb-2">
                  Message
                </label>
                <textarea id="message" rows={5} {...register("message")} className={`${inputClass} resize-none`} placeholder="Tell us about your project..." />
                {errors.message && <p role="alert" className="text-destructive text-sm mt-1">{errors.message.message}</p>}
              </div>
              <div className="flex justify-start pt-2">
                <AwakeButton
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                  className={isSubmitting ? "opacity-60 pointer-events-none" : ""}
                >
                  {isSubmitting ? "Sending…" : "Send message"}
                </AwakeButton>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
