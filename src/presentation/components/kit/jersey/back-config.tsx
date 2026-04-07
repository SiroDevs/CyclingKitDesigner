'use client'

export const BACK_PARTS = {
  BACK: 'jersey_back',
  SLEEVES: 'jersey_sleeves',
  COLLAR: 'jersey_collar',
  SIDE_PANELS: 'jersey_side_panels',
  POCKETS: 'jersey_pockets',
} as const

export const BACK_PATHS = {
  back: 'M85,45 Q75,50 45,80 L45,100 L85,100 L85,310 L195,310 L195,100 L235,100 L235,80 Q205,50 195,45 Q175,35 165,30 Q155,22 140,20 Q125,22 115,30 Q105,35 85,45Z',
  backCollar: 'M115,30 Q125,14 140,12 Q155,14 165,30 Q155,22 140,20 Q125,22 115,30Z',
} as const

export const POCKET_CONFIG = {
  x: 97,
  y: 268,
  width: 86,
  height: 40,
  rx: 3,
  dividers: [126, 155],
  seamY: 276,
} as const

export const Pockets = ({ fill }: { fill: string }) => (
  <>
    <rect
      x={POCKET_CONFIG.x}
      y={POCKET_CONFIG.y}
      width={POCKET_CONFIG.width}
      height={POCKET_CONFIG.height}
      rx={POCKET_CONFIG.rx}
      fill={fill}
      stroke="rgba(0,0,0,0.12)"
      strokeWidth="0.8"
    />
    {POCKET_CONFIG.dividers.map((x, index) => (
      <line
        key={index}
        x1={x}
        y1={POCKET_CONFIG.y}
        x2={x}
        y2={POCKET_CONFIG.y + POCKET_CONFIG.height}
        stroke="rgba(0,0,0,0.1)"
        strokeWidth="0.8"
      />
    ))}
    <line
      x1={POCKET_CONFIG.x}
      y1={POCKET_CONFIG.seamY}
      x2={POCKET_CONFIG.x + POCKET_CONFIG.width}
      y2={POCKET_CONFIG.seamY}
      stroke="rgba(0,0,0,0.1)"
      strokeWidth="0.5"
    />
  </>
)