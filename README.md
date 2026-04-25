# kamori's tour

> 외국인 관광객 대상 한국 도시 탐방 플랫폼.  
> 첫 컨텐츠: **daejeon/slow** (대전 중구·동구 원도심 슬로우 트래블).  
> 같은 디자인 시스템·컴포넌트를 서울·부산 등 타 도시 확장에 재사용.

---

## 🛠 Tech Stack

| 영역 | 도구 |
|------|------|
| Framework | React 18, TypeScript 5 |
| Build | Vite 5 |
| Component Catalog | Storybook 9 (react-vite) |
| Styling | CSS Variables (no CSS-in-JS) |
| Testing | Storybook test runner + a11y addon |
| Visual regression | Chromatic |
| CI | GitHub Actions |

---

## 🚀 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 (Vite)
npm run dev                # http://localhost:5173

# Storybook 컴포넌트 카탈로그
npm run storybook          # http://localhost:6006

# 프로덕션 빌드
npm run build
npm run preview
```

### npm scripts

| 명령어 | 설명 |
|--------|------|
| `npm run dev` | Vite 개발 서버 |
| `npm run build` | TypeScript 컴파일 + Vite 프로덕션 빌드 |
| `npm run preview` | 빌드 결과물 로컬 미리보기 |
| `npm run storybook` | Storybook 개발 (포트 6006) |
| `npm run build-storybook` | Storybook 정적 빌드 → `storybook-static/` |
| `npm run chromatic` | Chromatic 시각 회귀 테스트 (토큰 필요) |

---

## 📁 폴더 구조

```
kamoris-tour/
├── CLAUDE.md                    ← Claude Code 메인 인덱스
├── README.md                    ← 이 파일
├── NEXT.md                      ← 인계 메모
├── .env.example                 ← 환경 변수 예시
│
├── docs/                        ← 5개 디자인 시스템 문서
│   ├── color-system.md          (3색 시스템 + WCAG)
│   ├── font-system.md           (5개 언어 폰트)
│   ├── layout-system.md         (Anti-Grid + 블롭 쉐이프)
│   ├── component-catalog.md     (Atoms~Templates 명세)
│   ├── storybook-setup-guide.md (Storybook 가이드)
│   └── troubleshooting-guide.md (30가지 문제 + 해결)
│
├── assets/
│   └── shapes/                  ← 3개 SVG 블롭 쉐이프
│
├── .claude/
│   └── commands/                ← Slash commands (4종)
│       ├── component.md         (/component <이름>)
│       ├── verify.md            (/verify)
│       ├── deploy-check.md      (/deploy-check)
│       └── new-page.md          (/new-page <페이지명>)
│
├── .storybook/
│   ├── main.ts                  ← Storybook 설정
│   └── preview.tsx              ← 5개 언어 데코레이터 + viewport + backgrounds
│
├── .github/
│   ├── workflows/
│   │   ├── storybook-test.yml   ← PR 마다 빌드 검증
│   │   └── chromatic.yml        ← 시각 회귀 테스트
│   └── pull_request_template.md
│
├── src/
│   ├── main.tsx, App.tsx
│   │
│   ├── styles/
│   │   ├── tokens.css           ← 모든 디자인 토큰 (컬러·폰트·간격·z·shadow)
│   │   └── global.css           ← reset + html[lang] 5개 언어 폰트 분기
│   │
│   ├── stories/Foundation/      ← 디자인 토큰 시각화 MDX
│   │   ├── Welcome.mdx
│   │   ├── Colors.mdx
│   │   ├── Typography.mdx
│   │   ├── Spacing.mdx
│   │   └── Shapes.mdx
│   │
│   └── components/
│       ├── atoms/               (5종 + index.ts)
│       │   ├── Button, IconButton, Tag, Badge, NumberMarker
│       │   └── 각 .tsx + .css + .stories.tsx
│       │
│       ├── molecules/           (5종 + index.ts)
│       │   ├── BlobMask ⭐ (디자인 시그니처)
│       │   ├── Card, LanguageSwitcher, Avatar, InfoRow
│       │   └── 각 .tsx + .css + .stories.tsx
│       │
│       ├── organisms/           (5종 + index.ts)
│       │   ├── Header, SpotCard, FieldNote, RouteTimeline, BottomSheet
│       │   └── 각 .tsx + .css + .stories.tsx
│       │
│       └── templates/           (2종 + index.ts)
│           ├── HomeLayout       (KV + Three Alleys + FieldNote + Route)
│           └── SpotDetailLayout (Hero + Body + Sidebar + Floating CTA)
│
└── session-prompts/             ← 8개 세션 가이드 (이미 사용 완료)
```

총 **17개 컴포넌트** + 5개 Foundation MDX + 5개 디자인 시스템 문서.

---

## 🎨 디자인 시스템 핵심 규칙

### 컬러
- **하드코딩 절대 금지** — `color: #A594F9` 같은 직접 입력 금지
- **변수만 사용** — `color: var(--lav-500)`
- **Golden Rule**: 파스텔 배경에는 **항상** `var(--ink)` 텍스트 (흰 글자 ❌)

### 폰트
- **언어별 자동 분기** — `html[lang]` CSS 셀렉터로 자동 적용
- **CJK 이탤릭 금지** — 일본어·한국어·중국어에서 italic 사용 시 자동 해제
- **본문 최소 16px**

### 레이아웃
- **블롭 쉐이프 매핑 고정**: Heritage→H, Market→M, Nature→K (절대 변경 금지)
- **Anti-Grid 는 KV·강조 섹션만** — 카드 리스트는 일반 그리드
- **블롭은 페이지당 카테고리 1번** — 시그니처 강하게 유지
- **모바일은 블롭 1개로 축소**

### 컴포넌트
- **새 컴포넌트 만들기 전 카탈로그 확인** — 비슷한 게 있으면 variant 추가
- **모든 컴포넌트는 `.stories.tsx` 페어**
- **5개 언어 모두 테스트** (다국어 지원 컴포넌트)
- **a11y 위반 0개**

### 접근성
- **터치 타겟 최소 44×44px**
- **WCAG AA 충족**
- **`prefers-reduced-motion` 대응** (블롭 회전 자동 해제)

---

## 🛠 Slash Commands (Claude Code)

| 명령어 | 설명 |
|--------|------|
| `/component <이름>` | 새 컴포넌트 + 스토리 동시 생성 (카탈로그 명세 따름) |
| `/verify` | 디자인 시스템 정합성 자동 검증 (10가지 항목) |
| `/deploy-check` | 배포 직전 체크리스트 (10단계) |
| `/new-page <이름>` | 새 페이지를 레이아웃 시스템 패턴 따라 생성 |

자세한 사용법은 [`.claude/commands/`](./.claude/commands/) 참조.

---

## 🌐 5개 언어 지원

| 언어 | 코드 | 헤드라인 폰트 | 본문 폰트 |
|------|------|-------------|----------|
| English | `en` | Fraunces | IBM Plex Sans |
| 日本語 | `ja` | Zen Maru Gothic | Zen Maru Gothic |
| 한국어 | `ko` | Gowun Batang | Gowun Dodum |
| Español | `es` | Fraunces | IBM Plex Sans |
| 中文 | `zh` (`zh-CN`) | Noto Sans SC | Noto Sans SC |

언어 전환은 `LanguageSwitcher` 컴포넌트가 `<html lang>` 을 갱신 → `global.css` 의 `html[lang]` 셀렉터가 자동으로 폰트 매칭.

---

## 🚦 배포 (CI/CD)

### GitHub Actions

- `storybook-test.yml` — push/PR 마다 `npm run build` + `npm run build-storybook` 자동 검증, 빌드 결과를 7일간 artifact 보관
- `chromatic.yml` — Chromatic 시각 회귀 자동 비교, PR 마다 미리보기 URL

### 필수 secrets

GitHub 저장소 → Settings → Secrets and variables → Actions:

- `CHROMATIC_PROJECT_TOKEN` — [Chromatic](https://www.chromatic.com) 가입 후 프로젝트 토큰 발급

자세한 배포 가이드는 [`session-prompts/session-8-deploy.md`](./session-prompts/session-8-deploy.md) §"사용자가 직접 할 작업" 섹션 참조.

### Storybook URL

배포 후 이 섹션에 URL 추가:

- 🔗 **Storybook (Chromatic)**: `https://...` _(배포 후 갱신)_
- 🔗 **GitHub repo**: `https://...` _(배포 후 갱신)_

---

## 📝 라이선스

내부 프로젝트. 외부 공개 시 라이선스 결정 필요.

---

## 🆘 문제 발생 시

1. [`docs/troubleshooting-guide.md`](./docs/troubleshooting-guide.md) — 30가지 문제 + 해결
2. 5개 디자인 시스템 MD 의 트러블슈팅 섹션
3. Claude Code 에 `/verify` 실행 결과와 함께 질문

---

**디자인 시스템은 살아있는 카탈로그입니다. 모든 컴포넌트는 Storybook 에서 시각·접근성·다국어 검증 가능.**
