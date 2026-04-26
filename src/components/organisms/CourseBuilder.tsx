import { useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card } from '../molecules/Card';
import { Button } from '../atoms/Button';
import {
  ATTRACTIONS,
  ATTRACTIONS_BY_ID,
  THEME_META,
  JUNGGU_CENTER,
  recommendNearby,
  walkMinutes,
  distanceKm,
  type Attraction,
  type Theme,
} from '../../data/attractions';
import './CourseBuilder.css';

export type Lang = 'en' | 'ja' | 'ko' | 'es' | 'zh';

const LABELS: Record<
  Lang,
  {
    sectionLabel: string;
    title: string;
    desc: string;
    pickHint: string;
    nearbyTitle: string;
    nearbyEmpty: string;
    selectedTitle: string;
    emptySelected: string;
    addToTour: string;
    inTour: string;
    clearOrigin: string;
    save: string;
    saved: string;
    reset: string;
    walkUnit: string;
    stops: string;
  }
> = {
  en: {
    sectionLabel: 'BUILD YOUR TOUR',
    title: 'Pick a starting spot — Kamori finds nearby gems.',
    desc: 'Choose a theme, tap any pin, and we suggest nearby spots from other themes to round out your tour.',
    pickHint: 'Tap a pin to start.',
    nearbyTitle: 'Nearby suggestions',
    nearbyEmpty: 'No spots within walking distance.',
    selectedTitle: 'Your tour',
    emptySelected: 'No stops yet — tap a pin above to begin.',
    addToTour: '+ Add',
    inTour: 'In tour',
    clearOrigin: 'Clear',
    save: 'Save tour',
    saved: 'Saved ✓',
    reset: 'Reset',
    walkUnit: 'min',
    stops: 'stops',
  },
  ja: {
    sectionLabel: 'ツアーをつくる',
    title: '出発地を選ぶと、カモリが近くのスポットを提案します。',
    desc: 'テーマを選び、ピンをタップ。他テーマの近隣スポットを自動で提案します。',
    pickHint: 'ピンをタップして開始',
    nearbyTitle: '近くのおすすめ',
    nearbyEmpty: '徒歩圏に他のスポットがありません。',
    selectedTitle: 'マイツアー',
    emptySelected: 'まだスポットがありません。上のピンをタップして始めましょう。',
    addToTour: '+ 追加',
    inTour: 'ツアー中',
    clearOrigin: 'クリア',
    save: 'ツアー保存',
    saved: '保存済 ✓',
    reset: 'リセット',
    walkUnit: '分',
    stops: 'スポット',
  },
  ko: {
    sectionLabel: '내 투어 만들기',
    title: '출발 스팟을 고르면, 카모리가 주변을 추천해드려요.',
    desc: '테마를 선택하고 핀을 탭하세요. 다른 테마의 주변 스팟을 자동으로 추천해드립니다.',
    pickHint: '핀을 탭해 시작',
    nearbyTitle: '주변 추천',
    nearbyEmpty: '도보 거리 내 다른 스팟이 없어요.',
    selectedTitle: '내 투어',
    emptySelected: '아직 추가된 스팟이 없어요. 위 지도의 핀을 탭하세요.',
    addToTour: '+ 담기',
    inTour: '담김',
    clearOrigin: '해제',
    save: '투어 저장',
    saved: '저장됨 ✓',
    reset: '초기화',
    walkUnit: '분',
    stops: '스팟',
  },
  es: {
    sectionLabel: 'CONSTRUIR TU TOUR',
    title: 'Elige un punto de partida — Kamori sugiere cerca.',
    desc: 'Selecciona un tema, toca un pin y te sugerimos lugares cercanos de otros temas.',
    pickHint: 'Toca un pin para empezar.',
    nearbyTitle: 'Sugerencias cercanas',
    nearbyEmpty: 'Sin lugares dentro de distancia caminable.',
    selectedTitle: 'Tu tour',
    emptySelected: 'Aún sin paradas — toca un pin para empezar.',
    addToTour: '+ Añadir',
    inTour: 'Añadido',
    clearOrigin: 'Quitar',
    save: 'Guardar tour',
    saved: 'Guardado ✓',
    reset: 'Restablecer',
    walkUnit: 'min',
    stops: 'paradas',
  },
  zh: {
    sectionLabel: '构建您的旅程',
    title: '选择起点 — Kamori 推荐附近景点。',
    desc: '选择主题，点按图钉，我们会推荐其他主题的附近景点。',
    pickHint: '点按图钉开始。',
    nearbyTitle: '附近推荐',
    nearbyEmpty: '步行范围内没有其他景点。',
    selectedTitle: '我的旅程',
    emptySelected: '还没有景点。点按上方图钉开始。',
    addToTour: '+ 添加',
    inTour: '已添加',
    clearOrigin: '取消',
    save: '保存旅程',
    saved: '已保存 ✓',
    reset: '重置',
    walkUnit: '分钟',
    stops: '站',
  },
};

const STORAGE_KEY = 'kamori:saved-courses';

export interface SavedCourse {
  id: string;
  spotIds: string[];
  createdAt: number;
}

export function loadSavedCourses(): SavedCourse[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCourse(spotIds: string[]) {
  if (typeof window === 'undefined') return;
  const existing = loadSavedCourses();
  const course: SavedCourse = {
    id: `c-${Date.now()}`,
    spotIds,
    createdAt: Date.now(),
  };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify([course, ...existing]));
}

/** Leaflet divIcon: 테마별 색상 + 번호 핀 (드롭 모양) */
function buildPinIcon(opts: {
  theme: Theme;
  label: string;
  active?: boolean;
  inTour?: boolean;
}): L.DivIcon {
  const { theme, label, active = false, inTour = false } = opts;
  const color = THEME_META[theme].color;
  const cls = [
    'tour-pin',
    active && 'tour-pin--active',
    inTour && 'tour-pin--in-tour',
  ]
    .filter(Boolean)
    .join(' ');
  return L.divIcon({
    className: cls,
    html: `<div class="tour-pin__drop" style="--pin-color:${color}"><span class="tour-pin__label">${label}</span></div>`,
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -36],
  });
}

/** 지도 자동 fit: 표시 중인 스팟이 모두 보이도록 */
function FitBounds({ spots }: { spots: Attraction[] }) {
  const map = useMap();
  useEffect(() => {
    if (spots.length === 0) return;
    if (spots.length === 1) {
      map.setView([spots[0].lat, spots[0].lng], 15);
      return;
    }
    const bounds = L.latLngBounds(spots.map((s) => [s.lat, s.lng]));
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 });
  }, [spots, map]);
  return null;
}

export interface CourseBuilderProps {
  locale?: Lang;
  /** 초기 활성 테마 (기본 food) */
  initialTheme?: Theme;
}

export function CourseBuilder({ locale = 'en', initialTheme = 'food' }: CourseBuilderProps) {
  const t = LABELS[locale];

  const [activeTheme, setActiveTheme] = useState<Theme>(initialTheme);
  const [originId, setOriginId] = useState<string | null>(null);
  const [tourIds, setTourIds] = useState<string[]>([]);
  const [savedFlash, setSavedFlash] = useState(false);

  const themeSpots = useMemo(
    () => ATTRACTIONS.filter((a) => a.theme === activeTheme),
    [activeTheme]
  );

  const origin = originId ? ATTRACTIONS_BY_ID[originId] ?? null : null;

  const nearby = useMemo(
    () => (origin ? recommendNearby(origin, { limit: 5, maxKm: 4 }) : []),
    [origin]
  );

  // 지도에 표시할 스팟: origin 있으면 [origin + nearby], 없으면 활성 테마 전체
  const visibleSpots: Attraction[] = useMemo(
    () => (origin ? [origin, ...nearby] : themeSpots),
    [origin, nearby, themeSpots]
  );

  const tourSpots = useMemo(
    () => tourIds.map((id) => ATTRACTIONS_BY_ID[id]).filter(Boolean) as Attraction[],
    [tourIds]
  );

  const totalWalkMin = useMemo(() => {
    if (tourSpots.length < 2) return 0;
    let sum = 0;
    for (let i = 1; i < tourSpots.length; i++) {
      sum += walkMinutes(distanceKm(tourSpots[i - 1], tourSpots[i]));
    }
    return sum;
  }, [tourSpots]);

  const handleThemeChange = (t: Theme) => {
    setActiveTheme(t);
    setOriginId(null);
  };

  const pickOrigin = (id: string) => {
    setOriginId(id);
    setTourIds((prev) => (prev.includes(id) ? prev : [id, ...prev]));
  };

  const toggleInTour = (id: string) => {
    setTourIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const reset = () => {
    setOriginId(null);
    setTourIds([]);
  };

  const onSave = () => {
    if (tourIds.length === 0) return;
    saveCourse(tourIds);
    setSavedFlash(true);
  };

  useEffect(() => {
    if (!savedFlash) return;
    const timer = setTimeout(() => setSavedFlash(false), 1800);
    return () => clearTimeout(timer);
  }, [savedFlash]);

  return (
    <Card variant="dark" padding="md">
      <div className="course-builder">
        <span className="course-builder__label">{t.sectionLabel}</span>
        <h2 className="course-builder__title">{t.title}</h2>
        <p className="course-builder__desc">{t.desc}</p>

        {/* ===== 1. Theme tabs ===== */}
        <div role="tablist" aria-label="Theme" className="course-builder__tabs">
          {(Object.keys(THEME_META) as Theme[]).map((th) => {
            const meta = THEME_META[th];
            const label =
              locale === 'ko' ? meta.labelKo
              : locale === 'ja' ? meta.labelJa
              : locale === 'es' ? meta.labelEs
              : locale === 'zh' ? meta.labelZh
              : meta.labelEn;
            return (
              <button
                key={th}
                role="tab"
                aria-selected={activeTheme === th}
                className={`course-builder__tab ${activeTheme === th ? 'is-active' : ''}`}
                onClick={() => handleThemeChange(th)}
                style={{ '--tab-color': meta.color } as React.CSSProperties}
              >
                <span className="course-builder__tab-emoji">{meta.emoji}</span>
                <span className="course-builder__tab-label">{label}</span>
              </button>
            );
          })}
        </div>

        {/* ===== 2. Map ===== */}
        <div className="course-builder__map" aria-label="Daejeon Junggu map">
          <MapContainer
            center={[JUNGGU_CENTER.lat, JUNGGU_CENTER.lng]}
            zoom={JUNGGU_CENTER.zoom}
            scrollWheelZoom={false}
            className="course-builder__map-canvas"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <FitBounds spots={visibleSpots} />
            {visibleSpots.map((spot, idx) => {
              const active = spot.id === originId;
              const inTour = tourIds.includes(spot.id);
              const label = origin && idx === 0 ? '★' : String(idx + (origin ? 0 : 1));
              return (
                <Marker
                  key={spot.id}
                  position={[spot.lat, spot.lng]}
                  icon={buildPinIcon({ theme: spot.theme, label, active, inTour })}
                  eventHandlers={{
                    click: () => pickOrigin(spot.id),
                  }}
                >
                  <Tooltip direction="top" offset={[0, -36]} opacity={0.95}>
                    <strong>{spot.nameKo}</strong>
                    {spot.menu && <><br />{spot.menu}</>}
                    {origin && spot.id !== origin.id && (
                      <>
                        <br />🚶 {walkMinutes(distanceKm(origin, spot))} {t.walkUnit}
                      </>
                    )}
                  </Tooltip>
                </Marker>
              );
            })}
          </MapContainer>
          {!origin && <span className="course-builder__map-hint">{t.pickHint}</span>}
        </div>

        {/* ===== 3. Origin / Nearby suggestions ===== */}
        {origin && (
          <div className="course-builder__origin">
            <div className="course-builder__origin-card" style={{ borderColor: THEME_META[origin.theme].color }}>
              <span className="course-builder__origin-badge" style={{ background: THEME_META[origin.theme].color }}>
                ★ {THEME_META[origin.theme].emoji}
              </span>
              <div className="course-builder__origin-info">
                <strong>{origin.nameKo}</strong>
                {origin.menu && <span className="course-builder__origin-menu">{origin.menu}</span>}
                <span className="course-builder__origin-addr">{origin.address}</span>
              </div>
              <button
                type="button"
                className="course-builder__origin-clear"
                onClick={() => setOriginId(null)}
                aria-label={t.clearOrigin}
              >
                ×
              </button>
            </div>

            <span className="course-builder__nearby-title">{t.nearbyTitle}</span>
            {nearby.length === 0 ? (
              <p className="course-builder__empty">{t.nearbyEmpty}</p>
            ) : (
              <ul className="course-builder__nearby-list">
                {nearby.map((spot) => {
                  const inTour = tourIds.includes(spot.id);
                  return (
                    <li key={spot.id} className="course-builder__nearby-item">
                      <span
                        className="course-builder__nearby-emoji"
                        style={{ background: THEME_META[spot.theme].color }}
                      >
                        {THEME_META[spot.theme].emoji}
                      </span>
                      <div className="course-builder__nearby-info">
                        <strong>{spot.nameKo}</strong>
                        <span className="course-builder__nearby-meta">
                          🚶 {spot.walkMin} {t.walkUnit} · {spot.distanceKm.toFixed(1)} km
                        </span>
                      </div>
                      <button
                        type="button"
                        className={`course-builder__nearby-add ${inTour ? 'is-in' : ''}`}
                        onClick={() => toggleInTour(spot.id)}
                      >
                        {inTour ? `✓ ${t.inTour}` : t.addToTour}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}

        {/* ===== 4. Tour stops timeline ===== */}
        <div className="course-builder__selected">
          <span className="course-builder__selected-title">
            {t.selectedTitle}
            {tourSpots.length > 0 && (
              <span className="course-builder__selected-meta">
                · 🚶 {totalWalkMin} {t.walkUnit} · {tourSpots.length} {t.stops}
              </span>
            )}
          </span>

          {tourSpots.length === 0 ? (
            <p className="course-builder__empty">{t.emptySelected}</p>
          ) : (
            <ol className="course-builder__timeline">
              {tourSpots.map((spot, idx) => (
                <li key={spot.id} className="course-builder__timeline-item">
                  {idx > 0 && (
                    <span className="course-builder__connector" aria-hidden="true">
                      🚶 {walkMinutes(distanceKm(tourSpots[idx - 1], spot))} {t.walkUnit}
                    </span>
                  )}
                  <button
                    type="button"
                    className="course-builder__timeline-btn"
                    onClick={() => toggleInTour(spot.id)}
                    aria-label={`Remove ${spot.name}`}
                  >
                    <span
                      className="course-builder__timeline-num"
                      style={{ background: THEME_META[spot.theme].color }}
                    >
                      {idx + 1}
                    </span>
                    <span className="course-builder__timeline-name">{spot.nameKo}</span>
                    {spot.menu && (
                      <span className="course-builder__timeline-menu">{spot.menu}</span>
                    )}
                    <span className="course-builder__timeline-x" aria-hidden="true">
                      ×
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          )}
        </div>

        {/* ===== 5. Actions ===== */}
        <div className="course-builder__actions">
          <Button variant="ghost" size="sm" onClick={reset} disabled={tourIds.length === 0}>
            {t.reset}
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={onSave}
            disabled={tourIds.length === 0}
          >
            {savedFlash ? t.saved : t.save}
          </Button>
        </div>
      </div>
    </Card>
  );
}
