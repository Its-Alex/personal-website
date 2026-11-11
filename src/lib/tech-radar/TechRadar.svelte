<script lang="ts">
  import { layoutRadar, type RadarData, type RadarLegendQuadrant } from './radar'
  import { get } from '#lib/translations/index.js'

  const { data }: { data: RadarData } = $props()

  const i18n = get()
  const quadrantLabel = (name: string) => i18n.t(`common.tech-radar-quadrant-${name.toLowerCase()}`)
  const ringLabel = (name: string) => i18n.t(`common.tech-radar-ring-${name.toLowerCase()}`)
  const quadrantDescription = (name: string) =>
    i18n.t(`common.tech-radar-quadrant-${name.toLowerCase()}-description`)
  const ringDescription = (name: string) =>
    i18n.t(`common.tech-radar-ring-${name.toLowerCase()}-description`)

  const radius = 330
  const labelMargin = 45
  const viewBoxSize = (radius + labelMargin + 25) * 2
  const layout = $derived(layoutRadar(data, radius))

  const ringWidth = (name: string) => {
    const index = data.rings.findIndex((ring) => ring.name === name)
    const inner = index === 0 ? 0 : layout.ringRadii[index - 1]
    return ((layout.ringRadii[index] - inner) / layout.ringRadii[layout.ringRadii.length - 1]) * 100
  }

  // Cell of a 2x2 grid matching where the sector sits on the radar, read top-left to bottom-right.
  const quadrantCell = (index: number) => {
    const mid = layout.sectorAngles[index].mid
    return (Math.sin(mid) >= 0 ? 2 : 0) + (Math.cos(mid) >= 0 ? 2 : 1)
  }

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

  const activeDot = $derived(layout.dots.find((dot) => dot.id === hovered))

  // Clamped so a long name on a dot near the edge stays inside the graph's width.
  const labelLeft = (dot: { x: number }) =>
    Math.min(85, Math.max(15, ((dot.x + viewBoxSize / 2) / viewBoxSize) * 100))
</script>

{#snippet quadrantLegend(quadrant: RadarLegendQuadrant)}
  <div>
    <h2 class="mb-2 text-xl font-bold text-gray-900">{quadrantLabel(quadrant.name)}</h2>
    {#each quadrant.rings as ring (ring.name)}
      {#if ring.entries.length > 0}
        <h3
          class="mt-3 mb-1 text-xs font-bold tracking-widest uppercase"
          style="color: {ring.color}"
        >
          {ringLabel(ring.name)}
        </h3>
        <ol class="space-y-0.5">
          {#each ring.entries as entry (entry.id)}
            <li
              class="-ml-2 border-l-2 border-transparent pl-2 text-base"
              class:bg-gray-200={hovered === entry.id}
              style={hovered === entry.id ? 'border-left-color: #111827' : ''}
              onpointerenter={() => (hovered = entry.id)}
              onpointerleave={() => (hovered = null)}
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

<div class="mt-6 border-t border-gray-200 pt-6">
  <h2 class="text-xl font-bold text-gray-900">{i18n.t('common.tech-radar-how-to-read')}</h2>

  <h3 class="mt-4 text-xs font-bold tracking-widest text-gray-500 uppercase">
    {i18n.t('common.tech-radar-rings-title')}
  </h3>
  <!-- Segments sized like the real ring bands, so the bar reads as the radar's scale. -->
  <div class="mt-2 flex h-1.5 overflow-hidden" aria-hidden="true">
    {#each data.rings as ring (ring.name)}
      <div
        class="h-full"
        style="width: {ringWidth(ring.name)}%; background-color: {ring.color}"
      ></div>
    {/each}
  </div>
  <div class="mt-1 flex justify-between text-xs tracking-wider text-gray-500 uppercase">
    <span>{i18n.t('common.tech-radar-center')}</span>
    <span>{i18n.t('common.tech-radar-edge')}</span>
  </div>
  <dl class="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
    {#each data.rings as ring (ring.name)}
      <div>
        <dt class="flex items-center gap-2 font-bold text-gray-900">
          <span
            class="h-2.5 w-2.5 shrink-0 rounded-[2px]"
            style="background-color: {ring.color}"
            aria-hidden="true"
          ></span>
          {ringLabel(ring.name)}
        </dt>
        <dd class="mt-1 text-sm leading-relaxed text-gray-600">{ringDescription(ring.name)}</dd>
      </div>
    {/each}
  </dl>
</div>

<div class="mt-8 lg:flex lg:items-stretch lg:gap-8">
  <div class="hidden lg:flex lg:w-44 lg:shrink-0 lg:flex-col lg:justify-between lg:gap-10">
    {#each legendSides.left as side (side.quadrant.name)}
      {@render quadrantLegend(side.quadrant)}
    {/each}
  </div>

  <div class="relative lg:min-w-0 lg:flex-1">
    <svg
      viewBox="{-viewBoxSize / 2} {-viewBoxSize / 2} {viewBoxSize} {viewBoxSize}"
      class="h-auto w-full"
      role="group"
      aria-label="Tech radar"
    >
      {#each layout.ringRadii as ringRadius (ringRadius)}
        <circle cx="0" cy="0" r={ringRadius} class="fill-none stroke-gray-300 stroke-[1.5px]" />
      {/each}
      {#each layout.sectorAngles as sector (sector.start)}
        <line
          x1="0"
          y1="0"
          x2={radius * Math.cos(sector.start)}
          y2={radius * Math.sin(sector.start)}
          class="stroke-gray-300 stroke-[1.5px]"
        />
      {/each}

      <!-- Alternate sides because outer rings are too thin for adjacent labels. -->
      {#each data.rings as ring, ringIndex (ring.name)}
        <text
          x={((ringIndex % 2 === 0 ? 1 : -1) *
            ((ringIndex === 0 ? 0 : layout.ringRadii[ringIndex - 1]) +
              layout.ringRadii[ringIndex])) /
            2}
          y="5"
          text-anchor="middle"
          class="fill-gray-500 stroke-gray-100 stroke-[6px] text-[15px] font-bold tracking-wider uppercase [paint-order:stroke]"
        >
          {ringLabel(ring.name)}
        </text>
      {/each}

      <!-- Hidden on wide screens: the legend headings label the corners there. -->
      {#each data.quadrants as quadrant, quadrantIndex (quadrant)}
        <text
          x={(radius + labelMargin) * Math.cos(layout.sectorAngles[quadrantIndex].mid)}
          y={(radius + labelMargin) * Math.sin(layout.sectorAngles[quadrantIndex].mid) + 6}
          text-anchor="middle"
          class="fill-gray-700 text-[19px] font-bold lg:hidden"
        >
          {quadrantLabel(quadrant)}
        </text>
      {/each}

      {#each layout.dots as dot (dot.id)}
        <g
          role="img"
          aria-label="{dot.name}, {ringLabel(dot.ring)}"
          onpointerenter={() => (hovered = dot.id)}
          onpointerleave={() => (hovered = null)}
        >
          <!-- Wider than the dot: a 12-unit dot is a 6px target on a phone. -->
          <circle cx={dot.x} cy={dot.y} r="22" fill="transparent" />
          <circle
            cx={dot.x}
            cy={dot.y}
            r={hovered === dot.id ? 15 : 12}
            fill={dot.color}
            stroke={hovered === dot.id ? '#111827' : 'none'}
            class="stroke-2"
          />
          <text
            x={dot.x}
            y={dot.y + 4}
            text-anchor="middle"
            class="pointer-events-none fill-white text-[11px] font-bold"
          >
            {dot.id}
          </text>
        </g>
      {/each}
    </svg>

    {#if activeDot}
      <!-- HTML, not an SVG text: in-SVG text shrinks with the viewBox, ~7px on a phone. -->
      <span
        class="pointer-events-none absolute border border-gray-300 bg-white px-1.5 py-0.5 text-xs font-bold whitespace-nowrap text-gray-900"
        style="left: {labelLeft(activeDot)}%; top: {((activeDot.y + viewBoxSize / 2) /
          viewBoxSize) *
          100}%; transform: translate(-50%, calc(-100% - 16px))"
      >
        {activeDot.name}
      </span>
    {/if}
  </div>

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

<h3 class="mt-10 text-xs font-bold tracking-widest text-gray-500 uppercase">
  {i18n.t('common.tech-radar-quadrants-title')}
</h3>
<dl class="mt-4 grid gap-x-10 sm:grid-cols-2">
  {#each data.quadrants as quadrant, index (quadrant)}
    <div class="border-t border-gray-200 py-3">
      <dt class="flex items-center gap-2 font-bold text-gray-900">
        <span class="grid h-4 w-4 shrink-0 grid-cols-2 grid-rows-2 gap-px" aria-hidden="true">
          {#each [1, 2, 3, 4] as cell (cell)}
            <span class={quadrantCell(index) === cell ? 'bg-gray-700' : 'bg-gray-300'}></span>
          {/each}
        </span>
        {quadrantLabel(quadrant)}
      </dt>
      <dd class="mt-1 text-sm leading-relaxed text-gray-600">{quadrantDescription(quadrant)}</dd>
    </div>
  {/each}
</dl>
