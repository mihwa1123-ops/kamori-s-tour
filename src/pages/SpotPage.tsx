import { useParams, Navigate } from 'react-router-dom';
import { SpotDetailLayout } from '../components/templates/SpotDetailLayout';
import { SPOTS, SPOT_LIST, isValidLang } from '../data/spots';
import { useSyncHtmlLang } from '../hooks/useSyncHtmlLang';

export default function SpotPage() {
  const { lang, id } = useParams();
  useSyncHtmlLang(lang);

  if (!isValidLang(lang)) {
    return <Navigate to="/en" replace />;
  }

  const spot = id ? SPOTS[id] : undefined;
  if (!spot) {
    return <Navigate to={`/${lang}`} replace />;
  }

  // 이전 / 다음 spot 계산 (SPOT_LIST 순서 기준)
  const idx = SPOT_LIST.findIndex((s) => s.id === spot.id);
  const prev = idx > 0 ? SPOT_LIST[idx - 1] : undefined;
  const next = idx < SPOT_LIST.length - 1 ? SPOT_LIST[idx + 1] : undefined;

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
      prevSpot={prev ? { id: prev.id, name: prev.name } : undefined}
      nextSpot={next ? { id: next.id, name: next.name } : undefined}
    />
  );
}
