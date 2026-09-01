<script lang="ts">
  import { resolve } from '$app/paths'

  import { page } from '$app/state'
  import { locale, t } from '$lib/translations'

  const isNotFound = $derived(page.status === 404)
  const title = $derived(
    isNotFound ? $t('common.error-not-found-title') : $t('common.error-generic-title')
  )
  const description = $derived(
    isNotFound ? $t('common.error-not-found-description') : (page.error?.message ?? '')
  )
  // Link straight to the localized home so the click doesn't go through the `/` -> `/{locale}` redirect.
  const homeHref = $derived($locale === 'fr' ? resolve('/fr') : resolve('/en'))
</script>

<svelte:head>
  <meta name="robots" content="noindex" />
</svelte:head>

<div class="grid h-full w-full place-items-center bg-gray-100 p-4">
  <div class="flex flex-col items-center text-center">
    <p class="text-6xl font-bold tracking-tight text-gray-900 tabular-nums">{page.status}</p>
    <h1 class="mt-4 text-2xl font-semibold text-gray-900">{title}</h1>
    {#if description !== ''}
      <p class="mt-2 text-base text-gray-600">{description}</p>
    {/if}
    <a href={homeHref} class="mt-6 text-base">{$t('common.error-back-home')}</a>
  </div>
</div>
