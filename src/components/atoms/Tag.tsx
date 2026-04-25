import type { ReactNode } from 'react';
import './Tag.css';

export type TagVariant =
  | 'heritage'
  | 'market'
  | 'food'
  | 'story'
  | 'alleys'
  | 'nature'
  | 'meta'
  | 'accent';

export interface TagProps {
  variant: TagVariant;
  size?: 'sm' | 'md';
  icon?: ReactNode;
  children: ReactNode;
}

export function Tag({ variant, size = 'md', icon, children }: TagProps) {
  return (
    <span className={`tag tag--${variant} tag--${size}`}>
      {icon && <span className="tag__icon">{icon}</span>}
      {children}
    </span>
  );
}
