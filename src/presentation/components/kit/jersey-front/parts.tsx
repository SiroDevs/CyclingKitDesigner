'use client'

import { PatternDef } from '@/types/types';
import { lightenDarken } from '@/lib';

export interface JerseyFrontProps {
  getColor: (id: string) => string
  getPatFill: (id: string) => PatternDef
  selectedPart: string | null
  onPartClick: (id: string) => void
}

// Configuration for jersey parts
export const JERSEY_FRONT_PARTS = {
  BODY: 'jersey_body',
  SLEEVES: 'jersey_sleeves',
  COLLAR: 'jersey_collar',
  SIDE_PANELS: 'jersey_side_panels',
} as const

// Path definitions
export const JERSEY_FRONT_PATHS = {
  leftSleeve: 'M20,80 Q10,70 8,100 L18,140 Q30,120 45,100 Z',
  leftCuff: 'M8,100 L18,140 L23,138 L13,100Z',
  rightSleeve: 'M260,80 Q270,70 272,100 L262,140 Q250,120 235,100 Z',
  rightCuff: 'M272,100 L262,140 L257,138 L267,100Z',
  body: 'M85,45 Q75,50 45,80 L45,100 L85,100 L85,310 L195,310 L195,100 L235,100 L235,80 Q205,50 195,45 Q175,35 165,30 Q155,55 140,60 Q125,55 115,30 Q105,35 85,45Z',
  leftSidePanel: 'M85,100 L85,310 L105,310 L105,100Z',
  rightSidePanel: 'M175,100 L175,310 L195,310 L195,100Z',
  collar: 'M115,30 Q125,55 140,60 Q155,55 165,30 Q155,22 140,20 Q125,22 115,30Z',
}

// Sleeve component
export const JerseyFrontSleeve = ({ 
  side, 
  color, 
  fill 
}: { 
  side: 'left' | 'right'
  color: string
  fill: string 
}) => {
  const isLeft = side === 'left'
  const sleevePath = isLeft ? JERSEY_FRONT_PATHS.leftSleeve : JERSEY_FRONT_PATHS.rightSleeve
  const cuffPath = isLeft ? JERSEY_FRONT_PATHS.leftCuff : JERSEY_FRONT_PATHS.rightCuff
  
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
export const JerseyFrontSide = ({ 
  position, 
  fill 
}: { 
  position: 'left' | 'right'
  fill: string 
}) => {
  const path = position === 'left' ? JERSEY_FRONT_PATHS.leftSidePanel : JERSEY_FRONT_PATHS.rightSidePanel
  return (
    <path
      d={path}
      fill={fill}
      stroke="rgba(0,0,0,0.08)"
      strokeWidth="0.5"
    />
  )
}
