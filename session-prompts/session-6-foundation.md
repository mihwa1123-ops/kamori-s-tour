# Session 6 — Foundation MDX 페이지 (60분)

## 📋 사전 준비

Organisms 까지 모두 완성됐는지 확인:
```bash
git log --oneline | head
ls src/components/organisms/
```

5개 Organisms .tsx 파일 + .stories.tsx 파일 모두 있어야 함.

---

## 🎯 첫 메시지 (복붙)

```
Organisms 5종 완성. 이번 세션은 Foundation MDX 페이지 4개를 만든다.
Storybook 사이드바 최상단에 "Foundation" 폴더가 보이게.

작업 내용:

1. src/stories/Foundation/Colors.mdx 생성
   - docs/color-system.md 섹션 2-3 시각화
   - 3색 시스템 (Lavender, Pink, Yellow) 6단계 램프 모두
   - Foundation 5색 (White, Off-White, Silver Veil, Ink, Slate)
   - 6 카테고리 매핑 표
   - WCAG 검증 결과 요약 (24/29 통과)
   - Golden Rule 강조 박스

2. src/stories/Foundation/Typography.mdx 생성
   - docs/font-system.md 섹션 2-3 시각화
   - 5개 언어 헤드라인 샘플 (실제 텍스트로)
   - Zen Maru Gothic 5단계 웨이트 (300, 400, 500, 700, 900)
   - 각 폰트 짝꿍 (Fraunces + IBM Plex Sans 등)
   - 의미 기반 웨이트 시스템 (Meta, Body, UI, Title, Hero)

3. src/stories/Foundation/Spacing.mdx 생성
   - docs/layout-system.md 섹션 4.5 시각화
   - 8pt 그리드 시각화 (--space-1 ~ --space-10)
   - 각 간격이 어떻게 보이는지 실제 박스로
   - 섹션 간 권장 간격 (모바일 48 / 태블릿 64 / PC 96)

4. src/stories/Foundation/Shapes.mdx 생성
   - docs/layout-system.md 섹션 2 시각화
   - 3가지 블롭 쉐이프 (Heritage, Market, Nature) 비교
   - 카테고리 ↔ 쉐이프 고정 매핑 강조
   - SVG path 데이터 표시
   - 사용 원칙 (✓ Do, ✗ Don't)

각 MDX 파일 작성 원칙:
- docs/storybook-setup-guide.md 섹션 6 패턴 따름
- 실제 토큰 값을 표시 (var(--lav-500) 가 #A594F9 인 것을 보여줌)
- 인라인 스타일로 시각화 (background: 색상값)
- 카탈로그 코드 예시 포함

Storybook 사이드바 순서 확인:
Foundation 이 Atoms 보다 위에 오게 ordering.

먼저 Plan Mode 로 4개 MDX 파일 구조 보여주고 진행.
```

---

## ✅ 중간 감독 체크리스트

### Colors.mdx
- [ ] Lavender 6단계 램프 (50, 100, 200, 500, 600, 800) 컬러 박스로
- [ ] 같은 방식으로 Pink, Yellow 램프
- [ ] Foundation 5색 (White, Off-White, Silver Veil, Ink, Slate)
- [ ] 6 카테고리 매핑 표
- [ ] Golden Rule 강조 박스: "파스텔 배경에는 항상 Ink 텍스트"
- [ ] 각 컬러에 hex 값 + 토큰명 표시

### Typography.mdx
- [ ] **5개 언어 헤드라인 모두 실제 텍스트**
  - English: "A city of quiet corners." (Fraunces)
  - 日本語: "静かな路地の街、大田へ。" (Zen Maru Gothic)
  - 한국어: "조용한 골목의 도시." (Gowun Batang)
  - Español: "Una ciudad de rincones callados." (Fraunces)
  - 中文: "一座安静巷子的城市。" (Noto Sans SC)
- [ ] Zen Maru Gothic 5단계 웨이트 모두 보임 (시각 차이 명확)
- [ ] 의미 기반 웨이트 표 (Meta 300, Body 400, UI 500, Title 700, Hero 900)

### Spacing.mdx
- [ ] 8pt 단위 시각화 (각 변수마다 실제 픽셀 박스)
- [ ] --space-1 (4px) ~ --space-10 (128px) 비교
- [ ] 섹션 간 권장 간격 표

### Shapes.mdx
- [ ] **3가지 블롭 쉐이프 정상 렌더링**
  - Heritage (지붕 모양)
  - Market (좌판 파도)
  - Nature (산 능선)
- [ ] 각 쉐이프 옆에 카테고리 매핑 명시
- [ ] SVG path 코드 블록
- [ ] DO / DON'T 표

### Storybook 사이드바
- [ ] Foundation 이 사이드바 최상단
- [ ] Foundation 안에 Colors, Typography, Spacing, Shapes 4개
- [ ] Atoms / Molecules / Organisms 가 그 아래

---

## ⚠️ 자주 발생하는 문제

### 문제 1: Foundation 이 사이드바 하단에 표시
**증상**: Foundation 이 Atoms, Molecules 아래 위치  
**해결**:
```typescript
// .storybook/preview.ts 에 명시적 순서 정의:
parameters: {
  options: {
    storySort: {
      order: ['Foundation', 'Atoms', 'Molecules', 'Organisms', 'Templates'],
    },
  },
},
```

### 문제 2: MDX 안에서 CSS 변수가 빈 값
**증상**: `style={{ background: 'var(--lav-500)' }}` 가 작동 안 함  
**해결**:
```mdx
{/* MDX 안에서는 import 한 CSS 가 적용 안 될 수 있음 */}
{/* 직접 hex 값 사용해도 OK (Foundation 페이지는 토큰 시각화가 목적) */}

<div style={{ background: '#A594F9' }}>
  <span>Lavender 500</span>
  <code>var(--lav-500)</code>
</div>
```

### 문제 3: 일본어 폰트 안 보임
**증상**: Zen Maru Gothic 샘플이 시스템 폰트로 표시  
**해결**:
```mdx
<div style={{ 
  fontFamily: '"Zen Maru Gothic", sans-serif',
  fontSize: 36,
  fontWeight: 700 
}}>
  静かな路地の街、大田へ。
</div>

{/* fontFamily 명시 + Google Fonts 가 .storybook/preview.ts 에서 로드됐는지 확인 */}
```

### 문제 4: Shapes.mdx 의 SVG 가 안 보임
**증상**: 블롭 쉐이프가 빈 박스로 표시  
**해결**:
```mdx
{/* MDX 안에서 BlobMask 컴포넌트 직접 사용 */}
import { BlobMask } from '@/components/molecules/BlobMask';

<div style={{ width: 200, height: 200 }}>
  <BlobMask 
    shape="heritage"
    src="/photos/sample-heritage.jpg"
    alt="Heritage"
  />
</div>
```

샘플 이미지가 없으면 placeholder 사용:
```mdx
src="https://placehold.co/600x600/A594F9/FFFFFF?text=Heritage"
```

---

## 🎬 세션 종료 명령

```
Foundation MDX 4개 모두 완성. 커밋 만들어줘.
메시지: "docs(storybook): Foundation 시각화 페이지 4종 (Colors, Typography, Spacing, Shapes)"

이제 Storybook 사이드바가 디자인 시스템 카탈로그처럼 보일 거야.
디자이너 공유용 URL 준비됐어.
```

---

## 📊 예상 시간 분배

- 0~10분: Plan Mode + 4개 MDX 구조 잡기
- 10~25분: Colors.mdx (15분, 가장 큼)
- 25~40분: Typography.mdx (15분, 5개 언어)
- 40~50분: Spacing.mdx (10분, 단순)
- 50~60분: Shapes.mdx (10분, BlobMask 활용)

총 60분 안에 완료 목표.

---

## 💡 효율 팁

1. **Colors.mdx 부터**: 가장 정보 많고 시각화 패턴이 다른 페이지의 베이스
2. **인라인 스타일 OK**: MDX 안에서는 디자인 토큰 보여주는 게 목적이라 hex 직접 써도 됨
3. **카탈로그 자료 재활용**: docs/ MD 의 표를 그대로 가져와서 시각화만 추가
4. **placeholder 이미지**: 실제 사진 없으면 placehold.co 사용

---

## 🎨 디자이너 공유 자료 준비

세션 종료 후 디자이너에게 보여줄 URL:

**로컬 (개발 중)**:
- Colors: http://localhost:6006/?path=/docs/foundation-colors
- Typography: http://localhost:6006/?path=/docs/foundation-typography
- Spacing: http://localhost:6006/?path=/docs/foundation-spacing
- Shapes: http://localhost:6006/?path=/docs/foundation-shapes

**배포 후 (Session 8 이후)**:
- 프로덕션 Storybook URL

---

## 🚦 Session 6 완성도 판단

다음 4가지 모두 통과 시 Session 7 진행:

1. ✅ Foundation 폴더가 사이드바 최상단
2. ✅ 4개 MDX 페이지 모두 정상 렌더링
3. ✅ 5개 언어 폰트가 Typography 페이지에서 모두 보임
4. ✅ 3가지 블롭 쉐이프가 Shapes 페이지에서 정상 마스킹

조건 미달이면 다음 세션 진행 금지.
