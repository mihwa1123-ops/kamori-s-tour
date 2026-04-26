import { Header } from '../organisms/Header';
import { SpotCard } from '../organisms/SpotCard';
import { CourseBuilder } from '../organisms/CourseBuilder';
import { BottomTabBar } from '../organisms/BottomTabBar';
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

export interface HomeLayoutProps {
  locale?: Lang;
  onSpotClick?: (spotId: string) => void;
}

export function HomeLayout({ locale = 'en', onSpotClick }: HomeLayoutProps) {
  const kv = KV_CONTENT[locale];

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
