import { useEffect, useMemo, useRef, useState } from "react";
import { IMG, colX } from "../lib/notes";
import { tone, unlockAudio } from "../lib/audio";
import { TEMPOS } from "../data/tempos";
import { WD, keyOf, startOfToday, weekDates, monthWeeks, pastMark, makeHabits, DAY, pickSong, songNote } from "../lib/demoData";
import { Staff } from "./Staff";
import {
  CheckIcon, StatusIcons, TabNotes, TabRecords, TabFriends, PersonIcon, PlusIcon,
  PlayIcon, PauseIcon, PrevIcon, NextIcon,
} from "./Icons";
import { Ic, Tx, LinkBtn } from "../styles/ui";
import { isImac } from "../styles/media";
import * as S from "./AppDemo.styles";
import appStoreQr from "../assets/appstore-qr.svg";

const NOTE_NAMES = ["도", "레", "미", "파", "솔", "라", "시", "도"];

// 5. 앱 체험: 왼쪽 안내 카드 + 오른쪽 폰 안의 Habity (Today · Monthly)
export default function AppDemo({ tempo, onRestart, onActivity }) {
  const today = useMemo(startOfToday, []);
  const rec = TEMPOS[tempo];
  const song = useMemo(pickSong, []); // 이번 체험의 한 달 멜로디: 비행기 또는 나비야

  const [habits, setHabits] = useState(() => makeHabits(rec));
  const [todayPitch, setTodayPitch] = useState(null);
  const [mode, setMode] = useState("today");
  const [listened, setListened] = useState(false);
  const [sheet, setSheet] = useState(false);
  const [pickSel, setPickSel] = useState(null);
  const [playing, setPlaying] = useState(null);   // "week" | "month" | null
  const [activeKey, setActiveKey] = useState(null); // 재생 중인 날짜
  const [popKey, setPopKey] = useState(null);
  const [toast, setToast] = useState("");
  const timers = useRef([]);
  const toastTimer = useRef(null);

  const allDone = habits.every((h) => h.done);
  const doneCount = habits.filter((h) => h.done).length;

  // 날짜별 음표: 오늘은 실제 체크 상태, 지난 날은 예시 기록, 오늘 이후는 비워 둠
  const todaySong = songNote(song, today)?.[0] ?? 0;
  function markOf(d) {
    if (!d || d > today) return null;
    if (d < today) return pastMark(d, tempo, song);
    if (doneCount === 0) return null;
    if (allDone) return { type: "note", pitch: todayPitch ?? todaySong, style: "Whole" };
    return { type: "note", pitch: todaySong, style: "Less" };
  }

  function showToast(msg) {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 1800);
  }

  // ---------- 멜로디 재생 (결과 템포 빠르기로) ----------
  function stopMelody() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setPlaying(null);
    setActiveKey(null);
  }
  useEffect(() => stopMelody, []);

  function playMelody(id) {
    if (playing === id) return stopMelody();
    stopMelody();
    unlockAudio();
    // 오늘까지만 재생
    const dates = (id === "week" ? weekDates(today) : monthWeeks(today).flat()).filter((d) => d && d <= today);
    const beat = (60 / rec.bpm) * 0.75;
    setPlaying(id);
    // 곡의 박자대로 (긴 음은 그만큼 기다렸다가 다음 날로)
    let t = 0;
    dates.forEach((d) => {
      timers.current.push(setTimeout(() => {
        setActiveKey(keyOf(d));
        const m = markOf(d);
        tone(m?.type === "note" ? m.pitch : null);
        onActivity();
      }, t * 1000));
      t += (songNote(song, d)?.[1] ?? 1) * beat;
    });
    timers.current.push(setTimeout(() => {
      stopMelody();
      if (id === "month") setListened(true);
    }, t * 1000 + 300));
  }

  // ---------- 습관 체크 ----------
  function toggleHabit(i) {
    const next = habits.map((h, j) => (j === i ? { ...h, done: !h.done } : h));
    setHabits(next);
    if (!next.every((h) => h.done)) setTodayPitch(null);
    if (next.every((h) => h.done)) {
      setTimeout(() => { setPickSel(null); setSheet(true); }, 350); // 처음엔 아무 음도 선택 안 된 상태
    }
  }

  function saveNote() {
    if (pickSel == null) return;
    setTodayPitch(pickSel);
    setSheet(false);
    setPopKey(keyOf(today));
    showToast("오늘의 음표가 저장됐어요");
  }

  // ---------- 안내 카드 단계 ----------
  const stepDone = [allDone, todayPitch != null, listened];
  const now = stepDone.findIndex((x) => !x);
  const steps = [
    ["오늘의 습관을 모두 체크해요", "검정 카드를 누르면 연두색으로 바뀌어요"],
    ["다 해낸 날엔 원하는 음을 골라요", "고른 음이 오늘의 음표가 돼요"],
    ["Monthly에서 한 달 멜로디를 들어요", "나의 템포로 재생돼요"],
  ];

  // ---------- 폰 크기를 화면에 맞추기 ----------
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const fit = () => {
      const narrow = window.innerWidth <= 860;
      const byH = (window.innerHeight - 48) / 876;
      const byW = (narrow ? window.innerWidth - 32 : window.innerWidth * 0.55) / 417;
      // 아이맥처럼 큰 화면에선 폰을 실제 크기보다 조금 크게
      const max = isImac() ? 1.3 : 1;
      setScale(Math.max(0.4, Math.min(max, byH, byW)));
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  // 상태바 시계
  const [clock, setClock] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setClock(new Date()), 20000);
    return () => clearInterval(t);
  }, []);

  const locked = () => showToast("전시 체험에서는 Today와 Monthly만 열려 있어요");

  return (
    <S.AppScreen>
      <S.Wrap>
        <S.Guide>
          <S.TempoChip><b>{tempo}</b><span>♩ = {rec.bpm}</span></S.TempoChip>
          <S.GuideTitle as="h2">
            {stepDone.every(Boolean) ? "오늘의 음표가 한 달 멜로디에 들어갔어요" : "추천 습관이 오늘 할 일에 들어왔어요"}
          </S.GuideTitle>
          <S.GuideCard>
            {steps.map(([title, detail], i) => (
              <S.GuideRow key={i} $now={i === now} $active={stepDone[i] || i === now}>
                <Ic>
                  <img alt="" src={stepDone[i] ? IMG.noteWhole : i === now ? IMG.noteLess : IMG.noteDisabled} />
                </Ic>
                <Tx><b>{title}</b><span>{detail}</span></Tx>
              </S.GuideRow>
            ))}
          </S.GuideCard>
          {/* 앱스토어 QR: https://apps.apple.com/us/app/habity/id6837300940/ */}
          <S.Download>
            <img src={appStoreQr} alt="App Store Habity 다운로드 QR 코드" />
            <span><b>App Store에서 Habity 다운로드 하기!</b><span>휴대폰 카메라로 QR을 찍어 보세요</span></span>
          </S.Download>
          <LinkBtn type="button" onClick={onRestart}>처음으로</LinkBtn>
        </S.Guide>

        <S.PhoneHolder style={{ "--s": scale }}>
          <S.Phone style={{ "--s": scale }}>
            <S.Ph>
              <S.Island />
              <S.StatusBar>
                <span>{clock.getHours()}:{String(clock.getMinutes()).padStart(2, "0")}</span>
                <span><StatusIcons /></span>
              </S.StatusBar>
              {mode === "today" && <S.Grad />}

              <S.View>
                <S.Header>
                  <S.Modes>
                    {["today", "monthly"].map((m) => (
                      <S.Mode key={m} type="button" $on={mode === m}
                        onClick={() => { stopMelody(); setMode(m); }}>
                        {m === "today" ? "Today" : "Monthly"}
                      </S.Mode>
                    ))}
                  </S.Modes>
                  <S.Acts>
                    <button type="button" aria-label="마이페이지" onClick={locked}><PersonIcon /></button>
                    <S.PlusBtn type="button" aria-label="습관 추가" onClick={locked}><PlusIcon /></S.PlusBtn>
                  </S.Acts>
                </S.Header>

                {mode === "today" ? (
                  <TodayView
                    today={today} habits={habits} markOf={markOf}
                    playing={playing} activeKey={activeKey} popKey={popKey}
                    onToggle={toggleHabit} onPlay={() => playMelody("week")}
                  />
                ) : (
                  <MonthlyView
                    today={today} habits={habits} tempo={tempo} song={song} markOf={markOf}
                    playing={playing} activeKey={activeKey}
                    onPlay={() => playMelody("month")}
                  />
                )}
              </S.View>

              <S.TabBar>
                <S.Tab type="button" $on><TabNotes />Notes</S.Tab>
                <S.Tab type="button" onClick={locked}><TabRecords />Records</S.Tab>
                <S.Tab type="button" onClick={locked}><TabFriends />Friends</S.Tab>
              </S.TabBar>

              {/* 음 고르기 시트 */}
              <S.Dim $show={sheet} onClick={() => setSheet(false)} />
              <S.NoteSheet $show={sheet}>
                <S.Grab />
                <h3>원하는 음을 골라보세요</h3>
                <S.Picker>
                  <S.ColLabels>
                    {NOTE_NAMES.map((n, p) => (
                      <S.NoteName key={p} $on={pickSel === p} style={{ left: colX(p, 8, 15) }}>{n}</S.NoteName>
                    ))}
                  </S.ColLabels>
                  <Staff
                    inset={15}
                    marks={NOTE_NAMES.map((_, p) => ({ type: "note", pitch: p, style: pickSel === p ? "Whole" : "Disabled" }))}
                    keys={NOTE_NAMES.map((_, p) => String(p))}
                    activeKey={pickSel == null ? null : String(pickSel)}
                    onPick={(p) => { setPickSel(p); tone(p); }}
                  />
                </S.Picker>
                <S.SaveBtn type="button" $on={pickSel != null} onClick={saveNote}>
                  <CheckIcon /> 저장
                </S.SaveBtn>
              </S.NoteSheet>

              <S.Toast $show={!!toast}>{toast}</S.Toast>
              <S.HomeBar />
            </S.Ph>
          </S.Phone>
        </S.PhoneHolder>
      </S.Wrap>
    </S.AppScreen>
  );
}

function TodayView({ today, habits, markOf, playing, activeKey, popKey, onToggle, onPlay }) {
  const week = weekDates(today);
  return (
    <>
      <S.Dates>
        {[-2, -1, 0, 1, 2].map((o) => {
          const d = new Date(+today + o * DAY);
          return (
            <S.DateChip key={o} $sel={o === 0}>
              <span>{WD[d.getDay()]}</span>
              <span>{d.getDate()}</span>
            </S.DateChip>
          );
        })}
      </S.Dates>

      <S.WeekCard>
        <S.ColLabels>
          {WD.map((w, i) => <span key={w} style={{ left: colX(i, 7, 20) }}>{w}</span>)}
        </S.ColLabels>
        <Staff marks={week.map(markOf)} keys={week.map(keyOf)} activeKey={activeKey} popKey={popKey} />
        <S.PlayMini type="button" aria-label="이번 주 멜로디 재생" onClick={onPlay}>
          {playing === "week" ? <PauseIcon /> : <PlayIcon />}
        </S.PlayMini>
      </S.WeekCard>

      <S.Sheet>
        {habits.map((h, i) => (
          <div key={h.name}>
            <S.Row>
              <S.Time>{h.time}</S.Time>
              <S.Pill
                $done={h.done}
                role="button" tabIndex={0} aria-pressed={h.done}
                onClick={() => onToggle(i)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onToggle(i); } }}
              >
                <S.PillName>{h.name}{h.rec && <S.Tag>추천</S.Tag>}</S.PillName>
                <S.Chk><CheckIcon /></S.Chk>
              </S.Pill>
            </S.Row>
            {/* 같은 상태끼리만 점선으로 이어짐 */}
            {i < habits.length - 1 && (
              <S.Conn style={{ opacity: h.done === habits[i + 1].done ? 1 : 0 }}><i /></S.Conn>
            )}
          </div>
        ))}
      </S.Sheet>
    </>
  );
}

function MonthlyView({ today, habits, tempo, song, markOf, playing, activeKey, onPlay }) {
  const weeks = monthWeeks(today);
  let checks = 0;
  let perfect = 0;
  weeks.flat().forEach((d) => {
    if (!d || d > today) return;
    if (+d === +today) {
      const n = habits.filter((h) => h.done).length;
      checks += n;
      if (n === habits.length) perfect++;
      return;
    }
    const m = pastMark(d, tempo, song);
    checks += m.done;
    if (m.done === 3) perfect++;
  });

  return (
    <>
      <S.Monthly>
        <S.Stats>
          <S.Stat><span>체크</span><S.StatValue><b>{checks}</b><span>회</span></S.StatValue></S.Stat>
          <S.Stat><span>퍼펙트 데이</span><S.StatValue><b>{perfect}</b><span>일</span></S.StatValue></S.Stat>
        </S.Stats>
        <S.MonthStaff>
          <S.ColLabels>
            {WD.map((w, i) => <span key={w} style={{ left: colX(i, 7, 20) }}>{w}</span>)}
          </S.ColLabels>
          {weeks.map((w, wi) => (
            <S.Week key={wi}>
              <S.ColLabels>
                {w.map((d, i) => d && (
                  <S.DayNum key={i} $today={+d === +today} style={{ left: colX(i, 7, 20) }}>{d.getDate()}</S.DayNum>
                ))}
              </S.ColLabels>
              <Staff marks={w.map(markOf)} keys={w.map((d) => (d ? keyOf(d) : ""))} activeKey={activeKey} />
            </S.Week>
          ))}
        </S.MonthStaff>
      </S.Monthly>
      <S.Player>
        <S.PlayerTitle>{today.getMonth() + 1}월</S.PlayerTitle>
        <S.PlayerCtl>
          <button type="button" disabled aria-label="이전 달"><PrevIcon /></button>
          <button type="button" aria-label="한 달 멜로디 재생" onClick={onPlay}>
            {playing === "month" ? <PauseIcon big /> : <PlayIcon big />}
          </button>
          <button type="button" disabled aria-label="다음 달"><NextIcon /></button>
        </S.PlayerCtl>
      </S.Player>
    </>
  );
}
