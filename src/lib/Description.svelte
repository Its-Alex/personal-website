<script lang="ts">
  import { _ } from 'svelte-i18n'
  import SvelteMarkdown from 'svelte-markdown'
</script>

<style lang="postcss">
</style>

<div class="description" >
  <SvelteMarkdown source={$_('resume.description')} />
</div>