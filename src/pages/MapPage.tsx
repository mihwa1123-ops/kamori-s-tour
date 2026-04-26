import { useParams, Navigate } from 'react-router-dom';
import { Header } from '../components/organisms/Header';
import { BottomTabBar } from '../components/organisms/BottomTabBar';
import { CourseBuilder, type Lang } from '../components/organisms/CourseBuilder';
import { isValidLang } from '../data/spots';
import { useSyncHtmlLang } from '../hooks/useSyncHtmlLang';
import './SimplePage.css';

const COPY: Record<string, { title: string; subtitle: string }> = {
  en: { title: 'Daejeon Junggu Map', subtitle: 'Pick a theme, build your tour.' },
  ja: { title: '大田中区マップ',     subtitle: 'テーマを選び、ツアーを構築。' },
  ko: { title: '대전 중구 지도',      subtitle: '테마를 골라 투어를 만들어보세요.' },
  es: { title: 'Mapa de Junggu',     subtitle: 'Elige un tema y arma tu tour.' },
  zh: { title: '中区地图',           subtitle: '选择主题，构建您的旅程。' },
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
          <CourseBuilder locale={lang as Lang} initialTheme="sight" />
        </div>
      </main>
      <BottomTabBar />
    </div>
  );
}
