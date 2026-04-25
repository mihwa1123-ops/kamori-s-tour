import { useParams, Navigate } from 'react-router-dom';
import { Header } from '../components/organisms/Header';
import { BottomTabBar } from '../components/organisms/BottomTabBar';
import { isValidLang, SPOT_LIST } from '../data/spots';
import { useSyncHtmlLang } from '../hooks/useSyncHtmlLang';
import './SimplePage.css';

const COPY: Record<string, { title: string; subtitle: string; comingSoon: string }> = {
  en: { title: 'Daejeon Map', subtitle: 'All 6 stops on the slow walk.', comingSoon: 'Naver Map integration coming soon.' },
  ja: { title: '大田マップ', subtitle: 'スローウォークの6スポット', comingSoon: 'Naverマップ統合は準備中。' },
  ko: { title: '대전 지도', subtitle: '슬로우 워크 6 스팟 전체.', comingSoon: '네이버 지도 통합은 준비 중이에요.' },
  es: { title: 'Mapa de Daejeon', subtitle: 'Las 6 paradas del paseo lento.', comingSoon: 'Integración de Naver Map próximamente.' },
  zh: { title: '大田地图', subtitle: '慢行漫步的6个景点。', comingSoon: 'Naver地图整合即将推出。' },
};

export default function MapPage() {
  const { lang } = useParams();
  useSyncHtmlLang(lang);

  if (!isValidLang(lang)) return <Navigate to="/en/map" replace />;

  const t = COPY[lang];

  return (
    <div className="simple-page">
      <Header variant="solid" />
      <main className="simple-page__main">
        <div className="container">
          <h1 className="simple-page__title">{t.title}</h1>
          <p className="simple-page__subtitle">{t.subtitle}</p>

          <div className="map-page__placeholder" aria-label="Map placeholder">
            <div className="map-page__pins">
              {SPOT_LIST.map((s) => {
                const colorMap: Record<string, string> = {
                  heritage: '#A594F9',
                  market: '#FFB3C6',
                  food: '#FFE663',
                  story: '#D4CBF7',
                  alleys: '#FFD6E0',
                  nature: '#FFE663',
                };
                return (
                  <div
                    key={s.id}
                    className="map-page__pin"
                    style={{ background: colorMap[s.category] }}
                    title={s.name}
                  >
                    {s.name}
                  </div>
                );
              })}
            </div>
            <p className="map-page__caption">{t.comingSoon}</p>
          </div>
        </div>
      </main>
      <BottomTabBar />
    </div>
  );
}
