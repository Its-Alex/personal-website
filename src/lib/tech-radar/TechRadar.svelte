<script lang="ts">
  import { layoutRadar, type RadarData, type RadarLegendQuadrant } from './radar'

  const { data }: { data: RadarData } = $props()

  const radius = 330
  const labelMargin = 45
  const viewBoxSize = (radius + labelMargin + 25) * 2
  const layout = $derived(layoutRadar(data, radius))

  // On wide screens the quadrant lists sit around the circle, Zalando-style,
  // each on the side and vertical position of its sector.
  const legendSides = $derived.by(() => {
    const sides: Record<'left' | 'right', Array<{ quadrant: RadarLegendQuadrant; top: number }>> = {
      left: [],
      right: []
    }
    layout.legend.forEach((quadrant, index) => {
      const mid = layout.sectorAngles[index].mid
      sides[Math.cos(mid) >= 0 ? 'right' : 'left'].push({ quadrant, top: Math.sin(mid) })
    })
    sides.left.sort((a, b) => a.top - b.top)
    sides.right.sort((a, b) => a.top - b.top)
    return sides
  })

  let hovered: number | null = $state(null)
</script>

{#snippet quadrantLegend(quadrant: RadarLegendQuadrant)}
  <div>
    <h2 class="mb-2 text-xl font-bold text-gray-900">{quadrant.name}</h2>
    {#each quadrant.rings as ring (ring.name)}
      {#if ring.entries.length > 0}
        <h3
          class="mt-3 mb-1 text-xs font-bold tracking-widest uppercase"
          style="color: {ring.color}"
        >
          {ring.name}
        </h3>
        <ol class="space-y-0.5">
          {#each ring.entries as entry (entry.id)}
            <li
              class="text-base {hovered === entry.id ? 'font-bold' : ''}"
              onmouseenter={() => (hovered = entry.id)}
              onmouseleave={() => (hovered = null)}
            >
              <span class="text-gray-400 tabular-nums">{entry.id}.</span>
              {#if entry.link}
                <a href={entry.link} rel="external noopener">{entry.name}</a>
              {:else}
                {entry.name}
              {/if}
            </li>
          {/each}
        </ol>
      {/if}
    {/each}
  </div>
{/snippet}

<div class="lg:flex lg:items-stretch lg:gap-8">
  <div class="hidden lg:flex lg:w-44 lg:shrink-0 lg:flex-col lg:justify-between lg:gap-10">
    {#each legendSides.left as side (side.quadrant.name)}
      {@render quadrantLegend(side.quadrant)}
    {/each}
  </div>

  <svg
    viewBox="{-viewBoxSize / 2} {-viewBoxSize / 2} {viewBoxSize} {viewBoxSize}"
    class="h-auto w-full lg:min-w-0 lg:flex-1"
    role="img"
    aria-label="Tech radar"
  >
    {#each layout.ringRadii as ringRadius (ringRadius)}
      <circle cx="0" cy="0" r={ringRadius} fill="none" stroke="#d1d5db" stroke-width="1.5" />
    {/each}
    {#each layout.sectorAngles as sector (sector.start)}
      <line
        x1="0"
        y1="0"
        x2={radius * Math.cos(sector.start)}
        y2={radius * Math.sin(sector.start)}
        stroke="#d1d5db"
        stroke-width="1.5"
      />
    {/each}

    <!-- Alternate sides because outer rings are too thin for adjacent labels. -->
    {#each data.rings as ring, ringIndex (ring.name)}
      <text
        x={((ringIndex % 2 === 0 ? 1 : -1) *
          ((ringIndex === 0 ? 0 : layout.ringRadii[ringIndex - 1]) + layout.ringRadii[ringIndex])) /
          2}
        y="5"
        text-anchor="middle"
        class="ring-label"
      >
        {ring.name}
      </text>
    {/each}

    <!-- Hidden on wide screens: the legend headings label the corners there. -->
    {#each data.quadrants as quadrant, quadrantIndex (quadrant)}
      <text
        x={(radius + labelMargin) * Math.cos(layout.sectorAngles[quadrantIndex].mid)}
        y={(radius + labelMargin) * Math.sin(layout.sectorAngles[quadrantIndex].mid) + 6}
        text-anchor="middle"
        class="quadrant-label lg:hidden"
      >
        {quadrant}
      </text>
    {/each}

    {#each layout.dots as dot (dot.id)}
      <g
        role="presentation"
        onmouseenter={() => (hovered = dot.id)}
        onmouseleave={() => (hovered = null)}
      >
        <title>{dot.name} — {dot.ring}</title>
        <circle
          cx={dot.x}
          cy={dot.y}
          r={hovered === dot.id ? 15 : 12}
          fill={dot.color}
          stroke={hovered === dot.id ? '#111827' : 'none'}
          stroke-width="2"
        />
        <text x={dot.x} y={dot.y + 4} text-anchor="middle" class="dot-number">{dot.id}</text>
      </g>
    {/each}
  </svg>

  <div class="hidden lg:flex lg:w-44 lg:shrink-0 lg:flex-col lg:justify-between lg:gap-10">
    {#each legendSides.right as side (side.quadrant.name)}
      {@render quadrantLegend(side.quadrant)}
    {/each}
  </div>
</div>

<div class="mt-8 grid grid-cols-1 gap-y-8 sm:mx-auto sm:w-fit sm:grid-cols-2 sm:gap-x-24 lg:hidden">
  {#each layout.legend as quadrant (quadrant.name)}
    {@render quadrantLegend(quadrant)}
  {/each}
</div>

<style>
  .ring-label {
    fill: #6b7280;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    stroke: #f3f4f6;
    stroke-width: 6px;
    paint-order: stroke;
  }

  .quadrant-label {
    fill: #374151;
    font-size: 19px;
    font-weight: 700;
  }

  .dot-number {
    fill: #ffffff;
    font-size: 11px;
    font-weight: 700;
    pointer-events: none;
  }
</style>
