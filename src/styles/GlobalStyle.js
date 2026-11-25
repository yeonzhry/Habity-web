import { createGlobalStyle } from "styled-components";

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
  @font-face { font-family: "GeekbleMalang2"; src: local("GeekbleMalang2"), local("GeekbleMalang2-Regular"), local("Geekble Malang 2"); }

  *, *::before, *::after { box-sizing: border-box; }
  html, body, #root { height: 100%; }
  [hidden] { display: none !important; }
  body {
    margin: 0;
    background: var(--bg); color: var(--ink); font-family: var(--text);
    -webkit-font-smoothing: antialiased; overflow-x: hidden;
  }
  button { font: inherit; color: inherit; cursor: pointer; border: 0; background: none; }
  button:focus-visible { outline: 3px solid var(--green); outline-offset: 3px; }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation: none !important; transition: none !important; }
  }
`;
