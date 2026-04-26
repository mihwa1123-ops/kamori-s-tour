import { useParams, Navigate } from 'react-router-dom';
import {
  SpotDetailLayout,
  type DetailSpot,
} from '../components/templates/SpotDetailLayout';
import { SPOTS, isValidLang } from '../data/spots';
import {
  ATTRACTIONS_BY_ID,
  THEME_META,
  type Theme,
} from '../data/attractions';
import { useSyncHtmlLang } from '../hooks/useSyncHtmlLang';

/** 큐레이션 spot id 일 때만 isFree=true 가정 (대전 원도심 무료 코스) */
const FREE_BY_DEFAULT = true;

/** 어트랙션 테마 → BlobMask shape 매핑 (홈 테마 카드와 일관성 유지) */
const THEME_SHAPE: Record<Theme, 'heritage' | 'market' | 'nature'> = {
  sight: 'market',
  history: 'heritage',
  nature: 'nature',
  food: 'heritage',
};

export default function SpotPage() {
  const { lang, id } = useParams();
  useSyncHtmlLang(lang);

  if (!isValidLang(lang)) {
    return <Navigate to="/en" replace />;
  }
  if (!id) {
    return <Navigate to={`/${lang}`} replace />;
  }

  /** 1) 큐레이션 SPOTS 우선 조회 */
  const curated = SPOTS[id];
  if (curated) {
    const detail: DetailSpot = {
      id: curated.id,
      name: curated.name,
      description: curated.description,
      walkTime: curated.walkTime,
      isFree: FREE_BY_DEFAULT,
      badge: { label: curated.category, color: getBadgeColor(curated.category) },
      shape: curated.shape,
    };
    return <SpotDetailLayout locale={lang} spot={detail} />;
  }

  /** 2) ATTRACTIONS 폴백 조회 (정부 데이터 26개) */
  const attr = ATTRACTIONS_BY_ID[id];
  if (attr) {
    const meta = THEME_META[attr.theme];
    const detail: DetailSpot = {
      id: attr.id,
      name: attr.name,
      nameKo: attr.nameKo,
      description: attr.menu
        ? `${attr.description}\n\n대표 메뉴: ${attr.menu}`
        : attr.description,
      isFree: FREE_BY_DEFAULT,
      themeKey: attr.theme,
      badge: {
        label:
          lang === 'ko' ? meta.labelKo
          : lang === 'ja' ? meta.labelJa
          : lang === 'es' ? meta.labelEs
          : lang === 'zh' ? meta.labelZh
          : meta.labelEn,
        color: meta.color,
        emoji: meta.emoji,
      },
      shape: THEME_SHAPE[attr.theme],
    };
    return <SpotDetailLayout locale={lang} spot={detail} />;
  }

  return <Navigate to={`/${lang}`} replace />;
}

/** 큐레이션 카테고리 → 헥스 컬러 (브랜드 토큰 매핑) */
function getBadgeColor(category: string): string {
  switch (category) {
    case 'heritage': return '#A594F9';
    case 'market':   return '#FFB3C6';
    case 'food':     return '#FFE663';
    case 'story':    return '#D4CBF7';
    case 'alleys':   return '#FFD6E0';
    case 'nature':   return '#FFE663';
    default:         return '#A594F9';
  }
}
