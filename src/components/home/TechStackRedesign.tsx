import React from 'react';

const ROW_1 = ['React', 'Angular', 'Vue.js', 'Node.js', 'Django', 'Python', 'TypeScript', 'AWS', 'Azure', 'GCP'];
const ROW_2 = ['Docker', 'Kubernetes', 'Terraform', 'Jenkins', 'PostgreSQL', 'MongoDB', 'Redis', 'GraphQL', 'Linux', 'Git'];

const TechPill = ({ tech }: { tech: string }) => (
    <div className="flex items-center justify-center shrink-0 w-[130px] h-[38px] rounded-none border border-white/10 bg-[#010108] text-[13px] font-semibold text-white/50 tracking-[0.3px] uppercase font-sans transition-all duration-300 hover:border-[#22c55e] hover:text-white hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:-translate-y-1 cursor-pointer">
        {tech}
    </div>
);

export const TechStackRedesign: React.FC = () => {
    return (
        <div className="w-full relative bg-[#010108] py-16 overflow-hidden flex flex-col items-center">

            {/* Inline styles for 0-JS overhead pure CSS marquee */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes marquee-left {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
                @keyframes marquee-right {
                    from { transform: translateX(-50%); }
                    to { transform: translateX(0); }
                }
                .animate-marquee-left {
                    animation: marquee-left 30s linear infinite;
                }
                .animate-marquee-right {
                    animation: marquee-right 30s linear infinite;
                }
                .pause-on-hover:hover .animate-marquee-left,
                .pause-on-hover:hover .animate-marquee-right {
                    animation-play-state: paused;
                }
            `}} />

            {/* Subtle Center Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] rounded-full bg-[radial-gradient(ellipse,rgba(249,95,78,0.15),transparent_70%)] opacity-60 pointer-events-none" />

            <div className="text-center mb-12 relative z-10 w-full px-4">
                <h3 className="text-sm md:text-base font-semibold tracking-[0.2em] text-[#f95f4e] mb-2 uppercase font-sans">
                    Our Tech Stack
                </h3>
                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tighter">
                    Technologies We <span className="text-[#f95f4e]">Master</span>
                </h2>
            </div>

            <div className="w-full flex flex-col gap-6 relative z-10 max-w-[100vw] pause-on-hover">

                {/* Visual fade edges so it vanishes smoothly */}
                <div className="absolute top-0 bottom-0 left-0 w-8 md:w-32 bg-gradient-to-r from-[#010108] to-transparent z-20 pointer-events-none" />
                <div className="absolute top-0 bottom-0 right-0 w-8 md:w-32 bg-gradient-to-l from-[#010108] to-transparent z-20 pointer-events-none" />

                {/* Row 1 - Left scrolling */}
                <div className="flex w-max animate-marquee-left gap-4">
                    {/* We duplicate the array 4 times to ensure it fills any ultrawide screen + creates perfect loop */}
                    {[...ROW_1, ...ROW_1, ...ROW_1, ...ROW_1].map((tech, idx) => (
                        <TechPill key={`r1-${tech}-${idx}`} tech={tech} />
                    ))}
                </div>

                {/* Row 2 - Right scrolling */}
                <div className="flex w-max animate-marquee-right gap-4">
                    {[...ROW_2, ...ROW_2, ...ROW_2, ...ROW_2].map((tech, idx) => (
                        <TechPill key={`r2-${tech}-${idx}`} tech={tech} />
                    ))}
                </div>
            </div>
        </div>
    );
};
