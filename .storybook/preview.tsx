import type { Preview } from '@storybook/react-vite';
import React, { useEffect } from 'react';

/* ===== Design System CSS ===== */
import '../src/styles/tokens.css';
import '../src/styles/global.css';

/* ===== Google Fonts: 5개 언어 동적 로드 =====
   storybook-setup-guide.md §3.2 + §11.4 (preconnect 포함) */
if (typeof document !== 'undefined') {
  const preconnect1 = document.createElement('link');
  preconnect1.rel = 'preconnect';
  preconnect1.href = 'https://fonts.googleapis.com';
  document.head.appendChild(preconnect1);

  const preconnect2 = document.createElement('link');
  preconnect2.rel = 'preconnect';
  preconnect2.href = 'https://fonts.gstatic.com';
  preconnect2.crossOrigin = 'anonymous';
  document.head.appendChild(preconnect2);

  const fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href =
    'https://fonts.googleapis.com/css2' +
    '?family=Zen+Maru+Gothic:wght@300;400;500;700;900' +
    '&family=Gowun+Batang:wght@400;700' +
    '&family=Gowun+Dodum' +
    '&family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,400' +
    '&family=IBM+Plex+Sans:wght@300;400;500;700' +
    '&family=Noto+Sans+SC:wght@300;400;500;700;900' +
    '&display=swap';
  document.head.appendChild(fontLink);
}

/* ===== 언어 전환 데코레이터 =====
   툴바에서 locale 바뀌면 <html lang="xx"> 자동 갱신 →
   global.css 의 html[lang] 셀렉터가 매칭되어 폰트 자동 전환. */
const withLanguage = (Story: React.ComponentType, context: { globals: { locale?: string } }) => {
  const { locale } = context.globals;

  useEffect(() => {
    document.documentElement.lang = locale || 'en';
  }, [locale]);

  return <Story />;
};

const preview: Preview = {
  /* ----- 툴바 언어 스위처 ----- */
  globalTypes: {
    locale: {
      description: 'Language',
      toolbar: {
        icon: 'globe',
        title: 'Language',
        items: [
          { value: 'en', title: 'English' },
          { value: 'ja', title: '日本語' },
          { value: 'ko', title: '한국어' },
          { value: 'es', title: 'Español' },
          { value: 'zh', title: '中文' },
        ],
        dynamicTitle: true,
      },
    },
  },

  initialGlobals: {
    locale: 'en',
  },

  decorators: [withLanguage],

  /* ----- Viewport / Backgrounds / Controls ----- */
  parameters: {
    /* 사이드바 정렬: Foundation → Atoms → Molecules → Organisms → Templates */
    options: {
      storySort: {
        order: ['Foundation', 'Atoms', 'Molecules', 'Organisms', 'Templates'],
      },
    },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    /* 컬러 시스템 토큰과 일치하는 backgrounds.
       ⚠️ 값들은 src/styles/tokens.css 와 반드시 일치해야 함 — 토큰 변경 시 동기화. */
    backgrounds: {
      default: 'off-white',
      values: [
        { name: 'white',        value: '#FFFFFF' },
        { name: 'off-white',    value: '#FAFAFA' },
        { name: 'silver-veil',  value: '#F3F0F8' },
        { name: 'ink',          value: '#1A1A2E' },
        { name: 'lav-50',       value: '#EDEAFC' },
        { name: 'pink-50',      value: '#FFF0F4' },
        { name: 'yel-50',       value: '#FFF9D1' },
      ],
    },

    /* layout-system §3 브레이크포인트와 일치 */
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile (375px)',
          styles: { width: '375px', height: '812px' },
        },
        tablet: {
          name: 'Tablet (768px)',
          styles: { width: '768px', height: '1024px' },
        },
        desktop: {
          name: 'Desktop (1280px)',
          styles: { width: '1280px', height: '900px' },
        },
        large: {
          name: 'Large Desktop (1440px)',
          styles: { width: '1440px', height: '900px' },
        },
      },
      defaultViewport: 'desktop',
    },

    /* Storybook 9 layout — 모든 스토리 기본 패딩 */
    layout: 'padded',
  },
};

export default preview;
