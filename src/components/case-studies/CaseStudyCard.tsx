import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { Link } from "react-router-dom";
import type { CaseStudy } from "@/data/case-studies";
import { RoundArrow } from "@/components/awake/decorative/OrbitStars";

const tints = [
  "bg-violet/20",
  "bg-orange/30",
  "bg-green/20",
  "bg-pink/20",
  "bg-purple/20",
  "bg-yellow/40",
];

interface Props { study: CaseStudy; index: number; }

export const CaseStudyCard = ({ study, index }: Props) => (
  <motion.article
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.8, delay: (index % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
  >
    <Link to={`/case-studies/${study.slug}`} className="portfolio-card group block aspect-[5/4]">
      <div className={`portfolio-img absolute inset-0 ${tints[index % tints.length]}`}>
        <div className="absolute inset-0 flex items-center justify-center p-10">
          <span className="font-serif text-6xl md:text-7xl italic text-foreground/25 text-center leading-[1] line-clamp-3">
            {study.client}
          </span>
        </div>
      </div>

      {study.comingSoon && (
        <div className="absolute top-5 right-5 z-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-foreground text-background text-xs font-medium px-3 py-1.5">
            <Clock className="w-3 h-3" />
            Coming soon
          </span>
        </div>
      )}

      <div className="absolute top-5 left-5 z-10">
        <span className="pill !bg-card !text-foreground">{study.industry}</span>
      </div>

      <div className="absolute bottom-6 left-6 right-6 z-10">
        <h3 className="text-2xl md:text-3xl font-display text-foreground">{study.client}</h3>
        <p className="mt-2 text-foreground/65 line-clamp-2 text-[14px] max-w-md">{study.excerpt}</p>
      </div>
      <div className="round-arrow absolute bottom-6 right-6 z-10 text-foreground">
        <RoundArrow size={56} />
      </div>
    </Link>
  </motion.article>
);
