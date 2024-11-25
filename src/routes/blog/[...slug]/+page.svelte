<script lang="ts">
  import type { PageData } from './$types'

  interface Props {
    data: PageData
  }

  const { data }: Props = $props()

  const SvelteComponent = $derived(data?.content)
</script>

<div class="mx-auto">
  <navbar>
    <h1 class="my-20 text-2xl font-bold">{data?.meta?.title}</h1>
  </navbar>
  <div class="prose max-w-none">
    <SvelteComponent />
  </div>
</div>
