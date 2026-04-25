# daejeon/slow — 레이아웃 시스템

> 대전 원도심 로컬 가이드 웹서비스의 반응형 레이아웃 규칙
> **B안 Anti-Grid Organic 레이아웃 + 3가지 블롭 쉐이프 마스크**
> PC에서는 KV 이미지가 주인공, 모바일에서는 가독성이 주인공
> 최종 수정: 2026년 4월 (v1.0)
>
> **📎 관련 문서**
> - [color-system.md](./color-system.md) — 컬러 값
> - [font-system.md](./font-system.md) — 타이포그래피
>
> **📎 Asset 파일**
> - `/assets/shapes/shape-heritage.svg`
> - `/assets/shapes/shape-market.svg`
> - `/assets/shapes/shape-nature.svg`

---

## 0. 이 문서의 목적

Claude Code와 개발자가 공통으로 참조하는 **레이아웃 + 비주얼 규칙서**.

다음을 정의한다:
- B안 Anti-Grid Organic 디자인 원칙
- 3가지 블롭 쉐이프 마스크 시스템
- 브레이크포인트와 그리드
- KV (Key Visual) 섹션 구성
- 페이지 타입별 레이아웃 패턴
- 모바일 가독성 최우선 규칙

**이 문서가 다루지 않는 것**: 컬러 값, 폰트 크기. 각각 별도 문서 참조.

---

## 1. 핵심 원칙 — B안 Anti-Grid Organic

### 1.1 디자인 방향

**B안 Anti-Grid Organic** — 엄격한 사각 그리드 대신 유기적 곡선과 비대칭 배치로 자연스러운 흐름을 만든다. 대전 원도심의 "오래된 골목, 굽은 길, 손맛"이라는 정서를 시각 언어로 옮긴 것.

### 1.2 5가지 디자인 원칙

| 원칙 | 의미 |
|------|------|
| **Anti-Grid** | 엄격한 12컬럼 그리드 대신 비대칭 자유 배치 (특히 KV·강조 섹션) |
| **Organic Shapes** | 사각형 대신 블롭·곡선 마스크로 이미지 표현 |
| **Strategic Rotation** | 1~3도의 미세한 회전으로 살아있는 느낌 |
| **Generous Whitespace** | 여백 자체가 콘텐츠. PC에서 과감하게 비움 |
| **One Hero Per Screen** | 한 화면에 주인공 하나. 블롭 마스크가 그 역할 |

### 1.3 두 개의 얼굴

| 디바이스 | 우선순위 | 디자인 |
|---------|---------|------|
| **PC (1024px↑)** | 비주얼 임팩트 | Anti-Grid 비대칭, 큰 KV, 풍부한 여백, 에디토리얼 |
| **모바일 (< 768px)** | 가독성 + 속도 | 세로 스택, 큰 텍스트, 한 손 스크롤, 단순한 블롭 1개 |
| **태블릿 (768~1023px)** | 중간 지대 | PC의 단순화 버전 |

### 1.4 왜 PC와 모바일이 다른가

**PC**: 집·사무실에서 여행 계획 → 이미지 임팩트가 핵심  
**모바일**: 현장에서 걸으며 사용 → 빠른 정보 접근이 핵심

같은 사이트인데 사용 맥락이 완전히 다르다. 그래서 모바일은 PC의 축소판이 아니라 **다른 우선순위의 디자인**.

---

## 2. 3가지 블롭 쉐이프 시스템

### 2.1 핵심 아이디어

스팟 이미지를 일반 사각 프레임이 아닌 **유기적 블롭 형태로 마스킹**한다. 3가지 쉐이프를 카테고리에 고정 매핑.

### 2.2 쉐이프 ↔ 카테고리 매핑

| Shape Key | 파일 | 카테고리 | 형태 의미 |
|-----------|------|---------|---------|
| **`heritage`** | `shape-heritage.svg` | Heritage (건축·역사) | 윗부분 둥근 사각형 + 아래 두 반원 → **나란한 두 지붕** |
| **`market`** | `shape-market.svg` | Market (시장) | 아래 4개 반원 파도 → **늘어선 좌판** |
| **`nature`** | `shape-nature.svg` | Nature (자연) | 좌우 비대칭 유기체 → **굽은 산 능선과 나무** |

### 2.3 SVG Path 원본 (모두 viewBox 0 0 170 170)

#### Heritage
```svg
<svg viewBox="0 0 170 170" xmlns="http://www.w3.org/2000/svg">
  <path d="M127.5 0C150.972 0 170 19.0279 170 42.5V127.5C170 150.972 150.972 170 127.5 170C104.028 170 85 150.972 85 127.5C85 150.972 65.9721 170 42.5 170C19.0279 170 0 150.972 0 127.5V42.5C0 19.0279 19.0279 0 42.5 0C65.9721 0 85 19.0279 85 42.5C85 19.0279 104.028 0 127.5 0Z"/>
</svg>
```

#### Market
```svg
<svg viewBox="0 0 170 170" xmlns="http://www.w3.org/2000/svg">
  <path d="M127.5 0C150.972 6.4426e-07 170 19.0279 170 42.5V141.667C170 157.315 157.315 170 141.667 170C126.019 170 113.333 157.315 113.333 141.667C113.333 157.315 100.648 170 85 170C69.352 170 56.6672 157.315 56.667 141.667C56.6668 157.315 43.981 170 28.333 170C12.6852 170 0.000172283 157.315 0 141.667V42.5C0 19.0279 19.0279 0 42.5 0C65.9721 6.4426e-07 85 19.0279 85 42.5L85.0137 41.4033C85.5953 18.4381 104.395 0 127.5 0Z"/>
</svg>
```

#### Nature
```svg
<svg viewBox="0 0 170 170" xmlns="http://www.w3.org/2000/svg">
  <path d="M44.9209 0C61.141 1.41801e-06 75.1064 9.65447 81.3838 23.5303C89.1902 9.49643 104.168 1.9672e-05 121.366 0H127.461C150.955 0.000126455 170 19.0454 170 42.5391C170 66.0328 150.955 85.079 127.461 85.0791H127.539C150.989 85.0791 170 104.089 170 127.539C170 150.989 150.989 170 127.539 170H121.366C104.168 170 89.1901 160.503 81.3838 146.469C75.1065 160.345 61.1413 170 44.9209 170H40C17.9086 170 2.16207e-06 152.091 0 130V40C1.93129e-06 17.9086 17.9086 -1.93129e-06 40 0H44.9209Z"/>
</svg>
```

### 2.4 React 컴포넌트 구현

```tsx
// src/components/BlobMask.tsx
type ShapeKey = 'heritage' | 'market' | 'nature';

const SHAPES: Record<ShapeKey, string> = {
  heritage: "M127.5 0C150.972 0 170 19.0279 170 42.5V127.5C170 150.972 150.972 170 127.5 170C104.028 170 85 150.972 85 127.5C85 150.972 65.9721 170 42.5 170C19.0279 170 0 150.972 0 127.5V42.5C0 19.0279 19.0279 0 42.5 0C65.9721 0 85 19.0279 85 42.5C85 19.0279 104.028 0 127.5 0Z",
  market: "M127.5 0C150.972 6.4426e-07 170 19.0279 170 42.5V141.667C170 157.315 157.315 170 141.667 170C126.019 170 113.333 157.315 113.333 141.667C113.333 157.315 100.648 170 85 170C69.352 170 56.6672 157.315 56.667 141.667C56.6668 157.315 43.981 170 28.333 170C12.6852 170 0.000172283 157.315 0 141.667V42.5C0 19.0279 19.0279 0 42.5 0C65.9721 6.4426e-07 85 19.0279 85 42.5L85.0137 41.4033C85.5953 18.4381 104.395 0 127.5 0Z",
  nature: "M44.9209 0C61.141 1.41801e-06 75.1064 9.65447 81.3838 23.5303C89.1902 9.49643 104.168 1.9672e-05 121.366 0H127.461C150.955 0.000126455 170 19.0454 170 42.5391C170 66.0328 150.955 85.079 127.461 85.0791H127.539C150.989 85.0791 170 104.089 170 127.539C170 150.989 150.989 170 127.539 170H121.366C104.168 170 89.1901 160.503 81.3838 146.469C75.1065 160.345 61.1413 170 44.9209 170H40C17.9086 170 2.16207e-06 152.091 0 130V40C1.93129e-06 17.9086 17.9086 -1.93129e-06 40 0H44.9209Z",
};

interface BlobMaskProps {
  shape: ShapeKey;
  src: string;
  alt: string;
  className?: string;
}

export function BlobMask({ shape, src, alt, className = '' }: BlobMaskProps) {
  const clipId = `clip-${shape}-${Math.random().toString(36).slice(2, 9)}`;

  return (
    <div className={`blob-mask blob-mask--${shape} ${className}`}>
      <svg viewBox="0 0 170 170" preserveAspectRatio="xMidYMid meet">
        <defs>
          <clipPath id={clipId}>
            <path d={SHAPES[shape]} />
          </clipPath>
        </defs>
        <image
          href={src}
          width="170"
          height="170"
          preserveAspectRatio="xMidYMid slice"
          clipPath={`url(#${clipId})`}
        />
      </svg>
      <span className="sr-only">{alt}</span>
    </div>
  );
}
```

### 2.5 BlobMask CSS

```css
.blob-mask {
  aspect-ratio: 1 / 1;
  width: 100%;
  position: relative;
}

.blob-mask svg {
  width: 100%;
  height: 100%;
  display: block;
  overflow: visible;
}

/* 카테고리별 placeholder 배경 */
.blob-mask--heritage svg { background: var(--lav-100); }
.blob-mask--market svg   { background: var(--pink-100); }
.blob-mask--nature svg   { background: var(--yel-100); }

/* 살짝 회전 */
.blob-mask--heritage { transform: rotate(-2deg); }
.blob-mask--market   { transform: rotate(1.5deg); }
.blob-mask--nature   { transform: rotate(-1deg); }

@media (prefers-reduced-motion: reduce) {
  .blob-mask { transform: none !important; }
}
```

### 2.6 사용 예시

```tsx
<article className="spot-card">
  <BlobMask 
    shape="heritage"
    src="/photos/soje-dong.jpg"
    alt="소제동 철도관사촌의 붉은 벽돌 골목"
  />
  <h3>Soje-dong</h3>
  <p>Railway village, now cafés.</p>
</article>

<article className="spot-card">
  <BlobMask 
    shape="market"
    src="/photos/jungang-market.jpg"
    alt="중앙시장 좌판 풍경"
  />
  <h3>Jungang Market</h3>
  <p>Since 1905, still loud.</p>
</article>

<article className="spot-card">
  <BlobMask 
    shape="nature"
    src="/photos/bomunsan.jpg"
    alt="보문산 능선의 소나무 숲"
  />
  <h3>Bomunsan</h3>
  <p>A pine forest downtown.</p>
</article>
```

### 2.7 쉐이프 사용 원칙

**✓ 하기**
- 카테고리 ↔ 쉐이프 **고정 매핑** (Heritage는 항상 H, Market은 항상 M, Nature는 항상 K)
- 이미지 로드 전 카테고리 컬러 tint 배경으로 placeholder
- 1~3도 미세 회전으로 유기적 느낌 유지

**✗ 피하기**
- 무작위로 쉐이프 바꾸기 (일관성 붕괴)
- 쉐이프에 그림자·테두리 추가 (쉐이프 자체가 충분히 강한 형태)
- 5도 이상 회전 (가독성 저하)
- 한 화면에 같은 카테고리 블롭 3개 이상 반복 (시각 피로)

---

## 3. 브레이크포인트

```css
/* Mobile first */
@media (min-width: 768px)  { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1440px) { /* Large Desktop */ }
```

```css
:root {
  --bp-tablet: 768px;
  --bp-desktop: 1024px;
  --bp-large: 1440px;
}
```

**왜 768 / 1024 / 1440인가**
- 768px: iPad Mini 세로 폭, 태블릿 분기점
- 1024px: 노트북 최소 실사용 폭 — KV가 의미 있게 커지는 경계
- 1440px: 13~15인치 노트북, 일반 데스크톱

---

## 4. 그리드 시스템 — Anti-Grid 적용

### 4.1 두 가지 모드

**Standard Grid** — 카드 리스트, 정보 중심 섹션  
**Anti-Grid** — KV, 강조 섹션, 페이지당 1~2회만

### 4.2 컨테이너 폭

```css
.container {
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
}

@media (min-width: 768px) {
  .container { padding: 0 32px; max-width: 768px; }
}

@media (min-width: 1024px) {
  .container { padding: 0 40px; max-width: 1200px; }
}

@media (min-width: 1440px) {
  .container { max-width: 1360px; }
}
```

### 4.3 Standard Grid

```css
.grid {
  display: grid;
  gap: var(--space-5);
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .grid--2col { grid-template-columns: repeat(2, 1fr); gap: var(--space-6); }
}

@media (min-width: 1024px) {
  .grid--3col { grid-template-columns: repeat(3, 1fr); gap: var(--space-6); }
  .grid--asymmetric { grid-template-columns: 2fr 1fr; gap: var(--space-7); }
  .grid--asymmetric-reverse { grid-template-columns: 1fr 2fr; gap: var(--space-7); }
}
```

### 4.4 Anti-Grid Mode

`.container` 폭 제약을 깨고 전체 폭 + 절대 위치 배치:

```css
.anti-grid {
  width: 100%;
  position: relative;
  padding: var(--space-9) 0;
  overflow: hidden;
}

.anti-grid__text {
  max-width: 520px;
  padding-left: max(40px, calc((100vw - 1200px) / 2 + 40px));
}

.anti-grid__visual {
  position: absolute;  /* 자유 배치 */
}
```

### 4.5 8pt 간격 시스템

```css
:root {
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
}
```

**섹션 간 수직 간격**:
- 모바일: `var(--space-7)` = 48px
- 태블릿: `var(--space-8)` = 64px
- PC 일반: `var(--space-9)` = 96px
- PC Anti-Grid: `var(--space-10)` = 128px

---

## 5. KV (Key Visual) 섹션

### 5.1 KV의 역할

랜딩 페이지 히어로. 사용자가 첫 0.5초 안에 보는 것.

### 5.2 PC KV — Anti-Grid Hero

```
┌──────────────────────────────────────────────────────┐
│  [Header — 로고 + Nav + 언어]                  80px   │
├──────────────────────────────────────────────────────┤
│                                                      │
│                            ╭───────────╮             │
│                           ╱  Nature    ╲             │
│  [Tag]                    │   Blob K    │             │
│                           ╲  rotate -3°╱             │
│  [Hero Title 64px]         ╰──────────╯              │
│   A city of                                          │
│   quiet corners.                                     │
│                                                      │
│  [Description]                                       │
│                       ╭──────╮                       │
│  [CTA Button]        │ Heri- │                       │
│                      │ tage  │                       │
│                      │ Blob  │                       │
│                       ╰──────╯                       │
│                                                      │
│  min-height: 90vh                                    │
└──────────────────────────────────────────────────────┘
   좌 55% 텍스트  |  우 45% 블롭 비대칭 배치
```

### 5.3 KV 구현

```html
<section class="kv">
  <div class="kv__text">
    <span class="kv__tag">대전 원도심 · walking guide</span>
    <h1 class="kv__title">
      A city of <em>quiet</em> corners.
    </h1>
    <p class="kv__desc">
      Skip Seoul's skyline. Daejeon's old town is where 
      120-year-old brick walls meet hand-pulled noodles.
    </p>
    <div class="kv__actions">
      <button class="btn btn--primary">Begin the walk ↗</button>
      <span class="kv__meta">six stops · 4.2 km</span>
    </div>
  </div>

  <div class="kv__visual">
    <div class="kv__blob kv__blob--nature">
      <BlobMask shape="nature" src="/kv/bomunsan.jpg" alt="보문산 능선" />
      <span class="kv__blob-label">iv. bomunsan</span>
    </div>
    <div class="kv__blob kv__blob--heritage">
      <BlobMask shape="heritage" src="/kv/soje-dong.jpg" alt="소제동 골목" />
      <span class="kv__blob-label">i. soje-dong</span>
    </div>
  </div>
</section>
```

```css
.kv {
  min-height: 90vh;
  padding: var(--space-8) 0 var(--space-9);
  position: relative;
  overflow: hidden;
}

.kv__title {
  font-family: var(--font-serif);
  font-size: clamp(40px, 5vw, 64px);
  font-weight: var(--fw-title);
  line-height: 1.05;
  letter-spacing: -1.5px;
  margin-bottom: var(--space-5);
  color: var(--ink);
}

.kv__title em {
  color: var(--lav-600);
  font-style: italic;
}

@media (min-width: 1024px) {
  .kv {
    display: grid;
    grid-template-columns: 55% 45%;
    align-items: center;
    padding: var(--space-9) 0;
  }

  .kv__text {
    padding-left: max(40px, calc((100vw - 1200px) / 2 + 40px));
    max-width: 520px;
  }

  .kv__visual {
    position: relative;
    height: 70vh;
    min-height: 500px;
  }

  .kv__blob {
    position: absolute;
  }

  .kv__blob--nature {
    top: 8%;
    right: 5%;
    width: 340px;
    z-index: 2;
  }

  .kv__blob--heritage {
    bottom: 12%;
    left: 8%;
    width: 240px;
    z-index: 1;
  }
}

/* 손글씨 라벨 */
.kv__blob-label {
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%) rotate(-2deg);
  padding: 5px 12px;
  background: var(--white);
  border: 0.5px solid var(--color-border-subtle);
  border-radius: 16px;
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 11px;
  color: var(--slate);
  white-space: nowrap;
  z-index: var(--z-blob);
}
```

### 5.4 모바일 KV — 세로 스택

```
┌──────────────────────┐
│  [Header]    56px    │
├──────────────────────┤
│      ╭─────────╮     │  ← Nature 블롭 1개만
│     │ Nature   │     │     중앙 배치
│     │  Blob K  │     │     50vh 차지
│     ╰──────────╯     │
├──────────────────────┤
│  [Tag]               │
│  [Hero Copy]         │
│  [Description]       │
│  [CTA]               │
└──────────────────────┘
   [Floating CTA]      ← 스크롤 시 하단 고정
```

```css
@media (max-width: 1023px) {
  .kv {
    grid-template-columns: 1fr;
    padding: var(--space-6) var(--space-5) var(--space-7);
  }

  .kv__visual {
    position: relative;
    height: auto;
    margin-bottom: var(--space-6);
    display: flex;
    justify-content: center;
  }

  .kv__blob--nature {
    position: relative;
    width: 80%;
    max-width: 320px;
  }

  /* Heritage 블롭은 모바일에서 숨김 */
  .kv__blob--heritage {
    display: none;
  }

  .kv__title {
    font-size: clamp(32px, 7vw, 44px);
  }
}
```

**왜 모바일은 블롭 1개만?**
- 좁은 화면에 비대칭 2개는 어수선
- 한 손 스크롤 시 시선 동선이 단순해야 함
- 대표 이미지 하나가 더 강한 인상

---

## 6. 모바일 가독성 최우선 원칙

### 6.1 텍스트 크기 규칙

| 요소 | 최소 크기 | 최대 줄 길이 | 이유 |
|------|---------|-----------|------|
| 본문 | 16px | 50자 (한글 25자) | 돋보기 없이 읽을 수 있는 최소치 |
| 캡션·메타 | 13px | — | 그 이하는 피로함 유발 |
| 버튼 | 14px | — | 터치 타겟과 균형 |
| 히어로 타이틀 | 32px | 15자 내외 | 2~3줄 이내 |

### 6.2 터치 타겟

```css
button, a.btn, .tap-target {
  min-width: 44px;
  min-height: 44px;
  padding: 12px 20px;
}
```

검지 평균 크기 44~48px. 그 이하는 오탭 발생.

### 6.3 엄지 접근 영역

```
모바일 화면 (세로 스크롤)
┌──────────────────────┐
│ [상단 20%]           │ ← 한 손 엄지 접근 어려움
│  로고, 메뉴 아이콘    │
├──────────────────────┤
│ [중앙 60%]           │ ← 메인 콘텐츠
│  콘텐츠              │
├──────────────────────┤
│ [하단 20%]           │ ← 엄지 최적 영역
│  Floating CTA, 탭바  │ ← 중요 버튼은 여기
└──────────────────────┘
```

**규칙**: 주요 CTA는 모바일에서 **KV 내부에 한 번 + 페이지 하단 Floating으로 한 번** 중복 배치.

---

## 7. 페이지 타입별 레이아웃

### 7.1 홈 (랜딩) 페이지

```
PC 1024px+
┌─────────────────────────────────────────────────────┐
│  [Header]                                     80px  │
├─────────────────────────────────────────────────────┤
│  [KV Anti-Grid Hero]                          90vh  │
│   좌 55% 텍스트 + 우 45% 블롭 2개 비대칭              │
├─────────────────────────────────────────────────────┤
│  [Three alleys — 3개 카드]                   96px↑   │
│   ├─ Soje-dong (heritage 쉐이프)                     │
│   ├─ Jungang Market (market 쉐이프)                  │
│   └─ Bomunsan (nature 쉐이프)                        │
├─────────────────────────────────────────────────────┤
│  [Field Note 인용]                                  │
│   Ink 배경 · 전체 폭                                  │
├─────────────────────────────────────────────────────┤
│  [Full Route Preview]                               │
│   asymmetric grid (2:1)                             │
│   좌측 지도 + 우측 6스팟 타임라인                       │
├─────────────────────────────────────────────────────┤
│  [Footer]                                           │
└─────────────────────────────────────────────────────┘
```

```
모바일 (< 768px)
┌──────────────────────┐
│  [Header]      56px  │
├──────────────────────┤
│  [KV — Nature 블롭]   │ ← 단일 블롭, 50vh
│  [Hero Copy + CTA]   │
├──────────────────────┤
│  [Card 1 · Heritage] │
│  H 쉐이프 + 카피      │
├──────────────────────┤
│  [Card 2 · Market]   │
│  M 쉐이프 + 카피      │
├──────────────────────┤
│  [Card 3 · Nature]   │
│  K 쉐이프 + 카피      │
├──────────────────────┤
│  [Field Note]        │
├──────────────────────┤
│  [Route Preview]     │ ← 지도 먼저
├──────────────────────┤
│  [Footer]            │
└──────────────────────┘
   [Floating CTA]      ← 하단 고정
```

### 7.2 스팟 상세 페이지

```
PC
┌─────────────────────────────────────────────────────┐
│  [Breadcrumb]                                       │
├─────────────────────────────────────────────────────┤
│   ╭────────────╮                                    │
│  │ Spot Hero   │  [Title]                           │
│  │ 큰 블롭 마스크│  [Meta · 도보 5분 · FREE]           │
│  │ rotate -2°  │  [Tagline]                         │
│   ╰────────────╯                                    │
├─────────────────────────────────────────────────────┤
│  좌 65%                       │  우 35% (sticky)    │
│                               │                     │
│  [본문 — 에디토리얼]           │  [지도 사이드바]    │
│  [이미지 갤러리 · 일반 사각]    │  [주소·시간·요금]   │
│  [관련 정보]                   │  [길찾기 CTA]       │
├─────────────────────────────────────────────────────┤
│  [다음 스팟 / 이전 스팟 네비]                         │
└─────────────────────────────────────────────────────┘
```

**핵심 규칙**: 스팟 상세 페이지는 **블롭 마스크를 히어로에만 1번** 사용. 갤러리·본문 삽입 이미지는 일반 사각 프레임. 블롭이 너무 많으면 시각 피로.

```
모바일
┌──────────────────────┐
│  [← 뒤로 + 공유]      │
├──────────────────────┤
│   ╭──────────╮       │
│   │ Hero Blob│       │ ← 카테고리 블롭 1개
│   ╰──────────╯       │
├──────────────────────┤
│  [Title + Meta]      │
├──────────────────────┤
│  [본문]              │
│  [이미지 갤러리]      │ ← 사각 프레임
├──────────────────────┤
│  [지도 임베드]        │ ← 사이드바 대신 inline
│  [길찾기 버튼]        │
├──────────────────────┤
│  [다음 스팟]          │
└──────────────────────┘
   [Floating CTA]      ← 길찾기·공유
```

### 7.3 지도 페이지

블롭 쉐이프 사용 안 함. 지도가 주인공.

```
PC
┌─────────────────────────────────────────────────────┐
│  [Header]                                           │
├─────────────────┬───────────────────────────────────┤
│  [스팟 리스트]   │  [전체 화면 지도]                 │
│  좌 400px 고정   │  우 나머지 폭                      │
│  스크롤 가능     │  sticky                           │
└─────────────────┴───────────────────────────────────┘
```

```
모바일
┌──────────────────────┐
│  [지도 — 상단 55vh]   │
├──────────────────────┤
│  [바텀시트]           │ ← 드래그로 확장 가능
│  [선택된 스팟 카드]   │
└──────────────────────┘
```

---

## 8. 반응형 이미지 전략

### 8.1 블롭 이미지 vs 일반 이미지

| 유형 | 위치 | 마스크 | aspect-ratio |
|------|-----|------|-------------|
| **블롭 이미지** | KV, 스팟 카드 썸네일, 스팟 상세 히어로 | 카테고리별 3종 블롭 | 1:1 |
| **일반 이미지** | 갤러리, 본문 삽입, 지도 | 없음 (사각) | 4:5, 3:2, 16:9 |

**원칙**: 한 페이지에 블롭은 **카테고리당 최대 1번**. 시그니처를 강하게 유지.

### 8.2 이미지 크기 규격

| 위치 | PC | 모바일 | 압축 |
|------|----|----|----|
| KV 블롭 (메인) | 1200×1200 | 800×800 | WebP 85% |
| 스팟 카드 블롭 | 600×600 | 400×400 | WebP 80% |
| 스팟 상세 히어로 블롭 | 1000×1000 | 750×750 | WebP 85% |
| 일반 갤러리 (3:2) | 1200×800 | 750×500 | WebP 80% |

**블롭은 정사각형**: 쉐이프가 1:1 viewBox라 정사각형 원본이 가장 깔끔.

### 8.3 Picture 요소

```html
<picture>
  <source 
    media="(min-width: 1024px)" 
    srcset="/kv/bomunsan-1200.webp 1200w,
            /kv/bomunsan-2400.webp 2400w"
    type="image/webp">
  <source 
    media="(min-width: 768px)" 
    srcset="/kv/bomunsan-1000.webp 1000w"
    type="image/webp">
  <source 
    srcset="/kv/bomunsan-800.webp 800w,
            /kv/bomunsan-1600.webp 1600w"
    type="image/webp">
  <img 
    src="/kv/bomunsan-800.jpg" 
    alt="보문산 능선"
    loading="eager"
    fetchpriority="high"
    width="1200" 
    height="1200">
</picture>
```

### 8.4 Lazy Loading

```html
<!-- KV (eager) -->
<img src="..." loading="eager" fetchpriority="high">

<!-- 그 외 (lazy) -->
<img src="..." loading="lazy">
```

### 8.5 aspect-ratio로 Layout Shift 방지

```css
.blob-mask {
  aspect-ratio: 1 / 1;
  background: var(--silver-veil);
}

.gallery-image {
  aspect-ratio: 3 / 2;
  object-fit: cover;
  background: var(--silver-veil);
}
```

---

## 9. 스크롤 & 네비게이션

### 9.1 Sticky Header

```css
.header {
  position: sticky;
  top: 0;
  z-index: var(--z-header);
  background: var(--white);
  backdrop-filter: blur(10px);
  transition: background 0.2s, box-shadow 0.2s;
}

.header--scrolled {
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 1px 0 var(--color-border-subtle);
}
```

### 9.2 모바일 Floating CTA

```css
@media (max-width: 1023px) {
  .floating-cta {
    position: fixed;
    bottom: 16px;
    left: 16px;
    right: 16px;
    z-index: var(--z-sticky);
    padding: 14px 24px;
    background: var(--lav-500);
    color: var(--ink);
    border-radius: 28px;
    font-weight: var(--fw-ui);
    box-shadow: 0 4px 12px rgba(26, 26, 46, 0.15);
  }
}

@media (min-width: 1024px) {
  .floating-cta { display: none; }
}
```

---

## 10. Z-index 체계

```css
:root {
  --z-base: 0;
  --z-blob: 2;          /* 블롭 라벨 */
  --z-dropdown: 10;
  --z-sticky: 100;
  --z-header: 100;
  --z-overlay: 200;
  --z-modal: 300;
  --z-toast: 400;
  --z-tooltip: 500;
}
```

**규칙**: 하드코딩 (`z-index: 9999`) 금지. 변수만 사용.

---

## 11. 컴포넌트 간격 패턴

### 11.1 섹션 간 간격

```css
.section { padding: var(--space-7) 0; }

@media (min-width: 768px) {
  .section { padding: var(--space-8) 0; }
}

@media (min-width: 1024px) {
  .section { padding: var(--space-9) 0; }
}
```

### 11.2 Anti-Grid 섹션은 더 과감하게

```css
.section--anti-grid {
  padding: var(--space-8) 0 var(--space-9);
}

@media (min-width: 1024px) {
  .section--anti-grid {
    padding: var(--space-9) 0 var(--space-10);
  }
}
```

### 11.3 카드 내부 간격

```css
.card { padding: var(--space-5); }
.card > * + * { margin-top: var(--space-3); }
```

---

## 12. 접근성 체크리스트

- [ ] 모든 인터랙티브 요소 44×44px 이상
- [ ] 본문 최소 16px, 최대 줄 길이 75자 (한글 40자)
- [ ] Focus 상태 visible (키보드 네비게이션)
- [ ] 블롭 마스크 이미지에 의미 있는 `alt` 텍스트
- [ ] Heading 계층 준수 (h1 → h2 → h3)
- [ ] Landmark 역할 태그 (`<main>`, `<nav>`, `<aside>`)
- [ ] 컬러 시스템 섹션 6의 WCAG 기준 준수 (별도 문서)

### 12.1 Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  .blob-mask,
  .kv__blob,
  * {
    transform: none !important;
    transition: none !important;
    animation: none !important;
  }
}
```

블롭의 회전이 멀미를 유발할 수 있는 사용자를 위해.

---

## 13. Claude Code 작업 지시 템플릿

이 문서를 참조하라고 할 때:

```
"홈 페이지를 만들어줘.
docs/layout-system.md 섹션 7.1 구조,
KV는 섹션 5.2 Anti-Grid 패턴 (Nature + Heritage 블롭 비대칭 배치),
컬러는 docs/color-system.md 3색 시스템,
폰트는 docs/font-system.md 언어별 분기."
```

```
"스팟 카드 컴포넌트 만들어줘.
docs/layout-system.md 섹션 2의 BlobMask 컴포넌트 사용.
카테고리별 쉐이프 매핑 — heritage, market, nature.
PC 3컬럼 그리드, 모바일 1컬럼 세로 쌓임."
```

```
"스팟 상세 페이지 만들어줘.
docs/layout-system.md 섹션 7.2 패턴.
히어로에만 카테고리 블롭 1개, 갤러리는 일반 사각.
PC는 좌 65% 본문 + 우 35% sticky 지도사이드바.
모바일은 세로 스택 + Floating 길찾기 CTA."
```

---

## 14. 빠른 체크리스트

### 14.1 페이지 작업 시작 전

- [ ] 이 페이지의 주인공은 무엇인가 (블롭? 지도? 텍스트?)
- [ ] 블롭이 필요한 위치는 (한 페이지 최대 3~4개)
- [ ] PC에서 Anti-Grid를 쓸 섹션은 (KV + 강조 섹션만)
- [ ] 모바일에서 블롭 개수를 몇 개로 줄일지 (보통 1~2개)
- [ ] CTA는 어디에 몇 번 배치할지

### 14.2 PC 레이아웃 확인

- [ ] KV가 뷰포트 90% 이상 차지하는가
- [ ] 블롭 배치가 비대칭인가 (정중앙 금지)
- [ ] 블롭에 1~3도 회전이 있는가
- [ ] 최대 컨테이너 1200px 지키는가 (Anti-Grid 섹션 제외)
- [ ] 섹션 간 간격이 96px 이상인가

### 14.3 모바일 레이아웃 확인

- [ ] KV 블롭이 1개로 축소됐는가
- [ ] 본문 16px 이상인가
- [ ] 터치 타겟 44px 이상인가
- [ ] Floating CTA가 하단에 있는가
- [ ] 한 손 스크롤로 전체 탐색 가능한가

### 14.4 블롭 이미지 확인

- [ ] 카테고리 ↔ 쉐이프 매핑이 맞는가
- [ ] 원본 이미지가 정사각형 1:1인가
- [ ] alt 텍스트가 설명적인가 (파일명 아닌)
- [ ] loading 속성이 맞는가 (KV는 eager, 나머지 lazy)
- [ ] 한 페이지에 같은 카테고리 블롭이 3번 이상 안 나오는가

### 14.5 출시 전

- [ ] Lighthouse 성능 점수 90 이상
- [ ] LCP < 2.5s (KV 블롭이 LCP 요소)
- [ ] CLS < 0.1 (aspect-ratio로 방지)
- [ ] 5개 언어 전환 테스트
- [ ] 저속 네트워크(3G) 테스트
- [ ] iOS Safari, Chrome, Samsung Internet 확인

---

## 15. 참고 자료

### 15.1 관련 내부 문서

- **컬러 시스템**: [color-system.md](./color-system.md)
- **폰트 시스템**: [font-system.md](./font-system.md)

### 15.2 Asset 파일 (이 저장소에 포함)

- `/assets/shapes/shape-heritage.svg` — H 블롭
- `/assets/shapes/shape-market.svg` — M 블롭
- `/assets/shapes/shape-nature.svg` — K 블롭

### 15.3 외부 참고

- MDN CSS clip-path: https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path
- MDN SVG clipPath: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/clipPath
- Picture 요소 가이드: https://web.dev/articles/learn/design/picture-element

---

## Changelog

**v1.0 (2026.04)**
- 초기 버전
- B안 Anti-Grid Organic 디자인 방향 확정
- 3가지 블롭 쉐이프(heritage·market·nature) 시스템 정의
- 페이지 타입별 레이아웃 패턴 명시
- BlobMask React 컴포넌트 코드 포함

---

**문서 끝.** 레이아웃은 이 문서에서, 컬러는 컬러 시스템 문서에서, 폰트는 폰트 시스템 문서에서. 세 문서가 함께 하나의 디자인 시스템을 이룬다.
