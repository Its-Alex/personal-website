<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    ordered: string
    start: number
    children?: Snippet
  }

  const { ordered, start, children }: Props = $props()
</script>

{#if ordered}
  <ol class="m-0 p-0" {start}>{@render children?.()}</ol>
{:else}
  <ul class="m-0 p-0">{@render children?.()}</ul>
{/if}
