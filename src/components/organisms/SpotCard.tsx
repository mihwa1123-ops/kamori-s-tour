import type { KeyboardEvent } from 'react';
import { BlobMask, type BlobShape } from '../molecules/BlobMask';
import { Badge, type BadgeCategory } from '../atoms/Badge';
import './SpotCard.css';

export interface Spot {
  id: string;
  category: BadgeCategory;
  shape: BlobShape;
  name: string;
  description: string;
  walkTime: number;
  imageSrc: string;
  imageAlt: string;
}

export interface SpotCardProps {
  spot: Spot;
  variant?: 'default' | 'compact';
  onClick?: () => void;
}

export function SpotCard({
  spot,
  variant = 'default',
  onClick,
}: SpotCardProps) {
  const isInteractive = !!onClick;

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isInteractive) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <article
      className={`spot-card spot-card--${variant}`}
      onClick={onClick}
      onKeyDown={isInteractive ? handleKeyDown : undefined}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
    >
      <div className="spot-card__visual">
        <BlobMask
          shape={spot.shape}
          src={spot.imageSrc}
          alt={spot.imageAlt}
        />
      </div>

      <div className="spot-card__body">
        <div className="spot-card__meta">
          <Badge category={spot.category} size="sm" />
          <span className="spot-card__category">{spot.category}</span>
          <span className="spot-card__separator" aria-hidden="true">
            ·
          </span>
          <span className="spot-card__time">🚶 {spot.walkTime} min</span>
        </div>

        <h3 className="spot-card__title">{spot.name}</h3>
        <p className="spot-card__desc">{spot.description}</p>
      </div>
    </article>
  );
}
