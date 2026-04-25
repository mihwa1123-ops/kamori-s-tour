import type { ReactNode } from 'react';
import './IconButton.css';

export interface IconButtonProps {
  icon: ReactNode;
  label: string;
  variant?: 'default' | 'subtle';
  size?: 'sm' | 'md';
  onClick?: () => void;
  disabled?: boolean;
}

export function IconButton({
  icon,
  label,
  variant = 'default',
  size = 'md',
  onClick,
  disabled = false,
}: IconButtonProps) {
  return (
    <button
      type="button"
      className={`icon-btn icon-btn--${variant} icon-btn--${size}`}
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
    </button>
  );
}
