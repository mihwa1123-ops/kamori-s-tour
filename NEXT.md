# Day 1 → Day 2 인계 메모

> 이 파일은 Day 2 첫 세션 시작 시 빠른 컨텍스트 복원용.
> 사람·세션·Claude 모두에게 유효한 단일 출처.

---

## ✅ Day 1 완성 (Sessions 1~4)

### Session 1 — 셋업
- React 18 + Vite 5 + TypeScript 5 + Storybook 9.1.20
- 토큰 통합 `src/styles/tokens.css` (컬러·폰트 웨이트·폰트 패밀리·간격·z-index·shadow)
- `src/styles/global.css` (reset + `html[lang]` 5개 언어 폰트 분기 + reduced-motion)
- `.storybook/preview.tsx` (5개 언어 데코레이터 + viewport 4종 + backgrounds 7종 + Google Fonts)

### Session 2 — Atoms 5종 (47 stories)
- **Button** (4 variants × 3 sizes + 다국어 5)
- **IconButton** (2 × 2)
- **Tag** (8 variants × 2 sizes)
- **Badge** (6 categories × 3 sizes)
- **NumberMarker** (4 × 3)

### Session 3 — Molecules 5종 (35 stories, 누적 82개)
- **BlobMask** ⭐ (heritage/market/nature, `useId()` 충돌 방지, blob-shaped placeholder)
- **Card** (3 variants × 3 paddings × 3 tints + hoverable)
- **LanguageSwitcher** (uncontrolled state + html.lang 갱신, ARIA listbox)
- **Avatar** (image/initials 2-mode)
- **InfoRow** (icon optional with `:has()` column shrink)

### Session 4 — 정리·검증
- `/verify` 9개 정적 분석 항목 모두 통과 (컬러 하드코딩 0, Golden Rule 준수, 카테고리 매핑 일치)
- **그림자 토큰 추가**: `--shadow-sm`, `--shadow-md` (Card hover, Dropdown 에서 사용)
- 빌드 검증: `npm run build` (JS gzip 45.84 kB) + `build-storybook` 모두 성공

---

## 🎯 Day 2 작업 (Session 5~8)

### Session 5 — Organisms 5종
- **Header** (sticky, transparent/solid variant)
- **SpotCard** (BlobMask + Tag + Badge 조합)
- **FieldNote** (Card dark + Avatar + 강조어, CJK 이탤릭 해제 필요)
- **RouteTimeline** (NumberMarker × 6, horizontal/vertical 레이아웃)
- **BottomSheet** (모바일 only, 드래그 시트)

### Session 6 — Foundation MDX + i18next
- `src/stories/Foundation/{Colors, Typography, Spacing, Shapes}.mdx`
- `i18next` + `react-i18next` + `i18next-browser-languagedetector` 설치
- `src/i18n/config.ts` 작성 (5개 언어 + JSON locales)
- `LanguageSwitcher` 를 i18next 와 통합 (props 만 추가, 내부 로직 마이그레이션)
- `LanguageSync` 컴포넌트로 `<html lang>` 자동 갱신

### Session 7 — Templates + 페이지
- **HomeLayout** (KV Anti-Grid + Three Alleys + FieldNote + Route Preview)
- **SpotDetailLayout** (Hero + Body + Sticky sidebar + Floating CTA)
- 라우팅 (`react-router-dom`)
- 5개 언어 URL 구조 `/{lang}/spot/{id}`

### Session 8 — 배포
- `npm run build` 최적화 (manualChunks 검토)
- Vercel/Chromatic 배포
- CI/CD (`.github/workflows/storybook-test.yml`, `chromatic.yml`)
- Lighthouse 점수 90+ 검증

---

## ⚠️ 이월된 작은 이슈

- **`--lav-300`, `--pink-300` 미정의** → 현재 `Badge.css` 가 `var(--lav-300, var(--lav-200))` 폴백 사용. Day 2 디자인 결정에 따라 토큰 추가 가능.
- **컴포넌트별 `index.ts` barrel** → atoms / molecules 만 있음. organisms / templates 에도 동일 패턴.

---

## 📌 절대 깨면 안 되는 규칙

- **BlobMask 는 디자인 시그니처** — 회귀 절대 안 됨. 새 페이지 만들 때 `Molecules/BlobMask/SameShapeMultiple` 스토리 시각 회귀 필수 확인.
- **Golden Rule**: 파스텔 배경 위 텍스트는 항상 `var(--ink)`. 진한 배경(600/800/ink)에서만 `var(--white)` 허용.
- **카테고리 ↔ 쉐이프 고정 매핑**: Heritage→H, Market→M, Nature→K. 절대 바꾸지 말 것.
- **CSS 변수만 사용** — hex 직접 입력 금지 (`tokens.css` 외).
- **모든 `.tsx` 옆에 `.stories.tsx`** — 페어 누락 금지.

---

## 🚀 Day 2 시작 명령

```bash
cd "/Users/mihwa/Kamori's Tour/kamoris-tour"
git log --oneline | head -5         # 4개 커밋 (Session 1~4) 확인
npm run storybook                   # Storybook 기동 (사이드바에 10개 컴포넌트)
```

그 후 `session-prompts/session-5-organisms.md` 의 "첫 메시지" 복붙해서 Claude Code 에 전달.
