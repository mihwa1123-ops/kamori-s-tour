import { LanguageSwitcher } from '../molecules/LanguageSwitcher';
import './Header.css';

export interface HeaderProps {
  variant?: 'transparent' | 'solid';
}

export function Header({ variant = 'transparent' }: HeaderProps) {
  return (
    <header className={`header header--${variant}`}>
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
