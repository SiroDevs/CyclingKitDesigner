import { KitPart, KitPreset, PatternType } from './types'

export const JERSEY_PARTS: KitPart[] = [
  { id: 'jersey_body', label: 'Body', defaultColor: '#FFFFFF' },
  { id: 'jersey_sleeves', label: 'Sleeves', defaultColor: '#1a1a1a' },
  { id: 'jersey_collar', label: 'Collar & Zip', defaultColor: '#1a1a1a' },
  { id: 'jersey_side_panels', label: 'Side Panels', defaultColor: '#E53935' },
  { id: 'jersey_back', label: 'Back Panel', defaultColor: '#FFFFFF' },
  { id: 'jersey_pockets', label: 'Rear Pockets', defaultColor: '#E0E0E0' },
]

export const BIBS_PARTS: KitPart[] = [
  { id: 'bibs_main', label: 'Main Body', defaultColor: '#1a1a1a' },
  { id: 'bibs_straps', label: 'Straps', defaultColor: '#1a1a1a' },
  { id: 'bibs_pad', label: 'Chamois Pad', defaultColor: '#2a2a2a' },
  { id: 'bibs_side', label: 'Side Panels', defaultColor: '#1a1a1a' },
]

export const KIT_PRESETS: KitPreset[] = [
  {
    name: 'Classic',
    colors: {
      jersey_body: '#FFFFFF',
      jersey_sleeves: '#1a1a1a',
      jersey_collar: '#1a1a1a',
      jersey_side_panels: '#E53935',
      jersey_back: '#FFFFFF',
      jersey_pockets: '#E0E0E0',
      bibs_main: '#1a1a1a',
      bibs_straps: '#1a1a1a',
      bibs_pad: '#2a2a2a',
      bibs_side: '#1a1a1a',
    },
  },
  {
    name: 'Sky Blue',
    colors: {
      jersey_body: '#0288D1',
      jersey_sleeves: '#FFFFFF',
      jersey_collar: '#0288D1',
      jersey_side_panels: '#FDD835',
      jersey_back: '#0288D1',
      jersey_pockets: '#039BE5',
      bibs_main: '#01579B',
      bibs_straps: '#01579B',
      bibs_pad: '#1a2a3a',
      bibs_side: '#0288D1',
    },
  },
  {
    name: 'Forest',
    colors: {
      jersey_body: '#2E7D32',
      jersey_sleeves: '#1B5E20',
      jersey_collar: '#1B5E20',
      jersey_side_panels: '#FFF9C4',
      jersey_back: '#2E7D32',
      jersey_pockets: '#388E3C',
      bibs_main: '#1B5E20',
      bibs_straps: '#1B5E20',
      bibs_pad: '#0D3B12',
      bibs_side: '#2E7D32',
    },
  },
  {
    name: 'Sunset',
    colors: {
      jersey_body: '#F57F17',
      jersey_sleeves: '#E65100',
      jersey_collar: '#BF360C',
      jersey_side_panels: '#212121',
      jersey_back: '#F57F17',
      jersey_pockets: '#FF8F00',
      bibs_main: '#212121',
      bibs_straps: '#212121',
      bibs_pad: '#111111',
      bibs_side: '#3E2723',
    },
  },
  {
    name: 'Pro Black',
    colors: {
      jersey_body: '#212121',
      jersey_sleeves: '#212121',
      jersey_collar: '#E53935',
      jersey_side_panels: '#E53935',
      jersey_back: '#212121',
      jersey_pockets: '#333333',
      bibs_main: '#212121',
      bibs_straps: '#212121',
      bibs_pad: '#111111',
      bibs_side: '#1a1a1a',
    },
  },
  {
    name: 'Pastel',
    colors: {
      jersey_body: '#F8BBD9',
      jersey_sleeves: '#CE93D8',
      jersey_collar: '#AB47BC',
      jersey_side_panels: '#81D4FA',
      jersey_back: '#F8BBD9',
      jersey_pockets: '#F3E5F5',
      bibs_main: '#7B1FA2',
      bibs_straps: '#7B1FA2',
      bibs_pad: '#4A148C',
      bibs_side: '#9C27B0',
    },
  },
  {
    name: 'Ocean',
    colors: {
      jersey_body: '#006064',
      jersey_sleeves: '#00838F',
      jersey_collar: '#004D40',
      jersey_side_panels: '#80DEEA',
      jersey_back: '#006064',
      jersey_pockets: '#00838F',
      bibs_main: '#004D40',
      bibs_straps: '#004D40',
      bibs_pad: '#002923',
      bibs_side: '#006064',
    },
  },
  {
    name: 'Fire',
    colors: {
      jersey_body: '#B71C1C',
      jersey_sleeves: '#FF6F00',
      jersey_collar: '#212121',
      jersey_side_panels: '#FFF9C4',
      jersey_back: '#B71C1C',
      jersey_pockets: '#C62828',
      bibs_main: '#212121',
      bibs_straps: '#212121',
      bibs_pad: '#111111',
      bibs_side: '#311B92',
    },
  },
]

export const QUICK_SWATCHES = [
  '#FFFFFF', '#F5F5F5', '#E0E0E0', '#9E9E9E',
  '#616161', '#424242', '#212121', '#000000',
  '#E53935', '#D81B60', '#8E24AA', '#3949AB',
  '#039BE5', '#00897B', '#43A047', '#F9A825',
  '#FB8C00', '#6D4C41', '#546E7A', '#78909C',
  '#EF9A9A', '#F48FB1', '#CE93D8', '#90CAF9',
  '#80DEEA', '#A5D6A7', '#FFF59D', '#FFCC80',
  '#FFAB91', '#BCAAA4', '#B0BEC5', '#B39DDB',
]

export const PATTERNS: PatternType[] = [
  'Solid', 'Stripes', 'Diamonds', 'Gradient', 'Camo', 'Checkers',
]
