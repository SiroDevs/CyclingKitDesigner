'use client'

import { lightenDarken } from "@/lib"
import { JERSEY_PATHS } from "."

export const FRONT_PARTS = {
  BODY: 'jersey_body',
  SLEEVES: 'jersey_sleeves',
  COLLAR: 'jersey_collar',
  SIDE_PANELS: 'jersey_side_panels',
} as const

export const FRONT_PATHS = {
  body: 'M85,45 Q75,50 45,80 L45,100 L85,100 L85,310 L195,310 L195,100 L235,100 L235,80 Q205,50 195,45 Q175,35 165,30 Q155,55 140,60 Q125,55 115,30 Q105,35 85,45Z',
  collar: JERSEY_PATHS.frontCollar,
  zipLine: { x1: 140, y1: 60, x2: 140, y2: 295 },
  zipPull: { x: 135, y: 295, width: 10, height: 7, rx: 2 },
} as const

export const ZipDetail = ({ color }: { color: string }) => (
  <>
    <line
      x1={FRONT_PATHS.zipLine.x1}
      y1={FRONT_PATHS.zipLine.y1}
      x2={FRONT_PATHS.zipLine.x2}
      y2={FRONT_PATHS.zipLine.y2}
      stroke={lightenDarken(color, 50)}
      strokeWidth="1.5"
      opacity="0.45"
    />
    <rect
      x={FRONT_PATHS.zipPull.x}
      y={FRONT_PATHS.zipPull.y}
      width={FRONT_PATHS.zipPull.width}
      height={FRONT_PATHS.zipPull.height}
      rx={FRONT_PATHS.zipPull.rx}
      fill={lightenDarken(color, 25)}
      stroke="rgba(0,0,0,0.2)"
      strokeWidth="0.5"
    />
  </>
)