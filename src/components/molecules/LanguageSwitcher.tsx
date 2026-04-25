import { useEffect, useRef, useState } from 'react';
import './LanguageSwitcher.css';

export type Lang = 'en' | 'ja' | 'ko' | 'es' | 'zh';

const LANGS: ReadonlyArray<{ code: Lang; label: string; htmlLang: string }> = [
  { code: 'en', label: 'English', htmlLang: 'en' },
  { code: 'ja', label: '日本語', htmlLang: 'ja' },
  { code: 'ko', label: '한국어', htmlLang: 'ko' },
  { code: 'es', label: 'Español', htmlLang: 'es' },
  { code: 'zh', label: '中文', htmlLang: 'zh-CN' },
];

export interface LanguageSwitcherProps {
  defaultLang?: Lang;
  onChange?: (lang: Lang) => void;
}

export function LanguageSwitcher({
  defaultLang = 'en',
  onChange,
}: LanguageSwitcherProps) {
  const [current, setCurrent] = useState<Lang>(defaultLang);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentMeta = LANGS.find((l) => l.code === current) ?? LANGS[0];

  const switchLang = (lang: Lang) => {
    const meta = LANGS.find((l) => l.code === lang);
    if (!meta) return;
    setCurrent(lang);
    document.documentElement.lang = meta.htmlLang;
    onChange?.(lang);
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;
    const handlePointer = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handlePointer);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handlePointer);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  return (
    <div className="lang-switcher" ref={containerRef}>
      <button
        type="button"
        className="lang-switcher__trigger"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span aria-hidden="true">🌐</span>
        <span>{currentMeta.label}</span>
        <span aria-hidden="true" className="lang-switcher__chevron">▾</span>
      </button>

      {open && (
        <ul
          className="lang-switcher__menu"
          role="listbox"
          aria-label="Language"
        >
          {LANGS.map((lang) => {
            const isActive = lang.code === current;
            return (
              <li key={lang.code} role="option" aria-selected={isActive}>
                <button
                  type="button"
                  className={isActive ? 'is-active' : ''}
                  onClick={() => switchLang(lang.code)}
                >
                  {lang.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
