import React from 'react';

interface ArtworkProps {
  artworkId: 'restaurant' | 'resume' | 'arduino' | 'interview' | 'portfolio';
  className?: string;
}

export const ProjectArtwork: React.FC<ArtworkProps> = ({artworkId, className = ''}) => {
  switch (artworkId) {
    case 'restaurant':
      return (
        <div className={`relative h-full w-full overflow-hidden bg-[#12100f] ${className}`}>
          <div
            className="absolute inset-0 opacity-70"
            style={{
              background:
                'radial-gradient(circle at 75% 25%, rgba(255,87,34,0.28), transparent 58%), radial-gradient(circle at 20% 85%, rgba(198,40,40,0.22), transparent 55%)',
            }}
          />
          <svg
            viewBox="0 0 400 280"
            className="h-full w-full"
            role="img"
            aria-label="Online Restaurant Food Application visual preview"
          >
            <rect x="24" y="22" width="352" height="236" rx="14" fill="#181514" stroke="rgba(255,255,255,0.12)" />
            <rect x="42" y="40" width="90" height="10" rx="5" fill="#FF5722" fillOpacity="0.85" />
            <rect x="280" y="38" width="76" height="14" rx="7" fill="rgba(255,255,255,0.08)" />
            <rect x="42" y="68" width="190" height="16" rx="4" fill="#FFFFFF" fillOpacity="0.9" />
            <rect x="42" y="92" width="140" height="8" rx="4" fill="#A3A3A3" fillOpacity="0.5" />
            {/* Menu cards */}
            <rect x="42" y="120" width="96" height="116" rx="10" fill="#211c1a" stroke="rgba(255,255,255,0.1)" />
            <circle cx="90" cy="158" r="22" fill="#FF5722" fillOpacity="0.22" stroke="#FF5722" strokeWidth="1.5" />
            <circle cx="90" cy="158" r="10" fill="#FF5722" fillOpacity="0.8" />
            <rect x="54" y="192" width="72" height="7" rx="3.5" fill="#FFFFFF" fillOpacity="0.8" />
            <rect x="64" y="206" width="52" height="6" rx="3" fill="#A3A3A3" fillOpacity="0.5" />

            <rect x="152" y="120" width="96" height="116" rx="10" fill="#211c1a" stroke="rgba(255,255,255,0.1)" />
            <circle cx="200" cy="158" r="22" fill="#C62828" fillOpacity="0.24" stroke="#FF5722" strokeWidth="1.2" />
            <path d="M189 158h22M200 147v22" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
            <rect x="164" y="192" width="72" height="7" rx="3.5" fill="#FFFFFF" fillOpacity="0.8" />
            <rect x="174" y="206" width="52" height="6" rx="3" fill="#A3A3A3" fillOpacity="0.5" />

            {/* Order Drawer */}
            <rect x="262" y="72" width="96" height="164" rx="10" fill="#111111" stroke="rgba(255,87,34,0.35)" />
            <rect x="276" y="88" width="48" height="7" rx="3.5" fill="#FFFFFF" fillOpacity="0.85" />
            <line x1="276" y1="108" x2="344" y2="108" stroke="rgba(255,255,255,0.1)" />
            <rect x="276" y="120" width="68" height="6" rx="3" fill="#A3A3A3" fillOpacity="0.55" />
            <rect x="276" y="136" width="54" height="6" rx="3" fill="#A3A3A3" fillOpacity="0.4" />
            <rect x="276" y="152" width="62" height="6" rx="3" fill="#A3A3A3" fillOpacity="0.4" />
            <rect x="276" y="202" width="68" height="20" rx="6" fill="url(#restGrad)" />
            <defs>
              <linearGradient id="restGrad" x1="276" y1="202" x2="344" y2="222" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF5722" />
                <stop offset="1" stopColor="#C62828" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      );

    case 'resume':
      return (
        <div className={`relative h-full w-full overflow-hidden bg-[#101012] ${className}`}>
          <div
            className="absolute inset-0 opacity-75"
            style={{
              background:
                'radial-gradient(circle at 30% 25%, rgba(255,87,34,0.22), transparent 55%), radial-gradient(circle at 80% 80%, rgba(198,40,40,0.2), transparent 55%)',
            }}
          />
          <svg
            viewBox="0 0 400 280"
            className="h-full w-full"
            role="img"
            aria-label="AI Resume Builder document and intelligence visual"
          >
            {/* Document sheet */}
            <rect x="58" y="24" width="186" height="232" rx="12" fill="#19191c" stroke="rgba(255,255,255,0.14)" />
            <rect x="78" y="46" width="64" height="10" rx="5" fill="#FFFFFF" fillOpacity="0.92" />
            <rect x="78" y="64" width="102" height="6" rx="3" fill="#FF5722" fillOpacity="0.85" />
            <line x1="78" y1="84" x2="224" y2="84" stroke="rgba(255,255,255,0.1)" />
            <rect x="78" y="98" width="146" height="6" rx="3" fill="#A3A3A3" fillOpacity="0.55" />
            <rect x="78" y="112" width="128" height="6" rx="3" fill="#A3A3A3" fillOpacity="0.4" />
            <rect x="78" y="126" width="136" height="6" rx="3" fill="#A3A3A3" fillOpacity="0.4" />
            <rect x="78" y="150" width="54" height="7" rx="3.5" fill="#FFFFFF" fillOpacity="0.8" />
            <rect x="78" y="166" width="142" height="6" rx="3" fill="#A3A3A3" fillOpacity="0.45" />
            <rect x="78" y="180" width="118" height="6" rx="3" fill="#A3A3A3" fillOpacity="0.35" />
            <rect x="78" y="206" width="146" height="28" rx="6" fill="rgba(255,87,34,0.12)" stroke="rgba(255,87,34,0.4)" />
            <rect x="90" y="217" width="84" height="6" rx="3" fill="#FF5722" />

            {/* AI Prompt Panel */}
            <rect x="218" y="64" width="134" height="156" rx="12" fill="#121214" stroke="rgba(255,87,34,0.45)" />
            <circle cx="242" cy="90" r="10" fill="#FF5722" fillOpacity="0.2" stroke="#FF5722" />
            <path d="M242 84v12M236 90h12" stroke="#FF5722" strokeWidth="1.6" strokeLinecap="round" />
            <rect x="260" y="86" width="72" height="7" rx="3.5" fill="#FFFFFF" fillOpacity="0.85" />
            <rect x="234" y="116" width="102" height="24" rx="6" fill="#1b1b1e" stroke="rgba(255,255,255,0.08)" />
            <rect x="244" y="125" width="76" height="6" rx="3" fill="#A3A3A3" fillOpacity="0.7" />
            <rect x="234" y="148" width="102" height="24" rx="6" fill="#1b1b1e" stroke="rgba(255,255,255,0.08)" />
            <rect x="244" y="157" width="64" height="6" rx="3" fill="#A3A3A3" fillOpacity="0.55" />
            <rect x="234" y="184" width="102" height="20" rx="6" fill="url(#resGrad)" />
            <defs>
              <linearGradient id="resGrad" x1="234" y1="184" x2="336" y2="204" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF5722" />
                <stop offset="1" stopColor="#C62828" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      );

    case 'arduino':
      return (
        <div className={`relative h-full w-full overflow-hidden bg-[#0e1012] ${className}`}>
          <div
            className="absolute inset-0 opacity-75"
            style={{
              background:
                'radial-gradient(circle at 65% 45%, rgba(255,87,34,0.24), transparent 55%), radial-gradient(circle at 20% 25%, rgba(198,40,40,0.18), transparent 50%)',
            }}
          />
          <svg
            viewBox="0 0 400 280"
            className="h-full w-full"
            role="img"
            aria-label="HC-05 Controlled Arduino Car hardware schematic visual"
          >
            {/* Grid traces */}
            <path
              d="M40 70h70l24 24h56M40 210h86l24-24h40M360 80h-68l-22 22h-38M360 200h-74l-20-20h-34"
              stroke="rgba(255,87,34,0.32)"
              strokeWidth="1.5"
              fill="none"
            />
            {/* Chassis & Board */}
            <rect x="116" y="64" width="168" height="152" rx="16" fill="#17191c" stroke="rgba(255,255,255,0.16)" />
            {/* Wheels */}
            <rect x="96" y="82" width="16" height="40" rx="5" fill="#26262a" stroke="rgba(255,255,255,0.15)" />
            <rect x="96" y="158" width="16" height="40" rx="5" fill="#26262a" stroke="rgba(255,255,255,0.15)" />
            <rect x="288" y="82" width="16" height="40" rx="5" fill="#26262a" stroke="rgba(255,255,255,0.15)" />
            <rect x="288" y="158" width="16" height="40" rx="5" fill="#26262a" stroke="rgba(255,255,255,0.15)" />
            {/* Microcontroller */}
            <rect x="150" y="96" width="100" height="88" rx="10" fill="#101215" stroke="rgba(255,87,34,0.5)" />
            <rect x="176" y="122" width="48" height="36" rx="4" fill="#1c1f24" stroke="rgba(255,255,255,0.2)" />
            {/* HC-05 Bluetooth signal arcs */}
            <path d="M194 46a22 22 0 0 1 12 0" stroke="#FF5722" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M182 36a36 36 0 0 1 36 0" stroke="#FF5722" strokeOpacity="0.65" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M170 26a52 52 0 0 1 60 0" stroke="#C62828" strokeOpacity="0.45" strokeWidth="2" strokeLinecap="round" fill="none" />
            <circle cx="200" cy="140" r="5" fill="#FF5722" />
            <text
              x="200"
              y="204"
              textAnchor="middle"
              fill="rgba(255,255,255,0.65)"
              fontSize="10"
              fontFamily="JetBrains Mono, monospace"
            >
              HC-05 SERIAL LINK
            </text>
          </svg>
        </div>
      );

    case 'interview':
      return (
        <div className={`relative h-full w-full overflow-hidden bg-[#100e10] ${className}`}>
          <div
            className="absolute inset-0 opacity-75"
            style={{
              background:
                'radial-gradient(circle at 50% 45%, rgba(255,87,34,0.26), transparent 58%), radial-gradient(circle at 80% 20%, rgba(198,40,40,0.2), transparent 50%)',
            }}
          />
          <svg
            viewBox="0 0 400 280"
            className="h-full w-full"
            role="img"
            aria-label="AI Mock Interview Preparation Platform visual"
          >
            <rect x="34" y="34" width="332" height="212" rx="14" fill="#161416" stroke="rgba(255,255,255,0.12)" />
            {/* Audio Waveform */}
            {[46, 68, 96, 54, 118, 84, 132, 72, 108, 60, 88, 52].map((h, idx) => (
              <rect
                key={idx}
                x={82 + idx * 20}
                y={128 - h / 2}
                width="8"
                height={h}
                rx="4"
                fill={idx % 3 === 0 ? '#FF5722' : 'rgba(255,255,255,0.75)'}
                fillOpacity={idx % 2 === 0 ? 0.9 : 0.45}
              />
            ))}
            <rect x="64" y="206" width="136" height="10" rx="5" fill="rgba(255,255,255,0.15)" />
            <rect x="220" y="202" width="116" height="18" rx="9" fill="rgba(255,87,34,0.2)" stroke="#FF5722" strokeOpacity="0.6" />
          </svg>
        </div>
      );

    case 'portfolio':
      return (
        <div className={`relative h-full w-full overflow-hidden bg-[#0a0a0a] ${className}`}>
          <div
            className="absolute inset-0 opacity-85"
            style={{
              background:
                'radial-gradient(circle at 55% 65%, rgba(255,87,34,0.32), transparent 56%), radial-gradient(circle at 20% 15%, rgba(198,40,40,0.22), transparent 50%)',
            }}
          />
          <svg
            viewBox="0 0 400 280"
            className="h-full w-full"
            role="img"
            aria-label="Dark Editorial Portfolio Architecture visual"
          >
            <rect x="28" y="26" width="344" height="228" rx="14" fill="#111111" stroke="rgba(255,255,255,0.14)" />
            <line x1="114" y1="26" x2="114" y2="254" stroke="rgba(255,255,255,0.06)" />
            <line x1="200" y1="26" x2="200" y2="254" stroke="rgba(255,255,255,0.06)" />
            <line x1="286" y1="26" x2="286" y2="254" stroke="rgba(255,255,255,0.06)" />
            <rect x="52" y="54" width="160" height="22" rx="4" fill="#FFFFFF" fillOpacity="0.92" />
            <rect x="114" y="88" width="142" height="22" rx="4" fill="#FFFFFF" fillOpacity="0.82" />
            {/* Starburst accent */}
            <g transform="translate(284, 98)">
              <path
                d="M0-16v32M-16 0h32M-11.3-11.3l22.6 22.6M11.3-11.3l-22.6 22.6"
                stroke="#FF5722"
                strokeWidth="4.5"
                strokeLinecap="round"
              />
            </g>
            {/* Tilted mini cards */}
            <rect
              x="58"
              y="144"
              width="66"
              height="84"
              rx="8"
              transform="rotate(-6 91 186)"
              fill="#191919"
              stroke="rgba(255,255,255,0.16)"
            />
            <rect
              x="132"
              y="140"
              width="66"
              height="84"
              rx="8"
              transform="rotate(-2 165 182)"
              fill="#1d1b1b"
              stroke="rgba(255,87,34,0.35)"
            />
            <rect
              x="206"
              y="136"
              width="66"
              height="84"
              rx="8"
              transform="rotate(3 239 178)"
              fill="#1b1919"
              stroke="rgba(255,255,255,0.16)"
            />
            <rect
              x="280"
              y="142"
              width="66"
              height="84"
              rx="8"
              transform="rotate(6 313 184)"
              fill="#171717"
              stroke="rgba(255,255,255,0.14)"
            />
          </svg>
        </div>
      );
  }
};

export const EditorialStarburst: React.FC<{className?: string}> = ({className = 'w-12 h-12'}) => (
  <svg
    viewBox="0 0 80 80"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="starburstGrad" x1="10" y1="10" x2="70" y2="70" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FF7043" />
        <stop offset="50%" stopColor="#FF5722" />
        <stop offset="100%" stopColor="#C62828" />
      </linearGradient>
    </defs>
    <g stroke="url(#starburstGrad)" strokeWidth="10" strokeLinecap="butt">
      <line x1="40" y1="6" x2="40" y2="74" />
      <line x1="6" y1="40" x2="74" y2="40" />
      <line x1="16" y1="16" x2="64" y2="64" />
      <line x1="64" y1="16" x2="16" y2="64" />
    </g>
  </svg>
);
