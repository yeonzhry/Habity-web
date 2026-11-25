# Habity 전시용 템포 테스트

Habity(습관이 음표가 되는 iOS 습관 트래커 앱)의 전시장용 웹. 가로 모니터 + 마우스로 체험.
흐름: 시작 → 질문 5개(아침 1 · 낮 2 · 저녁 2, 단계마다 랜덤) → 결과 확인 → 결과(템포 + 추천 습관) → 폰 안 앱 체험(Today · Monthly).

## 명령
- `npm install` (처음 한 번), `npm run dev` (개발), `npm run build` (전시용 dist)

## 구조
- `src/App.jsx`: 화면 흐름, 90초 동안 입력 없으면 처음으로
- `src/data/questions.js`: 질문, `PER_STEP`, 고를 때 음(A 낮게 / B 높게)
- `src/data/tempos.js`: Adagio·Andante·Allegro·Presto 설명·bpm·추천 습관, `tempoOf`(B 개수: 0~1 / 2 / 3 / 4~5)
- `src/components/Screens.jsx`: 시작·질문·결과 화면
- `src/components/AppDemo.jsx`: 폰 프레임 안 Habity 앱 (습관 체크, 음 고르기, 주·월 멜로디 재생)
- `src/components/Staff.jsx`: 오선/음표 (앱 규격: 줄 간격 16, 음표 44 / 큰 오선은 줄 간격 20, 음표 64)
- 스타일은 전부 styled-components (CSS 파일 없음)
  - `src/styles/GlobalStyle.js`: 색 토큰(`:root`)·리셋
  - `src/styles/ui.js`: 공용 컴포넌트(화면 틀, 버튼, 카드, 큰 오선)
  - `src/styles/media.js`: `media.mobile`(≤860px) · `media.imac`(≥1800×1000)
  - `src/components/AppDemo.styles.js`: 폰 목업 스타일
- `src/lib/demoData.js`: 앱 체험 예시 기록, Monthly 곡(`SONGS`: 비행기·나비야)
- `src/assets/appstore-qr.svg`: 앱스토어 QR (https://apps.apple.com/us/app/habity/id6837300940/)

## 디자인 규칙
- 피그마 Habity 온보딩 톤: 평평한 #F5F5F5 바탕, 가운데 정렬, 굵은 시스템 제목, 흰 카드(r24) 줄, 검정 알약 버튼
- 색: ink #121212, muted #999999, 오선 #CCCCCC, 연두 #DDFF4C, 진연두 #90B200, 민트 #F2FFBB
- 로고·템포 이름은 긱블말랑이(GeekbleMalang2), 없으면 Jua
- 화면 문구는 한국어, 앱 화면 안 탭·요일은 영어(Today, Monthly, Sun Mon…)
