'use client'

import { useMemo } from 'react'
import { lightenDarken } from '@/lib'
import { JERSEY_BACK_PARTS, JERSEY_BACK_PATHS, JerseyBackPockets, JerseyBackProps, JerseyBackSide, JerseyBackSleeve } from './parts'
import { SelectablePart } from '../KitCanvas'

export function JerseyBack({
  getColor,
  getPatFill,
  selectedPart,
  onPartClick,
}: JerseyBackProps) {
  const patterns = {
    back: getPatFill(JERSEY_BACK_PARTS.BACK),
    sleeves: getPatFill(JERSEY_BACK_PARTS.SLEEVES),
    collar: getPatFill(JERSEY_BACK_PARTS.COLLAR),
    side: getPatFill(JERSEY_BACK_PARTS.SIDE_PANELS),
    pockets: getPatFill(JERSEY_BACK_PARTS.POCKETS),
  }

  const allDefs = useMemo(() => 
    [patterns.back.defs, patterns.sleeves.defs, patterns.collar.defs, patterns.side.defs, patterns.pockets.defs]
      .filter(Boolean)
      .join(''),
    [patterns]
  )

  const colors = {
    sleeves: getColor(JERSEY_BACK_PARTS.SLEEVES),
    back: getColor(JERSEY_BACK_PARTS.BACK),
  }

  const isSelected = (id: string) => selectedPart === id

  return (
    <svg
      viewBox="0 0 280 340"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs dangerouslySetInnerHTML={{ __html: allDefs }} />

      {/* Sleeves */}
      <SelectablePart
        id={JERSEY_BACK_PARTS.SLEEVES}
        isSelected={isSelected(JERSEY_BACK_PARTS.SLEEVES)}
        onClick={onPartClick}
      >
        <JerseyBackSleeve side="left" color={colors.sleeves} fill={patterns.sleeves.fill} />
        <JerseyBackSleeve side="right" color={colors.sleeves} fill={patterns.sleeves.fill} />
      </SelectablePart>

      {/* Back body */}
      <SelectablePart
        id={JERSEY_BACK_PARTS.BACK}
        isSelected={isSelected(JERSEY_BACK_PARTS.BACK)}
        onClick={onPartClick}
      >
        <path
          d={JERSEY_BACK_PATHS.back}
          fill={patterns.back.fill}
          stroke="rgba(0,0,0,0.12)"
          strokeWidth="0.8"
        />
      </SelectablePart>

      {/* Side panels */}
      <SelectablePart
        id={JERSEY_BACK_PARTS.SIDE_PANELS}
        isSelected={isSelected(JERSEY_BACK_PARTS.SIDE_PANELS)}
        onClick={onPartClick}
      >
        <JerseyBackSide position="left" fill={patterns.side.fill} />
        <JerseyBackSide position="right" fill={patterns.side.fill} />
      </SelectablePart>

      {/* Pockets */}
      <SelectablePart
        id={JERSEY_BACK_PARTS.POCKETS}
        isSelected={isSelected(JERSEY_BACK_PARTS.POCKETS)}
        onClick={onPartClick}
      >
        <JerseyBackPockets fill={patterns.pockets.fill} />
      </SelectablePart>

      {/* Back collar */}
      <SelectablePart
        id={JERSEY_BACK_PARTS.COLLAR}
        isSelected={isSelected(JERSEY_BACK_PARTS.COLLAR)}
        onClick={onPartClick}
      >
        <path
          d={JERSEY_BACK_PATHS.backCollar}
          fill={patterns.collar.fill}
          stroke="rgba(0,0,0,0.15)"
          strokeWidth="0.8"
        />
      </SelectablePart>

      {/* Bottom hem */}
      <rect
        x="85"
        y="302"
        width="110"
        height="10"
        rx="2"
        fill={lightenDarken(colors.back, -18)}
        stroke="none"
        onClick={(e) => {
          e.stopPropagation()
          onPartClick(JERSEY_BACK_PARTS.BACK)
        }}
        className="cursor-pointer"
      />
    </svg>
  )
}