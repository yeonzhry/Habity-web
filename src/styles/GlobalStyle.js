import { createGlobalStyle } from "styled-components";
// 긱블말랑이: 영문·숫자만 잘라 넣은 파일 (로고·템포 이름·Today/Monthly·숫자에만 씀)
import geekbleWoff from "../assets/fonts/GeekbleMalang2-latin.woff";

// Layout: 가로 모니터 한 화면짜리 키오스크. 왼쪽은 이야기(질문·결과), 오른쪽은 음표 캐릭터 또는 폰 속 Habity 앱
export const GlobalStyle = createGlobalStyle`
  :root {
    --bg: #F5F5F5;          /* 앱 배경 */
    --ink: #121212;         /* text/primary */
    --muted: #999999;       /* text/tertiary */
    --line: #CCCCCC;        /* 오선 */
    --cta: #DDFF4C;         /* 연두 음표 */
    --green: #90B200;       /* 숫자 강조 */
    --mint: #F2FFBB;        /* 달성 카드 */
    --off: #B2B2B2;         /* 비활성 */
    --card: #FFFFFF;
    --display: "GeekbleMalang2", "Geekble Malang 2", "Jua", ui-rounded, "Apple SD Gothic Neo", sans-serif;
    --text: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Apple SD Gothic Neo", "Pretendard", "Noto Sans KR", sans-serif;
    color-scheme: light;
  }
  @font-face {
    font-family: "GeekbleMalang2";
    src: url(${geekbleWoff}) format("woff");
    font-display: block; /* 폰트 오기 전 다른 폰트가 잠깐 보였다 바뀌지 않게 */
  }

  *, *::before, *::after { box-sizing: border-box; }
  html, body, #root { height: 100%; }
  [hidden] { display: none !important; }
  body {
    margin: 0;
    background: var(--bg); color: var(--ink); font-family: var(--text);
    -webkit-font-smoothing: antialiased; overflow-x: hidden;
    /* 글자를 눌러도 깜빡이는 커서가 보이지 않게 (드래그 선택은 그대로 됨) */
    caret-color: transparent;
  }
  button { font: inherit; color: inherit; cursor: pointer; border: 0; background: none; }
  button:focus-visible { outline: 3px solid var(--green); outline-offset: 3px; }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation: none !important; transition: none !important; }
  }
`;
