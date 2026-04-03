/**
 * Export utilities for the cycling kit designer.
 * Converts the live SVG kit to PNG, JPG, or PDF.
 */

export type ExportFormat = 'png' | 'jpg' | 'pdf'

export interface ExportOptions {
  format: ExportFormat
  scale?: number        // pixel density multiplier (default 3 for crisp output)
  background?: string   // background fill colour (default white)
  filename?: string
}

/**
 * Serialise an SVGElement to a data-URL via an offscreen Canvas.
 */
async function svgToCanvas(
  svgEl: SVGElement,
  scale: number,
  background: string
): Promise<HTMLCanvasElement> {
  const bbox = svgEl.getBoundingClientRect()
  const width  = Math.round(bbox.width  * scale)
  const height = Math.round(bbox.height * scale)

  // Clone so we can safely mutate (add background rect, fix dimensions)
  const clone = svgEl.cloneNode(true) as SVGElement
  clone.setAttribute('width',  String(width))
  clone.setAttribute('height', String(height))

  // Inject a white (or custom) background rect as the very first child
  const bgRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
  bgRect.setAttribute('width',  '100%')
  bgRect.setAttribute('height', '100%')
  bgRect.setAttribute('fill',   background)
  clone.insertBefore(bgRect, clone.firstChild)

  const svgString = new XMLSerializer().serializeToString(clone)
  const svgBlob   = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' })
  const url        = URL.createObjectURL(svgBlob)

  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width  = width
      canvas.height = height
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0, width, height)
      URL.revokeObjectURL(url)
      resolve(canvas)
    }
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('SVG render failed')) }
    img.src = url
  })
}

/**
 * Trigger a file download in the browser.
 */
function download(dataUrl: string, filename: string) {
  const a = document.createElement('a')
  a.href     = dataUrl
  a.download = filename
  a.click()
}

/**
 * Export a single SVGElement.
 */
export async function exportSVG(svgEl: SVGElement, opts: ExportOptions): Promise<void> {
  const scale      = opts.scale      ?? 3
  const background = opts.background ?? '#ffffff'
  const filename   = opts.filename   ?? `cycling-kit.${opts.format}`

  if (opts.format === 'png' || opts.format === 'jpg') {
    const canvas  = await svgToCanvas(svgEl, scale, background)
    const mimeType = opts.format === 'jpg' ? 'image/jpeg' : 'image/png'
    const quality  = opts.format === 'jpg' ? 0.95 : undefined
    const dataUrl  = quality !== undefined
      ? canvas.toDataURL(mimeType, quality)
      : canvas.toDataURL(mimeType)
    download(dataUrl, filename)
    return
  }

  if (opts.format === 'pdf') {
    // Dynamically import jsPDF so it only loads when actually needed
    const { jsPDF } = await import('jspdf')
    const canvas  = await svgToCanvas(svgEl, scale, background)
    const imgData = canvas.toDataURL('image/png')

    const bbox   = svgEl.getBoundingClientRect()
    // jsPDF uses mm by default; convert px at 96 dpi
    const pxToMm = (px: number) => (px * 25.4) / 96
    const wMm = pxToMm(bbox.width)
    const hMm = pxToMm(bbox.height)

    const orientation = wMm > hMm ? 'landscape' : 'portrait'
    const pdf = new jsPDF({ orientation, unit: 'mm', format: [wMm, hMm] })
    pdf.addImage(imgData, 'PNG', 0, 0, wMm, hMm)
    pdf.save(filename)
    return
  }

  throw new Error(`Unsupported export format: ${opts.format}`)
}

/**
 * Export ALL four views (jersey front/back + bibs front/back) as a
 * multi-page PDF or a zip of PNGs/JPGs.
 */
export async function exportAllViews(
  svgEls: { label: string; el: SVGElement }[],
  opts: Omit<ExportOptions, 'filename'>
): Promise<void> {
  const scale      = opts.scale      ?? 3
  const background = opts.background ?? '#ffffff'
  const baseName   = 'cycling-kit'

  if (opts.format === 'pdf') {
    const { jsPDF } = await import('jspdf')
    let pdf: InstanceType<typeof jsPDF> | null = null

    for (const { label, el } of svgEls) {
      const canvas  = await svgToCanvas(el, scale, background)
      const imgData = canvas.toDataURL('image/png')
      const bbox    = el.getBoundingClientRect()
      const pxToMm  = (px: number) => (px * 25.4) / 96
      const wMm = pxToMm(bbox.width)
      const hMm = pxToMm(bbox.height)
      const orientation = wMm > hMm ? 'landscape' : 'portrait'

      if (!pdf) {
        pdf = new jsPDF({ orientation, unit: 'mm', format: [wMm, hMm] })
      } else {
        pdf.addPage([wMm, hMm], orientation)
      }
      pdf.addImage(imgData, 'PNG', 0, 0, wMm, hMm)
      // Add a small label at the bottom
      pdf.setFontSize(8)
      pdf.setTextColor(150)
      pdf.text(label, 4, hMm - 3)
    }

    pdf!.save(`${baseName}-all-views.pdf`)
    return
  }

  // PNG / JPG: download each individually
  const mimeType = opts.format === 'jpg' ? 'image/jpeg' : 'image/png'
  const quality  = opts.format === 'jpg' ? 0.95 : undefined
  for (const { label, el } of svgEls) {
    const canvas  = await svgToCanvas(el, scale, background)
    const dataUrl = quality !== undefined
      ? canvas.toDataURL(mimeType, quality)
      : canvas.toDataURL(mimeType)
    download(dataUrl, `${baseName}-${label.toLowerCase().replace(/\s+/g, '-')}.${opts.format}`)
    // Small delay so the browser doesn't block multiple downloads
    await new Promise((r) => setTimeout(r, 120))
  }
}
