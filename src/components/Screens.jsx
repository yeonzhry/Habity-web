import { useEffect, useState } from "react";
import { IMG } from "../lib/notes";
import { BigStaff, popDelay } from "./Staff";
import { tone } from "../lib/audio";
import { BackIcon, NoteIcon } from "./Icons";
import { TOTAL, QUESTIONS } from "../data/questions";
import { TEMPOS, beatSec } from "../data/tempos";
import charactersUrl from "../assets/characters.svg";
import styled from "styled-components";
import { media } from "../styles/media";
import {
  Screen, Center, Title, Sub, Cap, Foot, Btn, BackBtn, Dots, Dot,
  Card, Sep, IRow, Ic, Tx, LogoStaff, Lines5, Word, FloatNote, CharsCorner,
} from "../styles/ui";

export function IntroScreen({ onStart }) {
  const floats = [
    ["noteDisabled", "6%", -40, true, 0],
    ["noteLess", "19%", 8, false, 0],
    ["rest", "33%", -64, true, -1],
    ["noteDisabled", "56%", -52, false, 0],
    ["rest", "71%", -44, true, -2],
    ["noteLess", "86%", -26, false, 0],
  ];
  return (
    <Screen>
      <Center>
        <LogoStaff aria-hidden="true">
          {floats.map(([img, left, top, drift, delay], i) => (
            <FloatNote key={i} $drift={drift} alt="" src={IMG[img]}
              style={{ left, top, animationDelay: `${delay}s` }} />
          ))}
          <Lines5>
            {[0, 20, 40, 60, 80].map((y) => <i key={y} style={{ top: y }} />)}
          </Lines5>
          <Word>Habity</Word>
        </LogoStaff>
        <Title style={{ marginTop: 56 }}>여러분의 일상은 어떤 템포인가요?</Title>
        <Sub>해비티와 함께 일상의 템포를 만들어봐요!</Sub>
      </Center>
      <RaisedFoot>
        <Btn type="button" onClick={onStart}>테스트 시작 <NoteIcon /></Btn>
      </RaisedFoot>
      <CharsCorner src={charactersUrl} alt="" />
    </Screen>
  );
}

// 2. 질문
export function QuizScreen({ picks, answers, onAnswer, onBack }) {
  const s = answers.length;
  const [step, idx] = picks[s] ?? picks[picks.length - 1];
  const [scene, a, b] = QUESTIONS[step][idx];
  const [picked, setPicked] = useState(null);
  const [anim, setAnim] = useState(0);

  // 문제가 바뀔 때마다 선택 표시 지우고 다시 페이드인
  useEffect(() => {
    setPicked(null);
    setAnim((n) => n + 1);
  }, [s]);

  // 키보드 A/B (또는 1/2)로도 고를 수 있게
  useEffect(() => {
    const onKey = (e) => {
      const k = e.key.toLowerCase();
      if (k === "a" || k === "1") choose("A");
      if (k === "b" || k === "2") choose("B");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  function choose(ab) {
    if (picked) return;
    setPicked(ab);
    onAnswer(ab);
  }

  return (
    <Screen>
      <BackBtn type="button" aria-label="이전으로" onClick={onBack}><BackIcon /></BackBtn>
      <Center>
        {/* <Cap>{s + 1} / {TOTAL}</Cap> */}
        <QuizTitle as="h2" $fade key={`t${anim}`}>{scene}</QuizTitle>
        <QuizCard $fade key={`c${anim}`}>
          <IRow as="button" $hover $picked={picked === "A"} type="button" onClick={() => choose("A")}>
            <Ic><img alt="" src={IMG.noteLess} /></Ic>
            <Tx><b>{a}</b></Tx>
          </IRow>
          <Sep />
          <IRow as="button" $hover $picked={picked === "B"} type="button" onClick={() => choose("B")}>
            <Ic><img alt="" src={IMG.noteWhole} /></Ic>
            <Tx><b>{b}</b></Tx>
          </IRow>
        </QuizCard>
        <Dots>
          {[...Array(TOTAL)].map((_, i) => <Dot key={i} $on={i === s} />)}
        </Dots>
      </Center>
    </Screen>
  );
}

// 3. 결과 보기 전
export function RevealScreen({ marks, onReveal }) {
  // 음표가 하나씩 나타날 때 그 음을 같이 들려줌
  useEffect(() => {
    const ts = marks.map((m, i) => setTimeout(() => tone(m.type === "note" ? m.pitch : null), popDelay(i) * 1000));
    return () => ts.forEach(clearTimeout);
  }, []);
  return (
    <Screen>
      <Center>
        <RevealCard>
          <BigStaff marks={marks} pop height={104} />
        </RevealCard>
        <Title as="h2" style={{ marginTop: 44 }}>나의 템포를 확인해보세요!</Title>
      </Center>
      <RaisedFoot>
        <Btn type="button" onClick={onReveal}>결과 보기 <NoteIcon /></Btn>
      </RaisedFoot>
      <CharsCorner src={charactersUrl} alt="" />
    </Screen>
  );
}

// 4. 결과
export function ResultScreen({ tempo, marks, onStartApp }) {
  const t = TEMPOS[tempo];
  return (
    <Screen>
      <Center>
        <Cap>나의 일상 템포는</Cap>
        <BigStaff marks={marks} word={tempo} floating />
        <TempoMeta><span>{t.ko}</span><b>♩ = {t.bpm}</b></TempoMeta>
        <TempoDesc>{t.desc}</TempoDesc>
        <ResultCard>
          <IRow>
            <Ic><img alt="" src={IMG.noteWhole} /></Ic>
            <Tx><b>{t.habit}</b><span>매일 {t.time} · 나에게 맞는 습관</span></Tx>
          </IRow>
        </ResultCard>
      </Center>
      <RaisedFoot>
        <Btn type="button" onClick={onStartApp}>해비티에서 시작하기 <NoteIcon /></Btn>
      </RaisedFoot>
      <CharsCorner src={charactersUrl} alt="" $beat={`${beatSec(tempo).toFixed(3)}s`} />
    </Screen>
  );
}


// 메인·결과 보기·결과 화면 버튼은 바닥에서 조금 띄움
const RaisedFoot = styled(Foot)`
  margin-bottom: 64px;
  ${media.mobile} { margin-bottom: 24px; }
  ${media.imac} { margin-bottom: 96px; }
`;

// 결과 보기 전: 고른 음표를 흰 카드(앱 주간 카드 느낌) 위 오선에
const RevealCard = styled.div`
  width: min(720px, 100%); padding: 32px 56px 52px; border-radius: 32px; background: #fff;
  box-shadow: 0 10px 40px rgba(18,18,18,.06);
  ${media.mobile} { padding: 16px 20px 44px; border-radius: 24px; }
  ${media.imac} { width: min(1000px, 100%); padding: 44px 80px 72px; border-radius: 40px; }
`;

const QuizTitle = styled(Title)`
  max-width: 18em; margin-bottom: 36px; min-height: 2.6em; display: grid; align-items: end;
  font-size: clamp(21px, 1.75vw, 26px);
  ${media.imac} { font-size: 34px; margin-bottom: 48px; }
`;

const QuizCard = styled(Card)`
  margin-bottom: 36px;
  ${media.imac} { margin-bottom: 48px; }
`;

const TempoMeta = styled.div`
  display: flex; gap: 14px; justify-content: center; align-items: baseline; flex-wrap: wrap;
  font-size: 17px; margin-top: 8px;
  b { font-weight: 700; }
  ${media.imac} { font-size: 22px; gap: 18px; }
`;

const TempoDesc = styled.p`
  font-size: clamp(15px, 1.15vw, 17px); line-height: 1.7; max-width: 34em; margin: 18px auto 28px;
  color: #333; text-wrap: pretty;
  ${media.imac} { font-size: 21px; margin: 24px auto 36px; }
`;

const ResultCard = styled(Card)`
  width: min(620px, 100%);
  ${media.imac} { width: min(800px, 100%); }
`;
