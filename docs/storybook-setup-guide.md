# daejeon/slow — Storybook 셋업 가이드

> 컴포넌트 카탈로그를 브라우저에서 시각화하고 인터랙션 테스트하는 도구
> **Storybook 9+ · React + Vite · 5개 언어 대응**
> 최종 수정: 2026년 4월 (v1.0)
>
> **📎 관련 문서**
> - [color-system.md](./color-system.md) — 컬러 토큰
> - [font-system.md](./font-system.md) — 폰트 토큰
> - [layout-system.md](./layout-system.md) — 레이아웃, BlobMask
> - [component-catalog.md](./component-catalog.md) — 컴포넌트 명세

---

## 0. 이 문서의 목적

Component 카탈로그(MD)를 **실제로 보고 만지는** 도구로 만든다.

다음을 정의한다:
- Storybook 설치 및 초기 설정
- 디자인 시스템 토큰 통합 (4개 MD 문서 연동)
- Story 작성 패턴
- 5개 언어 전환 테스트
- 접근성·시각·인터랙션 테스트
- CI/CD 자동 배포

**왜 Storybook인가**
- 컴포넌트를 페이지 컨텍스트와 분리해서 개발 → 빠른 이터레이션
- 디자이너·개발자·PM이 같은 화면을 보며 소통
- WCAG 자동 검증, 시각적 회귀 테스트
- Storybook 9에서 Vitest와 통합된 component 테스트 (Interaction · Accessibility · Visual · Coverage)

---

## 1. 사전 준비

### 1.1 프로젝트 요구사항

```
- Node.js 18.0 이상
- React 프로젝트 (Vite 빌더 사용 권장)
- 패키지 매니저 (npm / pnpm / yarn)
- TypeScript (권장)
```

### 1.2 권장 환경

| 항목 | 권장 버전 | 이유 |
|------|---------|------|
| Storybook | 9.0+ (최신 10.x) | 최신 안정 버전, React-Vite 지원 |
| React | 18+ | 동시성 기능 |
| Vite | 5+ | 빠른 빌드 속도 |
| TypeScript | 5+ | 컴포넌트 props 자동 추론 |
| Node | 18 LTS+ | Storybook 9 요구사항 |

---

## 2. 설치

### 2.1 자동 설치 (권장)

프로젝트 루트에서:

```bash
npx storybook@latest init
```

대화형 프롬프트가 나타남:

1. **"Are you new to Storybook?"** → "Yes" 선택 시 온보딩 시작, "No" 선택 시 최소 설정
2. **Features 선택** → `docs`, `test`, `a11y` 모두 체크 권장
3. **빌더 선택** → Vite 자동 감지

### 2.2 명시적 features 지정

온보딩 없이 한 번에:

```bash
npm create storybook@latest --features docs test a11y
```

### 2.3 설치 후 자동 생성되는 파일

```
프로젝트루트/
├── .storybook/
│   ├── main.ts              ← Storybook 설정
│   ├── preview.ts           ← 전역 데코레이터 + 파라미터
│   └── manager.ts           ← UI 커스터마이징 (선택)
├── src/
│   └── stories/             ← 예시 스토리 (삭제 가능)
└── package.json             ← scripts 추가됨
```

### 2.4 package.json scripts 확인

```json
{
  "scripts": {
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "test-storybook": "test-storybook"
  }
}
```

---

## 3. 디자인 시스템 통합

### 3.1 핵심 원칙

**Storybook이 4개 MD 문서의 토큰을 그대로 사용하게 만든다.** 이중 정의 금지. 컬러 시스템 MD에서 `--lav-500: #A594F9`로 정의했다면, Storybook도 같은 변수를 통해 `#A594F9`를 표시.

### 3.2 글로벌 CSS 로드

`.storybook/preview.ts`에서 프로젝트의 메인 CSS를 import:

```typescript
// .storybook/preview.ts
import type { Preview } from '@storybook/react-vite';

// 디자인 시스템 토큰 (CSS 변수)
import '../src/styles/tokens.css';      // color, font-weight, spacing 변수
import '../src/styles/global.css';      // 기본 reset + html[lang] 폰트 분기
import '../src/styles/components.css';  // .btn, .card 등 컴포넌트 베이스 스타일

// Google Fonts 로드 (5개 언어 폰트)
const fontLink = document.createElement('link');
fontLink.rel = 'stylesheet';
fontLink.href = 'https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@300;400;500;700;900&family=Gowun+Batang:wght@400;700&family=Gowun+Dodum&family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,400&family=IBM+Plex+Sans:wght@300;400;500;700&family=Noto+Sans+SC:wght@300;400;500;700;900&display=swap';
document.head.appendChild(fontLink);

const preview: Preview = {
  parameters: {
    // 다음 섹션에서 정의
  },
};

export default preview;
```

### 3.3 src/styles/tokens.css 예시

4개 MD 문서의 변수를 한곳에 모아둔 파일:

```css
/* src/styles/tokens.css */
:root {
  /* ===== Color System ===== */
  /* From color-system.md */
  --white:        #FFFFFF;
  --off-white:    #FAFAFA;
  --silver-veil:  #F3F0F8;
  --ink:          #1A1A2E;
  --slate:        #555566;

  --lav-50:   #EDEAFC;
  --lav-100:  #D4CBF7;
  --lav-200:  #C2B5F5;
  --lav-500:  #A594F9;
  --lav-600:  #8170D8;
  --lav-800:  #4A3A8C;

  --pink-50:   #FFF0F4;
  --pink-100:  #FFD6E0;
  --pink-500:  #FFB3C6;
  --pink-600:  #F08BA6;
  --pink-800:  #A8456B;
  --pink-900:  #5A1F36;

  --yel-50:   #FFF9D1;
  --yel-100:  #FFF0A0;
  --yel-500:  #FFE663;
  --yel-600:  #D4B80F;
  --yel-800:  #6B5500;
  --yel-900:  #4A3B00;

  --color-border-subtle: #E8E8F0;

  /* ===== Font Weight System ===== */
  /* From font-system.md */
  --fw-meta: 300;
  --fw-body: 400;
  --fw-ui: 500;
  --fw-title: 700;
  --fw-hero: 900;

  /* ===== Font Family ===== */
  --font-sans: 'IBM Plex Sans', sans-serif;
  --font-serif: 'Fraunces', serif;

  /* ===== Spacing System ===== */
  /* From layout-system.md */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;
  --space-9: 96px;
  --space-10: 128px;

  /* ===== Z-index ===== */
  --z-blob: 2;
  --z-sticky: 100;
  --z-header: 100;
}

/* 언어별 폰트 자동 분기 */
html[lang="ja"] { font-family: 'Zen Maru Gothic', sans-serif; }
html[lang="ko"] { font-family: 'Gowun Dodum', sans-serif; }
html[lang="zh"] { font-family: 'Noto Sans SC', sans-serif; }
html[lang="en"], html[lang="es"] { font-family: var(--font-sans); }

html[lang="ja"] h1, html[lang="ja"] h2, html[lang="ja"] h3 { font-family: 'Zen Maru Gothic', sans-serif; }
html[lang="ko"] h1, html[lang="ko"] h2, html[lang="ko"] h3 { font-family: 'Gowun Batang', serif; }
html[lang="zh"] h1, html[lang="zh"] h2, html[lang="zh"] h3 { font-family: 'Noto Sans SC', sans-serif; }
html[lang="en"] h1, html[lang="en"] h2, html[lang="en"] h3,
html[lang="es"] h1, html[lang="es"] h2, html[lang="es"] h3 { font-family: var(--font-serif); }
```

### 3.4 .storybook/main.ts 설정

```typescript
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  
  addons: [
    '@storybook/addon-essentials',     // Controls, Actions, Viewport, Backgrounds
    '@storybook/addon-a11y',            // 접근성 검증
    '@storybook/addon-interactions',    // 인터랙션 테스트
    '@storybook/addon-themes',          // 테마 전환 (light/dark)
    '@storybook/addon-vitest',          // Storybook 9 Vitest 통합
  ],
  
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  
  typescript: {
    reactDocgen: 'react-docgen-typescript',  // Props 자동 추출
  },
  
  docs: {
    autodocs: 'tag',  // 'autodocs' 태그가 붙은 컴포넌트만 자동 문서화
  },
};

export default config;
```

---

## 4. 5개 언어 전환 데코레이터

다국어 컴포넌트를 Storybook에서 5개 언어로 전환하며 확인할 수 있게.

### 4.1 글로벌 타입 정의

```typescript
// .storybook/preview.ts
import type { Preview } from '@storybook/react-vite';
import { useEffect } from 'react';

// 언어 전환 시 <html lang> 자동 갱신
const withLanguage = (Story, context) => {
  const { locale } = context.globals;
  
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  
  return <Story />;
};

const preview: Preview = {
  globalTypes: {
    locale: {
      description: 'Internationalization locale',
      defaultValue: 'en',
      toolbar: {
        icon: 'globe',
        title: 'Language',
        items: [
          { value: 'en', title: '🇺🇸 English' },
          { value: 'ja', title: '🇯🇵 日本語' },
          { value: 'ko', title: '🇰🇷 한국어' },
          { value: 'es', title: '🇪🇸 Español' },
          { value: 'zh', title: '🇨🇳 中文' },
        ],
      },
    },
  },
  
  decorators: [withLanguage],
  
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    
    // Backgrounds — 컬러 시스템 토큰과 일치
    backgrounds: {
      default: 'cream',
      values: [
        { name: 'white', value: '#FFFFFF' },
        { name: 'off-white', value: '#FAFAFA' },
        { name: 'cream', value: '#FAFAFA' },
        { name: 'silver-veil', value: '#F3F0F8' },
        { name: 'ink', value: '#1A1A2E' },
      ],
    },
    
    // Viewport — 레이아웃 시스템과 일치하는 브레이크포인트
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
  },
};

export default preview;
```

### 4.2 사용법

상단 툴바에 언어 전환 드롭다운이 나타남. 클릭하면 모든 컴포넌트 미리보기가 해당 언어 폰트로 즉시 갱신.

---

## 5. Story 작성 패턴

### 5.1 기본 구조 (Component Story Format 3.0)

```typescript
// src/components/atoms/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],     // 자동 문서화 태그
  
  parameters: {
    layout: 'centered',
  },
  
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'dark'],
      description: '버튼 스타일 변형',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// ===== Stories =====

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Begin the walk',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'See map',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Read more',
  },
};

export const Dark: Story = {
  args: {
    variant: 'dark',
    children: 'View source',
  },
};

// 모든 사이즈 비교
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

// 다국어 — 영어
export const English: Story = {
  args: { variant: 'primary', children: 'Begin the walk ↗' },
  globals: { locale: 'en' },
};

// 다국어 — 일본어
export const Japanese: Story = {
  args: { variant: 'primary', children: '歩き始める ↗' },
  globals: { locale: 'ja' },
};

// 다국어 — 한국어
export const Korean: Story = {
  args: { variant: 'primary', children: '걷기 시작 ↗' },
  globals: { locale: 'ko' },
};

// 상태들
export const Loading: Story = {
  args: { variant: 'primary', children: '...', loading: true },
};

export const Disabled: Story = {
  args: { variant: 'primary', children: 'Disabled', disabled: true },
};
```

### 5.2 BlobMask 같은 비주얼 컴포넌트

```typescript
// src/components/molecules/BlobMask.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { BlobMask } from './BlobMask';

const meta: Meta<typeof BlobMask> = {
  title: 'Molecules/BlobMask',
  component: BlobMask,
  tags: ['autodocs'],
  
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '스팟 이미지를 카테고리별 유기적 블롭으로 마스킹. layout-system.md 섹션 2 참조.',
      },
    },
  },
  
  argTypes: {
    shape: {
      control: 'radio',
      options: ['heritage', 'market', 'nature'],
      description: '카테고리에 매핑된 블롭 쉐이프',
    },
    src: { control: 'text' },
    alt: { control: 'text' },
  },
  
  decorators: [
    (Story) => (
      <div style={{ width: 300, height: 300 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof BlobMask>;

export const Heritage: Story = {
  args: {
    shape: 'heritage',
    src: 'https://placehold.co/600x600/A594F9/FFFFFF?text=Soje-dong',
    alt: '소제동 철도관사촌',
  },
};

export const Market: Story = {
  args: {
    shape: 'market',
    src: 'https://placehold.co/600x600/FFB3C6/FFFFFF?text=Jungang',
    alt: '중앙시장',
  },
};

export const Nature: Story = {
  args: {
    shape: 'nature',
    src: 'https://placehold.co/600x600/FFE663/000000?text=Bomunsan',
    alt: '보문산',
  },
};

// 3종 모두 비교
export const AllShapes: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
      <div>
        <BlobMask 
          shape="heritage" 
          src="https://placehold.co/600x600/A594F9/FFFFFF?text=H" 
          alt="Heritage" 
        />
        <p style={{ textAlign: 'center', marginTop: 16, fontSize: 12 }}>Heritage</p>
      </div>
      <div>
        <BlobMask 
          shape="market" 
          src="https://placehold.co/600x600/FFB3C6/FFFFFF?text=M" 
          alt="Market" 
        />
        <p style={{ textAlign: 'center', marginTop: 16, fontSize: 12 }}>Market</p>
      </div>
      <div>
        <BlobMask 
          shape="nature" 
          src="https://placehold.co/600x600/FFE663/000000?text=K" 
          alt="Nature" 
        />
        <p style={{ textAlign: 'center', marginTop: 16, fontSize: 12 }}>Nature</p>
      </div>
    </div>
  ),
};
```

### 5.3 SpotCard — 복합 컴포넌트

```typescript
// src/components/organisms/SpotCard.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SpotCard } from './SpotCard';

const meta: Meta<typeof SpotCard> = {
  title: 'Organisms/SpotCard',
  component: SpotCard,
  tags: ['autodocs'],
  
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof SpotCard>;

const baseSpot = {
  id: 'soje-dong',
  category: 'heritage' as const,
  shape: 'heritage' as const,
  walkTime: 5,
  imageSrc: '/photos/soje-dong.jpg',
  imageAlt: '소제동 철도관사촌',
};

export const SojeDong: Story = {
  args: {
    spot: {
      ...baseSpot,
      name: 'Soje-dong',
      description: 'Railway village, now cafés.',
    },
  },
};

export const JungangMarket: Story = {
  args: {
    spot: {
      ...baseSpot,
      id: 'jungang',
      category: 'market',
      shape: 'market',
      walkTime: 8,
      name: 'Jungang Market',
      description: 'Since 1905, still loud.',
      imageSrc: '/photos/jungang.jpg',
      imageAlt: '중앙시장',
    },
  },
};

export const Bomunsan: Story = {
  args: {
    spot: {
      ...baseSpot,
      id: 'bomunsan',
      category: 'nature',
      shape: 'nature',
      walkTime: 20,
      name: 'Bomunsan',
      description: 'A pine forest downtown.',
      imageSrc: '/photos/bomunsan.jpg',
      imageAlt: '보문산',
    },
  },
};

// 3개 카드 한 번에 — 홈 페이지 시뮬레이션
export const ThreeAlleysSection: Story = {
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(3, 1fr)', 
      gap: 24,
      maxWidth: 1200,
    }}>
      <SpotCard spot={{ ...baseSpot, name: 'Soje-dong', description: 'Railway village, now cafés.' }} />
      <SpotCard spot={{ ...baseSpot, id: 'jungang', category: 'market', shape: 'market', walkTime: 8, name: 'Jungang Market', description: 'Since 1905, still loud.', imageSrc: '/photos/j.jpg', imageAlt: '중앙시장' }} />
      <SpotCard spot={{ ...baseSpot, id: 'bm', category: 'nature', shape: 'nature', walkTime: 20, name: 'Bomunsan', description: 'A pine forest downtown.', imageSrc: '/photos/b.jpg', imageAlt: '보문산' }} />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

// 모바일 1컬럼 레이아웃
export const MobileLayout: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <SpotCard spot={{ ...baseSpot, name: 'Soje-dong', description: 'Railway village, now cafés.' }} />
      <SpotCard spot={{ ...baseSpot, id: 'jungang', category: 'market', shape: 'market', walkTime: 8, name: 'Jungang Market', description: 'Since 1905, still loud.', imageSrc: '/photos/j.jpg', imageAlt: '중앙시장' }} />
    </div>
  ),
  parameters: {
    viewport: { defaultViewport: 'mobile' },
  },
};
```

---

## 6. 카탈로그 자동 문서화

### 6.1 디자인 토큰 페이지

`src/stories/DesignTokens.mdx` 같은 MDX 파일을 만들어서 컬러·폰트·간격을 시각화.

```mdx
{/* src/stories/Foundation/Colors.mdx */}

import { Meta } from '@storybook/blocks';

<Meta title="Foundation/Colors" />

# Color System

Color values from `color-system.md`. 변경은 토큰 파일에서.

## Primary — Lavender

<div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12 }}>
  {[
    { token: '--lav-50',  hex: '#EDEAFC' },
    { token: '--lav-100', hex: '#D4CBF7' },
    { token: '--lav-200', hex: '#C2B5F5' },
    { token: '--lav-500', hex: '#A594F9', primary: true },
    { token: '--lav-600', hex: '#8170D8' },
    { token: '--lav-800', hex: '#4A3A8C' },
  ].map(c => (
    <div key={c.token}>
      <div style={{ 
        aspectRatio: '1', 
        background: c.hex, 
        borderRadius: 12,
        border: c.primary ? '2px solid #1A1A2E' : 'none',
      }} />
      <div style={{ marginTop: 8, fontSize: 11, fontFamily: 'monospace' }}>
        {c.token}
      </div>
      <div style={{ fontSize: 10, color: '#888' }}>{c.hex}</div>
    </div>
  ))}
</div>

## Secondary — Baby Pink

(같은 패턴)

## Accent — Butter Yellow

(같은 패턴)
```

### 6.2 폰트 페이지

```mdx
{/* src/stories/Foundation/Typography.mdx */}

import { Meta } from '@storybook/blocks';

<Meta title="Foundation/Typography" />

# Typography System

5개 언어 폰트 시스템. `font-system.md` 참조.

## English — Fraunces + IBM Plex Sans

<div style={{ fontFamily: 'Fraunces, serif', fontSize: 48, fontWeight: 500 }}>
  A city of quiet corners.
</div>
<div style={{ fontFamily: 'IBM Plex Sans, sans-serif', marginTop: 16 }}>
  Six stops, 4.2 km, ~3 hours.
</div>

## 日本語 — Zen Maru Gothic

<div style={{ fontFamily: '"Zen Maru Gothic", sans-serif', fontSize: 36, fontWeight: 700 }}>
  静かな路地の街、大田へ。
</div>

## 한국어 — Gowun Batang + Dodum

<div style={{ fontFamily: '"Gowun Batang", serif', fontSize: 40, fontWeight: 700 }}>
  조용한 골목의 도시.
</div>

## Weights · Zen Maru Gothic

<div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontFamily: '"Zen Maru Gothic", sans-serif' }}>
  <div style={{ fontWeight: 300, fontSize: 24 }}>Light 300 · 路地の街</div>
  <div style={{ fontWeight: 400, fontSize: 24 }}>Regular 400 · 路地の街</div>
  <div style={{ fontWeight: 500, fontSize: 24 }}>Medium 500 · 路地の街</div>
  <div style={{ fontWeight: 700, fontSize: 24 }}>Bold 700 · 路地の街</div>
  <div style={{ fontWeight: 900, fontSize: 24 }}>Black 900 · 路地の街</div>
</div>
```

### 6.3 사이드바 구조 권장

```
Storybook Sidebar
├── Foundation
│   ├── Colors          (MDX)
│   ├── Typography      (MDX)
│   ├── Spacing         (MDX)
│   └── Shapes          (MDX) — 3가지 블롭 쉐이프 시각화
├── Atoms
│   ├── Button
│   ├── IconButton
│   ├── Tag
│   ├── Badge
│   └── NumberMarker
├── Molecules
│   ├── Card
│   ├── BlobMask
│   ├── LanguageSwitcher
│   ├── Avatar
│   └── InfoRow
├── Organisms
│   ├── Header
│   ├── SpotCard
│   ├── FieldNote
│   ├── RouteTimeline
│   └── BottomSheet
└── Templates
    ├── HomeLayout
    └── SpotDetailLayout
```

---

## 7. 자동 테스트 통합

Storybook 9에서 Vitest와 통합된 component 테스트가 새로 도입됨. 3가지 카테고리:

### 7.1 Interaction Tests

`play` 함수로 사용자 행동 시뮬레이션:

```typescript
// src/components/atoms/Button.stories.tsx
import { userEvent, within, expect } from '@storybook/test';

export const Clicked: Story = {
  args: { variant: 'primary', children: 'Click me' },
  
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Click me' });
    
    await userEvent.click(button);
    
    // Assertion
    await expect(button).toBeInTheDocument();
  },
};
```

### 7.2 Accessibility Tests

`@storybook/addon-a11y`가 자동으로 WCAG 검증. 위반 사항이 패널에 빨간색으로 표시.

```typescript
// 특정 컴포넌트의 접근성 규칙 커스터마이징
export const PrimaryButton: Story = {
  args: { variant: 'primary', children: 'Begin' },
  parameters: {
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },  // 대비비 검증
          { id: 'button-name', enabled: true },     // 버튼에 텍스트 있는지
        ],
      },
    },
  },
};
```

### 7.3 Visual Regression Tests

Storybook 9의 Vitest 통합으로 자동:

```bash
# package.json scripts
"test-storybook": "test-storybook --watch"
```

```bash
npm run test-storybook
```

기존 스냅샷과 비교해서 픽셀 단위 차이 검출.

### 7.4 Coverage Reports

```bash
npm run test-storybook -- --coverage
```

어떤 컴포넌트의 어떤 variant가 테스트됐는지 리포트.

---

## 8. 실행 & 빌드

### 8.1 개발 모드

```bash
npm run storybook
```

- 자동으로 `http://localhost:6006` 열림
- 파일 수정 시 hot reload
- 사이드바에 모든 스토리 표시

### 8.2 정적 빌드

```bash
npm run build-storybook
```

- 결과물: `storybook-static/` 디렉토리
- 정적 호스팅 가능 (Vercel, Netlify, GitHub Pages 등)

### 8.3 배포 옵션

#### 옵션 A: Chromatic (권장)
```bash
npx chromatic --project-token=YOUR_TOKEN
```
- 시각적 회귀 테스트 자동
- PR마다 미리보기 URL 생성
- 디자이너 리뷰 가능

#### 옵션 B: Vercel
```bash
# vercel.json
{
  "buildCommand": "npm run build-storybook",
  "outputDirectory": "storybook-static"
}
```

#### 옵션 C: GitHub Pages
```yaml
# .github/workflows/deploy-storybook.yml
name: Deploy Storybook

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build-storybook
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./storybook-static
```

---

## 9. CI/CD 통합

### 9.1 GitHub Actions로 PR마다 자동 검증

```yaml
# .github/workflows/storybook-test.yml
name: Storybook Tests

on:
  pull_request:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - run: npm ci
      
      - name: Build Storybook
        run: npm run build-storybook --quiet
      
      - name: Run Storybook tests (Vitest)
        run: |
          npx concurrently -k -s first -n "SB,TEST" -c "magenta,blue" \
            "npx http-server storybook-static --port 6006 --silent" \
            "npx wait-on tcp:6006 && npm run test-storybook"
```

### 9.2 PR 코멘트로 미리보기 URL

Chromatic 사용 시 자동:
```
✅ Visual Tests passed
🔍 12 stories accepted
🌐 Preview: https://...chromatic.com/...
```

---

## 10. 권장 워크플로우

### 10.1 새 컴포넌트 만들 때

1. `component-catalog.md` 카탈로그에 명세 추가
2. `src/components/.../ComponentName.tsx` 작성
3. `src/components/.../ComponentName.stories.tsx` 작성
4. `npm run storybook`으로 즉시 확인
5. 5개 언어 전환 테스트
6. 4가지 viewport 전환 테스트
7. a11y 패널 확인 (위반 사항 0개)
8. PR → CI 통과 → 머지

### 10.2 디자이너와 협업

1. 개발자가 Storybook 빌드 후 Chromatic/Vercel에 배포
2. 디자이너에게 URL 공유
3. 디자이너가 실제로 만지면서 피드백
4. Figma와 직접 비교 가능
5. 변경 요청은 GitHub Issue로

### 10.3 Claude Code와 함께 쓸 때

```
"Button 컴포넌트 만들어줘.
component-catalog.md 섹션 2.1 명세 따라서,
Button.tsx 와 Button.stories.tsx 둘 다 생성.
스토리는 4개 variant + 3개 size + 5개 언어 + 2개 상태(loading, disabled) 모두 포함."
```

```
"새 EventBanner 컴포넌트 추가해줘.
1. component-catalog.md 에 명세 추가
2. EventBanner.tsx 구현
3. EventBanner.stories.tsx 작성 (variant별 스토리 + AllVariants 비교 스토리)
4. a11y 검증 통과하는지 확인"
```

---

## 11. 자주 마주치는 문제

### 11.1 폰트가 안 보임

**증상**: Storybook에서 한글·일본어가 시스템 기본 폰트로 보임.  
**원인**: `.storybook/preview.ts`에서 Google Fonts `<link>` 추가 안 함.  
**해결**: 섹션 3.2의 fontLink 코드 추가.

### 11.2 CSS 변수가 작동 안 함

**증상**: `var(--lav-500)` 가 빈 값으로 처리됨.  
**원인**: `tokens.css`가 import되지 않음.  
**해결**: `.storybook/preview.ts` 최상단에 `import '../src/styles/tokens.css';`

### 11.3 BlobMask SVG가 깨짐

**증상**: clipPath ID가 충돌해서 마스크가 적용 안 됨.  
**원인**: 같은 페이지에 같은 ID가 여러 개 있음 (Story가 여러 개 있을 때).  
**해결**: `BlobMask` 컴포넌트의 `clipId`를 `Math.random()` 또는 `useId()` 훅으로 고유화 (component-catalog.md 섹션 2.4 코드 이미 적용됨).

### 11.4 다국어 전환 시 폰트가 늦게 바뀜

**증상**: 언어 변경하면 텍스트는 바로 바뀌는데 폰트는 1-2초 지연.  
**원인**: Google Fonts가 처음에 로드 안 된 폰트는 그때 다운로드.  
**해결**: `display=swap`은 이미 적용됨. preconnect 추가하면 더 빨라짐:

```html
<!-- preview.ts에서 -->
const preconnect1 = document.createElement('link');
preconnect1.rel = 'preconnect';
preconnect1.href = 'https://fonts.googleapis.com';
document.head.appendChild(preconnect1);

const preconnect2 = document.createElement('link');
preconnect2.rel = 'preconnect';
preconnect2.href = 'https://fonts.gstatic.com';
preconnect2.crossOrigin = 'anonymous';
document.head.appendChild(preconnect2);
```

---

## 12. 빠른 체크리스트

### 12.1 초기 셋업

- [ ] `npx storybook@latest init` 실행
- [ ] `.storybook/main.ts`에서 framework가 `@storybook/react-vite`인지 확인
- [ ] `tokens.css` 파일 만들고 4개 MD 문서의 변수 통합
- [ ] `.storybook/preview.ts`에서 토큰 CSS import
- [ ] Google Fonts 동적 로드 코드 추가
- [ ] viewport·backgrounds 파라미터 설정
- [ ] 5개 언어 전환 데코레이터 추가

### 12.2 컴포넌트마다

- [ ] `ComponentName.tsx` 작성
- [ ] `ComponentName.stories.tsx` 작성
- [ ] 모든 variant에 대한 Story
- [ ] 5개 언어 Story (다국어 지원 컴포넌트)
- [ ] 모바일·태블릿·PC 뷰포트 확인
- [ ] a11y 패널 위반 0개
- [ ] `tags: ['autodocs']`로 자동 문서화

### 12.3 출시 전

- [ ] `npm run build-storybook` 성공
- [ ] 모든 스토리 로드 확인
- [ ] 시각적 회귀 테스트 통과
- [ ] 인터랙션 테스트 통과
- [ ] Chromatic 또는 Vercel 배포 성공
- [ ] 디자이너·PM과 URL 공유

---

## 13. Claude Code 작업 지시 템플릿

### 13.1 Storybook 초기 셋업

```
"Storybook 셋업해줘.
docs/storybook-setup-guide.md 따라서:
1. npx storybook@latest init 실행
2. .storybook/preview.ts 에 5개 언어 전환 데코레이터 추가
3. src/styles/tokens.css 만들어서 4개 MD 문서 변수 통합
4. Google Fonts 5개 언어 폰트 로드 코드
5. viewport, backgrounds 파라미터 설정"
```

### 13.2 컴포넌트 + 스토리 동시 생성

```
"Button 컴포넌트와 스토리 만들어줘.
component-catalog.md 섹션 2.1 명세대로 Button.tsx,
storybook-setup-guide.md 섹션 5.1 패턴대로 Button.stories.tsx.
4개 variant + 3개 size + 5개 언어 모두 커버."
```

### 13.3 디자인 토큰 시각화 페이지

```
"src/stories/Foundation/Colors.mdx 만들어줘.
storybook-setup-guide.md 섹션 6.1 패턴대로,
color-system.md 의 모든 컬러 토큰을
Foundation/Primary/Secondary/Accent/Support 그룹별로 시각화."
```

---

## 14. 참고 자료

### 14.1 관련 내부 문서

- **컬러 시스템**: [color-system.md](./color-system.md)
- **폰트 시스템**: [font-system.md](./font-system.md)
- **레이아웃 시스템**: [layout-system.md](./layout-system.md)
- **컴포넌트 카탈로그**: [component-catalog.md](./component-catalog.md)

### 14.2 공식 문서

- Storybook 공식: https://storybook.js.org/docs
- Storybook for React + Vite: https://storybook.js.org/docs/get-started/frameworks/react-vite
- Storybook 9 릴리스 노트: https://storybook.js.org/blog/storybook-9/
- CSF 3.0 (Component Story Format): https://storybook.js.org/docs/api/csf

### 14.3 외부 도구

- Chromatic (시각 테스트): https://www.chromatic.com/
- @storybook/addon-a11y: https://storybook.js.org/addons/@storybook/addon-a11y
- Vitest 통합: https://storybook.js.org/docs/writing-tests/vitest-plugin

---

## Changelog

**v1.0 (2026.04)**
- 초기 버전
- Storybook 9+ React + Vite 기반
- 5개 언어 전환 데코레이터
- 4개 디자인 시스템 MD 통합
- 카탈로그 자동 문서화 패턴
- CI/CD 자동 배포 가이드

---

**문서 끝.** Storybook은 컴포넌트 카탈로그를 살아있는 도구로 만든다. 디자이너는 만져보고, 개발자는 자동 테스트로 검증하고, PM은 PR마다 미리보기 URL로 검수한다.
