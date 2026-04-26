import { Link } from 'react-router-dom';
import { BookmarkButton } from './BookmarkButton';
import './PhotoCard.css';

export interface PhotoCardProps {
  spotId: string;
  to: string;
  photoSrc: string;
  title: string;
  caption?: string;
  description: string;
}

/** 그리드용 카드: 327×180 사진 + 제목/위치/2줄 설명 + 북마크 */
export function PhotoCard({
  spotId,
  to,
  photoSrc,
  title,
  caption,
  description,
}: PhotoCardProps) {
  return (
    <article className="photo-card">
      <Link to={to} className="photo-card__media-link">
        <img
          src={photoSrc}
          alt={title}
          loading="lazy"
          className="photo-card__media"
        />
        <span className="photo-card__bookmark">
          <BookmarkButton spotId={spotId} size="sm" />
        </span>
      </Link>
      <Link to={to} className="photo-card__body">
        <h3 className="photo-card__title">{title}</h3>
        {caption && <p className="photo-card__caption">{caption}</p>}
        <p className="photo-card__desc">{description}</p>
      </Link>
    </article>
  );
}
