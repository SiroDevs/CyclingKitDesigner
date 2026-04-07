'use client'

import { JerseyBaseProps } from './shared'
import { JerseyTemplate } from './jersey-template'
import { FRONT_PARTS, FRONT_PATHS, ZipDetail } from './front-config'

export function JerseyFront(props: JerseyBaseProps) {
  return (
    <JerseyTemplate
      {...props}
      partKeys={FRONT_PARTS}
      bodyPath={FRONT_PATHS.body}
      collarPath={FRONT_PATHS.collar}
      hasSeamLines={true}
      renderSpecificParts={({ colors, isSelected, onPartClick }) => (
        <g>
          {/* Collar with zip */}
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
              fill={props.getPatFill(FRONT_PARTS.COLLAR).fill}
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