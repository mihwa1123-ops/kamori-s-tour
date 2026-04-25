# Session 5 — Organisms 5종 (180분, Day 2의 주요 세션)

## 📋 사전 준비

Day 1이 완전히 끝났는지 확인:
```bash
git log --oneline | head -10
```

5개 커밋 있어야 함 (셋업 + Atoms + Molecules + 정리).

Storybook 실행:
```bash
npm run storybook
```

---

## 🎯 첫 메시지 (복붙)

```
Day 2 시작. 어제까지 Atoms 5종 + Molecules 5종 (BlobMask 포함) 완성.
오늘은 Organisms 5종 + Foundation MDX + Templates + 배포까지 끝낸다.

이번 세션은 Organisms 5종을 모두 만든다. 가장 무거운 세션이라
중간에 막히면 즉시 멈추고 알려줘.

작업 순서:

1. Header (src/components/organisms/Header.tsx + 스토리)
   - Sticky 상단 네비
   - 2 variants: transparent (스크롤 전), solid (스크롤 후)
   - 로고 + 메뉴 + LanguageSwitcher
   - 모바일은 56px, PC는 80px 높이

2. SpotCard (src/components/organisms/SpotCard.tsx + 스토리)
   - BlobMask 자동 통합
   - 카테고리 ↔ 쉐이프 자동 매핑
   - 2 variants: default (세로), compact (모바일 가로)
   - ThreeAlleysSection 비교 스토리 필수

3. FieldNote (src/components/organisms/FieldNote.tsx + 스토리)
   - Card variant=dark 사용
   - 인용문 + 작성자 + CTA
   - 5개 언어 모두 테스트
   - CJK 언어에서 이탤릭 자동 해제 확인
   - highlight 단어를 노랑으로 강조

4. RouteTimeline (src/components/organisms/RouteTimeline.tsx + 스토리)
   - 6개 스팟 타임라인
   - 2 variants: horizontal (PC 풀라인), vertical (사이드바)
   - 현재 스팟 isCurrent 강조
   - 이동 시간 connector 표시

5. BottomSheet (src/components/organisms/BottomSheet.tsx + 스토리)
   - 모바일 전용 (PC 자동 숨김)
   - 드래그 가능한 핸들
   - collapsed (45vh) / expanded (85vh) 토글
   - 부드러운 애니메이션

각 컴포넌트 작성 원칙:
- docs/component-catalog.md 섹션 4 명세 따름
- Atoms/Molecules 컴포넌트 import해서 조합
- CSS 변수만 사용
- 모든 Organisms는 Atoms를 import해도 되지만 다른 Organism은 import 금지

각 스토리 작성 원칙:
- 모든 variant 별 스토리
- 5개 언어 스토리 (텍스트 있는 컴포넌트)
- viewport 별 스토리 (mobile/desktop)
- 실제 사용 시뮬레이션 스토리 (HomeHeroSimulation, ThreeAlleysSection 등)

⚠️ 특별 주의사항:
- SpotCard 의 BlobMask 자동 매핑이 정상인지 (heritage→H, market→M, nature→K)
- FieldNote 의 한국어/일본어/중국어 인용문에서 이탤릭 해제 확인
- BottomSheet 가 PC viewport 에서 display: none 되는지

먼저 Plan Mode 로 5개 작업 순서 보여주고 진행.
중간에 막히면 멈추고 알려줘. 끝까지 강행하지 말 것.
```

---

## ✅ 중간 감독 체크리스트

### 1. Header
- [ ] 두 variants (transparent / solid) 시각 차이 명확
- [ ] PC 80px, 모바일 56px 높이
- [ ] LanguageSwitcher 통합 정상
- [ ] 키보드 Tab 으로 메뉴 순회 가능
- [ ] backdrop-filter: blur 효과 작동

### 2. SpotCard ⚠️ (BlobMask 통합 검증)
- [ ] **BlobMask 자동 매핑 정상**
  - spot.category="heritage" → BlobMask shape="heritage"
  - spot.category="market" → BlobMask shape="market"  
  - spot.category="nature" → BlobMask shape="nature"
- [ ] ThreeAlleysSection 스토리에서 3개 카드 모두 다른 쉐이프
- [ ] 카드별 회전 각도 다름 (살아있는 느낌)
- [ ] compact variant 가 가로 레이아웃
- [ ] hoverable 시 살짝 떠오름

### 3. FieldNote ⚠️ (다국어 검증)
- [ ] 영어 인용문에서 이탤릭 적용 (Fraunces 이탤릭 아름다움)
- [ ] 한국어/일본어/중국어 인용문에서 이탤릭 해제
- [ ] highlight 단어가 노랑색으로 강조
- [ ] 작성자 Avatar 가 베이비 핑크
- [ ] CTA 화살표가 라벤더

### 4. RouteTimeline
- [ ] horizontal variant 가 PC 가로 배치
- [ ] vertical variant 가 사이드바 세로 배치
- [ ] 6개 스팟 모두 표시
- [ ] connector 에 "🚶 5 min" 같은 이동 시간
- [ ] isCurrent 인 스팟이 강조됨

### 5. BottomSheet
- [ ] 모바일 viewport 에서만 보임
- [ ] PC viewport (1024px+) 에서 display: none
- [ ] 핸들 클릭 시 collapsed ↔ expanded 토글
- [ ] 부드러운 transition 애니메이션
- [ ] grip 가운데 정렬 + 옅은 회색

### 통합 검증
- [ ] /verify 슬래시 커맨드 통과
- [ ] 모든 Organisms 가 Atoms/Molecules 만 import (다른 Organism 금지)
- [ ] 빌드 에러 0개
- [ ] a11y 위반 0개

---

## ⚠️ 자주 발생하는 문제

### 문제 1: SpotCard 의 BlobMask 매핑이 자동 안 됨
**증상**: spot.category="heritage" 인데 BlobMask 가 default 쉐이프  
**해결**:
```
SpotCard 안에서 BlobMask 호출 시 shape={spot.shape} 또는 shape={spot.category} 명시.

interface Spot {
  category: 'heritage' | 'market' | 'nature' | ...;
  shape: 'heritage' | 'market' | 'nature';  // 명시적 필드
}

// SpotCard 내부
<BlobMask shape={spot.shape} ... />
```

### 문제 2: FieldNote 한국어 이탤릭 해제 안 됨
**증상**: 한국어 인용문도 기울임  
**해결**:
```css
/* 기본 영어/스페인어 */
.field-note__quote {
  font-style: italic;
}

/* CJK 언어 자동 해제 */
html[lang="ja"] .field-note__quote,
html[lang="ko"] .field-note__quote,
html[lang="zh"] .field-note__quote,
html[lang="zh-CN"] .field-note__quote {
  font-style: normal;
}
```

이 CSS가 global.css 또는 FieldNote.css 에 있는지 확인.

### 문제 3: BottomSheet 가 PC 에서도 보임
**증상**: 데스크톱 viewport 에서 BottomSheet 가 화면 가림  
**해결**:
```css
@media (min-width: 1024px) {
  .bottom-sheet {
    display: none !important;
  }
}
```

### 문제 4: RouteTimeline 의 connector 깨짐
**증상**: "🚶 5 min" 이 줄바꿈되거나 비뚤어짐  
**해결**:
```css
.route-timeline__connector {
  white-space: nowrap;
  flex-shrink: 0;
}
```

### 문제 5: Organism 이 다른 Organism 을 import 함
**증상**: SpotCard 안에서 FieldNote import  
**해결**:
```
Atomic Design 원칙 위반. Organism 끼리는 import 금지.
조합이 필요하면 Template 레벨에서.
SpotCard 안에서 FieldNote 가 필요하면 Molecule 로 강등하거나
Template 에서 둘을 조합.
```

---

## 🎬 세션 종료 명령

```
Organisms 5종 모두 검증 완료. 커밋 만들어줘.
메시지: "feat(organisms): Header, SpotCard, FieldNote, RouteTimeline, BottomSheet + 스토리"

ThreeAlleysSection 스토리 캡처해서 보여줄 수 있게 해줘.
디자이너 검수 자료로 쓸 거야.
```

---

## 📊 예상 시간 분배

- 0~15분: 이전 세션 상태 확인 + Plan Mode
- 15~50분: Header + 스토리 (35분)
- 50~95분: **SpotCard + 스토리 (45분, BlobMask 통합 검증)**
- 95~125분: FieldNote + 스토리 (30분)
- 125~150분: RouteTimeline + 스토리 (25분)
- 150~170분: BottomSheet + 스토리 (20분)
- 170~180분: 통합 검증 + git commit

총 180분 (3시간) 안에 완료 목표.

---

## 💡 효율 팁

1. **SpotCard 가 가장 중요**: 홈 페이지의 시그니처 카드. 여기 잘 되면 절반 성공
2. **Header 부터 만들기**: 다른 화면에서도 미리 보고 싶음
3. **AllVariants 비교 스토리 활용**: 한 번에 여러 variant 보면 차이 명확
4. **5개 언어 스토리는 자동화**: globals.locale 옵션으로 간단히

---

## 🚦 Session 5 완성도 판단

다음 5가지 모두 통과 시 Session 6 진행:

1. ✅ 5개 Organisms 모두 Storybook 사이드바에 보임
2. ✅ SpotCard의 BlobMask 자동 매핑 작동
3. ✅ FieldNote 5개 언어 정상 (특히 CJK 이탤릭 해제)
4. ✅ BottomSheet 가 PC에서 자동 숨김
5. ✅ /verify 통과
