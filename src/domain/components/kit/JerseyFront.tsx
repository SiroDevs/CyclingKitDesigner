'use client'

import { PatternDef } from '@/domain/lib/types'
import { lightenDarken } from '@/domain/lib/colorUtils'

interface JerseyFrontProps {
  getColor: (id: string) => string
  getPatFill: (id: string) => PatternDef
  selectedPart: string | null
  onPartClick: (id: string) => void
}

export default function JerseyFront({
  getColor,
  getPatFill,
  selectedPart,
  onPartClick,
}: JerseyFrontProps) {
  const body = getPatFill('jersey_body')
  const sleeves = getPatFill('jersey_sleeves')
  const collar = getPatFill('jersey_collar')
  const side = getPatFill('jersey_side_panels')

  const allDefs = [body.defs, sleeves.defs, collar.defs, side.defs]
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

  const collarColor = getColor('jersey_collar')

  return (
    <svg
      viewBox="0 0 280 340"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs dangerouslySetInnerHTML={{ __html: allDefs }} />

      {/* Left sleeve */}
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
        {/* Cuff */}
        <path
          d="M8,100 L18,140 L23,138 L13,100Z"
          fill={lightenDarken(getColor('jersey_sleeves'), -25)}
          stroke="none"
        />
      </g>

      {/* Right sleeve */}
      <g
        onClick={clickHandler('jersey_sleeves')}
        className={`cursor-pointer transition-all ${sel('jersey_sleeves')}`}
      >
        <path
          d="M260,80 Q270,70 272,100 L262,140 Q250,120 235,100 Z"
          fill={sleeves.fill}
          stroke="rgba(0,0,0,0.12)"
          strokeWidth="0.8"
        />
        {/* Cuff */}
        <path
          d="M272,100 L262,140 L257,138 L267,100Z"
          fill={lightenDarken(getColor('jersey_sleeves'), -25)}
          stroke="none"
        />
      </g>

      {/* Main body */}
      <g
        onClick={clickHandler('jersey_body')}
        className={`cursor-pointer transition-all ${sel('jersey_body')}`}
      >
        <path
          d="M85,45 Q75,50 45,80 L45,100 L85,100 L85,310 L195,310 L195,100 L235,100 L235,80 Q205,50 195,45 Q175,35 165,30 Q155,55 140,60 Q125,55 115,30 Q105,35 85,45Z"
          fill={body.fill}
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

      {/* Collar + zip */}
      <g
        onClick={clickHandler('jersey_collar')}
        className={`cursor-pointer transition-all ${sel('jersey_collar')}`}
      >
        <path
          d="M115,30 Q125,55 140,60 Q155,55 165,30 Q155,22 140,20 Q125,22 115,30Z"
          fill={collar.fill}
          stroke="rgba(0,0,0,0.15)"
          strokeWidth="0.8"
        />
        {/* Zip */}
        <line
          x1="140"
          y1="60"
          x2="140"
          y2="230"
          stroke={lightenDarken(collarColor, 50)}
          strokeWidth="1.5"
          opacity="0.45"
        />
        {/* Zip pull */}
        <rect
          x="135"
          y="228"
          width="10"
          height="7"
          rx="2"
          fill={lightenDarken(collarColor, 25)}
          stroke="rgba(0,0,0,0.2)"
          strokeWidth="0.5"
        />
        {/* Zip teeth */}
        {[80, 100, 120, 140, 160, 180, 200].map((y) => (
          <line
            key={y}
            x1="138"
            y1={y}
            x2="142"
            y2={y}
            stroke={lightenDarken(collarColor, 40)}
            strokeWidth="0.8"
            opacity="0.3"
          />
        ))}
      </g>

      {/* Bottom hem */}
      <rect
        x="85"
        y="302"
        width="110"
        height="10"
        rx="2"
        fill={lightenDarken(getColor('jersey_body'), -18)}
        stroke="none"
        onClick={clickHandler('jersey_body')}
        className="cursor-pointer"
      />

      {/* Seam lines */}
      <line x1="45" y1="80" x2="45" y2="100" stroke="rgba(0,0,0,0.06)" strokeWidth="0.5" />
      <line x1="235" y1="80" x2="235" y2="100" stroke="rgba(0,0,0,0.06)" strokeWidth="0.5" />
    </svg>
  )
}
