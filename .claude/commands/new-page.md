---
description: 새 페이지를 레이아웃 시스템 패턴 따라 생성
argument-hint: <페이지명> (Home | SpotDetail | Map | Stories | About)
---

# /new-page 명령어

새 페이지 **$ARGUMENTS** 를 디자인 시스템 패턴에 따라 생성한다.

## 실행 단계

### 1단계: 페이지 타입 확인
`docs/layout-system.md` 섹션 7에서 **$ARGUMENTS** 페이지 패턴 확인:

- **Home (랜딩)** → 섹션 7.1
  - KV Anti-Grid Hero (블롭 2개 비대칭)
  - Three Alleys 카드 섹션
  - Field Note 인용
  - Full Route Preview
  - 모바일은 Floating CTA

- **SpotDetail (스팟 상세)** → 섹션 7.2
  - Spot Hero (블롭 1개)
  - PC 좌65/우35 분할 (sticky 사이드바)
  - 모바일 세로 스택

- **Map (지도)** → 섹션 7.3
  - PC 좌측 리스트(400px) + 우측 전체 화면 지도
  - 모바일 상단 지도 + 하단 BottomSheet

- **Stories (스토리)** → 패턴 추론하거나 사용자에게 묻기
- **About (소개)** → 패턴 추론하거나 사용자에게 묻기

### 2단계: 사용할 컴포넌트 목록 작성
`docs/component-catalog.md` 에서 필요한 컴포넌트 추출.

예시 (Home 페이지):
- Header (variant: transparent → scrolled solid)
- KVSection (Anti-Grid + BlobMask 2개)
- SpotCard × 3 (Heritage, Market, Nature)
- FieldNote
- RouteTimeline
- Footer
- FloatingCTA (모바일 only)

비슷한 컴포넌트가 카탈로그에 없으면 멈추고 사용자에게 알리기.

### 3단계: 페이지 컴포넌트 작성
`src/pages/$ARGUMENTS.tsx` 또는 `src/components/templates/$ARGUMENTSLayout.tsx`:

```tsx
import { Header } from '@/components/organisms/Header';
import { Footer } from '@/components/organisms/Footer';
// ... 필요한 컴포넌트 import

export function $ARGUMENTSPage() {
  return (
    <>
      <Header variant="transparent" />
      
      <main>
        {/* 섹션별 컴포넌트 조합 */}
        <KVSection />
        <ThreeAlleysSection />
        <FieldNoteSection />
        <RoutePreview />
      </main>

      <Footer />
      <FloatingCTA />  {/* 모바일 only */}
    </>
  );
}
```

### 4단계: 라우팅 등록
`src/App.tsx` 또는 라우터 설정 파일에 라우트 추가:

```tsx
// 5개 언어 prefix 적용
<Route path="/:lang/$ARGUMENTSpath" element={<$ARGUMENTSPage />} />
```

언어 prefix 예시:
- `/en/spots/soje-dong`
- `/ja/spots/soje-dong`
- `/ko/spots/soje-dong`

### 5단계: 다국어 콘텐츠 키 추가
`src/i18n/locales/{en,ja,ko,es,zh}/$ARGUMENTS.json` 5개 파일 생성:

```json
{
  "title": "...",
  "description": "...",
  "cta": "..."
}
```

각 언어로 적절히 번역 (Transcreation 필요한 카피는 표시).

### 6단계: 페이지 스토리 작성 (선택)
복잡한 페이지는 Storybook에 추가:

`src/pages/$ARGUMENTS.stories.tsx`:
```typescript
import type { Meta, StoryObj } from '@storybook/react-vite';
import { $ARGUMENTSPage } from './$ARGUMENTSPage';

const meta: Meta<typeof $ARGUMENTSPage> = {
  title: 'Pages/$ARGUMENTS',
  component: $ARGUMENTSPage,
  parameters: { layout: 'fullscreen' },
};

export default meta;

export const Desktop: StoryObj = {
  parameters: { viewport: { defaultViewport: 'desktop' } },
};

export const Mobile: StoryObj = {
  parameters: { viewport: { defaultViewport: 'mobile' } },
};

// 5개 언어 각각
export const English: StoryObj = { globals: { locale: 'en' } };
export const Japanese: StoryObj = { globals: { locale: 'ja' } };
// ... 나머지
```

### 7단계: 검증
- [ ] PC viewport에서 Anti-Grid 비대칭 작동
- [ ] 모바일 viewport에서 세로 스택 + Floating CTA
- [ ] 5개 언어 모두 텍스트 정상 표시
- [ ] 블롭 쉐이프 카테고리 매핑 정상
- [ ] 접근성 위반 0개
- [ ] 빌드 에러 없음

### 8단계: 보고
완료 후 다음 정보를 보고:
- 생성된 파일 경로 목록
- 사용된 컴포넌트 목록
- 추가된 다국어 키 5개 언어 × 키 개수
- 라우트 경로
- Storybook URL (있는 경우)
- 검증 결과 요약

## 페이지별 특별 주의사항

### Home 페이지
- KV는 **반드시 Anti-Grid 패턴** (block 2개 비대칭)
- 모바일은 블롭 1개로 자동 축소 (Heritage 숨김)
- Three Alleys 카드 = 3종 블롭 쉐이프 모두 등장하는 유일한 화면

### SpotDetail 페이지
- 블롭 쉐이프는 **히어로 1번만** (갤러리는 일반 사각)
- 갤러리는 블롭 마스크 사용 금지
- PC 사이드바 sticky 작동 확인
- 모바일 하단 Floating CTA (길찾기·공유)

### Map 페이지
- 블롭 쉐이프 사용 안 함 (지도가 주인공)
- 모바일 BottomSheet 드래그 가능
- 카카오맵 API 통합 필요 (별도 키 설정)

## 완료 후 권장 작업
1. `git add . && git commit -m "feat(pages): $ARGUMENTS 페이지 추가"`
2. `npm run storybook` 으로 시각 검증
3. 5개 언어 모두 직접 클릭하며 테스트
4. 모바일 viewport에서 한 손 스크롤 시뮬레이션
