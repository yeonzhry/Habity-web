import { useCallback, useEffect, useRef, useState } from "react";
import { IntroScreen, QuizScreen, RevealScreen, ResultScreen } from "./components/Screens";
import AppDemo from "./components/AppDemo";
import { TOTAL, pickQuestions, answerMark } from "./data/questions";
import { tempoOf } from "./data/tempos";
import { tone, unlockAudio } from "./lib/audio";
import { GlobalStyle } from "./styles/GlobalStyle";

const IDLE_MS = 90_000; // 90초 동안 아무도 안 만지면 처음 화면으로 (전시용)

export default function App() {
  const [screen, setScreen] = useState("intro"); // intro | quiz | reveal | result | app
  const [picks, setPicks] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [demoKey, setDemoKey] = useState(0); // 앱 체험을 새로 시작할 때마다 초기화
  const busy = useRef(false);

  const tempo = tempoOf(answers);
  const marks = answers.map(answerMark);

  // ---------- 화면 이동 ----------
  const go = (s) => {
    setScreen(s);
    window.scrollTo(0, 0);
  };
  const restart = useCallback(() => {
    setAnswers([]);
    go("intro");
  }, []);

  function start() {
    unlockAudio();
    setPicks(pickQuestions());
    setAnswers([]);
    go("quiz");
  }

  function answer(ab) {
    if (busy.current) return;
    busy.current = true;
    const i = answers.length;
    const next = [...answers, ab];
    tone(answerMark(ab, i).pitch);
    // 고른 게 잠깐 보이고 다음 문제로
    setTimeout(() => {
      busy.current = false;
      setAnswers(next);
      if (next.length === TOTAL) go("reveal");
    }, 650);
  }

  function back() {
    if (busy.current) return;
    if (!answers.length) return go("intro");
    setAnswers(answers.slice(0, -1));
  }

  function reveal() {
    go("result");
  }

  function startApp() {
    setDemoKey((k) => k + 1);
    go("app");
  }

  // ---------- 오래 가만히 두면 처음으로 ----------
  const idle = useRef(null);
  const bump = useCallback(() => {
    clearTimeout(idle.current);
    if (screen !== "intro") idle.current = setTimeout(restart, IDLE_MS);
  }, [screen, restart]);

  useEffect(() => {
    bump();
    const evs = ["pointerdown", "keydown", "wheel"];
    evs.forEach((e) => window.addEventListener(e, bump, { passive: true }));
    return () => {
      clearTimeout(idle.current);
      evs.forEach((e) => window.removeEventListener(e, bump));
    };
  }, [bump]);

  return (
    <>
      <GlobalStyle />
      {screen === "intro" && <IntroScreen onStart={start} />}
      {screen === "quiz" && answers.length < TOTAL && (
        <QuizScreen picks={picks} answers={answers} onAnswer={answer} onBack={back} />
      )}
      {screen === "reveal" && <RevealScreen marks={marks} onReveal={reveal} />}
      {screen === "result" && (
        <ResultScreen tempo={tempo} marks={marks} onStartApp={startApp} />
      )}
      {screen === "app" && <AppDemo key={demoKey} tempo={tempo} onRestart={restart} onActivity={bump} />}
    </>
  );
}
