import { useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Card } from '../molecules/Card';
import { Button } from '../atoms/Button';
import { Badge, type BadgeCategory } from '../atoms/Badge';
import { NumberMarker } from '../atoms/NumberMarker';
import {
  SPOT_LIST,
  SPOT_COORDS,
  DAEJEON_CENTER,
} from '../../data/spots';
import './CourseBuilder.css';

export type Lang = 'en' | 'ja' | 'ko' | 'es' | 'zh';

const LABELS: Record<
  Lang,
  {
    sectionLabel: string;
    title: string;
    desc: string;
    pickHint: string;
    selectAll: string;
    reset: string;
    save: string;
    saved: string;
    walkUnit: string;
    stops: string;
    selectedTitle: string;
    emptySelected: string;
  }
> = {
  en: {
    sectionLabel: 'BUILD YOUR COURSE',
    title: 'Tap pins on the map to build your route.',
    desc: "You don't know the streets — let the map decide. Pinned tour stops are clickable.",
    pickHint: 'Tap a pin to add or remove from your route.',
    selectAll: 'Select all',
    reset: 'Reset',
    save: 'Save course',
    saved: 'Saved ✓',
    walkUnit: 'min',
    stops: 'stops',
    selectedTitle: 'Your selection',
    emptySelected: 'No spots selected yet — tap a pin above.',
  },
  ja: {
    sectionLabel: 'コースをつくる',
    title: 'マップのピンをタップしてルートを構築',
    desc: '道がわからなくても、マップが教えてくれる。ピン化されたツアースポットがタップ可能。',
    pickHint: 'ピンをタップしてルートに追加/削除',
    selectAll: '全選択',
    reset: 'リセット',
    save: 'コース保存',
    saved: '保存済 ✓',
    walkUnit: '分',
    stops: 'スポット',
    selectedTitle: '選択中',
    emptySelected: 'まだスポットが選択されていません。上のピンをタップしてください。',
  },
  ko: {
    sectionLabel: '내 코스 만들기',
    title: '지도 위 핀을 탭해 루트를 만드세요.',
    desc: '길은 몰라도 괜찮아요 — 지도에 표시된 투어 스팟을 탭하면 코스가 됩니다.',
    pickHint: '핀을 탭해 루트에 추가하거나 빼세요.',
    selectAll: '모두 선택',
    reset: '초기화',
    save: '코스 저장',
    saved: '저장됨 ✓',
    walkUnit: '분',
    stops: '스팟',
    selectedTitle: '내 선택',
    emptySelected: '아직 선택된 스팟이 없어요. 위 지도의 핀을 탭하세요.',
  },
  es: {
    sectionLabel: 'CONSTRUIR TU RUTA',
    title: 'Toca los pines del mapa para construir tu ruta.',
    desc: 'Si no conoces las calles, deja que el mapa decida. Los pines son clicables.',
    pickHint: 'Toca un pin para añadir o quitar de tu ruta.',
    selectAll: 'Seleccionar todos',
    reset: 'Restablecer',
    save: 'Guardar ruta',
    saved: 'Guardado ✓',
    walkUnit: 'min',
    stops: 'paradas',
    selectedTitle: 'Tu selección',
    emptySelected: 'Aún no hay paradas. Toca un pin del mapa.',
  },
  zh: {
    sectionLabel: '构建您的路线',
    title: '点按地图上的图钉构建您的路线。',
    desc: '不熟悉街道也没关系 — 地图上的旅游景点都可以点按。',
    pickHint: '点按图钉添加或移除景点。',
    selectAll: '全选',
    reset: '重置',
    save: '保存路线',
    saved: '已保存 ✓',
    walkUnit: '分钟',
    stops: '站',
    selectedTitle: '您的选择',
    emptySelected: '还没选择景点。点按上面的图钉。',
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

const PIN_COLOR: Record<BadgeCategory, string> = {
  heritage: '#A594F9',
  market: '#FFB3C6',
  food: '#FFE663',
  story: '#D4CBF7',
  alleys: '#FFD6E0',
  nature: '#FFE663',
};

export interface CourseBuilderProps {
  locale?: Lang;
}

export function CourseBuilder({ locale = 'en' }: CourseBuilderProps) {
  const t = LABELS[locale];
  const [selected, setSelected] = useState<string[]>([]);
  const [savedFlash, setSavedFlash] = useState(false);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const selectAll = () => setSelected(SPOT_LIST.map((s) => s.id));
  const reset = () => setSelected([]);
  const onSave = () => {
    if (selected.length === 0) return;
    saveCourse(selected);
    setSavedFlash(true);
  };

  useEffect(() => {
    if (!savedFlash) return;
    const timer = setTimeout(() => setSavedFlash(false), 1800);
    return () => clearTimeout(timer);
  }, [savedFlash]);

  // 선택 순서 유지된 spot 리스트
  const selectedSpots = useMemo(
    () =>
      selected
        .map((id) => SPOT_LIST.find((s) => s.id === id))
        .filter((s): s is NonNullable<typeof s> => !!s),
    [selected]
  );

  // 누적 도보 시간 (선택 순서 기준, 첫 spot 은 0)
  const totalMinutes = selectedSpots.reduce(
    (sum, s, i) => (i === 0 ? sum : sum + s.walkTime),
    0
  );

  return (
    <Card variant="dark" padding="md">
      <div className="course-builder">
        <span className="course-builder__label">{t.sectionLabel}</span>
        <h2 className="course-builder__title">{t.title}</h2>
        <p className="course-builder__desc">{t.desc}</p>

        {/* ===== 1. Real Leaflet Map (OSM tiles, no API key) ===== */}
        <div className="course-builder__map" aria-label="Daejeon old town map">
          <MapContainer
            center={[DAEJEON_CENTER.lat, DAEJEON_CENTER.lng]}
            zoom={DAEJEON_CENTER.zoom}
            scrollWheelZoom={false}
            className="course-builder__map-canvas"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {SPOT_LIST.map((spot) => {
              const coords = SPOT_COORDS[spot.id];
              if (!coords) return null;
              const active = selected.includes(spot.id);
              const fill = PIN_COLOR[spot.category];
              return (
                <CircleMarker
                  key={spot.id}
                  center={[coords.lat, coords.lng]}
                  radius={active ? 16 : 11}
                  pathOptions={{
                    color: active ? '#FFFFFF' : '#1A1A2E',
                    weight: active ? 3 : 1.5,
                    fillColor: fill,
                    fillOpacity: active ? 1 : 0.85,
                  }}
                  eventHandlers={{
                    click: () => toggle(spot.id),
                  }}
                >
                  <Tooltip direction="top" offset={[0, -8]} opacity={0.95}>
                    {spot.name}
                  </Tooltip>
                </CircleMarker>
              );
            })}
          </MapContainer>
          <span className="course-builder__map-hint">{t.pickHint}</span>
        </div>

        {/* ===== 2. Selected route timeline ===== */}
        <div className="course-builder__selected">
          <span className="course-builder__selected-title">
            {t.selectedTitle}
            {selectedSpots.length > 0 && (
              <span className="course-builder__selected-meta">
                · 🚶 {totalMinutes} {t.walkUnit} · {selectedSpots.length} {t.stops}
              </span>
            )}
          </span>

          {selectedSpots.length === 0 ? (
            <p className="course-builder__empty">{t.emptySelected}</p>
          ) : (
            <ol className="course-builder__timeline">
              {selectedSpots.map((spot, idx) => (
                <li key={spot.id} className="course-builder__timeline-item">
                  {idx > 0 && (
                    <span className="course-builder__connector" aria-hidden="true">
                      🚶 {spot.walkTime} {t.walkUnit}
                    </span>
                  )}
                  <button
                    type="button"
                    className="course-builder__timeline-btn"
                    onClick={() => toggle(spot.id)}
                    aria-label={`Remove ${spot.name}`}
                  >
                    <NumberMarker
                      number={String(idx + 1).padStart(2, '0')}
                      variant="lavender"
                      size="sm"
                    />
                    <Badge category={spot.category} size="sm" />
                    <span className="course-builder__timeline-name">{spot.name}</span>
                    <span className="course-builder__timeline-x" aria-hidden="true">
                      ×
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          )}
        </div>

        {/* ===== 3. Actions (단 아래 위치) ===== */}
        <div className="course-builder__actions">
          <Button variant="ghost" size="sm" onClick={selectAll}>
            {t.selectAll}
          </Button>
          <Button variant="ghost" size="sm" onClick={reset}>
            {t.reset}
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={onSave}
            disabled={selected.length === 0}
          >
            {savedFlash ? t.saved : t.save}
          </Button>
        </div>
      </div>
    </Card>
  );
}
