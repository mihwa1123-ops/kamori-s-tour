# Session 1 — 프로젝트 셋업 + 토큰 통합 (90분)

## 📋 사전 준비

빈 폴더 만들고 다음 파일 복사:
- 5개 디자인 시스템 MD → 폴더 안에 임시로 두기
- 3개 SVG 쉐이프 파일 → 폴더 안에 임시로 두기

그 다음 Claude Code 실행:
```bash
cd /path/to/empty-folder
claude
```

---

## 🎯 첫 메시지 (복붙)

```
새 React + Vite + TypeScript 프로젝트를 만들어줘.

프로젝트 정보:
- 이름: kamoris-tour
- 설명: 대전 원도심 외국인 대상 로컬 가이드 웹서비스
- 5개 언어 지원 (EN, JA, KO, ES, ZH)

작업 순서:
1. 현재 폴더에 있는 5개 MD 파일을 docs/ 로 이동
2. 현재 폴더에 있는 3개 SVG 파일을 assets/shapes/ 로 이동
3. CLAUDE.md 메인 인덱스를 루트에 만들어줘 (docs/ 의 5개 문서를 참조하는 형식)
4. .claude/commands/ 폴더 만들고 4개 슬래시 커맨드 정의
   - component.md
   - verify.md
   - deploy-check.md
   - new-page.md
5. React + Vite + TypeScript 프로젝트 셋업
6. Storybook 9+ 설치 (docs/storybook-setup-guide.md 섹션 2-3 참조)
7. src/styles/tokens.css 만들어서 4개 MD 문서의 모든 변수 통합
8. .storybook/preview.ts 에 5개 언어 전환 데코레이터 + viewport 설정
9. Google Fonts 5개 언어 폰트 로드 코드

먼저 Plan Mode 로 단계별 계획 보여주고 승인 받은 후 진행해.
완료되면 npm run storybook 으로 확인할 수 있게 해주고 멈춰.
```

---

## ✅ 중간 감독 체크리스트

브라우저에서 `http://localhost:6006` 열고 확인:

- [ ] Storybook 정상 실행
- [ ] 사이드바에 사이드바 구조 잡혀있음 (예시 컴포넌트라도)
- [ ] 상단 툴바에 🌐 언어 전환 드롭다운 있음
- [ ] 5개 언어 클릭 시 `<html lang>` 변경됨
- [ ] viewport 전환(mobile/tablet/desktop) 정상 작동
- [ ] 콘솔에 에러 없음

폴더 구조 확인:
```bash
ls -la
ls -la docs/        # 5개 MD 파일
ls -la assets/shapes/  # 3개 SVG 파일
ls -la .claude/commands/  # 4개 슬래시 커맨드
cat CLAUDE.md | head -50  # 메인 인덱스 잘 만들어졌는지
cat src/styles/tokens.css | head -30  # 토큰 파일 확인
```

---

## ⚠️ 자주 발생하는 문제

### 문제 1: Vite 5와 Storybook 호환성
**증상**: 설치 중 peer dependency 경고  
**해결**:
```
npm 경고는 무시하고 진행. Storybook 9+는 Vite 5와 완전 호환.
경고가 에러로 바뀌면 알려줘.
```

### 문제 2: tokens.css 누락
**증상**: CSS 변수가 빈 값으로 처리됨  
**해결**:
```
.storybook/preview.ts 최상단에서 ../src/styles/tokens.css 를 import 했는지 확인.
없으면 추가해줘.
```

### 문제 3: 폰트가 시스템 기본으로 보임
**증상**: 한글·일본어가 시스템 폰트로 표시됨  
**해결**:
```
Google Fonts 동적 로드 코드가 .storybook/preview.ts 에 있는지 확인.
없으면 storybook-setup-guide.md 섹션 3.2 코드 추가.
```

---

## 🎬 세션 종료 명령

```
지금까지 작업한 것 git init 하고 첫 커밋 만들어줘.
메시지: "chore: 프로젝트 초기 셋업 + Storybook + 디자인 시스템 토큰 통합"
```

---

## 📊 예상 시간 분배

- 0~10분: Plan Mode 검토
- 10~30분: 폴더 구조 + 파일 이동
- 30~50분: React + Vite + Storybook 설치
- 50~80분: tokens.css + preview.ts 작성
- 80~90분: 검증 + 첫 커밋

총 90분 안에 완료 목표.
