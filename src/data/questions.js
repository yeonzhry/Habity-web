// 심리테스트 상황 목록: [상황, A(느긋), B(활기)]
export const QUESTIONS = [
  // step 1 · 아침
  [
    ["알람이 울렸는데 오늘은 쉬는 날!", "이불 속에서 조금 더 뒹군다", "벌떡 일어난다"],
    ["나가는 길에 이어폰으로 노래를 듣는다", "아침의 시작은 잔잔한 노래", "나가는 길에는 신나는 노래로 활기차게"],
    ["아침 먹을 시간이 10분밖에 남지 않았다", "그래도 아침은 느긋해야지... 천천히 먹는다", "빵 하나 챙겨 바로 출발한다"],
  ],
  // step 2 · 낮
  [
    ["점심 시간이 30분 남았다", "조용한 카페 구석에서 쉰다", "근처를 한 바퀴 걷는다"],
    ["친구에게 오늘 뭐하냐는 연락이 왔다", "다음에 보자고 답장한다", "좋아! 하며 바로 약속을 잡는다"],
    ["오후 3시, 집중력이 바닥났다", "눈 감고 5분간 멍 때린다", "자리에서 일어나 스트레칭한다"],
    ["친구가 함께 동아리에 가입하자고 한다", "사진 동아리가 눈에 들어온다", "수영 동아리가 눈에 들어온다"],
  ],
  // step 3 · 저녁
  [
    ["집에 도착했다", "바로 어딘가에 누워 쉰다", "옷 갈아입고 동네를 한 바퀴 돈다"],
    ["주말 계획을 세운다", "집에 틀어박혀 드라마를 정주행한다", "주말엔 밖으로! 가보고 싶었던 곳으로 여행을 간다"],
    ["자기 전에 휴대폰을 들었다", "일기 앱에 오늘 하루를 기록한다", "단톡방에 오늘 있었던 일을 공유한다"],
    ["오늘 하루를 노래로 표현하면?", "잔잔한 클래식", "활기찬 댄스곡"],
    ["씻고 나왔는데 아직 잠이 오지 않는다", "누워서 양을 세어본다", "아직 깨어있을 것 같은 친구에게 연락한다"],
  ],
];

export const STEP_LABEL = ["아침", "낮", "저녁"];

// 단계마다 몇 문제씩 낼지 (아침 1 · 낮 2 · 저녁 2 = 총 5문제)
export const PER_STEP = [1, 2, 2];
export const TOTAL = PER_STEP.reduce((a, b) => a + b, 0);

// n번째 문제가 어느 단계인지
export function stepOf(i) {
  let acc = 0;
  for (let s = 0; s < PER_STEP.length; s++) {
    acc += PER_STEP[s];
    if (i < acc) return s;
  }
  return PER_STEP.length - 1;
}

// 단계마다 정해진 개수만큼 겹치지 않게 랜덤으로 → [[단계, 상황번호], ...]
export function pickQuestions() {
  return QUESTIONS.flatMap((group, s) =>
    [...group.keys()]
      .sort(() => Math.random() - 0.5)
      .slice(0, PER_STEP[s])
      .map((idx) => [s, idx])
  );
}

// 고를 때마다 생기는 음 (A는 낮고 차분하게, B는 높고 경쾌하게)
export const A_PITCH = [2, 1, 3, 0, 2];
export const B_PITCH = [4, 5, 6, 7, 5];

export function answerMark(answer, i) {
  return answer === "A"
    ? { type: "note", pitch: A_PITCH[i], style: "Less" }
    : { type: "note", pitch: B_PITCH[i], style: "Whole" };
}
