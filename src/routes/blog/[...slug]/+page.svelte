<script lang="ts">
  import type { PageData } from './$types'

  export let data: PageData
</script>

<div class="mx-auto">
  <navbar>
    <h1 class="my-20 text-2xl font-bold">{data?.meta?.title}</h1>
  </navbar>
  <div class="prose max-w-none">
    <svelte:component this={data?.content} />
  </div>
</div>
