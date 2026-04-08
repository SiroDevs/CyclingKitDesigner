'use client'

import { useReducer, useCallback, useRef, useState } from 'react';
import { designerReducer, initialState } from '@/lib/designerReducer';
import { JERSEY_PARTS, SHORTS_PARTS } from '@/lib/constants';
import { PatternType } from '@/types/types';
import { getPatternDef } from '@/lib/patternUtils';
import { exportSVG, exportAllViews, ExportFormat } from '@/lib/exportUtils';
import { Toolbar } from "../components/Toolbar";
import { PartsList, KitPresets } from "../components/sidebar";
import { ExportModal } from "./ExportModal";
import { ColorPanel } from '../color';
import { SelectAPart } from '../sidebar';
import { ShortsFront } from '../components/kit/ShortsFront';
import { ShortsBack } from '../components/kit/ShortsBack';
import { KitCanvas } from '../components/kit/KitCanvas';
import { JerseyFront, JerseyBack } from '../components/kit/jersey';

export function DesignerPage() {
  const [state, dispatch] = useReducer(designerReducer, initialState)
  const [exportOpen, setExportOpen] = useState(false)

  const jerseyFrontRef = useRef<HTMLDivElement>(null)
  const jerseyBackRef  = useRef<HTMLDivElement>(null)
  const shortsFrontRef   = useRef<HTMLDivElement>(null)
  const shortsBackRef    = useRef<HTMLDivElement>(null)

  const parts = state.kit === 'jersey' ? JERSEY_PARTS : SHORTS_PARTS

  const getColor = useCallback(
    (id: string): string => {
      const part = [...JERSEY_PARTS, ...SHORTS_PARTS].find((p) => p.id === id)
      return state.colors[id] ?? part?.defaultColor ?? '#ffffff'
    },
    [state.colors]
  )

  const getPattern = useCallback(
    (id: string): PatternType => state.patterns[id] ?? 'Solid',
    [state.patterns]
  )

  const getPatFill = useCallback(
    (id: string) => getPatternDef(id, getColor(id), getPattern(id)),
    [getColor, getPattern]
  )

  const selectedPartMeta = parts.find((p) => p.id === state.selectedPart)

  const handleExport = useCallback(
    async (opts: {
      format: ExportFormat
      scale: number
      background: string
      allViews: boolean
    }) => {
      const kitName  = state.kit === 'jersey' ? 'jersey' : 'shorts'
      const viewName = state.view

      if (!opts.allViews) {
        const refMap: Record<string, React.RefObject<HTMLDivElement | null>> = {
          'jersey-front': jerseyFrontRef,
          'jersey-back': jerseyBackRef,
          'shorts-front': shortsFrontRef,
          'shorts-back': shortsBackRef,
        }
        const key     = `${kitName}-${viewName}`
        const wrapper = refMap[key]?.current
        if (!wrapper) throw new Error('Could not locate SVG element')
        const svgEl = wrapper.querySelector('svg')
        if (!svgEl)  throw new Error('SVG not found in canvas')
        await exportSVG(svgEl as SVGElement, {
          ...opts,
          filename: `cycling-kit-${kitName}-${viewName}.${opts.format}`,
        })
      } else {
        const views = [
          { label: 'Jersey Front', ref: jerseyFrontRef },
          { label: 'Jersey Back', ref: jerseyBackRef  },
          { label: 'Shorts Front', ref: shortsFrontRef   },
          { label: 'Shorts Back', ref: shortsBackRef    },
        ]
        const svgViews = views.flatMap(({ label, ref }) => {
          const svgEl = ref.current?.querySelector('svg') as SVGElement | null
          return svgEl ? [{ label, el: svgEl }] : []
        })
        if (svgViews.length === 0) throw new Error('No SVG elements found')
        await exportAllViews(svgViews, opts)
      }
    },
    [state.kit, state.view]
  )

  const kitProps = {
    getColor,
    getPatFill,
    selectedPart: null as string | null,
    onPartClick: () => {},
  }

  return (
    <div className="flex flex-col h-screen bg-[#eee] dark:bg-[#000]">
      <Toolbar
        kit={state.kit}
        view={state.view}
        onKitChange={(kit)  => dispatch({ type: 'SET_KIT',  payload: kit  })}
        onViewChange={(view) => dispatch({ type: 'SET_VIEW', payload: view })}
        onReset={() => dispatch({ type: 'RESET' })}
        onExport={() => setExportOpen(true)}
      />

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-56 flex-shrink-0 bg-white border-r border-gray-100 flex flex-col overflow-y-auto">
          <div className="px-3 pt-3 pb-1">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              {state.kit === 'jersey' ? 'Jersey Parts' : 'Shorts Parts'}
            </p>
          </div>
          <PartsList
            parts={parts}
            selectedPart={state.selectedPart}
            getColor={getColor}
            onSelectPart={(id) => dispatch({ type: 'SELECT_PART', payload: id })}
          />
          <div className="mt-auto border-t border-gray-100">
            <KitPresets
              onApplyPreset={(i) => dispatch({ type: 'APPLY_PRESET', presetIndex: i })}
            />
          </div>
        </aside>

        <main
          className="flex-1 flex items-center justify-center p-8 overflow-hidden"
          onClick={() => dispatch({ type: 'SELECT_PART', payload: null })}
        >
          <div className="flex flex-col items-center gap-4 w-full max-w-sm">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span>{state.kit === 'shorts' ? 'Shorts' : 'Jersey'}</span>
              <span>·</span>
              <span className="capitalize">{state.view}</span>
            </div>

            <div
              className="w-full rounded-2xl border border-gray-100 p-6 shadow-sm bg-white dark:bg-[#1d1d20] shadow-xs"
              onClick={(e) => e.stopPropagation()}
            >
              <KitCanvas
                kit={state.kit}
                view={state.view}
                getColor={getColor}
                getPatFill={getPatFill}
                selectedPart={state.selectedPart}
                onPartClick={(id) => dispatch({ type: 'SELECT_PART', payload: id })}
              />
            </div>

            <p className="text-xs text-gray-400 text-center">
              {state.selectedPart
                ? `Editing: ${selectedPartMeta?.label ?? state.selectedPart}`
                : 'Click any part to customize its color or pattern'}
            </p>
          </div>
        </main>

        <aside className="w-72 flex-shrink-0 border-l border-gray-100 overflow-y-auto bg-white dark:bg-[#1d1d20] shadow-xs">
          {state.selectedPart && selectedPartMeta ? (
            <ColorPanel
              key={state.selectedPart}
              partId={state.selectedPart}
              partLabel={selectedPartMeta.label}
              currentColor={getColor(state.selectedPart)}
              currentPattern={getPattern(state.selectedPart)}
              onColorChange={(color) =>
                dispatch({ type: 'SET_COLOR', partId: state.selectedPart!, color })
              }
              onPatternChange={(pattern) =>
                dispatch({ type: 'SET_PATTERN', partId: state.selectedPart!, pattern })
              }
            />
          ) : (
            <SelectAPart />
          )}
        </aside>
      </div>

      <div aria-hidden="true" className="fixed pointer-events-none" style={{ left: -9999, top: 0 }}>
        <div ref={jerseyFrontRef} style={{ width: 320, height: 380 }}>
          <JerseyFront {...kitProps} />
        </div>
        <div ref={jerseyBackRef} style={{ width: 320, height: 380 }}>
          <JerseyBack {...kitProps} />
        </div>
        <div ref={shortsFrontRef} style={{ width: 260, height: 360 }}>
          <ShortsFront {...kitProps} />
        </div>
        <div ref={shortsBackRef} style={{ width: 260, height: 360 }}>
          <ShortsBack {...kitProps} />
        </div>
      </div>

      <ExportModal
        isOpen={exportOpen}
        onClose={() => setExportOpen(false)}
        onExport={handleExport}
      />
    </div>
  )
}
