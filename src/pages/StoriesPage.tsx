import { useParams, Navigate } from 'react-router-dom';
import { Header } from '../components/organisms/Header';
import { BottomTabBar } from '../components/organisms/BottomTabBar';
import { FieldNote } from '../components/organisms/FieldNote';
import { isValidLang } from '../data/spots';
import { useSyncHtmlLang } from '../hooks/useSyncHtmlLang';
import './SimplePage.css';

const COPY: Record<string, { title: string; subtitle: string; quote: string; highlight: string; initials: string; name: string; role: string; cta: string }> = {
  en: {
    title: 'Field Notes',
    subtitle: 'Voices from the alleys.',
    quote: 'If you miss the 7am light on the railway bricks, you miss half the point.',
    highlight: 'half the point',
    initials: 'M',
    name: 'Min-ji',
    role: 'local guide, 3rd generation',
    cta: 'Read full story',
  },
  ja: {
    title: 'フィールドノート',
    subtitle: '路地からの声。',
    quote: '朝7時の鉄道レンガに光が差す瞬間を逃すと、半分は意味がない。',
    highlight: '半分は意味がない',
    initials: 'み',
    name: 'みんじ',
    role: '地元ガイド · 3代目',
    cta: '物語を読む',
  },
  ko: {
    title: '필드 노트',
    subtitle: '골목에서 들려오는 목소리.',
    quote: '아침 7시 철도 벽돌에 비치는 빛을 놓치면, 절반은 놓치는 거예요.',
    highlight: '절반은 놓치는 거예요',
    initials: '민',
    name: '민지',
    role: '동네 가이드 · 3대',
    cta: '전체 이야기 읽기',
  },
  es: {
    title: 'Notas de campo',
    subtitle: 'Voces de los callejones.',
    quote: 'Si te pierdes la luz de las 7am sobre los ladrillos del ferrocarril, te pierdes la mitad.',
    highlight: 'la mitad',
    initials: 'M',
    name: 'Min-ji',
    role: 'guía local, 3ra generación',
    cta: 'Leer historia',
  },
  zh: {
    title: '田野笔记',
    subtitle: '来自巷子的声音。',
    quote: '如果错过了早上7点照在铁路砖墙上的光,就错过了一半的意义。',
    highlight: '一半的意义',
    initials: '民',
    name: '民智',
    role: '本地向导 · 第三代',
    cta: '阅读全文',
  },
};

export default function StoriesPage() {
  const { lang } = useParams();
  useSyncHtmlLang(lang);

  if (!isValidLang(lang)) return <Navigate to="/en/stories" replace />;

  const t = COPY[lang];

  return (
    <div className="simple-page">
      <Header variant="solid" />
      <main className="simple-page__main">
        <div className="container">
          <h1 className="simple-page__title">{t.title}</h1>
          <p className="simple-page__subtitle">{t.subtitle}</p>

          <div className="stories-page__list">
            <FieldNote
              quote={t.quote}
              highlight={t.highlight}
              author={{ initials: t.initials, name: t.name, role: t.role }}
              ctaLabel={t.cta}
              onCtaClick={() => {}}
            />
          </div>
        </div>
      </main>
      <BottomTabBar />
    </div>
  );
}
