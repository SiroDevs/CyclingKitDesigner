'use client'

import { JerseyBaseProps, JerseyTemplate } from '.'
import { FRONT_PARTS, FRONT_PATHS, ZipDetail } from '.'

export function JerseyFront(props: JerseyBaseProps) {
  return (
    <JerseyTemplate
      {...props}
      partKeys={FRONT_PARTS}
      bodyPath={FRONT_PATHS.body}
      collarPath={FRONT_PATHS.collar}
      hasSeamLines={true}
      renderSpecificParts={({ patterns, colors, isSelected, onPartClick }) => (
        <g>
          <g
            onClick={(e) => {
              e.stopPropagation()
              onPartClick(FRONT_PARTS.COLLAR)
            }}
            className={`cursor-pointer transition-all ${
              isSelected(FRONT_PARTS.COLLAR) 
                ? 'opacity-85 drop-shadow-[0_0_4px_rgba(0,120,255,0.6)]' 
                : ''
            }`}
          >
            <path
              d={FRONT_PATHS.collar}
              fill={patterns.collar.fill}
              stroke="rgba(0,0,0,0.15)"
              strokeWidth="0.8"
            />
            <ZipDetail color={colors.collar} />
          </g>
        </g>
      )}
    />
  )
}