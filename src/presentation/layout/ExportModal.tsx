'use client'

import { useEffect, useRef, useState } from 'react'

import { ExportFormat } from '@/lib'

interface ExportModalProps {
  isOpen: boolean
  onClose: () => void
  onExport: (opts: {
    format: ExportFormat
    scale: number
    background: string
    allViews: boolean
  }) => Promise<void>
}

const FORMATS: { value: ExportFormat; label: string; desc: string }[] = [
  { value: 'png',  label: 'PNG',  desc: 'Transparent-friendly, lossless' },
  { value: 'jpg',  label: 'JPG',  desc: 'Smaller file, solid background' },
  { value: 'pdf',  label: 'PDF',  desc: 'Print-ready, vector-backed' },
]

const SCALES = [
  { value: 2, label: '2×', desc: 'Standard (≈600px)' },
  { value: 3, label: '3×', desc: 'High-res (≈900px)' },
  { value: 4, label: '4×', desc: 'Print (≈1200px)' },
]

const BG_PRESETS = [
  { value: '#ffffff', label: 'White' },
  { value: '#f8f8f6', label: 'Off-white' },
  { value: '#000000', label: 'Black' },
  { value: 'transparent', label: 'Transparent' },
]

export function ExportModal({ isOpen, onClose, onExport }: ExportModalProps) {
  const [format, setFormat]       = useState<ExportFormat>('png')
  const [scale, setScale]         = useState(3)
  const [background, setBg]       = useState('#ffffff')
  const [allViews, setAllViews]   = useState(false)
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState<string | null>(null)
  const overlayRef                = useRef<HTMLDivElement>(null)

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleExport = async () => {
    setLoading(true)
    setError(null)
    try {
      await onExport({ format, scale, background, allViews })
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Export failed')
    } finally {
      setLoading(false)
    }
  }

  // Transparent not available for JPG/PDF
  const effectiveBg = (format === 'jpg' || format === 'pdf') && background === 'transparent'
    ? '#ffffff'
    : background

  return (
    /* Overlay */
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
      onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-base font-semibold text-gray-900">Export Design</h2>
            <p className="text-xs text-gray-400 mt-0.5">Save your kit as an image or PDF</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-all"
          >
            <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none">
              <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="p-5 flex flex-col gap-5">
          {/* Format */}
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-2">
              Format
            </label>
            <div className="grid grid-cols-3 gap-2">
              {FORMATS.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFormat(f.value)}
                  className={`flex flex-col items-center gap-1 py-3 rounded-xl border-2 transition-all ${
                    format === f.value
                      ? 'border-gray-900 bg-gray-50'
                      : 'border-gray-100 hover:border-gray-300'
                  }`}
                >
                  <span className={`text-sm font-semibold ${format === f.value ? 'text-gray-900' : 'text-gray-600'}`}>
                    {f.label}
                  </span>
                  <span className="text-[10px] text-gray-400 text-center px-1 leading-tight">
                    {f.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Resolution */}
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-2">
              Resolution
            </label>
            <div className="flex gap-2">
              {SCALES.map((s) => (
                <button
                  key={s.value}
                  onClick={() => setScale(s.value)}
                  className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-all ${
                    scale === s.value
                      ? 'border-gray-900 bg-gray-900 text-white'
                      : 'border-gray-200 text-gray-600 hover:border-gray-400'
                  }`}
                >
                  <div>{s.label}</div>
                  <div className={`text-[10px] font-normal ${scale === s.value ? 'text-gray-300' : 'text-gray-400'}`}>
                    {s.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Background */}
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-2">
              Background
            </label>
            <div className="flex gap-2">
              {BG_PRESETS.map((bg) => {
                const disabled = (format === 'jpg' || format === 'pdf') && bg.value === 'transparent'
                return (
                  <button
                    key={bg.value}
                    onClick={() => !disabled && setBg(bg.value)}
                    disabled={disabled}
                    title={disabled ? 'Not available for this format' : bg.label}
                    className={`flex-1 flex flex-col items-center gap-1.5 py-2 rounded-lg border text-[11px] transition-all ${
                      effectiveBg === bg.value && background === bg.value
                        ? 'border-gray-900 bg-gray-50'
                        : disabled
                        ? 'border-gray-100 opacity-40 cursor-not-allowed'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <div
                      className="w-6 h-6 rounded-md border border-gray-200"
                      style={{
                        background: bg.value === 'transparent'
                          ? 'repeating-conic-gradient(#e5e7eb 0% 25%, white 0% 50%) 0 0 / 8px 8px'
                          : bg.value,
                      }}
                    />
                    <span className="text-gray-500">{bg.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Scope */}
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-2">
              Views to Export
            </label>
            <div className="flex gap-2">
              {[
                { value: false, label: 'Current view',  desc: 'Just what you see now' },
                { value: true,  label: 'All 4 views',   desc: 'Jersey + Shorts, front + back' },
              ].map((opt) => (
                <button
                  key={String(opt.value)}
                  onClick={() => setAllViews(opt.value)}
                  className={`flex-1 py-2.5 px-3 rounded-xl border-2 text-left transition-all ${
                    allViews === opt.value
                      ? 'border-gray-900 bg-gray-50'
                      : 'border-gray-100 hover:border-gray-300'
                  }`}
                >
                  <p className={`text-sm font-medium ${allViews === opt.value ? 'text-gray-900' : 'text-gray-600'}`}>
                    {opt.label}
                  </p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{opt.desc}</p>
                </button>
              ))}
            </div>
            {allViews && format !== 'pdf' && (
              <p className="text-xs text-gray-400 mt-1.5">
                Each view will download as a separate file.
              </p>
            )}
            {allViews && format === 'pdf' && (
              <p className="text-xs text-gray-400 mt-1.5">
                All views will be combined into one multi-page PDF.
              </p>
            )}
          </div>

          {error && (
            <div className="px-3 py-2 bg-red-50 rounded-lg border border-red-100 text-xs text-red-600">
              {error}
            </div>
          )}
        </div>

        <div className="px-5 pb-5 flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl bg-gray-900 text-sm font-medium text-white hover:bg-gray-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="40 20" strokeLinecap="round"/>
                </svg>
                Exporting…
              </>
            ) : (
              <>
                <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none">
                  <path d="M8 2v8M5 7l3 3 3-3M2 11v1a2 2 0 002 2h8a2 2 0 002-2v-1"
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Export {format.toUpperCase()}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
