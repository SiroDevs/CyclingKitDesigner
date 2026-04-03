import { PatternType, PatternDef } from './types'
import { lightenDarken } from './colorUtils'

export function getPatternDef(
  partId: string,
  color: string,
  patternType: PatternType
): PatternDef {
  const pid = partId.replace(/_/g, '')
  if (patternType === 'Solid') {
    return { fill: color, defs: '' }
  }

  const c2 = lightenDarken(color, -50)
  const c3 = lightenDarken(color, 40)

  switch (patternType) {
    case 'Stripes':
      return {
        fill: `url(#pat_${pid})`,
        defs: `<pattern id="pat_${pid}" patternUnits="userSpaceOnUse" width="14" height="14" patternTransform="rotate(45)">
          <rect width="14" height="14" fill="${color}"/>
          <rect width="7" height="14" fill="${c2}"/>
        </pattern>`,
      }

    case 'Diamonds':
      return {
        fill: `url(#pat_${pid})`,
        defs: `<pattern id="pat_${pid}" patternUnits="userSpaceOnUse" width="24" height="24">
          <rect width="24" height="24" fill="${color}"/>
          <polygon points="12,0 24,12 12,24 0,12" fill="${c2}" opacity="0.55"/>
        </pattern>`,
      }

    case 'Gradient':
      return {
        fill: `url(#pat_${pid})`,
        defs: `<linearGradient id="pat_${pid}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${color}"/>
          <stop offset="100%" stop-color="${c2}"/>
        </linearGradient>`,
      }

    case 'Camo':
      return {
        fill: `url(#pat_${pid})`,
        defs: `<pattern id="pat_${pid}" patternUnits="userSpaceOnUse" width="48" height="48">
          <rect width="48" height="48" fill="${color}"/>
          <ellipse cx="10" cy="12" rx="9" ry="7" fill="${c2}" opacity="0.7"/>
          <ellipse cx="34" cy="8" rx="7" ry="10" fill="${c3}" opacity="0.5"/>
          <ellipse cx="24" cy="30" rx="12" ry="8" fill="${c2}" opacity="0.6"/>
          <ellipse cx="6" cy="36" rx="6" ry="9" fill="${c3}" opacity="0.55"/>
          <ellipse cx="42" cy="38" rx="8" ry="6" fill="${c2}" opacity="0.65"/>
          <ellipse cx="20" cy="46" rx="10" ry="6" fill="${c3}" opacity="0.5"/>
        </pattern>`,
      }

    case 'Checkers':
      return {
        fill: `url(#pat_${pid})`,
        defs: `<pattern id="pat_${pid}" patternUnits="userSpaceOnUse" width="18" height="18">
          <rect width="18" height="18" fill="${color}"/>
          <rect width="9" height="9" fill="${c2}"/>
          <rect x="9" y="9" width="9" height="9" fill="${c2}"/>
        </pattern>`,
      }

    default:
      return { fill: color, defs: '' }
  }
}
