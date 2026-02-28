interface GlowBlob {
  color: string;
  opacity: number;
  size: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  delay?: string;
}

interface SectionGlowProps {
  blobs: GlowBlob[];
}

export const SectionGlow = ({ blobs }: SectionGlowProps) => (
  <>
    {blobs.map((blob, i) => (
      <div
        key={i}
        className="absolute rounded-full pointer-events-none animate-section-glow"
        style={{
          width: blob.size,
          height: blob.size,
          top: blob.top,
          bottom: blob.bottom,
          left: blob.left,
          right: blob.right,
          background: `radial-gradient(circle, ${blob.color}, transparent 70%)`,
          opacity: blob.opacity,
          animationDelay: blob.delay ?? '0s',
        }}
      />
    ))}
  </>
);
