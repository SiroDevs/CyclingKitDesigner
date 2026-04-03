'use client'

import { KitPart } from '@/domain/lib/types'

interface PartsListProps {
  parts: KitPart[]
  selectedPart: string | null
  getColor: (id: string) => string
  onSelectPart: (id: string) => void
}

export default function PartsList({
  parts,
  selectedPart,
  getColor,
  onSelectPart,
}: PartsListProps) {
  return (
    <div className="flex flex-col gap-0.5 p-2">
      {parts.map((part) => {
        const color = getColor(part.id)
        const isSelected = selectedPart === part.id
        return (
          <button
            key={part.id}
            onClick={() => onSelectPart(part.id)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-left w-full transition-all ${
              isSelected
                ? 'bg-gray-100 ring-1 ring-gray-200'
                : 'hover:bg-gray-50'
            }`}
          >
            {/* Color swatch */}
            <div
              className="w-6 h-6 rounded-md flex-shrink-0"
              style={{
                background: color,
                border: '1px solid rgba(0,0,0,0.1)',
              }}
            />
            {/* Label */}
            <span className={`text-sm ${isSelected ? 'font-medium text-gray-900' : 'text-gray-700'}`}>
              {part.label}
            </span>
            {/* Arrow */}
            {isSelected && (
              <svg
                className="ml-auto w-3.5 h-3.5 text-gray-400"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M6 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        )
      })}
    </div>
  )
}
