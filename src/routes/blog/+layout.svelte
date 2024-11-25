<script lang="ts">
  import type { Snippet } from 'svelte'

  import Breadcrumb from '$lib/Breadcumb.svelte'

  interface Props {
    children?: Snippet
  }

  const { children }: Props = $props()
</script>

<div class="h-full w-full overflow-auto bg-gray-100">
  <div class="mx-auto w-1/3 p-2 max-2xl:w-2/5 max-lg:w-3/5 max-md:w-4/5 max-sm:w-full">
    <Breadcrumb />
    {@render children?.()}
  </div>
</div>
