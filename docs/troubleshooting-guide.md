# 트러블슈팅 가이드

> daejeon/slow 프로젝트 진행 중 자주 마주치는 30가지 문제와 해결책
> 카테고리별 분류로 빠르게 검색 가능

---

## 📂 카테고리 인덱스

1. [Storybook 설치 & 실행 (5)](#1-storybook-설치--실행)
2. [디자인 토큰 (4)](#2-디자인-토큰)
3. [컬러 시스템 (4)](#3-컬러-시스템)
4. [폰트 시스템 (4)](#4-폰트-시스템)
5. [블롭 쉐이프 (4)](#5-블롭-쉐이프)
6. [레이아웃 (3)](#6-레이아웃)
7. [다국어 (3)](#7-다국어)
8. [빌드 & 배포 (3)](#8-빌드--배포)

---

## 1. Storybook 설치 & 실행

### Q1. `npx storybook init` 가 멈춰있음
**증상**: 설치 명령어가 30분 이상 진행 안 됨

**원인**: 
- 네트워크 문제
- Node 버전 호환 안 됨
- 기존 Storybook 캐시

**해결**:
```bash
# 1. Node 버전 확인 (18 이상 필요)
node --version

# 2. npm 캐시 정리
npm cache clean --force

# 3. 기존 Storybook 흔적 제거
rm -rf .storybook node_modules package-lock.json
rm -rf storybook-static

# 4. 다시 시도
npm install
npx storybook@latest init
```

---

### Q2. `npm run storybook` 실행 시 포트 6006 충돌
**증상**: "Port 6006 is in use" 에러

**해결**:
```bash
# 다른 포트 사용
npm run storybook -- -p 6007

# 또는 6006 점유 프로세스 종료
lsof -ti:6006 | xargs kill -9
```

`package.json` 영구 변경:
```json
"scripts": {
  "storybook": "storybook dev -p 6007"
}
```

---

### Q3. Storybook 사이드바가 비어있음
**증상**: Storybook 실행되지만 아무 스토리도 안 보임

**원인**: `.storybook/main.ts` 의 `stories` 경로가 잘못됨

**해결**:
```typescript
// .storybook/main.ts
const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  // ...
};
```

`src/` 외 다른 위치(예: `components/`)에 있다면 경로 수정.

---

### Q4. Storybook 빌드 시 메모리 부족
**증상**: "JavaScript heap out of memory"

**해결**:
```bash
# 빌드 명령에 메모리 제한 늘리기
NODE_OPTIONS="--max-old-space-size=4096" npm run build-storybook
```

`package.json`:
```json
"scripts": {
  "build-storybook": "NODE_OPTIONS='--max-old-space-size=4096' storybook build"
}
```

---

### Q5. Storybook 의 hot reload 안 됨
**증상**: 코드 수정해도 Storybook 화면이 갱신 안 됨

**해결**:
1. 파일 확장자 확인 (`.stories.tsx` 또는 `.stories.jsx`)
2. `.storybook/main.ts` 의 `stories` 패턴이 해당 파일을 포함하는지
3. Vite 캐시 정리:
```bash
rm -rf node_modules/.vite
npm run storybook
```

---

## 2. 디자인 토큰

### Q6. CSS 변수가 빈 값으로 처리됨
**증상**: `var(--lav-500)` 가 적용 안 되고 기본값으로 표시

**원인**: `tokens.css` 가 import 되지 않음

**해결**:
```typescript
// .storybook/preview.ts 최상단
import '../src/styles/tokens.css';
import '../src/styles/global.css';
```

또는 Vite 앱의 경우:
```typescript
// src/main.tsx
import './styles/tokens.css';
import './styles/global.css';
```

---

### Q7. `:root` 변수가 일부만 적용됨
**증상**: 특정 컴포넌트에서만 변수가 작동, 다른 데서는 안 됨

**원인**: 컴포넌트 CSS 가 `tokens.css` 보다 먼저 로드됨

**해결**: import 순서 수정
```typescript
// 항상 tokens.css 먼저
import './styles/tokens.css';     // 1순위
import './styles/global.css';     // 2순위
import './styles/components.css'; // 3순위
```

---

### Q8. 새 토큰 추가했는데 인식 안 됨
**증상**: `--new-color: #ff0000` 추가했는데 `var(--new-color)` 안 됨

**해결**:
1. `tokens.css` 가 `:root {}` 블록 안에 정의됐는지 확인
2. Storybook 재시작 (toml 변경 시 hot reload 안 됨)
3. 브라우저 캐시 강제 새로고침 (Cmd+Shift+R)

---

### Q9. 디자인 토큰이 4개 MD 문서와 다름
**증상**: 카탈로그에는 `--lav-500: #A594F9` 인데 실제 코드는 `#A689F2`

**해결**: `/verify` 슬래시 커맨드 실행해서 자동 비교
```
/verify
```

또는 수동으로 `tokens.css` 를 5개 MD 의 변수 정의와 1:1 매칭 확인.

---

## 3. 컬러 시스템

### Q10. 라벤더 배경 위 흰 글자가 안 보임
**증상**: `background: var(--lav-500); color: var(--white);` 시 텍스트 흐릿

**원인**: WCAG 대비비 2.56:1 (AA 기준 4.5:1 미달)

**해결**: Golden Rule 적용 — 파스텔 배경에는 항상 Ink
```css
.btn--primary {
  background: var(--lav-500);
  color: var(--ink);  /* 6.66:1 — AA 통과 */
}
```

`docs/color-system.md` 섹션 6.5 참조.

---

### Q11. 카테고리별 컬러 매핑이 헷갈림
**증상**: Heritage 가 핑크색으로 표시되거나, Market 이 라벤더로 보임

**해결**: 매핑 표 암기 (또는 항상 카탈로그 참조)
```
Heritage  → Lavender (--lav-500)
Market    → Pink     (--pink-500)
Food      → Yellow   (--yel-500)
Story     → Lavender tint (--lav-100)
Alleys    → Pink tint     (--pink-100)
Nature    → Yellow + Lavender (조합)
```

`docs/color-system.md` 섹션 5.1 참조.

---

### Q12. 일러스트에서 3색 비율이 안 맞음
**증상**: 한 일러스트에 노랑이 60% 차지, 라벤더는 보조

**해결**: 60-30-10 법칙 적용
- 60% Foundation (배경)
- 30% Primary (라벤더 또는 카테고리 주색)
- 10% Accent (포인트)

면적 비율을 시각적으로 측정 후 조정.

---

### Q13. WCAG 검증이 실패함
**증상**: a11y 패널에 "color-contrast" 위반

**해결 절차**:
1. 위반된 조합 확인 (텍스트 색 + 배경 색)
2. `docs/color-system.md` 섹션 6.4 의 금지 조합 표 확인
3. Golden Rule 적용:
   - 파스텔 배경 → Ink 텍스트
   - 진한 배경 (600 이상) → White 텍스트

---

## 4. 폰트 시스템

### Q14. 한국어/일본어가 시스템 폰트로 보임
**증상**: Storybook 에서 한글이 굴림체, 일본어가 MS Gothic 같은 기본 폰트

**원인**: Google Fonts 가 로드 안 됨

**해결**:
```typescript
// .storybook/preview.ts
const fontLink = document.createElement('link');
fontLink.rel = 'stylesheet';
fontLink.href = 'https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@300;400;500;700;900&family=Gowun+Batang:wght@400;700&family=Gowun+Dodum&family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,400&family=IBM+Plex+Sans:wght@300;400;500;700&family=Noto+Sans+SC:wght@300;400;500;700;900&display=swap';
document.head.appendChild(fontLink);
```

---

### Q15. 언어 전환해도 폰트가 안 바뀜
**증상**: LanguageSwitcher 클릭 시 텍스트 언어는 바뀌지만 폰트는 그대로

**원인**: `<html lang>` 속성이 갱신 안 됨

**해결**:
```typescript
// .storybook/preview.ts
const withLanguage = (Story, context) => {
  const { locale } = context.globals;
  
  useEffect(() => {
    document.documentElement.lang = locale;  // 이 줄 필수
  }, [locale]);
  
  return <Story />;
};

// global.css 또는 tokens.css 에서 분기
html[lang="ja"] { font-family: 'Zen Maru Gothic', sans-serif; }
html[lang="ko"] { font-family: 'Gowun Dodum', sans-serif; }
html[lang="zh"] { font-family: 'Noto Sans SC', sans-serif; }
```

---

### Q16. 일본어/한국어 인용문에서 이탤릭이 깨짐
**증상**: 한국어 텍스트가 비스듬하게 기울어져 글자가 깨져 보임

**해결**: CJK 언어에서 이탤릭 자동 해제
```css
.field-note__quote {
  font-style: italic;  /* 기본: 영어/스페인어 */
}

html[lang="ja"] .field-note__quote,
html[lang="ko"] .field-note__quote,
html[lang="zh"] .field-note__quote {
  font-style: normal;       /* CJK 해제 */
  font-weight: var(--fw-title);  /* 대신 굵게로 강조 */
}
```

---

### Q17. 폰트 weight 가 적용 안 됨
**증상**: `font-weight: 700` 인데 굵게 표시 안 됨

**원인**: Google Fonts URL 에 해당 weight 가 누락됨

**해결**: URL 의 `wght@` 부분 확인
```
family=Zen+Maru+Gothic:wght@300;400;500;700;900
                          ↑   ↑   ↑   ↑   ↑
                          모두 포함됐는지
```

누락된 weight 가 있다면 URL 수정 후 페이지 새로고침.

---

## 5. 블롭 쉐이프

### Q18. BlobMask 가 사각형으로 보임
**증상**: 마스킹 적용 안 되고 일반 사각 이미지로 표시

**원인**: SVG path 데이터 누락 또는 잘못된 viewBox

**해결**:
```typescript
// docs/layout-system.md 섹션 2.3 의 SVG path 정확히 복사
const SHAPES = {
  heritage: "M127.5 0C150.972 0 170 19.0279 ...",
  market: "M127.5 0C150.972 6.4426e-07 170 19.0279 ...",
  nature: "M44.9209 0C61.141 1.41801e-06 ...",
};
```

`viewBox="0 0 170 170"` + `preserveAspectRatio="xMidYMid meet"` 확인.

---

### Q19. 같은 페이지에 BlobMask 여러 개 두면 마지막만 보임
**증상**: BlobMask 3개 중 마지막 것만 정상, 나머지는 빈 박스

**원인**: clipPath 의 id 가 중복

**해결**: React useId 훅 사용
```tsx
import { useId } from 'react';

export function BlobMask({ shape, src, alt }: BlobMaskProps) {
  const reactId = useId();
  const clipId = `clip-${shape}-${reactId.replace(/:/g, '')}`;
  
  return (
    <svg viewBox="0 0 170 170">
      <defs>
        <clipPath id={clipId}>
          <path d={SHAPES[shape]} />
        </clipPath>
      </defs>
      <image clipPath={`url(#${clipId})`} ... />
    </svg>
  );
}
```

---

### Q20. 회전이 부모 컨테이너 밖으로 삐져나감
**증상**: 회전된 블롭의 일부가 카드 경계 밖에서 잘림

**해결**:
```css
.blob-mask svg {
  overflow: visible;  /* 잘림 방지 */
}

.blob-mask {
  /* 부모 컨테이너에 충분한 padding */
  padding: 8px;
}

.spot-card {
  /* 또는 부모가 overflow 처리 */
  overflow: visible;
}
```

---

### Q21. 카테고리 ↔ 쉐이프 매핑이 어긋남
**증상**: Heritage 카테고리인데 Market 쉐이프(M)가 적용됨

**해결**: 매핑 고정 — 절대 바꾸지 말 것
```
Heritage → shape="heritage" (H 형태, 두 지붕)
Market   → shape="market"   (M 형태, 좌판 4개)
Nature   → shape="nature"   (K 형태, 산 능선)
```

`/verify` 슬래시 커맨드로 자동 검증 가능.

---

## 6. 레이아웃

### Q22. 모바일에서 KV 블롭 2개 다 보임
**증상**: 좁은 화면에 비대칭 블롭 2개로 어수선

**해결**: 모바일에서 Heritage 블롭 자동 숨김
```css
@media (max-width: 1023px) {
  .kv__blob--heritage {
    display: none;
  }
  
  .kv__blob--nature {
    position: relative;
    width: 80%;
    max-width: 320px;
    margin: 0 auto;
  }
}
```

`docs/layout-system.md` 섹션 5.5 참조.

---

### Q23. 사이드바가 sticky 안 됨
**증상**: 스크롤하면 사이드바도 따라 올라감

**해결**:
```css
.spot-detail__sidebar {
  position: sticky;
  top: 100px;          /* Header 높이 + 여유 */
  height: fit-content;
  align-self: start;   /* Grid 안에서 sticky 작동 위해 */
}

/* 모바일에서는 sticky 해제 */
@media (max-width: 1023px) {
  .spot-detail__sidebar {
    position: static;
  }
}
```

부모 컨테이너에 `overflow: hidden` 이 있으면 sticky 작동 안 함.

---

### Q24. Floating CTA 가 콘텐츠를 가림
**증상**: 페이지 하단에 도달했을 때 CTA 가 마지막 콘텐츠를 가림

**해결**: 페이지 하단에 padding 추가
```css
@media (max-width: 1023px) {
  main {
    padding-bottom: 80px;  /* Floating CTA 높이만큼 */
  }
}
```

---

## 7. 다국어

### Q25. 일부 언어에서 텍스트가 잘림
**증상**: 독일어/스페인어에서 단어가 길어 카드 밖으로 넘침

**해결**:
```css
.spot-card__title {
  word-break: break-word;
  hyphens: auto;
  
  /* 또는 강제 줄바꿈 허용 */
  overflow-wrap: anywhere;
}
```

또는 폰트 사이즈를 언어별로 조정 (`docs/font-system.md` 섹션 4):
```css
html[lang="es"] .spot-card__title {
  font-size: 0.92em;  /* 살짝 축소 */
}
```

---

### Q26. 5개 언어 중 하나만 누락된 콘텐츠
**증상**: 영어/일본어/한국어/스페인어는 있는데 중국어 번역 없음

**해결**: i18next 의 fallback 설정
```typescript
// src/i18n/config.ts
i18n.init({
  fallbackLng: 'en',  // 누락 시 영어로 표시
  // ...
});
```

또는 빌드 시 누락된 키 자동 검출:
```bash
npx i18next-parser  # 누락된 번역 키 리포트
```

---

### Q27. URL 의 언어 prefix 와 i18n 상태가 안 맞음
**증상**: URL 은 `/ja/...` 인데 화면은 영어로 표시

**해결**:
```typescript
// src/i18n/LanguageSync.tsx
import { useLocation } from 'react-router-dom';

export function LanguageSync() {
  const { i18n } = useTranslation();
  const location = useLocation();
  
  useEffect(() => {
    // URL prefix 추출
    const match = location.pathname.match(/^\/(en|ja|ko|es|zh)/);
    const urlLang = match?.[1];
    
    if (urlLang && urlLang !== i18n.language) {
      i18n.changeLanguage(urlLang);
    }
    
    document.documentElement.lang = i18n.language;
  }, [location.pathname, i18n.language]);
  
  return null;
}
```

---

## 8. 빌드 & 배포

### Q28. 빌드 사이즈가 너무 큼 (300KB+)
**증상**: 메인 번들이 목표 200KB 초과

**해결**:
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-i18n': ['i18next', 'react-i18next'],
          'vendor-ui': ['@radix-ui/react-dropdown-menu'],  // 사용 시
        },
      },
    },
  },
});
```

번들 분석:
```bash
npm run build -- --mode analyze
```

---

### Q29. GitHub Actions 워크플로우 실패
**증상**: CI 에서 빌드는 성공하는데 test-storybook 단계 실패

**원인**: Storybook 서버가 시작 안 된 상태에서 테스트 실행

**해결**:
```yaml
# .github/workflows/storybook-test.yml
- name: Build Storybook
  run: npm run build-storybook --quiet

- name: Serve Storybook and run tests
  run: |
    npx concurrently -k -s first -n "SB,TEST" -c "magenta,blue" \
      "npx http-server storybook-static --port 6006 --silent" \
      "npx wait-on tcp:6006 && npm run test-storybook"
```

`concurrently` + `wait-on` 으로 서버 대기 후 테스트.

---

### Q30. Chromatic 시각 회귀에서 false positive 너무 많음
**증상**: 코드 변경 안 했는데 Chromatic 이 차이 감지

**원인**: 폰트 렌더링 차이, 애니메이션 시점 차이 등

**해결**:
```typescript
// .storybook/preview.ts
const preview: Preview = {
  parameters: {
    chromatic: {
      // 애니메이션 무시
      pauseAnimationAtEnd: true,
      
      // 픽셀 차이 임계값 (기본 0)
      diffThreshold: 0.05,
      
      // 특정 viewport 만 테스트
      viewports: [375, 768, 1280],
    },
  },
};
```

특정 스토리에서 무시:
```typescript
export const MyStory: Story = {
  parameters: {
    chromatic: { disable: true },  // 이 스토리는 시각 테스트 제외
  },
};
```

---

## 🆘 그래도 해결 안 될 때

### 1단계: 검색
```
GitHub Issues 검색:
https://github.com/storybookjs/storybook/issues?q=<문제+키워드>
```

### 2단계: 이전 상태로 롤백
```bash
git log --oneline | head -10
git revert <문제-시작-커밋>
```

### 3단계: 클린 인스톨
```bash
rm -rf node_modules package-lock.json
npm install
```

### 4단계: Claude Code 에 도움 요청
```
> 이 문제 해결 못 하겠어. 다음 정보 가지고 있어:
> - 증상: ...
> - 시도한 것: ...
> - 에러 메시지: ...
> - 관련 파일: ...
>
> /verify 결과도 같이 봐줘.
```

### 5단계: 프로젝트 처음부터 다시
극단적인 경우, 빈 폴더에서 다시 시작.
하지만 5개 디자인 시스템 MD 와 작업 결과는 그대로 사용 가능 — 
시스템 자체는 견고하므로 1-2일이면 같은 곳까지 복구 가능.

---

## 📚 추가 자료

- Storybook 공식 문서: https://storybook.js.org/docs
- React 공식 문서: https://react.dev
- Vite 공식 문서: https://vitejs.dev
- i18next 공식 문서: https://www.i18next.com
- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/

---

**이 문서는 프로젝트 진행 중 발생한 새 문제마다 업데이트한다.**
**같은 실수를 두 번 하지 않도록.**
