<script lang="ts">
  import { asset, resolve } from '$app/paths'
  import type { Pathname } from '$app/types'

  import { t } from '$lib/translations'
  import { page } from '$app/state'

  const crumbs = $derived.by(() => {
    // Remove zero-length tokens.
    const tokens = page.url.pathname
      .replaceAll('-', ' ')
      .split('/')
      .filter((t) => t !== '')

    // Create { label, href } pairs for each token.
    let tokenPath: string = ''
    let isBlog: boolean = false
    return tokens.reduce(
      (
        acc: Array<{
          label: string
          href: Pathname
        }>,
        token,
        index
      ) => {
        tokenPath += '/' + token
        token = token.charAt(0).toUpperCase() + token.slice(1)

        if (!isBlog || index === tokens.length - 1)
          acc.push({ label: token, href: tokenPath as Pathname })

        if (token === 'Blog' && index === 0) {
          isBlog = true
        }
        return acc
      },
      []
    )
  })
</script>

<nav aria-label="Breadcrumb" class="mb-4">
  <ol class="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-gray-600">
    <li class="flex items-center">
      <a
        href={resolve('/')}
        aria-label={$t('common.Home')}
        title={$t('common.Home')}
        class="flex items-center justify-center rounded-md p-1 transition-colors hover:bg-gray-200 hover:text-gray-900"
      >
        <img src={asset('/favicon/favicon.svg')} alt="" class="h-5 w-5" />
      </a>
    </li>

    {#each crumbs as crumb, index (crumb.href)}
      <li
        class="flex items-center gap-x-1.5"
        aria-current={index === crumbs.length - 1 ? 'page' : undefined}
      >
        <!-- Heroicons v2 / chevron-right (mini, 20x20) — https://heroicons.com -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          class="h-4 w-4 shrink-0 text-gray-400"
        >
          <path
            fill-rule="evenodd"
            d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
            clip-rule="evenodd"
          />
        </svg>

        {#if index === crumbs.length - 1}
          <span class="px-1 font-medium text-gray-900">{crumb.label}</span>
        {:else}
          <a
            href={resolve(crumb.href)}
            class="rounded px-1 transition-colors hover:bg-gray-200 hover:text-gray-900"
          >
            {crumb.label}
          </a>
        {/if}
      </li>
    {/each}
  </ol>
</nav>
