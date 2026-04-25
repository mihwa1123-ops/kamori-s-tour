# daejeon/slow — 컬러 시스템

> 대전 원도심 로컬 가이드 웹서비스의 컬러 시스템 v2
> **3색 시스템** — 연보라 메인 · 베이비 핑크 서브 · 노랑 포인트
> WCAG 2.1 AA 검증 완료 (24/29 조합 통과)
> 최종 수정: 2026년 4월

---

## 0. 이 문서의 목적

디자이너·개발자·콘텐츠 제작자가 공통으로 참조하는 **컬러 시스템 가이드**.

- 어떤 컬러를 쓸 것인가
- 어떤 비율로 쓸 것인가
- 어떤 조합이 안전한가 (접근성)
- 6개 카테고리에 어떻게 매핑할 것인가
- CSS 변수로 어떻게 구현할 것인가

> 관련 문서: [font-system.md](./font-system.md) — 타이포그래피 시스템

---

## 1. 설계 철학

### 1.1 "3색이면 충분하다"

이전 버전에서 10개 이상의 컬러를 정의했을 때 문제:
- 디자이너마다 색 선택 기준이 달라 일관성 붕괴
- 각 색의 존재감이 약해짐
- "언제 뭘 써야 하는지" 가이드가 비대해짐

**해결책 — 극단적 제약**. 3색만 쓰되, 각 색을 5단계 램프로 변주해서 6개 카테고리를 모두 표현한다.

### 1.2 레퍼런스와의 관계

참고한 레퍼런스(화이트 베이스 + 라벤더 주색 + 파스텔 액센트)에서:
- **가져온 것**: 화이트의 깨끗함, 라벤더의 세련됨, 파스텔 톤의 친근함
- **버린 것**: 5~6색 동시 사용의 산만함, 패턴 남용, 오렌지·블루·보라·초록 혼재

### 1.3 왜 라벤더가 주색인가

- **차분하면서 정체성 있음** — 베이지·그레이는 너무 무난, 원색은 너무 강함
- **한국 관광 브랜드 중 미사용** — 차별화 가능
- **디지털/인쇄 모두 안정** — sRGB·CMYK 양쪽 재현성 좋음
- **CJK 문화권 친화적** — 한국의 한복 옥색, 일본의 藤色(후지이로), 중국의 藕荷色과 맥이 닿음

---

## 2. 3색 시스템 전체 정의

### 2.1 Primary · Lavender (라벤더)

브랜드 주색. 페이지 면적의 **60%**를 차지한다.

| Token | Hex | rgb() | 용도 |
|-------|-----|-------|------|
| `--lav-50` | `#EDEAFC` | rgb(237, 234, 252) | 가장 연한 틴트 · 카드 배경 |
| `--lav-100` | `#D4CBF7` | rgb(212, 203, 247) | 연한 뱃지 배경 |
| `--lav-200` | `#C2B5F5` | rgb(194, 181, 245) | 보더, 호버 강조 |
| `--lav-500` | `#A594F9` | rgb(165, 148, 249) | **메인 · CTA · 로고** |
| `--lav-600` | `#8170D8` | rgb(129, 112, 216) | 버튼 호버, 링크 |
| `--lav-800` | `#4A3A8C` | rgb(74, 58, 140) | 라벤더 위 텍스트 |

**감성**: 차분함, 신뢰, 품격. 한복의 옥색에서 영감.

### 2.2 Secondary · Baby Pink (베이비 핑크)

페이지 면적의 **30%**.

| Token | Hex | rgb() | 용도 |
|-------|-----|-------|------|
| `--pink-50` | `#FFF0F4` | rgb(255, 240, 244) | 가장 연한 틴트 · 섹션 배경 |
| `--pink-100` | `#FFD6E0` | rgb(255, 214, 224) | 연한 뱃지 배경 |
| `--pink-500` | `#FFB3C6` | rgb(255, 179, 198) | **메인 · Market 카테고리** |
| `--pink-600` | `#F08BA6` | rgb(240, 139, 166) | 호버 상태 |
| `--pink-800` | `#A8456B` | rgb(168, 69, 107) | 핑크 위 텍스트 |
| `--pink-900` | `#5A1F36` | rgb(90, 31, 54) | 진한 핑크 배경용 텍스트 |

**감성**: 친근함, 환영, 포용. 봄 벚꽃·매실꽃의 색.

### 2.3 Accent · Butter Yellow (버터 옐로)

페이지 면적의 **10%**. 가장 아껴 쓰는 포인트.

| Token | Hex | rgb() | 용도 |
|-------|-----|-------|------|
| `--yel-50` | `#FFF9D1` | rgb(255, 249, 209) | 가장 연한 틴트 · 하이라이트 |
| `--yel-100` | `#FFF0A0` | rgb(255, 240, 160) | 연한 뱃지 배경 |
| `--yel-500` | `#FFE663` | rgb(255, 230, 99) | **메인 · Food 카테고리** |
| `--yel-600` | `#D4B80F` | rgb(212, 184, 15) | 진한 노랑 |
| `--yel-800` | `#6B5500` | rgb(107, 85, 0) | 노랑 위 텍스트 |
| `--yel-900` | `#4A3B00` | rgb(74, 59, 0) | 가장 진한 버전 |

**감성**: 에너지, 낙관, 발견. 시장 노점의 유자·잘 익은 밀의 색.

---

## 3. Foundation · 중립 5색

3색과 별개로 구조용 중립색 5종.

| Token | Hex | 용도 | 주의 |
|-------|-----|------|------|
| `--white` | `#FFFFFF` | 카드 배경, 기본 표면 | - |
| `--off-white` | `#FAFAFA` | 페이지 배경 | White와 미묘하게 구분 |
| `--silver-veil` | `#F3F0F8` | 섹션 구분, 분할 영역 | 라벤더 톤이 살짝 들어감 |
| `--ink` | `#1A1A2E` | **주 텍스트 · 모든 파스텔 배경 위 텍스트** | 순수 검정 `#000` 대신 약간의 보라 톤 |
| `--slate` | `#555566` | 부 텍스트 · 설명 · 메타 정보 | 본문 보조용 |

**Ink(`#1A1A2E`)가 순수 검정이 아닌 이유**: 순수 검정은 파스텔 3색 위에서 너무 대비가 강해 딱딱해 보인다. 약간의 보라 톤(rgb의 B 채널 46)을 섞어 파스텔과 자연스럽게 조화되도록 설계.

---

## 4. 60-30-10 사용 규칙

### 4.1 면적 배분

```
┌────────────────────────────────────────────────────────┐
│  60% — Foundation (White · Off-White · Ink · Slate)    │
├────────────────────────────────────────────────────────┤
│  30% — Primary Lavender                                │
├────────────────────────────────────────────────────────┤
│  10% — Secondary Pink + Accent Yellow                  │
└────────────────────────────────────────────────────────┘
```

### 4.2 의미적 규칙

**60% Foundation**: 페이지의 기본 배경, 본문 텍스트, 일반 UI. 시선이 머무는 시간 대비 자기 주장이 최소여야 한다.

**30% Primary Lavender**: 브랜드 인식 요소. 로고, CTA 버튼, 주요 카드 프레임, Heritage 카테고리.

**10% Secondary + Accent**: Pink와 Yellow는 합쳐서 10%. 주의를 끌어야 하는 곳에만 — 이벤트 배너, 포인트 뱃지, Market/Food 카테고리, Nature의 조합색.

### 4.3 왜 이 비율인가

- **화려함 유지**: 30% 라벤더는 페이지가 지루하지 않게 함
- **산만함 방지**: 10% 포인트 규칙으로 노랑·핑크가 절대 주인공이 되지 못함
- **레퍼런스의 함정 회피**: 원본 레퍼런스는 4~5색을 비슷한 면적으로 써서 혼란스러웠음

---

## 5. 6개 카테고리 매핑

### 5.1 핵심 아이디어 — 3색을 Solid · Tint · Combo로 분화

| 카테고리 | 표현 방식 | 주색 | 보조색 |
|---------|---------|------|--------|
| **Heritage** | Lavender Solid | `--lav-500` | - |
| **Market** | Pink Solid | `--pink-500` | - |
| **Food** | Yellow Solid | `--yel-500` | - |
| **Story** | Lavender Tint | `--lav-100` | `--lav-500` 테두리 |
| **Alleys** | Pink Tint | `--pink-100` | `--pink-500` 테두리 |
| **Nature** | Yellow + Lavender Combo | `--yel-500` + `--lav-500` | 두 색을 겹친 일러스트 |

### 5.2 카테고리별 CSS 토큰

의미 기반 변수로 래핑해서, 필요하면 카테고리별 매핑만 수정하면 전체 적용된다:

```css
:root {
  --cat-heritage-bg: var(--lav-500);
  --cat-heritage-fg: var(--white);
  --cat-heritage-tint-bg: var(--lav-50);
  --cat-heritage-tint-fg: var(--lav-800);

  --cat-market-bg: var(--pink-500);
  --cat-market-fg: var(--ink);
  --cat-market-tint-bg: var(--pink-50);
  --cat-market-tint-fg: var(--pink-800);

  --cat-food-bg: var(--yel-500);
  --cat-food-fg: var(--ink);
  --cat-food-tint-bg: var(--yel-50);
  --cat-food-tint-fg: var(--yel-800);

  --cat-story-bg: var(--lav-100);
  --cat-story-fg: var(--lav-800);
  --cat-story-border: var(--lav-500);

  --cat-alleys-bg: var(--pink-100);
  --cat-alleys-fg: var(--pink-800);
  --cat-alleys-border: var(--pink-500);

  --cat-nature-bg: var(--yel-500);
  --cat-nature-fg: var(--ink);
  --cat-nature-accent: var(--lav-500);
}
```

### 5.3 왜 Heritage만 White 텍스트, 나머지는 Ink 텍스트인가

접근성 검증 결과:
- `#FFFFFF` on `#A594F9` = **2.56:1 → FAIL**
- `#1A1A2E` on `#A594F9` = **6.66:1 → AA** ✓
- `#FFFFFF` on `#A594F9` (18pt+) = **2.56:1 → FAIL**

즉, 라벤더 위에 흰 글자도 안 된다. **Heritage 카테고리도 Ink 텍스트 쓰기**. 단, 라벤더 600/800처럼 진한 버전에만 흰 글자 가능.

```css
/* ✓ OK */
background: var(--lav-500);
color: var(--ink);  /* 6.66:1 */

/* ✓ OK */
background: var(--lav-800);
color: var(--white);  /* 9.23:1 */

/* ✗ FAIL */
background: var(--lav-500);
color: var(--white);  /* 2.56:1 */
```

---

## 6. 접근성 검증 결과

### 6.1 WCAG 2.1 기준

- **AAA (최고)**: 본문 7:1 이상, 큰 글자(18pt+) 4.5:1 이상
- **AA (표준)**: 본문 4.5:1 이상, 큰 글자 3:1 이상
- **FAIL**: AA 기준 미달

### 6.2 전체 검증 결과 (29개 조합)

| 등급 | 개수 | 비율 |
|------|------|------|
| AAA (본문) | 15 | 51.7% |
| AA (본문) | 9 | 31.0% |
| AA 큰글자만 | 2 | 6.9% |
| **FAIL** | 3 | 10.3% |

**본문 AA 이상 통과**: 24/29 = 82.8%

### 6.3 승인 조합 (모두 안전하게 쓸 수 있음)

**본문 텍스트**
| 텍스트 | 배경 | 비율 | 등급 |
|-------|------|------|------|
| `--ink` | `--white` | 17.06:1 | AAA |
| `--ink` | `--off-white` | 16.34:1 | AAA |
| `--ink` | `--silver-veil` | 15.13:1 | AAA |
| `--slate` | `--white` | 7.30:1 | AAA |
| `--slate` | `--off-white` | 6.99:1 | AA |

**라벤더 배경 위 텍스트**
| 텍스트 | 배경 | 비율 | 등급 |
|-------|------|------|------|
| `--ink` | `--lav-500` | 6.66:1 | AA |
| `--lav-800` | `--lav-50` | 7.81:1 | AAA |
| `--lav-800` | `--lav-100` | 6.02:1 | AA |
| `--white` | `--lav-800` | 9.23:1 | AAA |

**핑크 배경 위 텍스트**
| 텍스트 | 배경 | 비율 | 등급 |
|-------|------|------|------|
| `--ink` | `--pink-500` | 10.17:1 | AAA |
| `--pink-800` | `--pink-50` | 5.10:1 | AA |
| `--pink-900` | `--pink-500` | 7.43:1 | AAA |
| `--white` | `--pink-800` | 5.63:1 | AA |

**노랑 배경 위 텍스트**
| 텍스트 | 배경 | 비율 | 등급 |
|-------|------|------|------|
| `--ink` | `--yel-500` | 13.61:1 | AAA |
| `--yel-800` | `--yel-50` | 6.74:1 | AA |
| `--yel-900` | `--yel-500` | 8.74:1 | AAA |
| `--yel-900` | `--yel-100` | 9.51:1 | AAA |

**Ink 배경 위 텍스트** (Field Note용)
| 텍스트 | 배경 | 비율 | 등급 |
|-------|------|------|------|
| `--white` | `--ink` | 17.06:1 | AAA |
| `--yel-500` | `--ink` | 13.61:1 | AAA |
| `--pink-500` | `--ink` | 10.17:1 | AAA |
| `--lav-500` | `--ink` | 6.66:1 | AA |

### 6.4 금지 조합 (텍스트로 사용 불가)

| 텍스트 | 배경 | 비율 | 이유 |
|-------|------|------|------|
| `--white` | `--lav-500` | 2.56:1 | AA 미달 |
| `--white` | `--pink-500` | 1.68:1 | 심각한 가독성 문제 |
| `--white` | `--yel-500` | 1.25:1 | 거의 보이지 않음 |

### 6.5 The Golden Rule

> **파스텔 3색(라벤더·핑크·노랑) 배경에는 항상 Ink(`#1A1A2E`) 텍스트.**

이 하나의 규칙만 지키면 접근성 문제 발생 불가.

**예외**: 해당 컬러 램프의 가장 진한 버전(600 이상) 배경에만 White 텍스트 허용.

---

## 7. CSS 변수 완전 세트

바로 복사해서 `:root`에 넣으면 되는 토큰 세트:

```css
:root {
  /* ========== Foundation ========== */
  --white:        #FFFFFF;
  --off-white:    #FAFAFA;
  --silver-veil:  #F3F0F8;
  --ink:          #1A1A2E;
  --slate:        #555566;

  /* ========== Primary · Lavender ========== */
  --lav-50:   #EDEAFC;
  --lav-100:  #D4CBF7;
  --lav-200:  #C2B5F5;
  --lav-500:  #A594F9;  /* 메인 */
  --lav-600:  #8170D8;
  --lav-800:  #4A3A8C;

  /* ========== Secondary · Baby Pink ========== */
  --pink-50:   #FFF0F4;
  --pink-100:  #FFD6E0;
  --pink-500:  #FFB3C6;  /* 메인 */
  --pink-600:  #F08BA6;
  --pink-800:  #A8456B;
  --pink-900:  #5A1F36;

  /* ========== Accent · Butter Yellow ========== */
  --yel-50:   #FFF9D1;
  --yel-100:  #FFF0A0;
  --yel-500:  #FFE663;  /* 메인 */
  --yel-600:  #D4B80F;
  --yel-800:  #6B5500;
  --yel-900:  #4A3B00;

  /* ========== Semantic · Categories ========== */
  --cat-heritage: var(--lav-500);
  --cat-market:   var(--pink-500);
  --cat-food:     var(--yel-500);
  --cat-story:    var(--lav-100);
  --cat-alleys:   var(--pink-100);
  --cat-nature:   var(--yel-500);

  /* ========== Semantic · UI States ========== */
  --color-bg-page:        var(--off-white);
  --color-bg-surface:     var(--white);
  --color-bg-subtle:      var(--silver-veil);
  --color-bg-brand:       var(--lav-500);
  --color-bg-brand-hover: var(--lav-600);

  --color-text-primary:   var(--ink);
  --color-text-secondary: var(--slate);
  --color-text-brand:     var(--lav-600);
  --color-text-on-brand:  var(--ink);  /* 파스텔 배경 위 */
  --color-text-on-dark:   var(--white); /* Ink 배경 위 */

  --color-border-subtle:  #E8E8F0;
  --color-border-brand:   var(--lav-500);
}
```

---

## 8. 사용 예시 패턴

### 8.1 기본 카드 (가장 자주 쓰이는 패턴)

```html
<article class="card">
  <div class="card__header">
    <span class="card__category">● HERITAGE</span>
    <h3 class="card__title">Soje-dong</h3>
  </div>
  <p class="card__body">Railway village, now cafés.</p>
</article>
```

```css
.card {
  background: var(--color-bg-surface);
  border: 0.5px solid var(--color-border-subtle);
  border-radius: 16px;
  padding: 20px;
}

.card__category {
  color: var(--cat-heritage);
  font-size: 10px;
  letter-spacing: 2px;
  font-weight: 500;
}

.card__title {
  color: var(--color-text-primary);
  font-weight: 500;
}

.card__body {
  color: var(--color-text-secondary);
  line-height: 1.7;
}
```

### 8.2 컬러 뱃지 (카테고리별 태그)

```html
<span class="badge badge--heritage">HERITAGE</span>
<span class="badge badge--market">MARKET</span>
<span class="badge badge--food">FOOD</span>
```

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 1px;
}

.badge--heritage {
  background: var(--lav-50);
  color: var(--lav-800);
}

.badge--market {
  background: var(--pink-50);
  color: var(--pink-800);
}

.badge--food {
  background: var(--yel-50);
  color: var(--yel-800);
}
```

### 8.3 CTA 버튼 (라벤더 Primary)

```html
<button class="btn btn--primary">Begin the walk</button>
<button class="btn btn--secondary">View map</button>
```

```css
.btn {
  padding: 12px 24px;
  border-radius: 30px;
  font-weight: 500;
  font-size: 13px;
  transition: background 0.2s;
}

.btn--primary {
  background: var(--lav-500);
  color: var(--ink);  /* 파스텔 배경 위 Ink */
}

.btn--primary:hover {
  background: var(--lav-600);
  color: var(--white);  /* 진한 배경 위 White */
}

.btn--secondary {
  background: var(--white);
  color: var(--ink);
  border: 1px solid var(--color-border-subtle);
}
```

### 8.4 이벤트 배너 (노랑 포인트)

```html
<div class="event-banner">
  <span class="event-banner__tag">NEW</span>
  <span class="event-banner__text">이번 주 추천 루트 공개</span>
</div>
```

```css
.event-banner {
  background: var(--yel-500);
  color: var(--ink);
  padding: 12px 20px;
  border-radius: 12px;
}
```

### 8.5 Field Note (Ink 반전)

```html
<blockquote class="field-note">
  <p class="field-note__quote">
    "If you miss the 7am light on the railway bricks, 
    you miss <em>half the point</em>."
  </p>
  <cite class="field-note__author">— Min-ji, local guide</cite>
</blockquote>
```

```css
.field-note {
  background: var(--ink);
  color: var(--white);
  border-radius: 20px;
  padding: 32px;
}

.field-note__quote em {
  color: var(--yel-500);  /* 13.61:1 — AAA */
  font-style: normal;
  font-weight: 500;
}

.field-note__author {
  color: rgba(255, 255, 255, 0.6);
}
```

---

## 9. 일러스트에서 3색 사용법

SVG 일러스트(스팟 카드 내부 이미지 등)에서 3색 조합 패턴:

### 9.1 Heritage (Soje-dong) 일러스트
- **배경**: `--lav-500`
- **건물 메인**: `--lav-800` (짙은 실루엣)
- **건물 보조**: `--lav-600`
- **창문 하이라이트**: `--yel-500` (노랑 포인트)
- **지면**: `--pink-500`

### 9.2 Market (Jungang) 일러스트
- **배경**: `--pink-500`
- **지붕**: `--pink-800`
- **좌판**: `--pink-900`
- **과일/가판 물건**: `--lav-500` + `--yel-500` 섞기
- **바닥**: `--pink-100`

### 9.3 Nature (Bomunsan) 일러스트
- **하늘**: `--yel-500`
- **태양**: `--white` (원형)
- **산맥 앞**: `--lav-500`
- **산맥 뒤**: `--lav-600`
- **나무**: `--pink-500`

**원칙**: 한 일러스트에 3색을 모두 쓰되, 주색 60% / 보조색 30% / 포인트 10% 비율 유지.

---

## 10. 빠른 체크리스트

### 10.1 개발 세팅

- [ ] 섹션 7의 CSS 변수 세트를 `:root`에 추가
- [ ] `--color-text-*`, `--color-bg-*` 시맨틱 변수만 컴포넌트에 쓰기 (하드코딩 금지)
- [ ] 카테고리 클래스 `.cat-heritage`, `.cat-market` 등 정의

### 10.2 디자인 작업

- [ ] Figma 라이브러리에 3색 스타일 등록
- [ ] 6개 카테고리 variants 정의
- [ ] 60-30-10 비율 체크 (전체 프레임 기준)

### 10.3 구현 전 검증

- [ ] 파스텔 배경 위에 White 텍스트 없는지 확인
- [ ] 라벤더 Solid 위에 Ink(`#1A1A2E`) 쓰고 있는지 확인
- [ ] 각 페이지에서 포인트 컬러(노랑)가 10% 이하인지 확인
- [ ] Chrome DevTools Contrast 체크 통과

### 10.4 QA

- [ ] Lighthouse 접근성 점수 95점 이상
- [ ] axe DevTools로 대비비 에러 0건
- [ ] 색맹 시뮬레이션 (Protanopia, Deuteranopia, Tritanopia)에서 카테고리 구분 가능

---

## 11. 자주 하는 실수

### 11.1 "라벤더 위에 흰 글자가 예뻐 보여요"

→ **예뻐 보여도 접근성 실패**. 2.56:1로 저시력 사용자가 읽을 수 없다. Ink 글자가 답.

### 11.2 "카테고리별로 완전히 다른 색 5개 쓰고 싶어요"

→ **그게 바로 이 시스템을 만든 이유**. 5개 다른 색 = 5개 다른 무드. 3색을 Solid/Tint/Combo로 변주하면 일관성 유지하며 6개 구분 가능.

### 11.3 "노랑을 더 많이 쓰고 싶어요, 밝으니까"

→ **노랑은 10%만**. 30% 넘으면 "주인공"이 되어서 라벤더의 브랜드 인식이 희석된다. 히어로 = 라벤더 + 포인트 노랑이 맞는 공식.

### 11.4 "Dark Mode는 이 색을 어떻게 변환해요?"

→ **별도 매핑 필요**. 파스텔 3색을 그대로 다크 배경에 쓰면 눈부시다. Dark Mode는 별도 문서(추후 작성 예정)로 다룬다. 당분간은 Light Mode만 공식 지원.

---

## 12. 참고 자료

- WCAG 2.1 Contrast Guidelines: https://www.w3.org/TR/WCAG21/#contrast-minimum
- Contrast Checker: https://webaim.org/resources/contrastchecker/
- Figma Color Styles 설정: Figma > Local Styles
- Chrome DevTools Accessibility 패널: Cmd+Shift+I → Lighthouse

---

**문서 끝.** 3색만으로 충분하고, 3색이라 더 좋다. 애매할 때는 이 문서로 돌아오세요.
