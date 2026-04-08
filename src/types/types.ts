export type KitType = 'jersey' | 'shorts'
export type ViewType = 'front' | 'back'
export type PatternType = 'Solid' | 'Stripes' | 'Diamonds' | 'Gradient' | 'Camo' | 'Checkers'

export interface KitPart {
  id: string
  label: string
  defaultColor: string
}

export interface KitPreset {
  name: string
  colors: Record<string, string>
}

export interface DesignerState {
  kit: KitType
  view: ViewType
  selectedPart: string | null
  colors: Record<string, string>
  patterns: Record<string, PatternType>
}

export interface ColorHSL {
  h: number
  s: number
  l: number
}

export interface PatternDef {
  fill: string
  defs: string
}

export interface JerseyPattern {
  fill: string
  defs?: string
}

export interface JerseyPatterns {
  body: JerseyPattern
  sleeves: JerseyPattern
  collar: JerseyPattern
  side?: JerseyPattern | null
  pockets?: JerseyPattern
  [key: string]: JerseyPattern | null | undefined
}

export interface JerseyColors {
  sleeves: string
  body: string
  collar: string
  [key: string]: string
}