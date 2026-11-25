import styled, { css } from "styled-components";
import { media } from "../styles/media";
import { Screen, Title, Card, IRow, Ic, Tx } from "../styles/ui";

// ---------- 왼쪽 안내 ----------
export const AppScreen = styled(Screen)`
  padding-block: 24px; grid-template-rows: 1fr;
  ${media.imac} { padding-block: 40px; }
`;

export const Wrap = styled.div`
  width: 100%; margin: 0 auto; max-width: 1180px;
  display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 64px; align-items: center;

  ${media.mobile} { grid-template-columns: 1fr; justify-items: center; gap: 32px; }
  ${media.imac} { max-width: 1600px; gap: 120px; }
`;

export const Guide = styled.div`
  display: grid; gap: 0; justify-items: start;
  ${media.mobile} { width: 100%; }
`;

export const GuideTitle = styled(Title)`
  text-align: left; margin: 18px 0 28px;
  ${media.imac} { margin: 24px 0 36px; }
`;

export const TempoChip = styled.span`
  display: inline-flex; align-items: center; gap: 10px; padding: 8px 18px; border-radius: 999px; background: #fff; font-size: 16px;
  b { font-family: var(--display); font-weight: 400; font-size: 20px; }
  ${media.imac} { font-size: 21px; padding: 10px 24px; b { font-size: 27px; } }
`;

export const GuideCard = styled(Card)`
  width: 100%; max-width: 560px; margin-bottom: 26px;
  ${media.imac} { max-width: 760px; margin-bottom: 34px; }
`;

export const GuideRow = styled(IRow)`
  grid-template-columns: 64px 1fr; padding: 12px 14px;
  ${Ic} { width: 64px; height: 64px; img { width: 48px; height: 48px; } }
  ${Tx} b { font-size: 19px; color: ${({ $active }) => ($active ? "var(--ink)" : "var(--muted)")}; }
  ${({ $now }) => $now && css`
    background: var(--mint);
    ${Ic} { background: #fff; }
  `}

  ${media.imac} {
    grid-template-columns: 84px 1fr; padding: 16px 18px;
    ${Ic} { width: 84px; height: 84px; img { width: 64px; height: 64px; } }
    ${Tx} b { font-size: 25px; }
  }
`;

// 앱스토어 QR 카드
export const Download = styled.div`
  display: flex; align-items: center; gap: 20px; margin-bottom: 18px;
  padding: 14px 24px 14px 14px; border-radius: 24px; background: #fff;
  img { width: 112px; height: 112px; border-radius: 12px; flex: none; }
  > span { display: grid; gap: 6px; }
  b { font-size: 18px; font-weight: 700; }
  span span { font-size: 14px; color: var(--muted); }

  ${media.imac} {
    gap: 26px; padding: 18px 32px 18px 18px; border-radius: 30px;
    img { width: 150px; height: 150px; }
    b { font-size: 24px; } span span { font-size: 18px; }
  }
`;

// ---------- 폰 프레임 393×852를 화면 높이에 맞게 축소 ----------
export const PhoneHolder = styled.div`
  width: calc((393px + 24px) * var(--s, 1));
  height: calc((852px + 24px) * var(--s, 1));
`;

export const Phone = styled.div`
  width: 417px; height: 876px; padding: 12px; border-radius: 64px; background: #1B1B1B;
  box-shadow: 0 30px 80px rgba(18,18,18,.18), inset 0 0 0 2px #3a3a3a;
  transform: scale(var(--s, 1)); transform-origin: top left;
`;

export const Ph = styled.div`
  position: relative; width: 393px; height: 852px; border-radius: 52px; overflow: hidden; background: var(--bg);
  font-family: var(--text); color: var(--ink);
`;

export const StatusBar = styled.div`
  position: absolute; top: 0; left: 0; right: 0; height: 54px; display: flex; align-items: center; justify-content: space-between;
  padding: 6px 34px 0 46px; font-size: 17px; font-weight: 600; z-index: 30;
`;

export const Island = styled.div`
  position: absolute; top: 11px; left: 50%; width: 124px; height: 36px; margin-left: -62px; border-radius: 20px; background: #000; z-index: 31;
`;

export const HomeBar = styled.div`
  position: absolute; bottom: 8px; left: 50%; width: 140px; height: 5px; margin-left: -70px; border-radius: 3px; background: #121212; z-index: 31;
`;

export const Grad = styled.div`
  position: absolute; top: 0; left: 0; right: 0; height: 407px;
  background: linear-gradient(to bottom, rgba(242,255,187,0), rgba(242,255,187,.5));
`;

export const View = styled.div`
  position: absolute; inset: 54px 0 0 0; display: flex; flex-direction: column;
`;

export const Header = styled.header`
  height: 64px; flex: none; display: flex; align-items: center; justify-content: space-between; padding: 0 24px; position: relative;
`;

export const Modes = styled.div`
  display: flex; gap: 16px;
`;

export const Mode = styled.button`
  font-family: var(--display); font-size: 22px;
  color: ${({ $on }) => ($on ? "var(--ink)" : "var(--muted)")};
`;

export const Acts = styled.div`
  display: flex; gap: 24px; align-items: center;
  button { width: 32px; height: 32px; display: grid; place-items: center; }
`;

export const PlusBtn = styled.button`
  background: #000; border-radius: 50%;
`;

// ---------- Today ----------
export const Dates = styled.div`
  display: flex; justify-content: center; gap: 32px; flex: none; position: relative;
`;

export const DateChip = styled.div`
  width: 42px; padding: 8px 0; border-radius: 16px; display: grid; justify-items: center; gap: 8px;
  background: ${({ $sel }) => ($sel ? "#000" : "transparent")};
  span:first-child { font-size: 15px; color: var(--muted); }
  span:last-child { font-size: 20px; font-weight: 600; color: ${({ $sel }) => ($sel ? "#fff" : "inherit")}; }
`;

export const WeekCard = styled.div`
  position: relative; margin: 24px 16px 15px; background: #fff; border-radius: 16px; padding: 16px 16px 40px; flex: none;
`;

// 요일·날짜·음 이름처럼 오선 칸 위에 얹는 글자 줄
export const ColLabels = styled.div`
  position: relative; height: 16px; margin-bottom: 16px;
  span { position: absolute; top: 0; transform: translateX(-50%); font-size: 12px; color: var(--muted); white-space: nowrap; }
`;

export const DayNum = styled.span`
  && { color: ${({ $today }) => ($today ? "var(--green)" : "var(--ink)")}; font-weight: ${({ $today }) => ($today ? 700 : 400)}; }
`;

export const NoteName = styled.span`
  && { color: ${({ $on }) => ($on ? "var(--ink)" : "var(--muted)")}; font-weight: ${({ $on }) => ($on ? 600 : 400)}; }
`;

export const PlayMini = styled.button`
  position: absolute; top: -10px; right: -8px; width: 26px; height: 26px; border-radius: 50%; background: var(--cta);
  display: grid; place-items: center; box-shadow: 0 2px 6px rgba(0,0,0,.08);
`;

export const Sheet = styled.div`
  flex: 1; background: #fff; border-radius: 32px 32px 0 0; padding: 28px 24px 110px; overflow-y: auto; position: relative;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`;

export const Row = styled.div`
  display: flex; align-items: center; gap: 16px;
`;

export const Time = styled.span`
  width: 34px; font-size: 12px; color: var(--muted); text-align: center; flex: none;
`;

export const Chk = styled.span`
  width: 40px; height: 40px; border-radius: 50%; display: grid; place-items: center; flex: none; color: #fff;
  transition: background .25s, transform .15s;
`;

export const Pill = styled.div`
  flex: 1; display: flex; align-items: center; gap: 8px; min-height: 72px; padding: 16px 8px 16px 32px;
  border-radius: 30px; font-size: 15px; font-weight: 600; cursor: pointer; transition: background .25s, color .25s;
  background: ${({ $done }) => ($done ? "var(--mint)" : "var(--ink)")};
  color: ${({ $done }) => ($done ? "var(--ink)" : "#fff")};

  ${Chk} { background: ${({ $done }) => ($done ? "#000" : "var(--off)")}; }
  &:active ${Chk} { transform: scale(.9); }
`;

export const PillName = styled.span`
  flex: 1;
`;

export const Tag = styled.span`
  font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 999px; background: var(--cta); color: var(--ink);
  margin-left: 8px; vertical-align: 2px;
`;

export const Conn = styled.div`
  width: 34px; height: 24px; display: flex; justify-content: center; transition: opacity .25s;
  i { width: 0; border-left: 1.2px dashed var(--line); margin: 4px 0; }
`;

// ---------- Monthly ----------
export const Monthly = styled.div`
  flex: 1; overflow-y: auto; padding: 0 16px 190px; scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`;

export const Stats = styled.div`
  display: flex; gap: 8px; margin-bottom: 16px;
`;

export const Stat = styled.div`
  flex: 1; background: rgba(255,255,255,.6); border-radius: 24px; padding: 12px 16px; display: grid; gap: 2px;
  > span:first-child { font-size: 13px; }
`;

export const StatValue = styled.span`
  display: flex; align-items: baseline; gap: 4px;
  b { font-family: var(--display); font-weight: 400; font-size: 28px; color: var(--green); }
  span { font-size: 13px; color: var(--muted); }
`;

export const MonthStaff = styled.div`
  padding: 0 16px;
`;

export const Week = styled.div`
  padding-bottom: 32px;
`;

export const Player = styled.div`
  position: absolute; left: 24px; right: 24px; bottom: 103px; height: 49px; border-radius: 999px; display: flex; align-items: center;
  justify-content: space-between; padding: 0 24px; background: rgba(205,205,205,.75);
  backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
  box-shadow: inset 0 0 0 .5px rgba(255,255,255,.5); z-index: 20;
`;

export const PlayerTitle = styled.span`
  font-size: 15px; font-weight: 600;
`;

export const PlayerCtl = styled.div`
  display: flex; gap: 10px; align-items: center;
  button { width: 26px; height: 26px; display: grid; place-items: center; }
  button[disabled] { opacity: .35; cursor: default; }
`;

// ---------- 탭바 ----------
export const TabBar = styled.div`
  position: absolute; left: 50%; bottom: 21px; transform: translateX(-50%); width: 270px; height: 62px; border-radius: 999px;
  background: rgba(255,255,255,.82); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
  box-shadow: 0 6px 24px rgba(0,0,0,.08), inset 0 0 0 1px rgba(255,255,255,.9); display: flex; padding: 4px; z-index: 25;
`;

export const Tab = styled.button`
  flex: 1; border-radius: 999px; display: grid; justify-items: center; align-content: center; gap: 2px; font-size: 10px; font-weight: 600;
  ${({ $on }) => $on && css`background: rgba(0,0,0,.05); color: var(--green);`}
`;

// ---------- 음 고르기 시트 ----------
export const Dim = styled.div`
  position: absolute; inset: 0; background: rgba(0,0,0,.2); z-index: 40; transition: opacity .25s;
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  pointer-events: ${({ $show }) => ($show ? "auto" : "none")};
`;

export const NoteSheet = styled.div`
  position: absolute; left: 6px; right: 6px; bottom: 6px; z-index: 41; border-radius: 38px;
  background: rgba(255,255,255,.88); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 8px 24px rgba(0,0,0,.12), inset 0 0 0 1px rgba(255,255,255,.8);
  padding: 6px 10px 40px; transition: transform .35s cubic-bezier(.2,.9,.3,1);
  transform: ${({ $show }) => ($show ? "none" : "translateY(110%)")};

  h3 { text-align: center; font-size: 19px; margin: 0 0 32px; }
`;

export const Grab = styled.div`
  width: 60px; height: 4px; border-radius: 2px; background: var(--line); margin: 0 auto 22px;
`;

export const Picker = styled.div`
  background: rgba(255,255,255,.7); border-radius: 16px; padding: 16px 16px 40px; margin-bottom: 16px;
`;

export const SaveBtn = styled.button`
  width: 100%; height: 52px; border-radius: 999px; color: #fff; font-size: 17px; font-weight: 600;
  display: flex; align-items: center; justify-content: center; gap: 6px;
  background: ${({ $on }) => ($on ? "#000" : "var(--off)")};
`;

export const Toast = styled.div`
  position: absolute; left: 50%; top: 110px; z-index: 60; background: rgba(18,18,18,.88); color: #fff;
  font-size: 13px; padding: 10px 16px; border-radius: 999px; white-space: nowrap; pointer-events: none;
  transition: opacity .2s, transform .2s;
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  transform: ${({ $show }) => ($show ? "translate(-50%, 0)" : "translate(-50%, -10px)")};
`;
