import { Player } from '@remotion/player';
import { SocraticTutorComposition } from './animations/SocraticTutorComposition';
import { EcosystemLoopComposition } from './animations/EcosystemLoopComposition';
import { ConnectDeployComposition } from './animations/ConnectDeployComposition';
import { ClinicWebsiteComposition } from './animations/ClinicWebsiteComposition';
import { ComingSoonComposition } from './animations/ComingSoonComposition';

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const animations: Record<string, React.FC> = {
  socraticTutor: SocraticTutorComposition,
  ecosystemLoop: EcosystemLoopComposition,
  connectDeploy: ConnectDeployComposition,
  clinicWebsite: ClinicWebsiteComposition,
  comingSoon: ComingSoonComposition,
};

interface CaseStudyAnimationProps {
  type: string;
}

export const CaseStudyAnimation = ({ type }: CaseStudyAnimationProps) => {
  const Composition = animations[type];
  if (!Composition) return null;

  return (
    <div className="my-8 rounded-xl overflow-hidden shadow-elevated border border-border">
      <Player
        component={Composition}
        durationInFrames={150}
        fps={30}
        compositionWidth={800}
        compositionHeight={320}
        style={{ width: '100%', display: 'block' }}
        autoPlay={!prefersReducedMotion}
        loop
        controls={false}
        clickToPlay={false}
      />
    </div>
  );
};
