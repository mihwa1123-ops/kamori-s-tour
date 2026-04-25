# daejeon/slow — 다국어 폰트 시스템

> 대전 원도심 로컬 가이드 웹서비스의 타이포그래피 시스템
> 5개 언어 (EN · 日本語 · 한국어 · Español · 中文) 통합 가이드
> 최종 수정: 2026년 4월 (v1.1)
>
> **📎 관련 문서**: 컬러는 [color-system.md](./color-system.md) 참조.
> 이 문서의 모든 예시 코드는 컬러 시스템 문서의 CSS 변수(`--ink`, `--lav-500` 등)를 사용합니다.

---

## 0. 이 문서의 목적

이 문서는 **디자이너·개발자·콘텐츠 제작자**가 공통으로 참조하는 타이포그래피 성경서다.

다음을 결정한다:
- 어떤 폰트를 언어별로 쓸 것인가
- 웨이트(굵기)는 어떤 기준으로 쓸 것인가
- 언어가 바뀔 때 폰트를 어떻게 자동 전환할 것인가
- 로딩 속도를 어떻게 빠르게 유지할 것인가

**이 문서가 다루지 않는 것**: 컬러 값. 모든 컬러는 [컬러 시스템 문서](./color-system.md)에 정의되어 있으며, 이 문서에서는 `var(--ink)` 같은 변수 이름으로만 참조한다.

---

## 1. 브랜드 타이포그래피 철학

### 1.1 우리가 찾는 톤

**정제되었지만 귀여움 (Refined yet friendly)** — 차갑지 않은 현대성.

우리 서비스는 외국인 관광객에게 대전 원도심의 **느린 감성**을 전달한다. 폰트는 이 느린 감성의 첫 인상이다. 너무 격식 있는 세리프(Noto Serif 같은 명조체)는 "박물관 팸플릿" 같고, 너무 장식적인 필기체는 "판촉물" 같다. 우리는 그 사이 — **둥근 산세리프와 따뜻한 세리프의 조합**으로 "오래된 동네를 걸으며 카페에 들어가는 느낌"을 낸다.

### 1.2 5개 언어 공통 원칙

| 원칙 | 설명 |
|------|------|
| **둥근 인상** | 모든 폰트는 모서리가 부드러워야 한다. 날카로운 Didot·Bodoni 계열 금지 |
| **중립성** | 특정 세대나 성별에 치우치지 않는 톤 |
| **가변성** | Variable font 또는 최소 4단계 웨이트 지원 |
| **정제됨** | 장식 최소화, 읽기 편함 우선 |
| **상업 이용 가능** | SIL OFL 1.1 라이선스 — 무료 상업 이용 OK |

---

## 2. 언어별 폰트 지정

### 2.1 폰트 매트릭스

| 언어 | 헤드라인 | 본문 | 라이선스 | Google Fonts |
|------|---------|------|---------|--------------|
| **English** | Fraunces | IBM Plex Sans | SIL OFL 1.1 | ✓ |
| **日本語** | Zen Maru Gothic | Zen Maru Gothic | SIL OFL 1.1 | ✓ |
| **한국어** | Gowun Batang | Gowun Dodum | SIL OFL 1.1 | ✓ |
| **Español** | Fraunces | IBM Plex Sans | SIL OFL 1.1 | ✓ |
| **中文 (简体)** | Noto Sans SC | Noto Sans SC | SIL OFL 1.1 | ✓ |

### 2.2 각 폰트 선정 이유

#### Fraunces (EN / ES 헤드라인)
- 가변 폰트. `opsz` (optical size)와 `SOFT`, `WONK` 축 조절 가능
- 300 ~ 700 연속 웨이트
- 부드러운 세리프 — Playfair보다 따뜻하고 덜 날카로움
- 이탤릭의 스왓시(장식적 종결)가 아름다움
- 스페인어 악센트(`ñ á é í ó ú ¡ ¿`) 완벽 지원

#### IBM Plex Sans (EN / ES 본문)
- IBM 기업 폰트. 완벽한 중성성
- 300 / 400 / 500 / 700 웨이트
- Fraunces와 함께 쓸 때 서로 간섭하지 않음
- 라틴 확장 완벽 지원

#### Zen Maru Gothic (JA 전용)
- **이 시스템의 주인공.** 차갑지 않은 현대 일본어 폰트의 대표작
- 모서리가 "날씨에 의해 마모된 듯" 둥글게 처리된 마루 고딕(丸ゴシック)
- 300 / 400 / 500 / 700 / 900 — 5단계 웨이트
- ZenFonts의 Zen Kaku Gothic을 계승한 둥근 버전
- Noto Serif JP처럼 신문·고전 느낌이 아닌, **현대 카페·잡지 느낌**

#### Gowun Batang + Gowun Dodum (KO 페어)
- 같은 디자이너(양은별)가 만든 명조-돋움 페어
- 두 폰트의 리듬이 완벽히 맞춤
- Gowun Batang: 현대적 명조체, 헤드라인용
- Gowun Dodum: 인간적 필획의 돋움체, 본문용

#### Noto Sans SC (ZH 전용)
- Google의 중국어 간체 공식 폰트
- 100 ~ 900 가변 웨이트
- GB18030 국가 표준 완전 지원
- Zen Maru Gothic 같은 마루(둥근) 폰트는 중국어에 마땅한 대안이 없어 Noto Sans SC 채택

### 2.3 왜 Noto Sans/Serif를 전부 쓰지 않는가

"5개 언어 모두 Noto로 통일하면 되지 않나요?" 라는 질문이 자주 나온다.

Noto는 **기술적으로 완벽하지만 감성적으로 중립적**이다. 감성이 있는 서비스에는 "아무 톤도 없는" 게 오히려 단점이다. 일본어에 Zen Maru Gothic을 쓰는 이유는 마루 고딕만의 **둥글고 친근한 표정**이 우리 브랜드의 "느린 감성"과 직결되기 때문이다. 중국어·스페인어처럼 선택지가 제한적인 언어만 Noto를 쓴다.

---

## 3. 웨이트(굵기) 활용 가이드

### 3.1 의미 기반 웨이트 시스템

웨이트는 "예뻐 보이려" 쓰는 게 아니라 **정보의 중요도**를 나타낸다.

| 역할 | 웨이트 | 용도 | 빈도 |
|------|-------|------|------|
| Meta | 300 Light | 보조 정보 (시간·거리·가격·날짜) | 자유롭게 |
| Body | 400 Regular | 본문, 긴 설명 | 페이지의 70% |
| UI | 500 Medium | 버튼·네비·태그·카테고리 | 조작 요소마다 |
| Title | 700 Bold | 카드 제목·섹션 헤더·강조어 | 섹션당 2~3개 |
| Hero | 900 Black | 통계 숫자·이벤트·랜딩 | 페이지당 1~2회만 |

### 3.2 CSS 변수로 관리

하드코딩(`font-weight: 700`)을 쓰지 않는다. 반드시 변수로:

```css
:root {
  --fw-meta: 300;   /* Light */
  --fw-body: 400;   /* Regular */
  --fw-ui: 500;     /* Medium */
  --fw-title: 700;  /* Bold */
  --fw-hero: 900;   /* Black */
}

.spot-card__title  { font-weight: var(--fw-title); }
.spot-card__desc   { font-weight: var(--fw-body); }
.spot-card__meta   { font-weight: var(--fw-meta); }
.btn               { font-weight: var(--fw-ui); }
.hero__stat-number { font-weight: var(--fw-hero); }
```

### 3.3 장면별 권장 조합

| 장면 | 헤드 | 서브 | 본문 |
|------|-----|------|------|
| 히어로 섹션 | 700 | 400 | 300 |
| 스팟 카드 | 700 | 500 | 400 |
| 기사 본문 | 700 | 500 | 400 |
| 필드노트 (인용) | 400 | 500 | 300 |
| 통계·랜딩 | 900 | 500 | 400 |
| UI·버튼·내비 | 500 | 400 | 300 |

### 3.4 DO & DON'T

**✓ 하기**
- 한 페이지에 2~3개 웨이트만 사용 (5개 전부 쓰면 어수선)
- Black 900은 페이지당 1~2회로 제한
- 본문은 반드시 Regular 400부터 시작
- 제목과 본문의 차이는 300~400 단위로 (400 → 700)

**✗ 피하기**
- 본문을 Bold 700으로 쓰기 (읽기 피곤)
- 제목에 Light 300 쓰기 (너무 약함)
- 같은 문단에서 4개 이상 웨이트 섞기
- 12px 이하 글자에 Bold·Black 쓰기 (뭉개짐)

---

## 4. 언어별 폰트 사이즈 조정

### 4.1 왜 언어마다 사이즈가 다른가

같은 의미의 문장도 언어마다 길이가 다르고, 한자는 획수가 많아 더 크게 써야 가독성이 좋다.

| 언어 | 히어로 기본 사이즈 | 이유 |
|------|-----------------|------|
| English | `clamp(44px, 5vw, 64px)` | 기준값 |
| Español | `clamp(38px, 4.2vw, 54px)` | 단어가 더 길어서 살짝 축소 |
| 日本語 | `clamp(36px, 4vw, 52px)` | 가나+한자 혼용, 영어보다 약간 작게 |
| 한국어 | `clamp(40px, 4.5vw, 58px)` | 받침 있는 글자 고려 |
| 中文 | `clamp(44px, 5.2vw, 68px)` | 한자 획 밀도 때문에 가장 크게 |

### 4.2 CSS 구현

```css
/* 기본 (영어 기준) */
.hero__title { font-size: clamp(44px, 5vw, 64px); }

/* 언어별 오버라이드 */
html[lang="es"] .hero__title { font-size: clamp(38px, 4.2vw, 54px); }
html[lang="ja"] .hero__title { font-size: clamp(36px, 4vw, 52px); }
html[lang="ko"] .hero__title { font-size: clamp(40px, 4.5vw, 58px); }
html[lang="zh"] .hero__title { font-size: clamp(44px, 5.2vw, 68px); }
```

### 4.3 line-height도 언어별로

| 언어 | line-height |
|------|------------|
| English / Español | 1.02 ~ 1.15 (타이트) |
| 한국어 | 1.2 ~ 1.3 (받침 여유) |
| 日本語 | 1.15 ~ 1.25 |
| 中文 | 1.2 ~ 1.3 (한자 밀도) |

---

## 5. 언어별 강조 방법

### 5.1 이탤릭의 함정

영어권 디자인에서는 강조할 때 이탤릭(`<em>`)을 자주 쓴다. 그러나 **CJK (한·중·일)에는 이탤릭 개념이 없다.** 강제로 기울이면 글자가 깨져 보인다.

### 5.2 언어별 강조 전략

| 언어 | 강조 방법 |
|------|---------|
| English | `<em>` 이탤릭 + 컬러 (Fraunces의 이탤릭이 아름다움) |
| Español | `<em>` 이탤릭 + 컬러 |
| 日本語 | **컬러 + 웨이트 증가** (400 → 700), 이탤릭 절대 금지 |
| 한국어 | **컬러 + 웨이트 증가**, 또는 옅은 언더라인 |
| 中文 | **컬러 + 웨이트 증가**, 이탤릭 절대 금지 |

### 5.3 통합 강조 컴포넌트

콘텐츠 CMS에서는 `<em class="emphasis">` 같은 공통 마크업을 쓰고, CSS에서 언어별로 다르게 처리:

```css
/* 기본 (영어·스페인어) */
.emphasis {
  color: var(--lav-600);    /* 컬러 시스템 변수 참조 */
  font-style: italic;
}

/* CJK 언어 */
html[lang="ja"] .emphasis,
html[lang="ko"] .emphasis,
html[lang="zh"] .emphasis {
  color: var(--lav-600);
  font-style: normal;      /* 이탤릭 해제 */
  font-weight: var(--fw-title);  /* 대신 굵게 */
}
```

> 💡 `--lav-600`의 실제 값(`#8170D8`)은 컬러 시스템 문서에서 확인.

---

## 6. Google Fonts 로드

### 6.1 5개 언어 통합 로드 URL

`<head>` 안에 다음 `<link>`를 넣는다. 한 줄에 5개 폰트 모두 로드:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@300;400;500;700;900&family=Gowun+Batang:wght@400;700&family=Gowun+Dodum&family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,400&family=IBM+Plex+Sans:wght@300;400;500;700&family=Noto+Sans+SC:wght@300;400;500;700;900&display=swap" rel="stylesheet">
```

### 6.2 `display=swap`은 필수

`&display=swap` 파라미터를 빼면 폰트가 로드될 때까지 텍스트가 **보이지 않는** (FOIT) 현상이 생긴다. `swap`은 시스템 기본 폰트로 먼저 보여주고, 웹폰트가 도착하면 바꿔치기 한다.

### 6.3 `preconnect`의 효과

`preconnect` 태그 두 줄은 브라우저에게 "미리 구글 폰트 서버와 연결을 준비해둬" 라고 알려준다. 체감 로딩이 **100~300ms** 빨라진다.

---

## 7. 언어별 폰트 자동 적용 (CSS)

### 7.1 `html[lang]` 속성 기반 자동 매칭

이 시스템의 핵심. HTML 루트에 `<html lang="ja">` 가 붙어 있으면 자동으로 일본어 폰트가 적용된다.

```css
/* 기본값 (영어) */
html {
  font-family: 'IBM Plex Sans', sans-serif;
  color: var(--ink);          /* 컬러 시스템 참조 */
  background: var(--off-white);
}
.hero__title {
  font-family: 'Fraunces', serif;
  color: var(--ink);
}

/* 일본어 */
html[lang="ja"] {
  font-family: 'Zen Maru Gothic', sans-serif;
}
html[lang="ja"] .hero__title {
  font-family: 'Zen Maru Gothic', sans-serif;  /* 본문과 동일 */
}

/* 한국어 */
html[lang="ko"] {
  font-family: 'Gowun Dodum', sans-serif;
}
html[lang="ko"] .hero__title {
  font-family: 'Gowun Batang', serif;
}

/* 스페인어 (영어와 동일 페어) */
html[lang="es"] {
  font-family: 'IBM Plex Sans', sans-serif;
}
html[lang="es"] .hero__title {
  font-family: 'Fraunces', serif;
}

/* 중국어 간체 */
html[lang="zh"],
html[lang="zh-CN"] {
  font-family: 'Noto Sans SC', sans-serif;
}
html[lang="zh"] .hero__title,
html[lang="zh-CN"] .hero__title {
  font-family: 'Noto Sans SC', sans-serif;
}
```

### 7.2 fallback 체인

브라우저가 폰트를 못 받아도 비슷한 폰트로 대체되어야 한다:

```css
html[lang="ja"] {
  font-family:
    'Zen Maru Gothic',              /* 우선순위 1 */
    'Hiragino Maru Gothic Pro',     /* macOS 기본 마루 고딕 */
    'Yu Gothic',                    /* Windows 일본어 */
    sans-serif;                     /* 최후 대안 */
}

html[lang="ko"] {
  font-family:
    'Gowun Dodum',
    'Apple SD Gothic Neo',          /* macOS 기본 한글 */
    'Malgun Gothic',                /* Windows 한글 */
    sans-serif;
}

html[lang="zh"] {
  font-family:
    'Noto Sans SC',
    'PingFang SC',                  /* macOS 중국어 */
    'Microsoft YaHei',              /* Windows 중국어 */
    sans-serif;
}
```

---

## 8. 로딩 성능 최적화

### 8.1 왜 중요한가

다국어 폰트는 파일이 크다:

| 폰트 | 전체 파일 크기 |
|------|------------|
| Fraunces (영문) | ~150KB |
| IBM Plex Sans (영문) | ~50KB |
| Gowun Batang (한글 완전) | ~1.8MB |
| Zen Maru Gothic (일본어 완전) | ~3.5MB |
| Noto Sans SC (중국어 완전) | ~5.2MB |

최적화 없이 전부 로드하면 **10MB 이상**. 느린 네트워크에서는 텍스트가 한참 안 보인다.

### 8.2 기법 1: Unicode-range 자동 subsetting

Google Fonts는 각 폰트를 **유니코드 구간별로 쪼개서** 배포한다. 브라우저는 실제로 페이지에 쓰인 글자가 속한 구간만 다운로드한다.

예: 일본어 페이지에 `"ゆっくり歩く大田旧市街"` 9글자만 있다면, 브라우저는 전체 3.5MB 중 **그 글자들이 속한 약 200KB** 구간만 받는다.

이건 Google Fonts가 자동으로 해준다. 우리가 할 일은 `<link>` URL을 정확히 쓰는 것.

### 8.3 기법 2: 현재 언어 폰트 preload

가장 중요한 폰트를 preload 태그로 우선 로드:

```html
<!-- 영어 페이지 -->
<link rel="preload"
      href="https://fonts.gstatic.com/s/fraunces/v31/...[해시].woff2"
      as="font"
      type="font/woff2"
      crossorigin>

<!-- 일본어 페이지 -->
<link rel="preload"
      href="https://fonts.gstatic.com/s/zenmarugothic/v14/...[해시].woff2"
      as="font"
      type="font/woff2"
      crossorigin>
```

체감 로딩 속도가 200~500ms 빨라진다. 단, 해시값이 구글 업데이트로 바뀔 수 있으니 주기적 확인 필요.

### 8.4 기법 3: font-display 전략

모든 `@font-face` 선언에 반드시 포함:

```css
@font-face {
  font-family: 'Zen Maru Gothic';
  font-display: swap;  /* 폰트 로드 전에는 시스템 폰트로 표시 */
  /* ... */
}
```

`swap` 값이 주는 혜택:
- 폰트 로드 안 됐을 때: 시스템 기본 폰트로 텍스트 보임 (사용자는 일단 읽을 수 있음)
- 폰트 로드 완료: 살짝 바뀜 (FOUT) → 보기 싫지만 읽기 가능
- 최악의 시나리오 회피: 텍스트가 영영 안 보이는(FOIT) 상황 방지

### 8.5 기법 4: 현재 언어 폰트만 로드 (고급)

더 공격적 최적화. 사용자가 선택한 언어의 폰트만 동적 로드:

```typescript
// React hook
function useLanguageFont(lang: string) {
  useEffect(() => {
    const fontMap = {
      ja: 'Zen+Maru+Gothic:wght@300;400;500;700;900',
      ko: 'Gowun+Batang:wght@400;700&family=Gowun+Dodum',
      zh: 'Noto+Sans+SC:wght@300;400;500;700;900',
      // en/es는 기본 로드 (가벼움)
    };

    const family = fontMap[lang];
    if (!family) return;

    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?family=${family}&display=swap`;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, [lang]);
}
```

### 8.6 성능 목표

| 지표 | 목표값 | 의미 |
|------|-------|------|
| FCP (First Contentful Paint) | < 1.5s | 첫 텍스트 보일 때까지 |
| LCP (Largest Contentful Paint) | < 2.5s | 히어로 타이틀 보일 때까지 |
| CLS (Cumulative Layout Shift) | < 0.1 | 폰트 교체 시 레이아웃 흔들림 최소화 |

---

## 9. React + i18next 통합 구현

### 9.1 개념

사용자가 언어를 바꾸면 **자동으로 3가지**가 일어나야 한다:
1. 화면 텍스트가 해당 언어로 바뀜 (i18next 담당)
2. `<html lang="xx">` 속성 업데이트 (React 담당)
3. 폰트가 자동 전환 (`html[lang]` CSS 담당)

### 9.2 i18next 설정

```typescript
// src/i18n/config.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

export const SUPPORTED_LANGS = ['en', 'ja', 'es', 'ko', 'zh'] as const;
export type Lang = typeof SUPPORTED_LANGS[number];

export const LANG_META: Record<Lang, {
  label: string;
  htmlLang: string;   // <html lang="xx">에 들어갈 값
}> = {
  en: { label: 'English',  htmlLang: 'en' },
  ja: { label: '日本語',   htmlLang: 'ja' },
  ko: { label: '한국어',   htmlLang: 'ko' },
  es: { label: 'Español',  htmlLang: 'es' },
  zh: { label: '中文',     htmlLang: 'zh-CN' },
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: SUPPORTED_LANGS,
    defaultNS: 'common',
    ns: ['common', 'home', 'spots'],
    backend: { loadPath: '/locales/{{lng}}/{{ns}}.json' },
    detection: {
      order: ['path', 'localStorage', 'navigator'],
      lookupFromPathIndex: 0,
    },
    interpolation: { escapeValue: false },
  });

export default i18n;
```

### 9.3 언어 변경 시 `<html lang>` 자동 갱신

```typescript
// src/i18n/LanguageSync.tsx
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LANG_META, Lang } from './config';

export function LanguageSync() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const currentLang = i18n.language as Lang;
    const htmlLang = LANG_META[currentLang]?.htmlLang || 'en';
    document.documentElement.lang = htmlLang;
  }, [i18n.language]);

  return null;
}
```

App 루트에 한 번만 추가:

```tsx
// src/App.tsx
import { LanguageSync } from './i18n/LanguageSync';

function App() {
  return (
    <>
      <LanguageSync />
      <Routes>{/* ... */}</Routes>
    </>
  );
}
```

### 9.4 언어 전환 버튼 컴포넌트

```tsx
// src/components/LanguageSwitcher.tsx
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { SUPPORTED_LANGS, LANG_META, Lang } from '../i18n/config';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const switchLang = (lang: Lang) => {
    const newPath = location.pathname.replace(
      /^\/(en|ja|ko|es|zh)/,
      `/${lang}`
    );
    navigate(newPath);
    i18n.changeLanguage(lang);
  };

  return (
    <div className="lang-switcher" role="navigation" aria-label="Language">
      {SUPPORTED_LANGS.map(lang => (
        <button
          key={lang}
          onClick={() => switchLang(lang)}
          className={i18n.language === lang ? 'active' : ''}
          aria-pressed={i18n.language === lang}
        >
          {LANG_META[lang].label}
        </button>
      ))}
    </div>
  );
}
```

### 9.5 컴포넌트에서 사용하기

```tsx
// src/components/SpotCard.tsx
import { useTranslation } from 'react-i18next';

interface Spot {
  id: string;
  name: Record<Lang, string>;
  description: Record<Lang, string>;
}

export function SpotCard({ spot }: { spot: Spot }) {
  const { t, i18n } = useTranslation(['common', 'spots']);
  const lang = i18n.language as Lang;

  return (
    <article className="spot-card">
      {/* 카드 제목: 각 언어의 세리프 또는 마루 고딕 자동 적용 */}
      <h2 className="spot-card__title">{spot.name[lang]}</h2>

      {/* 본문: IBM Plex Sans / Zen Maru Gothic / Gowun Dodum 자동 적용 */}
      <p className="spot-card__desc">{spot.description[lang]}</p>

      {/* UI 버튼: 각 언어의 Medium 웨이트로 자동 */}
      <button className="btn">{t('button.explore')}</button>
    </article>
  );
}
```

### 9.6 작동 흐름 요약

1. 사용자가 `LanguageSwitcher`에서 "日本語" 클릭
2. `i18n.changeLanguage('ja')` 호출
3. `LanguageSync`가 감지 → `document.documentElement.lang = 'ja'` 실행
4. CSS 셀렉터 `html[lang="ja"]` 활성화 → Zen Maru Gothic 자동 적용
5. 모든 `{t('...')}` 호출이 일본어 텍스트로 전환
6. 화면이 새 폰트 + 새 텍스트로 그려짐

**개발자가 각 컴포넌트마다 폰트를 지정할 필요 없음.** `lang` 속성 하나만 관리하면 전체 시스템이 따라온다.

---

## 10. 번역 콘텐츠 3가지 분류

다국어 서비스는 모든 문구를 단순 번역하면 안 된다. 성격에 따라 3가지로 분리:

### 10.1 Literal (직역 가능)

버튼, 내비, 라벨 등 기계적 번역이 되는 것.

| EN | JA | KO | ES | ZH |
|----|-----|-----|-----|-----|
| Home | ホーム | 홈 | Inicio | 首页 |
| Map | 地図 | 지도 | Mapa | 地图 |
| Continue | 続ける | 계속 | Continuar | 继续 |

CMS 구조 예시:
```json
{
  "nav": {
    "home": { "en": "Home", "ja": "ホーム", "ko": "홈", "es": "Inicio", "zh": "首页" }
  }
}
```

### 10.2 Transcreation (의역 필수)

히어로 카피·인용문·브랜드 문구는 **각 언어 원어민이 다시 쓴다**. 직역하면 힘이 빠진다.

예시 — 히어로 타이틀:

| 언어 | 카피 | 이유 |
|------|------|------|
| EN | A city of quiet corners. | 원문. 짧고 시적 |
| JA | 静かな路地の街、大田へ。 | "corners"를 "路地"로. 일본 감성 |
| KO | 조용한 골목의 도시. | 자연스러운 한국어 |
| ES | Una ciudad de rincones callados. | "callados"(침묵하는)의 어감 |
| ZH | 一座安静巷子的城市。 | 간결한 중국어 |

CMS 구조:
```json
{
  "hero": {
    "title": {
      "type": "transcreation",
      "translations": {
        "en": "A city of quiet corners.",
        "ja": "静かな路地の街、大田へ。",
        "ko": "조용한 골목의 도시.",
        "es": "Una ciudad de rincones callados.",
        "zh": "一座安静巷子的城市。"
      },
      "author": "copywriter-native"
    }
  }
}
```

### 10.3 Fixed (번역 안 함)

브랜드 시그니처·라틴어·숫자·고유명사는 **전 언어 공통 유지**.

- 로고명: `daejeon/slow` — 모든 언어에서 그대로
- 카테고리 코드: `HERITAGE`, `MARKET`, `NATURE` — 영문 고정 (시각 시그니처)
- 플레이트 번호: `plate i.`, `plate iv.` — 라틴어 로마자 유지
- 주소: `대전광역시 동구 대동 ...` — 한국어 주소는 한국어로 (네비게이션용)

---

## 11. 접근성 체크리스트

### 11.1 필수 준수 사항

- [ ] `<html lang="xx">` 속성이 모든 페이지에 정확히 설정됨
- [ ] 스크린리더가 언어 변경을 감지할 수 있도록 `<html lang>` 동적 갱신
- [ ] 본문 글자 크기 최소 16px (작은 화면에서 최소 14px)
- [ ] 본문 line-height 최소 1.5 (한국어 1.6 이상 권장)
- [ ] 텍스트 대비비 WCAG AA 기준 충족 → **컬러 시스템 문서 섹션 6 참조**
- [ ] 폰트 로드 실패 시에도 읽을 수 있도록 fallback 체인 완비
- [ ] `font-display: swap`으로 FOIT 방지
- [ ] 언어 전환 버튼의 aria-label 제공

### 11.2 CJK 특이사항

- 한자 한 글자는 영문 글자보다 정보량이 많다. **사이즈를 살짝 크게**
- 한국어 받침이 있는 글자는 **line-height를 여유있게** (1.6 이상)
- 중국어 간체는 획수 많은 글자 (예: 鑰·龜)에서 뭉개짐 주의. **최소 14px 이상**

---

## 12. 빠른 체크리스트 (개발 시작 전)

### 12.1 프로젝트 세팅

- [ ] `<head>`에 preconnect 2줄 + fonts.googleapis.com `<link>` 추가
- [ ] 모든 폰트에 `display=swap` 파라미터 확인
- [ ] CSS 변수로 `--fw-meta` ~ `--fw-hero` 정의 (**이 문서**)
- [ ] CSS 변수로 컬러 토큰 `--ink`, `--lav-500` 등 정의 (**컬러 시스템 문서**)
- [ ] `html[lang="xx"]` 셀렉터로 폰트 분기 CSS 작성
- [ ] fallback 체인 완비
- [ ] 언어별 `font-size` clamp() 오버라이드 작성

### 12.2 콘텐츠 제작

- [ ] 모든 문구를 Literal / Transcreation / Fixed 로 분류
- [ ] Transcreation은 원어민 작성 (기계 번역 금지)
- [ ] 이탤릭 사용 시 CJK 대응 확인
- [ ] 브랜드 고정 문구 (로고·카테고리) 번역 안 함

### 12.3 개발 구현

- [ ] i18next 설정에 5개 언어 모두 등록
- [ ] `LanguageSync` 컴포넌트로 `<html lang>` 자동 갱신
- [ ] URL 구조 `/{lang}/...` 확정
- [ ] hreflang 태그 자동 생성

### 12.4 출시 전

- [ ] Lighthouse 성능 점수 90 이상
- [ ] FCP < 1.5s, LCP < 2.5s, CLS < 0.1
- [ ] 5개 언어 전환 테스트 (폰트·사이즈·레이아웃)
- [ ] 저속 네트워크(3G) 테스트
- [ ] 모바일 Safari, Chrome, Samsung Internet 확인
- [ ] macOS, Windows, iOS, Android 폰트 렌더링 확인

---

## 13. 참고 자료

### 13.1 관련 내부 문서

- **컬러 시스템**: [color-system.md](./color-system.md)
  - 컬러 값, 팔레트, WCAG 대비비, 카테고리 매핑

### 13.2 외부 자료

- Google Fonts: https://fonts.google.com
- Zen Maru Gothic: https://fonts.google.com/specimen/Zen+Maru+Gothic
- Fraunces: https://fonts.google.com/specimen/Fraunces
- Gowun Batang: https://fonts.google.com/specimen/Gowun+Batang
- IBM Plex Sans: https://fonts.google.com/specimen/IBM+Plex+Sans
- Noto Sans SC: https://fonts.google.com/noto/specimen/Noto+Sans+SC
- i18next 공식 문서: https://www.i18next.com
- Google Fonts 최적화 가이드: https://developers.google.com/fonts/docs/getting_started

---

## Changelog

**v1.1 (2026.04)**
- 컬러 관련 언급 전체를 `var(--*)` 변수로 교체
- 컬러 시스템 문서와의 관계 명시 (섹션 0, 13)
- 예시 코드에서 하드코딩된 컬러 제거

**v1.0 (2026.04 초안)**
- 초기 버전

---

**문서 끝.** 폰트는 이 문서에서, 컬러는 컬러 시스템 문서에서. 두 문서가 함께 하나의 디자인 시스템을 이룬다.
