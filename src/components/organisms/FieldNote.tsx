import { Card } from '../molecules/Card';
import { Avatar } from '../molecules/Avatar';
import './FieldNote.css';

export interface FieldNoteAuthor {
  initials: string;
  name: string;
  role?: string;
}

export interface FieldNoteProps {
  quote: string;
  highlight?: string;
  author: FieldNoteAuthor;
  ctaLabel?: string;
  onCtaClick?: () => void;
}

export function FieldNote({
  quote,
  highlight,
  author,
  ctaLabel,
  onCtaClick,
}: FieldNoteProps) {
  const renderQuote = () => {
    if (!highlight) return quote;
    const parts = quote.split(highlight);
    return (
      <>
        {parts[0]}
        <em>{highlight}</em>
        {parts.slice(1).join(highlight)}
      </>
    );
  };

  return (
    <Card variant="dark" padding="lg">
      <div className="field-note">
        <span className="field-note__label">THE FIELD NOTE</span>
        <blockquote className="field-note__quote">
          “{renderQuote()}”
        </blockquote>

        <div className="field-note__footer">
          <div className="field-note__author">
            <Avatar initials={author.initials} variant="pink" size="md" />
            <div>
              <div className="field-note__name">{author.name}</div>
              {author.role && (
                <div className="field-note__role">{author.role}</div>
              )}
            </div>
          </div>
          {ctaLabel && onCtaClick && (
            <button
              type="button"
              className="field-note__cta"
              onClick={onCtaClick}
              aria-label={ctaLabel}
            >
              {ctaLabel} ↗
            </button>
          )}
        </div>
      </div>
    </Card>
  );
}
