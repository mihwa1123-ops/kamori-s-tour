# Session 8 — Chromatic + GitHub Actions 배포 (90분)

## 📋 사전 준비

마지막 세션. 디자이너에게 공유할 URL 만들기.

체크:
```bash
git log --oneline | head -10  # 7개 이상 커밋
npm run build                  # 빌드 성공
npm run build-storybook        # Storybook 빌드 성공
```

GitHub 계정 + Chromatic 가입 필요.

---

## 🎯 첫 메시지 (복붙)

```
마지막 세션. 배포 + CI/CD 셋업하고 디자이너 공유 URL 만든다.

작업 순서:

1. /deploy-check 슬래시 커맨드 실행해서 배포 사전 검증

2. .github/workflows/ 폴더에 2개 워크플로우 생성:
   
   a. storybook-test.yml — PR 마다 Storybook 빌드 + 테스트
      - Node 20, npm ci
      - npm run build-storybook
      - npm run test-storybook (Vitest 기반 a11y + interaction + visual)
      - 실패 시 PR 차단
   
   b. chromatic.yml — Chromatic 시각 회귀 테스트
      - main 브랜치 push 와 PR 모두
      - CHROMATIC_PROJECT_TOKEN 환경변수 사용
      - 자동 baseline 비교
      - PR 코멘트로 변경사항 알림

3. README.md 작성
   - 프로젝트 소개 (1-2 문단)
   - 5개 디자인 시스템 문서 링크
   - 시작하기 가이드 (npm install, npm run dev, npm run storybook)
   - 폴더 구조 설명
   - Slash commands 4종 안내
   - 디자이너 공유용 Storybook URL (배포 후 추가)
   - 라이선스

4. .env.example 파일 생성
   - VITE_KAKAO_MAP_KEY=your_key_here
   - 다른 필요한 환경변수 명시 (실제 값 없이)
   - .gitignore 에 .env 추가 확인

5. .gitignore 보강
   - node_modules
   - dist
   - storybook-static
   - .env
   - .DS_Store
   - *.log

6. package.json scripts 정리
   - dev, build, preview
   - storybook, build-storybook, test-storybook
   - chromatic (npx chromatic --project-token=$CHROMATIC_PROJECT_TOKEN)

7. PR template 만들기
   - .github/pull_request_template.md
   - 변경 내용, 영향 범위, 검증 항목 체크리스트

작업 후 사용자가 직접 해야 할 것을 단계별로 안내:
- GitHub repo 생성
- Chromatic 가입 + 프로젝트 토큰 발급
- GitHub Secrets 설정
- git push
- Chromatic 첫 빌드 확인
- 디자이너에게 URL 공유

⚠️ 주의:
- 실제 push 는 사용자가 직접 (Claude Code 가 임의로 push 하지 말 것)
- 토큰 등 민감 정보는 절대 코드에 하드코딩 금지
- README 의 Storybook URL 은 일단 placeholder 로 남겨두고 배포 후 갱신

먼저 Plan Mode 보여주고 진행.
```

---

## ✅ 중간 감독 체크리스트

### `/deploy-check` 결과
- [ ] 빌드 검증 통과
- [ ] 디자인 시스템 정합성 통과
- [ ] 컴포넌트 완전성 통과
- [ ] 5개 언어 검증 통과
- [ ] 접근성 자동 검증 통과
- [ ] 성능 검증 통과 (메인 번들 < 200KB)
- [ ] SEO 기본 통과
- [ ] 환경 설정 통과
- [ ] CI/CD 설정 통과
- [ ] Git 상태 통과

10/10 통과해야 배포 가능. 미달 시 수정 후 재실행.

### GitHub Actions 워크플로우

`.github/workflows/storybook-test.yml`:
- [ ] on: push (main), pull_request 양쪽 트리거
- [ ] Node 20 사용
- [ ] npm ci 로 캐시 활용
- [ ] build-storybook 단계
- [ ] test-storybook 단계 (a11y + interaction + visual)
- [ ] 실패 시 명확한 에러 메시지

`.github/workflows/chromatic.yml`:
- [ ] CHROMATIC_PROJECT_TOKEN 환경변수 참조
- [ ] secrets 에서 안전하게 가져오기
- [ ] PR 자동 미리보기
- [ ] 시각 회귀 자동 비교

### README.md

- [ ] 프로젝트 소개 명확
- [ ] 5개 디자인 시스템 문서 링크
- [ ] 시작하기 명령어 정확
- [ ] 폴더 구조 트리 표시
- [ ] Slash commands 사용법
- [ ] 라이선스 명시

### .env.example
- [ ] 실제 키 없이 placeholder 만
- [ ] 주석으로 어디서 발급받는지 안내
- [ ] .gitignore 에 .env 포함 확인

### .gitignore
- [ ] node_modules, dist, storybook-static
- [ ] .env (실제 환경변수)
- [ ] OS 임시 파일 (.DS_Store, Thumbs.db)
- [ ] 로그 파일 (*.log)
- [ ] IDE 설정 (.vscode/settings.json 등 개인 설정)

### package.json scripts
- [ ] 모든 명령어 작동 확인
- [ ] chromatic 명령어가 토큰 환경변수 참조

### PR Template
- [ ] 변경 내용 설명 섹션
- [ ] 영향 범위 (어떤 컴포넌트/페이지 영향)
- [ ] 검증 체크리스트 (a11y, viewport, 5개 언어 등)
- [ ] 스크린샷 첨부 가이드

---

## 📤 사용자가 직접 할 작업 (10분)

Claude Code가 모든 파일을 만들면, 다음을 직접 수행:

### Step 1: GitHub repo 생성
1. https://github.com/new
2. Repository name: `kamoris-tour`
3. Private (권장) 또는 Public 선택
4. README, .gitignore, license 추가하지 말 것 (Claude Code가 이미 만듦)

### Step 2: Chromatic 가입
1. https://www.chromatic.com/start
2. GitHub 계정으로 로그인
3. 프로젝트 추가 → kamoris-tour 선택
4. Project token 복사

### Step 3: GitHub Secrets 등록
1. GitHub repo → Settings → Secrets and variables → Actions
2. New repository secret 클릭
3. Name: `CHROMATIC_PROJECT_TOKEN`
4. Value: 위에서 복사한 토큰
5. 저장

### Step 4: Git push
```bash
# 첫 push
git remote add origin https://github.com/<your-username>/kamoris-tour.git
git branch -M main
git push -u origin main
```

### Step 5: GitHub Actions 확인
1. GitHub repo → Actions 탭
2. storybook-test 워크플로우 자동 실행 확인
3. chromatic 워크플로우 자동 실행 확인
4. 둘 다 ✅ 초록 체크 나올 때까지 기다림 (3-5분)

### Step 6: Chromatic 빌드 확인
1. Chromatic 대시보드
2. 첫 빌드의 모든 스토리 확인
3. "Approve" 클릭 → baseline 으로 설정
4. 이후 PR 마다 자동 비교

### Step 7: Storybook URL 받기
- Chromatic: 자동으로 URL 제공 (예: `https://6XXXXX.chromatic.com`)
- 또는 GitHub Pages 배포 시: `https://<username>.github.io/kamoris-tour/`
- 또는 Vercel: 자동 URL 제공

### Step 8: README 업데이트
- 받은 Storybook URL 을 README.md 에 추가
- git commit & push

### Step 9: 디자이너 공유
- 슬랙/이메일에 다음 정보 보내기:
  - Storybook URL
  - 주요 페이지 경로 안내:
    - Foundation/Colors
    - Foundation/Typography
    - Templates/HomeLayout
    - Templates/SpotDetailLayout
  - 피드백 방법 (GitHub Issue 또는 코멘트)

---

## ⚠️ 자주 발생하는 문제

### 문제 1: GitHub Actions 첫 빌드 실패
**증상**: storybook-test.yml 이 빨간색 X  
**원인**: 캐시 누락, 의존성 설치 실패 등  
**해결**:
```yaml
# storybook-test.yml 에서
- uses: actions/setup-node@v4
  with:
    node-version: '20'
    cache: 'npm'              # 이거 누락되면 매번 설치

- run: npm ci                  # npm install 보다 안정적
```

### 문제 2: Chromatic 토큰 인식 안 됨
**증상**: chromatic.yml 에서 "401 Unauthorized"  
**해결**:
```
1. GitHub Secrets 의 변수명이 정확히 CHROMATIC_PROJECT_TOKEN 인지
2. 워크플로우에서 ${{ secrets.CHROMATIC_PROJECT_TOKEN }} 로 참조
3. 토큰을 Chromatic 에서 다시 발급받아 갱신
```

### 문제 3: Chromatic 빌드 시간 너무 김
**증상**: 첫 빌드가 10분 넘게 걸림  
**원인**: 모든 스토리를 처음 캡처하느라  
**해결**: 정상. 두 번째부터는 변경된 스토리만 캡처해서 1-2분 걸림.

### 문제 4: 스토리북 배포 후 폰트 안 보임
**증상**: 로컬에서는 정상이지만 배포 후 시스템 폰트로 보임  
**해결**:
```
.storybook/preview.ts 의 Google Fonts 동적 로드 코드 확인.
또는 .storybook/preview-head.html 에 정적으로 추가:

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?..." rel="stylesheet">
```

### 문제 5: 디자이너가 URL 클릭해도 안 열림
**증상**: 403 Forbidden 또는 빈 페이지  
**해결**:
```
1. Chromatic 의 프로젝트 visibility 가 Private 인지 확인
2. Public 으로 변경하거나, 디자이너를 collaborator 로 초대
3. URL 끝에 /?path=/docs/foundation-colors 같은 경로 포함했는지
```

---

## 🎬 세션 종료 명령

```
모든 셋업 완료. 마지막 커밋 만들어줘.
메시지: "chore: CI/CD 셋업 + README + 배포 준비 완료"

이제 사용자가 직접 할 단계 9개를 정리해서 보여줘:
1. GitHub repo 생성
2. Chromatic 가입 + 토큰
3. GitHub Secrets 등록
... (이하 동일)

각 단계마다 시간이 얼마나 걸리는지도 표시.
```

---

## 📊 예상 시간 분배

### Claude Code 작업 (60분)
- 0~10분: /deploy-check 실행 + 검증
- 10~25분: GitHub Actions 워크플로우 2개
- 25~40분: README.md 작성
- 40~50분: .env.example, .gitignore, package.json 정리
- 50~60분: PR template + 마지막 커밋

### 사용자 직접 작업 (30분)
- 0~5분: GitHub repo 생성
- 5~10분: Chromatic 가입 + 토큰
- 10~12분: GitHub Secrets 등록
- 12~15분: git push
- 15~25분: GitHub Actions + Chromatic 빌드 대기
- 25~30분: README URL 갱신 + 디자이너 공유

총 90분 안에 완료 목표.

---

## 🎉 2일 프로젝트 완료 시 결과물

### 코드베이스
- ✅ 17개 컴포넌트 (Atoms 5 + Molecules 5 + Organisms 5 + Templates 2)
- ✅ 4개 Foundation MDX 페이지
- ✅ 5개 디자인 시스템 문서 (docs/)
- ✅ 5개 언어 지원 (i18n 셋업)
- ✅ TypeScript + React + Vite + Storybook 9
- ✅ a11y 위반 0개

### 자동화
- ✅ GitHub Actions CI/CD
- ✅ Chromatic 시각 회귀 테스트
- ✅ PR 마다 미리보기 URL
- ✅ 4개 Slash commands

### 산출물
- ✅ 공개 Storybook URL (디자이너 공유)
- ✅ 디자인 시스템 카탈로그 (살아있는 문서)
- ✅ Foundation 페이지 (컬러/타이포/간격/쉐이프 시각화)
- ✅ 컴포넌트 + 페이지 시뮬레이션

---

## 💡 다음 단계 (이 프로젝트 이후)

이번에 완성한 디자인 시스템을 기반으로:

1. **실제 페이지 구현** (1-2주)
   - 홈 페이지
   - 6개 스팟 상세 페이지
   - 지도 페이지
   - About / Contact 페이지

2. **콘텐츠 시스템** (1주)
   - CMS 연동 (Sanity, Contentful 등)
   - 5개 언어 번역 워크플로우

3. **카카오맵 통합** (3일)
   - 지도 임베드
   - 길찾기 기능
   - 스팟 마커 + 인포윈도우

4. **사용자 분석** (2일)
   - GA4 또는 Plausible
   - 5개 언어별 사용 패턴 추적

5. **성능 최적화** (3일)
   - 이미지 최적화 (CDN)
   - 코드 스플리팅
   - PWA 지원

---

## 🎊 축하합니다

10일 분량을 2일에 완성했습니다. 

성공 비결:
- ✅ 5개 디자인 시스템 MD 문서로 사전 합의
- ✅ CLAUDE.md 메인 인덱스로 자동 컨텍스트
- ✅ Slash commands 로 반복 작업 자동화
- ✅ 세션 단위로 명확한 목표 + 검증
- ✅ 중간 감독으로 방향 수정 가능
- ✅ 병렬 작업 (한 메시지에 여러 컴포넌트)
