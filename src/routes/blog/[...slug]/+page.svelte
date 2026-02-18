<script lang="ts">
  import type { PageData } from './$types'

  interface Props {
    data: PageData
  }

  const { data }: Props = $props()

  const SvelteComponent = $derived(data?.content)
</script>

<div class="mx-auto">
  <header class="mb-10 border-b border-gray-200 pt-12 pb-8">
    <h1 class="font-serif text-3xl font-bold tracking-tight text-gray-900">{data?.meta?.title}</h1>
  </header>
  <div class="prose max-w-none">
    <SvelteComponent />
  </div>
</div>
