<script lang="ts">
  import SvelteMarkdown from 'svelte-markdown'

  import { t } from '$lib/translations'
  import li from '$lib/frontpage/markdownComponents/li.svelte'
  import p from '$lib/frontpage/markdownComponents/p.svelte'
  import ul from '$lib/frontpage/markdownComponents/ul.svelte'
</script>

<div class="markdown-description">
  <SvelteMarkdown
    source={$t('common.resume.description')}
    renderers={{
      list: ul,
      listitem: li,
      paragraph: p
    }}
  />
</div>
