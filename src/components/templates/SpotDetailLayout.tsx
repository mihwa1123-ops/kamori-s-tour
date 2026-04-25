import { Link } from 'react-router-dom';
import { Header } from '../organisms/Header';
import { BlobMask, type BlobShape } from '../molecules/BlobMask';
import { Tag, type TagVariant } from '../atoms/Tag';
import { Button } from '../atoms/Button';
import { InfoRow } from '../molecules/InfoRow';
import { type BadgeCategory } from '../atoms/Badge';
import './SpotDetailLayout.css';

export type Lang = 'en' | 'ja' | 'ko' | 'es' | 'zh';

interface DetailContent {
  homeLabel: string;
  meta: string;
  tagline: string;
  body: string[];
  galleryCaption: string;
  infoLabels: {
    address: string;
    hours: string;
    fee: string;
    walk: string;
  };
  infoValues: {
    address: string;
    hours: string;
    fee: string;
    walk: string;
  };
  ctaPrimary: string;
  ctaSecondary: string;
  prevSpot: string;
  nextSpot: string;
  footerTagline: string;
}

const DETAIL_CONTENT: Record<Lang, DetailContent> = {
  en: {
    homeLabel: 'Home',
    meta: '🚶 5 min · FREE',
    tagline: 'Railway village, now cafés.',
    body: [
      "In 1905, this neighborhood housed the families of Korea's first railway workers. The brick walls still carry the stamps of that era.",
      'Today, the same alleys hide third-wave coffee shops, second-hand bookstores, and a noodle stand that opened in 1967 and never closed.',
    ],
    galleryCaption: 'Three views of Soje-dong',
    infoLabels: {
      address: 'Address',
      hours: 'Hours',
      fee: 'Fee',
      walk: 'Walk time',
    },
    infoValues: {
      address: '대전 동구 대동',
      hours: 'Always open',
      fee: 'FREE',
      walk: '5 min from Daejeon Station',
    },
    ctaPrimary: 'Get directions',
    ctaSecondary: 'Share',
    prevSpot: '← Daejeon Station',
    nextSpot: 'Jungang Market →',
    footerTagline: 'Connect with Local Stories in Daejeon',
  },
  ja: {
    homeLabel: 'ホーム',
    meta: '🚶 5分 · 無料',
    tagline: '鉄道村から路地カフェへ。',
    body: [
      '1905年、ここは韓国初の鉄道労働者家族の住む街でした。煉瓦の壁には、その時代の刻印が今も残っています。',
      '今は同じ路地に、サードウェーブのコーヒーショップ、古本屋、そして1967年に開店して一度も閉まらなかった麺屋台が隠れています。',
    ],
    galleryCaption: '素堤洞の三つの風景',
    infoLabels: {
      address: '住所',
      hours: '営業時間',
      fee: '料金',
      walk: '徒歩時間',
    },
    infoValues: {
      address: '大田 東区 大洞',
      hours: '24時間',
      fee: '無料',
      walk: '大田駅から5分',
    },
    ctaPrimary: '道案内',
    ctaSecondary: '共有',
    prevSpot: '← 大田駅',
    nextSpot: '中央市場 →',
    footerTagline: '大田のローカルストーリーとつながる',
  },
  ko: {
    homeLabel: '홈',
    meta: '🚶 5분 · 무료',
    tagline: '철도 마을에서 골목 카페로.',
    body: [
      '1905년, 이 동네는 한국 최초의 철도 노동자 가족들의 집이었어요. 벽돌담에는 아직 그 시대의 흔적이 남아 있어요.',
      '지금은 같은 골목에 서드웨이브 커피숍, 헌책방, 그리고 1967년에 열어 한 번도 닫지 않은 칼국숫집이 숨어 있어요.',
    ],
    galleryCaption: '소제동의 세 풍경',
    infoLabels: { address: '주소', hours: '운영 시간', fee: '요금', walk: '도보 시간' },
    infoValues: {
      address: '대전 동구 대동',
      hours: '24시간',
      fee: '무료',
      walk: '대전역에서 5분',
    },
    ctaPrimary: '길찾기',
    ctaSecondary: '공유',
    prevSpot: '← 대전역',
    nextSpot: '중앙시장 →',
    footerTagline: '대전의 로컬 스토리와 연결되다',
  },
  es: {
    homeLabel: 'Inicio',
    meta: '🚶 5 min · GRATIS',
    tagline: 'Pueblo ferroviario, ahora cafés.',
    body: [
      'En 1905, este barrio albergaba a las familias de los primeros trabajadores ferroviarios de Corea. Los muros de ladrillo aún llevan los sellos de esa época.',
      'Hoy, los mismos callejones esconden cafeterías de tercera ola, librerías de segunda mano y un puesto de fideos que abrió en 1967 y nunca cerró.',
    ],
    galleryCaption: 'Tres vistas de Soje-dong',
    infoLabels: {
      address: 'Dirección',
      hours: 'Horario',
      fee: 'Costo',
      walk: 'Tiempo a pie',
    },
    infoValues: {
      address: '대전 동구 대동',
      hours: 'Siempre abierto',
      fee: 'GRATIS',
      walk: '5 min desde la estación de Daejeon',
    },
    ctaPrimary: 'Cómo llegar',
    ctaSecondary: 'Compartir',
    prevSpot: '← Estación Daejeon',
    nextSpot: 'Mercado Jungang →',
    footerTagline: 'Conecta con historias locales de Daejeon',
  },
  zh: {
    homeLabel: '首页',
    meta: '🚶 5 分钟 · 免费',
    tagline: '从铁路村到巷子咖啡馆。',
    body: [
      '1905年,这片街区是韩国最早的铁路工人家庭的住处。砖墙上仍留有那个时代的印记。',
      '如今,同样的巷子里藏着第三波咖啡馆、二手书店,和一家1967年开业、从未关门的面摊。',
    ],
    galleryCaption: '素堤洞的三种风景',
    infoLabels: { address: '地址', hours: '营业时间', fee: '费用', walk: '步行时间' },
    infoValues: {
      address: '大田 东区 大洞',
      hours: '24小时',
      fee: '免费',
      walk: '大田站步行5分钟',
    },
    ctaPrimary: '路线指引',
    ctaSecondary: '分享',
    prevSpot: '← 大田站',
    nextSpot: '中央市场 →',
    footerTagline: '与大田的本地故事相连',
  },
};

export interface SpotDetailData {
  name: string;
  category: BadgeCategory;
  shape: BlobShape;
  imageSrc: string;
  imageAlt: string;
}

export interface SpotNavLink {
  id: string;
  name: string;
}

export interface SpotDetailLayoutProps {
  locale?: Lang;
  spot?: SpotDetailData;
  prevSpot?: SpotNavLink;
  nextSpot?: SpotNavLink;
}

const DEFAULT_SPOT: SpotDetailData = {
  name: 'Soje-dong',
  category: 'heritage',
  shape: 'heritage',
  imageSrc: 'https://placehold.co/800x800/A594F9/1A1A2E?text=Soje',
  imageAlt: '소제동 철도관사촌',
};

export function SpotDetailLayout({
  locale = 'en',
  spot = DEFAULT_SPOT,
  prevSpot,
  nextSpot,
}: SpotDetailLayoutProps) {
  const c = DETAIL_CONTENT[locale];

  return (
    <div className="spot-detail">
      <Header variant="solid" />

      <main className="spot-detail__main-wrap">
        <div className="container">
          <nav className="spot-detail__breadcrumb" aria-label="Breadcrumb">
            <Link to={`/${locale}`} className="spot-detail__breadcrumb-home">
              {c.homeLabel}
            </Link>
            <span aria-hidden="true"> / </span>
            <span>{spot.name}</span>
          </nav>

          {/* ===== Hero (BlobMask 1개만) ===== */}
          <section className="spot-detail__hero">
            <div className="spot-detail__hero-blob">
              <BlobMask
                shape={spot.shape}
                src={spot.imageSrc}
                alt={spot.imageAlt}
              />
            </div>
            <div className="spot-detail__hero-info">
              <Tag variant={spot.category as TagVariant}>● {spot.category}</Tag>
              <h1 className="spot-detail__title">{spot.name}</h1>
              <p className="spot-detail__meta">{c.meta}</p>
              <p className="spot-detail__tagline">{c.tagline}</p>
            </div>
          </section>

          {/* ===== Body + Sidebar Grid ===== */}
          <div className="spot-detail__grid">
            <article className="spot-detail__body">
              {c.body.map((p, i) => (
                <p key={i} className="spot-detail__paragraph">
                  {p}
                </p>
              ))}

              {/* Gallery — 일반 사각 (블롭 마스크 ❌) */}
              <div className="spot-detail__gallery">
                {[1, 2, 3].map((i) => (
                  <img
                    key={i}
                    src={`https://placehold.co/600x400/F3F0F8/555566?text=Photo+${i}`}
                    alt={`Soje-dong photo ${i}`}
                    className="gallery-image"
                  />
                ))}
              </div>
              <p className="spot-detail__caption">{c.galleryCaption}</p>
            </article>

            <aside className="spot-detail__sidebar">
              <div className="spot-detail__info">
                <InfoRow
                  label={c.infoLabels.address}
                  value={c.infoValues.address}
                />
                <InfoRow
                  label={c.infoLabels.hours}
                  value={c.infoValues.hours}
                />
                <InfoRow label={c.infoLabels.fee} value={c.infoValues.fee} />
                <InfoRow label={c.infoLabels.walk} value={c.infoValues.walk} />
              </div>
              <div className="spot-detail__actions">
                <Button variant="primary" fullWidth>
                  {c.ctaPrimary}
                </Button>
                <Button variant="secondary" fullWidth>
                  {c.ctaSecondary}
                </Button>
              </div>
            </aside>
          </div>

          {/* ===== Prev/Next Nav ===== */}
          {(prevSpot || nextSpot) && (
            <nav
              className="spot-detail__prev-next"
              aria-label="Previous / Next spot"
            >
              {prevSpot ? (
                <Link
                  to={`/${locale}/spot/${prevSpot.id}`}
                  className="spot-detail__prev"
                >
                  ← {prevSpot.name}
                </Link>
              ) : (
                <span className="spot-detail__prev spot-detail__nav-placeholder" aria-hidden="true" />
              )}
              {nextSpot ? (
                <Link
                  to={`/${locale}/spot/${nextSpot.id}`}
                  className="spot-detail__next"
                >
                  {nextSpot.name} →
                </Link>
              ) : (
                <span className="spot-detail__next spot-detail__nav-placeholder" aria-hidden="true" />
              )}
            </nav>
          )}
        </div>
      </main>

      <footer className="home-layout__footer">
        <div className="container">
          <p>© 2026 @hey.kamori | {c.footerTagline}</p>
        </div>
      </footer>

      {/* Floating CTA (mobile only) */}
      <button type="button" className="floating-cta">
        {c.ctaPrimary}
      </button>
    </div>
  );
}
