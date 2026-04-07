'use client'

import { PatternDef } from '@/types/types'
import { lightenDarken } from '@/lib'

interface ShortsFrontProps {
  getColor: (id: string) => string
  getPatFill: (id: string) => PatternDef
  selectedPart: string | null
  onPartClick: (id: string) => void
}

export function ShortsFront({
  getColor,
  getPatFill,
  selectedPart,
  onPartClick,
}: ShortsFrontProps) {
  const main = getPatFill('shorts_main')
  const straps = getPatFill('shorts_straps')
  const pad = getPatFill('shorts_pad')
  const side = getPatFill('shorts_side')

  const allDefs = [main.defs, straps.defs, pad.defs, side.defs]
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

  const mainColor = getColor('shorts_main')

  return (
    <svg
      viewBox="0 0 240 310"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs dangerouslySetInnerHTML={{ __html: allDefs }} />

      {/* Main shorts */}
      <g
        onClick={clickHandler('shorts_main')}
        className={`cursor-pointer transition-all ${sel('shorts_main')}`}
      >
        <path
          d="M48,82 L48,228 Q48,250 68,256 L100,260 L120,198 L140,260 L172,256 Q192,250 192,228 L192,82Z"
          fill={main.fill}
          stroke="rgba(0,0,0,0.15)"
          strokeWidth="0.8"
        />
      </g>

      {/* Side panels */}
      <g
        onClick={clickHandler('shorts_side')}
        className={`cursor-pointer transition-all ${sel('shorts_side')}`}
      >
        <path
          d="M48,82 L48,228 Q48,250 68,256 L80,258 L80,82Z"
          fill={side.fill}
          stroke="rgba(0,0,0,0.08)"
          strokeWidth="0.5"
        />
        <path
          d="M192,82 L192,228 Q192,250 172,256 L160,258 L160,82Z"
          fill={side.fill}
          stroke="rgba(0,0,0,0.08)"
          strokeWidth="0.5"
        />
      </g>

      {/* Straps */}
      <g
        onClick={clickHandler('shorts_straps')}
        className={`cursor-pointer transition-all ${sel('shorts_straps')}`}
      >
        <path
          d="M80,82 Q84,52 93,22 Q98,8 104,6 L116,6 Q113,20 109,82Z"
          fill={straps.fill}
          stroke="rgba(0,0,0,0.12)"
          strokeWidth="0.8"
        />
        <path
          d="M160,82 Q156,52 147,22 Q142,8 136,6 L124,6 Q127,20 131,82Z"
          fill={straps.fill}
          stroke="rgba(0,0,0,0.12)"
          strokeWidth="0.8"
        />
      </g>

      {/* Chamois */}
      <g
        onClick={clickHandler('shorts_pad')}
        className={`cursor-pointer transition-all ${sel('shorts_pad')}`}
      >
        <ellipse
          cx="120"
          cy="222"
          rx="40"
          ry="30"
          fill={pad.fill}
          stroke="rgba(0,0,0,0.15)"
          strokeWidth="0.8"
          strokeDasharray="3,2"
        />
        {/* Pad texture */}
        {[-16, -8, 0, 8, 16].map((dx) =>
          [-10, 0, 10].map((dy) => (
            <circle
              key={`${dx}-${dy}`}
              cx={120 + dx}
              cy={222 + dy}
              r="1.5"
              fill="rgba(255,255,255,0.07)"
            />
          ))
        )}
      </g>

      {/* Waistband */}
      <rect
        x="48"
        y="78"
        width="144"
        height="10"
        rx="3"
        fill={lightenDarken(mainColor, -12)}
        stroke="rgba(0,0,0,0.1)"
        strokeWidth="0.5"
        onClick={clickHandler('shorts_main')}
        className="cursor-pointer"
      />

      {/* Leg grippers */}
      <path
        d="M48,228 Q48,250 68,256 L80,258"
        fill="none"
        stroke={lightenDarken(mainColor, -22)}
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M192,228 Q192,250 172,256 L160,258"
        fill="none"
        stroke={lightenDarken(mainColor, -22)}
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  )
}
