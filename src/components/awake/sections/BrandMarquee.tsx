/** Placeholder brand logos, simple monogram blocks for now. */
const brands = ["Auralyx", "Northlane", "Flowbank", "Genome", "Hotto", "Academy", "Voyager", "Mercer"];

export const BrandMarquee = () => (
  <section aria-label="Trusted by" className="py-16 md:py-20">
    <div className="container-lg">
      <p className="text-center text-sm uppercase tracking-[0.22em] text-foreground/50">
        Loved by 100+ teams · big and small · around the world
      </p>
    </div>
    <div className="mt-10 overflow-hidden">
      <div className="flex gap-16 animate-marquee-x-reverse pause-on-hover">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center gap-16 shrink-0">
            {brands.map((b, i) => (
              <div
                key={`${copy}-${i}`}
                className="flex items-center gap-3 whitespace-nowrap text-foreground/40"
              >
                <span className="inline-block h-3 w-3 rotate-45 border border-foreground/30" />
                <span className="font-serif text-3xl italic tracking-tight">{b}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  </section>
);
