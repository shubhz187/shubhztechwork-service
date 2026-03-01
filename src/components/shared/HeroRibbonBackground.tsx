import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const BLUE_BRIGHT = '#4488ff';
const BLUE_MID = '#2255cc';
const BLUE_DARK = '#0a1a3a';
const CORAL = '#ff6644';
const TEAL = '#22ccaa';

interface HeroRibbonBackgroundProps {
  idPrefix: string;
}

export const HeroRibbonBackground: React.FC<HeroRibbonBackgroundProps> = ({ idPrefix }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const isMobile = width < 768;

  // Slow flowing cycle — 600 frames = 20s at 30fps
  const cycle = 600;
  const t = (frame % cycle) / cycle;
  const tau = Math.PI * 2;

  // Wave offsets for organic motion
  const w1 = Math.sin(t * tau);
  const w2 = Math.cos(t * tau);
  const w3 = Math.sin((t + 0.33) * tau);
  const w4 = Math.cos((t + 0.25) * tau);

  /* ═══════ Ribbon 1 — Upper-right flowing shape ═══════ */
  const r1 = {
    sx: width * 0.42,  sy: height * (-0.10 + w1 * 0.04),
    c1x: width * 0.80, c1y: height * (0.02 + w2 * 0.06),
    c2x: width * 0.98, c2y: height * (0.28 + w3 * 0.05),
    ex: width * 0.52,  ey: height * (0.52 + w4 * 0.04),
  };
  const r1b = {
    sx: width * 0.48,  sy: height * (-0.14 + w1 * 0.04),
    c1x: width * 0.86, c1y: height * (-0.01 + w2 * 0.06),
    c2x: width * 1.03, c2y: height * (0.26 + w3 * 0.05),
    ex: width * 0.58,  ey: height * (0.50 + w4 * 0.04),
  };

  const r1Edge = `M ${r1.sx} ${r1.sy} C ${r1.c1x} ${r1.c1y}, ${r1.c2x} ${r1.c2y}, ${r1.ex} ${r1.ey}`;
  const r1Edge2 = `M ${r1b.sx} ${r1b.sy} C ${r1b.c1x} ${r1b.c1y}, ${r1b.c2x} ${r1b.c2y}, ${r1b.ex} ${r1b.ey}`;
  const r1Fill = `${r1Edge} L ${r1b.ex} ${r1b.ey} C ${r1b.c2x} ${r1b.c2y}, ${r1b.c1x} ${r1b.c1y}, ${r1b.sx} ${r1b.sy} Z`;

  /* ═══════ Ribbon 2 — Lower-left flowing shape ═══════ */
  const r2 = {
    sx: width * -0.05, sy: height * (0.52 + w3 * 0.05),
    c1x: width * 0.18, c1y: height * (0.68 + w1 * 0.04),
    c2x: width * 0.50, c2y: height * (0.82 + w4 * 0.05),
    ex: width * 0.88,  ey: height * (0.96 + w2 * 0.04),
  };
  const r2b = {
    sx: width * -0.05, sy: height * (0.58 + w3 * 0.05),
    c1x: width * 0.16, c1y: height * (0.74 + w1 * 0.04),
    c2x: width * 0.48, c2y: height * (0.88 + w4 * 0.05),
    ex: width * 0.86,  ey: height * (1.02 + w2 * 0.04),
  };

  const r2Edge = `M ${r2.sx} ${r2.sy} C ${r2.c1x} ${r2.c1y}, ${r2.c2x} ${r2.c2y}, ${r2.ex} ${r2.ey}`;
  const r2Edge2 = `M ${r2b.sx} ${r2b.sy} C ${r2b.c1x} ${r2b.c1y}, ${r2b.c2x} ${r2b.c2y}, ${r2b.ex} ${r2b.ey}`;
  const r2Fill = `${r2Edge} L ${r2b.ex} ${r2b.ey} C ${r2b.c2x} ${r2b.c2y}, ${r2b.c1x} ${r2b.c1y}, ${r2b.sx} ${r2b.sy} Z`;

  /* ═══════ Ribbon 3 — Thin accent through middle ═══════ */
  const r3Edge = `M ${width * 0.25} ${height * (0.22 + w4 * 0.03)} C ${width * 0.52} ${height * (0.38 + w2 * 0.05)}, ${width * 0.78} ${height * (0.52 + w1 * 0.04)}, ${width * 1.08} ${height * (0.42 + w3 * 0.03)}`;

  /* ═══════ Ribbon 4 — Small upper-left accent ═══════ */
  const r4Edge = `M ${width * -0.02} ${height * (0.18 + w2 * 0.03)} C ${width * 0.12} ${height * (0.28 + w4 * 0.04)}, ${width * 0.25} ${height * (0.22 + w1 * 0.03)}, ${width * 0.38} ${height * (0.32 + w3 * 0.04)}`;

  /* ═══════ Glow spot positions ═══════ */
  const spot1X = width * (0.75 + w1 * 0.02);
  const spot1Y = height * (0.15 + w2 * 0.03);
  const spot2X = width * (0.12 + w3 * 0.02);
  const spot2Y = height * (0.65 + w4 * 0.03);
  const spot3X = width * (0.55 + w4 * 0.015);
  const spot3Y = height * (0.42 + w1 * 0.02);

  const glowR = isMobile ? 60 : 100;

  // Prefixed IDs
  const id = (name: string) => `${idPrefix}-${name}`;

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(160deg, #010108 0%, #030315 40%, #060620 100%)',
        overflow: 'hidden',
      }}
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        style={{ position: 'absolute', inset: 0 }}
      >
        <defs>
          {/* ── Ribbon 1 gradients ── */}
          <linearGradient id={id('r1Fill')} x1="0.3" y1="0" x2="0.7" y2="1">
            <stop offset="0%" stopColor={BLUE_DARK} stopOpacity="0.35" />
            <stop offset="50%" stopColor="#050510" stopOpacity="0.6" />
            <stop offset="100%" stopColor={BLUE_DARK} stopOpacity="0.25" />
          </linearGradient>
          <linearGradient id={id('r1Stroke')} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={BLUE_BRIGHT} stopOpacity="0.8" />
            <stop offset="35%" stopColor={BLUE_MID} stopOpacity="0.5" />
            <stop offset="65%" stopColor={CORAL} stopOpacity="0.55" />
            <stop offset="100%" stopColor={BLUE_BRIGHT} stopOpacity="0.25" />
          </linearGradient>
          <linearGradient id={id('r1Inner')} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={BLUE_MID} stopOpacity="0.25" />
            <stop offset="50%" stopColor="#1a2a5a" stopOpacity="0.15" />
            <stop offset="100%" stopColor={BLUE_MID} stopOpacity="0.08" />
          </linearGradient>

          {/* ── Ribbon 2 gradients ── */}
          <linearGradient id={id('r2Fill')} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1a0a2a" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#060610" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#0a1a2a" stopOpacity="0.25" />
          </linearGradient>
          <linearGradient id={id('r2Stroke')} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={BLUE_MID} stopOpacity="0.4" />
            <stop offset="25%" stopColor={CORAL} stopOpacity="0.65" />
            <stop offset="55%" stopColor="#cc3355" stopOpacity="0.35" />
            <stop offset="100%" stopColor={BLUE_BRIGHT} stopOpacity="0.3" />
          </linearGradient>

          {/* ── Accent ribbon gradients ── */}
          <linearGradient id={id('r3Stroke')} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={TEAL} stopOpacity="0.15" />
            <stop offset="50%" stopColor={BLUE_MID} stopOpacity="0.12" />
            <stop offset="100%" stopColor={BLUE_BRIGHT} stopOpacity="0.08" />
          </linearGradient>
          <linearGradient id={id('r4Stroke')} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={BLUE_BRIGHT} stopOpacity="0.12" />
            <stop offset="100%" stopColor={CORAL} stopOpacity="0.08" />
          </linearGradient>

          {/* ── Glow filters ── */}
          <filter id={id('glowStrong')} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id={id('glowSoft')} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id={id('glowWide')} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="28" />
          </filter>
        </defs>

        {/* ══════ Ambient glow spots ══════ */}
        <circle cx={spot1X} cy={spot1Y} r={glowR} fill={BLUE_BRIGHT} opacity="0.045" filter={`url(#${id('glowWide')})`} />
        <circle cx={spot2X} cy={spot2Y} r={glowR * 0.8} fill={CORAL} opacity="0.035" filter={`url(#${id('glowWide')})`} />
        <circle cx={spot3X} cy={spot3Y} r={glowR * 0.6} fill={TEAL} opacity="0.025" filter={`url(#${id('glowWide')})`} />

        {/* ══════ Ribbon 1: Upper-right ══════ */}
        <path d={r1Edge} fill="none" stroke={BLUE_BRIGHT} strokeWidth="22" opacity="0.07" filter={`url(#${id('glowWide')})`} />
        <path d={r1Fill} fill={`url(#${id('r1Fill')})`} />
        <path d={r1Edge} fill="none" stroke={`url(#${id('r1Stroke')})`} strokeWidth="2.5" filter={`url(#${id('glowStrong')})`} />
        <path d={r1Edge2} fill="none" stroke={`url(#${id('r1Inner')})`} strokeWidth="1.5" filter={`url(#${id('glowSoft')})`} />

        {/* ══════ Ribbon 2: Lower-left ══════ */}
        <path d={r2Edge} fill="none" stroke={CORAL} strokeWidth="18" opacity="0.05" filter={`url(#${id('glowWide')})`} />
        <path d={r2Fill} fill={`url(#${id('r2Fill')})`} />
        <path d={r2Edge} fill="none" stroke={`url(#${id('r2Stroke')})`} strokeWidth="2.5" filter={`url(#${id('glowStrong')})`} />
        <path d={r2Edge2} fill="none" stroke={`url(#${id('r1Inner')})`} strokeWidth="1" filter={`url(#${id('glowSoft')})`} />

        {/* ══════ Ribbon 3: Middle accent ══════ */}
        <path d={r3Edge} fill="none" stroke={`url(#${id('r3Stroke')})`} strokeWidth="1" filter={`url(#${id('glowSoft')})`} />

        {/* ══════ Ribbon 4: Upper-left accent ══════ */}
        {!isMobile && (
          <path d={r4Edge} fill="none" stroke={`url(#${id('r4Stroke')})`} strokeWidth="0.8" filter={`url(#${id('glowSoft')})`} />
        )}

        {/* ══════ Faint shield outline (left) ══════ */}
        <g
          transform={`translate(${width * (isMobile ? 0.04 : 0.08) + w2 * width * 0.01}, ${height * (isMobile ? 0.28 : 0.22) + w1 * height * 0.02}) scale(${isMobile ? 17 : 28}) rotate(-12) skewY(5)`}
          opacity={isMobile ? 0.07 : 0.09}
          filter={`url(#${id('glowSoft')})`}
        >
          <path
            d="M5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.8 11.8 0 0 1-2.517 2.453 7 7 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7 7 0 0 1-1.048-.625 11.8 11.8 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 63 63 0 0 1 5.072.56"
            fill="none"
            stroke={CORAL}
            strokeWidth="0.6"
          />
        </g>

        {/* ══════ Faint cloud outline (right) ══════ */}
        <g
          transform={`translate(${width * (isMobile ? 0.55 : 0.68) + w4 * width * 0.01}, ${height * (isMobile ? 0.28 : 0.22) + w3 * height * 0.02}) scale(${isMobile ? 17 : 28}) rotate(8) skewY(-4)`}
          opacity={isMobile ? 0.07 : 0.09}
          filter={`url(#${id('glowSoft')})`}
        >
          <path
            d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383m.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"
            fill="none"
            stroke={CORAL}
            strokeWidth="0.6"
          />
        </g>
      </svg>

      {/* Vignette overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center, transparent 15%, rgba(1,1,8,0.85) 100%)',
        }}
      />
    </AbsoluteFill>
  );
};
