'use client'

import { PatternDef } from '@/types/types';
import { lightenDarken } from '@/lib';

export interface JerseyBackProps {
  getColor: (id: string) => string
  getPatFill: (id: string) => PatternDef
  selectedPart: string | null
  onPartClick: (id: string) => void
}

// Configuration for jersey parts
export const JERSEY_BACK_PARTS = {
  BACK: 'jersey_back',
  SLEEVES: 'jersey_sleeves',
  COLLAR: 'jersey_collar',
  SIDE_PANELS: 'jersey_side_panels',
  POCKETS: 'jersey_pockets',
} as const

// Path definitions
export const JERSEY_BACK_PATHS = {
  leftSleeve: 'M20,80 Q10,70 8,100 L18,140 Q30,120 45,100 Z',
  leftCuff: 'M8,100 L18,140 L23,138 L13,100Z',
  rightSleeve: 'M260,80 Q270,70 272,100 L262,140 Q250,120 235,100 Z',
  rightCuff: 'M272,100 L262,140 L257,138 L267,100Z',
  back: 'M85,45 Q75,50 45,80 L45,100 L85,100 L85,310 L195,310 L195,100 L235,100 L235,80 Q205,50 195,45 Q175,35 165,30 Q155,22 140,20 Q125,22 115,30 Q105,35 85,45Z',
  leftSidePanel: 'M85,100 L85,310 L105,310 L105,100Z',
  rightSidePanel: 'M175,100 L175,310 L195,310 L195,100Z',
  backCollar: 'M115,30 Q125,14 140,12 Q155,14 165,30 Q155,22 140,20 Q125,22 115,30Z',
}

// Pocket configuration
export const POCKET_CONFIG = {
  x: 97,
  y: 268,
  width: 86,
  height: 40,
  rx: 3,
  dividers: [126, 155], // x positions for vertical divider lines
  seamY: 276, // y position for top seam
} as const

// Sleeve component
export const JerseyBackSleeve = ({ 
  side, 
  color, 
  fill 
}: { 
  side: 'left' | 'right'
  color: string
  fill: string 
}) => {
  const isLeft = side === 'left'
  const sleevePath = isLeft ? JERSEY_BACK_PATHS.leftSleeve : JERSEY_BACK_PATHS.rightSleeve
  const cuffPath = isLeft ? JERSEY_BACK_PATHS.leftCuff : JERSEY_BACK_PATHS.rightCuff
  
  return (
    <>
      <path
        d={sleevePath}
        fill={fill}
        stroke="rgba(0,0,0,0.12)"
        strokeWidth="0.8"
      />
      <path
        d={cuffPath}
        fill={lightenDarken(color, -25)}
        stroke="none"
      />
    </>
  )
}

// Side panel component
export const JerseyBackSide = ({ 
  position, 
  fill 
}: { 
  position: 'left' | 'right'
  fill: string 
}) => {
  const path = position === 'left' ? JERSEY_BACK_PATHS.leftSidePanel : JERSEY_BACK_PATHS.rightSidePanel
  return (
    <path
      d={path}
      fill={fill}
      stroke="rgba(0,0,0,0.08)"
      strokeWidth="0.5"
    />
  )
}

// Pockets component
export const JerseyBackPockets = ({ fill }: { fill: string }) => (
  <>
    {/* Main pocket rectangle */}
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
    
    {/* Pocket dividers */}
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
    
    {/* Pocket top seam */}
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
