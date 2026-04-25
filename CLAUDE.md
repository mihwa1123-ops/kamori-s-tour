# kamori's tour

외국인 관광객 대상 한국 도시 탐방 플랫폼.
**현재 작업 범위**: `daejeon/slow` — 대전 중구·동구 원도심(대전역~보문산) 슬로우 트래블.
**확장 계획**: 서울·부산 등 다른 도시 추가 시 같은 디자인 시스템·컴포넌트 재사용.

> **Claude Code 자동 컨텍스트 파일**
> 이 파일은 Claude Code가 모든 세션 시작 시 자동으로 읽는 메인 브리핑이다.
> 새로운 작업 요청을 받으면 항상 이 문서와 docs/ 폴더의 5개 MD를 우선 참조한다.

---

## 🎯 프로젝트 개요

대전 중구·동구 원도심(대전역~보문산 근현대 거리) 외국인 관광객용 로컬 가이드 웹서비스.

- **타깃**: 외국인 관광객 (서울 외 도시 관심층)
- **언어**: 5개 (English · 日本語 · 한국어 · Español · 中文)
- **반응형**: PC + Tablet + Mobile
- **확장성**: 추후 타 지역으로 확장 가능한 설계
- **톤**: 정제되었지만 귀여운 (Refined yet friendly), 도파민 감성

---

## 📚 디자인 시스템 문서 (반드시 우선 참조)

모든 작업은 다음 5개 문서를 우선 참조한다. 새 컴포넌트·페이지·기능을 만들기 전에 해당 문서를 먼저 확인할 것.

### 1. [docs/color-system.md](./docs/color-system.md) — 컬러 시스템
- 3색 시스템 (라벤더 · 베이비 핑크 · 버터 옐로)
- WCAG 2.1 검증 결과 (29개 조합 중 24개 AA 통과)
- 6개 카테고리별 컬러 매핑
- CSS 변수 완전 세트

### 2. [docs/font-system.md](./docs/font-system.md) — 폰트 시스템
- 5개 언어별 폰트 매트릭스
- Zen Maru Gothic (일본어 메인)
- Fraunces + IBM Plex Sans (영어/스페인어)
- Gowun Batang/Dodum (한국어)
- Noto Sans SC (중국어)
- 웨이트 5단계 (Meta 300 · Body 400 · UI 500 · Title 700 · Hero 900)

### 3. [docs/layout-system.md](./docs/layout-system.md) — 레이아웃 시스템
- B안 Anti-Grid Organic 디자인 방향
- 3가지 블롭 쉐이프 (Heritage · Market · Nature)
- KV (Key Visual) 섹션 패턴
- 페이지 타입별 레이아웃 (홈, 스팟 상세, 지도)
- BlobMask React 컴포넌트

### 4. [docs/component-catalog.md](./docs/component-catalog.md) — 컴포넌트 카탈로그
- Atoms 5종 (Button, IconButton, Tag, Badge, NumberMarker)
- Molecules 5종 (Card, BlobMask, LanguageSwitcher, Avatar, InfoRow)
- Organisms 5종 (Header, SpotCard, FieldNote, RouteTimeline, BottomSheet)
- Templates 2종 (HomeLayout, SpotDetailLayout)

### 5. [docs/storybook-setup-guide.md](./docs/storybook-setup-guide.md) — Storybook 셋업
- React + Vite + Storybook 9+ 환경
- 5개 언어 전환 데코레이터
- 토큰 통합 (tokens.css)
- 자동 테스트 (Interaction · A11y · Visual)
- CI/CD 자동 배포

---

## 🚦 작업 원칙 (반드시 지킬 것)

### 컬러
- **하드코딩 절대 금지** — `color: #A594F9` 같은 직접 입력 금지
- **변수만 사용** — `color: var(--lav-500)`
- **파스텔 배경 위 흰 글자 금지** — WCAG AA 미달 (color-system.md 섹션 6 참조)
- **Golden Rule**: 파스텔 배경에는 항상 `var(--ink)` 텍스트

### 폰트
- **언어별 자동 분기** — `html[lang]` CSS로 자동 적용 (수동 지정 불필요)
- **이탤릭 주의** — CJK 언어(일본어·한국어·중국어)에는 이탤릭 사용 금지, 대신 굵게+컬러로 강조
- **본문 최소 16px** — 모바일 가독성

### 레이아웃
- **블롭 쉐이프 매핑 고정**: Heritage→H, Market→M, Nature→K (절대 바꾸지 말 것)
- **Anti-Grid는 KV·강조 섹션만** — 카드 리스트 등은 일반 그리드
- **블롭 쉐이프는 한 페이지 카테고리당 최대 1번** — 시그니처 강하게 유지
- **모바일에서 블롭 1개로 축소** — 한 손 스크롤 시선 동선 단순화

### 컴포넌트
- **새 컴포넌트 만들기 전 카탈로그 확인** — 비슷한 게 있으면 variant 추가로 해결
- **모든 컴포넌트는 Storybook 스토리 함께 생성** — `.tsx`와 `.stories.tsx` 페어
- **5개 언어 모두 테스트** — 다국어 지원 컴포넌트는 5개 언어 스토리 필수
- **a11y 위반 0개** — `@storybook/addon-a11y` 패널 빨간색 0개

### 접근성
- **터치 타겟 최소 44×44px** (모바일)
- **WCAG AA 충족** (color-system.md 섹션 6 검증 결과 참조)
- **`prefers-reduced-motion` 대응** — 블롭 회전 자동 해제
- **의미 있는 alt 텍스트** — 파일명 금지

---

## 📁 프로젝트 구조

```
kamoris-tour/
├── CLAUDE.md                          ← 이 문서
├── README.md
├── package.json
├── vite.config.ts
├── tsconfig.json
│
├── .storybook/
│   ├── main.ts
│   ├── preview.ts                     ← 5개 언어 데코레이터
│   └── manager.ts
│
├── .claude/
│   └── commands/                      ← 슬래시 커맨드
│       ├── component.md
│       ├── verify.md
│       ├── deploy-check.md
│       └── new-page.md
│
├── .github/
│   └── workflows/
│       ├── storybook-test.yml
│       └── chromatic.yml
│
├── docs/                              ← 5개 디자인 시스템 문서
│   ├── color-system.md
│   ├── font-system.md
│   ├── layout-system.md
│   ├── component-catalog.md
│   └── storybook-setup-guide.md
│
├── assets/
│   └── shapes/
│       ├── shape-heritage.svg
│       ├── shape-market.svg
│       └── shape-nature.svg
│
├── src/
│   ├── styles/
│   │   ├── tokens.css                 ← 모든 디자인 토큰
│   │   ├── global.css                 ← reset + html[lang] 폰트 분기
│   │   └── components.css             ← 컴포넌트 베이스 스타일
│   │
│   ├── components/
│   │   ├── atoms/                     ← Button, IconButton, Tag, Badge, NumberMarker
│   │   ├── molecules/                 ← Card, BlobMask, LanguageSwitcher, Avatar, InfoRow
│   │   ├── organisms/                 ← Header, SpotCard, FieldNote, RouteTimeline, BottomSheet
│   │   └── templates/                 ← HomeLayout, SpotDetailLayout
│   │
│   ├── stories/
│   │   └── Foundation/                ← MDX 시각화 페이지
│   │       ├── Colors.mdx
│   │       ├── Typography.mdx
│   │       ├── Spacing.mdx
│   │       └── Shapes.mdx
│   │
│   ├── i18n/
│   │   ├── config.ts                  ← i18next 설정
│   │   ├── LanguageSync.tsx           ← <html lang> 자동 갱신
│   │   └── locales/
│   │       ├── en/
│   │       ├── ja/
│   │       ├── ko/
│   │       ├── es/
│   │       └── zh/
│   │
│   └── App.tsx
│
└── public/
    └── photos/                        ← 스팟 이미지
```

---

## 🛠️ 자주 쓰는 명령어

### 개발
```bash
npm run dev               # Vite 개발 서버
npm run storybook         # Storybook (포트 6006)
npm run build             # 프로덕션 빌드
npm run build-storybook   # Storybook 정적 빌드
```

### 테스트
```bash
npm run test              # Vitest 단위 테스트
npm run test-storybook    # Storybook 컴포넌트 테스트 (a11y + visual + interaction)
```

### Claude Code 슬래시 커맨드
```
/component <이름>          # 컴포넌트 + 스토리 한꺼번에 생성
/verify                   # 디자인 시스템 정합성 전체 검증
/deploy-check             # 배포 직전 체크리스트 자동 확인
/new-page <페이지명>       # 새 페이지 만들기 (레이아웃 패턴 적용)
```

---

## 🎨 핵심 디자인 토큰 (빠른 참조)

### 컬러 (3색)
- Primary: `--lav-500` (#A594F9) — Lavender
- Secondary: `--pink-500` (#FFB3C6) — Baby Pink
- Accent: `--yel-500` (#FFE663) — Butter Yellow

### Foundation
- 메인 텍스트: `--ink` (#1A1A2E)
- 부 텍스트: `--slate` (#555566)
- 페이지 배경: `--off-white` (#FAFAFA)

### 폰트 웨이트
- `--fw-meta`: 300 (메타 정보)
- `--fw-body`: 400 (본문)
- `--fw-ui`: 500 (UI·버튼)
- `--fw-title`: 700 (제목)
- `--fw-hero`: 900 (히어로)

### 간격 (8pt 기반)
- `--space-1` ~ `--space-10` = 4px ~ 128px

### 카테고리 매핑
| 카테고리 | 컬러 | 블롭 쉐이프 |
|---------|-----|----------|
| Heritage | `--lav-500` | `shape-heritage.svg` |
| Market | `--pink-500` | `shape-market.svg` |
| Food | `--yel-500` | (블롭 없음) |
| Story | `--lav-100` (tint) | (블롭 없음) |
| Alleys | `--pink-100` (tint) | (블롭 없음) |
| Nature | `--yel-500` + `--lav-500` | `shape-nature.svg` |

---

## 🔄 작업 흐름

### 새 컴포넌트 만들기

1. `docs/component-catalog.md`에서 명세 확인
2. 비슷한 컴포넌트가 이미 있는지 확인 (있으면 variant 추가)
3. `src/components/{atoms|molecules|organisms}/ComponentName.tsx` 작성
4. `ComponentName.stories.tsx` 작성 (모든 variant + 5개 언어)
5. Storybook에서 시각 검증
6. `tags: ['autodocs']` 자동 문서화 활성
7. a11y 패널 0 위반 확인

또는 슬래시 커맨드 사용:
```
/component Button
```

### 새 페이지 만들기

1. `docs/layout-system.md` 섹션 7에서 페이지 타입 확인
2. 어떤 컴포넌트들을 조합할지 결정 (component-catalog.md 참조)
3. 모바일·태블릿·PC 3가지 viewport 모두 검증
4. 5개 언어 모두 테스트

또는 슬래시 커맨드 사용:
```
/new-page SpotDetail
```

### 디자인 시스템 변경

1. 해당 문서 (5개 MD 중 하나) 먼저 수정
2. `tokens.css`의 변수 값 갱신
3. `/verify` 슬래시 커맨드로 정합성 검증
4. 영향받는 컴포넌트 전체 Storybook 검증

---

## ⚠️ 절대 하지 말 것

- ❌ **`#A594F9` 같은 컬러 하드코딩** — 항상 `var(--lav-500)` 사용
- ❌ **카테고리 ↔ 블롭 쉐이프 매핑 변경** — Heritage는 영원히 H, 마음대로 바꾸지 말 것
- ❌ **파스텔 배경 위 흰 글자** — 접근성 실패
- ❌ **CJK 언어에 이탤릭** — 글자가 깨짐
- ❌ **카탈로그 외 임의 컴포넌트 생성** — 비슷한 게 있으면 variant 확장
- ❌ **5개 언어 중 일부 누락** — 모두 동일하게 지원
- ❌ **`z-index: 9999` 하드코딩** — `var(--z-*)` 변수만 사용
- ❌ **단순 번역으로 다국어 처리** — Transcreation 필요한 카피는 원어민 작성

---

## 💬 Claude Code와 대화할 때

### 작업 시작 전
- "Plan Mode로 계획 보여줘" (Shift+Tab)
- "현재 프로젝트 상태 확인해줘" (`ls`, `git log`)
- "이전 세션에서 뭐까지 했지?" 명시적으로 알려주기

### 작업 중
- 한 메시지에 여러 작업 묶기 (병렬 처리)
- 중간 체크포인트마다 "잠깐 멈추고 보여줘"
- 잘못된 방향이면 "잠깐, 다시 시작" 적극 사용

### 작업 후
- `git commit` 항상 만들기 (롤백 포인트)
- 다음 작업 전 검증부터

---

## 📞 트러블슈팅

문제 발생 시 `docs/` 의 해당 문서 후반부 "자주 마주치는 문제" 섹션 참조:
- 컬러 관련 → `color-system.md` 섹션 11
- 폰트 관련 → `font-system.md` 섹션 11
- 레이아웃 관련 → `layout-system.md` 섹션 12
- 컴포넌트 관련 → `component-catalog.md` 섹션 7
- Storybook 관련 → `storybook-setup-guide.md` 섹션 11

---

**이 문서는 Claude Code의 자동 컨텍스트로 모든 세션에서 참조됩니다.**
**5개 디자인 시스템 문서와 함께, 일관된 결과물을 보장하는 핵심 인덱스입니다.**
