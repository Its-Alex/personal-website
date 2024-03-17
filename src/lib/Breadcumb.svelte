<script lang="ts">
  import { _ } from 'svelte-i18n'

  import { page } from '$app/stores'

  let crumbs: Array<{
    label: string
    href: string
  }> = []

  $: {
    // Remove zero-length tokens.
    const tokens = $page.url.pathname.split('/').filter((t) => t !== '')

    // Create { label, href } pairs for each token.
    let tokenPath: string = ''
    crumbs = tokens.map((t) => {
      tokenPath += '/' + t
      t = t.charAt(0).toUpperCase() + t.slice(1)
      return { label: t, href: tokenPath }
    })

    // Add a way to get home too.
    crumbs.unshift({ label: $_('Home'), href: '/' })
  }
</script>

<div>
  {#each crumbs as crumb, index}
    {#if index === crumbs.length - 1}
      <span>
        {crumb.label}
      </span>
    {:else}
      <a class="font-normal hover:text-gray-600" href={crumb.href}>{crumb.label}</a> &gt;&nbsp;
    {/if}
  {/each}
</div>
