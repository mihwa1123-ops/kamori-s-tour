import { useParams, Navigate, Link } from 'react-router-dom';
import { Header } from '../components/organisms/Header';
import { BottomTabBar } from '../components/organisms/BottomTabBar';
import { isValidLang } from '../data/spots';
import { ATTRACTIONS, THEME_META, type Theme } from '../data/attractions';
import { useSyncHtmlLang } from '../hooks/useSyncHtmlLang';
import './SimplePage.css';

const VALID_THEMES: readonly Theme[] = ['sight', 'history', 'nature', 'food'];
const isValidTheme = (v: string | undefined): v is Theme =>
  !!v && (VALID_THEMES as readonly string[]).includes(v);

const COPY: Record<
  string,
  { back: string; placesUnit: string; openMap: string }
> = {
  en: { back: '← Back',     placesUnit: 'places', openMap: 'Build a tour from this theme →' },
  ja: { back: '← 戻る',      placesUnit: '箇所',    openMap: 'このテーマでツアーを作る →' },
  ko: { back: '← 뒤로',      placesUnit: '곳',      openMap: '이 테마로 투어 만들기 →' },
  es: { back: '← Volver',   placesUnit: 'lugares', openMap: 'Crear tour con este tema →' },
  zh: { back: '← 返回',      placesUnit: '处',      openMap: '用此主题构建旅程 →' },
};

export default function ThemePage() {
  const { lang, theme } = useParams();
  useSyncHtmlLang(lang);

  if (!isValidLang(lang)) return <Navigate to="/en" replace />;
  if (!isValidTheme(theme)) return <Navigate to={`/${lang}`} replace />;

  const t = COPY[lang];
  const meta = THEME_META[theme];
  const themeLabel =
    lang === 'ko' ? meta.labelKo
    : lang === 'ja' ? meta.labelJa
    : lang === 'es' ? meta.labelEs
    : lang === 'zh' ? meta.labelZh
    : meta.labelEn;

  const items = ATTRACTIONS.filter((a) => a.theme === theme);

  return (
    <div className="simple-page">
      <Header variant="solid" />
      <main className="simple-page__main">
        <div className="container">
          <header className="theme-page__header">
            <span
              className="theme-page__chip"
              style={{ background: meta.color }}
            >
              {meta.emoji} {themeLabel}
            </span>
            <h1 className="theme-page__title">
              {themeLabel}
              <span className="theme-page__count">
                · {items.length} {t.placesUnit}
              </span>
            </h1>
          </header>

          <ul className="theme-page__list">
            {items.map((item) => (
              <li key={item.id} className="theme-page__item">
                <Link to={`/${lang}/spot/${item.id}`} className="theme-page__item-link">
                  <span
                    className="theme-page__item-emoji"
                    style={{ background: meta.color }}
                    aria-hidden="true"
                  >
                    {meta.emoji}
                  </span>
                  <div className="theme-page__item-info">
                    <strong>{item.nameKo}</strong>
                    <span className="theme-page__item-eng">{item.name}</span>
                    {item.menu && (
                      <span className="theme-page__item-menu">{item.menu}</span>
                    )}
                    <span className="theme-page__item-addr">{item.address}</span>
                  </div>
                  <span className="theme-page__item-arrow" aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="theme-page__footer-actions">
            <Link to={`/${lang}`} className="theme-page__back">
              {t.back}
            </Link>
            <Link to={`/${lang}/map`} className="theme-page__cta">
              {t.openMap}
            </Link>
          </div>
        </div>
      </main>
      <BottomTabBar />
    </div>
  );
}
