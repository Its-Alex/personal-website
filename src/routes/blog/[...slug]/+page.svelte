<script lang="ts">
  import type { PageData } from './$types'

  export let data: PageData
</script>

<div class="article">
  <h1>{data?.meta?.title}</h1>

  <div class="prose">
    <svelte:component this={data?.content} />
  </div>
</div>
