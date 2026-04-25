import { Link, useLocation, useParams } from 'react-router-dom';
import { isValidLang } from '../../data/spots';
import './BottomTabBar.css';

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 12l9-9 9 9" />
    <path d="M5 10v10a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1V10" />
  </svg>
);

const RouteIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="6" cy="19" r="3" />
    <circle cx="18" cy="5" r="3" />
    <path d="M6 16V8a4 4 0 014-4h4a4 4 0 014 4v0" />
  </svg>
);

const MapIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 4l-6 2v14l6-2 6 2 6-2V4l-6 2-6-2z" />
    <path d="M9 4v14M15 6v14" />
  </svg>
);

const StoriesIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 19.5A2.5 2.5 0 016.5 17H20V3H6.5A2.5 2.5 0 004 5.5v14z" />
    <path d="M4 19.5V21h14" />
  </svg>
);

const AboutIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v.01M12 11v5" />
  </svg>
);

interface TabLabels {
  home: string;
  route: string;
  map: string;
  stories: string;
  about: string;
}

const LABELS: Record<string, TabLabels> = {
  en: { home: 'Home', route: 'Route', map: 'Map', stories: 'Stories', about: 'About' },
  ja: { home: 'ホーム', route: 'ルート', map: 'マップ', stories: 'ストーリー', about: 'About' },
  ko: { home: '홈', route: '루트', map: '지도', stories: '스토리', about: '소개' },
  es: { home: 'Inicio', route: 'Ruta', map: 'Mapa', stories: 'Historias', about: 'Acerca' },
  zh: { home: '首页', route: '路线', map: '地图', stories: '故事', about: '关于' },
};

export function BottomTabBar() {
  const params = useParams<{ lang?: string }>();
  const lang = isValidLang(params.lang) ? params.lang : 'en';
  const location = useLocation();
  const labels = LABELS[lang];

  const tabs: Array<{ key: keyof TabLabels; path: string; icon: () => JSX.Element }> = [
    { key: 'home',    path: '',         icon: HomeIcon },
    { key: 'route',   path: '/route',   icon: RouteIcon },
    { key: 'map',     path: '/map',     icon: MapIcon },
    { key: 'stories', path: '/stories', icon: StoriesIcon },
    { key: 'about',   path: '/about',   icon: AboutIcon },
  ];

  const isActive = (path: string) => {
    const target = `/${lang}${path}`;
    if (path === '') {
      // home: 정확히 /:lang 일 때만 active (디테일 등 제외)
      return location.pathname === target;
    }
    return location.pathname === target || location.pathname.startsWith(`${target}/`);
  };

  return (
    <nav className="bottom-tab-bar" aria-label="Main navigation">
      {tabs.map(({ key, path, icon: Icon }) => (
        <Link
          key={key}
          to={`/${lang}${path}`}
          className={`bottom-tab-bar__item${isActive(path) ? ' is-active' : ''}`}
          aria-current={isActive(path) ? 'page' : undefined}
        >
          <span className="bottom-tab-bar__icon" aria-hidden="true">
            <Icon />
          </span>
          <span className="bottom-tab-bar__label">{labels[key]}</span>
        </Link>
      ))}
    </nav>
  );
}
