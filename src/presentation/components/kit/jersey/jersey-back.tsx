'use client'

import { JerseyBaseProps } from './shared'
import { JerseyTemplate } from './jersey-template'
import { BACK_PARTS, BACK_PATHS, Pockets } from './back-config'

export function JerseyBack(props: JerseyBaseProps) {
  return (
    <JerseyTemplate
      patterns={} 
      {...props}
      partKeys={BACK_PARTS}
      bodyPath={BACK_PATHS.back}
      collarPath={BACK_PATHS.backCollar}
      hasSidePanels={true}
      hasSeamLines={false}
      renderSpecificParts={({ patterns, isSelected, onPartClick }) => (
          <>
              {/* Pockets */}
              <g
                  onClick={(e) => {
                      e.stopPropagation()
                      onPartClick(BACK_PARTS.POCKETS)
                  } }
                  className={`cursor-pointer transition-all ${isSelected(BACK_PARTS.POCKETS)
                          ? 'opacity-85 drop-shadow-[0_0_4px_rgba(0,120,255,0.6)]'
                          : ''}`}
              >
                  <Pockets fill={patterns.pockets?.fill || ''} />
              </g>
          </>
      )}    />
  )
}