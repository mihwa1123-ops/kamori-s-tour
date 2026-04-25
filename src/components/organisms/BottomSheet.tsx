import { useState, type ReactNode } from 'react';
import './BottomSheet.css';

export interface BottomSheetProps {
  children: ReactNode;
  defaultHeight?: 'collapsed' | 'expanded';
}

export function BottomSheet({
  children,
  defaultHeight = 'collapsed',
}: BottomSheetProps) {
  const [expanded, setExpanded] = useState(defaultHeight === 'expanded');

  return (
    <div className={`bottom-sheet ${expanded ? 'is-expanded' : ''}`.trim()}>
      <button
        type="button"
        className="bottom-sheet__handle"
        onClick={() => setExpanded((e) => !e)}
        aria-expanded={expanded}
        aria-label={expanded ? '시트 접기' : '시트 펼치기'}
      >
        <span className="bottom-sheet__grip" aria-hidden="true" />
      </button>
      <div className="bottom-sheet__content">{children}</div>
    </div>
  );
}
