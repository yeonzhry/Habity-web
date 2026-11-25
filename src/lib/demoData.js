// 앱 체험용 날짜 계산 + 지난 날 예시 기록
export const DAY = 86400000;
export const WD = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}
export const keyOf = (d) => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);

export function weekDates(today) {
  return [...Array(7)].map((_, i) => addDays(today, i - today.getDay()));
}

// 이번 달을 일~토 7칸씩 (빈 칸은 null)
export function monthWeeks(today) {
  const y = today.getFullYear();
  const m = today.getMonth();
  const first = new Date(y, m, 1);
  const days = new Date(y, m + 1, 0).getDate();
  const cells = [
    ...Array(first.getDay()).fill(null),
    ...[...Array(days)].map((_, i) => new Date(y, m, i + 1)),
  ];
  while (cells.length % 7) cells.push(null);
  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

function hash(s) {
  let h = 2166136261;
  for (const ch of s) {
    h ^= ch.charCodeAt(0);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

// ---------- Monthly 멜로디: 한 달을 동요 한 곡으로 ----------
// [음, 박자] 음: 0 도 · 1 레 · 2 미 · 3 파 · 4 솔 · 5 라 · 6 시 · 7 높은 도
const [DO, RE, MI, FA, SOL] = [0, 1, 2, 3, 4];
export const SONGS = {
  // 떴다 떴다 비행기 날아라 날아라 / 높이 높이 날아라 우리 비행기
  비행기: [
    [MI, 1], [RE, 1], [DO, 1], [RE, 1], [MI, 1], [MI, 1], [MI, 2],
    [RE, 1], [RE, 1], [RE, 2], [MI, 1], [SOL, 1], [SOL, 2],
    [MI, 1], [RE, 1], [DO, 1], [RE, 1], [MI, 1], [MI, 1], [MI, 2],
    [RE, 1], [RE, 1], [MI, 1], [RE, 1], [DO, 4],
  ],
  // 나비야 나비야 이리 날아 오너라 / 노랑나비 흰나비 춤을 추며 오너라
  나비야: [
    [SOL, 1], [MI, 1], [MI, 2], [FA, 1], [RE, 1], [RE, 2],
    [DO, 1], [RE, 1], [MI, 1], [FA, 1], [SOL, 1], [SOL, 1], [SOL, 2],
    [SOL, 1], [MI, 1], [MI, 1], [MI, 1], [FA, 1], [RE, 1], [RE, 1], [RE, 1],
    [DO, 1], [MI, 1], [SOL, 1], [SOL, 1], [MI, 1], [MI, 1], [MI, 2],
  ],
};
export const pickSong = () => {
  const names = Object.keys(SONGS);
  return names[Math.floor(Math.random() * names.length)];
};
// 그 날(1일 = 첫 음)에 해당하는 [음, 박자], 곡이 끝난 뒤면 null
export const songNote = (song, d) => SONGS[song]?.[d.getDate() - 1] ?? null;

// 지난 날들은 예시 기록: 음은 곡을 따라감
// 앱 규칙: 도는 검정(일부만 함), 도가 아닌 음은 연두(다 함)
// done = 그날 체크한 습관 수 (3개 중)
export function pastMark(d, tempo, song) {
  const n = songNote(song, d);
  if (!n) return { type: "rest", done: 0 };
  if (n[0] === 0) {
    const h = hash(keyOf(d) + tempo);
    // >>> (부호 없는 시프트): >>를 쓰면 음수가 나옴
    return { type: "note", pitch: 0, style: "Less", done: 1 + ((h >>> 4) % 2) };
  }
  return { type: "note", pitch: n[0], style: "Whole", done: 3 };
}

export function makeHabits(rec) {
  return [
    { name: "기상하기", time: "07:30", done: false },
    { name: "물 한 잔 마시기", time: "12:00", done: false },
    { name: rec.habit, time: rec.time, done: false, rec: true },
  ].sort((a, b) => a.time.localeCompare(b.time));
}
