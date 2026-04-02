'use client'

import { useRef, useEffect, useCallback } from 'react'

interface SLPickerProps {
  hue: number
  saturation: number
  lightness: number
  onChange: (s: number, l: number) => void
}

export function SLPicker({ hue, saturation, lightness, onChange }: SLPickerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isDragging = useRef(false)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const w = canvas.width
    const h = canvas.height

    // Base color
    ctx.fillStyle = `hsl(${hue}, 100%, 50%)`
    ctx.fillRect(0, 0, w, h)

    // White gradient (left to right: white to transparent)
    const whiteGrad = ctx.createLinearGradient(0, 0, w, 0)
    whiteGrad.addColorStop(0, 'rgba(255,255,255,1)')
    whiteGrad.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = whiteGrad
    ctx.fillRect(0, 0, w, h)

    // Black gradient (top to bottom: transparent to black)
    const blackGrad = ctx.createLinearGradient(0, 0, 0, h)
    blackGrad.addColorStop(0, 'rgba(0,0,0,0)')
    blackGrad.addColorStop(1, 'rgba(0,0,0,1)')
    ctx.fillStyle = blackGrad
    ctx.fillRect(0, 0, w, h)
  }, [hue])

  useEffect(() => {
    draw()
  }, [draw])

  const getCoords = (canvas: HTMLCanvasElement, clientX: number, clientY: number) => {
    const rect = canvas.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    const y = Math.max(0, Math.min(clientY - rect.top, rect.height))
    return { x, y, w: rect.width, h: rect.height }
  }

  const handleInteraction = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const { x, y, w, h } = getCoords(canvas, clientX, clientY)
    const s = Math.round((x / w) * 100)
    // Convert from canvas position to HSL lightness
    // At x=0 (sat=0), lightness goes 100->0 top to bottom
    // At x=w (sat=100), lightness goes 50->0 top to bottom
    const brightness = 1 - y / h
    const l = Math.round((brightness * (100 - s / 2)) + (s === 0 ? 0 : 0))
    const lightVal = Math.round(brightness * 50 + (1 - s / 100) * brightness * 50)
    onChange(s, Math.max(1, Math.min(99, lightVal)))
  }

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true
    handleInteraction(e.clientX, e.clientY)
  }
  const onMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) handleInteraction(e.clientX, e.clientY)
  }
  const onMouseUp = () => { isDragging.current = false }

  const onTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true
    handleInteraction(e.touches[0].clientX, e.touches[0].clientY)
  }
  const onTouchMove = (e: React.TouchEvent) => {
    e.preventDefault()
    if (isDragging.current) handleInteraction(e.touches[0].clientX, e.touches[0].clientY)
  }
  const onTouchEnd = () => { isDragging.current = false }

  useEffect(() => {
    const up = () => { isDragging.current = false }
    window.addEventListener('mouseup', up)
    return () => window.removeEventListener('mouseup', up)
  }, [])

  // Cursor position
  const cursorX = (saturation / 100) * 100
  const brightness = lightness < 50 ? lightness / 50 : 1 - (lightness - 50) / 50
  const cursorY = 100 - brightness * 100

  return (
    <div className="relative w-full h-36 rounded-xl overflow-hidden cursor-crosshair"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        width={300}
        height={144}
      />
      {/* Cursor */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: `${cursorX}%`,
          top: `${cursorY}%`,
          transform: 'translate(-50%, -50%)',
          width: 16,
          height: 16,
          borderRadius: '50%',
          border: '2px solid white',
          boxShadow: '0 1px 4px rgba(0,0,0,0.4)',
        }}
      />
    </div>
  )
}
