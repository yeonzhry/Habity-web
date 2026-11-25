import styled, { css, keyframes } from "styled-components";
import { media } from "./media";

// ---------- 애니메이션 ----------
export const fadeIn = keyframes`from { opacity: 0; transform: translateY(10px); }`;
const drift = keyframes`to { transform: translateY(-10px); }`;
const bob = keyframes`to { transform: translateY(-10px) rotate(-1.5deg); }`;
const popIn = keyframes`from { opacity: 0; transform: translateY(18px) scale(.5); }`;

// ---------- 화면 틀 ----------
// 피그마 온보딩 톤: 평평한 회색 바탕 · 가운데 정렬 · 굵은 SF 제목 · 흰 카드 줄 · 검정 알약 버튼
export const Screen = styled.section`
  min-height: 100%; position: relative; isolation: isolate;
  padding-left: max(16px, env(safe-area-inset-left, 0px));
  padding-right: max(16px, env(safe-area-inset-right, 0px));
  padding-block: 48px 56px;
  display: grid; grid-template-rows: 1fr auto; align-items: stretch; overflow-x: clip;

  ${media.imac} { padding-block: 72px 88px; }
`;

export const Center = styled.div`
  display: grid; justify-items: center; align-content: center; text-align: center; gap: 0;
`;

export const Title = styled.h1`
  font-weight: 700; font-size: clamp(24px, 2.1vw, 30px); line-height: 1.35; letter-spacing: -0.012em;
  margin: 0; text-wrap: balance;
  ${({ $fade }) => $fade && css`animation: ${fadeIn} .35s ease both;`}

  ${media.imac} { font-size: 40px; }
`;

export const Sub = styled.p`
  font-size: clamp(17px, 1.5vw, 21px); color: var(--ink); margin: 18px 0 0;
  ${media.imac} { font-size: 27px; margin-top: 24px; }
`;

export const Cap = styled.p`
  font-size: 16px; color: var(--muted); margin: 0 0 18px;
  ${media.imac} { font-size: 21px; margin-bottom: 24px; }
`;

export const Foot = styled.div`
  display: grid; justify-items: center; gap: 22px;
`;

// ---------- 버튼 ----------
export const Btn = styled.button`
  display: inline-flex; align-items: center; justify-content: center; gap: 10px;
  width: min(440px, 100%); height: 64px; padding: 0 32px; border-radius: 999px;
  background: var(--ink); color: #fff; font-size: 20px; font-weight: 600;
  transition: transform .15s ease, background .15s ease;

  svg { width: 16px; height: 20px; }
  &:hover { transform: translateY(-2px); background: #000; }
  &:active { transform: scale(.98); }

  ${media.imac} {
    width: 560px; height: 84px; font-size: 26px;
    svg { width: 20px; height: 25px; }
  }
`;

export const LinkBtn = styled.button`
  font-size: 16px; color: var(--muted); padding: 8px 12px;
  text-decoration: underline; text-underline-offset: 4px;
  &:hover { color: var(--ink); }
  ${media.imac} { font-size: 21px; }
`;

export const BackBtn = styled.button`
  position: absolute; top: 40px; left: max(32px, env(safe-area-inset-left, 0px));
  width: 56px; height: 56px; border-radius: 50%; display: grid; place-items: center;
  background: rgba(255,255,255,.75); box-shadow: 0 2px 10px rgba(0,0,0,.08); z-index: 2;

  ${media.mobile} { top: 16px; left: 16px; width: 44px; height: 44px; }
  ${media.imac} { top: 56px; left: 56px; width: 72px; height: 72px; svg { transform: scale(1.3); } }
`;

export const Dots = styled.div`
  display: flex; gap: 10px; justify-content: center;
  ${media.imac} { gap: 14px; }
`;

export const Dot = styled.i`
  width: 9px; height: 9px; border-radius: 50%; transition: background .2s;
  background: ${({ $on }) => ($on ? "var(--ink)" : "var(--line)")};
  ${media.imac} { width: 12px; height: 12px; }
`;

// ---------- 흰 카드 줄 (온보딩 '앱설명' 카드와 같은 모양) ----------
export const Card = styled.div`
  background: rgba(255,255,255,.95); border-radius: 24px; padding: 12px; width: min(760px, 100%);
  ${({ $fade }) => $fade && css`animation: ${fadeIn} .35s ease both;`}

  ${media.imac} { width: min(960px, 100%); border-radius: 30px; padding: 16px; }
`;

export const Sep = styled.div`
  height: 1px; background: #EFEFEF; margin: 4px 20px;
`;

export const Ic = styled.span`
  width: 72px; height: 72px; border-radius: 20px; background: #F5F5F5; display: grid; place-items: center;
  img { width: 56px; height: 56px; }

  ${media.mobile} { width: 56px; height: 56px; img { width: 44px; height: 44px; } }
  ${media.imac} { width: 92px; height: 92px; border-radius: 26px; img { width: 72px; height: 72px; } }
`;

export const Tx = styled.span`
  display: grid; gap: 6px; min-width: 0;
  b { font-size: clamp(16px, 1.3vw, 19px); font-weight: 600; letter-spacing: -0.01em; line-height: 1.4; }
  span { font-size: 14px; color: var(--muted); }

  ${media.imac} { gap: 8px; b { font-size: 24px; } span { font-size: 17px; } }
`;

// $picked: 고른 줄 / $hover: 마우스 올리면 연두
export const IRow = styled.div`
  display: grid; grid-template-columns: 72px 1fr auto; align-items: center; gap: 24px;
  width: 100%; padding: 16px 20px; border-radius: 18px; text-align: left; transition: background .18s;

  ${({ $hover }) => $hover && css`
    &:hover { background: var(--mint); }
    &:hover ${Ic} { background: #fff; }
  `}
  ${({ $picked }) => $picked && css`
    background: var(--mint);
    ${Ic} { background: #fff; }
  `}

  ${media.mobile} { grid-template-columns: 56px 1fr; gap: 16px; padding: 12px; }
  ${media.imac} { grid-template-columns: 92px 1fr auto; gap: 30px; padding: 20px 26px; border-radius: 22px; }
`;

// ---------- 로고처럼: 오선 위에 큰 긱블말랑이 글자, 그 위로 음표들이 떠 있음 ----------
export const LogoStaff = styled.div`
  position: relative; width: min(600px, 100%); height: ${({ $h }) => $h ?? 250}px; margin: 0 auto;

  ${media.mobile} { height: ${({ $h }) => $h ?? 190}px; }
  /* 음표 위치를 px로 계산하므로 큰 화면에선 통째로 키움 */
  ${media.imac} { zoom: 1.35; }
`;

// 오선은 맨 뒤
export const Lines5 = styled.div`
  position: absolute; left: 0; right: 0; bottom: 0; height: 81px; z-index: 0;
  i { position: absolute; left: 0; right: 0; height: 1.5px; background: #CFCFCF; }
`;

export const Word = styled.div`
  position: absolute; left: 0; right: 0; bottom: 22px; z-index: 1; text-align: center;
  font-family: var(--display); font-size: clamp(84px, 10vw, 140px); line-height: 1; color: var(--ink);
  /* 결과 화면 템포 이름(Allegro 등)은 조금 작게 */
  ${({ $small }) => $small && css`font-size: clamp(64px, 7vw, 100px); bottom: 26px;`}
`;

export const FloatNote = styled.img`
  position: absolute; width: 64px; height: 64px; z-index: 1;
  ${({ $drift }) => $drift && css`animation: ${drift} 3.2s ease-in-out infinite alternate;`}
  /* 하나씩 톡톡 나타나기 (지연은 style의 animationDelay로) */
  ${({ $pop }) => $pop && css`animation: ${popIn} .5s cubic-bezier(.3,1.6,.5,1) both;`}
`;

// ---------- 구석 캐릭터 ----------
export const CharsCorner = styled.img`
  position: absolute; right: max(56px, env(safe-area-inset-right, 0px)); bottom: 48px; width: 120px; height: auto;
  ${({ $beat }) => $beat && css`animation: ${bob} ${$beat} ease-in-out infinite alternate;`}

  ${media.mobile} { width: 72px; right: 16px; bottom: 24px; }
  ${media.imac} { width: 170px; right: 80px; bottom: 72px; }
`;
