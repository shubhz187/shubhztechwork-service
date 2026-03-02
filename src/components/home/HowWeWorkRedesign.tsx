import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Search, Network, Wrench, Rocket, Activity, Repeat } from 'lucide-react';

const steps = [
    {
        num: '01',
        label: 'Discovery',
        desc: 'Deep dive into your business needs, market position, and technical requirements.',
        icon: Search,
    },
    {
        num: '02',
        label: 'Architecture',
        desc: 'Designing scalable, secure, and future-proof system blueprints.',
        icon: Network,
    },
    {
        num: '03',
        label: 'Build',
        desc: 'Agile development with clean code, rigorous testing, and daily updates.',
        icon: Wrench,
    },
    {
        num: '04',
        label: 'Deploy',
        desc: 'Seamless zero-downtime deployment pipelines to production.',
        icon: Rocket,
    },
    {
        num: '05',
        label: 'Monitor',
        desc: '24/7 telemetry, error tracking, and performance analytics.',
        icon: Activity,
    },
    {
        num: '06',
        label: 'Iterate',
        desc: 'Continuous improvement based on real user data and feedback.',
        icon: Repeat,
    },
];

export const HowWeWorkRedesign: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    // Direct scroll-to-animation mapping — no spring lag
    const activeStepFloat = useTransform(scrollYProgress, [0, 1], [0, steps.length - 1]);

    // Timeline bar grows from 0 to 100%
    const progressBarHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

    return (
        <div ref={containerRef} className="relative h-[300vh] bg-[#010108] w-full">
            {/* Pinned Viewport */}
            <div className="sticky top-0 h-screen w-full flex flex-col overflow-hidden">

                {/* Subtle Dot Grid Background */}
                <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(249,95,78,0.05)_1px,transparent_1px)] bg-[size:44px_44px] pointer-events-none" />

                <div className="container mx-auto px-4 sm:px-6 h-full flex flex-col pt-[100px] pb-12 max-w-6xl relative z-10">

                    {/* Section Header */}
                    <div className="z-20 mb-6 md:mb-10 shrink-0">
                        <h3 className="text-sm md:text-base font-semibold tracking-[0.2em] text-[#f95f4e] mb-2 uppercase font-sans">
                            Our Process
                        </h3>
                        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter">
                            How We <span className="text-[#f95f4e]">Work</span>
                        </h2>
                    </div>

                    <div className="flex-1 w-full flex flex-col md:flex-row relative items-center">

                        {/* Timeline Graphic (Left) */}
                        <div className="hidden md:flex flex-col items-center w-24 relative h-full shrink-0">
                            <div className="absolute top-0 bottom-0 w-[1px] bg-white/10" />
                            <motion.div
                                className="absolute top-0 w-[3px] bg-[#22c55e] origin-top"
                                style={{ height: progressBarHeight }}
                            />
                            {/* Static nodes that light up */}
                            <div className="absolute inset-0 flex flex-col justify-between py-[10%]">
                                {steps.map((_, i) => (
                                    <TimelineNode key={i} index={i} activeStepFloat={activeStepFloat} />
                                ))}
                            </div>
                        </div>

                        {/* Central Animated Content (Right) */}
                        <div className="flex-1 relative flex items-center justify-center md:pl-16">
                            {steps.map((step, i) => (
                                <StepContent
                                    key={step.num}
                                    step={step}
                                    index={i}
                                    activeStepFloat={activeStepFloat}
                                />
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

/* ── Auxiliary Components ── */

function TimelineNode({ index, activeStepFloat }: { index: number, activeStepFloat: any }) {
    // Determines if this specific node has been passed yet
    const status = useTransform(activeStepFloat, (v: number) => {
        if (v >= index) return 'done';
        if (v > index - 1 && v < index) return 'incoming';
        return 'pending';
    });

    const borderColor = useTransform(status, (s) =>
        s === 'done' ? '#22c55e' : 'rgba(255,255,255,0.2)'
    );
    const bgColor = useTransform(status, (s) =>
        s === 'done' ? '#22c55e' : 'rgba(1,1,8,1)'
    );
    const boxShadow = useTransform(status, (s) =>
        s === 'done' ? '0 0 15px rgba(34,197,94,0.4)' : 'none'
    );
    const scale = useTransform(activeStepFloat,
        [index - 1, index, index + 1],
        [0.8, 1.2, 0.8]
    );

    const clampedScale = useTransform(scale, (s) => Math.max(0.8, Math.min(1.2, s)));

    return (
        <motion.div
            className="w-4 h-4 rounded-full z-10 border-2"
            style={{
                borderColor,
                backgroundColor: bgColor,
                scale: clampedScale,
                boxShadow,
            }}
        />
    );
}

function StepContent({ step, index, activeStepFloat }: { step: typeof steps[0], index: number, activeStepFloat: any }) {
    const Icon = step.icon;

    // Crossfade timing — outer ±0.7 ensures consecutive steps overlap during transitions
    // Fade-in:  [i-0.7 → i-0.15]   Plateau: [i-0.15 → i+0.15]   Fade-out: [i+0.15 → i+0.7]
    const opacity = useTransform(activeStepFloat,
        [index - 0.7, index - 0.15, index + 0.15, index + 0.7],
        [0, 1, 1, 0]
    );

    const y = useTransform(activeStepFloat,
        [index - 0.7, index - 0.15, index + 0.15, index + 0.7],
        [180, 0, 0, -180]
    );

    const pointerEvents = useTransform(opacity, (o) => o > 0.5 ? 'auto' : 'none');

    // Subtle parallax float for the background number
    const watermarkY = useTransform(activeStepFloat,
        [index - 1, index, index + 1],
        [100, 0, -100]
    );

    return (
        <motion.div
            className="absolute inset-0 flex flex-col justify-center"
            style={{ opacity, y, pointerEvents }}
        >
            {/* Massive Typographic Watermark */}
            <motion.div
                className="absolute left-[-5%] top-1/2 -translate-y-1/2 text-[150px] md:text-[250px] lg:text-[350px] font-bold text-white/[0.03] select-none -z-10 leading-none tracking-tighter"
                style={{ y: watermarkY }}
            >
                {step.num}
            </motion.div>

            {/* Actual Content Box */}
            <div className="relative z-10 flex flex-col md:flex-row items-start gap-6 md:gap-12">
                <div className="w-16 h-16 md:w-24 md:h-24 shrink-0 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center text-[#22c55e] shadow-[0_0_30px_rgba(34,197,94,0.1)]">
                    <Icon className="w-8 h-8 md:w-12 md:h-12" strokeWidth={1.5} />
                </div>

                <div className="flex-1 max-w-xl">
                    <div className="text-[#f95f4e] font-mono text-sm md:text-base mb-2">
                        PHASE {step.num}
                    </div>
                    <h4 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                        {step.label}
                    </h4>
                    <p className="text-base md:text-xl text-white/60 leading-relaxed font-light">
                        {step.desc}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
