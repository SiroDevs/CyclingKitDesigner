'use client'

import { KIT_PRESETS } from '@/lib'

interface KitPresetsProps {
  onApplyPreset: (index: number) => void
}

export function KitPresets({ onApplyPreset }: KitPresetsProps) {
  return (
    <div className="p-3">
      <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2.5">
        Kit Presets
      </p>
      <div className="grid grid-cols-4 gap-2">
        {KIT_PRESETS.map((preset, i) => (
          <button
            key={preset.name}
            onClick={() => onApplyPreset(i)}
            className="flex flex-col items-center gap-1.5 p-2 rounded-xl border border-gray-100 hover:border-gray-300 hover:bg-gray-50 transition-all group"
          >
            <div className="flex gap-1">
              {[
                preset.colors.jersey_body ?? '#fff',
                preset.colors.jersey_side_panels ?? '#eee',
                preset.colors.shorts_main ?? '#111',
              ].map((color, ci) => (
                <div
                  key={ci}
                  className="w-4 h-4 rounded-sm"
                  style={{
                    background: color,
                    border: '0.5px solid rgba(0,0,0,0.1)',
                  }}
                />
              ))}
            </div>
            <span className="text-[10px] text-gray-500 group-hover:text-gray-800 leading-tight text-center">
              {preset.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
