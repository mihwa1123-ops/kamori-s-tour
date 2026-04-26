import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { LanguageSwitcher } from '../molecules/LanguageSwitcher';
import { isValidLang } from '../../data/spots';
import './Header.css';

export interface HeaderProps {
  /**
   * - 'transparent': 페이지 최상단에서는 투명, 스크롤 후 자동 solid (기본)
   * - 'solid': 항상 흰 배경 + blur (디테일 페이지처럼 KV 가 없는 곳)
   */
  variant?: 'transparent' | 'solid';
}

const SCROLL_THRESHOLD = 24;

export function Header({ variant = 'transparent' }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const params = useParams<{ lang?: string }>();
  const lang = isValidLang(params.lang) ? params.lang : 'en';

  useEffect(() => {
    if (variant === 'solid') return;

    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [variant]);

  // solid prop 우선, 그 외엔 스크롤 위치로 결정
  const effectiveVariant = variant === 'solid' || scrolled ? 'solid' : 'transparent';

  return (
    <header className={`header header--${effectiveVariant}`}>
      <div className="header__inner">
        <div className="header__brand">
          <div className="header__lang">
            <LanguageSwitcher />
          </div>
          <Link
            to={`/${lang}`}
            className="header__logo"
            aria-label="Kamori Connect 홈"
          >
            <img src="/logo.svg" alt="Kamori Connect" className="header__logo-img" />
          </Link>
        </div>

        <nav className="header__nav" aria-label="메인">
          <Link to={`/${lang}`}>Home</Link>
          <Link to={`/${lang}/route`}>Route</Link>
          <Link to={`/${lang}/map`}>Map</Link>
          <Link to={`/${lang}/stories`}>Stories</Link>
          <Link to={`/${lang}/about`}>About</Link>
        </nav>
      </div>
    </header>
  );
}
