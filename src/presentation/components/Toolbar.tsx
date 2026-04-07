'use client'

import { KitType, ViewType } from '@/types/types'

interface ToolbarProps {
  kit: KitType
  view: ViewType
  onKitChange: (kit: KitType) => void
  onViewChange: (view: ViewType) => void
  onReset: () => void
  onExport: () => void
}

function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { label: string; value: T }[]
  value: T
  onChange: (v: T) => void
}) {
  return (
    <div className="flex bg-gray-100 rounded-lg p-0.5 gap-0.5">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
            value === opt.value
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

export function Toolbar({
  kit,
  view,
  onKitChange,
  onViewChange,
  onReset,
  onExport,
}: ToolbarProps) {
  return (
    <header className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-white dark:bg-[#1d1d20] shadow-xs">
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 bg-gray-900 rounded-lg flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-white fill-current">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 18a8 8 0 110-16 8 8 0 010 16z" opacity="0.3"/>
          </svg>
        </div>
        <span className="text-sm font-semibold text-gray-900 tracking-tight">
          Kit Designer
        </span>
      </div>

      <div className="flex items-center gap-3">
        <SegmentedControl
          options={[
            { label: 'Jersey', value: 'jersey' as KitType },
            { label: 'Shorts', value: 'shorts' as KitType },
          ]}
          value={kit}
          onChange={onKitChange}
        />
        <div className="w-px h-5 bg-gray-200" />
        <SegmentedControl
          options={[
            { label: 'Front', value: 'front' as ViewType },
            { label: 'Back', value: 'back' as ViewType },
          ]}
          value={view}
          onChange={onViewChange}
        />
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onReset}
          className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-all"
        >
          Reset
        </button>
        <button
          onClick={onExport}
          className="flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none">
            <path d="M8 2v7M5 6l3 3 3-3M2 11v1a2 2 0 002 2h8a2 2 0 002-2v-1"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Export
        </button>
      </div>
    </header>
  )
}
