import { useId } from 'react';

interface BackdropProps {
  bg: string;
  className?: string;
}

const RAINY = new Set(['manor_night', 'manor_rain', 'garden', 'eastwing', 'dawn']);

const WINDOWS = [
  [470, 400, 40, 66],
  [540, 400, 40, 66],
  [610, 400, 40, 66],
  [790, 400, 40, 66],
  [860, 400, 40, 66],
  [930, 400, 40, 66],
  [1000, 400, 40, 66],
  [470, 520, 40, 66],
  [540, 520, 40, 66],
  [610, 520, 40, 66],
  [790, 520, 40, 66],
  [860, 520, 40, 66],
  [930, 520, 40, 66],
  [1000, 520, 40, 66],
  [700, 560, 90, 140],
];

const LIT = new Set([1, 2, 5, 8, 10, 12]);

export function ManorScene({ dawn = false }: { dawn?: boolean }) {
  const uid = useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className="art-svg">
      <defs>
        <linearGradient id={`sky${uid}`} x1="0" y1="0" x2="0" y2="1">
          {dawn ? (
            <>
              <stop offset="0%" stopColor="#252a33" />
              <stop offset="55%" stopColor="#5c5a5c" />
              <stop offset="100%" stopColor="#8d7c70" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#0b0e17" />
              <stop offset="55%" stopColor="#1a1f2d" />
              <stop offset="100%" stopColor="#2b2833" />
            </>
          )}
        </linearGradient>
        <linearGradient id={`manor${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#262832" />
          <stop offset="100%" stopColor="#0e0f14" />
        </linearGradient>
        <radialGradient id={`moon${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={dawn ? '#f6e7cd' : '#dfe3e6'} stopOpacity="0.95" />
          <stop offset="45%" stopColor={dawn ? '#e7cfb2' : '#b9c0c7'} stopOpacity="0.55" />
          <stop offset="100%" stopColor="#b9c0c7" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`windowGlow${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f0c47c" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#f0c47c" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`ground${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#171a19" />
          <stop offset="100%" stopColor="#0a0b0c" />
        </linearGradient>
        <filter id={`softCloud${uid}`} x="-30%" y="-120%" width="160%" height="340%">
          <feGaussianBlur stdDeviation="24" />
        </filter>
      </defs>

      <rect width="1600" height="900" fill={`url(#sky${uid})`} />
      <circle cx="1060" cy="168" r="170" fill={`url(#moon${uid})`} />
      <circle cx="1060" cy="168" r="42" fill={dawn ? '#f4e5cd' : '#dde1e4'} opacity="0.8" />

      {/* clouds */}
      <g
        fill={dawn ? '#6b6868' : '#1d2029'}
        opacity="0.75"
        filter={`url(#softCloud${uid})`}
      >
        <ellipse cx="300" cy="140" rx="330" ry="52" />
        <ellipse cx="620" cy="105" rx="260" ry="38" />
        <ellipse cx="1040" cy="130" rx="310" ry="44" />
        <ellipse cx="1380" cy="230" rx="290" ry="40" />
        <ellipse cx="460" cy="220" rx="240" ry="30" opacity="0.55" />
      </g>

      {/* hills */}
      <path d="M0 640 C260 590 420 640 620 610 C900 566 1080 630 1600 590 L1600 900 L0 900 Z" fill="#141716" />
      <path d="M0 700 C320 660 520 700 780 670 C1080 636 1300 690 1600 660 L1600 900 L0 900 Z" fill={`url(#ground${uid})`} />

      {/* east wing: broken and dark */}
      <g>
        <path d="M330 690 L330 440 L420 380 L510 440 L510 690 Z" fill="#0e0f12" />
        <path d="M355 450 L420 405 L480 450" stroke="#2a2a2e" strokeWidth="6" fill="none" />
        <rect x="368" y="470" width="36" height="52" fill="#07080a" stroke="#33343a" strokeWidth="2" />
        <rect x="440" y="470" width="36" height="52" fill="#07080a" stroke="#33343a" strokeWidth="2" />
        <rect x="440" y="560" width="36" height="52" fill="#07080a" stroke="#33343a" strokeWidth="2" />
        <path d="M330 500 L300 470 M510 560 L540 520" stroke="#24252a" strokeWidth="4" />
        <path d="M330 640 C360 600 380 660 400 620" stroke="#1c2a1e" strokeWidth="8" fill="none" opacity="0.7" />
      </g>

      {/* main house */}
      <g>
        <path d="M590 700 L590 330 L860 330 L860 700 Z" fill={`url(#manor${uid})`} />
        <path d="M860 700 L860 360 L1080 360 L1080 700 Z" fill={`url(#manor${uid})`} />
        <path d="M570 332 L725 240 L880 332 Z" fill="#1a1c24" />
        <path d="M845 362 L970 282 L1100 362 Z" fill="#1a1c24" />
        <path d="M570 332 L725 240 L880 332" stroke="#3d404d" strokeWidth="2.5" fill="none" opacity="0.65" />
        <path d="M845 362 L970 282 L1100 362" stroke="#3d404d" strokeWidth="2.5" fill="none" opacity="0.65" />

        {/* stone courses */}
        <g stroke="#33353f" strokeWidth="1.4" opacity="0.35">
          <path d="M590 372 H860 M590 432 H860 M590 492 H860 M590 552 H860 M590 612 H860 M590 672 H860" />
          <path d="M860 402 H1080 M860 462 H1080 M860 522 H1080 M860 582 H1080 M860 642 H1080" />
        </g>

        {/* towers */}
        <path d="M430 700 L430 260 L520 260 L520 700 Z" fill="#171920" />
        <path d="M418 262 L475 178 L532 262 Z" fill="#12141a" />
        <path d="M418 262 L475 178 L532 262" stroke="#3b3e4a" strokeWidth="2" fill="none" opacity="0.6" />
        <path d="M1080 700 L1080 290 L1170 290 L1170 700 Z" fill="#171920" />
        <path d="M1068 292 L1125 205 L1182 292 Z" fill="#12141a" />
        <path d="M1068 292 L1125 205 L1182 292" stroke="#3b3e4a" strokeWidth="2" fill="none" opacity="0.6" />

        {/* tower windows */}
        <rect x="456" y="320" width="26" height="44" fill="#0a0b0f" stroke="#2b2c33" strokeWidth="2" />
        <rect x="456" y="400" width="26" height="44" fill="#0a0b0f" stroke="#2b2c33" strokeWidth="2" />
        <rect x="1106" y="330" width="26" height="44" fill="#0a0b0f" stroke="#2b2c33" strokeWidth="2" />
        <rect x="1106" y="410" width="26" height="44" fill="#0a0b0f" stroke="#2b2c33" strokeWidth="2" />

        {/* windows */}
        {WINDOWS.map(([x, y, w, h], i) => (
          <g key={`${x}-${y}`}>
            {LIT.has(i) && <circle cx={x + w / 2} cy={y + h / 2} r="58" fill={`url(#windowGlow${uid})`} />}
            <rect x={x} y={y} width={w} height={h} fill={LIT.has(i) ? '#e0b273' : '#0d0f15'} opacity={LIT.has(i) ? 0.96 : 1} stroke={LIT.has(i) ? '#5d4a30' : '#3a3d49'} strokeWidth="2" />
            <path d={`M${x + w / 2} ${y} V${y + h} M${x} ${y + h / 2} H${x + w}`} stroke="#1a1b22" strokeWidth="2" />
            <rect x={x - 3} y={y + h} width={w + 6} height="4" fill="#2e303a" opacity="0.7" />
          </g>
        ))}

        {/* door */}
        <path d="M726 700 L726 600 C726 570 774 570 774 600 L774 700 Z" fill="#08090c" stroke="#2f2f34" strokeWidth="2" />
        <circle cx="762" cy="650" r="3.5" fill="#B99A62" opacity="0.8" />

        {/* steps */}
        <path d="M700 700 L800 700 L830 720 L670 720 Z" fill="#1a1b1f" />
        <path d="M680 718 L820 718 L850 736 L650 736 Z" fill="#131418" />
      </g>

      {/* drive */}
      <path d="M750 736 L720 900 L900 900 L820 736 Z" fill="#0f1112" />
      <path d="M760 740 L742 900 M810 740 L870 900" stroke="#1d2021" strokeWidth="3" opacity="0.6" />

      {/* hedges */}
      <g fill="#0f1512">
        <path d="M0 760 C120 720 240 760 330 740 L330 900 L0 900 Z" />
        <path d="M1600 760 C1480 720 1350 760 1260 745 L1260 900 L1600 900 Z" />
      </g>

      {/* gate posts */}
      <rect x="330" y="700" width="34" height="130" fill="#24252c" />
      <rect x="1240" y="700" width="34" height="130" fill="#24252c" />
      <circle cx="347" cy="700" r="20" fill="#2c2d35" stroke="#44464f" strokeWidth="1.5" />
      <circle cx="1257" cy="700" r="20" fill="#2c2d35" stroke="#44464f" strokeWidth="1.5" />

      {/* fog */}
      <g fill={dawn ? '#b9b4ac' : '#4a4d55'} opacity={dawn ? 0.13 : 0.09}>
        <ellipse cx="300" cy="740" rx="420" ry="50" />
        <ellipse cx="1100" cy="770" rx="500" ry="56" />
        <ellipse cx="760" cy="820" rx="620" ry="44" />
      </g>

      <rect width="1600" height="900" fill="url(#vignette)" opacity="0" />
    </svg>
  );
}

export function EastWingScene() {
  const uid = useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className="art-svg">
      <defs>
        <linearGradient id={`sky${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#151821" />
          <stop offset="60%" stopColor="#35323a" />
          <stop offset="100%" stopColor="#4a3f3a" />
        </linearGradient>
      </defs>
      <rect width="1600" height="900" fill={`url(#sky${uid})`} />
      <circle cx="1180" cy="200" r="120" fill="#c9b7a0" opacity="0.18" />
      {/* burned wing */}
      <path d="M220 820 L220 380 L560 260 L900 380 L900 820 Z" fill="#171416" />
      <path d="M240 380 L560 278 L880 380" stroke="#2a2426" strokeWidth="14" fill="none" />
      {/* collapsed roof beams */}
      <g stroke="#2b2422" strokeWidth="16" strokeLinecap="round">
        <path d="M300 820 L520 420" />
        <path d="M840 820 L620 400" />
        <path d="M420 820 L700 460" opacity="0.8" />
        <path d="M700 820 L460 520" opacity="0.5" />
      </g>
      {/* empty windows */}
      {[360, 470, 580, 690, 800].map((x, i) => (
        <g key={x}>
          <rect x={x} y={430 + (i % 2) * 40} width="70" height="120" fill="#08080a" stroke="#2c2628" strokeWidth="4" />
          <path d={`M${x + 35} ${430 + (i % 2) * 40} V${550 + (i % 2) * 40}`} stroke="#1f1c1e" strokeWidth="3" />
        </g>
      ))}
      {/* ivy */}
      <g stroke="#1d2a20" strokeWidth="4" fill="none" opacity="0.8">
        <path d="M260 820 C300 700 250 600 300 500 C330 440 310 400 340 360" />
        <path d="M870 820 C830 720 880 640 840 560" />
        <path d="M420 820 C440 740 400 700 430 640" />
      </g>
      {/* roses */}
      <g fill="#c9a24a">
        {[260, 300, 340, 380, 820, 860].map((x, i) => (
          <circle key={x} cx={x} cy={780 - (i % 3) * 22} r="6" opacity="0.75" />
        ))}
      </g>
      {/* embers */}
      <g fill="#d98b52">
        {[500, 640, 760, 580, 700].map((x, i) => (
          <circle key={x} cx={x} cy={700 - i * 40} r={2 + (i % 2)} opacity="0.5" />
        ))}
      </g>
      <path d="M0 820 C300 780 500 820 760 800 C1100 775 1300 820 1600 795 L1600 900 L0 900 Z" fill="#101211" />
      <path d="M0 860 C380 830 640 870 980 845 C1200 830 1400 860 1600 845 L1600 900 L0 900 Z" fill="#0a0b0b" />
    </svg>
  );
}

type RoomKind =
  | 'foyer'
  | 'study'
  | 'drawing'
  | 'dining'
  | 'library'
  | 'corridor'
  | 'sealed'
  | 'cellar'
  | 'garden';

const ROOM_PALETTE: Record<
  RoomKind,
  { wall: [string, string]; floor: string; accent: string; warmth: number }
> = {
  foyer: { wall: ['#1d2026', '#12141a'], floor: '#191a1e', accent: '#B99A62', warmth: 0.55 },
  study: { wall: ['#241f1c', '#15120f'], floor: '#201914', accent: '#B99A62', warmth: 0.7 },
  drawing: { wall: ['#2a1f24', '#171114'], floor: '#1d1518', accent: '#B99A62', warmth: 0.65 },
  dining: { wall: ['#232026', '#141318'], floor: '#1b181c', accent: '#B99A62', warmth: 0.6 },
  library: { wall: ['#221d19', '#13100d'], floor: '#1c1611', accent: '#B99A62', warmth: 0.5 },
  corridor: { wall: ['#1e2027', '#111318'], floor: '#191a1f', accent: '#B99A62', warmth: 0.35 },
  sealed: { wall: ['#262229', '#151318'], floor: '#1d1a20', accent: '#8f7a58', warmth: 0.2 },
  cellar: { wall: ['#1b1a1b', '#0e0e0f'], floor: '#151413', accent: '#8a6b3a', warmth: 0.25 },
  garden: { wall: ['#101720', '#0b1016'], floor: '#0e1310', accent: '#B99A62', warmth: 0.15 },
};

export function RoomScene({ room }: { room: RoomKind }) {
  const uid = useId().replace(/:/g, '');
  const palette = ROOM_PALETTE[room] ?? ROOM_PALETTE.study;
  if (room === 'garden') return <GardenScene />;

  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className="art-svg">
      <defs>
        <linearGradient id={`wall${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.wall[0]} />
          <stop offset="100%" stopColor={palette.wall[1]} />
        </linearGradient>
        <linearGradient id={`floor${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.floor} />
          <stop offset="100%" stopColor="#08090a" />
        </linearGradient>
        <radialGradient id={`lamp${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f3cd8f" stopOpacity={palette.warmth * 0.8} />
          <stop offset="100%" stopColor="#f3cd8f" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`curtain${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a2530" />
          <stop offset="100%" stopColor="#1a1118" />
        </linearGradient>
      </defs>

      <rect width="1600" height="900" fill={`url(#wall${uid})`} />
      <path d="M0 660 L1600 660 L1600 900 L0 900 Z" fill={`url(#floor${uid})`} />
      <path d="M0 656 L1600 656 L1600 668 L0 668 Z" fill="#0c0c0e" opacity="0.8" />

      {/* wall panelling */}
      <g stroke="#000" strokeOpacity="0.25" strokeWidth="2">
        {[120, 320, 520, 720, 920, 1120, 1320, 1520].map((x) => (
          <path key={x} d={`M${x} 120 V650`} />
        ))}
        <path d="M0 120 H1600 M0 90 H1600" />
      </g>

      {/* generic window light on the wall */}
      <ellipse cx="1180" cy="380" rx="240" ry="300" fill={`url(#lamp${uid})`} />

      {room === 'foyer' && (
        <>
          <g>
            <path d="M290 660 L290 300 C290 210 430 210 430 300 L430 660 Z" fill="#0b0c10" stroke="#2a2c33" strokeWidth="5" />
            <path d="M360 300 L360 660" stroke="#1a1c21" strokeWidth="4" />
            <circle cx="404" cy="500" r="6" fill={palette.accent} />
          </g>
          {/* staircase */}
          <g>
            <path d="M1030 660 L1030 320 L1420 430 L1420 660 Z" fill="#141519" />
            {Array.from({ length: 9 }).map((_, i) => (
              <path key={i} d={`M${1040 + i * 4} ${640 - i * 34} L${1410 - i * 2} ${640 - i * 34}`} stroke="#26272d" strokeWidth="6" />
            ))}
            <path d="M1080 640 L1000 300" stroke="#23242a" strokeWidth="10" />
            <path d="M1400 650 L1420 320" stroke="#23242a" strokeWidth="12" />
          </g>
          {/* chandelier */}
          <g stroke={palette.accent} strokeWidth="3" fill="none" opacity="0.85">
            <path d="M780 0 V200" />
            <path d="M660 200 H900" />
            <path d="M700 200 V260 M780 200 V280 M860 200 V260" />
          </g>
          <g fill="#e9c98f">
            {[700, 780, 860].map((x, i) => (
              <g key={x}>
                <circle cx={x} cy={270 + (i === 1 ? 20 : 0)} r="34" fill={`url(#lamp${uid})`} />
                <ellipse cx={x} cy={260 + (i === 1 ? 20 : 0)} rx="6" ry="14" fill="#f0d9a8" />
              </g>
            ))}
          </g>
          {/* clock */}
          <g>
            <rect x="120" y="420" width="120" height="240" fill="#17120f" stroke="#2e2621" strokeWidth="4" />
            <circle cx="180" cy="470" r="38" fill="#0e0c0a" stroke={palette.accent} strokeWidth="3" />
            <path d="M180 470 L180 446 M180 470 L196 478" stroke={palette.accent} strokeWidth="3" />
            <path d="M164 480 L196 480" stroke="#131110" strokeWidth="0" />
          </g>
          {/* mirror */}
          <g>
            <ellipse cx="620" cy="360" rx="90" ry="140" fill="#2a2f36" stroke={palette.accent} strokeWidth="4" />
            <ellipse cx="620" cy="360" rx="70" ry="118" fill="#1b2026" opacity="0.9" />
            <path d="M580 300 C610 330 600 400 630 430" stroke="#5b666e" strokeWidth="2" opacity="0.4" fill="none" />
          </g>
        </>
      )}

      {room === 'study' && (
        <>
          {/* window */}
          <g>
            <rect x="980" y="150" width="360" height="380" fill="#0b1017" stroke="#2a241e" strokeWidth="8" />
            <path d="M1160 150 V530 M980 340 H1340" stroke="#221d18" strokeWidth="6" />
            <path d="M990 160 L1190 500 M1020 160 L1210 480 M1300 160 L1110 500" stroke="#3a4650" strokeWidth="2" opacity="0.45" />
            <path d="M980 150 C1020 180 990 220 1040 250 C1080 274 1040 320 1080 350 C1120 380 1080 430 1120 460 C1150 484 1130 510 1160 530" stroke="#3b4650" strokeWidth="3" fill="none" opacity="0.35" />
            <path d="M960 140 C970 240 955 420 970 540 L1340 540 L1340 140 Z" fill="none" stroke="#3a2530" strokeWidth="20" opacity="0.65" />
          </g>
          {/* bookshelf */}
          <g>
            <rect x="90" y="180" width="300" height="470" fill="#17120f" stroke="#2b241d" strokeWidth="4" />
            {[0, 1, 2, 3, 4].map((row) => (
              <g key={row}>
                <path d={`M90 ${260 + row * 80} H390`} stroke="#2b241d" strokeWidth="8" />
                {Array.from({ length: 14 }).map((_, i) => (
                  <rect
                    key={i}
                    x={102 + i * 20}
                    y={204 + row * 80 + (i % 3) * 4}
                    width="14"
                    height={44 - (i % 4) * 5}
                    fill={['#3a3028', '#2c2b33', '#3d2a2c', '#33392f'][i % 4]}
                  />
                ))}
              </g>
            ))}
          </g>
          {/* desk */}
          <g>
            <path d="M560 600 L1180 600 L1220 660 L520 660 Z" fill="#241a12" stroke="#33251a" strokeWidth="4" />
            <path d="M600 660 L590 790 M1140 660 L1150 790 M700 660 L700 780 M1080 660 L1080 780" stroke="#1b140e" strokeWidth="16" />
            <rect x="700" y="520" width="220" height="80" rx="6" fill="#2a1f16" stroke="#3b2c1f" strokeWidth="3" />
            <path d="M720 540 H900 M720 562 H880" stroke="#4a3a2a" strokeWidth="3" opacity="0.6" />
            {/* lamp */}
            <path d="M1010 600 V500" stroke="#3c2f22" strokeWidth="6" />
            <path d="M960 500 L1060 500 L1040 460 L980 460 Z" fill="#3a2a1d" stroke={palette.accent} strokeWidth="2" />
            <circle cx="1010" cy="470" r="120" fill={`url(#lamp${uid})`} />
            {/* revolver + pool */}
            <ellipse cx="820" cy="760" rx="130" ry="40" fill="#170d0e" opacity="0.85" />
            <ellipse cx="835" cy="758" rx="86" ry="24" fill="#2a1113" opacity="0.9" />
            <g stroke="#16171a" strokeWidth="8" fill="none" transform="translate(880 715) rotate(-12)">
              <path d="M0 0 H78" />
              <path d="M60 0 V22 H40" />
              <path d="M4 -8 V8" />
            </g>
          </g>
          {/* chair */}
          <path d="M1240 660 C1230 520 1280 480 1350 470 C1420 480 1460 520 1450 660 L1400 660 L1380 590 L1310 590 L1290 660 Z" fill="#1d1512" stroke="#31241d" strokeWidth="4" />
        </>
      )}

      {room === 'drawing' && (
        <>
          {/* fireplace */}
          <g>
            <rect x="590" y="330" width="420" height="330" fill="#141012" stroke="#2e2529" strokeWidth="6" />
            <path d="M630 660 V420 C630 360 970 360 970 420 V660 Z" fill="#0a0809" />
            <path d="M680 660 C700 600 740 620 760 580 C780 620 820 600 840 650 Z" fill="#3a1c18" opacity="0.8" />
            <ellipse cx="780" cy="620" rx="170" ry="80" fill={`url(#lamp${uid})`} opacity="0.7" />
            <path d="M560 320 H1040" stroke="#2b2225" strokeWidth="14" />
            {/* portrait above */}
            <rect x="700" y="120" width="300" height="180" fill="#1c1518" stroke={palette.accent} strokeWidth="6" />
            <ellipse cx="850" cy="200" rx="36" ry="46" fill="#3a2b2c" />
            <path d="M780 300 C790 250 820 235 850 235 C880 235 910 250 920 300 Z" fill="#2d2226" />
            <ellipse cx="970" cy="240" rx="22" ry="28" fill="#3a2b2c" opacity="0.8" />
            <path d="M930 300 C938 268 950 258 970 258 C990 258 1002 268 1010 300 Z" fill="#2d2226" opacity="0.85" />
            <path d="M760 160 L900 250 M880 150 L760 260" stroke="#0d0a0b" strokeWidth="2" opacity="0.35" />
          </g>
          {/* armchairs */}
          <g fill="#231a1e" stroke="#33262a" strokeWidth="3">
            <path d="M180 660 C160 540 220 490 300 490 C380 490 430 540 410 660 Z" />
            <path d="M1150 660 C1130 540 1190 490 1270 490 C1350 490 1400 540 1380 660 Z" />
          </g>
          {/* piano */}
          <g>
            <path d="M1000 520 C1200 500 1330 530 1350 590 C1360 640 1180 660 1040 640 C980 630 970 560 1000 520 Z" fill="#151114" stroke="#2b2126" strokeWidth="4" />
            <path d="M1040 600 H1300" stroke="#d9d3c4" strokeWidth="8" opacity="0.75" />
            <path d="M1100 660 V740 M1280 650 V740" stroke="#120f11" strokeWidth="14" />
          </g>
        </>
      )}

      {room === 'dining' && (
        <>
          <g>
            <rect x="620" y="140" width="360" height="330" fill="#0b1118" stroke="#2b2720" strokeWidth="7" />
            <path d="M800 140 V470 M620 300 H980" stroke="#221e19" strokeWidth="5" />
            <path d="M640 160 L800 450 M680 160 L820 430 M940 160 L820 450" stroke="#39454f" strokeWidth="2" opacity="0.4" />
          </g>
          {/* chandelier */}
          <g stroke={palette.accent} strokeWidth="3" fill="none" opacity="0.8">
            <path d="M800 0 V170" />
            <path d="M700 170 H900" />
            <path d="M730 170 V230 M800 170 V250 M870 170 V230" />
          </g>
          <g fill="#f0d9a8">
            {[730, 800, 870].map((x, i) => (
              <ellipse key={x} cx={x} cy={236 + (i === 1 ? 18 : 0)} rx="6" ry="14" />
            ))}
          </g>
          {/* table */}
          <g>
            <path d="M380 600 L1220 560 L1280 760 L320 820 Z" fill="#201611" stroke="#33241a" strokeWidth="5" />
            <path d="M420 700 L1240 640" stroke="#33241a" strokeWidth="3" opacity="0.7" />
            {/* chairs */}
            <g fill="#1a1310" stroke="#2c2118" strokeWidth="3">
              <path d="M480 560 C470 430 520 400 570 400 C620 400 660 440 650 560 Z" />
              <path d="M900 545 C890 415 940 385 990 385 C1040 385 1080 425 1070 545 Z" />
              <path d="M1240 620 C1230 500 1280 470 1330 470 C1380 470 1420 510 1410 620 Z" />
            </g>
            {/* place settings */}
            {[520, 720, 920, 1120].map((x, i) => (
              <g key={x}>
                <ellipse cx={x} cy={640 - i * 6} rx="34" ry="14" fill="#2c2a26" opacity="0.9" />
                <path d={`M${x - 20} ${664 - i * 6} h40`} stroke="#c9c4b6" strokeWidth="3" opacity="0.65" />
                <ellipse cx={x + 6} cy={616 - i * 6} rx="7" ry="16" fill="#d8cba8" opacity="0.8" />
              </g>
            ))}
            {/* seventh place, head of table */}
            <ellipse cx="320" cy="730" rx="46" ry="18" fill="#2c2a26" />
            <path d="M280 756 h80" stroke="#B99A62" strokeWidth="3" opacity="0.8" />
            <path d="M306 700 q12 -30 30 0" stroke="#B99A62" strokeWidth="3" fill="none" />
          </g>
          {/* sideboard */}
          <g>
            <rect x="60" y="450" width="260" height="210" fill="#1c1410" stroke="#2e231a" strokeWidth="4" />
            <path d="M60 520 H320" stroke="#2e231a" strokeWidth="3" />
            <circle cx="140" cy="560" r="3" fill={palette.accent} />
            <circle cx="240" cy="560" r="3" fill={palette.accent} />
          </g>
        </>
      )}

      {room === 'library' && (
        <>
          {/* shelves */}
          {[0, 1].map((side) => (
            <g key={side} transform={side === 0 ? 'translate(0 0)' : 'translate(1600 0) scale(-1 1)'}>
              <rect x="40" y="80" width="380" height="580" fill="#17120e" stroke="#2b231b" strokeWidth="5" />
              {Array.from({ length: 7 }).map((_, row) => (
                <g key={row}>
                  <path d={`M40 ${160 + row * 74} H420`} stroke="#2b231b" strokeWidth="7" />
                  {Array.from({ length: 16 }).map((_, i) => (
                    <rect
                      key={i}
                      x={54 + i * 22}
                      y={112 + row * 74 + (i % 4) * 3}
                      width="16"
                      height={40 - (i % 5) * 4}
                      fill={['#3a3028', '#2b2c35', '#40292b', '#323a2e', '#3a3325'][i % 5]}
                    />
                  ))}
                </g>
              ))}
            </g>
          ))}
          {/* rug + chair */}
          <path d="M540 760 L1080 720 L1180 860 L460 880 Z" fill="#2a1b1e" opacity="0.8" />
          <path d="M600 760 C600 640 660 600 740 600 C820 600 870 650 870 760 Z" fill="#1c1614" stroke="#332720" strokeWidth="4" />
          <path d="M700 760 C700 700 730 680 760 680 C790 680 810 700 810 760" fill="#100d0c" opacity="0.7" />
          {/* ladder */}
          <g stroke="#3a2b1f" strokeWidth="7">
            <path d="M1220 660 L1300 120" />
            <path d="M1310 660 L1390 120" />
            {Array.from({ length: 8 }).map((_, i) => (
              <path key={i} d={`M${1238 - i * 2} ${610 - i * 66} L${1328 - i * 2} ${610 - i * 66}`} strokeWidth="5" />
            ))}
            <path d="M1220 660 H1400" strokeWidth="5" />
          </g>
          {/* fireplace */}
          <g>
            <rect x="960" y="470" width="220" height="200" fill="#0c0a0a" stroke="#2a2220" strokeWidth="5" />
            <ellipse cx="1070" cy="600" rx="70" ry="30" fill="#3a2218" opacity="0.7" />
          </g>
          {/* desk lamp glow */}
          <circle cx="640" cy="430" r="180" fill={`url(#lamp${uid})`} opacity="0.8" />
        </>
      )}

      {room === 'corridor' && (
        <>
          {/* perspective floor */}
          <path d="M0 900 L560 640 L1040 640 L1600 900 Z" fill="#141519" />
          <path d="M640 900 L700 650 L900 650 L960 900 Z" fill="#2a1c22" />
          <path d="M600 660 L1000 660" stroke="#0c0c0e" strokeWidth="4" />
          {/* doors */}
          {[0, 1, 2].map((i) => (
            <g key={i} opacity={1 - i * 0.18}>
              <rect x={120 + i * 80} y={300 + i * 24} width="150" height="360" fill="#121317" stroke="#2a2b31" strokeWidth="4" />
              <rect x={310 + i * 70} y={330 + i * 18} width="120" height="330" fill="#111216" stroke="#27282e" strokeWidth="3" />
            </g>
          ))}
          {/* portraits */}
          {[420, 560, 700].map((x, i) => (
            <g key={x}>
              <rect x={x + 240} y={200 + i * 14} width="110" height="150" fill="#20181b" stroke={palette.accent} strokeWidth="4" opacity={0.9 - i * 0.15} />
              <ellipse cx={x + 295} cy={250 + i * 14} rx="20" ry="26" fill="#3a2c2f" opacity={0.8 - i * 0.1} />
              <path d={`M${x + 260} ${334 + i * 14} C${x + 268} ${300 + i * 14} ${x + 280} ${292 + i * 14} ${x + 295} ${292 + i * 14} C${x + 310} ${292 + i * 14} ${x + 322} ${300 + i * 14} ${x + 330} ${334 + i * 14} Z`} fill="#2a1f22" opacity={0.8 - i * 0.1} />
            </g>
          ))}
          {/* sconces */}
          {[380, 1100].map((x) => (
            <g key={x}>
              <circle cx={x} cy={300} r="90" fill={`url(#lamp${uid})`} />
              <path d={`M${x} 340 V300`} stroke={palette.accent} strokeWidth="4" />
              <ellipse cx={x} cy={292} rx="8" ry="16" fill="#efd6a4" />
            </g>
          ))}
          {/* sealed door at the end */}
          <g>
            <rect x="710" y="430" width="180" height="260" fill="#0d0e11" stroke="#34353c" strokeWidth="6" />
            <rect x="720" y="440" width="160" height="240" fill="#101115" stroke="#2c2d33" strokeWidth="3" />
            <circle cx="760" cy="560" r="5" fill={palette.accent} />
            <path d="M700 430 H900" stroke="#1c1d22" strokeWidth="10" />
            <path d="M700 690 H900" stroke="#101115" strokeWidth="12" />
            <circle cx="800" cy="560" r="120" fill={`url(#lamp${uid})`} opacity="0.5" />
          </g>
        </>
      )}

      {room === 'sealed' && (
        <>
          {/* window with curtains */}
          <g>
            <rect x="640" y="140" width="320" height="340" fill="#0b0f15" stroke="#2c2620" strokeWidth="7" />
            <path d="M800 140 V480 M640 310 H960" stroke="#221d18" strokeWidth="5" />
            <path d="M660 160 L780 450 M700 160 L820 420 M940 160 L820 450" stroke="#3d4a54" strokeWidth="2" opacity="0.35" />
            <path d="M560 130 C600 220 575 380 610 500 L560 500 Z" fill={`url(#curtain${uid})`} />
            <path d="M1040 130 C1000 220 1025 380 990 500 L1040 500 Z" fill={`url(#curtain${uid})`} />
            <path d="M600 120 H1000" stroke="#3a2b24" strokeWidth="8" />
          </g>
          {/* bed */}
          <g>
            <path d="M150 640 L150 470 C150 440 190 430 230 430 L470 430 C510 430 530 448 530 480 L530 640 Z" fill="#211a1c" stroke="#3a2c2f" strokeWidth="4" />
            <path d="M150 520 H530" stroke="#453238" strokeWidth="3" opacity="0.7" />
            <ellipse cx="340" cy="470" rx="90" ry="30" fill="#3a3033" opacity="0.9" />
            <path d="M180 640 V720 M500 640 V720" stroke="#171113" strokeWidth="12" />
            {/* rabbit */}
            <g transform="translate(340 452)">
              <ellipse cx="0" cy="0" rx="18" ry="24" fill="#8d8175" />
              <ellipse cx="-8" cy="-24" rx="5" ry="18" fill="#8d8175" />
              <ellipse cx="8" cy="-22" rx="4" ry="16" fill="#8d8175" opacity="0.75" />
              <circle cx="-5" cy="-4" r="2" fill="#2a2222" />
              <circle cx="5" cy="-4" r="2" fill="#2a2222" />
              <path d="M-14 22 q14 10 28 0" stroke="#B99A62" strokeWidth="2" fill="none" />
            </g>
          </g>
          {/* wardrobe */}
          <g>
            <rect x="1130" y="260" width="280" height="400" fill="#1e1716" stroke="#352a26" strokeWidth="5" />
            <path d="M1270 260 V660" stroke="#352a26" strokeWidth="4" />
            <circle cx="1250" cy="470" r="4" fill={palette.accent} />
            <circle cx="1290" cy="470" r="4" fill={palette.accent} />
          </g>
          {/* washstand + mirror */}
          <g>
            <rect x="1010" y="540" width="100" height="120" fill="#241c19" stroke="#3a2d27" strokeWidth="3" />
            <ellipse cx="1060" cy="356" rx="58" ry="80" fill="#1c232a" stroke={palette.accent} strokeWidth="4" />
            <path d="M1040 300 C1056 340 1048 390 1064 410" stroke="#6b7a80" strokeWidth="2" fill="none" opacity="0.35" />
          </g>
          {/* dust motes */}
          <g fill="#e9e0d0" opacity="0.35">
            {Array.from({ length: 26 }).map((_, i) => (
              <circle key={i} cx={(i * 97) % 1500 + 60} cy={((i * 61) % 500) + 180} r={i % 3 === 0 ? 2 : 1} />
            ))}
          </g>
          <circle cx="800" cy="380" r="280" fill={`url(#lamp${uid})`} opacity="0.4" />
        </>
      )}

      {room === 'cellar' && (
        <>
          {/* arches */}
          <g fill="#0d0d0e" stroke="#242220" strokeWidth="5">
            <path d="M80 660 V380 C80 280 300 280 300 380 V660 Z" />
            <path d="M620 660 V360 C620 250 880 250 880 360 V660 Z" />
            <path d="M1200 660 V390 C1200 300 1420 300 1420 390 V660 Z" />
          </g>
          {/* wine racks */}
          <g>
            <rect x="340" y="300" width="240" height="360" fill="#161312" stroke="#2c2724" strokeWidth="4" />
            {Array.from({ length: 5 }).map((_, row) =>
              Array.from({ length: 5 }).map((__, col) => (
                <circle key={`${row}-${col}`} cx={372 + col * 44} cy={336 + row * 64} r="13" fill="#0c0b0b" stroke="#3a2f28" strokeWidth="2" />
              )),
            )}
          </g>
          {/* crates */}
          <g fill="#241a12" stroke="#3b2c1d" strokeWidth="3">
            <rect x="1190" y="520" width="170" height="140" />
            <rect x="1230" y="430" width="120" height="100" />
            <path d="M1190 560 H1360 M1190 610 H1360" stroke="#332516" strokeWidth="2" />
          </g>
          {/* boiler glow */}
          <g>
            <rect x="900" y="470" width="160" height="190" rx="12" fill="#1a1714" stroke="#332a20" strokeWidth="4" />
            <circle cx="980" cy="560" r="120" fill="#8a3a20" opacity="0.18" />
            <circle cx="980" cy="560" r="26" fill="#3a1a10" />
            <path d="M940 640 H1020" stroke="#2c2118" strokeWidth="8" />
          </g>
          {/* steps */}
          <g>
            <path d="M1420 660 L1600 660 L1600 300 L1520 300 Z" fill="#171615" />
            {Array.from({ length: 6 }).map((_, i) => (
              <path key={i} d={`M${1430 + i * 14} ${640 - i * 54} H${1600}`} stroke="#262422" strokeWidth="8" />
            ))}
          </g>
          <circle cx="980" cy="560" r="240" fill={`url(#lamp${uid})`} opacity="0.5" />
        </>
      )}

      {/* vignette */}
      <defs>
        <radialGradient id={`vignette${uid}`} cx="50%" cy="45%" r="75%">
          <stop offset="55%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.72" />
        </radialGradient>
      </defs>
      <rect width="1600" height="900" fill={`url(#vignette${uid})`} />
    </svg>
  );
}

export function GardenScene() {
  const uid = useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className="art-svg">
      <defs>
        <linearGradient id={`sky${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0b1018" />
          <stop offset="55%" stopColor="#1a2029" />
          <stop offset="100%" stopColor="#2a2b2c" />
        </linearGradient>
        <linearGradient id={`lawn${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#11171a" />
          <stop offset="100%" stopColor="#080b0a" />
        </linearGradient>
      </defs>
      <rect width="1600" height="900" fill={`url(#sky${uid})`} />
      <circle cx="300" cy="180" r="150" fill="#c4cbd0" opacity="0.12" />
      {/* distant manor */}
      <g opacity="0.75">
        <path d="M980 560 L980 330 L1120 330 L1120 560 Z" fill="#111318" />
        <path d="M1120 560 L1120 370 L1240 370 L1240 560 Z" fill="#111318" />
        <path d="M960 332 L1050 270 L1140 332 Z" fill="#0e1014" />
        <path d="M900 560 L900 400 L980 400 L980 560 Z" fill="#0f1116" />
        {[1000, 1060, 1150, 1200].map((x, i) => (
          <rect key={x} x={x} y={410 + (i % 2) * 50} width="22" height="34" fill={i === 1 ? '#c99a5e' : '#080a0d'} opacity={i === 1 ? 0.7 : 1} />
        ))}
      </g>
      {/* hedge line */}
      <path d="M0 570 C200 520 380 570 560 545 C760 518 900 560 1080 540 C1260 520 1420 560 1600 530 L1600 620 L0 620 Z" fill="#0d1411" />
      {/* lawn */}
      <path d="M0 610 L1600 590 L1600 900 L0 900 Z" fill={`url(#lawn${uid})`} />
      {/* path */}
      <path d="M700 610 C740 700 660 800 700 900 L940 900 C880 800 960 700 900 610 Z" fill="#15171a" opacity="0.9" />
      {/* rose bushes */}
      {[120, 260, 400, 1180, 1320, 1460].map((x, i) => (
        <g key={x}>
          <ellipse cx={x} cy={690 + (i % 3) * 18} rx="80" ry="52" fill="#101a13" />
          {[0, 1, 2, 3, 4].map((j) => (
            <circle key={j} cx={x - 40 + j * 20} cy={670 + (j % 2) * 22 + (i % 3) * 18} r="6" fill="#c9a24a" opacity="0.8" />
          ))}
        </g>
      ))}
      {/* east wing ruin, right */}
      <g>
        <path d="M1050 610 L1050 430 L1260 370 L1420 430 L1420 610 Z" fill="#0c0c0e" opacity="0.9" />
        <path d="M1080 430 L1260 390 L1400 430" stroke="#221f21" strokeWidth="8" fill="none" />
        <rect x="1110" y="460" width="60" height="80" fill="#060708" />
        <rect x="1220" y="460" width="60" height="80" fill="#060708" />
        <path d="M1260 610 L1300 430" stroke="#221f21" strokeWidth="8" />
      </g>
      {/* gravestone */}
      <g transform="translate(620 700)">
        <path d="M-30 40 L-30 -20 C-30 -50 30 -50 30 -20 L30 40 Z" fill="#33353a" stroke="#4a4d52" strokeWidth="2" />
        <path d="M-18 4 H16 M-14 14 H10" stroke="#23252a" strokeWidth="2" />
      </g>
      {/* yew hedge far left */}
      <path d="M0 700 C60 600 160 620 210 700 Z" fill="#0a120e" />
      {/* fog */}
      <g fill="#5c636a" opacity="0.1">
        <ellipse cx="500" cy="660" rx="420" ry="40" />
        <ellipse cx="1200" cy="690" rx="380" ry="46" />
      </g>
    </svg>
  );
}

export function Backdrop({ bg, className = '' }: BackdropProps) {
  const key = bg ?? 'manor_night';
  const rainy = RAINY.has(key);
  const roomKeys: RoomKind[] = [
    'foyer',
    'study',
    'drawing',
    'dining',
    'library',
    'corridor',
    'sealed',
    'cellar',
    'garden',
  ];

  return (
    <div className={`backdrop ${rainy ? 'backdrop--rain' : ''} ${className}`} aria-hidden="true">
      {key === 'eastwing' ? (
        <EastWingScene />
      ) : key === 'dawn' ? (
        <ManorScene dawn />
      ) : roomKeys.includes(key as RoomKind) ? (
        <RoomScene room={key as RoomKind} />
      ) : (
        <ManorScene />
      )}
      {rainy && <div className="rain-layer" />}
      {rainy && key !== 'dawn' && <div className="lightning-layer" />}
      <div className="backdrop-grain" />
    </div>
  );
}
