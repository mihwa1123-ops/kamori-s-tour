import { useEffect, useState } from 'react';
import { Card } from '../molecules/Card';
import { Button } from '../atoms/Button';
import { Badge, type BadgeCategory } from '../atoms/Badge';
import { SPOT_LIST } from '../../data/spots';
import './CourseBuilder.css';

export type Lang = 'en' | 'ja' | 'ko' | 'es' | 'zh';

const LABELS: Record<Lang, {
  sectionLabel: string;
  title: string;
  desc: string;
  selectAll: string;
  reset: string;
  save: string;
  saved: string;
  pickHint: string;
  walkUnit: string;
  stops: string;
}> = {
  en: {
    sectionLabel: 'BUILD YOUR COURSE',
    title: 'Pick spots, save your route.',
    desc: 'Select the spots you want to visit. Saved courses appear on the Route page.',
    selectAll: 'Select all 3',
    reset: 'Reset',
    save: 'Save course',
    saved: 'Saved ✓',
    pickHint: 'Tap a spot to add or remove.',
    walkUnit: 'min walk',
    stops: 'stops',
  },
  ja: {
    sectionLabel: 'コースをつくる',
    title: 'スポットを選んでルートを保存',
    desc: '行きたいスポットを選択。保存したコースはルートページで確認できます。',
    selectAll: '3スポット全選択',
    reset: 'リセット',
    save: 'コース保存',
    saved: '保存済 ✓',
    pickHint: 'スポットをタップして追加/削除',
    walkUnit: '分歩',
    stops: 'スポット',
  },
  ko: {
    sectionLabel: '내 코스 만들기',
    title: '스팟을 골라 코스를 저장하세요.',
    desc: '가고 싶은 스팟을 선택하세요. 저장한 코스는 루트 페이지에서 볼 수 있어요.',
    selectAll: '3개 모두 선택',
    reset: '초기화',
    save: '코스 저장',
    saved: '저장됨 ✓',
    pickHint: '스팟을 탭해 추가하거나 빼세요.',
    walkUnit: '분 걷기',
    stops: '스팟',
  },
  es: {
    sectionLabel: 'CONSTRUIR TU RUTA',
    title: 'Elige paradas, guarda tu ruta.',
    desc: 'Selecciona las paradas que quieres visitar. Las rutas guardadas aparecen en la página Ruta.',
    selectAll: 'Seleccionar las 3',
    reset: 'Restablecer',
    save: 'Guardar ruta',
    saved: 'Guardado ✓',
    pickHint: 'Toca una parada para añadir o quitar.',
    walkUnit: 'min',
    stops: 'paradas',
  },
  zh: {
    sectionLabel: '构建您的路线',
    title: '选择景点,保存路线。',
    desc: '选择想去的景点。保存的路线会显示在路线页面。',
    selectAll: '全选3个',
    reset: '重置',
    save: '保存路线',
    saved: '已保存 ✓',
    pickHint: '点按景点添加或移除。',
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

export interface CourseBuilderProps {
  locale?: Lang;
}

export function CourseBuilder({ locale = 'en' }: CourseBuilderProps) {
  const t = LABELS[locale];
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [savedFlash, setSavedFlash] = useState(false);

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAll = () => setSelected(new Set(SPOT_LIST.map((s) => s.id)));
  const reset = () => setSelected(new Set());
  const onSave = () => {
    if (selected.size === 0) return;
    saveCourse(Array.from(selected));
    setSavedFlash(true);
  };

  useEffect(() => {
    if (!savedFlash) return;
    const t = setTimeout(() => setSavedFlash(false), 1800);
    return () => clearTimeout(t);
  }, [savedFlash]);

  // 선택된 스팟 사이의 누적 도보 시간 계산 (SPOT_LIST 순서 기준)
  const orderedSelected = SPOT_LIST.filter((s) => selected.has(s.id));
  const totalMinutes = orderedSelected.reduce(
    (sum, s, i) => (i === 0 ? sum : sum + s.walkTime),
    0
  );

  return (
    <Card variant="dark" padding="lg">
      <div className="course-builder">
        <span className="course-builder__label">{t.sectionLabel}</span>
        <h2 className="course-builder__title">{t.title}</h2>
        <p className="course-builder__desc">{t.desc}</p>

        {/* Map placeholder — 추후 Naver Map 통합 */}
        <div className="course-builder__map" aria-label="Map placeholder">
          <div className="course-builder__map-grid">
            {SPOT_LIST.map((s) => {
              const active = selected.has(s.id);
              const colorMap: Record<BadgeCategory, string> = {
                heritage: '#A594F9',
                market: '#FFB3C6',
                food: '#FFE663',
                story: '#D4CBF7',
                alleys: '#FFD6E0',
                nature: '#FFE663',
              };
              return (
                <span
                  key={s.id}
                  className={`course-builder__pin${active ? ' is-active' : ''}`}
                  style={{
                    background: colorMap[s.category],
                  }}
                  aria-hidden="true"
                />
              );
            })}
          </div>
          <span className="course-builder__map-caption">{t.pickHint}</span>
        </div>

        {/* Spot 선택 리스트 */}
        <ul className="course-builder__list">
          {SPOT_LIST.map((spot, i) => {
            const active = selected.has(spot.id);
            return (
              <li key={spot.id}>
                <button
                  type="button"
                  className={`course-builder__spot${active ? ' is-active' : ''}`}
                  onClick={() => toggle(spot.id)}
                  aria-pressed={active}
                >
                  <span className="course-builder__check" aria-hidden="true">
                    {active ? '✓' : ''}
                  </span>
                  <Badge category={spot.category} size="sm" />
                  <span className="course-builder__spot-name">{spot.name}</span>
                  {i > 0 && (
                    <span className="course-builder__spot-walk">
                      🚶 {spot.walkTime} {t.walkUnit}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* 누적 도보 시간 (2개 이상 선택 시만 의미 있음) */}
        {selected.size >= 2 && (
          <div className="course-builder__total">
            🚶 {totalMinutes} {t.walkUnit} · {selected.size} {t.stops}
          </div>
        )}

        {/* 액션 */}
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
            disabled={selected.size === 0}
          >
            {savedFlash ? t.saved : t.save}
          </Button>
        </div>
      </div>
    </Card>
  );
}
