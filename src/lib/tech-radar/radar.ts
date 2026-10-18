export interface RadarRing {
  name: string
  color: string
}

export interface RadarEntry {
  name: string
  quadrant: string
  ring: string
  link?: string
}

export interface RadarData {
  quadrants: string[]
  rings: RadarRing[]
  entries: RadarEntry[]
}

export interface RadarDot extends RadarEntry {
  id: number
  x: number
  y: number
  color: string
}

export interface RadarLegendRing {
  name: string
  color: string
  entries: RadarDot[]
}

export interface RadarLegendQuadrant {
  name: string
  rings: RadarLegendRing[]
}

export interface RadarLayout {
  dots: RadarDot[]
  legend: RadarLegendQuadrant[]
  ringRadii: number[]
  sectorAngles: Array<{ start: number; mid: number }>
}

// Angle kept clear of sector borders so dots never sit on an axis line.
const SECTOR_PADDING = 0.25

export const layoutRadar = (data: RadarData, radius: number): RadarLayout => {
  for (const entry of data.entries) {
    if (!data.quadrants.includes(entry.quadrant)) {
      throw new Error(`Techno "${entry.name}" references unknown quadrant "${entry.quadrant}"`)
    }
    if (!data.rings.some((ring) => ring.name === entry.ring)) {
      throw new Error(`Techno "${entry.name}" references unknown ring "${entry.ring}"`)
    }
  }

  // sqrt spacing gives outer rings thinner bands, compensating their longer arcs.
  const ringRadii = data.rings.map((_, index) =>
    Math.round(radius * Math.sqrt((index + 1) / data.rings.length))
  )

  const sectorSpan = (2 * Math.PI) / data.quadrants.length
  const sectorAngles = data.quadrants.map((_, index) => {
    const start = -Math.PI / 2 + index * sectorSpan
    return { start, mid: start + sectorSpan / 2 }
  })

  const dots: RadarDot[] = []
  let id = 0
  const legend = data.quadrants.map((quadrantName, quadrantIndex) => ({
    name: quadrantName,
    rings: data.rings.map((ring, ringIndex) => {
      const entries = data.entries
        .filter((entry) => entry.quadrant === quadrantName && entry.ring === ring.name)
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((entry, entryIndex, ringEntries) => {
          // Grid the band: more entries use more rows to keep dots apart.
          const rows = ringEntries.length <= 4 ? 1 : ringEntries.length <= 8 ? 2 : 3
          const columns = Math.ceil(ringEntries.length / rows)
          const column = Math.floor(entryIndex / rows)
          const row = entryIndex % rows

          const usableSpan = sectorSpan - 2 * SECTOR_PADDING
          const angle =
            sectorAngles[quadrantIndex].start +
            SECTOR_PADDING +
            ((column + 0.5) / columns) * usableSpan

          const innerRadius = ringIndex === 0 ? 0 : ringRadii[ringIndex - 1]
          const band = ringRadii[ringIndex] - innerRadius
          const depth = (row + 1) / (rows + 1)
          const r = innerRadius + depth * band

          id += 1
          const dot: RadarDot = {
            ...entry,
            id,
            x: Math.round(r * Math.cos(angle)),
            y: Math.round(r * Math.sin(angle)),
            color: ring.color
          }
          dots.push(dot)
          return dot
        })
      return { name: ring.name, color: ring.color, entries }
    })
  }))

  return { dots, legend, ringRadii, sectorAngles }
}
