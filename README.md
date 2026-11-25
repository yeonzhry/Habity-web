# Habity 전시용 템포 테스트 (React + Vite)

질문 5개(아침 1 · 낮 2 · 저녁 2)에 답하면 일상 템포(Adagio · Andante · Allegro · Presto)와
추천 습관이 나오고, 그 습관이 들어간 Habity 앱(Today · Monthly)을 웹에서 체험하는 전시용 페이지.

## 처음 한 번
1. Node.js LTS 설치 (https://nodejs.org)
2. VS Code에서 이 폴더 열기 → 터미널(⌃`) 열고
   ```
   npm install
   ```

## 개발 (저장하면 바로 반영)
```
npm run dev
```
터미널에 나오는 주소(http://localhost:5173)를 브라우저에서 열기.

## 전시용으로 만들기
```
npm run build
```
`dist` 폴더가 생김. 전시장 컴퓨터에서는 `npm run preview`로 띄우거나 `dist` 폴더를 그대로 옮겨서 사용.

## 폴더 구조
```
src/
  App.jsx               화면 흐름 (시작 → 질문 → 결과 확인 → 결과 → 앱 체험), 90초 자동 처음으로
  data/questions.js     질문 목록, 단계별 문제 수(PER_STEP), 고를 때 나는 음
  data/tempos.js        템포 4개 설명·빠르기·추천 습관, 결과 정하는 규칙
  components/Screens.jsx  시작 · 질문 · 결과 확인 · 결과 화면
  components/AppDemo.jsx  폰 안의 Habity 앱 (Today · Monthly · 음 고르기)
  components/Staff.jsx    오선 + 음표 그리기
  lib/audio.js          실로폰 소리
  lib/demoData.js       날짜 계산, 지난 날 예시 기록, 예시 습관
  styles.css            전체 스타일 (색은 맨 위 :root 토큰)
  assets/               음표 이미지, 캐릭터
```

## 자주 고칠 것
- 질문 문구: `src/data/questions.js`의 `QUESTIONS`
- 문제 수: `PER_STEP = [1, 2, 2]` (아침 · 낮 · 저녁). 바꾸면 `A_PITCH`, `B_PITCH` 길이도 맞추고 `tempos.js`의 `tempoOf` 규칙도 확인
- 결과 설명·추천 습관: `src/data/tempos.js`
- 예시 습관: `src/lib/demoData.js`의 `makeHabits`

## 글꼴
제목(Habity, 템포 이름)은 긱블말랑이. 전시장 맥에 긱블말랑이 폰트를 설치해두면 그대로 나옴.
설치 안 하면 인터넷이 있을 때 Jua로 대신 나옴.
