import styled, { css, keyframes } from "styled-components";
import { IMG, noteImg, noteTop, colX, clampPitch } from "../lib/notes";
import { LogoStaff, Lines5, Word, FloatNote } from "../styles/ui";

// 앱과 같은 작은 오선 (높이 64, 줄 5개)
// marks: 칸마다 { type: "note"|"rest", pitch, style } 또는 null
export function Staff({ marks, keys = [], inset = 20, activeKey, popKey, onPick, id }) {
  const n = marks.length;
  return (
    <StaffBox id={id}>
      <Lines>
        {[0, 16, 32, 48, 64].map((y) => (
          <i key={y} style={{ top: y }} />
        ))}
      </Lines>
      {marks.map((m, i) => {
        const key = keys[i];
        return (
          <Slot
            key={i}
            $on={!!key && key === activeKey}
            $pop={!!key && key === popKey}
            style={{ left: colX(i, n, inset), cursor: onPick ? "pointer" : undefined }}
            onClick={onPick ? () => onPick(i) : undefined}
          >
            <Hl />
            {m?.type === "rest" && <img alt="" src={IMG.rest} style={{ top: -3 }} />}
            {m?.type === "note" && <img alt="" src={noteImg(m.pitch, m.style)} style={{ top: noteTop(m.pitch) }} />}
          </Slot>
        );
      })}
    </StaffBox>
  );
}

// 큰 오선 (줄 간격 20, 음표 64): 로고처럼 가운데 큰 글자 + 음표
// floating = true면 음표가 오선 위 공중에 떠 있음 (결과 화면)
// pop = true면 음표가 하나씩 나타남 (결과 보기 전 화면). 지연은 POP_DELAY와 맞춤
export const popDelay = (i) => 0.5 + i * 0.5;
export function BigStaff({ marks, word, floating, pop, height = 230 }) {
  const H = height;
  const top = H - 81; // 맨 윗줄 위치
  const k = 64 / 44;
  const floatY = [40, 8, 52, 12, 44, 18];
  return (
    <LogoStaff $h={H} aria-hidden="true">
      {marks.map((m, i) => {
        // 결과 화면(floating)은 음표끼리 더 가깝게
        const [from, span] = floating ? [24, 52] : [10, 80];
        const left = `calc(${from + i * (span / Math.max(1, marks.length - 1))}% - 32px)`;
        let y;
        if (floating) {
          y = floatY[i % floatY.length];
        } else if (m.type === "rest") {
          y = top + 20 - 19 * k;
        } else {
          // 줄 간격 20 기준: 음 하나 = 10px, 음표 머리 위치에 맞춰 이미지를 올림
          const p = clampPitch(m.pitch);
          const headY = (p >= 6 ? 11.5 : 32.5) * k;
          y = top + 80 - (p - 2) * 10 - headY;
        }
        const src = m.type === "rest" ? IMG.rest : noteImg(m.pitch, m.style);
        return (
          <FloatNote
            key={i}
            $drift={floating}
            $pop={pop}
            alt=""
            src={src}
            style={{ left, top: y, animationDelay: pop ? `${popDelay(i)}s` : `${-i}s` }}
          />
        );
      })}
      <Lines5>
        {[0, 20, 40, 60, 80].map((y) => (
          <i key={y} style={{ top: y }} />
        ))}
      </Lines5>
      {word && <Word $small>{word}</Word>}
    </LogoStaff>
  );
}

// ---------- 작은 오선 스타일 (앱과 같은 규격: 줄 간격 16, 음표 44) ----------
const pop = keyframes`from { transform: translateY(14px) scale(.4); opacity: 0; }`;

const StaffBox = styled.div`
  position: relative; height: 64px;
`;

const Lines = styled.div`
  position: absolute; inset: 0;
  i { position: absolute; left: 0; right: 0; height: 1px; background: var(--line); }
`;

const Hl = styled.span`
  position: absolute; left: 0; top: -16px; width: 44px; height: 96px; border-radius: 10px;
  background: rgba(221,255,76,.45); opacity: 0; transform: scale(.85); transition: opacity .15s, transform .2s;
`;

const Slot = styled.div`
  position: absolute; top: 0; width: 44px; height: 64px; transform: translateX(-50%);
  img { position: absolute; left: 0; width: 44px; height: 44px; transition: transform .2s; }

  ${({ $on }) => $on && css`
    ${Hl} { opacity: 1; transform: none; }
    img { transform: scale(1.12); }
  `}
  ${({ $pop }) => $pop && css`
    img { animation: ${pop} .45s cubic-bezier(.3,1.6,.5,1); }
  `}
`;

