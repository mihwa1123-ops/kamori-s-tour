import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../organisms/Header';
import { BottomTabBar } from '../organisms/BottomTabBar';
import { BlobMask, type BlobShape } from '../molecules/BlobMask';
import { BookmarkButton } from '../molecules/BookmarkButton';
import { PhotoCard } from '../molecules/PhotoCard';
import {
  ATTRACTIONS,
  THEME_META,
  type Theme,
  type Attraction,
} from '../../data/attractions';
import { spotHeroPhotos, spotCardPhoto, dummyCaption } from '../../data/photos';
import './SpotDetailLayout.css';

export type Lang = 'en' | 'ja' | 'ko' | 'es' | 'zh';

const LABELS: Record<
  Lang,
  {
    home: string;
    walkUnit: string;
    free: string;
    sectionBest3: string;
    sectionOthers: string;
    loadMore: string;
    saveTour: string;
    footer: string;
  }
> = {
  en: { home: 'Home',  walkUnit: 'min walk', free: 'Free', sectionBest3: 'The best 3', sectionOthers: 'Other places to explore', loadMore: 'Show more', saveTour: 'Save to my tour', footer: 'Connect with Local Stories in Daejeon' },
  ja: { home: 'ホーム', walkUnit: '分歩く',   free: '無料', sectionBest3: 'ベスト 3',  sectionOthers: '他のスポット',         loadMore: 'もっと見る', saveTour: 'ツアーに保存', footer: '大田のローカルストーリーとつながる' },
  ko: { home: '홈',     walkUnit: '분 도보',  free: '무료', sectionBest3: '여기는 베스트 3', sectionOthers: '다른 가볼만한 장소', loadMore: '더 보기', saveTour: '투어에 저장', footer: '대전의 로컬 스토리와 연결되다' },
  es: { home: 'Inicio', walkUnit: 'min a pie', free: 'Gratis', sectionBest3: 'Los mejores 3', sectionOthers: 'Otros lugares', loadMore: 'Ver más', saveTour: 'Guardar', footer: 'Conecta con historias locales de Daejeon' },
  zh: { home: '首页',   walkUnit: '分钟步行', free: '免费', sectionBest3: '精选 3 张',  sectionOthers: '其他景点',           loadMore: '查看更多', saveTour: '保存到旅程', footer: '与大田的本地故事相连' },
};

/** 상세 페이지가 받을 수 있는 통일된 spot 데이터 */
export interface DetailSpot {
  id: string;
  name: string;        // 영문/로마자
  nameKo?: string;     // 한글 (있으면)
  description?: string;
  walkTime?: number;   // 분 (큐레이션 데이터만 보유)
  isFree?: boolean;    // true 면 '무료', undefined 면 표시 안 함
  /** 표시용 카테고리/테마 라벨 + 컬러 칩 */
  badge: { label: string; color: string; emoji?: string };
  /** 블롭 마스크 쉐이프 */
  shape: BlobShape;
  /** 영문 카테고리 키 (라우팅·연관 추천에 사용) */
  themeKey?: Theme;
}

const ITEMS_PER_PAGE = 3;

export interface SpotDetailLayoutProps {
  locale?: Lang;
  spot: DetailSpot;
}

export function SpotDetailLayout({ locale = 'en', spot }: SpotDetailLayoutProps) {
  const t = LABELS[locale];

  /** 히어로 캐러셀 사진 3장 */
  const heroPhotos = useMemo(() => spotHeroPhotos(spot.id, 3), [spot.id]);

  /** "다른 장소들" 그리드: 현재 spot 제외, 같은 테마 우선 → 나머지 채움 */
  const otherSpots = useMemo<Attraction[]>(() => {
    const others = ATTRACTIONS.filter((a) => a.id !== spot.id);
    const sameTheme = spot.themeKey
      ? others.filter((a) => a.theme === spot.themeKey)
      : [];
    const rest = others.filter((a) => !sameTheme.includes(a));
    return [...sameTheme, ...rest].slice(0, 12);
  }, [spot.id, spot.themeKey]);

  /** 모바일: 기본 3장 표시 → '더 보기' 시 3장씩 추가 */
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const visibleOthers = otherSpots.slice(0, visibleCount);
  const canLoadMore = visibleCount < otherSpots.length;

  return (
    <div className="spot-detail">
      <Header variant="solid" />

      <main className="spot-detail__main">
        <div className="container">
          <nav className="spot-detail__breadcrumb" aria-label="Breadcrumb">
            <Link to={`/${locale}`} className="spot-detail__breadcrumb-home">
              {t.home}
            </Link>
            <span aria-hidden="true"> / </span>
            <span>{spot.nameKo ?? spot.name}</span>
          </nav>

          {/* ===== Hero ===== */}
          <section className="spot-detail__hero">
            <div className="spot-detail__hero-photos" aria-label={t.sectionBest3}>
              <span className="spot-detail__photos-label">{t.sectionBest3}</span>
              <div className="spot-detail__photos-stack">
                {heroPhotos.map((src, i) => (
                  <figure
                    key={i}
                    className={`spot-detail__photo spot-detail__photo--${i + 1}`}
                  >
                    <img src={src} alt={`${spot.name} ${i + 1}`} loading="eager" />
                    <figcaption>
                      <strong>{spot.nameKo ?? spot.name}</strong>
                      <span>사진 {String(i + 1).padStart(2, '0')}</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>

            <div className="spot-detail__hero-info">
              <div className="spot-detail__hero-blob">
                <BlobMask shape={spot.shape} alt="" />
                <span className="spot-detail__hero-blob-text">
                  {(spot.nameKo ?? spot.name).slice(0, 4)}
                </span>
              </div>

              <div className="spot-detail__meta">
                <span
                  className="spot-detail__chip"
                  style={{ background: spot.badge.color }}
                >
                  {spot.badge.emoji && <span aria-hidden="true">{spot.badge.emoji}</span>}
                  {spot.badge.label.toUpperCase()}
                </span>
                <h1 className="spot-detail__title">{spot.nameKo ?? spot.name}</h1>
                {spot.nameKo && spot.name !== spot.nameKo && (
                  <span className="spot-detail__title-en">{spot.name}</span>
                )}

                {(spot.walkTime !== undefined || spot.isFree !== undefined) && (
                  <div className="spot-detail__quickfacts">
                    {spot.walkTime !== undefined && (
                      <span>🚶 {spot.walkTime} {t.walkUnit}</span>
                    )}
                    {spot.isFree && <span>· {t.free}</span>}
                  </div>
                )}

                {spot.description && (
                  <p className="spot-detail__desc">{spot.description}</p>
                )}

                <div className="spot-detail__actions">
                  <BookmarkButton spotId={spot.id} size="md" stopPropagation={false} />
                  <span className="spot-detail__action-label">{t.saveTour}</span>
                </div>
              </div>
            </div>
          </section>

          {/* ===== Other places grid ===== */}
          <section className="spot-detail__others">
            <h2 className="spot-detail__others-title">{t.sectionOthers}</h2>
            <ul className="spot-detail__others-grid">
              {visibleOthers.map((other) => {
                const meta = THEME_META[other.theme];
                return (
                  <li key={other.id}>
                    <PhotoCard
                      spotId={other.id}
                      to={`/${locale}/spot/${other.id}`}
                      photoSrc={spotCardPhoto(other.id, 1)}
                      title={other.nameKo}
                      caption={`${meta.emoji} ${other.address.replace('대전광역시 중구 ', '')}`}
                      description={other.menu ?? other.description ?? dummyCaption(other.id, other.theme)}
                    />
                  </li>
                );
              })}
            </ul>

            {canLoadMore && (
              <div className="spot-detail__load-more-wrap">
                <button
                  type="button"
                  className="spot-detail__load-more"
                  onClick={() => setVisibleCount((c) => Math.min(c + ITEMS_PER_PAGE, otherSpots.length))}
                >
                  {t.loadMore}
                </button>
              </div>
            )}
          </section>
        </div>
      </main>

      <footer className="home-layout__footer">
        <div className="container">
          <p>© 2026 @hey.kamori | {t.footer}</p>
        </div>
      </footer>

      <BottomTabBar />
    </div>
  );
}
