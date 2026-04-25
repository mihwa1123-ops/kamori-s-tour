# Session 2 — Atoms 5종 (120분)

## 📋 사전 준비

이전 세션에서 git commit 했는지 확인:
```bash
git log --oneline
```

Storybook 실행 중인지 확인 (다른 터미널에서):
```bash
npm run storybook
```

---

## 🎯 첫 메시지 (복붙)

```
어제 Day 1 Session 1 에서 셋업 완료했어.
docs/ 의 5개 MD 모두 사용 가능, .claude/commands/ 슬래시 커맨드 정의 완료.

오늘은 Atoms 5종을 만든다. 한 번에 모두 작성:

1. Button (src/components/atoms/Button.tsx + Button.stories.tsx)
2. IconButton (src/components/atoms/IconButton.tsx + IconButton.stories.tsx)
3. Tag (src/components/atoms/Tag.tsx + Tag.stories.tsx)
4. Badge (src/components/atoms/Badge.tsx + Badge.stories.tsx)
5. NumberMarker (src/components/atoms/NumberMarker.tsx + NumberMarker.stories.tsx)

각 컴포넌트 작성 원칙:
- docs/component-catalog.md 섹션 2 명세 정확히 따름
- TypeScript 인터페이스 정의
- CSS 변수만 사용 (var(--lav-500), var(--ink) 등) - 하드코딩 금지
- BEM 명명 규칙
- 모든 variant + size 구현
- 접근성 속성 (aria-*, tabIndex)

각 스토리 작성 원칙:
- docs/storybook-setup-guide.md 섹션 5.1 패턴 따름
- tags: ['autodocs'] 자동 문서화
- 모든 variant 별 개별 스토리
- AllVariants, AllSizes 비교 스토리
- 5개 언어 스토리 (Button 등 텍스트가 있는 컴포넌트)
- Loading, Disabled 등 상태 스토리

실행 순서:
1. Plan Mode 로 5개 컴포넌트 작업 순서 보여주기
2. Button 부터 순서대로 생성 (구조 잡힌 후 다른 것도 같은 패턴으로)
3. 각 컴포넌트 완성 후 즉시 Storybook 에서 시각 검증
4. 5개 모두 완성되면 멈추고 보고

문제 발생 시 끝까지 가지 말고 즉시 멈추고 알려줘.
```

---

## ✅ 중간 감독 체크리스트

각 Atom 완성 후 Storybook에서 빠르게 확인:

### Button
- [ ] 4 variants (primary, secondary, ghost, dark) 모두 보임
- [ ] 3 sizes (sm, md, lg) 모두 정상
- [ ] 라벤더 primary 배경 위 텍스트가 Ink (검정) 인가? (흰 글자 아님!)
- [ ] 5개 언어 전환 시 폰트 자동 변경
- [ ] hover 시 배경색 변화

### IconButton
- [ ] 정사각형 (44×44 이상)
- [ ] aria-label 적용됨

### Tag
- [ ] 6 카테고리 variants (heritage, market, food, story, alleys, nature)
- [ ] meta, accent variants 추가로 작동
- [ ] 각 카테고리마다 컬러 매핑이 카탈로그와 일치
- [ ] sm/md 사이즈 차이 적절

### Badge
- [ ] 6 카테고리 dot 컬러 매핑 정상
- [ ] sm/md/lg 사이즈 모두 둥근 원형
- [ ] Nature Badge 만 노랑+라벤더 테두리 조합 (특별)

### NumberMarker
- [ ] 4 variants (lavender, pink, yellow, dark) 정상
- [ ] 02, 03 같은 두 자릿수 padding 처리
- [ ] 폰트가 Fraunces (세리프) 인지 확인

### 전체 검증
- [ ] a11y 패널 위반 0개 (모든 컴포넌트)
- [ ] CSS 변수만 사용 (직접 hex 컬러 0개)
- [ ] 빌드 에러 없음

---

## ⚠️ 자주 발생하는 문제

### 문제 1: 라벤더 위 흰 글자
**증상**: Button primary 의 텍스트가 흰색  
**해결**:
```
Button primary 의 color 가 var(--white) 면 안 돼.
docs/color-system.md 의 Golden Rule 따라 var(--ink) 로 수정.
파스텔 배경에는 항상 Ink 텍스트.
```

### 문제 2: 컬러 하드코딩
**증상**: `color: #A594F9` 같은 직접 입력  
**해결**:
```
/verify 슬래시 커맨드 실행해서 모든 하드코딩 찾아 변수로 교체.
```

### 문제 3: 카테고리 매핑 어긋남
**증상**: Tag variant=heritage 가 핑크색 표시  
**해결**:
```
docs/color-system.md 섹션 5.1 카테고리 매핑 표 참조해서 수정.
Heritage = lavender, Market = pink, Food = yellow.
```

### 문제 4: 5개 언어 폰트 안 바뀜
**증상**: 언어 전환해도 폰트 변화 없음  
**해결**:
```
.storybook/preview.ts 의 withLanguage 데코레이터에서
useEffect 안에 document.documentElement.lang 업데이트 코드 있는지 확인.
```

---

## 🎬 세션 종료 명령

```
5개 Atoms 모두 검증 완료. 커밋 만들어줘.
메시지: "feat(atoms): Button, IconButton, Tag, Badge, NumberMarker + 스토리"

다음 세션에서는 Molecules 5종을 만들 예정이라고 메모도 남겨줘.
```

---

## 📊 예상 시간 분배

- 0~10분: 이전 세션 상태 확인 + Plan Mode
- 10~30분: Button + 스토리 (가장 복잡한 것 먼저)
- 30~45분: IconButton + 스토리 (Button 패턴 재활용)
- 45~65분: Tag + 스토리 (variants 많음)
- 65~80분: Badge + 스토리 (간단)
- 80~95분: NumberMarker + 스토리
- 95~110분: 전체 검증 + 빌드 확인
- 110~120분: git commit + 보고

총 120분 안에 완료 목표.

---

## 💡 효율 팁

1. **Button부터 시작**: Button의 패턴이 다른 Atoms의 베이스가 됨
2. **첫 컴포넌트만 정밀 검토**: Button 완벽하면 나머지는 자동으로 잘 됨
3. **AllVariants 스토리 활용**: 한 화면에서 다 보이면 검증 빠름
4. **a11y 패널 항상 켜두기**: 실수 즉시 발견
