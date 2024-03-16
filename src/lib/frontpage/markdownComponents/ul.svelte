<script lang="ts">
  export let ordered: string
  export let start: number
</script>

{#if ordered}
  <ol class="m-0 p-0" {start}><slot /></ol>
{:else}
  <ul class="m-0 p-0"><slot /></ul>
{/if}
