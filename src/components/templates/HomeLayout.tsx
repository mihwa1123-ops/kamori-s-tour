import { Link } from 'react-router-dom';
import { Header } from '../organisms/Header';
import { CourseBuilder } from '../organisms/CourseBuilder';
import { BottomTabBar } from '../organisms/BottomTabBar';
import { BlobMask, type BlobShape } from '../molecules/BlobMask';
import { Button } from '../atoms/Button';
import { ATTRACTIONS, THEME_META, type Theme } from '../../data/attractions';
import './HomeLayout.css';

/** 테마 → BlobMask 쉐이프 매핑 (시각적 어울림 기준) */
const THEME_SHAPE: Record<Theme, BlobShape> = {
  sight:   'market',    // 다중 피크 = 놀이공원·관광지
  history: 'heritage',  // H 기둥 = 전통·역사
  nature:  'nature',    // K 곡선 = 유기적·자연
  food:    'heritage',  // 모임·공동체 (역사와 같은 H, 컬러로 구분)
};

export type Lang = 'en' | 'ja' | 'ko' | 'es' | 'zh';

const KV_CONTENT: Record<
  Lang,
  {
    tag: string;
    titlePre: string;
    titleEm: string;
    titlePost: string;
    description: string;
    cta: string;
    meta: string;
    footerTagline: string;
  }
> = {
  en: {
    tag: 'daejeon old town · walking guide',
    titlePre: 'A city of ',
    titleEm: 'quiet',
    titlePost: ' corners.',
    description:
      "Skip Seoul's skyline. Daejeon's old town is where 120-year-old brick walls meet hand-pulled noodles.",
    cta: 'Begin the walk ↗',
    meta: 'six stops · 4.2 km',
    footerTagline: 'Connect with Local Stories in Daejeon',
  },
  ja: {
    tag: '大田旧市街 · ウォーキングガイド',
    titlePre: '',
    titleEm: '静かな路地',
    titlePost: 'の街、大田へ。',
    description:
      'ソウルのスカイラインはもう見た。大田旧市街は120年の煉瓦壁と手延べ麺が出会う場所。',
    cta: '歩き始める ↗',
    meta: '6スポット · 4.2km',
    footerTagline: '大田のローカルストーリーとつながる',
  },
  ko: {
    tag: '대전 원도심 · 워킹 가이드',
    titlePre: '',
    titleEm: '조용한 골목',
    titlePost: '의 도시.',
    description:
      '서울의 스카이라인은 그만 보세요. 대전 원도심은 120년 된 벽돌과 수타면이 만나는 곳.',
    cta: '걷기 시작 ↗',
    meta: '여섯 스팟 · 4.2km',
    footerTagline: '대전의 로컬 스토리와 연결되다',
  },
  es: {
    tag: 'casco antiguo de daejeon · guía a pie',
    titlePre: 'Una ciudad de ',
    titleEm: 'rincones',
    titlePost: ' callados.',
    description:
      'Olvida el horizonte de Seúl. El casco antiguo de Daejeon es donde paredes de ladrillo de 120 años conocen los fideos hechos a mano.',
    cta: 'Comenzar el paseo ↗',
    meta: 'seis paradas · 4.2 km',
    footerTagline: 'Conecta con historias locales de Daejeon',
  },
  zh: {
    tag: '大田老城 · 漫步指南',
    titlePre: '',
    titleEm: '安静巷子',
    titlePost: '的城市。',
    description:
      '跳过首尔的天际线。大田老城是120年砖墙与手工面相遇的地方。',
    cta: '开始漫步 ↗',
    meta: '六个站点 · 4.2公里',
    footerTagline: '与大田的本地故事相连',
  },
};

/** 테마 섹션 i18n 라벨 */
const PICK_THEME: Record<Lang, { title: string; sub: string; placesUnit: string }> = {
  en: { title: 'Pick a theme',  sub: 'Browse by what catches your eye.', placesUnit: 'places' },
  ja: { title: 'テーマを選ぶ',   sub: '気になるテーマから始めよう。',     placesUnit: '箇所' },
  ko: { title: '테마 고르기',     sub: '관심 가는 테마부터 둘러보세요.',   placesUnit: '곳' },
  es: { title: 'Elige un tema', sub: 'Explora lo que te llame la atención.', placesUnit: 'lugares' },
  zh: { title: '选择主题',       sub: '从感兴趣的主题开始。',             placesUnit: '处' },
};

export interface HomeLayoutProps {
  locale?: Lang;
}

export function HomeLayout({ locale = 'en' }: HomeLayoutProps) {
  const kv = KV_CONTENT[locale];
  const t = PICK_THEME[locale];

  /** 테마별 장소 개수 (카드 메타 표시용) */
  const themeCounts = ATTRACTIONS.reduce<Record<Theme, number>>(
    (acc, a) => ({ ...acc, [a.theme]: (acc[a.theme] ?? 0) + 1 }),
    { sight: 0, history: 0, nature: 0, food: 0 }
  );

  const themeLabel = (th: Theme): string => {
    const m = THEME_META[th];
    return locale === 'ko' ? m.labelKo
         : locale === 'ja' ? m.labelJa
         : locale === 'es' ? m.labelEs
         : locale === 'zh' ? m.labelZh
         : m.labelEn;
  };

  return (
    <div className="home-layout">
      <Header variant="transparent" />

      <main>
        {/* ===== KV — Anti-Grid Hero ===== */}
        <section className="kv">
          <div className="kv__text">
            <span className="kv__tag">{kv.tag}</span>
            <h1 className="kv__title">
              {kv.titlePre}
              <em>{kv.titleEm}</em>
              {kv.titlePost}
            </h1>
            <p className="kv__desc">{kv.description}</p>
            <div className="kv__actions">
              <Button variant="primary" size="lg">
                {kv.cta}
              </Button>
              <span className="kv__meta">{kv.meta}</span>
            </div>
          </div>

          <div className="kv__visual">
            <div className="kv__blob kv__blob--nature">
              <BlobMask
                shape="nature"
                src="https://placehold.co/600x600/FFE663/1A1A2E?text=Bomunsan"
                alt="Bomunsan"
              />
              <span className="kv__blob-label">iv. bomunsan</span>
            </div>
            <div className="kv__blob kv__blob--heritage">
              <BlobMask
                shape="heritage"
                src="https://placehold.co/400x400/A594F9/1A1A2E?text=Soje"
                alt="Soje-dong"
              />
              <span className="kv__blob-label">i. soje-dong</span>
            </div>
          </div>
        </section>

        {/* ===== Pick a theme ===== */}
        <section className="pick-theme">
          <div className="container">
            <header className="pick-theme__header">
              <h2 className="pick-theme__title">{t.title}</h2>
              <p className="pick-theme__sub">{t.sub}</p>
            </header>

            <div className="pick-theme__rail">
              {(Object.keys(THEME_META) as Theme[]).map((th) => {
                const meta = THEME_META[th];
                return (
                  <Link
                    key={th}
                    to={`/${locale}/theme/${th}`}
                    className="theme-card"
                    style={{ '--theme-color': meta.color } as React.CSSProperties}
                  >
                    <div className="theme-card__visual">
                      <BlobMask
                        shape={THEME_SHAPE[th]}
                        alt=""
                        overlay={
                          <span className="theme-card__emoji" aria-hidden="true">
                            {meta.emoji}
                          </span>
                        }
                      />
                    </div>
                    <div className="theme-card__body">
                      <h3 className="theme-card__name">{themeLabel(th)}</h3>
                      <span className="theme-card__count">
                        {themeCounts[th]} {t.placesUnit}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===== Course Builder (구. Field Note) ===== */}
        <section className="field-note-section" id="course-builder">
          <div className="container">
            <CourseBuilder locale={locale} />
          </div>
        </section>

      </main>

      <footer className="home-layout__footer">
        <div className="container">
          <p>© 2026 @hey.kamori | {kv.footerTagline}</p>
        </div>
      </footer>

      {/* 모바일 앱 스타일 하단 탭바 */}
      <BottomTabBar />
    </div>
  );
}
