import { CaseStudyCard } from "./CaseStudyCard";
import type { CaseStudy } from "@/data/case-studies";

export const RelatedCaseStudies = ({ studies }: { studies: CaseStudy[] }) => (
  <div>
    <h2 className="text-display-4 font-display">More case studies</h2>
    <div className="mt-10 grid gap-6 md:grid-cols-2">
      {studies.map((s, i) => (
        <CaseStudyCard key={s.slug} study={s} index={i} />
      ))}
    </div>
  </div>
);
