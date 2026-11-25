// 앱 MelodyPlayer와 같은 실로폰 소리 (도레미파솔라시도)
const FREQ = [261.63, 293.66, 329.63, 349.23, 392.0, 440.0, 493.88, 523.25];
let ctx = null;

// 브라우저는 클릭한 뒤에만 소리를 낼 수 있어서, 첫 클릭 때 켜짐
export function unlockAudio() {
  if (!ctx) {
    try {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
    } catch {
      ctx = null;
    }
  }
  if (ctx && ctx.state === "suspended") ctx.resume();
  return ctx;
}

export function tone(pitch, when = 0, gain = 0.22) {
  const c = unlockAudio();
  if (!c || pitch == null) return;
  const t0 = c.currentTime + when;
  const f = FREQ[pitch];
  const out = c.createGain();
  out.connect(c.destination);
  // 기본음 + 배음 두 개, 빨리 사라지는 소리
  [
    [1, 1, 3.5],
    [2, 0.35, 6],
    [3, 0.12, 9],
  ].forEach(([mul, amp, dec]) => {
    const o = c.createOscillator();
    const g = c.createGain();
    o.frequency.value = f * mul;
    o.connect(g);
    g.connect(out);
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(amp * gain, t0 + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + 1.1 * (3.5 / dec));
    o.start(t0);
    o.stop(t0 + 1.2);
  });
}
