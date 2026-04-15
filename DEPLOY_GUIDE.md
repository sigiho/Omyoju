# Vercel 배포 가이드

빌드 확인 완료 ✅ — 아래 단계를 따라 배포하세요.

---

## 1단계. Vercel 계정 만들기 (이미 있으면 건너뛰기)

[vercel.com](https://vercel.com) 에서 가입 (GitHub 계정으로 연동하면 편해요).

---

## 2단계. GitHub에 코드 올리기 (권장)

> GitHub가 없다면 **3단계 (Vercel CLI)** 로 바로 가세요.

1. [github.com/new](https://github.com/new) 에서 새 저장소(repository) 생성
2. 터미널에서 아래 명령어 실행:

```bash
cd 이-폴더-경로
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/내아이디/내저장소.git
git push -u origin main
```

3. [vercel.com/new](https://vercel.com/new) 접속 → **Import Git Repository** → 방금 만든 저장소 선택
4. **Environment Variables** 섹션에서 아래 값 추가:
   - `GEMINI_API_KEY` = (내 Gemini API 키)
5. **Deploy** 클릭 🚀

---

## 3단계. Vercel CLI로 직접 배포 (GitHub 없이)

```bash
# Vercel CLI 설치
npm install -g vercel

# 배포 (프로젝트 폴더에서 실행)
vercel

# 질문에 답하기:
# - Set up and deploy? → Y
# - Which scope? → 내 계정 선택
# - Link to existing project? → N (처음이면)
# - Project name? → 원하는 이름 입력 (예: my-ai-app)
# - In which directory is your code located? → ./ (그냥 Enter)
# - Want to modify settings? → N

# 환경변수 추가 후 재배포
vercel env add GEMINI_API_KEY
# → (API 키 붙여넣기 후 Enter)
# → Environment: production 선택

# 프로덕션 배포
vercel --prod
```

---

## 환경변수 (중요!)

이 앱은 **Gemini API 키**가 필요합니다.

- Gemini API 키 발급: [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
- Vercel 대시보드 → 프로젝트 → Settings → Environment Variables 에서도 추가 가능

---

## 배포 후

- URL은 `https://내프로젝트명.vercel.app` 형식으로 제공됩니다.
- 코드를 수정하고 GitHub에 push하면 자동으로 재배포됩니다.

---

## 빌드 설정 (Vercel이 자동 감지)

| 항목 | 값 |
|------|-----|
| Framework | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |
