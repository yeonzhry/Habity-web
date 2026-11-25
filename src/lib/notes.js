// 음표 이미지 + 오선 좌표 (앱 Staff.swift와 같은 규격: 줄 간격 16, 음표 44)
const files = import.meta.glob("../assets/notes/*.png", { eager: true, import: "default" });
export const IMG = Object.fromEntries(
  Object.entries(files).map(([path, url]) => [path.split("/").pop().replace(".png", ""), url])
);

// 음 범위: 0(도) ~ 7(높은 도). 도보다 낮거나 높은 도보다 높게 그리지 않음
export const clampPitch = (p) => Math.max(0, Math.min(7, p ?? 0));

// style: Whole(연두, 다 함) | Less(검정, 일부) | Disabled(회색)
export function noteImg(pitch, style) {
  pitch = clampPitch(pitch);
  const base = pitch === 0 ? "noteDo" : pitch >= 6 ? "noteTiDo" : "note";
  return IMG[base + style];
}

// 음표 이미지 맨 위가 오선 맨 윗줄에서 얼마나 떨어지는지
export function noteTop(pitch, scale = 1) {
  pitch = clampPitch(pitch);
  const headY = (pitch >= 6 ? 11.5 : 32.5) * scale;
  return 64 * scale - (pitch - 2) * 8 * scale - headY;
}

// n칸 중 i번째 칸의 가운데 x (양옆 inset px 띄움)
export const colX = (i, n, inset) => `calc(${inset}px + ${i} * (100% - ${2 * inset}px) / ${n - 1})`;
