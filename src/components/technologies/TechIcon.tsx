import { memo } from 'react';
import { techIconMap, TechIconType } from './techIcons';

interface Props {
  iconType: TechIconType;
}

export const TechIcon = memo<Props>(({ iconType }) => {
  const entry = techIconMap[iconType];
  const { color } = entry;

  return (
    <div className="tech-icon-container">
      <div
        className="tech-icon-bg"
        style={{
          borderColor: `${color}40`,
          background: `${color}18`,
        }}
      >
        <div style={{ color, display: 'flex' }}>{entry.icon}</div>
      </div>
    </div>
  );
});

TechIcon.displayName = 'TechIcon';
