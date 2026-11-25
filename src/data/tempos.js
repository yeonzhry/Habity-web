// 결과 템포 = 실제 악보 빠르기말 (♩ = 1분당 박 수)
export const TEMPOS = {
  Adagio: {
    ko: "아다지오 · 느리게",
    bpm: 66,
    habit: "잠들기 전 한 줄 일기",
    time: "23:00",
    desc: "느긋하고 여유롭게, 아다지오와 같은 템포를 가지고 있는 당신!\n잠에 들기 전 한 줄 일기를 적는 습관을 가져보는 건 어떨까요?",
  },
  Andante: {
    ko: "안단테 · 걷는 빠르기로",
    bpm: 88,
    habit: "매일 책 10페이지 읽기",
    time: "21:00",
    desc: "천천히 걷는 빠르기로, 삶의 속도가 아주 적정한 당신!\n매일 책 10페이지를 읽어보는 습관을 가져보는 건 어떨까요?",
  },
  Allegro: {
    ko: "알레그로 · 빠르고 경쾌하게",
    bpm: 132,
    habit: "매일 5분 스트레칭",
    time: "15:00",
    desc: "빠르고 경쾌한 템포를 가지고 있는 당신!\n5분 스트레칭 하는 습관을 가져 삶에 활력을 더해보는 건 어떨까요?",
  },
  Presto: {
    ko: "프레스토 · 매우 빠르게",
    bpm: 176,
    habit: "매일 15분 산책하기",
    time: "19:00",
    desc: "매우 빠르고 활기찬 템포를 가지고 있는 당신!\n15분 동안 산책하는 습관으로 그 템포를 유지해보세요.",
  },
};

// 5문제 중 B를 고른 개수: 0~1 Adagio, 2 Andante, 3 Allegro, 4~5 Presto
export function tempoOf(answers) {
  const b = answers.filter((x) => x === "B").length;
  if (b <= 1) return "Adagio";
  if (b === 2) return "Andante";
  if (b === 3) return "Allegro";
  return "Presto";
}

// 한 박 길이(초)
export const beatSec = (tempo) => 60 / TEMPOS[tempo].bpm;
