import { useId } from 'react';
import { CHARACTERS } from '../../game/characters';
import type { Mood, SpeakerId } from '../../game/types';

interface Props {
  id: SpeakerId;
  mood?: Mood;
  className?: string;
  /** dims the portrait for characters who are not speaking */
  dim?: boolean;
}

const MOOD_BROW: Record<Mood, { left: string; right: string; mouth: string }> = {
  calm: { left: 'M78 112 q10 -4 20 0', right: 'M122 112 q10 4 20 0', mouth: 'M92 152 q16 3 30 0' },
  cold: { left: 'M78 110 q12 -2 20 4', right: 'M122 114 q8 -6 20 -4', mouth: 'M94 154 q14 -2 26 1' },
  warm: { left: 'M78 113 q10 -6 20 -1', right: 'M122 112 q10 -5 20 -1', mouth: 'M92 150 q16 9 30 -1' },
  angry: { left: 'M78 108 q10 -1 20 7', right: 'M122 115 q10 -8 20 -7', mouth: 'M93 156 q14 -5 26 0' },
  sad: { left: 'M78 114 q10 -7 20 -2', right: 'M122 112 q10 -5 20 -2', mouth: 'M93 155 q15 -6 28 1' },
  fear: { left: 'M78 106 q10 -2 20 2', right: 'M122 108 q10 0 20 0', mouth: 'M96 154 q11 4 21 -1' },
  smirk: { left: 'M78 112 q10 -3 20 3', right: 'M122 115 q10 -9 20 -4', mouth: 'M92 152 q16 6 31 -4' },
  broken: { left: 'M78 112 q10 -8 20 -3', right: 'M122 109 q10 -6 20 -2', mouth: 'M93 157 q14 -8 28 0' },
};

export function Portrait({ id, mood = 'calm', className = '', dim = false }: Props) {
  const uid = useId().replace(/:/g, '');
  const character = CHARACTERS[id];
  if (!character || id === 'narrator' || id === 'voice') {
    return <div className={`portrait portrait--empty ${className}`} aria-hidden="true" />;
  }
  const spec = character.portrait;
  const brow = MOOD_BROW[mood];
  const isChild = id === 'evelyn';
  const isMara = id === 'mara';

  const hair = () => {
    switch (spec.hairStyle) {
      case 'updo':
        return (
          <>
            <ellipse cx="110" cy="86" rx="44" ry="36" fill={spec.hair} />
            <ellipse cx="110" cy="58" rx="25" ry="20" fill={spec.hair} />
            <ellipse cx="82" cy="76" rx="13" ry="18" fill={spec.hair} />
            <ellipse cx="138" cy="76" rx="13" ry="18" fill={spec.hair} />
          </>
        );
      case 'loose':
        return (
          <>
            <path d="M64 108 C58 56 80 36 110 36 C142 36 162 58 156 108 L166 210 L130 198 L128 120 L92 120 L90 198 L54 210 Z" fill={`url(#hair${uid})`} />
            <path d="M78 96 C82 60 96 46 110 46 C128 46 142 62 144 96 C132 76 120 70 110 70 C98 70 86 78 78 96 Z" fill={spec.hair} />
            <path d="M76 92 C84 58 98 48 112 48" stroke={spec.accent} strokeWidth="1.4" fill="none" opacity="0.35" />
          </>
        );
      case 'bob':
        return (
          <>
            <path d="M68 104 C60 58 82 38 110 38 C140 38 160 58 154 104 L160 150 L142 144 L136 96 L86 96 L80 144 L60 150 Z" fill={`url(#hair${uid})`} />
            <path d="M84 92 C88 62 96 50 110 50 C126 50 136 64 138 92 C128 78 120 74 110 74 C99 74 90 80 84 92 Z" fill={spec.hair} />
            <path d="M82 88 C88 60 98 52 112 52" stroke={spec.accent} strokeWidth="1.3" fill="none" opacity="0.3" />
          </>
        );
      case 'braid':
        return (
          <>
            <ellipse cx="110" cy="82" rx="42" ry="34" fill={spec.hair} />
            <path d="M142 96 C152 120 150 150 142 176" stroke={spec.hair} strokeWidth="12" fill="none" strokeLinecap="round" />
            <path d="M144 128 l8 6 M141 146 l8 5 M139 164 l8 5" stroke={spec.accent} strokeWidth="2" opacity="0.5" />
          </>
        );
      case 'short':
        return (
          <>
            <path d="M72 100 C66 62 86 42 110 42 C136 42 154 60 150 100 C144 78 132 66 110 66 C90 66 78 78 72 100 Z" fill={spec.hair} />
            <path d="M70 88 C72 74 76 66 82 60" stroke={spec.hair} strokeWidth="8" fill="none" strokeLinecap="round" />
          </>
        );
      case 'slick':
        return (
          <>
            <path d="M70 96 C68 58 88 40 112 40 C140 40 156 60 152 96 C144 72 132 62 110 62 C92 62 78 74 70 96 Z" fill={spec.hair} />
            <path d="M74 78 C86 58 102 50 122 52" stroke="#59524b" strokeWidth="2" fill="none" opacity="0.5" />
          </>
        );
      case 'bald':
        return (
          <path d="M74 110 C72 92 82 82 98 80 M146 110 C148 92 138 82 124 80" stroke={spec.hair} strokeWidth="9" strokeLinecap="round" fill="none" opacity="0.85" />
        );
      default:
        return null;
    }
  };

  return (
    <div className={`portrait ${dim ? 'portrait--dim' : ''} ${className}`}>
      <svg viewBox="0 0 220 260" role="img" aria-label={`Portrait of ${character.name}`}>
        <defs>
          <radialGradient id={`aura${uid}`} cx="50%" cy="38%" r="62%">
            <stop offset="0%" stopColor={spec.aura} stopOpacity="0.55" />
            <stop offset="70%" stopColor={spec.aura} stopOpacity="0.12" />
            <stop offset="100%" stopColor="#101014" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`cloth${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={spec.clothing} />
            <stop offset="70%" stopColor={spec.clothing} />
            <stop offset="100%" stopColor="#0a0d10" />
          </linearGradient>
          <linearGradient id={`skin${uid}`} x1="0.2" y1="0" x2="0.9" y2="1">
            <stop offset="0%" stopColor="#f4dbc9" />
            <stop offset="45%" stopColor={spec.skin} />
            <stop offset="100%" stopColor="#8c6252" />
          </linearGradient>
          <linearGradient id={`hair${uid}`} x1="0" y1="0" x2="0.6" y2="1">
            <stop offset="0%" stopColor={spec.hair} />
            <stop offset="100%" stopColor="#0d0b0b" />
          </linearGradient>
          <linearGradient id={`fade${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#121319" stopOpacity="0" />
            <stop offset="100%" stopColor="#121319" stopOpacity="0.85" />
          </linearGradient>
          <radialGradient id={`bg${uid}`} cx="50%" cy="38%" r="62%">
            <stop offset="0%" stopColor="#2b2d38" stopOpacity="0.9" />
            <stop offset="62%" stopColor="#1a1c24" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#121319" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="220" height="260" fill={`url(#bg${uid})`} />
        <rect width="220" height="260" fill={`url(#aura${uid})`} />
        <ellipse cx="112" cy="118" rx="80" ry="98" fill={spec.accent} opacity="0.06" />

        {/* shoulders and coat */}
        <path
          d="M28 260 C30 204 62 178 96 170 L124 170 C158 178 190 204 192 260 Z"
          fill={`url(#cloth${uid})`}
        />
        <path d="M96 170 L110 214 L124 170 C120 188 100 188 96 170 Z" fill="#0d0d10" opacity="0.75" />
        <path d="M86 176 C92 196 96 228 96 260" stroke={spec.accent} strokeWidth="1" opacity="0.35" fill="none" />
        <path d="M134 176 C128 200 124 230 124 260" stroke={spec.accent} strokeWidth="1" opacity="0.35" fill="none" />

        {/* neck */}
        <path d="M96 148 L96 176 C104 184 116 184 124 176 L124 148 Z" fill={`url(#skin${uid})`} />
        <path d="M96 148 L96 176 C104 184 116 184 124 176 L124 148 Z" fill="#3a2620" opacity="0.35" />

        {/* head */}
        <ellipse cx="110" cy="112" rx={isChild ? 40 : 42} ry={isChild ? 46 : 50} fill={`url(#skin${uid})`} />
        <ellipse cx="110" cy="112" rx={isChild ? 40 : 42} ry={isChild ? 46 : 50} fill="none" stroke="#2a1e1a" strokeOpacity="0.45" strokeWidth="1.2" />
        <path d="M86 96 C98 84 124 84 136 98" stroke="#4a3128" strokeWidth="2" fill="none" opacity="0.35" />

        {hair()}

        {/* shadow side */}
        <path
          d="M110 62 C76 62 66 92 68 120 C69 142 78 158 92 166 C82 148 80 126 86 106 C92 86 100 72 110 62 Z"
          fill="#241a17"
          opacity="0.42"
        />
        <path d="M84 156 C96 166 124 166 136 156 C132 176 118 184 110 184 C102 184 88 176 84 156 Z" fill="#4a322a" opacity="0.3" />

        {/* eyes */}
        <path d="M88 120 Q94 116.5 100 120" stroke="#2b1d1a" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        <path d="M120 120 Q126 116.5 132 120" stroke="#2b1d1a" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        <circle cx="94.5" cy="119.4" r="1.5" fill="#1a1412" />
        <circle cx="125.5" cy="119.4" r="1.5" fill="#1a1412" />
        <circle cx="95.1" cy="118.8" r="0.7" fill="#fff6e6" opacity="0.85" />
        <circle cx="126.1" cy="118.8" r="0.7" fill="#fff6e6" opacity="0.85" />

        {/* brows */}
        <path d={brow.left} stroke="#3a2620" strokeWidth="2.2" fill="none" strokeLinecap="round" opacity="0.9" />
        <path d={brow.right} stroke="#3a2620" strokeWidth="2.2" fill="none" strokeLinecap="round" opacity="0.9" />

        {/* nose + mouth */}
        <path d="M109 126 L106 138 L113 139" stroke="#7a5244" strokeWidth="1.3" fill="none" strokeLinecap="round" opacity="0.6" />
        <path d={brow.mouth} stroke="#6e3531" strokeWidth="2.1" fill="none" strokeLinecap="round" opacity="0.9" />
        <path d="M90 132 C88 140 89 147 93 152" stroke="#7a5244" strokeWidth="4" opacity="0.2" fill="none" />

        {/* rim light */}
        <path d="M150 92 C158 116 156 144 148 158" stroke={spec.accent} strokeWidth="2.6" opacity="0.7" fill="none" />
        <path d="M70 96 C62 118 64 142 72 156" stroke={spec.accent} strokeWidth="1.2" opacity="0.28" fill="none" />
        <path d="M40 250 C44 212 64 188 92 176" stroke={spec.accent} strokeWidth="1.4" opacity="0.4" fill="none" />

        {/* accessories */}
        {spec.accessory === 'glasses' && (
          <g stroke={spec.accent} strokeWidth="1.4" fill="none" opacity="0.8">
            <circle cx="94" cy="120" r="13" />
            <circle cx="126" cy="120" r="13" />
            <path d="M107 120 h6 M81 118 l-9 -3 M139 118 l9 -3" />
          </g>
        )}
        {spec.accessory === 'pearls' && (
          <g fill="#e7dfd2" opacity="0.85">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <circle key={i} cx={92 + i * 5} cy={182 + Math.sin(i) * 3} r="2.1" />
            ))}
          </g>
        )}
        {spec.accessory === 'cigarette' && (
          <g>
            <rect x="134" y="148" width="26" height="3" rx="1.5" fill="#e9e0d0" opacity="0.9" />
            <circle cx="160" cy="149.5" r="2" fill="#d2793c" />
            <path d="M162 146 C168 138 164 132 168 126" stroke="#99969A" strokeWidth="1" fill="none" opacity="0.4" />
          </g>
        )}
        {spec.accessory === 'camera' && (
          <g>
            <rect x="66" y="196" width="34" height="24" rx="4" fill="#17171b" stroke={spec.accent} strokeWidth="1" opacity="0.9" />
            <circle cx="83" cy="208" r="7" fill="#0b0b0e" stroke={spec.accent} strokeWidth="1.2" />
            <circle cx="84" cy="207" r="2.4" fill="#8fa3a8" opacity="0.7" />
          </g>
        )}
        {spec.accessory === 'watch' && (
          <g opacity="0.9">
            <path d="M150 232 l4 -3" stroke={spec.accent} strokeWidth="1" />
            <circle cx="152" cy="238" r="7" fill="none" stroke={spec.accent} strokeWidth="1.2" />
            <path d="M152 238 v-4 M152 238 l3 2" stroke={spec.accent} strokeWidth="1" />
          </g>
        )}

        {isMara && (
          <g opacity="0.55">
            <path d="M84 176 C80 200 80 230 82 258" stroke="#0b0b0e" strokeWidth="2" fill="none" />
            <path d="M136 176 C140 202 140 232 138 258" stroke="#0b0b0e" strokeWidth="2" fill="none" />
          </g>
        )}
        {isChild && (
          <path d="M70 156 C74 166 80 172 88 176" stroke={spec.accent} strokeWidth="1.6" fill="none" opacity="0.6" />
        )}

        {/* base fade */}
        <rect y="214" width="220" height="46" fill={`url(#fade${uid})`} />
      </svg>
    </div>
  );
}
