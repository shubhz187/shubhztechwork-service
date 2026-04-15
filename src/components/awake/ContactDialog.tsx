import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { getLenis } from "./SmoothScroll";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { X, Mail, Phone, MapPin } from "lucide-react";
import { AwakeButton } from "./AwakeButton";
import { MaskRevealText } from "./MaskRevealText";

/* ── Global open/close context ─────────────────────────────────────── */

interface Ctx { open: () => void; close: () => void; isOpen: boolean; }
const ContactDialogContext = createContext<Ctx | null>(null);

export const useContactDialog = () => {
  const ctx = useContext(ContactDialogContext);
  if (!ctx) throw new Error("useContactDialog must be used within ContactDialogProvider");
  return ctx;
};

/* ── Form ───────────────────────────────────────────────────────────── */

const schema = z.object({
  firstName: z.string().min(1, "Required").max(50),
  lastName:  z.string().min(1, "Required").max(50),
  email:     z.string().email("Enter a valid email"),
  message:   z.string().min(10, "At least 10 characters").max(2000),
});
type FormData = z.infer<typeof schema>;

const inputClass =
  "w-full rounded-2xl border border-foreground/15 bg-background px-5 py-3.5 text-foreground placeholder:text-foreground/40 transition-all focus:border-foreground focus:outline-none focus:ring-2 focus:ring-foreground/10";

const ContactForm = ({ onDone }: { onDone: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    const fd = new FormData();
    fd.append("access_key", import.meta.env.VITE_WEB3FORMS_KEY || "9fda30d8-884b-4da0-8b34-b91a330ef478");
    fd.append("First Name", data.firstName);
    fd.append("Last Name", data.lastName);
    fd.append("Email", data.email);
    fd.append("Message", data.message);
    try {
      const r = await fetch("https://api.web3forms.com/submit", { method: "POST", body: fd });
      const result = await r.json();
      if (result.success) {
        toast.success("Message sent, we'll be in touch within one business day.");
        reset();
        onDone();
      } else {
        toast.error("Failed to send. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <input type="text" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="cd-firstName" className="block text-[11px] uppercase tracking-[0.18em] text-foreground/60 mb-2">
            First name
          </label>
          <input id="cd-firstName" type="text" {...register("firstName")} className={inputClass} placeholder="John" />
          {errors.firstName && <p role="alert" className="text-destructive text-xs mt-1">{errors.firstName.message}</p>}
        </div>
        <div>
          <label htmlFor="cd-lastName" className="block text-[11px] uppercase tracking-[0.18em] text-foreground/60 mb-2">
            Last name
          </label>
          <input id="cd-lastName" type="text" {...register("lastName")} className={inputClass} placeholder="Doe" />
          {errors.lastName && <p role="alert" className="text-destructive text-xs mt-1">{errors.lastName.message}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="cd-email" className="block text-[11px] uppercase tracking-[0.18em] text-foreground/60 mb-2">Email</label>
        <input id="cd-email" type="email" {...register("email")} className={inputClass} placeholder="john@example.com" />
        {errors.email && <p role="alert" className="text-destructive text-xs mt-1">{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="cd-message" className="block text-[11px] uppercase tracking-[0.18em] text-foreground/60 mb-2">Message</label>
        <textarea id="cd-message" rows={4} {...register("message")} className={`${inputClass} resize-none`} placeholder="Tell us about your project..." />
        {errors.message && <p role="alert" className="text-destructive text-xs mt-1">{errors.message.message}</p>}
      </div>
      <div className="pt-2">
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
  );
};

/* ── Provider + Dialog UI ──────────────────────────────────────────── */

export const ContactDialogProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  // Pause Lenis smooth scroll while modal is open (Radix locks body scroll,
  // but Lenis has its own RAF loop and would otherwise continue).
  useEffect(() => {
    const lenis = getLenis();
    if (!lenis) return;
    if (isOpen) lenis.stop();
    else lenis.start();
  }, [isOpen]);

  return (
    <ContactDialogContext.Provider value={{ open, close, isOpen }}>
      {children}

      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <AnimatePresence>
          {isOpen && (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="fixed inset-0 z-[60] bg-foreground/40 backdrop-blur-sm"
                />
              </Dialog.Overlay>

              <Dialog.Content asChild>
                <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 overflow-y-auto">
                <motion.div
                  initial={{ opacity: 0, y: 24, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 16, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="relative w-full max-w-[620px] max-h-[calc(100vh-2rem)] overflow-y-auto rounded-[28px] border border-foreground/10 bg-card shadow-2xl focus:outline-none"
                >
                  <div className="flex items-start justify-between gap-4 p-6 md:p-8">
                    <div>
                      <span className="eyebrow">
                        <span className="h-1.5 w-1.5 rounded-full bg-violet" />
                        Contact
                      </span>
                      <Dialog.Title asChild>
                        <h2 className="mt-3 text-[clamp(28px,4vw,40px)] font-display leading-[1.1] tracking-[-0.02em]">
                          <MaskRevealText immediate stagger={50} serifAccents={["hear"]}>
                            {"Love to hear from you."}
                          </MaskRevealText>
                        </h2>
                      </Dialog.Title>
                      <Dialog.Description asChild>
                        <p className="mt-3 text-sm text-foreground/60 max-w-md">
                          Drop a short note about what you're building. We respond within one business day.
                        </p>
                      </Dialog.Description>
                    </div>
                    <Dialog.Close asChild>
                      <button
                        aria-label="Close"
                        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-foreground/15 text-foreground transition-all hover:border-foreground hover:bg-foreground hover:text-background"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </Dialog.Close>
                  </div>

                  <div className="border-t border-foreground/10 p-6 md:p-8">
                    <ContactForm onDone={close} />
                  </div>

                  <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-foreground/10 bg-secondary/60 px-6 py-4 md:px-8 text-xs text-foreground/60">
                    <a href="mailto:info@shubhztechwork.com" className="inline-flex items-center gap-2 hover:text-foreground transition-colors">
                      <Mail className="h-3.5 w-3.5" /> info@shubhztechwork.com
                    </a>
                    <a href="tel:+917977048316" className="inline-flex items-center gap-2 hover:text-foreground transition-colors">
                      <Phone className="h-3.5 w-3.5" /> +91 7977048316
                    </a>
                    <span className="inline-flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5" /> Mumbai, India
                    </span>
                  </div>
                </motion.div>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    </ContactDialogContext.Provider>
  );
};
