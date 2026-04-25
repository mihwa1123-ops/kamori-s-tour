import './Badge.css';

export type BadgeCategory =
  | 'heritage'
  | 'market'
  | 'food'
  | 'story'
  | 'alleys'
  | 'nature';

export interface BadgeProps {
  category: BadgeCategory;
  size?: 'sm' | 'md' | 'lg';
}

export function Badge({ category, size = 'md' }: BadgeProps) {
  return (
    <span
      className={`badge badge--${category} badge--${size}`}
      aria-hidden="true"
    />
  );
}
