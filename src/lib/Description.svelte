<script>
  import { _ } from 'svelte-i18n'
  import SvelteMarkdown from 'svelte-markdown'
</script>

<style>

</style>

<div>
  <SvelteMarkdown source={$_('resume.description')} />
</div>