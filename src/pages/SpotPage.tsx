import { useParams, Navigate } from 'react-router-dom';
import { SpotDetailLayout } from '../components/templates/SpotDetailLayout';
import { SPOTS, isValidLang } from '../data/spots';

export default function SpotPage() {
  const { lang, id } = useParams();

  if (!isValidLang(lang)) {
    return <Navigate to="/en" replace />;
  }

  const spot = id ? SPOTS[id] : undefined;
  if (!spot) {
    return <Navigate to={`/${lang}`} replace />;
  }

  return (
    <SpotDetailLayout
      locale={lang}
      spot={{
        name: spot.name,
        category: spot.category,
        shape: spot.shape,
        imageSrc: spot.imageSrc,
        imageAlt: spot.imageAlt,
      }}
    />
  );
}
