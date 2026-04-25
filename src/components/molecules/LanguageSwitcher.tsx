import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './LanguageSwitcher.css';

export type Lang = 'en' | 'ja' | 'ko' | 'es' | 'zh';

const LANGS: ReadonlyArray<{ code: Lang; label: string; htmlLang: string }> = [
  { code: 'en', label: 'English', htmlLang: 'en' },
  { code: 'ja', label: '日本語', htmlLang: 'ja' },
  { code: 'ko', label: '한국어', htmlLang: 'ko' },
  { code: 'es', label: 'Español', htmlLang: 'es' },
  { code: 'zh', label: '中文', htmlLang: 'zh-CN' },
];

const LANG_PATH_RE = /^\/(en|ja|ko|es|zh)(?=\/|$)/;

export interface LanguageSwitcherProps {
  /** URL 매칭 실패 시 폴백 (e.g. Storybook 스토리, 잘못된 경로) */
  defaultLang?: Lang;
  onChange?: (lang: Lang) => void;
}

export function LanguageSwitcher({
  defaultLang = 'en',
  onChange,
}: LanguageSwitcherProps) {
  const navigate = useNavigate();
  const location = useLocation();

  // URL 의 lang 세그먼트를 단일 출처로 사용. 매칭 실패 시 defaultLang.
  const langFromPath = (location.pathname.match(LANG_PATH_RE)?.[1] as Lang | undefined);
  const current = langFromPath ?? defaultLang;

  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentMeta = LANGS.find((l) => l.code === current) ?? LANGS[0];

  const switchLang = (lang: Lang) => {
    const meta = LANGS.find((l) => l.code === lang);
    if (!meta) return;

    // URL 의 lang 세그먼트를 새 lang 으로 치환. 매칭이 없으면 /lang 로 이동.
    const newPath = location.pathname.match(LANG_PATH_RE)
      ? location.pathname.replace(LANG_PATH_RE, `/${lang}`)
      : `/${lang}`;

    // html.lang 은 페이지의 useSyncHtmlLang 훅이 처리하지만,
    // 즉각 반응을 위해 여기서도 한 번 갱신.
    document.documentElement.lang = meta.htmlLang;

    navigate(newPath);
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
