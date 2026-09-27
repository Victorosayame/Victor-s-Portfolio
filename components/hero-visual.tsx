export default function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-[340px]">
      {/* Gold glow */}
      <div className="absolute -right-10 top-6 h-40 w-40 rounded-full bg-[rgba(200,167,90,0.18)] blur-3xl" />

      {/* Card */}
      <div className="relative h-full overflow-hidden rounded-[32px] border border-[var(--color-border)] bg-white shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
        <svg
          viewBox="0 0 340 420"
          className="h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#F8F5EE" />
            </linearGradient>
          </defs>

          <rect width="340" height="420" fill="url(#bg)" />

          {/* Editorial circles */}
          <circle cx="285" cy="55" r="36" fill="#F4E7C7" opacity="0.8" />
          <circle cx="60" cy="360" r="28" fill="#EEF2F7" />

          {/* Portrait silhouette */}
          <circle cx="170" cy="138" r="48" fill="#D8DEE8" />

          <path
            d="M95 300 C115 220, 225 220, 245 300 L245 360 L95 360 Z"
            fill="#C5CEDB"
          />

          {/* Gold accent */}
          <rect
            x="28"
            y="30"
            width="56"
            height="6"
            rx="3"
            fill="#C8A75A"
          />

          <text
            x="28"
            y="385"
            fill="#2F3A48"
            fontSize="16"
            fontWeight="700"
            fontFamily="Arial, Helvetica, sans-serif"
          >
            BISHOP
          </text>

          <text
            x="28"
            y="402"
            fill="#64748B"
            fontSize="10"
            fontFamily="Arial, Helvetica, sans-serif"
          >
            Frontend Engineer
          </text>
        </svg>
      </div>
    </div>
  );
}