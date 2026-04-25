# Session 7 — Templates + 통합 테스트 (90분)

## 📋 사전 준비

지금까지 완성된 것:
- Atoms 5종 ✓
- Molecules 5종 ✓ (BlobMask 포함)
- Organisms 5종 ✓
- Foundation MDX 4개 ✓

이번 세션에서 모든 컴포넌트를 조합해서 실제 페이지 모양을 만든다.

---

## 🎯 첫 메시지 (복붙)

```
지금까지 만든 모든 컴포넌트를 조합해서 페이지 Templates 2개 만들고 통합 테스트.

작업 내용:

1. HomeLayout (src/components/templates/HomeLayout.tsx + 스토리)
   - docs/layout-system.md 섹션 7.1 구조 정확히 따름
   - PC 1024px+: KV Anti-Grid Hero (블롭 2개 비대칭) + Three Alleys 카드 + Field Note + Route Preview + Footer
   - 모바일: 세로 스택 + Floating CTA
   - 사용 컴포넌트: Header, BlobMask, SpotCard×3, FieldNote, RouteTimeline, Button

2. SpotDetailLayout (src/components/templates/SpotDetailLayout.tsx + 스토리)
   - docs/layout-system.md 섹션 7.2 구조
   - PC: 좌 65% 본문 + 우 35% sticky 사이드바
   - 모바일: 세로 스택 + Floating CTA
   - 히어로에만 BlobMask 1개 (갤러리는 일반 사각)
   - 사용 컴포넌트: Header, BlobMask (히어로만), Card, InfoRow, Button, RouteTimeline

3. 통합 테스트
   - npm run build (프로덕션 빌드)
   - npm run build-storybook (Storybook 빌드)
   - 빌드 결과물 사이즈 확인 (메인 번들 < 200KB gzip 목표)
   - 모든 스토리 정상 로드 확인
   - 콘솔 에러 0개

각 Template 작성 원칙:
- Organisms 만 import (Atoms/Molecules 직접 import 최소화)
- 데이터는 mock 으로 하드코딩 (실제 API 연동 없음)
- 5개 언어 콘텐츠 키 사용 (i18next mock)

각 스토리 작성 원칙:
- viewport: mobile / tablet / desktop / large 4가지
- locale: 5개 언어 모두
- variant: 다양한 데이터 (스팟별 카테고리 다른 데이터)

⚠️ 특별 주의사항:
- HomeLayout 의 KV 가 layout-system.md 섹션 5.2 와 정확히 일치하는지
- 모바일에서 Heritage 블롭은 숨겨지고 Nature 블롭만 보이는지
- SpotDetailLayout 에서 사이드바 sticky 가 PC에서만 작동하는지
- 모든 컴포넌트가 5개 언어 전환 시 정상

먼저 Plan Mode 보여주고 진행. 막히면 즉시 멈춰.
```

---

## ✅ 중간 감독 체크리스트

### HomeLayout

PC viewport (1280px) 에서:
- [ ] KV가 90vh 차지
- [ ] 좌측 텍스트 (55%) + 우측 블롭 영역 (45%)
- [ ] Nature 블롭 우측 상단, Heritage 블롭 좌측 하단 (비대칭)
- [ ] Three Alleys 섹션에 카드 3개 가로 배치
- [ ] 각 카드 BlobMask 자동 매핑 (heritage/market/nature)
- [ ] FieldNote 다크 배경 + 노랑 강조
- [ ] RouteTimeline horizontal 가로 배치
- [ ] Footer 마지막

모바일 viewport (375px) 에서:
- [ ] KV에 Nature 블롭 1개만 (Heritage 숨김)
- [ ] 카드 3개 세로 스택
- [ ] FieldNote 정상 표시
- [ ] **Floating CTA가 하단에 고정** ⚠️ 중요
- [ ] 한 손 스크롤로 전체 탐색 가능

5개 언어 검증:
- [ ] 영어 KV: "A city of quiet corners."
- [ ] 일본어: "静かな路地の街、大田へ。"
- [ ] 한국어: "조용한 골목의 도시."
- [ ] 스페인어: "Una ciudad de rincones callados."
- [ ] 중국어: "一座安静巷子的城市。"

### SpotDetailLayout

PC viewport 에서:
- [ ] Breadcrumb 상단
- [ ] Spot Hero 에 BlobMask 1개 (카테고리 매핑)
- [ ] 좌 65% 본문, 우 35% 사이드바
- [ ] 사이드바가 sticky (스크롤 시 고정)
- [ ] InfoRow 로 주소·시간·요금 표시
- [ ] 길찾기 CTA 버튼

모바일 viewport 에서:
- [ ] BlobMask 히어로 1개
- [ ] 본문 → 갤러리 → 지도 → 길찾기 순서로 세로 스택
- [ ] **갤러리는 일반 사각** (블롭 마스크 X)
- [ ] 하단 Floating CTA (길찾기·공유)

### 통합 빌드 검증

```bash
# 프로덕션 빌드
npm run build
```
- [ ] 빌드 성공
- [ ] 메인 번들 < 200KB (gzip 기준)
- [ ] 빌드 경고 0건

```bash
# Storybook 빌드  
npm run build-storybook
```
- [ ] 빌드 성공
- [ ] storybook-static/ 폴더 생성
- [ ] 모든 스토리 정적으로 로드

```bash
# 빌드 사이즈 확인
ls -lh dist/assets/*.js
du -sh dist/
du -sh storybook-static/
```

### 사이드바 최종 구조

```
Foundation
├── Colors
├── Typography
├── Spacing
└── Shapes

Atoms (5)
Molecules (5)
Organisms (5)

Templates (2) ← 이번 세션 추가
├── HomeLayout
└── SpotDetailLayout
```

총 16개 컴포넌트 + 4개 Foundation = 20개 항목

---

## ⚠️ 자주 발생하는 문제

### 문제 1: 모바일에서 Heritage 블롭이 안 숨겨짐
**증상**: 모바일 viewport 에서도 KV 에 블롭 2개 다 보임  
**해결**:
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

### 문제 2: 사이드바 sticky 안 됨
**증상**: 스크롤하면 사이드바도 따라 올라감  
**해결**:
```css
.spot-detail__sidebar {
  position: sticky;
  top: 100px; /* Header 높이만큼 */
  height: fit-content;
}

/* 모바일에서는 sticky 해제 */
@media (max-width: 1023px) {
  .spot-detail__sidebar {
    position: static;
  }
}
```

### 문제 3: 빌드 사이즈 너무 큼 (300KB+)
**증상**: 메인 번들이 목표 200KB 초과  
**해결**:
```
1. 사용 안 하는 import 제거
2. dynamic import 로 페이지 분리
3. 폰트 weight 필요한 것만 로드
4. tree-shaking 작동 확인 (named import)

vite.config.ts 에 build.rollupOptions.output.manualChunks 추가:
manualChunks: {
  vendor: ['react', 'react-dom', 'react-router-dom'],
  i18n: ['i18next', 'react-i18next'],
  storybook: [...]
}
```

### 문제 4: SpotDetailLayout 의 갤러리에 블롭 마스크 적용됨
**증상**: 갤러리 이미지가 유기적 모양으로 잘림  
**해결**:
```
docs/layout-system.md 섹션 7.2 "스팟 상세 페이지는 블롭 마스크를 히어로에만 1번 사용. 
갤러리는 일반 사각" 원칙 위반.

갤러리 컴포넌트에서 BlobMask 대신 일반 <img> 사용:
<img 
  src={imageSrc} 
  alt={alt}
  className="gallery-image"
  style={{ aspectRatio: '3/2', objectFit: 'cover' }}
/>
```

### 문제 5: 한 컴포넌트가 다른 viewport 에서 깨짐
**증상**: PC 에서는 정상이지만 태블릿에서 레이아웃 무너짐  
**해결**:
```
모든 viewport (375, 768, 1024, 1440) 에서 테스트.
브레이크포인트 사이의 중간 값에서도 검증.

Storybook viewport 패널에서 4개 viewport 모두 클릭해서 확인.
```

---

## 🎬 세션 종료 명령

```
Templates 2종 완성. 통합 빌드 모두 성공. 커밋 만들어줘.
메시지: "feat(templates): HomeLayout, SpotDetailLayout + 통합 테스트 통과"

빌드 사이즈 + Lighthouse 점수 보고서 보여줘:
- 메인 번들 사이즈
- gzip 후 사이즈
- Storybook 빌드 사이즈
- 빌드 시간
```

---

## 📊 예상 시간 분배

- 0~10분: Plan Mode + 구조 설계
- 10~40분: HomeLayout + 스토리 (가장 복잡)
- 40~65분: SpotDetailLayout + 스토리
- 65~80분: 통합 빌드 + 사이즈 확인
- 80~90분: git commit + 보고서

총 90분 안에 완료 목표.

---

## 💡 효율 팁

1. **HomeLayout 부터**: 모든 컴포넌트가 다 등장하는 가장 복잡한 페이지
2. **mock 데이터 미리 준비**: 6개 스팟 데이터 + 5개 언어 콘텐츠 이미 정의해두면 빠름
3. **viewport 자동 전환**: Storybook 의 viewport 툴바에서 4가지 클릭으로 빠르게 검증
4. **빌드 사이즈는 최적화 후 검증**: 첫 빌드는 클 수 있음, manualChunks 적용 후 재측정

---

## 🚦 Session 7 완성도 판단

다음 5가지 모두 통과 시 Session 8 진행:

1. ✅ HomeLayout 이 PC 와 모바일 모두 정상 (모바일은 블롭 1개)
2. ✅ SpotDetailLayout 이 PC 사이드바 sticky 작동
3. ✅ 5개 언어 모두 정상 렌더링
4. ✅ npm run build 성공 (메인 번들 < 200KB gzip)
5. ✅ npm run build-storybook 성공

조건 미달이면 빌드 + 수정 반복하다 다음 세션 못 시작.

---

## 📸 디자이너 검수 자료 준비

세션 종료 후 다음 캡처 준비:

1. **HomeLayout PC** (1280px viewport)
2. **HomeLayout 모바일** (375px viewport)
3. **SpotDetailLayout PC** (1280px)
4. **SpotDetailLayout 모바일** (375px)
5. **5개 언어별 KV 스크린샷**

배포 (Session 8) 후 실제 URL 로 보여주면 더 좋음.
