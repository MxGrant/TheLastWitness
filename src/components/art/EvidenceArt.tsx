import { useId } from 'react';
import type { EvidenceArtKind } from '../../game/types';

interface Props {
  kind: EvidenceArtKind;
  className?: string;
}

export function EvidenceArt({ kind, className = '' }: Props) {
  const uid = useId().replace(/:/g, '');
  const paper = '#ddd2b8';
  const ink = '#2a2620';
  const sepia = '#a68a62';

  const content = () => {
    switch (kind) {
      case 'invitation':
        return (
          <>
            <rect x="60" y="26" width="100" height="100" rx="3" fill={paper} transform="rotate(-2 110 76)" />
            <rect x="74" y="40" width="72" height="2" fill={ink} opacity="0.4" />
            <rect x="74" y="50" width="52" height="2" fill={ink} opacity="0.3" />
            <circle cx="132" cy="106" r="14" fill="#551F2C" />
            <circle cx="132" cy="106" r="10" fill="none" stroke="#B99A62" strokeWidth="1" opacity="0.8" />
            <text x="132" y="111" textAnchor="middle" fontFamily="Georgia, serif" fontSize="13" fill="#B99A62">
              B
            </text>
          </>
        );
      case 'photo':
        return (
          <>
            <rect x="44" y="30" width="132" height="94" fill="#241d16" />
            <rect x="52" y="38" width="116" height="76" fill="#8d7654" />
            <rect x="52" y="38" width="116" height="76" fill={`url(#grain-${uid})`} opacity="0.35" />
            <ellipse cx="110" cy="96" rx="38" ry="8" fill="#5d4a33" opacity="0.7" />
            <circle cx="110" cy="62" r="12" fill="#4b3a29" />
            <path d="M92 102 C94 82 100 74 110 74 C120 74 126 82 128 102 Z" fill="#4b3a29" />
            <path d="M84 40 L136 112" stroke="#e8dcc0" strokeWidth="2" opacity="0.25" />
          </>
        );
      case 'letter':
        return (
          <>
            <rect x="50" y="34" width="120" height="92" fill={paper} transform="rotate(1 110 80)" />
            <path d="M50 34 L110 82 L170 34" fill="none" stroke="#b7a888" strokeWidth="2" />
            {[52, 62, 72, 82, 92].map((y) => (
              <path key={y} d={`M64 ${y} H150`} stroke={ink} strokeWidth="2" opacity="0.35" />
            ))}
            <circle cx="112" cy="98" r="11" fill="#6a2b33" opacity="0.9" />
          </>
        );
      case 'document':
        return (
          <>
            <rect x="54" y="24" width="112" height="104" fill={paper} />
            {Array.from({ length: 8 }).map((_, i) => (
              <path key={i} d={`M66 ${40 + i * 11} H${i === 6 ? 118 : 154}`} stroke={ink} strokeWidth="2" opacity="0.3" />
            ))}
            <rect x="118" y="96" width="46" height="24" fill="none" stroke="#6a2b33" strokeWidth="2" transform="rotate(-8 141 108)" />
            <text x="141" y="112" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="8" fill="#6a2b33" transform="rotate(-8 141 108)">
              FILED
            </text>
          </>
        );
      case 'certificate':
        return (
          <>
            <rect x="48" y="24" width="124" height="104" fill="#e3d8bf" stroke="#b8a988" strokeWidth="2" />
            <rect x="56" y="32" width="108" height="88" fill="none" stroke="#8c7a58" strokeWidth="1" />
            <text x="110" y="52" textAnchor="middle" fontFamily="Georgia, serif" fontSize="10" fill={ink}>
              CERTIFICATE
            </text>
            {[66, 76, 86, 96].map((y) => (
              <path key={y} d={`M74 ${y} H146`} stroke={ink} strokeWidth="2" opacity="0.25" />
            ))}
            <circle cx="140" cy="104" r="14" fill="none" stroke="#8c3d46" strokeWidth="2" />
            <circle cx="140" cy="104" r="9" fill="none" stroke="#8c3d46" strokeWidth="1" />
          </>
        );
      case 'weapon':
        return (
          <g transform="translate(26 44)">
            <path d="M20 46 H130" stroke="#3b3d42" strokeWidth="12" strokeLinecap="round" />
            <path d="M42 46 C42 70 70 74 74 50" fill="none" stroke="#3b3d42" strokeWidth="12" />
            <path d="M42 46 L58 86" stroke="#2b2d31" strokeWidth="14" strokeLinecap="round" />
            <circle cx="94" cy="46" r="18" fill="none" stroke="#5a5d63" strokeWidth="8" />
            <circle cx="94" cy="46" r="6" fill="#B99A62" opacity="0.5" />
            <path d="M74 46 H84" stroke="#5a5d63" strokeWidth="6" />
          </g>
        );
      case 'key':
        return (
          <g transform="translate(50 46)" stroke="#B99A62" strokeWidth="5" fill="none">
            <circle cx="34" cy="34" r="18" />
            <path d="M52 40 H130 M112 40 V58 M126 40 V54" />
            <circle cx="34" cy="34" r="6" fill="#B99A62" opacity="0.35" />
          </g>
        );
      case 'tape':
        return (
          <>
            <rect x="48" y="42" width="124" height="76" rx="6" fill="#22201f" stroke="#454140" strokeWidth="2" />
            <rect x="64" y="56" width="92" height="34" rx="4" fill="#151413" />
            <circle cx="86" cy="73" r="11" fill="none" stroke="#B99A62" strokeWidth="2" />
            <circle cx="134" cy="73" r="11" fill="none" stroke="#B99A62" strokeWidth="2" />
            <path d="M86 73 H134" stroke="#574c3a" strokeWidth="2" />
            <path d="M64 100 H156" stroke="#3d3938" strokeWidth="4" />
          </>
        );
      case 'locket':
        return (
          <g>
            <path d="M70 26 C80 10 140 10 150 26" stroke="#B99A62" strokeWidth="2" fill="none" />
            <path d="M110 26 V44" stroke="#B99A62" strokeWidth="2" />
            <ellipse cx="110" cy="84" rx="38" ry="42" fill="#4a3a28" stroke="#B99A62" strokeWidth="4" />
            <ellipse cx="110" cy="84" rx="28" ry="32" fill="#2a2118" />
            <path d="M104 84 C104 72 116 72 116 84 C116 94 104 94 104 84 Z" fill="#B99A62" opacity="0.45" />
            <circle cx="110" cy="44" r="4" fill="#B99A62" />
          </g>
        );
      case 'diary':
        return (
          <>
            <path d="M62 32 L152 24 L160 112 L70 120 Z" fill="#3a2a2a" stroke="#584040" strokeWidth="3" />
            <path d="M70 120 L70 34" stroke="#B99A62" strokeWidth="2" opacity="0.5" />
            <path d="M86 44 L144 40 M86 56 L140 52 M86 68 L146 64" stroke="#c9bfa8" strokeWidth="2" opacity="0.4" />
            <rect x="132" y="28" width="10" height="26" fill="#B99A62" opacity="0.55" />
            <path d="M64 118 L158 110" stroke="#241a1a" strokeWidth="6" />
          </>
        );
      case 'glass':
        return (
          <>
            <ellipse cx="110" cy="82" rx="60" ry="34" fill="#2a1215" />
            <ellipse cx="110" cy="80" rx="44" ry="23" fill="#3d171b" />
            <ellipse cx="98" cy="76" rx="12" ry="6" fill="#5a2a2c" opacity="0.55" />
            <path d="M60 92 C74 104 146 104 160 92" stroke="#4a2226" strokeWidth="2" fill="none" opacity="0.6" />
            <path d="M150 62 L166 40 M156 66 L172 46" stroke="#8a9aa2" strokeWidth="2" opacity="0.4" />
          </>
        );
      case 'ledger':
        return (
          <>
            <path d="M52 40 L110 32 L168 40 L168 112 L110 120 L52 112 Z" fill="#31251c" stroke="#4a3a2c" strokeWidth="3" />
            <path d="M110 32 V120" stroke="#B99A62" strokeWidth="2" opacity="0.4" />
            {Array.from({ length: 6 }).map((_, i) => (
              <g key={i}>
                <path d={`M64 ${48 + i * 11} H100`} stroke="#cbbfa4" strokeWidth="1.5" opacity="0.4" />
                <path d={`M122 ${48 + i * 11} H156`} stroke="#cbbfa4" strokeWidth="1.5" opacity="0.4" />
              </g>
            ))}
          </>
        );
      case 'watch':
        return (
          <g>
            <circle cx="110" cy="78" r="42" fill="#2c2620" stroke="#B99A62" strokeWidth="4" />
            <circle cx="110" cy="78" r="33" fill="#1a1714" />
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i / 12) * Math.PI * 2;
              return (
                <line
                  key={i}
                  x1={110 + Math.sin(angle) * 26}
                  y1={78 - Math.cos(angle) * 26}
                  x2={110 + Math.sin(angle) * 30}
                  y2={78 - Math.cos(angle) * 30}
                  stroke="#B99A62"
                  strokeWidth="1.5"
                  opacity="0.7"
                />
              );
            })}
            <path d="M110 78 V56 M110 78 L128 86" stroke="#e0d5bd" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M110 36 V20" stroke="#B99A62" strokeWidth="4" />
            <circle cx="110" cy="18" r="5" fill="#B99A62" />
          </g>
        );
      case 'musicbox':
        return (
          <>
            <rect x="52" y="56" width="116" height="64" rx="4" fill="#4a2e24" stroke="#6a4634" strokeWidth="3" />
            <path d="M52 74 H168" stroke="#B99A62" strokeWidth="2" opacity="0.5" />
            <circle cx="150" cy="96" r="9" fill="#B99A62" opacity="0.6" />
            <path d="M60 56 C70 34 150 34 160 56" fill="#5a3a2c" stroke="#6a4634" strokeWidth="2" />
            <g stroke="#d9c9a3" strokeWidth="2" fill="none" opacity="0.7">
              <path d="M86 28 V16 M94 26 V10 M102 28 V16" />
              <circle cx="86" cy="28" r="3" fill="#d9c9a3" />
              <circle cx="94" cy="26" r="3" fill="#d9c9a3" />
              <circle cx="102" cy="28" r="3" fill="#d9c9a3" />
            </g>
          </>
        );
      case 'doll':
        return (
          <g>
            <circle cx="110" cy="52" r="22" fill="#b6a08a" />
            <path d="M88 46 C88 24 132 24 132 46 C124 34 96 34 88 46 Z" fill="#5f4636" />
            <path d="M92 96 C92 76 100 70 110 70 C120 70 128 76 128 96 L140 126 L80 126 Z" fill="#6a4a52" />
            <path d="M80 126 L72 150 M140 126 L148 150 M98 126 L94 152 M122 126 L126 152" stroke="#8a6a52" strokeWidth="6" strokeLinecap="round" />
            <circle cx="103" cy="50" r="2.2" fill="#2a2222" />
            <circle cx="117" cy="50" r="2.2" fill="#2a2222" />
            <path d="M104 60 q6 4 12 0" stroke="#7a4a44" strokeWidth="1.6" fill="none" />
            <path d="M92 120 H128" stroke="#B99A62" strokeWidth="1.5" opacity="0.8" />
          </g>
        );
      case 'newspaper':
        return (
          <>
            <rect x="42" y="28" width="136" height="100" fill="#c8bda3" transform="rotate(-1 110 78)" />
            <text x="110" y="48" textAnchor="middle" fontFamily="Georgia, serif" fontSize="11" fill={ink}>
              THE COUNTY HERALD
            </text>
            <path d="M54 54 H166" stroke={ink} strokeWidth="1.5" opacity="0.6" />
            <path d="M54 62 H120 M54 68 H166 M54 74 H166 M54 80 H150 M54 86 H166 M54 92 H132" stroke={ink} strokeWidth="2" opacity="0.3" />
            <path d="M136 98 L164 98 L164 122 L136 122 Z" fill="#8d7654" opacity="0.7" />
          </>
        );
      case 'note':
        return (
          <>
            <path d="M56 30 L164 34 L160 108 L84 116 L56 96 Z" fill={paper} />
            <path d="M84 116 L92 96 L108 100 L100 118 Z" fill={paper} />
            {[48, 58, 68, 78].map((y) => (
              <path key={y} d={`M68 ${y} H150`} stroke={ink} strokeWidth="2.5" opacity="0.4" />
            ))}
            <path d="M68 88 H118" stroke={ink} strokeWidth="2.5" opacity="0.4" />
          </>
        );
      case 'ring':
        return (
          <g>
            <circle cx="110" cy="86" r="32" fill="none" stroke="#B99A62" strokeWidth="6" />
            <path d="M110 48 L124 62 L110 76 L96 62 Z" fill="#5a2a30" stroke="#B99A62" strokeWidth="2" />
            <path d="M96 54 L124 54" stroke="#e0d5bd" strokeWidth="1" opacity="0.6" />
          </g>
        );
      default:
        return <rect x="60" y="40" width="100" height="80" fill={paper} />;
    }
  };

  return (
    <div className={`evidence-art ${className}`}>
      <svg viewBox="0 0 220 160" role="img" aria-label={`Illustration of ${kind}`}>
        <defs>
          <pattern id={`grain-${uid}`} width="4" height="4" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.6" fill="#3a3128" opacity="0.5" />
          </pattern>
          <linearGradient id={`bg${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1c1b20" />
            <stop offset="100%" stopColor="#111114" />
          </linearGradient>
          <radialGradient id={`glow${uid}`} cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor={sepia} stopOpacity="0.16" />
            <stop offset="100%" stopColor={sepia} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="220" height="160" fill={`url(#bg${uid})`} />
        <rect width="220" height="160" fill={`url(#glow${uid})`} />
        <rect width="220" height="160" fill={`url(#grain-${uid})`} opacity="0.5" />
        {content()}
        <rect x="4" y="4" width="212" height="152" fill="none" stroke="#B99A62" strokeOpacity="0.28" />
      </svg>
    </div>
  );
}
