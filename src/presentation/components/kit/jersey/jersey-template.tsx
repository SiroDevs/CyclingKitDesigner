'use client'

import { useMemo } from 'react'
import { JerseyBaseProps, Sleeve, SidePanel, BottomHem, SeamLines } from '.'
import { SelectablePart } from '../KitCanvas'

interface JerseyTemplateProps extends JerseyBaseProps {
  partKeys: Record<string, string>
  additionalPatterns?: Record<string, any>
  renderSpecificParts: (props: {
    patterns: Record<string, any>
    colors: Record<string, string>
    isSelected: (id: string) => boolean
    onPartClick: (id: string) => void
  }) => React.ReactNode
  bodyPath: string
  collarPath?: string
  hasSidePanels?: boolean
  hasSeamLines?: boolean
}

export function JerseyTemplate({
  getColor,
  getPatFill,
  selectedPart,
  onPartClick,
  partKeys,
  additionalPatterns = {},
  renderSpecificParts,
  bodyPath,
  collarPath,
  hasSidePanels = true,
  hasSeamLines = false,
}: JerseyTemplateProps) {
  const patterns = useMemo(() => {
    const base = {
      body: getPatFill(partKeys.BODY || partKeys.BACK),
      sleeves: getPatFill(partKeys.SLEEVES),
      collar: getPatFill(partKeys.COLLAR),
      side: hasSidePanels && partKeys.SIDE_PANELS ? getPatFill(partKeys.SIDE_PANELS) : null,
      ...additionalPatterns,
    }
    return base
  }, [getPatFill, partKeys, additionalPatterns, hasSidePanels])

  const allDefs = useMemo(() => 
    Object.values(patterns)
      .filter((p): p is NonNullable<typeof p> => p !== null && p !== undefined && Boolean(p.defs))
      .map(p => p.defs)
      .join(''),
    [patterns]
  )

  const colors = {
    sleeves: getColor(partKeys.SLEEVES),
    body: getColor(partKeys.BODY || partKeys.BACK),
    collar: getColor(partKeys.COLLAR),
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
        id={partKeys.SLEEVES}
        isSelected={isSelected(partKeys.SLEEVES)}
        onClick={onPartClick}
      >
        <Sleeve side="left" color={colors.sleeves} fill={patterns.sleeves.fill} />
        <Sleeve side="right" color={colors.sleeves} fill={patterns.sleeves.fill} />
      </SelectablePart>

      {/* Main body */}
      {/* <SelectablePart
        id={partKeys.BODY || partKeys.BACK}
        isSelected={isSelected(partKeys.BODY || partKeys.BACK)}
        onClick={onPartClick}
      >
        <path
          d={bodyPath}
          fill={patterns.body.fill}
          stroke="rgba(0,0,0,0.12)"
          strokeWidth="0.8"
        />
      </SelectablePart> */}

      {/* Side panels */}
      {/* {hasSidePanels && patterns.side && (
        <SelectablePart
          id={partKeys.SIDE_PANELS}
          isSelected={isSelected(partKeys.SIDE_PANELS)}
          onClick={onPartClick}
        >
          <SidePanel position="left" fill={patterns.side.fill} />
          <SidePanel position="right" fill={patterns.side.fill} />
        </SelectablePart>
      )} */}

      {/* Specific parts (collar, pockets, zip, etc.) */}
      {renderSpecificParts({ patterns, colors, isSelected, onPartClick })}

      {/* Collar (if not rendered in specific parts) */}
      {collarPath && patterns.collar && (
        <SelectablePart
          id={partKeys.COLLAR}
          isSelected={isSelected(partKeys.COLLAR)}
          onClick={onPartClick}
        >
          <path
            d={collarPath}
            fill={patterns.collar.fill}
            stroke="rgba(0,0,0,0.15)"
            strokeWidth="0.8"
          />
        </SelectablePart>
      )}

      {/* Bottom hem */}
      <BottomHem 
        color={colors.body} 
        onClick={() => onPartClick(partKeys.BODY || partKeys.BACK)} 
      />

      {/* Seam lines */}
      {hasSeamLines && <SeamLines />}
    </svg>
  )
}