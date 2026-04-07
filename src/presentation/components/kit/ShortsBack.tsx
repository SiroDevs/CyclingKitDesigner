'use client'

import { PatternDef } from '@/types/types'
import { lightenDarken } from '@/lib'

interface ShortsBackProps {
  getColor: (id: string) => string
  getPatFill: (id: string) => PatternDef
  selectedPart: string | null
  onPartClick: (id: string) => void
}

export function ShortsBack({
  getColor,
  getPatFill,
  selectedPart,
  onPartClick,
}: ShortsBackProps) {
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

      {/* Back strap - wider panel */}
      <g
        onClick={clickHandler('shorts_straps')}
        className={`cursor-pointer transition-all ${sel('shorts_straps')}`}
      >
        <path
          d="M78,82 Q80,52 88,22 Q93,8 100,6 L140,6 Q147,8 152,22 Q160,52 162,82Z"
          fill={straps.fill}
          stroke="rgba(0,0,0,0.12)"
          strokeWidth="0.8"
        />
      </g>

      {/* Back chamois (larger) */}
      <g
        onClick={clickHandler('shorts_pad')}
        className={`cursor-pointer transition-all ${sel('shorts_pad')}`}
      >
        <ellipse
          cx="120"
          cy="185"
          rx="48"
          ry="42"
          fill={pad.fill}
          stroke="rgba(0,0,0,0.15)"
          strokeWidth="0.8"
          strokeDasharray="3,2"
        />
        {[-18, -9, 0, 9, 18].map((dx) =>
          [-14, -5, 5, 14].map((dy) => (
            <circle
              key={`${dx}-${dy}`}
              cx={120 + dx}
              cy={185 + dy}
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
