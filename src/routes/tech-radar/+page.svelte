<script lang="ts">
  import Breadcrumb from '#lib/Breadcumb.svelte'
  import TechRadar from '#lib/tech-radar/TechRadar.svelte'
  import technos from '#lib/tech-radar/technos.json'
  import type { RadarData } from '#lib/tech-radar/radar.js'
  import { get } from '#lib/translations/index.js'

  const i18n = get()
</script>

<svelte:head>
  <title>{i18n.t('common.tech-radar-title')}</title>
  <meta name="description" content={i18n.t('common.tech-radar-description')} />
</svelte:head>

<div class="h-full w-full overflow-auto bg-gray-100">
  <div class="mx-auto w-full max-w-3xl p-2 sm:p-4 lg:max-w-6xl">
    <Breadcrumb />
    <h1 class="mb-2 text-3xl font-bold text-gray-900">{i18n.t('common.tech-radar-title')}</h1>
    <p class="mb-6 text-gray-600">{i18n.t('common.tech-radar-description')}</p>
    <TechRadar data={technos as RadarData} />
  </div>
</div>
