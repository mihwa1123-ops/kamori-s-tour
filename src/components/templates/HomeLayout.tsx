import { Header } from '../organisms/Header';
import { SpotCard } from '../organisms/SpotCard';
import { FieldNote } from '../organisms/FieldNote';
import { RouteTimeline, type RouteSpot } from '../organisms/RouteTimeline';
import { BlobMask } from '../molecules/BlobMask';
import { Button } from '../atoms/Button';
import { SPOT_LIST } from '../../data/spots';
import './HomeLayout.css';

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
  },
};

const FIELD_NOTE_CONTENT: Record<
  Lang,
  {
    quote: string;
    highlight: string;
    initials: string;
    name: string;
    role: string;
    cta: string;
  }
> = {
  en: {
    quote:
      'If you miss the 7am light on the railway bricks, you miss half the point.',
    highlight: 'half the point',
    initials: 'M',
    name: 'Min-ji',
    role: 'local guide, 3rd generation',
    cta: 'Read full story',
  },
  ja: {
    quote: '朝7時の鉄道レンガに光が差す瞬間を逃すと、半分は意味がない。',
    highlight: '半分は意味がない',
    initials: 'み',
    name: 'みんじ',
    role: '地元ガイド · 3代目',
    cta: '物語を読む',
  },
  ko: {
    quote: '아침 7시 철도 벽돌에 비치는 빛을 놓치면, 절반은 놓치는 거예요.',
    highlight: '절반은 놓치는 거예요',
    initials: '민',
    name: '민지',
    role: '동네 가이드 · 3대',
    cta: '전체 이야기 읽기',
  },
  es: {
    quote:
      'Si te pierdes la luz de las 7am sobre los ladrillos del ferrocarril, te pierdes la mitad.',
    highlight: 'la mitad',
    initials: 'M',
    name: 'Min-ji',
    role: 'guía local, 3ra generación',
    cta: 'Leer historia',
  },
  zh: {
    quote: '如果错过了早上7点照在铁路砖墙上的光,就错过了一半的意义。',
    highlight: '一半的意义',
    initials: '民',
    name: '民智',
    role: '本地向导 · 第三代',
    cta: '阅读全文',
  },
};

const ROUTE_SPOTS: RouteSpot[] = [
  { id: 'soje', number: 1, name: 'Soje-dong', category: 'heritage' },
  {
    id: 'jungang',
    number: 2,
    name: 'Jungang Market',
    category: 'market',
    walkTimeFromPrev: 5,
  },
  {
    id: 'pungmi',
    number: 3,
    name: 'Pungmi Pavilion',
    category: 'story',
    walkTimeFromPrev: 8,
  },
  {
    id: 'kalguksu',
    number: 4,
    name: 'Kalguksu Alley',
    category: 'food',
    walkTimeFromPrev: 4,
  },
  {
    id: 'eunhaeng',
    number: 5,
    name: 'Eunhaeng Alley',
    category: 'alleys',
    walkTimeFromPrev: 6,
  },
  {
    id: 'bomunsan',
    number: 6,
    name: 'Bomunsan',
    category: 'nature',
    walkTimeFromPrev: 12,
  },
];

export interface HomeLayoutProps {
  locale?: Lang;
  onSpotClick?: (spotId: string) => void;
}

export function HomeLayout({ locale = 'en', onSpotClick }: HomeLayoutProps) {
  const kv = KV_CONTENT[locale];
  const fn = FIELD_NOTE_CONTENT[locale];

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

        {/* ===== Three Alleys ===== */}
        <section className="three-alleys">
          <div className="container">
            <div className="three-alleys__grid">
              {SPOT_LIST.map((spot) => (
                <SpotCard
                  key={spot.id}
                  spot={spot}
                  onClick={
                    onSpotClick ? () => onSpotClick(spot.id) : undefined
                  }
                />
              ))}
            </div>
          </div>
        </section>

        {/* ===== Field Note ===== */}
        <section className="field-note-section">
          <div className="container">
            <FieldNote
              quote={fn.quote}
              highlight={fn.highlight}
              author={{
                initials: fn.initials,
                name: fn.name,
                role: fn.role,
              }}
              ctaLabel={fn.cta}
              onCtaClick={() => {}}
            />
          </div>
        </section>

        {/* ===== Route Preview ===== */}
        <section className="route-preview">
          <div className="container">
            <RouteTimeline spots={ROUTE_SPOTS} variant="horizontal" />
          </div>
        </section>
      </main>

      <footer className="home-layout__footer">
        <div className="container">
          <p>© 2026 kamori&apos;s tour · daejeon/slow</p>
        </div>
      </footer>

      {/* Floating CTA — 모바일 only */}
      <button type="button" className="floating-cta">
        {kv.cta}
      </button>
    </div>
  );
}
