import type { MouseEvent } from 'react';
import { useBookmarks } from '../../hooks/useBookmarks';
import './BookmarkButton.css';

export interface BookmarkButtonProps {
  spotId: string;
  /** 카드 안에 있을 때 부모 클릭 이벤트 막기 위해 stopPropagation */
  stopPropagation?: boolean;
  size?: 'sm' | 'md';
}

export function BookmarkButton({
  spotId,
  stopPropagation = true,
  size = 'md',
}: BookmarkButtonProps) {
  const { has, toggle } = useBookmarks();
  const saved = has(spotId);

  const onClick = (e: MouseEvent) => {
    if (stopPropagation) {
      e.preventDefault();
      e.stopPropagation();
    }
    toggle(spotId);
  };

  return (
    <button
      type="button"
      className={`bookmark-btn bookmark-btn--${size}${saved ? ' is-saved' : ''}`}
      onClick={onClick}
      aria-label={saved ? 'Remove bookmark' : 'Save spot'}
      aria-pressed={saved}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M6 4a2 2 0 012-2h8a2 2 0 012 2v18l-6-3.5L6 22V4z"
          fill={saved ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
