# Cycling Kit Designer

A Next.js app for designing custom cycling kits with real-time color and pattern customization.

## Features

- **Jersey & Bib Shorts** — design both pieces of a full kit
- **Front & Back views** — edit all sides of each garment
- **Per-part color control** — click any section to customize it individually
- **Full color picker** — hue slider + saturation/lightness canvas + hex input
- **32 quick color swatches** — common cycling kit colors
- **6 pattern types** — Solid, Stripes, Diamonds, Gradient, Camo, Checkers
- **8 full-kit presets** — Classic, Sky Blue, Forest, Sunset, Pro Black, Pastel, Ocean, Fire
- **Live SVG preview** — updates instantly as you adjust colors

## Project Structure

```
cycling-kit-designer/
├── app/
│   ├── globals.css          # Global styles + hue slider CSS
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Entry point
├── components/
│   ├── DesignerPage.tsx     # Main layout + state management
│   ├── Toolbar.tsx          # Top bar with kit/view toggles
│   ├── kit/
│   │   ├── KitCanvas.tsx    # Routes to the right SVG component
│   │   ├── JerseyFront.tsx  # Jersey front SVG
│   │   ├── JerseyBack.tsx   # Jersey back SVG
│   │   ├── BibsFront.tsx    # Bib shorts front SVG
│   │   └── BibsBack.tsx     # Bib shorts back SVG
│   ├── color/
│   │   ├── ColorPanel.tsx   # Full color editor panel
│   │   └── SLPicker.tsx     # Saturation/Lightness canvas picker
│   └── sidebar/
│       ├── PartsList.tsx    # Left sidebar parts list
│       └── KitPresets.tsx   # Preset kit grid
└── lib/
    ├── types.ts             # TypeScript interfaces
    ├── constants.ts         # Parts, presets, swatches
    ├── colorUtils.ts        # HSL/RGB/Hex conversion helpers
    ├── patternUtils.ts      # SVG pattern generation
    └── designerReducer.ts   # useReducer state management
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Extending

### Add a new kit part
1. Add it to `JERSEY_PARTS` or `BIBS_PARTS` in `lib/constants.ts`
2. Add the SVG path for that part in the relevant kit component (`JerseyFront.tsx`, etc.)
3. Call `onPartClick('your_part_id')` on the SVG `<g>` element

### Add a new preset
Add an entry to `KIT_PRESETS` in `lib/constants.ts` with color values for each part ID.

### Add a new pattern
1. Add the pattern name to the `PatternType` union in `lib/types.ts`
2. Add a `case` in `getPatternDef()` in `lib/patternUtils.ts` returning SVG `<pattern>` or `<linearGradient>` defs
3. The pattern will automatically appear in the UI

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **React useReducer** for state management
- **Canvas API** for the SL color picker
- **Inline SVG** for kit rendering with dynamic fills
