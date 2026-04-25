import { NumberMarker } from '../atoms/NumberMarker';
import { Badge, type BadgeCategory } from '../atoms/Badge';
import './RouteTimeline.css';

export interface RouteSpot {
  id: string;
  number: number;
  name: string;
  category: BadgeCategory;
  walkTimeFromPrev?: number;
  isCurrent?: boolean;
}

export interface RouteTimelineProps {
  spots: RouteSpot[];
  variant?: 'horizontal' | 'vertical';
  onSpotClick?: (id: string) => void;
}

export function RouteTimeline({
  spots,
  variant = 'horizontal',
  onSpotClick,
}: RouteTimelineProps) {
  return (
    <ol className={`route-timeline route-timeline--${variant}`}>
      {spots.map((spot, idx) => (
        <li
          key={spot.id}
          className={`route-timeline__item ${
            spot.isCurrent ? 'is-current' : ''
          }`.trim()}
        >
          {idx > 0 && spot.walkTimeFromPrev !== undefined && (
            <span
              className="route-timeline__connector"
              aria-hidden="true"
            >
              🚶 {spot.walkTimeFromPrev} min
            </span>
          )}
          <button
            type="button"
            className="route-timeline__spot"
            onClick={() => onSpotClick?.(spot.id)}
            aria-current={spot.isCurrent ? 'step' : undefined}
          >
            <NumberMarker
              number={String(spot.number).padStart(2, '0')}
              variant={spot.isCurrent ? 'lavender' : 'dark'}
            />
            <div className="route-timeline__info">
              <Badge category={spot.category} size="sm" />
              <span className="route-timeline__name">{spot.name}</span>
            </div>
          </button>
        </li>
      ))}
    </ol>
  );
}
