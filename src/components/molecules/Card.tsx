import type { ReactNode } from 'react';
import './Card.css';

export interface CardProps {
  variant?: 'default' | 'tinted' | 'dark';
  tint?: 'lavender' | 'pink' | 'yellow';
  padding?: 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  children: ReactNode;
}

export function Card({
  variant = 'default',
  tint,
  padding = 'md',
  hoverable = false,
  children,
}: CardProps) {
  const tintClass = variant === 'tinted' && tint ? `card--tint-${tint}` : '';
  const classes = [
    'card',
    `card--${variant}`,
    `card--p-${padding}`,
    tintClass,
    hoverable ? 'card--hoverable' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={classes}>{children}</div>;
}
