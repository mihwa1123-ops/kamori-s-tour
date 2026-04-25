import './NumberMarker.css';

export interface NumberMarkerProps {
  number: number | string;
  variant?: 'lavender' | 'pink' | 'yellow' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

export function NumberMarker({
  number,
  variant = 'lavender',
  size = 'md',
}: NumberMarkerProps) {
  return (
    <span className={`num-marker num-marker--${variant} num-marker--${size}`}>
      {number}
    </span>
  );
}
