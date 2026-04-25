# kamori's tour — Claude Code 셋업 패키지

> 외국인 관광객 대상 한국 도시 탐방 플랫폼. 첫 도시 콘텐츠: **daejeon/slow** (대전 원도심 슬로우 트래블). 다음 도시 추가 시 같은 디자인 시스템·컴포넌트 재사용 가능.
> 5개 디자인 시스템 문서를 가지고 Claude Code 로 2일 만에 프로젝트를 완성하기 위한 필수 파일 모음.

---

## 📦 이 패키지에 포함된 것

```
claude-code-setup/
├── CLAUDE.md                                    ← 프로젝트 메인 인덱스
│
├── .claude/
│   └── commands/                                ← Slash commands 4종
│       ├── component.md                         (/component <이름>)
│       ├── verify.md                            (/verify)
│       ├── deploy-check.md                      (/deploy-check)
│       └── new-page.md                          (/new-page <페이지명>)
│
├── docs/
│   └── troubleshooting-guide.md                 ← 30가지 문제 + 해결책
│
└── session-prompts/                             ← 8개 세션 복붙 프롬프트
    ├── session-1-setup.md                       (Day 1 - 셋업)
    ├── session-2-atoms.md                       (Day 1 - Atoms 5종)
    ├── session-3-molecules.md                   (Day 1 - Molecules 5종)
    ├── session-4-cleanup.md                     (Day 1 - 정리)
    ├── session-5-organisms.md                   (Day 2 - Organisms 5종)
    ├── session-6-foundation.md                  (Day 2 - Foundation MDX)
    ├── session-7-templates.md                   (Day 2 - Templates + 통합)
    └── session-8-deploy.md                      (Day 2 - 배포)
```

---

## 🚀 사용 방법

### 1단계: 빈 폴더 만들기

```bash
mkdir kamoris-tour
cd kamoris-tour
```

### 2단계: 이 패키지 파일 복사

다음 4가지를 새 프로젝트 루트에 복사:

```bash
# 메인 인덱스
cp claude-code-setup/CLAUDE.md ./CLAUDE.md

# Slash commands
cp -r claude-code-setup/.claude ./

# 트러블슈팅 가이드
mkdir -p docs
cp claude-code-setup/docs/troubleshooting-guide.md ./docs/

# 5개 디자인 시스템 MD (이전에 만든 것들)
cp color-system.md ./docs/color-system.md
cp font-system.md ./docs/font-system.md
cp layout-system.md ./docs/layout-system.md
cp component-catalog.md ./docs/component-catalog.md
cp storybook-setup-guide.md ./docs/storybook-setup-guide.md

# 3개 SVG 쉐이프
mkdir -p assets/shapes
cp shape-heritage.svg ./assets/shapes/
cp shape-market.svg ./assets/shapes/
cp shape-nature.svg ./assets/shapes/
```

### 3단계: 폴더 구조 확인

```
kamoris-tour/
├── CLAUDE.md                          ✓
├── .claude/
│   └── commands/
│       ├── component.md               ✓
│       ├── verify.md                  ✓
│       ├── deploy-check.md            ✓
│       └── new-page.md                ✓
├── docs/
│   ├── color-system.md                ✓
│   ├── font-system.md                 ✓
│   ├── layout-system.md               ✓
│   ├── component-catalog.md           ✓
│   ├── storybook-setup-guide.md       ✓
│   └── troubleshooting-guide.md       ✓
└── assets/
    └── shapes/
        ├── shape-heritage.svg         ✓
        ├── shape-market.svg           ✓
        └── shape-nature.svg           ✓
```

### 4단계: Claude Code 실행

```bash
claude
```

### 5단계: Session 1 프롬프트 복붙

`session-prompts/session-1-setup.md` 의 "🎯 첫 메시지" 섹션을 복사해서 Claude Code 에 붙여넣기.

이후 8개 세션을 순서대로 진행.

---

## 📅 2일 일정 요약

### Day 1 (8시간)

| 세션 | 시간 | 내용 | 프롬프트 파일 |
|------|------|------|-------------|
| 1 | 90분 | 셋업 + 토큰 통합 | `session-1-setup.md` |
| 2 | 120분 | Atoms 5종 | `session-2-atoms.md` |
| 3 | 120분 | Molecules 5종 + BlobMask | `session-3-molecules.md` |
| 4 | 90분 | 정리 + 검증 | `session-4-cleanup.md` |

### Day 2 (8시간)

| 세션 | 시간 | 내용 | 프롬프트 파일 |
|------|------|------|-------------|
| 5 | 180분 | Organisms 5종 | `session-5-organisms.md` |
| 6 | 60분 | Foundation MDX | `session-6-foundation.md` |
| 7 | 90분 | Templates + 통합 | `session-7-templates.md` |
| 8 | 90분 | Chromatic + 배포 | `session-8-deploy.md` |

---

## 🎯 각 세션 프롬프트 사용법

### 표준 절차

1. **세션 시작 전**: `session-N-*.md` 의 "📋 사전 준비" 섹션 확인
2. **첫 메시지 복붙**: "🎯 첫 메시지" 섹션을 그대로 Claude Code 에 붙여넣기
3. **중간 감독**: "✅ 중간 감독 체크리스트" 항목 하나씩 확인
4. **문제 발생 시**: "⚠️ 자주 발생하는 문제" 섹션 또는 `troubleshooting-guide.md` 참조
5. **세션 종료**: "🎬 세션 종료 명령" 으로 git commit

### 프롬프트 수정해도 되나요?

**가능**: 프로젝트 특성에 맞게 조정
- 다른 프레임워크 사용 시 (Next.js, Astro 등)
- 다른 빌드 도구 사용 시 (Webpack, Turbopack 등)
- 다른 컴포넌트 라이브러리 추가 시 (Radix UI, Headless UI 등)

**유지 권장**: 핵심 원칙은 그대로
- Atomic Design 4단계 분류
- 5개 언어 지원
- 디자인 토큰 변수만 사용 (하드코딩 금지)
- Storybook 으로 시각 검증

---

## 🛠️ Slash Commands 사용법

Claude Code 안에서 다음 명령어 입력:

### `/component <이름>`
새 컴포넌트와 Storybook 스토리를 한꺼번에 생성.

```
/component Button
/component IconButton
/component EventBanner    ← 카탈로그에 없으면 추가 여부 물음
```

### `/verify`
디자인 시스템 정합성 전체 검증.

```
/verify
```

다음 항목 자동 검사:
- 컬러 하드코딩 검출
- 카테고리 ↔ 블롭 쉐이프 매핑
- 파스텔 배경 흰 글자 (WCAG 위반)
- 카탈로그와 실제 구현 일치
- z-index 하드코딩

### `/deploy-check`
배포 직전 자동 체크리스트 실행.

```
/deploy-check
```

10가지 항목 검증 후 통과/실패 보고.

### `/new-page <페이지명>`
새 페이지를 레이아웃 시스템 패턴 따라 생성.

```
/new-page Home
/new-page SpotDetail
/new-page Map
```

---

## 🆘 문제 발생 시

### 1순위: troubleshooting-guide.md 참조
30가지 자주 발생하는 문제 + 해결책 정리됨.

### 2순위: 해당 세션의 "⚠️ 자주 발생하는 문제" 섹션
세션별로 그 단계에서 자주 마주치는 문제 모음.

### 3순위: 5개 디자인 시스템 MD 의 트러블슈팅 섹션
- color-system.md 섹션 11
- font-system.md 섹션 11
- layout-system.md 섹션 12
- component-catalog.md 섹션 7
- storybook-setup-guide.md 섹션 11

### 4순위: Claude Code 에 직접 도움 요청
```
> 이 문제 해결 못 하겠어:
> - 증상: [구체적으로]
> - 시도한 것: [무엇을]
> - 에러 메시지: [있으면]
>
> /verify 도 같이 실행해서 봐줘.
```

---

## 💡 효율 극대화 팁

### Tip 1: CLAUDE.md 를 빠르게 읽혀라
Claude Code 는 매 세션 시작 시 CLAUDE.md 를 자동으로 읽음. 하지만 매번 명시적으로 환기시키면 더 정확:

```
> 시작 전에 CLAUDE.md 와 docs/ 의 5개 MD 다 읽고 시작해.
```

### Tip 2: Plan Mode 적극 활용
복잡한 작업은 항상 Plan Mode (Shift+Tab) 로 시작:
- 단계별 계획 검토
- 잘못된 방향 미리 차단
- 30분 진행 후 잘못 발견하는 것보다 5분 검토가 효율적

### Tip 3: 한 메시지에 여러 작업 묶기
5개 컴포넌트를 5번 요청하지 말고 한 번에:
```
> Atoms 5종 모두 만들어줘:
> 1. Button.tsx + 스토리
> 2. IconButton.tsx + 스토리
> ...
```

Claude Code 가 내부적으로 효율 처리.

### Tip 4: 자주 멈추기
"끝까지 가지 말고 중간에 멈춰" 적극 사용. 잘못된 방향으로 30분 가는 것보다 5분 검토가 효율적.

### Tip 5: git commit 자주 하기
세션 끝마다 commit. 문제 시 즉시 롤백 가능.

```
> 지금까지 작업한 것 git commit 만들어줘.
> 메시지: "feat(atoms): Button + 스토리"
```

---

## 📊 예상 결과물

2일 후 완성될 것:

### 코드베이스
- ✅ React + Vite + TypeScript 프로젝트
- ✅ 17개 컴포넌트 (Atoms 5 + Molecules 5 + Organisms 5 + Templates 2)
- ✅ 4개 Foundation MDX 페이지
- ✅ 5개 디자인 시스템 문서 (docs/)
- ✅ 5개 언어 지원 (i18next 셋업)
- ✅ Storybook 9+ 카탈로그
- ✅ a11y 위반 0개
- ✅ TypeScript 에러 0개

### 자동화
- ✅ GitHub Actions CI/CD (PR 마다 자동 빌드 + 테스트)
- ✅ Chromatic 시각 회귀 테스트
- ✅ 4개 Slash commands

### 산출물
- ✅ 공개 Storybook URL (디자이너 공유 가능)
- ✅ Foundation 페이지 (디자인 토큰 시각화)
- ✅ 컴포넌트 + 페이지 시뮬레이션
- ✅ README, .env.example, .gitignore 정리

---

## 🎉 다음 단계 (이 프로젝트 이후)

이 디자인 시스템을 기반으로:

1. **실제 페이지 구현** — 홈, 스팟 상세, 지도, About 페이지
2. **콘텐츠 시스템** — CMS 연동 (Sanity, Contentful 등)
3. **카카오맵 통합** — 지도, 길찾기, 마커
4. **분석 + 모니터링** — GA4, Plausible
5. **성능 최적화** — CDN, PWA, 코드 스플리팅

각 작업도 Slash commands 로 효율적으로:
```
/new-page Home
/new-page SpotDetail
```

---

## 📞 문의

작업 중 문제 발생 시 다음 순서로:

1. `troubleshooting-guide.md` 검색
2. 해당 세션 프롬프트 파일의 자주 발생하는 문제 섹션
3. 5개 디자인 시스템 MD 의 트러블슈팅 섹션
4. Claude Code 에 직접 질문 (`/verify` 결과 첨부)

---

**이 패키지로 10일 분량을 2일에 완성하세요. Good luck! 🍀**
