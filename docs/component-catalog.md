# daejeon/slow — 컴포넌트 카탈로그

> 대전 원도심 로컬 가이드 웹서비스의 UI 컴포넌트 라이브러리
> **재사용 가능한 컴포넌트 정의 + Props 명세 + 사용 예시**
> 최종 수정: 2026년 4월 (v1.0)
>
> **📎 관련 문서**
> - [color-system.md](./color-system.md) — 컬러 토큰
> - [font-system.md](./font-system.md) — 폰트 토큰
> - [layout-system.md](./layout-system.md) — 레이아웃, BlobMask 컴포넌트

---

## 0. 이 문서의 목적

Claude Code가 컴포넌트를 새로 만들 때 **"이미 있는 것을 다시 만들지 않도록"** 하는 카탈로그.

다음을 정의한다:
- 재사용 가능한 컴포넌트 목록
- 각 컴포넌트의 Props 명세
- Variant (변형) 패턴
- 사용 예시 코드
- 언제 쓰고 언제 안 쓰는지

**원칙**: 새 컴포넌트를 만들기 전에 이 문서를 먼저 확인. 비슷한 게 있으면 새로 만들지 말고 기존 것을 확장.

---

## 1. 컴포넌트 분류 체계

### 1.1 4단계 계층

```
Atoms (원자)        — Button, Tag, Badge, Icon
  ↓
Molecules (분자)    — Card, FormField, NavItem
  ↓
Organisms (조직)    — Header, SpotCard, RouteTimeline
  ↓
Templates (템플릿)  — HomeLayout, SpotDetailLayout
```

### 1.2 명명 규칙

- **PascalCase**: 컴포넌트 이름 (`SpotCard`, `LanguageSwitcher`)
- **kebab-case**: CSS 클래스 (`.spot-card`, `.lang-switcher`)
- **BEM**: 자식 요소·변형 (`.spot-card__title`, `.btn--primary`)

### 1.3 파일 구조

```
src/components/
├── atoms/
│   ├── Button.tsx
│   ├── Tag.tsx
│   └── Badge.tsx
├── molecules/
│   ├── Card.tsx
│   ├── BlobMask.tsx       (layout-system.md 참조)
│   └── FieldNote.tsx
├── organisms/
│   ├── Header.tsx
│   ├── SpotCard.tsx
│   └── RouteTimeline.tsx
└── templates/
    ├── HomeLayout.tsx
    └── SpotDetailLayout.tsx
```

---

## 2. Atoms — 가장 작은 단위

### 2.1 Button

가장 자주 쓰이는 컴포넌트. 모든 클릭 가능 액션의 기본.

#### Props 명세

```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  children: ReactNode;
}
```

#### Variants

| Variant | 배경 | 텍스트 | 용도 |
|---------|-----|------|------|
| `primary` | `--lav-500` | `--ink` | 메인 CTA (Begin the walk) |
| `secondary` | `--white` + border | `--ink` | 보조 액션 (See map) |
| `ghost` | transparent | `--lav-600` | 텍스트 링크 같은 가벼운 액션 |
| `dark` | `--ink` | `--white` | Dark 섹션 위 CTA (Field Note 안) |

#### Sizes

| Size | Padding | Font Size | 용도 |
|------|---------|-----------|------|
| `sm` | 8px 16px | 12px | 컴팩트 영역, 카드 안 |
| `md` | 12px 24px | 14px | 기본값 |
| `lg` | 16px 32px | 15px | 히어로 CTA |

#### 구현

```tsx
// src/components/atoms/Button.tsx
import { ReactNode } from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  iconPosition = 'right',
  disabled = false,
  loading = false,
  onClick,
  children,
}: ButtonProps) {
  return (
    <button
      className={`btn btn--${variant} btn--${size} ${fullWidth ? 'btn--full' : ''}`}
      disabled={disabled || loading}
      onClick={onClick}
      aria-busy={loading}
    >
      {icon && iconPosition === 'left' && <span className="btn__icon">{icon}</span>}
      <span className="btn__label">{children}</span>
      {icon && iconPosition === 'right' && <span className="btn__icon">{icon}</span>}
    </button>
  );
}
```

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  border-radius: 30px;
  font-family: inherit;
  font-weight: var(--fw-ui);
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;
  border: none;
  min-height: 44px;
}

.btn:active {
  transform: scale(0.98);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Variants */
.btn--primary {
  background: var(--lav-500);
  color: var(--ink);
}
.btn--primary:hover { background: var(--lav-600); color: var(--white); }

.btn--secondary {
  background: var(--white);
  color: var(--ink);
  border: 1px solid var(--color-border-subtle);
}
.btn--secondary:hover { background: var(--silver-veil); }

.btn--ghost {
  background: transparent;
  color: var(--lav-600);
}
.btn--ghost:hover { background: var(--lav-50); }

.btn--dark {
  background: var(--ink);
  color: var(--white);
}
.btn--dark:hover { background: #2A2A4A; }

/* Sizes */
.btn--sm { padding: 8px 16px; font-size: 12px; min-height: 36px; }
.btn--md { padding: 12px 24px; font-size: 14px; }
.btn--lg { padding: 16px 32px; font-size: 15px; min-height: 52px; }

.btn--full { width: 100%; }
```

#### 사용 예시

```tsx
// 메인 CTA
<Button variant="primary" size="lg" icon={<ArrowUpRightIcon />}>
  Begin the walk
</Button>

// 보조 액션
<Button variant="secondary">See map</Button>

// 가벼운 텍스트 링크
<Button variant="ghost" size="sm">Read more</Button>

// Dark 섹션 안 (Field Note)
<Button variant="dark">View source</Button>

// 모바일 전체 폭
<Button variant="primary" fullWidth>길찾기</Button>
```

#### 언제 쓰지 말까

- 단순 텍스트 링크는 `<a>` 태그 직접 사용 (Button은 액션용)
- 아이콘만 있는 경우는 `IconButton` 별도 컴포넌트 (아래 참조)

---

### 2.2 IconButton

아이콘만 있는 정사각형 버튼. 닫기·메뉴·뒤로가기 등에 사용.

```tsx
interface IconButtonProps {
  icon: ReactNode;
  label: string;        // aria-label 필수
  variant?: 'default' | 'subtle';
  size?: 'sm' | 'md';
  onClick?: () => void;
}

export function IconButton({ icon, label, variant = 'default', size = 'md', onClick }: IconButtonProps) {
  return (
    <button
      className={`icon-btn icon-btn--${variant} icon-btn--${size}`}
      aria-label={label}
      onClick={onClick}
    >
      {icon}
    </button>
  );
}
```

```css
.icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
}

.icon-btn--default { color: var(--ink); }
.icon-btn--default:hover { background: var(--silver-veil); }

.icon-btn--subtle { color: var(--slate); }

.icon-btn--sm { width: 36px; height: 36px; }
.icon-btn--md { width: 44px; height: 44px; }
```

---

### 2.3 Tag

카테고리·상태·메타 정보를 표시하는 작은 라벨.

#### Variants

| Variant | 배경 | 텍스트 | 용도 |
|---------|-----|------|------|
| `heritage` | `--lav-50` | `--lav-800` | Heritage 카테고리 |
| `market` | `--pink-50` | `--pink-800` | Market 카테고리 |
| `food` | `--yel-50` | `--yel-800` | Food 카테고리 |
| `story` | `--lav-100` | `--lav-800` | Story 카테고리 |
| `alleys` | `--pink-100` | `--pink-800` | Alleys 카테고리 |
| `nature` | `--yel-100` + border | `--yel-900` | Nature 카테고리 |
| `meta` | `--silver-veil` | `--slate` | 일반 메타 정보 (시간·거리) |
| `accent` | `--yel-500` | `--ink` | 강조 (NEW, HOT) |

#### 구현

```tsx
interface TagProps {
  variant: 'heritage' | 'market' | 'food' | 'story' | 'alleys' | 'nature' | 'meta' | 'accent';
  size?: 'sm' | 'md';
  icon?: ReactNode;
  children: ReactNode;
}

export function Tag({ variant, size = 'md', icon, children }: TagProps) {
  return (
    <span className={`tag tag--${variant} tag--${size}`}>
      {icon && <span className="tag__icon">{icon}</span>}
      {children}
    </span>
  );
}
```

```css
.tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  border-radius: 20px;
  font-weight: var(--fw-ui);
  letter-spacing: 0.5px;
  text-transform: uppercase;
  white-space: nowrap;
}

.tag--sm { padding: 3px 9px; font-size: 10px; }
.tag--md { padding: 4px 12px; font-size: 11px; }

/* Category variants */
.tag--heritage { background: var(--lav-50); color: var(--lav-800); }
.tag--market   { background: var(--pink-50); color: var(--pink-800); }
.tag--food     { background: var(--yel-50); color: var(--yel-800); }
.tag--story    { background: var(--lav-100); color: var(--lav-800); }
.tag--alleys   { background: var(--pink-100); color: var(--pink-800); }
.tag--nature   { background: var(--yel-100); color: var(--yel-900); border: 1px solid var(--yel-500); }

.tag--meta   { background: var(--silver-veil); color: var(--slate); }
.tag--accent { background: var(--yel-500); color: var(--ink); }
```

#### 사용 예시

```tsx
// 카테고리 표시
<Tag variant="heritage">● Heritage</Tag>
<Tag variant="market">● Market</Tag>

// 메타 정보
<Tag variant="meta" icon="🚶">5 min</Tag>
<Tag variant="meta">FREE</Tag>

// 강조
<Tag variant="accent" size="sm">NEW</Tag>
```

---

### 2.4 Badge

카테고리 컬러의 원형 dot. Tag보다 더 압축된 표시.

```tsx
interface BadgeProps {
  category: 'heritage' | 'market' | 'food' | 'story' | 'alleys' | 'nature';
  size?: 'sm' | 'md' | 'lg';
}

export function Badge({ category, size = 'md' }: BadgeProps) {
  return <span className={`badge badge--${category} badge--${size}`} />;
}
```

```css
.badge {
  display: inline-block;
  border-radius: 50%;
  flex-shrink: 0;
}

.badge--sm { width: 6px; height: 6px; }
.badge--md { width: 10px; height: 10px; }
.badge--lg { width: 14px; height: 14px; }

.badge--heritage { background: var(--lav-500); }
.badge--market   { background: var(--pink-500); }
.badge--food     { background: var(--yel-500); }
.badge--story    { background: var(--lav-300, var(--lav-200)); }
.badge--alleys   { background: var(--pink-300, var(--pink-100)); }
.badge--nature   { background: var(--yel-500); border: 1px solid var(--lav-500); }
```

---

### 2.5 NumberMarker

스팟 순번을 표시하는 원형 마커. 루트 타임라인·스팟 카드에 사용.

```tsx
interface NumberMarkerProps {
  number: number | string;
  variant?: 'lavender' | 'pink' | 'yellow' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

export function NumberMarker({ number, variant = 'lavender', size = 'md' }: NumberMarkerProps) {
  return (
    <span className={`num-marker num-marker--${variant} num-marker--${size}`}>
      {number}
    </span>
  );
}
```

```css
.num-marker {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-family: var(--font-serif);
  font-weight: var(--fw-ui);
  flex-shrink: 0;
}

.num-marker--sm { width: 28px; height: 28px; font-size: 12px; }
.num-marker--md { width: 36px; height: 36px; font-size: 14px; }
.num-marker--lg { width: 48px; height: 48px; font-size: 18px; }

.num-marker--lavender { background: var(--lav-500); color: var(--ink); }
.num-marker--pink     { background: var(--pink-500); color: var(--ink); }
.num-marker--yellow   { background: var(--yel-500); color: var(--ink); }
.num-marker--dark     { background: var(--ink); color: var(--white); }
```

---

## 3. Molecules — 조합 단위

### 3.1 Card (Generic)

가장 일반적인 카드 컨테이너. SpotCard, FieldNote 등의 베이스가 됨.

```tsx
interface CardProps {
  variant?: 'default' | 'tinted' | 'dark';
  tint?: 'lavender' | 'pink' | 'yellow';
  padding?: 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  children: ReactNode;
}

export function Card({ 
  variant = 'default', 
  tint, 
  padding = 'md', 
  hoverable = false, 
  children 
}: CardProps) {
  const tintClass = variant === 'tinted' && tint ? `card--tint-${tint}` : '';
  return (
    <div className={`card card--${variant} card--p-${padding} ${tintClass} ${hoverable ? 'card--hoverable' : ''}`}>
      {children}
    </div>
  );
}
```

```css
.card {
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  transition: transform 0.2s, box-shadow 0.2s;
}

.card--default {
  background: var(--white);
  border: 0.5px solid var(--color-border-subtle);
}

.card--tinted {
  border: none;
}
.card--tint-lavender { background: var(--lav-50); }
.card--tint-pink     { background: var(--pink-50); }
.card--tint-yellow   { background: var(--yel-50); }

.card--dark {
  background: var(--ink);
  color: var(--white);
}

.card--p-sm { padding: var(--space-4); }
.card--p-md { padding: var(--space-5); }
.card--p-lg { padding: var(--space-6); }

.card--hoverable:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(26, 26, 46, 0.08);
}
```

---

### 3.2 LanguageSwitcher

5개 언어 전환 드롭다운. 헤더 우측 고정.

```tsx
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const LANGS = [
  { code: 'en', label: 'English' },
  { code: 'ja', label: '日本語' },
  { code: 'ko', label: '한국어' },
  { code: 'es', label: 'Español' },
  { code: 'zh', label: '中文' },
] as const;

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const current = LANGS.find(l => l.code === i18n.language) ?? LANGS[0];

  return (
    <div className="lang-switcher">
      <button
        className="lang-switcher__trigger"
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span aria-hidden>🌐</span>
        <span>{current.label}</span>
        <span className="lang-switcher__chevron">▾</span>
      </button>
      
      {open && (
        <ul className="lang-switcher__menu" role="listbox">
          {LANGS.map(lang => (
            <li key={lang.code}>
              <button
                className={i18n.language === lang.code ? 'active' : ''}
                onClick={() => {
                  i18n.changeLanguage(lang.code);
                  setOpen(false);
                }}
              >
                {lang.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

```css
.lang-switcher { position: relative; }

.lang-switcher__trigger {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: var(--ink);
  color: var(--white);
  border: none;
  border-radius: 20px;
  font-size: 12px;
  font-weight: var(--fw-ui);
  cursor: pointer;
}

.lang-switcher__menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 160px;
  background: var(--white);
  border: 0.5px solid var(--color-border-subtle);
  border-radius: 14px;
  padding: 6px;
  box-shadow: 0 8px 24px rgba(26, 26, 46, 0.12);
  list-style: none;
}

.lang-switcher__menu button {
  display: block;
  width: 100%;
  padding: 8px 12px;
  background: transparent;
  border: none;
  text-align: left;
  border-radius: 8px;
  cursor: pointer;
  color: var(--ink);
  font-size: 13px;
}

.lang-switcher__menu button:hover { background: var(--silver-veil); }
.lang-switcher__menu button.active { background: var(--lav-50); color: var(--lav-800); font-weight: var(--fw-ui); }
```

---

### 3.3 Avatar

사람의 이니셜 또는 사진. Field Note 인용자 표시 등에 사용.

```tsx
interface AvatarProps {
  initials?: string;
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'pink' | 'lavender' | 'yellow';
}

export function Avatar({ initials, src, alt, size = 'md', variant = 'pink' }: AvatarProps) {
  if (src) {
    return <img className={`avatar avatar--${size}`} src={src} alt={alt ?? initials ?? ''} />;
  }
  return (
    <div className={`avatar avatar--initial avatar--${size} avatar--${variant}`}>
      {initials}
    </div>
  );
}
```

```css
.avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-family: var(--font-serif);
  font-weight: var(--fw-ui);
  flex-shrink: 0;
  overflow: hidden;
}

.avatar--sm { width: 24px; height: 24px; font-size: 11px; }
.avatar--md { width: 32px; height: 32px; font-size: 13px; }
.avatar--lg { width: 48px; height: 48px; font-size: 18px; }

.avatar--pink     { background: var(--pink-500); color: var(--pink-900); }
.avatar--lavender { background: var(--lav-500); color: var(--ink); }
.avatar--yellow   { background: var(--yel-500); color: var(--ink); }

img.avatar { object-fit: cover; }
```

---

### 3.4 InfoRow

키-값 쌍을 표시하는 가로 행. 스팟 상세 사이드바에 사용.

```tsx
interface InfoRowProps {
  icon?: ReactNode;
  label: string;
  value: ReactNode;
}

export function InfoRow({ icon, label, value }: InfoRowProps) {
  return (
    <div className="info-row">
      {icon && <span className="info-row__icon">{icon}</span>}
      <span className="info-row__label">{label}</span>
      <span className="info-row__value">{value}</span>
    </div>
  );
}
```

```css
.info-row {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) 0;
  border-bottom: 0.5px solid var(--color-border-subtle);
}

.info-row__icon {
  width: 20px;
  height: 20px;
  color: var(--slate);
}

.info-row__label {
  font-size: 12px;
  color: var(--slate);
  letter-spacing: 0.5px;
}

.info-row__value {
  font-size: 13px;
  color: var(--ink);
  font-weight: var(--fw-ui);
}
```

---

## 4. Organisms — 페이지 단위 컴포넌트

### 4.1 Header

상단 sticky 네비게이션. 로고 + 메뉴 + 언어 전환.

```tsx
interface HeaderProps {
  variant?: 'transparent' | 'solid';
}

export function Header({ variant = 'transparent' }: HeaderProps) {
  return (
    <header className={`header header--${variant}`}>
      <div className="container header__inner">
        <a href="/" className="header__logo" aria-label="daejeon/slow 홈">
          <Logo />
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
```

```css
.header {
  position: sticky;
  top: 0;
  z-index: var(--z-header);
  height: 80px;
  display: flex;
  align-items: center;
  transition: background 0.2s, box-shadow 0.2s;
}

.header--transparent { background: transparent; }
.header--solid { 
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 1px 0 var(--color-border-subtle);
}

.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.header__logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-serif);
  font-size: 17px;
  font-weight: var(--fw-ui);
  color: var(--ink);
  text-decoration: none;
}

.header__nav {
  display: none;
  gap: var(--space-6);
}

.header__nav a {
  color: var(--slate);
  font-size: 13px;
  text-decoration: none;
  transition: color 0.2s;
}

.header__nav a:hover { color: var(--ink); }

@media (min-width: 1024px) {
  .header__nav { display: flex; }
}

@media (max-width: 1023px) {
  .header { height: 56px; }
}
```

---

### 4.2 SpotCard

스팟 정보를 표시하는 카드. **BlobMask 컴포넌트와 결합**해서 사용.

```tsx
import { BlobMask } from './BlobMask';
import { Tag } from '../atoms/Tag';
import { Badge } from '../atoms/Badge';

type Category = 'heritage' | 'market' | 'food' | 'story' | 'alleys' | 'nature';

interface Spot {
  id: string;
  category: Category;
  shape: 'heritage' | 'market' | 'nature';  // 블롭 쉐이프 (3종)
  name: string;
  description: string;
  walkTime: number;
  imageSrc: string;
  imageAlt: string;
}

interface SpotCardProps {
  spot: Spot;
  variant?: 'default' | 'compact';
  onClick?: () => void;
}

export function SpotCard({ spot, variant = 'default', onClick }: SpotCardProps) {
  return (
    <article 
      className={`spot-card spot-card--${variant}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="spot-card__visual">
        <BlobMask shape={spot.shape} src={spot.imageSrc} alt={spot.imageAlt} />
      </div>

      <div className="spot-card__body">
        <div className="spot-card__meta">
          <Badge category={spot.category} size="sm" />
          <span className="spot-card__category">{spot.category}</span>
          <span className="spot-card__separator" aria-hidden>·</span>
          <span className="spot-card__time">🚶 {spot.walkTime} min</span>
        </div>

        <h3 className="spot-card__title">{spot.name}</h3>
        <p className="spot-card__desc">{spot.description}</p>
      </div>
    </article>
  );
}
```

```css
.spot-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  cursor: pointer;
}

.spot-card__visual {
  width: 100%;
  aspect-ratio: 1 / 1;
}

.spot-card__meta {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: 11px;
  color: var(--slate);
  letter-spacing: 1px;
}

.spot-card__category {
  text-transform: uppercase;
  font-weight: var(--fw-ui);
}

.spot-card__title {
  font-family: var(--font-serif);
  font-size: 22px;
  font-weight: var(--fw-title);
  color: var(--ink);
  letter-spacing: -0.4px;
  margin: 6px 0 4px;
}

.spot-card__desc {
  font-size: 13px;
  color: var(--slate);
  line-height: 1.65;
}

/* Compact variant — 모바일 가로 레이아웃 */
.spot-card--compact {
  flex-direction: row;
  align-items: center;
  gap: var(--space-4);
}

.spot-card--compact .spot-card__visual {
  width: 100px;
  height: 100px;
  flex-shrink: 0;
}

.spot-card--compact .spot-card__title {
  font-size: 16px;
  margin: 4px 0 2px;
}
```

---

### 4.3 FieldNote

인용문·인터뷰 카드. Ink 다크 배경 + 노랑 강조어.

```tsx
interface FieldNoteProps {
  quote: string;
  highlight?: string;       // 노랑으로 강조할 단어
  author: {
    initials: string;
    name: string;
    role?: string;
  };
  ctaLabel?: string;
  onCtaClick?: () => void;
}

export function FieldNote({ quote, highlight, author, ctaLabel, onCtaClick }: FieldNoteProps) {
  // highlight 단어를 강조
  const renderQuote = () => {
    if (!highlight) return quote;
    const parts = quote.split(highlight);
    return (
      <>
        {parts[0]}
        <em>{highlight}</em>
        {parts.slice(1).join(highlight)}
      </>
    );
  };

  return (
    <Card variant="dark">
      <div className="field-note">
        <span className="field-note__label">THE FIELD NOTE</span>
        <blockquote className="field-note__quote">
          "{renderQuote()}"
        </blockquote>

        <div className="field-note__footer">
          <div className="field-note__author">
            <Avatar initials={author.initials} variant="pink" size="md" />
            <div>
              <div className="field-note__name">{author.name}</div>
              {author.role && <div className="field-note__role">{author.role}</div>}
            </div>
          </div>
          {ctaLabel && (
            <button className="field-note__cta" onClick={onCtaClick}>
              {ctaLabel} ↗
            </button>
          )}
        </div>
      </div>
    </Card>
  );
}
```

```css
.field-note {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  min-height: 480px;
  padding: var(--space-6) var(--space-5);
}

.field-note__label {
  font-size: 10px;
  letter-spacing: 3px;
  color: var(--yel-500);
  font-weight: var(--fw-ui);
}

.field-note__quote {
  font-family: var(--font-serif);
  font-size: clamp(20px, 3vw, 28px);
  line-height: 1.35;
  font-style: italic;
  color: var(--white);
  letter-spacing: -0.2px;
  margin: 0;
  flex: 1;
}

.field-note__quote em {
  color: var(--yel-500);
  font-weight: var(--fw-ui);
  font-style: normal;
}

/* CJK 언어는 이탤릭 해제 */
html[lang="ja"] .field-note__quote,
html[lang="ko"] .field-note__quote,
html[lang="zh"] .field-note__quote {
  font-style: normal;
}

.field-note__footer {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding-top: var(--space-4);
  border-top: 0.5px solid rgba(255, 255, 255, 0.15);
}

.field-note__author {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.field-note__name {
  font-size: 13px;
  font-weight: var(--fw-ui);
  color: var(--white);
}

.field-note__role {
  font-size: 11px;
  font-weight: var(--fw-meta);
  color: rgba(255, 255, 255, 0.6);
}

.field-note__cta {
  background: transparent;
  border: none;
  color: var(--lav-500);
  font-size: 22px;
  cursor: pointer;
}
```

#### 사용 예시

```tsx
<FieldNote
  quote="If you miss the 7am light on the railway bricks, you miss half the point."
  highlight="half the point"
  author={{ initials: 'M', name: 'Min-ji', role: 'local guide, 3rd generation' }}
  ctaLabel=""
  onCtaClick={() => navigate('/stories/min-ji')}
/>
```

---

### 4.4 RouteTimeline

루트의 6개 스팟을 순서대로 표시. 홈 페이지 하단 + 스팟 상세 페이지.

```tsx
interface RouteSpot {
  id: string;
  number: number;
  name: string;
  category: Category;
  walkTimeFromPrev?: number;
  isCurrent?: boolean;
}

interface RouteTimelineProps {
  spots: RouteSpot[];
  variant?: 'horizontal' | 'vertical';
  onSpotClick?: (id: string) => void;
}

export function RouteTimeline({ spots, variant = 'horizontal', onSpotClick }: RouteTimelineProps) {
  return (
    <ol className={`route-timeline route-timeline--${variant}`}>
      {spots.map((spot, idx) => (
        <li 
          key={spot.id} 
          className={`route-timeline__item ${spot.isCurrent ? 'is-current' : ''}`}
        >
          {idx > 0 && spot.walkTimeFromPrev && (
            <span className="route-timeline__connector">
              🚶 {spot.walkTimeFromPrev} min
            </span>
          )}
          <button
            className="route-timeline__spot"
            onClick={() => onSpotClick?.(spot.id)}
          >
            <NumberMarker 
              number={String(spot.number).padStart(2, '0')} 
              variant={spot.isCurrent ? 'lavender' : 'dark'}
            />
            <div>
              <Badge category={spot.category} size="sm" />
              <span className="route-timeline__name">{spot.name}</span>
            </div>
          </button>
        </li>
      ))}
    </ol>
  );
}
```

```css
.route-timeline {
  list-style: none;
  padding: 0;
  margin: 0;
}

/* Horizontal — PC */
.route-timeline--horizontal {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  flex-wrap: wrap;
}

/* Vertical — 모바일 / 사이드바 */
.route-timeline--vertical {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.route-timeline__connector {
  font-size: 10px;
  color: var(--slate);
  font-style: italic;
  font-family: var(--font-serif);
}

.route-timeline__spot {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}

.route-timeline__name {
  font-family: var(--font-serif);
  font-size: 14px;
  color: var(--ink);
}

.route-timeline__item.is-current .route-timeline__name {
  font-weight: var(--fw-title);
  color: var(--lav-800);
}
```

---

### 4.5 BottomSheet (Mobile only)

모바일 지도 페이지의 드래그 가능한 하단 시트.

```tsx
import { useState, useRef } from 'react';

interface BottomSheetProps {
  children: ReactNode;
  defaultHeight?: 'collapsed' | 'expanded';
}

export function BottomSheet({ children, defaultHeight = 'collapsed' }: BottomSheetProps) {
  const [expanded, setExpanded] = useState(defaultHeight === 'expanded');

  return (
    <div className={`bottom-sheet ${expanded ? 'is-expanded' : ''}`}>
      <button
        className="bottom-sheet__handle"
        onClick={() => setExpanded(!expanded)}
        aria-label={expanded ? '접기' : '펼치기'}
      >
        <span className="bottom-sheet__grip" />
      </button>
      <div className="bottom-sheet__content">{children}</div>
    </div>
  );
}
```

```css
.bottom-sheet {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: var(--z-sticky);
  background: var(--white);
  border-radius: 24px 24px 0 0;
  box-shadow: 0 -4px 20px rgba(26, 26, 46, 0.1);
  transition: height 0.3s cubic-bezier(0.32, 0.72, 0, 1);
  height: 45vh;
  overflow: hidden;
}

.bottom-sheet.is-expanded {
  height: 85vh;
}

.bottom-sheet__handle {
  width: 100%;
  padding: 12px 0 8px;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
}

.bottom-sheet__grip {
  width: 40px;
  height: 4px;
  background: var(--silver-veil);
  border-radius: 2px;
}

.bottom-sheet__content {
  padding: 0 var(--space-5) var(--space-6);
  overflow-y: auto;
  height: calc(100% - 32px);
}

/* PC에서는 숨김 */
@media (min-width: 1024px) {
  .bottom-sheet { display: none; }
}
```

---

## 5. Templates — 페이지 레이아웃

> Templates 자세한 구조는 [layout-system.md](./layout-system.md) 섹션 7 참조.
> 여기서는 Template 레벨에서 어떤 Component를 어떻게 조합하는지만 정의.

### 5.1 HomeLayout

```tsx
export function HomeLayout() {
  return (
    <>
      <Header />
      <main>
        <KVSection />              {/* layout-system.md 5.2 */}
        <ThreeAlleysSection />     {/* SpotCard 3개 */}
        <FieldNoteSection />        {/* FieldNote 컴포넌트 */}
        <FullRoutePreview />        {/* RouteTimeline */}
      </main>
      <Footer />
      <FloatingCTA />               {/* 모바일 only */}
    </>
  );
}
```

### 5.2 SpotDetailLayout

```tsx
export function SpotDetailLayout({ spot }: { spot: Spot }) {
  return (
    <>
      <Header variant="solid" />
      <Breadcrumb />
      <SpotHero spot={spot} />        {/* BlobMask 1개만 */}
      
      <div className="spot-detail-grid">
        <article className="spot-detail__main">
          <SpotBody />
          <Gallery />                  {/* 일반 사각 이미지들 */}
          <RelatedInfo />
        </article>
        
        <aside className="spot-detail__sidebar">
          <MapEmbed sticky />
          <InfoList />                 {/* InfoRow 여러 개 */}
          <ActionButtons />
        </aside>
      </div>

      <PrevNextNav />
      <Footer />
      <FloatingCTA />
    </>
  );
}
```

---

## 6. 컴포넌트 사용 결정 트리

새 UI 요소를 만들기 전에 이 순서로 확인:

```
1. 이게 클릭 가능한 단일 액션인가?
   YES → Button or IconButton 사용
   
2. 이게 정보 라벨/태그인가?
   YES → Tag 사용 (카테고리면 variant 매칭)
   
3. 이게 카드 컨테이너인가?
   YES → Card 사용 (variant: default/tinted/dark)
   
4. 이게 스팟 정보를 보여주는가?
   YES → SpotCard 사용 (BlobMask 자동 포함)
   
5. 이게 인용문/인터뷰인가?
   YES → FieldNote 사용
   
6. 이게 루트 순서를 보여주는가?
   YES → RouteTimeline 사용
   
7. 이중 어느 것도 아니다
   → 새 컴포넌트 만들고 이 문서에 추가
```

---

## 7. 컴포넌트 생성 시 체크리스트

### 7.1 새 컴포넌트 추가 전

- [ ] 비슷한 컴포넌트가 이미 있는지 카탈로그 확인
- [ ] 기존 컴포넌트의 variant 추가로 해결 가능한지 검토
- [ ] 정말 새 컴포넌트가 필요한지 판단

### 7.2 컴포넌트 작성 시

- [ ] Props 인터페이스 정의 (TypeScript)
- [ ] variant·size 패턴 따르기
- [ ] CSS 변수만 사용 (하드코딩 금지)
- [ ] 모바일·태블릿·PC 모두 검증
- [ ] 키보드 접근성 (Tab, Enter, Escape)
- [ ] aria-label·aria-expanded 등 ARIA 속성

### 7.3 카탈로그에 등록

- [ ] 이 문서에 컴포넌트 섹션 추가
- [ ] Props 명세 표
- [ ] Variant 표
- [ ] 구현 코드
- [ ] 사용 예시 최소 2개
- [ ] "언제 쓰지 말까" 가이드

---

## 8. Claude Code 작업 지시 템플릿

### 8.1 새 페이지 만들 때

```
"홈 페이지를 만들어줘.
docs/component-catalog.md 의 컴포넌트만 조합해서 사용.
- Header (variant transparent)
- KV 섹션은 layout-system.md 5.2 참조
- SpotCard 3개로 Three alleys 섹션
- FieldNote 컴포넌트로 인용 섹션
- 모바일은 FloatingCTA 추가"
```

### 8.2 새 컴포넌트 추가할 때

```
"docs/component-catalog.md 에 EventBanner 컴포넌트를 추가해줘.
- 노랑 배경 + Ink 텍스트
- variant: 'new' | 'hot' | 'limited'
- 닫기 버튼 옵션
- 카탈로그 형식 따라서 (Props, Variant, 구현, 사용 예시)
- 그리고 실제 컴포넌트 코드도 src/components/molecules/EventBanner.tsx 에 생성"
```

### 8.3 기존 컴포넌트 확장할 때

```
"docs/component-catalog.md 의 Button 컴포넌트에
'outline' variant 추가해줘.
- 배경 transparent, border 1px solid lav-500, 텍스트 lav-600
- hover 시 배경 lav-50
- 카탈로그도 함께 업데이트"
```

---

## 9. 컴포넌트 인덱스 (Quick Reference)

| 컴포넌트 | 카테고리 | 주 용도 |
|---------|---------|--------|
| `Button` | Atom | 모든 액션 |
| `IconButton` | Atom | 아이콘 단독 액션 |
| `Tag` | Atom | 카테고리·메타 라벨 |
| `Badge` | Atom | 카테고리 dot |
| `NumberMarker` | Atom | 순번 원형 |
| `Avatar` | Atom | 사람 표시 |
| `Card` | Molecule | 일반 카드 컨테이너 |
| `BlobMask` | Molecule | 이미지 블롭 마스크 (layout-system.md) |
| `LanguageSwitcher` | Molecule | 5개 언어 전환 |
| `InfoRow` | Molecule | 키-값 정보 행 |
| `Header` | Organism | 상단 sticky 네비 |
| `SpotCard` | Organism | 스팟 카드 (BlobMask 포함) |
| `FieldNote` | Organism | 인용·인터뷰 카드 |
| `RouteTimeline` | Organism | 루트 6스팟 타임라인 |
| `BottomSheet` | Organism | 모바일 드래그 시트 |

---

## 10. 참고 자료

### 10.1 관련 내부 문서

- **컬러 시스템**: [color-system.md](./color-system.md)
- **폰트 시스템**: [font-system.md](./font-system.md)
- **레이아웃 시스템**: [layout-system.md](./layout-system.md)

### 10.2 외부 자료

- Atomic Design by Brad Frost: https://atomicdesign.bradfrost.com/
- BEM 방법론: https://getbem.com/
- ARIA Authoring Practices: https://www.w3.org/WAI/ARIA/apg/

---

## Changelog

**v1.0 (2026.04)**
- 초기 버전
- Atoms 5종, Molecules 5종, Organisms 5종, Templates 2종 정의
- 컴포넌트 결정 트리 + Claude Code 작업 지시 템플릿

---

**문서 끝.** 새 UI 요소를 만들기 전에 이 카탈로그부터 확인하기. 비슷한 게 있으면 그걸 쓰고, 없으면 만들어서 카탈로그에 추가.
