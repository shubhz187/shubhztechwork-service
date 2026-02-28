import { memo } from 'react';
import { serviceIconMap, ServiceIconType } from './serviceIcons';

interface Props {
  iconType: ServiceIconType;
}

export const ServiceIcon = memo<Props>(({ iconType }) => {
  const { icon, color } = serviceIconMap[iconType];

  return (
    <div className="tech-icon-container">
      <div
        className="tech-icon-bg"
        style={{
          borderColor: `${color}40`,
          background: `${color}18`,
        }}
      >
        <div style={{ color, display: 'flex' }}>{icon}</div>
      </div>
    </div>
  );
});

ServiceIcon.displayName = 'ServiceIcon';
