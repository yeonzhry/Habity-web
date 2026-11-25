// 화면에 쓰는 작은 아이콘들 (SF Symbols 모양을 비슷하게)
export const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3.5 9.5l3.6 3.6L14.5 5" />
  </svg>
);

export const NoteIcon = () => (
  <svg viewBox="0 0 16 20" fill="currentColor" aria-hidden="true">
    <path d="M6 1h9v4H9v10.2A4 4 0 1 1 6 11.6z" />
  </svg>
);

export const BackIcon = () => (
  <svg width="14" height="22" viewBox="0 0 14 22" fill="none" stroke="#121212" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 2L3 11l8 9" />
  </svg>
);

export const StatusIcons = () => (
  <svg width="70" height="13" viewBox="0 0 70 13" fill="#121212">
    <rect x="0" y="8" width="3" height="4" rx="1" />
    <rect x="5" y="6" width="3" height="6" rx="1" />
    <rect x="10" y="3.5" width="3" height="8.5" rx="1" />
    <rect x="15" y="1" width="3" height="11" rx="1" />
    {/* 와이파이: 부채꼴 두 줄 + 가운데 점 */}
    <g fill="none" stroke="#121212" strokeWidth="1.8" strokeLinecap="round">
      <path d="M26.28 5.28A9.5 9.5 0 0 1 39.72 5.28" />
      <path d="M28.62 7.62A6.2 6.2 0 0 1 37.38 7.62" />
    </g>
    <path d="M33 12.2L30.74 9.94A3.2 3.2 0 0 1 35.26 9.94Z" />
    <rect x="45" y="1" width="22" height="11" rx="3" fill="none" stroke="#121212" opacity=".4" />
    <rect x="47" y="3" width="18" height="7" rx="1.5" />
    <rect x="68" y="4.5" width="1.5" height="4" rx=".7" opacity=".4" />
  </svg>
);

export const TabNotes = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 6h9v2H4zM4 10h9v2H4zM4 14h6v2H4z" />
    <path d="M15 4h5v3h-3v10.5a3 3 0 1 1-2-2.8z" />
  </svg>
);
export const TabRecords = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="#121212">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="3.2" fill="#fff" />
  </svg>
);
export const TabFriends = () => (
  <svg width="24" height="22" viewBox="0 0 26 22" fill="#121212">
    <circle cx="9" cy="7" r="4" />
    <circle cx="18.5" cy="7.5" r="3.4" />
    <path d="M1.5 19c0-3.8 3.3-6.3 7.5-6.3s7.5 2.5 7.5 6.3zM17.5 19c0-2.2-.6-4-1.9-5.4 4.7-.6 8.9 1.5 8.9 5.4z" />
  </svg>
);

export const PersonIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#000">
    <circle cx="12" cy="7.5" r="4.5" />
    <path d="M3 21c0-4.4 4-7.5 9-7.5s9 3.1 9 7.5z" />
  </svg>
);
export const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" stroke="#DDFF4C" strokeWidth="2.4" strokeLinecap="round">
    <path d="M8 1.5v13M1.5 8h13" />
  </svg>
);

export const PlayIcon = ({ big }) =>
  big ? (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="#121212"><path d="M4 2v16l14-8z" /></svg>
  ) : (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="#121212"><path d="M2.5 1.2v9.6L10.5 6z" /></svg>
  );
export const PauseIcon = ({ big }) =>
  big ? (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="#121212">
      <rect x="3.5" y="2" width="4.5" height="16" rx="1.3" />
      <rect x="12" y="2" width="4.5" height="16" rx="1.3" />
    </svg>
  ) : (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="#121212">
      <rect x="2" y="1.5" width="3" height="9" rx="1" />
      <rect x="7" y="1.5" width="3" height="9" rx="1" />
    </svg>
  );
export const PrevIcon = () => (
  <svg width="20" height="14" viewBox="0 0 20 14" fill="#121212"><path d="M10 0v14L0 7zM20 0v14L10 7z" /></svg>
);
export const NextIcon = () => (
  <svg width="20" height="14" viewBox="0 0 20 14" fill="#121212"><path d="M10 0v14l10-7zM0 0v14l10-7z" /></svg>
);
