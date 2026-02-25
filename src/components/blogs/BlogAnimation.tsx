import { Player } from '@remotion/player';
import { SecretVaultComposition } from './animations/SecretVaultComposition';
import { NetworkTiersComposition } from './animations/NetworkTiersComposition';
import { ContainerLockComposition } from './animations/ContainerLockComposition';
import { PipelineGateComposition } from './animations/PipelineGateComposition';
import { DataRedactComposition } from './animations/DataRedactComposition';

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const animations: Record<string, React.FC> = {
  secretVault: SecretVaultComposition,
  networkTiers: NetworkTiersComposition,
  containerLock: ContainerLockComposition,
  pipelineGate: PipelineGateComposition,
  dataRedact: DataRedactComposition,
};

interface BlogAnimationProps {
  type: string;
}

export const BlogAnimation = ({ type }: BlogAnimationProps) => {
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
