'use client'

import { PatternDef } from '@/types/types'
import { lightenDarken } from '@/lib'

export interface JerseyPartConfig {
  id: string
  fill: string
  defs?: string
}

export interface JerseyBaseProps {
  getColor: (id: string) => string
  getPatFill: (id: string) => PatternDef
  selectedPart: string | null
  onPartClick: (id: string) => void
}

// Common paths that are identical for front and back
export const COMMON_PATHS = {
  leftSleeve: 'M20,80 Q10,70 8,100 L18,140 Q30,120 45,100 Z',
  leftCuff: 'M8,100 L18,140 L23,138 L13,100Z',
  rightSleeve: 'M260,80 Q270,70 272,100 L262,140 Q250,120 235,100 Z',
  rightCuff: 'M272,100 L262,140 L257,138 L267,100Z',
  leftSidePanel: 'M85,100 L85,310 L105,310 L105,100Z',
  rightSidePanel: 'M175,100 L175,310 L195,310 L195,100Z',
  bottomHem: { x: 85, y: 302, width: 110, height: 10, rx: 2 },
  seamLeft: { x1: 45, y1: 80, x2: 45, y2: 100 },
  seamRight: { x1: 235, y1: 80, x2: 235, y2: 100 },
} as const

// Shared components
export const Sleeve = ({ 
  side, 
  color, 
  fill 
}: { 
  side: 'left' | 'right'
  color: string
  fill: string 
}) => {
  const isLeft = side === 'left'
  const sleevePath = isLeft ? COMMON_PATHS.leftSleeve : COMMON_PATHS.rightSleeve
  const cuffPath = isLeft ? COMMON_PATHS.leftCuff : COMMON_PATHS.rightCuff
  
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

export const SidePanel = ({ 
  position, 
  fill 
}: { 
  position: 'left' | 'right'
  fill: string 
}) => {
  const path = position === 'left' ? COMMON_PATHS.leftSidePanel : COMMON_PATHS.rightSidePanel
  return (
    <path
      d={path}
      fill={fill}
      stroke="rgba(0,0,0,0.08)"
      strokeWidth="0.5"
    />
  )
}

export const BottomHem = ({ 
  color, 
  onClick 
}: { 
  color: string
  onClick: () => void 
}) => (
  <rect
    x={COMMON_PATHS.bottomHem.x}
    y={COMMON_PATHS.bottomHem.y}
    width={COMMON_PATHS.bottomHem.width}
    height={COMMON_PATHS.bottomHem.height}
    rx={COMMON_PATHS.bottomHem.rx}
    fill={lightenDarken(color, -18)}
    stroke="none"
    onClick={onClick}
    className="cursor-pointer"
  />
)

export const SeamLines = () => (
  <>
    <line
      x1={COMMON_PATHS.seamLeft.x1}
      y1={COMMON_PATHS.seamLeft.y1}
      x2={COMMON_PATHS.seamLeft.x2}
      y2={COMMON_PATHS.seamLeft.y2}
      stroke="rgba(0,0,0,0.06)"
      strokeWidth="0.5"
    />
    <line
      x1={COMMON_PATHS.seamRight.x1}
      y1={COMMON_PATHS.seamRight.y1}
      x2={COMMON_PATHS.seamRight.x2}
      y2={COMMON_PATHS.seamRight.y2}
      stroke="rgba(0,0,0,0.06)"
      strokeWidth="0.5"
    />
  </>
)