<script lang="ts">
  import { _ } from 'svelte-i18n'
  import SvelteMarkdown from 'svelte-markdown'

  import li from '$lib/frontpage/markdownComponents/li.svelte'
  import p from '$lib/frontpage/markdownComponents/p.svelte'
  import ul from '$lib/frontpage/markdownComponents/ul.svelte'
</script>

<div class="markdown-description">
  <SvelteMarkdown
    source={$_('resume.description')}
    renderers={{
      list: ul,
      listitem: li,
      paragraph: p
    }}
  />
</div>
