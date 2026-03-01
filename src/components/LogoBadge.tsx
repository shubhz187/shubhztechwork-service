import logoImg from '@/assets/logo.svg';

interface LogoBadgeProps {
  animated?: boolean;
  size?: number;
}

export const LogoBadge = ({ size = 52 }: LogoBadgeProps) => {
  const imgSize = size - 16;

  return (
    <div className="relative shrink-0 flex items-center justify-center" style={{ width: size, height: size }}>
      <img
        src={logoImg}
        alt=""
        width={imgSize}
        height={imgSize}
      />
    </div>
  );
};
