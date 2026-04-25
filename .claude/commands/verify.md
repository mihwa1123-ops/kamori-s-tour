---
description: 디자인 시스템 정합성을 전체 검증
---

# /verify 명령어

전체 코드베이스가 디자인 시스템 5개 문서와 일치하는지 자동 검증한다.

## 실행 단계

### 1단계: 컬러 하드코딩 검사
- 모든 `.tsx`, `.ts`, `.css` 파일에서 hex 컬러 직접 사용 검색
- 패턴: `#[0-9A-Fa-f]{3,8}`
- `tokens.css` 파일은 제외
- 발견된 하드코딩을 변수로 교체할 것 제안:
  - `#A594F9` → `var(--lav-500)`
  - `#FFB3C6` → `var(--pink-500)`
  - `#FFE663` → `var(--yel-500)`
  - `#1A1A2E` → `var(--ink)`
  - 기타 컬러는 가장 가까운 시스템 색상 매핑 제안

### 2단계: 카테고리 ↔ 블롭 쉐이프 매핑 검증
- BlobMask 사용처 모두 검색
- Heritage 카테고리 → `shape="heritage"` 인지
- Market 카테고리 → `shape="market"` 인지
- Nature 카테고리 → `shape="nature"` 인지
- Food/Story/Alleys는 BlobMask 사용 안 했는지
- 위반 시 자동 수정 제안

### 3단계: 파스텔 배경 위 흰 글자 검사
WCAG AA 위반 패턴 검색:
- `background: var(--lav-500)` + `color: var(--white)` 조합
- `background: var(--pink-500)` + `color: var(--white)` 조합
- `background: var(--yel-500)` + `color: var(--white)` 조합
- 발견 시 `color: var(--ink)` 로 변경 제안

### 4단계: 카탈로그 일치성
- `src/components/` 의 모든 컴포넌트 목록 추출
- `docs/component-catalog.md` 의 컴포넌트 목록과 비교
- 카탈로그에 없는 컴포넌트 발견 시 보고 (카탈로그에 추가하거나 삭제 권장)
- 카탈로그에는 있지만 구현 안 된 것도 보고

### 5단계: 모든 컴포넌트에 스토리 존재 확인
- 각 `Component.tsx` 마다 `Component.stories.tsx` 페어 존재 확인
- 누락된 스토리 파일 보고

### 6단계: 5개 언어 폰트 분기 검증
- `src/styles/global.css` 또는 `tokens.css` 에서:
  - `html[lang="ja"]` Zen Maru Gothic
  - `html[lang="ko"]` Gowun 폰트
  - `html[lang="zh"]` Noto Sans SC
  - `html[lang="en"]`, `html[lang="es"]` Fraunces + IBM Plex Sans
- 5개 언어 모두 분기 존재하는지 확인

### 7단계: CJK 이탤릭 검사
- 모든 컴포넌트에서 `font-style: italic` 사용처 검색
- CJK 언어 분기에서 이탤릭 해제 (`font-style: normal`) 적용됐는지 확인:
```css
html[lang="ja"] .my-element,
html[lang="ko"] .my-element,
html[lang="zh"] .my-element {
  font-style: normal;
  font-weight: var(--fw-title);
}
```

### 8단계: z-index 하드코딩 검사
- `z-index: <숫자>` 직접 사용 검색
- `tokens.css` 의 `--z-*` 변수만 사용해야 함
- 위반 시 적절한 변수로 변경 제안

### 9단계: 접근성 기본 검사
- `<button>` 에 텍스트 또는 `aria-label` 있는지
- `<img>` 에 `alt` 속성 있는지
- 클릭 가능한 div에 `role`, `tabIndex` 있는지
- Heading 계층 점프 검사 (h1 → h3 같은 점프 금지)

### 10단계: 빌드 가능성 확인
- `npm run build` 실행
- `npm run build-storybook` 실행
- 둘 다 에러 없이 통과하는지 확인

## 보고 형식

```
✅ 통과 항목
- 컬러 하드코딩: 0건
- 블롭 쉐이프 매핑: 정상
- 파스텔 배경 흰 글자: 0건
- ...

⚠️ 경고 항목
- src/components/atoms/EventBanner.tsx 가 카탈로그에 없음
- src/components/molecules/Card.tsx 의 hover 시 변경 컬러가 비표준

❌ 오류 항목
- src/components/organisms/Footer.tsx 에 #A594F9 하드코딩 (라인 23)
  → var(--lav-500) 로 변경 필요

📊 요약
총 검사: 10개
통과: 7개
경고: 2개
오류: 1개
```

## 자동 수정 옵션

오류 발견 시 사용자에게 묻기:
"위 X개 오류를 자동 수정할까요? (y/n)"

승인 시 안전한 항목만 자동 수정:
- 컬러 하드코딩 → 변수 교체
- z-index 하드코딩 → 변수 교체
- alt 누락 → 빈 alt 추가 (장식용 이미지 가정)

복잡한 항목은 자동 수정하지 말고 보고만:
- 파스텔 배경 흰 글자 (디자인 의도 확인 필요)
- 카탈로그 누락 (사용자가 카탈로그 업데이트해야 함)
