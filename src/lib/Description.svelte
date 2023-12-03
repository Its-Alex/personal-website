<script lang='ts'>
  import { _ } from 'svelte-i18n'
  import SvelteMarkdown from 'svelte-markdown'
</script>

<div class="markdown-description">
  <SvelteMarkdown source={$_('resume.description')} />
</div>
