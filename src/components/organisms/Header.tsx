import { useEffect, useState } from 'react';
import { LanguageSwitcher } from '../molecules/LanguageSwitcher';
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
        <a href="/" className="header__logo" aria-label="daejeon/slow 홈">
          <span>daejeon/slow</span>
        </a>

        <nav className="header__nav" aria-label="메인">
          <a href="/route">Route</a>
          <a href="/map">Map</a>
          <a href="/stories">Stories</a>
          <a href="/about">About</a>
        </nav>

        <div className="header__lang">
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
