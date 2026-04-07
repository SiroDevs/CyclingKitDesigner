import { DesignerState, KitType, ViewType, PatternType } from '@/types/types'
import { JERSEY_PARTS, SHORTS_PARTS, KIT_PRESETS } from '.'

export type DesignerAction =
  | { type: 'SET_KIT'; payload: KitType }
  | { type: 'SET_VIEW'; payload: ViewType }
  | { type: 'SELECT_PART'; payload: string | null }
  | { type: 'SET_COLOR'; partId: string; color: string }
  | { type: 'SET_PATTERN'; partId: string; pattern: PatternType }
  | { type: 'APPLY_PRESET'; presetIndex: number }
  | { type: 'RESET' }

export function getDefaultColors(): Record<string, string> {
  const colors: Record<string, string> = {}
  ;[...JERSEY_PARTS, ...SHORTS_PARTS].forEach((p) => {
    colors[p.id] = p.defaultColor
  })
  return colors
}

export const initialState: DesignerState = {
  kit: 'jersey',
  view: 'front',
  selectedPart: null,
  colors: { ...KIT_PRESETS[0].colors },
  patterns: {},
}

export function designerReducer(
  state: DesignerState,
  action: DesignerAction
): DesignerState {
  switch (action.type) {
    case 'SET_KIT':
      return { ...state, kit: action.payload, selectedPart: null }

    case 'SET_VIEW':
      return { ...state, view: action.payload }

    case 'SELECT_PART':
      return { ...state, selectedPart: action.payload }

    case 'SET_COLOR': {
      const patterns = { ...state.patterns }
      delete patterns[action.partId]
      return {
        ...state,
        colors: { ...state.colors, [action.partId]: action.color },
        patterns,
      }
    }

    case 'SET_PATTERN':
      return {
        ...state,
        patterns: { ...state.patterns, [action.partId]: action.pattern },
      }

    case 'APPLY_PRESET': {
      const preset = KIT_PRESETS[action.presetIndex]
      if (!preset) return state
      return {
        ...state,
        colors: { ...state.colors, ...preset.colors },
        patterns: {},
        selectedPart: null,
      }
    }

    case 'RESET':
      return { ...initialState }

    default:
      return state
  }
}
