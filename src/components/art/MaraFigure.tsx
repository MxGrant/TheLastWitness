interface Props {
  className?: string;
  side?: 'left' | 'right';
}

/** Third-person framing: Mara, seen from behind, in the foreground of a scene. */
export function MaraFigure({ className = '', side = 'left' }: Props) {
  return (
    <div className={`mara-figure mara-figure--${side} ${className}`} aria-hidden="true">
      <svg viewBox="0 0 240 460">
        <defs>
          <linearGradient id="coatGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1a2226" />
            <stop offset="60%" stopColor="#11161a" />
            <stop offset="100%" stopColor="#07090b" />
          </linearGradient>
          <linearGradient id="hairGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2b2220" />
            <stop offset="100%" stopColor="#120e0d" />
          </linearGradient>
        </defs>
        {/* coat */}
        <path
          d="M62 456 C48 360 54 268 76 224 C86 202 100 192 120 190 C140 192 154 202 164 224 C186 268 192 360 178 456 Z"
          fill="url(#coatGrad)"
        />
        <path d="M120 190 L120 456" stroke="#B99A62" strokeWidth="1" opacity="0.2" />
        <path d="M86 214 C78 280 76 360 80 456" stroke="#B99A62" strokeWidth="1.2" opacity="0.28" fill="none" />
        <path d="M154 214 C162 280 164 360 160 456" stroke="#B99A62" strokeWidth="1.2" opacity="0.4" fill="none" />
        {/* collar */}
        <path d="M94 196 C104 214 136 214 146 196 L156 218 C136 232 104 232 84 218 Z" fill="#0b0e11" />
        {/* neck */}
        <path d="M108 162 L108 198 C114 204 126 204 132 198 L132 162 Z" fill="#7a5c4e" />
        {/* head, back view */}
        <ellipse cx="120" cy="128" rx="34" ry="40" fill="#211a18" />
        <path d="M88 138 C84 96 100 76 120 76 C140 76 156 96 152 138 L156 206 C150 222 140 230 120 230 C100 230 90 222 84 206 Z" fill="url(#hairGrad)" />
        <path d="M96 112 C104 96 110 90 120 90 C130 90 136 96 144 112" stroke="#453632" strokeWidth="2" opacity="0.5" fill="none" />
        {/* shoulder bag strap */}
        <path d="M150 220 L96 330 L110 338 L166 232 Z" fill="#171210" stroke="#2c211c" strokeWidth="2" />
        <rect x="88" y="330" width="46" height="40" rx="4" fill="#221a16" stroke="#3a2c23" strokeWidth="2" />
        <path d="M100 348 H124" stroke="#B99A62" strokeWidth="1.5" opacity="0.6" />
        {/* umbrella */}
        <path d="M170 456 L188 180" stroke="#2a2a2e" strokeWidth="4" />
        <path d="M188 186 C170 150 206 142 216 178 C220 160 210 146 196 148" stroke="#1b1b1f" strokeWidth="3" fill="none" opacity="0.8" />
      </svg>
    </div>
  );
}
