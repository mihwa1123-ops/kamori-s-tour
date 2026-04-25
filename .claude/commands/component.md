---
description: 새 컴포넌트와 Storybook 스토리를 한꺼번에 생성
argument-hint: <컴포넌트 이름>
---

# /component 명령어

새 컴포넌트 **$ARGUMENTS** 를 생성한다.

## 실행 단계

### 1단계: 카탈로그 명세 확인
- `docs/component-catalog.md` 에서 **$ARGUMENTS** 명세 검색
- 명세가 있으면 그대로 따름
- 명세가 없으면 사용자에게 카탈로그에 먼저 추가할지 묻고 멈춤
- 비슷한 기존 컴포넌트가 있는지 확인 (variant 확장으로 해결 가능한지)

### 2단계: 카테고리 결정
명세 위치에 따라 폴더 결정:
- Atoms → `src/components/atoms/`
- Molecules → `src/components/molecules/`
- Organisms → `src/components/organisms/`
- Templates → `src/components/templates/`

### 3단계: 컴포넌트 파일 생성
`{폴더}/$ARGUMENTS.tsx` 작성:
- TypeScript 인터페이스 정의 (Props 명세 따름)
- 카탈로그의 variant·size 패턴 정확히 구현
- **CSS 변수만 사용** (하드코딩 절대 금지)
- BEM 명명 규칙 (`.component__element--variant`)
- 키보드 접근성 (`tabIndex`, `aria-*`)

### 4단계: 스토리 파일 생성
`{폴더}/$ARGUMENTS.stories.tsx` 작성:

```typescript
import type { Meta, StoryObj } from '@storybook/react-vite';
import { $ARGUMENTS } from './$ARGUMENTS';

const meta: Meta<typeof $ARGUMENTS> = {
  title: '{Atoms|Molecules|Organisms}/$ARGUMENTS',
  component: $ARGUMENTS,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: { /* 모든 props에 대한 control 정의 */ },
};

export default meta;
type Story = StoryObj<typeof $ARGUMENTS>;

// 다음 스토리 모두 포함:
// 1. 모든 variant 별 스토리
// 2. 모든 size 별 스토리
// 3. AllVariants 비교 스토리 (한 화면에 다 보기)
// 4. AllSizes 비교 스토리
// 5. 5개 언어 스토리 (다국어 컴포넌트인 경우)
// 6. 상태 스토리 (Loading, Disabled, Hover 등)
```

### 5단계: 검증
- `npm run storybook` 으로 시각 확인
- a11y 패널 위반 0개
- 5개 언어 전환 시 모두 정상 표시 (해당되는 경우)
- 모바일·태블릿·PC viewport 모두 정상

### 6단계: 보고
완료 후 다음 정보를 보고:
- 생성된 파일 경로 2개
- 구현된 variant 목록
- 작성된 스토리 개수
- a11y 검증 결과
- Storybook URL 경로 (예: `Atoms/$ARGUMENTS`)

## 주의사항

- **하드코딩 금지**: 모든 컬러·폰트·간격은 CSS 변수로
- **카탈로그 우선**: 카탈로그에 없는 새 패턴은 멈추고 물어볼 것
- **5개 언어**: 다국어 지원 컴포넌트는 EN·JA·KO·ES·ZH 모두 스토리 작성
- **Atomic Design 준수**: Atom이 Molecule을 import하면 안 됨

## 검증 실패 시
- a11y 위반 발견 → 즉시 수정 후 재검증
- 카탈로그 명세와 다른 점 발견 → 사용자에게 보고하고 결정 받기
- 비슷한 컴포넌트 기존에 있음 → 새로 만들지 말고 variant 확장 제안
