<script lang="ts">
  import Breadcrumb from '$lib/Breadcumb.svelte'
</script>

<div class="h-full w-full overflow-auto bg-gray-100">
  <div class="mx-auto w-1/3 p-2 max-2xl:w-2/5 max-lg:w-3/5 max-md:w-4/5 max-sm:w-full">
    <Breadcrumb />
    <slot />
  </div>
</div>
