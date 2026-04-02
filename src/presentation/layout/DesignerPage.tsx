'use client'

import { useReducer, useCallback } from 'react'

import { PatternType } from '@/types/types'
import { BIBS_PARTS, designerReducer, getPatternDef, initialState, JERSEY_PARTS } from '@/lib'
import Toolbar from '../components/Toolbar'
import { KitPresets, PartsList } from '../components/sidebar'
import { KitCanvas } from '../components/kit'
import { ColorPanel } from '../components/color'

export default function DesignerPage() {
  const [state, dispatch] = useReducer(designerReducer, initialState)

  const parts = state.kit === 'jersey' ? JERSEY_PARTS : BIBS_PARTS

  const getColor = useCallback(
    (id: string): string => {
      const part = [...JERSEY_PARTS, ...BIBS_PARTS].find((p) => p.id === id)
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

  return (
    <div className="flex flex-col h-screen bg-[#f8f8f6]">
      <Toolbar
        kit={state.kit}
        view={state.view}
        onKitChange={(kit) => dispatch({ type: 'SET_KIT', payload: kit })}
        onViewChange={(view) => dispatch({ type: 'SET_VIEW', payload: view })}
        onReset={() => dispatch({ type: 'RESET' })}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar */}
        <aside className="w-56 flex-shrink-0 bg-white border-r border-gray-100 flex flex-col overflow-y-auto">
          <div className="px-3 pt-3 pb-1">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              {state.kit === 'jersey' ? 'Jersey Parts' : 'Bib Shorts Parts'}
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

        {/* Canvas area */}
        <main
          className="flex-1 flex items-center justify-center p-8 overflow-hidden"
          onClick={() => dispatch({ type: 'SELECT_PART', payload: null })}
        >
          <div className="flex flex-col items-center gap-4 w-full max-w-sm">
            {/* Kit label */}
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span className="capitalize">{state.kit === 'bibs' ? 'Bib Shorts' : 'Jersey'}</span>
              <span>·</span>
              <span className="capitalize">{state.view}</span>
            </div>

            {/* Kit preview */}
            <div
              className="w-full bg-white rounded-2xl border border-gray-100 p-6 shadow-sm"
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

            {/* Hint */}
            <p className="text-xs text-gray-400 text-center">
              {state.selectedPart
                ? `Editing: ${selectedPartMeta?.label ?? state.selectedPart}`
                : 'Click any part to customize its color or pattern'}
            </p>
          </div>
        </main>

        {/* Right panel — color editor */}
        <aside className="w-72 flex-shrink-0 bg-white border-l border-gray-100 overflow-y-auto">
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
            <div className="flex flex-col items-center justify-center h-full gap-3 p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-gray-300 fill-current">
                  <path d="M20.71 5.63l-2.34-2.34a1 1 0 00-1.41 0l-3.12 3.12-1.41-1.42-1.42 1.42 1.41 1.41-6.6 6.6A2 2 0 005 16v3h3a2 2 0 001.42-.59l6.6-6.6 1.41 1.42 1.42-1.42-1.42-1.41 3.12-3.12a1 1 0 000-1.65z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Select a part</p>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Click on any section of the kit to customize its color or pattern
                </p>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}
