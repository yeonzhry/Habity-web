// 화면 크기 구간
// mobile: 세로 태블릿·폰 / imac: 24"(2240×1260)·27"(2560×1440) 같은 큰 모니터
export const media = {
  mobile: "@media (max-width: 860px)",
  imac: "@media (min-width: 1800px) and (min-height: 1000px)",
};

export const IMAC_MIN_WIDTH = 1800;
export const isImac = () => window.innerWidth >= IMAC_MIN_WIDTH && window.innerHeight >= 1000;
