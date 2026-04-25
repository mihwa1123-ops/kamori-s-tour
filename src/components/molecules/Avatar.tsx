import './Avatar.css';

export interface AvatarProps {
  initials?: string;
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'pink' | 'lavender' | 'yellow';
}

export function Avatar({
  initials,
  src,
  alt,
  size = 'md',
  variant = 'pink',
}: AvatarProps) {
  if (src) {
    return (
      <img
        className={`avatar avatar--${size}`}
        src={src}
        alt={alt ?? initials ?? ''}
      />
    );
  }
  return (
    <div
      className={`avatar avatar--initial avatar--${size} avatar--${variant}`}
      role="img"
      aria-label={alt ?? initials ?? ''}
    >
      {initials}
    </div>
  );
}
