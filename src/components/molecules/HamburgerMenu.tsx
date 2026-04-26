import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { LanguageSwitcher } from './LanguageSwitcher';
import './HamburgerMenu.css';

export interface HamburgerMenuProps {
  lang: string;
}

const LABELS: Record<string, { menu: string; language: string; about: string }> = {
  en: { menu: 'Menu', language: 'Language', about: 'About' },
  ja: { menu: 'メニュー', language: '言語', about: 'About' },
  ko: { menu: '메뉴', language: '언어', about: 'About' },
  es: { menu: 'Menú', language: 'Idioma', about: 'About' },
  zh: { menu: '菜单', language: '语言', about: 'About' },
};

export function HamburgerMenu({ lang }: HamburgerMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const labels = LABELS[lang] ?? LABELS.en;

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('keydown', onEsc);
    };
  }, [open]);

  return (
    <div className="hamburger" ref={ref}>
      <button
        type="button"
        className={`hamburger__btn${open ? ' is-open' : ''}`}
        onClick={() => setOpen((o) => !o)}
        aria-label={labels.menu}
        aria-expanded={open}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>

      {open && (
        <div className="hamburger__drawer" role="menu">
          <div className="hamburger__section">
            <span className="hamburger__section-label">{labels.language}</span>
            <LanguageSwitcher />
          </div>
          <Link
            to={`/${lang}/about`}
            className="hamburger__link"
            onClick={() => setOpen(false)}
            role="menuitem"
          >
            {labels.about}
          </Link>
        </div>
      )}
    </div>
  );
}
