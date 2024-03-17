<script lang="ts">
  import { _ } from 'svelte-i18n'

  import { page } from '$app/stores'

  let crumbs: Array<{
    label: string
    href: string
  }> = []

  $: {
    // Remove zero-length tokens.
    const tokens = $page.url.pathname
      .replaceAll('-', ' ')
      .split('/')
      .filter((t) => t !== '')

    // Create { label, href } pairs for each toke n.
    let tokenPath: string = ''
    let isBlog: boolean = false
    crumbs = tokens.reduce(
      (
        acc: Array<{
          label: string
          href: string
        }>,
        token,
        index
      ) => {
        tokenPath += '/' + token
        token = token.charAt(0).toUpperCase() + token.slice(1)

        // Add token to crumbs only if this is not a fake path for blog
        if (!isBlog || index === tokens.length - 1) acc.push({ label: token, href: tokenPath })

        if (token === 'Blog' && index === 0) {
          isBlog = true
        }
        return acc
      },
      []
    )

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
