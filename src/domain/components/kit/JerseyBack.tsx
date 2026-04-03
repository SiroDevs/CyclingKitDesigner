'use client'

import { PatternDef } from '@/domain/lib/types'
import { lightenDarken } from '@/domain/lib/colorUtils'

interface JerseyBackProps {
  getColor: (id: string) => string
  getPatFill: (id: string) => PatternDef
  selectedPart: string | null
  onPartClick: (id: string) => void
}

export default function JerseyBack({
  getColor,
  getPatFill,
  selectedPart,
  onPartClick,
}: JerseyBackProps) {
  const back = getPatFill('jersey_back')
  const sleeves = getPatFill('jersey_sleeves')
  const collar = getPatFill('jersey_collar')
  const side = getPatFill('jersey_side_panels')
  const pockets = getPatFill('jersey_pockets')

  const allDefs = [back.defs, sleeves.defs, collar.defs, side.defs, pockets.defs]
    .filter(Boolean)
    .join('')

  const sel = (id: string) =>
    selectedPart === id
      ? 'opacity-85 drop-shadow-[0_0_4px_rgba(0,120,255,0.6)]'
      : ''

  const clickHandler = (id: string) => (e: React.MouseEvent) => {
    e.stopPropagation()
    onPartClick(id)
  }

  return (
    <svg
      viewBox="0 0 280 340"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs dangerouslySetInnerHTML={{ __html: allDefs }} />

      {/* Sleeves */}
      <g
        onClick={clickHandler('jersey_sleeves')}
        className={`cursor-pointer transition-all ${sel('jersey_sleeves')}`}
      >
        <path
          d="M20,80 Q10,70 8,100 L18,140 Q30,120 45,100 Z"
          fill={sleeves.fill}
          stroke="rgba(0,0,0,0.12)"
          strokeWidth="0.8"
        />
        <path
          d="M8,100 L18,140 L23,138 L13,100Z"
          fill={lightenDarken(getColor('jersey_sleeves'), -25)}
          stroke="none"
        />
        <path
          d="M260,80 Q270,70 272,100 L262,140 Q250,120 235,100 Z"
          fill={sleeves.fill}
          stroke="rgba(0,0,0,0.12)"
          strokeWidth="0.8"
        />
        <path
          d="M272,100 L262,140 L257,138 L267,100Z"
          fill={lightenDarken(getColor('jersey_sleeves'), -25)}
          stroke="none"
        />
      </g>

      {/* Back body */}
      <g
        onClick={clickHandler('jersey_back')}
        className={`cursor-pointer transition-all ${sel('jersey_back')}`}
      >
        <path
          d="M85,45 Q75,50 45,80 L45,100 L85,100 L85,310 L195,310 L195,100 L235,100 L235,80 Q205,50 195,45 Q175,35 165,30 Q155,22 140,20 Q125,22 115,30 Q105,35 85,45Z"
          fill={back.fill}
          stroke="rgba(0,0,0,0.12)"
          strokeWidth="0.8"
        />
      </g>

      {/* Side panels */}
      <g
        onClick={clickHandler('jersey_side_panels')}
        className={`cursor-pointer transition-all ${sel('jersey_side_panels')}`}
      >
        <path
          d="M85,100 L85,310 L105,310 L105,100Z"
          fill={side.fill}
          stroke="rgba(0,0,0,0.08)"
          strokeWidth="0.5"
        />
        <path
          d="M175,100 L175,310 L195,310 L195,100Z"
          fill={side.fill}
          stroke="rgba(0,0,0,0.08)"
          strokeWidth="0.5"
        />
      </g>

      {/* Pockets */}
      <g
        onClick={clickHandler('jersey_pockets')}
        className={`cursor-pointer transition-all ${sel('jersey_pockets')}`}
      >
        <rect
          x="97"
          y="268"
          width="86"
          height="40"
          rx="3"
          fill={pockets.fill}
          stroke="rgba(0,0,0,0.12)"
          strokeWidth="0.8"
        />
        {/* Pocket dividers */}
        <line x1="126" y1="268" x2="126" y2="308" stroke="rgba(0,0,0,0.1)" strokeWidth="0.8" />
        <line x1="155" y1="268" x2="155" y2="308" stroke="rgba(0,0,0,0.1)" strokeWidth="0.8" />
        {/* Pocket top seam */}
        <line x1="97" y1="276" x2="183" y2="276" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5" />
      </g>

      {/* Back collar */}
      <g
        onClick={clickHandler('jersey_collar')}
        className={`cursor-pointer transition-all ${sel('jersey_collar')}`}
      >
        <path
          d="M115,30 Q125,14 140,12 Q155,14 165,30 Q155,22 140,20 Q125,22 115,30Z"
          fill={collar.fill}
          stroke="rgba(0,0,0,0.15)"
          strokeWidth="0.8"
        />
      </g>

      {/* Bottom hem */}
      <rect
        x="85"
        y="302"
        width="110"
        height="10"
        rx="2"
        fill={lightenDarken(getColor('jersey_back'), -18)}
        stroke="none"
        onClick={clickHandler('jersey_back')}
        className="cursor-pointer"
      />
    </svg>
  )
}
