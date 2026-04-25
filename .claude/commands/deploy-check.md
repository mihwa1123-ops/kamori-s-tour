---
description: 배포 직전 자동 체크리스트 실행
---

# /deploy-check 명령어

배포 직전 모든 필수 항목을 자동 검증한다. 하나라도 실패하면 배포 중단.

## 실행 단계

### 1단계: 빌드 검증
- [ ] `npm run build` 성공
- [ ] `npm run build-storybook` 성공
- [ ] 빌드 경고 0개
- [ ] TypeScript 에러 0개

```bash
npm run build 2>&1 | tee /tmp/build.log
npm run build-storybook 2>&1 | tee /tmp/sb-build.log
```

빌드 실패 시 즉시 중단하고 에러 보고.

### 2단계: 디자인 시스템 정합성
`/verify` 명령어 실행 결과 확인:
- [ ] 컬러 하드코딩 0건
- [ ] 블롭 쉐이프 매핑 정상
- [ ] 파스텔 배경 흰 글자 0건
- [ ] z-index 하드코딩 0건

### 3단계: 컴포넌트 완전성
- [ ] 모든 카탈로그 컴포넌트가 구현되어 있는가
- [ ] 모든 컴포넌트에 .stories.tsx 페어가 있는가
- [ ] Foundation MDX 페이지 4개(Colors, Typography, Spacing, Shapes) 존재
- [ ] Templates 2종(HomeLayout, SpotDetailLayout) 존재

### 4단계: 5개 언어 검증
각 언어마다 다음 확인:
- [ ] `src/i18n/locales/{en,ja,ko,es,zh}/` 폴더 존재
- [ ] 각 언어 폴더에 `common.json`, `home.json`, `spots.json` 존재
- [ ] LanguageSwitcher 클릭 시 5개 언어 모두 작동
- [ ] `<html lang>` 속성이 자동 갱신되는가

### 5단계: 접근성 자동 검증

```bash
npm run test-storybook
```

확인:
- [ ] a11y 위반 0개 (모든 스토리)
- [ ] Interaction 테스트 모두 통과
- [ ] 키보드 네비게이션 작동
- [ ] Focus visible 표시
- [ ] Heading 계층 정상

### 6단계: 성능 검증
빌드된 결과물 확인:
- [ ] 메인 번들 < 200KB (gzip)
- [ ] 폰트 preconnect 설정됨
- [ ] 이미지 lazy loading 적용됨 (KV 제외)
- [ ] aspect-ratio로 Layout Shift 방지

```bash
# 빌드 사이즈 확인
du -sh dist/
ls -lh dist/assets/*.js | sort -k 5 -h
```

### 7단계: SEO 기본
- [ ] `<title>` 5개 언어 각각 설정
- [ ] `<meta name="description">` 5개 언어
- [ ] `<html lang>` 동적 갱신
- [ ] `hreflang` 태그 자동 생성
- [ ] OpenGraph 메타 태그 (og:title, og:image 등)

### 8단계: 환경 설정
- [ ] `.env.example` 파일 존재 (실제 키는 git ignore)
- [ ] `.gitignore` 에 `node_modules`, `dist`, `storybook-static`, `.env` 포함
- [ ] `package.json` 의 `name`, `version`, `description` 설정
- [ ] README.md 에 프로젝트 설명 + 시작하기 가이드

### 9단계: CI/CD 설정
- [ ] `.github/workflows/storybook-test.yml` 존재
- [ ] `.github/workflows/chromatic.yml` 존재 (사용 시)
- [ ] GitHub Secrets 안내 (CHROMATIC_PROJECT_TOKEN 등)
- [ ] PR 템플릿 (`.github/pull_request_template.md`) 존재 시 검토

### 10단계: Git 상태
- [ ] 모든 변경사항 커밋됨
- [ ] 미사용 파일 없음
- [ ] 빌드 결과물 커밋 안 됐는지 (dist/, storybook-static/)
- [ ] `.env`, `.DS_Store` 등 커밋 안 됐는지

```bash
git status
git ls-files | grep -E '\.(env|DS_Store)$'
```

## 보고 형식

```
🚀 배포 사전 체크 결과

✅ 통과 (8/10)
- 빌드 검증: 성공
- 디자인 시스템: 정상
- 컴포넌트 완전성: 정상
- 5개 언어: 정상
- 접근성: 0 위반
- 성능: 메인 번들 142KB
- 환경 설정: 정상
- Git 상태: 깔끔

⚠️ 경고 (1/10)
- SEO: hreflang 태그가 일부 페이지에 누락
  → 5개 언어 모두 자동 생성하도록 수정 필요

❌ 실패 (1/10)
- CI/CD: chromatic.yml 의 토큰 환경변수 누락
  → CHROMATIC_PROJECT_TOKEN 설정 안내 추가 필요

⛔ 배포 중단
실패 항목 1개를 먼저 해결해야 합니다.
```

## 통과 시
```
🎉 모든 체크 통과! 배포 진행 가능합니다.

다음 단계:
1. git push origin main
2. GitHub Actions 워크플로우 실행 확인
3. Chromatic 시각 회귀 테스트 통과 확인
4. 디자이너에게 미리보기 URL 공유:
   https://<your-storybook-url>
   https://<your-chromatic-url>
```

## 실패 시 자동 수정 제안
- 자동으로 고칠 수 있는 항목은 수정 제안
- 사용자 결정 필요한 항목은 보고만
- 재실행: `/deploy-check` 다시 실행해서 최종 확인
