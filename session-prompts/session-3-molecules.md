# Session 3 — Molecules 5종 + BlobMask 검증 (120분)

## 📋 사전 준비

이전 세션 커밋 확인:
```bash
git log --oneline | head -5
```

가장 중요한 세션 — **BlobMask가 디자인 시스템의 시그니처**라서 정밀 검증 필요.

---

## 🎯 첫 메시지 (복붙)

```
지금까지 Atoms 5종 완성. 이번엔 Molecules 5종을 만든다.

작업 순서 (BlobMask 가 가장 중요해서 먼저):

1. BlobMask (src/components/molecules/BlobMask.tsx + BlobMask.stories.tsx)
   - docs/layout-system.md 섹션 2.4 코드 그대로 구현
   - 3가지 쉐이프: heritage, market, nature
   - assets/shapes/ 의 SVG path 데이터 사용
   - clipPath ID 충돌 방지 위해 useId 훅 또는 nanoid 사용
   - 1~3도 회전 효과 (카테고리별 다른 각도)
   - prefers-reduced-motion 대응

2. Card (src/components/molecules/Card.tsx + Card.stories.tsx)
   - 3 variants: default, tinted, dark
   - tinted 면 lavender/pink/yellow 중 선택
   - hoverable 옵션

3. LanguageSwitcher (src/components/molecules/LanguageSwitcher.tsx + 스토리)
   - 5개 언어 드롭다운
   - i18next 사용 (없으면 mock 으로)
   - 클릭 시 <html lang> 자동 갱신

4. Avatar (src/components/molecules/Avatar.tsx + 스토리)
   - 이니셜 또는 사진
   - 3 sizes, 3 variants

5. InfoRow (src/components/molecules/InfoRow.tsx + 스토리)
   - 키-값 가로 행
   - 아이콘 옵션

각 컴포넌트 작성 원칙:
- docs/component-catalog.md 섹션 3 명세 정확히 따름
- CSS 변수만 사용
- TypeScript 타입 정의

각 스토리 작성 원칙:
- 모든 variant 별 스토리
- AllVariants 비교 스토리 필수
- BlobMask 는 AllShapes 비교 + ThreeAlleysSimulation 스토리 필수
- 5개 언어 스토리 (LanguageSwitcher 등)

⚠️ BlobMask 가 가장 중요. 다음 4가지 반드시 검증:
1. 3가지 쉐이프 모두 정상 마스킹
2. 같은 페이지에 여러 BlobMask 있어도 ID 충돌 없음
3. 카테고리별 회전 각도 다르게 적용 (heritage -2°, market 1.5°, nature -1°)
4. 이미지 로드 전 카테고리 컬러 placeholder 표시

먼저 Plan Mode 로 작업 순서 보여주고 진행. 
BlobMask 완성 후 즉시 멈춰서 검증 받은 다음 나머지 진행.
```

---

## ✅ 중간 감독 체크리스트

### BlobMask 정밀 검증 (⚠️ 가장 중요)

브라우저에서 BlobMask 스토리 페이지 열고:

- [ ] **AllShapes 스토리에서 3가지 쉐이프 모두 보임**
  - Heritage: 윗부분 둥근 사각형 + 아래 두 반원 (지붕 모양)
  - Market: 아래 4개 반원 파도 (좌판 모양)
  - Nature: 좌우 비대칭 유기체 (산 능선)

- [ ] **ID 충돌 테스트**
  - 같은 페이지에 BlobMask 3개 나란히 배치된 스토리 만들고
  - 모두 정상 마스킹 (한 개만 보이거나 깨지면 ID 충돌)

- [ ] **회전 각도 검증**
  - DevTools 에서 각 BlobMask 의 transform 값 확인
  - heritage: rotate(-2deg)
  - market: rotate(1.5deg)
  - nature: rotate(-1deg)

- [ ] **placeholder 컬러**
  - 이미지 로드 전 (또는 깨진 이미지)
  - Heritage = lavender 100 배경
  - Market = pink 100 배경
  - Nature = yellow 100 배경

- [ ] **prefers-reduced-motion**
  - 시스템 설정에서 모션 줄임 켰을 때 회전 해제됨

### Card
- [ ] 3 variants 모두 정상
- [ ] tinted 의 lavender/pink/yellow 모두 정상 컬러 매핑
- [ ] hoverable 시 transform: translateY 작동

### LanguageSwitcher
- [ ] 드롭다운 열림/닫힘
- [ ] 5개 언어 모두 보임
- [ ] 클릭 시 `<html lang>` 변경
- [ ] 현재 언어가 active 상태로 표시
- [ ] 키보드로 조작 가능 (Tab, Enter, Escape)

### Avatar
- [ ] 이니셜 또는 이미지 모두 정상
- [ ] 3 sizes 차이 명확
- [ ] 폰트가 Fraunces (세리프) 인지

### InfoRow
- [ ] 아이콘-라벨-값 정렬 정상
- [ ] 아이콘 없을 때도 정상 표시
- [ ] border-bottom 으로 행 구분

---

## ⚠️ 자주 발생하는 문제

### 문제 1: BlobMask ID 충돌
**증상**: 같은 페이지에 BlobMask 여러 개 둘 때 마지막 것만 마스킹됨  
**원인**: clipPath의 id가 같아서 마지막 정의만 적용됨  
**해결**:
```
React useId 훅으로 컴포넌트마다 고유 ID 생성:

import { useId } from 'react';

export function BlobMask({ shape, src, alt }) {
  const reactId = useId();
  const clipId = `clip-${shape}-${reactId.replace(/:/g, '')}`;
  // ...
}
```

### 문제 2: SVG path 깨짐
**증상**: 블롭이 사각형으로 표시되거나 일부만 잘림  
**해결**:
```
docs/layout-system.md 섹션 2.3 의 SVG path 데이터를 정확히 복사했는지 확인.
viewBox="0 0 170 170" 인지, preserveAspectRatio="xMidYMid meet" 인지.
```

### 문제 3: 회전이 부모 컨테이너 넘침
**증상**: 회전된 블롭이 카드 경계 밖으로 삐져나감  
**해결**:
```
.blob-mask svg { overflow: visible; } 설정 확인.
부모 컨테이너에 padding 충분히 주거나 overflow 처리.
```

### 문제 4: LanguageSwitcher 메뉴가 다른 요소에 가려짐
**증상**: 드롭다운이 헤더 아래 있는 콘텐츠에 잘림  
**해결**:
```
.lang-switcher__menu 의 z-index 를 var(--z-dropdown) 로 설정.
부모 요소의 overflow: hidden 제거.
```

---

## 🎬 세션 종료 명령

```
Molecules 5종 모두 검증 완료. BlobMask 정상 작동 확인.
커밋 만들어줘.

메시지: "feat(molecules): BlobMask, Card, LanguageSwitcher, Avatar, InfoRow + 스토리"
```

---

## 📊 예상 시간 분배

- 0~10분: 이전 세션 상태 확인 + Plan Mode
- 10~40분: **BlobMask 정밀 작업** (가장 중요)
- 40~50분: BlobMask 검증 + 사용자 확인 받기
- 50~65분: Card + 스토리
- 65~80분: LanguageSwitcher + 스토리
- 80~95분: Avatar + 스토리
- 95~105분: InfoRow + 스토리
- 105~115분: 전체 검증 + 빌드
- 115~120분: git commit + 보고

총 120분 안에 완료 목표.

---

## 💡 효율 팁

1. **BlobMask 절대 그냥 넘기지 말기**: 이게 안 되면 디자인 시스템 시그니처가 무너짐
2. **AllShapes 스토리 만들고 캡처**: 디자이너에게 보여줄 때 유용
3. **3개 카드 시뮬레이션 스토리**: 홈 페이지의 Three Alleys 섹션 미리 구현
4. **i18next 미리 설치**: LanguageSwitcher 가 실제로 작동해야 함

---

## 🚦 BlobMask 완성도 판단 기준

다음 5가지 모두 통과하면 "완성":

1. ✅ 3가지 쉐이프 시각적으로 명확히 다름
2. ✅ 같은 페이지에 여러 개 두어도 모두 정상
3. ✅ 이미지 alt 텍스트가 의미 있음 (스크린리더 지원)
4. ✅ 회전이 카테고리별로 다르게 적용됨
5. ✅ 모션 줄임 환경에서 회전 해제

하나라도 안 되면 다음 세션 진행 금지. 무조건 BlobMask부터 고치기.
