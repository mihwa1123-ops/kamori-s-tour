import { useParams, Navigate } from 'react-router-dom';
import { Header } from '../components/organisms/Header';
import { BottomTabBar } from '../components/organisms/BottomTabBar';
import { isValidLang } from '../data/spots';
import { useSyncHtmlLang } from '../hooks/useSyncHtmlLang';
import './SimplePage.css';

const COPY: Record<string, { title: string; subtitle: string; body: string[]; contact: string }> = {
  en: {
    title: 'About Kamori Connect',
    subtitle: 'Local stories, walked slowly.',
    body: [
      'Kamori Connect is a slow-travel guide for foreign visitors to Korean cities — starting with Daejeon\'s old town.',
      'We hand-pick six spots within 4.2 km of walkable history: railway villages, century-old markets, hidden temples, and a noodle stand that opened in 1967.',
      'Each city gets the same design system, so your second city feels familiar.',
    ],
    contact: 'Get in touch',
  },
  ja: {
    title: 'Kamori Connect について',
    subtitle: 'ゆっくり歩く、ローカルストーリー。',
    body: [
      'Kamori Connect は外国人観光客のための韓国都市スローガイド。最初の街は大田旧市街。',
      '4.2km の徒歩ルートに 6 つのスポット — 鉄道村、100年市場、隠れ寺、1967年開店の麺屋台。',
      '都市が増えても同じデザインシステム。2都市目から既視感のある体験。',
    ],
    contact: 'お問い合わせ',
  },
  ko: {
    title: 'Kamori Connect 소개',
    subtitle: '로컬 스토리, 천천히 걷기.',
    body: [
      'Kamori Connect 는 외국인 관광객을 위한 한국 도시 슬로우 가이드. 첫 도시는 대전 원도심.',
      '4.2km 도보 경로에 6개 스팟 — 철도 마을, 100년 시장, 숨은 절, 1967년 칼국숫집.',
      '도시가 늘어도 같은 디자인 시스템. 두번째 도시부터 익숙한 경험.',
    ],
    contact: '연락하기',
  },
  es: {
    title: 'Acerca de Kamori Connect',
    subtitle: 'Historias locales, caminadas despacio.',
    body: [
      'Kamori Connect es una guía de viaje lento para visitantes extranjeros a ciudades coreanas — empezando por el casco antiguo de Daejeon.',
      'Seleccionamos seis paradas dentro de 4.2 km de historia caminable.',
      'Cada ciudad usa el mismo sistema de diseño.',
    ],
    contact: 'Contacto',
  },
  zh: {
    title: '关于 Kamori Connect',
    subtitle: '本地故事,慢慢走。',
    body: [
      'Kamori Connect 是面向外国游客的韩国城市慢游指南 — 从大田老城开始。',
      '4.2公里步行路线上的6个景点 — 铁路村、百年市场、隐秘寺庙、1967年开业的面摊。',
      '每个城市使用相同的设计系统。',
    ],
    contact: '联系我们',
  },
};

export default function AboutPage() {
  const { lang } = useParams();
  useSyncHtmlLang(lang);

  if (!isValidLang(lang)) return <Navigate to="/en/about" replace />;

  const t = COPY[lang];

  return (
    <div className="simple-page">
      <Header variant="solid" />
      <main className="simple-page__main">
        <div className="container">
          <h1 className="simple-page__title">{t.title}</h1>
          <p className="simple-page__subtitle">{t.subtitle}</p>

          <div className="about-page__body">
            {t.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <a
            href="mailto:hey@kamori.com"
            className="about-page__contact"
          >
            {t.contact} →
          </a>
        </div>
      </main>
      <BottomTabBar />
    </div>
  );
}
