'use client'

import { useState, useEffect } from 'react'
import { PatternType } from '@/domain/lib/types'
import { hslToHex, hexToHsl, isValidHex } from '@/domain/lib/colorUtils'
import { QUICK_SWATCHES, PATTERNS } from '@/domain/lib/constants'
import SLPicker from './SLPicker'

interface ColorPanelProps {
  partId: string
  partLabel: string
  currentColor: string
  currentPattern: PatternType
  onColorChange: (color: string) => void
  onPatternChange: (pattern: PatternType) => void
}

export default function ColorPanel({
  partId,
  partLabel,
  currentColor,
  currentPattern,
  onColorChange,
  onPatternChange,
}: ColorPanelProps) {
  const [hsl, setHsl] = useState(() => hexToHsl(currentColor))
  const [hexInput, setHexInput] = useState(currentColor)
  const [hexError, setHexError] = useState(false)

  useEffect(() => {
    setHsl(hexToHsl(currentColor))
    setHexInput(currentColor)
    setHexError(false)
  }, [currentColor, partId])

  const updateFromHsl = (h: number, s: number, l: number) => {
    const newHsl = { h, s, l }
    setHsl(newHsl)
    const hex = hslToHex(h, s, l)
    setHexInput(hex)
    onColorChange(hex)
  }

  const handleHexInput = (val: string) => {
    setHexInput(val)
    const hex = val.startsWith('#') ? val : '#' + val
    if (isValidHex(hex)) {
      setHexError(false)
      setHsl(hexToHsl(hex))
      onColorChange(hex)
    } else {
      setHexError(true)
    }
  }

  const handleHexKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const hex = hexInput.startsWith('#') ? hexInput : '#' + hexInput
      if (isValidHex(hex)) {
        onColorChange(hex)
        setHexError(false)
      }
    }
  }

  return (
    <div className="flex flex-col gap-4 p-4 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-lg border flex-shrink-0"
          style={{
            background: currentColor,
            borderColor: 'rgba(0,0,0,0.12)',
          }}
        />
        <div>
          <p className="text-sm font-medium text-gray-900 leading-tight">{partLabel}</p>
          <p className="text-xs text-gray-400 leading-tight">Color & Pattern</p>
        </div>
      </div>

      {/* SL Picker */}
      <SLPicker
        hue={hsl.h}
        saturation={hsl.s}
        lightness={hsl.l}
        onChange={(s, l) => updateFromHsl(hsl.h, s, l)}
      />

      {/* Hue slider */}
      <div>
        <label className="text-xs text-gray-400 mb-1.5 block">Hue</label>
        <input
          type="range"
          min={0}
          max={360}
          value={hsl.h}
          onChange={(e) => updateFromHsl(Number(e.target.value), hsl.s, hsl.l)}
          className="hue-slider w-full"
        />
      </div>

      {/* Hex input */}
      <div>
        <label className="text-xs text-gray-400 mb-1.5 block">Hex Code</label>
        <div className="flex gap-2 items-center">
          <div
            className="w-9 h-9 rounded-lg border flex-shrink-0"
            style={{ background: currentColor, borderColor: 'rgba(0,0,0,0.12)' }}
          />
          <input
            type="text"
            value={hexInput}
            onChange={(e) => handleHexInput(e.target.value)}
            onKeyDown={handleHexKeyDown}
            maxLength={7}
            placeholder="#000000"
            className={`flex-1 px-3 py-2 rounded-lg border text-sm font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-black/10 ${
              hexError
                ? 'border-red-300 bg-red-50 text-red-600'
                : 'border-gray-200 bg-white text-gray-900'
            }`}
          />
        </div>
      </div>

      {/* Quick swatches */}
      <div>
        <label className="text-xs text-gray-400 mb-2 block">Quick Colors</label>
        <div className="grid grid-cols-8 gap-1.5">
          {QUICK_SWATCHES.map((color) => (
            <button
              key={color}
              onClick={() => onColorChange(color)}
              title={color}
              className="aspect-square rounded-md transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-black/20"
              style={{
                background: color,
                border:
                  color === currentColor
                    ? '2px solid #1a1a1a'
                    : '1.5px solid rgba(0,0,0,0.1)',
                transform: color === currentColor ? 'scale(1.15)' : undefined,
              }}
            />
          ))}
        </div>
      </div>

      {/* Patterns */}
      <div>
        <label className="text-xs text-gray-400 mb-2 block">Pattern</label>
        <div className="grid grid-cols-3 gap-2">
          {PATTERNS.map((pattern) => (
            <button
              key={pattern}
              onClick={() => onPatternChange(pattern)}
              className={`py-2 px-1 rounded-lg text-xs font-medium transition-all border ${
                currentPattern === pattern
                  ? 'border-gray-900 bg-gray-900 text-white'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-400'
              }`}
            >
              {pattern}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
